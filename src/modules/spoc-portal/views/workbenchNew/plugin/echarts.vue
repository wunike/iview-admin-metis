<style lang="less">
@import "./libs/public.less";
.echarts-plugin-wrapper {
    // background-image: url("../../../assets/img/workbenchNew/bg_todo.png");
    background-color: #fff;
    .echarts-content{
        height: 100%;
    }
}
</style>

<template lang="html">
<plugin-template class="echarts-plugin-wrapper" 
    :style="{backgroundImage:`url(${require('../../../assets/img/workbenchNew/bg_todo.png')})`}"
    :mode="mode" :data="data" :dataLength="dataLength"
    @clickMore="clickMore" @loadData="loadData"
    @onButtonClick="onButtonClick"
    @init="init">
    <div ref="dom" class="echarts-content"></div>
</plugin-template>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 插件 - echarts
 */
import MODE from "./mode.js";
import valid, { errors, sysAttachment } from '../../../libs/request.js';
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
import pluginTemplate from './components/template.vue'
export default {
    components: {
        pluginTemplate
    },
    props: {
        mode: { //当前模式
            type: String,
            default: '',
            required: true
        },
        data: { //节点数据
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            dom: null,
            dataLength: false,
        }
    },
    computed: {
        ...MODE
    },
    beforeDestroy () {
        off(window, 'resize', this.resize)
    },
    methods: {
        //加载数据
        loadDate() {
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid: {
                    top: '3%',
                    left: '1.2%',
                    right: '1%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '运营商/网络服务',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {
                            normal: {
                                color: '#2d8cf0'
                            }
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '银行/证券',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {
                            normal: {
                                color: '#10A6FF'
                            }
                        },
                        data: [257, 358, 278, 234, 290, 330, 310]
                    },
                    {
                        name: '游戏/视频',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {
                            normal: {
                                color: '#0C17A6'
                            }
                        },
                        data: [379, 268, 354, 269, 310, 478, 358]
                    },
                    {
                        name: '餐饮/外卖',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {
                            normal: {
                                color: '#4608A6'
                            }
                        },
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                    name: '快递/电商',
                        type: 'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        areaStyle: {normal: {
                                color: '#398DBF'
                            }
                        },
                        data: [820, 645, 546, 745, 872, 624, 258]
                    }
                ]
            }
            this.$nextTick(() => {
                this.dom = echarts.init(this.$refs.dom)
                this.dom.setOption(option)
                on(window, 'resize', this.resize)
            });
        },
        //点击更多
        clickMore(){
            console.log('clickMore')
        },
        resize () {
            this.dom.resize()
        },
        init() {
            this.$emit("init", this);
        },
        onButtonClick(str) {
            this.$emit('onButtonClick', str);
        }
    },
}
</script>
