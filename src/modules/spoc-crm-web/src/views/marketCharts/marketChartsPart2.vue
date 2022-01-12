<style lang="less">
.marketChartsPart2{

}
</style>
<template>
    <div class="marketChartsPart2">
        <RadioGroup v-model="groupType">
            <Radio label="9">{{$t('modules_spoc_crm_web_src_views_marketcharts_marketchartspart2_1356')}}</Radio>
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
import { waitUntil } from "@public/libs/util";
import valid, {
	errors,
	sysUser,
	sysDict,
	sysAttachment,
	marketingPerformance,
	common
} from "../../libs/request";
import { barOption as barOption1 } from './marketChartsOptionsFor1.js';
import { barOption as barOption2 } from './marketChartsOptionsFor2.js';
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
            rankField: 'leads',
            option: null,
            totalAmount: 0,
            average: 0,
            groupType: '9'
        };
    },
    computed: {
        ...mapState(["userInfo", "app", "buttonPerm","calendarConfig"]),
    },
    components:{
        echartsParent
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
                groupType: 9,
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

                    if(this.rankField != 'cash'){
                        if(!result[0]){
                            this.option = {
                                series:[{
                                    data:[]
                                }]
                            }
                            return 
                        }
                        let valObj = {}
                        let keys = []

                        Object.keys(result[0]).forEach(item=>{
                            if(item.toLocaleLowerCase() != 'name' 
                            && item.toLocaleLowerCase() != 'newamount' 
                            && item.toLocaleLowerCase() != 'cash') {
                                valObj[item] = []
                                keys.push(item)
                            }
                        })

                        let hdKeys = []
                        let sort = 0
                        let num = 0
                        result.forEach((item, index)=>{
                            if(index < 10){
                                if( sort == 0 || Number(item[this.rankField]) < sort){
                                    sort = Number(item[this.rankField])
                                    num += 1;
                                }
                                if(num < 4){
                                    hdKeys.push('Top' + num + ' ' + item.name)
                                } else {
                                    hdKeys.push(num + ' ' + item.name)
                                }
                                keys.forEach(itemKey=>{
                                    valObj[itemKey].push(item[itemKey])
                                })
                            }
                        })

                        let option = barOption1(hdKeys,valObj, true)
                        console.log(JSON.stringify(option))
                        this.option = option
                    } else if(this.rankField == 'cash'){
                        let keys = []
                        let cashs = []
                        let sort = 0
                        let num = 0
                        result.forEach((item, index)=>{
                            if(index < 10){
                                if( sort == 0 || Number(item[this.rankField]) < sort){
                                    sort = Number(item[this.rankField])
                                    num += 1;
                                }
                                if(num < 4){
                                    keys.push('Top' + num + ' ' + item.name)
                                } else {
                                    keys.push(num + ' ' + item.name)
                                }
                                cashs.push(item.cash)
                            }
                        })
                    
                        let option = barOption2(keys,cashs)
                        console.log(JSON.stringify(option))
                        this.option = option
                    }
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
				// this.getOption();
			}
		}
	}
}
</script>
