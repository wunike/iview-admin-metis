<style lang="less">
.create-lessee-wrapper {
    .clear {
        zoom: 1;
        &::before,
        &::after {
            content: '';
            display: block;
            clear: both;
            height: 0;
            line-height: 0;
            font-size: 0;
        }
    }
    form {
        .clear;
    }
    .ivu-form-item {
        float: left;
        width: 50%;
        height: 32px;
    }
    .ivu-form .ivu-form-item-label {
        font-size: 14px;
        color: #999;
    }
    .ivu-input,
    .ivu-btn {
        font-size: 14px;
    }
    .ivu-divider-horizontal.ivu-divider-with-text-left:before{
        width: 2%;
    }
    .ivu-divider-horizontal.ivu-divider-with-text-left .ivu-divider-inner-text, .ivu-divider-horizontal.ivu-divider-with-text-right .ivu-divider-inner-text{
        display: block;
        font-size: 14px;
        color: #495060;
    }
}
</style>

<template>
    <div>
        <Modal v-model="lesseeModal" :title="title" :loading="loading" :closable="false" width="800" class-name="create-lessee-wrapper">
            <Form ref="lesseeRef" :model="lessee" :label-width="100" :rules="ruleValidate" :label-colon="true">
                <FormItem label="选择租户" prop="cusId">
                    <Select
                        v-model="lessee.cusId"
                        filterable
                        remote
                        :remote-method="remoteMethod"
                        @on-query-change="getCusIdList"
                        :loading="cusIdLoading"
                        :disabled="isEditor"
                        @on-change="cusChange"
                    >
                        <Option v-for="(option, index) in cusIdList" :value="option.id" :key="index" :label="option.name">{{ option.name }}({{ option.phone }})</Option>
                    </Select>
                </FormItem>
                <Divider orientation="left">基本信息</Divider>
                <FormItem label="企业名称" prop="name"><Input v-model="lessee.name" placeholder="请输入" :disabled="isEditor" /></FormItem>
                <FormItem label="邮箱" prop="email"><Input v-model="lessee.email" placeholder="请输入" :disabled="isEditor" /></FormItem>
                <FormItem label="联系人" prop="duty"><Input v-model="lessee.duty" placeholder="请输入" :disabled="isEditor" /></FormItem>
                <FormItem label="手机号" prop="mobile">
                    <!-- <Row type="flex" justify="space-between">
                        <div style="width:100%;
                                display: flex;
                                flex-direction: row;
                                justify-content: space-between;
                                align-items: center;">
                            <Select v-model="lessee.district" style="margin-right: 8px;width: 88px;min-width: 88px;max-width: 88px;flex: 0 0 88px;">
                                <Option v-for="item in areaCodeList" :value="item.areaCode" :key="item.areaCode">{{item.areaCodeShow+item.name}}</Option>
                            </Select>
                        </div>
                    </Row> -->
                    <Input v-model="lessee.mobile" placeholder="请输入" @on-blur="changeMobile" :disabled="isEditor" />
                </FormItem>
                <Divider orientation="left">订单信息</Divider>
                <FormItem label="是否正式" prop="isFormal">
                    <RadioGroup v-model="lessee.isFormal" @on-change="isFormalChange">
                        <Radio label="0" :disabled="isEditor">试用租户</Radio>
                        <Radio label="1" :disabled="isEditor">正式租户</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="" prop=""></FormItem>
                <FormItem label="开始时间" prop="startDate"><DatePicker v-model="lessee.startDate" type="date" placeholder="开始时间" style="width: 276px;"></DatePicker></FormItem>
                <FormItem label="结束时间" prop="endDate"><DatePicker v-model="lessee.endDate" type="date" placeholder="结束时间" style="width: 276px;"></DatePicker></FormItem>
                <FormItem label="产品版本" prop="version">
                    <Select
                        v-model="lessee.version"
                        :disabled="isEditor"
                    >
                        <Option value="crm" :label="客户管理版">客户管理版</Option>
                        <Option value="standard" :label="全流程标准版">全流程标准版</Option>
                        <Option value="profession" :label="全流程专业版">全流程专业版</Option>
                        <!-- <Option value="enterprise" :label="定制版">定制版</Option> -->
                    </Select>
                </FormItem>
                <FormItem label="计费方式" prop="num">
                    <div style="display:flex">
                        <RadioGroup v-model="lessee.type">
                            <Radio label="user" :disabled="isEditor">员工数量</Radio>
                            <Radio label="office" :disabled="isEditor">校区数量</Radio>
                        </RadioGroup>
                        <Input v-model="lessee.num" placeholder="" style="width: 128px;">
                            <span slot="append" v-text="lessee.type=='user'?'人':'个'"></span>
                        </Input>
                    </div>
                </FormItem>
                <!-- <FormItem label="限制数量" prop="num"> -->
                <!-- </FormItem> -->
                <Divider orientation="left">生成信息</Divider>
                <FormItem label="管理员账号" prop="account"><Input v-model="lessee.account" placeholder="缺省账号可以修改" :disabled="isEditor" /></FormItem>
                <FormItem>
                    <div slot="label">
                        <span>管理员密码</span><span>:</span>
                    </div>
                    <Input v-model="password" disabled placeholder="缺省密码可以修改" />
                    <!-- <Tooltip content="系统将自动创建初始密码，密码为 admin +手机号后四位，不需要填写" max-width="200"><Icon type="ios-help-circle" /></Tooltip> -->
                </FormItem>
               <!--  <FormItem label="开启超管" prop="type">
                    <Checkbox v-model="lessee.isAdminEnable" true-value="1" false-value="0">{{null}}</Checkbox>
                </FormItem> -->
                <!-- <FormItem label="访问域名" prop="domain">
                    <Input v-model="lessee.domain" placeholder="请输入" />
                </FormItem>
                <FormItem label="企业所在地" prop="address">
                    <Row type="flex" justify="space-between">
                        <div style="width:100%;
                                display: flex;
                                flex-direction: row;
                                justify-content: space-between;
                                align-items: center;">
                            <Input v-model="lessee.address" placeholder="请选择地址"></Input>
                            <Button @click="getMap" style="margin-left: 8px;">地址选择</Button>
                        </div>
                    </Row>
                </FormItem> -->
            </Form>
            <div slot="footer">
                <Button @click="closeLessee">取消</Button>

                <Button type="primary" @click="validateLessee">确定</Button>
            </div>
        </Modal>
        <mapModel ref="mapModel" @mapOk="mapOk"></mapModel>
    </div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 租户列表 - 新增租户弹窗
 */
import mapModel from '@public/modules/mapModel.vue';
import { mapMutations, mapState } from "vuex";
import valid, { errors, api, sysCommonSql } from '../../../libs/request';
export default {
    components: {
        mapModel
    },
    data() {
        return {
            lesseeModal: false,
            title: '创建租户',
            lessee: {
                account: '',
                address: '',
                domain: '',
                duty: '',
                email: '',
                mobile: '',
                name: '',
                cusId: '',
                isFormal: '0',
                version: 'crm',
                type: 'user',
                startDate: '',
                endDate: '',
                num: '',
                isAdminEnable:"1"
            },
            areaCodeList: [
                {
                    areaCode: '0086',
                    areaCodeShow: '+86',
                    name: '中国'
                }
            ],
            loading: true,
            ruleValidate: {
                cusId: [{ required: true, message: '请输入', trigger: 'change' }],
                startDate: [{ required: true, type: 'date', message: '请输入', trigger: 'change' }],
                endDate: [{ required: true, type: 'date', message: '请输入', trigger: 'change' }],
                account: [{ required: true, message: '请输入', trigger: 'blur' }],
                name: [{ required: true, message: '请输入', trigger: 'blur' }],
                duty: [{ required: true, message: '请输入', trigger: 'blur' }],
                mobile: [{ required: true, message: '请输入', trigger: 'blur' }, { pattern: /^1\d{10}$/, message: '手机号格式不正确', trigger: 'blur' }],
                num: [{ required: true, message: '请输入', trigger: 'blur' }, { pattern: /^\d+$/, message: '请输入数字', trigger: 'blur' }],
                email: [{ required: true, message: '请输入', trigger: 'blur' }, { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }],
                domain: [
                    { required: true, message: '请输入', trigger: 'blur' },
                    {
                        pattern: /^(?!http(s)?:\/\/|http(s)?:\/\/www|www)(?=^.{1,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/,
                        message: '访问域名格式不正确',
                        trigger: 'blur'
                    }
                    // { pattern: /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/, message: '访问域名格式不正确', trigger: 'blur' }
                    // { pattern: /(?<=http://www|https://www)\w+\.\w+\.\w+/, message: '访问域名格式不正确', trigger: 'blur' }
                ]
            },
            cusIdList: [],
            isEditor: false,
            tenantCode: ''
        };
    },
    computed: {
        password() {
            return 'admin' + this.lessee.mobile.substring(this.lessee.mobile.length - 4);
        }
    },
    mounted() {
        this.getCusIdList('');
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        changeMobile(){
            if(!this.lessee.account && this.lessee.mobile) {
                this.lessee.account = this.lessee.mobile
                this.$refs.lesseeRef.validateField('account');
            }
        },
        showModal() {
            this.lesseeModal = true;
            this.title = '创建租户';
            this.isEditor = false;
            // this.validateReset();
        },
        editorModal(obj) {
            this.title = '租户续约';
            this.isEditor = true;
            this.tenantCode = obj.code;
            // this.validateReset();
            api.formDetail({ tenantCode: obj.code })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        console.log('%O', res.data.data);
                        let policy = JSON.parse(res.data.data.policy);
                        let lesseeObj = res.data.data;
                        lesseeObj.version = policy.version;
                        if (policy.permissions && policy.permissions.length) {
                            let tObj = policy.permissions[0];
                            lesseeObj.type = tObj.type;
                            lesseeObj.startDate = tObj.startDate;
                            lesseeObj.endDate = tObj.endDate;
                            if (lesseeObj.type == 'user') {
                                lesseeObj.num = tObj.maxUserNumber;
                            } else if (lesseeObj.type == 'office') {
                                lesseeObj.num = tObj.maxOfficeNumber;
                            } else {
                                lesseeObj.num = '';
                            }
                        }
                        this.lessee = lesseeObj;
                        this.$nextTick(() => {
                            this.lesseeModal = true;
                        });
                    }
                })
                .catch(errors.call(this));
        },
        validateLessee() {
            this.updateLoadingStatus({ isLoading: true });
            this.$refs.lesseeRef.validate(valid => {
                if (valid) {
                    if (this.isEditor) {
                        this.updatePolicyPermission();
                    } else {
                        this.saveLessee();
                    }
                } else {
                    this.updateLoadingStatus({ isLoading: false });
                    this.changeLoading();
                }
            });
        },
        closeLessee() {
            this.validateReset();
            this.$nextTick(() => {
                this.lesseeModal = false;
            });
        },
        validateReset() {
            this.$refs.lesseeRef && this.$refs.lesseeRef.resetFields();
            this.isEditor = false;
        },
        changeLoading() {
            this.loading = false;
            setTimeout(() => {
                this.loading = true;
            }, 0);
        },
        saveLessee() {
            // let params = Object.assign({
            //     password: this.password
            // }, this.lessee)
            let cusName = this.cusIdList.find(v => v.id == this.lessee.cusId).name;
            let params = {
                password: this.password,
                account: this.lessee.account,
                address: '',
                domain: '',
                duty: this.lessee.duty,
                email: this.lessee.email,
                mobile: this.lessee.mobile,
                name: this.lessee.name,
                cusId: this.lessee.cusId,
                cusName: cusName,
                version: this.lessee.version,
                isFormal: this.lessee.isFormal,
                isAdminEnable: this.lessee.isAdminEnable
            };
            let policy = {
                tenantCode: '',
                version: '',
                permissions: [
                    {
                        module: 'glabal',
                        name: '全局',
                        policy: 'timeLimit',
                        startDate: new Date(this.lessee.startDate).format('yyyy-MM-dd'),
                        endDate: new Date(this.lessee.endDate).format('yyyy-MM-dd'),
                        maxUserNumber: this.lessee.type == 'user' ? this.lessee.num : '-1',
                        maxStudentNumber: '-1',
                        maxCustomerNumber: '-1',
                        maxOfficeNumber: this.lessee.type == 'office' ? this.lessee.num : '-1',
                        status: '0',
                        type: this.lessee.type
                    }
                ],
                maxOnlineNumber: 100
            };
            params.policy = JSON.stringify(policy);
            this.updateLoadingStatus({ isLoading: true });
            api.tenantInit(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success('保存成功');
                        this.validateReset();
                        this.$nextTick(() => {
                            this.lesseeModal = false;
                            this.$emit('upload');
                        });
                    } else {
                        this.$Message.error(res.data.msg);
                        this.changeLoading();
                    }
                })
                .catch(() => {
                    this.changeLoading();
                    errors.call(this);
                }).finally(()=>{
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        updatePolicyPermission() {
            let params = {
                tenantCode: this.tenantCode,
                permission: {
                    name: '全局',
                    type: 'user',
                    module: 'glabal',
                    policy: 'timeLimit',
                    status: '0',
                    endDate: new Date(this.lessee.endDate).format('yyyy-MM-dd'),
                    startDate: new Date(this.lessee.startDate).format('yyyy-MM-dd'),
                    maxUserNumber: this.lessee.type == 'user' ? this.lessee.num : '-1',
                    maxOfficeNumber: this.lessee.type == 'office' ? this.lessee.num : '-1',
                    maxStudentNumber: '-1',
                    maxCustomerNumber: '-1'
                }
            };
            api.updatePolicyPermission(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success('保存成功');
                        this.validateReset();
                        this.$nextTick(() => {
                            this.lesseeModal = false;
                            this.$emit('upload');
                        });
                    } else {
                        this.$Message.error(res.data.msg);
                        this.changeLoading();
                    }
                })
                .catch(() => {
                    errors.call(this);
                }).finally(()=>{
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getMap() {
            this.lesseeModal = false;
            this.$refs.mapModel.modelShow();
        },
        mapOk(keyword, province, city, region, lng, lat) {
            this.lesseeModal = true;
            this.lessee.address = keyword;
            // console.log('mapOk', keyword, province, city, region, lng, lat)
        },
        remoteMethod() {},
        getCusIdList(val) {
            let params = {
                searchField: 'name',
                searchFieldParam: val,
                mainTable: 'crm_customer',
                field1: 'star_phone'
            };
            sysCommonSql
                .querySingleTableData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.cusIdList = res.data.data;
                    }
                })
                .catch(() => {
                    errors.call(this);
                });
        },
        cusChange(val) {},
        isFormalChange(val) {
            if (val == 0) {
                this.lessee.version = 'crm';
            } else {
            }
        }
    }
};
</script>
