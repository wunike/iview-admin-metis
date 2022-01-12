<style lang="less">
.mytable {
	margin-top: 10px;
	width: 100%;
	background: rgba(255, 255, 255, 1);
	border-radius: 4px;
	padding: 0 16px;
}

</style>
<template>
	<div>
		<v-search-collapse
			@search="getListData"
			@reset="resetSearch"
			@changeDivHeight="changeDivHeight"
			key="searchTableType0"
		>
			<DatePicker
				ref="DatePicker"
				:options="options3"
				split-panels
				@on-open-change="setOptTime"
				type="daterange"
				v-model="courseTime"
				placement="bottom-start"
				separator=" ~ "
				:placeholder="$t('modules_spoc_jw_web_src_views_1v1course_1v1course_2219')"
				style="width:224px;"
			></DatePicker>
			<Select
				v-model="officeId"
				@on-change="changeSchool"
				:placeholder="$t('courselist_courselist_225')"
				style="width:224px;"
				filterable
			>
				<Option v-for="item in schoolList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
			</Select>
			<Input v-model="stuName" :placeholder="$t('memberlist_memberlist_257')" style="width:140px;"></Input>
			<Select v-model="courseType" :placeholder="$t('messagemanagement_index_346')" clearable filterable @on-change="changeCourseType">
				<Option v-for="item in jw_course_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			<Select v-model="grade" :placeholder="$t('courselist_courselist_224')" clearable filterable>
				<Option
					v-for="item in jw_course_grade"
					v-show="courseType == item.type"
					:value="item.value"
					:key="item.value"
				>{{ item.label }}</Option>
			</Select>
			<Input v-model="courseName" :placeholder="$t('mycourse_mycourse_380')" style="width:140px;"></Input>
			<Select v-model="teacherId" :placeholder="$t('courselist_courselist_226')" style="width:140px;" clearable filterable>
				<Option v-for="item in teacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
			<Select v-model="assistId" :placeholder="$t('classlist_classlist_5')" style="width:140px;" clearable filterable>
				<Option v-for="item in assistList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
			<Select v-model="classTeacherId" :placeholder="$t('classlist_classlist_6')" style="width:140px;" clearable filterable>
				<Option v-for="item in classTeacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
			<Select v-model="classroomId" clearable :placeholder="$t('modules_spoc_jw_web_src_views_1v1_newcourse_2165')" style="width:224px;">
				<Option v-for="item in classroomList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select> 
		</v-search-collapse>
		<big-table
			ref="bigTable"
			v-if="defaultShowCol"
			class="mytable"
			:tableName="tableName"
			:tableData="tableData"
			:tableColumnArray="tableColumnArray"
			:defaultShowCol="defaultShowCol"
			:btnList="btnList"
			:tableHeightOut="tableHeightOut"
			:canSelection="canSelection"
			:updateShowTitleMethod="updateShowTitle"
			:updateShowTitleKey="updateShowTitleKey"
			:dataTotal="dataTotal"
			@selectionChange="selectionChange"
			@sortChange="sortChange"
			:pageNo="pageNo"
			@pageChange="pageChange"
			@changeTableType="changeTableType"
		></big-table>
		<Modal
			v-model="showPK"
			:title="$t('modules_spoc_jw_web_src_views_1v1course_1v1course_2229')"
			@on-cancel="cancel"
			width="1200"
		>
			<div>
				<Table :columns="columns1" :data="data1"></Table>
			</div>
			<div slot="footer">
				<Button type="default" size="large" @click="cancel">{{$t('classroom_allscore_53')}}</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import bigTable from "@public/modules/bigTable.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
import valid, {
	errors,
	jwClassCourse,
	sysUser,
	sysDict,
	sysAttachment,
	jwManualSign,
	jwLesson,
	common,
	jwClassroom
} from "../../libs/request";
export default {
	name: "jw.1v1course",
	components: {
		bigTable,
		vSearchCollapse,
	},
	computed: {
		...mapState(["userInfo", "app", "buttonPerm","calendarConfig"]),
        myButtonPrem() {
            return this.buttonPerm ? (this.buttonPerm["jw.classStudentManageList"] || []) : [];
        },
	},
	mounted() {
		this.getSchools();
		this.getCourseType();
		waitUntil(
			() => {
				// return (this.app.currOfficeId && this.userInfo.officeId && this.buttonPerm && this.buttonPerm["jw.classStudentManageList"]) || false;
				return (this.app.currOfficeId && this.userInfo.officeId) || false;
			},
			() => {
				this.officeId = this.app.currOfficeId == 'all' ? this.userInfo.officeId : this.app.currOfficeId;
				this.courseTime = defaultDatePickerValue()
				this.options3 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
				this.changeTableType(0);
				this.changeSchool(this.officeId)
			}
		);
	},
	data() {
		return {
			columns1: [
				{
					title: this.$t('classlist_compontents_detailinfo_35'),
					key: 'name'
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2138'),
					key: 'type1'
				},
				{
					title: this.$t('courselist_compontents_modify_183'),
					key: 'date'
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2140'),
					key: 'type2'
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2141'),
					key: 'address'
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2142'),
					key: 'time',
					render: (h, params) => {
						return 	h(
									"div",
									[
										h(
											"div",
											{
												props: {
													type: "text",
													size: "small"
												},
												style: {
													display:'inline-block'
												},
											},
											params.row.time
										),
										h(
											"Poptip",
											{
												attrs: {
													trigger: "hover",
													placement: "bottom",
													transfer: true,
												},
												style: {
													position: 'relative',
													top: '-1.5px',
													left: '3px'
												},
											},[
												h(
													"Icon",
													{
														attrs: {
															size: 16,
															type: "ios-help-circle-outline",
														},
													},
												),
												h(
													"div",
													{
														slot:"content"
													},
													[
														h(
															"div",
															{
																style: {
																	color:'#999999'
																},
															},
															this.$t('modules_spoc_jw_web_src_views_1v1_newcourse_2168')
														),
														h(
															"div",
															{
															},
															[	
																h(
																	"div",
																	{
																	},
																	[
																		'A.08:00-10:00',
																	]
																),
																h(
																	"div",
																	{
																	},
																	[
																		'B.10:30-12:30',
																	]
																),
																h(
																	"div",
																	{
																	},
																	[
																		'C.14:00-16:00',
																	]
																),
																h(
																	"div",
																	{
																	},
																	[
																		'D.16:30-18:30',
																	]
																),
																h(
																	"div",
																	{
																	},
																	[
																		'E.19:00-21:00'
																	]
																),
															]
														),
													]
												),
											]
										)
									]
								)
					}
				},
				{
					title: this.$t('classlist_compontents_detailinfo_45'),
					key: 'doAction',
					render: (h, params) => {
						return 	h(
									"a",
									{
										props: {
											type: "text",
											size: "small"
										},
										style: {},
										on: {
											click: () => {
												this.$router.push({
													name: "crm.customer360",
													query: {
														id: params.row.cusId
													}
												});
											}
										}
									},
									this.$t('classroom_allscore_53')
								)
					}
				},
			],
			data1: [
				{
					name: 'John Brown',
					type1: 18,
					address: 'New York No. 1 Lake Park',
					date: '2016-10-03',
					time: 'A,B,C,D'

				},
				{
					name: 'Jim Green',
					type1: 24,
					address: 'London No. 1 Lake Park',
					date: '2016-10-01',
					time: 'A,B,C,D'
				},
			],
			showPK: false,
			options3: null,
			tableHeightOut: 72, //324,
			/*搜索相关开始*/
			courseTime: [],
			officeId: "", // 所属校区
			stuName: "", // 学员姓名
			courseName: '',
			courseType: '',// 课程分类
			grade: '', //课程年级
			teacherId: "", // 授课教师
			assistId: "", // 助教
			classTeacherId: "", //服务OO
			classroomId: '',
			pageNo: 1,
			pageSize: this.$store.state.app.pageSizeGlobal,
			/*搜索相关结束*/
			/*搜索下拉菜单备选项相关开始*/
			schoolList: [],
			jw_course_type: [], // 课程分类list
			jw_course_grade: [], // 课程年级list
			classroomList: [], // 教室
			teacherList: [],
			assistList: [],
			classTeacherList: [],
			/*搜索下拉菜单备选项相关结束*/
			tableName: [
				{
					name: "正常",
					value: "0"
				},
				{
					name: "考勤异常",
					value: "1"
				},
				{
					name: "未确认",
					value: "2"
				}
			],
			tableType: 0,
			canSelection: true,
			selection: [],
			updateShowTitleKey: "jwClassCourse/listPageStudents", // 'jwClassCourse/listPageStudentVolumes'
			updateShowTitle: jwClassCourse.updateShowTitle,
			defaultShowCol: null,
			dataTotal: 0,
			sortObj: {},
			tableColumnArray:[],
			tableColumnArray0: [
				{
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: "doAction",
                    width: 140,
                    render: (h, params) => {
                        return h("div", [
                            (this.myButtonPrem.indexOf("details") >= 0 || true)
                                      ?h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {},
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: "crm.customer360",
                                                query: {
                                                    id: params.row.cusId
                                                }
                                            });
                                        }
                                    }
                                },
                                "详情"
                            ):'',
                            (this.myButtonPrem.indexOf("account") >= 0 || true)
                                      ? h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {
                                        marginLeft: "16px"
                                    },
                                    on: {
                                        click: () => {
                                            this.$refs.studentAccont.show({
                                                officeId: params.row.officeId,
                                                studentId: params.row.id
                                            });
                                        }
                                    }
                                },
                                "考勤"
                            ):'',
                        ]);
                    }
                }
			],
			tableColumnArray1: [
				{
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: "doAction",
                    width: 140,
                    render: (h, params) => {
                        return h("div", [
                            (this.myButtonPrem.indexOf("details") >= 0 || true)
                                      ?h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {},
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: "crm.customer360",
                                                query: {
                                                    id: params.row.cusId
                                                }
                                            });
                                        }
                                    }
                                },
                                "确认异常"
                            ):'',
                            (this.myButtonPrem.indexOf("account") >= 0 || true)
                                      ? h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {
                                        marginLeft: "16px"
                                    },
                                    on: {
                                        click: () => {
                                            this.$refs.studentAccont.show({
                                                officeId: params.row.officeId,
                                                studentId: params.row.id
                                            });
                                        }
                                    }
                                },
                                "取消异常"
                            ):'',
                            (this.myButtonPrem.indexOf("account") >= 0 || true)
                                      ? h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {
                                        marginLeft: "16px"
                                    },
                                    on: {
                                        click: () => {
                                            this.$refs.studentAccont.show({
                                                officeId: params.row.officeId,
                                                studentId: params.row.id
                                            });
                                        }
                                    }
                                },
                                "修改考勤"
                            ):'',
                        ]);
                    }
                }
			],
			tableColumnArray2: [
				{
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: "doAction",
                    width: 140,
                    render: (h, params) => {
                        return h("div", [
                            (this.myButtonPrem.indexOf("details") >= 0 || true)
                                      ?h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {},
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: "crm.customer360",
                                                query: {
                                                    id: params.row.cusId
                                                }
                                            });
                                        }
                                    }
                                },
                                "确认"
                            ):'',
                            (this.myButtonPrem.indexOf("account") >= 0 || true)
                                      ? h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {
                                        marginLeft: "16px"
                                    },
                                    on: {
                                        click: () => {
                                            this.$refs.studentAccont.show({
                                                officeId: params.row.officeId,
                                                studentId: params.row.id
                                            });
                                        }
                                    }
                                },
                                "取消"
                            ):'',
                        ]);
                    }
                }
			],
			tableData: [],
			btnList: [
				{
					style: {},
					type: "",
					btnClick: this.schedule,
					text: "排班",
					value: "1",
				},
			],
		};
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		setOptTime(flag){
			if(flag){
				this.courseTime = []
			}
		},
		changeDivHeight(height) {
			this.tableHeightOut = height;
		},
		getCourseType() {
			let types = "jw_course_type"; // 课程分类
			sysDict
				.batchListData({
					types
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.jw_course_type = res.data.data.jw_course_type;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});

			let type = "jw_course_type"; // 课程年级
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
		changeCourseType(val) {
			this.grade = "";
		},
		getClassRoomList(currOfficeId){
			if(!currOfficeId){
				currOfficeId = this.app.currOfficeId == 'all' ? this.userInfo.officeId : this.app.currOfficeId;
			}
          	let params = {
				pagesize: -1,
				officeId:currOfficeId
			};
			jwClassroom
				.listPage(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.classroomList = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		changeSchool(schoolId) {
			this.teacherId = "";
			this.assistId = "";
			this.classTeacherId = "";
			this.classroomId = '';

			this.teacherList = [];
			this.assistList = [];
			this.classTeacherList = [];
			this.classroomList = [];
			if (schoolId) {
				this.getUserByOfficeIdAndRoleId(schoolId, "teacher_id"); // 授课教师 teacher_id
				this.getUserByOfficeIdAndRoleId(schoolId, "assist_id"); // 授课助教 assist_id
				this.getUserByOfficeIdAndRoleId(schoolId, "class_teacher_id"); // 服务oo class_teacher_id
				this.getClassRoomList(schoolId) // 教室
			}
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
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		ok() {
			let stuIdList = [];
			let param = {
				stuIdList
			};
			// const { href } = this.$router.resolve({
			// 	name: "jw.printStudentCard"
			// });
			// window.open(href, "_blank");
		},
		cancel() {
			this.showPK = false
		},
		changeTableType(val) {
			this.tableType = val;
			this.tableColumnArray = [].concat(this["tableColumnArray" + val]);
			if (val == "0" || val == '2') {
				this.updateShowTitleKey = "jwClassCourse/listPageStudents";
			} else {
				this.updateShowTitleKey = "jwClassCourse/listPageStudentVolumes";
			}
			this.getShowTitle();
			this.getListData();
		},
		doActionItem(obj) {
			if (obj.key === "delData") {
				if (obj.row.status != "1") {
					this.$Modal.confirm({
						title: "确认删除",
						content: "<p>确定删除该课程包？</p>",
						onOk: () => {
							this.deleteCoursePack(obj.row.id);
						},
						onCancel: () => {}
					});
				}
			} else if (obj.key === "changeStatus") {
				this.$Modal.confirm({
					title: "确认状态修改",
					content: "<p>确定设置该课程包为有效？</p>",
					onOk: () => {
						this.changeStatus(obj.row.id, obj.row.status);
					},
					onCancel: () => {}
				});
			} else if (obj.key === "copy") {
			}
		},
		//获取数据，根据情况修改接口、传参
		getListData() {
			this.updateLoadingStatus({
				isLoading: true
			});
			let param = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				admissionStartDate: this.courseTime[0] ? new Date(this.courseTime[0]).format('yyyy-MM-dd 00:00:00') : '', //入学开始时间
				admissionEndDate: this.courseTime[1] ? new Date(this.courseTime[1]).format('yyyy-MM-dd 23:59:59') : '', //入学结束时间
				officeId: this.officeId, // 所属校区
				stuName: this.stuName, // 学员姓名
				courseName: this.courseName,
				courseType: this.courseType,
				grade: this.grade,
				teacherId: this.teacherId, // 授课教师
				assistId: this.assistId, // 助教
				classTeacherId: this.classTeacherId, //服务OO
				classroomId: this.classroomId
			};

			// console.log(param)
			/* if(this.sortObj.order != 'normal' && this.sortObj.key){
				    param.orderByType = this.sortObj.key
				    param.orderByStatus = this.sortObj.order == 'asc' ? '1' : '2'
				} */
			//this.searchObj = param  //这里需要给searchObj 赋值，导出数据的时候需要用到
			let myRequestList;
			if (this.tableType == "0" || this.tableType == "2") {
				myRequestList = jwClassCourse.listPageStudents(param);
			}
			if (this.tableType == "1") {
				myRequestList = jwClassCourse.listPageStudentVolumes(param);
			}

			myRequestList
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
		//必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
		getShowTitle() {
			let param = {};
			if (this.tableType == "0" || this.tableType == "2") {
				param = {
					pageIdentifier: "jwClassCourse/listPageStudents",
					voName: "JwStudentClassCourseVO",
					lang: this.$i18n.locale
				};
			}
			if (this.tableType == "1") {
				param = {
					pageIdentifier: "jwClassCourse/listPageStudentVolumes",
					voName: "JwClassCourseStudentVolumesVO",
					lang: this.$i18n.locale
				};
			}

			jwClassCourse
				.getShowTitle(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.defaultShowCol = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		resetSearch() {
			this.officeId = this.app.currOfficeId == 'all' ? this.userInfo.officeId : this.app.currOfficeId;
			this.courseTime = defaultDatePickerValue();
			this.pageNo = 1;
			this.pageSize = this.$store.state.app.pageSizeGlobal;
			this.stuName = "";
			this.courseType = '';
			this.grade = '';
			this.courseName = '';
			this.changeSchool(this.officeId);
			this.getListData();
		},
		schedule() {
			if (!this.selection.length) {
				this.$Message.error(this.$t('modules_spoc_jw_web_src_views_1v1course_1v1course_2239'));
				return;
			}
			let stuIdList = [];
			this.selection.forEach(item => {
				stuIdList.push(item.id);
			});

			this.showPK = true
		}
	},
	watch: {
		"app.currOfficeId": function(val, oldVal) {
			if (oldVal && this.$route.name == 'jw.1v1course') {
				this.officeId = this.app.currOfficeId == 'all' ? this.userInfo.officeId : this.app.currOfficeId;
				this.changeSchool(this.officeId)
				this.getListData();
			}
		}
	}
};
</script>
