<style lang="less">
.echartsParentFor235_1{
    width: 100%;
    height: 100%;
    .chart{
        width: 100%;
        height: 100%; 
    }
    .noDataText1 {
        position: absolute;
        top: 60%;
        width: 100%;
        left: 0;
        margin-top: -60px;
        background: url("../../assets/img/workbenchNew/favoriteNoData.png") no-repeat top center;background-size: 140px 118px;
        height: 118px;
    }
}
</style>
<template>
    <div class="echartsParentFor235_1">
        <div class="chart" v-show="!noData"></div>
        <div class="noDataText1" v-show="noData"></div>
    </div>
</template>
<script>
import echarts from 'echarts';
export default {
    props: {
        option: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            chart: null,
            noData: false
        };
    },
    mounted() {
        let dom = this.$el.querySelector('.chart');
        this.chart = echarts.init(dom);
        this.setOption(this.option);
    },
    methods:{
        setOption(option , closeItems) {
            console.log(option)
            let _charts = this.chart
            let _this = this
            if(_charts && option) {
                let series = option.series
                series.forEach((item,index) => {
                    if(closeItems){
                        if(closeItems[item.name]){
                            item.data.forEach((childrenItem, childrenIndex)=>{
                                if(index != series.length - 1){ // 不是最后合计的统计项，都计入合计
                                    series[series.length -1].data[childrenIndex] += childrenItem
                                    series[series.length -1].data[childrenIndex] = Number((series[series.length -1].data[childrenIndex]).toFixed(2))
                                }
                            })
                        } else {
                            if(index != series.length-1){
                                item.label = {
                                    show: false
                                }
                            }
                        }
                    } else {
                        item.data.forEach((childrenItem, childrenIndex)=>{
                            if(index != series.length - 1){ // 不是最后合计的统计项，都计入合计
                                series[series.length -1].data[childrenIndex] += childrenItem
                                series[series.length -1].data[childrenIndex] = Number((series[series.length -1].data[childrenIndex]).toFixed(2))
                            }
                        })
                    }
                });
                if(option && option.series[0].data.length == 0){
                    this.noData = true
                } else if(_charts && option){
                    this.noData = false
                    
                    // 给前三名加上top
                    let teacherNames = [].concat(option.xAxis[0].data)
                    let sumArray = [].concat(option.series[option.series.length - 1].data)
                    let sort = 0
                    let num = 0
                    for(let i = 0; i < sumArray.length; i++){
                        if( sort == 0 || Number(sumArray[i]) < sort){
                            sort = Number(sumArray[i])
                            num += 1;
                        }
                        teacherNames[i] = (num < 4 ? ('Top' + num + ' ') : (num + ' ')) + teacherNames[i]
                    }
                    option.xAxis[0].data = teacherNames
                    // 给前三名加上top  结束
                    _charts.setOption(option, true);
                }

                if(!closeItems){
                    _charts.on("legendselectchanged", function(obj) {
                        //obj.selected = {EE: true, LWP: true, GGR: true, GIR: true, 冬夏令营: false}
                        _this.$emit('resetOption', obj.selected)
                        // let _option = Object.assign({},option)
                        // _option.legend.selected = obj.selected
                        // _option.series[_option.series.length -1].data = [0,0,0,0,0,0,0,0,0,0]
                        // let series = _option.series
                        // series.forEach((item,index) => {
                        //     console.log(obj.selected[item.name], item.name)
                        //     console.log(series[series.length -1].data)
                        //     if(obj.selected[item.name]){
                        //         item.data.forEach((childrenItem, childrenIndex)=>{
                        //             if(index != series.length - 1){
                        //                 series[series.length -1].data[childrenIndex] += childrenItem
                        //             }
                        //         })
                        //     } else {
                        //         if(index != series.length-1){
                        //             item.label = {
                        //                 show: false
                        //             }
                        //         }
                        //     }
                        // });
                        // console.log(_option)
                        // _charts.setOption(_option,true);
                    })
                }
            }
        }
    },
    watch: {
        //这里不能用监听，和自定义切换legend会冲突
        /*  option: {
            handler(val, oval) {
                this.setOption(val);
            },
            deep: true
        } */
    }
}
</script>
