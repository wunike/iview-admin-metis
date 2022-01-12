<style lang="less">
.transfer-center-container {
	.mytable {
		margin-top: 10px;
		width: 100%;
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		padding: 0 16px;
		.ivu-table-cell {
			overflow: unset !important;
		}
	}
}
</style>

<template>
	<div class="transfer-center-container">
		<v-search-collapse
			@search="SearchList"
			@reset="resetSearch"
			v-if="!ctNo"
			@changeDivHeight="changeDivHeight"
		>
			<DatePicker
				v-model="createDate"
				type="daterange"
				separator=" ~ "
				@on-change="createDateChange"
				:placeholder="$t('principalmailbox_index_490')"
				style="width: 224px; margin-right: 12px"
				ref="DatePicker"
				split-panels
				:options="options"
				@on-open-change="setOptTime"
			></DatePicker>
			<DatePicker
				v-model="auditTime"
				type="daterange"
				separator=" ~ "
				@on-change="auditTimeChange"
				:placeholder="
					$t(
						'modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6017'
					)
				"
				style="width: 224px; margin-right: 12px"
				ref="DatePicker1"
				split-panels
				:options="options1"
				@on-open-change="setOptTime1"
			></DatePicker>
			<DatePicker
				v-model="endDate"
				clearable
				type="daterange"
				separator=" ~ "
				@on-change="endDateChange"
				:placeholder="
					$t(
						'modules_spoc_sign_web_src_views_coursevalidityadjustment_coursevalidityadjustment_6090'
					)
				"
				style="width: 224px; margin-right: 12px"
				ref="DatePicker2"
				split-panels
				:options="options2"
				@on-open-change="setOptTime2"
			></DatePicker>
			<Select
				:placeholder="$t('messagemanagement_index_352')"
				multiple
				@on-change="officeIdChange"
				v-model="findObj.officeIdList"
				clearable
				style="width: 224px"
			>
				<Option
					v-for="item in officeIdLists"
					:value="item.id"
					:key="item.id"
					>{{ item.code }}{{ item.name }}</Option
				>
			</Select>
			<Select
				v-model="findObj.studentId"
				:placeholder="$t('memberlist_memberlist_257')"
				style="width: 224px"
				clearable
				filterable="true"
				remote
				:loading="loadingStu"
				:remote-method="remoteStuName0"
			>
				<Option
					v-for="item in studentNameList0"
					:value="item.id"
					:key="item.id"
					>{{ item.name }}</Option
				>
			</Select>
			<Select
				:placeholder="$t('spoc_hootie_web_12')"
				v-model="findObj.status"
				clearable
				style="width: 140px; margin-right: 12px"
			>
				<Option
					v-for="item in statusList"
					:value="item.value"
					:key="item.value"
					>{{ item.label }}</Option
				>
			</Select>
			<Input
				v-model="findObj.courseName"
				:placeholder="$t('core.coursePack')"
				style="width: 140px"
			></Input>
			<Select
				v-model="findObj.courseType"
				:placeholder="$t('views_coursepack_bigtableexample_322')"
				style="width: 140px"
				clearable
			>
				<Option
					v-for="item in jw_course_typeList"
					:value="item.value"
					:key="item.value"
					>{{ item.label }}</Option
				>
			</Select>
			<Input
				v-model="findObj.ctNo"
				:placeholder="
					$t(
						'modules_spoc_sign_web_src_views_approval_approvalnew_5071'
					)
				"
				style="width: 140px; margin-right: 12px"
			/>
			<!-- <Input  v-model="findObj.auditer" :placeholder="$t('modules_spoc_sign_web_src_views_contractrefund_contractrefund_5812')" style="width: 140px;margin-right:12px;" /> -->
			<Select
				v-model="findObj.auditer"
				:placeholder="
					$t(
						'modules_spoc_sign_web_src_views_contractrefund_contractrefund_5812'
					)
				"
				style="width: 140px; margin-right: 12px"
				clearable
				filterable="true"
				remote
				:loading="loadingAuditer"
				:remote-method="remoteAuditer"
			>
				<Option
					v-for="item in auditerList"
					:value="item.value"
					:key="item.value"
					>{{ item.name }}</Option
				>
			</Select>
			<Select
				v-model="findObj.createById"
				:placeholder="
					$t('modules_spoc_portal_views_workorderm_index_4442')
				"
				style="width: 140px; margin-right: 12px"
				clearable
				filterable="true"
				remote
				:loading="loadingCreateById"
				:remote-method="remoteCreateById"
			>
				<Option
					v-for="item in createByIdList"
					:value="item.value"
					:key="item.value"
					>{{ item.name }}</Option
				>
			</Select>
			<Select
				v-model="findObj.seller"
				:placeholder="
					$t(
						'modules_spoc_report_web_src_views_auditionconversionreport_index_4476'
					)
				"
				style="width: 140px; margin-right: 12px"
				clearable
				filterable="true"
				remote
				:loading="loadingSignId"
				:remote-method="remoteSignId"
			>
				<Option
					v-for="item in SignIdList"
					:value="item.value"
					:key="item.value"
					>{{ item.name }}</Option
				>
			</Select>
			<!-- <Input  v-model="findObj.createById" :placeholder="$t('modules_spoc_portal_views_workorderm_index_4442')" style="width: 140px;margin-right:12px;" /> -->
			<Select
				v-model="findObj.isUsed"
				:placeholder="
					$t(
						'modules_spoc_sign_web_src_views_coursevalidityadjustment_coursevalidityadjustment_6100'
					)
				"
				style="width: 224px"
				clearable
			>
				<Option
					v-for="item in isUsedList"
					:value="item.value"
					:key="item.value"
					>{{ item.label }}</Option
				>
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
			:canSelection="true && !ctNo"
			:updateShowTitleMethod="updateShowTitle"
			:updateShowTitleKey="updateShowTitleKey"
			:canChangeHeight="!ctNo"
			:isShowSelectTableColumn="!ctNo"
			:dataTotal="dataTotal"
			:maxFlagForFixed="11"
			:tableHeightOut="tableHeightOut"
			@resetDefault="resetDefaultCol"
			@selectionChange="selectionChange"
			@sortChange="sortChange"
			@pageChange="pageChange"
			@changeTableType="changeTableType"
		></big-table>
		<editLeaveNumModify
			ref="editLeaveNumModifyRef"
			:officeIdList="officeIdLists"
			@getListDataEmit="getListDataEmit"
		></editLeaveNumModify>
		<!--  -->
		<export-modal
			ref="exportModal"
		></export-modal>
		<tableDetails
			:detailsTitle="
				$t('modules_spoc_jw_web_src_views_approval_approvalnew_2249')
			"
			ref="tableDetailsRef"
		>
			<!-- <div slot="details" class="details-box">
            </div>-->
		</tableDetails>
	</div>
</template>

<script>
import vSearchCollapse from "@public/modules/vSearchCollapse";
import bigTable from "@public/modules/bigTable.vue";
import exportModal from "@public/modules/exportModal.vue";
import tableDetails from "../../modules/tableDetails.vue";
import editLeaveNumModify from "../editLeaveNum/components/editLeaveNumModify.vue";
import {
	waitUntil,
	DatePickerOpt,
	defaultDatePickerValue,
} from "@public/libs/util";
import { mapMutations, mapState } from "vuex";

import valid, {
	errors,
	sysUser,
	common,
	sysDict,
	htValidApply,
	sysCommonSql,
} from "../../libs/request";
export default {
	name: "sign.courseValidityAdjustment",
	props: {
		//判断是否合同详情页打开的。有合同编号则为合同详情页打开
		ctNo: {
			type: String,
		},
		ctStudnetId: {
			type: String,
		},
		ctStudnetName: {
			type: String,
		},
		ctOfficeId: {
			type: String,
		},
	},
	computed: {
		...mapState(["app", "buttonPerm", "calendarConfig"]),
		myButtonPrem() {
			if (this.buttonPerm && (JSON.stringify(this.buttonPerm) != "{}")) {
				return this.buttonPerm["sign.courseValidityAdjustment"] || [];
			} else {
				return false;
			}
		},
		btnList() {
			if (this.ctNo) {
				return [
					{
						style: {},
						type: "",
						btnClick: this.stopApplay,
						text: this.$t(
							"modules_spoc_sign_web_src_views_contractmanage_contractmanage_5714"
						),
					},
				];
			} else {
				return [
					{
						style: {},
						type: "",
						btnClick: this.stopApplay,
						text: this.$t(
							"modules_spoc_sign_web_src_views_contractmanage_contractmanage_5714"
						),
					},
					/*   {
                            style: {},
                            type: '',
                            btnClick: this.delayApplay,
                            text: '提交延期申请',
                        }, */
					[
						{
							hidden:
								this.myButtonPrem &&
								this.myButtonPrem.indexOf("export") != -1
									? false
									: true,
							style: {},
							type: "",
							btnClick: this.isExport,
							text: this.$t("integralflow_4"), //"导出全部",
							value: "1",
							parentName: this.$t("integralflow_5"), //"导出"
						},
						{
							hidden:
								this.myButtonPrem &&
								this.myButtonPrem.indexOf("export") != -1
									? false
									: true,
							style: {},
							type: "",
							btnClick: this.isExport,
							text: this.$t("integralflow_6"), //"导出所选",
							value: "2",
							parentName: this.$t("integralflow_5"), //"导出"
						},
					],
				];
			}
		},
	},
	watch: {
		"app.currOfficeId": function (val, oldVal) {
			if (
				oldVal &&
				!this.ctNo &&
				this.$route.name == "sign.courseValidityAdjustment"
			) {
				if (this.app.currOfficeId == "all") {
					this.$set(this.findObj, "officeIdList", []);
				} else {
					this.$set(this.findObj, "officeIdList", [
						this.app.currOfficeId,
					]);
				}
				this.getListData();
			}
		},
	},
	data() {
		return {
			// orderByStatus: 1,
			// orderByType: "",
			options: null,
			options1: null,
			options2: null,
			tableHeightOut: 72, //324,
			tableName: [
				{
					name: this.$t("courseValidityAdjustment1"), //"有效期终止",
					value: "1",
				},
				{
					name: this.$t("courseValidityAdjustment2"), //"有效期延期",
					value: "2",
				},
			],
			sortObj: {},
			loadingSignId: false,
			SignIdList: [],
			selection: [],
			loadingStu: false,
			loadingAuditer: false,
			loadingCreateById: false,
			auditerList: [],
			createByIdList: [],
			studentNameList0: [],
			statusList: [],
			endDate: [],
			createDate: [],
			auditTime: [],
			isUsedList: [
				// 0：未使用；1：使用中；2：已使用
				{
					label: this.$t(
						"modules_spoc_sign_web_src_views_capitalflow_capitalflow_5115"
					),
					value: "0",
				},
				{
					label: this.$t(
						"modules_spoc_portal_views_workbenchnew_lists_index_4263"
					),
					value: "1",
				},
				{
					label: this.$t(
						"modules_spoc_sign_web_src_views_capitalflow_capitalflow_5117"
					),
					value: "2",
				},
			],
			updateShowTitleKey: "htValidApply",
			officeIdLists: [],
			jw_course_typeList: [],
			uploadProof: false, //上传
			sureReceived: false, //确认收到
			updateShowTitle: htValidApply.updateShowTitle,

			// tableTitle: ``,
			findObj: {
				officeIdList: [],
				studentId: "",
				status: "",
				endDateStart: "",
				endDateEnd: "",
				courseName: "",
				courseType: "",
				createDateStart: "",
				createDateEnd: "",
				ctNo: "",
				auditTimeStart: "",
				auditTimeEnd: "",
				auditer: "",
				createById: "",
				isUsed: "",
				seller: "",
			},
			defaultShowCol: null,
			exportMethod: htValidApply.exportSelectedFile, //导出用到的方法对象
			pageNo: 1,
			dataTotal: 0, //总数
			pageSize: this.$store.state.app.pageSizeGlobal,
			tableData: [],
			tableColumnArray: [
				{
					// title: "合同编号",
					key: "no",
					tooltip: true,
					// render: (h, params) => {
					//     return h("div", [
					//         h(
					//             "a",
					//             {
					//                 style: {
					//                     color: this.ctNo ? "#000" : ""
					//                 },
					//                 on: {
					//                     click: () => {
					//                         if (!this.ctNo) {
					//                             this.$router.push({
					//                                 name: "sign.pactDetails",
					//                                 query: {
					//                                     id: params.row.ctId,
					//                                     ctNo: params.row.no
					//                                 }
					//                             });
					//                         }
					//                     }
					//                 }
					//             },
					//             params.row.no
					//         )
					//     ]);
					// }
				},
				{
					// title: "课程包分类",
					key: "courseType",
					tooltip: true,
					// courseTypeName
					render: (h, params) => {
						return h("div", {}, params.row.courseTypeName);
					},
				},
				{
					// title: "终止日期",
					key: "expiredDate",
					sortable: "custom",
				},
				{
					// title: "剩余课时数",
					key: "leftCourseHour",
					sortable: "custom",
					tooltip: true,
				},
				{
					// title: "延期使用情况",
					key: "isUsedName",
					tooltip: true,
				},
				{
					// title: "原合同有效期",
					key: "validDate",
					sortable: "custom",
					tooltip: true,
					width: 120,
				},
				{
					// title: "剩余有效期",
					key: "leftNum",
					sortable: "custom",
					tooltip: true,
				},
				{
					// title: "延长时间",
					key: "num",
					sortable: "custom",
					tooltip: true,
				},
				{
					// title: "提交人",
					key: "createByName",
					tooltip: true,
				},
				{
					// title: "提交时间",
					key: "createDate",
					sortable: "custom",
					tooltip: true,
				},
				{
					// title: "当前审批人",
					key: "auditerName",
					tooltip: true,
				},
				{
					// title: "最新审批时间",
					key: "auditTime",
					/*   render: (h, params) => {
                        return h(
                            "div",
                            {},
                            params.row.status == "unaudit" ||
                                params.row.status == "uncommit"
                                ? "/"
                                : params.row.auditTime
                        );
                    } */
				},
				{
					// title: "审批状态",
					key: "statusName",
					/**
					 * 审批流程实例状态：未提交，待审批，审批中，已通过，已驳回
					 */
					/*  public static final String AUDIT_STATUS_UNCOMMIT = "uncommit";
                            public static final String AUDIT_STATUS_UNAUDIT = "unaudit";
                            public static final String AUDIT_STATUS_AUDITING = "auditing";
                            public static final String AUDIT_STATUS_AGREE = "agree";
                            public static final String AUDIT_STATUS_REJECT = "reject"; */
					/*
                            审批状态色值统一：                                                                                                      1、待审批：#999999
                        2、审批中：#46BC15
                        3、审批通过：#44BCB7
                        4、审批不通过：#F5222D
                        5、已撤回：#EABB06
                        6、已作废：#CCCCCC
                            */
					render: (h, params) => {
						let text = "";
						let color = "";
						if (params.row.status == "uncommit") {
							// text = "未提交";
							color = "#EABB06";
						} else if (params.row.status == "unaudit") {
							// text = "待审批";
							color = "#999999";
						} else if (params.row.status == "auditing") {
							// text = "审批中";
							color = "#46BC15";
						} else if (params.row.status == "agree") {
							// text = "审批通过";
							color = "#44BCB7";
						} else if (params.row.status == "reject") {
							// text = "审批不通过";
							color = "#F5222D";
						} else if (params.row.status == "invalid") {
							// text = "已作废";
							color = "#CCCCCC";
						}
						return h("div", [
							h("span", [
								h("span", {
									style: {
										width: "4px",
										height: "4px",
										background: color,
										display: "inline-block",
										marginRight: "8px",
										borderRadius: "50%",
									},
								}),
								params.row.statusName,
							]),
						]);
					},
				},
				{
					title: this.$t("classlist_compontents_detailinfo_45"), //"操作",
					key: "doAction",
					fixed: "right",
					width: 150,
					render: (h, params) => {
						return h("div", [
							h(
								"a",
								{
									style: {
										display:
											this.myButtonPrem &&
											this.myButtonPrem.indexOf(
												"details"
											) != -1
												? ""
												: "none",
										marginRight: "8px",
									},
									on: {
										click: () => {
											this.$refs.tableDetailsRef.showPop({
												id: params.row.id,
												flowId: params.row.flowId,
												key: "contract valid",
												status: params.row.status,
											});
										},
									},
								},
								this.$t("mycourse_viewstucontent_454") //"申请详情"
							),
							h(
								"a",
								{
									props: {
										type: "text",
										size: "small",
									},
									style: {
										marginRight: "8px",
										color: this.ctNo ? "#000" : "",
										display:
											this.myButtonPrem &&
											this.myButtonPrem.indexOf(
												"details"
											) != -1
												? ""
												: "none",
									},
									on: {
										click: () => {
											if (!this.ctNo) {
												this.$router.push({
													name: "sign.pactDetails",
													query: {
														id: params.row.ctId,
														ctNo: params.row.no,
													},
												});
											}
										},
									},
								},
								this.$t("sign.pactDetails") //"合同详情"
							),
						]);
					},
				},
			],
			tableType: "1",
		};
	},
	components: {
		vSearchCollapse,
		bigTable,
		exportModal,
		tableDetails,
		editLeaveNumModify,
	},
	mounted() {
		this.getShowTitle();
		this.statusListMethod(); //审批状态列表接口
		if (this.ctNo) {
			this.findObj.ctNo = this.ctNo;
			this.getSchoolList();
		} else {
			this.getSchoolList();
		}
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		resetDefaultCol() {
			this.updateLoadingStatus({ isLoading: true });
			htValidApply
				.clearShowField({
					pageIdentifier: "htValidApply",
				})
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.getShowTitle(true);
					} else {
						this.updateLoadingStatus({ isLoading: false });
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		changeDivHeight(height) {
			this.tableHeightOut = height;
		},
		changeTableType(val) {
			this.selection = [];
			this.tableType = val;
			this.getShowTitle();
		},
		sortChange(obj) {
			this.sortObj = obj;
			this.getListData();
		},
		officeIdChange() {
			this.findObj.studentId = "";
		},
		remoteSignId(query) {
			this.loadingSignId = true;
			let params = {
				mainTable: "ht_sign",
				mainField: "seller_id",
				joinField: "id",
				joinTable: "sys_user",
				secondField: "name",
				joinTableSearchParam: query,
			};
			sysCommonSql
				.queryPageInputInitData(params)
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.SignIdList = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.loadingSignId = false;
				});
		},
		remoteAuditer(query) {
			this.loadingAuditer = true;
			let params = {
				mainTable: "ht_valid_apply",
				mainField: "auditer",
				joinField: "id",
				joinTable: "sys_user",
				secondField: "name",
				joinTableSearchParam: query,
			};
			sysCommonSql
				.queryPageInputInitData(params)
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.auditerList = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.loadingAuditer = false;
				});
		},
		remoteCreateById(query) {
			this.loadingCreateById = true;
			let params = {
				mainTable: "ht_valid_apply",
				mainField: "create_by",
				joinField: "id",
				joinTable: "sys_user",
				secondField: "name",
				joinTableSearchParam: query,
			};
			sysCommonSql
				.queryPageInputInitData(params)
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.createByIdList = res.data.data;
						console.log(this.createByIdList);
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.loadingCreateById = false;
				});
		},

		getListDataEmit() {
			this.pageNo = 1;
			this.getListData();
		},
		endDateChange(val) {
			this.findObj.endDateStart = this.endDate[0]
				? this.endDate[0].format("yyyy-MM-dd 00:00:00")
				: "";
			this.findObj.endDateEnd = this.endDate[1]
				? this.endDate[1].format("yyyy-MM-dd 23:59:59")
				: "";
		},
		createDateChange(val) {
			this.findObj.createDateStart = this.createDate[0]
				? this.createDate[0].format("yyyy-MM-dd 00:00:00")
				: "";
			this.findObj.createDateEnd = this.createDate[1]
				? this.createDate[1].format("yyyy-MM-dd 23:59:59")
				: "";
		},
		auditTimeChange(val) {
			this.findObj.auditTimeStart = this.auditTime[0]
				? this.auditTime[0].format("yyyy-MM-dd 00:00:00")
				: "";
			this.findObj.auditTimeEnd = this.auditTime[1]
				? this.auditTime[1].format("yyyy-MM-dd 23:59:59")
				: "";
		},
		statusListMethod() {
			let types = "com_audit_status,jw_course_type"; //课程包分类,适用年级
			sysDict
				.batchListData({
					types,
				})
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.statusList = res.data.data.com_audit_status;
						this.jw_course_typeList = res.data.data.jw_course_type;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		remoteStuName0(query) {
			this.loadingStu = true;
			let params = {
				name: query,
				officeId: this.findObj.officeIdList.join(","),
			};
			common
				.listByOfficeIdAndName(params)
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.studentNameList0 = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.loadingStu = false;
				});
		},
		getSchoolList() {
			//校区列表
			sysUser
				.dataScopeFilter()
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.officeIdLists = res.data.data;
						if (this.ctNo) {
							this.changeTableType("1");
							// this.getListData();
						} else {
							waitUntil(
								() => {
									return (
										(this.app.currOfficeId &&
											this.calendarConfig
												.maxMonthInterval) ||
										false
									);
								},
								() => {
									if (this.app.currOfficeId == "all") {
										this.$set(
											this.findObj,
											"officeIdList",
											[]
										);
									} else {
										this.$set(
											this.findObj,
											"officeIdList",
											[this.app.currOfficeId]
										);
									}
									this.endDate = []; //  defaultDatePickerValue();
									this.createDate = defaultDatePickerValue();
									this.auditTime = []; // defaultDatePickerValue();
									this.options = DatePickerOpt(
										this,
										"DatePicker",
										Number(
											this.calendarConfig.maxMonthInterval
										)
									);
									this.options1 = DatePickerOpt(
										this,
										"DatePicker1",
										Number(
											this.calendarConfig.maxMonthInterval
										)
									);
									this.options2 = DatePickerOpt(
										this,
										"DatePicker2",
										Number(
											this.calendarConfig.maxMonthInterval
										)
									);
									this.createDateChange();
									this.endDateChange();
									this.auditTimeChange();
									this.changeTableType("1");
									// this.getListData();
								}
							);
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					// this.updateLoadingStatus({ isLoading: false });
				});
		},
		/* //查看详情
            seeDetails(obj) {
                this.$refs.tableDetails.showPop(obj)
            }, */
		//申请弹窗
		stopApplay(type) {
			if (this.ctNo) {
				//从合同详情打开多第三个参数
				this.$refs.editLeaveNumModifyRef.showTipsMethods(
					"delay",
					this.$t(
						"modules_spoc_sign_web_src_views_contractmanage_contractmanage_5714"
					),
					{
						ctNo: this.ctNo,
						ctStudnetId: this.ctStudnetId,
						ctStudnetName: this.ctStudnetName,
						ctOfficeId: this.ctOfficeId,
					}
				);
			} else {
				this.$refs.editLeaveNumModifyRef.showTipsMethods(
					"delay",
					this.$t(
						"modules_spoc_sign_web_src_views_contractmanage_contractmanage_5714"
					)
				);
			}
		},
		// delayApplay(type){
		//     this.$refs.editLeaveNumModifyRef.showTipsMethods('delay','',"提交延期申请");
		// },
		//取消上传凭证
		cancelUpLoad() {
			this.uploadProof = false;
		},
		//确认上传凭证
		submitUpLoad() {
			this.uploadProof = false;
		},
		//取消确认收到
		cancelSureReceived() {
			this.sureReceived = false;
		},
		//确认收到
		submitSureReceived() {
			this.sureReceived = false;
		},
		getShowTitle(closeLoad) {
			htValidApply
				// .getShowTitle({ pageIdentifier: "htValidApply", voName: "HtValidApply"})
				.getShowTitle({
					pageIdentifier: "htValidApply",
					lang: this.$i18n.locale,
				})
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.defaultShowCol = res.data.data;
						if (this.tableType == "1") {
							this.defaultShowCol.true = this.defaultShowCol.true.filter(
								(item) => {
									return item.name != "extendDate";
								}
							);
							this.defaultShowCol.false = this.defaultShowCol.false.filter(
								(item) => {
									return item.name != "extendDate";
								}
							);
							console.log(this.defaultShowCol);
						} else {
							this.defaultShowCol.true = this.defaultShowCol.true.filter(
								(item) => {
									return item.name != "endDate";
								}
							);
							this.defaultShowCol.false = this.defaultShowCol.false.filter(
								(item) => {
									return item.name != "endDate";
								}
							);
						}
						if (!closeLoad) {
							this.getListData();
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					if (closeLoad) {
						this.updateLoadingStatus({ isLoading: false });
					}
				});
		},
		getListData() {
			this.updateLoadingStatus({ isLoading: true });
			let type = this.tableType == "2" ? "0" : "1";
			let param = {
				// studentName:this.findObj.studentName,
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				filtered: 1,
				//0 延期  1终止
				typeList: [].concat(type),
				// orderByType: this.orderByType,
				// orderByStatus: this.orderByStatus
			};
			if (this.sortObj.order != "normal" && this.sortObj.key) {
				param.orderByType = this.sortObj.key;
				param.orderByStatus = this.sortObj.order == "asc" ? "1" : "2";
			}
			param = Object.assign({}, param, this.findObj);
			this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
			htValidApply
				.listPage(param)
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						let result = res.data.data;
						this.tableData = result.list;
						this.dataTotal = result.total;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		SearchList() {
			this.pageNo = 1;
			this.getListData();
		},
		resetSearch() {
			this.endDate = []; // defaultDatePickerValue();
			this.createDate = defaultDatePickerValue();
			this.auditTime = []; // defaultDatePickerValue();
			for (let item in this.findObj) {
				this.findObj[item] = "";
			}
			this.createDateChange();
			this.endDateChange();
			this.auditTimeChange();
			this.pageNo = 1;
			if (this.app.currOfficeId == "all") {
				this.$set(this.findObj, "officeIdList", []);
			} else {
				this.$set(this.findObj, "officeIdList", [
					this.app.currOfficeId,
				]);
			}
			this.getListData();
		},
		//可选方法，如果是多选的话必须有
		selectionChange(selection) {
			console.log(selection);
			this.selection = selection;
		},
		//改变页码
		pageChange(pageNo, pageSize) {
			if (!pageNo) {
				//防止无用重复请求
				return;
			}
			this.pageNo = pageNo;
			this.pageSize = pageSize;
			this.getListData();
		},
		isExport(val) {
			//这里val的值。是根据设置下拉类型button设定的值来匹配判断
			if (val == "2" && !this.selection.length) {
				this.$Message.error(this.$t("scoretemplate_scoretemplate_572"));
				return;
			}
			let searchObj = this.searchObj;
			if (val == "1") {
				searchObj.typeList = ["0", "1"];
                searchObj = Object.assign({}, this.findObj, searchObj);
                
                if(searchObj.endDateStart){
                    searchObj.endDateStart += " 00:00:00"
                }
                if(searchObj.endDateEnd){
                    searchObj.endDateEnd += " 23:59:59"
                }

                if(searchObj.createDateStart){
                    searchObj.createDateStart += " 00:00:00"
                }
                if(searchObj.createDateEnd){
                    searchObj.createDateEnd += " 23:59:59"
                }

                if(searchObj.auditTimeStart){
                    searchObj.auditTimeStart += " 00:00:00"
                }
                if(searchObj.auditTimeEnd){
                    searchObj.auditTimeEnd += " 23:59:59"
                }

				this.exportMethod = htValidApply.htValidApplyExport; //导出用到的方法对象
			} else if (val == "2") {
				//如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
				searchObj = {
					ids: this.selection.map((item) => {
						return item.id;
					}),
				};
				this.exportMethod = htValidApply.htValidApplyExport; //导出用到的方法对象
			}
			this.$refs.exportModal.noShowExport(this.exportMethod, searchObj);
		},
		setOptTime(flag) {
			if (flag) {
				this.createDate = [];
				this.createDateChange();
			}
		},
		setOptTime1(flag) {
			if (flag) {
				this.auditTime = [];
				this.auditTimeChange();
			}
		},
		setOptTime2(flag) {
			if (flag) {
				this.endDate = [];
				this.endDateChange();
			}
		},
	},
};
</script>
