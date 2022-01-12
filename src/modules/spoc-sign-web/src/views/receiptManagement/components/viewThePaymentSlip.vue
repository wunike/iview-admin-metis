<style lang="less">
    @comColor:#495060;

    .flex-row{
        display: flex;
        flex-direction: row;
    }

    .view-payment{
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
        .ivu-modal-body{
            padding:24px 10px 24px 20px!important;
            font-size:14px!important;
            color:@comColor;
        }
        .ivu-input{
            font-size:14px!important;
        }
        .ivu-modal-footer{
            padding:10px 24px!important;
        }

        b{
            font-weight: normal;
        }
        .pay-top{
            border-bottom:1px solid #E6E7EB;
        }
        .pay-bottom{
            padding-top:20px;
        }
        .pay-line{
            .flex-row;
            justify-content: flex-start;
            align-items: flex-start;
            margin-bottom:16px;
           .pay-line-item{
                width:33%;
                text-indent: 4px;
                .flex-row;
                justify-content: flex-start;
                align-items: flex-start;
                font-size:14px;
            }
            span{
                color:#999;
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
    <div class="view-payment-container">
        <!--<div>-->
            <!--<Button @click="viewThePaymentSlipFn(1)">{{$t('modules_spoc_sign_web_router_4754')}}</Button>-->
        <!--</div>-->
        <Modal
                class="view-payment"
                width="800"
                v-model="viewThePaymentSlip"
                :mask-closable="false"
                @on-cancel="cancel"
                :title="$t('modules_spoc_sign_web_router_4754')">
            <div class="pay-top">
                <div class="pay-line">
                    <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_performanceallocation_7008')}}</span><b>{{pay.no || '-'}}</b></div>
                    <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_viewthepaymentslip_7043')}}</span><b><a v-if="pay.status">{{pay.status | coputedAudit}}</a><span v-else>-</span></b></div>
                    <!-- <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_performanceallocation_7010')}}</span><b>{{pay.arrival_time || '-'}}</b></div> -->
                    <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6971')}}</span><b>{{pay.typeLabel || '-'}}</b></div>
                </div>
                <div class="pay-line">
                    <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6974')}}</span><b><a class="moneyNum">{{formatNums(pay.curReceipt) || '-'}}</a> </b>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</div>
                    <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6973')}}</span><b>{{pay.voucherNo || '-'}}</b></div>
                    <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6977')}}</span><b>{{pay.businessTypeLabel || '-'}}</b></div>
                </div>
                <div class="pay-line">
                    <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6975')}}</span><b>{{pay.arrivalTime || '-'}}</b></div>
                </div>
                <div class="pay-line" style="margin-bottom:20px;">
                    <div class="pay-line-item" style="width: 100%;"><span style="width:75px;display:block ">{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_viewthepaymentslip_7051')}}</span><b style="width: 656px;display:block ">
                        {{pay.remarks || '-'}}
                    </b></div>
                </div>
            </div>
            <div class="pay-bottom">
                <div class="pay-line">
                    <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_viewthepaymentslip_7052')}}</span><b>{{pay.studentName || '-'}}</b></div>
                    <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6957')}}</span><b>{{pay.officeName || '-'}}</b></div>
                    <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6961')}}</span><b><a @click="goDetail(pay)" v-if="pay.ctNo">{{pay.ctNo}}</a><span v-else>-</span></b></div>
                </div>
                <div class="pay-line">
                    <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_viewthepaymentslip_7055')}}</span><b><a class="moneyNum">{{formatNums(pay.curRemainPay)}}</a></b>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</div>
                    <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5885')}}</span><b><a class="moneyNum">{{formatNums(pay.accountDeductionAmount)}}</a>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</b>
                        <Poptip style="text-indent: 2px;"  placement="bottom" min-width="220" :transfer="true" v-if="pay.accountDeductionAmount">
                            <i style="color:#999;font-size:12px;margin-left:0px;" class="iconfont icon-bangzhu1"></i>
                            <div  class="poptip-pay" slot="content">
                                <div class="pay-line-item"><span>{{pay.kindLabel}}：</span><b>{{pay.accountDeductionAmount}}</b></div>
                                <!-- <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6966')}}</span><b>{{pay.deductibleAmountInfo.changePackage}}</b></div>
                                <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6967')}}</span><b>{{pay.deductibleAmountInfo.prestored}}</b></div>
                                <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6968')}}</span><b>{{pay.deductibleAmountInfo.turnCenter}}</b></div>
                                <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_viewthepaymentslip_7060')}}</span><b>{{pay.deductibleAmountInfo.integral}}</b></div> -->
                            </div>
                        </Poptip>
                    </div>
                    <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6959')}}</span><b>{{pay.recepitorName || '-'}}</b></div>
                </div>
                <div class="pay-line" style="margin-bottom:0;">
                    <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_viewthepaymentslip_7062')}}</span><b>{{pay.auditerName || '-'}}</b></div>
                    <div class="pay-line-item"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_viewthepaymentslip_7063')}}</span><b>{{pay.financeReceiptTime || '-'}}</b></div>
                </div>
            </div>
            <div slot="footer">
                <div class="footer-pays"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6974')}}</span><a class="moneyNum">{{formatNums(pay.curReceipt)}}</a><span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span></div>
                <Button @click="cancel">{{$t('classroom_exchange_105')}}</Button>
                <Button type="primary" @click="submit">{{$t('sign.performanceAllocation')}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
/**
 **@date: 2019/5/30 10:51
 **@author: lizhi
 **@filename: viewThePaymentSlip.vue
 * 查看收款单
*/
import valid, { errors, htReceipt } from "../../../libs/request";
export default {
    name: 'viewThePaymentSlip',
    data() {
        return {
            viewThePaymentSlip:false,
            pay:{},
            id: ''
        }
    },
    methods: {
        showPop(id){
            this.id = id;
            this.getForm();
            this.viewThePaymentSlip = true
        },
        getForm() {
            htReceipt.form({id: this.id})
            .then(valid.call(this))
            .then(res=>{
                if(res.ok){
                    let _data = res.data.data;
                    this.pay = _data;
                }
            })
            .catch(errors.call(this))
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
            return val || 0;
        },
        cancel(){
            this.id = '';
            this.pay = {};
            this.viewThePaymentSlip = false
        },
        submit(){
            this.$emit('closePop', this.id);
            this.cancel();
        },
        goDetail(pay) {
            // console.log(pay)
            this.$router.push({
                name:'sign.pactDetails',
                query:{
                    id:pay.ctId,
                    ctNo:pay.ctNo,
                }
            })
        },
    },
    filters: {
        coputedAudit: function (value) {
            let val = '';
            // if(value == 0) val = this.$t('mycourse_mycourse_386');
            // else if(value == 1) val = this.$t('spoc_hootie_web_19');
            // else if(value == 2) val = this.$t('spoc_hootie_web_20');
            // return val
            if(value == 0) val = '待审批';
            else if(value == 1) val = '审批通过';
            else if(value == 2) val = '审批不通过';
            return val
        }
    }
}
</script>
