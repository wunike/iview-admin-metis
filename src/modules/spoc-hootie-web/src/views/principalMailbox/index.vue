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
			background: #06a59b;
		}
	}
	.approval-2 {
		.approval;
		&::before {
			background: #46bc15;
		}
	}
	.approval-3 {
		.approval;
		&::before {
			background: #999999;
		}
	}
	.mytable {
		margin-top: 10px;
		width: 100%;
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		padding: 0 16px;
	}
}
.exportIng{
    .ivu-modal-body{
        padding-bottom: 35px;
    }
    .ivu-modal-footer{
        display: none;
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
				v-model="searchBox.submitTimeRange"
				format="yyyy-MM-dd"
				:placeholder="$t('principalmailbox_index_490')"
				style="width:224px;margin-right:12px;"
			></DatePicker>
			<Select
				:placeholder="$t('messagemanagement_index_344')"
				@on-change="getStudent(searchBox.blogCompass)"
				@on-clear="clearStu"
				clearable
				v-model="searchBox.blogCompass"
				style="width:224px;margin-right:12px;"
			>
				<Option
					v-for="item in searchBox.blogCompassList"
					:value="item.id"
					:key="item.id"
				>{{item.code}}{{ item.name }}</Option>
			</Select>
			<Input
				v-model="searchBox.content"
				:placeholder="$t('principalmailbox_index_488')"
				style="width: 224px;margin-right:12px;"
			/>
			<Select
				:placeholder="$t('classlist_compontents_detailinfo_35')"
				filterable
				v-model="searchBox.stuName"
				clearable
				style="width:140px;margin-right:12px;"
			>
				<Option v-for="item in searchBox.stuNameList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
			<Select
				:placeholder="$t('principalmailbox_index_491')"
				v-model="searchBox.resolveStatus"
				clearable
				style="width:224px;margin-right:12px;"
			>
				<Option
					v-for="item in searchBox.resolveStatusList"
					:value="item.value"
					:key="item.value"
				>{{ item.label }}</Option>
			</Select>
			<Input
				v-model="searchBox.phoneNum"
				:placeholder="$t('principalmailbox_index_492')"
				style="width: 224px;margin-right:12px;"
			/>
		</vSearchCollapse>
		<big-table
			v-if="defaultShowCol"
			class="mytable"
			:tableName="tableTitle"
			:pageNo="pageNo"
			:tableHeightOut="tableHeightOut"
			:tableData="dataT"
			:btnList="btnList"
			:tableColumnArray="columnsT"
			:defaultShowCol="defaultShowCol"
			:canSelection="true"
			:dataTotal="pageCounts"
			:isShowSelectTableColumn="false"
			@selectionChange="selectTableItem"
			@pageChange="pageChange"
		></big-table>
		<export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
		<Modal v-model="modal3" width="400" class="exportIng" :closable="false" :mask-closable="false">
			<div>
				<div class="ivu-modal-confirm">
					<div class="ivu-modal-confirm-head">
						<div class="ivu-modal-confirm-head-icon ivu-modal-confirm-head-icon-info">
								<i class="ivu-icon ivu-icon-ios-information-circle"></i>
						</div>
						<div class="ivu-modal-confirm-head-title">{{$t('modules_spoc_crm_web_src_views_activityenrollment_index_761')}}</div>
					</div>
					<div class="ivu-modal-confirm-body">
						<div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_index_762')}}</div>
					</div>
				</div>
			</div>
		</Modal>
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
import valid, {
	errors,
	jxMailbox,
	jxStudent,
	sysUser
} from "../../libs/request";
import { mapMutations, mapState } from "vuex";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
export default {
	name: "hootie.principal",
	data() {
		return {
			modal3: false,
			options3: null,
			tableHeightOut: 72, //324,
			tableTitle: this.$t("hootie.principal"),
			searchBox: {
				blogCompass: "",
				blogCompassList: [],
				content: "",
				stuName: "",
				stuNameList: [],
				submitTimeRange: [],
				resolveStatus: "",
				resolveStatusList: [
					{ value: "0", label: this.$t("principalmailbox_feedbackdetail_472") },
					{ value: "1", label: this.$t("principalmailbox_feedbackdetail_473") },
					{ value: "2", label: this.$t("principalmailbox_feedbackdetail_471") }
				],
				phoneNum: ""
			},
			defaultShowCol: null,
			exportMethod: jxMailbox.exportFile,
			btnList: [
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
			pageCounts: 0, //总数
			pageSize: this.$store.state.app.pageSizeGlobal,
			columnsT: [
				{
					title: this.$t("principalmailbox_8"),
					key: "commitDate",
					minWidth: 100,
					tooltip: true
				},
				{
					title: this.$t("principalmailbox_9"),
					key: "title",
					minWidth: 130,
					tooltip: true
				},
				{
					title: this.$t("classlist_compontents_detailinfo_35"),
					key: "stuName",
					minWidth: 100,
					tooltip: true
				},
				{
					title: this.$t("classlist_compontents_detailinfo_37"),
					key: "phone",
					minWidth: 100
				},
				{
					title: this.$t("classlist_compontents_detailinfo_36"),
					key: "stuEnName",
					minWidth: 100,
					tooltip: true
				},
				{
					title: this.$t("principalmailbox_13"),
					key: "officeName",
					minWidth: 100,
					tooltip: true
				},
				//------------------------------------------------------------
				{
					title: this.$t("principalmailbox_14"),
					key: "status",
					minWidth: 100,
					tooltip: true,
					render: (h, params) => {
						return h(
							"span",
							{
								style: {},
								class:
									params.row.status === "2"
										? "approval-1"
										: params.row.status === "1"
										? "approval-2"
										: params.row.status === "0"
										? "approval-3"
										: ""
							},
							params.row.status === "2"
								? this.$t("principalmailbox_feedbackdetail_471")
								: params.row.status === "1"
								? this.$t("principalmailbox_feedbackdetail_473")
								: params.row.status === "0"
								? this.$t("principalmailbox_feedbackdetail_472")
								: ""
						);
					}
				},
				{
					title: this.$t("classlist_compontents_detailinfo_45"),
					key: "doAction",
					width: 90,
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
										display:
											params.row.status === "2"
												? "block"
												: "none"
									},
									on: {
										click: () => {
											this.$router.push({
												name:
													"hootie.principalFBDetail",
												query: {
													id: params.row.id
												}
											});
										}
									}
								},
								this.$t("principalmailbox_16")
							),
							h(
								"a",
								{
									props: {
										type: "text",
										size: "small"
									},
									style: {
										display:
											params.row.status === "0"
												? "block"
												: "none"
									},
									on: {
										click: () => {
											this.$router.push({
												name:
													"hootie.principalFBDetail",
												query: {
													id: params.row.id
												}
											});
										}
									}
								},
								this.$t("principalmailbox_16")
							),
							h(
								"a",
								{
									props: {
										type: "text",
										size: "small"
									},
									style: {
										display:
											params.row.status === "1"
												? "block"
												: "none"
									},
									on: {
										click: () => {
											this.$router.push({
												name:
													"hootie.principalFBDetail",
												query: {
													id: params.row.id
												}
											});
										}
									}
								},
								this.$t("principalmailbox_16")
							)
						]);
					}
				}
			],
			dataT: [],
			cols: {
				false: [
					{
						name: "commitDate",
						title: this.$t("principalmailbox_8"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "title",
						title: this.$t("principalmailbox_9"),
						selected: true,
						required: true,
						sort: 0
					},
					{
						name: "stuName",
						title: this.$t("classlist_compontents_detailinfo_35"),
						selected: true,
						required: true,
						sort: 0
					},

					{
						name: "phone",
						title: this.$t("classlist_compontents_detailinfo_37"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "stuEnName",
						title: this.$t("classlist_compontents_detailinfo_36"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "officeName",
						title: this.$t("principalmailbox_13"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "status",
						title: this.$t("principalmailbox_14"),
						selected: true,
						required: false,
						sort: 0
					}
				],
				true: []
			},
			params: {}
		};
	},
	components: {
		vSearchCollapse,
		bigTable,
		exportModal
	},
	computed: {
		...mapState(["userInfo", "app","calendarConfig"])
	},
	mounted() {
		this.getShowTitle();
		this.blogCompassFn();
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		setOptTime(flag){
			if(flag){
				this.searchBox.submitTimeRange = []
			}
		},
		changeDivHeight(height) {
			this.tableHeightOut = height;
		},
		clearStu() {
			this.searchBox.stuNameList = [];
			this.searchBox.stuName = "";
		},
		getStudent(id) {
			if (id != undefined) {
				let params = {};
				params.officeId = id;
				params.phone = "";

				jxStudent
					.listByOfficeId(params)
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							this.searchBox.stuName = "";
							if (res.data.data.length > 0) {
								this.searchBox.stuNameList = res.data.data;
							} else {
								this.searchBox.stuNameList = [];
							}
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({ isLoading: false });
					});
			}
		},
		blogCompassFn() {
			sysUser
				.dataScopeFilter()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						if (res.data.data.length > 0) {
							this.searchBox.blogCompassList = res.data.data;
							// this.searchBox.blogCompass = ''
							// this.getStudent(this.searchBox.blogCompass)
						} else {
							this.searchBox.blogCompassList = [];
						}

						waitUntil(
							() => {
								// console.log("this.app.currOfficeId ==" + this.app.currOfficeId)
                                if (this.app.currOfficeId == 'all') {
                                    this.$set(this.searchBox, "blogCompass", '');
                                }else{
                                    this.$set(this.searchBox, "blogCompass", this.app.currOfficeId);
                                }
								return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval)|| false;
							},
							() => {
								this.searchBox.submitTimeRange = defaultDatePickerValue();
								this.options3 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
								this.getStudent(this.searchBox.blogCompass);
								this.getLists();
							}
						);
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		isExport(val) {
			//这里val的值。是根据设置下拉类型button设定的值来匹配判断
			if (val == "2" && !this.selectedIds.length) {
				this.$Message.error(this.$t("scoretemplate_scoretemplate_572"));
				return;
			}
			this.columnsT.map(item => {
				item.name = item.key;
				if (item.fixed) {
					item.selected = true;
				} else {
					item.selected = false;
				}
			});
			let data = this.columnsT.filter(item => {
				return item.key != "doAction";
			});
			let params = Object.assign(this.params);
			delete params.pageNumber
			delete params.pageSize

			if (val == "2") {
				//如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
				params.ids = this.selectedIds.join(",");
				this.exportMethod = jxMailbox.exportSelected;
			} else {
				delete params.ids;
				this.exportMethod = jxMailbox.exportFile;
			}
			this.exportFn(data, params);
		},
		exportFn(data, params) {
			let param = {};
			param = params;
			let arr = [];
			let arr1 = data.filter(item => {
				return item.fixed;
			});
			arr1.forEach(e => {
				arr.push({
					name: e.name,
					title: e.title,
					selected: true
				});
			});
			//this.exportRequestParams  为当前页面搜索的参数
			//arr  为所选导出列的集合  需要把arr加入到导出参数中去
			param.showFieldList = arr;
			this.modal3 = true
			this.exportMethod(param)
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
							this.$Message.error(this.$t("integralflow_19"));
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
				.catch(errors.call(this))
				.finally(() => {
					setTimeout(()=>{
						this.modal3 = false
					},1000)
					/* this.updateLoadingStatus({ isLoading: false }); */
				});
		},
		selectTableItem(row) {
			//选择导出
			let s = this.selectedIds;
			let c = this.currentIds;
			for (let i in c) {
				if (s.includes(c[i])) {
					let num = this.selectedIds.indexOf(c[i]);
					s.splice(num, 1);
				}
			}
			if (row.length) {
				row.forEach(item => {
					s.push(item.id);
				});
			}
		},
		getShowTitle() {
			this.defaultShowCol = this.cols;
		},
		formatTime(time) {
			let times = new Date(time).format("yyyy-MM-dd hh:mm:ss");
			return times;
		},
		searchInfo() {
			this.pageNo = 1;
			this.getLists();
		},
		resetSearch() {
			for (let item in this.searchBox) {
				if (
					typeof this.searchBox[item] === "string" &&
					item != "blogCompass"
				) {
					this.searchBox[item] = "";
				}
			}
			this.searchBox.submitTimeRange = defaultDatePickerValue()
            if (this.app.currOfficeId == 'all') {
                this.$set(this.searchBox, "blogCompass", '');
            }else{
                this.$set(this.searchBox, "blogCompass", this.app.currOfficeId);
            }
			this.selectedIds = [];
			this.pageNo = 1;
			this.getLists();
			this.getStudent(this.searchBox.blogCompass);
		},
		getLists() {
			this.updateLoadingStatus({ isLoading: true });
			this.params.pageNumber = this.pageNo;
			this.params.pageSize = this.pageSize;
			this.params.stuId = this.searchBox.stuName;
			this.params.startDate = this.searchBox.submitTimeRange[0] ? new Date(this.searchBox.submitTimeRange[0].format('yyyy-MM-dd 00:00:00')).getTime() : '';
			this.params.endDate = this.searchBox.submitTimeRange[1] ? new Date(this.searchBox.submitTimeRange[1].format('yyyy-MM-dd 23:59:59')).getTime() : '';
			this.params.keyword = this.searchBox.content;
			this.params.officeId = this.searchBox.blogCompass;
			this.params.status = this.searchBox.resolveStatus;
			this.params.phone = this.searchBox.phoneNum;
			jxMailbox
				.listPage(this.params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						//                        console.log(res.data.data)
						let data = res.data.data;
						this.pageCounts = data.totalElements;
						let d = data.content;
						this.currentIds = [];
						for (let i in d) {
							this.currentIds.push(d[i].id);
							if (this.selectedIds.includes(d[i].id)) {
								d[i]._checked = true;
							}
						}
						this.dataT = d;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},

		//改变页码
		pageChange(page, size) {
			this.pageNo = page;
			this.pageSize = size;
			this.getLists();
		}
	},
	watch: {
		"app.currOfficeId": function(val, oldVal) {
			if (oldVal && this.$route.name == 'hootie.principal') {
                if (this.app.currOfficeId == 'all') {
                    this.$set(this.searchBox, "blogCompass", '');
                }else{
                    this.$set(this.searchBox, "blogCompass", this.app.currOfficeId);
                }
				this.searchBox.stuName = ''
				this.getStudent(this.searchBox.blogCompass);
				this.getLists();
			}
		}
	}
};
</script>
