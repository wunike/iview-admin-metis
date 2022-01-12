<style lang="less">
.sortClassStyle {
	.tableNamespan {
		color: #44bcb7;
		font-size: 16px;
		font-family: HiraginoSansGB-W3;
		font-weight: normal;
	}
	.ivu-table-wrapper {
		overflow: visible !important;
	}
	.ivu-table .demo-table-info-row td {
		background-color: red;
		color: #fff;
	}
}
.mytable {
	margin-top: 10px;
	width: 100%;
	background: rgba(255, 255, 255, 1);
	border-radius: 4px;
	padding: 0 16px;
	//  .ivu-table .demo-table-info-row td{
	// 		background-color: #ddd;
	// 		color: #aaa;
	// 	}
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
</style>
<template>
	<div class="sortClassStyle">
		<detailInfo>
			<div slot="classtitle">
				<div class="title">
					<span>{{classData.name}}</span>
				</div>
			</div>
			<div slot="classDetail">
				<div class="classDetail">
					<div class="classDetailRow">
						<span>{{$t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2427')}}<span>{{classData.grade}}</span>
						</span>
						<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2653')}}<span>{{classData.teacherName}}</span>
						</span>
						<span>{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2394')}}<span>{{classData.courseName}}</span>
						</span>
					</div>
					<div class="classDetailRow">
						<span>{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2389')}}<span>{{`${classData.actualMemberCount}/${classData.memberCount}`}}</span>
						</span>
						<span>{{$t('courselist_compontents_modify_190')}}<span>{{classData.assistName}}</span>
						</span>
						<span style="white-space: nowrap;">{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2395')}}<span>{{classData.startDate}}</span>
						</span>
					</div>
					<div class="classDetailRow">
						<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2658')}}<span>{{`${classData.finishCourseHour}/${classData.courseHour}`}}</span>
						</span>
						<span>{{$t('courselist_compontents_modify_193')}}<span>{{classData.classTeacherName}}</span>
						</span>
					</div>
				</div>
			</div>
		</detailInfo>
		<detailInfo style="margin-top:16px">
			<div slot="classDetail">
				<div class="classDetail">
					<div class="classDetailRow">
						<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2660')}}<span>{{classData.courseHour}}</span>
						</span>
					</div>
                    <div class="classDetailRow">
						<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2661')}}<span>{{classData.expandHour || 0}}</span>
						</span>
					</div>
					<div class="classDetailRow">
						<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2662')}}<span>{{classData.arrangedHour}}</span>
						</span>
					</div>
					<div class="classDetailRow">
						<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2663')}}<span>{{Number(classData.courseHour) + Number(classData.expandHour || 0) - Number(classData.arrangedHour)}}</span>
						</span>
					</div>
					<div class="classDetailRow">
						<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2664')}}<span>{{classData.attendanceHour}}</span>
						</span>
					</div>
					<div class="classDetailRow">
						<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2665')}}<span>{{classData.finishCourseHour}}</span>
						</span>
					</div>
				</div>
			</div>
		</detailInfo>
		<v-search-collapse @search="getListData" @reset="resetSearch" style="margin-top: 10px;">
			<DatePicker
				style="width:224px"
				type="daterange"
				:placeholder="$t('courselist_compontents_modify_180')"
				v-model="courseTime"
				@on-change="searchCourseTime"
			></DatePicker>
		</v-search-collapse>
		<big-table
			v-if="defaultShowCol"
			class="mytable"
			:tableData="tableData"
			:tableName="tableName"
			:tableHeightOut="tableHeightOut"
			:tableColumnArray="tableColumnArray"
			:defaultShowCol="defaultShowCol"
			:btnList="btnList"
			:canSelection="true"
			:updateShowTitleMethod="updateShowTitle"
			updateShowTitleKey="jwLesson/listPage/sortClass"
			:dataTotal="dataTotal"
			:isShowSelectTableColumn="true"
			:pageNo="pageNo"
			@resetDefault="resetDefaultCol"	
			@selectionChange="selectionChange"
			@pageChange="pageChange"
			@sortChange="sortChange"
		></big-table>
		<export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
		<Modal
			v-model="addModal"
			:loading="addModalLoading"
			:title="openType == 'add'? $t('modules_spoc_jw_web_src_views_classmanage_sortclass_sortclass_2755'): $t('modules_spoc_jw_web_src_views_classmanage_sortclass_sortclass_2756')"
			width="800"
			:mask-closable="false"
			@on-ok="saveOk"
			@on-cancel="saveCancel"
		>
			<Form ref="createCoursePackRef" :model="addObj" class="editScheduleModel" :label-width="125">
				<FormItem :label="$t('courselist_compontents_modify_177')" class="w50" prop="className">{{addObj.objectName}}</FormItem>
				<FormItem :label="$t('modules_spoc_core_web_src_views_customstate_customizestate_154')" class="w50" prop="statusName">{{addObj.statusName}}</FormItem>
				<FormItem
					:label="$t('courselist_compontents_modify_178')"
					class="w50"
					prop="_startDate"
					:rules="{ required: true, type: 'date', message: $t('courselist_compontents_modify_179'), trigger: 'change' }"
				>
					<DatePicker
						@on-change="change_startDate"
						v-model="addObj._startDate"
						type="date"
						placement="bottom-start"
						:placeholder="$t('courselist_compontents_modify_180')"
						class="w250p"
					></DatePicker>
				</FormItem>
				<FormItem
					:label="$t('courselist_compontents_modify_181')"
					class="w50"
					prop="courseTime"
					:rules="{ required: true, validator: validatePass, message: $t('modules_spoc_jw_web_src_views_classmanage_createclass_components_classruletable_2567'), trigger: 'change' }"
				>
						<!-- :steps="[1, 10]" -->
					<TimePicker
						v-model="addObj.courseTime"
						format="HH:mm"
						type="time"
						placement="bottom-start"
						@on-change="changeTime"
						separator=" ~ "
						:placeholder="$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_classruletable_2567')"
						class="w250p"
					></TimePicker>
				</FormItem>
				<FormItem
					:label="$t('courselist_compontents_modify_184')"
					class="w50"
					prop="hours"
					:rules="{ required: true, type: 'number', message: $t('courselist_compontents_modify_185'), trigger: 'change'}"
				>
					<InputNumber :min="0" v-model="addObj.hours" class="w250p" @on-change="hourChange"></InputNumber>
				</FormItem>
				<FormItem :label="$t('courselist_compontents_modify_186')" class="w50" prop="duration">{{$t('modules_spoc_jw_web_src_views_classmanage_sortclass_sortclass_2766', [addObj.duration])}}</FormItem>
				<FormItem
					:label="$t('courselist_compontents_modify_187')"
					class="w50"
					prop="teacherId"
					:rules="{required: true, message: $t('courselist_compontents_modify_188'), trigger: 'change'}"
				>
					<Select v-model="addObj.teacherId" class="w250p" filterable>
						<Option v-if="openType== 'edit'" :value="addObjOption.teacherId">{{addObjOption.teacherName}}</Option>
						<Option :value="item.id" v-for="(item, index) in addTeacherList" :key="index">{{item.name}}</Option>
					</Select>
				</FormItem>
				<FormItem
					:label="$t('courselist_compontents_modify_190')"
					class="w50"
					prop="assistId"
					:rules="{required: false, message: $t('courselist_compontents_modify_191'), trigger: 'change'}"
				>
					<Select v-model="addObj.assistId" class="w250p" filterable clearable>
						<Option v-if="openType== 'edit'" :value="addObjOption.assistId">{{addObjOption.assistName}}</Option>
						<Option :value="item.id" v-for="(item, index) in addAssistList" :key="index">{{item.name}}</Option>
					</Select>
				</FormItem>
				<FormItem
					:label="$t('courselist_compontents_modify_193')"
					class="w50"
					prop="classTeacherId"
					:rules="{required: true, message: $t('courselist_compontents_modify_194'), trigger: 'change'}"
				>
					<Select v-model="addObj.classTeacherId" class="w250p" filterable>
						<Option
							v-if="openType== 'edit'"
							:value="addObjOption.classTeacherId"
						>{{addObjOption.classTeacherName}}</Option>
						<Option
							:value="item.id"
							v-for="(item, index) in addClassTeacherList"
							:key="index"
						>{{item.name}}</Option>
					</Select>
				</FormItem>
				<FormItem
					:label="$t('courselist_compontents_modify_196')"
					class="w50"
					prop="classroomId"
					:rules="{required: true, message: $t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2637'), trigger: 'change'}"
				>
					<Select v-model="addObj.classroomId" class="w250p" filterable>
						<Option
							v-if="openType== 'edit'"
							:value="addObjOption.classroomId"
						>{{addObjOption.classroomName}}</Option>
						<Option :value="item.id" v-for="(item, index) in classRoomList" :key="index">{{item.name}}</Option>
					</Select>
				</FormItem>
			</Form>
		</Modal>
	</div>
</template>
<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import bigTable from "@public/modules/bigTable.vue";
import exportModal from "@public/modules/exportModal.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import valid, {
	common,
	errors,
	jwClassCourse,
	jwLesson
} from "../../../libs/request";
import tableDropdown from "@public/modules/tableDropdown";
import detailInfo from "./compontents/detailInfo";
import { log } from "util";
// import ModifySortClass from "./compontents/ModifySortClass";
export default {
	name: "jw.classManage.sortClass",
	components: {
		bigTable,
		exportModal,
		vSearchCollapse,
		tableDropdown,
		detailInfo
		// ModifySortClass
	},
	computed: {
		...mapState(["userInfo"])
	},
	mounted() {
		this.getShowTitle();
		this.getListData();
		this.classGetData();
	},
	data() {
		return {
			isActioning: false, //多次提交拦截
			endHour: "",
			tableHeightOut: 72 + 185 + 61 + 32, //324,
			orderByStatus: 1,
			openType: "add",
			addObjOption: {},
			addTeacherList: [],
			addAssistList: [],
			addClassTeacherList: [],
			classRoomList: [],
			addModal: false,
			addModalLoading: true,
			addObj: {},
			startDate: "",
			endDate: "",
			courseTime: [],
			classData: {},
			tableName: this.$t('modules_spoc_jw_web_src_views_classmanage_sortclass_sortclass_2773'),
			selection: [],
			updateShowTitle: jwLesson.updateShowTitle,
			// exportMethod: jwCourse.listPage, //导出用到的方法对象
			exportMethod: common.jwCourseListPage, //导出用到的方法对象
			defaultShowCol: null,
			dataTotal: 0,
			pageNo: 1,
			pageSize: this.$store.state.app.pageSizeGlobal,
			tableColumnArray: [
				{
					// title: "上课时间",
					key: "lessTime",
					sortable: true
				},
				{
					// title: "扣费金额",
					key: "deductTotalPrice",
					 render:(h,params)=>{
                         return h('div',[
                             h("div",{},Number(params.row.deductTotalPrice).toFixed(2))
                         ])
                    }
				},
				{
					title: this.$t('classlist_compontents_detailinfo_45'),
					key: "doAction",
					fixed: "right",
					width: 80,
					render: (h, params) => {
						// debugger
						let stop = "";
						return h("div", [
							//  (this.userInfo.admin||this.userInfo.roleId==8)&&
							/* 
								1.现改为只有CM(校长)、管理员可删除课次
								2.其他用户登录时，隐藏或置灰删除按钮
								3.已经完成考勤的不能删除
								*/
							this.userInfo.admin ||
							this.userInfo.roleIdList.indexOf("8") >= 0
								? h(
										"a",
										{
											style: {
												color:
													params.row.status ==
													"finishAttendance"
														? "#ccc"
														: ""
											},
											on: {
												click: () => {
													if (
														params.row.status ==
														"finishAttendance"
													) {
														return;
													}
													this.$Modal.confirm({
														title:
															"确认<span style='color: #FAAD14;'>删除</span>此班课课程吗？",
														content:
															"确认后此班课课程将永久删除。",
														onOk: () => {
															this.deleteById(
																params.row.id
															);
														},
														onCancel: () => {}
													});
												}
											}
										},
										"删除"
								  )
								: "",
							h(
								"a",
								{
									style: {
										marginLeft: "16px",
										color:
											params.row.statusLabel != "未上课"
												? "#ccc"
												: ""
									},
									on: {
										click: () => {
											if (
												params.row.statusLabel !=
												"未上课"
											) {
												return;
											}
											this.addTeacherList = [];
											this.addAssistList = [];
											this.addClassTeacherList = [];
											this.classRoomList = [];
											this.addObjOption = Object.assign(
												{},
												params.row
											);
											this.addObj = Object.assign(
												{},
												params.row
											);
											this.addObj.objectName = this.classData.name;
											this.addObj.objectId = this.classData.id;
											this.addObj.officeId = this.classData.office.id;
											this.addObj.statusName = this.addObj.statusLabel;
											this.addObj._startDate = new Date(
												this.addObj.startDate
											);
											this.addObj.objectType = this.classData.type;
											this.addObj.isConflict = 0;

											let lessTime = params.row.lessTime;
											let lessTimeArray = lessTime.split(
												"-"
											);
											/* let hours0 = Number(lessTimeArray[0].split(':')[0])
												let hours1 = Number(lessTimeArray[1].split(':')[0])
												let miunte0 = Number(lessTimeArray[0].split(':')[1])
												let miunte1 = Number(lessTimeArray[1].split(':')[1]) */
											this.endHour = lessTimeArray[1];
											let miuntes =
												this.addObj.hours * Number(this.classData.courseUnitMinute);
												// this.addObj.hours * this.classData.comProductPrice.duration;
												// this.addObj.hours * 45;
											this.$set(
												this.addObj,
												"duration",
												miuntes
											);

											/* let _hours0 = hours0 < 10 ? '0' + hours0 : hours0
												let _hours1 = hours1 < 10 ? '0' + hours1 : hours1
												let _miunte0 = miunte0 < 10 ? '0' + miunte0 : miunte0
												let _miunte1 = miunte1 < 10 ? '0' + miunte1 : miunte1 */
											// this.addObj.courseTime = [_hours0 + ':' + _miunte0, _hours1 + ':' + _miunte1]
											this.addObj.courseTime =
												lessTimeArray[0];
											this.addObj.startTime =
												this.addObj.startDate +
												" " +
												lessTimeArray[0] +
												":00";
											this.addObj.endTime =
												this.addObj.startDate +
												" " +
												lessTimeArray[1] +
												":00";

											this.openType = "edit";
											this.changeSearchTime(
												this.addObj.startTime,
												this.addObj.endTime
											);
											this.addModal = true;
											// this.$refs[
											// 	"ModifySortClassRef"
											// ].ModifySortClassMethod("modify");
										}
									}
								},
								"修改"
							)
						]);
					}
				}
			],
			tableData: [],
			btnList: [
				// {
				// 	style: {},
				// 	type: "",
				// 	btnClick: this.noCheck,
				// 	text: "批量未考勤"
				// },
				{
					style: {},
					type: "",
					btnClick: this.moreDel,
					text: "批量删除"
				},
				{
					style: {},
					type: "",
					btnClick: this.addClass,
					text: "添加单次排课"
				},
				{
					style: {},
					type: "",
					btnClick: this.addClassMore,
					text: "批量添加排课"
				}
			],
			validatePass: (rule, value, callback) => {
				if (!value || value[0] === "") {
					callback(new Error("请选择上课时间范围"));
				} else {
					callback();
				}
			},
			errorList: []
		};
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		resetDefaultCol(){
			this.updateLoadingStatus({ isLoading: true });
            jwLesson.clearShowField({
                pageIdentifier: "jwLesson/listPage/sortClass",
            })
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
		rowClassName(row, index) {
			if (this.errorList.includes(row.id)) {
				return "demo-table-info-row";
			}
			return "";
		},
		sortChange(val) {
			if (val.order == "asc") {
				//升序
				this.orderByStatus = 1;
			} else {
				//desc 降序
				this.orderByStatus = 2;
			}
			this.getListData();
		},
		listUnConflictedRoomss(officeId, startTime, endTime) {
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
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		listUnConflictedUsers(officeId, startTime, endTime, userType) {
			jwLesson
				.listUnConflictedUsers({
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
						}
						if (userType == "assit") {
							this.addAssistList = res.data.data;
						}
						if (userType == "classTeacher") {
							this.addClassTeacherList = res.data.data;
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		changeSearchTime(startTime, endTime) {
			this.listUnConflictedUsers(
				this.addObj.officeId,
				startTime,
				endTime,
				"teacher"
			);
			this.listUnConflictedUsers(
				this.addObj.officeId,
				startTime,
				endTime,
				"assit"
			);
			this.listUnConflictedUsers(
				this.addObj.officeId,
				startTime,
				endTime,
				"classTeacher"
			);
			this.listUnConflictedRoomss(
				this.addObj.officeId,
				startTime,
				endTime
			);
		},
		changeTime(changeval) {
			// debugger
			let date = changeval;
			let hours = this.addObj.hours;
			if (date && hours) {
				this.timeChange(date, hours);
			} else {
				this.addObj.startTime = "";
				this.addObj.endTime = "";
				this.addObj.duration = 0;
				this.addObj.teacherId = "";
				this.addObj.assistId = "";
				this.addObj.classTeacherId = "";
				this.addTeacherList = [];
				this.addAssistList = [];
				this.addClassTeacherList = [];
			}
			// }
		},
		hourChange(hours) {
			// debugger;
			if (this.addObj.courseTime && hours) {
				this.timeChange(this.addObj.courseTime, hours);
			} else {
				this.addObj.startTime = "";
				this.addObj.endTime = "";
				this.addObj.duration = 0;
				this.addObj.teacherId = "";
				this.addObj.assistId = "";
				this.addObj.classTeacherId = "";
				this.addTeacherList = [];
				this.addAssistList = [];
				this.addClassTeacherList = [];
			}
		},

		timeChange(val, hour, index) {
			let newTimes = hour * Number(this.classData.courseUnitMinute);
			// let newTimes = hour * this.classData.comProductPrice.duration;
			// let newTimes = hour * 45;
			this.$set(this.addObj, "duration", newTimes);
			let endH = Number(val.split(":")[0]) + Math.floor(newTimes / 60);
			let rightMin = Number(val.split(":")[1]) + (newTimes % 60);
			rightMin >= 60
				? (endH = (endH + 1) % 24) && (rightMin = rightMin % 60)
				: (endH = endH % 24);
			let endTime =
				("" + endH).padStart(2, "0").padEnd(3, ":") +
				("" + rightMin).padStart(2, "0");
			this.endHour = endTime;
			let day = new Date(this.addObj._startDate).format("yyyy-MM-dd");
			this.change_startDate(day);
			return this.endHour;
		},
		change_startDate(val) {
			if (val && this.addObj.courseTime && this.addObj.hours) {
				this.addObj.teacherId = "";
				this.addObj.assistId = "";
				this.addObj.classTeacherId = "";

				let startTime = val + " " + this.addObj.courseTime + ":00";
				let endTime = val + " " + this.endHour + ":00";
				this.changeSearchTime(startTime, endTime);
			} else {
				// debugger
				this.addObj.teacherId = "";
				this.addObj.assistId = "";
				this.addObj.classTeacherId = "";
				this.addTeacherList = [];
				this.addAssistList = [];
				this.addClassTeacherList = [];
			}
		},
		saveOk() {
			// debugger;
			if (this.addObj._startDate) {
				let dateStr = new Date(this.addObj._startDate).format(
					"yyyy-MM-dd"
				);
				this.addObj.startDate = dateStr;
				this.addObj.startTime =
					dateStr + " " + this.addObj.courseTime + ":00";
				this.addObj.endTime = dateStr + " " + this.endHour + ":00";
			}
			console.log(this.addObj);
			this.$refs.createCoursePackRef.validate(validRes => {
				console.log(validRes);
				if (validRes) {
					if(this.isActioning){ //多次提交拦截
						return
					}
					this.isActioning = true
					this.updateLoadingStatus({
						isLoading: true
					});
					this.addObj.objectType = "class course";
					jwLesson
						.save(this.addObj)
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								if (res.statusCode == "7000") {
									this.$Message.error(res.data.message);
									this.addModalLoading = false;
									this.addModal = true;
									setTimeout(() => {
										this.addModalLoading = true;
									}, 0);
								} else {
									this.addModal = false;
									this.$Message.info("保存班课成功");
									if(this.openType == 'add'){ // 新建后返回第一页，编辑留在当前页
										this.pageNo = 1;
									}
									this.getListData();
								}
							} else {
								this.$Message.error(res.data.message);
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
		deleteById(id) {
			jwLesson
				.deleteById({
					id
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.pageNo = 1;
						this.$Message.success(res.data.message);
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
		searchCourseTime(date) {
			this.startDate = date[0];
			this.endDate = date[1];
			this.pageNo = 1;
		},
		classGetData() {
			jwClassCourse
				.form({
					id: this.$route.query.id
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.classData = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		//获取数据，根据情况修改接口、传参
		getListData() {
			this.updateLoadingStatus({
				isLoading: true
			});
			this.currentPage = this.pageNo;
			let param = {
				// classId: this.$route.query.id,
				objectId: this.$route.query.id,
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				orderByType: "startDate",
				orderByStatus: this.orderByStatus
			};
			if (this.startDate) {
				param.startDate = this.startDate;
				param.endDate = this.endDate;
			}
			this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
			jwLesson
				.listPageByClass(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data;
						this.tableData = result.list;
						this.dataTotal = result.total;
						// this.tableData[index]._disabled=true;
						this.tableData.filter(item => {
							if (item.status == "stop") {
								item._disabled = true;
							}
							if (item.status == "finishAttendance") {
								item._disabled = true;
							}
						});
						if (
							!this.userInfo.admin &&
							this.userInfo.roleIdList.indexOf("8") < 0
						) {
							this.btnList.splice(1, 1);
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
		//可选方法，如果是多选的话必须有
		selectionChange(selection) {
			this.selection = selection;
		},
		//必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
		getShowTitle(closeLoad) {
			jwLesson
				.getShowTitle({
					pageIdentifier: "jwLesson/listPage/sortClass",
					voName: "JwClassLessonVO",
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
		resetSearch() {
			this.courseTime = [];
			this.startDate = "";
			this.endDate = "";
			this.pageNo = 1;
			this.getListData();
		},
		getDetail(name) {
			alert(name);
		},
		sendClassNotice() {
			this.$Modal.confirm({
				title: "确认发送课程通知吗?",
				content: "确认后此班课将对所有课程发送课程通知。",
				onOk: () => {
					// this.remove(params.row.id);
				},
				onCancel: () => {}
			});
		},
		noCheck() {
			if (!this.selection.length) {
				this.$Message.error("请选择数据");
				return;
			}
			this.$Modal.confirm({
				title:
					"确认<span style='color: #FAAD14;'>批量未考勤</span>选中班课课程吗？",
				content: "确认后所选班课课程将更改为未考勤状态。",
				onOk: () => {
					let idList = this.selection.map(item => {
						return item.id;
					});
					jwLesson
						.batchUnAttendance({
							ids: idList.join(",")
						})
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								this.$Message.info("批量未考勤成功");
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
		showResult(data) {
			console.log(this.tableData);
			let _data = data;
			let errorStatusObj = {};
			this.errorList = data.errorList;
			if (data.errorCount && data.errorList) {
				this.tableData.forEach(item => {
					if (data.errorList.includes(item.id)) {
						errorStatusObj[item.statusLabel] = 1;
					}
				});
			}
			_data.errorStatusList = Object.keys(errorStatusObj);
			if (_data.errorCount == 0 || !_data.errorCount) {
				//全部成功
				this.$Message.success({
					render: h => {
						return h("div", [
							h("span", {}, "共"),
							h(
								"span",
								{ style: { color: "orange" } },
								_data.totalCount
							),
							h("span", {}, "条排课数据，成功删除"),
							h(
								"span",
								{ style: { color: "green" } },
								_data.successCount
							),
							h("span", {}, "条")
						]);
					},
					duration: 5
				});
			} else if (_data.successCount == 0 || !_data.successCount) {
				//全部不成功
				this.$Message.error({
					render: h => {
						return h("div", [
							h("span", {}, "共"),
							h(
								"span",
								{ style: { color: "orange" } },
								_data.totalCount
							),
							h("span", {}, "条排课数据，未删除"),
							h(
								"span",
								{ style: { color: "red" } },
								_data.errorCount
							),
							h("span", {}, "条"),
							_data.errorStatusList.length
								? h("span", {}, "，该条状态为")
								: "",
							_data.errorStatusList.length
								? h(
										"span",
										{ style: { color: "red" } },
										_data.errorStatusList.join(" 或 ")
								  )
								: "",
							_data.errorStatusList.length
								? h("span", {}, "，不能删除")
								: ""
						]);
					},
					duration: 5
				});
			} else {
				this.$Message.info({
					render: h => {
						return h("div", [
							h("span", {}, "共"),
							h(
								"span",
								{ style: { color: "orange" } },
								_data.totalCount
							),
							h("span", {}, "条排课数据，成功删除"),
							h(
								"span",
								{ style: { color: "green" } },
								_data.successCount
							),
							h("span", {}, "条，未删除"),
							h(
								"span",
								{ style: { color: "red" } },
								_data.errorCount
							),
							h("span", {}, "条"),
							_data.errorStatusList.length
								? h("span", {}, "，该条状态为")
								: "",
							_data.errorStatusList.length
								? h(
										"span",
										{ style: { color: "red" } },
										_data.errorStatusList.join(" 或 ")
								  )
								: "",
							_data.errorStatusList.length
								? h("span", {}, "，不能删除")
								: ""
						]);
					},
					duration: 5
				});
			}
		},
		moreDel() {
			if (!this.selection.length) {
				this.$Message.error("请选择数据");
				return;
			}
			this.$Modal.confirm({
				title:
					"确认<span style='color: #FAAD14;'>批量删除</span>选中班课课程吗？",
				content: "确认后所选班课课程将永久删除。",
				onOk: () => {
					let idList = this.selection.map(item => {
						return item.id;
					});
					this.updateLoadingStatus({
						isLoading: true
					});
					jwLesson
						.deleteByIds({
							ids: idList.join(",")
						})
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								// this.$Message.success(res.data.message);
								console.log(res.data.data);
								//总条数：totalCount,成功删除条数：successCount，未删除条数：errorCount，未删除课次编号数组：errorList
								this.showResult(res.data.data);
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
		addClass() {
			this.addTeacherList = [];
			this.addAssistList = [];
			this.addClassTeacherList = [];
			this.classRoomList = [];
			this.$refs.createCoursePackRef.resetFields();
			this.addObj = {};
			this.addObj.objectName = this.classData.name;
			this.addObj.objectId = this.classData.id;
			this.addObj.objectType = this.classData.type;
			this.addObj.officeId = this.classData.office.id;
			this.addObj.statusName = "未上课";
			this.addObj.status = "unAttendClass";
			this.addObj.hours = 0;
			this.addObj.isConflict = 0;
			this.openType = "add";
			this.addModal = true;
			//this.$refs["ModifySortClassRef"].ModifySortClassMethod("add");
		},
		addClassMore() {
			this.$router.push({
				name: "jw.createClass",
				query: { lessonId: this.$route.query.id }
			});
		},
		isExport(val) {
			//这里val的值。是根据设置下拉类型button设定的值来匹配判断
			if (val == "2" && !this.selection.length) {
				this.$Message.error("请选择要导出的数据");
				return;
			}
			this.tableColumnArray.map(item => {
				item.name = item.key;
				if (item.fixed) {
					item.selected = true;
				} else {
					item.selected = false;
				}
			});
			let data = this.tableColumnArray.filter(item => {
				return item.key != "doAction";
			});
			if (val == "2") {
				//如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
				this.searchObj.selection = this.selection;
			}
			this.$refs.exportModal.noShowExport(this.exportMethod, this.searchObj);
		},
		isImport() {
			alert("导入");
			/*  this.$router.push({
                    name: '',
                    query: {
                        
                    }
                }) */
		},
		isCreate() {
			this.$router.push({
				name: "jw.createClass",
				query: {}
			});
		}
	}
};
</script>