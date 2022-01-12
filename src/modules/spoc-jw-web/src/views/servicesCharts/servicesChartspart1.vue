<template>
    <div class="servicesChartspart1">
        <RadioGroup v-model="teacherType" @on-change="getOption">
            <Radio label="teacher">{{$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart1_3079')}}</Radio>
            <Radio label="classTeacher">{{$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart1_3080')}}</Radio>
        </RadioGroup>
        <!-- <span>{{$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart1_3081', [average])}}</span> -->
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
            teacherType: 'teacher',
            average:''
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
            jwServicePerformance.consumeLessonData({
                officeId: this.officeId,
                rankField: this.teacherType,
                tabType: 'ach'
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
                    let sort = 0
                    let num = 0
                    for(let i = 0; i < 10; i++){
                        if(result.servicePerformance[i]){
                            // dataObj[result.servicePerformance[i].name] = result.servicePerformance[i].amountAndHourRadio
                            if(sort == 0 || Number(result.servicePerformance[i].amountAndHourRadio) < sort){
                                sort = Number(result.servicePerformance[i].amountAndHourRadio)
                                num += 1;
                            }
                            dataObj[(num < 4 ? ('Top' + num + ' ') : (num + ' ')) + result.servicePerformance[i].name] = result.servicePerformance[i].amountAndHourRadio
                        }
                    }
                    let optionObj = {
                        title: this.$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart1_3082'),
                        data: dataObj,
                        average: result.average,
                        yAxisName: this.$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart1_3083')
                    }
                    let option = barOption(optionObj)
                    console.log(JSON.stringify(option))
                    this.option = option
                    this.average = result.average
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
