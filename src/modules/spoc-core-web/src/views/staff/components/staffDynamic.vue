<style lang="less">
.staff-info-container {
    .form-line {
        width: 100%;
        height: 32px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0px;
        .form-line-is {
            height: 1px;
            background: rgba(0, 0, 0, 0.2);
        }
        .is1 {
            width: 24px;
        }
        .is2 {
            width: 641px;
        }
        .form-line-txt {
            display: block;
            width: 56px;
            font-size: 14px;
            color: #495060;
        }
    }
    .form-box {
        .form-row-line {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            min-height: 32px;
            .ivu-form-item {
                margin-bottom: 0px;
            }
            margin-bottom: 20px;
        }
        .form-row-lines1 {
            margin-bottom: 0;
        }
        .form-row-lines2 {
            margin-bottom: 24px;
        }
        .ivu-select-multiple {
            overflow: hidden;
            .ivu-select-selection {
                > div {
                    overflow: hidden;
                }
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .admin-ids {
            .ivu-select-selection {
                > div {
                    overflow: hidden;
                    width: 568px;
                    height: 62px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    .ivu-tag {
                        float: left;
                    }
                }
                height: 62px;
            }
        }
        .ivu-tag-text {
            display: inline-block;
        }
        .ivu-checkbox-wrapper {
            margin-right: 0;
        }
    }
    .ivu-modal-body {
        padding-top: 0;
        padding-bottom: 0;
    }
    .ivu-modal-footer {
        padding: 10px 24px 10px 18px;
    }
}
.form-row-line {
    .ivu-icon-ios-close:before {
        display: none;
    }
}
</style>

<template>
    <Modal class="staff-info-container" width="800" v-model="showModel" :title="titleName" :mask-closable="false" :loading="loading">
        <Form ref="form" :rules="ruleCustom" class="form-box" :model="form" label-position="right" :label-width="120">
            <div class="form-row-line" style="margin-top:24px;">
                <FormItem :label="$t('modules_rolemanage_167')" prop="name"><Input  style="width:256px;" v-model="form.name" /></FormItem>
                <FormItem :label="$t('views_staff_components_staffinfo_669')" prop="gender">
                    <RadioGroup style="width:256px;" v-model="form.gender">
                        <Radio  value="m" :label="$t('views_staff_components_staffinfo_670')"></Radio>
                        <Radio  style="margin-left:20px;" value="f" :label="$t('views_staff_components_staffinfo_671')"></Radio>
                    </RadioGroup>
                </FormItem>
            </div>
            <div class="form-row-line">
                <FormItem :label="$t('views_staff_components_staffinfo_678')" prop="officeId">
                    <Select  v-model="form.officeId" style="width:256px" @on-change="changeOffice(form.officeId)">
                        <Option v-for="item in form.officeIdList" style="width:256px" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="$t('memberlist_compontents_modify_241')" prop="enName"><Input  style="width:256px;" v-model="form.enName" /></FormItem>
            </div>
            <div class="form-row-line">
                <FormItem :label="$t('views_staff_components_staffinfo_674')" prop="mobile">
                    <Input  style="width:256px;" v-model="form.mobile" @on-keyup="setUsrName(form.mobile)" />
                </FormItem>
                <FormItem :label="$t('modules_rolemanage_169')" prop="email"><Input style="width:256px;" v-model="form.email" /></FormItem>
            </div>
            <div class="form-row-line">
                <FormItem :label="$t('views_staff_components_staffinfo_676')" prop="loginName"><Input  style="width:256px;" disabled v-model="form.loginName" /></FormItem>
                <FormItem :label="$t('views_staff_components_staffinfo_677')" prop="userTypeName">
                    <Select  v-model="form.userTypeName" style="width:256px">
                        <Option v-for="item in form.userTypeValueList" style="width:256px" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
            </div>
            <div class="form-row-line">
                <FormItem :label="$t('views_staff_components_staffinfo_668')" prop="no"><Input style="width:256px;" v-model="form.no" :disabled="!!staffId"/></FormItem>
                <FormItem :label="$t('views_staff_components_staffinfo_679')" prop="job">
                    <Select  v-model="form.job" style="width:256px" @on-change="chooseJob(form.job)">
                        <Option v-for="item in form.jobValueList" style="width:256px" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
            </div>
            <div class="form-row-line">
                <FormItem :label="$t('views_staff_components_staffinfo_680')" prop="departIds">
                    <Select  v-model="form.departIds" :placeholder="$t('views_staff_components_staffinfo_681')" multiple style="width:256px">
                        <Option v-for="item in form.departidsList" style="width:256px" :value="item.value" :key="item.value">   <!-- :disabled="item.value === form.officeId" -->
                            {{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem :label="$t('views_staff_components_staffinfo_682')" prop="roleIds" v-if="showModel">
                    <Select  v-model="form.roleIds" :placeholder="$t('views_staff_components_staffinfo_683')" multiple style="width:256px">
                        <Option v-for="item in form.roleIdsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
            </div>
            <div class="form-row-line">
                <FormItem :label="$t('views_staff_components_staffinfo_684')" prop="isService">
                    <RadioGroup style="width:256px;" v-model="form.isService">
                        <Radio disabled value="1" :label="$t('views_staff_components_staffinfo_685')"></Radio>
                        <Radio disabled style="margin-left:20px;" value="0" :label="$t('views_staff_components_staffinfo_686')"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem :label="$t('views_staff_components_staffinfo_687')" prop="crossIds">
                    <Select  v-model="form.crossIds" :placeholder="$t('views_staff_components_staffinfo_681')" multiple style="width:256px">
                        <Option v-for="item in form.crossIdsList" style="width:256px" :value="item.value" :key="item.value"><!--  :disabled="item.value === form.officeId" -->
                            {{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
            </div>
            <div class="form-row-line">
                <FormItem :label="$t('views_staff_components_staffinfo_688')" prop="entryDate">
                    <DatePicker
                        v-model="form.entryDate"
                        type="date"
                        :placeholder="$t('scoretemplate_compontents_scoremodify_528')"
                        style="width: 256px"
                    ></DatePicker>
                </FormItem>
                <FormItem :label="$t('views_staff_components_staffinfo_690')" prop="leaveDate">
                    <DatePicker
                        disabled
                        v-model="form.leaveDate"
                        type="date"
                        :placeholder="$t('scoretemplate_compontents_scoremodify_528')"
                        style="width: 256px"
                    ></DatePicker>
                </FormItem>
            </div>
            <div class="form-row-line" :class="showTeacher ? 'form-row-lines1' : 'form-row-lines2'">
                <div style="margin-left:48px;font-size:14px;font-weight:bold;cursor:pointer;" @click="changeShowSenior">
                    {{ $t('views_staff_components_staffinfo_691') }}
                    <Icon :type="showSenior ? 'ios-arrow-up' : 'ios-arrow-down'" />
                    <span style="margin-left:12px;color:#CCC;">{{ $t('views_staff_components_staffinfo_692') }}</span>
                </div>
            </div>
            <div v-show="showSenior" style="margin-top:24px;" class="form-row-line" :class="showTeacher ? 'form-row-lines1' : 'form-row-lines2'">
                <FormItem :label="$t('views_staff_components_staffinfo_693')" prop="adminIds">
                    <Select

                        class="admin-ids"
                        v-model="form.adminIds"
                        multiple
                        @on-change="changeXxqIdsList"
                        style="width:582px;height:62px;margin-right:8px;"
                    >
                        <Option v-for="item in form.xqIdsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Checkbox  v-model="form.selectAll" @on-change="xqIdsChangeAll">{{ $t('modules_rolepeople_212') }}</Checkbox>
                </FormItem>
            </div>
            <div v-if="showTeacher" class="form-line">
                <div class="form-line-is is1"></div>
                <div class="form-line-txt">{{ $t('views_staff_components_staffinfo_695') }}</div>
                <div class="form-line-is is2"></div>
            </div>
            <div v-if="showTeacher" class="form-row-line" style="margin-bottom:24px;">
                <FormItem :label="$t('views_staff_components_staffinfo_696')" prop="teacherType">
                    <Select  v-model="form.teacherType" style="width:256px;">
                        <Option v-for="item in form.teacherTypeValueList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="$t('views_staff_components_staffinfo_697')" prop="teachableDuration">
                    <Input  style="width:256px;" v-model="form.teachableDuration" >
                        <span slot="append">{{ $t('views_staff_components_staffinfo_698') }}</span>
                    </Input>
                </FormItem>
            </div>
            <form-create ref="fc" v-model="fApi" :rule="rule" :option="option"></form-create>
        </Form>
        <div slot="footer">
            <Button @click="asyncCancel">{{ $t('classroom_allscore_53') }}</Button>
            <Button type="primary" @click="asyncOK">{{ $t('classroom_allscore_54') }}</Button>
        </div>
    </Modal>
</template>

<script>
/**
 **@date: 2019/4/19 11:58
 **@author: lizhi
 **@filename: staffInfo.vue
 * 表格弹窗
 */
import valid, { errors, sysOffice, sysRole, sysUser, sysDict, SysProps } from '../../../libs/request';
import { mapMutations } from 'vuex';
export default {
    props: {
        treeOfficeId: {
            type: String,
        },
        titleName: {
            type: String,
            default: () => {
                return '';
            }
        },
        formStatus: {
            type: Number,
            default: () => {
                return 0;
            }
        }
    },
    data() {
        const validatePass1 = (rule, value, callback) => {
            let va = value.replace(/\s*/g, '');
            if (va === '') {
                callback(new Error('不能为空！'));
            } else {
                callback();
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value !== null && value !== undefined) {
                if (value === '') {
                    callback(new Error('不能为空！'));
                } else {
                    callback();
                }
            } else {
                callback(new Error('不能为空！'));
            }
        };

        const roleIdsPass = (rule, value, callback) => {
            console.log(value.length);
            if (value.length < 1) {
                callback(new Error('不能为空！'));
            } else {
                callback();
            }
        };
        const number = (rule, value, callback) => {
            let va = value.replace(/\s*/g, '');
            if (va === '') {
                callback(new Error('不能为空！'));
            // } else if (!/^((1[3-8][0-9])+\d{8})$/.test(value)) {
            } else if (!/^((1)+\d{10})$/.test(value)) {
                return callback(new Error('格式为11位手机号'));
            } else {
                callback();
            }
        };
        const teachableDurations = (rule, value, callback) => {
            if (value !== null && value !== undefined) {
                let va = value.toString().replace(/\s*/g, '');
                if (va === '') {
                    return callback(new Error(this.$t('pushsettings_index_504')));
                } else if (!/^([0-9]{1,10})(\.{0}[0-9]{0}|\.{1}[0-9]{0,1})$/.test(value)) {
                    callback(new Error(this.$t('views_staff_components_staffinfo_702')));
                } else {
                    callback();
                }
            } else {
                callback(new Error(this.$t('pushsettings_index_504')));
            }
        };
        const isServesPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('views_staff_components_staffinfo_703')));
            } else {
                callback();
            }
        };
        const jobValuePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('pushsettings_index_507')));
            } else {
                callback();
            }
        };
        return {
            isSaveUsering: false, // 防止重复提交
            //实例对象
            fApi: {},
            //表单生成规则
            rule: [],
            //组件参数配置
            option: {
                form: {
                    //是否开启行内表单模式
                    inline: false,
                    //表单域标签的位置，可选值为 left、right、top
                    labelPosition: 'right',
                    //表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值
                    // labelPosition为"top"时,需要手动设置 labelWidth 为 undefined
                    labelWidth: 120,
                    //是否显示校验错误信息
                    showMessage: true,
                    //原生的 autocomplete 属性，可选值为 off 或 on
                    autocomplete: 'off',
                    //所有带有 size 属性的组件的尺寸，默认为不设置，详见各组件默认的 size 值。可选值为 default、small 或 large。
                    size: undefined
                },
                row: {
                    //栅格间距，单位 px，左右平分
                    gutter: 0,
                    //布局模式，可选值为flex或不选，在现代浏览器下有效
                    type: undefined,
                    //flex 布局下的垂直对齐方式，可选值为top、middle、bottom
                    align: undefined,
                    //flex 布局下的水平排列方式，可选值为start、end、center、space-around、space-between
                    justify: undefined,
                    //自定义的class名称
                    className: undefined
                },
                submitBtn: {
                    //按钮类型，可选值为primary、ghost、dashed、text、info、success、warning、error或者不设置
                    type: 'primary',
                    //按钮大小，可选值为large、small、default或者不设置
                    size: 'large',
                    //按钮形状，可选值为circle或者不设置
                    shape: undefined,
                    //开启后，按钮的长度为 100%
                    long: true,
                    //设置button原生的type，可选值为button、submit、reset
                    htmlType: 'button',
                    //设置按钮为禁用状态
                    disabled: false,
                    //设置按钮的图标类型
                    icon: 'ios-upload',
                    //按钮文字提示
                    innerText: this.$t('modules_spoc_core_web_src_views_staff_components_staffdynamic_298'),
                    //设置按钮为加载中状态
                    loading: false,
                    //是否显示,默认显示
                    show: false,
                    //设置提交按钮布局规则,参考栅格布局规则
                    col: undefined
                },
                resetBtn: {
                    //配置说明同上
                    type: 'ghost',
                    size: 'large',
                    shape: undefined,
                    long: true,
                    htmlType: 'button',
                    disabled: false,
                    icon: 'refresh',
                    innerText: this.$t('modules_spoc_core_web_src_views_staff_components_staffdynamic_299'),
                    loading: false,
                    //默认不显示
                    show: false,
                    //设置重置按钮布局规则,参考栅格布局规则
                    col: undefined
                },
                info: {
                    //提示消息类型,poptip,tooltip
                    type: 'poptip'
                }
                //表单提交事件
                // onSubmit: function(formData) {
                //     alert(JSON.stringify(formData));
                // }
            },
            showSenior: true,
            marginBottom: 'margin-bottom:24px;',
            showModel: false,
            showTeacher: false,
            staffId: '',
            formState: '',
            loading: true,
            form: {
                no: '',
                gender: '',
                name: '',
                enName: '',
                loginName: '',
                userTypeName: '',
                userTypeValueList: [],
                officeId: '', //归属机构
                officeIdList: [],
                job: '',
                jobValueList: [],
                departIds: '', //可跨校区
                departidsList: [],
                roleIds: [], //角色管理
                roleIdsList: [],
                mobile: '',
                email: '',
                isService: '', //在职状态
                crossIds: [],
                crossIdsList: [], //可跨机构
                entryDate: '',
                leaveDate: '',
                adminIds: [], //管辖校区
                xqIdsList: [],
                teacherType: '',
                teacherTypeValueList: [],
                teachableDuration: '',
                selectAll: false
            },
            ruleCustom: {
                no: [{ required: true, validator: validatePass1, trigger: 'blur' }],
                name: [{ required: true, validator: validatePass1, trigger: 'blur' }],
                loginName: [{ required: true, message: this.$t('pushsettings_index_504') }],
                userTypeName: [{ required: true, validator: validatePass, trigger: 'change' }],
                officeId: [{ required: true, validator: validatePass, trigger: 'change' }],
                // job: [{ required: true, validator: jobValuePass, trigger: 'change' }],
                roleIds: [{ required: true, type: 'array', min: 1, message: this.$t('pushsettings_index_507'), trigger: 'change' }],
                mobile: [{ required: true, validator: number, trigger: 'blur' }],
                isService: [{ required: true, validator: isServesPass, trigger: 'change' }],
                entryDate: [{ required: true, validator: validatePass, trigger: 'blur' }],
                email: [{ type: 'email', message: this.$t('views_staff_components_staffinfo_705'), trigger: 'blur' }],
                teacherType: [{ required: true, validator: validatePass, trigger: 'change' }],
                // teachableDuration: [{ required: true, validator: teachableDurations, trigger: 'blur' }]
            },
            formMap: {
                hidden: {
                    type: 'hidden',
                    field: '',
                    value: '',
                    col: {
                        span: 12
                    }
                },
                input: {
                    type: 'input',
                    title: '',
                    field: '',
                    value: '',
                    props: {
                        type: 'text'
                    },
                    validate: [],
                    col: {
                        span: 12
                    }
                },
                textarea: {
                    type: 'input',
                    title: '',
                    field: '',
                    value: '',
                    props: {
                        type: 'textarea'
                    },
                    validate: [],
                    col: {
                        span: 12
                    }
                },
                InputNumber: {
                    type: 'InputNumber',
                    field: '',
                    title: '',
                    value: '',
                    props: {
                        precision: 2
                    },
                    col: {
                        span: 12
                    }
                },
                autoComplete: {
                    type: 'autoComplete',
                    field: '',
                    title: '',
                    value: '',
                    props: {
                        data: [],
                        clearable: true
                    },
                    col: {
                        span: 12
                    }
                },
                radio: {
                    type: 'radio',
                    title: '',
                    field: '',
                    value: '',
                    options: [
                        // {value:"0",label:"不包邮",disabled:false},
                    ],
                    col: {
                        span: 12
                    }
                },
                checkbox: {
                    type: 'checkbox',
                    title: '',
                    field: '',
                    value: [],
                    options: [
                        // {value:"1",label:"好用",disabled:true},
                    ],
                    col: {
                        span: 12
                    }
                },
                select: {
                    type: 'select',
                    field: '',
                    title: '',
                    value: [],
                    options: [
                        // {"value": "104", "label": "生态蔬菜", "disabled": false},
                    ],
                    props: {
                        multiple: true,
                        placeholder: this.$t('modules_spoc_core_web_src_views_staff_components_staffdynamic_300'),
                        'not-found-text': this.$t('modules_spoc_core_web_src_views_staff_components_staffdynamic_301'),
                        placement: 'bottom'
                    },
                    col: {
                        span: 12
                    }
                },
                switch: {
                    type: 'switch',
                    title: '',
                    field: '',
                    value: '1',
                    props: {
                        trueValue: '1',
                        falseValue: '0',
                        slot: {
                            open: '',
                            close: ''
                        }
                    },
                    col: {
                        span: 12
                    }
                },
                cascader: {
                    type: 'cascader',
                    title: '',
                    field: '',
                    value: [],
                    props: {
                        data: window.province || []
                    },
                    col: {
                        span: 12
                    }
                },
                DatePicker: {
                    type: 'DatePicker',
                    field: '',
                    title: '',
                    props: {
                        prop: '',
                        type: 'datetime',
                        transfer: true,
                        format: 'yyyy-MM-dd HH:mm:ss',
                        placeholder: this.$t('modules_spoc_core_web_src_views_staff_components_staffdynamic_302'),
                        size: 'default',
                        disabled: false,
                        clearable: true,
                        readonly: false,
                    },
                    col: {
                        span: 12
                    }
                },
                TimePicker: {
                    type: 'TimePicker',
                    field: '',
                    title: '',
                    props: {
                        type: 'time',
                        placeholder: this.$t('modules_spoc_core_web_src_views_staff_components_staffdynamic_303')
                    },
                    col: {
                        span: 12
                    }
                },
                ColorPicker: {
                    type: 'ColorPicker',
                    field: '',
                    title: '',
                    value: '',
                    col: {
                        span: 12
                    }
                },
                upload: {
                    type: 'upload',
                    field: '',
                    title: '',
                    props: {
                        // "type":"select",
                        // "uploadType":"image",
                        // "action": "/upload.php",
                        // "name":"pic",
                        // "multiple": true,
                        // "accept":"image\/*",
                        // "format":["jpg","jpeg","png","gif"],
                        // "maxSize":2048,
                        // "maxLength":5,
                        // "onSuccess":function (res, file) {
                        // }
                    },
                    col: {
                        span: 12
                    }
                },
                rate: {
                    type: 'rate',
                    field: '',
                    title: '',
                    value: 0,
                    props: {
                        count: 5,
                        allowHalf: false
                    },
                    validate: [
                        // {required:true,type:'number',min:3, message: '请大于3颗星',trigger:'change'}
                    ],
                    col: {
                        span: 12
                    }
                },
                slider: {
                    type: 'slider',
                    field: '',
                    title: '',
                    value: [0, 100],
                    props: {
                        min: 0,
                        max: 100,
                        range: true
                    },
                    col: {
                        span: 12
                    }
                },
                tree: {
                    type: 'tree',
                    title: '',
                    field: '',
                    value: [],
                    props: {
                        data: [],
                        type: 'checked',
                        multiple: false,
                        showCheckbox: true,
                        emptyText: this.$t('modules_spoc_core_web_src_views_staff_components_staffdynamic_304')
                    },
                    col: {
                        span: 12
                    }
                }
            }
        };
    },
    components: {},
    mounted() {
        this.getFormList();
    },
    methods: {
        getFormLayout() {
            let arr = [];
            let params = {
                tableName: 'sys_user'
            };
            SysProps.list(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if (this.formState == '') {
                            let list = res.data.data.filter(val => val.base == 1);
                            list.forEach((v, k) => {
                                let obj = Object.assign({}, this.formMap[v.jdbcType]);
                                obj.title = v.name;
                                obj.field = v.field;
                                if (v.required) {
                                    obj.validate = [{ required: true, message: this.$t('modules_spoc_core_web_src_views_staff_components_staffdynamic_305', [v.name]), trigger: 'change' }];
                                }
                                if (v.dictType) {
                                    let params1 = {
                                        type: v.dictType,
                                        menuId: v.menuId || 0
                                    };
                                    sysDict
                                        .DictListDataNew(params1)
                                        .then(valid.call(this))
                                        .then(res => {
                                            if (res.ok) {
                                                obj.options = res.data.data;
                                            }
                                        })
                                        .catch(errors.call(this))
                                        .finally(() => {
                                            // this.refs.fc.$f.append(obj);
                                            arr[k] = obj;
                                            if (k == list.length - 1) {
                                                this.rule = arr;
                                            }
                                        });
                                } else {
                                    arr[k] = obj;
                                    if (k == list.length - 1) {
                                        this.rule = arr;
                                    }
                                }
                            });
                        } else {
                            let list = res.data.data.filter(val => val.editable == 1);
                            list.forEach((v, k) => {
                                let obj = Object.assign({}, this.formMap[v.jdbcType]);
                                obj.title = v.name;
                                obj.field = v.field;
                                if (v.required) {
                                    obj.validate = [{ required: true, message: this.$t('modules_spoc_core_web_src_views_staff_components_staffdynamic_305', [v.name]), trigger: 'change' }];
                                }
                                if (v.dictType) {
                                    let params1 = {
                                        type: v.dictType,
                                        menuId: v.menuId || 0
                                    };
                                    sysDict
                                        .DictListDataNew(params1)
                                        .then(valid.call(this))
                                        .then(res => {
                                            if (res.ok) {
                                                obj.options = res.data.data;
                                            }
                                        })
                                        .catch(errors.call(this))
                                        .finally(() => {
                                            // this.refs.fc.$f.append(obj);
                                            arr[k] = obj;
                                            if (k == list.length - 1) {
                                                this.rule = arr;
                                            }
                                        });
                                } else {
                                    arr[k] = obj;
                                    if (k == list.length - 1) {
                                        this.rule = arr;
                                    }
                                }
                            });
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        changeShowSenior() {
            this.showSenior = !this.showSenior;
        },
        changeXxqIdsList(arr) {
            let sel = arr.length;
            let all = this.form.xqIdsList.length;
            this.form.selectAll = sel === all;
        },
        changeOffice(value) {
            let arr1 = [...this.form.departidsList];
            let arr2 = [...this.form.xqIdsList];
            let arr3 = [...this.form.crossIdsList];
            this.form.departidsList = [];
            this.form.xqIdsList = [];
            this.form.crossIdsList = [];
            // this.form.departIds = [value]; //兼职机构
            //this.form.adminIds = [value] //管辖校区  //屏蔽同步管辖校区
            // this.form.crossIds = [value]; //可跨校区
            this.form.departidsList = arr1;
            this.form.xqIdsList = arr2;
            this.form.crossIdsList = arr3;
            sysUser
                .generateUserNo({
                    officeId:value
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if(!this.staffId){
                            this.form.no = res.data.data
                        }
                    }
                })
                .catch(errors.call(this));
        },
        xqIdsChangeAll() {
            if (this.form.selectAll) {
                let arr = [];
                let arr1 = this.form.xqIdsList;
                for (let i in arr1) {
                    arr.push(arr1[i].value);
                }
                this.form.adminIds = arr;
                this.form.selectAll = false;
            } else {
                if (this.form.officeId) {
                    this.form.adminIds = [this.form.officeId];
                } else {
                    this.form.adminIds = [];
                }
                this.form.selectAll = true;
            }
        },
        getFormList() {
            sysDict
                .batchListData()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let sys_user_type = res.data.data.sys_user_type;
                        let sys_user_job = res.data.data.sys_user_job;
                        let sys_user_teacher_type = res.data.data.sys_user_teacher_type;
                        this.form.userTypeValueList = [];
                        for (let item in sys_user_type) {
                            let obj = {};
                            let obj1 = sys_user_type[item];
                            obj.value = obj1.value;
                            obj.label = obj1.label;
                            this.form.userTypeValueList.push(obj);
                        }
                        this.form.jobValueList = [];
                        for (let item in sys_user_job) {
                            let obj = {};
                            let obj1 = sys_user_job[item];
                            obj.value = obj1.value;
                            obj.label = obj1.label;
                            this.form.jobValueList.push(obj);
                        }
                        this.form.teacherTypeValueList = [];
                        for (let item in sys_user_teacher_type) {
                            let obj = {};
                            let obj1 = sys_user_teacher_type[item];
                            obj.value = obj1.value;
                            obj.label = obj1.label;
                            this.form.teacherTypeValueList.push(obj);
                        }
                    }
                })
                .catch(errors.call(this));

            this.officeListData()

            sysRole
                .myRoleList()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let data = res.data.data.roleList;
                        this.form.roleIdsList = [];
                        for (let item in data) {
                            let obj = {};
                            let obj1 = data[item];
                            obj.value = obj1.id;
                            obj.label = obj1.name;
                            this.form.roleIdsList.push(obj);
                        }
                    }
                })
                .catch(errors.call(this));
        },
        officeListData(){
            sysUser
                .dataScopeFilter()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let data = res.data.data;
                        this.form.officeIdList = []; //归属机构
                        this.form.departidsList = []; //兼职机构
                        this.form.xqIdsList = []; //管辖校区
                        this.form.crossIdsList = []; //可跨校区
                        for (let item in data) {
                            let obj = {};
                            let obj1 = data[item];
                            obj.value = obj1.id;
                            obj.label = obj1.name;
                            this.form.officeIdList.push(obj);
                            this.form.departidsList.push(obj);
                            this.form.xqIdsList.push(obj);
                            this.form.crossIdsList.push(obj);
                        }
                    }
                })
                .catch(errors.call(this));
        },
        setUsrName(data) {
            this.form.loginName = data;
        },
        chooseJob(job) {
            if (job === 'teacher') {
                this.showTeacher = false; //true;

            } else {
                this.showTeacher = false;
                this.form.teacherType = '';
                this.form.teachableDuration = '';
            }
        },
        setModel(row, type) {
            console.log(type)
            this.getFormLayout();
            this.showSenior = true;
            this.showModel = true;
            if (row) {
                if (row.id) {
                    if (type === 1) {
                        // 员工修改

                        this.handleReset('form');
                        this.form.roleIds = [];
                        this.formState = this.$t('views_staff_components_staffinfo_707');
                        this.reWriteStaff(row);
                        this.comSetModel(row);
                    }else if(type === 2) {
                        //教师修改
                        this.handleReset('form');
                        this.form.roleIds = [];
                        this.formState = this.$t('views_staff_components_staffinfo_706');
                        this.reTeacher(row);
                        this.comSetModel(row);
                    }
                }
            } else {
                //新建员工
                this.handleReset('form');
                this.form.roleIds = [];
                this.form.officeId = this.treeOfficeId
                this.changeOffice(this.treeOfficeId)
                this.showTeacher = false;
                this.formState = '';
                this.staffId = '';
                this.form.isService = this.$t('views_staff_components_staffinfo_685');
                this.form.userTypeName = this.form.userTypeValueList[0].value
            }
        },
        comSetModel(row) {
            //显示控制
            this.staffId = row.id;
            this.showTeacher = false; //this.form.job === 'teacher' ? true : false;
        },
        leaveStaff(row) {
            this.conmonStaff(row);
        },
        reTeacher(row) {
            this.conmonStaff(row);
        },
        reWriteStaff(row) {
            this.conmonStaff(row);
        },
        conmonStaff(item) {
            let params = {
                id: item.id
            };
            sysUser
                .formUser(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let row = res.data.data;
                        //公共函数
                        this.form.no = row.no;
                        this.form.gender =
                            row.gender === 'f' ? this.$t('views_staff_components_staffinfo_671') : row.gender === 'm' ? this.$t('views_staff_components_staffinfo_670') : '';
                        this.form.name = row.name;
                        this.form.enName = row.enName;
                        this.form.mobile = row.mobile;
                        this.form.email = row.email;
                        this.form.loginName = row.loginName;
                        this.form.userTypeName = row.userType;
                        this.form.officeId = row.officeId;
                        this.form.job = row.job;
                        this.form.departIds = row.departIds ? row.departIds.split(',') : '';
                        this.form.roleIds = row.roleId ? row.roleId.split(',') : '';
                        this.form.crossIds = row.crossIds ? row.crossIds.split(',') : '';
                        this.form.isService =
                            row.isService === '0' ? this.$t('views_staff_components_staffinfo_686') : row.isService === '1' ? this.$t('views_staff_components_staffinfo_685') : '';
                        this.form.entryDate = row.entryDate;
                        this.form.leaveDate = row.leaveDate;
                        this.form.adminIds = row.adminIds ? row.adminIds.split(',') : '';
                        this.form.teacherType = row.teacherType;
                        this.form.teachableDuration = row.teachableDuration;
                        let $f = this.fApi;
                        $f.setValue(row.fieldJsonData);
                        this.showTeacher = false; // this.form.job === 'teacher' ? true : false;//教师
                    }
                })
                .catch(errors.call(this));
        },
        asyncOK() {
            if (this.formState === this.$t('views_staff_components_staffinfo_686')) {
                this.handleSubmit('form', 'leave');
            } else if (this.formState === this.$t('views_staff_components_staffinfo_707')) {
                this.handleSubmit('form', 're');
            } else if (this.formState === this.$t('views_staff_components_staffinfo_706')) {
                this.handleSubmit('form', 'teacher');
            } else {
                this.handleSubmit('form', 'add');
            }
        },
        asyncCancel() {
            this.showModel = false;
            this.handleReset('form');
            this.form.roleIds = [];
        },
        handleSubmit(name, type) {
            this.form.job = this.form.job ? this.form.job : '';
            this.form.userTypeName = this.form.userTypeName ? this.form.userTypeName : '';
            this.form.officeId = this.form.officeId ? this.form.officeId : '';
            this.$refs[name].validate(valid1 => {
                if (valid1) {
                    let params = {};
                    params.id = this.staffId;
                    params.no = this.form.no;
                    params.gender =
                        this.form.gender === this.$t('views_staff_components_staffinfo_671')
                            ? 'f'
                            : this.form.gender === this.$t('views_staff_components_staffinfo_670')
                            ? 'm'
                            : '';
                    params.name = this.form.name;
                    params.enName = this.form.enName ? this.form.enName : '';
                    params.mobile = this.form.mobile;
                    params.email = this.form.email;
                    params.loginName = this.form.loginName;
                    params.userType = this.form.userTypeName;
                    params.officeId = this.form.officeId;
                    params.job = this.form.job;
                    params.departIds = this.form.departIds ? this.form.departIds.join(',') : '';
                    params.roleIds = this.form.roleIds ? this.form.roleIds.join(',') : '';
                    params.isService =
                        this.form.isService === this.$t('views_staff_components_staffinfo_685')
                            ? '1'
                            : this.form.isService === this.$t('views_staff_components_staffinfo_686')
                            ? '0'
                            : '';

                    if (this.form.entryDate !== null) {
                        params.entryDate = typeof this.form.entryDate == 'string' ? this.form.entryDate : this.form.entryDate.format('yyyy-MM-dd');
                    } else {
                        params.entryDate = '';
                    }
                    if (this.form.leaveDate !== null) {
                        params.leaveDate = typeof this.form.leaveDate == 'string' ? this.form.leaveDate : this.form.leaveDate.format('yyyy-MM-dd');
                    } else {
                        params.leaveDate = '';
                    }
                    params.adminIds = this.form.adminIds ? this.form.adminIds.join(',') : '';
                    params.crossIds = this.form.crossIds ? this.form.crossIds.join(',') : '';
                    params.teacherType = this.form.teacherType;
                    params.teachableDuration = this.form.teachableDuration ? this.form.teachableDuration : '';
                    let $f = this.fApi;
                    if (this.rule.length) {
                        $f.submit(
                            (formData, api) => {
                                //提交表单
                                params.fieldJsonData = formData;
                                if (type === 'add') {
                                    sysUser
                                        .saveUser(params)
                                        .then(valid.call(this))
                                        .then(res => {
                                            if (res.ok) {
                                                this.$Message.success({ content: this.$t('views_staff_components_staffinfo_708'), duration: 1 });
                                                this.showModel = false;
                                                //刷新列表
                                                this.$emit('refresh-table');
                                                this.handleReset('form');
                                                this.form.roleIds = [];
                                                this.loading = true;
                                            } else {
                                                this.loading = false;
                                            }
                                        })
                                        .catch(errors.call(this))
                                        .finally(() => {});
                                } else if (type === 're') {
                                    sysUser
                                        .saveUser(params)
                                        .then(valid.call(this))
                                        .then(res => {
                                            if (res.ok) {
                                                this.$Message.success({ content: this.$t('views_staff_components_staffinfo_709'), duration: 1 });
                                                this.showModel = false;
                                                //刷新列表
                                                this.$emit('refresh-table');
                                                //                                    this.handleReset('form')
                                                //                                    this.form.roleIds = [];
                                                this.loading = true;
                                            } else {
                                                this.loading = false;
                                            }
                                        })
                                        .catch(errors.call(this))
                                        .finally(() => {});
                                } else if (type === 'teacher') {
                                    sysUser
                                        .saveUser(params)
                                        .then(valid.call(this))
                                        .then(res => {
                                            if (res.ok) {
                                                this.$Message.success({ content: this.$t('views_staff_components_staffinfo_710'), duration: 1 });
                                                this.showModel = false;
                                                //刷新列表
                                                this.$emit('refresh-table');
                                                //                                    this.handleReset('form')
                                                //                                    this.form.roleIds = [];
                                                this.loading = true;
                                            } else {
                                                this.loading = false;
                                            }
                                        })
                                        .catch(errors.call(this))
                                        .finally(() => {});
                                } else {
                                    if (this.form.isService === this.$t('views_staff_components_staffinfo_686')) {
                                        if (params.entryDate && params.leaveDate) {
                                            var date1 = new Date(params.entryDate).getTime();
                                            var date2 = new Date(params.leaveDate).getTime();
                                            if (date2 >= date1) {
                                                sysUser
                                                    .updateIsService(params)
                                                    .then(valid.call(this))
                                                    .then(res => {
                                                        if (res.ok) {
                                                            this.$Message.success({ content: this.$t('views_staff_components_staffinfo_711'), duration: 1 });
                                                            this.showModel = false;
                                                            //刷新列表
                                                            this.$emit('refresh-table');
                                                            //                                                this.handleReset('form')
                                                            //                                                this.form.roleIds = [];
                                                            this.loading = true;
                                                        } else {
                                                            this.loading = false;
                                                        }
                                                    })
                                                    .catch(errors.call(this))
                                                    .finally(() => {});
                                            } else {
                                                this.loading = false;
                                                this.showModel = true;
                                                setTimeout(() => {
                                                    this.loading = true;
                                                }, 0);
                                                this.$Message.warning({ content: this.$t('views_staff_components_staffinfo_712'), duration: 1 });
                                            }
                                        } else {
                                            this.loading = false;
                                            this.showModel = true;
                                            setTimeout(() => {
                                                this.loading = true;
                                            }, 0);
                                            this.$Message.warning({ content: this.$t('views_staff_components_staffinfo_713'), duration: 1 });
                                        }
                                    } else {
                                        this.loading = false;
                                        this.showModel = true;
                                        setTimeout(() => {
                                            this.loading = true;
                                        }, 0);
                                        this.$Message.warning({ content: this.$t('views_staff_components_staffinfo_714'), duration: 1 });
                                    }
                                }
                            },
                            api => {
                                //验证未通过
                                console.log(this.$t('modules_spoc_core_web_src_views_staff_components_staffdynamic_306'));
                                this.loading = false;
                            }
                        );
                    } else {
                        //提交表单
                        params.fieldJsonData = {};
                        if (type === 'add') {
                            if(this.isSaveUsering){
                                return false;
                            }
                            this.isSaveUsering = true
                            sysUser
                                .saveUser(params)
                                .then(valid.call(this))
                                .then(res => {
                                    if (res.ok) {
                                        this.$Message.success({ content: this.$t('views_staff_components_staffinfo_708'), duration: 1 });
                                        this.showModel = false;
                                        //刷新列表
                                        this.$emit('refresh-table');
                                        this.handleReset('form');
                                        this.form.roleIds = [];
                                        this.loading = true;
                                    } else {
                                        this.loading = false;
                                    }
                                })
                                .catch(errors.call(this))
                                .finally(() => {
                                    setTimeout(() => {
                                        this.isSaveUsering = false
                                    }, 300);
                                });
                        } else if (type === 're') {
                            if(this.isSaveUsering){
                                return false;
                            }
                            this.isSaveUsering = true
                            sysUser
                                .saveUser(params)
                                .then(valid.call(this))
                                .then(res => {
                                    if (res.ok) {
                                        this.$Message.success({ content: this.$t('views_staff_components_staffinfo_709'), duration: 1 });
                                        this.showModel = false;
                                        //刷新列表
                                        this.$emit('refresh-table');
                                        //                                    this.handleReset('form')
                                        //                                    this.form.roleIds = [];
                                        this.loading = true;
                                    } else {
                                        this.loading = false;
                                    }
                                })
                                .catch(errors.call(this))
                                .finally(() => {
                                    setTimeout(() => {
                                        this.isSaveUsering = false
                                    }, 300);
                                });
                        } else if (type === 'teacher') {
                            if(this.isSaveUsering){
                                return false;
                            }
                            this.isSaveUsering = true
                            sysUser
                                .saveUser(params)
                                .then(valid.call(this))
                                .then(res => {
                                    if (res.ok) {
                                        this.$Message.success({ content: this.$t('views_staff_components_staffinfo_710'), duration: 1 });
                                        this.showModel = false;
                                        //刷新列表
                                        this.$emit('refresh-table');
                                        //                                    this.handleReset('form')
                                        //                                    this.form.roleIds = [];
                                        this.loading = true;
                                    } else {
                                        this.loading = false;
                                    }
                                })
                                .catch(errors.call(this))
                                .finally(() => {
                                    setTimeout(() => {
                                        this.isSaveUsering = false
                                    }, 300);
                                });
                        } else {
                            if (this.form.isService === this.$t('views_staff_components_staffinfo_686')) {
                                if (params.entryDate && params.leaveDate) {
                                    var date1 = new Date(params.entryDate).getTime();
                                    var date2 = new Date(params.leaveDate).getTime();
                                    if (date2 >= date1) {
                                        if(this.isSaveUsering){
                                            return false;
                                        }
                                        this.isSaveUsering = true
                                        sysUser
                                            .updateIsService(params)
                                            .then(valid.call(this))
                                            .then(res => {
                                                if (res.ok) {
                                                    this.$Message.success({ content: this.$t('views_staff_components_staffinfo_711'), duration: 1 });
                                                    this.showModel = false;
                                                    //刷新列表
                                                    this.$emit('refresh-table');
                                                    //                                                this.handleReset('form')
                                                    //                                                this.form.roleIds = [];
                                                    this.loading = true;
                                                } else {
                                                    this.loading = false;
                                                }
                                            })
                                            .catch(errors.call(this))
                                            .finally(() => {
                                                setTimeout(() => {
                                                    this.isSaveUsering = false
                                                }, 300);
                                            });
                                    } else {
                                        this.loading = false;
                                        this.showModel = true;
                                        setTimeout(() => {
                                            this.loading = true;
                                        }, 0);
                                        this.$Message.warning({ content: this.$t('views_staff_components_staffinfo_712'), duration: 1 });
                                    }
                                } else {
                                    this.loading = false;
                                    this.showModel = true;
                                    setTimeout(() => {
                                        this.loading = true;
                                    }, 0);
                                    this.$Message.warning({ content: this.$t('views_staff_components_staffinfo_713'), duration: 1 });
                                }
                            } else {
                                this.loading = false;
                                this.showModel = true;
                                setTimeout(() => {
                                    this.loading = true;
                                }, 0);
                                this.$Message.warning({ content: this.$t('views_staff_components_staffinfo_714'), duration: 1 });
                            }
                        }
                    }
                } else {
                    this.loading = false;
                    this.showModel = true;
                    // setTimeout(() => {
                    // this.loading = true;
                    // }, 0);
                    // this.$Message.error( {content:'操作失败！',duration:1});
                    // return false;
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
            let $f = this.fApi;
            $f.resetFields();
        }
    }
};
</script>
