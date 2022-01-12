<style lang="less">
    .servicesCharts{
        width: 100%;
        height: 100%;
        .services-chartspart{
            width: ~"calc(100% - 60px)";
            height: ~"calc(100% - 100px)";
            margin: 0 auto;
        }
    }
</style>
<template>
    <div class="servicesCharts">
        <Tabs v-model="chartType">
            <TabPane label="ACH" name="ACH"></TabPane>
            <TabPane :label="$t('modules_spoc_jw_web_src_views_servicescharts_serviceechartsoptionsfor234_1_3072')" name="HKJE"></TabPane>
            <TabPane :label="$t('modules_spoc_jw_web_src_views_servicescharts_servicescharts_3076')" name="HKZS"></TabPane>
            <TabPane :label="$t('modules_spoc_jw_web_src_views_servicescharts_servicescharts_3077')" name="SKXSS"></TabPane>
            <TabPane :label="$t('modules_spoc_jw_web_src_views_servicescharts_servicescharts_3078')" name="XYKQS"></TabPane>
        </Tabs>
        <services-chartspart1 v-if="chartType=='ACH'" :menuRoute="menuRoute" class="services-chartspart"></services-chartspart1>
        <services-chartspart2 v-if="chartType=='HKJE'" :menuRoute="menuRoute" class="services-chartspart"></services-chartspart2>
        <services-chartspart3 v-if="chartType=='HKZS'" :menuRoute="menuRoute" class="services-chartspart"></services-chartspart3>
        <services-chartspart4 v-if="chartType=='SKXSS'" :menuRoute="menuRoute" class="services-chartspart"></services-chartspart4>
        <services-chartspart5 v-if="chartType=='XYKQS'" :menuRoute="menuRoute" class="services-chartspart"></services-chartspart5>
    </div>
</template>
<script>
import servicesChartspart1 from './servicesChartspart1'
import servicesChartspart2 from './servicesChartspart2'
import servicesChartspart3 from './servicesChartspart3'
import servicesChartspart4 from './servicesChartspart4'
import servicesChartspart5 from './servicesChartspart5'
export default {
    name: 'jw.servicesCharts',
    props:{
        menuRoute:{
            type:String,
            required: true
        }
    },
    data() {
        return {
            chartType: "ACH"
        };
    },
    components:{
        servicesChartspart1,
        servicesChartspart2,
        servicesChartspart3,
        servicesChartspart4,
        servicesChartspart5
    },
    mounted() {
    },
    methods:{
    }
}
</script>
