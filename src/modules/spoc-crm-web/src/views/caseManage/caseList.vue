<style lang="less">
.caseList {
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
	.resultName0{
		width: 16px;
		height: 16px;
		background: url('../../assets/img/caseRes/caseRes0.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.resultName1{
		width: 16px;
		height: 16px;
		background: url('../../assets/img/caseRes/caseRes1.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.resultName2{
		width: 16px;
		height: 16px;
		background: url('../../assets/img/caseRes/caseRes2.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
}

.caseDetailModal {
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
	<div class="caseList">
		<div class="search-title">
			<Tabs
				v-model="caseType"
				:animated="false"
				@on-click="changeCaseType"
				@changeDivHeight="changeDivHeight"
			>
				<TabPane label="本科" name="l1"></TabPane>
				<TabPane label="本转" name="l2"></TabPane>
				<TabPane label="研究生" name="l3"></TabPane>
				<TabPane label="高中" name="l4"></TabPane>
			</Tabs>
			<v-search-collapse @search="doSearch" @reset="resetSearch">
				<Select
					v-model="searchObj.search1"
					style="width: 140px"
					clearable
					:placeholder="'国家选择'"
				>
					<!-- <Option v-for="item in officeIdList" :value="item.id" :key="item.id">{{item.code}}{{ item.name }}</Option> -->
					<Option>美国</Option>
					<Option>英国</Option>
					<Option>其他</Option>
				</Select>
				<Select
					v-model="searchObj.search2"
					style="width: 140px"
					clearable
					:placeholder="'申请学校'"
				>
					<Option>哈弗</Option>
					<Option>加州大学</Option>
					<Option>纽约大学</Option>
				</Select>
				<Select
					v-model="searchObj.search3"
					style="width: 140px"
					clearable
					:transfer="true"
					:placeholder="'申请专业'"
				>
					<Option>心理学</Option>
					<Option>加州大学</Option>
					<Option>纽约大学</Option>
				</Select>
				<Select
					v-model="searchObj.search4"
					style="width: 140px"
					:placeholder="'录取结果'"
					clearable
				>
					<Option>录取结果1</Option>
					<Option>录取结果2</Option>
					<Option>录取结果3</Option>
				</Select>
				<Select
					v-model="searchObj.search5"
					style="width: 140px"
					:placeholder="'学校背景'"
					clearable
				>
					<Option>学校背景1</Option>
					<Option>学校背景2</Option>
					<Option>学校背景3</Option>
				</Select>
				<Input
					v-model="searchObj.search12"
					style="width: 140px"
					:placeholder="'原专业'"
					v-show="caseType == 'l2' || caseType == 'l3'"
				></Input>
				<Input
					v-model="searchObj.search13"
					style="width: 140px"
					:placeholder="'录取学位'"
					v-show="caseType == 'l3'"
				></Input>
				<Input
					v-model="searchObj.search6"
					style="width: 140px"
					:placeholder="'GPA'"
				></Input>
				<Input
					v-model="searchObj.search7"
					style="width: 140px"
					:placeholder="'托福'"
				></Input>
				<Input
					v-model="searchObj.search8"
					style="width: 140px"
					:placeholder="'雅思'"
				></Input>
				<Input
					v-model="searchObj.search14"
					style="width: 140px"
					:placeholder="'GRE'"
					v-show="caseType == 'l3'"
				></Input>
				<Input
					v-model="searchObj.search15"
					style="width: 140px"
					:placeholder="'GMAT'"
					v-show="caseType == 'l3'"
				></Input>
				<Input
					v-model="searchObj.search16"
					style="width: 140px"
					:placeholder="'LAST'"
					v-show="caseType == 'l3'"
				></Input>
				<Input
					v-model="searchObj.search17"
					style="width: 140px"
					:placeholder="'托福Junior'"
					v-show="caseType == 'l4'"
				></Input>
				<Input
					v-model="searchObj.search18"
					style="width: 140px"
					:placeholder="'SSAT'"
					v-show="caseType == 'l4'"
				></Input>
				<Input
					v-model="searchObj.search9"
					style="width: 140px"
					:placeholder="'SAT'"
					v-show="caseType == 'l1' || caseType == 'l2'"
				></Input>
				<Input
					v-model="searchObj.search10"
					style="width: 140px"
					:placeholder="'ACT'"
					v-show="caseType == 'l1' || caseType == 'l2'"
				></Input>
				<Select
					v-model="searchObj.search11"
					style="width: 140px"
					:placeholder="'入学年份'"
					clearable
				>
					<Option>2021</Option>
					<Option>2020</Option>
					<Option>2019</Option>
				</Select>
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
			v-model="showDetail"
			class-name="caseDetailModal"
			width="816"
			title="学生背景详情"
			:footer-hide="true"
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
	name: "crm.caseList",
	data() {
		return {
			/* 搜索相关开始 */
			tableHeightOut: 72 + 68, //324,
			caseType: "l1",
			btnList: [],
			searchObj: {
				search1: "",
				search2: "",
				search3: "",
				search4: "",
				search5: "",
				search6: "",
				search7: "",
				search8: "",
				search9: "",
				search10: "",
				search11: "",
				search12: "",
				search13: "",
				search14: "",
				search15: "",
				search16: "",
				search17: "",
				search18: "",
			},
			pageNo: 1,
			pageSize: this.$store.state.app.pageSizeGlobal,
			/*搜索相关结束*/
			showDetail: false,
			updateShowTitleKey: "comTaskListPage",
			updateShowTitle: common.updateShowTitleComTask,
			tableName: "本科案例",
			defaultShowCol: null,
			dataTotal: 0,
			tableData: [],
			tableColumnArray: [
				{
					title: "录取结果",
					key: "resultName",
					width: 130,
					render: (h, params) => {
						return h("div", {
							style:{
								display:'flex'
							}
						}, [
							h(
								"span",
								{
									style: {
										"margin-right": "8px",
									},
								},
								params.row.resultName == 0 ? '录取' : params.row.resultName == 1 ? '拒信' : 'WL'
							),
							h(
								"div",
								{
									class: {
										'resultName0': params.row.resultName == 0,
										'resultName1': params.row.resultName == 1,
										'resultName2': params.row.resultName == 2,
									},
								}
							),
						]);
					},
				},
				{
					title: "背景详情",
					key: "doAction",
					width: 130,
					render: (h, params) => {
						return h("div", {}, [
							h(
								"a",
								{
									style: {
										"margin-right": "8px",
									},
									on: {
										click: () => {
											this.showDetail = true;
										},
									},
								},
								this.$t(
									"courselist_compontents_servicecontent_219"
								)
							),
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
			],
		};
	},
	computed: {
		...mapState(["app", "buttonPerm", "userInfo"]),
		myButtonPrem() {
			return this.buttonPerm
				? this.buttonPerm["crm.caseList"] || []
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
		//获取详情 查看是否包含动态表单、是否包含动态上传
		getDetail(id) {
			this.updateLoadingStatus({ isLoading: true });
			common
				.formComTask({
					id,
				})
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.detailObj = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					setTimeout(() => {
						this.updateLoadingStatus({ isLoading: false });
					}, 1000);
				});
		},
		selectionChange(selection) {
			this.selection = selection;
		},
		doSave(obj) {
			this.updateLoadingStatus({ isLoading: true });
			common
				.batchComplete(obj)
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.getListData();
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		changeDivHeight(height) {
			this.tableHeightOut = height + 68;
		},
		changeCaseType() {
			if (this.caseType == "l1") {
				this.tableName = "本科案例";
			}
			if (this.caseType == "l2") {
				this.tableName = "本转案例";
			}
			if (this.caseType == "l3") {
				this.tableName = "研究生案例";
			}
			if (this.caseType == "l4") {
				this.tableName = "高中案例";
			}
			this.resetSearch();
			this.getListData();
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
						// this.tableData = result.list;
						this.dataTotal = result.total;
						let tableData = [{
							stuNo: "111",
							schoolName: "纽约大学",
							countryName: "美国",
							majorName: "计算机",
							// resultName: "录取",
						}, {
							stuNo: "111",
							schoolName: "纽约大学",
							countryName: "美国",
							majorName: "计算机",
							// resultName: "录取",
						}, {
							stuNo: "111",
							schoolName: "纽约大学",
							countryName: "美国",
							majorName: "计算机",
							// resultName: "录取",
						}, {
							stuNo: "111",
							schoolName: "纽约大学",
							countryName: "美国",
							majorName: "计算机",
							// resultName: "录取",
						}, {
							stuNo: "111",
							schoolName: "纽约大学",
							countryName: "美国",
							majorName: "计算机",
							// resultName: "录取",
						}, {
							stuNo: "111",
							schoolName: "纽约大学",
							countryName: "美国",
							majorName: "计算机",
							// resultName: "录取",
						}];
						tableData.forEach((item,index)=>{
							item.resultName = index%3;
						})
						console.log(tableData,1111)
						this.tableData = tableData;
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
			if (oldVal && this.$route.name == "crm.caseList") {
				// this.$set(this.searchObj, "officeId", val=='all'?'':val);
				this.getListData();
			}
		},
	},
};
</script>
