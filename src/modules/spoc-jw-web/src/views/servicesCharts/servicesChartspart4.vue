<style lang="less">
.servicesChartspart4{
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
    <div class="servicesChartspart4">
        <div class="count">
            <RadioGroup v-model="teacherType" @on-change="getOption(true)" class="countRadioGroup">
                <Radio label="teacher">{{$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart1_3079')}}</Radio>
                <Radio label="classTeacher">{{$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart1_3080')}}</Radio>
            </RadioGroup>
            <span>{{$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart4_3096', [totalAmount])}}</span>
            <span style="margin-left:24px;">{{$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart4_3097', [average])}}</span>
        </div>
        <div style="height:100%;">
            <div style="display:inline-block;width:50%;height:100%;">
                <echarts-parent1 ref="chart1" :option="option1" v-if="option1" @resetOption="resetOption"></echarts-parent1>
            </div>
            <div style="display:inline-block;width:50%;height:100%;">
                <echarts-parent2 ref="chart2" :option="option2" v-if="option2"></echarts-parent2>
            </div>
        </div>
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
import { barOption1 } from './serviceEchartsOptionsFor234_1.js';
import { barOption2 } from './serviceEchartsOptionsFor234_2.js';
import echartsParent1 from './echartsParentFor235_1'
import echartsParent2 from './echartsParentFor235_2'
export default {
    props:{
        menuRoute:{
            type:String,
            required: true
        }
    },
    data() {
        return {
            officeId: '',
            teacherType: 'teacher',
            option1: null,
            option2: null,
            totalAmount: 0,
            average: 0,
        };
    },
    computed: {
        ...mapState(["userInfo", "app", "buttonPerm","calendarConfig"]),
    },
    components:{
        echartsParent1,
        echartsParent2
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
        resetOption(obj){
            // {EE: true, LWP: true, GGR: true, GIR: true, 冬夏令营: false}
            this.getOption(true, obj)
        },
        getOption(isChange, closeItems = null) {
            let noSelect = []
            if(closeItems) {
                for(let key in closeItems) {
                    if(!closeItems[key]){
                        noSelect.push(key)
                    }
                }
            }
            jwServicePerformance.consumeLessonData({
                officeId: this.officeId,
                rankField: this.teacherType,
                tabType: 'consumeDuration',
                closeItems: closeItems ? noSelect.join(',') :'' 
            },{
                headers:{
                    menuRouteCover: this.menuRoute
                }
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let result = res.data.data

                    this.totalAmount = result.totalAmount
                    this.average = result.average

                    let pieData = result.courseTypeStatistical
                    let allType = []  // 所有课程类别的数组
                    let allTypeArrObj = {}  // 初始化。所有课程类别对应的消耗数组对象。数组里的顺序是人名的顺序
                    for(let key in pieData){
                        allType.push(key)
                        allTypeArrObj[key] = []
                    }

                    let teacherNameArray = [] // 所有老师人名的数组
                    let teacherNameDataObj = {}  //扁平对象。 每个老师 每次课程的消耗
                    result.servicePerformance.forEach((item)=>{
                        if(teacherNameArray.length < 10){  //取前十名
                            teacherNameArray.push(item.name)
                            teacherNameDataObj[item.name] = {}
                            item.courseTypeStatisticals.forEach((childrenItem)=>{
                                teacherNameDataObj[item.name][childrenItem.name] = childrenItem.consumeDuration
                            })
                        }
                    })

                    teacherNameArray.forEach((item, index)=>{
                        allType.forEach((childItem)=>{
                            if(teacherNameDataObj[item][childItem]){
                                allTypeArrObj[childItem][index] = Number(teacherNameDataObj[item][childItem])
                            } else {
                                allTypeArrObj[childItem][index] = 0
                            }
                        })
                    })


                    let option1 = barOption1({
                        allType,
                        teacherNameArray,
                        allTypeArrObj,
                        yAxisName: this.$t('message_socket_305')
                    })

                    if(closeItems){
                        option1.legend.selected = closeItems
                    }

                    let option2 = barOption2(pieData)
                    this.option1 = option1
                    this.option2 = option2
                    if(this.$refs.chart1 && isChange){
                        this.$refs.chart1.setOption(this.option1, closeItems)
                    }
                    if(this.$refs.chart2 && isChange){
                        this.$refs.chart2.setOption(this.option2)
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
				this.getOption(true);
			}
		}
	}
}
</script>
