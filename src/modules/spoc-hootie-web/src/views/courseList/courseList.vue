<style lang="less">
.course-list-container {
	height: 100%;
	width: 100%;
	.approval {
		position: relative;
		color: #495060;
		padding-left: 12px;
		&::before {
			position: absolute;
			display: block;
			content: "";
			width: 4px;
			height: 4px;
			border-radius: 50%;
			left: 0;
			top: 4px;
		}
	}
	.approval-1 {
		.approval;
		&::before {
			background: #06a59b;
		}
	}
	.approval-2 {
		.approval;
		&::before {
			background: #46bc15;
		}
	}
	.approval-3 {
		.approval;
		&::before {
			background: #999999;
		}
	}
	.mytable {
		margin-top: 10px;
		width: 100%;
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		padding: 0 16px;
	}
}
</style>

<template>
	<div class="course-list-container">
		<vSearchCollapse @search="searchInfo" @reset="resetSearch" @changeDivHeight="changeDivHeight">
			<DatePicker
				ref="DatePicker"
				:options="options3"
				split-panels
				@on-open-change="setOptTime"
				type="daterange"
				separator=" ~ "
				v-model="findObj.ClassTimeRange"
				format="yyyy-MM-dd"
				:placeholder="$t('courselist_courselist_221')"
				style="width:224px;"
			></DatePicker>
			<Select
				:placeholder="$t('courselist_courselist_225')"
				v-model="findObj.officeId"
				clearable
				style="width:224px;"
			>
				<Option
					v-for="item in roomAreaList"
					:value="item.id"
					:key="item.id"
				>{{item.code}}{{ item.name }}</Option>
			</Select>
			<Input
				:placeholder="$t('courselist_courselist_222')"
				v-model="findObj.className"
				style="width:224px;margin-right:12px;"
			></Input>
			<Select
				:placeholder="$t('courselist_courselist_223')"
				v-model="findObj.type"
				clearable
				@on-change="courseTypeChange"
			>
				<Option v-for="item in jw_course_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			<Select :placeholder="$t('courselist_courselist_224')" v-model="findObj.grade" clearable>
				<Option v-for="item in jw_course_grade" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			<Select
				filterable
				remote
				multiple
				:loading="teacherLoading"
				:remote-method="teacherRemote"
				:placeholder="$t('courselist_courselist_226')"
				v-model="findObj.teacherId"
				clearable
				style="width:224px;"
			>
				<Option v-for="item in teacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
			<Select
				filterable
				remote
				multiple
				:loading="assistLoading"
				:remote-method="assistRemote"
				:placeholder="$t('classlist_classlist_5')"
				v-model="findObj.assistId"
				clearable
				style="width:224px;"
			>
				<Option v-for="item in assistList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
			<Select
				filterable
				remote
				multiple
				:loading="classTeacherLoading"
				:remote-method="classTeacherRemote"
				:placeholder="$t('classlist_classlist_6')"
				v-model="findObj.classTeacherId"
				clearable
				style="width:224px;"
			>
				<Option v-for="item in classTeacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
		</vSearchCollapse>
		<big-table
			v-if="defaultShowCol"
			class="mytable"
			:tableHeightOut="tableHeightOut"
			:tableName="tableTitle"
			:tableData="tableData"
			:tableColumnArray="tableColumnArray"
			:defaultShowCol="defaultShowCol"
			:canSelection="true"
			:pageNo="pageNo"
			:updateShowTitleMethod="updateShowTitle"
			:updateShowTitleKey="updateShowTitleKey"
			:dataTotal="dataTotal"
			:btnList="btnList"
			@resetDefault="resetDefaultCol"
			@selectionChange="selectionChange"
			@pageChange="pageChange"
		></big-table>
		<!-- <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal> -->
		<detailInfo ref="detailInfoRef"></detailInfo>
		<modify ref="modifyRef" @emitGetListData="emitGetListData"></modify>
		<!-- <serviceContent
      ref="serviceRef"
      @downLoad="downLoad"
      @success="success"
      @uploadList="uploadList"
    >
      <div slot="details"></div>
		</serviceContent>-->
	</div>
</template>

<script>
/**
 **@date: 2019/6/18 10:18
 **@author: lizhi
 **
 */
import vSearchCollapse from "@public/modules/vSearchCollapse";
import bigTable from "@public/modules/bigTable.vue";
// import exportModal from "@public/modules/exportModal.vue";
import valid, {
	errors,
	sysUser,
	sysDict,
	jxLesson,
	jxLessonAudit,
	sysAttachment
} from "../../libs/request";
import { mapMutations, mapState } from "vuex";
import detailInfo from "./compontents/detailInfo";
import modify from "./compontents/modify";
// import serviceContent from "./compontents/serviceContent";
import tableDropdown from "@public/modules/tableDropdown";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
export default {
	name: "hootie.courseList",
	components: {
		vSearchCollapse,
		bigTable,
		// serviceContent,
		detailInfo,
		modify,
		tableDropdown
	},

	data() {
		return {
			// auditStatus:'',
			options3: null,
			tableHeightOut: 72, //324,
			headerInfos: {
				stuName: "lizhi",
				inSatff: "tomsen",
				sex: "man",
				class: "9",
				No: "A94564645454654",
				compass: this.$t("courselist_1"),
				name: this.$t("courselist_2"),
				remarks: this.$t("courselist_3")
			},
			updateShowTitleKey: "jxLesson",
			teacherLoading: false,
			assistLoading: false,
			classTeacherLoading: false,
			selection: [],
			sortObj: {},
			trurNumberShow: true,
			tableTitle: this.$t("jw.scheduleManageList"),
			findObj: {
				ClassTimeRange: [],
				className: "",
				type: "",
				grade: "",
				officeId: "",
				teacherId: [],
				assistId: [],
				classTeacherId: []
			},

			jw_course_grade: [],
			roomAreaList: [],
			teacherList: [],
			assistList: [],
			classTeacherList: [],
			jw_course_type: [],
			updateShowTitle: jxLesson.updateShowTitle,
			defaultShowCol: null,
			exportMethod: sysUser.exportData,
			selectedIds: [], //选中的ids
			currentIds: [], //当前页的ids
			pageNo: 1,
			dataTotal: 0, //总数
			pageSize: this.$store.state.app.pageSizeGlobal,
			tableColumnArray: [
				{
					//上课日期
					key: "lessonDate",
					width:null
				},
				{
					key: "lessonTime",
					width:null
				},
				{
					key: "classTeacherName",
					width:null
				},
				{
					key: "teacherName",
					width:null
				},
				{
					key: "classCode",
					width:null
				},
				{
					key: "classroomName",
					width:null
				},
				{
					key: "courseType",
					width:null
				},
				{
					key: "courseGrade",
					width:null
				},
				{
					key: "assistName",
					width:null
				},
				{
					key: "officeName",
					width:null
				},
				{
					key: "className",
					width:null,
					render: (h, params) => {
						return h("div", {}, params.row.className);
					}
				},
				{
					key: "assistPhone",
					width:null,
					render: (h, params) => {
						return h("div", {}, params.row.assistPhone);
					}
				},
				{
					key: "classTeacherPhone",
					width:null,
					render: (h, params) => {
						return h("div", {}, params.row.classTeacherPhone);
					}
				},
				{
					key: "teacherPhone",
					width:null,
					render: (h, params) => {
						return h("div", {}, params.row.teacherPhone);
					}
				},
				{
					title: this.$t("spoc_hootie_web_12"),
					key: "auditStatus",
					width:null,
					tooltip: true,
					//unsubmit：未提交；unaudit：待审批；agree：已通过；reject：已驳回
					render: (h, params) => {
						let text = "";
						let color = "";
						if (params.row.auditStatus == "unsubmit") {
							text = this.$t("mycourse_mycourse_385");
							color = "#999999";
						} else if (params.row.auditStatus == "unaudit") {
							text = this.$t("mycourse_mycourse_386");
							color = "#999999";
						} else if (params.row.auditStatus == "agree") {
							text = this.$t("mycourse_mycourse_387");
							color = "#44BCB7";
						} else if (params.row.auditStatus == "reject") {
							text = this.$t("mycourse_mycourse_388");
							color = "#FF3000";
						}
						return h("div", [
							h("span", {
								style: {
									width: "6px",
									height: "6px",
									background: color,
									display: "inline-block",
									marginRight: "8px",
									borderRadius: "50%"
								}
							}),
							text
						]);
					}
				},
				{
					title: this.$t("spoc_hootie_web_9"),
					key: "sendFlag",
					width:null,
					tooltip: true,
					// 推送状态 : 0：未推送，1：已推送
					render: (h, params) => {
						let text = "";
						let color = "";
						if (params.row.sendFlag == 0) {
							text = this.$t("spoc_hootie_web_10");
							color = "#999999";
						} else if (params.row.sendFlag == 1) {
							text = this.$t("spoc_hootie_web_11");
							color = "#44BCB7";
						}
						return h("div", [
							h("span", {
								style: {
									width: "6px",
									height: "6px",
									background: color,
									display: "inline-block",
									marginRight: "8px",
									borderRadius: "50%"
								}
							}),
							text
						]);
					}
				},
				{
					title: this.$t("classlist_compontents_detailinfo_45"),
					key: "doAction",
					width:null,
					render: (h, params) => {
						/* 最外面的列表增加：
              updateFlag：是否可以修改，0：不可以；1：可以 */
						return h("div", {}, [
							h(
								"a",
								{
									style: {
										display: "inline-block",
										marginTop: "5px",
										marginLeft: "8px",
										marginRight: "8px",
										"word-break": "break-word"
									},
									on: {
										click: () => {
											this.$refs.detailInfoRef.detailInfoRefShowMethods(
												params.row
											);
										}
									}
								},
								this.$t("classlist_compontents_detailinfo_15")
							),
							h(
								"a",
								{
									style: {
										display: "inline-block",
										marginTop: "5px",
										marginLeft: "8px",
										marginRight: "8px",
										"word-break": "break-word",
										color:
											params.row.updateFlag == 0
												? "#ccc"
												: ""
									},
									on: {
										click: () => {
											if (params.row.updateFlag == 1) {
												this.$refs.modifyRef.modifyRefShowMethods(
													params.row
												);
											}
										}
									}
								},
								this.$t("courselist_compontents_modify_176")
							),
							h(
								"a",
								{
									style: {
										display: "inline-block",
										marginTop: "5px",
										marginLeft: "8px",
										marginRight: "8px",
										marginBottom: "5px",
										"word-break": "break-word",
										color:
											params.row.updateFlag == 0
												? "#ccc"
												: ""
									},
									on: {
										click: () => {
											if (params.row.updateFlag == 1) {
												this.$Modal.confirm({
													title: this.$t(
														"courselist_32"
													),
													content:
														"<p>" +
														this.$t(
															"courselist_33"
														) +
														"</p>",
													onOk: () => {
														this.deleteLesson(
															params.row.id
														);
													},
													onCancel: () => {}
												});
											}
										}
									}
								},
								this.$t("classlist_compontents_detailinfo_46")
							)
						]);
					}
				}
			],
			tableData: [],
			btnList: [
				// {
				//   style: {},
				//   type: "",
				//   btnClick: this.showImport,
				//   text: this.$t('hootie.importCourse')
				// },
				{
					style: {},
					type: "",
					btnClick: this.importClass,
					text: this.$t("hootie.importClass")
				},
				{
					style: {},
					type: "",
					btnClick: this.importCourse,
					text: this.$t("hootie.importCourse") // 导入排课
				}
			],
		};
	},

	computed: {
		...mapState(["userInfo", "app","calendarConfig"])
	},
	mounted() {
		this.getShowTitle(); //显示列的数据
		// this.getListData(); //表格数据
		this.baseDataList(); //下拉数据
		this.getSearchList(9, "");
		this.getSearchList(10, "");
		this.getSearchList(6, "");
		waitUntil(
			() => {
				if (this.userInfo && this.userInfo.permissions) {
					if (
						this.userInfo.permissions.includes(
							"hootie:jxLesson:edit:batchDeleteLesson"
						)
					) {
						if (this.btnList.length == 2) {
							this.btnList.push({
								style: {},
								type: "",
								btnClick: this.dels,
								text: this.$t("spoc_hootie_web_481") // 批量删除
							});
						}
					}
					return true;
				}
				return this.app.currOfficeId || false;
			},
			() => {}
		);
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		resetDefaultCol(){
			this.updateLoadingStatus({ isLoading: true });
            jxLesson.clearShowField({
                pageIdentifier: "jxLesson",
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
		setOptTime(flag){
			if(flag){
				this.findObj.ClassTimeRange = []
			}
		},
		//删除id
		changeDivHeight(height) {
			this.tableHeightOut = height;
		},
		//批量删除
		dels() {
			if (!this.selection.length) {
				this.$Message.error(this.$t("importPage_warning1"));
				return;
			}
			let canDel = true;
			this.selection.forEach(item => {
				if (item.updateFlag != 1) {
					canDel = false;
				}
			});
			if (!canDel) {
				this.$Message.error(this.$t("delete_warning1"));
				return;
			}
			this.$Modal.confirm({
				title: this.$t("courselist_32"),
				content: "<p>" + this.$t("courselist_33") + "</p>",
				onOk: () => {
					let ids = this.selection
						.map(item => {
							return item.id;
						})
						.join(",");
					jxLesson
						.batchDeleteLesson({ ids: ids })
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								this.$Message.success(res.data.message);
								this.getListData();
							}
						})
						.catch(errors.call(this))
						.finally(() => {});
				},
				onCancel: () => {}
			});
		},
		deleteLesson(id) {
			jxLesson
				.deleteLesson({ id: id })
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.$Message.success(res.data.message);
						this.getListData();
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		//审批
		importClass() {
			// 导入班课
			this.$router.push({
				name: "hootie.importClass"
			});
		},
		importCourse() {
			// 导入排课
			this.$router.push({
				name: "hootie.importCourse"
			});
		},
		audit(id, value, type) {
			this.updateLoadingStatus({ isLoading: true });
			let params = {
				lessonId: id,
				type: type,
				auditStatus: value
			};
			jxLessonAudit
				.audit(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.$Message.success(res.data.message);
						this.showModal = false;
					} else {
						this.$Message.error(res.data.message);
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		downLoad(id) {
			console.log(id);
		},
		success() {
			console.log(this.$t("classlist_classlist_13"));
		},
		uploadList() {
			console.log(this.$t("classlist_classlist_13"));
		},
		emitGetListData() {
			this.getListData();
		},
		teacherRemote(query) {
			this.getSearchList(9, query);
		},
		assistRemote(query) {
			this.getSearchList(10, query);
		},
		classTeacherRemote(query) {
			this.getSearchList(6, query);
		},
		getSearchList(userType, query) {
			if (userType == 9) {
				this.teacherLoading = true;
			} else if (userType == 10) {
				this.assistLoading = true;
			} else if (userType == 6) {
				this.classTeacherLoading = true;
			}
			let obj = {
				roleIds: userType,
				pageSize: 10,
				name: query
			};
			sysUser
				.listDataByRole(obj)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						if (userType == 9) {
							this.teacherLoading = false;
							this.teacherList = res.data.data;
						} else if (userType == 10) {
							this.assistLoading = false;
							this.assistList = res.data.data;
						} else if (userType == 6) {
							this.classTeacherLoading = false;
							this.classTeacherList = res.data.data;
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					// this.updateLoadingStatus({ isLoading: false });
				});
		},
		//获取数据，根据情况修改接口、传参
		getListData() {
			this.updateLoadingStatus({ isLoading: true });
			let param = {
				pageNumber: this.pageNo,
				pageSize: this.pageSize
			};
			if (this.sortObj.order != "normal" && this.sortObj.key) {
				param.orderByType = this.sortObj.key;
				param.orderByStatus = this.sortObj.order == "asc" ? "1" : "2";
			}
			param.startTime = this.findObj.ClassTimeRange[0] ? new Date(this.findObj.ClassTimeRange[0].format('yyyy-MM-dd 00:00:00')).getTime() : ''
			param.endTime = this.findObj.ClassTimeRange[1] ? new Date(this.findObj.ClassTimeRange[1].format('yyyy-MM-dd 23:59:59')).getTime() : ''
			param.className = this.findObj.className;
			param.type = this.findObj.type;
			param.grade = this.findObj.grade;
			param.officeId = this.findObj.officeId;
			param.teacherIds = this.findObj.teacherId.length
				? this.findObj.teacherId.join(",")
				: "";
			param.assistIds = this.findObj.assistId.length
				? this.findObj.assistId.join(",")
				: "";
			param.classTeacherIds = this.findObj.classTeacherId.length
				? this.findObj.classTeacherId.join(",")
				: "";
			this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
			jxLesson
				.listPage(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data.content;
						this.tableData = result;
						this.dataTotal = res.data.data.totalElements;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		courseTypeChange(val) {
			let type = "jw_course_type"; //适用年级
			sysDict
				.findChildDictByParentDict({
					type
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let aaa = res.data.data.filter(item => {
							return item.type == this.findObj.type;
						});
						this.jw_course_grade = aaa;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},

		baseDataList() {
			let types = "jw_course_type"; //课程包分类,适用年级
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
				.finally(() => {});
			//校区列表
			sysUser
				.dataScopeFilter()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.roomAreaList = res.data.data;

						waitUntil(
							() => {
								console.log(
									"this.app.currOfficeId ==" +
										this.app.currOfficeId
								);
								if (this.app.currOfficeId) {
									this.$set(
										this.findObj,
										"officeId",
										this.app.currOfficeId
									);
								}
								return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval) || false;
							},
							() => {
								this.findObj.ClassTimeRange = defaultDatePickerValue()
								this.options3 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
								this.getListData();
							}
						);
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					// this.updateLoadingStatus({ isLoading: false });
				});
		},
		//可选方法，如果是多选的话必须有
		selectionChange(selection) {
			console.log(selection);
			this.selection = selection;
		},
		getShowTitle(closeLoad) {
			console.log(this.$i18n.locale);
			jxLesson
				.getShowTitle({
					pageIdentifier: "jxLesson",
					voName: "JxLessonVO",
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
		searchInfo() {
			this.pageNo = 1;
			this.getListData();
		},
		resetSearch() {
			for (let item in this.findObj) {
				if (typeof this.findObj[item] === "string") {
					this.findObj[item] = "";
				}
				if (typeof this.findObj[item] === "object") {
					this.findObj[item] = [];
				}
			}
			this.findObj.ClassTimeRange = defaultDatePickerValue();
			this.pageNo = 1;
            if (this.app.currOfficeId == 'all') {
                this.$set(this.findObj, "officeId", '');
            }else{
                this.$set(this.findObj, "officeId", this.app.currOfficeId);
            }
            this.getListData();
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
		showImport(val) {
			this.$router.push({
				name: "hootie.courseListImport"
			});
		}
	},
	watch: {
		"app.currOfficeId": function(val, oldVal) {
		    if(oldVal && this.$route.name == 'hootie.courseList'){
                if (this.app.currOfficeId == 'all') {
                    this.$set(this.findObj, "officeId", '');
                }else{
                    this.$set(this.findObj, "officeId", this.app.currOfficeId);
                }
                this.getListData();
            }
		}
	}
};
</script>
