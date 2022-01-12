<style lang="less">
    .chart{
        width: 1000px;
        height: 400px;
    }
</style>
<template>
    <div>
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
            if(this.chart && option) {
                this.chart.setOption(option, true);
            }
        }
    },
    watch: {
        option: {
            handler(val, oval) {
                this.setOption(val);
            },
            deep: true
        }
    }
}
</script>
