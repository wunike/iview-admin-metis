<style lang="less">
.resourceEntryModal{
    min-height: 100%;
    .edit_btn{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 15px 20px 0 0;
    }
    .mark-line{
        width:100%;
        height:24px;
        display: flex;flex-direction: row;
        align-items: center;
        position: relative;
        margin-bottom:15px;
        margin-top: 0px;
        .line{
            height:1px;
            width:100%;
            background:#D9D9D9;
        }
        span{
            position: absolute;
            top:3px;
            left:24px;
            z-index: 2;
            padding:0 10px;
            background: #fff;
            font-size: 14px;
            color:#495060;
        }
    }
    .add-btn{
        border:1px solid #ccc;
        height:31px;
        width:31px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 8px;
        margin-top: 0 !important;
    }
    .ivu-form-item{
        margin-bottom:20px;
    }
    .link-classname{
        .ivu-poptip-body{
            padding: 0!important;
        }
    }
    .com{
        background: #fff;
        padding:26px 32px;
        border-radius:4px;
    }
    .stu-info {
        &.com{
            padding-top: 0;
        }
    }
    .no-com{
        margin-top:0px;
    }
    .userTargetInner {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        > span {
            display: inline-block;
            font-size: 12px;
            color: rgba(73, 80, 96, 1);
            background: rgba(235, 236, 240, 1);
            border-radius: 4px;
            padding: 0px 12px;
            margin-right: 8px;
            margin-top: 2px;
        }
    }
    .contacts_wrap {
        .linkman {
            margin-bottom: 14px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .linkman_tit {
                flex: 1;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .tit_cont {
                    display: inline-block;
                    width: 110px;
                    padding-right:12px;
                    text-align: right;
                    font-weight: bold;
                    font-size: 14px;
                }
            }
            button {
                margin-left: 12px;
            }
        }
    }
    .fixed-button{
        background: #fff;
        width:100%;
        padding:12px 16px 8px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    	box-shadow:0px -1px 3px 0px rgba(0,0,0,0.12);
    }
    .common{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .left,.right{
            width: auto;
            flex: 1;
        }
    }
    .custom-block-title{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 14px;
    }
    .phone_box{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .mark-line{
        font-size:16px;
        font-weight:500;
        color:rgba(73,80,96,1);
        line-height:22px;
        span{
            left: 0;
        }
        .line{
            display: none;
        }
    }
}
.same_modal{
    .same_modal_header{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .same_modal_title{
            font-size:18px;
            font-weight:500;
            color:rgba(0,0,0,0.85);
            line-height:24px;
        }
        .same_modal_info{
            font-size:12px;
            font-weight:normal;
            color:rgba(153,153,153,1);
            line-height:18px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
    }
    .same_modal_footer{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        button{
            margin-left: 10px;
        }
    }
}
.add_name_modal{
    .warn{
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 14px;
    }
    .same_modal_title{
        font-size:18px;
        font-weight:500;
        color:rgba(0,0,0,0.85);
        line-height:24px;
    }
    .same_modal_footer{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        button{
            margin-left: 10px;
        }
    }
}
</style>

<template>
    <div class="resourceEntryModal">
        <div class="edit_btn" v-if="!tEdit&&showLine=='1'">
            <Tooltip content="编辑基本信息" placement="bottom-end">
                <span @click="setEdit" style="cursor: pointer;">
                    <Icon type="ios-create-outline" size="18" />
                </span>
            </Tooltip>
        </div>
        <Form ref="formValidate" label-colon :model="studData" :rules="studRule" :label-width="110" v-if="tEdit">
            <div class="custom-block com">
                <div class="custom-block-title">
                    <h2>客户信息</h2>
                    <div v-if="showLine == '1'">（{{studData.cusCode}}）</div>
                </div>
                <div v-if="fieldJson.length">
                    <Row>
                        <Col span="12">
                            <FormItem prop="name" :label="formItemName('name')" v-if="formItemshow('name')">
                                <Input v-model="studData.name" :disabled="isInvalidOverride" :placeholder="'请输入'+formItemName('name')" ></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem  prop="enName" :label="formItemName('enName')" v-if="formItemshow('enName')">
                                <Input v-model="studData.enName" :placeholder="'请输入'+formItemName('enName')" ></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <!-- <FormItem prop="phoneList" required> -->
                                <!-- <div:style="index!=studData.phoneList.length-1?'margin-bottom:14px;':''"> -->
                                    <FormItem :label="index==0?formItemName('phoneList'):''" :prop="'phoneList.'+index+'.phone'" :rules="[{ required:true, 'validator': validatePhone, 'trigger': 'blur' }]" v-for="(phoneItem, index) in studData.phoneList" :key="'phoneList'+index" v-if="formItemshow('phoneList')">
                                    <div class="phone_box">
                                            <Select transfer v-model="phoneItem.district" placeholder="请选择" clearable :disabled="(index==0&&showLine=='1')||isInvalidOverride" style="width: 94px;">
                                                <Option :value="item.areaCode" v-for="item in areaCodeList" :key="item.areaCode">{{item.areaCodeShow+item.name}}</Option>
                                            </Select>
                                            <Input v-model="phoneItem.phone" :placeholder="'请输入'+formItemName('phoneList')" @on-blur="phoneBlur(index,phoneItem.phone)" :disabled="(index==0&&showLine=='1')||(isInvalidOverride)" style="flex: 1;"></Input><!-- findPhonePlace(index,phoneItem.phone) -->
                                            <span class="add-btn" @click="addPhone" v-show="!isInvalidOverride" v-if="index==0"><Icon size="14" color="#ccc" type="md-add"/></span>
                                            <span class="add-btn" v-show="!isInvalidOverride" @click="delPhone(index)" v-else><Icon size="14" color="#ccc" type="md-remove"/></span>
                                    </div>
                                    </FormItem>
                                <!-- </div> -->
                            <!-- </FormItem> -->
                        </Col>
                        <Col span="12">
                            <FormItem  prop="gender" :label="formItemName('gender')" v-if="formItemshow('gender')">
                                <RadioGroup v-model="studData.gender">
                                    <Radio style="margin-right:40px;" label="m">男</Radio>
                                    <Radio label="f">女</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem prop="districtEntity" :label="formItemName('districtEntity')" v-if="formItemshow('districtEntity')">
                                <Row type="flex" justify="space-between">
                                    <Col span="8">
                                        <Select transfer v-model="studData.districtEntity.country" placeholder="请选择国家/地区" clearable @on-change="toShowCity('countryName',$event)">
                                            <Option :value="item.id" v-for="item in countryList" :key="item.id">{{item.name}}</Option>
                                        </Select>
                                    </Col>
                                    <Col span="8">
                                        <Select transfer v-model="studData.districtEntity.province" placeholder="请选择市" clearable @on-change="toShowCity('provinceName',$event)">
                                            <Option :value="item.id" v-for="item in provinceList" :key="item.id">{{item.name}}</Option>
                                        </Select>
                                    </Col>
                                    <Col span="8">
                                        <Select transfer v-model="studData.districtEntity.city" placeholder="请选择省/州" clearable @on-change="toShowCity('cityName',$event)">
                                            <Option :value="item.id" v-for="item in cityList" :key="item.id">{{item.name}}</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem  prop="birthday" :rules="formItemrequired('birthday')?[{required: formItemrequired('birthday'),type:'date', message: formItemName('birthday')+'不能为空', trigger: 'change'}]:[]" :label="formItemName('birthday')" v-if="formItemshow('birthday')">
                                <DatePicker type="date"
                                            style="width:100%;"
                                            :placeholder="formItemName('birthday')"
                                            :options="birthdayOption"
                                            v-model="studData.birthday"
                                            transfer>
                                </DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem prop="sourceList" :label="formItemName('sourceList')" v-if="formItemshow('sourceList')">
                                <!-- <Row type="flex" justify="space-between">
                                    <Col span="24"> -->
                                        <!-- <Select transfer v-model="studData.sourceList[0]" clearable @on-change="sourceChange(1,$event)" :disabled="$route.query.isTransferIntro=='1'">
                                            <Option :value="item.value" v-for="item in sourceList[0]" :key="item.id" v-if="isShowSource(item)">{{item.label}}</Option>
                                        </Select> -->
                                            <Cascader :data="sourceList" :placeholder="'请输入'+formItemName('sourceList')" transfer filterable clearable v-model="studData.sourceList" @on-change="sourceChange"></Cascader>

                                    <!-- </Col>
                                </Row> -->
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem prop="wechat" :label="formItemName('wechat')" v-if="formItemshow('wechat')">
                                <Input v-model="studData.wechat" :placeholder="'请输入'+formItemName('wechat')" ></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row v-if="studData.sourceList[0]=='referral'">
                        <Col span="12">
                            <FormItem prop="referral.referralType" label="转介绍类型">
                                <Select transfer v-model="studData.referral.referralType" placeholder="选择转介绍类型" @on-change="referralTypeChange">
                                    <Option v-for="item in referralList" :value="item.value" :key="item.is">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem prop="referral.referraler" label="介绍人">
                                <Select :label="studData.referral.referralerName" ref="referraler" v-model="studData.referral.referraler" filterable remote :remote-method="remoteReferraler" :loading="referralLoading" @on-change="referralerChange">    <!-- @on-query-change="referralerQuery" -->
                                    <Option v-for="item in referralerList" :value="item.id" :key="item.id" :label="item.name">
                                        <span>{{item.name}}</span>
                                        <span style="float:right;color:#ccc">{{item.phone}}</span>
                                    </Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem prop="qq" :label="formItemName('qq')" v-if="formItemshow('qq')">
                                <Input v-model="studData.qq" :placeholder="'请输入'+formItemName('qq')" ></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem prop="address" :label="formItemName('address')" v-if="formItemshow('address')">
                                <Row type="flex" justify="space-between">
                                    <div style="width:100%;
                                    display: flex;
                                    flex-direction: row;
                                    justify-content: space-between;
                                    align-items: center;">
                                        <Input style="margin-right: 8px;"  v-model="studData.address" :placeholder="'请输入'+formItemName('address')"></Input>
                                        <Button @click="getMap">地址选择</Button>
                                    </div>
                                </Row>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem prop="email" :label="formItemName('email')" v-if="formItemshow('email')">
                                <Input v-model="studData.email" :placeholder="'请输入'+formItemName('email')" ></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem prop="remarks" label="请选择中心">
                            <Select transfer v-model="studData.selectOfficeId" placeholder="请选择中心" clearable>
                                <Option :value="item.id" v-for="item in officeList" :key="item.id">{{item.name}}</Option>
                            </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="请选择学校">
                                <Select
                                    v-model="studData.schoolId"
                                    placeholder="请选择学校"
                                    filterable
                                    remote
                                    clearable
                                    :remote-method="getComSchoolListName"
                                    :loading="loading">
                                    <Option v-for="(option, index) in schoolList" :value="option.id" :key="index">{{option.name}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <FormItem prop="remarks" :label="formItemName('remarks')" v-if="formItemshow('remarks')">
                                <Input v-model="studData.remarks"  type="textarea" :rows="4" :placeholder="'请输入'+formItemName('remarks')" show-word-limit maxlength="255"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row v-if="showLine == '1'">
                        <Col span="24">
                            <FormItem label="用户标签" prop="tag">
                                <div class="userTargetInner">
                                    <span v-for="item in userLabelData" :key="item">{{item}}</span>
                                    <!-- <span>常规课</span> -->
                                    <userLabel
                                            ref="userLabelRef"
                                            menuId="2001"
                                            flag="0"
                                            :echoDisplay="true"
                                            :defaultCheckedTagids="studData.tags"
                                            @userLabelTrueChoose="userLabelTrueChoose"
                                    >
                                            <span slot="hasTagName">
                                                <Icon type="ios-create-outline" size="18" />
                                            </span>
                                    </userLabel>
                                </div>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </div>
            <div class="stu-info com">
                <h2 style="margin-bottom: 14px;">更多信息</h2>
                <div>
                    <div class="contacts_wrap" >
                        <form-create ref="fc" v-model="fApi" :rule="rule" :option="option"></form-create>
                    </div>
                </div>
            </div>
        </Form>
        <leadsInfo v-if="!tEdit&&showLine=='1'" :id="id" :stuId="stuId" ref="leadsInfoObj"></leadsInfo>
        <div class="fixed-button" v-if="tEdit&&showLine=='1'">
            <Button @click="reset" style="margin-right: 16px">取消</Button>
            <Button type="primary" @click="saveAll">保存</Button>
        </div>
		<mapModel ref="mapModel" @mapOk="mapOk"></mapModel>
        <Modal
                v-model="sameModal"
                class-name="same_modal"
                width="800"
                title="同名客户提醒">
                <div slot="header" class="same_modal_header">
                    <div class="same_modal_title">手机号已存在</div>
                    <div class="same_modal_info"><Icon type="ios-information-circle" size="14" style="margin: 0 8px;"/>手机号已存在，是否生成手机号相同的新客户？如果确认生成，请点击"确认并保存".</div>
                </div>
                <div>
                    <Table :columns="sameCol" :data="sameData" border></Table>
                </div>
                <div slot="footer" class="same_modal_footer">
                    <Button @click="sameModal=false">不保存</Button>
                    <Button type="primary" @click="validateForm">确认并保存</Button>
                </div>
            </Modal>
            <Modal
                v-model="addNmaeModal"
                class-name="add_name_modal"
                width="400"
                :closable="false"
                :mask-closable="false"
                title="添加姓名">
                <div>
                    <p class="warn">当前姓名为空，请填写姓名</p>
                    <Form ref="formDynamic" :model="studData" :label-width="80" style="width: 300px">

                        <FormItem label="姓名" prop="name" :rules="{required: true, message: '姓名不能为空', trigger: 'blur'}">
                                <Input type="text" v-model="studData.name" placeholder="请填写姓名"></Input>
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer" class="add_name_modal_footer">
                    <Button type="primary" @click="addName">确认</Button>
                </div>
            </Modal>
    </div>
</template>
<script>

    //客户信息录入组件
    // import mapModal from "../views/activityEnrollment/mapModal";
    import valid, { errors, sys, sysUser, sysDict, crmCustomer, sysCommonSql, crmActivity,sysProps,common} from '../libs/request.js';
    import { mapMutations, mapState } from "vuex";
    import userLabel from "@public/modules/userLabel";
    import mapModel from "@public/modules/mapModel.vue";
    import leadsInfo from "./leadsInfo.vue";
    import formCreateSetting from '../views/leadsEntry/formCreate.js';

    export default {
        props:{
            showLine:{
                type:'String',
                require:true
            },
            isEdit:{
                type:Boolean,
                default:true
            },
            id:{
                type:'String',
                default:''
            },
            stuId:{
                type:'String',
                default:''
            },
        },
        mixins: [formCreateSetting],
        components: {
            mapModel,
            userLabel,
            leadsInfo
        },
        data() {
            // const validateReferral = (rule, value, callback) => {
            //     if(value.referralType){
            //         callback();
            //     }else{
            //         callback(new Error('地址不能为空'));
            //     }/*else if(value.city==''&&this.showCity==false){
            //         callback();
            //     }*/
            // };
            const validateSource = (rule, value, callback) => {
                let emptyObj=value.length==3;
                if(emptyObj){
                    callback();
                }else{
                    callback(new Error(this.formItemName('sourceList')+'不能为空'));
                }
            };
            return {
                baseInfo:{},
                schoolList:[],
                loading:false,
                fieldJson:[],
                addNmaeModal:false,
                referralLoading:false,
                referralerList:[],
                sameModal:false,
                isSchoolMap:false,
                showCity:true,
                areaCodeList:[],
                countryList:[],
                provinceList:[],
                cityList:[],
                referralList:[],
                sourceList:[],
                officeList:[],
                birthdayOption:{
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
                nrrLock:false,
                schoolTypeList: [],
                schoolGradeList:[],
                userLabelData: [],
                studData: {
                    activityId:null,
                    qrId:null,
                    channelId:null,
                    officeId:null,
                    followOfficeId:null,
                    name: '',
                    enName:'',
                    wechat: '',
                    phoneList:[
                        {
                            phone: '',
                            district:'0086',
                            isModif:1,
                            locId:'',
                            sort:'',
                        }
                    ],
                    qq: '',
                    districtEntity: {
                        city:'',
                        cityName:'',
                        country:'',
                        countryName:'',
                        province:'',
                        provinceName:''
                    },
                    email: '',
                    selectOfficeId:'',
                    schoolId:'',
                    sourceList: [],
                    address: '',
                    latLongAddress:'',
                    referral: {
                        referralType:"",
                        referraler:"",
                        referralerName:'',
                        referralerPhone:'',
                    },
                    tags: [],
                    remarks:'',
                    birthday:'',
                    gender:'m',
                    additionInfo: {
                        schoolGrade:'',
                        schoolType:'',
                        school:'',
                        latLongSchool:'',
                        fieldJsonData:{},
                    },
                    fieldJsonData:{},
                    isInvalidOverride:null
                },
                studRule: {
                    phoneList: [
                        // { validator: validatePhone, trigger: 'blur' }
                    ],
                    sourceList: [
                        { required: true, type:'array', message:'该项为必填', trigger: 'change' },
                    ],
                    "referral.referralType":[
                        { required: true,message:'转介绍类型不能为空', trigger: 'change' }
                    ],
                    "referral.referraler":[
                        { required: true,message:'介绍人不能为空', trigger: 'change' }
                    ],

                    // gender: [{
                    //     required: true,
                    //     message: '请填写性别',
                    //     trigger: 'change'
                    // }, ],
                    name: [{
                        required: true,
                        message: '该项为必填',
                        trigger: 'blur'
                    }, {
                        pattern: /^(\S+(\s?\S+)*)$/,
                        message: '该项不能为空字符串',
                        trigger: 'blur'
                    }],
                    type: [{
                        required: true,
                        message: '该项为必填',
                        trigger: 'blur'
                    }, {
                        pattern: /^\d+$/,
                        message: '必须为数字',
                        trigger: 'blur'
                    }]
                },
                isfindPhonePlace:false,
                sameCol:[
                    {
                        title: '同名客户',
                        key: 'name',
                        width:null,
                        resizable:true
                    },
                    {
                        title: '联系电话',
                        key: 'name',
                        width:null,
                        resizable:true,
                        render: (h, params) => {
                            return h('div',
                                params.row.phone.join(' ')
                            );
                        }
                    },
                    {
                        title: '登记日期',
                        width:null,
                        resizable:true,
                        key: 'createDate'
                    },
                    {
                        title: '跟进人',
                        width:null,
                        resizable:true,
                        key: 'salerName'
                    },
                    {
                        title: '跟进校区',
                        width:null,
                        resizable:true,
                        key: 'officeName'
                    },
                ],
                sameData:[],
                searchPhoneInfo:{
                    ind:'',
                    phone:''
                },
                oldPhoneList:[],
                tEdit:this.isEdit,
                isSaving:false,
                isInvalidOverride:false,
                objfield:[],
            }
        },
        computed: {
            ...mapState(["userInfo", "app"]),
        },
        mounted() {
            this.getCountryCode();
            this.getFindByName();
            this.getcustomerList();
            this.getSource();
            this.getReferralList();
            this.getOfficeList();
            if(this.$route.query.source=='crm.activityEnrollment'||this.$route.query.source=='crm.activityEnrollment.detial'){
                this.getFormBase();
            }
            if(this.showLine == '1'){
                this.$nextTick(()=>{
                    this.getFormFn();
                })
            }
            // this.referralerSearch('');
        },

        methods: {
            ...mapMutations(["updateLoadingStatus"]),
            getComSchoolListName(name){
                this.loading=true;
                let params={
                    name
                }
                common
                .comSchoolListName(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                      this.schoolList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loading=false;
                });
            },
            getOfficeList(){
                sysUser
                .dataScopeFilter()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                      this.officeList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            formItemName(_key){
                return this.fieldJson.find(v=>v.field==_key).name;
            },
            formItemrequired(_key){
                return this.fieldJson.find(v=>v.field==_key).required=='1';
            },
            formItemshow(_key){
                return this.fieldJson.find(v=>v.field==_key).base=='1';
            },
            getcustomerList() {
                let params = {
                    tableName: 'crm_customer',
                };
                sysProps
                    .list(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            let list=res.data.data.filter((v)=>{
                                    return v.category=='ugcField'&&(v.base=='1'||v.editable=='1');
                                });
                                this.fieldJson=res.data.data.filter((v)=>{
                                    return v.category=='sysField';
                                });
                                this.objfield=list.filter(v=>v.isObjField).map(v=>{
                                    return {field:v.field,value:v.objFieldKeys};
                                })
                            this.setFormAttr(list);
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
            },
            getFormFn() {
                this.$refs.leadsInfoObj.getFormFn(this.id)
            },
            isShowSource(item){
                let flag=false;
                if(this.userInfo){
                    if(this.userInfo.roleIdList.indexOf('8')!=-1||this.userInfo.roleIdList.indexOf('1')!=-1||this.userInfo.roleIdList.indexOf('78d34370d97a451dafc198ab813f23c6')!=-1){
                        flag = true;
                    }
                    if(this.userInfo.roleIdList.indexOf('4')!=-1||this.userInfo.roleIdList.indexOf('5')!=-1||this.userInfo.roleIdList.indexOf('6')!=-1){
                        if(item.value=='referral'||item.value=='walk in'||item.value=='call in'){
                            flag = true;
                        }
                    }
                    if(this.userInfo.roleIdList.indexOf('3')!=-1){
                        if(item.value=='call out'||item.value=='net in'){
                            flag = true;
                        }
                    }
                }
                if(item.value=='referral'){
                    if(this.$route.query.source=='crm.activityEnrollment'||this.$route.query.source=='crm.activityEnrollment.detial'){
                        flag = false;
                    }
                }
                return flag;
            },
            validatePhone(rule, value, callback){
                if(this.isSaving==false){
                    this.studData.phoneList.forEach((v,k)=>{
                        v.sort=k + '';
                        if(this.oldPhoneList.find(val=>v.phone==val.phone)){
                            v.isModif='0';
                        }else{
                            v.isModif='1';
                        }
                    })
                }
                let emptyObj=value=='';
                if(emptyObj){
                    callback(new Error(this.formItemName('phoneList')+'不能为空'));
                }else{
                    let ind=rule.field.split('.')[1];
                    let phone=value;
                    this.searchPhoneInfo={
                        ind:ind,
                        phone:phone
                    }
                    if(this.$route.query.source=='crm.activityEnrollment'||this.$route.query.source=='crm.activityEnrollment.detial'){
                        this.getCustomerByNameAndPhone(ind,phone)
                        callback();
                    }else{
                        if(!this.studData.name){
                            this.$refs['formValidate'].validateField('name');
                            callback();
                        }
                        let params={
                            phone: value,
                            name:this.studData.name
                        }
                        let obj=this.studData.phoneList.find(v=>v.phone==value);
                        if(obj.isModif==1&&this.isSaving==false){
                            crmCustomer
                            .getCustomerByNameAndPhone(params)
                            .then(valid.call(this))
                            .then(res => {
                                if (res.ok) {
                                    let info=res.data.data;
                                    if(info&&(info.type=='1')){
                                        callback(new Error('该客户已是会员'));
                                    }else if(info&&(info.isExpire=='0')){
                                        callback(new Error('该客户已存在'));
                                    }else if(info&&(info.isExpire=='1')){
                                        this.$Modal.confirm({
                                            title: '提醒',
                                            content: '<p>当前客户已过期，是否覆盖？</p>',
                                            onOk: () => {
                                                this.isInvalidOverride=true;
                                                if(this.$route.query.source=='crm.activityEnrollment'||this.$route.query.source=='crm.activityEnrollment.detial'){
                                                    this.getForm(info.id,true);
                                                }else{
                                                    this.$nextTick(()=>{
                                                        this.getForm(info.id);
                                                    })
                                                }
                                            },
                                            onCancel: () => {
                                                this.studData.phoneList.splice(this.searchPhoneInfo.ind,1);
                                                if(this.studData.phoneList.length==0){
                                                    let obj={
                                                            phone: '',
                                                            district:'0086',
                                                            isModif:1,
                                                            locId:'',
                                                            sort:'',
                                                        }
                                                    this.studData.phoneList.push(obj)
                                                }
                                            }
                                        });
                                    }else{
                                        this.findPhonePlace(ind,phone)
                                    }
                                }else{
                                }
                            })
                            .catch(errors.call(this))
                            .finally(() => {
                                callback();
                            });
                        }else{
                            callback();
                        }
                    }
                }
            },
            getForm(tid,hasSource){
                this.updateLoadingStatus({ isLoading: true });
                let params={
                    id:tid||this.id
                }
                crmCustomer
                .form(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.isfindPhonePlace=true;
                        this.baseInfo=res.data.data;
                        if(!this.baseInfo.gender){
                            this.baseInfo.gender='m';
                            // this.$set(this.baseInfo,'additionInfo',obj)
                        }
                        this.studData=Object.assign(this.studData,this.baseInfo)
                        if(hasSource){
                            this.$emit('setTags',this.studData.tags);
                        }else{
                        }
                        this.oldPhoneList=this.baseInfo.phoneList;
                        this.baseInfo.phoneList.forEach(v=>{
                            v.isModif=0
                        });
                        this.tEdit=true;
                        this.$nextTick(()=>{
                            if(this.$refs.referraler){
                                this.$refs["referraler"].query = this.studData.referral.referralerName;
                                // this.$refs.referraler.setQuery(this.studData.referral.referralerName);
                            }
                            // if(!(this.showLine=='1'&&this.stuId)){
                                let $f = this.fApi;
                                $f.setValue(this.baseInfo.fieldJsonData);
                            // }
                            if(this.isInvalidOverride){
                                this.studData.isInvalidOverride='1'
                            }
                        })
                        if(this.showLine == '1'){
                            this.$nextTick(()=>{
                                // this.$refs.userLabelRef.makeSureBtn();
                            })
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            getFormBase(){
                let params={
                    id:this.$route.query.activityId
                }
                crmActivity
                .formBase(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.baseInfo=res.data.data;
                        this.studData.activityId = this.baseInfo.activityId;
                        this.studData.qrId = this.baseInfo.qrId ;
                        this.studData.channelId = '';
                        this.studData.sourceList = this.baseInfo.sourceList||[];
                        this.studData.tags = this.baseInfo.tags||[];
                        this.studData.officeId = this.baseInfo.officeId;
                        this.studData.followOfficeId =this.baseInfo.followOfficeId;
                        this.studData.selectOfficeId =this.baseInfo.selectOfficeId;
                        this.studData.schoolId =this.baseInfo.schoolId;
                        this.$emit('setTags',this.studData.tags);
                        this.$nextTick(()=>{
                            if(this.$refs.referraler){
                                this.$refs["referraler"].query = this.studData.referral.referralerName;
                                // this.$refs.referraler.setQuery(this.studData.referral.referralerName);
                            }
                            // if(!(this.showLine=='1'&&this.stuId)){
                                let $f = this.fApi;
                                $f.setValue(this.baseInfo.fieldJsonData);
                            // }
                        })
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                });

            },
            getCustomerByPhone(phone){
                this.$refs['formValidate'].validate((ok) => {
                    if (ok) {
                        this.updateLoadingStatus({ isLoading: true });
                        let params={
                            phone:phone
                        }
                        crmCustomer
                        .getCustomerByPhone(params)
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                let list=res.data.data;
                                if(list.length){
                                    this.sameData=list;
                                    this.sameModal=true;
                                    this.updateLoadingStatus({ isLoading: false });
                                }else{
                                    this.validateForm();
                                }
                            }
                        })
                        .catch(errors.call(this))
                        .finally(() => {
                        });
                    } else {
                        this.updateLoadingStatus({ isLoading: false });
                    }
                })
            },
            getReferralList(){
                let params={
                    types: 'referral referral,com_student_school_grade,com_student_school_type',
                }
                sysDict
                .batchListData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.referralList=res.data.data['referral referral'];
                        this.schoolGradeList=res.data.data['com_student_school_grade'];
                        this.schoolTypeList=res.data.data['com_student_school_type'];
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            getSource(){
                let params={
                    type: 'crm_customer_source',
                }
                sysDict
                .getTypeTree(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if(this.$route.query.isTransferIntro=='1'){
                            this.sourceList=res.data.data.children.filter(v=>v.value=='referral');
                        }else if(this.$route.query.source=='crm.activityEnrollment'||this.$route.query.source=='crm.activityEnrollment.detial'){
                            this.sourceList=res.data.data.children.filter(v=>v.value!='referral');
                        }else{
                            this.sourceList=res.data.data.children;
                        }

                        if(this.$route.query.isTransferIntro=='1'){
                            let sourceList=this.sourceList
                            this.studData.sourceList=[sourceList[0].value, sourceList[0].children[0].value, sourceList[0].children[0].children[0].value];
                            this.sourceChange(this.studData.sourceList)
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            getFindByName(){
                this.updateLoadingStatus({ isLoading: true });
                let params={
                    name: '',
                    level: 2
                }
                sys
                .findByName(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.countryList=res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            listLocation(id,isCountry=true){
                let params={
                    id: id
                }
                sys
                .listLocation(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if(isCountry){
                            this.provinceList=res.data.data;
                        }else{
                            this.cityList=res.data.data;
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                });
            },
            getCountryCode(){
                this.updateLoadingStatus({ isLoading: true });
                crmCustomer
                .getCountryCode()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.areaCodeList=res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            phoneBlur(ind,phone){
                // this.searchPhoneInfo={
                //     ind:ind,
                //     phone:phone
                // }
                // if(this.$route.query.source=='crm.activityEnrollment'||this.$route.query.source=='crm.activityEnrollment.detial'){
                //     this.getCustomerByNameAndPhone(ind,phone)
                // }else{
                //     this.findPhonePlace(ind,phone)
                // }

            },
            findPhonePlace(ind,phone){
                this.updateLoadingStatus({ isLoading: true });
                this.isfindPhonePlace=true;
                let params={
                    phone: phone||''
                }
                crmCustomer
                .findPhonePlace(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let info=res.data.data;
                        this.studData.phoneList[ind].district=info.areaCode;
                        this.studData.phoneList[ind].locId=info.country;
                        this.studData.phoneList[ind].sort=ind+'';
                        if(ind==0){
                            let obj={
                                city:info.city,
                                cityName:info.cityName,
                                country:info.country,
                                countryName:info.countryName,
                                province:info.province,
                                provinceName:info.provinceName
                            };
                            if(info.city==info.province){
                                obj.city='';
                                obj.cityName='';
                                this.showCity=false;
                            }else{
                                this.showCity=true;
                            }
                            this.studData.districtEntity=obj;
                            	// 百度地图API功能
                            	// var map = new BMap.Map("allmap");
                            	// var point = new BMap.Point(116.331398,39.897445);
                            	// map.centerAndZoom(point,12);
                            	// // 创建地址解析器实例
                            	let myGeo = new BMap.Geocoder();
                                let address = obj.countryName+obj.provinceName+obj.cityName;

                                    this.studData.address=address;
                            	// 将地址解析结果显示在地图上,并调整地图视野
                            	myGeo.getPoint(address, (point)=>{
                            		if (point) {
                                        console.log(point)
                                        this.studData.latLongAddress=point.lng+','+point.lat;
                            		}else{
                            			// alert("您选择地址没有解析到结果!");
                            		}
                            	}, obj.cityName||obj.provinceName||obj.countryName);
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            getCustomerByNameAndPhone(ind,phone){
                if(!this.studData.name){
                    this.addNmaeModal=true;
                    return;
                }
                this.updateLoadingStatus({ isLoading: true });
                let params={
                    phone: phone,
                    name:this.studData.name
                }
                crmCustomer
                .getCustomerByNameAndPhone(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let info=res.data.data;
                        if(info&&(info.type=='1')){
                            this.$Modal.confirm({
                                title: '提醒',
                                content: '<p>该客户已是会员，是否跳转到会员报名？</p>',
                                onOk: () => {
                                    this.$router.push({name:'crm.activityEnrollment',query:{id:info.id,isLeadsEntry:'1',name:info.name,activityId:this.$route.query.activityId}})
                                },
                                onCancel: () => {
                                    this.studData.phoneList.splice(this.searchPhoneInfo.ind,1);
                                    if(this.studData.phoneList.length==0){
                                        let obj={
                                                phone: '',
                                                district:'0086',
                                                isModif:1,
                                                locId:'',
                                                sort:'',
                                            }
                                        this.studData.phoneList.push(obj)
                                    }
                                }
                            });
                            this.updateLoadingStatus({ isLoading: false });
                        }else if(info&&(info.isExpire=='0')&&this.isSaving==false){
                            this.$Modal.confirm({
                                title: '提醒',
                                content: '<p>当前客户已重复，是否继续录入？</p>',
                                onOk: () => {
                                    this.findPhonePlace(ind,phone)
                                },
                                onCancel: () => {
                                    this.studData.phoneList.splice(this.searchPhoneInfo.ind,1);
                                    if(this.studData.phoneList.length==0){
                                        let obj={
                                                phone: '',
                                                district:'0086',
                                                isModif:1,
                                                locId:'',
                                                sort:'',
                                            }
                                        this.studData.phoneList.push(obj)
                                    }
                                }
                            });
                            this.updateLoadingStatus({ isLoading: false });
                        }else{
                            if(this.isSaving==false){
                                this.findPhonePlace(ind,phone)
                            }
                        }
                    }else{
                        this.updateLoadingStatus({ isLoading: false });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                });
            },
            toShowCity(key,val){
                let _name='';
                if(key=='countryName'){
                    this.showCity=true;
                    _name=this.countryList.find(v=>v.id==val)&&this.countryList.find(v=>v.id==val).name;
                }else if(key=='provinceName'){
                    this.showCity=true;
                    _name=this.provinceList.find(v=>v.id==val)&&this.provinceList.find(v=>v.id==val).name;
                }else{
                    _name=this.cityList.find(v=>v.id==val)&&this.cityList.find(v=>v.id==val).name;
                }
                this.studData.districtEntity[key]=_name;
            },
            userLabelTrueChoose(data) {
                this.userLabelData = data.hasCheckedTagNames;
                this.studData.tags= data.hasCheckedTagids
            },
            getMap() {
                this.isSchoolMap=false;
                this.$refs.mapModel.modelShow();
            },
            getSchoolMap() {
                this.isSchoolMap=true;
                this.$refs.mapModel.modelShow();
            },
			mapOk(keyword, province, city, region, lng, lat) {
                if(this.isSchoolMap){
                    this.studData.additionInfo.school=keyword;
                    this.studData.additionInfo.latLongSchool=lng+','+lat;
                }else{
                    this.studData.address=keyword;
                    this.studData.latLongAddress=lng+','+lat;
                }
			},
            delContacts(ind) {
                this.studData.additionInfo.splice(ind, 1)
            },
            addPhone(){
                this.studData.phoneList.push({
                            phone: '',
                            district:'0086',
                            isModif:1,
                            locId:'',
                            sort:''});
            },
            delPhone(ind){
                this.studData.phoneList.splice(ind,1);
            },
            referralerQuery(query){
                if(query==''){
                    this.referralerSearch(query);
                    // this.referralerSearch(query);
                }
            },
            remoteReferraler(query){
                    this.referralerSearch(query);
                    console.log(query)
            },
            referralerSearch(query){
                this.referralLoading=true;
                let params={
                    "searchField":"name",
                    "searchFieldParam":query,
                };
                if(this.studData.referral.referralType=='Student Referral'){
                    params.mainTable='com_student'
                    params.field1='phone'
                }else if(this.studData.referral.referralType=='Non-Student Referral'){
                    params.mainTable='crm_customer'
                    params.field1='star_phone'
                }else{
                    params.mainTable='sys_user'
                    params.field1='mobile'
                }
                sysCommonSql
                .querySingleTableData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.referralerList=res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.referralLoading=false;
                });
            },

            reset(){
                this.$refs['formValidate'].resetFields();
                this.isInvalidOverride=false;
                this.studData.isInvalidOverride=null;
                // if(!(this.showLine=='1'&&this.stuId)){
                    let $f = this.fApi;
                    $f.resetFields();
                    // this.objfield.forEach(v=>{
                    //     let obj={};
                    //         // obj.val='';
                    //     $f.setValue(v.field,obj);
                    // })
                // }
                this.studData.phoneList=[
                        {
                            phone: '',
                            district:'0086',
                            isModif:1,
                            locId:'',
                            sort:'',
                        }
                    ];
                this.studData.sourceList=[];
                this.studData.referral={
                        "referralType":"",
                        "referraler":""
                };
                if(this.showLine=='1'){
                    this.tEdit=false;
                    this.$nextTick(()=>{
                        this.$refs.leadsInfoObj.getFormFn(this.id)
                    })
                }
            },
            validateForm (name) {
                this.$refs['formValidate'].validate((ok) => {
                    if (ok) {
                        // if(!(this.showLine=='1'&&this.stuId)){
                            let $f = this.fApi;
                            $f.submit(
                                (formData, api) => {
                                    //提交表单
                                    console.log(formData,11111)
                                    this.studData.fieldJsonData = formData;
                                    if(this.$route.query.source=='crm.activityEnrollment'||this.$route.query.source=='crm.activityEnrollment.detial'){
                                        this.saveEnrollCustomer();
                                    }else{
                                        this.saveLeads();
                                    }
                                },
                                (api) => {
                                    //验证未通过
                                    console.log('验证未通过');
                                    this.updateLoadingStatus({ isLoading: false });
                                }
                            );
                        // }else{
                        //     if(this.$route.query.source=='crm.activityEnrollment'||this.$route.query.source=='crm.activityEnrollment.detial'){
                        //         this.saveEnrollCustomer();
                        //     }else{
                        //         this.saveLeads();
                        //     }
                        // }

                    } else {
                        this.sameModal=false;
                        this.updateLoadingStatus({ isLoading: false });
                    }
                })
            },
            saveAll(tags){
                this.updateLoadingStatus({ isLoading: true });
                if(tags&&tags.length){
                    this.studData.tags=tags;
                }

                if(this.tEdit){
                    this.studData.phoneList.forEach((v,k)=>{
                        v.sort=k + '';
                        if(this.oldPhoneList.find(val=>v.phone==val.phone)){
                            v.isModif='0';
                        }else{
                            v.isModif='1';
                        }
                    })
                    this.$nextTick(()=>{
                        this.isSaving=true;
                        if(this.studData.phoneList.some(v=>v.isModif=='1')){
                            let phones=this.studData.phoneList.map(v=>v.phone).join(',');
                            this.getCustomerByPhone(phones);
                        }else{
                            this.validateForm();
                        }
                    })
                }else{
                    this.isSaving=true;
                    let phones=this.studData.phoneList.map(v=>v.phone).join(',');
                    this.getCustomerByPhone(phones);
                }
            },
            saveLeads(){
                this.updateLoadingStatus({ isLoading: true });
                let params=Object.assign({},this.studData);
                if(params.birthday){
                    params.birthday=(new Date(params.birthday)).format('yyyy-MM-dd');
                }else{
                    params.birthday='';
                }
                if(params.sourceList[0]!='referral'){
                    params.referral=null;
                }
                crmCustomer
                .save(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$emit('saveOk');
                        this.$Message.success(res.data.message);
                        if(this.showLine=='1'&&this.tEdit){
                            this.tEdit=false;
                            this.$nextTick(()=>{
                                this.$refs.leadsInfoObj.getFormFn(this.id)
                                this.$emit('uploadTags');
                            })
                            return ;
                        }
						this.sameModal=false;
                        if(this.$route.query.source){
                            this.$router.push({name:this.$route.query.source})
                        }else{
                            this.$router.push({name:'crm.customerManagement'})
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            saveEnrollCustomer(){
                this.updateLoadingStatus({ isLoading: true });
                let params=Object.assign({},this.studData);
                if(params.birthday){
                    params.birthday=(new Date(params.birthday)).format('yyyy-MM-dd');
                }else{
                    params.birthday='';
                }
                params.isMemberEnroll='0';
                params.isFormEnroll='0';
                params.referral=null;
                crmCustomer
                    .saveEnrollCustomer(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.$Message.success(res.data.message);
                            let query = {...this.$route.query}
                            delete query['source']
							this.sameModal=false;
                            this.$router.push({name:this.$route.query.source,query:query})
                            this.$emit('uploadTags');
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        this.updateLoadingStatus({ isLoading: false });
                    });
            },
            addName(){
                if(this.studData.name){
                    this.addNmaeModal=false;
                    this.getCustomerByNameAndPhone(this.searchPhoneInfo.ind,this.searchPhoneInfo.phone)
                }else{
                    this.$refs.formDynamic.validateField('name')
                }
                this.$refs['formValidate'].validateField('name');
            },
            referralTypeChange(){
                this.$refs.formValidate.validateField('referral.referralType')
            },
            referralerChange(val){
                let obj=this.referralerList.find(v=>v.id==val);
                this.studData.referral.referralerName=obj.name;
                this.studData.referral.referralerPhone=obj.phone;
                this.$refs.formValidate.validateField('referral.referraler')
            },
            setEdit(){
                this.getForm();
            },
            setTagsName(names){
                this.userLabelData=names;
            },
            sourceChange(val,sel){
                this.studData.referral.referralType=val[2]
            }
        },
        watch:{
            "studData.districtEntity.province": {
                handler: function (val, oldVal) {
                    if(val){
                        this.listLocation(val,false)
                    }
                    if(!this.isfindPhonePlace){
                        this.studData.districtEntity.city='';
                        this.studData.districtEntity.cityName='';
                    }
                    this.$nextTick(()=>{
                        this.isfindPhonePlace=false;
                    })
                },
                deep: true
            },
            "studData.districtEntity.country": {
                handler: function (val, oldVal) {
                    if(val){
                        this.listLocation(val,true)
                    }
                    if(!this.isfindPhonePlace){
                        this.studData.districtEntity.province='';
                        this.studData.districtEntity.provinceName='';
                    }
                    // this.studData.districtEntity.city='';
                    // this.studData.districtEntity.cityName='';
                },
                deep: true
            },
            "studData.referral.referralType": {
                handler: function (val, oldVal) {
                    if(this.studData.sourceList[0]=='referral'){
                        this.$set(this.studData.sourceList,2,val)
                    }
                },
                deep: true
            },
            "studData.phoneList":{
                handler: function (val, oldVal) {
                    this.isSaving=false;
                },
                deep: true
            },
            "studData.name":{
                handler: function (val, oldVal) {
                    this.isSaving=false;
                },
                deep: true
            }
        }
    }
</script>
