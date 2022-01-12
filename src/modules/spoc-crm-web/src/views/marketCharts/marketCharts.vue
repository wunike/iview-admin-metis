<style lang="less">
    .marketCharts{
        width: 100%;
        height: 100%;
        .market-charts-part{
            width: ~"calc(100% - 60px)";
            height: ~"calc(100% - 100px)";
            margin: 0 auto;
        }
    }
</style>
<template>
    <div class="marketCharts">
        <Tabs v-model="chartType">
            <TabPane :label="$t('modules_spoc_crm_web_src_views_marketcharts_marketcharts_1346')" name="QDTJ"></TabPane>
            <TabPane :label="$t('modules_spoc_crm_web_src_views_marketcharts_marketcharts_1347')" name="SCHD"></TabPane>
            <TabPane :label="$t('modules_spoc_crm_web_src_views_marketcharts_marketcharts_1348')" name="SCYJ"></TabPane>
        </Tabs>
        <market-charts-part1 v-if="chartType=='QDTJ'" :menuRoute="menuRoute" class="market-charts-part"></market-charts-part1>
        <market-charts-part2 v-if="chartType=='SCHD'" :menuRoute="menuRoute" class="market-charts-part"></market-charts-part2>
        <market-charts-part3 v-if="chartType=='SCYJ'" :menuRoute="menuRoute" class="market-charts-part"></market-charts-part3>
    </div>
</template>
<script>
import marketChartsPart1 from './marketChartsPart1'
import marketChartsPart2 from './marketChartsPart2'
import marketChartsPart3 from './marketChartsPart3'
export default {
    name: 'crm.marketCharts',
    props:{
        menuRoute:{
            type: String,
            required: true
        },
    },
    data() {
        return {
            chartType: "QDTJ"
        };
    },
    components:{
        marketChartsPart1,
        marketChartsPart2,
        marketChartsPart3,
    },
    mounted() {
    },
    methods:{
    }
}
</script>
