const formMaps = {
    data() {
        return {
            formMap: [{
                    name: 'Input<br>输入框',
                    icon: 'ios-create-outline',
                    type: 'input',
                    title: '输入框',
                    field: '',
                    value: '',
                    props: {
                        prop: '',
                        type: 'text',
                        readonly: false,
                        disabled: false,
                        clearable: true,
                        placeholder: '',
                        size: 'default',
                        typeList:[],
                        password:false,
                        maxlength:255,
                        showWordLimit:false
                    },
                    validate: [],
                    col: {
                        span: ''
                    },
                    on: {

                    }
                },
                {
                    name: 'Textarea<br>文本域',
                    icon: 'ios-code-working',
                    type: 'input',
                    title: '文本域',
                    field: '',
                    value: '',
                    props: {
                        prop: '',
                        type: 'textarea',
                        rows: 2,
                        showWordLimit: false,
                        maxlength: 255,
                        readonly: false,
                        disabled: false,
                        clearable: true,
                        placeholder: '',
                        size: 'default'
                    },
                    validate: [],
                    col: {
                        span: ''
                    }
                },
                {
                    name: 'InputNumber<br>数字输入框',
                    icon: 'ios-calculator-outline',
                    type: 'InputNumber',
                    title: '数字输入框',
                    field: '',
                    value: 0.00,
                    props: {
                        prop: '',
                        max: Number(Infinity),
                        min: Number(-Infinity),
                        step: 1,
                        size: 'default',
                        readonly: false,
                        disabled: false,
                        editable: true,
                        placeholder: '',
                        precision: 2
                    },
                    validate: [],
                    col: {
                        span: ''
                    }
                },
                {
                    name: 'Radio<br>单选框',
                    icon: 'ios-radio-button-on',
                    type: 'radio',
                    title: '单选框',
                    field: '',
                    value: '',
                    props: {
                        prop: '',
                        size: 'default',
                        vertical: false
                    },
                    options: [{
                        value: "key1",
                        label: "选项1",
                        disabled: false
                    }, ],
                    validate: [],
                    col: {
                        span: ''
                    }
                },
                {
                    name: 'Checkbox<br>多选框',
                    icon: 'ios-checkbox-outline',
                    type: 'checkbox',
                    title: '多选框',
                    field: '',
                    value: [],
                    props: {
                        prop: '',
                        size: 'default',
                        vertical: false
                    },
                    options: [{
                        value: "key1",
                        label: "选项1",
                        disabled: false
                    }, ],
                    validate: [],
                    col: {
                        span: ''
                    }
                },
                {
                    name: 'Select<br>选择器',
                    icon: 'ios-arrow-down',
                    type: 'select',
                    title: '选择器',
                    field: '',
                    value: '',
                    props: {
                        prop: '',
                        transfer: true,
                        multiple: false,
                        disabled: false,
                        clearable: true,
                        filterable: false,
                        size: 'default',
                        placeholder: '请选择',
                        maxTagCount: null,
                    },
                    options: [{
                        value: "key1",
                        label: "选项1",
                        disabled: false
                    }, ],
                    validate: [],
                    col: {
                        span: ''
                    }
                },
                {
                    name: 'Switch<br>开关',
                    icon: 'ios-switch-outline',
                    type: 'switch',
                    title: '开关',
                    field: '',
                    value: false,
                    props: {
                        prop: '',
                        size: 'default',
                        disabled: false,
                        trueValue: true,
                        falseValue: false,
                        slot: {
                            open: '',
                            close: ''
                        }
                    },
                    validate: [],
                    col: {
                        span: ''
                    }
                },
                {
                    name: 'Cascader<br>级联选择',
                    icon: 'ios-more-outline',
                    type: 'cascader',
                    title: '级联选择',
                    field: '',
                    value: [],
                    props: {
                        prop: '',
                        data: [],
                        disabled: false,
                        clearable: true,
                        placeholder: '',
                        trigger: 'click',
                        size: 'default',
                        filterable: false,
                        transfer: true,
                    },
                    validate: [],
                    col: {
                        span: ''
                    }
                },
                {
                    name: 'DatePicker<br>日期选择器',
                    icon: 'ios-calendar-outline',
                    type: 'DatePicker',
                    title: '日期选择器',
                    field: '',
                    value: '',
                    props: {
                        prop: '',
                        type: 'datetime',
                        transfer: true,
                        format: 'yyyy-MM-dd HH:mm:ss',
                        placeholder: '请选择日期',
                        size: 'default',
                        disabled: false,
                        clearable: true,
                        readonly: false,
                    },
                    validate: [],
                    col: {
                        span: ''
                    }
                },
                {
                    name: 'TimePicker<br>时间选择器',
                    icon: 'ios-time-outline',
                    type: 'TimePicker',
                    title: '时间选择器',
                    field: '',
                    value: '',
                    props: {
                        prop: '',
                        type: 'time',
                        transfer: true,
                        placeholder: '时间选择器',
                        size: 'default',
                        disabled: false,
                        clearable: true,
                        readonly: false,
                    },
                    validate: [],
                    col: {
                        span: ''
                    }
                },
                {
                    name: 'ColorPicker<br>颜色选择器',
                    icon: 'ios-color-palette-outline',
                    type: 'ColorPicker',
                    title: '颜色选择器',
                    field: '',
                    value: '',
                    props: {
                        prop: '',
                        disabled: false,
                        alpha: true,
                        hue: true,
                        recommend: true,
                        transfer: true,
                        size: 'default',
                    },
                    validate: [],
                    col: {
                        span: ''
                    }
                },
                {
                    name: 'AddressMap<br>地址选择器',
                    icon: 'ios-map-outline',
                    type: 'AddressMap',
                    title: '地址选择器',
                    field: '',
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
                        span: ''
                    }
                },
                {
                    name: 'Rate<br>评分',
                    icon: 'ios-star-outline',
                    type: 'rate',
                    title: '评分',
                    field: '',
                    value: 0,
                    props: {
                        prop: '',
                        count: 5,
                        allowHalf: true,
                        disabled: false,
                        clearable: false,
                        showText:true
                    },
                    validate: [
                        // {required:true,type:'number',min:3, message: '请大于3颗星',trigger:'change'}
                    ],
                    col: {
                        span: ''
                    }
                },
                {
                    name: 'Slider<br>滑块',
                    icon: 'md-remove',
                    type: 'slider',
                    title: '滑块',
                    field: '',
                    value: [0, 100],
                    props: {
                        prop: '',
                        min: 0,
                        max: 100,
                        step: 1,
                        disabled: false,
                        range: false,
                        showInput:false,
                    },
                    validate: [],
                    col: {
                        span: ''
                    }
                },
            ]
        }
    }
}

export default formMaps;
