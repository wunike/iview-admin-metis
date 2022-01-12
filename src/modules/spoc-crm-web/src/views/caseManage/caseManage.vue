<style lang="less">
.caseManage {
	.my-table {
		width: 100%;
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		padding: 0 16px;
		margin-top: 10px;
		.subTypeNameStyle {
			margin-left: 11px;
			.ivu-table-cell {
				margin-left: 11px;
			}
		}
	}
	.search-title {
		padding: 10px;
		background: #fff;
		.ivu-tabs-bar {
			margin-bottom: 0;
			border-radius: 4px 4px 0 0;
		}
	}
	.v-search-collapse-container {
		padding-left: 16px;
	}
	.search_form_create {
		vertical-align: top;
	}
}
.caseDetailSPModal {
	.ivu-modal-body {
		padding: 0 40px 40px;
	}
	.labelName {
		height: 20px;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: #495060;
		line-height: 20px;
		margin-top: 20px;
	}
	.values {
		display: flex;
		flex-wrap: wrap;
		.valueBlock {
			width: 50%;
			display: flex;
			height: 14px;
			line-height: 14px;
			font-size: 14px;
			font-family: HiraginoSansGB-W3, HiraginoSansGB;
			font-weight: normal;
			color: #495060;
			margin-top: 16px;
			.valueBlockLabel {
				width: 200px;
				text-align: right;
			}
			&:nth-child(2n) {
				.valueBlockLabel {
					width: 160px;
					text-align: right;
				}
			}
		}
	}
}
</style>
<template>
	<div class="caseManage">
		<div class="search-title">
			<v-search-collapse @search="doSearch" @reset="resetSearch">
				<!-- <Select
					v-model="searchObj.search1"
					style="width: 140px"
					clearable
					:placeholder="'国家选择'"
				>
					<Option>美国</Option>
					<Option>英国</Option>
					<Option>其他</Option>
				</Select> -->
				<Input
					v-model="searchObj.search1"
					style="width: 200px"
					:placeholder="'学员编号'"
				></Input>
				<Input
					v-model="searchObj.search2"
					style="width: 200px"
					:placeholder="'申请人'"
				></Input>
				<Input
					v-model="searchObj.search3"
					style="width: 200px"
					:placeholder="'申请时间'"
				></Input>
				<Input
					v-model="searchObj.search4"
					style="width: 200px"
					:placeholder="'审批人'"
				></Input>
				<Input
					v-model="searchObj.search5"
					style="width: 200px"
					:placeholder="'审批时间'"
				></Input>
				<Input
					v-model="searchObj.search6"
					style="width: 200px"
					:placeholder="'审批状态'"
				></Input>
			</v-search-collapse>
		</div>
		<big-table
			v-if="defaultShowCol"
			class="my-table"
			:tableName="tableName"
			:tableHeightOut="tableHeightOut"
			:tableData="tableData"
			:tableColumnArray="tableColumnArray"
			:defaultShowCol="defaultShowCol"
			:canSelection="true"
			@selectionChange="selectionChange"
			:dataTotal="dataTotal"
			:btnList="btnList"
			:isShowSelectTableColumn="true"
			:updateShowTitleMethod="updateShowTitle"
			:updateShowTitleKey="updateShowTitleKey"
			:pageNo="pageNo"
			@resetDefault="resetDefaultCol"
			@pageChange="pageChange"
		></big-table>
		<Modal
			v-model="modal1"
			:mask-closable="false"
			width="400"
			title="提示"
			@on-ok="ok"
			@on-cancel="cancel"
		>
			<p style="font-size: 16px">确认删除？</p>
		</Modal>
		<Modal
			v-model="showDetailReason"
			:mask-closable="false"
			width="700"
			title="驳回理由"
			@on-ok="okReason"
			@on-cancel="cancelReason"
		>
			<Form
				ref="formValidate"
				:model="formValidate"
				:rules="ruleValidate"
				:label-width="80"
			>
				<FormItem label="驳回理由：" prop="desc">
					<Input
						v-model="formValidate.reason"
						type="textarea"
						:autosize="{ minRows: 5, maxRows: 5 }"
						placeholder="请输入驳回理由"
					></Input>
				</FormItem>
			</Form>
		</Modal>
		<Modal
			v-model="showDetail"
			:mask-closable="false"
			class-name="caseDetailSPModal"
			width="816"
			title="学生背景详情"
			:footer-hide="isView"
			:styles="{top: '20px'}"
		>
			<div class="labelName">基本信息</div>
			<div class="values">
				<div class="valueBlock">
					<div class="valueBlockLabel">学生姓名：</div>
					赵同学
				</div>
				<div class="valueBlock">
					<div class="valueBlockLabel">入学季：</div>
					2021秋
				</div>
				<div class="valueBlock">
					<div class="valueBlockLabel">背景院校1：</div>
					XXXXXXX
				</div>
				<div
					class="valueBlock"
					v-if="caseType == 'l2' || caseType == 'l3'"
				>
					<div class="valueBlockLabel">对应专业：</div>
					XXXXXXX
				</div>
				<div class="valueBlock">
					<div class="valueBlockLabel">背景院校2：</div>
					XXXXXXX
				</div>
				<div
					class="valueBlock"
					v-if="caseType == 'l2' || caseType == 'l3'"
				>
					<div class="valueBlockLabel">对应专业：</div>
					XXXXXXX
				</div>
			</div>
			<div class="labelName">标化信息</div>
			<div class="values">
				<div
					class="valueBlock"
					v-if="
						caseType == 'l1' || caseType == 'l3' || caseType == 'l4'
					"
				>
					<div class="valueBlockLabel">GPA得分：</div>
					3.4
				</div>
				<div
					class="valueBlock"
					v-if="
						caseType == 'l1' || caseType == 'l3' || caseType == 'l4'
					"
				>
					<div class="valueBlockLabel">GPA总分：</div>
					3.4
				</div>
				<div class="valueBlock" v-if="caseType == 'l2'">
					<div class="valueBlockLabel">高中GPA得分：</div>
					3.4
				</div>
				<div class="valueBlock" v-if="caseType == 'l2'">
					<div class="valueBlockLabel">高中GPA总分：</div>
					3.4
				</div>
				<div class="valueBlock" v-if="caseType == 'l2'">
					<div class="valueBlockLabel">本科GPA得分：</div>
					3.4
				</div>
				<div class="valueBlock" v-if="caseType == 'l2'">
					<div class="valueBlockLabel">本科GPA总分：</div>
					3.4
				</div>
				<div
					class="valueBlock"
					v-if="
						caseType == 'l1' ||
						caseType == 'l2' ||
						caseType == 'l3' ||
						caseType == 'l4'
					"
				>
					<div class="valueBlockLabel">TOEFL：</div>
					—
				</div>
				<div class="valueBlock" v-if="caseType == 'l4'">
					<div class="valueBlockLabel">TOEFL JUNIOR：</div>
					—
				</div>
				<div class="valueBlock" v-if="caseType == 'l3'">
					<div class="valueBlockLabel">GRE：</div>
					—
				</div>
				<div
					class="valueBlock"
					v-if="
						caseType == 'l1' || caseType == 'l2' || caseType == 'l4'
					"
				>
					<div class="valueBlockLabel">SAT总分：</div>
					1540
				</div>
				<div
					class="valueBlock"
					v-if="
						caseType == 'l1' ||
						caseType == 'l2' ||
						caseType == 'l3' ||
						caseType == 'l4'
					"
				>
					<div class="valueBlockLabel">IELTS：</div>
					—
				</div>
				<div class="valueBlock" v-if="caseType == 'l3'">
					<div class="valueBlockLabel">GMAT：</div>
					—
				</div>
				<div class="valueBlock" v-if="caseType == 'l4'">
					<div class="valueBlockLabel">SSAT：</div>
					—
				</div>
				<div class="valueBlock" v-if="caseType == 'l3'">
					<div class="valueBlockLabel">GRE SUBJECT：</div>
					—
				</div>
				<div class="valueBlock" v-if="caseType == 'l3'">
					<div class="valueBlockLabel">LAST：</div>
					—
				</div>
				<div
					class="valueBlock"
					v-if="caseType == 'l1' || caseType == 'l2'"
				>
					<div class="valueBlockLabel">SAT Sub详情：</div>
					—
				</div>
				<div
					class="valueBlock"
					v-if="caseType == 'l1' || caseType == 'l2'"
				>
					<div class="valueBlockLabel">ACT：</div>
					—
				</div>
				<div
					class="valueBlock"
					v-if="caseType == 'l1' || caseType == 'l2'"
				>
					<div class="valueBlockLabel">AP详情：</div>
					—
				</div>
				<div
					class="valueBlock"
					v-if="caseType == 'l1' || caseType == 'l2'"
				>
					<div class="valueBlockLabel">IB详情：</div>
					—
				</div>
				<div
					class="valueBlock"
					v-if="caseType == 'l1' || caseType == 'l2'"
				>
					<div class="valueBlockLabel">A-level详情：</div>
					—
				</div>
				<div
					class="valueBlock"
					v-if="
						caseType == 'l1' ||
						caseType == 'l2' ||
						caseType == 'l3' ||
						caseType == 'l4'
					"
				>
					<div class="valueBlockLabel">校内排名：</div>
					100/7
				</div>
			</div>
			<div class="labelName">其它背景</div>
			<div class="values">
				<div class="valueBlock">
					<div class="valueBlockLabel">突出活动：</div>
					—
				</div>
				<div class="valueBlock">
					<div class="valueBlockLabel">实习或工作：</div>
					—
				</div>
				<div class="valueBlock">
					<div class="valueBlockLabel">科研：</div>
					—
				</div>
				<div class="valueBlock">
					<div class="valueBlockLabel">夏校或交换：</div>
					—
				</div>
				<div class="valueBlock">
					<div class="valueBlockLabel">其它突出亮点：</div>
					—
				</div>
				<div class="valueBlock">
					<div class="valueBlockLabel">文书：</div>
					—
				</div>
			</div>
			<div class="labelName">录取信息</div>
			<Table
				:columns="columns1"
				:data="data1"
				style="margin-top: 16px"
			></Table>
			<div slot="footer">
				<Button type="primary" @click="pass">通过</Button>
				<Button type="error" @click="noPass">驳回</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import valid, {
	errors,
	common,
	sysUser,
	sysDict,
	sysProps,
	sysCommonSql,
} from "../../libs/request";
import {
	waitUntil,
	DatePickerOpt,
	defaultDatePickerValue,
} from "@public/libs/util";
import bigTable from "@public/modules/bigTable.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
export default {
	name: "crm.caseManage",
	data() {
		return {
			editId: "",
			isView: false,
			showDetailReason: false,
			formValidate: {
				reason: "",
			},
			modal1: false,
			caseType: "l1",
			showDetail: false,
			/* 搜索相关开始 */
			tableHeightOut: 72 + 68, //324,
			searchObj: {
				search1: "",
			},
			pageNo: 1,
			pageSize: this.$store.state.app.pageSizeGlobal,
			/*搜索相关结束*/
			updateShowTitleKey: "comTaskListPage",
			updateShowTitle: common.updateShowTitleComTask,
			tableName: "案例管理",
			defaultShowCol: null,
			dataTotal: 0,
			tableData: [],
			tableColumnArray: [
				{
					title: "操作",
					key: "doAction",
					width:'200',
					render: (h, params) => {
						return h("div", {}, [
							h(
								"a",
								{
									style: {
										"margin-right": "8px",
										"word-break": " keep-all",
									},
									on: {
										click: () => {
											this.showDetail = true;
											this.isView = true;
										},
									},
								},
								"详情"
							),
							params.row.spStatus == "1" ||
							params.row.spStatus == "4"
								? h(
										"a",
										{
											style: {
												"margin-right": "8px",
												"word-break": " keep-all",
											},
											on: {
												click: () => {
													params.row.spStatus = 2;
												},
											},
										},
										"送审"
								  )
								: "",
							params.row.spStatus == "2"
								? h(
										"a",
										{
											style: {
												"margin-right": "8px",
												"word-break": " keep-all",
											},
											on: {
												click: () => {
													this.isView = false;
													this.showDetail = true;
													this.editId = params.row.id;
												},
											},
										},
										"审批"
								  )
								: "",
							params.row.spStatus == "1" ||
							params.row.spStatus == "4"
								? h(
										"a",
										{
											style: {
												"margin-right": "8px",
												"word-break": " keep-all",
											},
											on: {
												click: () => {
													this.$router.push({
														name: "crm.caseCreate",
														query: {
															id: 1,
														},
													});
												},
											},
										},
										"修改"
								  )
								: "",
							params.row.spStatus == "1" ||
							params.row.spStatus == "3" ||
							params.row.spStatus == "4"
								? h(
										"a",
										{
											style: {
												"margin-right": "8px",
												"word-break": " keep-all",
											},
											on: {
												click: () => {
													this.modal1 = true;
												},
											},
										},
										"删除"
								  )
								: "",
							params.row.spStatus == "4"
								? h(
										"a",
										{
											style: {
												"word-break": " keep-all",
											},
											on: {
												click: () => {
													this.formValidate.reason =
														"文书未上传";
													this.showDetailReason = true;
												},
											},
										},
										"驳回理由"
								  )
								: "",
						]);
					},
				},
			],
			selection: [],
			detailObj: {
				completeResultObj: "",
				commentList: [],
				taskTpl: {},
			},
			btnList: [
				{
					type: "",
					btnClick: this.createCase,
					text: "新建案例",
				},
			],
			columns1: [
				{
					title: "学生编号",
					key: "stuNo",
				},
				{
					title: "录取学校",
					key: "schoolName",
				},
				{
					title: "录取国家",
					key: "countryName",
				},
				{
					title: "录取专业",
					key: "majorName",
				},
				{
					title: "录取结果",
					key: "resultName",
				},
			],
			data1: [
				{
					stuNo: "111",
					schoolName: "纽约大学",
					countryName: "美国",
					majorName: "计算机",
					resultName: "录取",
				},
				{
					stuNo: "111",
					schoolName: "纽约大学",
					countryName: "美国",
					majorName: "计算机",
					resultName: "录取",
				},
				{
					stuNo: "111",
					schoolName: "纽约大学",
					countryName: "美国",
					majorName: "计算机",
					resultName: "录取",
				},
				{
					stuNo: "111",
					schoolName: "纽约大学",
					countryName: "美国",
					majorName: "计算机",
					resultName: "录取",
				},
			],
		};
	},
	computed: {
		...mapState(["app", "buttonPerm", "userInfo"]),
		myButtonPrem() {
			return this.buttonPerm
				? this.buttonPerm["crm.caseManage"] || []
				: [];
		},
	},
	components: {
		bigTable,
		vSearchCollapse,
	},
	mounted() {
		this.getShowTitle();
		this.getListData();
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		okReason() {
			this.showDetailReason = false;
			this.showDetail = false;
			this.tableData.forEach((item) => {
				if (item.id == this.editId) {
					item.spStatus = 4;
				}
			});
			this.$forceUpdate();
		},
		cancelReason() {
			this.showDetailReason = false;
		},
		pass() {
			this.showDetail = false;
			this.tableData.forEach((item) => {
				if (item.id == this.editId) {
					item.spStatus = 3;
				}
			});
			this.$forceUpdate();
		},
		noPass() {
			this.formValidate.reason = "";
			this.showDetailReason = true;
		},
		createCase() {
			this.$router.push({
				name: "crm.caseCreate",
			});
		},
		resetDefaultCol() {
			this.updateLoadingStatus({ isLoading: true });
			common
				.clearShowFieldComTask({
					pageIdentifier: "comTasklistSopPage",
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
		selectionChange(selection) {
			this.selection = selection;
		},
		changeDivHeight(height) {
			this.tableHeightOut = height + 68;
		},
		getListData(isFirst) {
			this.updateLoadingStatus({ isLoading: true });
			let param = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
			};

			common
				.listAllPage(param)
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						let result = res.data.data;
						this.tableData = result.list;
						this.dataTotal = result.total;
						let obj1 = {
							id: 1,
							stuNo: "stu001",
							schoolName: "纽约大学",
							countryName: "美国",
							majorName: "计算机",
							resultName: "录取",
							spStatus: "1",
							spStatusText: "待送审",
							resultName1: "AAA",
							resultName2: "2020-06-28 11:22:33",
							resultName3: "ABC",
							resultName4: "2020-06-28 11:32:33",
						};
						let obj2 = Object.assign({}, obj1);
						obj2.id = "2";
						obj2.stuNo = "stu002";
						obj2.spStatus = "2";
						obj2.spStatusText = "待审批";
						let obj3 = Object.assign({}, obj1);
						obj3.id = "3";
						obj3.stuNo = "stu003";
						obj3.spStatus = "3";
						obj3.spStatusText = "已通过";
						let obj4 = Object.assign({}, obj1);
						obj4.id = "4";
						obj4.stuNo = "stu004";
						obj4.spStatus = "4";
						obj4.spStatusText = "已驳回";
						let obj5 = Object.assign({}, obj1);
						obj5.id = "5";
						obj5.stuNo = "stu005";
						obj5.spStatus = "2";
						obj5.spStatusText = "待审批";
						let obj6 = Object.assign({}, obj1);
						obj6.id = "6";
						obj6.stuNo = "stu006";
						obj6.spStatus = "2";
						obj6.spStatusText = "待审批";
						this.tableData = [obj1, obj2, obj3, obj4, obj5, obj6];
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		//获取数据，根据情况修改接口、传参
		doSearch() {
			this.pageNo = 1;
			this.getListData();
		},
		resetSearch() {
			for (let key in this.searchObj) {
				this.searchObj[key] = "";
			}
			this.pageNo = 1;
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
		//必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
		getShowTitle(closeLoad) {
			common
				.getShowTitleComTask({
					pageIdentifier: "comTaskListPage",
					voName: "com.windliven.spoc.modules.crm.vo.ComTaskVO",
				})
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						// this.defaultShowCol = res.data.data;
						this.defaultShowCol = {
							true: [
								{
									name: "id",
									title: "ID",
									selected: true,
									required: true,
									percent: false,
									total: "",
									filters: null,
									sort: 0,
									dynamiced: false,
									filtersKey: "",
									filterMultiple: false,
									sortable: "",
									width: 0,
									tooltip: true,
									sysProps: "",
									fixed: null,
									scrolled: null,
								},
								{
									name: "stuNo",
									title: "学生编号",
									selected: true,
									required: true,
									percent: false,
									total: "",
									filters: null,
									sort: 0,
									dynamiced: false,
									filtersKey: "",
									filterMultiple: false,
									sortable: "",
									width: 0,
									tooltip: true,
									sysProps: "",
									fixed: null,
									scrolled: null,
								},
								{
									name: "schoolName",
									title: "录取学校",
									selected: true,
									required: true,
									percent: false,
									total: "",
									filters: null,
									sort: 0,
									dynamiced: false,
									filtersKey: "",
									filterMultiple: false,
									sortable: "",
									width: 0,
									tooltip: true,
									sysProps: "",
									fixed: null,
									scrolled: null,
								},
								{
									name: "countryName",
									title: "录取国家",
									selected: true,
									required: true,
									percent: false,
									total: "",
									filters: null,
									sort: 0,
									dynamiced: false,
									filtersKey: "",
									filterMultiple: false,
									sortable: "",
									width: 0,
									tooltip: true,
									sysProps: "",
									fixed: null,
									scrolled: null,
								},
								{
									name: "majorName",
									title: "录取专业",
									selected: true,
									required: true,
									percent: false,
									total: "",
									filters: null,
									sort: 0,
									dynamiced: false,
									filtersKey: "",
									filterMultiple: false,
									sortable: "",
									width: 0,
									tooltip: true,
									sysProps: "",
									fixed: null,
									scrolled: null,
								},
								{
									name: "resultName",
									title: "录取结果",
									selected: true,
									required: true,
									percent: false,
									total: "",
									filters: null,
									sort: 0,
									dynamiced: false,
									filtersKey: "",
									filterMultiple: false,
									sortable: "",
									width: 0,
									tooltip: true,
									sysProps: "",
									fixed: null,
									scrolled: null,
								},
								{
									name: "resultName1",
									title: "申请人",
									selected: true,
									required: true,
									percent: false,
									total: "",
									filters: null,
									sort: 0,
									dynamiced: false,
									filtersKey: "",
									filterMultiple: false,
									sortable: "",
									width: 0,
									tooltip: true,
									sysProps: "",
									fixed: null,
									scrolled: null,
								},
								{
									name: "resultName2",
									title: "申请时间",
									selected: true,
									required: true,
									percent: false,
									total: "",
									filters: null,
									sort: 0,
									dynamiced: false,
									filtersKey: "",
									filterMultiple: false,
									sortable: "",
									width: 0,
									tooltip: true,
									sysProps: "",
									fixed: null,
									scrolled: null,
								},
								{
									name: "resultName3",
									title: "审批人",
									selected: true,
									required: true,
									percent: false,
									total: "",
									filters: null,
									sort: 0,
									dynamiced: false,
									filtersKey: "",
									filterMultiple: false,
									sortable: "",
									width: 0,
									tooltip: true,
									sysProps: "",
									fixed: null,
									scrolled: null,
								},
								{
									name: "resultName4",
									title: "审批时间",
									selected: true,
									required: true,
									percent: false,
									total: "",
									filters: null,
									sort: 0,
									dynamiced: false,
									filtersKey: "",
									filterMultiple: false,
									sortable: "",
									width: 0,
									tooltip: true,
									sysProps: "",
									fixed: null,
									scrolled: null,
								},
								{
									name: "spStatusText",
									title: "审批状态",
									selected: true,
									required: true,
									percent: false,
									total: "",
									filters: null,
									sort: 0,
									dynamiced: false,
									filtersKey: "",
									filterMultiple: false,
									sortable: "",
									width: 0,
									tooltip: true,
									sysProps: "",
									fixed: null,
									scrolled: null,
								},
							],
						};
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					if (closeLoad) {
						this.updateLoadingStatus({ isLoading: false });
					}
				});
		},
	},
	watch: {
		"app.currOfficeId": function (val, oldVal) {
			if (oldVal && this.$route.name == "crm.caseManage") {
				// this.$set(this.searchObj, "officeId", val=='all'?'':val);
				this.getListData();
			}
		},
	},
};
</script>
