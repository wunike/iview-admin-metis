<style lang="less">
.echartsParentFor235_2{
    width: 100%;
    height: 100%;
    .chart{
        width: 100%;
        height: 100%;  
    }
}
</style>
<template>
    <div class="echartsParentFor235_2">
        <div class="chart"></div>
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
            chart: null
        };
    },
    mounted() {
        let dom = this.$el.querySelector('.chart');
        this.chart = echarts.init(dom);
        this.setOption(this.option);
    },
    methods:{
        setOption(option) {
            console.log(this.chart)
            console.log(option)
            this.chart.setOption(option, true);
        }
    },
    watch: {
       /*  option: {
            handler(val, oval) {
                this.setOption(val);
            },
            deep: true
        } */
    }
}
</script>
