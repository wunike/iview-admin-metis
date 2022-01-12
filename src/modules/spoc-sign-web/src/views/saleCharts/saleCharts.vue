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
        <Tabs v-model="chartType" @on-click="changeChartType">
            <TabPane :label="$t('modules_spoc_sign_web_src_views_salecharts_salecharts_7236')" name="ho"></TabPane>
            <TabPane :label="$t('modules_spoc_sign_web_src_views_salecharts_salecharts_7237')" name="new"></TabPane>
            <TabPane :label="$t('modules_spoc_sign_web_src_views_salecharts_salecharts_7238')" name="again"></TabPane>
            <TabPane :label="$t('modules_spoc_sign_web_src_views_salecharts_salecharts_7239')" name="mkt"></TabPane>
            <TabPane :label="$t('modules_spoc_sign_web_src_views_salecharts_salecharts_7240')" name="ref"></TabPane>
        </Tabs>
        <sale-chartspart  :menuRoute="menuRoute" :chartType="chartType" :allText="allText" class="market-charts-part"></sale-chartspart>
    </div>
</template>
<script>
import saleChartspart from './saleChartspart'
export default {
    props:{
        menuRoute:{
            type:String,
            required: true
        }
    },
    data() {
        return {
            chartType: "ho",
            allText: this.$t('modules_spoc_sign_web_src_views_salecharts_salecharts_7241')
        };
    },
    components:{
        saleChartspart,
    },
    mounted() {
    },
    methods:{
        changeChartType(){
            if(this.chartType == 'ho'){
                this.allText = this.$t('modules_spoc_sign_web_src_views_salecharts_salecharts_7241')
            }
            if(this.chartType == 'new'){
                this.allText = this.$t('modules_spoc_sign_web_src_views_salecharts_salecharts_7242')
            }
            if(this.chartType == 'again'){
                this.allText = this.$t('modules_spoc_sign_web_src_views_salecharts_salecharts_7243')
            }
            if(this.chartType == 'mkt'){
                this.allText = this.$t('modules_spoc_sign_web_src_views_salecharts_salecharts_7244')
            }
            if(this.chartType == 'ref'){
                this.allText = this.$t('modules_spoc_sign_web_src_views_salecharts_salecharts_7245')
            }
        },
    }
}
</script>
