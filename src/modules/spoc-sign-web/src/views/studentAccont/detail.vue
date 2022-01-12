<style lang="less">
.student-accont-detail-wrapper{
    position: relative;width: 100%;padding-bottom: 30px;
    .inner{
        margin: 0 24px;
    }
    .colorMain{
        color: #44BCB7;
    }
    .account-transfer-top{
        height: 32px + 20px;line-height: 32px;
        .label{
            position: absolute;left: 0;top: 0;width: 126px;
            color: #999;text-align: right;
        }
        .detail{
            position: relative;
        }
        .detail-list{
            position: absolute;top: 36px;right: 0;padding-top: 4px;z-index: 2;
            background: #fff;
            width: 307px;
            height: 200px;
            box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.12);
            border-radius: 3px;
            border: 1px solid #DCDEE3;
        }
    }
    .account-transfer-ul{
        height: 100%;font-size: 14px;
        & > li{
            float: left;position: relative;height: 100%;
            padding-left: 126px;
            &:first-child{
                width: 126px + 10px + 250px;
                margin-right: 210px - 56px;
            }
        }
    }
    .list-item{
        @h: 36px;
        display: block;
        height: @h;line-height: @h;padding-left: 20px;
        &:hover{
            background: #F2F3F7;
        }
    }
    .list-footer{
        height: 50px;line-height: 49px;padding-left: 20px;
        border-top: 1px solid #D9D9D9;
        button{
            @h: 28px;
            float: right;width: 52px;height: @h;padding: 0;margin-right: 16px;margin-top: 10px;
        }
    }
    .transfer-detail{
        height: 117px;position: relative;
        display: flex;justify-content: space-around;
    }
    .student-table{
        width: 400px;
        border: 1px solid #E6E7EB;text-align: center;
        .table-icons{
            position: relative;top: 1px;
            font-size: 18px;
        }
        .header{
            position: relative;
            height: 52px;line-height: 51px;
            border-bottom: 1px solid #E6E7EB;font-size: 14px;background: #F7F8FA;
            & > span{
                margin-left: 2px;
            }
        }
        .right-icon{
            @w: 44px;
            position: absolute;width: @w;height: @w;top: 4px;right: 4px;
            cursor: pointer;
            i{
                position: absolute; top: 50%;left: 50%;transform: translate(-50%,-50%);
                .colorMain;
            }
        }
        .lists{
            @h: 65px;
            display: flex;justify-content: space-around;
            line-height: @h;
            button{
                width: 60px;height: 32px;padding: 0;
                // margin-top: 17px;
            }
        }
    }
    .arrow-right{
        width: 36px;height: 30px;margin-top: 43px;
        img{
            display: block;width: 100%;height: 100%;
        }
    }
    .api {
        height: auto;text-align: left;
    }
    .api_btn {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 8px;
        button {
            width: 60px;
            height: 24px;
            padding: 0;
            text-align: center;
            line-height: 22px;
            margin-left: 12px;
        }
    }
    .ivu-select-item{
        z-index: 0;
        &::before, &::after{
            content: '';
            display: block;clear: both;height: 0;line-height: 0;font-size: 0;
        }
    }
    .withdraw-footer{
        @h: 30px;
        height: @h;line-height: @h;
        & > span{
            float: left;
            color: #999;
        }
    }
}
</style>

<template>
<div class="student-accont-detail-wrapper">
    <div v-if="type == 'contract transfer account'" class="inner">
        <!-- 学员转账 -->
        <div class="account-transfer-top">
            <ul class="account-transfer-ul">
                <li>
                    <span class="label">{{$t('modules_spoc_sign_web_src_views_studentaccont_accounttransfer_7431')}}</span>
                    <div>{{detail.outOfficeName}}</div>
                </li>
                <li>
                    <span class="label">{{$t('modules_spoc_sign_web_src_views_studentaccont_accounttransfer_7432')}}</span>
                    <div class="detail">
                        <span style="colorMain">{{formatNums(money)}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}<Button type="primary" @click="openTooltips()" style="margin-left: 10px;">{{$t('modules_spoc_sign_web_src_views_studentaccont_accounttransfer_7434')}}</Button>
                        <div class="detail-list" v-if="showTooltips">
                            <CheckboxGroup v-model="moneyRefundCheckbox">
                                <Checkbox disabled label="A" class="list-item">{{$t('modules_spoc_sign_web_src_views_studentaccont_detail_7483', [formatNums(detail.moneyRefund)])}}</Checkbox>
                                <Checkbox disabled label="B" class="list-item">{{$t('modules_spoc_sign_web_src_views_studentaccont_detail_7484', [formatNums(detail.moneyRepackage)])}}</Checkbox>
                                <Checkbox disabled label="C" class="list-item">{{$t('modules_spoc_sign_web_src_views_studentaccont_detail_7485', [formatNums(detail.moneyTransfer)])}}</Checkbox>
                                <Checkbox disabled label="D" class="list-item">{{$t('modules_spoc_sign_web_src_views_studentaccont_detail_7486', [formatNums(detail.moneyDeposit)])}}</Checkbox>
                            </CheckboxGroup>
                            <div class="list-footer">{{$t('modules_spoc_sign_web_src_views_studentaccont_accounttransfer_7432')}}<span style="colorMain">{{formatNums(money)}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}<Button type="primary" @click="closeTooltips()">{{$t('classroom_allscore_54')}}</Button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="transfer-detail">
            <div class="student-table">
                <div class="header">
                    <i class="iconfont table-icons icon-zhuanchuxueyuan"></i>
                    <span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenter_5949')}}</span>
                </div>
                <div class="lists">
                    <span>{{detail.outStudentName || '--'}}</span>
                    <span>{{detail.outStudentGrade ? detail.outStudentGrade.toLocaleUpperCase() : '--'}}</span>
                    <span>{{detail.outStudentPhone || '--'}}</span>
                </div>
            </div>
            <span class="arrow-right">
                <img src="../../assets/images/arrow-right-bg.png" alt="">
            </span>
            <div class="student-table">
                <div class="header">
                    <i class="iconfont table-icons icon-zhuanruxueyuan"></i>
                    <span>{{$t('modules_spoc_sign_web_src_views_studentaccont_accounttransfer_7441')}}</span>
                </div>
                <div class="lists">
                    <span>{{detail.inStudentName || '--'}}</span>
                    <span>{{detail.inStudentGrade ? detail.inStudentGrade.toLocaleUpperCase() : '--'}}</span>
                    <span>{{detail.inStudentPhone || '--'}}</span>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="inner">
        <!-- 学员提现 -->
        <div class="withdraw-footer"><span>{{$t('modules_spoc_sign_web_src_views_studentaccont_accounttransfer_7431')}}</span>{{detail.officeName}}</div>
        <CheckboxGroup v-model="moneyRefundCheckbox">
            <Checkbox disabled label="A" class="list-item">{{$t('modules_spoc_sign_web_src_views_studentaccont_detail_7483', [formatNums(detail.moneyRefund)])}}</Checkbox>
            <Checkbox disabled label="B" class="list-item">{{$t('modules_spoc_sign_web_src_views_studentaccont_detail_7484', [formatNums(detail.moneyRepackage)])}}</Checkbox>
            <Checkbox disabled label="C" class="list-item">{{$t('modules_spoc_sign_web_src_views_studentaccont_detail_7485', [formatNums(detail.moneyTransfer)])}}</Checkbox>
            <Checkbox disabled label="D" class="list-item">{{$t('modules_spoc_sign_web_src_views_studentaccont_detail_7486', [formatNums(detail.moneyDeposit)])}}</Checkbox>
        </CheckboxGroup>
        <div class="withdraw-footer">
            <span>{{$t('modules_spoc_sign_web_src_views_studentaccont_detail_7490')}}</span>
            <div><span class="colorMain">{{formatNums(money)}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</div>
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
        },
        type: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            showTooltips: false
        }
    },
    computed: {
        money() {
            let _count = 0;
            if(this.detail.moneyRefund) _count += Number(this.detail.moneyRefund);
            if(this.detail.moneyRepackage) _count += Number(this.detail.moneyRepackage);
            if(this.detail.moneyTransfer) _count += Number(this.detail.moneyTransfer);
            if(this.detail.moneyDeposit) _count += Number(this.detail.moneyDeposit);
            return _count;
        },
        moneyRefundCheckbox() {
            let _arr = [];
            if(this.detail.moneyRefund) _arr.push('A');
            if(this.detail.moneyRepackage) _arr.push('B');
            if(this.detail.moneyTransfer) _arr.push('C');
            if(this.detail.moneyDeposit) _arr.push('D');
            return _arr;
        }
    },
    methods: {
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
        openTooltips() {
            this.showTooltips = !this.showTooltips;
        },
        closeTooltips() {
            this.showTooltips = false;
        },
    }
}
</script>
