<style lang="less">
.contractInfo {
    width: 100%;
    padding: 0 20px 10px;
    .packageInfo {
        .package_wrap {
            padding: 16px 24px 10px;
            background: rgba(247, 248, 250, 1);
            border-radius: 4px;
            margin-bottom:16px;
            .package_title {
                font-size: 16px;
                font-weight: 500;
                color: rgba(73, 80, 96, 1);
                line-height: 22px;
                margin-bottom: 8px;
            }
            .discount_after_info {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 8px;
                .tag_list {
                    .ivu-tag {
                        background: rgba(235, 236, 240, 1) !important;
                        .ivu-tag-text {
                            font-size: 12px;
                            font-weight: normal;
                            color: rgba(73, 80, 96, 1);
                            line-height: 18px;
                        }
                    }
                }
            }
            .package_sign_info{
                .ivu-row{
                    margin-bottom:8px;
                    .ivu-col{
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                    }
                }
            }
            .package_wrap_title {
                font-size: 14px;
                font-weight: 400;
                color: rgba(73, 80, 96, 1);
                line-height: 20px;
            }
            .package_wrap_content{
                font-size:14px;
                font-weight:400;
                color:rgba(73,80,96,1);
                line-height:20px;
                .money{
                    color: #F5222D;
                }
            }
        }
    }
    .cause,.remake{
        padding-bottom: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .discounts{
        padding-bottom:8px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .discounts_tag_list{
            .ivu-tag {
                background: rgba(235, 236, 240, 1) !important;
                .ivu-tag-text {
                    font-size: 12px;
                    font-weight: normal;
                    color: rgba(73, 80, 96, 1);
                    line-height: 18px;
                }
            }
        }
    }
    .priceInfo{
        .ivu-row{
            margin-bottom:8px;
            .ivu-col{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
        .priceInfo_title{
            font-size:14px;
            font-weight:400;
            color:rgba(73,80,96,1);
            line-height:20px;
        }
        .priceInfo_content{
            font-size:16px;
            font-weight:500;
            column-rule: #495060;
            line-height:22px;
            .money{
                color: #F5222D;
            }
        }
    }
    .contract_info_content{
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(73,80,96,1);
        line-height:20px;
    }
    .contract_info_title{
        font-size:14px;
        font-weight:500;
        color:rgba(73,80,96,1);
        line-height:20px;
    }
}
</style>

<template>
    <div class="contractInfo">
        <div class="packageInfo">
            <div class="package_wrap" v-for="(item,index) in packageList" :key="'htContractItemList'+index">
                <div class="package_title">{{item.name}}</div>
                <div class="discount_after_info">
                    <div class="package_wrap_title">{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5229')}}</div>
                    <div class="tag_list" v-if="htPolicyList.length">
                        <Tag v-for="(tag, indexTag) in packagePolicyList(item.policyIds)" :key="'tag'+indexTag">{{tag.name}}</Tag>
                    </div>
                </div>
                <div class="package_sign_info">
                    <Row>
                        <Col span="8">
                            <div class="package_wrap_title">{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5230')}}</div>
                            <div class="package_wrap_content">{{number_format(item.exemptionPrice, 2, '.', ',')}}{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</div>
                        </Col>
                        <Col span="8">
                            <div class="package_wrap_title">{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5232')}}</div>
                            <div class="package_wrap_content">{{number_format(item.publicPrice, 2, '.', ',')}}{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}} </div>
                        </Col>
                        <Col span="8">
                            <div class="package_wrap_title">{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5233')}}</div>
                            <div class="package_wrap_content">{{number_format(item.costPrice/item.giftCount, 2, '.', ',')}}{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <div class="package_wrap_title">{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5234')}}</div>
                            <div class="package_wrap_content">{{item.giftCount}}</div>
                        </Col>
                        <Col span="8">
                            <div class="package_wrap_title">{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5235')}}</div>
                            <div class="package_wrap_content">{{item.leaveNum}}</div>
                        </Col>
                        <Col span="8">
                            <div class="package_wrap_title">{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_870')}}</div>
                            <div class="package_wrap_content"><span class="money">{{number_format(item.costPrice, 2, '.', ',')}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        <div class="cause">
            <div class="contract_info_title">{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5238')}}</div>
            <div class="contract_info_content">{{formCtData.discountRemarks}}</div>
        </div>
        <div class="remake">
            <div class="contract_info_title">{{$t('views_staff_components_lefttree_648')}}</div>
            <div class="contract_info_content">{{formCtData.remarks}}</div>
        </div>
        <div class="discounts">
            <div class="contract_info_title">{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5240')}}</div>
            <div class="discounts_tag_list">
                <Tag v-for="(item,index) in wholeListPreferential" :key="'wholeListPreferential'+index">{{item.name}}</Tag>
            </div>
        </div>
        <div class="priceInfo">
            <Row>
                <Col span="12" style="padding-right: 26px;">
                    <div class="priceInfo_title">{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5230')}}</div>
                    <div class="priceInfo_content"><span class="money">{{number_format(formCtData.exemptionPrice, 2, '.', ',')}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</div>
                </Col>
                <Col span="12" style="padding-left: 26px;">
                    <div class="priceInfo_title">{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5241')}}</div>
                    <div class="priceInfo_content"><span class="money">{{number_format(formCtData.price-formCtData.signPrice, 2, '.', ',')}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</div>
                </Col>
            </Row>
            <Row>
                <Col span="12" style="padding-right: 26px;">
                    <div class="priceInfo_title">{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5242')}}</div>
                    <div class="priceInfo_content"><span class="money">{{number_format(formCtData.price, 2, '.', ',')}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</div>
                </Col>
                <Col span="12" style="padding-left: 26px;">
                    <div class="priceInfo_title">{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5243')}}</div>
                    <div class="priceInfo_content"><span class="money">{{number_format(formCtData.signPrice, 2, '.', ',')}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import valid, {
    errors,
    htContract,
    common,
    sysUser,
    sysDict,
    sys
} from '../../../libs/request.js';

export default {
    data() {
        return {
            formCtData:{
                htContractItemList:[],
                discountRemarks:this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5244'),
                remarks:this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5245'),
            },
            htPolicyList:[],
        };
    },
    computed: {
        packageList() {
            return this.formCtData.htContractItemList.filter(v=>(v.policyType=='kcb'||v.policyType=='zhkcb'));
        },
        wholeListPreferential() {
            return this.formCtData.htContractItemList.filter(v=>v.policyType=='yhzc');
        },
    },
    components: {
        // Name
    },
    created() {},
    methods: {
        getForm(obj) {
            let obj1 = obj;
            let params={
                id:obj1.id
            }
            htContract.form(params).then(valid.call(this)).then(res => {
                console.log(res.data)
            	if(res.ok) {
                    // if(res.data.message === this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5246')){
                    if(res.data.message === '合同不存在'){
                        obj1.key = 'contract takeCourse';
                        this.$emit('toContractTraslate',obj1)
                    }else{
                        this.formCtData=res.data.data;
                        this.formCtData.discountRemarks=res.data.data.discountRemarks||this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5244');
                        this.formCtData.remarks=res.data.data.remarks||this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5245');
                        this.htPolicyList = [];
                        this.$emit('openModal')
                    }
            	}
            }).catch(errors.call(this));
        },
        packagePolicyList(ids){
            let idArr=ids.split(',');
            return this.htPolicyList.find(v=>v.type=='yhzc').htItemList.filter(v=>idArr.indexOf(v.id)!=-1);
        },
        number_format(number, decimals, dec_point, thousands_sep) {
            /*
             * 参数说明：
             * number：要格式化的数字
             * decimals：保留几位小数
             * dec_point：小数点符号
             * thousands_sep：千分位符号
             * */
            number = (number + '').replace(/[^0-9+-Ee.]/g, '');
            let n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
                dec = typeof dec_point === 'undefined' ? '.' : dec_point,
                s = '',
                toFixedFix = function(n, prec) {
                    let k = Math.pow(10, prec);
                    return '' + Math.round(n * k) / k;
                };

            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            let re = /(-?\d+)(\d{3})/;
            while (re.test(s[0])) {
                s[0] = s[0].replace(re, '$1' + sep + '$2');
            }

            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        },
    }
};
</script>
