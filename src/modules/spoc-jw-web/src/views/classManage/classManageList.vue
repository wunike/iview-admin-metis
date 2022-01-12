<style lang="less">
.MangeListClass {
	.ivu-badge-status-default {
		background: #ccc;
	}
}

.mytable {
	margin-top: 10px;
	width: 100%;
	background: rgba(255, 255, 255, 1);
	border-radius: 4px;
	padding: 0 16px;
}

.fontS {
	font-size: 14px;
	font-family: PingFangSC-Regular;
	font-weight: 400;
	color: rgba(153, 153, 153, 1);
}

.conflictShow {
	.ivu-modal-header {
		background: #fafafa;
		border-radius: 4px 4px 0px 0px;
		.ivu-modal-header-inner {
			padding-left: 8px;
			font-size: 18px;
			font-family: PingFangSC-Medium;
			font-weight: 500;
			color: rgba(0, 0, 0, 0.85);
		}
	}
	.personalInput {
		display: flex;
		> div {
			display: flex;
			flex: 1;
			height: 32px;
			line-height: 32px;
			> span {
				margin-left: 64px;
				text-align: right;
				.fontS;
				.redStyle {
					color: red;
				}
			}
			> .ivu-input-wrapper,
			> .ivu-select,
			> .ivu-date-picker {
				width: 306px;
			}
			.hoverStyle {
				.ivu-poptip-body-content-inner {
					font-size: 14px;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(73, 80, 96, 1);
				}
			}
		}
	}
	.ivu-modal-footer {
		.ivu-btn-text {
			border: 1px solid #dcdee2;
			&:hover {
				border: 1px solid #57a3f3;
			}
		}
	}
}
</style>
<template>
	<div class="MangeListClass">
		<v-search-collapse @search="findListData" @reset="resetSearch" @changeDivHeight="changeDivHeight">
			<DatePicker
				ref="DatePicker"
				:options="options3"
				split-panels
				@on-open-change="setOptTime"
				v-model="classListFind.dateRange"
				type="daterange"
				:placeholder="$t('modules_spoc_jw_web_src_views_1v1course_1v1course_2219')"
				:editable="false"
				clearable
				style="width:224px;"
			></DatePicker>
			<Select
				v-model="classListFind.officeId"
                clearable
				:placeholder="$t('messagemanagement_index_344')"
				style="width:224px;"
				@on-change="officeIdChange"
			>
				<Option v-for="item in roomAreaList" :value="item.id" :key="item.value">{{ item.code }}{{ item.name }}</Option>
			</Select>
			<Input v-model="classListFind.name" :placeholder="$t('mycourse_mycourse_372')"></Input>
			<Input v-model="classListFind.studentName" :placeholder="$t('memberlist_memberlist_257')"></Input>
			<Select
				v-model="classListFind.isSync"
				clearable
				:placeholder="$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2488')"
			>
				<Option value="0">{{$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2489')}}</Option>
				<Option value="1">{{$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2490')}}</Option>
				<Option value="2">{{$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2491')}}</Option>
			</Select>
			<Select
				filterable
				remote
				:loading="teacherLoading"
				:remote-method="teacherRemote"
				v-model="classListFind.teacherIds"
				clearable
				:placeholder="$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2492')"
			>
				<Option v-for="item in teacherNameList" :value="item.value" :key="item.value">{{ item.name }}</Option>
			</Select>
			<Select
				filterable
				remote
				:loading="assistLoading"
				:remote-method="assistRemote"
				v-model="classListFind.assistIds"
				clearable
				:placeholder="$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2493')"
			>
				<Option v-for="item in assistNameList" :value="item.value" :key="item.value">{{ item.name }}</Option>
			</Select>
			<Select
				filterable
				remote
				:loading="classTeacherLoading"
				:remote-method="classTeacherRemote"
				v-model="classListFind.classTeacherIds"
				clearable
				:placeholder="$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2494')"
			>
				<Option
					v-for="item in classTeacherNameList"
					:value="item.value"
					:key="item.value"
				>{{ item.name }}</Option>
			</Select>
			<Select v-model="classListFind.classroomId" clearable filterable :placeholder="$t('modules_spoc_jw_web_src_views_1v1_newcourse_2165')" style="width:224px;">
				<Option v-for="item in classroomIdList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select> 
			<Select v-model="classListFind.status" clearable :placeholder="$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2496')">
				<Option
					v-for="item in jw_class_course_status"
					:value="item.value"
					:key="item.value"
				>{{ item.label }}</Option>
				<Option value="hasDelete">{{$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2497')}}</Option>
			</Select>
			<Input v-model="classListFind.courseName" :placeholder="$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2498')"></Input>
			<Select v-model="classListFind.gradeType" clearable :placeholder="$t('messagemanagement_index_346')">
				<Option v-for="item in jw_course_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			<Select v-model="classListFind.grade" clearable :placeholder="$t('courselist_courselist_224')">
				<Option v-for="item in jw_course_grade" v-show="classListFind.gradeType == item.type" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
		</v-search-collapse>
		<big-table
			ref="classTable"
			v-if="defaultShowCol"
			class="mytable"
			:updateShowTitleKey="updateShowTitleKey"
			:tableName="tableName"
			:tableData="tableData"
			:tableColumnArray="tableColumnArray"
			:defaultShowCol="defaultShowCol"
			:btnList="btnList"
			:canSelection="true"
			:updateShowTitleMethod="updateShowTitle"
			:dataTotal="dataTotal"
			:pageNo="pageNo"
			:tableHeightOut="tableHeightOut"
			@resetDefault="resetDefaultCol"	
			@selectionChange="selectionChange"
			@sortChange="sortChange"
			@pageChange="pageChange"
			@changeTableType="changeTableType"
		></big-table>
		<export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
		<Modal
			v-model="classManageShowTipBoo"
			:mask-closable="false"
			class-name="conflictShow"
			:title="$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2501')"
			width="600"
		>
			<div class="personalInput">
				<div>
					<span>
						<span class="redStyle">*</span>{{$t('courselist_compontents_modify_193')}}</span>
					<Select v-model="classTeacherId">
						<Option v-for="item in classTeacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
					</Select>
					<Poptip
						trigger="hover"
						width="272"
						class="hoverStyle"
						word-wrap
						style="color:#495060;font-size:14px;"
						:content="$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2503')"
					>
						<!-- <Button>Hover</Button> -->
						<Icon type="ios-help-circle" style="margin-left:9px" />
					</Poptip>
				</div>
			</div>
			<div class="footerBtn" slot="footer">
				<Button @click="classManageShowTipBoo=false">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" style="margin-left:16px;" @click="classManageJoinSave">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import util from "@public/libs/js/util";
import bigTable from "@public/modules/bigTable.vue";
import exportModal from "@public/modules/exportModal.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import tableDropdown from "@public/modules/tableDropdown";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
import valid, {
	errors,
	sysUser,
	sysDict,
	jwClassCourse,
	jwClassShare,
	jwClassroom,
    sysCommonSql,
    common
} from "../../libs/request";
export default {
	name: "jw.classManageList",
	components: {
		bigTable,
		exportModal,
		vSearchCollapse,
		tableDropdown
	},
	
	// beforeRouteEnter(to, from, next) {
	// 	console.log(to);
	// 	console.log(from);
	// 	next(vm => {
	// 		// this.tableType == "2"
	// 		// 通过 `vm` 访问组件实例
	// 		if (from.name == "jw.shareClass"&&vm.$route.query.officeId) {
	// 			vm.$set(vm.classListFind, "officeId", vm.$route.query.officeId);
	// 			vm.$nextTick(()=>{
	// 						vm.$refs.classTable.resetTabvalFn(2);
	// 					})
	// 			vm.changeTableType(2);
	// 		} 
	// 		else if (from.name == "jw.createClass") {
	// 				waitUntil(
	// 				() => {
	// 					//获取当前登录人校区后再执行
	// 					if (vm.app.currOfficeId) {
	// 						vm.$set(
	// 							vm.classListFind,
	// 							"officeId",
	// 							vm.app.currOfficeId == 'all' ? '' : vm.app.currOfficeId
	// 						);
	// 					}
	// 					return vm.app.currOfficeId || false;
	// 				},
	// 				() => {
	// 					vm.$nextTick(()=>{
	// 						vm.$refs.classTable.resetTabvalFn(1);
	// 					})
	// 					vm.changeTableTypeNew(1);
	// 				}
	// 			);
	// 		} 
	// 	});
	// },
	computed: {
		...mapState(["userInfo", "app", "buttonPerm", "calendarConfig"]),
        myButtonPrem() {
            return this.buttonPerm ? (this.buttonPerm["jw.classManageList"] || []) : [];
        },
	},
	data() {
		return {
			isSync: '',
			options3: null,
			tableHeightOut: 72, //324,
			teacherLoading: false,
			assistLoading: false,
			classTeacherLoading: false,
			teacherNameList: [],
			assistNameList: [],
			classTeacherNameList: [],
			classShareId: "",
			isJoin: "",
			classTeacherId: "",

			updateShowTitleKey: "jwClassCourse",
			tableType: "1",
			classManageShowTipBoo: false,
			classTeacherList: [],

			className: "",
			classListFind: {
				isSync: '',
				officeId: "",
				name: "",
				studentName: "",
				dateRange:  [],
				grade: "",
				teacherIds: "",
				assistIds: "",
				classTeacherIds: "",
				classroomId: "",
				status: "",
				courseName: "",
				gradeType: ""
			},
			roomAreaList: [],
			jw_course_grade: [],
			classroomIdList: [],
			jw_class_course_status: [],
			jw_course_type: [],

			tableName: [
				{
					name: this.$t('jw.classManageList'),
					value: "1"
				},
				// {
				// 	name: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2509'),
				// 	value: "2"
				// }
			],
			selection: [],
			updateShowTitle: jwClassCourse.updateShowTitle,
			exportMethod: jwClassCourse.exportSelectedFile, //导出用到的方法对象
			defaultShowCol: null,
			dataTotal: 0,
			pageNo: 1,
			pageSize: this.$store.state.app.pageSizeGlobal,
			sortObj: {},
			tableColumnArray: [],
			tableColumnArray1: [
				{
					// title: "编号",
					key: "code",
					// width:120,
					tooltip: true,
					minWidth: 45,
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.code
						);
					}
				},
				{
					// title: "班课名称",
					key: "name",
					minWidth: 55,
					tooltip: true,
					render: (h, params) => {
						let status = false;
						if (params.row.status == "ready") {
							status = true;
						}
						return h("div", [
							// !status
							// 	? h("div", {}, params.row.name)
								// : h(
                                    h(
										"div",
										{
											style: {
												cursor: "pointer",
												color: "#44bcb7"
											},
											on: {
												click: () => {
													this.$router.push({
														name: "jw.createClass",
														query: {
                                                            type: 1,
                                                            status: params.row.status,
															id: params.row.id
														}
													});
												}
											}
										},
										params.row.name
								  )
						]);
					}
				},
				{
					// title: "状态",
					tooltip: true,
					minWidth: 45,
					key: "statusLabel",
					render: (h, params) => {
						let status = "";
						if (params.row.status == "ready") {
							status = "error";
						} else if (params.row.status == "doing") {
							status = "success";
						} else if (params.row.status == "finish") {
							status = "default";
						} else if (params.row.status == "lose") {
							status = "warning";
						}
						return h("div", [
							h("Badge", {
								props: {
									status: status
								}
							}),
							params.row.statusLabel
						]);
					}
				},
				{
					key: "isSync",
					render: (h, params) => {
						let isSync = ''
						if(params.row.isSync == '0'){
							isSync = this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2489')
						} else if(params.row.isSync == '1'){
							isSync = this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2490')
						} else if(params.row.isSync == '2'){
							isSync = this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2491')
						}

						let jwJxSyncListContent = []
						if(params.row.jwJxSyncList && params.row.jwJxSyncList.length){
							params.row.jwJxSyncList.forEach(item=>{
								jwJxSyncListContent.push(
									h(
										"div",
										{},
										item.content
									)
								)
							})
						}
						
						return h(
							"div",
							{
							},
							[
								h(
									"div",
									{
										style:{
											'margin-top': '2px',
											float:'left'
										},
									},
									isSync
								),
								jwJxSyncListContent.length > 0 ? h(
									"Tooltip",
									{
										style:{
											float:'left'
										},
										props:{
											placement:"right"
										}
									},
									[
										h(
											"Icon",
											{	
												attrs:{
													type:"ios-help-circle-outline"	
												},
												props:{
													size: 18
												}
											},
											''
										),
										h(
											"div",
											{
												slot:"content"	
											},
											jwJxSyncListContent
										),
									]
								) : '',
							]
						);
					}
				},
				{
					// title: "授课教师",
					tooltip: true,
					key: "teacherName",
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.teacherName
						);
					}
				},
				{
					// title: "授课教室",
					key: "classroomName",
					tooltip: true,
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.classroomName
						);
					}
				},
				{
					// title: "授课助教",
					tooltip: true,
					key: "assistName",
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.assistName
						);
					}
				},
				{
					// title: "服务OO",
					tooltip: true,
					key: "classTeacherName",
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.classTeacherName
						);
					}
				},
				{
					title: this.$t('classlist_compontents_detailinfo_45'),
					key: "doAction",
					width: 200,
					fixed: "right",
					render: (h, params) => {
                        let btnList = [];
						//  if(params.row.createByFlag==1){
						if (this.myButtonPrem && this.myButtonPrem.indexOf('lesson') >-1) {
							btnList.push({ label: this.$t('jw.classManage.sortClass'), key: "sortClass" });
						}
						//  }
						if (params.row.status == "ready" && this.myButtonPrem && this.myButtonPrem.indexOf('delete') >-1) {
							btnList.push({
								label: this.$t('classlist_compontents_detailinfo_46'),
								key: "changeStatus"
							});
						}
						return h("div", [
                            h(
                                "a",
                                {
                                    style: {
                                        cursor: "pointer",
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: "jw.createClass",
                                                query: {
                                                    type: 1,
                                                    status: params.row.status,
                                                    id: params.row.id
                                                }
                                            });
                                        }
                                    }
                                },
                                this.$t('classroom_allscore_51')
                            ),
							(this.myButtonPrem && this.myButtonPrem.indexOf('add') >-1) ? h(
								"a",
								{
									style: {
										"margin-left": "5px"
									},
									on: {
										click: () => {
											this.$router.push({
												name:
													"jw.classManage.addStudent",
												query: {
													id: params.row.id
												}
											});
										}
									}
								},
								this.$t('jw.classManage.addStudent')
							) : '',
							(this.myButtonPrem && this.myButtonPrem.indexOf('details') >-1) ? h(
								"a",
								{
									style: {
										"margin-left": "5px"
									},
									on: {
										click: () => {
											this.$router.push({
												name:
													"jw.classManage.classDetailInfo",
												query: {
													id: params.row.id
												}
											});
										}
									}
								},
								this.$t('principalmailbox_16')
							) : '',
							(this.myButtonPrem && this.myButtonPrem.indexOf('attendance') >-1) ? h(
								"a",
								{
									style: {
										"margin-left": "5px"
									},
									on: {
										click: () => {
											this.$router.push({
												name:
													"jw.classManage.checkWork",
												query: {
													id: params.row.id
												}
											});
										}
									}
								},
								this.$t('classroom_classroom_67')
							) : '',
							h(tableDropdown, {
								style: {
									"margin-left": "10px"
								},
								props: {
									buttonList: btnList
								},
								on: {
									dropFn: key => {
										this.doActionItem({
											key,
											row: params.row
										});
									}
								}
							})
						]);
					}
				}
			],
			tableColumnArray2: [
				{
					// title: "编号",
					key: "code",
					tooltip: true,
					minWidth: 45,
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.code
						);
					}
				},
				{
					// title: "班课名称",
					tooltip: true,
					minWidth: 55,
					key: "name",
					render: (h, params) => {
						let status = false;
						//createByFlag等于1才可以去点击班课修改
						if (
							params.row.status == "ready" &&
							params.row.createByFlag == 1
						) {
							status = true;
						}
						return h("div", [
							!status
								? h(
										"div",
										{
											style: {
												"word-break": "break-all"
											}
										},
										params.row.name
								  )
								: h(
										"div",
										{
											style: {
												cursor: "pointer",
												color: "#44bcb7",
												"word-break": "break-all"
											},
											on: {
												click: () => {
													this.$router.push({
														name: "jw.shareClass",
														query: {
															type: 3,
															id: params.row.id,
															classShareId:
																params.row
																	.classShareId
														}
													});
												}
											}
										},
										params.row.name
								  )
						]);
					}
				},
				{
					// title: "状态",
					tooltip: true,
					minWidth: 45,
					key: "statusLabel",
					render: (h, params) => {
						let status = "";
						if (params.row.status == "ready") {
							status = "error";
						} else if (params.row.status == "doing") {
							status = "success";
						} else if (params.row.status == "finish") {
							status = "default";
						} else if (params.row.status == "lose") {
							status = "warning";
						}
						return h("div", [
							h("Badge", {
								props: {
									status: status
								}
							}),
							params.row.statusLabel
						]);
					}
				},
				{
					// title: "授课教师",
					tooltip: true,
					key: "teacherName",
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.teacherName
						);
					}
				},
				{
					// title: "授课助教",
					tooltip: true,
					key: "assistName",
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.assistName
						);
					}
				},
				{
					// title: "服务OO",
					tooltip: true,
					key: "classTeacherName",
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.classTeacherName
						);
					}
				},
				{
					title: this.$t('classlist_compontents_detailinfo_45'),
					key: "doAction",
					width: 170,
					fixed: "right",
					render: (h, params) => {
						if (params.row.createByFlag == 0) {
							if (params.row.joinStatus == 2) {
								// 加入不加入
								return h("div", [
									h(
										"a",
										{
											style: {
												"margin-left": "5px"
											},
											on: {
												click: () => {
													this.$Modal.confirm({
														title:
															this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2517'),
														content:
															this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2518'),
														onOk: () => {
															let obj = {
																id:
																	params.row
																		.classShareId,
																isJoin: "0"
																// classTeacherId:this.classTeacherId,
															};
															this.joinClass(obj);
														},
														onCancel: () => {}
													});
												}
											}
										},
										this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2519')
									),
									h(
										"a",
										{
											style: {
												"margin-left": "15px"
											},
											on: {
												click: () => {
													this.classManageShowTipBoo = true;
													this.classShareId =
														params.row.classShareId;
													this.classTeacherId = "";
												}
											}
										},
										this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2520')
									)
								]);
							} else if (params.row.joinStatus == 1) {
								//  添加学员详情考勤
								// let btnList=[];
								//   btnList.push({ label: "排课", key: "sortClass" });
								// if(params.row.status == "ready"){
								//   btnList.push({ label: "删除", key: "changeStatus" });
								// }
								return h("div", [
									(this.myButtonPrem && this.myButtonPrem.indexOf('add') >-1) ? h(
										"a",
										{
											style: {},
											on: {
												click: () => {
													this.$router.push({
														name:
															"jw.classManage.addStudent",
														query: {
															id: params.row.id,
															officeId: this
																.classListFind
																.officeId
														}
													});
												}
											}
										},
										this.$t('jw.classManage.addStudent')
									) : "",
									(this.myButtonPrem && this.myButtonPrem.indexOf('details') >-1) ? h(
										"a",
										{
											style: {
												"margin-left": "5px"
											},
											on: {
												click: () => {
													this.$router.push({
														name:
															"jw.classManage.classDetailInfo",
														query: {
															id: params.row.id,
															officeId: this
																.classListFind
																.officeId
														}
													});
												}
											}
										},
										this.$t('principalmailbox_16')
									) : '',
									(this.myButtonPrem && this.myButtonPrem.indexOf('attendance') >-1) ? h(
										"a",
										{
											style: {
												"margin-left": "5px"
											},
											on: {
												click: () => {
													this.$router.push({
														name:
															"jw.classManage.checkWork",
														query: {
															id: params.row.id,
															officeId: this
																.classListFind
																.officeId
														}
													});
												}
											}
										},
										this.$t('classroom_classroom_67')
									) : ''
								]);
							}
						} else if (params.row.createByFlag == 1) {
							let btnList = [];
							if (this.myButtonPrem && this.myButtonPrem.indexOf('lesson') >-1) {
								btnList.push({ label: this.$t('jw.classManage.sortClass'), key: "sortClass" });
							}
							if (params.row.status == "ready" && this.myButtonPrem && this.myButtonPrem.indexOf('delete') >-1) {
								btnList.push({
									label: this.$t('classlist_compontents_detailinfo_46'),
									key: "changeStatus"
								});
							}
							return h("div", [
								(this.myButtonPrem && this.myButtonPrem.indexOf('add') >-1) ? h(
									"a",
									{
										style: {},
										on: {
											click: () => {
												this.$router.push({
													name:
														"jw.classManage.addStudent",
													query: {
														id: params.row.id,
														officeId: this
															.classListFind
															.officeId
													}
												});
											}
										}
									},
									this.$t('jw.classManage.addStudent')
								) : "",
								(this.myButtonPrem && this.myButtonPrem.indexOf('details') >-1) ? h(
									"a",
									{
										style: {
											"margin-left": "5px"
										},
										on: {
											click: () => {
												this.$router.push({
													name:
														"jw.classManage.classDetailInfo",
													query: {
														id: params.row.id,
														officeId: this
															.classListFind
															.officeId
													}
												});
											}
										}
									},
									this.$t('principalmailbox_16')
								) : '',
								(this.myButtonPrem && this.myButtonPrem.indexOf('attendance') >-1) ? h(
									"a",
									{
										style: {
											"margin-left": "5px"
										},
										on: {
											click: () => {
												this.$router.push({
													name:
														"jw.classManage.checkWork",
													query: {
														id: params.row.id,
														officeId: this
															.classListFind
															.officeId
													}
												});
											}
										}
									},
									this.$t('classroom_classroom_67')
								) : '',
								btnList.length > 0
									? h(tableDropdown, {
											style: {
												"margin-left": "10px"
											},
											props: {
												buttonList: btnList
											},
											on: {
												dropFn: key => {
													this.doActionItem({
														key,
														row: params.row
													});
												}
											}
									  })
									: ""
							]);
						}
					}
				}
			],
			tableData: [],
			btnList: []
		};
    },
    mounted() {
		//  this.tableColumnArray= this.tableUserData.concat(this.tableUserDataHandle);
		this.init();
		this.getMoreList(); //校区列表接口
		this.baseData(); //年级列表接口  课程包全部分类接口
		this.getUser(6); //服务oo
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		resetDefaultCol(){
			this.updateLoadingStatus({ isLoading: true });
			let myRequestClearShowField
			if (this.tableType == "1") {
				myRequestClearShowField = jwClassCourse.clearShowField({
					pageIdentifier: "jwClassCourse",
				});
			}
			if (this.tableType == "2") {
				myRequestClearShowField = jwClassShare.clearShowField({
					pageIdentifier: "jwClassShare",
				});
			}
			myRequestClearShowField.then(valid.call(this))
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
        init() {
            this.btnList = [];
            if (this.$route.params.from == "shareClass"&&this.$route.params.officeId) {
                this.$set(this.classListFind, 'officeId', this.$route.params.officeId)
                setTimeout(()=>{
                    if(this.$refs.classTable){
                        this.$refs.classTable.resetTabvalFn(2);
                    }
                    if(this.myButtonPrem && this.myButtonPrem.indexOf('edit') >-1){
                        this.btnList.push(
                            [
                                {
                                    style: {},
                                    type: "",
                                    btnClick: this.isCreate,
                                    text: this.$t('jw.createClass'),
                                    value: "1",
                                    parentName: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2522')
                                },
                                {
                                    style: {},
                                    type: "",
                                    btnClick: this.isCreate,
                                    text: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2523'),
                                    value: "2",
                                    parentName: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2522')
                                },
                                {
                                    style: {},
                                    type: "",
                                    btnClick: this.isCreate,
                                    text: this.$t('jw.shareClass'),
                                    value: "3",
                                    parentName: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2522')
                                }
                            ]
                        )
                    }
                    if(this.myButtonPrem && this.myButtonPrem.indexOf('exportStuAttendance') >-1){
                        this.btnList.push({
                            style: {},
                            type: "",
                            btnClick: this.isExportName,
                            text: this.$t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2434')
                        })
                    }
                    if(this.myButtonPrem && this.myButtonPrem.indexOf('exportClassCourse') >-1){
                        this.btnList.push(
                            [
                                {
                                    style: {},
                                    type: "",
                                    btnClick: this.isExport,
                                    text: this.$t('integralflow_4'),
                                    value: "1",
                                    parentName: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2527')
                                },
                                {
                                    style: {},
                                    type: "",
                                    btnClick: this.isExport,
                                    text: this.$t('integralflow_6'),
                                    value: "2",
                                    parentName: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2527')
                                }
                            ]
                        )
                    }
                },1000)
                this.changeTableType(2);
            } else {
                waitUntil(
                    () => {
                        //获取当前登录人校区后再执行
                        // if(this.$route.params.from == "createClass"&&this.$route.params.officeId){
                        //     this.$set(this.classListFind, 'officeId', this.$route.params.officeId)
                        // }
                        // else{
                        //     if (this.app.currOfficeId) {
                        //         this.$set(
                        //             this.classListFind,
                        //             "officeId",
                        //             this.app.currOfficeId == 'all' ? '' : this.app.currOfficeId
                        //         );
                        //     }
                        // }
                        // return (this.app.currOfficeId && this.buttonPerm && this.buttonPerm["jw.classManageList"]) || false;
                        return (this.buttonPerm && this.buttonPerm["jw.classManageList"]) || false;
                    },
                    () => {
                        this.initTable1()
                    }
                );
               
            }
        },
        initTable1() {
            this.changeTableTypeNew(1);
            setTimeout(()=>{
                this.$refs.classTable.resetTabvalFn(1);
            },1000)
            if(this.myButtonPrem && this.myButtonPrem.indexOf('syncClassCourse') >-1){
                this.btnList.push(
                    {
                        style: {},
                        type: "",
                        btnClick: this.jwJxSnyc,
                        text: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2529'),
                        value: 'jwJxSnyc'
                    }
                )
            }
            if(this.myButtonPrem && this.myButtonPrem.indexOf('edit') >-1){
                this.btnList.push(
                    [
                        {
                            style: {},
                            type: "",
                            btnClick: this.isCreate,
                            text: this.$t('jw.createClass'),
                            value: "1",
                            parentName: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2522')
                        },
                        {
                            style: {},
                            type: "",
                            btnClick: this.isCreate,
                            text: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2523'),
                            value: "2",
                            parentName: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2522')
                        },
                        {
                            style: {},
                            type: "",
                            btnClick: this.isCreate,
                            text: this.$t('jw.shareClass'),
                            value: "3",
                            parentName: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2522')
                        }
                    ]
                )
            }
            if(this.myButtonPrem && this.myButtonPrem.indexOf('exportStuAttendance') >-1){
                this.btnList.push({
                    style: {},
                    type: "",
                    btnClick: this.isExportName,
                    text: this.$t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2434')
                })
            }
            if(this.myButtonPrem && this.myButtonPrem.indexOf('exportClassCourse') >-1){
                this.btnList.push(
                    [
                        {
                            style: {},
                            type: "",
                            btnClick: this.isExport,
                            text: this.$t('integralflow_4'),
                            value: "1",
                            parentName: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2527')
                        },
                        {
                            style: {},
                            type: "",
                            btnClick: this.isExport,
                            text: this.$t('integralflow_6'),
                            value: "2",
                            parentName: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2527')
                        }
                    ]
                )
            }
        },
		jwJxSnyc(){
			if(this.selection.length){
				console.log(this.selection, '~~~~~~~~~~`')
				let hasIsSync = false
				let ids = []
				this.selection.forEach(item => {
					if(item.isSync == '1'){
						hasIsSync = true
					}
					ids.push(item.id)
				})
				if(hasIsSync){
					this.$Message.error(this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2530'))
				} else {
					this.doJwJxSnyc(ids)
				}
			} else {
				this.$Modal.confirm({
                    title: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2531'),
                    content: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2532'),
                    onOk: () => {
                        this.doJwJxSnyc([])
                    },
                    onCancel: () => {
                    }
                });
			}
		},
		doJwJxSnyc(ids){
			this.updateLoadingStatus({ isLoading: true });
			jwClassCourse.jwJxSnyc(ids).then(valid.call(this))
			.then(res => {
				if (res.ok) {
					this.findListData()
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
				this.classListFind.dateRange = []
			}
		},
		changeDivHeight(height) {
			this.tableHeightOut = height;
		},
		teacherRemote(query) {
			this.getSearchList("teacher_id", query);
		},
		assistRemote(query) {
			this.getSearchList("assist_id", query);
		},
		classTeacherRemote(query) {
			this.getSearchList("class_teacher_id", query);
		},
		getSearchList(userType, query) {
			if (query !== "") {
				if (userType == "teacher_id") {
					this.teacherLoading = true;
				} else if (userType == "assist_id") {
					this.assistLoading = true;
				} else if (userType == "class_teacher_id") {
					this.classTeacherLoading = true;
				}
				let obj = {
					mainTable: "jw_class_course",
					mainField: userType,
					joinField: "id",
					joinTable: "sys_user",
					secondField: "name",
					joinTableSearchParam: query
				};
				sysCommonSql
					.queryPageInputInitData(obj)
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							if (userType == "teacher_id") {
								this.teacherLoading = false;
								this.teacherNameList = res.data.data;
							} else if (userType == "assist_id") {
								this.assistLoading = false;
								this.assistNameList = res.data.data;
							} else if (userType == "class_teacher_id") {
								this.classTeacherLoading = false;
								this.classTeacherNameList = res.data.data;
							}
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						// this.updateLoadingStatus({ isLoading: false });
					});
			}
		},
		classManageJoinSave() {
			if (!this.classTeacherId) {
				this.$Message.error(
					this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2503')
				);
				return;
			}
			let params = {
				id: this.classShareId,
				isJoin: "1",
				classTeacherId: this.classTeacherId
			};
			this.updateLoadingStatus({ isLoading: true });
			this.joinClass(params);
		},
		joinClass(params) {
			jwClassShare
				.join(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.$Message.success(this.$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1028'));
						this.classManageShowTipBoo = false;
						this.getListData();
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		officeIdChange() {
            this.classListFind.classroomId = '';
			this.getListData();
			// this.classRoomListFn(this.classListFind.officeId);
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
                this.updateLoadingStatus({ isLoading: false });
            });
		},
		baseData() {
			let types = "jw_course_type,jw_course_grade,jw_class_course_status"; //课程包分类,适用年级
			sysDict
				.batchListData({
					types
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.jw_course_type = res.data.data.jw_course_type;
						// this.jw_course_grade = res.data.data.jw_course_grade;
						this.jw_class_course_status =
							res.data.data.jw_class_course_status;
						// this.getSchool();
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
			     /* 年级 */
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
                    this.updateLoadingStatus({ isLoading: false });
                });
		},
		getMoreList() {
			//校区列表
			sysUser
				.dataScopeFilter()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.roomAreaList = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					// this.updateLoadingStatus({ isLoading: false });
				});
		},
		getUser(roleId) {
			let param = {
				roleId,
				pageSize: 10,
				pageNo: 1
			};
			sysUser
				.userListRoleUser(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						if (roleId == 6) {
							// 服务oo
							this.classTeacherList = res.data.data.list;
							this.classTeacherList.push({
								id: "no",
								name: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2534')
							});
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		changeTime() {},
		changeTableType(val) {
			let index = -1
			this.btnList.forEach((item,_index)=>{
				if((!Array.isArray(item)) && item.value == 'jwJxSnyc'){
					index = _index
				}
			})
			if(val == '2'){ // 共享班课列表
				if(index >= 0){
					this.btnList.splice(index,1)
				}
			} else {
				if(index < 0){
					if(this.myButtonPrem && this.myButtonPrem.indexOf('syncClassCourse') >-1){
						this.btnList.push({
							style: {},
							type: "",
							btnClick: this.jwJxSnyc,
							text: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2529'),
							value: 'jwJxSnyc'
						})
					}
				}
			}

			this.tableType = val;
			this.updateLoadingStatus({ isLoading: true });
			this.tableColumnArray = [].concat(this["tableColumnArray" + val]);
			// this.btnList = [].concat(this["btnList" + val]);
			this.getShowTitle();
			if (val == "1") {
				this.updateShowTitleKey = "jwClassCourse";
			} else {
				this.updateShowTitleKey = "jwClassShare";
				// this.updateShowTitleKey = 'jwClassCourse/listPageStudentVolumes'
			}
		},
		changeTableTypeNew(val) {
			this.selection = []
			// 与 changeTableType 区别为。是否getShowTitle 传递参数
			this.tableType = val;
			this.updateLoadingStatus({ isLoading: true });
			this.tableColumnArray = [].concat(this["tableColumnArray" + val]);
			// this.btnList = [].concat(this["btnList" + val]);
			this.getShowTitle();
			if (val == "1") {
				this.updateShowTitleKey = "jwClassCourse";
			} else {
				this.updateShowTitleKey = "jwClassShare";
				// this.updateShowTitleKey = 'jwClassCourse/listPageStudentVolumes'
			}
		},
		doActionItem(obj) {
			if (obj.key === "changeStatus") {
				this.$Modal.confirm({
					title: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2535'),
					content: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2536'),
					onOk: () => {
						this.remove(obj.row.id);
					},
					onCancel: () => {}
				});
			} else if (obj.key === "sortClass") {
				this.$router.push({
					name: "jw.classManage.sortClass",
					query: {
						id: obj.row.id
					}
				});
			}
		},
		findListData() {
			this.pageNo = 1;
			this.getListData();
		},
		resetSearch() {
			for (let item in this.classListFind) {
				this.classListFind[item] = "";
			}
			this.classListFind.dateRange = []//defaultDatePickerValue(),
			this.pageNo = 1;
			let officeId = this.app.currOfficeId == 'all' ? '' : this.app.currOfficeId;
			this.$set(this.classListFind, "officeId", officeId);
			this.getListData();
		},
		//获取数据，根据情况修改接口、传参
		getListData() {
			this.selection = []
            this.updateLoadingStatus({ isLoading: true });
			let officeId = this.classListFind.officeId
				// ? this.classListFind.officeId
				// : (this.app.currOfficeId == 'all' ? '' : this.app.currOfficeId);
			let param = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				officeId: officeId,
				orderByType: "createDate",
				orderByStatus: 2
			};
			if (this.sortObj.order != "normal" && this.sortObj.key) {
				param.orderByType = this.sortObj.key;
				param.orderByStatus = this.sortObj.order == "asc" ? "1" : "2";
			}
			
			
			param.name = this.classListFind.name;
			param.studentName = this.classListFind.studentName;
			param.startDate = this.classListFind.dateRange[0] ?  new Date(this.classListFind.dateRange[0]).format('yyyy-MM-dd 00:00:00') : '';
			param.endDate = this.classListFind.dateRange[1] ?  new Date(this.classListFind.dateRange[1]).format('yyyy-MM-dd 23:59:59') : '';
			param.grade = this.classListFind.grade;
			param.teacherIds = this.classListFind.teacherIds;
			param.assistIds = this.classListFind.assistIds;
			param.classTeacherIds = this.classListFind.classTeacherIds;
			param.classroomId = this.classListFind.classroomId;
			param.status = this.classListFind.status != 'hasDelete' ? this.classListFind.status : '';
			param.courseName = this.classListFind.courseName;
			param.gradeType = this.classListFind.gradeType;
			param.isSync = this.classListFind.isSync
			
			if(this.classListFind.status == 'hasDelete'){
				param.delFlag = '1'
			}
			let myRequestList;
			if (this.tableType == "1") {
				myRequestList = jwClassCourse.listPage(param);
			}
			if (this.tableType == "2") {
				myRequestList = jwClassShare.listPage(param);
			}

			this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
			myRequestList
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data;
						this.tableData = result.list;
						this.dataTotal = result.total;
						this.classRoomListFn(this.classListFind.officeId);
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
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
			//   console.log(obj); // {key: "createByName" ,order: "desc"}
			this.sortObj = obj;
			this.getListData();
		},
		//可选方法，如果是多选的话必须有
		selectionChange(selection) {
			//   console.log(selection);
			this.selection = selection;
		},
		remove(id) {
			this.updateLoadingStatus({ isLoading: true });
			jwClassCourse
				.deleteById({ id: id })
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.$Message.success(this.$t('scoretemplate_scoretemplate_571'));
						this.getListData();
					}
					this.updateLoadingStatus({ isLoading: false });
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		//必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
		getShowTitle(closeLoad) {
			let param = {};
			let myRequestShowTitle;
			if (this.tableType == "1") {
				param = {
					pageIdentifier: "jwClassCourse",
					voName: "JwClassCourseVO",
					lang: this.$i18n.locale
				};
				myRequestShowTitle = jwClassCourse;
			}
			if (this.tableType == "2") {
				param = {
					pageIdentifier: "jwClassShare",
					voName: "JwClassShareVO",
					lang: this.$i18n.locale
				};
				myRequestShowTitle = jwClassShare;
			}
			myRequestShowTitle
				.getShowTitle(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.defaultShowCol = res.data.data;
						if(!closeLoad){
							this.getListData();
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					if(closeLoad){
                        this.updateLoadingStatus({ isLoading: false });
                    }
				});
		},
		getDetail(name) {
		},
		isExportName() {
			if (this.selection.length == 0) {
				this.$Message.error(this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2538'));
				return;
			}
			// if (!this.classListFind.officeId) {
			// 	this.$Message.error("请选择要导出点名表的校区");
			// 	return;
			// }
			let arr = this.selection.map(item => {
				return item.id;
			});
			let param = {
				officeId: this.classListFind.officeId,
				ids: arr,
				pastFlag: "0"
			};
			this.exportMethod = jwClassCourse.exportNameList 
			this.$refs.exportModal.noShowExport(this.exportMethod,param);
		},
		isExport(val) {
			//这里val的值。是根据设置下拉类型button设定的值来匹配判断
			if (val == "2" && !this.selection.length) {
				this.$Message.error(this.$t('scoretemplate_scoretemplate_572'));
				return;
			}
			let searchObj = Object.assign({},this.searchObj);
			if (val == "1") {
				delete searchObj.pageNo
				delete searchObj.pageSize
				if (this.tableType == "1") {
					this.exportMethod = jwClassCourse.jwClassCourseExport; //导出用到的方法对象
				} else if (this.tableType == "2") {
					this.exportMethod = jwClassShare.exportFile; //导出用到的方法对象
				}
			} else if (val == "2") {
				//如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
				searchObj = {
					ids: this.selection
						.map(item => {
							return item.id;
						})
						.join(",")
				};
				if (this.tableType == "1") {
					this.exportMethod = jwClassCourse.jwClassCourseExport; //导出用到的方法对象
				} else if (this.tableType == "2") {
					searchObj.officeId = this.classListFind.officeId;
					this.exportMethod = jwClassShare.exportSelectedFile; //导出用到的方法对象
				}
			}
			this.$refs.exportModal.noShowExport(this.exportMethod, searchObj);
		},
		isCreate(val) {
			if (val == 2) {
				this.$router.push({
					path: "/spoc-eduManage/classManageImport.html",
					query: {
						officeId: 1,
						currOfficeId: this.classListFind.officeId
							? this.classListFind.officeId
							: (this.app.currOfficeId == 'all' ? '' : this.app.currOfficeId)
					}
				});
			} else if (val == 1) {
				//手动开班
				this.$router.push({
					name: "jw.createClass",
					query: { type: val }
				});
			} else if (val == 3) {
				//共享开班
				this.$router.push({
					name: "jw.shareClass",
					query: { type: val, officeId: this.classListFind.officeId }
				});
			}
		}
	},
	watch: {
		// "app.currOfficeId": function(val, oldVal) {
		// 	if (oldVal && this.$route.name == 'jw.classManageList') {
		// 		this.$set(
		// 			this.classListFind,
		// 			"officeId",
		// 			this.app.currOfficeId == 'all' ? '' : this.app.currOfficeId
		// 		);
		// 		this.getListData();
		// 	}
        // },
        '$route.name': {
            handler: function (val, oldVal) {
                if(val=='jw.classManageList'){
                    // console.log(this.classListFind)
				    this.getListData();
                    // this.init();
                }
            },
            deep: true
        },
	}
};
</script>