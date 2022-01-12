<template>
    <div class="servicesChartspart5">
        <RadioGroup v-model="dataType" @on-change="getOption">
            <Radio label="school">{{$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart5_3099')}}</Radio>
            <Radio label="self">{{$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart5_3100')}}</Radio>
        </RadioGroup>
        <echarts-parent :option="option" v-if="option"></echarts-parent>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
import valid, {
	errors,
	jwClassCourse,
	sysUser,
	sysDict,
	sysAttachment,
	jwServicePerformance,
	common
} from "../../libs/request";
import { barOption } from './serviceEchartsOptionsFor15.js';
import echartsParent from './echartsParentFor15'
export default {
    props:{
        menuRoute:{
            type:String,
            required: true
        }
    },
    data() {
        return {
            option: null,
            officeId: '',
            dataType: 'school'
        };
    },
    components:{
        echartsParent
    },
    computed: {
        ...mapState(["userInfo", "app", "buttonPerm","calendarConfig"]),
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
            jwServicePerformance.attendanceCountData({
                officeId: this.officeId,
                userId: this.dataType == 'school' ? '' : this.userInfo.id
            },{
                headers:{
                    menuRouteCover: this.menuRoute
                }
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let result = res.data.data
                    let dataObj = {}
                    result.forEach(item => {
                        for(let key in item){
                            dataObj[this.$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart5_3101')+key+this.$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart5_3102')] = parseInt(item[key])
                        }
                    });

                    let optionObj = {
                        title: this.$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart5_3103'),
                        data: dataObj,
                        average: null,
                        yAxisName: this.$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart5_3104')
                    }
                    let option = barOption(optionObj)
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
				this.getOption();
			}
		}
	}
}
</script>
