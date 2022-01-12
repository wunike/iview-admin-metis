<style lang="less">
.account-transfer-container{
    position: relative;
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
            float: left;position: relative;
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
}
</style>
    
<template>
<Modal
    v-model="modal"
    class="account-transfer-container"
    :title="$t('modules_spoc_sign_web_src_views_studentaccont_accounttransfer_7429')"
    :loading="loadingModal"
    :mask-closable="false"
    ok-:text="$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenter_5978')"
    width="1000"
    @on-ok="ok"
    @on-cancel="cancel">
    <div class="account-transfer-top">
        <ul class="account-transfer-ul">
            <li>
                <span class="label">{{$t('modules_spoc_sign_web_src_views_studentaccont_accounttransfer_7431')}}</span>
                <div class="detail">
                    <Select v-model="officeId" style="width:250px" @on-change="getStudentAccountInfo">
                        <Option v-for="item in schoolList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </div>
            </li>
            <li>
                <span class="label">{{$t('modules_spoc_sign_web_src_views_studentaccont_accounttransfer_7432')}}</span>
                <div class="detail">
                    <span style="colorMain">{{formatNums(money)}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}<Button type="primary" @click="openTooltips()" style="margin-left: 10px;">{{$t('modules_spoc_sign_web_src_views_studentaccont_accounttransfer_7434')}}</Button>
                    <div class="detail-list" v-if="showTooltips">
                        <CheckboxGroup v-model="moneyRefundCheckbox">
                            <Checkbox label="A" class="list-item">{{$t('modules_spoc_sign_web_src_views_studentaccont_accounttransfer_7435', [formatNums(tipsObj.moneyRefund)])}}</Checkbox>
                            <Checkbox label="B" class="list-item">{{$t('modules_spoc_sign_web_src_views_studentaccont_accounttransfer_7436', [formatNums(tipsObj.moneyRepackage)])}}</Checkbox>
                            <Checkbox label="C" class="list-item">{{$t('modules_spoc_sign_web_src_views_studentaccont_accounttransfer_7437', [formatNums(tipsObj.moneyTransfer)])}}</Checkbox>
                            <Checkbox label="D" class="list-item">{{$t('modules_spoc_sign_web_src_views_studentaccont_accounttransfer_7438', [formatNums(tipsObj.moneyDeposit)])}}</Checkbox>
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
                <span>{{outStudent.name || '--'}}</span>
                <span>{{outStudent.type || '--'}}</span>
                <span>{{outStudent.phone || '--'}}</span>
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
                <span>{{inStudent.name || '--'}}</span>
                <span>{{inStudent.type || '--'}}</span>
                <span>{{inStudent.phone || '--'}}</span>
                <Poptip v-model="apiVisible" placement="left" width="424" @on-popper-hide="apiPopperHide">
                    <Button>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenter_5950')}}</Button>
                    <div class="api" slot="content">
                        <Select v-model="inOfficeId" :placeholder="$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_781')" style="width: 180px;margin-right: 12px;">
                            <Option v-for="(option, index) in schoolList" :value="option.id" :key="index">{{ option.name }}</Option>
                        </Select>
                        <Select
                            v-model="inStudentId"
                            :placeholder="$t('memberlist_memberlist_257')"
                            filterable
                            remote
                            :remote-method="remoteMethod"
                            :loading="loading"
                            style="width: 180px;"
                            @on-change="stuChange">
                            <Option v-for="(option, index) in options" :value="option.id" :label="option.name" :key="index">
                                <span class="fl">{{ option.name }}</span>
                                <span style="float:right;color:#ccc">{{ option.phone }}</span>
                            </Option>
                        </Select>
                        <div class="api_btn">
                            <Button @click="apiClose">{{$t('classroom_allscore_53')}}</Button>
                            <Button type="primary" @click="apiOk">{{$t('classroom_allscore_54')}}</Button>
                        </div>
                    </div>
                </Poptip>
            </div>
        </div>
    </div>
</Modal>
</template>

<script>
import valid, { errors, htStudentAccount, common } from "../../libs/request";
// import { mapMutations, mapState } from "vuex";
// import { waitUntil } from '@public/libs/util.js';
export default {
    name: 'accountTransfer',
    props: {
        schoolList: {
            type: Array,
            required: true  
        }
    },
    data(){
        return {
            modal: !true,
            officeId: '',
            studentId: '',
            showTooltips: false,
            tipsObj: {},
            moneyRefundCheckbox: ['A', 'B', 'C', 'D'],
            apiVisible: false,
            inStudentId: '',
            loading: false,
            options: [],
            outStudent: {
                name: '',
                type: '',
                phone: '',
            },
            inStudent: {
                name: '',
                type: '',
                phone: '',
            },
            inStuInfo: {},
            inOfficeId: '',
            loadingModal: true,
        };
    },
    computed: {
        // ...mapState(["userInfo", "app"]),
        money() {
            let _count = 0;
            if(this.moneyRefundCheckbox.indexOf('A') > -1) _count += Number(this.tipsObj.moneyRefund);
            if(this.moneyRefundCheckbox.indexOf('B') > -1) _count += Number(this.tipsObj.moneyRepackage);
            if(this.moneyRefundCheckbox.indexOf('C') > -1) _count += Number(this.tipsObj.moneyTransfer);
            if(this.moneyRefundCheckbox.indexOf('D') > -1) _count += Number(this.tipsObj.moneyDeposit);
            return _count;
        }
    },
    methods: {
        open(student) {
            this.inStudent = {
                name: '',
                type: '',
                phone: '',
            };
            this.inStuInfo = {};
            this.studentId = student.studentId;
            this.officeId = student.officeId;
            this.inOfficeId = '';
            this.inStudentId = '';
            this.getForm();
            this.getStudentAccountInfo();
            this.modal = true;
        },
        getForm(id) {
            common.comStudentForm({id: this.studentId})
            .then(valid.call(this))
			.then(res => {
				if (res.ok) {
                    let {name, type, phone} = res.data.data;
                    this.outStudent = {name, type, phone};
				}
			})
			.catch(errors.call(this));
        },
        ok() {
            // console.log('ok')
            if(!this.inStudentId || !this.inOfficeId) {
                this.changeLoading();
                this.$Message.error(this.$t('modules_spoc_sign_web_src_views_studentaccont_accounttransfer_7446'));
                return false;
            }
            let _count = Number(this.money);
            if(!_count) {
                this.changeLoading();
                this.$Message.error(this.$t('modules_spoc_sign_web_src_views_studentaccont_accounttransfer_7447'));
                return false;
            }
            this.transferAccountApply();
        },
        changeLoading() {
            this.loadingModal = false;
            setTimeout(() => {
                this.loadingModal = true;
            }, 0);
        },
        transferAccountApply() {
            let params = {
                outOfficeId: this.officeId,
                outStudentId: this.studentId,
                inOfficeId: this.inOfficeId,
                inStudentId: this.inStudentId,
                // moneyRefund: this.tipsObj.moneyRefund,
                // moneyRepackage: this.tipsObj.moneyRepackage,
                // moneyTransfer: this.tipsObj.moneyTransfer,
                // moneyDeposit: this.tipsObj.moneyDeposit,
            }
            if(this.moneyRefundCheckbox.indexOf('A') > -1) params.moneyRefund = this.tipsObj.moneyRefund;
            if(this.moneyRefundCheckbox.indexOf('B') > -1) params.moneyRepackage = this.tipsObj.moneyRepackage;
            if(this.moneyRefundCheckbox.indexOf('C') > -1) params.moneyTransfer = this.tipsObj.moneyTransfer;
            if(this.moneyRefundCheckbox.indexOf('D') > -1) params.moneyDeposit = this.tipsObj.moneyDeposit;
            htStudentAccount.transferAccountApply(params)
            .then(valid.call(this))
			.then(res => {
				if (res.ok) {
                    this.$emit('uploadLists');
                    this.cancel()
				} else {
                    this.changeLoading();
                }
			})
			.catch(errors.call(this));
        },
        cancel() {
            this.modal = false;
        },
        openTooltips() {
            this.showTooltips = !this.showTooltips;
        },
        closeTooltips() {
            this.showTooltips = false;
        },
        getStudentAccountInfo() {
            let params = {
                officeId: this.officeId,
                studentId: this.studentId
            }
            common.comStudentGetStudentAccountInfo(params)
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
                    this.tipsObj = res.data.data;
				}
			})
			.catch(errors.call(this));
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
        remoteMethod(query) {
            if (query !== '' && this.inOfficeId) {
                this.loading = true;
                let params = {
                    officeId: this.inOfficeId,
                    name: query
                };
                common.listByOfficeIdAndName(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.options = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loading = false;
                });
            } else {
                this.options = [];
            }
        },
        stuChange(val) {
            this.options.forEach(v => {
                if (v.id == val) {
                    this.inStuInfo = v;
                }
            });
        },
        apiClose() {
            this.options = [];
            this.apiVisible = false;
        },
        apiOk() {
            // console.log(this.inStuInfo)
            if(!this.inStuInfo || !this.inStuInfo.name) {
                this.$Message.error(this.$t('modules_spoc_sign_web_src_views_editleavenum_components_editleavenummodify_6461'))
                return false;
            }
            this.inStudent = {
                name: this.inStuInfo.name,
                type: this.inStuInfo.gradeLabel,
                phone: this.inStuInfo.phone,
            }
            this.apiVisible = false;
        },
        apiPopperHide(val) {
            this.options = [];
        },
    }
}
</script>


