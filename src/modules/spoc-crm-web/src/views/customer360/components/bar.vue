<style lang="less">
    .bar-ec-container {
        width: 100%;
        height: 80%;
    }
</style>

<template>
    <div ref="echartsDom1" class="bar-ec-container" :style="{width:width,height:height}"></div>
</template>

<script>
    import echarts from "echarts";

    export default {
        props: {
            wh: {
                type: Object,
                required: true
            }
        },
        components: {},
        data() {
            return {
                height: '80%',
                width: '100%',
                chart: null,
                option: {
                    xAxis: {
                        type: 'category',
                        axisTick: {show: false},
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#666666'
                            }
                        },
                        data: ["Jan", "Mar", "May", "Jul", "Sep", "Dec"]
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#666666'
                            }
                        },
                        axisTick: {show: false},
                    },
                    color: ['#44BCB7'],
                    grid:{
                        left:30,
                        right:30,
                        top:40,
                        bottom:40,
                        containLabel:true,
                    },
                    series: [
                        {
                            type: "bar",
                            symbol: 'circle',
                            animation:false,
                            data: [900, 1800, 3000, 2090, 1000, 900]
                        }
                    ]
                },
            }
        },
        mounted() {
            // this.show();
        },

        methods: {
            show(data) {
                if (this.chart) {
                    this.chart.clear()
                }
                let dom = this.$refs.echartsDom1;
                dom.style.width = this.wh.width  +'px'
                dom.style.height = this.wh.height +'px'
                this.chart = echarts.init(dom);
                this.option.xAxis.data = data.x
                this.option.series[0].data = data.data
                this.$nextTick(()=>{
                    this.setOption(this.option);
                })
            },
            setOption(option) {
                this.chart.setOption(option, true);
            },
        },
    }
</script>
