<style lang="less">
.member-list-container {
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
	<div class="member-list-container">
		<vSearchCollapse @search="searchInfo" @reset="resetSearch" @changeDivHeight="changeDivHeight">
			<DatePicker
				ref="DatePicker"
				:options="options3"
				split-panels
				@on-open-change="setOptTime"
				type="daterange"
				separator=" ~ "
				v-model="searchBox.time"
				format="yyyy-MM-dd"
				:placeholder="$t('integralflow_index_231')"
				style="width:224px;margin-right:12px;"
			></DatePicker>
			<Select
				:placeholder="$t('courselist_courselist_225')"
				@on-change="getSomeByOfficeId(searchBox.selectCompass)"
				@on-clear="clearStu"
				clearable
				v-model="searchBox.selectCompass"
				style="width:224px;margin-right:12px;"
			>
				<Option
					v-for="item in searchBox.selectCompassList"
					:value="item.id"
					:key="item.id"
				>{{item.code}}{{ item.name }}</Option>
			</Select>
			<Select
				:placeholder="$t('integralflow_index_232')"
				v-model="searchBox.student"
				filterable
				clearable
				style="width:224px;margin-right:12px;"
			>
				<Option
					v-for="item in searchBox.studentList"
					:value="item.id"
					:key="item.id"
				>{{ item.name +' / '+ item.phone }}</Option>
			</Select>
			<Select
				:placeholder="$t('integralflow_index_233')"
				filterable
				v-model="searchBox.operator"
				clearable
				style="width:140px;margin-right:12px;"
			>
				<Option v-for="item in searchBox.operatorList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
			<Select
				:placeholder="$t('integralflow_index_234')"
				filterable
				v-model="searchBox.course"
				clearable
				style="width:140px;margin-right:12px;"
			>
				<Option v-for="item in searchBox.courseList" :value="item.name" :key="item.id">{{ item.name }}</Option>
			</Select>
			<!--<Select :placeholder="$t('integralflow_index_235')"-->
			<!--filterable-->
			<!--v-model="searchBox.phone" clearable  style="width:224px;margin-right:12px;">-->
			<!--<Option v-for="item in searchBox.phoneList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
			<!--</Select>-->
			<Select
				:placeholder="$t('integralflow_index_236')"
				v-model="searchBox.counts"
				clearable
				style="width:140px;margin-right:12px;"
			>
				<Option
					v-for="item in searchBox.countsList"
					:value="item.value"
					:key="item.value"
				>{{ item.label }}</Option>
			</Select>
		</vSearchCollapse>
		<export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>

		<big-table
			v-if="defaultShowCol"
			class="mytable"
			:tableHeightOut="tableHeightOut"
			:tableName="tableTitle"
			:pageNo="pageNo"
			:tableData="dataT"
			:btnList="btnList"
			:tableColumnArray="columnsT"
			:defaultShowCol="defaultShowCol"
			:canSelection="true"
			:isShowSelectTableColumn="false"
			:dataTotal="pageCounts"
			@selectionChange="selectTableItem"
			@pageChange="pageChange"
			@sortChange="sortChange"
		></big-table>
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
	jxStudent,
	jxPoints,
	jxClassCourse,
	sysUser
} from "../../libs/request";
import { mapMutations, mapState } from "vuex";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
export default {
	name: "hootie.integralFlow",
	data() {
		return {
			modal3: false,
			options3: null,
			tableHeightOut: 72, //324,
			tableTitle: this.$t("hootie.integralFlow"),
			searchBox: {
				selectCompass: "",
				selectCompassList: [],
				time: [],
				student: "",
				studentList: [],
				operator: "",
				operatorList: [],
				course: "",
				courseList: [],
				counts: "",
				countsList: [
					{ value: "0", label: this.$t("integralflow_2") },
					{ value: "1", label: this.$t("classroom_evaluation_92") }
				]
			},
			defaultShowCol: null,
			exportMethod: jxPoints.exportData,
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
					title: this.$t("integralflow_7"),
					key: "createDate",
					minWidth: 100,
					sortable: "custom"
				},
				{
					title: this.$t("integralflow_8"),
					key: "typeName",
					minWidth: 60
					// tooltip: true,
				},
				{
					title: this.$t("integralflow_8"),
					key: "enTypeName",
					minWidth: 70
					// tooltip: true,
				},
				{
					title: this.$t("integralflow_9"),
					key: "points",
					minWidth: 60
					// tooltip: true
				},
				{
					key: "lessonClassTeacherName",
					minWidth: 80
				},
				{
					title: this.$t("integralflow_10"),
					key: "updateByName",
					minWidth: 80
					// tooltip: true,
				},
				{
					title: this.$t("classlist_compontents_detailinfo_35"),
					key: "stuName",
					minWidth: 100
				},
				{
					title: this.$t("classlist_compontents_detailinfo_36"),
					key: "stuEnName",
					minWidth: 80
					// tooltip: true,
				},
				{
					title: this.$t("classlist_compontents_detailinfo_37"),
					key: "phone",
					minWidth: 120,
					renderHeader: (h, params) => {
						return h(
							"div",
							{
								style: {
									display: "flex"
								}
							},
							[
								h(
									"span",
									{
										props: {},
										style: {}
									},
									this.$t("classlist_compontents_detailinfo_37")
								),
								h(
									"Tooltip",
									{
										props: {
											content: this.$t("memberlist_compontents_modify_244"),
											theme: "light",
											placement: "top",
											transfer: true
										},
										style: {
											marginLeft: "5px"
										},
										on: {
											click: () => {}
										}
									},
									[
										h("Icon", {
											props: {
												type: "ios-help-circle",
												color: "#999",
												size: "14"
											}
										})
									]
								)
							]
						);
					}
				},
				{
					title: this.$t("integralflow_15"),
					key: "officeName",
					minWidth: 120
					// tooltip: true,
				},
				{
					title: this.$t("integralflow_16"),
					key: "className",
					minWidth: 100
					// tooltip: true,
				},
				{
					title: this.$t("integralflow_17"),
					key: "lesson",
					minWidth: 100
					// tooltip: true,
				}
			],
			dataT: [],
			cols: {
				false: [
					{
						name: "createDate",
						title: this.$t("integralflow_7"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "typeName",
						title: this.$t("integralflow_8"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "enTypeName",
						title: this.$t("integralflow_8En"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "points",
						title: this.$t("integralflow_9"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "stuName",
						title: this.$t("classlist_compontents_detailinfo_35"),
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
						name: "phone",
						title: this.$t("classlist_compontents_detailinfo_37"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "officeName",
						title: this.$t("integralflow_15"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "className",
						title: this.$t("integralflow_16"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "lesson",
						title: this.$t("integralflow_17"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "lessonClassTeacherName",
						title: this.$t("integralFlow_OO"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "updateByName",
						title: this.$t("integralflow_10"),
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
		...mapState(["userInfo", "app", "calendarConfig"])
	},
	mounted() {
		this.blogCompassFn();
		this.getShowTitle();
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		setOptTime(flag){
			if(flag){
				this.searchBox.time = []
			}
		},
		changeDivHeight(height) {
			this.tableHeightOut = height;
		},
		sortChange(val) {
			//                console.log(val)
			if (val.order == "asc") {
				this.params.orderByStatus = "1";
			} else {
				this.params.orderByStatus = "2";
			}
			this.getLists();
		},
		getSomeByOfficeId(id) {
			//                console.log(id)
			if (id) {
				this.searchBox.operator = ''
				this.searchBox.course = ''
				this.searchBox.student = ''
				this.getOperator(id);
				this.getClassCourse(id);
				this.getStudent(id);
			}
		},
		getLists() {
			this.updateLoadingStatus({ isLoading: true });
			this.params.pageNumber = this.pageNo;
			this.params.pageSize = this.pageSize;
			this.params.orderByType = "createDate";
			this.params.officeId = this.searchBox.selectCompass;
			this.params.stuIdList = this.searchBox.student ? [this.searchBox.student] : [] ;
			this.params.type = this.searchBox.counts;
			this.params.createDateStart = this.searchBox.time[0] ? new Date(this.searchBox.time[0].format('yyyy-MM-dd 00:00:00')).getTime() : '',
			this.params.createDateEnd = this.searchBox.time[1] ? new Date(this.searchBox.time[1].format('yyyy-MM-dd 23:59:59')).getTime() : '',
			this.params.createById = this.searchBox.operator;
			this.params.className = this.searchBox.course;
			jxPoints
				.listPage(this.params, this.pageNo)
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
						// console.log(this.searchBox.selectCompassList.length)
						//合并列表的 机构
						let ids = this.searchBox.selectCompassList.map(item => {
							return item.id;
						});
						// console.log(ids)
						if (data.selfOffices && data.selfOffices.length) {
							data.selfOffices.forEach(item => {
								if (ids.indexOf(item.id) < 0) {
									this.searchBox.selectCompassList.push(item);
								}
							});
							// console.log(this.searchBox.selectCompassList.length)
						}
						this.searchBox.selectCompassList.sort(function(a, b) {
							return a.sort - b.sort;
						});
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		clearStu() {
			this.searchBox.studentList = [];
			this.searchBox.student = "";
			this.searchBox.operatorList = [];
			this.searchBox.operator = "";
			this.searchBox.courseList = [];
			this.searchBox.course = "";
		},
		getOperator(id) {
			let params = {};
			params.officeId = id;
			jxPoints
				.listCreatBysByOfficeId(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.searchBox.operator = "";
						if (res.data.data.length > 0) {
							this.searchBox.operatorList = res.data.data;
						} else {
							this.searchBox.operatorList = [];
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		getClassCourse(id) {
			let params = {};
			params.officeId = id;
			jxClassCourse
				.listByOfficeId(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.searchBox.course = "";
						if (res.data.data.length > 0) {
							this.searchBox.courseList = res.data.data;
						} else {
							this.searchBox.courseList = [];
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		formatTime(time) {
			let times = new Date(time).format("yyyy-MM-dd hh:mm:ss");
			return times;
		},
		getStudent(id) {
			let params = {};
			params.officeId = id;
			params.phone = "";
			jxStudent
				.listByOfficeId(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.searchBox.student = "";
						if (res.data.data.length > 0) {
							this.searchBox.studentList = res.data.data;
						} else {
							this.searchBox.studentList = [];
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		blogCompassFn() {
			sysUser
				.dataScopeFilter()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						if (res.data.data.length > 0) {
							this.searchBox.selectCompassList = res.data.data;
							//this.searchBox.selectCompass = ''
							//                            this.getStudent(this.searchBox.selectCompass)
							//                            this.getClassCourse(this.searchBox.selectCompass)
							//                            this.getOperator(this.searchBox.selectCompass)
						} else {
							this.searchBox.selectCompassList = [];
						}

						waitUntil(
							() => {
								// console.log(
								// 	"this.app.currOfficeId ==" +
								// 		this.app.currOfficeId
								// );
								if (this.app.currOfficeId == 'all') {
									this.$set(
										this.searchBox,
										"selectCompass",
										''
									);
								}else{
                                    this.$set(
                                        this.searchBox,
                                        "selectCompass",
                                        this.app.currOfficeId
                                    );
                                }
								return (this.app.currOfficeId  && this.calendarConfig.maxMonthInterval) || false;
							},
							() => {
								this.searchBox.time = defaultDatePickerValue()
								this.options3 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
								this.getLists();
								this.getSomeByOfficeId(this.app.currOfficeId == 'all'? '' : this.app.currOfficeId)
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
			let params = Object.assign({}, this.params)
			delete params.pageNumber
			delete params.pageSize
			if (val == "2") {
				//如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
				params.idList = this.selectedIds;
				this.exportMethod = jxPoints.exportSelected;
			} else {
				delete params.idList;
				this.exportMethod = jxPoints.exportData;
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
		searchInfo() {
			this.pageNo = 1;
			this.getLists();
		},
		resetSearch() {
			this.pageNo = 1;
			for (let item in this.searchBox) {
				if (
					typeof this.searchBox[item] === "string" &&
					item != "selectCompass"
				) {
					this.searchBox[item] = "";
				}
			}
			this.searchBox.time = defaultDatePickerValue()
            if (this.app.currOfficeId == 'all') {
                this.$set(this.searchBox, "selectCompass", '');
            }else{
                this.$set(this.searchBox, "selectCompass", this.app.currOfficeId);
            }
			this.getLists();

			this.searchBox.studentList = [];
			this.searchBox.operatorList = [];
			this.searchBox.courseList = [];
			this.selectedIds = [];
			this.getSomeByOfficeId(this.app.currOfficeId == 'all'? '' : this.app.currOfficeId)
		},
		showImport() {},
		//改变页码
		pageChange(page, size) {
			this.pageNo = page;
			this.pageSize = size;
			this.getLists();
		}
	},
	watch: {
		"app.currOfficeId": function(val, oldVal) {
			if (oldVal && this.$route.name == 'hootie.integralFlow') {
                if (this.app.currOfficeId == 'all') {
                    this.$set(this.searchBox, "selectCompass", '');
                }else{
                    this.$set(this.searchBox, "selectCompass", this.app.currOfficeId);
				}
				this.searchBox.operator = ''
				this.searchBox.course = ''
				this.searchBox.student = ''
				this.searchBox.operatorList = [];
				this.searchBox.courseList = [];
				this.searchBox.studentList = [];
				this.getSomeByOfficeId(this.app.currOfficeId == 'all'? '' : this.app.currOfficeId)
				this.getLists();
			}
		}
	}
};
</script>
