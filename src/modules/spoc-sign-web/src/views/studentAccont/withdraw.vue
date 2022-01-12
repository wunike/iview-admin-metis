<style lang="less">
.withdraw-modal-container{
    .ivu-modal-header{
        display: none;
    }
    .ivu-modal-body{
        padding: 16px 0 0;
    }
    .ivu-modal-footer {
        .modiRoomTip {
            display: flex;
            justify-content: flex-end;
            > div:nth-child(1) {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 14px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: #495060;
                > span {
                    margin: 0 5px;
                }
            }
            &.modiRoomTiptwo {
                justify-content: space-between;
            }
        }
        button{
            width: 66px;height: 32px;padding: 0;
        }
    }
    .ivu-checkbox-group{
        margin-top: 8px;
    }
    .list-item{
        @h: 36px;
        display: block;height: @h;line-height: @h;padding: 0 20px;
        font-size: 14px;
        &:hover{
            background: #F2F3F7;
        }
    }
}
</style>

<template>
    <Modal 
        v-model="withdrawModal" 
        :loading="loading" 
        :closable="false"
        width="360"
        class="withdraw-modal-container">
        <div slot="header"></div>
        <Select v-model="officeId" style="width:320px;margin: 0 20px;" @on-change="getStudentAccountInfo">
            <Option v-for="item in schoolList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <CheckboxGroup v-model="moneyRefundCheckbox">
            <Checkbox label="A" class="list-item">{{$t('modules_spoc_sign_web_src_views_studentaccont_withdraw_7541', [formatNums(tipsObj.moneyRefund)])}}</Checkbox>
            <Checkbox label="B" class="list-item">{{$t('modules_spoc_sign_web_src_views_studentaccont_withdraw_7542', [formatNums(tipsObj.moneyRepackage)])}}</Checkbox>
            <Checkbox label="C" class="list-item">{{$t('modules_spoc_sign_web_src_views_studentaccont_withdraw_7543', [formatNums(tipsObj.moneyTransfer)])}}</Checkbox>
            <Checkbox label="D" class="list-item">{{$t('modules_spoc_sign_web_src_views_studentaccont_withdraw_7544', [formatNums(tipsObj.moneyDeposit)])}}</Checkbox>
        </CheckboxGroup>
        <div slot="footer" class="modiRoomTip modiRoomTiptwo">
            <div>{{$t('modules_spoc_sign_web_src_views_studentaccont_detail_7490')}}<span class="moneyNum">{{formatNums(money)}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</div>
            <div>
                <Button @click="handleReset" style="margin-left: 8px">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="handleSubmit">{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenter_5978')}}</Button>
            </div>
        </div>
    </Modal>
</template>


<script>
import valid, { errors, htStudentAccount, common } from "../../libs/request";
export default {
    name: 'withdrawModal',
    props: {
        schoolList: {
            type: Array,
            required: true  
        }
    },
    data() {
        return {
            loading: false,
            withdrawModal: false,
            moneyRefundCheckbox: ['A', 'B', 'C', 'D'],
            tipsObj: {},
            officeId: '',
            studentId: '',
        }
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
        handleReset() {
            this.withdrawModal = false;
        },
        handleSubmit() {
            let _count = Number(this.money);
            if(!_count) {
                this.changeLoading();
                this.$Message.error(this.$t('modules_spoc_sign_web_src_views_studentaccont_withdraw_7549'));
                return false;
            }
            this.withdrawApply();
        },
        withdrawApply() {
             let params = {
                // moneyDeposit: this.tipsObj.moneyDeposit,
                // moneyRefund: this.tipsObj.moneyRefund,
                // moneyRepackage: this.tipsObj.moneyRepackage,
                // moneyTransfer: this.tipsObj.moneyTransfer,
                officeId: this.officeId,
                studentId: this.studentId,
            }
            if(this.moneyRefundCheckbox.indexOf('A') > -1) params.moneyRefund = this.tipsObj.moneyRefund;
            if(this.moneyRefundCheckbox.indexOf('B') > -1) params.moneyRepackage = this.tipsObj.moneyRepackage;
            if(this.moneyRefundCheckbox.indexOf('C') > -1) params.moneyTransfer = this.tipsObj.moneyTransfer;
            if(this.moneyRefundCheckbox.indexOf('D') > -1) params.moneyDeposit = this.tipsObj.moneyDeposit;
            htStudentAccount.withdrawApply(params)
            .then(valid.call(this))
			.then(res => {
				if (res.ok) {
                    this.$emit('uploadLists');
                    this.handleReset()
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
        changeLoading() {
            this.loading = false;
            setTimeout(() => {
                this.loading = true;
            }, 0);
        },
        show(student) {
            this.withdrawModal = true;
            this.studentId = student.studentId;
            this.officeId = student.officeId;
            // console.log(student)
            this.getStudentAccountInfo();
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
    }
}
</script>
