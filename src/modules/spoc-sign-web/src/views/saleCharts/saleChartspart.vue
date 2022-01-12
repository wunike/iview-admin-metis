<style lang="less">
.servicesChartspart2{
    .count{
        width: 100%;
        display:inline-block;
        text-align:center;
        position: relative;
        .countRadioGroup{
            position: absolute;
            left:0;
        }
    }
}
</style>
<template>
    <div class="servicesChartspart2">
        <div class="count">
            <RadioGroup v-model="rankField" @on-change="getOption" class="countRadioGroup">
                <Radio label="city">{{$t('modules_spoc_sign_web_src_views_salecharts_salechartspart_7247')}}</Radio>
                <Radio label="office">{{$t('modules_spoc_sign_web_src_views_salecharts_salechartspart_7248')}}</Radio>
                <Radio label="saler">{{$t('modules_spoc_sign_web_src_views_salecharts_salechartspart_7249')}}</Radio>
            </RadioGroup>
            <span>{{allText}}：{{totalAmount}}</span>
            <span style="margin-left:24px;">{{$t('modules_spoc_sign_web_src_views_salecharts_salechartspart_7250', [currentUserAmount])}}</span>
        </div>
        <echarts-parent :option="option" v-if="option"></echarts-parent>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
import valid, {
	errors,
	sysUser,
	sysDict,
    sysAttachment,
    salerPerformance,
	common
} from "../../libs/request";
import { barOption } from './saleChartsOptions.js';
import echartsParent from './echartsParent'
export default {
    props:{
        menuRoute:{
            type: String,
            required: true
        },
        chartType: {
            type: String,
            required: true
        },
        allText: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            officeId: '',
            rankField: 'city',
            option: null,
            totalAmount: 0,
            currentUserAmount: 0,
        };
    },
    computed: {
        ...mapState(["userInfo", "app", "buttonPerm","calendarConfig"]),
    },
    components:{
        echartsParent,
    },
    mounted() {
        waitUntil(
			() => {
				console.log("this.app.currOfficeId ==" + this.app.currOfficeId);
				if (this.app.currOfficeId) {
					this.officeId = this.app.currOfficeId == 'all' ? this.userInfo.officeId : this.app.currOfficeId;
				}
				return (this.app.currOfficeId && this.userInfo.officeId) || false;
			},
			() => {
                this.getOption();
			}
		);
    },
    methods:{
        getOption() {
            let obj = {
                rankField: this.rankField,
            }
            // 'ho' '全国HO总净收'
            // 'new' 全国HO新签总净收'
            // 'again' '全国HO续签总净收'
            // 'mkt' '全国HO总新签MKT'
            // 'ref'  '全国HO总新签REF'
            if(this.chartType == 'new'){
                obj.contractTypeArr = ["new mkt","new ref"]
            }
            if(this.chartType == 'again'){
                obj.contractTypeArr = ["replenish"]
            }
            if(this.chartType == 'mkt'){
                obj.contractTypeArr = ["new mkt"]
            }
            if(this.chartType == 'ref'){
                obj.contractTypeArr = ["new ref"]
            }
            salerPerformance.data(obj,{
                headers:{
                    menuRouteCover: this.menuRoute
                }
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let result = res.data.data
                    
                    this.totalAmount = result.totalAmount
                    this.currentUserAmount = result.currentUserAmount

                    let keys = []
                    let vals = []
                    let sort = 0
                    let num = 0
                    result.statisticsResult.forEach((item, index) => {
                        if(index < 10){
                            if( sort == 0 || Number(item.amount) < sort){
                                sort = Number(item.amount)
                                num += 1;
                            }
                            if(num < 4){
                                keys.push('Top' + num + ' ' + item.name)
                            } else {
                                keys.push(num + ' ' + item.name)
                            }
                            vals.push(item.amount)
                        }
                        // vals.push(item.amount >=0 ? item.amount : 0)
                    });
                    let option = barOption(keys,vals)
                    console.log(keys,vals)
                    this.option = option
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                // this.updateLoadingStatus({
                //     isLoading: false
                // });
            });
        }
    },
    watch: {
		"app.currOfficeId": function(val, oldVal) {
			if (oldVal) {
				this.officeId = val == 'all' ?  this.userInfo.officeId : val;
				this.getOption();
			}
        },
        chartType: function(val, oldVal) {
            this.getOption();
        }
	}
}
</script>
