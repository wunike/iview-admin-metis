<style lang="less">
.chargingManageList {
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
	<div class="chargingManageList">
		<v-search-collapse @search="doSearch" @reset="resetSearch" @changeDivHeight="changeDivHeight">
			<DatePicker
				ref="DatePicker"
				:options="options3"
				split-panels
				@on-open-change="setOptTime"
				type="daterange"
				v-model="operateTime"
				placement="bottom-start"
				separator=" ~ "
				:placeholder="$t('modules_spoc_jw_web_src_views_chargingmanage_unchargingmanagelist_2347')"
				style="width:224px;"
			></DatePicker>
			<DatePicker
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
			<Input v-model="operater" :placeholder="$t('integralflow_10')" style="width: 224px" />
			<Input v-model="stuName" :placeholder="$t('classlist_compontents_detailinfo_35')" style="width: 224px" />
			<Select v-model="teacherId" :placeholder="$t('courselist_courselist_226')" clearable filterable>
				<Option v-for="item in teacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
			<Select v-model="assistId" :placeholder="$t('classlist_classlist_5')" clearable filterable>
				<Option v-for="item in assistList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
			<Select v-model="classTeacherId" :placeholder="$t('classlist_classlist_6')" clearable filterable>
				<Option v-for="item in classTeacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
			<Input v-model="courseName" :placeholder="$t('modules_spoc_jw_web_src_views_chargingmanage_chargingmanagelist_2335')" style="width: 224px" />
			<Select v-model="classCourseId" :placeholder="$t('courselist_courselist_222')" clearable filterable>
				<Option v-for="item in classCourseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
			<!-- <Select v-model="type" :placeholder="$t('messagemanagement_index_346')" clearable filterable @on-change="changeType">
				<Option v-for="item in jw_course_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			<Select v-model="grade" :placeholder="$t('messagemanagement_index_347')" clearable filterable>
				<Option v-for="item in jw_course_grade" v-show="searchSelectTypeId == item.type" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>-->
			<Input v-model="deductCode" :placeholder="$t('modules_spoc_jw_web_src_views_chargingmanage_chargingmanagelist_2339')" style="width: 224px" />
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
			updateShowTitleKey="listPageCancelDeducted"
			:dataTotal="dataTotal"
			:pageNo="pageNo"
			@resetDefault="resetDefaultCol"
			@selectionChange="selectionChange"
			@sortChange="sortChange"
			@pageChange="pageChange"
		></big-table>
		<export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
	</div>
</template>
<script>
import { mapMutations,mapState } from "vuex";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
import bigTable from "@public/modules/bigTable.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import exportModal from "@public/modules/exportModal.vue";
import valid, {
	errors,
	jwLesson,
	jwManualSign,
	jwCourseConsumeLog,
	sysUser,
	sysDict
} from "../../libs/request";
export default {
	name: "jw.unChargingManageList",
	components: {
		bigTable,
		vSearchCollapse,
		exportModal
	},
	computed: {
		...mapState(["userInfo", "app", "calendarConfig"])
	},
	mounted() {
		this.getSchools();
		this.getCourseType(); //获取课程包分类
		this.getShowTitle();
		waitUntil(
			() => {
				if (this.app.currOfficeId) {
					this.officeId = this.app.currOfficeId == 'all' ? '' : this.app.currOfficeId;
				}
				return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval)|| false;
			},
			() => {
				this.operateTime = defaultDatePickerValue()
				this.options3 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
				this.getListData();
			}
		);
	},
	data() {
		return {
			selection: [],
			options3: null,
			tableName: this.$t('modules_spoc_jw_web_src_views_chargingmanage_unchargingmanagelist_2360'),
			tableHeightOut: 72, //324,
			/*搜索相关开始*/
			officeId: "", //学校Id
			classCourseId: "", // 所属班课
			type: "", //课程分类
			grade: "", //选择年级
			teacherId: "", // 授课老师
			assistId: "", //助教
			classTeacherId: "", //服务OO
			pageNo: 1,
			pageSize: this.$store.state.app.pageSizeGlobal,
			searchSelectTypeId: "",
			courseName: "",
			deductCode: "",
			operateTime: [],
			/*搜索相关结束*/
			classCourseList: [],
			schoolList: [],
			courseTime: [],
			operater: "",
			stuName: "",
			teacherList: [],
			assistList: [],
			classTeacherList: [],
			jw_course_type: [],
			jw_course_grade: [],
			updateShowTitle: jwCourseConsumeLog.updateShowTitle,
			exportMethod: jwCourseConsumeLog.exportCancel, //导出用到的方法对象
			defaultShowCol: null,
			dataTotal: 0,
			sortObj: {},
			tableColumnArray: [
				{
					// title: "合同纸质编号",
					key: "ctNo",
					render: (h, params) => {
						return h(
							"a",
							{
								style: {
									"word-break": "break-all"
								},
								on: {
									click: () => {
										this.$router.push({
											name: 'sign.pactDetails',
											query: {
												id: params.row.ctId,
												ctNo: params.row.ctNo
											}
										});
									}
								}
							},
							params.row.ctNo
						);
					}
				},
				{
					key: "cancelTypeName",
					minWidth: 45,
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							[
								h("span", {}, this.$t('modules_spoc_jw_web_src_views_chargingmanage_unchargingmanagelist_2361')),
								h(
									"span",
									{
										style: {
											color: "#44bcb7"
										}
									},
									params.row.cancelTypeName
								),
								h("span", {}, this.$t('modules_spoc_jw_web_src_views_chargingmanage_unchargingmanagelist_2362')),
								h(
									"span",
									{
										style: {
											color: "#44bcb7"
										}
									},
									this.$t('modules_spoc_crm_web_src_views_customer360_components_studentcourses_9231')
								)
							]
						);
					}
				}
			],
			tableData: [],
			btnList: [
				[
                    {
                        style: {},
                        type: "",
                        btnClick: this.isExport,
                        text: this.$t('integralflow_4'),
                        value: "1",
                        parentName: this.$t('integralflow_5')
                    },
                    {
                        style: {},
                        type: "",
                        btnClick: this.isExport,
                        text: this.$t('integralflow_6'),
                        value: "2",
                        parentName: this.$t('integralflow_5')
                    }
                ]
			]
		};
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		resetDefaultCol(){
			this.updateLoadingStatus({ isLoading: true });
            jwCourseConsumeLog.clearShowField({
                pageIdentifier: "listPageCancelDeducted",
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
				this.operateTime = []
			}
		},
		changeDivHeight(height) {
			this.tableHeightOut = height;
		},
		changeSchool(schoolId) {
			this.teacherId = "";
			this.assistId = "";
			this.classTeacherId = "";
			this.classCourseId = "";

			//下拉菜单备选项清空
			this.classCourseList = [];
			this.teacherList = [];
			this.assistList = [];
			this.classTeacherList = [];
			if (schoolId) {
				this.getClassCourseByOfficeId(schoolId);
				this.getUserByOfficeIdAndRoleId(schoolId, "teacher_id"); // 授课教师 teacher_id
				this.getUserByOfficeIdAndRoleId(schoolId, "assist_id"); // 授课助教 assist_id
				this.getUserByOfficeIdAndRoleId(schoolId, "class_teacher_id"); // 服务oo class_teacher_id
			}
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
			let types = "jw_course_type"; //,jw_course_grade' //课程包分类,适用年级
			sysDict
				.batchListData({
					types
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.jw_course_type = res.data.data.jw_course_type;
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
		//获取数据，根据情况修改接口、传参
		getListData() {
			this.updateLoadingStatus({
				isLoading: true
			});
			this.currentPage = this.pageNo;
			let param = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				deductCanceledStartDate: this.operateTime[0] ? new Date(this.operateTime[0]).format('yyyy-MM-dd 00:00:00') : '',
				deductCanceledEndDate: this.operateTime[1] ? new Date(this.operateTime[1]).format('yyyy-MM-dd 23:59:59') : '',
				officeId: this.officeId,
				operateCanceledName: this.operater,
				stuName: this.stuName,
				lessonStartDate: this.courseTime[0] ? new Date(this.courseTime[0]).format('yyyy-MM-dd 00:00:00') : '',
				lessonEndDate: this.courseTime[1] ? new Date(this.courseTime[1]).format('yyyy-MM-dd 23:59:59') : '',
				teacherId: this.teacherId,
				assistId: this.assistId,
				classTeacherId: this.classTeacherId,
				courseName: this.courseName,
				classCourseId: this.classCourseId,
				deductCode: this.deductCode
			};
			if (this.sortObj.order != "normal" && this.sortObj.key) {
				param.orderByType = this.sortObj.key;
				param.orderByStatus = this.sortObj.order == "asc" ? "1" : "2";
			}
			this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
			// console.log(param)
			this.selection = []
			jwCourseConsumeLog
				.listPageCancelDeducted(param)
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
		//必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
		getShowTitle(closeLoad) {
			jwCourseConsumeLog
				.getShowTitle({
					pageIdentifier: "listPageCancelDeducted",
					voName: "JwCourseConsumeLogCanceledVO",
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
			this.classCourseList = [];
			this.teacherList = [];
			this.assistList = [];
			this.classTeacherList = [];
			this.courseTime = [];
			this.operateTime = defaultDatePickerValue();
			this.classCourseId = "";
			this.type = "";
			this.grade = "";
			this.teacherId = "";
			this.assistId = "";
			this.classTeacherId = "";
			this.pageNo = 1;
			this.pageSize = this.$store.state.app.pageSizeGlobal;
			this.searchSelectTypeId = "";
			this.operater = "";
			this.stuName = "";
			this.courseName = "";
			this.deductCode = "";
			this.getListData();
			this.changeSchool(this.officeId)
		},
		selectionChange(selection) {
            this.selection = selection;
        },
		isExport(val) {
            //这里val的值。是根据设置下拉类型button设定的值来匹配判断
            if (val == "2" && !this.selection.length) {
                this.$Message.error(this.$t('scoretemplate_scoretemplate_572'));
                return;
            }
			let searchObj = this.searchObj;
			// delete searchObj.pageNo
			// delete searchObj.pageSize
			delete searchObj.ids
            if (val == "2") {
                searchObj.ids = this.selection.map(item => {
					return item.id;
				})
            }
            this.$refs.exportModal.noShowExport(this.exportMethod, searchObj);
        },
	},
	watch: {
		"app.currOfficeId": function(val, oldVal) {
			if (oldVal && this.$route.name == 'jw.unChargingManageList') {
				this.officeId = this.app.currOfficeId == 'all' ? '' : this.app.currOfficeId;
				this.getListData();
				this.changeSchool(this.officeId)
			}
		}
	}
};
</script>
