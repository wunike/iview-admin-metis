<style lang="less">
.marketChartsPart3{

}
</style>
<template>
    <div class="marketChartsPart3">
        <RadioGroup v-model="groupType" @on-change="getOption">
            <Radio label="6">{{$t('modules_spoc_crm_web_src_views_marketcharts_marketchartspart3_1364')}}</Radio>
            <Radio label="7">{{$t('modules_spoc_crm_web_src_views_marketcharts_marketchartspart3_1365')}}</Radio>
            <Radio label="8">{{$t('modules_spoc_crm_web_src_views_marketcharts_marketchartspart3_1366')}}</Radio>
        </RadioGroup>
        <span style="margin-left:12px;">{{$t('modules_spoc_crm_web_src_views_marketcharts_marketchartspart2_1357')}}</span>
        <Select v-model="rankField" style="width:140px" @on-change="getOption">
            <Option value="leads">{{$t('modules_spoc_crm_web_src_views_marketcharts_marketchartspart2_1358')}}</Option>
            <Option value="vleads">{{$t('modules_spoc_crm_web_src_views_marketcharts_marketchartspart2_1359')}}</Option>
            <Option value="app">{{$t('modules_spoc_crm_web_src_views_marketcharts_marketchartspart2_1360')}}</Option>
            <Option value="opp">{{$t('modules_spoc_crm_web_src_views_marketcharts_marketchartspart2_1361')}}</Option>
            <Option value="news">{{$t('modules_spoc_crm_web_src_views_marketcharts_marketchartspart2_1362')}}</Option>
            <Option value="cash">{{$t('modules_spoc_crm_web_src_views_marketcharts_marketchartspart2_1363')}}</Option>
        </Select>
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
    marketingPerformance,
	common
} from "../../libs/request";
import { barOption } from './marketChartsOptionsFor3.js';
import echartsParent from './echartsParent'
export default {
    props:{
        menuRoute:{
            type: String,
            required: true
        },
    },
    data() {
        return {
            officeId: '',
            groupType: '6',
            rankField: 'leads',
            option: null,
            totalAmount: 0,
            average: 0,
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
            marketingPerformance.data({
                groupType: this.groupType,
                rankField: this.rankField
            },{
                headers:{
                    menuRouteCover: this.menuRoute
                }
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let result = res.data.data
                    console.log(res.data.data)

                    let valObj = {}
                    let keys = []
                    if(!result[0]){
                        this.option = {
                            series:[{
                                data:[]
                            }]
                        }
                        return 
                    }
                    Object.keys(result[0]).forEach(item=>{
                        if(item.toLocaleLowerCase() != 'name' 
                        && item.toLocaleLowerCase() != 'newamount') {
                            valObj[item] = []
                            keys.push(item)
                        }
                    })

                    let qdKeys = []
                    let sort = 0
                    let num = 0
                    result.forEach((item, index)=>{
                        if(index < 10){
                            if( sort == 0 || Number(item[this.rankField]) < sort){
                                sort = Number(item[this.rankField])
                                num += 1;
                            }
                            if(num < 4){
                                qdKeys.push('Top' + num + ' ' + item.name)
                            } else {
                                qdKeys.push(num + ' ' + item.name)
                            }
                            keys.forEach(itemKey=>{
                                valObj[itemKey].push(item[itemKey])
                            })
                        }
                    })

                    // console.log(qdKeys)
                    // console.log(valObj)
                    let option = barOption(qdKeys,valObj)
                    console.log(JSON.stringify(option))
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
				// this.getOption(true);
			}
		}
	}
}
</script>
