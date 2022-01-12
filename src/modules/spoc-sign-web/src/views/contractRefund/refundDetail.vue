<style lang="less">
.refund-detail-wrapper{
    width: 100%;margin-top: -4px;
    .fl{
        float: left;
    }
    .clear{
        zoom: 1;
        &::before, &::after{
            content: '';
            display: block;clear: both;height: 0;line-height: 0;font-size: 0;
        }
    }
    .detail-top{
        margin: 0 24px 20px;
        padding: 11px 20px 13px;
        background: #F7F8FA;
        .clear;
    }
    .top-item{
        @h: 36px;
        float: left;width: 100% / 3;
        height: @h;line-height: @h;
        font-size: 14px;
        &.item-block{
            width: 100%;
        }
        span{
            .fl;
            color: #999;
        }
        div{
            .fl;
        }
    }
    .responsibility{
        margin: 0 24px 14px;
        height: 208px;
        display: flex;
        justify-content: space-between;
        .responsibility-item{
            flex: 1;
            height: 208px;
            width: 470px;
            border: 1px solid #D4D5DA;
            &:nth-child(1) {
                margin-right: 6px;
            }
            &:nth-child(2) {
                margin-left: 6px;
            }
            .title{
                @h: 51px;
                height: @h;line-height: @h - 1px;border-bottom: 1px solid #D4D5DA;
                padding-left: 24px;
                font-weight: bold;
            }
            .detail{
                height: 208px - 51px;overflow-y: auto;
                padding: 17px 24px;
                .iconfont{
                    position: relative;top: 1px;
                    color: #666;
                    margin-right: 8px;
                }
            }
        }
    }
    .other{
        margin: 0 24px;padding-bottom: 10px;
    }
    .other-item{
        @h: 40px;
        min-height: @h;
        position: relative;padding-left: 70px;
        span{
            position: absolute;left: 0;top: 0;width: 70px;
            color: #999;line-height: @h;
        }
        div{
            line-height: 20px;padding: 10px 0;
            word-break: break-all;
            &.receipt-list{
                line-height: @h;padding: 0;
            }
        }
    }
    .receipt-list{
        i{
            font-size: 13px;margin-right: 9px;
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
<div class="refund-detail-wrapper">
    <div class="detail-top">
        <div class="top-item">
            <span>{{$t('modules_spoc_sign_web_src_modules_preview_4895')}}</span>
            <div>{{detail.ctNo || '-'}}</div>
        </div>
        <div class="top-item">
            <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5027')}}</span>
            <div>{{detail.category || '-'}}</div>
        </div>
        <div class="top-item">
            <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5028')}}</span>
            <div>{{detail.htReceiptDetailList[0].itemName || '-'}}</div>
        </div>
        <div class="top-item">
            <span>{{$t('modules_spoc_sign_web_src_views_contractrefund_refunddetail_5826')}}</span>
            <div>{{detail.htReceiptDetailList[0].courseHourNum || '-'}}</div>
        </div>
        <div class="top-item">
            <span>{{$t('modules_spoc_sign_web_src_views_contractrefund_refunddetail_5827')}}</span>
            <div>{{detail.htReceiptDetailList[0].publicUnitPrice || '-'}}</div>
        </div>
        <div class="top-item">
            <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5039')}}</span>
            <div>{{detail.htReceiptDetailList[0].courseUnitPrice || '-'}}</div>
        </div>
        <div class="top-item">
            <span>{{$t('classroom_exchange_96')}}</span>
            <div>{{detail.studentName || '-'}}</div>
        </div>
        <div class="top-item">
            <span>{{$t('messagemanagement_components_infos_322')}}</span>
            <div>{{detail.gradeLabel || '-'}}</div>
        </div>
        <div class="top-item">
            <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5031')}}</span>
            <div>{{detail.refundableHours || '-'}}</div>
        </div>
        <div class="top-item">
            <span>{{$t('modules_spoc_sign_web_src_views_contractrefund_refunddetail_5832')}}</span>
            <div>{{detail.curRefundHours || '-'}}</div>
        </div>
        <div class="top-item">
            <span>{{$t('modules_spoc_sign_web_src_views_contractrefund_refunddetail_5833')}}</span>
            <div>{{detail.curRefundHours || '-'}}</div>
        </div>
        <div class="top-item">
            <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5040')}}</span>
            <div>{{detail.refundableAmount || '-'}}</div>
        </div>
        <div class="top-item">
            <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5043')}}</span>
            <div>{{detail.remainderIncomeAmount || '-'}}</div>
        </div>
        <div class="top-item">
            <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5044')}}</span>
            <div>{{detail.kindLabel || '-'}}</div>
        </div>
        <div class="top-item">
            <span>{{$t('modules_spoc_sign_web_src_views_contractrefund_refunddetail_5837')}}</span>
            <div>{{detail.receiptTime || '-'}}</div>
        </div>
        <div class="top-item">
            <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5047')}}</span>
            <div>{{detail.bank || '-'}}</div>
        </div>
        <div class="top-item">
            <span>{{$t('views_staff_components_lefttree_646')}}</span>
            <div>{{detail.account || '-'}}</div>
        </div>
        <div class="top-item item-block">
            <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5049')}}</span>
            <div>{{detail.accountName || '-'}}</div>
        </div>
        <div class="top-item">
            <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5050')}}</span>
            <div>{{detail.curReceipt || '-'}}</div>
        </div>
        <div class="top-item">
            <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5052')}}</span>
            <div>{{detail.penalPrice || '-'}}</div>
        </div>
        <div class="top-item">
            <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5053')}}</span>
            <div>{{detail.giftPrice || '-'}}</div>
        </div>
    </div>
    <div class="responsibility">
        <div class="responsibility-item">
            <div class="title">{{$t('modules_spoc_sign_web_src_views_applyrefund_components_responsibility_5057')}}</div>
            <div class="detail">
                <ul v-if="detail.htReceiptDetailPartnerShowVO && detail.htReceiptDetailPartnerShowVO.officeList && detail.htReceiptDetailPartnerShowVO.officeList.length">
                    <li v-for="(item, index) in detail.htReceiptDetailPartnerShowVO.officeList" v-if="item.officeName" :key="index">
                        <i class="iconfont icon-zerenren" v-if="item.isMain == '1'"></i>
                        <span style="color: #999;">{{item.officeName}}</span>：
                        <span style="color: #F5222D;">{{toFixed(item.officePrice)}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</li>
                </ul>
            </div>
        </div>
        <div class="responsibility-item">
            <div class="title">{{$t('modules_spoc_sign_web_src_views_applyrefund_components_responsibility_5060')}}</div>
            <div class="detail">
                <ul v-if="detail.htReceiptDetailPartnerShowVO && detail.htReceiptDetailPartnerShowVO.userList && detail.htReceiptDetailPartnerShowVO.userList.length">
                    <li v-for="(item, index) in detail.htReceiptDetailPartnerShowVO.userList" v-if="item.userName" :key="index">
                        <i class="iconfont icon-zerenren" v-if="item.isMain == '1'"></i>
                        <span style="color: #999;">{{item.userName}}</span>：
                        <span style="color: #F5222D;">{{toFixed(item.userPrice)}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="other">
        <div class="other-item">
            <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_feedback_5016')}}</span>
            <div>{{detail.refundReasonTypeLabel || '-'}}</div>
        </div>
        <div class="other-item" v-if="detail.remark">
            <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_feedback_5018')}}</span>
            <div>{{detail.remark}}</div>
        </div>
        <div class="other-item" v-if="detail.remarks">
            <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_feedback_5020')}}</span>
            <div>{{detail.remarks}}</div>
        </div>
        <div class="other-item">
            <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_feedback_5021')}}</span>
            <div class="receipt-list">
                <ul>
                    <li v-for="item in detail.refundReasonList" class="clear">
                        <i class="iconfont icon-wenjian"></i>
                        <a @click="download(item)">{{item.realName}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        detail: {
            type: Object,
            required: true
        }
    },
    data() {
        return {

        }
    },
    methods: {
        download(file) {
            // console.log(file)
            let a = document.createElement('a');
            a.href = file.filePath; //图片地址
            a.download = file.fileName; //图片名及格式
            document.body.appendChild(a);
            a.click();
        },
        toFixed(num) {
            return Number(num) ? Number(num).toFixed(2) : 0;
        }
    }
}
</script>
