export default {
    data(){
        return {
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
                textarea:{
                    type: 'input',
                    title: '',
                    field: '',
                    value: '',
                    props: {
                        type: 'textarea'
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
                        placeholder: '请选择',
                        'not-found-text': '无匹配数据',
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
                        type: 'time',
                        placeholder: '请选择时间'
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
                        emptyText: '暂无数据'
                    },
                    col: {
                        span: 12
                    }
                }
            }
        }
    }
}