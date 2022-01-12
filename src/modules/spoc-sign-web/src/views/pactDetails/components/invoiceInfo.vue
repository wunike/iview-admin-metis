<style lang='less'>
    .invoiceInfo{
        overflow: hidden;
        .invoiceInfoContent{
            float: left;
            width: 50%;
            font-size: 14px;
            line-height: 20px;
            margin-bottom: 12px;
            .invoiceInfoLabel{
                display: inline-block;
                color: #999999;
                width: 70px;
                text-align: right;
            }
        }
    }
</style>
<template>
    <div class="invoiceInfo">
        <div v-for="(item, index) in baseList" class="invoiceInfoContent"  :key="index" v-if="baseObj[item.key]">
            <span  v-if="index<4"  class="invoiceInfoLabel">{{item.title==$t('modules_spoc_sign_web_src_modules_addinvoice_4782') ? baseObj.type == 0 ? $t('modules_rolemanage_186'):$t('modules_spoc_sign_web_src_modules_addinvoice_4782'):item.title}}：</span> <span  v-if="index<4" v-text="handle(item)"></span>
            <span  v-if="index>3" class="invoiceInfoLabel">{{item.title}}：</span> <span v-if="index>3">{{baseObj[item.key]}}</span>
        </div>
        <div class="invoiceInfoContent">
            <span class="invoiceInfoLabel">{{$t('modules_spoc_sign_web_src_modules_addinvoice_4784')}}</span> <span>{{baseObj.updateDate}}</span>
        </div>
    </div>
</template>

<script>
import valid, {
		errors,
		htContract,
		invoice as invoiceRequest,
		common,
		sysDict
	} from "../../../libs/request"

export default {
    props:{
        ctId:{
            type:String,
            required:true
        }
    },
    data() {
        return {
            baseList: [
                {title: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4817'), key: 'type'},
                {title: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4782'), key: 'title'},
                {title: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4818'), key: 'subType'},
                {title: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4819'), key: 'category'},
                {title: this.$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1436'), key: 'phone'},
                {title: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4821'), key: 'taxNo'},
                {title: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4822'), key: 'address'},
                {title: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4823'), key: 'bankName'},
                {title: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4824'), key: 'bankAccount'},
                {title: this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3111'), key: 'remarks'},
                {title: this.$t('modules_spoc_portal_views_workbenchnew_lists_index_4276'), key: 'updateByName'},
            ],
            baseObj: {},
            isShowModel: false,
            invoiceList: [],
        }
    },
    components: {
    },
    mounted() {
        this.getByTypeInvoice()
    },
    methods: {
        handle(val) {
            let temp = ''
            if (val.key == 'type') {
                this.baseObj.type == 0 ? temp = this.$t('spoc_hootie_web_59') : temp = this.$t('modules_spoc_sign_web_src_modules_addinvoice_4795')
            }
            if (val.key == 'subType') {
                this.baseObj.subType == 0 ? temp = this.$t('modules_spoc_sign_web_src_modules_addinvoice_4801') : temp = this.$t('modules_spoc_sign_web_src_modules_addinvoice_4802')
            }
            if (val.key == 'title') {
                temp =  this.baseObj.title
            }
            if (val.key == 'category') {
                this.invoiceList.forEach(item => {
                    if (item.value == this.baseObj.category) {
                        temp = item.label
                    }
                })
            }
            return temp
        },
        formInvoice() {
            this.okText = this.$t('classroom_allscore_51')
            let obj = {
                ctId: this.ctId
            }
            invoiceRequest.form(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.baseObj = res.data.data
                    this.isShowModel = true;
                }
            }).catch(errors.call(this))
        },
        getByTypeInvoice() {
            let obj = {
                type: 'ht_invoice_category'
            }
            sysDict.getByType(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.invoiceList = res.data.data
                    this.formInvoice()
                }
            }).catch(errors.call(this))
        },
    },
}
</script>

