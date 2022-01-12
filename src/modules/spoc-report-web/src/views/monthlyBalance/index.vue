<style lang="less">
.monthly-balance-container {
	position: relative;
	.my-table {
		width: 100%;
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		padding: 0 16px;
		margin-top: 16px;
		.subTypeNameStyle {
			margin-left: 11px;
			.ivu-table-cell {
				margin-left: 11px;
			}
		}
	}
	.table-name-slot-style-custom {
		font-size: 14px;
		font-weight: normal;
	}
	.grey {
		color: #999;
		cursor: default;
	}
	.status {
		@h: 30px;
		@dot-width: 6px;
		height: @h;
		line-height: @h;

		&.status-unarchive {
			span::before {
				background-color: #999;
			}
		}
		&.status-archiving {
			span::before {
				background-color: #01c1b2;
			}
		}
		&.status-complateArchive {
			span::before {
				background-color: #01c1b2;
			}
		}
		&.status-failArchive {
			span::before {
				background-color: #ff6666;
			}
		}
		.span-cell {
			position: relative;
			padding-left: 13px;
			float: left;
			&::before {
				content: "";
				position: absolute;
				left: 0;
				top: 12px;
				width: @dot-width;
				height: @dot-width;
				border-radius: @dot-width;
				background: #ff6666;
			}
		}
		.ivu-tooltip {
			float: left;
		}
		.icon-help {
			margin-left: 8px;
			position: relative;
			top: -1px;
			font-size: 14px;
			color: #999;
		}
	}
	.speed-of-progress {
		line-height: 26px;
		i {
			margin-right: 6px;
			font-size: 14px;
			position: relative;
			top: -1px;
		}
	}
}
</style>

<template>
	<div class="monthly-balance-container">
		<v-search-collapse @search="doSearch" @reset="resetSearch" @changeDivHeight="changeDivHeight">
			<DatePicker
				v-model="dateMonth"
				type="month"
				@on-change="dateMonthChange"
				placement="bottom-start"
				separator=" ~ "
				:placeholder="$t('modules_spoc_report_web_src_views_monthlybalance_index_4618')"
				:clearable="false"
				style="width:224px;"
			></DatePicker>
			<!-- <tree-select
            :placeholder="$t('modules_spoc_report_web_src_views_monthlybalance_index_4619')"
            v-model="params.officeIds"
            style="width: 224px;"
            check-strictly
            :expand-all="true"
            :data="officeIdList">
			</tree-select>-->
			<div class="treeSelectCos" style="width: 224px;">
				<treeselect
					sortValueBy="INDEX"
					:flat="false"
					:noOptionsText="''"
					:alwaysOpen="false"
					:multiple="true"
					:default-expand-level="2"
					:limit="1"
					:limitText="count => `${count}+`"
					:value-consists-of="valueConsistsOf"
					:placeholder="$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_781')"
					v-model="GLR.officeIds"
					:options="GLR.officeIdList"
				></treeselect>
			</div>

			<!-- <DatePicker v-model="dateDetail"
            type="daterange"
            style="width:224px"
            :placeholder="$t('modules_spoc_report_web_src_views_monthlybalance_index_4621')">
			</DatePicker>-->
			<Select
				v-model="params.status"
				clearable
				:placeholder="$t('modules_spoc_report_web_src_views_monthlybalance_index_4622')"
			>
				<Option
					v-for="item in rpt_archive_status"
					:value="item.value"
					:key="item.value"
				>{{ item.label }}</Option>
			</Select>
		</v-search-collapse>
		<big-table
			v-if="defaultShowCol"
			:isShowSelectTableColumn="false"
			class="my-table"
			:tableData="tableData"
			:tableColumnArray="tableColumnArray"
			:defaultShowCol="defaultShowCol"
			:canSelection="true"
			:dataTotal="dataTotal"
			:btnList="btnList"
			:pageNo="pageNo"
			:updateShowTitleMethod="updateShowTitle"
			:tableHeightOut="tableHeightOut"
			updateShowTitleKey="signinDetail/listPage"
			@selectionChange="selectionChange"
			@sortChange="sortChange"
			@pageChange="pageChange"
		>
			<div
				slot="tableNameSlot"
				class="table-name-slot-style-custom"
				v-if="failLists && failLists.length"
			>
				<span v-for="(file, index) in failLists" :key="index">
					<a @click="findeFile(file)">{{file}}</a>
					<span v-if="index < failLists.length - 1">、</span>
				</span>
				{{$t('modules_spoc_report_web_src_views_monthlybalance_index_4623')}}
			</div>
		</big-table>
		<monthly-balance-modal ref="monthlyBalanceModalRef" @uploadLists="uploadLists"></monthly-balance-modal>
	</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 月结
 */
import { mapMutations, mapState } from "vuex";
import valid, {
	errors,
	rptArchiveSchedule,
	sysDict,
	sysUser,
} from "../../libs/request";
import bigTable from "@public/modules/bigTable.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import tableDropdown from "@public/modules/tableDropdown.vue";
import monthlyBalanceModal from "./modal.vue";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import {
	titleTransformationToLabel,
	getSelectIdsByid,
	getSelectTreeDataByid,
	waitUntil,
} from "@public/libs/util";

export default {
	name: "report.monthlyBalance",
	components: {
		bigTable,
		vSearchCollapse,
		tableDropdown,
		monthlyBalanceModal,
		Treeselect,
	},
	data() {
		return {
			tableHeightOut: 72,
			dateMonth: "",
			dateDetail: [],
			params: {
				officeIds: [],
				name: "",
				status: "",
			},
			pageNo: 1,
			pageSize: this.$store.state.app.pageSizeGlobal,
			officeLists: [],
			rpt_archive_status: [],
			selection: [],
			defaultShowCol: null,
			tableData: [],
			failLists: [],
			dataTotal: 0,
			updateShowTitle: rptArchiveSchedule.updateShowTitle,
			btnList: [
				{
					type: "",
					btnClick: this.manualArchive,
					text: this.$t(
						"modules_spoc_report_web_src_views_monthlybalance_index_4624"
					),
					style: "margin-right: 0",
				},
			],
			tableColumnArray: [
				{
					key: "date",
					title: this.$t(
						"modules_spoc_report_web_src_views_monthlybalance_index_4618"
					),
					sortable: "custom",
				},
				{
					key: "statusLabel",
					title: this.$t("pushsettings_index_496"),
					render: (h, params) => {
						let dom = [];
						if (params.row.status == "failArchive") {
							// 月结失败
							let contentArr = params.row.reportStatusVOList;
							let lists = [];
							contentArr.forEach((c, i) => {
								lists.push(
									h(
										"div",
										{
											style: {
												color:
													c.status == "2"
														? "#f66"
														: "#46BC15",
											},
											class: "speed-of-progress",
										},
										[
											h("Icon", {
												props: {
													type:
														c.status == "1"
															? "md-checkmark-circle"
															: "md-close-circle",
												},
											}),
											h("span", c.reportName),
										]
									)
								);
							});

							dom.push(
								h(
									"span",
									{
										class: "span-cell",
									},
									params.row.statusLabel
								)
							);
							dom.push(
								h(
									"Tooltip",
									{
										props: {
											theme: "light",
											placement: "right-start",
											"max-width": "250",
										},
									},
									[
										h("Icon", {
											props: {
												type: "md-help-circle",
											},
											class: "icon-help",
										}),
										h(
											"div",
											{
												slot: "content",
											},
											lists
										),
									]
								)
							);
						} else if (params.row.status == "unarchive") {
							// 未月结
							dom.push(
								h(
									"span",
									{
										class: "span-cell",
									},
									params.row.statusLabel
								)
							);
						} else {
							// 部分月结 - archiving
							// 月结成功 - complateArchive
							dom.push(
								h(
									"span",
									{
										class: "span-cell",
									},
									params.row.statusLabel
								)
							);
						}
						return h(
							"div",
							{
								class: {
									status: true,
									"status-unarchive":
										params.row.status == "unarchive", // 未月结
									"status-archiving":
										params.row.status == "archiving", // 月结中
									"status-complateArchive":
										params.row.status == "complateArchive", // 完成月结
									"status-failArchive":
										params.row.status == "failArchive", // 月结失败
								},
							},
							dom
						);
					},
				},
				{
					key: "recentArchiveDate",
					title: this.$t(
						"modules_spoc_report_web_src_views_monthlybalance_index_4621"
					),
					sortable: "custom",
				},
				{
					key: "recentUnarchiveDate",
					title: this.$t(
						"modules_spoc_report_web_src_views_monthlybalance_index_4626"
					),
					sortable: "custom",
				},
				{
					key: "firstArchiveDate",
					title: this.$t(
						"modules_spoc_report_web_src_views_monthlybalance_index_4627"
					),
					sortable: "custom",
				},
				{
					title: this.$t("classlist_compontents_detailinfo_45"),
					key: "doAction",
					width: 140,
					render: (h, params) => {
						let dom = [];
						if (params.row.status == "failArchive") {
							// 月结失败
							dom.push(
								h(
									"a",
									{
										on: {
											click: () => {
												// this.$router.push({
												//     name: 'crm.customer360',
												//     query:{
												//         id: params.row.id
												//     }
												// });
												this.$refs.monthlyBalanceModalRef.show(
													params.row
												);
											},
										},
									},
									this.$t(
										"modules_spoc_report_web_src_views_monthlybalance_index_4629"
									)
								)
							);
						} else {
							// 月结成功
							dom.push(
								h(
									"a",
									{
										class:
											params.row.status ==
											"complateArchive"
												? "grey"
												: "",
										style: {
											marginRight: "8px",
										},
										on: {
											click: () => {
												if (
													params.row.status !=
													"complateArchive"
												)
													this.$refs.monthlyBalanceModalRef.showWithdrawModal(
														params.row,
														params.row.status
													);
											},
										},
									},
									this.$t(
										"modules_spoc_report_web_src_views_monthlybalance_index_4624"
									)
								),
								h(
									"a",
									{
										class:
											params.row.status !=
											"complateArchive"
												? "grey"
												: "",
										on: {
											click: () => {
												if (
													params.row.status ==
													"complateArchive"
												)
													this.$refs.monthlyBalanceModalRef.showWithdrawModal(
														params.row,
														params.row.status
													);
											},
										},
									},
									this.$t(
										"modules_spoc_report_web_src_views_monthlybalance_index_4630"
									)
								)
							);
						}
						return h("div", dom);
					},
				},
			],
			parentOfficeId: "",
			ininOfficeIdList: [],
			valueConsistsOf: "LEAF_PRIORITY",
			GLR: {
				officeIds: [],
				officeIdList: [],
			},
		};
	},
	computed: {
		...mapState(["app"]),
	},
	mounted() {
		this.init();
        this.getShowTitle();
        setInterval(()=>{
            if(this.$route.name == 'report.monthlyBalance'){
                // 定时刷新
                this.doSearch(true)
            }
        },20000)
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		changeDivHeight(height) {
			this.tableHeightOut = height;
		},
		init() {
			// 初始化
			// 设置时间为当前月
			let _date = new Date(new Date().format("yyyy-MM")).format(
				"yyyy-MM-dd"
			);
			this.dateMonth = _date;
			this.params.date = _date;
			// console.log(_date);
			// 获取校区列表
			this.getTreeDatas();
			// 获取月结状态
			this.batchListData();
			// 获取月结失败时间列表
			this.findListFailDate();
			// this.doSearch();
		},
		initOffice() {
			if (
				this.app.currOfficeId == "all" ||
				this.app.currOfficeId == this.parentOfficeId
			) {
				this.$set(this.GLR, "officeIdList", this.ininOfficeIdList);
				this.$set(this.GLR, "officeIds", []);
				this.$nextTick(() => {
					this.$forceUpdate();
				});
			} else {
				let resultSelectObj = {};
				getSelectTreeDataByid(this.ininOfficeIdList, resultSelectObj);
				let resultIdsObj = {};
				getSelectIdsByid(this.ininOfficeIdList, resultIdsObj);
				this.$set(this.GLR, "officeIdList", [
					resultSelectObj[this.app.currOfficeId],
				]);
				this.$set(
					this.GLR,
					"officeIds",
					resultIdsObj[this.app.currOfficeId]
				);
				this.$nextTick(() => {
					this.$forceUpdate();
				});
			}
		},

		findListFailDate() {
			rptArchiveSchedule
				.findListFailDate()
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.failLists = res.data.data;
					}
				})
				.catch(errors.call(this));
		},
		dateMonthChange() {
			let _date = new Date(this.dateMonth).format("yyyy-MM-dd");
			// console.log(_date);
			this.params.date = _date;
		},
		getTreeDatas() {
			// 获取校区列表
			this.updateLoadingStatus({ isLoading: true });
			sysUser
				.dataScopeFilterTree()
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						let officeIdList = res.data.data.children;
						this.parentOfficeId = officeIdList[0].id;
						titleTransformationToLabel(officeIdList);
						this.ininOfficeIdList = JSON.parse(
							JSON.stringify(officeIdList)
						);
						waitUntil(
							() => {
								return this.app.currOfficeId || false;
							},
							() => {
								this.initOffice();
								this.$nextTick(() => {
									this.doSearch();
								});
							}
						);
						// let _data = res.data.data;
						// if (Array.isArray(_data.children)) {
						//     this.officeIdList = _data.children;
						//     // waitUntil(
						//     //     () => {
						//     //         return this.app.currOfficeId || false;
						//     //     },
						//     //     () => {
						//     //         this.$set(this.params, 'officeIds', [this.app.currOfficeId]);
						//     //         this.doSearch();
						//     //     }
						//     // );
						// }
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		batchListData() {
			// 获取字典项
			let types = [
				"rpt_archive_status", //月结状态
			];
			sysDict
				.batchListData({ types: types.join(",") })
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						let _data = res.data.data;
						this.rpt_archive_status = _data.rpt_archive_status;
					}
				})
				.catch(errors.call(this));
		},
		getListData() {
			// 获取data
			this.updateLoadingStatus({ isLoading: true });
			let params = Object.assign({}, this.params);
			params.pageNo = this.pageNo;
			params.pageSize = this.pageSize;
			rptArchiveSchedule
				.listPage(params)
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						let result = res.data.data;
						this.tableData = result.list;
						this.dataTotal = result.total;
					} else {
						this.tableData = [];
						this.dataTotal = 0;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		//可选方法，如果是多选的话必须有
		selectionChange(selection) {
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
		sortChange(obj) {
			this.params.orderByType = obj.key;
			this.params.orderByStatus = obj.order == "desc" ? "2" : "1";
			this.getListData();
		},
		//必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
		getShowTitle() {
			let params = {
				pageIdentifier: "monthlyBalance",
				voName:
					"com.windliven.spoc.modules.common.vo.ComArchiveScheduleVO",
			};
			rptArchiveSchedule
				.getShowTitle(params)
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.defaultShowCol = res.data.data;
					}
				})
				.catch(errors.call(this));
		},
		findeFile(str) {
			str = str
				.split(this.$t("message_socket_301"))
				.join("-")
				.split(
					this.$t(
						"modules_spoc_portal_views_systemconfig_systemconfig_4083"
					)
				)
				.join("-")
				.split(this.$t("classlist_compontents_detailinfo_27"))
				.join("-");
			// console.log(str)
			let _date = new Date(new Date(str).format("yyyy-MM")).format(
				"yyyy-MM-dd"
			);
			this.dateMonth = _date;
			this.params.date = _date;
			this.params.status = "failArchive";
			this.doSearch();
		},
		doSearch(noSetPageNo) {
            if(!noSetPageNo){
                this.pageNo = 1;
            }
			// console.log(this.dateDetail)
			this.params.officeIds = this.GLR.officeIds;
			// console.log(this.GLR.officeIds)
			if (
				this.dateDetail &&
				this.dateDetail.length == 2 &&
				this.dateDetail[0] &&
				this.dateDetail[1]
			) {
				this.params.endRecentlyArchiveDate = new Date(
					this.dateDetail[0]
				).format("yyyy-MM-dd"); //最近月结结束日期
				this.params.startRecentlyArchiveDate = new Date(
					this.dateDetail[1]
				).format("yyyy-MM-dd"); //最近月结开始日期
			}
			// console.log(this.params.officeIds)
			if (this.params.officeIds) {
				this.getListData();
			}
		},
		resetSearch() {
			this.initOffice();
			for (const key in this.params) {
				if (
					this.params.hasOwnProperty(key) &&
					typeof this.params[key] == "string"
				) {
					this.params[key] = "";
				}
			}
			// this.params.officeIds = [this.app.currOfficeId];
			this.params.officeIds = [];
			this.dateDetail = [];
			let _date = new Date(new Date().format("yyyy-MM")).format(
				"yyyy-MM-dd"
			);
			this.dateMonth = _date;
			this.params.date = _date;
			delete this.params.endRecentlyArchiveDate;
			delete this.params.startRecentlyArchiveDate;
			this.getListData();
		},
		uploadLists() {
			this.doSearch();
			this.findListFailDate();
		},
		manualArchive() {
			// 批量手动月结
			// 先判断是否勾选

			this.$refs.monthlyBalanceModalRef &&
				this.$refs.monthlyBalanceModalRef.showManualArchiveMultiple();
		},
	},
	watch: {
		// "app.currOfficeId": function(val, oldVal) {
		//     this.params.officeIds = [this.app.currOfficeId];
		//     this.doSearch();
		// }
		"app.currOfficeId": function (val, oldVal) {
			this.initOffice();
			this.$nextTick(() => {
				this.doSearch();
			});
		},
	},
};
</script>
