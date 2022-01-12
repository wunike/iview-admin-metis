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
                //             span: 12
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
                    labelPosition: 'right',
                    //表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值
                    // labelPosition为"top"时,需要手动设置 labelWidth 为 undefined
                    labelWidth: 84,
                    //是否显示校验错误信息
                    showMessage: false,
                    labelColon: true,
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
                    type: 'flex',
                    //flex 布局下的垂直对齐方式，可选值为top、middle、bottom
                    align: 'top',
                    //flex 布局下的水平排列方式，可选值为start、end、center、space-around、space-between
                    justify: 'start',
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
                    innerText: '提交',
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
                // onSubmit: (formData) => {
                //     this.onSubmit(formData);
                // },
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
                        span: 12
                    }
                },
                input: {
                    type: 'input',
                    title: '',
                    field: '',
                    value: '',
                    props: {
                        prop: '',
                        type: 'text',
                        clearable: true,
                    },
                    validate: [],
                    col: {
                        span: 12
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
                        clearable: true,
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
                        prop: '',
                        precision: 2,
                        clearable: true,
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
                        prop: '',
                        data: [],
                        clearable: true,
                        clearable: true,
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
                    props: {
                        prop: '',
                        disabled: false,
                        placeholder: ''
                    },
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
                    props: {
                        prop: '',
                        disabled: false,
                        placeholder: ''
                    },
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
                        prop: '',
                        transfer: true,
                        // multiple: false,
                        placeholder: '请选择',
                        'not-found-text': '无匹配数据',
                        placement: 'bottom',
                        clearable: true,
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
                        prop: '',
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
                        prop: '',
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
                        type: 'date',
                        transfer: true,
                        format: 'yyyy-MM-dd HH:mm:ss',
                        placeholder: '请选择日期',
                        clearable: true,
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
                        prop: '',
                        type: 'time',
                        transfer: true,
                        placeholder: '',
                        clearable: true,
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
                    props: {
                        prop: '',
                        disabled: false,
                        placeholder: ''
                    },
                    col: {
                        span: 12
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
                        span: 12
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
                        span: 12
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
                        span: 12
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
                        emptyText: '暂无数据',
                        prop: ''
                    },
                    col: {
                        span: 12
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
            let params1 = {
                types: dictTypes
            };
            if (dictTypes.length) {
                let params1 = {
                    types: dictTypes
                };
                sysDict
                    .batchListData(params1)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            let dictTypeObj = res.data.data
                            list.forEach((v, k) => {
                                let obj = null;
                                if (v.jdbcType == 'AddressMap') {
                                    obj = Object.assign({}, this.formMap.input);
                                } else if (v.jdbcType == 'uploadTemplate') {
                                    obj = Object.assign({}, this.formMap.upload);
                                } else {
                                    obj = Object.assign({}, this.formMap[v.jdbcType]);
                                }
                                obj.title = v.name + '：';
                                obj.props.placeholder = v.name;
                                obj.field = v.field;
                                if (obj.options) {
                                    obj.options = v.filtersKey ? dictTypeObj[v.filtersKey] : (v.filterList ||
                                        []);
                                }
                                obj.validate = [];
                                obj.col = {
                                    span: 24
                                };
                                if (obj.props.multiple) {
                                    obj.props.multiple = !!v.filterMultiple;
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
                    let obj = null;
                    if (v.jdbcType == 'AddressMap') {
                        obj = Object.assign({}, this.formMap.input);
                    } else if (v.jdbcType == 'uploadTemplate') {
                        obj = Object.assign({}, this.formMap.upload);
                    } else {
                        obj = Object.assign({}, this.formMap[v.jdbcType]);
                    }
                    obj.title = v.name+'：';
                    obj.props.placeholder = v.name;
                    obj.field = v.field;
                    if (obj.options) {
                        obj.options = v.filterList || [];
                    }
                    obj.validate = [];
                    obj.col = {
                        span: 24
                    };
                    if (obj.props.multiple) {
                        obj.props.multiple = !!v.filterMultiple;
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
