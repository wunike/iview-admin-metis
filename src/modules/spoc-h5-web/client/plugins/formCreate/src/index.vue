<!--test.vue-->
<template>
    <div class="qk-form-create">
        <form-create ref="fc" class="qk-form-create-item" v-model="fApi" :rule="rule" :option="option" :key="JSON.stringify(option)" @submit="onSubmit"></form-create>
    </div>
</template>

<script>
import formCreateSetting from './formCreate';
import $axios from '@client/service/httpServer'; // axios拦截器配置
import _config from '@/config';
import { mapState, mapGetters } from 'vuex';
import valid, { errors, SysProps, common, report, api } from '@client/service/request.js';
export default {
    name: 'QkFormCreate',
    mixins: [formCreateSetting],
    props: {
        ruleList: {
            type: Array,
            default: () => {
                return [];
            }
        },
        action: {
            type: String,
            default: 'https://h5server.ivygate.cn/api/crm/a/ws/crm/crmCustomer/anno/saveUnLoginEnrollCustomer'
        },
        labelStyle: {
            type: Object,
            default: () => {
                return {
                    fontSize: '14px',
                    color: '#606266'
                };
            }
        },
        //组件参数配置
        formCreateOption: {
            type: Object,
            default: () => {
                return {
                    // global: {
                    //     //设置所有组件
                    //     '*': {
                    //         col: {
                    //             span: 24
                    //         },
                    //         props: {
                    //             disabled: false
                    //         }
                    //     },
                    // }
                    form: {
                        //行内表单模式
                        inline: false,
                        //表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
                        labelPosition: 'top',
                        //表单域标签的后缀
                        labelColon: ':',
                        //是否显示必填字段的标签旁边的红色星号
                        hideRequiredAsterisk: true,
                        //表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
                        labelWidth: undefined,
                        //是否显示校验错误信息
                        showMessage: true,
                        //是否以行内形式展示校验信息
                        inlineMessage: false,
                        //是否在输入框中显示校验结果反馈图标
                        statusIcon: false,
                        //是否在 rules 属性改变后立即触发一次验证
                        validateOnRuleChange: true,
                        //是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效
                        disabled: false,
                        //用于控制该表单内组件的尺寸 default / small / large
                        size: 'default'
                    },
                    row: {
                        //栅格间隔
                        gutter: 0,
                        //布局模式，可选 flex，现代浏览器下有效
                        type: 'flex',
                        //flex 布局下的垂直排列方式 top/middle/bottom
                        align: undefined,
                        //flex 布局下的水平排列方式 start/end/center/space-around/space-between
                        justify: 'start',
                        //自定义元素标签
                        tag: 'div'
                    },
                    submitBtn: {
                        //类型 primary / success / warning / danger / info / text
                        type: 'primary',
                        //按钮大小，可选值为large、small、default或者不设置
                        size: 'default',
                        //是否朴素按钮
                        plain: false,
                        //是否圆角按钮
                        round: false,
                        //是否圆形按钮
                        circle: false,
                        //是否加载中状态
                        loading: false,
                        //是否禁用状态
                        disabled: false,
                        //图标类名
                        icon: null,
                        //按钮宽度
                        width: '100%',
                        //是否默认聚焦
                        autofocus: false,
                        //原生 type 属性
                        nativeType: 'button',
                        //按钮内容
                        innerText: '提交',
                        //按钮是否显示
                        show: true,
                        //按钮布局规则
                        col: undefined,
                        //按钮点击事件
                        click: undefined
                    },
                    resetBtn: {
                        type: 'default',
                        size: 'medium',
                        plain: false,
                        round: false,
                        circle: false,
                        loading: false,
                        disabled: false,
                        icon: 'el-icon-refresh',
                        width: '100%',
                        autofocus: false,
                        nativeType: 'button',
                        innerText: '重置',
                        show: false,
                        col: undefined,
                        click: undefined
                    },
                    info: {
                        //提示消息类型,popover,tooltip
                        type: 'popover'
                    },

                    mounted: $f => {
                        // TODO
                        // TODO 表单创建成功,可在此操作表单
                        console.log($f, 12311122);
                    },
                    onReload: $f => {
                        // TODO
                        // TODO 表单创建成功,可在此操作表单
                        // console.log(this.fApi.rule, 11111);
                    }
                    // 表单提交事件
                    // onSubmit: formData => {}
                    // onReload: function($f) {
                    //TODO
                    // }
                };
            }
        },
        submitStyle: {
            type: Object,
            default: () => {
                return {
                    fontSize: '14px',
                    color: '#ffffff',
                    background: '#25A589',
                    height: '36px '
                };
            }
        }
    },
    data() {
        return {
            formInfo: {},
            fApi: {},
            option: {
                // global: {
                //     //设置所有组件
                //     '*': {
                //         col: {
                //             span: 24
                //         },
                //         props: {
                //             disabled: false
                //         }
                //     },
                // }
                form: {
                    //行内表单模式
                    inline: false,
                    //表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
                    labelPosition: 'top',
                    //表单域标签的后缀
                    labelColon: ':',
                    //是否显示必填字段的标签旁边的红色星号
                    hideRequiredAsterisk: true,
                    //表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
                    labelWidth: undefined,
                    //是否显示校验错误信息
                    showMessage: true,
                    //是否以行内形式展示校验信息
                    inlineMessage: false,
                    //是否在输入框中显示校验结果反馈图标
                    statusIcon: false,
                    //是否在 rules 属性改变后立即触发一次验证
                    validateOnRuleChange: true,
                    //是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效
                    disabled: false,
                    //用于控制该表单内组件的尺寸 default / small / large
                    size: 'default'
                },
                row: {
                    //栅格间隔
                    gutter: 0,
                    //布局模式，可选 flex，现代浏览器下有效
                    type: 'flex',
                    //flex 布局下的垂直排列方式 top/middle/bottom
                    align: undefined,
                    //flex 布局下的水平排列方式 start/end/center/space-around/space-between
                    justify: 'start',
                    //自定义元素标签
                    tag: 'div'
                },
                submitBtn: {
                    //类型 primary / success / warning / danger / info / text
                    type: 'primary',
                    //按钮大小，可选值为large、small、default或者不设置
                    size: 'default',
                    //是否朴素按钮
                    plain: false,
                    //是否圆角按钮
                    round: false,
                    //是否圆形按钮
                    circle: false,
                    //是否加载中状态
                    loading: false,
                    //是否禁用状态
                    disabled: false,
                    //图标类名
                    icon: null,
                    //按钮宽度
                    width: '100%',
                    //是否默认聚焦
                    autofocus: false,
                    //原生 type 属性
                    nativeType: 'button',
                    //按钮内容
                    innerText: '提交',
                    //按钮是否显示
                    show: true,
                    //按钮布局规则
                    col: undefined,
                    //按钮点击事件
                    click: undefined
                },
                resetBtn: {
                    type: 'default',
                    size: 'medium',
                    plain: false,
                    round: false,
                    circle: false,
                    loading: false,
                    disabled: false,
                    icon: 'el-icon-refresh',
                    width: '100%',
                    autofocus: false,
                    nativeType: 'button',
                    innerText: '重置',
                    show: false,
                    col: undefined,
                    click: undefined
                },
                info: {
                    //提示消息类型,popover,tooltip
                    type: 'popover'
                },

                mounted: $f => {
                    // TODO
                    // TODO 表单创建成功,可在此操作表单
                    // console.log(this.fApi.rule, 123111222);
                    this.$nextTick(() => {
                        let btnList = this.$el.getElementsByClassName('ivu-btn');
                        if (this.formCreateOption.submitBtn.type == 'primary') {
                            for (let i = 0; i < btnList.length; i++) {
                                btnList[i].style.width = this.formCreateOption.submitBtn.width;
                                btnList[i].style.fontSize = this.submitStyle.fontSize;
                                btnList[i].style.color = this.submitStyle.color;
                                btnList[i].style.background = this.submitStyle.background;
                                btnList[i].style.height = this.submitStyle.height;
                                btnList[i].style.borderColor = this.submitStyle.background;
                                console.log(btnList[i].style, btnList[i].style.background, this.submitStyle.background);
                            }
                        } else {
                            for (let i = 0; i < btnList.length; i++) {
                                btnList[i].style.width = this.formCreateOption.submitBtn.width;
                                btnList[i].style.fontSize = this.submitStyle.fontSize;
                                btnList[i].style.color = this.submitStyle.color;
                                btnList[i].style.height = this.submitStyle.height;
                                btnList[i].style.borderColor = this.submitStyle.background;
                                console.log(btnList[i].style, btnList[i].style.background, this.submitStyle.background);
                            }
                        }
                        let domList = this.$el.getElementsByClassName('ivu-form-item-label');
                        for (let i = 0; i < domList.length; i++) {
                            domList[i].style.fontSize = this.labelStyle.fontSize;
                            domList[i].style.color = this.labelStyle.color;
                        }
                        console.log(this.submitStyle, this.labelStyle, 3);
                    });
                },
                onReload: $f => {
                    // TODO
                    // TODO 表单创建成功,可在此操作表单
                    // console.log(this.fApi.rule, 11111);
                }
                // 表单提交事件
                // onSubmit: formData => {}
                // onReload: function($f) {
                //TODO
                // }
            }
        };
    },
    computed: {
        ...mapState({
            projectData: state => state.editor.projectData
        })
    },
    created() {
        // this.tempValue = this.value;
    },
    mounted() {
        this.option = this.formCreateOption;
        let params = {
            channelId: '1',
            id: '1'
        };
        this.tenant = localStorage.getItem('tenant') || window._pageData.tenant;

        api.pageDetail(this.$route.query.id)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let iData = res.data.body;
                    if (!iData.ownerId) {
                        let body = document.getElementsByTagName('body').item(0);
                        let styleClass = body.className.split(' ').find(v => v.indexOf('_wrap') != -1);
                        let colorMap = {
                            blue_wrap: '#2E86FF',
                            coral_wrap: '#ff7a54',
                            default_wrap: '#44bcb7',
                            grass_wrap: '#88b04b',
                            iris_wrap: '#7273de',
                            orange_wrap: '#ffcc00'
                        };
                        if (styleClass) {
                            this.submitStyle.background = colorMap[styleClass];
                        }
                    }
                    // this.projectData=Object.assign({},this.projectData,obj);
                    console.log(iData.ownerId, 12311111);
                }
            })
            .catch(errors.call(this))
            .catch(() => {
                this.loading = false;
            })
            .finally(() => {});
    },
    methods: {
        onSubmit(formData) {
            let tenant = this.tenant;
            if (formData.phoneList) {
                let headers = { tenant };
                // if (process.env.NODE_ENV == 'production') {
                //     headers.Referer = _config.baseURL1;
                // }
                $axios
                    .get('/api/crm/a/ws/crm/crmCustomer/anno/findPhonePlace', { phone: formData.phoneList }, headers)
                    .then(res => {
                        let info = res.data;
                        let phoneInfo = [
                            {
                                phone: info.phone,
                                district: info.areaCode,
                                isModif: 1,
                                locId: info.country,
                                sort: 0
                            }
                        ];
                        let districtEntity = {
                            city: info.city,
                            cityName: info.cityName,
                            country: info.country,
                            countryName: info.countryName,
                            province: info.province,
                            provinceName: info.provinceName
                        };

                        let params = {
                            h5Id: window._pageData._id, // 新增 h5的Id
                            h5Name: window._pageData.title, // 新增 h5的标题
                            sourceList: window._pageData.source,
                            createById: window._pageData.ownerId,
                            officeId: window._pageData.officeId,
                            followOfficeId: window._pageData.ownerOfficeId,
                            isMemberEnroll: '0',
                            isFormEnroll: '1',
                            districtEntity: districtEntity,
                            additionInfo: { birthday: '' }
                        };
                        params = Object.assign(params, formData);
                        params.phoneList = phoneInfo;
                        // let tenant = localStorage.getItem('tenant');
                        let tenant = this.tenant; //let token = localStorage.getItem('token');
                        let headers = { tenant };
                        // if (process.env.NODE_ENV == 'production') {
                        //     headers.Referer = _config.baseURL1;
                        // }
                        $axios
                            .post('/api/crm/a/ws/crm/crmCustomer/anno/saveUnLoginEnrollCustomer', params, headers)

                            .then(res => {
                                let msg = '';
                                let flag = false;
                                if (res.status == 'error' || res.status == 'authority') {
                                    if (res.message.indexOf('电话已存在') > -1) {
                                        msg = res.message;
                                        // this.submitStatus = false;
                                        // this.articleShow = true;
                                    } else {
                                        msg = '您的手机已报名成功，无需重复报名';
                                    }
                                } else if (res.status == 'location') {
                                    location.href = res.location;
                                } else if (res.status == 'success') {
                                    msg = '您已报名成功，稍后我们的工作人将会与您取得联系';
                                    flag = true;
                                } else if (res.status == '200') {
                                    msg = '您已报名成功，稍后我们的工作人将会与您取得联系';
                                    flag = true;
                                } else {
                                    msg = '未知的错误';
                                }
                                if (flag) {
                                    this.$message({
                                        message: msg,
                                        type: 'success'
                                    });
                                } else {
                                    this.$message.error(msg);
                                }
                            })
                            .then(res => {})
                            .catch()
                            .finally(() => {});
                    })
                    .catch()
                    .finally(() => {});
            } else {
                let params = {
                    h5Id: window._pageData._id, // 新增 h5的Id
                    h5Name: window._pageData.title, // 新增 h5的标题
                    isFormEnroll: '1',
                    sourceList: window._pageData.source,
                    createById: window._pageData.ownerId,
                    officeId: window._pageData.officeId,
                    followOfficeId: window._pageData.ownerOfficeId,
                    isMemberEnroll: '0',
                    districtEntity: {
                        city: '',
                        cityName: '',
                        country: '',
                        countryName: '',
                        province: '',
                        provinceName: ''
                    },
                    additionInfo: { birthday: '' }
                };
                params = Object.assign(params, formData);
                // let tenant = localStorage.getItem('tenant');
                let tenant = this.tenant; //let token = localStorage.getItem('token');
                let headers = { tenant };
                // if (process.env.NODE_ENV == 'production') {
                //     headers.Referer = _config.baseURL1;
                // }
                $axios
                    .post('/api/crm/a/ws/crm/crmCustomer/anno/saveUnLoginEnrollCustomer', params, headers)
                    .then(res => {
                        let msg = '';
                        let flag = false;
                        if (res.status == 'error' || res.status == 'authority') {
                            if (res.message.indexOf('电话已存在') > -1) {
                                msg = res.message;
                                // this.submitStatus = false;
                                // this.articleShow = true;
                            } else {
                                msg = '您的手机已报名成功，无需重复报名';
                            }
                        } else if (res.status == 'location') {
                            location.href = res.location;
                        } else if (res.status == 'success') {
                            msg = '您已报名成功，稍后我们的工作人将会与您取得联系';
                            flag = true;
                        } else if (res.status == '200') {
                            msg = '您已报名成功，稍后我们的工作人将会与您取得联系';
                            flag = true;
                        } else {
                            msg = '未知的错误';
                        }
                        if (flag) {
                            this.$message({
                                message: msg,
                                type: 'success'
                            });
                        } else {
                            this.$message.error(msg);
                        }
                    })
                    .then(res => {})
                    .catch()
                    .finally(() => {});
            }
        }
    },
    watch: {
        ruleList: {
            handler: function(val, oldVal) {
                this.setFormAttr(val.filter(v => v.editable == '1'));
                this.$nextTick(() => {
                    let btnList = this.$el.getElementsByClassName('ivu-btn');
                    if (this.formCreateOption.submitBtn.type == 'primary') {
                        for (let i = 0; i < btnList.length; i++) {
                            btnList[i].style.width = this.formCreateOption.submitBtn.width;
                            btnList[i].style.fontSize = this.submitStyle.fontSize;
                            btnList[i].style.color = this.submitStyle.color;
                            btnList[i].style.background = this.submitStyle.background;
                            btnList[i].style.height = this.submitStyle.height;
                            btnList[i].style.borderColor = this.submitStyle.background;
                            console.log(btnList[i].style, btnList[i].style.background, this.submitStyle.background);
                        }
                    } else {
                        for (let i = 0; i < btnList.length; i++) {
                            btnList[i].style.width = this.formCreateOption.submitBtn.width;
                            btnList[i].style.fontSize = this.submitStyle.fontSize;
                            btnList[i].style.color = this.submitStyle.color;
                            btnList[i].style.height = this.submitStyle.height;
                            btnList[i].style.borderColor = this.submitStyle.background;
                            console.log(btnList[i].style, btnList[i].style.background, this.submitStyle.background);
                        }
                    }
                    let domList = this.$el.getElementsByClassName('ivu-form-item-label');
                    for (let i = 0; i < domList.length; i++) {
                        domList[i].style.fontSize = this.labelStyle.fontSize;
                        domList[i].style.color = this.labelStyle.color;
                    }
                });
            },
            deep: true,
            immediate: true
        },
        formCreateOption: {
            handler: function(val, oldVal) {
                this.option = val;
                // this.fApi.destroy(true);
                console.log(this.fApi, this.$refs.fc);
                this.$nextTick(() => {
                    if (this.formCreateOption.form.labelPosition == 'top') {
                    } else {
                    }
                    let btnList = this.$el.getElementsByClassName('ivu-btn');
                    if (this.formCreateOption.submitBtn.type == 'primary') {
                        for (let i = 0; i < btnList.length; i++) {
                            btnList[i].style.width = this.formCreateOption.submitBtn.width;
                            btnList[i].style.fontSize = this.submitStyle.fontSize;
                            btnList[i].style.color = this.submitStyle.color;
                            btnList[i].style.background = this.submitStyle.background;
                            btnList[i].style.height = this.submitStyle.height;
                            btnList[i].style.borderColor = this.submitStyle.background;
                            console.log(btnList[i].style, btnList[i].style.background, this.submitStyle.background);
                        }
                    } else {
                        for (let i = 0; i < btnList.length; i++) {
                            btnList[i].style.width = this.formCreateOption.submitBtn.width;
                            btnList[i].style.fontSize = this.submitStyle.fontSize;
                            btnList[i].style.color = this.submitStyle.color;
                            btnList[i].style.height = this.submitStyle.height;
                            btnList[i].style.borderColor = this.submitStyle.background;
                            console.log(btnList[i].style, btnList[i].style.background, this.submitStyle.background);
                        }
                    }
                    let domList = this.$el.getElementsByClassName('ivu-form-item-label');
                    for (let i = 0; i < domList.length; i++) {
                        domList[i].style.fontSize = this.labelStyle.fontSize;
                        domList[i].style.color = this.labelStyle.color;
                    }
                    console.log(this.submitStyle, this.labelStyle, 3);
                });
            },
            deep: true
        },
        labelStyle: {
            handler: function(val, oldVal) {
                this.$nextTick(() => {
                    let domList = this.$el.getElementsByClassName('ivu-form-item-label');
                    for (let i = 0; i < domList.length; i++) {
                        domList[i].style.fontSize = this.labelStyle.fontSize;
                        domList[i].style.color = this.labelStyle.color;
                    }
                    console.log(this.$el.getElementsByClassName('ivu-form-item-label'), this.submitStyle, domList, this.labelStyle, 4);
                });
            },
            deep: true,
            immediate: true
        },
        submitStyle: {
            handler: function(val, oldVal) {
                this.$nextTick(() => {
                    let btnList = this.$el.getElementsByClassName('ivu-btn');
                    if (this.formCreateOption.submitBtn.type == 'primary') {
                        for (let i = 0; i < btnList.length; i++) {
                            btnList[i].style.width = this.formCreateOption.submitBtn.width;
                            btnList[i].style.fontSize = this.submitStyle.fontSize;
                            btnList[i].style.color = this.submitStyle.color;
                            btnList[i].style.background = this.submitStyle.background;
                            btnList[i].style.height = this.submitStyle.height;
                            btnList[i].style.borderColor = this.submitStyle.background;
                            console.log(btnList[i].style, btnList[i].style.background, this.submitStyle.background);
                        }
                    } else {
                        for (let i = 0; i < btnList.length; i++) {
                            btnList[i].style.width = this.formCreateOption.submitBtn.width;
                            btnList[i].style.fontSize = this.submitStyle.fontSize;
                            btnList[i].style.color = this.submitStyle.color;
                            btnList[i].style.height = this.submitStyle.height;
                            btnList[i].style.borderColor = this.submitStyle.background;
                            console.log(btnList[i].style, btnList[i].style.background, this.submitStyle.background);
                        }
                    }
                    console.log(this.submitStyle, btnList, this.labelStyle, 5);
                });
            },
            deep: true,
            immediate: true
        }
    }
};
</script>

<style lang="less">
.qk-form-create-item {
    display: block;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    padding: 16px;
    .ivu-date-picker {
        width: 100%;
    }
    &.el-form--label-top {
        .ivu-form-item-label {
            width: 100%;
            padding: 0;
        }
        .el-form-item {
            margin: 0;
        }
        .ivu-btn {
            margin-top: 10px;
        }
    }
}
</style>
