<style lang="less">
.responseThree {
    .flex-row{
        display: flex;
        flex-direction: row;
        
    }
    // 恢复
    .pa-bottom{
        width:100%;
        min-height:302px;
        .flex-row;
        justify-content: space-between;
        align-items: stretch;
    }
    .pa-c{
        width:415px;
        border:1px solid #D4D5DA;
        h2{
            height:50px;
            line-height: 50px;
            font-weight: normal;
            font-size: 14px;
            padding-left: 16px;
            border-bottom:1px solid #D4D5DA;
            em{
                color:#FF3000;
                padding-right:3px;
            }
        }
    }
    .left-item-box,.right-item-box{
        padding:3px 16px 11px 16px;
        height: 250px;
        overflow-y: auto;
    }
    .item-box-item{
        height:32px;
        .flex-row;
        justify-content: flex-start;
        align-items: center;
        margin-top:8px;
    }
    .add-prev{
        height:32px;
        width:34px;
        .flex-row;
        justify-content: space-between;
        align-items: center;
        i{
            cursor: pointer;
            color: #999;
            &:hover{
                color: #44bcb7;
            }
        }
    }
    .price-content{
        width: 122px;margin-right: 12px;
        .ivu-input-number{
            float: left;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
        .price-right{
            float: left;
            width: 34px;height: 32px;
            text-align: center;line-height: 32px;
            border-radius: 0 4px 4px 0;border: 1px solid #dcdee2;background-color: #f8f8f9;
            border-left: none;
        }
    }
}
</style>
<template>
    <div class="responseThree">
        <div class="pa-bottom">
            <div class="pab-left pa-c">
                <h2><em>*</em><span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_responsibility_5057')}}</span></h2>
                <div class="left-item-box">
                    <div class="item-box-item" v-for="(one,index) in officeLists" :key="index">
                        <Select :placeholder="$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_781')" 
                            :disabled="one.isMain == '1'" 
                            @on-change="changeOfficeId" 
                            v-model="one.officeId" 
                            clearable  
                            style="width:160px;margin-right:8px;">
                            <Option v-for="item in schoolList" v-show="checkOfficeId.indexOf(item.id) == -1" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                        <div class="price-content">
                            <InputNumber v-model="one.officePrice" :min="0" :precision="2" :active-change="false" style="width: 88px;"/>
                            <span class="price-right">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                        </div>
                        <div class="add-prev">
                            <i 
                                class="iconfont icon-zhuanzerenren" 
                                @click="updateHtRecepit(one, index, 'office')"
                                v-if="one.isMain == '0'">
                            </i>
                            <Icon @click="addOfficeItem"
                                v-if="officeLists.length < 2 || (index === officeLists.length - 1 && officeLists.length > 1) "
                                type="md-add-circle" />
                            <Icon @click="delOfficeItem(index)" v-if="index >= 1" type="md-remove-circle" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="pab-right pa-c">
                <h2><em>*</em><span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_responsibility_5060')}}</span></h2>
                <div class="right-item-box">
                    <div class="item-box-item" v-for="(one,index) in userLists" :key="index">
                        <Select :placeholder="$t('modules_spoc_sign_web_src_views_applyrefund_components_responsibility_5061')" :disabled="one.isMain == '1'" v-model="one.userId" clearable  style="width:160px;margin-right:8px;">
                            <Option v-for="item in teacherList" v-show="checkUserId.indexOf(item.id) == -1" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                        <div class="price-content">
                            <InputNumber v-model="one.userPrice" :min="0" :precision="2" :active-change="false" style="width: 88px;"/>
                            <span class="price-right">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                        </div>
                        <div class="add-prev">
                            <i 
                                class="iconfont icon-zhuanzerenren" 
                                @click="updateHtRecepit(one, index, 'user')"
                                v-if="one.isMain == '0'">
                            </i>
                            <Icon @click="addUserItem"
                                v-if="userLists.length < 2 || (index === userLists.length - 1 && userLists.length > 1) "
                                type="md-add-circle" />
                            <Icon @click="delUserItem(index)" v-if="index >= 1" type="md-remove-circle" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import { MENUIDS } from '@public/libs/config';
import valid, { errors, sysUser, htReceipt } from "../../../libs/request";
export default {
    props: {
        curReceipt: {
            type: Number,
            default: 0
        },
    },
    data() {
        return {
            pId: null,
            officeLists: [],
            officeListsItem: {
                officeId: '',
                officePrice: null,
                isMain: '0'
            },
            schoolList: [],
            userLists: [],
            userListsItem: {
                userId: '',
                userPrice: null,
                isMain: '0'
            },
            teacherList: [],
            id: '',
            type: '',
            mainOffice: {
                id: '',
                name: '',
            },
            mainUser: {
                id: '',
                name: ''
            },
            isMianIsChange: false, //主要责任人是否修改
            receiptOutOfficeId: '',
            receiptOutUserId: '',
            studentCourseId: ''
        };
    },
    computed: {
        checkOfficeId() {
            let _arr = this.officeLists.map(item => {return item.officeId})
            return _arr;
        },
        checkUserId() {
            let _arr = this.userLists.map(item => {return item.userId})
            return _arr;
        },
    },
    mounted() {
        this.pId = MENUIDS.SIGN;
    },
    methods: {
        initParams(params) {
            // 从我的合同审批 - 详情 - 重新提交 - 初始化
            console.log(params.htReceiptDetailPartnerShowVO)
            this.init(params.receiptOutOfficeId, 
                params.receiptOutUserId, 
                params.htReceiptDetailList && params.htReceiptDetailList.length && params.htReceiptDetailList[0].studentCourseId || '', 
                params
            )
        },
        init(receiptOutOfficeId, receiptOutUserId, studentCourseId, params) {
            this.receiptOutOfficeId = receiptOutOfficeId;
            this.receiptOutUserId = receiptOutUserId;
            this.studentCourseId = studentCourseId;
            this.dataScopeFilter();
            // console.log(this.receiptOutOfficeId, this.receiptOutUserId, 'curReceipt: ' + this.curReceipt)
            if(params) {
                if(params.htReceiptDetailPartnerShowVO.officeList && params.htReceiptDetailPartnerShowVO.officeList.length) {
                    this.officeLists = params.htReceiptDetailPartnerShowVO.officeList;
                    this.officeLists.every(v => {
                        v.officePrice = v.officePrice - 0
                    })
                }
                if(params.htReceiptDetailPartnerShowVO.userList && params.htReceiptDetailPartnerShowVO.userList.length) {
                    this.userLists = params.htReceiptDetailPartnerShowVO.userList;
                    this.userLists.every(v => {
                        v.userPrice = v.userPrice - 0
                    })
                }
                console.log('init -1')
            } else {
                this.officeLists = [{
                    officeId: receiptOutOfficeId || '',
                    officePrice: receiptOutOfficeId ? this.curReceipt : null,
                    isMain: '1'
                }];
                this.userLists = [{
                    userId: receiptOutUserId || '',
                    userPrice: receiptOutUserId ? this.curReceipt : null,
                    isMain: '1'
                }];
                console.log('init -2')
            }
            console.log(this.officeLists, this.userLists)
            this.changeOfficeId(this.receiptOutOfficeId);
        },
        addOfficeItem() {
            this.officeLists.push(Object.assign({}, this.officeListsItem));
        },
        delOfficeItem(index) {
            if(this.officeLists.length>1){
                this.officeLists.splice(index,1)
            }
        },
        addUserItem() {
            this.userLists.push(Object.assign({}, this.userListsItem));
        },
        delUserItem(index) {
            if(this.userLists.length>1){
                this.userLists.splice(index,1)
            }
        },
        dataScopeFilter() {
            // 获取校区列表
            // sysUser.dataScopeFilter({
            //     menuId: this.pId
            htReceipt.getResponsibleOfficeList({
				studentCourseId: this.studentCourseId
			})
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
                    this.schoolList = res.data.data;
				}
			})
			.catch(errors.call(this));
        },
        changeOfficeId(officeId) {
            let officeIds = [];
            this.officeLists.forEach(list => {
                let _id = list.officeId;
                if(_id && officeIds.indexOf(_id) == -1) {
                    officeIds.push(_id);
                }
            });
            if(officeIds && officeIds.length) {
                let params = {
                    officeIds: officeIds.join(','),
                    joinScope: 'ads,jur,cro'
                }
                this.listPageOfficeScopeUser(params);
            }
        },
        listPageOfficeScopeUser(params) {
            sysUser.listPageOfficeScopeUser(params)
            .then(valid.call(this))
            .then(res=>{
                if(res.ok){
                    let _data = res.data.data;
                    this.teacherList = _data;
                    // this.$set(this.teacherListMap, params.officeIds, [..._data])
                }
            })
            .catch(errors.call(this))
        },
        updateHtRecepit(item, index, type) {
            // 修改主要责任人
            // type: 'office' || 'user'
            if(type == 'office') {
                if(item.officeId) {
                    let _curr = this.officeLists.splice(index,1)[0];
                    let _mainOffice = this.schoolList.filter(item => {
                        return item.id == _curr.officeId;
                    })[0];
                    this.mainOffice = {
                        id: _mainOffice.id,
                        name: _mainOffice.name
                    }
                    this.officeLists.unshift(_curr);
                    this.officeLists.forEach(list => {
                        list.isMain = '0';
                    });
                    this.officeLists[0].isMain = '1';
                } else {
                    this.$Message.error(this.$t('modules_spoc_sign_web_src_views_applyrefund_components_responsibility_5062'));
                }
            } else {
                if(item.userId) {
                    let _curr = this.userLists.splice(index,1)[0];
                    let _mainUser = this.teacherList.filter(item => {
                        return item.id == _curr.userId;
                    })[0];
                    this.mainUser = {
                        id: _mainUser.id,
                        name: _mainUser.name
                    }
                    this.userLists.unshift(_curr);
                    this.userLists.forEach(list => {
                        list.isMain = '0';
                    });
                    this.userLists[0].isMain = '1';
                } else {
                    this.$Message.error(this.$t('modules_spoc_sign_web_src_views_applyrefund_components_responsibility_5063'));
                }
            }
        },
        onNext() {
            // 前端验证
            let _officeLists = [], _userList = [];
            let __mainOfficeId = '', __mainUserId = '';
            this.officeLists.forEach(item => {
                // console.log(item)
                if(item.isMain == '1') {
                    // 判断主责人校区金额是否存在，如果金额被情况，改为0
                    if(item.officePrice == null) item.officePrice = 0; 
                    _officeLists.push(item);
                } else if(item.officeId && item.officePrice) {
                    _officeLists.push(item);
                }
            });
            this.userLists.forEach(item => {
                // console.log(item)
                if(item.isMain == '1') {
                    // 判断主责人校区金额是否存在，如果金额被情况，改为0
                    if(item.userPrice == null) item.userPrice = 0; 
                    _userList.push(item);
                } else if(item.userId && item.userPrice) {
                    _userList.push(item);
                }
            });
            let params = {
                htReceiptDetailPartnerShowVO: {
                    officeList: _officeLists,
                    userList: _userList
                }
            }
            // console.log(params)
            return params;
        }
        
    }
};
</script>
