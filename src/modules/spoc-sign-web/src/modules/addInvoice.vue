<style lang='less'>
    .gsx-invoice {
        
    }
    .add-invoice-gsx-m {
        .aro {
            overflow-y: auto;
            overflow-x: hidden;
            // min-height: 150px;
            // max-height: 484px;
            box-sizing: border-box;
        }
        .ivu-modal-body {
            // overflow-y: scroll;
            // overflow-x: hidden;
            padding: 6px 24px 24px; 
            box-sizing: border-box;
        }
        
        .title-step {
            padding:14px 0 34px 0;
            .first-step {
                color: #999;
                font-size: 16px;
                text-align: center;
                .title-ball {
                    display: inline-block;
                    width: 32px;
                    height: 32px;
                    line-height: 32px;
                    border-radius: 50%;
                    border: 1px solid #999;
                    text-align: center;
                }
                .ball {
                    color: #44bcbc;
                    border: 1px solid #44bcbc;
                }
                .bgc {
                    background-color: #44bcbc;
                    border: none;
                    color: #fff;
                }
                .color {
                    color: #44bcbc;
                }
                .title-line {
                    vertical-align: middle;
                    margin: 0 15px;
                    border-top: 1px solid #999;
                    display: inline-block;
                    width: 120px;
                }
            }
        }
        .date-line {
            border-top: 2px solid #44bcbc;
            display: inline-block;
            width: 15px;
        }
        .title {
            font-size: 14px;
            .all-sign-name {
                font-size: 18px;
                color: #44bcbc;
            }
        }
        .invoice-money {
            margin-top: 10px;
            margin-bottom: 5px;
            span {
                font-size: 18px;
                color: red;   
            }
        }
        .invoice-info {
            // margin: 20px 0 0 15px;
            overflow: hidden;
            text-align: center;
            .infor-item {
                list-style: none;
                display: inline-block;
                width: 400px;
                text-align: left;
                line-height: 50px;
                margin-right: 12px;
                .title {
                    display: inline-block;
                    width: 95px;
                    text-align: right;
                    color: #b8b8b8;
                    .is-must {
                        color: red;
                        margin-right: 5px;
                        font-style: normal;
                    }
                }
            }
            .lh {
                line-height: 38px;
                height: 38px;
                position: relative;
                padding-left: 96px; 
            }
            .block {
                display: block;
            }
            .titlePadding {
                width: 96px;
                position: absolute;
                left: 0;
                top: 0;
                text-align: right;
            }
        }
        .mar {
            margin-top: 0;
        }
        .edit-invoice {
            position: absolute;
            color: #44bcbc;
            right: 0;
            top: 10px;
            cursor: pointer;
        }
    }
</style>
<template>

    <div class="gsx-invoice">
        <Modal 
			v-model="isShowModel"
            :mask-closable='false'
            ref="inv"
            @on-ok="okInvoice"
            :ok-text='okText'
            :cancel-text='cancelText'
            @on-cancel="cancel"
            class-name="add-invoice-gsx-m"
			:title="$t('modules_spoc_sign_web_src_modules_addinvoice_4781')" 
			:width='modelW'>
            <div class="aro">
                <div v-if="!isShowinfor&&!isEdit" style="position: relative;">
                    <ul class="invoice-info" style="margin-top:0">
                        <li v-for="(item, index) in baseList" class="infor-item lh" :key="index" v-if="baseObj[item.key]">
                            <span  v-if="index<4"  class="title titlePadding">{{item.title==$t('modules_spoc_sign_web_src_modules_addinvoice_4782') ? baseObj.type == 0 ? $t('modules_rolemanage_186'):$t('modules_spoc_sign_web_src_modules_addinvoice_4782'):item.title}}：</span> <span  v-if="index<4" v-text="handle(item)"></span>
                            <span  v-if="index>3" class="title titlePadding">{{item.title}}：</span> <p style="word-break: break-word" v-if="index>3">{{baseObj[item.key]}}</p>
                        </li>
                        <!--  :style="{line-height:25px}" -->
                        <li class="infor-item lh">
                            <span   class="title titlePadding">{{$t('modules_spoc_sign_web_src_modules_addinvoice_4784')}}</span> <span>{{baseObj.updateDate}}</span>
                        </li>
                    </ul>
                </div>
                <div v-else style="position: relative;">
                    <!-- <div v-if="!isEdit"> -->
                        <!-- <div class="title-step">
                            <p class="first-step" v-if="step==1">
                                <span class="title-ball bgc">1</span>
                                <span class="title-step color">{{$t('modules_spoc_sign_web_src_modules_addinvoice_4785')}}</span>
                                <span class="title-line"></span>
                                <span class="title-ball">2</span>
                                <span class="title-step">{{$t('modules_spoc_sign_web_src_modules_addinvoice_4781')}}</span>
                            </p>
                            <p class="first-step" v-if="step==2">
                                <i class="icon-icon- iconfont title-ball ball"></i>
                                <span class="title-step ">{{$t('modules_spoc_sign_web_src_modules_addinvoice_4785')}}</span>
                                <span class="title-line"></span>
                                <span class="title-ball bgc">2</span>
                                <span class="title-step color">{{$t('modules_spoc_sign_web_src_modules_addinvoice_4781')}}</span>
                            </p>
                        </div> -->
                        <!-- <div v-show="step==1||from!='admin'">
                            <p class="title">{{$t('modules_spoc_sign_web_src_modules_addinvoice_4786')}}<span class="all-sign-name">{{signObjInfor.sellerName}}</span> </p>
                            <DatePicker type="daterange" placement="bottom-start" v-model='timeV' :placeholder="$t('modules_spoc_sign_web_src_modules_addinvoice_4787')"  @on-change='invoiceStartChange' style="width: 284px"></DatePicker>
                            <v-select style="width: 284px;margin-left: 20px;display:inline-block" :placeholder="$t('modules_spoc_sign_web_src_modules_addinvoice_4788')" icon="search" :datafunc="datafunc" v-model="compact" @on-enter="textChange" @on-click="textChange" @selected="textChange">
                            </v-select>
                            <p class="invoice-money">{{$t('modules_spoc_sign_web_src_modules_addinvoice_4789')}}<span>{{ Number(dataAllmaney)? Number(dataAllmaney).toFixed(2) : 0}}</span>{{$t('modules_spoc_sign_web_src_modules_addinvoice_4790')}}<span>{{Number(chooseMoney) ? Number(chooseMoney).toFixed(2) : 0}}</span>
                            </p>
                            <Table @on-select-all="signSelectAll" @on-selection-change="signChange" :columns="columns" :data="data.list" ></Table>
                            <p  v-if="data.count>5" style="text-align:right;margin-top:15px">
                                <span style="float:left;margin-left:544px;line-height:24px">{{$t('modules_spoc_sign_web_src_modules_addinvoice_4791', [data.count])}}</span>
                                <span style="display:line-block;width: 100px">
                                    <Page  :current="pageNo" :total="data.count*2" simple @on-change='pageChange'/>
                                </span>
                            </p>
                        </div> -->
                    <!-- </div> -->
                    <!-- <div v-if="step == 2"> -->
                    <div>
                        <ul class="invoice-info" :class="{'mar': !isShowinfor}">
                            <!-- <span class="edit-invoice" style="top:20px" @click="saveInvoice" v-if="!isShowinfor">{{$t('courselist_compontents_servicecontent_215')}}</span> -->
                            <li class="infor-item" >
                                <span class="title"><i class="is-must">*</i>{{$t('modules_spoc_sign_web_src_modules_addinvoice_4793')}}</span>
                                <RadioGroup v-model="invoiceType" @on-change='invoiceTypeChage'>
                                    <Radio :label="$t('spoc_hootie_web_59')"></Radio>
                                    <Radio style="margin-left:40px;" :label="$t('modules_spoc_sign_web_src_modules_addinvoice_4795')"></Radio>
                                </RadioGroup>
                            </li>
                            <li class="infor-item" v-if="invoiceType==$t('modules_spoc_sign_web_src_modules_addinvoice_4795')">
                                <span class="title"><i class="is-must">*</i>{{$t('views_staff_components_lefttree_644')}}</span>
                                <v-select style="width: 280px;display:inline-block;margin:0;height:50px" :placeholder="$t('modules_spoc_sign_web_src_modules_addinvoice_4797')" k='title' icon="search" :datafunc="datafuncTitle" v-model.trim="invoice.title" @on-enter="textChangeTitle" @on-click="textChangeTitle" @selected="textChangeSelect">
                                </v-select>
                                <!-- <Input v-model="invoice.title"  style="width: 280px" /> -->
                            </li>
                            <li class="infor-item" v-if="invoiceType==$t('spoc_hootie_web_59')">
                                <span class="title"><i class="is-must">*</i>{{$t('modules_rolemanage_167')}}</span>
                                <Input v-model.trim="invoice.titleName" :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_memberregistration_728')" style="width: 280px" />
                            </li>
                            <li class="infor-item" v-if="invoiceType==$t('modules_spoc_sign_web_src_modules_addinvoice_4795')">
                                <span class="title"><i class="is-must">*</i>{{$t('modules_spoc_sign_web_src_modules_addinvoice_4800')}}</span>
                                <RadioGroup v-model="invoice.common">
                                    <Radio :disabled="invoiceType==$t('spoc_hootie_web_59')" :label="$t('modules_spoc_sign_web_src_modules_addinvoice_4801')"></Radio>
                                    <Radio v-if="invoiceType==$t('modules_spoc_sign_web_src_modules_addinvoice_4795')" :label="$t('modules_spoc_sign_web_src_modules_addinvoice_4802')"></Radio>
                                </RadioGroup>
                            </li>
                            <li class="infor-item">
                                <span class="title"><i class="is-must">*</i>{{$t('modules_spoc_sign_web_src_modules_addinvoice_4803')}}</span>
                                <Select v-model="invoice.category" style="width:280px" :transfer="true">
                                    <Option v-for="item in invoiceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </li>
                            <li class="infor-item" v-if="invoiceType==$t('modules_spoc_sign_web_src_modules_addinvoice_4795')">
                                <span class="title"><i v-show="invoice.common==$t('modules_spoc_sign_web_src_modules_addinvoice_4802')" class="is-must">*</i>{{$t('views_staff_components_lefttree_647')}}</span>
                                <Input v-model="invoice.phone" :placeholder="$t('modules_spoc_sign_web_src_modules_addinvoice_4805')" style="width: 280px" />
                            </li>
                            <li class="infor-item" v-if="invoiceType==$t('modules_spoc_sign_web_src_modules_addinvoice_4795')">
                                <span class="title"><i class="is-must">*</i>{{$t('modules_spoc_sign_web_src_modules_addinvoice_4806')}}</span>
                                <Input  v-model.trim="invoice.taxNo" :placeholder="$t('modules_spoc_sign_web_src_modules_addinvoice_4807')" style="width: 280px" />
                            </li>
                            
                            <li class="infor-item" v-if="invoiceType==$t('modules_spoc_sign_web_src_modules_addinvoice_4795')">
                                <span class="title"><i v-show="invoice.common==$t('modules_spoc_sign_web_src_modules_addinvoice_4802')" class="is-must">*</i>{{$t('modules_spoc_sign_web_src_modules_addinvoice_4808')}}</span>
                                <Input v-model="invoice.address" :placeholder="$t('modules_spoc_sign_web_src_modules_addinvoice_4809')" style="width: 280px" />
                            </li>
                            <li class="infor-item" v-if="invoiceType==$t('modules_spoc_sign_web_src_modules_addinvoice_4795')&&invoice.common==$t('modules_spoc_sign_web_src_modules_addinvoice_4802')">
                                <span class="title"><i class="is-must">*</i>{{$t('modules_spoc_sign_web_src_modules_addinvoice_4810')}}</span>
                                <Input v-model.trim="invoice.bankName" :placeholder="$t('modules_spoc_sign_web_src_modules_addinvoice_4811')"  style="width: 280px" />
                            </li>
                            <li class="infor-item" v-if="invoiceType==$t('modules_spoc_sign_web_src_modules_addinvoice_4795')&&invoice.common==$t('modules_spoc_sign_web_src_modules_addinvoice_4802')">
                                <span class="title"><i class="is-must">*</i>{{$t('modules_spoc_sign_web_src_modules_addinvoice_4812')}}</span>
                                <Input v-model.trim="invoice.bankAccount"  :placeholder="$t('modules_spoc_sign_web_src_modules_addinvoice_4813')" style="width: 280px" />
                            </li>
                            <li class="infor-item">
                                <span class="title">{{$t('views_staff_components_lefttree_648')}}</span>
                                <Input v-model="invoice.remarks" style="width: 280px"  :rows="5" type="textarea"  />
                                <!-- <Input v-model="invoice.bankAccount"  :placeholder="$t('modules_spoc_sign_web_src_modules_addinvoice_4813')" s/> -->
                            </li>
                        </ul>
                        <!-- <div class="remarks">
                            <span class="remarks-title"></span>
                            
                        </div> -->
                    </div>
                </div>
            </div>
            <!-- <div slot="footer">
                <Button @click="cancel">{{cancelText}}</Button>
                <Button type="primary" @click="okInvoice">{{okText}}</Button>
            </div> -->
        </Modal>
    </div>
</template>

<script>
import vSelect from "./vSelect"
import { mapGetters, mapState, mapMutations } from 'vuex';
import valid, {
		errors,
		htContract,
		invoice as invoiceRequest,
		common,
		sysDict
	} from "../libs/request"

export default {
    props: {
        isShowinfor: {
            type: Boolean,
            default: true,
        },
        from: {
            type: String,
            default: '',
        }
        // signObjInfor: {
        //     type: Object,
        //     default: () => {
        //         return {}
        //     }
        // },
    },
    data() {
        return {
            isActioning: false, //多次提交拦截
            timeV: '',
            // step: 1,
            modelW: 600,
            dataAllmaney: 0,
            signObjInfor: {},
            okText: this.$t('classroom_allscore_54'),
            cancelText: this.$t('classroom_allscore_53'),
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
            invoiceType: this.$t('spoc_hootie_web_59'),
            invoice: {
                title: '',
                common: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4801'),
                comEye: ''
            },
            pageSize: 5,
            pageNo: 1,
            value: '',
            isEdit: false,
            value5: '',
            invoiceList: [],
            chooseMoney: 0,
            compact: '',
            // columns: [
            //     {
            //         type: "selection",
            //         align: "center",
            //         width: 60,
            //     },
            //     {
            //         title: "合同编号",
            //         width: 160,
            //         key: "no",
            //         align: "center",
            //         render: (h, params) => {
            //             return h('span', {},
            //                 params.row.no?params.row.no:params.row.code
            //             )
            //         }
            //     },
            //     {
            //         title: "签约时间",
            //         key: "signTime",
            //         align: 'left',
            //     },
            //     {
            //         title: "合同原价",
            //         key: "price",
            //         align: 'left',
            //     },
            //     {
            //         title: "优惠金额",
            //         key: "deratePrice",
            //         align: 'left',
            //     },
            //     {
            //         title: "签约金额",
            //         key: "signPrice",
            //         align: 'left',
            //     },
            // ],
            data: {
                count: 20,
                list: [
                ]
            },

            invoiceInfor: {
                startTime: '',
                endTime: '',
            }
        }
    },

    components: {
        vSelect,
    },

    mounted() {
        this.getByTypeInvoice()
    },

    watch: {
        isShowModel(val) {
            if (!val) {
                this.updataParams()
            }
        }
    },

    methods: {
        ...mapMutations(['updateLoadingStatus']),
        handle(val) {
            let temp = ''
            if (val.key == 'type') {
                this.baseObj.type == 0 ? temp = this.$t('spoc_hootie_web_59') : temp = this.$t('modules_spoc_sign_web_src_modules_addinvoice_4795')
            }
            if (val.key == 'subType') {
                this.baseObj.subType == 0 ? temp = this.$t('modules_spoc_sign_web_src_modules_addinvoice_4801') : temp = this.$t('modules_spoc_sign_web_src_modules_addinvoice_4802')
            }
            if (val.key == 'title') {
                temp = this.baseObj.title
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

        invoiceTypeChage() {
            this.invoice = {
                title: '',
                common: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4801'),
                comEye: ''
            }
            if (this.invoiceType==this.$t('spoc_hootie_web_59')) this.invoice.common = this.$t('modules_spoc_sign_web_src_modules_addinvoice_4801')

        },

        formInvoice() {
            console.log(this.signObjInfor)
            this.modelW = 500
            this.okText = this.$t('classroom_allscore_51')
            let obj = {
                ctId: this.signObjInfor.id,
                ctNo: this.signObjInfor.ctNo
            }
            invoiceRequest.form(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.baseObj = res.data.data
                    if (this.isEdit) {
                        this.isEdit = false
                        return
                    }
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
                }
            }).catch(errors.call(this))
        },

        // pageChange(val) {
        //     this.pageNo = val
        //     this.getInvoiceList()
        // },

        getInvoiceList() {
            this.modelW = 600
            this.isShowModel = true;
            // let obj = {
            //     ecId: this.signObjInfor.ecId,
            //     signStartDate: this.invoiceInfor.startTime,
            //     signEndDate: this.invoiceInfor.endTime,
            //     no: this.compact,
            //     pageSize: this.pageSize,
            //     pageNo: this.pageNo,
            // }
            // if (obj.signStartDate&&!obj.signEndDate) {
            //     this.$Message.error('请选择结束时间')
            //     return
            // }
            // if (!obj.signStartDate&&obj.signEndDate) {
            //     this.$Message.error('请选择开始时间')
            //     return
            // }
            // htContract.findByEcId(obj).then(valid.call(this))
            // .then(res => {
            //     if(res.ok) {
            //         this.dataAllmaney = res.data.message
            //         this.data = res.data.data
            //         if (this.from == 'admin') {
            //             this.okText = '下一步'
            //             // this.step = 1
            //         }
            //         this.isShowModel = true;
            //     }
            // }).catch(errors.call(this))
        },

        // invoiceStartChange(val, val1) {
        //     this.invoiceInfor.startTime = val[0]
        //     this.invoiceInfor.endTime = val[1]
        //     this.getInvoiceList()
        // },
        
        // invoiceEndChange(val, val1) {
        //     this.invoiceInfor.endTime = val
        //     this.getInvoiceList()
        // },
        
        editInvoice() {
            this.invoice = this.baseObj
            let temp = this.invoice.subType == 0 ? this.$t('modules_spoc_sign_web_src_modules_addinvoice_4801') : this.$t('modules_spoc_sign_web_src_modules_addinvoice_4802')
            this.invoiceType = this.baseObj.type == 0 ? this.$t('spoc_hootie_web_59') : this.$t('modules_spoc_sign_web_src_modules_addinvoice_4795')
            this.$set(this.invoice, 'common', temp)
            this.invoice.titleName = this.baseObj.title
            this.isEdit = true
            // this.step = 2
        },

        saveInvoice() {
            this.okInvoice()
        },

        show(signObjInfor) {
            this.signObjInfor = signObjInfor
            if (signObjInfor.invoiceStatus == 1) {
                this.formInvoice()
                return
            }
            this.getInvoiceList()
        },
        
        signSelectAll() {

        },

        // signChange(val) {
        //     this.chooseMoney = ''
        //     this.ids = '',
        //     val.forEach(item => {
        //         this.chooseMoney = item.signPrice/1 + this.chooseMoney/1
        //         this.ids += item.id + ','
        //     })
        // },

        // textChange() {
        //     this.getInvoiceList()
        // },

        textChangeTitle() {

        },

        textChangeSelect(val) {
            this.invoice = val
            let temp = this.invoice.subType == 0 ? this.$t('modules_spoc_sign_web_src_modules_addinvoice_4801') : this.$t('modules_spoc_sign_web_src_modules_addinvoice_4802')
            this.$set(this.invoice, 'common', temp)
        },

        datafuncTitle(val) {
          return new Promise((resolve, reject) => {
				invoiceRequest.findByName({
                    title: val
                }).then(valid.call(this)).then(res => {
					if(res.ok) {
						resolve(res.data.data);
					} else {
						reject(res);
					}
				}).catch(err => {
					errors.call(this);
					reject(err);
				});
			});
        },

        okInvoice() {
            if (!this.isShowinfor&&!this.isEdit) {
                this.okText = this.$t('courselist_compontents_servicecontent_215')
                this.editInvoice()
                this.$refs.inv.visible = true
                this.isShowModel = true
                return
            }
            if (!this.isShowinfor&&this.isEdit) {
                this.$refs.inv.visible = true
                this.isShowModel = true
                this.okText = this.$t('classroom_allscore_51')
            }
            // if (this.from == 'admin' && this.step == 1 && this.isShowinfor) {
            // if (this.from == 'admin' && this.isShowinfor) {
            //     if (!this.ids) {
            //         this.$Message.error('请选择开票合同')
            //     } else {
            //         // this.step = 2
            //         this.cancelText = '上一步'
            //         this.okText = '完成'
            //     }
            //     this.$refs.inv.visible = true
            //     this.isShowModel = true
            //     return
            // }
            let obj = {
                ids: this.signObjInfor.id,
                // "ctId": this.signObjInfor.ctId,
                // "ctId":"82f53d0fd65d4561952e812ba7dc15be",
                "type": this.invoiceType == this.$t('spoc_hootie_web_59') ? 0 : 1,
                "subType": this.invoice.common == this.$t('modules_spoc_sign_web_src_modules_addinvoice_4801') ? 0 : 1,
                "category": this.invoice.category, // 类目
                "title": this.invoice.title,
                "taxNo": this.invoice.taxNo,
                "address": this.invoice.address,
                "phone": this.invoice.phone,
                "bankName": this.invoice.bankName,
                "bankAccount": this.invoice.bankAccount,
                remarks: this.invoice.remarks,
            }
            if (this.isEdit) {
                obj.ids = this.baseObj.ctId
                obj.id = this.baseObj.id
            }
            // if (!this.ids&&!this.isEdit) {
            //     this.volidation('请选择开票合同')
            //     return
            // }
            if (this.invoiceType == this.$t('modules_spoc_sign_web_src_modules_addinvoice_4795')) {
                if (!this.invoice.title) {
                    this.volidation(this.$t('modules_spoc_sign_web_src_modules_addinvoice_4828'))
                    return
                }
                if ((!this.invoice.phone) && (this.invoice.common==this.$t('modules_spoc_sign_web_src_modules_addinvoice_4802'))) {
                    this.volidation(this.$t('modules_spoc_sign_web_src_modules_addinvoice_4805'))
                    return
                }
                if ((!this.invoice.address) && (this.invoice.common==this.$t('modules_spoc_sign_web_src_modules_addinvoice_4802'))) {
                    this.volidation(this.$t('modules_spoc_sign_web_src_modules_addinvoice_4809'))
                    return
                }
            }
            if (!this.invoice.category) {
                this.volidation(this.$t('modules_spoc_sign_web_src_modules_addinvoice_4829'))
                return
            }
            if (this.invoiceType == this.$t('spoc_hootie_web_59')) {
                if (!this.invoice.titleName) {
                    this.volidation(this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_memberregistration_728'))
                    return
                }
                obj.title = this.invoice.titleName
                obj.taxNo = ''
                obj.address = ''
                obj.phone = ''
                obj.bankName = ''
                obj.bankAccount = ''

            } else {
                if (this.invoice.common == this.$t('modules_spoc_sign_web_src_modules_addinvoice_4801')) {
                    if (!this.invoice.taxNo) {
                        this.volidation(this.$t('modules_spoc_sign_web_src_modules_addinvoice_4807'))
                        return
                    }
                    obj.bankName = ''
                    obj.bankAccount = ''
                } else {
                    if (!this.invoice.taxNo) {
                        this.volidation(this.$t('modules_spoc_sign_web_src_modules_addinvoice_4807'))
                        return
                    }
                    if (!this.invoice.bankName) {
                        this.volidation(this.$t('modules_spoc_sign_web_src_modules_addinvoice_4811'))
                        return
                    }
                    if (!this.invoice.bankAccount) {
                        this.volidation(this.$t('modules_spoc_sign_web_src_modules_addinvoice_4813'))
                        return
                    }
                }
            }
            this.invoiceSave(obj)
        },

        volidation(val) {
            this.$Message.error(val)
            this.$refs.inv.visible = true
            this.isShowModel = true
        },

        invoiceSave(obj) {
            if(this.isActioning){ //多次提交拦截
                return
            }
            this.isActioning = true
            this.updateLoadingStatus({
                isLoading: true
            });
            invoiceRequest.save(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.$Message.info(res.data.message)
                    if (this.isEdit) {
                        this.formInvoice()
                        return
                    } else {
                        this.isShowModel = false
                    }
                    this.$emit('updataTable')
                }
            }).catch(errors.call(this)).finally(() => {
                // this.updataParams()
                this.updateLoadingStatus({
                    isLoading: false
                });
                setTimeout(()=>{
                    //多次提交拦截
                    this.isActioning = false
                },200)
            })
        },

        updataParams() {
            this.invoiceType = this.$t('spoc_hootie_web_59')
            this.invoice = {
                title: '',
                common: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4801'),
                comEye: ''
            }
            this.cancelText = this.$t('classroom_allscore_53')
            this.okText = this.$t('classroom_allscore_54')
            this.isEdit = false
            this.timeV = ''
            this.invoiceInfor.startTime = ''
            this.invoiceInfor.endTime = ''
        },

        cancel() {
            if (this.from == 'admin' && this.isShowinfor) {
                // this.$refs.inv.visible = true
                // this.isShowModel = true
                // this.cancelText = '取消'
                // this.okText = '下一步'
                // return
            } else {
                this.isShowModel = false
                this.updataParams()
                this.$emit('updataTable')
            }
           
        },

        datafunc(val) {
            return new Promise((resole, reject) => {

            })
        },
    },
}
</script>

