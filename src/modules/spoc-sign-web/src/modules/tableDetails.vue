<style lang="less">
.ap-details {
    /*.ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner {*/
        /*background-color: #44bcb7 !important;*/
        /*border-color: #44bcb7;*/
    /*}*/
    /*.ivu-steps-item.ivu-steps-status-error .ivu-steps-head-inner {*/
        /*background-color: #ed4014 !important;*/
        /*border-color: #ed4014;*/
    /*}*/
    @comColor: #495060;
    .flexRow {
        display: flex;
        flex-direction: row;
    }
    .ivu-tabs-nav {
        padding-top: 25px;
    }
    .ivu-modal-header {
        padding: 17px 24px 16px !important;
        background: #f7f8fa;
        border-radius: 4px;
        .ivu-modal-header-inner {
            font-size: 18px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
        }
    }
    .ivu-input {
        font-size: 14px !important;
    }
    .ivu-modal-footer {
        padding: 10px 24px !important;
    }
    .ivu-input-group-append {
        width: 34px !important;
    }
    .ivu-form-item-label {
        color: #999999 !important;
        font-size: 14px !important;
    }
    .ivu-modal-body {
        padding: 0 !important;
        font-size: 14px !important;
        color: @comColor;
    }
    b {
        font-weight: normal;
    }
    .ap-header {
        background: #f7f8fa;
        padding: 20px !important;
        margin-bottom: 20px;
        .info-line {
            .flexRow;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 18px;
        }
        .info-line-item {
            width: 40%;
            font-size: 14px;
            span {
                color: #999;
            }
            b {
                color: @comColor;
            }
        }
    }
    .historyApproval{
        margin-bottom: 24px;
    }
    .ap-info-item {
        .approval-status{
            display: inline-block;
            // width:49px;
            height:16px;
            line-height: 16px;
            text-align:center;
            background:rgba(255,147,0,1);
            border-radius:4px;
            font-size:12px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
            margin-left:5px;
            margin-top:-2px;
        }
        h2 {
            display: flex;
            flex-direction: row;
            align-items: center;
            b{
                font-size: 14px;
                font-weight: 600;
                color: rgba(73, 80, 96, 1);
            }
        }
        .ap-row1{
            padding: 16px 20px 32px 40px;

        }
        .ap-row {
            padding: 16px 20px 32px 40px;
            .ivu-steps-main {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                .ivu-steps-title{
                    &:after{
                        background:#bbb;
                    }
                }
            }
            .ivu-steps-content {
                padding-left: 0;
            }

            .ivu-steps-head-inner {
                span {
                    display: none;
                }
            }
            .ivu-steps-title {
                margin-top: 8px;

            }
            .ivu-steps-tail {
                top: 5px;
                i{
                    &:after{
                        background: #bbb;
                    }
                }
            }
            .ivu-steps-head-inner {
                background: #bbb!important;
                border-color: #bbb;
                height: 12px;
                width: 12px;
            }
            .content-line {
                color: #495060;
                font-size: 12px;
                font-weight: normal;
                margin: 0;
            }
            .cur{
               .ivu-steps-head{
                   .ivu-steps-head-inner{
                       background: #46BC15!important;
                       border-color: #46BC15;

                   }
               }
            }
            .cur-line{
                .ivu-steps-tail {
                    i{
                        &:after{
                            background: #46BC15;
                        }
                    }
                }
                .ivu-steps-title{
                    &:after{
                        background:#46BC15;
                    }
                }
            }
        }
        .ap-column {
            padding: 16px 0 24px 40px;
            font-size: 12px;
            .ivu-timeline-item-head {
                span {
                    margin-top: 5px !important;
                }
            }
            .time {
                color: #22262c;
                font-weight: bold;
            }
            .content {
                margin-top: 8px;
                color: @comColor;
            }
        }
    }
    .details-box {
        width: 100%;
        display: flex;
        justify-content: flex-start;
    }
}
.ap-details-modules {
    .ivu-modal-header {
        padding: 17px 24px 16px !important;
        background: #f7f8fa;
        border-radius: 4px;
        .ivu-modal-header-inner {
            font-size: 18px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
        }
    }
    .ap-item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        > span {
            display: inline-block;
            width: 93px;
            text-align: right;
            font-size: 14px;
            font-weight: normal;
            color: rgba(153, 153, 153, 1);
            margin-right: 10px;
            margin-top: 10px;
        }
    }
}
</style>

<template>
    <div class="ap-details-container">
        <Modal class="ap-details" :width="(showKey == 'contract translate' && tabValue == 'A')? 692 : 1000" v-model="apDetails" :mask-closable="false" @on-cancel="cancel" :title="detailsTitle">
            <Tabs  v-model="tabValue">
                <TabPane :label="tabLable1" name="A"></TabPane>
                <TabPane :label="$t('courselist_compontents_servicecontent_203')" name="B"></TabPane>
            </Tabs>
            <div v-show="tabValue === 'A'" style="padding-top:4px;">
                <div class="details-box">
                    <jwApprovalDetial ref="jwApprovalDetial" :listData="jwData" v-if="showKey == 'jw drop class'"></jwApprovalDetial>
                    <detialInfo
                        ref="giveClass"
                        :showKey="showKey"
                        :yxqType="yxqType"
                        :listData="listData"
                        :disabledGroup="disabledGroup"
                        v-if="showKey == 'contract present' || showKey == 'contract leave' || showKey == 'contract valid'"
                        style="padding-left: 24px;"
                    ></detialInfo>
                    <popupsInfo @openModal="openModal" ref="contractChangeInfo" v-if="showKey == 'contract change'"></popupsInfo>
                    <turnCenterInfo @openModal="openModal" ref="contractTranslateInfo" :showTab="showTab" v-if="showKey == 'contract translate'"></turnCenterInfo>
                    <takeCourseInfo @openModal="openModal" ref="contractTakeCourseInfo" v-if="showKey == 'contract takeCourse'"></takeCourseInfo>

                    <contractInfo @openModal="openModal" ref="contractInfo" @toContractTraslate="showPop" v-if="showKey == 'contract save'"></contractInfo>
                    <refund-detail ref="refundDetail" :detail="refundDetailData" v-if="showKey == 'contract receipt out'"></refund-detail>
                    <student-accont-detail
                        ref="studentAccontDetailRef"
                        :type="showKey"
                        :detail="studentAccontDetailData"
                        v-if="showKey == 'contract transfer account' || showKey == 'contract withdraw apply'"
                    ></student-accont-detail>
                    <!--                     <editDetail v-if="showKey=='contract leave'||showKey=='contract valid'" ref="editDetail"></editDetail>-->
                </div>
            </div>
            <div v-show="tabValue === 'B'" style="padding:0 24px;">
                <div class="ap-header" v-if="info != null">
                    <div class="info-line">
                        <div class="info-line-item">
                            <span>{{$t('modules_spoc_jw_web_src_views_approval_jwapprovaldetial_2265')}}</span>
                            <b>{{ info.name == null ? '-' : info.name }}</b>
                        </div>
                        <div class="info-line-item">
                            <span>{{$t('modules_spoc_sign_web_src_modules_tabledetails_4917')}}</span>
                            <b>{{ info.enName == null ? '-' : info.enName }}</b>
                        </div>
                        <div class="info-line-item" style="width:20%">
                            <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_719')}}</span>
                            <b>{{ info.birthday == null ? '-' : info.birthday }}</b>
                        </div>
                    </div>
                    <div class="info-line">
                        <!-- <div class="info-line-item">
                            <span>{{$t('messagemanagement_components_infos_320')}}</span>
                            <b>{{ info.officeName == null ? '-' : info.officeName }}</b>
                        </div> -->
                        <div class="info-line-item">
                            <span>{{$t('messagemanagement_components_infos_3201')}}</span>
                            <b>{{ info.signOfficeName == null ? '-' : info.signOfficeName }}</b>
                        </div>
                        <div class="info-line-item">
                            <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentother_1000')}}</span>
                            <b>{{ info.code == null ? '-' : info.code }}</b>
                        </div>
                        <div class="info-line-item" style="width:20%">
                            <span>{{$t('views_staff_components_staffinfo_669')}}</span>
                            <b>{{ info.gender == 'm' ? $t('views_staff_components_staffinfo_670') : info.gender == 'f' ? $t('views_staff_components_staffinfo_671') : '-' }}</b>
                        </div>
                    </div>
                    <div class="info-line" style="margin-bottom:0px;">
                        <div class="info-line-item">
                            <span>{{$t('messagemanagement_components_infos_322')}}</span>
                            <b>{{ info.gradeName == null ? '-' : info.gradeName }}</b>
                        </div>
                    </div>
                </div>
                <div class="ap-info-item" :class="{ historyApproval : (showStatus=='agree'&& !flowJson)}">
                    <h2><b>{{$t('courselist_compontents_servicecontent_212')}}</b> <span :style="{'background':bgColor}" class="approval-status">{{ bgName }}</span><b style="color:red;margin-left:10px;" v-if="(showStatus=='agree'&& !flowJson)">{{$t('historyApproval')}}</b></h2>
                    <div class="ap-row1" v-if="!(showStatus=='agree'&& !flowJson)">
                        <Steps :current="currentRow" size="small" v-if="TMLineRow">
                            <!--:class="[flowC.curNodeOrder == '1' ?'cur-line':'']"-->
                            <Step  :title="$t('modules_spoc_sign_web_src_modules_tabledetails_4926')" content="" >
                                <div class="ivu-steps-title content-line">{{ flowC.officeName }}</div>
                                <div class="ivu-steps-title content-line">{{ flowC.applyTime }}</div>
                            </Step>
                            <!--:class="[index == flowC.curNodeOrder - 1?'cur':'',index == flowC.curNodeOrder - 2?'cur-line':'']"-->

                            <Step :title="item.nodeName"
                                  content="" v-for="(item, index) in TMLineRow"
                                  :key="item.nodeName">
                                <div style="color:#666;"
                                     slot="content"
                                     v-if="index == flowC.curNodeOrder - 1 && item.officeType !== '1'"
                                >{{ flowC.officeName }}</div>
                                <div style="color:#666;"
                                     slot="content"
                                     v-if="index == flowC.curNodeOrder - 1 && item.officeType === '1'"
                                >{{ item.officeTypeName }}</div>
                            </Step>
                        </Steps>
                        <!--<Steps :current="currentRow" size="small" v-if="TMLineRow">-->
                            <!--<Step  :title="$t('modules_spoc_sign_web_src_modules_tabledetails_4926')" content="" :class="[flowC.curNodeOrder == '1' ?'cur-line':'']">-->
                                <!--<div class="ivu-steps-title content-line">{{ flowC.officeName }}</div>-->
                                <!--<div class="ivu-steps-title content-line">{{ flowC.applyTime }}</div>-->
                            <!--</Step>-->
                            <!--<Step :title="item.nodeName" -->
                                  <!--:class="[index == flowC.curNodeOrder - 1?'cur':'',index == flowC.curNodeOrder - 2?'cur-line':'']"-->
                                  <!--content="" v-for="(item, index) in TMLineRow" -->
                                  <!--:key="item.nodeName">-->
                                <!--<div style="color:#666;" -->
                                     <!--slot="content" -->
                                     <!--v-if="index == flowC.curNodeOrder - 1 && item.officeType !== '1'"-->
                                <!--&gt;{{ flowC.officeName }}</div>-->
                                <!--<div style="color:#666;" -->
                                     <!--slot="content" -->
                                     <!--v-if="index == flowC.curNodeOrder - 1 && item.officeType === '1'"-->
                                <!--&gt;{{ item.officeTypeName }}</div>-->
                            <!--</Step>-->
                        <!--</Steps>-->
                    </div>
                </div>
                <div class="ap-info-item" v-if="!(showStatus=='agree'&& !flowJson)">
                    <h2>{{$t('modules_spoc_sign_web_src_modules_tabledetails_4927')}}</h2>
                    <div class="ap-column">
                        <Timeline>
                            <!--:color="-->
                            <!--item.nodeStatus === 'reject' && index < 1-->
                            <!--? '#E72B00'-->
                            <!--: item.nodeStatus === 'agree' && index < 1-->
                            <!--? '#44BCB7'-->
                            <!--: item.nodeStatus === 'auditing' && index < 1-->
                            <!--? '#06A59B'-->
                            <!--: item.nodeStatus === 'unaudit' && index < 1-->
                            <!--? '#44BCB7'-->
                            <!--: item.nodeStatus === 'invalid' && index < 1-->
                            <!--? '#E72B00'-->
                            <!--: item.nodeStatus === 'uncommit' && index < 1-->
                            <!--? '#E72B00'-->
                            <!--: '#999999'-->
                            <!--"-->
                            <TimelineItem

                                v-for="(item, index) in TMLineColumn"
                                :key="item.nodeStatus"
                            >

                                <!--:style="-->
                                <!--item.nodeStatus === 'reject' && index < 1-->
                                <!--? 'background:#E72B00;border:1px solid #E72B00'-->
                                <!--: item.nodeStatus === 'agree' && index < 1-->
                                <!--? 'background:#44BCB7;border:1px solid #44BCB7'-->
                                <!--: item.nodeStatus === 'auditing' && index < 1-->
                                <!--? 'background:#06A59B;border:1px solid #06A59B'-->
                                <!--: item.nodeStatus === 'unaudit' && index < 1-->
                                <!--? 'background:#44BCB7;border:1px solid #44BCB7'-->
                                <!--: item.nodeStatus === 'invalid' && index < 1-->
                                <!--? 'background:#E72B00;border:1px solid #E72B00'-->
                                <!--: item.nodeStatus === 'uncommit' && index < 1-->
                                <!--? 'background:#EABB06;border:1px solid #EABB06'-->
                                <!--: 'background:none;border:1px solid #999999'-->
                                <!--"-->
                                <span
                                    slot="dot"
                                    style="display:inline-block;width:12px;height:12px;border-radius:50%;background:none;border:1px solid #999999"
                                >
                                    &nbsp;
                                </span>
                                <p class="time">
                                    <span>{{ item.auditDate }}</span>
                                    <span style="margin-left:50px;">{{ item.auditorName }}</span>
                                    <span style="color:#666;" v-if="item.officeName">{{ '【' + item.officeName + '】' }}</span>
                                </p>

                                <p class="content">{{ item.nodeStatusName }}{{ item.nodeReason ? ' - ' : '' }}{{ item.nodeReason }}</p>
                            </TimelineItem>
                        </Timeline>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <!--                // uncommit 已撤回  #EABB06
                    // unaudit  待审批   #999999
                    // auditing 审批中  #46BC15
                    // agree  审批通过  #44BCB7
                    // reject  审批不通过  #F5222D
                    // invalid  已作废  #CCCCCC-->
                <Button @click="cancel">{{$t('classroom_exchange_105')}}</Button>
                <Button v-if="showTab == 'B' && (showStatus == 'unaudit' || showStatus == 'auditing')" @click="showReject('reback')" type="primary" style="margin-left: 8px">{{$t('modules_spoc_sign_web_src_modules_tabledetails_4929')}}</Button>
                <Button v-if="showStatus == 'uncommit' || showStatus == 'reject'" @click="reAudit" type="primary" style="margin-left: 8px">{{$t('modules_spoc_sign_web_src_modules_tabledetails_4930')}}</Button>
                <Button v-if="showTab == 'B' && (showStatus == 'uncommit' || showStatus == 'reject')" @click="showReject('invalid')" type="primary" style="margin-left: 8px">{{$t('modules_spoc_sign_web_src_modules_pactcard_4891')}}</Button>
                <Button v-if="showTab == 'A'" @click="showReject('reject')" type="error" style="margin-left: 8px">{{$t('modules_spoc_sign_web_src_modules_tabledetails_4932')}}</Button>
                <Button v-if="showTab == 'A'" @click="submit('agree')" type="primary" style="margin-left: 8px">{{$t('modules_spoc_sign_web_src_modules_tabledetails_4933')}}</Button>
            </div>
        </Modal>
        <Modal class="ap-details-modules" width="600" v-model="apDetailsModules" :mask-closable="false" @on-cancel="cancelAdm" :title="titleName">
            <div class="ap-item">
                <span>{{ label }}</span>
                <Input v-model="reasons" type="textarea" style="width:455px;" :autosize="{ minRows: 4, maxRows: 4 }" :placeholder="placeHolderName" />
            </div>
            <div slot="footer">
                <Button @click="cancelAdm">{{$t('classroom_allscore_53')}}</Button>
                <Button @click="submitAdm" v-if="statusButton == 'reject'" type="error" style="margin-left: 8px">{{ buttonName }}</Button>
                <Button @click="drawAuditBefore" v-if="statusButton == 'reback'" type="primary" style="margin-left: 8px">{{ buttonName }}</Button>
                <Button @click="invalidAuditBefore" v-if="statusButton == 'invalid'" type="primary" style="margin-left: 8px">{{ buttonName }}</Button>
            </div>
        </Modal>
        <apply-refund ref="applyRefundRef" @uploadLists="uploadLists"></apply-refund>
    </div>
</template>

<script>
import valid, { errors, htReceipt, comAuditFlow, htPresentApply, htLeaveApply, htValidApply, htStudentAccount, htTranslateApply } from '../libs/request';
import { jwClassCourse, comAuditFlow as comAuditFlowJw } from '../../../spoc-jw-web/src/libs/request';
import detialInfo from '../views/refundGiveClass/detialInfo.vue'; //赠课
import popupsInfo from '../views/packageChange/pops/popupsInfo.vue'; //改包
import turnCenterInfo from '../views/contractTransferCenter/components/turnCenterInfo.vue'; //转中心
import takeCourseInfo from '../views/contractTransferCenter/components/takeCourseInfo.vue'; //选课
import contractInfo from '../views/contractGeneration/component/contractInfo.vue'; //转中心
import refundDetail from '../views/contractRefund/refundDetail.vue'; //合同退费
import studentAccontDetail from '../views/studentAccont/detail.vue';
import jwApprovalDetial from '../../../spoc-jw-web/src/views/approval/jwApprovalDetial'; //教务退课
// import editDetail from '../views/editLeaveNum/components/editDetail.vue'//请假
import { mapMutations } from 'vuex';
import applyRefund from '../views/applyRefund/applyRefund.vue'; //合同退费编辑弹窗
export default {
    components: {
        detialInfo,
        popupsInfo,
        turnCenterInfo,
        takeCourseInfo,
        contractInfo,
        refundDetail,
        studentAccontDetail,
        jwApprovalDetial,
        applyRefund
    },
    props: {
        detailsTitle: {
            default: '详情信息',//this.$t('modules_spoc_jw_web_src_views_approval_approvalnew_2249'),
            type: String
        }
    },
    data() {
        return {
            yxqType: '',
            isActioning: false, //多次提交拦截
            tabLable1: this.$t('courselist_compontents_servicecontent_202'),
            titleName: '',
            label: '',
            buttonName: '',
            placeHolderName: '',
            statusButton: '',
            tabValue: 'A',
            apDetails: false,
            info: {}, //学生信息
            TMLineColumn: [], //审批进度数组 纵向
            TMLineRow: null, //审批进度 横向
            flowC: {},
            currentRow: 0, //当前进度位置
            apDetailsModules: false,
            reasons: '',
            showKey: '',
            showTab: '',
            showStatus: '',
            flowId: '',
            refundDetailData: {},
            listData: {},
            disabledGroup: '',
            studentAccontDetailData: {},
            jwData: {}, //教务数据
            obj: {},
            flowJson: null, //判断历史数据 showStatus为agree 且 flowJson为null
        };
    },
    computed:{
        bgName(){
          let name =  this.showStatus === 'unaudit'
                ? this.$t('mycourse_mycourse_386')
                : this.showStatus === 'auditing'
                ? this.$t('modules_spoc_jw_web_src_views_approval_approvalnew_2258')
                : this.showStatus === 'agree'
                    ? this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1749')
                    : this.showStatus === 'reject'
                        ? this.$t('mycourse_mycourse_388')
                        : this.showStatus === 'uncommit'
                            ? this.$t('modules_spoc_core_web_src_views_announcement_index_94')
                            : this.showStatus === 'invalid'
                                ? this.$t('modules_spoc_sign_web_src_modules_tabledetails_4942')
                                : ''
            return name;
        },
        bgColor(){
            let color =  this.showStatus === 'unaudit'
                ? '#46BC15'
                : this.showStatus === 'auditing'
                    ? '#44BCB7'
                    : this.showStatus === 'agree'
                        ? '#4494F9'
                        : this.showStatus === 'reject'
                            ? '#FF9300'
                            : this.showStatus === 'uncommit'
                                ? '#C4C6CF'
                                : this.showStatus === 'invalid'
                                    ? '#C4C6CF'
                                    : ''
            return color;
        },
    },
    mounted() {
        console.log(comAuditFlow);
        console.log(comAuditFlowJw);
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        toContractTraslate(obj) {
            console.log(obj,1000)
        },
        showPop(obj, refundFlag) {
            console.log(obj)
            this.obj = obj;
            this.flowId = obj.flowId;
            this.tabValue = 'A';
            this.showKey = obj.key;
            this.showTab = obj.tab;
            this.$nextTick(() => {
                // console.log(obj)
                if (obj.key == 'contract present' || obj.key == 'contract leave' || obj.key == 'contract valid') {
                    this.infoFn(obj);
                } else if (obj.key == 'contract change') {
                    // 改包
                    this.tabLable1 = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4943');
                    this.$refs.contractChangeInfo.editInfo(obj.id);
                } else if (obj.key == 'contract translate') {
                    // 转中心
                    this.tabLable1 = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4944');
                    this.$refs.contractTranslateInfo.editInfo(obj.id);
                } else if (obj.key == 'contract takeCourse') {
                    // 转中心
                    this.tabLable1 = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4945');
                    this.$refs.contractTakeCourseInfo.editInfo(obj.id);
                } else if (obj.key == 'contract save') {
                    // 生成合同
                    this.tabLable1 = this.$t('mycourse_viewstucontent_454');
                    this.$refs.contractInfo.getForm(obj);
                } else if (obj.key == 'contract receipt out' && !refundFlag) {
                    // 合同退费
                    this.tabLable1 = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4947');
                    this.getForm(obj, 1);
                } else if (obj.key == 'contract transfer account') {
                    // 学员转账
                    this.tabLable1 = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4948');
                    this.transferAccountForm(obj.id);
                } else if (obj.key == 'contract withdraw apply') {
                    // 学员提现
                    this.tabLable1 = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4949');
                    this.withdrawForm(obj.id);
                } else if (obj.key == 'jw drop class') {
                    this.getFlows(obj.flowId, 1); //获取审批流信息-教务
                }
            });
            
        },
        openModal(){
            if(this.obj.flowId){
                if (this.obj.key == 'jw drop class') {
                    this.getFlows(this.obj.flowId, 1); //获取审批流信息-教务
                } else {
                    this.getFlows(this.obj.flowId); //获取审批流信息
                }
            } else {
                this.apDetails = true;
            }
        },
        showReject(key) {
            this.apDetailsModules = true;
            this.statusButton = key;
            if (key == 'reject') {
                this.titleName = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4950');
                this.label = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4951');
                this.buttonName = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4932');
                this.placeHolderName = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4952');
            } else if (key == 'reback') {
                this.titleName = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4929');
                this.label = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4953');
                this.buttonName = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4929');
                this.placeHolderName = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4954');
            } else if (key == 'invalid') {
                this.titleName = this.$t('modules_spoc_sign_web_src_modules_pactcard_4891');
                this.label = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4955');
                this.buttonName = this.$t('modules_spoc_sign_web_src_modules_pactcard_4891');
                this.placeHolderName = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4956');
            }
        },
        submitAdm() {
            let str = this.reasons;
            str = str.replace(/^\s$/g, '');
            if (str == '' || str == null) {
                this.$Message.warning(this.$t('modules_spoc_sign_web_src_modules_tabledetails_4957'));
            } else {
                this.submit('reject');
            }
        },
        cancelAdm() {
            this.apDetailsModules = false;
            this.reasons = '';
        },
        getInfosJw(id) {
            //获取教务申请信息
            this.updateLoadingStatus({ isLoading: true });
            let params = {
                auditFlowId: id
            };
            jwClassCourse
                .dropClassDetail(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.jwData = res.data.data;
                    }
                })
                .then(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getFlows(id, isJW) {
            this.updateLoadingStatus({ isLoading: true });
            let params = {
                id: id
            };
            let obj = null;
            if (!!isJW) {
                obj = comAuditFlowJw.cfForm(params);
            } else {
                obj = comAuditFlow.cfForm(params);
            }
            obj.then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.apDetails = true;
                        let obj = res.data.data;
                        if (obj.type == 'jw drop class') {
                            this.tabLable1 = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4958');
                            this.getInfosJw(id);
                        }
                        this.showStatus = obj.status;
                        this.TMLineColumn = obj.comAuditFlowHistoryDetailVOList;
                        this.TMLineRow = JSON.parse(obj.comAuditFlowCurrentDetailVO.flowJson)||[];
                        this.flowJson = obj.comAuditFlowCurrentDetailVO.flowJson
                        this.flowC = obj.comAuditFlowCurrentDetailVO;
                        this.info = obj.comStudentAuditVO;
                        let len = this.TMLineRow.length;
                        if (this.flowC.curNodeOrder == '99' && this.showStatus == 'agree') {
                            this.currentRow = len + 1;
                        } else {
                            this.currentRow = Number(this.flowC.curNodeOrder);
                        }
                    }
                })
                .then(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        reAudit() {
            // 重新提交
            if (this.isActioning) {
                //多次提交拦截
                return;
            }
            this.isActioning = true;
            
            let params = {
                id: this.flowId
            };
            let fn;

            if(this.showKey == 'contract receipt out') {
                // 合同退费重新提交
                // 关闭当前弹窗，并打开退费弹窗
                this.apDetails = false;
                this.$refs.applyRefundRef.approvalEdit(this.obj);
                this.isActioning = false;
            } else {
                this.updateLoadingStatus({ isLoading: true });
                if (this.showStatus == 'reject') {
                    // let obj = null;
                    if (this.showKey == 'jw drop class') {
                        fn = comAuditFlowJw.rejectSendAudit(params);
                    } else {
                        fn = comAuditFlow.rejectSendAudit(params);
                    }
                    // obj.then(valid.call(this))
                    // fn = comAuditFlow.rejectSendAudit(params)
                } else if (this.showStatus == 'uncommit') {
                    if (this.showKey == 'jw drop class') {
                        fn = comAuditFlowJw.withdrawSendAudit(params);
                    } else {
                        fn = comAuditFlow.withdrawSendAudit(params);
                    }
                    // fn = comAuditFlow.withdrawSendAudit(params)
                }
                fn.then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.apDetails = false;
                            this.$emit('getFaList');
                            this.apDetailsModules = false;
                            this.showKey = '';
                            if (this.showStatus == 'reject') {
                                this.$Message.success(this.$t('modules_spoc_sign_web_src_modules_tabledetails_4959'));
                            } else if (this.showStatus == 'uncommit') {
                                this.$Message.success(this.$t('modules_spoc_sign_web_src_modules_tabledetails_4960'));
                            }
                        }
                    })
                    .then(errors.call(this))
                    .finally(() => {
                        this.updateLoadingStatus({ isLoading: false });
                        setTimeout(() => {
                            //多次提交拦截
                            this.isActioning = false;
                        }, 200);
                    });
            }
        },
        formatNums(val) {
            //格式化数字
            if (val !== undefined) {
                let newNum = Number(val)
                    .toFixed(2)
                    .toString();
                let prev = newNum.split('.')[0];
                let next = newNum.split('.')[1];
                prev = prev.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
                newNum = prev + '.' + next;
                return newNum;
            }
        },
        cancel() {
            this.apDetails = false;
            this.showKey = '';
        },
        submit(val) {
            if (this.isActioning) {
                //多次提交拦截
                return;
            }
            this.isActioning = true;
            this.updateLoadingStatus({ isLoading: true });
            let params = {
                id: this.flowId,
                auditResult: val,
                auditReason: this.reasons
            };
            let obj = null;
            let dom = null;
            if (this.showKey == 'jw drop class') {
                obj = comAuditFlowJw.audit(params);
            } else if (this.showKey == 'contract translate') {
                dom = this.$refs.contractTranslateInfo;
                if (dom.statusFlag != 0) {
                    dom.$refs.turnCenterForm.validate(ok => {
                        if (ok) {
                            let params1 = {
                                id: dom.id,
                                inSellerId: dom.formItem.inSellerId
                            };
                            htTranslateApply
                                .saveInSellerId(params1)
                                .then(valid.call(this))
                                .then(res => {
                                    if (res.ok) {
                                        comAuditFlow
                                            .audit(params)
                                            .then(valid.call(this))
                                            // comAuditFlow.audit(params)
                                            // .then(valid.call(this))
                                            .then(res => {
                                                if (res.ok) {
                                                    this.apDetails = false;
                                                    this.showKey = '';
                                                    this.$emit('getFaList');
                                                    this.reasons = '';
                                                    this.apDetailsModules = false;
                                                    if (val == 'agree') {
                                                        this.$Message.success(this.$t('modules_spoc_sign_web_src_modules_tabledetails_4961'));
                                                    } else if (val == 'reject') {
                                                        this.$Message.success(this.$t('modules_spoc_sign_web_src_modules_tabledetails_4962'));
                                                    }
                                                }
                                            })
                                            .then(errors.call(this))
                                            .finally(() => {
                                                this.updateLoadingStatus({ isLoading: false });
                                                setTimeout(() => {
                                                    //多次提交拦截
                                                    this.isActioning = false;
                                                }, 200);
                                            });
                                    } else {
                                        this.updateLoadingStatus({ isLoading: false });
                                        setTimeout(() => {
                                            //多次提交拦截
                                            this.isActioning = false;
                                        }, 200);
                                    }
                                })
                                .catch(errors.call(this))
                                .finally(() => {});
                        } else {
                            this.updateLoadingStatus({ isLoading: false });
                            setTimeout(() => {
                                //多次提交拦截
                                this.isActioning = false;
                            }, 200);
                        }
                    });
                } else {
                    obj = comAuditFlow.audit(params);
                }
            } else {
                obj = comAuditFlow.audit(params);
            }
            if (!dom||(dom.statusFlag && dom.statusFlag == 0) ) {
                obj.then(valid.call(this))
                    // comAuditFlow.audit(params)
                    // .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.apDetails = false;
                            this.showKey = '';
                            this.$emit('getFaList');
                            this.reasons = '';
                            this.apDetailsModules = false;
                            if (val == 'agree') {
                                this.$Message.success(this.$t('modules_spoc_sign_web_src_modules_tabledetails_4961'));
                            } else if (val == 'reject') {
                                this.$Message.success(this.$t('modules_spoc_sign_web_src_modules_tabledetails_4962'));
                            }
                        }
                    })
                    .then(errors.call(this))
                    .finally(() => {
                        this.updateLoadingStatus({ isLoading: false });
                        setTimeout(() => {
                            //多次提交拦截
                            this.isActioning = false;
                        }, 200);
                    });
            }
        },
        drawAuditBefore() {
            let str = this.reasons;
            str = str.replace(/^\s$/g, '');
            if (str == '' || str == null) {
                this.$Message.warning(this.$t('modules_spoc_sign_web_src_modules_tabledetails_4963'));
            } else {
                this.drawAudit();
            }
        },
        drawAudit() {
            if (this.isActioning) {
                //多次提交拦截
                return;
            }
            this.isActioning = true;
            this.updateLoadingStatus({ isLoading: true });

            let params = {
                id: this.flowId,
                withdrawReason: this.reasons
            };
            let obj = null;
            if (this.showKey == 'jw drop class') {
                obj = comAuditFlowJw.withdrawAudit(params);
            } else {
                obj = comAuditFlow.withdrawAudit(params);
            }
            obj.then(valid.call(this))
                // comAuditFlow.withdrawAudit(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.apDetails = false;
                        this.showKey = '';
                        this.$Message.success(this.$t('modules_spoc_sign_web_src_modules_tabledetails_4964'));
                        this.$emit('getFaList');
                        this.reasons = '';
                        this.apDetailsModules = false;
                    }
                })
                .then(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                    setTimeout(() => {
                        //多次提交拦截
                        this.isActioning = false;
                    }, 200);
                });
        },
        invalidAuditBefore() {
            let str = this.reasons;
            str = str.replace(/^\s$/g, '');
            if (str == '' || str == null) {
                this.$Message.warning(this.$t('modules_spoc_sign_web_src_modules_tabledetails_4965'));
            } else {
                this.invalidAudit();
            }
        },
        invalidAudit() {
            if (this.isActioning) {
                //多次提交拦截
                return;
            }
            this.isActioning = true;
            this.updateLoadingStatus({ isLoading: true });

            let params = {
                id: this.flowId,
                invalidReason: this.reasons
            };
            let obj = null;
            if (this.showKey == 'jw drop class') {
                obj = comAuditFlowJw.invalidAudit(params);
            } else {
                obj = comAuditFlow.invalidAudit(params);
            }
            obj.then(valid.call(this))
                // comAuditFlow.invalidAudit(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.apDetails = false;
                        this.showKey = '';
                        this.$Message.success(this.$t('modules_spoc_sign_web_src_modules_tabledetails_4966'));
                        this.$emit('getFaList');
                        this.reasons = '';
                        this.apDetailsModules = false;
                    }
                })
                .then(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                    setTimeout(() => {
                        //多次提交拦截
                        this.isActioning = false;
                    }, 200);
                });
        },
        getForm(item, open) {
            htReceipt
                .form({ id: item.id })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let _data = res.data.data;
                        this.refundDetailData = _data;
                        let _obj = {
                            id: _data.id,
                            key: item.key,
                            flowId: _data.comAuditFlow ? _data.comAuditFlow.id : '',
                            status: _data.auditStatus,
                            tab: item.tab
                        };
                        if (open) {
                            this.tabLable1 = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4947');
                            this.showPop(_obj, 1);
                            this.openModal()
                        }
                    }
                })
                .then(errors.call(this));
        },
        infoFn(obj) {
            this.updateLoadingStatus({ isLoading: true });
            let typeRqquest;
            if (this.showKey == 'contract leave') {
                this.tabLable1 = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4967');
                typeRqquest = htLeaveApply;
            } else if (this.showKey == 'contract valid') {
                this.tabLable1 = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4968');
                typeRqquest = htValidApply;
            } else if (this.showKey == 'contract present') {
                this.tabLable1 = this.$t('modules_spoc_sign_web_src_modules_tabledetails_4969');
                typeRqquest = htPresentApply;
            }
            typeRqquest
                .form({ id: obj.id })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.listData = res.data.data;
                        this.yxqType = res.data.data.type // 1有效期终止  0有效期延期
                        if (this.showKey == 'contract present') {
                            // this.disabledGroup = res.data.data.typeName == this.$t('modules_spoc_sign_web_src_modules_tabledetails_4970') ? '1' : '0';
                            this.disabledGroup = res.data.data.typeName == '赠送课程' ? '1' : '0';
                        }
                        this.openModal()
                    }
                })
                .then(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        transferAccountForm(id) {
            htStudentAccount
                .transferAccountForm({ id: id })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.studentAccontDetailData = res.data.data;
                        this.openModal()
                    }
                })
                .catch(errors.call(this));
        },
        withdrawForm(id) {
            htStudentAccount
                .withdrawForm({ id: id })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.studentAccontDetailData = res.data.data;
                        this.openModal()
                    }
                })
                .catch(errors.call(this));
        },
        uploadLists() {
            this.$emit('uploadLists')
        }
    }
};
</script>
