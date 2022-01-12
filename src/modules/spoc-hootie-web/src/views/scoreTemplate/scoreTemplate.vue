<style lang="less">
.pricipal-mailbox-container {
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
			background: #ff6666;
		}
	}
	.approval-2 {
		.approval;
		&::before {
			background: #46bc15;
		}
	}
	.mytable {
		margin-top: 10px;
		width: 100%;
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		padding: 0 16px;
		.statusColor {
			.ivu-badge-status-success {
				background: #44bcb7;
			}
			.ivu-badge-status-default {
				background: #999999;
			}
		}
	}
}
</style>

<template>
	<div class="pricipal-mailbox-container">
		<vSearchCollapse @search="searchInfo" @reset="resetSearch" @changeDivHeight="changeDivHeight">
			<DatePicker
				ref="DatePicker"
				:options="options3"
				split-panels
				@on-open-change="setOptTime"
				type="daterange"
				separator=" ~ "
				v-model="findObj.dateRange"
				formDataat="yyyy-MM-dd"
				:placeholder="$t('scoretemplate_scoretemplate_556')"
				style="width:224px;margin-right:12px;"
			></DatePicker>
			<Select
				:placeholder="$t('scoretemplate_scoretemplate_557')"
				v-model="findObj.officeIds"
				clearable
				multiple
				style="width:224px;margin-right:12px;"
			>
				<Option
					v-for="item in officeIdsList"
					:value="item.id"
					:key="item.id"
				>{{item.code}}{{ item.name }}</Option>
			</Select>
			<Input
				v-model="findObj.name"
				:placeholder="$t('scoretemplate_scoretemplate_553')"
				style="width: 224px;margin-right:12px;"
			/>

			<Select
				:placeholder="$t('scoretemplate_scoretemplate_554')"
				v-model="findObj.type"
				clearable
				style="width:140px;margin-right:12px;"
			>
				<Option v-for="item in subTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			<Select
				:placeholder="$t('pushsettings_index_496')"
				v-model="findObj.status"
				clearable
				style="width:140px;margin-right:12px;"
			>
				<Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
		</vSearchCollapse>
		<big-table
			v-if="defaultShowCol"
			class="mytable"
			:tableName="tableTitle"
			:tableData="tableData"
			:btnList="btnList"
			:tableHeightOut="tableHeightOut"
			:tableColumnArray="tableColumnArray"
			:defaultShowCol="defaultShowCol"
			:canSelection="true"
			:pageNo="pageNo"
			:isShowSelectTableColumn="false"
			:updateShowTitleMethod="updateShowTitle"
			:dataTotal="dataTotal"
			@selectionChange="selectionChange"
			@pageChange="pageChange"
		></big-table>
		<export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
		<scoreModify ref="scoreModifyRef" @updateList="updateList"></scoreModify>
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
import exportModal from "@public/modules/exportModal.vue";
import valid, { errors, sysUser, jxPointsTpl } from "../../libs/request";
import { mapMutations, mapState } from "vuex";
import scoreModify from "./compontents/scoreModify.vue";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
export default {
	name: "hootie.scoreTemplate",
	data() {
		return {
			options3: null,
			tableHeightOut: 72, //324,
			selection: [],
			getImgSrcList: "",
			filePathSrc: "",
			sortObj: {},

			typeList: [
				// 评分类型 : 0：上课积分；1：积分兑换
				{ value: "0", label: this.$t("integralflow_2") },
				{ value: "1", label: this.$t("classroom_evaluation_92") }
			],

			tableTitle: this.$t("scoretemplate_3"),
			subTypeList: [
				//(0：惩罚；1：奖励; 2: 积分兑换)
				{ value: "0", label: this.$t("classroom_allscore_49") },
				{ value: "1", label: this.$t("classroom_allscore_48") },
				{ value: "2", label: this.$t("classroom_evaluation_92") }
			],
			statusList: [
				//状态(0：无效(停用)；1：有效(启用))
				{ value: "0", label: this.$t("scoretemplate_scoretemplate_558") },
				{ value: "1", label: this.$t("scoretemplate_scoretemplate_559") }
			],
			findObj: {
				name: "",
				type: "",
				status: "",
				dateRange: [],
				startTime: "",
				endTime: "",
				officeIds: []
			},
			officeIdsList: [],
			updateShowTitle: sysUser.updateShowTitle,
			defaultShowCol: null,
			exportMethod: jxPointsTpl.exportFile,
			btnList: [
				{
					style: {},
					type: "",
					btnClick: this.showNewScore,
					text: this.$t("scoretemplate_compontents_scoremodify_521")
				},
				[
					{
						style: {},
						type: "",
						btnClick: this.isExport,
						text: this.$t("integralflow_4"),
						value: "1",
						parentName: this.$t("integralflow_5")
					},
					{
						style: {},
						type: "",
						btnClick: this.isExport,
						text: this.$t("integralflow_6"),
						value: "2",
						parentName: this.$t("integralflow_5")
					}
				]
			],
			selectedIds: [], //选中的ids
			currentIds: [], //当前页的ids
			pageNo: 1,
			dataTotal: 0, //总数
			pageSize: this.$store.state.app.pageSizeGlobal,
			tableColumnArray: [
				{
					title: this.$t("scoretemplate_scoretemplate_567"),
					key: "iconPath",
					minWidth: 60,
					render: (h, params) => {
						return h("div", {}, [
							h("img", {
								domProps: {
									src: params.row.iconPath
								},
								style: {
									height: "30px",
									width: "30px"
								},
								on: {
									click: () => {}
								}
							})
						]);
					}
				},
				{
					title: this.$t("scoretemplate_scoretemplate_553"),
					key: "name"
				},
				{
					title: this.$t("scoretemplate_scoretemplate_554"),
					key: "subTypeName"
				},
				{
					title: this.$t("scoretemplate_scoretemplate_568"),
					key: "points",
					render(h, params) {
						return h(
							"div",
							{},
							params.row.points > 0
								? "+" + params.row.points
								: params.row.points
						);
					}
				},
				{
					title: this.$t("pushsettings_index_496"),
					key: "statusName",
					render: (h, params) => {
						return h("div", [
							h("Badge", {
								props: {
									status:
										params.row.status == "1"
											? "success"
											: "default"
								},
								class: "statusColor"
							}),
							params.row.status == "1"
								? this.$t("scoretemplate_scoretemplate_559")
								: this.$t("scoretemplate_scoretemplate_558")
						]);
					}
				},
				{
					title: this.$t("scoretemplate_scoretemplate_569"),
					key: "createBy"
				},
				{
					title: this.$t("scoretemplate_scoretemplate_557"),
					key: "officeName"
				},
				{
					title: this.$t("scoretemplate_scoretemplate_556"),
					key: "createDate"
				},
				{
					title: this.$t("classlist_compontents_detailinfo_45"),
					key: "doAction",
					width: 110,
					render: (h, params) => {
						return h("div", [
							h(
								"a",
								{
									props: {
										type: "text",
										size: "small"
									},
									style: {
										marginRight: "12px",
										display: "inline-block",
										color:
											!this.userInfo.admin &&
											params.row.isAdmin == 1
												? "#ccc"
												: ""
									},
									on: {
										click: () => {
											//false  and officeType==1 全部按钮禁用
											if (
												!this.userInfo.admin &&
												params.row.isAdmin == 1
											) {
												return;
											}
											this.invalid(
												params.row.status,
												params.row.id
											);
											/*   this.$Modal.confirm({
                        title: "提示",
                        content: "<p>您确定修改吗?</p>",
                        onOk: () => {
                          this.invalid(params.row.status, params.row.id);
                        },
                        onCancel: () => {}
                      }); */
										}
									}
								},
								params.row.status === "1"
									? this.$t("scoretemplate_scoretemplate_558")
									: this.$t("scoretemplate_scoretemplate_559")
							),
							// isAdmin==1(是管理员创建的) 并且登陆人不是管理员!this.admin  编辑和删除禁用的  登陆人是管理员 编辑和删除可用 无效才能删除
							h(
								"a",
								{
									props: {
										type: "text",
										size: "small"
									},
									style: {
										marginRight: "12px",
										display: "inline-block",
										color:
											!this.userInfo.admin &&
											params.row.isAdmin == 1
												? "#ccc"
												: ""
									},
									on: {
										click: () => {
											if (
												!this.userInfo.admin &&
												params.row.isAdmin == 1
											) {
												return;
											}
											this.$refs.scoreModifyRef.showNewScore(
												{
													id: params.row.id,
													disabled: ""
												}
											);
										}
									}
								},
								this.$t("classroom_allscore_51")
							),
							h(
								"a",
								{
									props: {
										type: "text",
										size: "small"
									},
									style: {
										marginRight: "12px",
										display: "inline-block"
										// color:
										//   (!this.userInfo.admin&&params.row.isAdmin == 1)
										//     ? "#ccc"
										//     : ""
									},
									on: {
										click: () => {
											// if (!this.userInfo.admin&&params.row.isAdmin == 1) {
											//   return;
											// }
											this.$refs.scoreModifyRef.showNewScore(
												{
													id: params.row.id,
													disabled: "yes"
												}
											);
										}
									}
								},
								// "查看"
								this.$t("courselist_compontents_servicecontent_219")
							),
							h(
								"a",
								{
									props: {
										type: "text",
										size: "small"
									},
									style: {
										display: "inline-block",
										color:
											params.row.status == 1 ||
											(!this.userInfo.admin &&
												params.row.isAdmin == 1)
												? "#ccc"
												: ""
									},
									on: {
										click: () => {
											if (
												params.row.status == 1 ||
												(!this.userInfo.admin &&
													params.row.isAdmin == 1)
											) {
												return;
											}
											this.$Modal.confirm({
												title:
													this.$t(
														"scoretemplate_scoretemplate_561"
													) +
													'<span style="color:#FAAD14">' +
													this.$t(
														"classlist_compontents_detailinfo_46"
													) +
													params.row.name +
													"</span>" +
													this.$t(
														"scoretemplate_scoretemplate_563"
													),
												content:
													"<p>" +
													this.$t(
														"scoretemplate_scoretemplate_564"
													) +
													params.row.name +
													this.$t(
														"scoretemplate_scoretemplate_565"
													) +
													"</p>",
												onOk: () => {
													this.remove(params.row.id);
												},
												onCancel: () => {}
											});
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
			cols: {
				true: [
					{
						name: "iconPath",
						title: this.$t("scoretemplate_scoretemplate_567"),
						selected: true,
						required: false,
						sort: 0,
						noExport: true
					},
					{
						name: "name",
						title: this.$t("scoretemplate_scoretemplate_553"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "nameEn",
						title: this.$t("scoretemplate_scoretemplate_553En"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "subTypeName",
						title: this.$t("scoretemplate_scoretemplate_554"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "subTypeEnName",
						title: this.$t("scoretemplate_scoretemplate_554En"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "points",
						title: this.$t("scoretemplate_scoretemplate_568"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "statusName",
						title: this.$t("pushsettings_index_496"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "createBy",
						title: this.$t("scoretemplate_scoretemplate_569"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "officeName",
						title: this.$t("scoretemplate_scoretemplate_557"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "createDate",
						title: this.$t("scoretemplate_scoretemplate_556"),
						selected: true,
						required: false,
						sort: 0
					}
				]
			},
		};
	},
	components: {
		vSearchCollapse,
		bigTable,
		exportModal,
		scoreModify
	},
	computed: {
		...mapState(["userInfo", "app", "calendarConfig"])
	},
	mounted() {
		this.getMoreList();
		this.getShowTitle();
		waitUntil (()=>{
		    console.log("this.app.currOfficeId ==" + this.app.currOfficeId)
		    return (this.app.currOfficeId && this.calendarConfig) || false;
		},()=>{
			this.$set(this.findObj, 'officeIds', [this.app.currOfficeId])
			this.findObj.dateRange = defaultDatePickerValue();
			this.options3 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
		    this.getListData();
		});
		// this.checkLoginSecurity();
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		setOptTime(flag){
			if(flag){
				this.findObj.dateRange = []
			}
		},
		changeDivHeight(height) {
			this.tableHeightOut = height;
		},
		showNewScore() {
			this.$refs.scoreModifyRef.showNewScore({});
		},
		/*   checkLoginSecurity() {
      jxPointsTpl
        .checkLoginSecurity()
        .then(valid.call(this))
        .then(res => {
          if (res.ok) {
            //false  and officeType==1 全部按钮禁用
            this.checkLoginSecurity = res.data.data;
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          this.updateLoadingStatus({ isLoading: false });
        });
    }, */
		invalid(status, id) {
			status = status == "1" ? "0" : "1";
			let params = { id, status };
			jxPointsTpl
				.updateStatus(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let text =
							status == "1"
								? this.$t("scoretemplate_scoretemplate_559")
								: this.$t("scoretemplate_scoretemplate_558");
						this.$Message.success(
							this.$t("pushsettings_index_496") +
								text +
								this.$t("scoretemplate_scoretemplate_570")
						);
						this.getListData();
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		remove(id) {
			let ids = { id: id };
			this.updateLoadingStatus({ isLoading: true });
			jxPointsTpl
				.deleteById(ids)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.$Message.success(
							this.$t("scoretemplate_scoretemplate_571")
						);
						this.getListData();
					}
					this.updateLoadingStatus({ isLoading: false });
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
						this.officeIdsList = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					// this.updateLoadingStatus({ isLoading: false });
				});
		},
		updateList() {
			this.getListData();
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

			param.name = this.findObj.name;
			param.type = this.findObj.type;
			param.status = this.findObj.status;
			param.startTime = this.findObj.dateRange[0] ? new Date(this.findObj.dateRange[0].format('yyyy-MM-dd 00:00:00')).getTime() : "";
			param.endTime = this.findObj.dateRange[1] ? new Date(this.findObj.dateRange[1].format('yyyy-MM-dd 23:59:59')).getTime() : "";
			param.officeIds = this.findObj.officeIds.join(",")

			this.searchObj = param
			jxPointsTpl
				.listPage(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data;
						this.tableData = result.content;
						this.dataTotal = result.totalElements;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		getShowTitle() {
			this.defaultShowCol = this.cols;
			//                sysUser.getShowTitle({pageIdentifier:'user/listData'})
			//                .then(valid.call(this))
			//                .then(res => {
			//                    if (res.ok) {
			//                        this.defaultShowCol = res.data.data
			//                    }
			//                })
			//                .catch(errors.call(this))
		},
		//可选方法，如果是多选的话必须有
		selectionChange(selection) {
			console.log(selection);
			this.selection = selection;
		},
		isExport(val) {
			//这里val的值。是根据设置下拉类型button设定的值来匹配判断
			if (val == "2" && !this.selection.length) {
				this.$Message.error(this.$t("scoretemplate_scoretemplate_572"));
				return;
			}
			let searchObj = this.searchObj;
			if (val == "1") {
				delete searchObj.pageNumber
				delete searchObj.pageSize
			} else if (val == "2") {
				//如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
				searchObj = {
					id: this.selection
						.map(item => {
							return item.id;
						})
						.join(",")
				};
			}
			this.exportMethod = jxPointsTpl.exportFile; //导出用到的方法对象
			this.$refs.exportModal.noShowExport(this.exportMethod, searchObj);
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
			this.pageNo = 1;
			this.findObj.dateRange = defaultDatePickerValue();
			this.$set(this.findObj, 'officeIds', this.app.currOfficeId != 'all' ? [this.app.currOfficeId] : [])
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
		}
	},
	watch:{
	    'app.currOfficeId': function(val,oldVal){
	        if(oldVal){
	            this.$set(this.findObj, 'officeIds', this.app.currOfficeId != 'all' ? [this.app.currOfficeId] : [])
	            this.getListData()
	        }
	    }
	}
};
</script>
