<style lang="less">
.sihin-detail-normal-container {
	.table-name-nomal {
		span {
			@h: 16px;
			float: left;
			width: @h;
			height: @h;
			border-radius: @h;
			margin-right: 8px;
			margin-top: 3px;
		}
		em {
			font-style: inherit;
		}
		.bgColor0 {
			background-color: #999;
		}
		.bgColorA {
			background-color: #E2E4E8;
		}
		.bgColorB {
			background-color: #44bcb7;
		}
		.bgColorC {
			background-color: #46BC15;
		}
		div {
			float: left;
			font-size: 14px;
			font-weight: normal;
		}
	}
	// .ivu-table-fixed-body, .ivu-table{
	//     overflow: visible;
	// }
	// .ivu-table-wrapper{

	// }
	.ivu-table-fixed-right::before,
	.ivu-table-fixed::before {
		z-index: 3;
	}
	.edit-not {
		td {
			background: #fff;
			color: #999;
		}
	}
	.table-name-unnomal {
		span {
			@h: 16px;
			float: left;
			width: @h;
			height: @h;
			background: #FF3000;
			border-radius: @h;
			margin-right: 8px;
			margin-top: 3px;
		}
		.txt {
			float: left;
			font-size: 14px;
			font-weight: normal;
			line-height: 21px;
		}
		.ivu-tooltip-content {
			width: 276px;
		}
		.ivu-tooltip-inner {
			white-space: pre-wrap;
		}
		.tips {
			float: left;
			margin-left: 8px;
			font-size: 18px;
			margin-top: 2px;
			height: 21px;
			line-height: 21px;
		}
		.ivu-icon {
			display: block;
		}
	}
}
.remarks-box {
	@p: 80px;
	position: relative;
	padding-left: @p;
	& > span {
		position: absolute;
		left: 0;
		top: 4px;
		width: @p - 6px;
		text-align: right;
		font-size: 14px;
		color: #999;
    }
    .ivu-input{
        height: auto;
    }
}
</style>

<template>
	<div class="sihin-detail-normal-container">
		<!-- :tableHeight="tableHeight" -->
		<big-table
			v-if="defaultShowCol"
			class="mytable"
			:tableData="tableData"
			:tableColumnArray="tableColumnArray"
			:defaultShowCol="defaultShowCol"
			:btnList="btnList"
			:tableHeightOut="tableHeightOut"
			:canSelection="true"
			:showPage="showPage"
			:updateShowTitleMethod="updateShowTitle"
			updateShowTitleKey="signinDetail/listPage"
			:dataTotal="dataTotal"
			:rowClassName="rowClassName"
			@onUpdateShowTitle="onUpdateShowTitle"
			@selectionChange="selectionChange"
			@pageChange="pageChange"
		>
			<div slot="tableNameSlot" class="table-name-nomal" v-if="nomal">
				<span
					:class="{
                        bgColor0: nomalTyoe == 'unAttendClass', 
                        bgColorA: nomalTyoe == 'unAttendance', 
                        bgColorB: nomalTyoe == 'unFinishAttendance', 
                        bgColorC: nomalTyoe == 'finishAttendance', 
                    }"
				></span>
				<div>
					<em v-if="nomalTyoe == 'unAttendClass'">{{$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1043')}}</em>
					<em v-else-if="nomalTyoe == 'unAttendance'">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentcourses_923')}}</em>
					<em v-else-if="nomalTyoe == 'unFinishAttendance'">{{$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1045')}}</em>
					<em v-else-if="nomalTyoe == 'finishAttendance'">{{$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1046')}}</em>
				</div>
			</div>
			<div slot="tableNameSlot" class="table-name-unnomal" v-else>
				<span></span>
				<div class="txt">{{$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3109')}}</div>
				<Tooltip
					class="tips"
					placement="top"
					theme="light"
					max-width="276"
					:content="$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3110')"
				>
					<Icon type="ios-help-circle" />
				</Tooltip>
			</div>
		</big-table>
		<Modal v-model="remarksModal" :title="$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3111')" width="800" @on-ok="saveRemarks">
			<div class="remarks-box">
				<span>{{$t('views_staff_components_lefttree_648')}}</span>
				<Input v-model="remarks" type="textarea" :rows="4" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" />
			</div>
		</Modal>
		<Modal v-model="kkkssModal" title="修改扣课课时数" width="400" @on-ok="saveKkkss">
			<div class="remarks-box">
				<span>扣课课时数:</span>
				<InputNumber :min="0" v-model="kkkss" style="width:260px;"></InputNumber>
			</div>
		</Modal>
	</div>
</template>

<script>
import { mapMutations } from "vuex";
import bigTable from "@public/modules/bigTable";
// import exportModal from "@public/modules/exportModal.vue";
import { waitUntil } from "@public/libs/util";
import valid, {
	errors,
	sys,
	jwManualSign,
	jwAttendance,
    common,
    jwLesson
} from "../../../libs/request";

export default {
	props: {
		status: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			editRow: null,
			kkkssModal:false,
			kkkss: 0,
			isActioning: false, //多次提交拦截
			tableHeightOut: 146, //324,
			remarksModal: false,
			remarks: "",
			remarksRow: {},
			tableData: [],
			updateShowTitle: jwManualSign.updateShowTitle,
			dataTotal: 0,
			showPage: false,
			pageNo: 1,
			pageSize: this.$store.state.app.pageSizeGlobal,
			selection: [],
			// tableHeight: '480',
			defaultShowCol: null,
			tableColumnArray: [],
			tableHeight: 48 * 11,
			colRequireTrue: [],
			colRequireFalse: []
		};
	},
	computed: {
		nomal() {
			// true：正常，false：异常
			return this.status == "unNormal" ? false : true;
		},
		nomalTyoe() {
			return this.status;
		},
		lessonId() {
			return this.$route.query.lessonId;
		},
		btnList() {
			let arr = [];
			if (this.nomal)
				arr = [
					{
						style: {},
						type: "",
						btnClick: this.openModal1,
						text: this.$t('classlist_compontents_detailinfo_46')
					},
					{
						style: {},
						type: "",
						btnClick: this.openModal2,
						text: this.$t('modules_spoc_crm_web_src_views_customer360_components_studentcourses_9231')
					},
					{
						style: {},
						type: "",
						btnClick: this.openModal3,
						text: this.$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2320')
					},
					{
						style: {},
						type: "",
						btnClick: this.openModal4,
						text: this.$t('modules_spoc_crm_web_src_views_customer360_components_studentcourses_922')
					},
					[
						{
							style: {},
							type: "",
							text: this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3117'),
							value: "1",
							parentName: this.$t('modules_spoc_crm_web_src_views_customer360_components_studentother_1001'),
							btnClick: this.exportMethod
						},
						{
							style: {},
							type: "",
							text: this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3119'),
							value: "2",
							parentName: this.$t('modules_spoc_crm_web_src_views_customer360_components_studentother_1001'),
							btnClick: this.exportMethod
						}
					]
				];
			else
				arr = [
					{
						style: {},
						type: "",
						btnClick: this.createCourse,
						text: this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3120')
					},
					{
						style: {},
						type: "",
						btnClick: this.createCourse,
						text: this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3121')
					},
					[
						{
							style: {},
							type: "",
							text: this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3117'),
							value: "1",
							parentName: this.$t('modules_spoc_crm_web_src_views_customer360_components_studentother_1001'),
							btnClick: this.exportMethod
						},
						{
							style: {},
							type: "",
							text: this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3119'),
							value: "2",
							parentName: this.$t('modules_spoc_crm_web_src_views_customer360_components_studentother_1001'),
							btnClick: this.exportMethod
						}
					]
				];
			return arr;
		}
	},
	components: {
		bigTable
		// exportModal,
	},
	created() {
		this.courseCol();
	},
	mounted() {
        this.getShowTitle();
        waitUntil(
            () => {
                return this.nomalTyoe
            },
            () => {
                // console.log(this.nomalTyoe, this.status)
                if(this.nomalTyoe == 'unAttendance' || this.nomalTyoe == 'unAttendClass') {
                    // 未考勤、未上课
                    this.initAtts(() => {
                        this.getListData();
                    })
                } else {
                    this.getListData();
                }
            }
        );
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		saveKkkss(){
			this.uploadLists(this.editRow, this.kkkss);
		},
        initAtts(callback) {
            let params = {
				lessonIds: this.lessonId,
            };
            jwLesson.initAtts(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    callback && callback();
                }
            })
            .catch(errors.call(this));
        },
		createCourse() {},
		saveRemarks() {
			// 保存备注
			// let __attendanceStudentJson = JSON
			let params = {
				lessonId: this.lessonId,
				attendanceStatus: "",
				attendanceStudentJson: JSON.stringify([
					{
						attendanceId: this.remarksRow.attendanceId,
						lessonId: this.lessonId,
						studentId: this.remarksRow.id,
						comStudentCourseRelId: this.remarksRow
							.comStudentCourseRelItemId,
						remark: this.remarks,
						flag: "1"
					}
				])
			};
			this.saveAttendance(params);
			// jwAttendance.saveRemark(params)
			// .then(valid.call(this))
			// .then(res => {
			//     if (res.ok) {
			//         this.getListData();
			//     }
			// })
			// .catch(errors.call(this));
		},
		changeStudentCourseName(id, index) {
			// console.log(id)
			// console.log(index)
			// 修改所属课程的下拉菜单
			this.tableData[index].comStudentCourseRelList.forEach(item => {
				item._checked = !!(item.id == id);
			});
			let params = {
				id: id
			};
			common
				.comStudentCourseRelFindOneById(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let data = res.data.data;
						// 剩余请假次数
						this.tableData[index].remainLeaveNum =
							data.leftLeaveNum;
						// 剩余课时数
						this.tableData[index].remainCourseHour =
							data.leftCourseHour;
						this.tableData[index].comStudentCourseRelItemId = id;
						// console.log(this.tableData[index])
					}
				})
				.catch(errors.call(this));
		},
		courseCol() {
			// 班课列表
			this.tableColumnArray = [
				{
					key: "studentCode",
					minWidth: 45,
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.studentCode
						);
					}
				},
				{
					key: "tel",
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.tel
						);
					}
				},
				{
					key: "createDate",
					minWidth: 55
				},
				{
					key: "deductTime",
					minWidth: 55
				},
				{
					key: "createBy",
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.createBy
						);
					}
				},
				{
					key: "attendBy",
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.attendBy
						);
					}
				},
				{
					key: "studentCourseName",
					// width: 80,
					render: (h, params) => {
						let _this = this;
						let _lists = params.row.comStudentCourseRelList;
						// if(params.row.attendanceStatus == 'none') {
						//     // 未考勤
						// }
						// console.log(params.row.studentName)
						// console.log(!!params.row.courseName)
						if (params.row.courseName) {
							return h("div", params.row.courseName);
						}
						// if (
						// 	params.row.classCourseRelStatus == "finish" &&
						// 	params.row.attendanceStatus == "none"
						// ) {
						// 	return h("div", "/");
						// }
						if (_lists && _lists.length) {
							let dom = [];
							let optionLists = [];
							let _str = "";
							let _id = "";
							_lists.forEach((item, i) => {
								if (item._checked) {
									_str = item.courseName;
									_id = item.id;
								}
								optionLists.push(
									h(
										"Option",
										{
											props: {
												value: item.id
											}
										},
										item.courseName
									)
								);
							});
							dom.push(
								h(
									"Tooltip",
									{
										props: {
                                            transfer: true,
											content: this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3122'),
											placement:
												params.row._index > 5
													? "top-start"
													: "bottom-start"
										},
										style: {
											display: params.row
												.showSelectStudentCourseName
												? "none"
												: "block"
										}
									},
									[
										h(
											"p",
											{
												class: {
													color44bcb7: true
												},
												on: {
													click: () => {
														params.row.showSelectStudentCourseName = true;
													}
												}
											},
											_str
										)
									]
								)
							);
							dom.push(
								h(
									"Select",
									{
										style: {
											display: params.row
												.showSelectStudentCourseName
												? "block"
												: "none"
										},
										props: {
                                            transfer: true,
											value: _id
										},
										on: {
											"on-change": event => {
												// console.log(event)
												// console.log(params.row._index)
												_this.changeStudentCourseName(
													event,
													params.row._index
												);
											},
											"on-open-change": event => {
												// 下拉框收起的时候
												if (!event) {
													params.row.showSelectStudentCourseName = false;
												}
											}
										}
									},
									optionLists
								)
							);
							return h("div", dom);
						} else return h("div", "/");
					}
				},
				{
					key: "deductHours",
					title: this.$t('modules_spoc_jw_web_src_views_checkinelectronic_index_2386'),
					// width: 90,
					render: (h, params) => {
						let _this = this;
						let create = this.$createElement;
						let saveFlag = true;
						if (
							params.row._disabled ||
							params.row.attendanceStatus == "absent" ||
							params.row.attendanceStatus == "present"
						) {
							return h(
								"div",
								{
									// class: {
									//     color44bcb7: true
									// }
								},
								params.row.deductHours
							);
						} else {
							let dom = [];
							dom.push(
								h(
									"Tooltip",
									{
										props: {
                                            transfer: true,
											content: this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3122'),
											placement:
												params.row._index > 5
													? "top-start"
													: "bottom-start"
										},
										// style: {
										// 	display: params.row.edit
										// 		? "none"
										// 		: "block"
										// }
									},
									[
										h(
											"p",
											{
												class: {
													color44bcb7: true
												},
												on: {
													click: () => {
														// params.row.edit = true;
														// setTimeout(() => {
														// 	_this.$refs[
														// 		`input${params.index}`
														// 	].focus();
														// }, 200);
														_this.editRow = params.row
														_this.kkkss = Number(params.row.deductHours) || 0
														_this.kkkssModal = true
													}
												}
											},
											params.row.deductHours
										)
									]
								)
							);
							// dom.push(
							// 	create("Input", {
							// 		ref: `input${params.index}`,
							// 		style: {
							// 			display: params.row.edit
							// 				? "block"
							// 				: "none"
							// 		},
							// 		props: {
							// 			value: params.row.deductHours,
							// 			min: 0,
							// 			"active-change": false
							// 		},
							// 		on: {
							// 			"on-blur"(e) {
							// 				if (
							// 					!/^[0-9]\d{0,9}$/.test(
							// 						e.target.value
							// 					)
							// 				) {
							// 					//输入错误
							// 					saveFlag = false;
							// 					_this.$Message.error(
							// 						this.$t('views_coursepack_coursepack_374')
							// 					);
							// 				} else {
							// 					saveFlag = true;
							// 				}
							// 				if (
							// 					saveFlag &&
							// 					Number(e.target.value) !=
							// 						Number(
							// 							params.row.deductHours
							// 						)
							// 				) {
							// 					_this.$nextTick(() => {
							// 						_this.uploadLists(
							// 							params.row,
							// 							e.target.value
							// 						);
							// 					});
							// 				} else {
							// 					params.row.edit = false;
							// 				}
							// 			}
							// 		}
							// 	})
							// );
							return h("div", dom);
						}
					}
				},
				{
					key: "attendanceStatusName",
					render: (h, params) => {
						let str = params.row.attendanceStatusName;
						if (params.row.attendanceStatusName == "1") {
							str = "/";
						}
						return h("div", str);
					}
				},
				{
					key: "attendanceDetailStatusName",
					title: this.$t('modules_spoc_jw_web_src_views_checkinelectronic_index_2385'),
					// width: 90,
					render: (h, params) => {
						let _this = this;
						if (
							params.row._disabled ||
							!this.nomal ||
							params.row.attendanceStatus == "none" ||
							params.row.attendanceStatus == "cancel" ||
							params.row.attendanceStatus === "0"
						) {
							return h(
								"div",
								{
									// class: {
									//     color44bcb7: true
									// }
								},
								params.row.attendanceDetailStatusName || "/"
							);
						} else {
							let dom = [];
							let optionLists = [];
							if (params.row.attendanceStatus == "present") {
								// 已上
								optionLists = [
									h(
										"Option",
										{
											props: {
												value: "nomarl"
											}
										},
										this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3126')
									),
									h(
										"Option",
										{
											props: {
												value: "delay arrive"
											}
										},
										this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3127')
									),
									h(
										"Option",
										{
											props: {
												value: "early leave"
											}
										},
										this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3128')
									)
								];
							} else if (
								params.row.attendanceStatus == "absent"
							) {
								// 缺勤
								optionLists = [
									h(
										"Option",
										{
											props: {
												value: "leave"
											}
										},
										this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3129')
									),
									h(
										"Option",
										{
											props: {
												value: "compassionate leave"
											}
										},
										this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3130')
									),
									h(
										"Option",
										{
											props: {
												value: "sick leave"
											}
										},
										this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3131')
									),
									h(
										"Option",
										{
											props: {
												value: "absent"
											}
										},
										this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3132')
									),
									h(
										"Option",
										{
											props: {
												value: "other"
											}
										},
										this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3133')
									)
								];
							}
							dom.push(
								h(
									"Tooltip",
									{
										props: {
                                            transfer: true,
											content: this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3122'),
											placement:
												params.row._index > 5
													? "top-start"
													: "bottom-start"
										},
										style: {
											display: params.row
												.showAttendanceDetailStatus
												? "none"
												: "block"
										}
									},
									[
										h(
											"p",
											{
												class: {
													color44bcb7: true
												},
												on: {
													click: () => {
														params.row.showAttendanceDetailStatus = true;
													}
												}
											},
											params.row
												.attendanceDetailStatusName ||
												"/"
										)
									]
								)
							);
							dom.push(
								h(
									"Select",
									{
										style: {
											display: params.row
												.showAttendanceDetailStatus
												? "block"
												: "none"
										},
										props: {
                                            transfer: true,
											value:
												params.row
													.attendanceDetailStatus
										},
										on: {
											"on-change": event => {
												let _data = {
													lessonId: _this.lessonId,
													attendanceStatus: "",
													attendanceStudentJson: JSON.stringify(
														[
															{
																attendanceId:
																	params.row
																		.attendanceId,
																lessonId:
																	_this.lessonId,
																studentId:
																	params.row
																		.id,
																comStudentCourseRelId:
																	params.row
																		.comStudentCourseRelItemId,
																detailStatus: event
															}
														]
													)
												};
												_this.saveAttendance(_data);
											},
											"on-open-change": event => {
												// 下拉框收起的时候
												if (!event) {
													params.row.showAttendanceDetailStatus = false;
												}
											}
										}
									},
									optionLists
								)
							);
							return h("div", dom);
						}
					}
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3111'),
					key: "remark",
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.remark
						);
					}
				},
				{
					title: this.$t('classlist_compontents_detailinfo_45'),
					key: "doAction",
					width: 70,
					render: (h, params) => {
						return h("div", [
							h(
								"a",
								{
									on: {
										click: () => {
											this.remarksRow = params.row;
											this.remarksModal = true;
											this.remarks = params.row.remark;
										}
									}
								},
								this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3111')
							)
						]);
					}
				}
			];
		},
		uploadLists(row, txt) {
			let params = {
				lessonId: this.lessonId,
				attendanceStatus: "",
				attendanceStudentJson: JSON.stringify([
					{
						attendanceId: row.attendanceId,
						lessonId: this.lessonId,
						studentId: row.id,
						comStudentCourseRelId: row.comStudentCourseRelItemId,
						hour: txt
					}
				])
			};
			if (txt == 0) {
				// 扣课课时数设置为0，需要查询剩余请假次数
				this.getLeftLeaveNum(params);
			} else this.saveAttendance(params);
		},
		getLeftLeaveNum(_params) {
			// 根据Id获取剩余请假次数
			// console.log(_params)
			let params = {
				id: JSON.parse(_params.attendanceStudentJson)[0]
					.comStudentCourseRelId
			};
			common
				.comStudentCourseRelGetLeftLeaveNum(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let _data = Number(res.data.data);
						if (_data < 1) {
							this.$Message.error(
								this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3135')
							);
							this.getListData();
						} else this.saveAttendance(_params);
					} else {
						this.getListData();
					}
				})
				.catch(errors.call(this));
		},
		saveAttendance(_params) {
			// 保存扣课课时数、出勤详情
			// 修改课时/考勤详情/添加备注
			let params = Object.assign({}, _params);
			jwAttendance
				.saveAttendance(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.getListData();
					}
				})
				.catch(errors.call(this));
		},
		getShowTitle() {
			let params = {
				pageIdentifier: "signinDetail/listPage",
				lang: this.$i18n.locale
			};
			jwManualSign
				.getShowTitle(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let data = res.data.data;
						this.defaultShowCol = data;
						this.colRequireTrue = data.true;
						this.colRequireFalse = data.false;
					}
				})
				.catch(errors.call(this));
		},
		onUpdateShowTitle(arr) {
			// console.log(arr)
			this.colRequireFalse = arr;
		},
		getListData() {
		    //获取数据，根据情况修改接口、传参
			this.updateLoadingStatus({ isLoading: true });
			this.currentPage = this.pageNo;
			let params = {
				lessonId: this.lessonId,
				pageNo: this.pageNo,
				pageSize: this.pageSize
			};
			this.searchObj = params; //这里需要给searchObj 赋值，导出数据的时候需要用到
			jwManualSign
				.listPage(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data;
						result.list.forEach(e => {
							e.edit = false;
							e.showSelectStudentCourseName = false;
							e.showAttendanceDetailStatus = false;
							/* if (e.attendanceStatus == "1" ||
								e.attendanceStatus == "deleted" ||
                                // (['stop','finish','refunded'].indexOf(e.classCourseRelStatus) > -1 && e.attendanceStatus == "none")
                                (['quit','finish','stop'].indexOf(e.classCourseRelStatus) > -1) || 
                                e.isStudying == 0
                            ) e._disabled = true; */
							if (e.isStudying == 0 || e.classCourseRelStatus == "stop") e._disabled = true;
							if (
								e.comStudentCourseRelList &&
								e.comStudentCourseRelList.length
							) {
								e.comStudentCourseRelItemId =
									e.comStudentCourseRelList[0].id;
								e.comStudentCourseRelList.forEach(_list => {
									_list._checked = false;
								});
								e.comStudentCourseRelList[0]._checked = true;
							}
						});
						this.tableData = result.list;
						this.dataTotal = result.total;
						if (result.pageSize > 1) this.showPage = true;
						else this.showPage = false;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		//可选方法，如果是多选的话必须有
		selectionChange(selection) {
			// console.log(selection)
			this.selection = selection;
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
		openModal1() {
			// 删除
			if (!this.selection || !this.selection.length) {
				this.$Message.error(this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3136'));
				return;
			}
			// 5370 手工签到详情，只有未考勤状态可删除
			let flag = false;
			this.selection.forEach(item => {
				if (
					item.attendanceStatus != "none" &&
					item.attendanceStatus != "0"
				)
					flag = true;
			});
			if (flag) {
				this.$Message.error(this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3137'));
				return;
			}
			this.$Modal.confirm({
				title: this.$t('scoretemplate_scoretemplate_561') + '<span style="color: #FAAD14;">' + this.$t('spoc_hootie_web_481') + '</span>' + this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3140'),
				content: this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3141'),
				onOk: () => {
					this.delStu();
				}
			});
		},
		delStu() {
			// 执行删除
			let selectionLists = [];
			this.selection.forEach(item => {
				// console.log(item.attendanceId)
				selectionLists.push({
					attendanceId: item.attendanceId,
					lessonId: this.lessonId,
					studentId: item.id,
					comStudentCourseRelId: item.comStudentCourseRelItemId
				});
			});
			let params = {
				attendanceStatus: "deleted",
				lessonId: this.lessonId,
				attendanceStudentJson: JSON.stringify(selectionLists)
			};
			// console.log(params)
			jwManualSign
				.deleteLessonAttendance(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.$emit("uploadForm");
						this.getListData();
					}
				})
				.catch(errors.call(this));
		},
		openModal2() {
			// 未考勤
            // 变更，未上课状态不能对学员进行考勤
            if(this.nomalTyoe == 'unAttendClass') {
                this.$Message.error(this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3142'))
            } else {
                if (!this.selection || !this.selection.length) {
                    this.$Message.error(this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3143'));
                    return;
                }
                this.$Modal.confirm({
                    title: this.$t('scoretemplate_scoretemplate_561') + '<span style="color: #FAAD14;">' + this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_3021') + '</span>' + this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3140'),
                    content: this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3145'),
                    onOk: () => {
                        this.attendanceStudentNoneStatus();
                    }
                });
            }
		},
		attendanceStudentNoneStatus() {
			// 批量未考勤
			if(this.isActioning){ //多次提交拦截
				return
			}
			this.isActioning = true
			this.updateLoadingStatus({
				isLoading: true
			});
			let _attendanceStudentJson = [];
			this.selection.forEach(item => {
				_attendanceStudentJson.push({
					attendanceId: item.attendanceId || "",
					lessonId: this.lessonId,
					studentId: item.id || "",
					comStudentCourseRelId: item.comStudentCourseRelItemId || ""
				});
			});
			let params = {
				attendanceStatus: "none",
				lessonId: this.lessonId,
				attendanceStudentJson: JSON.stringify(_attendanceStudentJson)
			};
			jwAttendance
				.attendanceStudentNoneStatus(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.selection = []
						this.$emit("uploadForm");
						this.getListData();
					} else {
						this.updateLoadingStatus({
							isLoading: false
						});
					}
				})
				.catch(errors.call(this)).finally(()=>{
					setTimeout(()=>{
						//多次提交拦截
						this.isActioning = false
					},200)
				});
		},
		openModal3() {
            // 已上
            // 变更，未上课状态不能对学员进行考勤
            if(this.nomalTyoe == 'unAttendClass') {
                this.$Message.error(this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3142'))
            } else {
                if (!this.selection || !this.selection.length) {
                    this.$Message.error(this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3146'));
                    return;
                }
                let _continue = true;
                this.selection.forEach(selection => {
                    if (selection.attendanceStatus == "absent") {
                        this.$Message.error(
                            this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3147')
                        );
                        _continue = false;
                        return;
                    }
                    if (selection.attendanceStatus == "present") {
                        // 5437 学员已上和缺勤时,不能再次已上和缺勤
                        this.$Message.error(this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3148'));
                        _continue = false;
                        return;
                    }
                });
                if (!_continue) return;
                this.$Modal.confirm({
                    title: this.$t('scoretemplate_scoretemplate_561') + '<span style="color: #FAAD14;">' + this.$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_3020') + '</span>' + this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3140'),
                    content: this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3150'),
                    onOk: () => {
                        this.findHourNotEnough("present");
                    }
                });
            }
		},
		openModal4() {
            // 缺勤
            // 变更，未上课状态不能对学员进行考勤
            if(this.nomalTyoe == 'unAttendClass') {
                this.$Message.error(this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3142'))
            } else {
                if (!this.selection || !this.selection.length) {
                    this.$Message.error(this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3151'));
                    return;
                }
                let _continue = true;
                this.selection.forEach(selection => {
                    if (selection.attendanceStatus == "present") {
                        this.$Message.error(
                            this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3152')
                        );
                        _continue = false;
                        return;
                    }
                    if (selection.attendanceStatus == "absent") {
                        // 5437 学员已上和缺勤时,不能再次已上和缺勤
                        this.$Message.error(this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3153'));
                        _continue = false;
                        return;
                    }
                });
                if (!_continue) return;
                this.$Modal.confirm({
                    title: this.$t('scoretemplate_scoretemplate_561') + '<span style="color: #FAAD14;">' + this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3154') + '</span>' + this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3140'),
                    content: this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3155'),
                    onOk: () => {
                        this.findHourNotEnough("absent");
                    },
                    onCancel: () => {}
                });
            }
		},
		findHourNotEnough(type) {
			if(this.isActioning){ //多次提交拦截
				return
			}
			this.isActioning = true
			this.updateLoadingStatus({
				isLoading: true
			});
			// 获取考勤学员课时是否大于本次消耗
			let _attendanceStudentJson = [];
			this.selection.forEach(item => {
				_attendanceStudentJson.push({
					attendanceId: item.attendanceId || "",
					lessonId: this.lessonId,
					studentId: item.id || "",
					comStudentCourseRelId: item.comStudentCourseRelItemId || "",
					hour: item.deductHours
				});
			});
			let params = {
				attendanceStatus: type,
				lessonId: this.lessonId,
				attendanceStudentJson: JSON.stringify(_attendanceStudentJson)
			};
			jwAttendance
				.findHourNotEnough(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						// console.log(res.data.data)
						let data = res.data.data;
						if (data && data.length == 0) {
							this.tableData = []
							this.selection = []
							this.attendanceStudent(params);
						} else {
							//
							// this.$Message.error(data.join(',') + '不能修改');
							let _this = this;
							setTimeout(() => {
								_this.$Modal.error({
									title: this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3156'),
									content:
										this.$t('modules_spoc_jw_web_src_views_models_2926') +
										data.join(",") +
										this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3158')
								});
							}, 500);
							this.updateLoadingStatus({
								isLoading: false
							});
						}
					}
				})
				.catch(errors.call(this)).finally(()=>{
					setTimeout(()=>{
						//多次提交拦截
						this.isActioning = false
					},200)
				});
		},
		attendanceStudent(params) {
			// 考勤学员 - 对学员考勤状态进行修改
			jwAttendance
				.attendanceStudentStatus(params)
				.then(valid.call(this))
				.then(res => {
				})
				.catch(errors.call(this)).finally(()=>{
					this.$emit("uploadForm");
					this.getListData();
				});
		},
		rowClassName(row, index) {
			if (row._disabled) {
				return "edit-not";
			}
			return "";
		},
		exportMethod(val) {
			let params = {
				pageNo: "1",
				pageSize: "100",
				lessonId: this.lessonId,
				showFieldList: []
			};
			// console.log(this.colRequireTrue);
			// console.log(this.colRequireFalse);
			// this.colRequireTrue.forEach(item => {
			// 	params.showFieldList.push({
			// 		name: item.name,
			// 		title: item.title,
			// 		selected: item.selected
			// 	});
			// });
			// this.colRequireFalse.forEach(item => {
			// 	params.showFieldList.push({
			// 		name: item.name,
			// 		title: item.title,
			// 		selected: item.selected
			// 	});
			// });
			if (val == 2) {
				params.exportFlag = "noTel"
				// 打印（无联系电话）
				// params.showFieldList.forEach((item, index) => {
				// 	if (item.name == "tel") {
				// 		params.showFieldList.splice(index, 1);
				// 	}
				// });
			} else {
				params.exportFlag = "hasTel"
                // params.showFieldList.forEach((item, index) => {
				// 	if (item.name == "tel") {
				// 		item.selected = true
				// 	}
				// });
            }
			// console.log(params.showFieldList)
			this.exportMethodOk(params);
		},
		exportMethodOk(params) {
			jwManualSign
				.export(params)
				.then(valid.call(this))
				.then(res => {
					if (res.data) {
						const blob = new Blob([res.data], {
							type: "application/actet-stream;charset=utf-8"
						});
						const contentDisposition =
							res.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
						const patt = new RegExp(
							"filename=([^;]+\\.[^\\.;]+);*"
						);
						const result = patt.exec(contentDisposition);
						if (!result) {
							this.$Message.error(this.$t('integralflow_19'));
							return;
						}
						const filename = decodeURIComponent(result[1]);
						const downloadElement = document.createElement("a");
						const href = window.URL.createObjectURL(blob); //创建下载的链接
						downloadElement.style.display = "none";
						downloadElement.href = href;
						downloadElement.download = filename; //下载后文件名
						document.body.appendChild(downloadElement);
						downloadElement.click(); //点击下载
						document.body.removeChild(downloadElement); //下载完成移除元素
						window.URL.revokeObjectURL(href);
					}
				})
				.catch(errors.call(this));
		}
	}
};
</script>


