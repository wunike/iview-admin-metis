<style lang="less">
.fontS {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
}
.clear() {
    zoom: 1;
    &::before, &::after{
        content: '';
        display: block;clear: both;height: 0;line-height: 0;font-size: 0;
    }
}
.lookInfo {
    .personalInfo {
        padding: 20px 0 4px 40px;margin-bottom: 24px;
        .clear();
        background: #F2F3F7;
        & > div{
            float: left;margin-bottom: 16px;height: 21px;
            &:nth-child(3n + 1) {
                width: 112px + 169px;
            }
            &:nth-child(3n + 2) {
                width: 66px + 231px;
            }
            &:nth-child(3n) {
                width: 154px + 70px;
            }
            span:nth-child(1) {
                .fontS;
            }
            span:nth-child(2) {
                font-size: 14px;
                font-family: HiraginoSansGB-W3;
                font-weight: normal;
                color: rgba(73, 80, 96, 1);
            }
        }
    }
    .ivu-form-inline{
        margin-bottom: -19px;
    }
    .ivu-form-inline .ivu-form-item{
        margin-right: 0;width: 100% / 3;margin-bottom: 20px;
        .ivu-input-wrapper,
        .ivu-select,
        .ivu-date-picker, 
        .ivu-input-number {
            width: 156px;
        }
    }
    .ivu-form .ivu-form-item-label {
        font-size: 14px;color: #999;
    }
    .personalInput {
        display: flex;
        // justify-content: space-between;
        > div {
            display: flex;
            flex: 1;
            height: 32px;
            line-height: 32px;
            // margin-left: 42px;
            margin-bottom: 20px;
            > span {
                width: 112px;
                text-align: right;
                .fontS;
                .redStyle {
                color: red;
                }
            }
            > .ivu-input-wrapper,
            > .ivu-select,
            > .ivu-date-picker, 
            > .ivu-input-number {
                width: 250px;
            }
        }
    }
}
</style>
<template>
<!-- 
1016 【COS正式服】退费流程，详情，显示加上数据
1. 合同编号，合同类型（新签，续签，新签MKT，新签REF）
2. 退费课程名称
3. 退费课程原课时数。原课时单价：
4. 折后单价。
 -->
    <div class="lookInfo">
        <div class="personalInfo">
            <div>
                <span>{{$t('modules_spoc_sign_web_src_modules_preview_4895')}}</span>
                <span>{{studentInformation.ctNo || '-'}}</span>
            </div>
            <div>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5027')}}</span>
                <span>{{studentInformation.category || '-'}}</span>
            </div>
            <div>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5028')}}</span>
                <span>{{studentInformation.itemName || '-'}}</span>
            </div>
            <div>
                <span>{{$t('modules_spoc_jw_web_src_views_approval_jwapprovaldetial_2265')}}</span>
                <span>{{curStudent.name}}</span>
            </div>
            <div>
                <span>{{$t('messagemanagement_components_infos_322')}}</span>
                <span>{{curStudent.gradeLabel || '-'}}</span>
            </div>
            <div>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5031')}}</span>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5032', [studentInformation.leftCourseHour])}}</span>
            </div>
            <div>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5033')}}</span>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5032', [studentInformation.courseHourNum])}}</span>
            </div>
            <div>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5034')}}</span>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5032', [studentInformation.leftCourseHour])}}</span>
            </div>
            <div>
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_index_1116')}}</span>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5032', [studentInformation.itemPresentNumTotal])}}</span>
            </div>
            <div>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5036')}}</span>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5032', [studentInformation.itemPresentNumLeft])}}</span>
            </div>
            <div>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5037')}}</span>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5038', [studentInformation.publicUnitPrice])}}</span>
            </div>
            <div>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5039')}}</span>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5038', [studentInformation.courseUnitPrice])}}</span>
            </div>
            <!--  -->
            <div>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5040')}}</span>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5041', [formatNums(studentInformation.refundableAmount)])}}</span>
            </div>
            <div>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5042')}}</span>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5041', [formatNums(studentInformation.refundAmount)])}}</span>
            </div>
            <div>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5043')}}</span>
                <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5041', [params.curReceipt ? 
                    ( formatNums((studentInformation.refundableAmount *10000 - params.curReceipt *10000 + Number(params.penalPrice) *10000 + Number(params.giftPrice) *10000)/10000) < 0 ? 0 : formatNums((studentInformation.refundableAmount *10000 - params.curReceipt *10000 + Number(params.penalPrice) *10000 + Number(params.giftPrice) *10000)/10000)) 
                    : studentInformation.refundableAmount])}}
                    </span>
            </div>
        </div>
        <Form ref="formInline" :model="params" :rules="ruleInline" inline :label-width="123">
            <FormItem prop="kind" :label="$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5044')">
                <Select v-model="params.kind" @on-change="changeStatus">
                    <Option v-for="item in ht_receipt_out_kind" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem prop="receiptTime" :label="$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5045')" style="width: 66%">
                <DatePicker type="date" @on-change="changeStatus" v-model="params.receiptTime" :clearable="false" :editable="false" :placeholder="$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5046')" style="display:block;"></DatePicker>
            </FormItem>
            <FormItem prop="bank" :label="$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5047')">
                <Input v-model="params.bank" @on-change="changeStatus"/>
            </FormItem>
            <FormItem prop="account" :label="$t('views_staff_components_lefttree_646')">
                <Input v-model="params.account" @on-change="changeStatus"/>
            </FormItem>
            <FormItem prop="accountName" :label="$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5049')">
                <Input v-model="params.accountName" @on-change="changeStatus"/>
            </FormItem>
            <FormItem prop="curReceipt" :label="$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5050')">
                <Input v-model="params.curReceipt" @on-change="computedCurReceipt">
                    <span slot="append">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                </Input>
            </FormItem>
            <FormItem prop="penalPrice" :label="$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5052')">
                <Input v-model="params.penalPrice" @on-change="computedCurReceipt">
                    <span slot="append">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                </Input>
            </FormItem>
            <FormItem prop="giftPrice" :label="$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5053')">
                <Input v-model="params.giftPrice" @on-change="computedCurReceipt">
                    <span slot="append">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                </Input>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import valid, { errors, sysDict } from "../../../libs/request";
export default {
    props: {
        ht_receipt_out_kind: {
            type: Array,
            required: true
        },
        studentInformation: {
            type: Object,
            required: true
        },
        curStudent: {
            type: Object,
            required: true
        }
    },
    data() {
        const validateCurReceipt = (rule, value, callback) => {
            if (!value) {
                callback(new Error(this.$t('scoretemplate_compontents_scoremodify_528')));
            } else {
                let flag = /^\d+(\.\d{0,2})?$/g.test(value)
                if(!flag) callback(new Error(this.$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5056')));
                else callback();
            }
        };
        return {
            // ht_receipt_out_kind: [],
            params: {
                kind: '',
                receiptTime: '',
                bank: '',
                account: '',
                accountName: '',
                curReceipt: null,
                giftPrice: null,
                penalPrice: null
            },
            changed: false,
            ruleInline: {
                kind: { required: true, message: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5054'), trigger: 'change' },
                receiptTime: { required: true, type: 'date', message: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5046'), trigger: 'change' },
                curReceipt: [
                    { validator: validateCurReceipt, trigger: 'blur' },
                ],
                penalPrice: { pattern:  /^\d+(\.\d{0,2})?$/g, message: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5056'), trigger: 'blur' },
                giftPrice: { pattern:  /^\d+(\.\d{0,2})?$/g, message: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5056'), trigger: 'blur' }
            },
            formCopy: {},
        }
    },
    methods: {
        initParams(params) {
            // 从我的合同审批 - 详情 - 重新提交 - 初始化
            this.init();
            this.params = Object.assign({}, params);
            this.params.receiptTime = new Date(this.params.receiptTime);
            this.params.curReceipt = this.params.curReceipt - 0;
            this.params.penalPrice = this.params.penalPrice - 0;
            this.params.giftPrice = this.params.giftPrice - 0;
            this.computedCurReceipt();
        },
        init() {
            this.$refs.formInline.resetFields();
        },
        submitError() {
            this.changed = true;
        },
        onNext() {
            if(this.changed) {
                this.changed = false;
                console.log(this.formatNums((this.studentInformation.refundableAmount *10000 - this.params.curReceipt *10000)/10000), this.studentInformation.refundableAmount)
                let params = Object.assign({
                    remainderIncomeAmount: this.params.curReceipt ? this.formatNums((this.studentInformation.refundableAmount *10000 - this.params.curReceipt *10000)/10000) : this.studentInformation.refundableAmount,
                    refundableAmount: this.studentInformation.refundableAmount,
                    refundAmount: this.studentInformation.refundAmount,
                    refundableHours: this.studentInformation.leftCourseHour,
                    curRefundHours: this.studentInformation.leftCourseHour,
                }, this.params)

                if(this.params.curReceipt) {
                    params.curReceipt = this.formatNums(this.params.curReceipt) == this.formatNums(this.studentInformation.refundableAmount) ? this.studentInformation.refundableAmount : this.params.curReceipt;
                }
                return params;
            }
            else return {};
        },
        changeStatus() {
            this.changed = true;
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
            // }
            let num = 0;
            if(val) num = Number(parseFloat(val).toFixed(4).toString())
            return num;
        },
        computedCurReceipt() {
            this.changeStatus();
            let num1 = this.formatNums(this.params.curReceipt) == this.formatNums(this.studentInformation.refundableAmount) ? Number(this.studentInformation.refundableAmount) : Number(this.params.curReceipt);
            // let num1 = this.params.curReceipt ? Number(this.params.curReceipt) : 0;
            let num2 = this.params.penalPrice ? Number(this.params.penalPrice) : 0;
            let num3 = this.params.giftPrice ? Number(this.params.giftPrice) : 0;
            let num = num1 - num2 - num3;
            num = this.formatNums(num);
            this.$emit('changeCurReceipt', num > 0 ? num : 0)
        },
        handleSubmit () {
            let obj = undefined;
            this.$refs.formInline.validate((valid) => {
                console.log('退费第二步验证',valid)
                if (valid) {
                    obj = this.onNext();
                }
            });
            return obj
        },
    }
};
</script>
