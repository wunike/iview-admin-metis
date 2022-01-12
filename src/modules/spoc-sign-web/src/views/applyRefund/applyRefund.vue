<style lang="less">
.fixedHeight{
    .ivu-modal-content{
        min-height: 585px;
    }
}
.classShow {
    .ivu-modal-header {
        background: rgba(247, 248, 250, 1);
        border-radius: 4px 4px 0px 0px;
        .ivu-modal-header-inner {
        font-size: 18px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        }
    }
    .ivu-table-cell{
        padding-left: 4px;
    }
    .ivu-modal-footer{
        padding-left: 24px;
    }
    .pubS {
        font-size: 14px;
        font-family: HiraginoSansGB-W3;
        font-weight: normal;
        color: rgba(153, 153, 153, 1);
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
    // 步骤条
    .ivu-steps{
        height: 122px;
        padding-left: 42px;padding-right: 42px;
        .ivu-steps-title{
            display: block;padding-right: 0;
        }
        .ivu-steps-main{
            position: absolute;top: 40px;left: -53px;
            width: 140px;text-align: center;
        }
        .ivu-steps-head-inner{
            @w: 32px;
            width: @w;height: @w;line-height: @w - 2px;
        }
        .ivu-steps-content{
            width: 100px;margin: 0 auto;
            padding-left: 0;
        }
        .ivu-steps-item{
            width: 243px !important;
            overflow: initial;
            &:last-child{
                width: 32px !important;
            }
        }
    }
    .moneyNum{
        color: #F5222D;
    }
    .ivu-steps-horizontal .ivu-steps-title:after{
        width: 100%;
    }
}
</style>
<template>
    <Modal
        :mask-closable="false"
        v-model="classShowTipBoo"
        class-name="classShow"
        :class="{fixedHeight: current==1 || current==2 || current==3}"
        :title="$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_4975')"
        width="900">
        <Steps :current="current">
            <Step :title="$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_4976')" :content="$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_4977')"></Step>
            <Step :title="$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_4978')" :content="$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_4979')"></Step>
            <Step :title="$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_4980')" :content="$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_4981')"></Step>
            <Step :title="$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_4982')" :content="$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_4983')"></Step>
        </Steps>
        <chooserefound ref="chooserefoundRef" v-show="current==0" @changeStudent="changeStudent"></chooserefound>
        <lookInfo 
            ref="lookInfoRef" 
            v-show="current==1" 
            @changeCurReceipt="changeCurReceipt"
            :curStudent="curStudent" 
            :studentInformation="studentInformation"
            :ht_receipt_out_kind="ht_receipt_out_kind">
        </lookInfo>
        <responsibility 
            ref="responsibilityRef" 
            v-show="current==2"
            :curReceipt="formatNums(curReceipt)">
        </responsibility>
        <feedback ref="feedbackRef" v-show="current==3" :ht_refund_reason_type="ht_refund_reason_type"></feedback>
        <div slot="footer" class="modiRoomTip" :class="current==1 || current==2 || current==3?'modiRoomTiptwo':''">
            <div v-if="current==1 || current==2 || current==3">{{$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_4984')}}<span class="moneyNum">{{formatNums(curReceipt)}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</div>
            <div>
                <Button @click="handleReset" style="margin-left: 8px">
                    {{(current==0 || (current==1 && !editRefound))?$t('classroom_allscore_53'):$t('teachpush_teachpush_656')}}
                </Button>
                <Button type="primary" @click="handleSubmit">{{current==3?$t('courselist_compontents_servicecontent_214'):$t('teachpush_teachpush_658')}}</Button>
            </div>
        </div>
    </Modal>
</template>
<script>
import { mapMutations } from "vuex";
import chooserefound from "./components/chooserefound";
import lookInfo from "./components/lookInfo";
import responsibility from "./components/responsibility";
import feedback from "./components/feedback";
import valid, { errors, htReceipt, sysDict, common, comAuditFlow } from "../../libs/request";

export default {
    components: {
        chooserefound,
        lookInfo,
        responsibility,
        feedback
    },
    data() {
        return {
            isActioning: false, //多次提交拦截
            editRefound: true, // 是否能进入第一步，修改合同，从我的合同审批 - 详情 - 重新提交进来的，不能修改
            classShowTipBoo: false,
            current: 0,
            studentId: '',
            params: {},
            com_audit_status: [],
            ht_receipt_out_kind: [],
            ht_refund_reason_type: [],
            studentInformation: {
                countMoney: 0,
                courseHourNum: 0,
                leftCourseHour: 0,
                itemPresentNumTotal: 0,
                itemPresentNumLeft: 0,
                // 禅道721变更
                publicUnitPrice: 0, // 课时单价
                courseUnitPrice:0, // 折后单价
                refundableAmount:0,// 可退金额
                refundAmount:0 // 应退金额
            },
            curReceipt: 0,
            curStudent: {},
            isMianIsChange: false,
            mainOfficeId: '',
            mainUserId: '',
            initResponsibilityRef: true,
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        init() {
            this.baseData();
        },
        changeStudent(item) {
            console.log(item)
            this.studentId = item.id;
            this.curStudent = item;
        },
        applyRefundRefShow(contract) {
            // console.log(contract)
            // 初始化
            this.initResponsibilityRef = true;
            this.classShowTipBoo = true;
            this.isMianIsChange = false;
            this.editRefound = true;
            // setTimeout(() => {
            this.current = 0;
            this.params = {};
            if(contract) {
                // console.log(contract)
                contract.ctId = contract.ctId || contract.id;
                this.$refs.chooserefoundRef.init(contract)
            } else {
                this.$refs.chooserefoundRef.reset();
            }
            this.$refs.lookInfoRef.init();
            this.$refs.feedbackRef.init();
            this.curReceipt = 0;
            this.studentId = '';
            // }, 100);
        },
        approvalEdit(obj) {
            // 从我的合同审批 - 详情 - 重新提交
            this.initResponsibilityRef = false;
            this.classShowTipBoo = true;
            this.isMianIsChange = false;
            this.editRefound = false;
            this.current = 1;
            this.params = {};
            this.getForm(obj, () => {
                this.$refs.chooserefoundRef.initParams(this.params, () => {
                    this.handleSubmitTep1(() => {
                        this.$refs.lookInfoRef.initParams(this.params);
                        // this.$refs.responsibilityRef.initParams(this.params);
                        this.$refs.feedbackRef.initParams(this.params);
                    });
                });
                
            });
        },
        getForm(item, callback) {
            // 获取退费详情
            htReceipt.form({ id: item.id }).then(valid.call(this)).then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    this.params = _data;
                    this.studentId = this.params.studentId;
                    // this.studentInformation = {
                    //     category: _data.category,
                    //     countMoney: _data.htReceiptDetailList && _data.htReceiptDetailList.length && _data.htReceiptDetailList[0].itemPrice - 0 || 0,
                    //     courseHourNum: _data.htReceiptDetailList && _data.htReceiptDetailList.length && _data.htReceiptDetailList[0].courseHourNum - 0,
                    //     courseUnitPrice: _data.htReceiptDetailList && _data.htReceiptDetailList.length && _data.htReceiptDetailList[0].courseUnitPrice - 0,
                    //     ctNo: _data.ctNo,
                    //     itemName: _data.htReceiptDetailList && _data.htReceiptDetailList.length && _data.htReceiptDetailList[0].itemName - 0,
                    //     itemPresentNumLeft: _data.htReceiptDetailList && _data.htReceiptDetailList.length && _data.htReceiptDetailList[0].itemPresentNumLeft - 0,
                    //     itemPresentNumTotal: _data.htReceiptDetailList && _data.htReceiptDetailList.length && _data.htReceiptDetailList[0].itemPresentNumTotal - 0,
                    //     leftCourseHour: _data.htReceiptDetailList && _data.htReceiptDetailList.length && _data.htReceiptDetailList[0].itemNum - 0,
                    //     publicUnitPrice: _data.htReceiptDetailList && _data.htReceiptDetailList.length && _data.htReceiptDetailList[0].publicUnitPrice - 0,
                    //     refundAmount: _data.curReceipt - 0,
                    //     refundableAmount: _data.refundableAmount - 0,
                    // }
                    delete this.params.htReceiptDetailList;
                    this.curStudent = {
                        id: _data.studentId,
                        name: _data.studentName,
                        gradeLabel: _data.gradeLabel,
                    };
                    let arr = []
                    if(_data.refundReasonList && _data.refundReasonList.length) {
                        _data.refundReasonList.forEach(e => {
                            arr.push(e.id)
                        });
                    }
                    this.params.attachmentIds = arr
                    callback && callback();
                }
            })
            .catch(errors.call(this))
            .finally();
        },
        handleReset() {
            if(!this.editRefound && this.current == 1) {
                this.classShowTipBoo = false;
            } else {
                if (this.current != 0) {
                    this.current--;
                } else {
                    this.classShowTipBoo = false;
                }
            }
        },
        handleSubmitTep1(callback) {
            let _paramsChooserefound = this.$refs.chooserefoundRef.onNext();
            if(_paramsChooserefound) {
                
                this.params = Object.assign(this.params, _paramsChooserefound);
               
                // console.log(this.params, _paramsChooserefound)
                let __curCountMoney = this.params.countMoney;
                delete this.params.countMoney;
                if(!(this.params.htReceiptDetailList && this.params.htReceiptDetailList.length)) {
                    this.$Message.error(this.$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_4991'))
                    return false;
                }
                this.studentInformation.ctNo = this.params.ctNo;
                this.studentInformation.category = this.params.category;
                this.studentInformation.itemName = this.params.htReceiptDetailList[0].itemName;
                let _countMoney = 0,  //可退金额： 
                    _courseHourNum = 0, //购买课时数：:courseHourNum - itemBuyNumTotal
                    _leftCourseHour = 0, //剩余购买课时数：:leftCourseHour - itemNum
                    _itemPresentNumTotal = 0, //赠课课时数：:itemPresentNumTotal
                    _itemPresentNumLeft = 0 //剩余赠课课时数：:itemPresentNumLeft
                    // 禅道721变更
                    ,_publicUnitPrice = 0, // 课时单价
                    _courseUnitPrice = 0, // 折后单价
                    _refundableAmount = 0, // 可退金额
                    _refundAmount = 0; // 应退金额

                this.params.htReceiptDetailList.forEach(item => {
                    // 退费金额
                    _countMoney += Number(item.itemPrice);
                    _courseHourNum += Number(item.itemBuyNumTotal);
                    _leftCourseHour += Number(item.itemNum);
                    _itemPresentNumTotal += Number(item.itemPresentNumTotal);
                    _itemPresentNumLeft += Number(item.itemPresentNumLeft);
                    // 禅道721变更
                    _publicUnitPrice += Number(item.publicUnitPrice); // 课时单价
                    _courseUnitPrice += Number(item.courseUnitPrice); // 折后单价
                    _refundableAmount += Number(item.refundableAmount); // 可退金额
                    _refundAmount += Number(item.refundAmount); // 应退金额
                });
                
                if(this.params.status && this.params.status == 'paying') {
                    this.studentInformation.countMoney = __curCountMoney;
                    this.studentInformation.courseHourNum = 0;
                    this.studentInformation.leftCourseHour = 0;
                    this.studentInformation.itemPresentNumTotal = 0;
                    this.studentInformation.itemPresentNumLeft = 0;
                } else {
                    this.studentInformation.countMoney = parseFloat(_countMoney.toFixed(4));
                    this.studentInformation.courseHourNum = _courseHourNum;
                    this.studentInformation.leftCourseHour = _leftCourseHour;
                    this.studentInformation.itemPresentNumTotal = _itemPresentNumTotal;
                    this.studentInformation.itemPresentNumLeft = _itemPresentNumLeft;

                }
                // 禅道721变更
                this.studentInformation.publicUnitPrice = _publicUnitPrice; // 课时单价
                this.studentInformation.courseUnitPrice =_courseUnitPrice; // 折后单价
                this.studentInformation.refundableAmount =_refundableAmount; // 可退金额
                this.studentInformation.refundAmount =_refundAmount; // 应退金额
                console.log(this.studentInformation)
                if (this.current != 3) {
                    this.current++;
                }
            } else {
                if(!(this.params.htReceiptDetailList && this.params.htReceiptDetailList.length)) {
                    this.$Message.error(this.$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_4991'))
                    return false;
                }
                if (this.current != 3) {
                    this.current++;
                }
            }
            console.log('1', this.params, this.studentInformation, _paramsChooserefound)
            callback && callback();
        },
        handleSubmitTep2() {
            this.$refs.lookInfoRef.changeStatus();
            let _params = this.$refs.lookInfoRef.handleSubmit();
            console.log(_params.curReceipt, _params.refundAmount,'~~~~~~~~')
            if(_params === undefined) {
                return false;
            }
            if(!_params.curReceipt || _params.curReceipt == '0') {
                this.$Message.error(this.$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_49921'))
                this.$refs.lookInfoRef && this.$refs.lookInfoRef.submitError();
                return false;
            }
            // if(Number(_params.curReceipt) > Number(_params.refundAmount)) {
            if(Number(_params.curReceipt) > Number(_params.refundableAmount)) {
                this.$Message.error(this.$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_4992'))
                this.$refs.lookInfoRef && this.$refs.lookInfoRef.submitError();
                return false;
            }
            if(Number(_params.penalPrice) + Number(_params.giftPrice) >= Number(_params.curReceipt)) {
                this.$Message.error(this.$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_4993'))
                this.$refs.lookInfoRef && this.$refs.lookInfoRef.submitError();
                return false;
            }
            this.params = Object.assign(this.params, _params);
            if(!_params.bank) this.params.bank = '';
            if(!_params.account) this.params.account = '';
            if(!_params.accountName) this.params.accountName = '';
            if(!_params.giftPrice) this.params.giftPrice = 0;
            if(!_params.penalPrice) this.params.penalPrice = 0;
            this.params.factReceipt = Number(this.curReceipt);
            console.log('2', this.params)
            // this.initResponsibilityRef && this.$refs.responsibilityRef.init(this.params.receiptOutOfficeId, this.params.receiptOutUserId, this.params.htReceiptDetailList[0].studentCourseId);
            this.$refs.responsibilityRef.init(this.params.receiptOutOfficeId, this.params.receiptOutUserId, this.params.htReceiptDetailList[0].studentCourseId);
            if (this.current != 3) {
                this.current++;
            }
        },
        handleSubmitTep3() {
            let _paramsResponsibility = this.$refs.responsibilityRef.onNext();
            if(_paramsResponsibility) {
                // 判断主要分配人员是否有修改
                if(_paramsResponsibility.htReceiptDetailPartnerShowVO.officeList && _paramsResponsibility.htReceiptDetailPartnerShowVO.officeList.length) {
                    _paramsResponsibility.htReceiptDetailPartnerShowVO.officeList.forEach(officeList => {
                        if(officeList.isMain == '1') {
                            this.mainOfficeId = officeList.officeId;
                        }
                    });
                    _paramsResponsibility.htReceiptDetailPartnerShowVO.officeList = _paramsResponsibility.htReceiptDetailPartnerShowVO.officeList.map(item => {
                        return {
                            officeId: item.officeId,
                            officePrice: item.officePrice
                        }
                    });
                }
                if(_paramsResponsibility.htReceiptDetailPartnerShowVO.userList && _paramsResponsibility.htReceiptDetailPartnerShowVO.userList.length) {
                    _paramsResponsibility.htReceiptDetailPartnerShowVO.userList.forEach(userList => {
                        if(userList.isMain == '1') {
                            this.mainUserId = userList.userId;
                        }
                    });
                    _paramsResponsibility.htReceiptDetailPartnerShowVO.userList = _paramsResponsibility.htReceiptDetailPartnerShowVO.userList.map(item => {
                        return {
                            userId: item.userId,
                            userPrice: item.userPrice
                        }
                    })
                }
                if(this.mainOfficeId != this.params.receiptOutOfficeId || this.mainUserId != this.params.receiptOutUserId) {
                    this.isMianIsChange = true;
                } else this.isMianIsChange = false;
                // _num: 实退金额
                let _num = Number(this.params.curReceipt) - Number(this.params.penalPrice) - Number(this.params.giftPrice)
                // console.log(_num)
                let _object = _paramsResponsibility.htReceiptDetailPartnerShowVO;
                // 计算分配总金额，必须等于实退金额
                let countNumUser = 0, countNumOffice = 0;
                _object.officeList.forEach(list => {
                    countNumOffice += list.officePrice;
                });
                _object.userList.forEach(list => {
                    countNumUser += list.userPrice;
                });

                if(countNumOffice != this.curReceipt) {
                    this.$Message.error(this.$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_4994'));
                    return false;
                }
                if(countNumUser > this.curReceipt) {
                    this.$Message.error(this.$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_4995'));
                    return false;
                }
                this.params = Object.assign(this.params, _paramsResponsibility);
                console.log('3',this.params)
                if (this.current != 3) {
                    this.current++;
                }
            }
        },
        handleSubmit() {
            if(!this.studentId) {
                this.$Message.error(this.$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_4990'))
                return false;
            }
            if(this.current == 0) {
                this.handleSubmitTep1();
                // this.$refs.responsibilityRef.init(this.params.receiptOutOfficeId, this.params.receiptOutUserId, this.params.htReceiptDetailList[0].studentCourseId);
            } else if(this.current == 1) {
                this.handleSubmitTep2();
            } else if(this.current == 2) {
                this.handleSubmitTep3();
            } else if(this.current == 3) {
                let _paramsFeedback = this.$refs.feedbackRef.onNext();
                this.params = Object.assign(this.params, _paramsFeedback);
                console.log('41~~',this.params)
                if(!this.params.refundReasonType) {
                    this.$Message.error(this.$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_4996'))
                    return false;
                }
                if(!(this.params.attachmentIds && this.params.attachmentIds.length)) {
                    this.$Message.error(this.$t('modules_spoc_sign_web_src_views_applyrefund_applyrefund_4997'))
                    return false;
                }
                console.log('4',this.params)
                this.saveRefund(this.mainOfficeId, this.mainUserId);
            }
            // console.log(this.params)
            /* if (this.current != 3) {
                this.current++;
            } else {
                // delete this.params.countOffice;
                // delete this.params.countObject;
                // console.log(this.params)
                this.saveRefund(this.mainOfficeId, this.mainUserId);
            } */
        },
        saveRefund(__mainOfficeId, __mainUserId) {
            // console.log(__mainOfficeId, __mainUserId, this.isMianIsChange)
            if(this.isActioning){ //多次提交拦截
                return
            }
            let __receiptOutOfficeId = this.params.receiptOutOfficeId, __receiptOutUserId = this.params.receiptOutUserId;
            delete this.params.receiptOutOfficeId;
            delete this.params.receiptOutUserId;
            this.isActioning = true
            this.updateLoadingStatus({ isLoading: true });
            this.params.receiptTime = new Date(this.params.receiptTime).format('yyyy-MM-dd hh:mm:ss')
            htReceipt.saveRefund(this.params)
            .then(valid.call(this))
            .then(res=>{
                if(res.ok){
                    if(this.isMianIsChange) {
                        this.submitHtRecepit(__mainOfficeId, __mainUserId);
                    } else {
                        let params = {
                            auditType: 'contract receipt out',
                            officeId: this.params.officeId,
                            objectId: res.data.data,
                            studentId: this.params.studentId,
                        }
                        // this.sendAudit(params);
                        this.classShowTipBoo = false;
                        this.$emit('uploadLists')
                    }
                } else {
                    this.params.receiptOutOfficeId = __receiptOutOfficeId;
                    this.params.receiptOutUserId = __receiptOutUserId;
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
                setTimeout(()=>{
                    //多次提交拦截
                    this.isActioning = false
                },200)
            });
        },
        submitHtRecepit(__mainOfficeId, __mainUserId) {
            // 提交修改主要责任人
            let params = {
                ctId: this.params.ctId,
                type: '1',
                officeId: __mainOfficeId,
                userId: __mainUserId
            }
            htReceipt.updateHtRecepitOfficeIdAndUserId(params)
            .then(valid.call(this))
            .then(res=>{
                if(res.ok){
                    // this.$Message.success('修改成功')
                    this.classShowTipBoo = false;
                    this.$emit('uploadLists')
                }
            })
            .catch(errors.call(this))
        },
        sendAudit(params) {
            comAuditFlow.sendAudit(params)
            .then(valid.call(this))
            .then(res=>{
                if(res.ok){
                    this.$emit('uploadLists')
                }
            })
            .catch(errors.call(this))
        },
        baseData() {
			let types = [
                'com_audit_status', //审批状态字典
                'ht_receipt_out_kind', //退款方式字典
                'ht_refund_reason_type', //退费原因
            ]
			sysDict.batchListData({
				types: types.join(',')
			})
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
                    let _data = res.data.data;
                    // console.log(_data)
					this.com_audit_status = _data.com_audit_status
					this.ht_receipt_out_kind = _data.ht_receipt_out_kind
					this.ht_refund_reason_type = _data.ht_refund_reason_type
				}
			})
            .catch(errors.call(this));
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
        changeCurReceipt(num) {
            this.curReceipt = num;
        }
    }
};
</script>
