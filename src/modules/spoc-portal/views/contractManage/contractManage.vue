<style lang="less">
    .outContain {
        margin-top: 5px;

        .ivu-form-item {
            margin-bottom: 0px !important;

            .ivu-form-item-content {
                margin-left: 0px !important;
            }
        }

        .lefttextStyle {
            font-size: 14px;
        }

        .lefttextStyleSpan {
            font-size: 12px !important;
            font-family: HiraginoSansGB-W3 !important;
            font-weight: normal !important;
            color: rgba(153, 153, 153, 1) !important;
        }

        .IconStyle {
            margin-right: 8px;
            font-size: 16px;
            color: #ccc;
        }

        .leftStyle {

            margin-left: 122px;
            width: 860px;

            .OtherConfigStyle {
                display: flex;
            }
        }

        .dividerStyle {
            .ivu-divider-horizontal {
                margin: 18px 0 6px 0px !important;
            }
        }

        .leftStyle1 {
            margin-bottom: 0px;

            .inputOrOutStyle {
                margin-right: 12px;
                /*font-size: 14px;*/
            }
        }

        .BtnStyle {
            margin-top: 20px;
        }
    }

    .dataStyle .ruleStyle {
        .ivu-form-item-content {
            margin-left: 10px !important;

            .ivu-input-wrapper {
                width: 60% !important;
            }
        }
    }

    .ruleStyleOut {
        .ivu-form-item-content {
            margin-left: 10px !important;
        }

        .afterStyle {
            display: flex;
            align-items: center;

            &:after {
                content: '之后';
                display: block;
                width: 40px;
                margin: 0 10px;
            }
        }

        .afterStyle1 {
            display: flex;
            align-items: center;

            &:before {
                content: '如果符合下面';
                display: block;
                width: 80px;
                margin-right: 10px;
            }

            &:after {
                content: '条件';
                display: block;
                width: 50px;
                margin: 0 10px;
            }
        }

        .afterStyle2 {
            &:before {
                content: '则合同类型为';
                display: block;
                width: 100px;
                margin-right: 10px;
                margin-bottom: 10px;
            }
        }
    }
</style>
<template>
    <div class="outContain">
        <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <div class="configInfo">
                    <!--<Card>-->
                    <Row class-name="leftStyle1" style="margin-bottom:10px;" v-if="showMap[5001]">
                        <Col span="2" style="width:90px;margin-left:10px;">
                        <FormItem>
                            <span class="lefttextStyle">合同类型规则</span>
                        </FormItem>
                        </Col>
                        <Col span="15" style="margin-left:10px;">
                        <FormItem prop="isAutoJudge">
                            <Checkbox v-model="formValidate1.isAutoJudge" style="margin-right:20px;"
                                @on-change="AutoJudgeChange">自动判定合同类型</Checkbox>
                            <span class="lefttextStyleSpan">
                                <Icon type="ios-information-circle" class="IconStyle" />
                                启用后，报名时系统会以配置的规则自动判定合同类型（新签、续费）。</span>
                        </FormItem>
                        </Col>
                    </Row>
                    <div class="leftStyle" style="margin-bottom:16px;" v-if="formValidate1.isAutoJudge&&showMap[5001]">
                        <Table :columns="columns1" :data="data1"></Table>
                    </div>
                    <Row class-name="dividerStyle" v-if="showMap[5001]">
                        <Divider />
                    </Row>
                    <Row class-name="leftStyle1" style="margin-top:20px;margin-left:10px;" v-if="showMap[5001]">
                        <Col span="2" style="width:132px;">
                        <FormItem>
                            <span class="lefttextStyle">签约角色规则</span>
                        </FormItem>
                        </Col>
                        <Col span="15" style="margin-left:-30px;">
                        <FormItem prop="isTransferOutAudit">
                            <Select style="width:300px;" placeholder="请选择角色"  @on-change="changeSelectedRoles" v-model="selectedRoles" multiple clearable>
                                <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row class-name="BtnStyle" v-if="showMap[5001]">
                        <!-- <Col span="15" offset="10" style="width:1111px;margin-left:740px;"> -->
                        <Col span="15" offset="2" style="margin-left:170px;">
                        <FormItem>
                            <Button type="primary" @click="saveInit('ct:sellerRoleId')" style="margin-left: 8px"
                                :disabled="!hasChangeSelectedRoles">保存</Button>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row class-name="dividerStyle" v-if="showMap[5002]">
                        <Divider />
                    </Row>
                    <Row class-name="leftStyle1" style="margin-top:20px;margin-left:10px;" v-if="showMap[5002]">
                        <Col span="2" style="width:132px;">
                        <FormItem>
                            <span class="lefttextStyle">转中心规则</span>
                        </FormItem>
                        </Col>
                        <Col span="15" style="margin-left:-30px;">
                        <FormItem prop="isTransferOutAudit">
                            <span class="inputOrOutStyle">转出审批</span>
                            <Checkbox v-model="formValidate.isTransferOutAudit" style="margin-right:20px;"
                                @on-change="btnChange">开启</Checkbox>
                            <span class="lefttextStyleSpan">
                                <Icon type="ios-information-circle" class="IconStyle" />
                                开启后学员转校区需审批通过后才转中心成功，若不开启则转中心即视为审批通过</span>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row class-name="leftStyle1" style="margin-top:7px;" v-if="showMap[5002]">
                        <Col span="15" offset="2" style="margin-left:118px;">
                        <FormItem prop="isTransferOutAudit">
                            <span class="inputOrOutStyle">转入审批</span>
                            <Checkbox v-model="formValidate.isTransferInAudit" style="margin-right:20px;"
                                @on-change="btnChange">开启</Checkbox>
                            <span class="lefttextStyleSpan">
                                <Icon type="ios-information-circle" class="IconStyle" />
                                开启后学员转校区需审批通过后才转中心成功，若不开启则转中心即视为审批通过</span>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row class-name="BtnStyle" v-if="showMap[5002]">
                        <!-- <Col span="15" offset="10" style="width:1111px;margin-left:740px;"> -->
                        <Col span="15" offset="2" style="margin-left:170px;">
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('transfercenter')" style="margin-left: 8px"
                                :disabled="!btnChangeval">保存</Button>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row class-name="dividerStyle" v-if="showMap[5003]">
                        <Divider />
                    </Row>
                    <Row class-name="leftStyle1" style="margin-bottom:10px;" v-if="showMap[5003]">
                        <Col span="2" style="width:90px;margin-left:10px;">
                        <FormItem>
                            <span class="lefttextStyle">请假次数规则</span>
                        </FormItem>
                        </Col>
                        <Col span="15" style="margin-left:10px;">
                        <FormItem prop="isAutoJudge">

                            每购买 <InputNumber :min="1" v-model="formValidate2.value.num" @on-change="leaveNumChange" style="width: 60px;"></InputNumber> 课时，请假次数+1
                        </FormItem>
                        </Col>
                    </Row>
                    <Row class-name="BtnStyle" v-if="showMap[5003]">
                        <!-- <Col span="15" offset="10" style="width:1111px;margin-left:740px;"> -->
                        <Col span="15" offset="2" style="margin-left:170px;">
                        <FormItem>
                            <Button type="primary" @click="handleSubmit2()" style="margin-left: 8px"
                                :disabled="!btnChangeval2">保存</Button>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row class-name="dividerStyle" v-if="showMap[5005]">
                        <Divider />
                    </Row>
                    <Row class-name="leftStyle1" style="margin-top:26px;margin-bottom:6px;margin-left:10px;" v-if="showMap[5005]">
                        <Col span="2" style="width:132px;">
                        <FormItem>
                            <span class="lefttextStyle">其它配置</span>
                        </FormItem>
                        </Col>
                        <Col span="3" style="margin-left:-30px;width:220px;">
                        <FormItem prop="isSameStudentCheck">
                            <span style="margin-right:20px;">同名学员检测</span>
                            <Checkbox v-model="formValidate.isSameStudentCheck" style="margin:0 20px 0 15px;"
                                @on-change="btnChange1">开启</Checkbox>
                        </FormItem>
                        </Col>
                        <Col span="10" style="margin-left:-33px;width:736px;">

                        <FormItem label="" prop="sameStudentRule">
                            <Select v-model="formValidate.sameStudentRule" placeholder="请选择" style="width:192px"
                                v-if="formValidate.isSameStudentCheck?true:false" @on-change="btnChange1">
                                <Option v-for="item in studentList" :value="item.value" :key="Math.random()*1000">
                                    {{ item.label }}</Option>
                            </Select>
                            <span style="width:192px;display:inline-block;"
                                v-if="formValidate.isSameStudentCheck?false:true"></span>
                            <span style="margin-left:20px;" class="lefttextStyleSpan">
                                <Icon type="ios-information-circle" class="IconStyle" />
                                新增学员时，勾选项为同名学员的判定条件，若不勾选则不检测同名学员</span>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row class-name="leftStyle1" style="margin:10px 0 5px 0;" v-if="showMap[5005]">
                        <Col span="16" offset="2" style="margin-left:119px;">
                        <FormItem prop="isNotAllowSameNameStudent">
                            <span style="margin-right:20px;">不允许同名学员</span>
                            <Checkbox v-model="formValidate.isNotAllowSameNameStudent" style="margin-right:20px;"
                                @on-change="btnChange1">开启</Checkbox>
                            <span style="margin-left:234px;" class="lefttextStyleSpan">
                                <Icon type="ios-information-circle" class="IconStyle" />开启后不允许创建同名学员，不开启则允许创建同名学员</span>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row class-name="leftStyle1" v-if="showMap[5005]">
                        <Col span="15" offset="2" style="margin-left:119px;">
                        <FormItem prop="isMastPaperCode">
                            <span style="margin-right:32px;">纸质编号必填</span>
                            <Checkbox v-model="formValidate.isMastPaperCode" style="margin-right:20px;"
                                @on-change="btnChange1">开启</Checkbox>
                            <span style="margin-left:234px;" class="lefttextStyleSpan">
                                <Icon type="ios-information-circle" class="IconStyle" />开启后报读合同时纸质编号必填</span>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row class-name="BtnStyle" v-if="showMap[5005]">
                        <Col span="15" offset="2" style="margin-left:170px;">
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('othersetting')" style="margin-left: 8px"
                                :disabled="!btnChangeval1">保存</Button>
                        </FormItem>
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
        <Modal v-model="modalTip" title="编辑规则" :mask-closable="false">
            <div>
                <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate1" :label-width="80">
                    <Row class-name="ruleStyleOut">
                        <Col span="14">
                        <FormItem prop="companyIds">
                            <p>适用分公司</p>
                            <Select v-model="formValidate1.companyIds" placeholder="请选择" multiple>
                                <Option v-for="item in companyList" :value="item.id" :key="Math.random()*1000">
                                    {{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row class-name="ruleStyleOut">
                        <Col span="24">
                        <FormItem prop="logicalOperation" class="ruleStyle ">
                            <div class="afterStyle1">
                                <Select v-model="formValidate1.logicalOperation" placeholder="请选择"
                                    style="width:80px;margin-right:10px;">
                                    <Option value="or" :key="Math.random()*1000">任一</Option>
                                </Select>
                            </div>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row class-name="ruleStyleOut">
                        <Col span="14">
                        <FormItem prop="currRule">
                            <Select v-model="formValidate1.currRule" style="width:275px;margin-right:10px;" disabled>
                                <Option value="学员在系统内无报名记录" :key="Math.random()*1000">学员在系统内无报名记录</Option>
                            </Select>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row class-name="ruleStyleOut">
                        <Col span="14" style="width:336px">
                        <FormItem prop="isDate" class="ruleStyle">
                            <!--<Input v-model="formValidate1.isDate" placeholder="请选择" disabled class="afterStyle"></Input>-->
                            <Select v-model="formValidate1.isDate" style="width:275px;margin-right:10px;">
                                <Option value="签单日期在学员最后上课日期" :key="Math.random()*1000">签单日期在学员最后上课日期</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col span="6" class-name="dataStyle">
                        <FormItem prop="officeId" class="ruleStyle" style="margin-left:-20px">
                            <Input v-model="formValidate1.dateT" placeholder="请输入"
                                @on-keyup="RemoveSpace()"></Input><span style="margin-left:10px;">天</span>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row class-name="ruleStyleOut">
                        <Col span="24">
                        <FormItem prop="officeId" class="ruleStyle">
                            <Input v-model="formValidate1.nameType" style="width:200px;" disabled
                                class="afterStyle2"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div slot="footer" class="modalTip">
                <Button @click="handleReset('contracttype')" style="margin-left: 8px">取消</Button>
                <Button type="primary" @click="handleSubmit('contracttype')">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex';
    import valid, {
        errors,
        sysOffice,
        sysConfig,
        sysRole
    } from "../../libs/request.js";
    export default {
        components: {

        },
        data() {

            return {
                hasChangeSelectedRoles: false,
                roleList: [],
                selectedRoles:[],
                AutoBool: false,
                btnChangeval: false,
                btnChangeval1: false,
                btnChangeval2:false,
                modalTip: false,
                orList: [
                    {
                        value: "or",
                        name: '签单日期在学员最后上课日期'
                    }
                ],
                studentList: [
                    {
                        value: "name",
                        label: '姓名相同'
                    },
                    {
                        value: "phone",
                        label: '电话相同'
                    },
                    {
                        value: "nameOrPhone",
                        label: '姓名或电话相同'
                    },
                    {
                        value: "nameAndPhone",
                        label: '姓名且电话相同'
                    },
                ],
                companyList: [],
                formValidate: {
                    isTransferOutAudit: false,
                    isTransferInAudit: false,

                    isSameStudentCheck: false,
                    sameStudentRule: '',
                    isNotAllowSameNameStudent: false,
                    isMastPaperCode: false,

                },
                dateT: '',
                companyIds: [],
                formValidate2:{
                    "id": "5003",
                    "tenantId": null,
                    "remarks": "请假次数规则",
                    "createDate": null,
                    "updateDate": null,
                    "fieldJsonData": null,
                    "configId": "ct:leaveConfig",
                    "configName": null,
                    "value": {num:20},
                    "objectValue": null,
                    "valueObject": null,
                    "menuId": "5001",
                    "module": null,
                    "sysNotificationReceiptList": [],
                    "sysUserLinkList": [],
                    "ids": []
                },
                formValidate1: {
                    // companyIds: '学员在系统内无报名记录',
                    dateT: '',
                    nameType: '',
                    companyIds: [],
                    isAutoJudge: false,
                    logicalOperation: '',
                    currRule: '',
                    isDate: '签单日期在学员最后上课日期',
                    types: [{
                        isAutoJudge: "0",
                        companyIds: [],
                        logicalOperation: '',
                        conditions: [
                            {
                                field: "0",
                                fieldName: "学员在系统内无报名记录",
                                operation: "",
                                operationName: "",
                                value: "",
                                valueName: ""
                            }, {
                                field: "1",
                                fieldName: "签单日期在学员最后上课日期",
                                operation: ">",
                                operationName: "之后",
                                value: "0",
                                valueName: "0"
                            }
                        ]

                    }
                    ]
                },
                ruleValidate: {
                    isHideHelp: [
                        // { required: true, message: '不能为空值', trigger: 'blur' }
                    ],
                },
                ruleValidate1: {
                    isHideHelp: [
                        // { required: true, message: '不能为空值', trigger: 'blur' }
                    ],
                },
                columns1: [
                    {
                        title: '合同类型',
                        width: 90,
                        key: 'name'
                    },
                    {
                        title: '适用分公司',
                        width: 120,
                        key: 'companyIds'
                    },
                    {
                        title: '当前规则',
                        width: 236,
                        key: 'currRule'
                    },
                    {
                        title: '说明',
                        width: 307,
                        key: 'information'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        // width: 98,
                        align: 'center',
                        // fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    // props: {
                                    //     type: 'text',
                                    //     size: 'large'
                                    // },
                                    style: {
                                        display: (params.row.name == '续费') ? "none" : "block",
                                    },
                                    on: {
                                        click: () => {
                                            this.EditHandle(params.row);
                                        }
                                    }
                                }, '修改')
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        name: '新签',
                        companyIds: '',
                        currRule: '',
                        information: '',
                    },
                    {
                        name: '续费',
                        companyIds: '',
                        currRule: '--',
                        information: '',
                    },
                ],
                showMap:{
                    '5001':false,
                    '5002':false,
                    '5003':false,
                    '5005':false,
                }
            }
        },
        created() {
        },
        mounted() {
            this.officeList();
        },
        computed: {

        },
        methods: {
            ...mapMutations(['updateLoadingStatus']),
            //切换自动判断合同类型
            AutoJudgeChange() {
                this.AutoBool = true;
                this.handleSubmit('contracttype');
            },
            //不是数字就清空数据
            numArea(value) {
                var patt1 = new RegExp(/^[0-9]{0,}$/);
                return patt1.test(value);
            },
            RemoveSpace(val) {
                if (!this.numArea(this.formValidate1.dateT)) {
                    this.formValidate1.dateT = parseInt(this.formValidate1.dateT) ? parseInt(this.formValidate1.dateT) : '';
                }
            },
            btnChange() {
                this.btnChangeval = true;
            },
            btnChange1() {
                this.btnChangeval1 = true;
            },
            EditHandle() {
                this.modalTip = true;
                this.formValidate1.companyIds = this.companyIds;
                this.formValidate1.dateT = this.dateT;
            },
            officeList() {
                sysOffice.officeList({
                    type: 2
                }).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        this.companyList = res.data.data.allCompany;
                        this.getRoleList();
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            getRoleList(){
                sysRole.roleList({}).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.roleList = res.data.data.roleList;
                        this.getData();
                        this.getInit('ct:sellerRoleId');
                    }
                })
                .catch(errors.call(this))
                .finally(() => {

                });
            },
            getInit(configId) {
                sysConfig.getConfig({
                    menuId: 5001,
                    configId
                }).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        let _data = res.data.data;
                        if(configId == 'ct:sellerRoleId') {
                            this.selectedRoles = _data.roleIds
                            setTimeout(()=>{
                                this.hasChangeSelectedRoles = false;
                            },100)
                        }
                    }
                }).catch(errors.call(this)).finally(() => {
                });
            },
            saveInit(type) {
                let params = {
                    menuId: 5001,
                    configId: type
                }
                if(type == 'ct:sellerRoleId') {
                    // 签约角色规则
                    if(!this.selectedRoles.length){
                        this.$Message.error('至少选择一个角色')
                        return
                    }
                    params.objectValue = {
                        roleIds: this.selectedRoles
                    }
                }
                this.updateConfig(params, type);
            },
            updateConfig(params, type) {
                this.updateLoadingStatus({isLoading: true});
                sysConfig.updateConfig(params)
                .then(valid.call(this))
                .then((res) => {
                    if (res.ok) {
                        this.$Message.success({content: res.data.message});
                        if(type == 'ct:sellerRoleId') {
                            // 签约角色规则
                            this.hasChangeSelectedRoles = false;
                        }
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({isLoading: false});
                });
            },
            changeSelectedRoles(){
                this.hasChangeSelectedRoles = true
            },
            getData() {
                let qu = {
                    id: 5001
                }
                sysConfig.getList(qu).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        if(res.data.data){
                            this.showMap[5001]=true
                        }else{
                            this.showMap[5001]=false
                            return
                        }
                        let val = JSON.parse(res.data.data.value);
                        this.formValidate1.isAutoJudge = (val.isAutoJudge == '1' ? true : false);
                        this.formValidate1.logicalOperation = val.types[0].logicalOperation;
                        this.formValidate1.nameType = val.types[0].name;
                        this.formValidate1.currRule = val.types[0].conditions[0].fieldName;
                        this.formValidate1.companyIds = val.types[0].companyIds;
                        this.companyIds = val.types[0].companyIds;
                        this.formValidate1.dateT = val.types[0].conditions[0].value;
                        this.dateT = val.types[0].conditions[0].value;
                        this.formValidate1.dateT = val.types[0].conditions[0].valueName;
                        let loga = (val.types[0].logicalOperation == 'or') ? '或者' + this.formValidate1.isDate + val.types[0].conditions[0].valueName + '天之后' : '';
                        this.data1[0].currRule = val.types[0].conditions[0].fieldName + val.types[0].conditions[0].fieldName + loga;
                        this.data1[1].isDate = val.types[0].conditions[0].fieldName;
                        this.data1[0].information = '当满足"' + this.data1[0].currRule + '"条件时,报名时的合同类型为"新签"';
                        this.data1[1].information = '所有不匹配"新签"类型规则的均属于"续费"类型';
                        if (val.types[0].isAllCompany == "1") {
                            this.data1[0].companyIds = "所有分公司";
                        } else {
                            let arr = [];
                            for (let n = 0; n < this.companyIds.length; n++) {
                                let a = this.companyList.filter((item) => {
                                    return item.id == this.companyIds[n];
                                })[0];
                                if (a) {
                                    arr.push(a.name);
                                }
                            }
                            this.data1[0].companyIds = arr.join(',');

                        }
                        // this.data1[1].companyIds=arr.join(',');
                        this.data1[1].companyIds = (val.types[1].isAllCompany == "1") ? "所有分公司" : "--";
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
                let qu1 = {
                    id: 5002
                }
                sysConfig.getList(qu1).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        if(res.data.data){
                            this.showMap[5002]=true
                        }else{
                            this.showMap[5002]=false
                            return
                        }
                        let val = JSON.parse(res.data.data.value);
                        this.formValidate.isTransferOutAudit = val.isTransferOutAudit ? true : false;
                        this.formValidate.isTransferInAudit = val.isTransferInAudit ? true : false;
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
                let qu2 = {
                    id: 5005
                }
                sysConfig.getList(qu2).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        if(res.data.data){
                            this.showMap[5005]=true
                        }else{
                            this.showMap[5005]=false
                            return
                        }
                        let val = JSON.parse(res.data.data.value);
                        this.formValidate.isSameStudentCheck = val.isSameStudentCheck ? true : false;
                        this.formValidate.isNotAllowSameNameStudent = val.isNotAllowSameNameStudent ? true : false;
                        this.formValidate.isMastPaperCode = val.isMastPaperCode ? true : false;
                        this.formValidate.sameStudentRule = val.sameStudentRule;
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
                let qu3 = {
                    id: 5003
                }
                sysConfig.getList(qu3).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        if(res.data.data){
                            this.showMap[5003]=true
                        }else{
                            this.showMap[5003]=false
                            return
                        }
                        let param = res.data.data;
                        let val=JSON.parse(param.value)
                        param.value=val
                        this.formValidate2 = param;
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            handleSubmit(name) {
                let query = this.query;
                query = {
                    valueObject: {},
                    "menuId": "0",
                    types: [{}, {}]
                }
                query.valueObject = {
                    "types": [
                        {
                            "id": "1",
                            "isModify": "1",
                            "isAllCompany": "",
                            "companyIds": [],
                            "logicalOperation": "or",
                            "conditions": [
                                {
                                    "field": "0",
                                    "fieldName": "学员在系统内无报名记录",
                                    "operation": "",
                                    "operationName": "",
                                    "value": "",
                                    "valueName": ""
                                }, {
                                    "field": "1",
                                    "fieldName": "签单日期在学员最后上课日期",
                                    "operation": ">",
                                    "operationName": "之后",
                                    "value": "",
                                    "valueName": ""
                                }
                            ],
                            "name": "新签"
                        }, {
                            "id": "2",
                            "isModify": "0",
                            "isAllCompany": "1",
                            "companyIds": [],
                            "logicalOperation": "and",
                            "conditions": [],
                            "name": "续费"
                        }
                    ]
                }
                if (name == 'contracttype') {
                    query.id = '5001';
                    query.configId = 'ct:contracttype';
                    query.remarks = '合同类型规则';
                    query.valueObject.types[0].companyIds = this.formValidate1.companyIds;
                    if (this.formValidate1.companyIds.length == this.companyList.length) {
                        query.valueObject.types[0].isAllCompany = '1';
                    }
                    query.valueObject.types[0].conditions[0].value = this.formValidate1.dateT;
                    query.valueObject.types[0].conditions[0].valueName = this.formValidate1.dateT;
                    query.valueObject.isAutoJudge = this.formValidate1.isAutoJudge ? 1 : 0;
                } else if (name == 'transfercenter') {
                    this.btnChangeval = false;
                    query.id = '5002';
                    query.configId = 'ct:transfercenter';
                    query.remarks = '转中心规则';
                    query.valueObject.isTransferOutAudit = this.formValidate.isTransferOutAudit ? 1 : 0;
                    query.valueObject.isTransferInAudit = this.formValidate.isTransferInAudit ? 1 : 0;
                } else if (name == 'othersetting') {
                    this.btnChangeval1 = false;
                    query.id = '5005';
                    query.configId = 'ct:othersetting';
                    query.remarks = '其它配置';
                    query.valueObject.isSameStudentCheck = this.formValidate.isSameStudentCheck ? 1 : 0;
                    query.valueObject.sameStudentRule = this.formValidate.sameStudentRule;
                    query.valueObject.isNotAllowSameNameStudent = this.formValidate.isNotAllowSameNameStudent ? 1 : 0;
                    query.valueObject.isMastPaperCode = this.formValidate.isMastPaperCode ? 1 : 0;
                }
                this.updateLoadingStatus({ isLoading: true });
                sysConfig.save(query).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        if (!this.AutoBool) {
                            this.$Message.success('保存成功!')
                        }
                        this.AutoBool = false;
                        this.modalTip = false;
                        this.officeList();
                    }
                    this.updateLoadingStatus({ isLoading: false });
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            handleSubmit2(){
                let query=this.formValidate2;
				query.value=JSON.stringify(query.value);
                this.updateLoadingStatus({ isLoading: true });
                sysConfig.save(query).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        if (!this.AutoBool) {
                            this.$Message.success('保存成功!')
                        }
                        this.btnChangeval2 = false;
                        this.AutoBool = false;
                        this.modalTip = false;
                        this.officeList();
                    }
                    this.updateLoadingStatus({ isLoading: false });
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            handleReset() {
                this.modalTip = false;
            },
            leaveNumChange(){
                this.btnChangeval2=true;
            }
        }

    }

</script>
