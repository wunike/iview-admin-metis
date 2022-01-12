<style lang="less">
.wechatUser {
	.ivu-card-body {
		padding: 0;
	}
	.form_create {
		vertical-align: top;
		&.ivu-form-inline {
			.ivu-form-item {
				margin: 0;
				.address_map {
					.address_input {
						margin-right: 0;
					}
					button {
						margin-right: 12px;
					}
				}
			}
		}
	}
	.num_title {
		margin-top: 10px;
		.num {
			font-size: 18px;
			font-weight: 400;
			line-height: 25px;
			text-align: center;
			&.blue {
				color: #01afec;
			}
			&.yellow {
				color: #ecb62f;
			}
			&.Violet {
				color: #7c6af2;
			}
		}
		.label {
			font-size: 12px;
			font-weight: 400;
			color: rgba(73, 80, 96, 1);
			line-height: 17px;
			text-align: center;
		}
		.statistics_wrap {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 16px 0;
			.statistics_box {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				// cursor: pointer;
			}
		}
		.statistics_wrap_hover {
			&:hover {
				// background: #F7F8FA;
			}
		}
		.statistics_wrap_seleted {
			.label {
				color: #01afec;
			}
		}
	}
	.my-table {
		margin-top: 10px;
		width: 100%;
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		padding: 0 16px;

		.subTypeNameStyle {
			margin-left: 11px;
			.ivu-table-cell {
				margin-left: 11px;
			}
		}
	}
}
.showQcyModal {
	.wxInfos {
		display: flex;
		justify-content: space-between;
		// align-items: center;
		padding-bottom: 12px;
		border-bottom: 1px solid rgb(232, 234, 236);
		.wxInfo {
			display: flex;
			justify-content: flex-start;
			flex: 1;
			img {
				margin-right: 12px;
			}
			.nameAndTag {
				.name {
					font-size: 14px;
					line-height: 50px;
				}
			}
		}
	}
	.wxDetail {
		margin-top: 12px;
	}
}
.msgGroupRecordModal {
	.wxInfos {
		display: flex;
		justify-content: space-between;
		padding-bottom: 12px;
		border-bottom: 1px solid rgb(232, 234, 236);
		.wxInfo {
			display: flex;
			justify-content: flex-start;
			flex: 1;
			img {
				margin-right: 12px;
			}
			.nameAndTag {
				.name {
					font-size: 14px;
					line-height: 50px;
				}
			}
		}
	}
	.msgRecord {
		margin-top: 12px;
		.msgRecordTitle {
			margin-bottom: 4px;
		}
		.msgRecordContents {
			height: 600px;
			overflow-y: auto;
		}
		.msgRecordContent {
			padding: 5px 15px 15px 0;
			.msgRecordUser {
				display: flex;
				align-items: center;
				margin-bottom: 5px;
				img {
					margin-right: 12px;
				}
			}
		}
	}
}
</style>

<template>
	<div class="wechatUser">
		<v-search-collapse
			@search="searchRecord"
			@reset="resetSearchRecord"
			@changeDivHeight="changeDivHeight"
		>
			<Input v-model="record.name" clearable placeholder="群名称" />
			<Input
				v-model="record.name1"
				clearable
				placeholder="群成员微信号或昵称"
			/>
			<DatePicker
				ref="DatePicker"
				v-model="optTime"
				type="daterange"
				:clearable="true"
				placement="bottom-start"
				separator=" ~ "
				placeholder="创建时间"
				style="width: 206px"
				:options="options3"
				split-panels
				@on-open-change="setOptTime"
			></DatePicker>
			<treeSelectCos
				ref="ownerOfficeIds"
				placeholder="归属校区"
			></treeSelectCos>
			<!-- <campusSelection v-model="record.officeIds" placeholder="登记校区" style="width: 206px;" @officeIdChange="officeIdChange" :waitFun="waitFun"></campusSelection> -->
			<Select
				v-model="record.registerId"
				placeholder="创建人"
				clearable
				filterable
				remote
				:remote-method="remoteMethod2"
				:loading="loading2"
			>
				<Option
					v-for="(item, index) in roleOptions2"
					:value="item.value"
					:key="index"
					>{{ item.name }}</Option
				>
			</Select>
			<!-- <Select
				v-model="record.officeIds"
				style="width: 206px"
				multiple
				clearable
				:placeholder="
					$t(
						'modules_spoc_crm_web_src_views_activityenrollment_components_detial_689'
					)
				"
			>
				<Option
					v-for="item in areaSchoolList"
					:value="item.id"
					:key="item.id"
					>{{ item.code }}{{ item.name }}</Option
				>
			</Select> -->
		</v-search-collapse>
		<big-table
			v-if="defaultShowCol && myButtonPrem"
			ref="customerManagement"
			class="my-table"
			tableName="我的微信群"
			:tableData="tableData"
			:tableColumnArray="tableColumnArray"
			:defaultShowCol="defaultShowCol"
			:canSelection="true"
			:dataTotal="dataTotal"
			:btnList="btnList"
			:pageNo="pageNo"
			:tableHeightOut="tableHeightOut"
			:updateShowTitleMethod="updateShowTitle"
			:updateShowTitleKey="updateShowTitleKey"
			@sortChange="sortChange"
			@filterChange="filterChange"
			@resetDefault="resetDefaultCol"
			@selectionChange="selectionChange"
			@pageChange="pageChange"
		>
		</big-table>
		<export-modal
			ref="exportModal"
			:exportMethod="exportMethod"
		></export-modal>
		<Modal v-model="showQcyModal" title="查看群成员" width="800">
			<div class="showQcyModal">
				<div class="wxInfos">
					<div class="wxInfo">
						<img
							style="height: 50px; width: 50px"
							src="../../../assets/img/wk.png"
						/>
						<div class="nameAndTag">
							<div class="name">王鑫</div>
						</div>
					</div>
					<div
						style="
							width: 60px;
							text-align: right;
							line-height: 50px;
						"
					>
						群主
					</div>
				</div>
				<div class="wxDetail">
					<Table :columns="columns1" border :data="data1"></Table>
				</div>
			</div>
			<div slot="footer">
				<Button type="primary" @click="showQcyModal = false"
					>关闭</Button
				>
			</div>
		</Modal>

		<Modal v-model="msgGroupRecordModal" width="800" title="聊天记录">
			<div class="msgGroupRecordModal">
				<div class="wxInfos">
					<div class="wxInfo">
						<img
							style="height: 50px; width: 50px"
							src="../../../assets/img/wk.png"
						/>
						<div class="nameAndTag">
							<div class="name">王鑫</div>
						</div>
					</div>
					<div
						style="
							width: 60px;
							text-align: right;
							line-height: 50px;
						"
					>
						群主
					</div>
				</div>
				<div class="msgRecord">
					<div class="msgRecordTitle">
						<Input
							v-model="searchName"
							placeholder="群成员微信号或昵称"
							style="margin-right: 12px; width: 200px"
						/>
						<DatePicker
							type="daterange"
							placement="bottom-end"
							placeholder="请选择"
							style="margin-right: 12px; width: 200px"
						></DatePicker>
						<Button type="primary">查询</Button>
					</div>
					<div class="msgRecordContents">
						<div class="msgRecordContent">
							<div class="msgRecordUser">
								<img
									style="height: 25px; width: 25px"
									src="../../../assets/img/wk.png"
								/>
								<span>2020-10-10 10:10:10</span>
							</div>
							<div>
								<p>
									奥术大师大所大大所大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实多阿斯达大所大大所多啊实打实大声道
								</p>
							</div>
						</div>
						<div class="msgRecordContent">
							<div class="msgRecordUser">
								<img
									style="height: 25px; width: 25px"
									src="../../../assets/img/wk.png"
								/>
								<span>2020-10-10 10:10:10</span>
							</div>
							<div>
								<p>
									奥术大师大所大大所大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实多阿斯达大所大大所多啊实打实大声道
								</p>
							</div>
						</div>
						<div class="msgRecordContent">
							<div class="msgRecordUser">
								<img
									style="height: 25px; width: 25px"
									src="../../../assets/img/wk.png"
								/>
								<span>2020-10-10 10:10:10</span>
							</div>
							<div>
								<p>
									奥术大师大所大大所大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实多阿斯达大所大大所多啊实打实大声道
								</p>
							</div>
						</div>
						<div class="msgRecordContent">
							<div class="msgRecordUser">
								<img
									style="height: 25px; width: 25px"
									src="../../../assets/img/wk.png"
								/>
								<span>2020-10-10 10:10:10</span>
							</div>
							<div>
								<p>
									奥术大师大所大大所大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实多阿斯达大所大大所多啊实打实大声道
								</p>
							</div>
						</div>
						<div class="msgRecordContent">
							<div class="msgRecordUser">
								<img
									style="height: 25px; width: 25px"
									src="../../../assets/img/wk.png"
								/>
								<span>2020-10-10 10:10:10</span>
							</div>
							<div>
								<p>
									奥术大师大所大大所大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实多阿斯达大所大大所多啊实打实大声道
								</p>
							</div>
						</div>
						<div class="msgRecordContent">
							<div class="msgRecordUser">
								<img
									style="height: 25px; width: 25px"
									src="../../../assets/img/wk.png"
								/>
								<span>2020-10-10 10:10:10</span>
							</div>
							<div>
								<p>
									奥术大师大所大大所大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实多阿斯达大所大大所多啊实打实大声道
								</p>
							</div>
						</div>
						<div class="msgRecordContent">
							<div class="msgRecordUser">
								<img
									style="height: 25px; width: 25px"
									src="../../../assets/img/wk.png"
								/>
								<span>2020-10-10 10:10:10</span>
							</div>
							<div>
								<p>
									奥术大师大所大大所大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实多阿斯达大所大大所多啊实打实大声道
								</p>
							</div>
						</div>
						<div class="msgRecordContent">
							<div class="msgRecordUser">
								<img
									style="height: 25px; width: 25px"
									src="../../../assets/img/wk.png"
								/>
								<span>2020-10-10 10:10:10</span>
							</div>
							<div>
								<p>
									奥术大师大所大大所大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实多阿斯达大所大大所多啊实打实大声道
								</p>
							</div>
						</div>
						<div class="msgRecordContent">
							<div class="msgRecordUser">
								<img
									style="height: 25px; width: 25px"
									src="../../../assets/img/wk.png"
								/>
								<span>2020-10-10 10:10:10</span>
							</div>
							<div>
								<p>
									奥术大师大所大大所大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实大所多阿斯达大所大大所多啊实打实多阿斯达大所大大所多啊实打实大声道
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer">
				<Button type="primary" @click="msgGroupRecordModal = false"
					>关闭</Button
				>
			</div>
		</Modal>
	</div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import valid, {
	errors,
	sysUser,
	sysDict,
	sysCommonSql,
	crmCustomerStatus,
	crmCustomer,
	sysConfig,
	sysProps,
} from "../../../libs/request";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import campusSelection from "@public/modules/campusSelection";
import bigTable from "@public/modules/bigTable.vue";
import exportModal from "@public/modules/exportModal.vue";
import {
	waitUntil,
	DatePickerOpt,
	defaultDatePickerValue,
	titleTransformationToLabel,
	getSelectIdsByid,
	getSelectTreeDataByid,
} from "@public/libs/util";
import treeSelectCos from "@public/modules/treeSelectCos";
import userLabel from "@public/modules/userLabel";
export default {
	name: "crm.customerManagement",
	components: {
		vSearchCollapse,
		campusSelection,
		bigTable,
		exportModal,
		treeSelectCos,
		userLabel,
	},
	data() {
		return {
			data1: [
				{
					bh: 1,
					wxh: "asd",
					tx: "",
					nc: "adsd",
					cylx: "额鹅鹅鹅",
					rqsj: "2020-10-10 10:10:10",
					rqfs: "qqq",
				},
				{
					bh: 2,
					wxh: "asd",
					tx: "",
					nc: "adsd",
					cylx: "额鹅鹅鹅",
					rqsj: "2020-10-10 10:10:10",
					rqfs: "qqq",
				},
			],
			columns1: [
				{
					title: "编号",
					key: "bh",
				},
				{
					title: "微信号",
					key: "wxh",
				},
				{
					title: "头像",
					key: "tx",
					render: (h, params) => {
						return h("img", {
							attr: {
								src: params.row.tx,
							},
						});
					},
				},
				{
					title: "昵称",
					key: "nc",
				},
				{
					title: "成员类型",
					key: "cylx",
				},
				{
					title: "入群时间",
					key: "rqsj",
				},
				{
					title: "入群方式",
					key: "rqfs",
				},
			],
			GLR: {
				officeIdList: [],
			},
			parentOfficeId: "",
			ininOfficeIdList: [],
			valueConsistsOf: "LEAF_PRIORITY", // ALL、BRANCH_PRIORITY、LEAF_PRIORITY、ALL_WITH_INDETERMINATE
			disableOperate: {},
			optTime: [],
			options3: null,
			tableHeightOut: 72 + 90 + 52, //324,
			updateShowTitleKey: "crm.customerManagement" + this.tabName,
			tableSelected: [],
			loading2: false,
			roleOptions2: [],
			tabList: [],
			selectedIds: [], //选中的ids
			currentIds: [], //当前页的ids
			hasTag: true,
			updateShowTitle: crmCustomer.updateShowTitle,
			exportMethod: crmCustomer.export, //导出用到的方法对象
			areaSchoolList: [],
			btnList: [],
			pageNo: 1,
			pageSize: this.$store.state.app.pageSizeGlobal,
			defaultShowCol: null,
			dataTotal: 0,
			tableColumnArray: [
				{
					title: this.$t(
						"classlist_compontents_detailinfo_45"
					),
					key: "doAction",
					width: 130,
					render: (h, params) => {
						return h(
							"div",
							{
								on: {
									click: (e) => {
										e.stopPropagation();
									},
								},
							},
							[
								h(
									"a",
									{
										props: {
											type: "text",
											size: "small",
										},
										style: {
											marginRight: "8px",
											display:
												this.myButtonPrem &&
												this.myButtonPrem.indexOf(
													"crmDetail"
												) >= 0
													? "inline-block"
													: "none",
										},
										on: {
											click: (e) => {
												e.stopPropagation();
												this.showDetail(params);
											},
										},
									},
									"查看群成员"
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
											// display: (this.myButtonPrem&&this.myButtonPrem.indexOf("editEffective") >= 0)&&params.row.followerName && this.getCanAction(params.row.status, 'invalid') ?'inline-block':'none'
										},
										on: {
											click: (e) => {
												e.stopPropagation();
												this.showMsgRecordModal(params);
												// this.joinValidBySingle(params.row.id,'1')
											},
										},
									},
									"聊天记录"
								),
							]
						);
					},
				},
			],
			tableData: [],
			record: {
				startDate: "",
				endDate: "",
				officeIds: [],
				ownerOfficeIds: [],
				name: "",
				studentName: "",
				registerId: "",
				tagsArr: [],
				traceFollowCountStart: null,
				traceFollowCountEnd: null,
				fieldJsonData: {},
				orderByStatus: "",
				orderByType: "",
			},
			tabName: 0,
			isEffective: "0",
			statusArr: [],
			objfield: [],
			listRule: "1",
			myButtonPrem: null,
			filterObj: {},
			showQcyModal: false,
			detailObj: {},
			userLabelData: [],
			tags: "",
			msgGroupRecordModal: false,
		};
	},
	computed: {
		...mapState(["app", "buttonPerm", "calendarConfig"]),
	},
	mounted() {
		// console.log(this.buttonPerm['crm.customerManagement'])
		crmCustomer
			.findStateDisableOperate({})
			.then(valid.call(this))
			.then((res) => {
				if (res.ok) {
					this.disableOperate = res.data.data;
				}
			})
			.catch(errors.call(this))
			.finally(() => {
				this.getSchoolList(); // 获取登记校区
				this.getConfig(); // 获取权限
				waitUntil(
					() => {
						return (
							(this.app.currOfficeId &&
								this.calendarConfig.maxMonthInterval &&
								this.buttonPerm &&
								this.buttonPerm) ||
							false
						);
					},
					() => {
						this.optTime = defaultDatePickerValue(
							this.calendarConfig.maxMonthInterval
						);
						// console.log(this.calendarConfig.maxMonthInterval,123)
						this.options3 = DatePickerOpt(
							this,
							"DatePicker",
							Number(this.calendarConfig.maxMonthInterval)
						);
						console.log(this.buttonPerm, "buttonPerm~~~~~~~");
						this.myButtonPrem = this.buttonPerm[
							"crm.customerManagement"
						] || [];
						console.log(this.myButtonPrem, "myButtonPrem~~~~~~~");
						this.getTreeDatas(); // 获取校区树形下拉
					}
				);
			});
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		showMsgRecordModal(detailObj) {
			this.msgGroupRecordModal = true;
		},
		showDetail(detailObj) {
			this.showQcyModal = true;
			this.detailObj = detailObj;
		},
		getCanAction(status, actionName) {
			if (!this.disableOperate[status]) {
				return true;
			} else {
				if (this.disableOperate[status].indexOf(actionName) >= 0) {
					return false; // 存在该禁用，不允许显示
				} else {
					return true;
				}
			}
		},
		filterChange(filterObj) {
			// console.log("on-filter-change~~~~1`",filterObj)
			this.filterObj = filterObj;
			this.pageNo = 1;
			this.tableData = [];
			this.getLists();
		},
		sortChange(sortObj) {
			// console.log(sortObj,'~~~~~~~~~~~~')
			this.record.orderByType = sortObj.key;
			if (sortObj.order == "asc") {
				//升序
				this.record.orderByStatus = 1;
			} else if (sortObj.order == "desc") {
				//desc 降序
				this.record.orderByStatus = 2;
			} else {
				this.record.orderByStatus = "";
				this.record.orderByType = "";
			}
			this.pageNo = 1;
			this.tableData = [];
			this.getLists();
		},
		getTreeDatas() {
			this.updateLoadingStatus({ isLoading: true });
			sysUser
				.dataScopeFilterTree()
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						// console.log(res)
						if (Array.isArray(res.data.data.children)) {
							let officeIdList = res.data.data.children;
							this.parentOfficeId = officeIdList[0].id;
							titleTransformationToLabel(officeIdList);
							this.ininOfficeIdList = JSON.parse(
								JSON.stringify(officeIdList)
							);
							this.initOffice();
							// this.getListData('1')
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					// this.updateLoadingStatus({isLoading:false});
				});
		},
		initOffice() {
			this.$refs.ownerOfficeIds.officeIdList = this.ininOfficeIdList;
			// this.$set(this.GLR, 'officeIdList', this.ininOfficeIdList);
			if (
				this.app.currOfficeId == "all" ||
				this.app.currOfficeId == this.parentOfficeId
			) {
				this.$set(this.record, "ownerOfficeIds", []);
				this.$refs.ownerOfficeIds.officeIds = [];
				this.$nextTick(() => {
					this.$forceUpdate();
				});
			} else {
				let resultSelectObj = {};
				getSelectTreeDataByid(this.ininOfficeIdList, resultSelectObj);
				let resultIdsObj = {};
				getSelectIdsByid(this.ininOfficeIdList, resultIdsObj);
				// this.$set(this.GLR, 'officeIdList', [resultSelectObj[this.app.currOfficeId]]);
				this.$set(
					this.record,
					"ownerOfficeIds",
					resultIdsObj[this.app.currOfficeId]
				);
				this.$refs.ownerOfficeIds.officeIds =
					resultIdsObj[this.app.currOfficeId];
				this.$nextTick(() => {
					this.$forceUpdate();
				});
			}
			this.getShowTitle();
		},
		// 获取权限
		getConfig() {
			let params = {
				menuId: "2001",
				configId: "crm:otherConfig",
			};
			sysConfig
				.getConfig(params)
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.listRule = res.data.data.find(
							(v) => v.configValue == "customerListFilterRule"
						).rule;
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		showImport() {
			this.$router.push({ name: "crm.crmCustomerImport" });
		},
		changeDivHeight(height) {
			this.tableHeightOut = height + 90 + 52;
		},
		waitFun() {
			return this.myButtonPrem.length;
		},
		// 获取登记校区
		getSchoolList() {
			let params = {};
			sysUser
				.dataScopeFilter(params)
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.areaSchoolList = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		//可选方法，如果是多选的话必须有
		selectionChange(selection) {
			//选择导出
			let s = this.selectedIds;
			let c = this.currentIds;
			for (let i in c) {
				if (s.includes(c[i])) {
					let num = this.selectedIds.indexOf(c[i]);
					s.splice(num, 1);
				}
			}
			if (selection.length) {
				selection.forEach((item) => {
					s.push(item.id);
				});
			}
			this.tableSelected = selection;
			// console.log(selection)
		},
		isExport(val) {
			//这里val的值。是根据设置下拉类型button设定的值来匹配判断
			if (val == "2") {
				//如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
				if (this.selectedIds.length < 1) {
					this.$Message.error(
						this.$t(
							"importPage_warning1"
						)
					);
					return;
				}
				this.searchObj.ids = this.selectedIds;
				this.exportMethod = crmCustomer.export;
			} else {
				delete this.searchObj.ids;
				this.exportMethod = crmCustomer.export;
			}
			this.$refs.exportModal.noShowExport(
				this.exportMethod,
				this.searchObj
			);
		},
		// 获取表格数据
		getLists() {
			this.updateLoadingStatus({ isLoading: true });
			let param = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				isEffective: this.isEffective,
				statusArr: this.statusArr,
				stateGroupType: "customer management list",
			};
			param = Object.assign({}, param, this.record);
			param.ownerOfficeIds = this.$refs.ownerOfficeIds.officeIds;
			if (this.optTime[0]) {
				param.registStartTime = new Date(this.optTime[0]).format(
					"yyyy-MM-dd 00:00:00"
				);
			} else {
				param.registStartTime = "";
			}
			if (this.optTime[1]) {
				param.registEndTime = new Date(this.optTime[1]).format(
					"yyyy-MM-dd 23:59:59"
				);
			} else {
				param.registEndTime = "";
			}

			if (param.traceFollowCountEnd == Infinity) {
				param.traceFollowCountEnd = "";
			}

			for (let key in this.filterObj) {
				if (key != "fieldJsonData") {
					param[key] = this.filterObj[key];
				}
			}
			if (this.filterObj.fieldJsonData) {
				if (param.fieldJsonData) {
					param.fieldJsonData = Object.assign(
						param.fieldJsonData,
						this.filterObj.fieldJsonData
					);
				} else {
					param.fieldJsonData = this.filterObj.fieldJsonData;
				}
			}
			this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
			crmCustomer
				.listPageManage(param)
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						// let result = res.data.data;
						// this.tableData = result.list;
						// this.dataTotal = result.total;
						let data = res.data;
						this.dataTotal = data.data.total;
						let d = data.data.list;
						this.pageNo = data.data.pageNum ? data.data.pageNum : 1;
						this.currentIds = [];
						this.pageNo = data.data.pageNum ? data.data.pageNum : 1;
						for (let i in d) {
							this.currentIds.push(d[i].id);
						}
						this.tableData = d;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		getShowTitle(closeLoad) {
			this.updateLoadingStatus({ isLoading: true });
			crmCustomer
				.getShowTitle({
					pageIdentifier: "crm.customerManagement" + this.tabName,
					voName: "com.windliven.spoc.modules.crm.vo.CrmCustomerVO",
					tableName: "crm_customer",
				})
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.defaultShowCol = res.data.data;
						this.getLists(); // 获取表格数据
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					if (closeLoad) {
						this.updateLoadingStatus({ isLoading: false });
					}
				});
		},
		pageChange(pageNo, pageSize) {
			if (!pageNo) {
				//防止无用重复请求
				return;
			}
			this.pageNo = pageNo;
			this.pageSize = pageSize;
			this.getLists();
		},
		// 获取创建人下拉
		remoteMethod2(query) {
			// console.log(query)
			if (query !== "") {
				this.loading1 = true;
				let params = {
					mainTable: "crm_customer",
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
							this.loading2 = false;
							this.roleOptions2 = res.data.data;
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						// this.loadingoptUserId = false;
					});
			} else {
				this.options1 = [];
			}
		},
		// 执行搜索
		searchRecord() {
			this.pageNo = 1;
			this.getLists();
		},
		// 重置搜索
		resetSearchRecord() {
			this.record = {
				officeIds: [],
				ownerOfficeIds: [],
				name: "",
				studentName: "",
				registerId: "",
				tagsArr: [],
				traceFollowCountStart: null,
				traceFollowCountEnd: null,
				orderByStatus: "",
				orderByType: "",
			};
			this.record.fieldJsonData = formData;
			this.$refs.customerManagement.resetFilter();
			this.filterObj = {};
			// this.record.officeIds = this.app.currOfficeId =='all'? []: [this.app.currOfficeId];
			this.optTime = defaultDatePickerValue(
				this.calendarConfig.maxMonthInterval
			);
			this.pageNo = 1;
			this.initOffice();
		},
		joinValidBySingle(id, val) {
			let config = {
				okText: this.$t(
					"classroom_allscore_54"
				),
				title: this.$t(
					"modules_spoc_crm_web_src_views_customer360_index_1142"
				),
				width: 433,
				content: '丢入无效池中的资源，将不在日常跟进的列表中出现，您还要继续吗？',
				onOk: () => {
					// console.log(id)
					let arr = [id];
					this.changeStatus(val, arr);
				},
			};
			this.$Modal.confirm(config);
		},
		changeStatus(toStatus, arr) {
			let params = {
				isEffective: toStatus,
				ids: arr,
			};
			// if(this.tabName==0){
			// 	delete param.isEffective;
			// }
			crmCustomerStatus
				.modifyEffective(params)
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.pageNo = 1;
						this.getLists();
					}
				})
				.catch(errors.call(this));
		},
		setOptTime(flag) {
			if (flag) {
				this.optTime = [];
			}
		},
	},
	watch: {
		"app.currOfficeId": function (val, oldVal) {
			// console.log(val,'app.currOfficeId')
			if (oldVal && this.$route.name == "crm.wechatUser") {
				// this.$set(this.record, "ownerOfficeIds", val=='all'?[]: [val]);
				this.pageNo = 1;
				this.initOffice();
			}
		},
		"$route.name": {
			handler: function (val, oldVal) {
				if (val == "crm.wechatUser") {
					let $f = this.fApi;
					let formData = $f.formData();
					for (let i in formData) {
						if (Array.isArray(formData[i])) {
						} else {
							formData[i] = [formData[i]];
						}
					}
					this.record.fieldJsonData = formData;
					this.$nextTick(() => {
						this.getLists();
					});
				}
			},
			deep: true,
		},
	},
};
</script>
