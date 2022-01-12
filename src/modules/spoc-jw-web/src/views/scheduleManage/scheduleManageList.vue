<style lang="less">
.mytable {
	margin-top: 10px;
	width: 100%;
	background: rgba(255, 255, 255, 1);
	border-radius: 4px;
    padding: 0 16px;
    .unClick{
        color: #999;
        cursor: default;
    }
}

.editScheduleModel {
	.w50 {
		display: inline-block;
		width: 50%;
	}
	.w100 {
		display: inline-block;
		width: 100%;
	}
	.w250p {
		width: 250px;
    }
}

.showReportDiv {
	.showReportCount {
		margin-bottom: 16px;
		font-size: 14px;
	}
	.showReporNum0 {
		color: #44bcb7;
	}
	.showReporNum1 {
		color: #44bcb7;
	}
	.showReporNum2 {
		color: #e64630;
	}
	.showReportTitle {
		overflow: hidden;
		height: 32px;
		margin-bottom: 12px;
		.showReportTitleName {
			float: left;
			font-size: 14px;
			height: 20px;
			line-height: 20px;
			margin-top: 12px;
		}
		.showReportTitleButton {
			float: right;
			height: 32px;
		}
	}
}

.showScheduleDivFather {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(55, 55, 55, 0.6);
	height: 100%;
	z-index: 999999999;
}

.showScheduleDiv {
	background-color: #ffffff;
	width: 800px;
	height: 224px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 999999;
	text-align: center;
	box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
	border-radius: 8px;
	.percentDiv {
		width: 610px;
		// height: 116px;
		height: 10px;
		// margin: 36px auto 23px;
		margin: 93px auto 31px;
	}
	.percentDes {
		width: 800px;
		text-align: center;
		font-size: 16px;
	}
}
</style>
<template>
	<div>
		<v-search-collapse @search="doSearch" @reset="resetSearch" @changeDivHeight="changeDivHeight">
			<DatePicker
				ref="DatePicker"
				:options="options3"
				split-panels
				@on-open-change="setOptTime"
				type="daterange"
				v-model="courseTime"
				placement="bottom-start"
				separator=" ~ "
				:placeholder="$t('courselist_courselist_221')"
				style="width:224px;"
			></DatePicker>
			<Select
				v-model="officeId"
				@on-change="changeSchool"
				:placeholder="$t('courselist_courselist_225')"
				style="width:224px;"
				filterable
				clearable
			>
				<Option v-for="item in schoolList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
			</Select>
			<Select v-model="status" :placeholder="$t('pushsettings_index_496')" clearable>
				<Option v-for="item in jw_lesson_status" :value="item.value" :key="item.value" v-show="item.value != 'unNormal'">{{ item.label }}</Option>
			</Select>
			<Select v-model="classIdList" :placeholder="$t('courselist_courselist_222')" clearable filterable multiple>
				<Option v-for="item in classCourseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
			<Select v-model="type" :placeholder="$t('messagemanagement_index_346')" clearable filterable @on-change="changeType">
				<Option v-for="item in jw_course_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			<Select v-model="grade" :placeholder="$t('courselist_courselist_224')" clearable filterable>
				<Option
					v-for="item in jw_course_grade"
					v-show="searchSelectTypeId == item.type"
					:value="item.value"
					:key="item.value"
				>{{ item.label }}</Option>
			</Select>
			<Select v-model="teacherId" :placeholder="$t('courselist_courselist_226')" clearable filterable>
				<Option v-for="item in teacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
			<Select v-model="assistId" :placeholder="$t('classlist_classlist_5')" clearable filterable>
				<Option v-for="item in assistList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
			<Select v-model="classTeacherId" :placeholder="$t('classlist_classlist_6')" clearable filterable>
				<Option v-for="item in classTeacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
			<Select v-model="isSync" :placeholder="$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2789')" clearable filterable>
				<Option :value="1">{{$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2490')}}</Option>
				<Option :value="0">{{$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2489')}}</Option>
			</Select>
			<Select v-model="isConflict" :placeholder="$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_2962')" clearable filterable>
				<Option :value="1">{{$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_2963')}}</Option>
				<Option :value="0">{{$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_2964')}}</Option>
			</Select>
			<Select v-model="classroomId" clearable filterable :placeholder="$t('modules_spoc_jw_web_src_views_1v1_newcourse_2165')" style="width:224px;">
				<Option v-for="item in classroomIdList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select> 
		</v-search-collapse>
		<big-table
			v-if="defaultShowCol"
			class="mytable"
			:tableName="tableName"
			:tableData="tableData"
			:tableColumnArray="tableColumnArray"
			:defaultShowCol="defaultShowCol"
			:btnList="btnList"
			:canSelection="true"
			:tableHeightOut="tableHeightOut"
			:updateShowTitleMethod="updateShowTitle"
			updateShowTitleKey="jwLesson/listPage"
			:dataTotal="dataTotal"
			:pageNo="pageNo"
			@resetDefault="resetDefaultCol"	
			@selectionChange="selectionChange"
			@sortChange="sortChange"
			@pageChange="pageChange"
		></big-table>
		<export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
		<Modal
			v-model="addModal"
			:loading="addModalLoading"
			:title="addModalTitle"
			width="800"
			:mask-closable="false"
			@on-ok="saveOk"
			@on-cancel="saveCancel"
		>
			<Form ref="createCoursePackRef" :model="addObj" :rules="ruleAddObj" class="editScheduleModel" :label-width="125">
				<FormItem :label="$t('courselist_compontents_modify_177')" class="w50" prop="className">{{addObj.objectName}}</FormItem>
				<FormItem :label="$t('modules_spoc_core_web_src_views_customstate_customizestate_154')" class="w50" prop="statusName">{{addObj.statusName}}</FormItem>
				<FormItem :label="$t('courselist_compontents_modify_178')" class="w50" prop="_startDate">
					<DatePicker
						:clearable="false"
						@on-change="change_startDate"
						v-model="addObj._startDate"
						type="date"
						placement="bottom-start"
						:placeholder="$t('courselist_compontents_modify_179')"
						class="w250p"
					></DatePicker>
				</FormItem>
				<FormItem :label="$t('courselist_compontents_modify_181')" class="w50" prop="courseTime">
					<TimePicker
						:clearable="false"
						v-model="addObj.courseTime"
						format="HH:mm"
						:steps="[1, 10]"
						type="time"
						placement="bottom-start"
						@on-open-change="changeTime"
						:placeholder="$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_classruletable_2567')"
						class="w250p"
					></TimePicker>
				</FormItem>
				<FormItem :label="$t('courselist_compontents_modify_184')" class="w50" prop="hours">
					<InputNumber :min="0.1" v-model="addObj.hours" @on-change="changeHours" class="w250p"></InputNumber>
				</FormItem>
				<FormItem :label="$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_2973')" class="w50" prop="duration">{{$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_2974', [addObj.duration])}}</FormItem>
				<FormItem :label="$t('courselist_compontents_modify_187')" class="w50" prop="teacherId">
					<Select v-model="addObj.teacherId" class="w250p" filterable>
						<Option :value="item.id" v-for="(item, index) in addTeacherList" :key="index">{{item.name}}</Option>
					</Select>
				</FormItem>
				<FormItem :label="$t('courselist_compontents_modify_190')" class="w50" prop="assistId">
                        <!-- :remote-method="assistRemote"
                        remote -->
                    <Select
                        filterable
                        clearable
                        :placeholder="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2647')"
                        v-model="addObj.assistId"
                    >
                        <Option v-for="item in addAssistList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
					<!-- <Select v-model="addObj.assistId" class="w250p" filterable clearable> 
						<Option :value="item.id" v-for="(item, index) in addAssistList" :key="index">{{item.name}}</Option>
					</Select> -->
				</FormItem>
				<FormItem :label="$t('courselist_compontents_modify_193')" class="w50" prop="classTeacherId">
                       <!--  :remote-method="classTeacherRemote"
                        remote -->
                    <Select
                        filterable
                        clearable
                        :placeholder="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2643')"
                        v-model="addObj.classTeacherId"
                    >
                        <Option v-for="item in addClassTeacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
					<!-- <Select v-model="addObj.classTeacherId" class="w250p" filterable>
						<Option
							:value="item.id"
							v-for="(item, index) in addClassTeacherList"
							:key="index"
						>{{item.name}}</Option>
					</Select> -->
				</FormItem>
				<FormItem :label="$t('courselist_compontents_modify_196')" class="w50" prop="classroomId">
					<Select v-model="addObj.classroomId" class="w250p" filterable>
						<Option :value="item.id" v-for="(item, index) in classRoomList" :key="index">{{item.name}}</Option>
					</Select>
				</FormItem>
			</Form>
		</Modal>
		<Modal v-model="showReport" :title="$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2797')" width="800" :mask-closable="false">
			<div class="showReportDiv">
				<div class="showReportCount">{{$t('modules_spoc_crm_web_src_views_customer360_components_flowup_796')}}<span class="showReporNum0">{{totalReportNum}}</span>{{$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2799')}}<span class="showReporNum1">{{totalReportNum -totalReportFailNum}}</span>{{$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2800')}}<span class="showReporNum2">{{totalReportFailNum}}</span>{{$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2801')}}</div>
				<div class="showReportTitle">
					<div class="showReportTitleName">{{$t('importPage_result5before')}}</div>
					<div class="showReportTitleButton">
						<Button
							style="height:32px;"
							type="default"
							size="large"
							@click="downErrorReport"
							:disabled="totalReportFailNum==0"
						>{{$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2803')}}</Button>
					</div>
				</div>
				<div>
					<Table :columns="reportColumns" :data="reportData"></Table>
				</div>
			</div>
			<div slot="footer">
				<Button type="primary" size="large" @click="showReportClose">{{$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2804')}}</Button>
			</div>
		</Modal>
		<div v-if="showSchedule" class="showScheduleDivFather">
			<div class="showScheduleDiv">
				<div class="percentDiv">
					<!-- <Circle :percent="schedule">
                        <span class="demo-Circle-inner" style="font-size:24px">{{schedule}}%</span>
					</Circle>-->
					<Progress :percent="schedule" style="width:300px;" />
				</div>
				<div class="percentDes">{{$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2805')}}</div>
			</div>
		</div>
	</div>
</template>
<script>
const ONE_DAY = 24 * 60 * 60 * 1000;
let myInterval;
import { mapMutations, mapState } from "vuex";
import bigTable from "@public/modules/bigTable.vue";
import exportModal from "@public/modules/exportModal.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
import valid, {
	common,
	errors,
	jwLesson,
	jwManualSign,
	sysUser,
    sysDict,
} from "../../libs/request";
export default {
	name: "jw.scheduleManageList",
	components: {
		bigTable,
		vSearchCollapse,
		exportModal
	},
	mounted() {
		this.getSchools();
		this.getCourseType(); //获取课程包分类
		this.getShowTitle();
	},
	computed: {
		...mapState(["userInfo", "app", "buttonPerm","calendarConfig"]),
        myButtonPrem() {
            return this.buttonPerm ? (this.buttonPerm["jw.scheduleManageList"] || []) : [];
        },
	},
	data() {
        const validatePass = (rule, value, callback) => {
            if (!value || value[0] === "") {
                callback(new Error(this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_2990')));
            } else {
                callback();
            }
        };
		return {
			classroomId: '', //教室ID
			classroomIdList: [],
            timer: null,
            addModalTitle: this.$t('modules_spoc_jw_web_src_views_classmanage_sortclass_sortclass_2755'),
			unitTime: 0,
			isActioning: false, //多次提交拦截
			options3: null,
			jw_lesson_status:[],
			tableHeightOut: 72, //324,
			/*搜索相关开始*/
			isConflict: '',
			officeId: "", //学校Id
			classIdList: [], // 所属班课  班课id集合
			type: "", //课程分类
			grade: "", //选择年级
			teacherId: "", // 授课老师
			assistId: "", //助教
			classTeacherId: "", //服务OO
			pageNo: 1,
			pageSize: this.$store.state.app.pageSizeGlobal,
			searchSelectTypeId: "",
			isSync: "",
			/*搜索相关结束*/
			reportColumns: [
				{
					title: this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_2992'),
					key: "classCode"
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_2993'),
					key: "lessonDate"
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_2994'),
					key: "lessonTime"
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_2995'),
					key: "errorTitle"
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_2996'),
					key: "errorInfo"
				}
			],
			reportData: [],
			schedule: 0,
			showSchedule: false,
			showReport: false,
			totalReportNum: 0,
			totalReportFailNum: 0,
			classCourseList: [],
			schoolList: [],
			courseTime: [],
			courseTimeOld: "",
			teacherList: [],
			assistList: [],
			classTeacherList: [],
			addTeacherList: [],
			addAssistList: [],
			addClassTeacherList: [],
			classRoomList: [],
			jw_course_type: [],
			jw_course_grade: [],
			addObj: {},
			addModal: false,
			addModalLoading: true,
			tableName: this.$t('jw.scheduleManageList'),
			selection: [],
			updateShowTitle: jwLesson.updateShowTitle,
			exportMethod: jwLesson.export, //导出用到的方法对象
			defaultShowCol: null,
			dataTotal: 0,
            sortObj: {},
            editItem: {},
			tableColumnArray: [
				{
					// title: "所属班课",
					key: "className",
					minWidth: 40,
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.className
						);
					}
				},
				{
					title: this.$t('classlist_compontents_detailinfo_45'),
					key: "doAction",
					width: 140,
					fixed: "right",
					render: (h, params) => {
						return h("div", [
                            (this.myButtonPrem && this.myButtonPrem.indexOf('addLesson') > -1) ? h(
								"a",
								{
									style: {
										"margin-left": "5px"
									},
									on: {
										click: () => {
                                            this.addModalTitle = this.$t('courselist_compontents_modify_176');
                                            this.getForm(params.row.id, () => {
                                                this.addObj = Object.assign({}, this.editItem);
                                                delete this.addObj.conflictLessonInfo;
                                                this.addObj.objectName = this.editItem.objectName;
                                                this.addObj.hours = this.editItem.hours - 0;
                                                this.addObj._startDate = this.editItem.startDate;
                                                this.addObj.courseTime = this.editItem.startTime ? this.editItem.startTime.split(' ')[1] : '';
                                                if(this.editItem.startTime && this.editItem.endTime) {
                                                    // 查找授课教师、授课助教、服务OO、授课教室列表
                                                    this.changeSearchTime(this.editItem.startTime, this.editItem.endTime, 'edit');
                                                }
                                                // 判断冲突
                                                if(this.editItem.isConflict == '1' && this.editItem.conflictLessonInfo && this.editItem.conflictLessonInfo.length) {
                                                    let arr1 = [];
                                                    this.editItem.conflictLessonInfo.forEach(e => {
                                                        arr1.push(e.conflictField);
                                                    });
                                                    if(arr1.indexOf('teacherId') > -1) this.addObj.teacherId = '';
                                                    if(arr1.indexOf('assistId') > -1) this.addObj.assistId = '';
                                                    if(arr1.indexOf('classTeacherId') > -1) this.addObj.classTeacherId = '';
                                                    if(arr1.indexOf('classroomId') > -1) this.addObj.classroomId = '';
                                                }
                                                this.unitTime = Number(this.editItem.duration) / Number(this.editItem.hours);
                                                this.addObj.duration = this.editItem.duration;
                                                this.addObj.status = 'unAttendance';
                                                this.addObj.isConflict = 0;
                                                this.addModal = true;
                                            });
										}
									}
								},
								this.$t('modules_expandrow_15')
                            ) : '' ,
                            
							(this.myButtonPrem && this.myButtonPrem.indexOf('addLesson') > -1) ? h(
								"a",
								{
									style: {
                                        "margin-left": "5px",
                                    },
                                    class: {
                                        'unClick': params.row.status == 'unNormal', // 异常不能添加
                                    },
									on: {
										click: () => {
											if(params.row.status == 'unNormal') { // 异常不能添加
                                                return false;
                                            }
											this.addModalTitle = this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_3001');
                                            this.getForm(params.row.id, () => {
                                                this.addObj = Object.assign({}, this.editItem);
                                                delete this.addObj.id;
                                                this.addObj.objectName = this.editItem.objectName;
                                                this.addObj.hours = this.editItem.hours - 0;
                                                this.addObj._startDate = new Date(new Date(params.row.startDate).getTime() + ONE_DAY).format('yyyy-MM-dd');
                                                this.addObj.courseTime = this.editItem.startTime ? this.editItem.startTime.split(' ')[1] : '';
                                                if(this.editItem.startTime && this.editItem.endTime) {
                                                    // 查找授课教师、授课助教、服务OO、授课教室列表
                                                    this.changeSearchTime(this.editItem.startTime, this.editItem.endTime, 'new');
                                                }
                                                this.unitTime = Number(this.editItem.duration) / Number(this.editItem.hours);
                                                this.addObj.duration = this.editItem.duration;
                                                this.addObj.status = 'unAttendClass';
                                                this.addObj.statusName = this.$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1043');
                                                this.addObj.isConflict = 0;
                                                this.addModal = true;
                                            });
										}
									}
								},
								this.$t('classroom_allscore_52')
							) : '' ,

							(this.myButtonPrem && this.myButtonPrem.indexOf('deleteLesson') > -1) ? h(
								"a",
								{
									style: {
										"margin-left": "5px",
                                    },
                                    class: {
                                        'unClick': params.row.status != 'unAttendClass' && params.row.status != 'unAttendance',
                                    },
									on: {
										click: () => {
											if(params.row.status == 'unAttendClass' || params.row.status == 'unAttendance'){
												this.$Modal.confirm({
													title: this.$t('modules_spoc_jw_web_src_views_classstudentmanage_printstudentcard_2813'),
													content: this.$t('scoretemplate_scoretemplate_561') + '<span style="color: #FAAD14;">' + this.$t('classlist_compontents_detailinfo_46') + '</span>' + this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_3007'),
													onOk: () => {
														this.deleteById(
															params.row.id
														);
													},
													onCancel: () => {}
												});
											}
										}
									}
								},
								this.$t('classlist_compontents_detailinfo_46')
							) : '',

							params.row.status == 'unAttendClass' && params.row.isBeginClass == '1'? h(
								"a",
								{
									style: {
										"margin-left": "5px",
                                    },
									on: {
										click: () => {
											this.updateStatus(params.row.id);
										}
									}
								},
								this.$t('classlist_compontents_detailinfo_461')
							) : ''
						]);
					}
				}
			],
			tableData: [],
			btnList: [
				[
					{
						style: {},
						type: '',
						btnClick: this.isExport,
						text: this.$t('integralflow_4'),
						value:'1',
						parentName:this.$t('integralflow_5')
					},
					{
						style: {},
						type: '',
						btnClick: this.isExport,
						text: this.$t('integralflow_6'),
						value:'2',
						parentName:this.$t('integralflow_5')
					},
				],
			],
            ruleAddObj: {
                _startDate: [{ required: true, type: 'date', message: this.$t('courselist_compontents_modify_179'), trigger: 'change' }],
                courseTime: [{ required: true, validator: validatePass, message: this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_classruletable_2567'), trigger: 'change' }],
                hours: [{ required: true, type: 'number', message: this.$t('courselist_compontents_modify_185'), trigger: 'change'}],
                teacherId: [{required: true, message: this.$t('courselist_compontents_modify_188'), trigger: 'change'}],
                classTeacherId: [{required: true, message: this.$t('courselist_compontents_modify_194'), trigger: 'change'}],
                classroomId: [{required: true, message: this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2637'), trigger: 'change'}]
			},
			searchObj:{}
		};
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		updateStatus(id){
			this.updateLoadingStatus({ isLoading: true });
			jwLesson.updateStatus({id})
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.pageNo = 1;
					this.getListData();
                } else {
                    this.updateLoadingStatus({ isLoading: false });
                }
            })
            .catch(errors.call(this))
            .finally(() => {

            });
		},
		resetDefaultCol(){
			this.updateLoadingStatus({ isLoading: true });
			jwLesson.clearShowField({pageIdentifier: "jwLesson/listPage"})
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.getShowTitle(true);
                } else {
                    this.updateLoadingStatus({ isLoading: false });
                }
            })
            .catch(errors.call(this))
            .finally(() => {

            });
        },
		classRoomListFn(currOfficeId){
          	let params = {
				pagesize: -1,
            };
            if(currOfficeId) params.officeId = currOfficeId;
			common.jwComClassroomListPage(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
					let _data = res.data.data
                    this.classroomIdList = _data.list || [];
                }
            })
            .catch(errors.call(this))
            .finally(() => {
            });
		},
        getForm(id, callback) {
            jwLesson.form({id})
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.editItem = Object.assign({}, res.data.data);
                    callback && callback();
                } else {
					this.updateLoadingStatus({
						isLoading: false
					});
				}
            })
            .catch(errors.call(this))
            .finally(() => {
                // this.updateLoadingStatus({
                //     isLoading: false
                // });
            });
        },
		deleteById(id){
			this.updateLoadingStatus({
				isLoading: true
			});
			jwLesson
				.deleteById({
					id
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.pageNo = 1;
						this.getListData();
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		deleteByIds(id){
			if (!this.selection.length) {
				this.$Message.error(this.$t('importPage_warning1'));
				return;
			}
			let idList = [];
			let hasNoDel = false;
			this.selection.forEach(item => {
				if (item.status != 'unAttendClass' && item.status != 'unAttendance') {
					hasNoDel = true;
				}
				idList.push(item.id);
			});
			if(hasNoDel){
				this.$Message.error(this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_3016'));
				return;
			}
			this.$Modal.confirm({
				title: this.$t('modules_spoc_jw_web_src_views_classstudentmanage_printstudentcard_2813'),
				content: this.$t('scoretemplate_scoretemplate_561') + '<span style="color: #FAAD14;">' + this.$t('classlist_compontents_detailinfo_46') + '</span>' + this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_3017'),
				onOk: () => {
					this.updateLoadingStatus({
						isLoading: true
					});
					jwLesson
						.deleteByIds({
							ids: idList.join(',')
						})
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								this.selection = []
								this.pageNo = 1;
								this.getListData();
							}
						})
						.catch(errors.call(this))
						.finally(() => {
							this.updateLoadingStatus({
								isLoading: false
							});
						});
				},
				onCancel: () => {}
			});
		},
		setOptTime(flag){
			if(flag){
				this.courseTime = []
			}
		},
		changeDivHeight(height) {
			this.tableHeightOut = height;
		},
		change_startDate(val) {
			// console.log(val)
			if (val) {
				this.changeAllTime();
			} else {
				this.$set(this.addObj, "teacherId", "");
				this.$set(this.addObj, "assistId", "");
				this.$set(this.addObj, "classTeacherId", "");
				this.$set(this.addObj, "classroomId", "");

				this.addTeacherList = [];
				this.addAssistList = [];
				this.addClassTeacherList = [];
				this.classRoomList = [];
			}
		},
		changeSearchTime(startTime, endTime, flag) {
			this.listUnConflictedUsers(
				this.addObj.officeId,
				startTime,
				endTime,
                "teacher",
                flag
            );
            // if(flag && flag === 'edit') {
            //     console.log(this.addObj)
            //     if(this.addObj && this.addObj.assistName) this.getSearchList(10, this.addObj.assistName);
            //     if(this.addObj && this.addObj.classTeacherName) this.getSearchList(6, this.addObj.classTeacherName);
			// }
			// if(flag) {
            //     console.log(this.addObj)
			// 	this.getSearchList(10, flag, this.addObj.assistName, this.addObj.assistId);
            //     this.getSearchList(6, flag, this.addObj.classTeacherName, this.addObj.classTeacherId);
            // }
            
			this.listUnConflictedUsers(
				this.addObj.officeId,
				startTime,
				endTime,
                "assit",
                flag
			);
			this.listUnConflictedUsers(
				this.addObj.officeId,
				startTime,
				endTime,
                "classTeacher",
                flag
			);
			this.listUnConflictedRoomss(
				this.addObj.officeId,
				startTime,
                endTime,
                flag
			);
		},
		changeSchool(schoolId) {
			this.teacherId = "";
			this.assistId = "";
			this.classTeacherId = "";
			this.classroomId = "";

			//复选 已选项清空
			this.classIdList = [];

			//下拉菜单备选项清空
			this.classCourseList = [];
			this.teacherList = [];
			this.assistList = [];
			this.classTeacherList = [];
			this.classroomIdList = []
			this.classRoomListFn(schoolId);
			this.getClassCourseByOfficeId(schoolId);
			if (schoolId) {
				this.getUserByOfficeIdAndRoleId(schoolId, "teacher_id"); // 授课教师 teacher_id
				this.getUserByOfficeIdAndRoleId(schoolId, "assist_id"); // 授课助教 assist_id
				this.getUserByOfficeIdAndRoleId(schoolId, "class_teacher_id"); // 服务oo class_teacher_id
			}
		},
		listUnConflictedUsers(officeId, startTime, endTime, userType, flag) {
			jwLesson.listUnConflictedUsers({
                officeId,
                startTime,
                endTime,
                userType
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    if (userType == "teacher") {
                        this.addTeacherList = res.data.data;
                        if(flag && flag == 'edit') {
                            // 判断冲突
                            if(this.editItem.isConflict == '1' && this.editItem.conflictLessonInfo && this.editItem.conflictLessonInfo.length) {
                                let arr1 = [];
                                this.editItem.conflictLessonInfo.forEach(e => {
                                    arr1.push(e.conflictField);
                                });
                                if(arr1.indexOf('teacherId') == -1) {
                                    this.addTeacherList.unshift({
                                        id: this.editItem.teacherId,
                                        name: this.editItem.teacherName
                                    });
                                }
                            } else {
                                this.addTeacherList.unshift({
                                    id: this.editItem.teacherId,
                                    name: this.editItem.teacherName
                                });
                            }
                        } 
                        if(flag && flag == 'new') {
                            if(this.editItem.teacherId) {
                                let data = res.data.data.filter(item => {
                                    return item.id == this.editItem.teacherId;
                                });
                                if(!data || data.length == 0) this.addObj.teacherId = '';
                            }
                        }
                    }
                    if (userType == "assit") {
                        this.addAssistList = res.data.data;
                        if(flag && flag == 'edit') {
                            // 判断冲突
                            if(this.editItem.isConflict == '1' && this.editItem.conflictLessonInfo && this.editItem.conflictLessonInfo.length) {
                                let arr1 = [];
                                this.editItem.conflictLessonInfo.forEach(e => {
                                    arr1.push(e.conflictField);
                                });
                                if(arr1.indexOf('assistId') == -1) {
                                     this.addAssistList.unshift({
                                        id: this.editItem.assistId,
                                        name: this.editItem.assistName
                                    });
                                }
                            } else {
                                this.addAssistList.unshift({
                                    id: this.editItem.assistId,
                                    name: this.editItem.assistName
                                });
                            }
                        }
                        if(flag && flag == 'new') {
                            if(this.editItem.assistId) {
                                let data = res.data.data.filter(item => {
                                    return item.id == this.editItem.assistId;
                                });
                                if(!data || data.length == 0) this.addObj.assistId = '';
                            }
                        }
                    }
                    if (userType == "classTeacher") {
                        this.addClassTeacherList = res.data.data;
                        if(flag && flag == 'edit') {
                            // 判断冲突
                            if(this.editItem.isConflict == '1' && this.editItem.conflictLessonInfo && this.editItem.conflictLessonInfo.length) {
                                let arr1 = [];
                                this.editItem.conflictLessonInfo.forEach(e => {
                                    arr1.push(e.conflictField);
                                });
                                if(arr1.indexOf('classTeacherId') == -1) {
                                     this.addClassTeacherList.unshift({
                                        id: this.editItem.classTeacherId,
                                        name: this.editItem.classTeacherName
                                    });
                                }
                            } else {
                                this.addClassTeacherList.unshift({
                                    id: this.editItem.classTeacherId,
                                    name: this.editItem.classTeacherName
                                });
                            }
                        }
                        if(flag && flag == 'new') {
                            if(this.editItem.classTeacherId) {
                                let data = res.data.data.filter(item => {
                                    return item.id == this.editItem.classTeacherId;
                                });
                                if(!data || data.length == 0) this.addObj.classTeacherId = '';
                            }
                        }
                    }
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
		},
		listUnConflictedRoomss(officeId, startTime, endTime, flag) {
			jwLesson
				.listUnConflictedRoomss({
					officeId,
					startTime,
					endTime
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
                        this.classRoomList = res.data.data;
                        if(flag && flag == 'edit') {
                            // 判断冲突
                            if(this.editItem.isConflict == '1' && this.editItem.conflictLessonInfo && this.editItem.conflictLessonInfo.length) {
                                let arr1 = [];
                                this.editItem.conflictLessonInfo.forEach(e => {
                                    arr1.push(e.conflictField);
                                });
                                if(arr1.indexOf('classroomId') == -1) {
									this.classRoomList.unshift({
                                        id: this.editItem.classroomId,
                                        name: this.editItem.classroomName
                                    });
                                }
							} else {
                                this.classRoomList.unshift({
									id: this.editItem.classroomId,
									name: this.editItem.classroomName
								});
                            }
							// if(this.editItem.classroomId) {
							// 	console.log(this.editItem,222222222222)
                            //     let data = res.data.data.filter(item => {
                            //         return item.id == this.editItem.classroomId;
                            //     });
                            //     if(!data || data.length == 0) {
							// 		this.classRoomList.unshift({
                            //             id: this.editItem.classroomId,
                            //             name: this.editItem.classroomName
                            //         });
							// 	}
                            // }
                        }
                        if(flag && flag == 'new') {
                            if(this.editItem.classroomId) {
                                let data = res.data.data.filter(item => {
                                    return item.id == this.editItem.classroomId;
                                });
                                if(!data || data.length == 0) this.addObj.classroomId = '';
                            }
                        }
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		getClassCourseByOfficeId(schoolId) {
			jwManualSign
				.getClassCourseByOfficeId({
					officeId: schoolId
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.classCourseList = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		getUserByOfficeIdAndRoleId(schoolId, teacherType) {
			let param = {
				officeId: schoolId,
				teacherType
			};
			jwLesson
				.getUserByOfficeIdAndRoleId(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						if (teacherType == "teacher_id") {
							// 授课教师
							this.teacherList = res.data.data.filter(item => {
								return item != null;
							});
						}
						if (teacherType == "assist_id") {
							// 授课助教
							this.assistList = res.data.data.filter(item => {
								return item != null;
							});
						}
						if (teacherType == "class_teacher_id") {
							// 服务oo
							this.classTeacherList = res.data.data.filter(
								item => {
									return item != null;
								}
							);
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					//this.updateLoadingStatus({ isLoading: false });
				});
		},
		getSchools() {
			sysUser
				.dataScopeFilter()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.schoolList = res.data.data;
						waitUntil(
							() => {
								if (this.app.currOfficeId) {
									this.officeId = this.app.currOfficeId == 'all' ? '' : this.app.currOfficeId;
								}
								return (this.app.currOfficeId && this.buttonPerm && this.buttonPerm["jw.scheduleManageList"])|| false;
							},
							() => {
								console.log(this.buttonPerm)
								if (this.myButtonPrem && this.myButtonPrem.indexOf('deleteLesson') > -1){
									this.btnList.unshift(
										{
											style: {},
											type: "",
											btnClick: this.deleteByIds,
											text: this.$t('spoc_hootie_web_481')
										}
									)
								}
								if (this.myButtonPrem && this.myButtonPrem.indexOf('sync') > -1){
									this.btnList.unshift(
										{
											style: {},
											type: "",
											btnClick: this.doSync,
											text: this.$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2806')
										}
									)
								}
								// if (this.myButtonPrem && this.myButtonPrem.indexOf('batchAttendance') > -1){
								// 	this.btnList.unshift(
								// 		{
								// 			style: {},
								// 			type: "",
								// 			btnClick: this.doAttendance,
								// 			text: this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_3020')
								// 		}
								// 	)
								// }
								// if (this.myButtonPrem && this.myButtonPrem.indexOf('batchNoAttendance') > -1){
								// 	this.btnList.unshift(
								// 		{
								// 			style: {},
								// 			type: "",
								// 			btnClick: this.doUnattendance,
								// 			text: this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_3021')
								// 		}
								// 	)
								// }

								this.courseTime = defaultDatePickerValue()
								this.options3 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))

								this.getListData();
								this.changeSchool(this.officeId)
								this.classRoomListFn(this.officeId);
							}
						);
					} else {
						this.$Message.error(res.data.message);
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		changeType() {
			if (this.type) {
				this.searchSelectTypeId = this.jw_course_type.filter(item => {
					return item.value == this.type;
				})[0].value;
			} else {
				this.searchSelectTypeId = "";
			}
			this.grade = "";
		},
		getCourseType() {
			let types = "jw_course_type,jw_lesson_status"; //,jw_course_grade' //课程包分类,适用年级
			sysDict
				.batchListData({
					types
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.jw_course_type = res.data.data.jw_course_type;
						this.jw_lesson_status = res.data.data.jw_lesson_status;
						//this.jw_course_grade = res.data.data.jw_course_grade
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});

			let type = "jw_course_type";
			sysDict
				.findChildDictByParentDict({
					type
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.jw_course_grade = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		changeAllTime() {
			let courseTime = this.addObj.courseTime; //上课时间  hh:mm
			let hours = this.addObj.hours; //课时
			let _startDate = this.addObj._startDate; //上课日期

			if (courseTime && hours && _startDate) {
				this.$set(this.addObj, "teacherId", "");
				this.$set(this.addObj, "assistId", "");
				this.$set(this.addObj, "classTeacherId", "");
				this.$set(this.addObj, "classroomId", "");
				this.addTeacherList = [];
				this.addAssistList = [];
				this.addClassTeacherList = [];
				this.classRoomList = [];

				let day = new Date(_startDate).format("yyyy-MM-dd");
				let startTime = day + " " + courseTime + ":00";
				let startDay = new Date(startTime).getTime();
				let endTime = new Date(
					// startDay + hours * 45 * 60 * 1000
					startDay + hours * this.unitTime * 60 * 1000
				).format("yyyy-MM-dd hh:mm:ss");
				console.log(startTime);
				console.log(endTime);
				this.changeSearchTime(startTime, endTime);
			}
		},
		changeHours() {
			//选择课时。计算出时长
			if (this.addObj.hours) {
				this.$set(this.addObj, "duration", this.unitTime * this.addObj.hours);
				// this.$set(this.addObj, "duration", 45 * this.addObj.hours);
				this.changeAllTime();
			}
		},
		changeTime(flag) {
			if (!flag && this.addObj.courseTime != this.courseTimeOld) {
				// 关闭日期选择时才触发
				this.courseTimeOld = this.addObj.courseTime;
				this.changeAllTime();
			}
		},
		saveOk() {
			console.log(this.addObj._startDate, this.addObj.hours, this.addObj.courseTime)
			if(this.addObj._startDate){
				this.addObj._startDate = new Date(this.addObj._startDate)
			}
			if (
				this.addObj._startDate &&
				this.addObj.hours &&
				this.addObj.courseTime
			) {
				let dateStr = new Date(this.addObj._startDate).format(
					"yyyy-MM-dd"
				);
				this.addObj.startDate = dateStr;
				this.addObj.startTime =
					dateStr + " " + this.addObj.courseTime + ":00";
				let startDay = new Date(this.addObj.startTime).getTime();
				let endTime = new Date(
					// startDay + this.addObj.hours * 45 * 60 * 1000
					startDay + this.addObj.hours * this.unitTime * 60 * 1000
				).format("yyyy-MM-dd hh:mm:ss");
				this.addObj.endTime = endTime;
				this.addObj.objectType = "class course";
			}
			console.log(this.addObj)
			this.$refs.createCoursePackRef.validate(validRes => {
				console.log(validRes)
				if (validRes) {
					if(this.isActioning){ //多次提交拦截
						return
					}
					this.isActioning = true
					this.updateLoadingStatus({
						isLoading: true
					});
					jwLesson.save(this.addObj)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.addModal = false;
                            this.$Message.info(this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_3022'));
                            this.pageNo = 1;
                            this.getListData();
                        } else {
                            this.addModalLoading = false;
                            this.addModal = true;
                            setTimeout(() => {
                                this.addModalLoading = true;
                            }, 0);
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        this.updateLoadingStatus({
                            isLoading: false
                        });
                        setTimeout(()=>{
                            //多次提交拦截
                            this.isActioning = false
                        },200)
                    });
				} else {
					this.addModalLoading = false;
					this.addModal = true;
					setTimeout(() => {
						this.addModalLoading = true;
					}, 0);
				}
			});
		},
		saveCancel() {},
		//获取数据，根据情况修改接口、传参
		getListData() {
			this.selection = []
			this.updateLoadingStatus({
				isLoading: true
			});
			this.currentPage = this.pageNo;
			let param = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				officeId: this.officeId,
				startDate:  this.courseTime[0] ? new Date(this.courseTime[0]).format('yyyy-MM-dd 00:00:00') : '',
				endDate: this.courseTime[1] ? new Date(this.courseTime[1]).format('yyyy-MM-dd 23:59:59') : '',
				classIdList: this.classIdList,
				type: this.type,
				grade: this.grade,
				teacherId: this.teacherId,
				assistId: this.assistId,
				classTeacherId: this.classTeacherId,
				isSync: this.isSync,
				orderByType: "",
				orderByStatus: "1",
				status: this.status,
				isConflict: this.isConflict,
				classroomId: this.classroomId
			};
			if (this.sortObj.order != "normal" && this.sortObj.key) {
				param.orderByType = this.sortObj.key;
				param.orderByStatus = this.sortObj.order == "asc" ? "1" : "2";
			}
			this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
			// console.log(param)
			jwLesson
				.listPage(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data;
						this.tableData = result.list;
						this.dataTotal = result.total;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		//分页方法 如果有分页则为必须方法，修改getCourseList为自己的获取数据方法 这里注意。不再有每页个数改变的方法了
		pageChange(pageNo, pageSize) {
			if (!pageNo) {
				//防止无用重复请求
				return;
			}
			this.pageNo = pageNo;
			this.pageSize = pageSize;
			this.getListData();
		},
		//如果有排序字段则为 必须方法，修改getCourseList为自己的获取数据方法
		sortChange(obj) {
			// console.log(obj) // {key: "createByName" ,order: "desc"}
			this.sortObj = obj;
			this.getListData();
		},
		//可选方法，如果是多选的话必须有
		selectionChange(selection) {
			// console.log(selection)
			this.selection = selection;
		},
		isExport(val) {
			//这里val的值。是根据设置下拉类型button设定的值来匹配判断
			if(val == '1' && this.dataTotal > 10000){
                this.$Message.error(this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_30231'));
				return
			}
            if (val == "2" && !this.selection.length) {
                this.$Message.error(this.$t('scoretemplate_scoretemplate_572'));
                return;
            }
            let searchObj = this.searchObj;
            delete searchObj.pageNo
            delete searchObj.pageSize
            if (val == "2") {
                //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
                searchObj = {
                    ids: this.selection.map(item => {
                        return item.id;
                    })
                };
            }
            this.$refs.exportModal.noShowExport(this.exportMethod, searchObj);
        },
		showReportClose() {
			this.schedule = 0;
			this.showReport = false;
			this.pageNo = 1;
			this.getListData();
		},
		downErrorReport() {
			this.schedule = 0;
			this.showReport = false;
			window.open(jwLesson.downReport());
			this.pageNo = 1;
			this.getListData();
			// jwLesson.downReport()
			// .then(valid.call(this))
			// .then(res => {
			//     if (res.ok) {
			//     }
			// })
			// .catch(errors.call(this))
			// .finally(() => {
			//     this.updateLoadingStatus({ isLoading: false });
			// });
		},
		getSyncSchedule() {
			this.schedule = 0;
			this.showSchedule = true;
			let _this = this;
			myInterval = setInterval(function() {
				//_this.schedule = _this.schedule + 1
				_this.doGetSyncSchedule();
			}, 1000);
		},
		doGetSyncSchedule() {
			this.updateLoadingStatus({ isLoading: true });
			jwLesson
				.getSyncSchedule()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.schedule = parseInt(res.data.data.schedule);
						if (this.schedule == 100) {
							clearInterval(myInterval);
							let _this = this;
							setTimeout(() => {
								_this.showSchedule = false;
								_this.showReport = true;
								_this.reportData =
									res.data.data.data.allReportList;
								_this.totalReportFailNum =
									res.data.data.data.allReportList.length ||
									0;
							}, 1000);
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		doSync() {
			if (!this.selection.length) {
				this.$Message.error(this.$t('importPage_warning1'));
				return;
			}
			let idList = [];
			let hasIsSync = false;
			this.selection.forEach(item => {
				if (item.isSync == "1") {
					hasIsSync = true;
				}
				idList.push(item.id);
			});
			this.totalReportNum = idList.length;
			if (hasIsSync) {
				this.$Message.error(
					this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_3024')
				);
				return;
			}
			this.updateLoadingStatus({ isLoading: true });
			jwLesson
				.listTransferLessons({
					ids: idList //.join(",")
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.selection = []
						this.getSyncSchedule();
						// this.$Message.info('同步数据成功')
						// this.pageNo = 1
						// this.getListData()
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		doAttendance() {
			if (!this.selection.length) {
				this.$Message.error(this.$t('importPage_warning1'));
				return;
			}
			let canDoAction = false
			let idList = []
			this.selection.forEach(item => {
				idList.push(item.id)
				if(item.status == 'unAttendClass' || item.status == 'unNormal'){
					canDoAction = true
				}
			});

			if(canDoAction){
				this.$Message.error(this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_3025'));
				return;
			}
			this.updateLoadingStatus({ isLoading: true });
			jwLesson
				.batchAttendance({
					ids: idList.join(",")
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.selection = []
						this.$Message.info(this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_3026'));
						this.pageNo = 1;
						this.getListData();
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		doUnattendance() {
			if (!this.selection.length) {
				this.$Message.error(this.$t('importPage_warning1'));
				return;
			}
			let canDoAction = false
			let idList = []
			this.selection.forEach(item => {
				idList.push(item.id)
				if(item.status == 'unAttendClass' || item.status == 'unNormal'){
					canDoAction = true
				}
			});

			if(canDoAction){
				this.$Message.error(this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_3025'));
				return;
			}
			this.updateLoadingStatus({ isLoading: true });
			jwLesson
				.batchUnAttendance({
					ids: idList.join(",")
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.selection = []
						this.$Message.info(this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_3027'));
						this.pageNo = 1;
						this.getListData();
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		//必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
		getShowTitle(closeLoad) {
			jwLesson
				.getShowTitle({
					pageIdentifier: "jwLesson/listPage",
					lang: this.$i18n.locale
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.defaultShowCol = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					if(closeLoad){
                        this.updateLoadingStatus({ isLoading: false });
                    }
				});
		},
		doSearch() {
			this.pageNo = 1;
			this.getListData();
		},
		resetSearch() {
			this.officeId = this.app.currOfficeId == 'all' ? '' : this.app.currOfficeId;
			this.isConflict = ''
			this.classCourseList = [];
			this.teacherList = [];
			this.assistList = [];
			this.classTeacherList = [];
			this.courseTime = defaultDatePickerValue();
			this.classIdList = [];
			this.type = "";
			this.grade = "";
			this.teacherId = "";
			this.assistId = "";
			this.classTeacherId = "";
			this.isSync = '';
			this.pageNo = 1;
			this.pageSize = this.$store.state.app.pageSizeGlobal;
			this.searchSelectTypeId = "";
			this.status = ''
			this.getListData();
			this.changeSchool(this.officeId)
        },
        assistRemote(query) {
			// 授课助教roleId=10
            if (query !== "") { 
                this.debounce(10, query);
            } else { 
                this.addAssistList = []; 
            }
        },
        classTeacherRemote(query) {
            // 服务oo roleId=6
            if (query !== "") { 
                this.debounce(6, query);
            } else { 
                this.addClassTeacherList = []; 
            }
		},
        debounce(num, query) {
            // 防抖 500ms内没有输入文字，才开始查询，防止多次发起请求
            if(this.timer) {
                clearTimeout(this.timer);
                this.timer = null; 
            }
            this.timer = setTimeout(() => { 
                this.getSearchList(num, query);
            }, 500); 
        },
        getSearchList(roleId, type, name, id) {
			// if (!this.formValidate.officeId) {
			// 	this.$Message.error("请先选择所属校区");
			// 	return;
			// }
			let param = {
				roleId,
				pageSize: 0,
				pageNo: 1,
				isService: 1,
				isEnable: 1,
				officeId: this.officeId,
				name: '' //query
			};
			sysUser.userListRoleUser(param)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    if (roleId == 10) {
						// 授课助教
						let resList = res.data.data.list
						let data = resList.filter(item => {
							return item.id == this.addObj.assistId;
						});
						if(!data || data.length == 0){
							if(type == 'new'){
								this.addObj.assistId = '';
								this.addObj.assistName = '';
							} 
							if(type == 'edit') {
								if(this.addObj.assistId && this.addObj.assistName){
									resList.unshift({
										id: this.addObj.assistId,
                                        name: this.addObj.assistName
									})
								} else {
									this.addObj.assistId = '';
									this.addObj.assistName = '';
								}
							}
						}
                        this.addAssistList = resList;
                    }
                    if (roleId == 6) {
						// 服务oo
						let resList = res.data.data.list
						let data = resList.filter(item => {
							return item.id == this.addObj.classTeacherId;
						});
						if(!data || data.length == 0){
							if(type == 'new'){
								this.addObj.classTeacherId = '';
								this.addObj.classTeacherName = '';
							} 
							if(type == 'edit') {
								if(this.addObj.classTeacherId && this.addObj.classTeacherName){
									resList.unshift({
										id: this.addObj.classTeacherId,
                                        name: this.addObj.classTeacherName
									})
								} else {
									this.addObj.classTeacherId = '';
									this.addObj.classTeacherName = '';
								}
							}
						}
                        this.addClassTeacherList = resList;
                    }
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.$nextTick(()=>{
					this.updateLoadingStatus({
						isLoading: false
					});
				})
            });
		},
	},
	watch: {
		"app.currOfficeId": function(val, oldVal) {
			if (oldVal && this.$route.name == 'jw.scheduleManageList') {
				this.officeId = val == 'all' ? '' : val;
				this.getListData();
				this.changeSchool(this.officeId)
			}
		}
	}
};
</script>
