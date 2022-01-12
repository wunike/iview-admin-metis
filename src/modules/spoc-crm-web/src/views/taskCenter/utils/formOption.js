const option = {
    data() {
        return {
            formOptions: {
                global: {
                    //设置所有组件
                    // '*': {
                    //     col: {
                    //         span: 12
                    //     },
                    // },
                },
                form: {
                    //是否开启行内表单模式
                    inline: true,
                    //表单域标签的位置，可选值为 left、right、top
                    labelPosition: 'right',
                    //表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值
                    // labelPosition为"top"时,需要手动设置 labelWidth 为 undefined
                    labelWidth: 1,
                    //是否显示校验错误信息
                    showMessage: true,
                    labelColon: true,
                    //原生的 autocomplete 属性，可选值为 off 或 on
                    autocomplete: 'off',
                    //所有带有 size 属性的组件的尺寸，默认为不设置，详见各组件默认的 size 值。可选值为 default、small 或 large。
                    size: undefined,
                    model: this.model || ''
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
            }
        }
    }
}

export default option;
