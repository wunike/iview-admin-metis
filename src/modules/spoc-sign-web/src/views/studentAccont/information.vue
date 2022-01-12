<style lang="less">
.information-container{
    position: relative;
    height: 220px;
    .fl{
        float: left;
    }
    .information-left{
        float: left;width: 700px;
        .name{
            font-size: 16px;height: 26px;
            & > span{
                line-height: 1;
            }
            span{
                font-weight: bold;
            }
        }
        .operation{
            float: right;
            font-size: 14px;
            div{
                float: left;margin-left: 40px;cursor: pointer;
                &:hover i{
                    color: inherit;
                }
            }
            i{
                margin-right: 8px;color: #999;font-size: 14px;
            }
        }
    }
    .ivu-form{
        margin-bottom: 20px;
        &:last-child{
            margin-bottom: 0;
        }
        .ivu-form-item-label{
            font-size: 14px;padding-right: 0;
        }
    } 
    .ivu-form-item{
        margin-bottom: 0;
    }
    .ivu-form-inline .ivu-form-item{
        margin-right: 0;width: 100% / 3;
    }
    .ivu-form-item-content{
        font-size: 14px;
    }
    .ivu-tooltip{
        font-size: 16px;color: #ccc;
    }
    .colorOrange{
        color: #FF3000;
    }
    .information-right{
        float: right;width: 280px;height: 197px;overflow-y: auto;
        border: 1px solid #E8E8E8;
    }
    .information-table-header{
        background: #FAFAFA;font-weight: bold;
    }
    .information-table-ul li, .information-table-header{
        @h: 40px;
        line-height: @h;height: @h + 1px;
        font-size: 12px;border-bottom: 1px solid #E8E8E8;
        span{
            float: left;height: @h;
            &:nth-child(1) {
                padding-left: 16px;width: 48px + 48px;
            }
            &:nth-child(2) {
                width: 36px + 54px;
            }
            &:nth-child(3) {
                width: 60px + 10px;
            }
        }
    }
    .tips-content{
        width: 330px;
        ul{
            margin-bottom: 13px;
        }
        li{
            display: inline-block;width: 50%;line-height: 22px;
        }
    }
    .tips-name{
        height: 30px;line-height: 22px;
        font-weight: bold;font-size: 14px;
    }
}
</style>
    
<template>
<div class="information-container">
    <div class="information-left">
        <div class="name">
            <span class="fl">{{accountOverview.studentName}}</span>
            <div class="operation">
                <div @click.stop="openNewIncome()" class="operationAreaDiv">
                    <i class="iconfont icon-qianbao"></i>
                    <span>{{$t('modules_spoc_sign_web_src_views_studentaccont_information_7506')}}</span>
                </div>
                <div @click.stop="openWithdraw()" class="operationAreaDiv">
                    <i class="iconfont icon-tixianchongzhi"></i>
                    <span>{{$t('modules_spoc_sign_web_src_views_studentaccont_information_7507')}}</span>
                </div>
                <!-- <div @click.stop="openAccountTransfer()" class="operationAreaDiv">
                    <i class="iconfont icon-zhuanyi"></i>
                    <span>{{$t('modules_spoc_sign_web_src_views_studentaccont_accounttransfer_7429')}}</span>
                </div> -->
            </div>
        </div>
        <Form inline label-position="left" :label-width="88">
            <FormItem :label="$t('modules_spoc_sign_web_src_views_studentaccont_information_7509')">
                <span class="colorOrange">{{formatNums(accountOverview.accountTotal)}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}<Tooltip theme="light" max-width="400" v-if="accountOverview.studentAccountList && accountOverview.studentAccountList.length">
                    <Icon type="ios-help-circle" />
                    <div slot="content">
                        <div class="tips-content">
                            <div v-for="item in accountOverview.studentAccountList" :key="item.id">
                                <div class="tips-name">{{item.officeName}}</div>
                                <ul>
                                    <li>{{$t('modules_spoc_sign_web_src_views_studentaccont_information_7511', [formatNums(item.moneyRefund)])}}</li>
                                    <li>{{$t('modules_spoc_sign_web_src_views_studentaccont_information_7512', [formatNums(item.moneyTransfer)])}}</li>
                                    <li>{{$t('modules_spoc_sign_web_src_views_studentaccont_information_7513', [formatNums(item.moneyRepackage)])}}</li>
                                    <li>{{$t('modules_spoc_sign_web_src_views_studentaccont_information_7514', [formatNums(item.moneyDeposit)])}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Tooltip>
            </FormItem>
            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_signlists_870')">
                <span class="colorOrange">{{formatNums(accountOverview.accountPayTotal)}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</FormItem>
            <FormItem :label="$t('modules_spoc_sign_web_src_views_studentaccont_information_7516')">
                <span class="colorOrange">{{formatNums(accountOverview.pointsTotal)}}</span>{{$t('modules_spoc_sign_web_src_views_studentaccont_information_7517')}}</FormItem>
        </Form>
        <div class="name">
            <span class="fl">{{$t('modules_spoc_sign_web_src_views_studentaccont_information_7518')}}</span>
        </div>
        <Form inline label-position="left" :label-width="88">
            <FormItem :label="$t('modules_spoc_sign_web_src_views_studentaccont_information_7519')">
                <span class="colorOrange">{{formatNums(accountOverview.contractTotal)}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</FormItem>
            <FormItem :label="$t('modules_spoc_sign_web_src_views_studentaccont_information_7520')">
                <span class="colorOrange">{{formatNums(accountOverview.deratePriceTotal)}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</FormItem>
            <FormItem :label="$t('modules_spoc_sign_web_src_views_studentaccont_information_7521')">
                <span class="colorOrange">{{formatNums(accountOverview.obligationTotal)}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</FormItem>
            <FormItem :label="$t('modules_spoc_sign_web_src_views_studentaccont_information_7522')">
                <span class="colorOrange">{{formatNums(accountOverview.deductionAmount)}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</FormItem>
            <FormItem :label="$t('modules_spoc_sign_web_src_views_studentaccont_information_7523')">
                <span class="colorOrange">{{formatNums(accountOverview.refundPriceTotal)}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</FormItem>
            <FormItem :label="$t('modules_spoc_sign_web_src_views_studentaccont_information_7524')">
                <span class="colorOrange">{{formatNums(accountOverview.transferPriceTotal)}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</FormItem>
        </Form>
    </div>
    <div class="information-right">
        <div class="information-table-header">
            <span>{{$t('modules_spoc_sign_web_src_views_studentaccont_information_7525')}}</span>
            <span>{{$t('views_coursepack_coursepack_379')}}</span>
            <span>{{$t('modules_spoc_sign_web_src_views_studentaccont_index_7504')}}</span>
        </div>
        <ul class="information-table-ul">
            <li>
                <span>{{$t('core.coursePack')}}</span>
                <span>{{courseCollectInfo.courseHourNumTotal}}</span>
                <span>{{formatNums(courseCollectInfo.coursePriceTotal)}}</span>
            </li>
            <li>
                <span>{{$t('modules_spoc_sign_web_src_views_studentaccont_information_7529')}}</span>
                <span>{{courseCollectInfo.presentNumTotal}}</span>
                <span>{{formatNums(courseCollectInfo.presentPriceTotal)}}</span>
            </li>
            <li>
                <span>{{$t('modules_spoc_sign_web_src_views_studentaccont_information_7530')}}</span>
                <span>{{courseCollectInfo.costNumTotal}}</span>
                <span>{{formatNums(courseCollectInfo.costTotal)}}</span>
            </li>
            <li>
                <span>{{$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5696')}}</span>
                <span>{{courseCollectInfo.transferHourTotal}}</span>
                <span>{{formatNums(courseCollectInfo.transferPriceTotal)}}</span>
            </li>
            <li>
                <span>{{$t('modules_spoc_sign_web_src_views_studentaccont_information_7532')}}</span>
                <span>{{courseCollectInfo.backCourseNum}}</span>
                <span>{{formatNums(courseCollectInfo.refundPrice)}}</span>
            </li>
            <li>
                <span>{{$t('modules_spoc_sign_web_src_views_studentaccont_information_7533')}}</span>
                <span>{{courseCollectInfo.otherCostNum}}</span>
                <span>{{formatNums(courseCollectInfo.otherCostPrice)}}</span>
            </li>
            <li>
                <span>{{$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1644')}}</span>
                <span class="colorOrange">{{courseCollectInfo.remainMoneyCourseHourTotal + courseCollectInfo.remainPresentCourseHourTotal}}</span>
                <span class="colorOrange">{{formatNums(courseCollectInfo.leftCoursePriceTotal)}}</span>
            </li>
        </ul>
        <div class="information-table-header">
            <span></span>
            <span>{{$t('views_coursepack_coursepackgroup_450')}}</span>
            <span>{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5470')}}</span>
        </div>
        <ul class="information-table-ul">
            <li>
                <span>{{$t('modules_spoc_sign_web_src_views_studentaccont_information_7537')}}</span>
                <span>{{cpompotedValidDateTotal}}</span>
                <span>{{courseCollectInfo.leaveNumTotal}}</span>
            </li>
            <li>
                <span>{{$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1644')}}</span>
                <span class="colorOrange">{{leftValidateTotal}}</span>
                <span class="colorOrange">{{courseCollectInfo.leftLeaveNumTotal}}</span>
            </li>
        </ul>
    </div>
    <add-new-payment ref="addNewPayment" @uploadLists="uploadLists"></add-new-payment>
    <account-transfer :schoolList="schoolList" ref="accountTransfer" @uploadLists="uploadLists"></account-transfer>
    <withdraw :schoolList="schoolList" ref="withdraw" @uploadLists="uploadLists"></withdraw>
</div>
</template>

<script>
import addNewPayment from "../receiptManagement/components/addNewPayment.vue";
import accountTransfer from "./accountTransfer.vue";
import withdraw from "./withdraw.vue";
import valid, { errors, htStudentAccount, sysUser } from "../../libs/request";
import { MENUIDS } from '@public/libs/config';
export default {
    name: 'information',
    props: {
        curStudent: {
            type: Object,
            required: true
        },
        accountOverview: {
            type: Object,
            required: true
        },
    },
    data(){
        return {
            finishCourseCollectInfo: false,
            courseCollectInfo: {},
            schoolList: [],
            pId: null,
        };
    },
    computed: {
        leftValidateTotal() {
            let str = '';
            let month = 0, day = 0;
            if(this.courseCollectInfo.validDateTotal) month += this.courseCollectInfo.validDateTotal;
            if(this.courseCollectInfo.validDay) {
                month += Math.floor(this.courseCollectInfo.validDay / 30);
                day += this.courseCollectInfo.validDay % 30;
            }
            if(this.courseCollectInfo.leftValidateTotal) {
                month -= Math.floor(this.courseCollectInfo.leftValidateTotal / 30);
                day -= this.courseCollectInfo.leftValidateTotal % 30;
            }
            str = month + this.$t('modules_spoc_portal_views_systemconfig_systemconfig_4083');
            if(day) str += day + this.$t('message_socket_304')
            return str;
        },
        cpompotedValidDateTotal() {
            let str = '';
            let month = 0, day = 0;
            if(this.courseCollectInfo.validDateTotal) month += this.courseCollectInfo.validDateTotal;
            if(this.courseCollectInfo.validDay) {
                month += Math.floor(this.courseCollectInfo.validDay / 30);
                day += this.courseCollectInfo.validDay % 30;
            }
            // validDateTotal + Math.floor(validDay / 30) + '月' + validDay % 30 + '天'
            str = month + this.$t('modules_spoc_portal_views_systemconfig_systemconfig_4083');
            if(day) str += day + this.$t('message_socket_304')
            return str;
        },
    },
    components: {
        accountTransfer,
        addNewPayment,
        withdraw
    },
    mounted(){
        this.pId = MENUIDS.SIGN;
    },
    methods: {
        init() {
            this.findStudentCourseCollectInfo();
            this.dataScopeFilter();
        },
        openNewIncome() {
            this.$refs.addNewPayment.showPopFromInformation({
                studentId: this.curStudent.studentId,
                studentName: this.accountOverview.studentName,
                cusId: this.curStudent.cusId
            });
        },
        openAccountTransfer() {
            this.$refs.accountTransfer.open(this.curStudent);
        },
        findStudentCourseCollectInfo() {
            let params = {
                studentId: this.curStudent.studentId
            }
            htStudentAccount.findStudentCourseCollectInfo(params)
            .then(valid.call(this))
            .then(res=>{
                if(res.ok){
                    this.finishCourseCollectInfo = true;
                    let _data = res.data.data;
                    this.courseCollectInfo = _data;
                }
            })
            .catch(errors.call(this))
            .finally(()=>{});
        },
        formatNums(val){
            //格式化数字
            if(val !== undefined){
                let newNum = Number(val).toFixed(2).toString();
                let prev = newNum.split('.')[0]
                let next = newNum.split('.')[1]
                prev = prev.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
                newNum = prev+'.'+ next;
                return newNum;
            }
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
        openWithdraw() {
            this.$refs.withdraw.show(this.curStudent);
        },
        uploadLists() {
            this.$emit('uploadLists')
        },
    }
}
</script>


