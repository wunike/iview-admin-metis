<style lang="less">

</style>
<template>
    <div>
        <Button @click="getOption">换数据</Button>
        <echarts-parent :option="option" v-if="option"></echarts-parent>
    </div>
</template>
<script>
import { barOption } from './echartsOptions.js';
import echartsParent from './echartsParent'
export default {
    data() {
        return {
            option: null
        };
    },
    components:{
        echartsParent
    },
    mounted() {
        this.getOption();
    },
    methods:{
        getOption() {
            let optionObj = {
                title: '测试统计类目',
                yAxisData: ['校区1','校区2','校区3','校区4',],
                legendObj: {
                    '资源数': [parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100)],
                    '有效资源数': [parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100)],
                    '签单数': [parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100)],
                }
            }
            let option = barOption(optionObj)
            console.log(JSON.stringify(option))
            this.option = option
        }
    }
}
</script>
