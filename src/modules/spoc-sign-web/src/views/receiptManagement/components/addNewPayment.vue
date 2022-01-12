<style lang="less">
@comColor:#495060;
.flex-row{
    display: flex;
    flex-direction: row;
}

.add-payment{
    .ivu-modal-footer .ivu-btn-text{
        border:1px solid rgb(220, 222, 226);
    }
    .ivu-modal-footer .ivu-btn-text:hover{
        border:1px solid rgb(220, 222, 226);
    }

    .ivu-modal-header{
        padding:17px 24px 16px!important;
        background: #F7F8FA;
        border-radius:4px;
        .ivu-modal-header-inner{
            font-size:18px;
            font-weight:500;
            color:rgba(0,0,0,0.85);
        }
    }

    .ivu-input{
        font-size:14px!important;
    }
    .ivu-modal-footer{
        padding:10px 24px!important;
    }
    .ivu-input-group-append{
        width: 34px!important;
    }
    .ivu-form-item-label{
        color:#999999!important;
        font-size:14px!important;
    }
    .ivu-modal-body{
        padding:0!important;
        font-size:14px!important;
        color:@comColor;
    }
    b{
        font-weight: normal;
    }
    .com{
        padding-top:24px;
        .flex-row;
        justify-content: space-between;
        align-items: flex-start;
    }
    .pay-top{
        .com;
        border-bottom:1px solid #E6E7EB;
    }
    .pay-box{
        .com;
    }
    .pay-bottom{
        padding-bottom:4px;
    }
    .add-pay-new{
        margin:0;
        border-bottom:1px solid #E6E7EB;
        &:nth-last-of-type(1){
            border-bottom:0;
        }
    }
    .add-button{
        text-align: right;
        padding-right:0px;
        padding-top:16px;
    }
    .pay-line{
        margin-bottom:24px;
        .formItem_tit{
            color: #999999!important;
            font-size: 14px!important;
        }
    }
    .ivu-form-item{
        width:400px;
        margin-bottom:20px;
        /*display: flex;*/
        /*flex-direction: row;*/
        /*justify-content: flex-start;*/
        /*align-items: center;*/
        min-height:32px;
        >span{
            display: inline-block;
            text-align: right;
            width:110px;
            color:#999;
            font-size:14px;
            margin-right:10px;

        }

        b{
            display: inline-block;
            height:32px;
            line-height:32px;
            font-size:14px;
        }
        a{
            display: inline-block;
            font-size:14px;
            height:32px;
            line-height:32px;

        }
    }
    .footer-pays{
        float: left;
        font-size:14px;
        color:@comColor;
        line-height:32px;
        a{
            font-size:16px;
        }
    }
    .ivu-select-item{
        zoom: 1;
        &::before, &::after{
            content: "";
            display: block;clear: both;height: 0;line-height: 0;font-size: 0;
        }
    }
    .ctno{
        cursor: pointer;
    }
    .moneyNum{
        color: #F5222D;
    }
}
.poptip-pay{
    b{
        font-weight: normal;
    }
    .pay-line-item{
        width:33%;

        text-indent: 4px;
        .flex-row;
        justify-content: flex-start;
        align-items: flex-start;
        font-size:12px;
    }
}
</style>

<template>
    <div class="add-payment-container">
        <Modal
            class="add-payment"
            width="800"
            v-model="addNewPayment"
            :mask-closable="false"
            :title="title">
            <Form ref="form" :model="form" :rules="formRule" :label-width="130" >
                <div class="pay-top">
                    <div class="pay-line" style="margin-bottom: 4px;">
                        <FormItem :label="$t('modules_spoc_jw_web_src_views_approval_jwapprovaldetial_2265')" prop="studentId">
                            <Select
                                v-model="form.studentId"
                                filterable
                                :disabled="studentDisabled"
                                remote
                                style="width: 250px"
                                :placeholder="$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5509')"
                                :remote-method="remoteMethod"
                                :loading="loadingStudent"
                                :label-in-value="true"
                                @on-change="choicesStudent">
                                <Option v-for="option in studentNameLists" :value="option.cusId" :key="option.cusId" :label.trim="option.name">
                                    <span class="fl">{{option.name}}</span>
                                    <span class="fr" style="color:#ccc;">{{option.phone}}</span>
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem :label="$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6957')" prop="officeId">
                            <Select v-model="form.officeId" :disabled="!!form.ctNo" @on-change="changeOfficeId" :placeholder="$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_781')" style="width: 250px">
                                <Option v-for="item in schoolList"
                                    :value="item.id"
                                    :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem :label="$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6959')" prop="recepitor">
                            <Select v-model="form.recepitor" :placeholder="$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6960')" style="width: 250px">
                                <Option v-for="item in teacherLists"
                                    :value="item.id"
                                    :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                    </div>
                    <div class="pay-line" style="margin-bottom: 0">
                        <FormItem :label="$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6961')" prop="ctNo">
                            <Button type="primary" 
                                v-if="showButton" 
                                :disabled="form.businessType != 'tuition' || (!studentId)" 
                                @click="chooseMyContract">
                                {{$t('modules_spoc_portal_views_customattribute_customtable_3420')}}
                            </Button>
                            <a v-if="!showButton" class="ctno" @click="goDetail(form)">{{form.ctNo}}</a>
                            <Icon size="14px"  style="margin-left:8px;cursor: pointer;color:#999" v-if="!showButton && !ctNo"  type="md-close" @click="closeLink" />
                        </FormItem>
                        <FormItem :label="$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5885')">
                            <b><a class="moneyNum">{{formatNums(form.accountDeductionAmount)}}</a>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</b>
                            <Poptip style="text-indent: 2px;" placement="bottom" min-width="220" :transfer="true" v-if="accountDeductionAmountLabel">
                                <i style="color:#999;font-size:12px;margin-left:0px;" class="iconfont icon-bangzhu1"></i>
                                <div  class="poptip-pay" slot="content">
                                    <div v-if="accountDeductionAmountLabel"><span>{{accountDeductionAmountLabel}}：</span><b>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6965', [formatNums(form.accountDeductionAmount)])}}</b></div>
                                    <!-- <div><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6966')}}</span><b>2500</b></div>
                                    <div><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6967')}}</span><b>2500</b></div>
                                    <div><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6968')}}</span><b>2500</b></div> -->
                                </div>
                            </Poptip>
                            <span v-if="form.kind=='electronic account deposit' || form.kind=='suspension balance' || form.kind=='change balance' || form.kind=='translate office balance'">
                                <span class="formItem_tit">{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6969')}}</span>
                                <!-- 电子账户-预存款抵扣 -->
                                <b v-if="form.kind=='electronic account deposit'"><a class="moneyNum">{{formatNums(deductibleAmount.moneyDeposit-form.accountDeductionAmount)}}</a>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</b>
                                <!-- 电子账户-退费结存抵扣 -->
                                <b v-else-if="form.kind=='suspension balance'"><a class="moneyNum">{{formatNums(deductibleAmount.moneyRefund-form.accountDeductionAmount)}}</a>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</b>
                                <!-- 电子账户-改包结存抵扣 -->
                                <b v-else-if="form.kind=='change balance'"><a class="moneyNum">{{formatNums(deductibleAmount.moneyRepackage-form.accountDeductionAmount)}}</a>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</b>
                                <!-- 电子账户-转中心结存抵扣 -->
                                <b v-else><a class="moneyNum">{{formatNums(deductibleAmount.moneyTransfer-form.accountDeductionAmount)}}</a>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</b>
                            </span>
                        </FormItem>
                        <FormItem :label="$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6970')" equired>
                            <b><a class="moneyNum">{{formatNums(form.curRemainPay)}}</a>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</b>
                        </FormItem>
                    </div>
                </div>
                <div class="pay-bottom">
                    <div class="add-pay-new">
                        <div class="pay-box">
                            <div class="pay-line" style="margin-bottom: 0;">
                                <FormItem :label="$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6971')" prop="kind">
                                    <Select v-model="form.kind" @on-change="changeKind" label-in-value clearable :placeholder="$t('pushsettings_index_505')" style="width:250px;">
                                        <Option v-for="item1 in ht_receipt_detail_type" :value="item1.value" :key="item1.value">{{ item1.label }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem :label="$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6973')" prop="voucherNo">
                                    <Input v-model="form.voucherNo" style="width: 250px" />
                                </FormItem>
                                <FormItem :label="$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6974')" prop="curReceipt" >
                                    <Input v-model.trim="form.curReceipt" @on-change="changeCurReceipt" style="width: 250px" >
                                        <span slot="append" >{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                                    </Input>
                                </FormItem>
                            </div>
                            <div class="pay-line" style="margin-bottom:0;">
                                <FormItem :label="$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6975')" prop="receiptTime">
                                    <DatePicker v-model="form.receiptTime" :options="beforeToday" type="date" :placeholder="$t('modules_spoc_core_web_src_views_staff_components_staffdynamic_302')" style="width: 250px"></DatePicker>
                                </FormItem>
                                <FormItem :label="$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6977')" prop="businessType">
                                    <Select v-model="form.businessType" :disabled="businessTypeDisable" clearable style="width:250px;" @on-change="businessTypeChange">
                                        <Option v-for="item2 in ht_receipt_business_type" :value="item2.value" :key="item2.value">{{ item2.label }}</Option>
                                    </Select>
                                </FormItem>
                            </div>
                        </div>
                        <FormItem :label="$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6978')">
                            <Input v-model="form.remarks" type="textarea" :autosize="{minRows: 4,maxRows: 4}" style="width: 650px" />
                        </FormItem>
                    </div>
                </div>

            </Form>
            <div slot="footer">
                <div class="footer-pays"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6974')}}</span><a class="moneyNum">{{formatNums(computedMoney)}}</a><span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span></div>
                <Button  @click="cancel">{{$t('classroom_allscore_53')}}</Button>
                <Button @click="submit" type="primary" style="margin-left: 8px">{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6980')}}</Button>
            </div>
        </Modal>
        <chooseContract @contract-id="contractId" ref="chooseContract" :studentId="form.studentId"></chooseContract>
        <Modal
            v-model="modal1"
            width="443"
            :title="$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6981')"
            :mask-closable="false"
            @on-ok="cancelEdit"
            @on-cancel="saveEdit">
            <p><span style="color: red;">{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6982')}}</span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6983')}}</p>
        </Modal>
    </div>
</template>

<script>
/**
 **@date: 2019/5/30 10:51
 **@author: lizhi
 **@filename: addNewPayment.vue
 * 新增收款
 */
import chooseContract from './chooseContract.vue'
import valid, { errors, htReceipt, common, sysUser, sysDict, htContract, htContractNew } from "../../../libs/request";
import { mapState, mapMutations } from 'vuex';
import { waitUntil } from '@public/libs/util';
export default {
    name: 'addNewPayment',
    data() {
        return {
            deductibleAmount:{
                money: 0,
                moneyRefund: 0,
                moneyRepackage: 0,
                moneyTransfer: 0,
                moneyDeposit: 0,
                points: 0,
            },
            isActioning: false, //多次提交拦截
            isFromContractManage: false, //是否是从合同管理打开
            studentDisabled: false,
            accountDeductionAmountLabel: '',
            computedMoney: 0,
            modal1: false,
            title: this.$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6984'),
            loadingStudent: false,
            timer: null,
            schoolList: [],
            ctNo:'', //从合同管理列表点击收款赋值
            ctId:'', //从合同管理列表点击收款赋值
            showButton:true,
            addNewPayment:false,
            ht_receipt_detail_type:[],
            ht_receipt_business_type: [],
            teacherLists: [],
            studentNameLists: [],
            form:{
                student: {},
                ctNo: '',
                ctId: '',
                officeId: '',
                accountDeductionAmount: '', //抵扣金额：
                studentId: '', //变更为cusId
                studentName:'',
                businessType: '', //业务类型
                curReceipt: '', //收款金额
                kind: '', //收款方式
                voucherNo: '', //收款凭证号
                receiptTime: '', //收款日期
                remarks: '',
                recepitor: '',
                curRemainPay: null, //剩余应收余额
            },
            formCopy: {},
            formRule:{
                studentId: {required: true, message: this.$t('pushsettings_index_507'), trigger: 'change'},
                officeId: {required: true, message: this.$t('pushsettings_index_507'), trigger: 'change'},
                recepitor: {required: true, message: this.$t('pushsettings_index_507'), trigger: 'change'},
                // ctNo: {required: true, message: '需要关联我的合同！', trigger: 'click'},
                kind: {required: true, message: this.$t('pushsettings_index_507'), trigger: 'change'},
                curReceipt: [
                    {required: true, message: this.$t('scoretemplate_compontents_scoremodify_528'), trigger: 'blur'},
                    { pattern:  /^\d+(\.\d{0,2})?$/g, message: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5056'), trigger: 'blur' }
                ],
                receiptTime: {required: true, message: this.$t('pushsettings_index_507'),type: 'date', trigger: 'change'},
                businessType: {required: true, message: this.$t('pushsettings_index_507'), trigger: 'change'},
            },
            editFlag: false,
            studentId: '',
            beforeToday: {
                disabledDate (date) {
                    return date && date.valueOf() > Date.now();
                }
            },
            businessTypeDisable: false
        }
    },
    computed: {
        ...mapState(["userInfo", "app"])
    },
    components: {
        chooseContract
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        businessTypeChange(val){
            if(val != 'tuition' && !this.studentDisabled){ //如果切换为预存款并且不是从合同管理打开的
                this.showButton = true
                this.form.ctNo = '';
                this.form.ctId = '';
                this.form.curRemainPay = 0;
            }
        },
        remoteMethod(query) {
            if(this.isFromContractManage){ //如果是从合同管理打开的，则不进行搜索
                return
            }
            if (query !== '') {
                this.loadingStudent = true;
                this.debounce(query);
            } else {
                this.studentNameLists = [];
            }
        },
        debounce(query) {
            // 防抖 500ms内没有输入文字，才开始查询，防止多次发起请求
            if(this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                this.getStudentLists(query);
            }, 1000);
        },
        getStudentLists(str, cusId, studentId) { //从合同管理打开的，cusId/studentId
            let params = {
                term: str
            }
            htContractNew.searchCtCusList(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.loadingStudent = false;
                    let _data = res.data.data;
                    this.studentNameLists = _data;
                    if(cusId){ // 从合同管理打开收款，带着cusId
                        this.searchDropList({
                            value: cusId,
                        }, (obj) => {
                            this.form.studentId = cusId
                            this.formCopy.studentId = cusId
                            this.formCopy.student = obj
                            if(studentId) {
                                this.studentId = studentId
                                this.getStudentAccountInfo();
                            }
                        })
                    }
                }
            })
            .catch(errors.call(this));
        },
        choicesStudent(item) {
            console.log(item,'~~~~~~~')
            // 选择下拉中的学生
            if(item && item.label){
                this.form.studentId = item.value;
                // item: {
                //     value: "2c960235e8764174ae343eb9b6975be3"
                //     label: "Yona测试"
                //     tag: undefined
                // }
                this.form.studentName = item.label.replace(/^\s*|\s*$/g,"");
                this.searchDropList(item, (obj) => {
                    this.studentId = obj.id;
                    this.getStudentAccountInfo();
                })
            } else {
                return false;
            }
        },
        searchDropList(item, callback) {
            // 查找学生全部信息
            htContractNew.searchStudent({term: item.value})
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.form.student = res.data.data
                    callback && callback(res.data.data)
                }
            })
            .catch(errors.call(this));
        },
        getStudentAccountInfo() {
            if(!this.studentId) {
                // 没有studentId
                return false;
            }
            let params={
                studentId:this.studentId,
                officeId:this.form.officeId
            };
            common.comStudentGetStudentAccountInfo(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.deductibleAmount=res.data.data;
                }
            })
            .catch(errors.call(this));
        },
        //取消合同关联
        closeLink(){
            this.showButton = true
            this.form.ctNo = '';
            this.form.ctId = '';
            this.form.accountDeductionAmount = '';
        },
        contractId(item){
            // console.log(item)
            if(item){
                this.showButton = false
                this.form.ctNo = item.ctNo;
                this.form.ctId = item.ctId;
                this.form.curRemainPay = item.sparePrice;
                this.form.officeId = item.officeId;
            }else{
                this.showButton = true
            }
        },
        formatNums(val){
            //格式化数字
            // if(val !== undefined){
            //     let newNum = Number(val).toFixed(2).toString();
            //     let prev = newNum.split('.')[0]
            //     let next = newNum.split('.')[1]
            //     prev = prev.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
            //     newNum = prev+'.'+ next;
            //     return newNum;
            // } else {
            //     return 0
            // }
            return val ? Number((val - 0).toFixed(4)) : 0
        },
        addNewPaymentFn(key){
            this.businessTypeDisable = !true
            this.addNewPayment = true
        },
        cancel(){
            let _edit = false;
            let _form = Object.assign({}, this.form);
            _form.receiptTime = new Date(this.form.receiptTime).format('yyyy-MM-dd')
            Object.keys(_form).map(key => {
                if(_form[key] != this.formCopy[key]) {
                    // console.log(key)
                    // console.log(_form[key])
                    // console.log(this.formCopy[key])
                    // console.log(key, _form[key], this.formCopy[key], _form, this.formCopy)
                    _edit = true;
                }
            })
            if(_edit && this.editFlag) {
                // 编辑状态，有修改未保存
                this.modal1 = true;
            } else {
                this.$refs['form'].resetFields();
                this.addNewPayment = false
                this.showButton = true
            }
        },
        submit(){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.saveReceipt();
                } else {
                    this.$Message.error(this.$t('views_approvalnotice_approvalset_addapproval_291'));
                }
            })
        },
        cancelEdit() {
            this.modal1 = false;
            this.cancel();
        },
        saveEdit() {
            this.modal1 = false;
            // this.
            // this.submit();
        },
        saveReceipt() {
            if(this.isActioning){ //多次提交拦截
                return
            }
            // 电子账户，判断收款金额 <= 电子账户余额
            let kindType = this.form.kind;
            let money = 0
            if(kindType == 'electronic account deposit') money = this.deductibleAmount.moneyDeposit
            else if(kindType == 'suspension balance') money = this.deductibleAmount.moneyRefund
            else if(kindType == 'change balance') money = this.deductibleAmount.moneyRepackage
            else money = this.deductibleAmount.moneyTransfer
            if(this.formatNums(money - this.form.accountDeductionAmount) < 0) {
                this.$Message.error(this.$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6989'))
                return false
            }
            this.isActioning = true
            this.updateLoadingStatus({ isLoading: true });
            let params = Object.assign({}, this.form);
            if(this.findType(this.form.kind)) params.curReceipt = 0;
            // 收款金额 == 页面显示的剩余应收金额
            if(this.formatNums(this.form.curRemainPay) == this.form.curReceipt) {
                params.curReceipt = this.form.curRemainPay;
            }
            params.receiptTime = new Date(params.receiptTime).format('yyyy-MM-dd hh:mm:ss')
            htReceipt.saveReceipt(params)
            .then(valid.call(this))
			.then(res => {
				if (res.ok) {
                    this.$refs['form'].resetFields();
                    let _data = res.data.data;
                    this.addNewPayment = false
                    this.form.ctNo = ''
                    this.showButton = true;
                    this.$Message.success(this.$t('pushsettings_29'));
                    this.$emit('uploadLists')
				}
			})
            .catch(errors.call(this))
            .finally(() => {
                setTimeout(()=>{
                    //多次提交拦截
                    this.isActioning = false
                },200)
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        chooseMyContract(){
            if(this.studentId) this.$refs.chooseContract.showMyPop();
            else this.$Message.error(this.$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6991'))
        },
        showPopFromWorkbench(stuName, stuId, ctId) {
            // 工作台
            // console.log(stuName, stuId, ctId)
            this.initForm();
            this.isFromContractManage = true;
            this.getStudentLists(stuName, stuId);
            this.getContractsLists(stuId, ctId);
            this.title = this.$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6984');
            this.editFlag = false;
            this.businessTypeDisable = !true
            this.addNewPayment = true
        },
        getContractsLists(stuId, ctId) {
            let params = {
                studentId: stuId,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                statusFlag: 0,
                status: 'unpay,paying'
            }
            htContract.listContractsWithJwTeacher(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    let _returnItem = null;
                    let filterData = _data.list.filter(function(item){
                        return item.ctId == ctId;
                    });
                    if(filterData && filterData.length) _returnItem = filterData[0];
                    this.contractId(_returnItem);
                }
            })
            .catch(errors.call(this));
        },
        showPop(obj){
            this.initForm();
            if(obj){ //处理从合同管理打开弹框。初始化学生、合同数据
                let {ctNo, ctId, cusId, studentName, sparePrice, additionInfo, officeId} = obj
                this.isFromContractManage = true
                this.showButton = false
                this.studentDisabled = true
                this.ctNo = ctNo
                this.ctId = ctId
                this.form.ctId = ctId
                this.form.ctNo = ctNo
                this.form.curRemainPay = sparePrice
                this.form.officeId = officeId
                this.studentId = additionInfo.id
                this.form.businessType = 'tuition'
                this.businessTypeDisable = true
                this.getStudentLists(studentName, additionInfo.id, cusId)
            } else {
                this.businessTypeDisable = !true
                this.studentDisabled = false;
            }
            this.title = this.$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6984');
            this.editFlag = false;
            this.addNewPayment = true
        },
        edit(id) {
            this.$refs['form'].resetFields();
            this.title = this.$t('modules_expandrow_15');
            this.getForm(id);
            this.init();
            this.editFlag = true;
            this.studentDisabled = false;
            this.addNewPayment = true;
            this.businessTypeDisable = !true
        },
        // 1--
        // 学员管理 - 账务 - 预存
        showPopFromInformation(student) {
            // console.log(student)
            if(student.studentId && student.cusId && student.studentName) {
                this.initForm();
                this.editFlag = false;
                this.studentDisabled = true;
                this.addNewPayment = true;
                this.form.businessType = 'prestored';//预存款
                this.getStudentLists(student.studentName, student.cusId, student.studentId);
                setTimeout(() => {
                    this.form.studentId = student.cusId;
                    this.studentId = student.studentId
                }, 0);
            }
        },
        // 1--
        // 学员管理 - 账务 - 收款
        showPopFromContractItem(student) {
            // console.log('showPopFromContractItem', student)
            if(student.studentId && student.studentName && student.contract) {
                this.initForm();
                this.editFlag = false;
                this.studentDisabled = true;
                this.addNewPayment = true;
                this.form.businessType = 'tuition';//合同学费
                this.businessTypeDisable = true
                this.getStudentLists(student.studentName, student.cusId, student.studentId);
                if(student.contract.no) {
                    this.showButton = false
                    this.form.ctNo = student.contract.no;
                    this.form.ctId = student.contract.ctId;
                    this.form.curRemainPay = student.contract.sparePrice;
                }
                setTimeout(() => {
                    this.form.studentId = student.cusId;
                    this.studentId = student.studentId
                }, 0);
            }
        },
        init(flag) {
            this.dataScopeFilter();
            this.baseData();
            if(flag) {
                waitUntil (()=>{
                    return this.app.currOfficeId || false;
                },()=>{
					if(this.app.currOfficeId=='all'){
						this.form.officeId = '';
					}else{
						this.form.officeId = this.app.currOfficeId;
					}
                    this.listRoleUser();
                });
            }
            if(!this.editFlag) this.form.recepitor = this.userInfo.id;
        },
        initForm() {
            this.form = {
                student: {},
                ctNo: '',
                ctId: '',
                officeId: '',
                accountDeductionAmount: '', //抵扣金额：
                studentId: '',
                studentName:'',
                businessType: '', //业务类型
                curReceipt: '', //收款金额
                kind: '', //收款方式
                voucherNo: '', //收款凭证号
                receiptTime: '', //收款日期
                remarks: '',
                recepitor: '',
                curRemainPay: null, //剩余应收余额
            }
            this.studentId = ''
            this.init(true);
        },
        dataScopeFilter() {
            // 获取校区列表
            sysUser.dataScopeFilter({
				menuId: this.pId
			})
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
                    this.schoolList = res.data.data;
				}
			})
			.catch(errors.call(this));
        },
        baseData() {
			let types = [
                'ht_receipt_business_type', //业务类型
                'ht_receipt_detail_type', //支付方式
            ]
			sysDict.batchListData({
				types: types.join(',')
			})
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
                    let _data = res.data.data;
					this.ht_receipt_business_type = _data.ht_receipt_business_type
					this.ht_receipt_detail_type = _data.ht_receipt_detail_type
				}
			})
            .catch(errors.call(this));
        },
        changeOfficeId() {// 修改校区
            // 重新获取收款人
            this.listRoleUser();
            // 重新获取学员账户信息
            if(!this.form.studentId || !this.form.officeId) {
                return false;
            }
            this.getStudentAccountInfo()
        },
        listRoleUser() {
            if(this.form.officeId) {
                let params = {
                    officeIds: this.form.officeId=='all'?'':this.form.officeId,
                    joinScope: 'ads,jur,cro'
                }
                sysUser.listPageOfficeScopeUser(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.teacherLists = res.data.data;
                    }
                })
                .catch(errors.call(this));
            }
        },
        getForm(id) {
            htReceipt.form({id: id})
            .then(valid.call(this))
            .then(res=>{
                if(res.ok){
                    let _data = res.data.data;
                    _data.receiptTime = new Date(_data.receiptTime).format('yyyy-MM-dd')
                    _data.curReceipt = Number(_data.curReceipt) + '';
                    if(_data.ctNo) {
                        this.showButton = false;
                    }
                    // setTimeout(() => {
                        this.getStudentLists(_data.studentName, _data.cusId);
                    // }, 100);
                    // console.log(_data.kind)
                    if(this.findType(_data.kind)) {
                        this.computedMoney = 0;
                        _data.curReceipt = _data.accountDeductionAmount + '';
                    } else {
                        this.computedMoney = _data.curReceipt;
                    }
                    this.form = _data;
                    this.formCopy = Object.assign({}, _data);
                    this.listRoleUser();
                }
            })
            .catch(errors.call(this))
        },
        changeKind(item) {
            // console.log(item)
            this.accountDeductionAmountLabel = this.findType(this.form.kind) ? item.label : '';
            this.changeCurReceipt();
        },
        changeCurReceipt() {
            // console.log(this.form.kind)
            if(this.findType(this.form.kind)) {
                this.form.accountDeductionAmount = this.form.curReceipt;
            } else {
                this.computedMoney = this.form.curReceipt;
                this.form.accountDeductionAmount = '';
            }
        },
        findType(str) {
            let arr = [
                'electronic account deposit',
                'suspension balance',
                'transfer balance',
                'translate office balance',
                'change balance',
            ]
            if(arr.indexOf(str) > -1) {
                return true
            } else {
                return false
            }
        },
        goDetail(form) {
            // console.log(form)
            this.$router.push({
                name:'sign.pactDetails',
                query:{
                    id:form.ctId,
                    ctNo:form.ctNo,
                }
            })
        },
    },
    watch: {
        'app.currOfficeId': function(val, oldVal) {
            //合同详情页打开的。不执行监听
            if(oldVal && !this.ctNo && this.$route.name == "sign.receiptManagement") {
                if(this.app.currOfficeId=='all'){
                    this.form.officeId = ''
                }else{
                    this.form.officeId = this.app.currOfficeId;
                }
                this.listRoleUser();
            }
        }
    }
}
</script>
