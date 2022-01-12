import valid, {
    errors,
    sys,
    sysDict,
    crmQrcode,
    crmCustomer
} from '../../libs/request.js';
const formCreateSetting = {
    data() {
        return {
            oldPhone: '',
            isSetted: false,
            //实例对象
            fApi: {},
            //表单生成规则
            rule: [],
            //组件参数配置
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
                //设置 inputNumber 组件
                // 'inputNumber': {
                //     props: {
                //         disabled: true,
                //         precision: 2
                //     }
                // }
                // }
                form: {
                    //是否开启行内表单模式
                    inline: false,
                    //表单域标签的位置，可选值为 left、right、top
                    labelPosition: 'top',
                    //表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值
                    // labelPosition为"top"时,需要手动设置 labelWidth 为 undefined
                    labelWidth: undefined,
                    //是否显示校验错误信息
                    showMessage: true,
                    //原生的 autocomplete 属性，可选值为 off 或 on
                    autocomplete: 'off',
                    //所有带有 size 属性的组件的尺寸，默认为不设置，详见各组件默认的 size 值。可选值为 default、small 或 large。
                    size: undefined,
                    model: this.model
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
                    disabled: (this.$route.query.isRedisGet&&this.$route.query.isRedisGet==1),
                    //设置按钮的图标类型
                    icon: 'ios-upload',
                    //按钮文字提示
                    innerText: '提交',
                    //设置按钮为加载中状态
                    loading: false,
                    //是否显示,默认显示
                    show: true,
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
                    innerText: '重置',
                    loading: false,
                    //默认不显示
                    show: false,
                    //设置重置按钮布局规则,参考栅格布局规则
                    col: undefined
                },
                info: {
                    //提示消息类型,poptip,tooltip
                    type: 'poptip'
                },

                mounted: ($f) => {
                    // TODO
                    // TODO 表单创建成功,可在此操作表单
                    console.log(this.fApi.rule);

                },
                // 表单提交事件
                onSubmit: (formData) => {
                    if(!(this.$route.query.isRedisGet&&this.$route.query.isRedisGet==1)){
                        this.onSubmit(formData);
                    }
                },
                // onReload: function($f) {
                //TODO
                // }
            },
            formMap: {
                hidden: {
                    type: 'hidden',
                    field: '',
                    value: '',
                    col: {
                        span: 24
                    }
                },
                input: {
                    type: 'input',
                    title: '',
                    field: '',
                    value: '',
                    props: {
                        prop: '',
                        type: 'text'
                    },
                    validate: [],
                    col: {
                        span: 24
                    },
                    on: {

                    }
                },
                textarea: {
                    type: 'input',
                    title: '',
                    field: '',
                    value: '',
                    props: {
                        prop: '',
                        type: 'textarea',
                        rows: 4,
                        autosize:{minRows: 3,maxRows: 5}
                    },
                    validate: [],
                    col: {
                        span: 24
                    }
                },
                InputNumber: {
                    type: 'InputNumber',
                    field: '',
                    title: '',
                    value: '',
                    props: {
                        prop: '',
                        precision: 2
                    },
                    col: {
                        span: 24
                    }
                },
                autoComplete: {
                    type: 'autoComplete',
                    field: '',
                    title: '',
                    value: '',
                    props: {
                        prop: '',
                        data: [],
                        clearable: true
                    },
                    col: {
                        span: 24
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
                    props: {},
                    col: {
                        span: 24
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
                    props: {},
                    col: {
                        span: 24
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
                        prop: '',
                        transfer: true,
                        multiple: false,
                        placeholder: '请选择',
                        'not-found-text': '无匹配数据',
                        placement: 'bottom'
                    },
                    col: {
                        span: 24
                    }
                },
                switch: {
                    type: 'switch',
                    title: '',
                    field: '',
                    value: '1',
                    props: {
                        prop: '',
                        trueValue: '1',
                        falseValue: '0',
                        slot: {
                            open: '',
                            close: ''
                        }
                    },
                    col: {
                        span: 24
                    }
                },
                cascader: {
                    type: 'cascader',
                    title: '',
                    field: '',
                    value: [],
                    props: {
                        prop: '',
                        data: window.province || []
                    },
                    col: {
                        span: 24
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
                        placeholder: '请选择日期',
                        clearable: true,
                    },
                    col: {
                        span: 24
                    }
                },
                AddressMap: {
                    type: 'AddressMap',
                    field: '',
                    title: '',
                    value: {
                        address: '',
                        latLongAddress: ''
                    },
                    props: {
                        prop: '',
                        disabled: false,
                        placeholder: ''
                    },
                    col: {
                        span: 24
                    }
                },
                TimePicker: {
                    type: 'TimePicker',
                    field: '',
                    title: '',
                    props: {
                        prop: '',
                        type: 'time',
                        transfer: true,
                        placeholder: '请选择时间'
                    },
                    col: {
                        span: 24
                    }
                },
                ColorPicker: {
                    type: 'ColorPicker',
                    field: '',
                    title: '',
                    value: '',
                    props: {},
                    col: {
                        span: 24
                    }
                },
                upload: {
                    type: 'upload',
                    field: '',
                    title: '',
                    props: {
                        // prop:'',
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
                        span: 24
                    }
                },
                rate: {
                    type: 'rate',
                    field: '',
                    title: '',
                    value: 0,
                    props: {
                        prop: '',
                        count: 5,
                        allowHalf: false
                    },
                    validate: [
                        // {required:true,type:'number',min:3, message: '请大于3颗星',trigger:'change'}
                    ],
                    col: {
                        span: 24
                    }
                },
                slider: {
                    type: 'slider',
                    field: '',
                    title: '',
                    value: [0, 100],
                    props: {
                        prop: '',
                        min: 0,
                        max: 100,
                        range: true
                    },
                    col: {
                        span: 24
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
                        emptyText: '暂无数据',
                        prop: ''
                    },
                    col: {
                        span: 24
                    }
                }
            }
        };
    },
    methods: {
        setFormAttr(list) {
            let $f = this.fApi;
            let arr = [];
            let num = list.filter(v => !!v.filtersKey).length;
            let index = 0;
            let dictTypes = list.filter(v => !!v.filtersKey).map(v => v.filtersKey).join(',');
            if (dictTypes.length) {
                let params1 = {
                    types: dictTypes,
                    tenant: this.$route.query.tenant,
                };
                sysDict
                    .batchListData(params1)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            let dictTypeObj = res.data.data
                            list.forEach((v, k) => {
                                let obj = JSON.parse(JSON.stringify(Object.assign({}, this.formMap[v.jdbcType])));
                                obj.title = v.name;
                                obj.field = v.field;
                                obj.options = v.filtersKey ? dictTypeObj[v.filtersKey] : (v.filterList&&v.filterList.length?v.filterList:(v.options||[]));
                                obj.validate = [];
                                obj.props.multiple = !!v.filterMultiple;

                                if (obj.field === 'visibleOffice') {
                                    obj.props.multiple = false;
                                }
                                if (v.required == '1') {
                                    let validate = {
                                        required: true,
                                        message: `请输入${v.name}`,
                                        type: (v.jdbcType == 'DatePicker') ? 'date' : 'string',
                                        trigger: (v.jdbcType == 'input') ? 'blur' : 'change'
                                    }
                                    if (obj.props && obj.props.multiple == true) {
                                        validate.type = 'array';
                                    }
                                    obj.validate.push(validate)
                                }
                                if (v.field === 'phoneList') {
                                    console.log(v.field, 'phoneList', v.field == 'phoneList')
                                    obj.on = {};
                                    obj.on['on-change'] = () => {
                                        this.phoneInfo();
                                    };
                                    obj.validate.push({
                                        pattern: /^\d+$/,
                                        message: "手机号格式错误",
                                        trigger: 'change'
                                    })
                                    obj.validate.push({
                                         asyncValidator: (rule, val, d) => {
                                            let params = {
                                                phone: val,
                                                tenant: this.$route.query.tenant,
                                            }
                                            crmCustomer
                                                .getCustomerByPhone(params)
                                                .then(valid.call(this))
                                                .then(res => {
                                                    if (res.ok) {
                                                        let list = res.data.data;
                                                        if (list.length) {
                                                            // d(true)
                                                            d(true);
                                                            if (this.oldPhone == val) {

                                                            } else {
                                                                // this.$Message.info('当前手机号已存在')
                                                                this.oldPhone = val;
                                                            }
                                                        } else {
                                                            d()
                                                        }
                                                    }
                                                })
                                                .catch(errors.call(this))
                                                .finally(() => {});
                                        },
                                        message: "手机号已存在",
                                        trigger: 'blur'
                                    })
                                }
                                if (v.filtersKey) {
                                    index = index + 1;
                                    console.log(index, num)
                                    arr[k] = obj;
                                    if (k == list.length - 1) {
                                        this.rule = arr;
                                    }
                                } else {
                                    arr[k] = obj;
                                    if (k == list.length - 1) {
                                        this.rule = arr;
                                    }
                                }
                            });
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
            } else {
                list.forEach((v, k) => {
                    let obj = JSON.parse(JSON.stringify(Object.assign({}, this.formMap[v.jdbcType])));
                    obj.title = v.name;
                    obj.field = v.field;
                    obj.options = v.filterList&&v.filterList.length?v.filterList:(v.options||[]);
                    obj.validate = [];
                    obj.props.multiple = !!v.filterMultiple;
                    if (obj.field === 'visibleOffice') {
                        obj.options = v.options;
                        obj.props.multiple = false;
                    }
                    if (v.required == '1') {
                        let validate = {
                            required: true,
                            message: `请输入${v.name}`,
                            type: (v.jdbcType == 'DatePicker') ? 'date' : 'string',
                            trigger: (v.jdbcType == 'input') ? 'blur' : 'change'
                        }
                        if (obj.props && obj.props.multiple == true) {
                            validate.type = 'array';
                        }
                        obj.validate.push(validate)
                    }
                    if (v.field === 'phoneList') {
                        console.log(v.field, 'phoneList', v.field == 'phoneList')
                        obj.on = {};
                        obj.on['on-change'] = () => {
                            this.phoneInfo();
                        };
                        obj.validate.push({
                            pattern: /^\d+$/,
                            message: "手机号格式错误",
                            trigger: 'change'
                        })
                        obj.validate.push({
                            validator: (rule, val, d) => {
                                let params = {
                                    phone: val,
                                    tenant: this.$route.query.tenant,
                                }
                                crmCustomer
                                    .getCustomerByPhone(params)
                                    .then(valid.call(this))
                                    .then(res => {
                                        if (res.ok) {
                                            let list = res.data.data;
                                            if (list.length) {
                                                // d(true)
                                                d();
                                                if (this.oldPhone == val) {

                                                } else {
                                                    // this.$Message.info('当前手机号已存在')
                                                    this.oldPhone = val;
                                                }
                                            } else {
                                                d()
                                            }
                                        }
                                    })
                                    .catch(errors.call(this))
                                    .finally(() => {});
                            },
                            message: "手机号已存在",
                            trigger: 'blur'
                        })
                    }
                    arr[k] = obj;
                    if (k == list.length - 1) {
                        this.rule = arr;
                    }
                });
            }

        },
    },
}
export default formCreateSetting;
