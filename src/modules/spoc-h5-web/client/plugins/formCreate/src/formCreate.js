// import valid, {
//     errors,
//     sys,
//     sysDict,
//     crmQrcode,
//     crmCustomer
// } from '../../libs/request.js';
import $axios from '@client/service/httpServer'; // axios拦截器配置
const formCreateSetting = {
    data() {
        return {
            //实例对象
            fApi: {},
            //表单生成规则
            rule: [],
            formMap: {
                hidden: {
                    type: "hidden",
                    field: "id",
                    value: ""
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
                    validate: [],
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
            let tenant = localStorage.getItem('tenant');
            let token = localStorage.getItem('token');
            if (dictTypes.length) {
                let params = {
                    types: dictTypes,
                    tenant: tenant,
                };
                return $axios
                    .get('/api/common/a/ws/sys/dict/anno/batchListData', params, '', {
                        tenant,
                        token
                    })
                    .then(res => {
                        let dictTypeObj = res.data
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
                                if (obj.field == 'phoneList') {
                                    validate.pattern =
                                        /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
                                    validate.message = "请输入正确的手机号";
                                }
                                obj.validate.push(validate)
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

                    })
                    .catch(() => {
                        // this.loading = false;
                    });
            } else {
                list.forEach((v, k) => {
                    let obj = JSON.parse(JSON.stringify(Object.assign({}, this.formMap[v.jdbcType])));
                    obj.title = v.name;
                    obj.field = v.field;
                    obj.options = v.filterList&&v.filterList.length?v.filterList:(v.options||[]);
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
                        if (obj.field == 'phoneList') {
                            validate.pattern =
                                /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
                            validate.message = "请输入正确的手机号";
                        }
                        obj.validate.push(validate)
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
