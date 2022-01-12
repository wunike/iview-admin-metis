<style lang="less">
.approval-manage {
	.ivu-tabs-bar {
		margin-bottom: 0;
	}
	.ivu-tabs-nav {
		padding-top: 12px;
	}
	.ivu-tabs-tab {
		padding-bottom: 10px !important;
	}
	.v-search-collapse-container {
		padding-bottom: 4px;
	}
	@br: 4px; //border-radius
	.am-header {
		background: #fff;
		border-radius: @br;
	}
	.mytable {
		margin-top: 10px;
		width: 100%;
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		padding: 0 16px;
		.name {
			margin-left: 0;
		}
	}
	.approval {
		position: relative;
		color: #495060;
		padding-left: 8px;
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
			background: #999999;
		}
	}
	.approval-2 {
		.approval;
		&::before {
			background: #44bcb7;
		}
	}
	.approval-3 {
		.approval;
		&::before {
			background: #06a59b;
		}
	}
	.approval-4 {
		.approval;
		&::before {
			background: #52c41a;
		}
	}
	.approval-5 {
		.approval;
		&::before {
			background: #f5222d;
		}
	}
	.progress {
		width: 60px;
		height: 8px;
		background: #ebecf0;
		border-radius: 24px;
		position: relative;
		overflow: hidden;
		> span {
			position: absolute;
			top: 0;
			left: 0;
			display: inline-block;
			height: 100%;
			width: 0;
			background: #44bcb7;
		}
	}
}

.cp-section {
	.flexRow {
		display: flex;
		flex-direction: row;
	}
	.cp-course {
		height: 535px;
		width: 100%;
		padding: 20px 40px 20px;
		background: #f2f3f7;
		.flexRow;
		justify-content: space-between;
		align-items: center;
		.cp-course-item {
			height: 496px;
			width: 400px;
			border-radius: 4px;
			border: 1px solid #e6e7eb;
			overflow: visible;
			position: relative;
			.combination-course-table {
				position: absolute;
				height: 275px;
				width: 548px;
				top: 100px;
				right: 32px;
				box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
				background: #fff;
				border-radius: 4px;
				z-index: 10;
				.ivu-table td,
				.ivu-table-header th {
					height: 50px !important;
				}
			}
			.course-search {
				height: 64px;
				width: 548px;
				.flexRow;
				justify-content: flex-start;
				align-items: center;
			}
			.cp-course-item-t {
				height: 52px;
				border-radius: 4px 4px 0 0;
				.flexRow;
				justify-content: center;
				align-items: center;
				background: #f7f8fa;
				border-bottom: 1px solid #e6e7eb;
				span {
					color: #495060;
					font-size: 14px;
					margin-left: 3px;
				}
			}
			.cp-course-ul {
				height: 403px;
				background: #fff;
				overflow-y: scroll;
				.cp-course-li {
					border-bottom: 1px solid #e6e7eb;
					.flexRow;
					justify-content: flex-start;
					align-items: flex-start;
					height: 180px;
					width: 100%;
					&:nth-last-of-type(1) {
						border-bottom: 0;
					}
				}
				.checkes {
					.flexRow;
					justify-content: center;
					align-items: center;
					width: 56px;
					height: 100%;
				}
				.ul-items {
					width: 302px;
					div {
						width: 288px;
						margin-top: 12px;
						font-size: 14px;
						span {
							font-size: 14px;
							color: #495060;
						}
					}
					.ul-items-s {
						margin-top: 10px;
						padding-top: 6px;
						margin-bottom: 10px;
						border-top: 1px dashed #e6e7eb;
					}
				}
			}
			.cp-course-item-b {
				height: 39px;
				background: #fff;
				border-radius: 0 0 4px 4px;
				padding-right: 8px;
				padding-top: 8px;
				padding-left: 15px;
				font-size: 14px;
				border-top: 1px solid #e6e7eb;
				a {
					cursor: default;
				}
				.left {
					float: left;
				}
				.right {
					float: right;
				}
			}
			.new-course {
				background: #fff;
			}
			.combination-course {
				height: 64px;
				background: #fff;
				border-bottom: 1px solid #e6e7eb;
				padding: 15px 16px 0;
			}
			.new-course-box {
				height: 403px;
				overflow-y: scroll;
			}
			.new-course-item {
				padding-left: 16px;
				padding-right: 16px;
				width: 100%;
				border-bottom: 1px solid #e6e7eb;
				padding-bottom: 10px;
				.nc-1 {
					.flexRow;
					justify-content: space-between;
					align-items: center;
					padding: 10px 0;
					b {
						font-size: 16px;
						font-weight: 500;
						color: rgba(73, 80, 96, 1);
						line-height: 22px;
						margin-right: 6px;
					}
					span {
						font-size: 12px;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						line-height: 17px;
					}
					a {
						font-size: 14px;
						font-weight: 400;
						line-height: 20px;
						margin-right: 16px;
					}
				}
				.nc-2 {
					margin-bottom: 10px;
					span {
						font-size: 14px;
						color: rgba(73, 80, 96, 1);
					}
					b {
						font-size: 14px;
						font-weight: 400;
						color: rgba(73, 80, 96, 1);
						line-height: 20px;
						padding: 0 5px;
					}
				}
				.nc-3 {
					padding-bottom: 15px;
					border-bottom: 1px dashed #e6e7eb;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					span {
						font-size: 14px;
						font-weight: 400;
						color: rgba(73, 80, 96, 1);
					}
				}
				.nc-4 {
					.flexRow;
					justify-content: space-between;
					align-items: center;
					margin-top: 5px;
					span {
						font-size: 14px;
						font-weight: 400;
						color: rgba(73, 80, 96, 1);
						line-height: 20px;
					}
				}
				.nc-5 {
					span {
						font-size: 14px;
						font-weight: 400;
						color: rgba(73, 80, 96, 1);
						line-height: 20px;
					}
				}
				&:nth-last-of-type(1) {
					border-bottom: 0;
				}
			}
		}
	}
}
</style>
<template>
	<div class="approval-manage">
		<div class="am-header">
			<vSearchCollapse @search="listMyUnauditFlowCom" @reset="resetSearch" @changeDivHeight="changeDivHeight">
				<DatePicker
					ref="DatePicker"
					:options="options3"
					split-panels
					@on-open-change="setOptTime"
					v-model="searchBox.applayTime"
					type="daterange"
					separator=" ~ "
					format="yyyy-MM-dd"
					:placeholder="$t('modules_spoc_jw_web_src_views_approval_approvalnew_2244')"
					style="width: 224px;margin-right:12px;"
				></DatePicker>
				<Select
					:placeholder="$t('courselist_courselist_225')"
					v-model="searchBox.selectCompus"
					clearable
					style="width:224px;margin-right:12px;"
				>
					<Option
						v-for="item in searchBox.selectCompusList"
						:value="item.id"
						:key="item.id"
					>{{item.code}}{{item.name }}</Option>
				</Select>
				<Select
					filterable
					remote
					:loading="teacherLoading"
					@on-clear="clearStu"
					:remote-method="stuRemote"
					v-model="searchBox.name"
					clearable
					:placeholder="$t('memberlist_memberlist_257')"
					style="width: 140px;margin-right:12px;"
				>
					<Option v-for="item in nameList" :value="item.value" :key="item.value">{{ item.name }}</Option>
				</Select>
				<Select
					filterable
					remote
					:loading="assistLoading"
					:remote-method="appRemote"
					v-model="searchBox.applicant"
					@on-clear="clearAppl"
					clearable
					:placeholder="$t('modules_spoc_jw_web_src_views_approval_approvalnew_2247')"
					style="width: 140px;margin-right:12px;"
				>
					<Option v-for="item in applicantList" :value="item.value" :key="item.value">{{ item.name }}</Option>
				</Select>
                <Select :placeholder="$t('spoc_hootie_web_12')" v-model="searchBox.status" clearable
                    style="width:140px;margin-right:12px;">
                    <Option v-for="item in statusList" :value="item.value"
                        :key="item.value">{{ item.label }}</Option>
                </Select>
				<Select
					:placeholder="$t('modules_spoc_jw_web_src_views_approval_approvalnew_2248')"
					v-model="searchBox.bussType"
					clearable
					style="width:140px;margin-right:12px;"
				>
					<Option
						v-for="item in searchBox.bussTypeList"
						:value="item.value"
						:key="item.value"
					>{{ item.label }}</Option>
				</Select>
			</vSearchCollapse>
		</div>
		<big-table
			v-if="defaultShowCol"
			class="mytable"
			:tableData="dataT"
            :tableHeightOut="tableHeightOut"
			:tableColumnArray="columnsT"
			:defaultShowCol="defaultShowCol"
			:btnList="btnList"
			:updateShowTitleMethod="updateShowTitle"
			:dataTotal="pageCounts"
			:pageNo="pageNo"
			:maxFlagForFixed="12"
			:isShowSelectTableColumn="false"
			@pageChange="pageChange"
		>
			<div slot="tableNameSlot">{{tableTitle}}</div>
		</big-table>
		<tableDetails @getFaList="listMyUnauditFlowCom" :detailsTitle="$t('modules_spoc_jw_web_src_views_approval_approvalnew_2249')" ref="tableDetails"></tableDetails>
	</div>
</template>
<script>
import vSearchCollapse from "@public/modules/vSearchCollapse";
import bigTable from "@public/modules/bigTable.vue";
// import tableDetails from "./tableDetails";
import tableDetails from "../../../../spoc-sign-web/src/modules/tableDetails";

import valid, {
	errors,
	sysUser,
	sysDict,
	comAuditFlow,
	jwClassCourse,
	sysCommonSql
} from "../../libs/request";
import { mapMutations, mapState } from "vuex";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
export default {
	name: "jw.approvalList",
	data() {
		return {
			options3: null,
            tableHeightOut: 68 + 50, //324,
			waitApproval: 0, //待审批数
			searchBox: {
				name: "",
				selectCompus: "",
				bussType: "",
				bussTypeList: [],
				applicant: "",
				selectCompusList: [],
                applayTime: [],
                status: ''
			},
			tableTitle: this.$t('jw.approvalManagement'),
			updateShowTitle: null,
			defaultShowCol: null,
			pageNo: 1,
			pageCounts: 10, //总数
			pageSize: this.$store.state.app.pageSizeGlobal,
			btnList: [
				//					[{
				//							style: {},
				//							type: '',
				//							btnClick: this.isExport,
				//							text: '导出全部',
				//							value: '1',
				//							parentName: '导出'
				//						},
				//						{
				//							style: {},
				//							type: '',
				//							btnClick: this.isExport,
				//							text: '导出所选',
				//							value: '2',
				//							parentName: '导出'
				//						},
				//					],
			],
			dataT: [],
			cols: {
				false: [
					{
						name: "curRoleName",
						title: this.$t('modules_spoc_jw_web_src_views_approval_approvalnew_2251'),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "flowLevel/curNodeOrder",
						title: this.$t('modules_spoc_jw_web_src_views_approval_approvalnew_2252'),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "nodeStatus",
						title: this.$t('spoc_hootie_web_12'),
						selected: true,
						required: false,
						sort: 0
					}
				],
				true: [
					{
						name: "applyerName",
						title: this.$t('modules_spoc_jw_web_src_views_approval_approvalnew_2247'),
						selected: true,
						required: true,
						sort: 0
					},
					{
						name: "applyTime",
						title: this.$t('principalmailbox_8'),
						selected: true,
						required: true,
						sort: 1
					},
					{
						name: "type",
						title: this.$t('modules_spoc_jw_web_src_views_approval_approvalnew_2248'),
						selected: true,
						required: true,
						sort: 2
					},
					{
						name: "studentName",
						title: this.$t('memberlist_memberlist_257'),
						selected: true,
						required: true,
						sort: 3
					},
					{
						name: "phone",
						title: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1637'),
						selected: true,
						required: true,
						sort: 5
					}
				]
			},
			columnsT: [
				{
					// title: "学员姓名",
					key: "studentName",
					fixed: "left",
					tooltip: true,
					render: (h, params) => {
						return h(
							"a",
							{
								style: {},
								on: {
									click: () => {
										//                                        alert('ok')
									}
								}
							},
                            params.row.studentName ? params.row.studentName : '-'
						);
					}
				},
				{
					// title: "业务类型",
					key: "type",
					fixed: "left",
					render: (h, params) => {
						return h("span", params.row.typeName);
					}
				},
				{
					// title: "审批状态",
					key: "nodeStatus",
					render: (h, params) => {
						return h(
							"span",
							{
								class:
									params.row.status === "unsubmit"
										? "approval-1"
										: params.row.status === "unaudit"
										? "approval-2"
										: params.row.status === "auditing"
										? "approval-3"
										: params.row.status === "agree"
										? "approval-4"
										: params.row.status === "reject"
										? "approval-5"
										: ""
							},
                            params.row.statusName
                        )
					}
				},
				{
					// title: "当前审批角色",
					key: "curRoleName",
					tooltip: true,
					render: (h, params) => {
						return h("div", {}, [
							h(
								"span",
								{
									style: {
										display:
											params.row.flowLevel == null
												? "none"
												: "block"
									}
								},
								params.row.curRoleName
							),
							h(
								"span",
								{
									style: {
										display:
											!params.row.curRoleName &&
											(params.row.status === "agree" ||
												params.row.status === "reject")
												? "block"
												: "none"
									}
								},
								"/"
							)
						]);
					}
				},
				{
					// title: "审批进度",
					key: "flowLevel/curNodeOrder",
					minWidth: 120,
					tooltip: true,
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									display: "flex",
									"flex-direction": "row",
									"justify-content": "flex-start",
									"align-items": "center"
								}
							},
							[
								h(
									"div",
									{
										class: "progress",
										style: {
                                            display: params.row.flowLevel == null || params.row.status == 'invalid'|| (parseInt(parseInt(params.row.curNodeOrder)+1) == parseInt(parseInt(params.row.flowLevel)+1)) ? 'none' : 'block'
                                        }
									},
									[
										h("span", {
                                            style: {
                                                width: this.tabValue == 'C'
                                                    ? (60 * parseInt(parseInt(params.row.curNodeOrder)+1)) / parseInt(parseInt(params.row.flowLevel)+1) + 'px'
                                                    : (params.row.status == 'reject' || params.row.status == 'uncommit')
                                                        ? '' :(60 * parseInt(parseInt(params.row.curNodeOrder)+1)) / parseInt(parseInt(params.row.flowLevel)+1) + 'px'
                                            }
										})
									]
								),
								h(
									"span",
									{
										style: {
											"margin-left": "4px",
                                            display: params.row.flowLevel == null || params.row.status == 'invalid'||(parseInt(parseInt(params.row.curNodeOrder)+1) == parseInt(parseInt(params.row.flowLevel)+1)) ? 'none' : 'block'
                                        }
									},
                                    (this.tabValue == 'C'
                                        ?parseInt(parseInt(params.row.curNodeOrder)+1)
                                        :(params.row.status == 'reject' || params.row.status == 'uncommit')
                                            ? params.row.curNodeOrder
                                            :parseInt(parseInt(params.row.curNodeOrder)+1))
                                    +
                                    '/' + parseInt(parseInt(params.row.flowLevel)+1)
								),
								h(
									"span",
									{
										style: {
											display:
												params.row.flowLevel == null||(parseInt(parseInt(params.row.curNodeOrder)+1) == parseInt(parseInt(params.row.flowLevel)+1))
													? "block"
													: "none",
											"margin-left": "4px"
										}
									},
									this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1749')
								),
                                h(
                                    'span',
                                    {
                                        style: {
                                            display: params.row.flowLevel !== null && params.row.status == 'invalid'? 'block' : 'none',
                                            'margin-left': '4px'
                                        }
                                    },
                                    '-'
                                )
							]
						);
					}
				},

				{
					title: this.$t('classlist_compontents_detailinfo_45'),
					key: "doAction",
					fixed: "right",
					width: 70,
					render: (h, params) => {
						return h("div", [
							h(
								"a",
								{
									props: {
										type: "text",
										size: "small"
									},
									style: {},
									on: {
										click: () => {
                                            this.$refs.tableDetails.showPop({
                                                flowId: params.row.id,
                                                id: params.row.objectId,
                                                key: params.row.type,
                                                tab: this.tabValue,
                                                status: params.row.status
                                            });
											// this.seeDetails({
											// 	row: params.row
											// });
										}
									}
								},
								this.$t('principalmailbox_16')
							)
						]);
					}
				}
			],
			params: {},
			nameList: [],
            applicantList: [],
            statusList: []
		};
	},
	components: {
		vSearchCollapse,
		bigTable,
		tableDetails
	},
	created() {
	},
	computed: {
		...mapState(["userInfo", "app","calendarConfig"])
	},
	mounted() {
	    this.getShowTitle();
		this.getBuss();
		this.getCompassFn();
	},

	methods: {
		...mapMutations(["updateLoadingStatus"]),
		setOptTime(flag){
			if(flag){
				this.searchBox.applayTime = []
			}
		},
        changeDivHeight(height) {
            this.tableHeightOut = height + 50;
        },
		getCompassFn() {
			sysUser
				.dataScopeFilter()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let data = res.data.data;
						this.searchBox.selectCompusList = data;
						// console.log(data)
						waitUntil(
							() => {
								// console.log("this.app.currOfficeId ==" + this.app.currOfficeId)
								if (this.app.currOfficeId) {
									this.$set(
										this.searchBox,
										"selectCompus",
										this.app.currOfficeId == 'all' ? '' : this.app.currOfficeId
									);
								}
								return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval) || false;
							},
							() => {
								this.searchBox.applayTime = defaultDatePickerValue()
								this.options3 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
								this.listMyUnauditFlowCom();
							}
						);
					}
				})
				.catch(errors.call(this));
		},
		clearAppl() {
			this.applicantList = [];
		},
		clearStu() {
			this.nameList = [];
		},
		stuRemote(query) {
			this.getSearchList("student_id", query);
		},
		appRemote(query) {
			this.getSearchList("applyer_id", query);
		},
		getSearchList(userType, query) {
			if (query !== "") {
				let obj = {
					mainTable: "com_audit_flow",
					mainField: userType,
					joinField: "id",
					joinTable: "sys_user",
					secondField: "name",
					joinTableSearchParam: query
				};
				if (userType == "student_id") {
					this.teacherLoading = true;
					obj.joinTable = "com_student";
				} else if (userType == "applyer_id") {
					this.assistLoading = true;
					obj.joinTable = "sys_user";
				}
				sysCommonSql
					.queryPageInputInitData(obj)
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							//                            console.log(res)
							if (userType == "student_id") {
								this.teacherLoading = false;
								this.nameList = res.data.data;
							} else if (userType == "applyer_id") {
								this.assistLoading = false;
								this.applicantList = res.data.data;
							}
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						// this.updateLoadingStatus({ isLoading: false });
					});
			}
		},
		getBuss() {
            let types = [
                'com_audit_flow_type', 
                'com_audit_status'
            ]
			sysDict
				.batchListData({types: types.join(',')})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
                        let _data = res.data.data;
						let arr = _data.com_audit_flow_type;
						this.searchBox.bussTypeList = arr.filter(item => {
							return item.menuId == "4001";
                        });
                        this.statusList = _data.com_audit_status;
					}
				})
				.then(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		formatTime(time) {
			let times = new Date(time).format("yyyy-MM-dd hh:mm:ss");
			return times;
		},
		listMyUnauditFlowCom(key) {
			//common
			this.updateLoadingStatus({ isLoading: true });
			this.params = {
				applyerId: this.searchBox.applicant,
				auditor: "",
				endApplyTime: this.searchBox.applayTime[1] ? new Date(this.searchBox.applayTime[1]).format('yyyy-MM-dd 23:59:59') : '',
				menuId: "4001",
				objectNo: "",
				officeId: this.searchBox.selectCompus,
				officeType: "",
				startApplyTime: this.searchBox.applayTime[0] ? new Date(this.searchBox.applayTime[0]).format('yyyy-MM-dd 00:00:00') : '',
				studentId: this.searchBox.name,
				type: "",
				userId: "",
				pageNo: this.pageNo,
                pageSize: this.pageSize,
                status: this.searchBox.status
			};
            let fn = comAuditFlow.listPage(this.params);
			fn.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.dataT = res.data.data.list;
						this.pageCounts = res.data.data.total;
						let ids = this.searchBox.selectCompusList.map(item => {
							return item.id;
						});
						if (
							res.data.data.selfOffices &&
							res.data.data.selfOffices.length
						) {
							res.data.data.selfOffices.forEach(item => {
								if (ids.indexOf(item.id) < 0) {
									this.searchBox.selectCompusList.push(item);
								}
							});
						}
						this.searchBox.selectCompusList.sort(function(a, b) {
							return a.sort - b.sort;
						});
					}
				})
				.then(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		resetSearch() {
			for (let item in this.searchBox) {
				if (
					typeof this.searchBox[item] === "string" &&
					item != "selectCompus"
				) {
					this.searchBox[item] = "";
				}
			}
			this.searchBox.applayTime = defaultDatePickerValue()
			this.nameList = [];
			this.applicantList = [];
			this.$set(this.searchBox, "selectCompus", this.app.currOfficeId == 'all' ? '' : this.app.currOfficeId);
			this.listMyUnauditFlowCom();
		},
		getShowTitle() {
			this.defaultShowCol = this.cols;
		},
		//改变页码
		pageChange(page, size) {
			this.pageNo = page;
			this.pageSize = size;
			this.listMyUnauditFlowCom();
		},
		isExport(val) {},

	},
	watch: {
		"app.currOfficeId": function(val, oldVal) {
			if (oldVal && this.$route.name == 'jw.approvalList') {
				this.$set(
					this.searchBox,
					"selectCompus",
					this.app.currOfficeId == 'all' ? '' : this.app.currOfficeId
				);
				this.addActive("A");
			}
		}
	}
};
</script>
