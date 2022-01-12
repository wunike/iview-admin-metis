<style lang="less">
.h5Form {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
    // position: relative;
    .h5fixed {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
    }
    .bg_wrap {
        width: 100%;
        position: relative;
        pointer-events: none;
        .bg {
            width: 100%;
            height: auto;
            pointer-events: none;
            display: block;
        }
        .logo {
            pointer-events: none;
            position: absolute;
            top: 30px;
            left: 20px;
        }
        .logo_size {
            max-width: 150px;
            // height: 40px;
        }
        .logMargin {
            margin-left: 20px;
            margin-top: 30px;
        }
    }
    .form_wrap {
        width: 100%;
        padding: 10px 16px 16px;
        z-index: 11;
        .ivu-form-item {
            margin-bottom: 14px;
        }
        .ivu-col {
            // padding: 0px 0 14px;
        }
        .ivu-form-item-error-tip {
            padding: 0;
        }
        .ivu-form .ivu-form-item-label {
            // padding: 10px 12px 24px 0;
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #333333;
        }
        .ivu-date-picker {
            width: 100%;
        }
        .ivu-select-selection,
        .ivu-input {
            // border: none;
            // background-color: transparent;
        }
        .ivu-select-visible .ivu-select-selection,
        .ivu-date-picker-focused input,
        .ivu-input:focus {
            // box-shadow: none;
        }
        // .ivu-btn-primary {
        //     color: #fff;
        //     background-color: #44bcb7;
        //     border-color: #44bcb7;
        // }
        .ivu-date-picker-cells-cell-selected em,
        .ivu-date-picker-cells-cell-selected:hover em {
            background: #44bcb7;
        }
        .ivu-date-picker-cells-focused em {
            box-shadow: 0 0 0 1px #44bcb7 inset;
        }
        .ivu-date-picker-cells-cell-today em:after {
            background: #44bcb7;
        }
        .ivu-radio-checked .ivu-radio-inner {
            border-color: #44bcb7;
        }
        .ivu-radio-inner:after {
            background: #44bcb7;
        }
    }
    .absolute {
        // position: absolute;
        // bottom: 0;
        right: 0;
        // left: 0;
        background: rgba(0, 0, 0, 0.6);
        font-weight: 400;
        color: rgba(221, 221, 221, 1);
        margin-left: -100%;
        .form_wrap_title {
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #333333;
            padding: 10px 0px;
            line-height: 1;
        }
        .form_wrap_welcomeMsg {
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #333333;
            padding: 10px 0px 16px;
            line-height: 1.2;
        }
        .ivu-form .ivu-form-item-label {
            color: rgba(221, 221, 221, 1);
        }
        .ivu-form-item {
            // border-bottom: 1px #999999 solid;
        }
        .ivu-input,
        .ivu-select {
            color: #ffffff;
        }
        input,
        textarea {
            -webkit-appearance: none;
            /*去除input默认样式*/
        }
    }
    .relative {
        .form_wrap_title {
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #333333;
            padding: 10px 0px;
            line-height: 1;
        }
        .form_wrap_welcomeMsg {
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #333333;
            padding: 10px 0px 16px;
            line-height: 1.2;
        }
        .ivu-form-item {
            // border-bottom: 1px #dadada solid;
        }
        input,
        textarea {
            -webkit-appearance: none;
            /*去除input默认样式*/
        }
    }
}
.h5tips_modal {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .ivu-modal {
        width: 270px !important;
        margin: 0px !important;
    }
    .ivu-modal-footer {
        padding: 0;
    }
    .tips_main {
        height: 200px;
        padding: 34px 8px 8px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .tips_title {
            font-size: 18px;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
            line-height: 34px;
            text-align: center;
            width: 100%;
            padding-top: 12px;
        }
        .tips_content {
            padding-top: 6px;
            font-size: 16px;
            font-weight: 400;
            color: rgba(136, 136, 136, 1);
            line-height: 20px;
            text-align: center;
            width: 100%;
        }
    }
    .h5tips_footer {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        height: 50px;
        div {
            flex: 1;
            text-align: center;
            font-size: 18px;
            font-weight: 400;
            line-height: 50px;
            &.close {
                border-right: 1px solid #e8eaec;
            }
            &.determine {
                color: #44bcb7;
            }
        }
    }
}
</style>

<template>
    <div class="h5Form">
        <!-- <div style="margin-bottom:9px;text-align:center;color:#030303;font-size:17px;font-weight:600;">{{formInfo.title}}</div> -->
        <div :class="{ h5fixed: formInfo.position == '1' }">
            <div class="bg_wrap">
                <img class="bg" :src="formInfo.url" v-if="formInfo.url" />
                <!-- <img :src="formInfo.logoUr" alt="logo" :class="{ logo: formInfo.url, logo_size: true, logMargin: !formInfo.url }" v-if="formInfo.logoUr" /> -->
            </div>
            <div class="form_wrap" :class="{ absolute: formInfo.position == '1', relative: formInfo.position == '0' }">
                <div class="form_wrap_title">{{ formInfo.title }}</div>
                <div class="form_wrap_welcomeMsg">{{ formInfo.welcomeMsg }}</div>
                <form-create ref="fc" v-model="fApi" :rule="rule" :option="option" @phoneList-phoneInfo="phoneInfo"></form-create>
            </div>
        </div>
        <Modal v-model="tipsMoadl" width="270" class-name="h5tips_modal" :mask-closable="false" :closable="false" :mask="false">
            <div class="tips_main">
                <Icon type="ios-checkmark-circle" color="#a1dc7a" size="60" v-if="isSaveTrue" />
                <Icon type="ios-alert" color="#ffc600" size="60" v-else />
                <div class="tips_title" v-if="isSaveTrue">{{ $t('modules_spoc_crm_web_src_views_h5form_h5form_1326') }}</div>
                <div class="tips_title" v-else>{{ $t('modules_spoc_crm_web_src_views_h5form_h5form_1327') }}</div>
                <div class="tips_content">{{ enterContent }}</div>
            </div>
            <div slot="footer" class="h5tips_footer">
                <div class="close" @click="close" v-if="!isSaveTrue">{{ $t('modules_spoc_crm_web_src_views_h5form_h5form_1328') }}</div>
                <div class="determine" @click="ok">{{ $t('classroom_allscore_54') }}</div>
            </div>
        </Modal>
    </div>
</template>

<script>
import formCreateSetting from './formCreate.js';
import valid, { errors, sys, sysDict, crmQrcode, crmCustomer } from '../../libs/request.js';
export default {
    props: {
        formData: {
            type: Object
        }
    },
    mixins: [formCreateSetting],
    data() {
        return {
            formTit: '',
            tipsMoadl: false,
            isSaveTrue: true,
            enterContent: '',
            formInfo: {},
            model: {
                isMemberEnroll: '0',
                isFormEnroll: '1',
                id: '',
                activityId: '',
                qrId: '',
                channelId: '',
                name: '',
                wechat: '',
                qq: '',
                email: '',
                phoneList: [],
                districtEntity: {
                    country: '',
                    countryName: '',
                    province: '',
                    provinceName: '',
                    city: '',
                    cityName: ''
                },
                sourceList: ['', '', ''],
                tags: [],
                remarks: '',
                address: '',
                latLongAddress: '',
                additionInfo: {
                    enName: '',
                    gender: '',
                    birthday: '',
                    schoolGrade: '',
                    schoolType: '',
                    school: '',
                    latLongSchool: ''
                },
                officeId: '',
                followOfficeId: '',
                createById: '',
                fieldJsonData: {}
            }
        };
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
        this.getInfo();
    },
    methods: {
        getFormDataFn(obj) {
            this.formData = obj;
            // console.log(obj);
        },
        getInfo() {
            if (this.formData) {
                this.formInfo = this.formData;
                if (this.formInfo.fromData) {
                    let list = this.formInfo.fromData.filter(v => v.editable == '1'); //JSON.parse()
                    this.setFormAttr(list);
                }
            } else {
                let params = {
                    channelId: this.$route.query.channelId,
                    id: this.$route.query.id,
                    tenant: this.$route.query.tenant
                };
                if (this.$route.query.isRedisGet) {
                    params.isRedisGet = this.$route.query.isRedisGet;
                }
                crmQrcode
                    .form(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.formInfo = res.data.data;
                            if (this.formInfo.title) {
                                document.title = this.formInfo.title;
                            }
                            if (this.formInfo.fromData) {
                                let list = JSON.parse(this.formInfo.fromData).filter(v => v.editable == '1'); //
                                this.setFormAttr(list);
                            }
                        } else {
                            this.formTit = res.data.msg;
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
            }
        },
        onSubmit(data) {
            this.$Spin.show({
                render: h => {
                    return h('div', [
                        h('Icon', {
                            class: 'demo-spin-icon-load',
                            props: {
                                type: 'ios-loading',
                                size: 18
                            }
                        }),
                        h('div', 'Loading')
                    ]);
                }
            });
            let obj = {
                enName: data.enName,
                gender: data.gender,
                birthday: ''
            };
            let fieldJson = {
                schoolGrade: data.schoolGrade,
                schoolType: data.schoolType,
                school: data.school
            };
            if (data.birthday) {
                obj.birthday = new Date(data.birthday.replace(/\-/g, '/')).format('yyyy-MM-dd 00:00:00');
            }
            if (data.schoolGrade && !data.schoolGrade.length) {
                obj.schoolGrade = '';
            }
            if (data.schoolType && !data.schoolType.length) {
                obj.schoolType = '';
            }
            let keys = Object.keys(this.model);
            for (let i in data) {
                if (keys.indexOf(i) != -1 && i != 'phoneList') {
                    this.model[i] = data[i];
                }
            }
            this.model.visibleOffice = data.visibleOffice;
            this.model['additionInfo'] = obj;
            this.model['fieldJsonData'] = fieldJson;
            this.model.activityId = this.formInfo.activityId || this.$route.query.activityId;
            this.model.qrId = this.$route.query.id;
            this.model.channelId = this.$route.query.channelId;
            this.model.sourceList = this.formInfo.source ? JSON.parse(this.formInfo.source) : ['', '', ''];
            this.model.tags = this.formInfo.tags ? JSON.parse(this.formInfo.tags) : [];
            this.model.officeId = this.formInfo.ownerOffice;
            this.model.followOfficeId = this.formInfo.belongOfficeId;
            this.model.createById = this.formInfo.ownerId;
            let params = Object.assign({}, this.model);
            params.tenant = this.$route.query.tenant;
            crmCustomer
                .saveUnLoginEnrollCustomer(params)
                .then(res => {
                    if (res.data.status == 'error' || res.data.status == 'authority') {
                        if (res.data.message.indexOf(this.$t('modules_spoc_crm_web_src_views_h5form_h5form_1331')) > -1) {
                            //BUG #2085
                            this.$Message.error({
                                content: res.data.message,
                                duration: 6
                            });
                        } else {
                            this.tipsMoadl = true;
                            this.isSaveTrue = false;
                            this.enterContent = this.$t('modules_spoc_crm_web_src_views_h5form_h5form_1332');
                        }
                    } else if (res.data.status == 'location') {
                        location.href = res.data.location;
                    } else if (res.data.status == 'success') {
                        this.tipsMoadl = true;
                        this.isSaveTrue = true;
                        this.enterContent = this.$t('modules_spoc_crm_web_src_views_h5form_h5form_1333');
                    } else if (res.status == '200') {
                        this.tipsMoadl = true;
                        this.isSaveTrue = true;
                        this.enterContent = this.$t('modules_spoc_crm_web_src_views_h5form_h5form_1333');
                    } else {
                        console.error('unknow status');
                    }
                })
                .then(res => {
                    // if (res.ok) {
                    // }
                })
                .catch()
                .finally(() => {
                    this.$Spin.hide();
                });
        },
        findPhonePlace(phone) {
            this.isfindPhonePlace = true;
            let params = {
                phone: phone || '',
                tenant: this.$route.query.tenant
            };
            crmCustomer
                .findPhonePlace(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let info = res.data.data;
                        let obj = {
                            phone: info.phone,
                            district: info.areaCode,
                            isModif: 1,
                            locId: info.country,
                            sort: 0
                        };
                        this.model.phoneList = [];
                        this.model.phoneList.push(obj);
                        let obj1 = {
                            city: info.city,
                            cityName: info.cityName,
                            country: info.country,
                            countryName: info.countryName,
                            province: info.province,
                            provinceName: info.provinceName
                        };
                        if (info.city == info.province) {
                            obj1.city = '';
                            obj1.cityName = '';
                        }
                        this.model.districtEntity = obj1;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        phoneInfo() {
            let phone = this.fApi.getValue('phoneList');
            this.findPhonePlace(phone);
        },
        close() {
            this.tipsMoadl = false;
            this.isSaveTrue = true;
            this.enterContent = '';
            this.fApi.resetFields();
        },
        ok() {
            this.windowClose();
        },
        windowClose() {
            var userAgent = navigator.userAgent;
            if (typeof WeixinJSBridge != 'undefined') {
                WeixinJSBridge.call('closeWindow');
                document.addEventListener('WeixinJSBridgeReady', function() {
                    WeixinJSBridge.call('closeWindow');
                });
            } else if (userAgent.indexOf('Firefox') != -1 || userAgent.indexOf('Mobile') != -1) {
                window.history.back();
                window.close();
            } else if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) {
                window.history.back();
                window.close();
            } else {
                window.opener = null;
                window.close();
            }
        }
    }
};
</script>
