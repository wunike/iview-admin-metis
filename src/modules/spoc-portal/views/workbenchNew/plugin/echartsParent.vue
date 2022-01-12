<style lang="less">
.echartsParent{
    width: 100%;
    height: 100%;
    .chartBlock{
        width: 100%;
        height: 100%; 
    }
    .noDataText1 {
        position: absolute;
        top: 60%;
        width: 100%;
        left: 0;
        margin-top: -60px;
        background: url("../../../assets/img/workbenchNew/favoriteNoData.png") no-repeat top center;background-size: 140px 118px;
        height: 118px;
    }
}
</style>
<template>
    <div class="echartsParent">
        <div class="chartBlock" v-show="!noData"></div>
        <!-- <div class="noDataText1" v-show="noData"></div> -->
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
        let dom = this.$el.querySelector('.chartBlock');
        this.chart = echarts.init(dom);
        this.setOption(this.option);
    },
    methods:{
        setOption(option) {
            if(option && option.series[0].data.length == 0){
                this.noData = true
            } else if(this.chart && option) {
                this.noData = false

                this.$nextTick(()=>{
                    setTimeout(()=>{
                        this.chart.setOption(option, true);
                    },500)
                })
            }
        }
    },
    watch: {
        option: {
            handler(val, oval) {
                console.log(val)
                this.setOption(val);
            },
            deep: true
        }
    }
}
</script>
