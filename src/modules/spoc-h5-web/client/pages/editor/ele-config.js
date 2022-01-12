import $config from '@/config'

export default [{
        title: '基础组件',
        components: [{
                elName: 'qk-text',
                title: '文字',
                icon: 'iconfont iconwenben',
                // 每个组件设置props来展示哪些显示哪些编辑项
                valueType: '', // 标识数据类型，用于表单组件
                defaultStyle: {
                    height: 40
                }
            },
            {
                elName: 'qk-image',
                title: '图片',
                icon: 'iconfont icontupian',
                valueType: '', // 标识数据类型，用于表单组件,
                defaultStyle: {
                    height: 200
                }
            },
            {
                elName: 'qk-button',
                title: '按钮',
                icon: 'iconfont iconanniuzu',
                // 每个组件设置props来展示哪些显示哪些编辑项
                valueType: '', // 标识数据类型，用于表单组件
                defaultStyle: {
                    width: 140,
                    height: 40,
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderColor: "#999999",
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderRadius: 4
                }
            },
            {
                elName: 'qk-link',
                title: '链接',
                icon: 'iconfont iconiconset0335',
                // 每个组件设置props来展示哪些显示哪些编辑项
                valueType: '', // 标识数据类型，用于表单组件
                defaultStyle: {
                    height: 40,
                }
            },
            {
                elName: 'qk-rectangle-border',
                title: '矩形边框',
                icon: 'iconfont iconjuxing',
                valueType: '',
                defaultStyle: {
                    width: 120,
                    height: 100,
                    borderColor: "#999999",
                    borderStyle: 'solid',
                    borderWidth: 2
                }
            },
            {
                elName: 'qk-rectangle-border',
                title: '分割线',
                icon: 'iconfont icon758bianjiqi_fengexian',
                valueType: '',
                defaultStyle: {
                    height: 1,
                    width: 300,
                    backgroundColor: '#999999'
                }
            },
            {
                elName: 'qk-image-carousel',
                title: '图片轮播',
                icon: 'iconfont iconshouyelunbotu',
                valueType: '', // 标识数据类型，用于表单组件,
                defaultStyle: {
                    height: 210
                }
            },
            {
                elName: 'qk-iframe',
                title: '内嵌iframe',
                icon: 'iconfont iconiframetianjia',
                valueType: '',
                defaultStyle: {
                    width: $config.canvasH5Width,
                    height: 300,
                    paddingTop: 10,
                    paddingBottom: 10
                }
            }
        ]
    },
    {
        title: '表单组件',
        components: [{
            elName: 'qk-form-create',
            title: '表单域',
            icon: 'iconfont iconwenbenkuang',
            isForm: true,
            defaultStyle: {
                height: 300,
                borderColor: "#999999",
                borderStyle: 'dashed',
                borderWidth: 1,
                borderRadius: 4
            }
        }, ]
    },
    {
        title: '功能组件',
        components: [{
                elName: 'qk-bg-music',
                title: '音乐',
                icon: 'iconfont iconyinlemusic217',
                valueType: '',
                defaultStyle: {
                    height: 52,
                    width: 52,
                }
            },
            {
                elName: 'qk-video',
                title: '视频',
                icon: 'iconfont iconyinlemusic217',
                valueType: '',
                defaultStyle: {
                    width: $config.canvasH5Width,
                    height: 300,
                    backgroundColor: '#999999'
                }
            },
        ]
    },
    {
        title: '图表组件',
        components: [{
            elName: 'qk-ve-line',
            title: '折线图',
            icon: 'el-icon-data-line',
            valueType: '',
            defaultStyle: {
                width: 375,
                height: 400,
            }
        }, {
            elName: 'qk-ve-histogram',
            title: '柱状图',
            icon: 'el-icon-data-analysis',
            valueType: '',
            defaultStyle: {
                width: 375,
                height: 400,
            }
        },{
            elName: 'qk-ve-bar',
            title: '条形图',
            icon: 'el-icon-notebook-2',
            valueType: '',
            defaultStyle: {
                width: 375,
                height: 400,
            }
        },{
            elName: 'qk-ve-pie',
            title: '饼图',
            icon: 'el-icon-pie-chart',
            valueType: '',
            defaultStyle: {
                width: 375,
                height: 400,
            }
        },{
            elName: 'qk-ve-ring',
            title: '饼图',
            icon: 'el-icon-help',
            valueType: '',
            defaultStyle: {
                width: 375,
                height: 400,
            }
        },{
            elName: 'qk-ve-waterfall',
            title: '瀑布图',
            icon: 'el-icon-s-data',
            valueType: '',
            defaultStyle: {
                width: 375,
                height: 400,
            }
        },{
            elName: 'qk-ve-funnel',
            title: '漏斗图',
            icon: 'el-icon-coin',
            valueType: '',
            defaultStyle: {
                width: 375,
                height: 400,
            }
        },{
            elName: 'qk-ve-radar',
            title: '雷达图',
            icon: 'el-icon-bangzhu',
            valueType: '',
            defaultStyle: {
                width: 375,
                height: 400,
            }
        },{
            elName: 'qk-ve-heatmap',
            title: '热力图',
            icon: 'el-icon-map-location',
            valueType: '',
            defaultStyle: {
                width: 375,
                height: 400,
            }
        },{
            elName: 'qk-ve-scatter',
            title: '散点图',
            icon: 'el-icon-share',
            valueType: '',
            defaultStyle: {
                width: 375,
                height: 400,
            }
        }, ]
    },
    {
        title: '业务组件',
        components: []
    }
]
