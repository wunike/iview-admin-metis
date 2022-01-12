<style lang="less">
.message-manege-container {
	height: 100%;
	width: 100%;
	.ivu-table-cell {
		padding-left: 5px;
		padding-right: 5px;
	}
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
	.message-lists-content {
		padding: 0 16px;
		margin-top: 10px;
		background: #fff;
	}
	.ivu-table-wrapper {
		border: none;
	}
	.table-header {
		position: relative;
		height: 48px;
		margin-bottom: 12px;
		.name {
			font-size: 16px;
			font-weight: bold;
			position: absolute;
			bottom: 0;
			left: 0;
			margin-left: 10px;
		}
	}
	.ivu-table:after {
		display: none;
	}
	.pages {
		padding: 16px 0;
		text-align: center;
		background: #fff;
	}
	// .ivu-table-tip table td{
	//     padding: 80px 0;border-bottom: none;
	// }
}
</style>

<template>
	<div class="message-manege-container">
		<vSearchCollapse
			@search="searchInfo(true)"
			@reset="resetSearch"
			@changeDivHeight="changeDivHeight"
		>
			<DatePicker
				ref="DatePicker"
				:options="options3"
				split-panels
				@on-open-change="setOptTime"
				type="daterange"
				separator=" ~ "
				v-model="searchBox.timeRange"
				format="yyyy-MM-dd"
				:placeholder="$t('messagemanagement_index_343')"
				clearable
				style="width:224px;"
			></DatePicker>
			<Select
				:placeholder="$t('messagemanagement_index_344')"
				v-model="searchBox.schoolId"
				clearable
				style="width:224px;"
				@on-change="getClassCourseByOfficeId"
			>
				<Option
					v-for="item in searchBox.schoolList"
					:value="item.id"
					:key="item.id"
				>{{item.code}}{{ item.name }}</Option>
			</Select>
			<!-- <Select v-model.trim="searchBox.stuName" 
                filterable
                remote
                clearable
                :placeholder="$t('memberlist_memberlist_257')"
                :remote-method="remoteMethod"
                @on-clear="clearStuLists"
                :loading="loadingSelect">
                <Option v-for="(item, index) in stuList" :value="item.id" :key="index">{{item.name}}</Option>
			</Select>-->
			<Input v-model="searchBox.stuName" :placeholder="$t('memberlist_memberlist_257')"></Input>
			<Select
				v-model="searchBox.allocType"
				:placeholder="$t('messagemanagement_index_346')"
				clearable
				@on-change="changeType"
			>
				<Option
					v-if="item"
					:value="item.value"
					v-for="(item, index) in searchBox.jw_course_type"
					:key="index"
				>{{item.label}}</Option>
			</Select>
			<Select v-model="searchBox.grade" :placeholder="$t('messagemanagement_index_347')" clearable>
				<Option
					v-if="item"
					:value="item.value"
					v-for="(item, index) in searchBox.jw_course_type_child"
					:key="index"
					v-show="searchBox.allocType == item.type"
				>{{item.label}}</Option>
			</Select>
			<!-- <Input v-model="searchBox.classCourse" :placeholder="$t('integralflow_index_234')" style="width:224px;"></Input> -->
			<Select
				:placeholder="$t('integralflow_index_234')"
				filterable
				v-model="searchBox.classCourse"
				clearable
				style="width:224px;"
			>
				<Option
					v-for="item in searchBox.classCourseList"
					:value="item.id"
					:key="item.id"
				>{{ item.name }}</Option>
			</Select>
			<Select
				:placeholder="$t('messagemanagement_index_359')"
				filterable
				v-model="searchBox.isContact"
				clearable
			>
				<Option :value="'1'">{{$t('messagemanagement_index_360')}}</Option>
				<Option :value="'0'">{{$t('messagemanagement_index_361')}}</Option>
			</Select>
		</vSearchCollapse>
		<div class="message-lists-content">
			<div class="table-header">
				<div class="name">{{$t('hootie.messageManagement')}}</div>
			</div>
			<Table
				id="bigTableMiddle"
				:columns="columnsT"
				:height="_tableHeight"
                border
				:data="dataT"
				@on-sort-change="sortTable"
			></Table>
			<div class="pages">
				<Page
					:current="pageNo"
					:total="count"
					show-elevator
					show-total
					show-sizer
					:page-size="pageSize"
					@on-change="pageChange"
					@on-page-size-change="sizeChange"
				></Page>
			</div>
		</div>
	</div>
</template>

<script>
/**
 **@date: 2019/6/18 10:18
 **@author: lizhi
 **@date: 2019/7/11 16:00
 **@author: 曹见芳
 */
import vSearchCollapse from "@public/modules/vSearchCollapse";
import valid, {
	errors,
	sysUser,
	sysDict,
	jxChatDialog,
	jxStudent,
	jxClassCourse
} from "../../libs/request";
import { mapMutations, mapState } from "vuex";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
export default {
	name: "hootie.messageManagement",
	data() {
		return {
			options3: null,
			tableHeightOut: 72, //324,
			mainBodyHeight: "",
			loadingSelect: false,
			stuList: [],
			timer: null,
			searchName: "",
			searchBox: {
				timeRange: [], //最近消息发送时间范围
				schoolId: "", //所选校区id
				schoolList: [], //校区列表
				stuName: "", //学员姓名
				allocType: "",
				jw_course_type: [],
				grade: "",
				jw_course_type_child: [],
				classCourse: "",
				classCourseList: [],
				isContact: ""
			},
			pageNo: 1,
			pageCounts: 0, //总数
			pageSize: 10,
			count: 0, //数据总数
			orderbyStatus: "2",
			columnsT: [
				{
					title: this.$t("classlist_compontents_detailinfo_34"),
					key: "code",
                    width:null,
                    resizable:true,
					// tooltip: true
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-word"
								}
							},
							params.row.code
						);
					}
				},
				{
					title: this.$t("classlist_compontents_detailinfo_35"),
					key: "name",
                    width:null,
                    resizable:true,
					// tooltip: true
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-word"
								}
							},
							params.row.name
						);
					}
				},

				{
					title: this.$t("classlist_compontents_detailinfo_36"),
					key: "enName",
                    width:null,
                    resizable:true,
					// tooltip: true
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-word"
								}
							},
							params.row.enName
						);
					}
				},
				{
					title: this.$t("messagemanagement_index_352"),
					key: "officeName",
                    width:null,
                    resizable:true,
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-word"
								}
							},
							params.row.officeName
						);
					}
				},
				{
					title: this.$t("messagemanagement_index_353"),
					key: "lastMessageDate",
                    width:null,
                    resizable:true,
					// tooltip: true,
					sortable: "custom",
					sortType: "desc",
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-word"
								}
							},
							params.row.lastMessageDate
						);
					}
				},
				{
					title: this.$t("messagemanagement_index_354"),
					key: "typeName",
                    width:null,
                    resizable:true,
					// render: (h, params) => {
					//     return h('span', params.row.typeName.toUpperCase())
					// }
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-word"
								}
							},
							params.row.typeName
						);
					}
				},
				{
					title: this.$t("messagemanagement_index_355"),
					key: "gradeName",
                    width:null,
                    resizable:true,
					// render: (h, params) => {
					//     return h('span', params.row.gradeName.toUpperCase())
					// }
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-word"
								}
							},
							params.row.gradeName
						);
					}
				},
				{
					title: this.$t("messagemanagement_index_356"),
					key: "joinClassNames",
                    width:null,
                    resizable:true,
					// tooltip: true,
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-word"
								}
							},
							params.row.joinClassNames
						);
					}
				},
				{
					title: this.$t("classlist_compontents_detailinfo_45"),
					key: "doAction",
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
									style: {
										"word-break": "break-word"
									},
									on: {
										click: () => {
											this.$router.push({
												name:
													"hootie.messageManagement.detail",
												query: {
													id: params.row.id,
													officeId:
														params.row.officeId
												}
											});
										}
									}
								},
								this.$t("messagemanagement_index_358")
							)
						]);
					}
				}
			],
			dataT: [],
			actualHeight: 0,
			uploadHeight: false //继续更新高度
		};
	},
	computed: {
		...mapState(["userInfo", "app","calendarConfig"]),
		_tableHeight() {
			// console.log('tableHeightOut:init = ' + this.tableHeightOut) // 搜索框的高度
			let hasPage = 65;
			// 计算出的表格内容最大的高度
			// 48 + 12为表格名称的高度
			// 16为margin-top的高度
			// 40为表头的高度
			let __maxHeight__ =
				this.mainBodyHeight -
				this.tableHeightOut -
				hasPage -
				48 -
				12 -
				16;
			let num =
				__maxHeight__ > this.actualHeight
					? ""
					: __maxHeight__ < 48 * this.dataT.length &&
					  __maxHeight__ < 48 * 6
					? 48 * 6
					: __maxHeight__;
			// console.log('_tableHeight:change = ' + __maxHeight__)
			return num;
		}
	},
	components: {
		vSearchCollapse
	},
	mounted() {
		this.getSchools();
		this.baseData();

		this.initMainBodyHeight();
		window.onresize = () => {
			this.initMainBodyHeight();
		};
		waitUntil(
			() => {
				this.actualHeightFun();
				return this.uploadHeight || !!this.actualHeight;
			},
			() => {
				// console.log(this.actualHeight)
			}
		);

		waitUntil(
			() => {
                if (this.app.currOfficeId == 'all') {
                    this.$set(this.searchBox, "schoolId", '');
                }else{
                    this.$set(this.searchBox, "schoolId", this.app.currOfficeId);
                }
				return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval)|| false;
			},
			() => {
				this.searchBox.timeRange = defaultDatePickerValue();
				this.options3 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
				this.searchInfo(true);
				this.getClassCourseByOfficeId()
			}
		);
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		setOptTime(flag){
			if(flag){
				this.searchBox.timeRange = []
			}
		},
		actualHeightFun() {
			// table实际渲染高度
			if (
				document.getElementById("bigTableMiddle") &&
				document
					.getElementById("bigTableMiddle")
					.getElementsByTagName("table") &&
				document
					.getElementById("bigTableMiddle")
					.getElementsByTagName("table").length &&
				document
					.getElementById("bigTableMiddle")
					.getElementsByTagName("table")[1].offsetHeight > 0
			) {
				this.actualHeight = document
					.getElementById("bigTableMiddle")
					.getElementsByTagName("table")[1].offsetHeight;
			}
			// console.log('actualHeight')
		},
		changeDivHeight(height) {
			this.tableHeightOut = height;
		},
		initMainBodyHeight() {
			// console.log(document.getElementById('mainBody').offsetHeight - 16 * 2)
			this.mainBodyHeight = document.body.offsetHeight - 104 - 16 * 2;
		},
		searchInfo(flag) {
			if (flag) this.pageNo = 1;
			let params = {
				startTime: this.searchBox.timeRange[0] ? new Date(this.searchBox.timeRange[0].format('yyyy-MM-dd 00:00:00')).getTime() : '',
				endTime: this.searchBox.timeRange[1] ? new Date(this.searchBox.timeRange[1].format('yyyy-MM-dd 23:59:59')).getTime() : '',
				officeId: this.searchBox.schoolId,
				// stuId: this.searchBox.stuName,
				name: this.searchBox.stuName,
				courseType: this.searchBox.allocType,
				courseGrade: this.searchBox.grade,
				classId: this.searchBox.classCourse,
				isContact: this.searchBox.isContact //是否以联系：isContact 0：否；1：是；
			};
			// console.log(params)
			this.getLists(params);
		},
		resetSearch() {
			for (let item in this.searchBox) {
				if (typeof this.searchBox[item] === "string") {
					this.searchBox[item] = "";
				}
			}
			this.searchBox.timeRange = defaultDatePickerValue();
            if (this.app.currOfficeId == 'all') {
                this.$set(this.searchBox, "schoolId", '');
            }else{
                this.$set(this.searchBox, "schoolId", this.app.currOfficeId);
            }
            console.log(this.searchBox)
			// this.searchBox.schoolId = this.app.currOfficeId || "";
			this.clearStuLists();
			this.searchInfo(true);
			this.getClassCourseByOfficeId()
		},
		sortTable(column) {
			// 修改排序
			// console.log(column)
			this.orderbyStatus = column.order == "asc" ? "1" : "2";
			this.searchInfo(true);
		},
		getLists(_params) {
			this.updateLoadingStatus({ isLoading: true });
			let params = Object.assign(
				{
					pageNumber: this.pageNo,
					pageSize: this.pageSize,
					orderByType: "lastMessageDate",
					orderByStatus: this.orderbyStatus // 2: 降序，1: 升序
				},
				_params
			);
			// console.log(params)
			jxStudent
				.listPage(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let _data = res.data.data;
						this.pageCounts = _data.totalPages;
						this.dataT = _data.content;
						this.uploadHeight = true;
						this.count = _data.totalElements;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},

		//改变页码
		pageChange(page) {
			this.pageNo = page;
			this.searchInfo();
		},
		// 改变table单页显示数
		sizeChange(size) {
			this.pageSize = size;
			this.searchInfo();
		},
		getSchools() {
			sysUser
				.dataScopeFilter()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.searchBox.schoolList = res.data.data;
					} else {
						this.$Message.error(res.data.message);
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		baseData() {
			let types = "jw_course_type"; //,jw_course_grade' //课程包分类,适用年级
			sysDict
				.batchListData({
					types
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.searchBox.jw_course_type =
							res.data.data.jw_course_type;
						// this.jw_course_grade = res.data.data.jw_course_grade
					}
				})
				.catch(errors.call(this));

			let type = "jw_course_type";
			sysDict
				.findChildDictByParentDict({
					type
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.searchBox.jw_course_type_child = res.data.data;
					}
				})
				.catch(errors.call(this));
		},
		changeType() {
			this.searchBox.grade = "";
		},
		getClassCourseByOfficeId() {
			if (!this.searchBox.schoolId) return;
			this.searchBox.classCourse = ''
			jxClassCourse
				.listByOfficeId({
					officeId: this.searchBox.schoolId
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.searchBox.classCourseList = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		remoteMethod(query) {
			// 名字不为空，发起查询，查询重名
			// console.log(query)
			if (query !== "") {
				// obj.phone = obj.phone.replace(/(^\s*)|(\s*$)/g, '').toString();
				this.searchName = query;
				this.loadingSelect = true;
				this.debounce();
			} else {
				this.searchName = "";
				this.searchBox.stuName = "";
				this.stuList = [];
			}
		},
		debounce() {
			// 防抖 500ms内没有输入文字，才开始查询，防止多次发起请求
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
			this.timer = setTimeout(() => {
				this.searchStudent(this.searchName);
			}, 1000);
		},
		searchStudent(str) {
			this.loadingSelect = true;
			// console.log(str)
			let params = {
				name: str,
				pageSize: 20
			};
			jxStudent
				.listIdNameByName(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						// let _data = res.data.data;
						// console.log(_data)
						this.loadingSelect = false;
						this.stuList = res.data.data;
						// console.log(this.stuList)
					}
				})
				.catch(errors.call(this));
		},
		clearStuLists() {
			this.searchName = "";
			this.searchBox.stuName = "";
			this.stuList = [];
		}
	},
	watch: {
		"app.currOfficeId": function(val, oldVal) {
            if(oldVal && this.$route.name == 'hootie.messageManagement') {
                if (this.app.currOfficeId == 'all') {
                    this.$set(this.searchBox, "schoolId", '');
                }else{
                    this.$set(this.searchBox, "schoolId", this.app.currOfficeId);
                }
                this.searchInfo(true);
                this.getClassCourseByOfficeId()
                this.searchBox.classCourse = ''
            }
		}
	}
};
</script>
