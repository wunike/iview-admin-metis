<style lang="less">
    .line-ec-container {
        width: 100%;
        height: 80%;
    }
</style>

<template>
    <div ref="echartsDom" class="line-ec-container" :style="{width:width,height:height}"></div>
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
                chart: null,
                height: '80%',
                width: '100%',
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
                            type: "line",
                            symbol: 'circle',
                            animation:false,
                            data: [900, 1800, 3000, 2090, 5500, 20]
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
                // console.log(this.wh)
                let dom = this.$refs.echartsDom;
                dom.style.width = this.wh.width +'px'
                dom.style.height = this.wh.height +'px'
                this.chart = echarts.init(dom);
                // console.log(dom.style.height)
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
