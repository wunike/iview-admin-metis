<style lang="less">
.member-list-container {
	height: 100%;
	width: 100%;
	.ivu-table-cell {
		padding-left: 10px;
		padding-right: 10px;
	}
	.ivu-tabs {
		background: #fff;
		padding-top: 20px;
	}
	.tableNamespan {
		color: #999;
		font-size: 14px;
		font-family: HiraginoSansGB-W3;
		font-weight: normal;
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
}
</style>

<template>
	<div class="member-list-container">
		<modify ref="modifyRef" @emitGetListData="emitGetListData"></modify>
		<vSearchCollapse @search="searchInfo" @reset="resetSearch" @changeDivHeight="changeDivHeight">
			<DatePicker
				ref="DatePicker"
				:options="options3"
				split-panels
				@on-open-change="setOptTime"
				clearable
				type="daterange"
				v-model="registerDate"
				format="yyyy-MM-dd"
				:placeholder="$t('memberlist_memberlist_259')"
				style="width:224px;margin-right:12px;"
			></DatePicker>
			<DatePicker
				ref="DatePicker1"
				:options="options31"
				split-panels
				@on-open-change="setOptTime1"
				clearable
				type="daterange"
				v-model="loginDate"
				format="yyyy-MM-dd"
				:placeholder="$t('memberlist_memberlist_263')"
				style="width:224px;margin-right:12px;"
			></DatePicker>
			<Select
				v-show="!tabName"
				:placeholder="$t('courselist_courselist_225')"
				v-model="findObj.officeId"
				style="width:224px;margin-right:12px;"
				clearable
			>
				<Option
					v-for="item in roomAreaList"
					:value="item.id"
					:key="item.id"
				>{{item.code}}{{ item.name }}</Option>
			</Select>
			<Input
				v-model="findObj.name"
				:placeholder="$t('memberlist_memberlist_257')"
				style="width: 140px;margin-right:12px;"
			/>
			<Select
				:placeholder="$t('memberlist_memberlist_258')"
				v-model="findObj.bindFlag"
				clearable
				style="width:140px;margin-right:12px;"
			>
				<Option v-for="item in bindFlagList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			<!-- <Select
        :placeholder="$t('memberlist_memberlist_260')"
        v-model="findObj.isSynPhoto"
        clearable
        style="width:140px;margin-right:12px;"
      >
        <Option
          v-for="item in isSynPhotoList"
          :value="item.value"
          :key="item.value"
        >{{ item.label }}</Option>
			</Select>-->
			<!-- <Select
        :placeholder="$t('memberlist_memberlist_261')"
        v-model="findObj.isPhotoUpload"
        clearable
        style="width:140px;margin-right:12px;"
      >
        <Option
          v-for="item in isPhotoUploadList"
          :value="item.value"
          :key="item.value"
        >{{ item.label }}</Option>
			</Select>-->
			<Input
				v-model="findObj.phone"
				:placeholder="$t('classlist_compontents_detailinfo_37')"
				style="width: 140px;margin-right:12px;"
				@on-keyup="RemoveSpace()"
			/>
			<Input
				v-model="findObj.courseItemNames"
				:placeholder="$t('memberlist_memberlist_264')"
				style="width: 140px;margin-right:12px;"
			/>
			<Input
				v-model="findObj.classNames"
				:placeholder="$t('memberlist_memberlist_265')"
				style="width: 140px;margin-right:12px;"
			/>
			<!-- <DatePicker
        clearable
        type="daterange"
        v-model="releaseDate"
        @on-change="releaseDateChange"
        format="yyyy-MM-dd"
        :placeholder="$t('memberlist_memberlist_266')"
        style="width:224px;margin-right:12px;"
			></DatePicker>-->
		</vSearchCollapse>
		<big-table
			v-if="defaultShowCol"
			class="mytable"
			:tableHeightOut="__tableHeightOut__"
			:tableData="tableData"
			:btnList="btnList"
			:pageNo="pageNo"
			:updateShowTitleKey="updateShowTitleKey"
			:tableColumnArray="tableColumnArray"
			:defaultShowCol="defaultShowCol"
			:canSelection="canSelection"
			:updateShowTitleMethod="updateShowTitle"
			:dataTotal="dataTotal"
			@resetDefault="resetDefaultCol"
			@selectionChange="selectTableItem"
			@pageChange="pageChange"
			@sortChange="sortChange"
		>
			<div slot="tableNameSlot">
				{{tabName? $t('classlist_classlist_2'): $t('hootie.memberList')}}
				<span
					class="tableNamespan"
					v-if="tabName"
				>{{"(" + $t('mycourse_mycourse_372') + ":"+$route.query.myClassName+")"}}</span>
			</div>
		</big-table>
	</div>
</template>

<script>
import vSearchCollapse from "@public/modules/vSearchCollapse";
import bigTable from "@public/modules/bigTable.vue";
import modify from "./compontents/modify";
import { mapMutations, mapState } from "vuex";
import valid, { errors, sysUser, jxStudent } from "../../libs/request";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
export default {
	name: "hootie.memberList",
	props: ["tabName"],
	data() {
		return {
			options3: null,
			options31: null,
			canSelection: true,
			tableHeightOut: 72, //324,
			orderByStatus: 2,
			orderByType: "",
			// tabParams: false,
			// TabPaneChangeVal: "name1",
			updateShowTitleKey: "jxStudent",
			sortObj: {},
			loginDate: [],
			registerDate: [],
			// releaseDate: [],
			findObj: {
				officeId: "", //校区id
				name: "", //姓名
				bindFlag: "",

				// isPhotoUpload: "",
				// isSynPhoto: "",
				phone: "",
				classNames: "",
				courseItemNames: ""
			},
			bindFlagList: [
				// 0：未绑定；1：已绑定；2：已解绑
				{
					value: "0",
					label: this.$t("memberlist_1")
				},
				{
					value: "1",
					label: this.$t("memberlist_2")
				}
				// {
				//   value: "2",
				//   label: "已解绑"
				// }
			],
			// isPhotoUploadList: [
			//   {
			//     value: "0",
			//     label: "未上传"
			//   },
			//   {
			//     value: "1",
			//     label: "已上传"
			//   }
			// ],
			// isSynPhotoList: [
			//   {
			//     value: "0",
			//     label: "未添加"
			//   },
			//   {
			//     value: "1",
			//     label: "已添加"
			//   }
			// ],
			// tableTitle: this.$t('hootie.memberList'),
			roomAreaList: [],
			teacherList: [],
			assistList: [],
			classTeacherList: [],

			updateShowTitle: jxStudent.updateShowTitle,
			defaultShowCol: null,
			exportMethod: sysUser.exportData,
			btnList: [
				// {
				//   style: {},
				//   type: "",
				//   btnClick: this.uploadLogo,
				//   text: "上传头像到教务"
				// },
				{
					style: {},
					type: "",
					btnClick: this.showImport,
					text: this.$t("memberlist_4")
				}
			],
			btnListClone: [
				// {
				//   style: {},
				//   type: "",
				//   btnClick: this.uploadLogo,
				//   text: "上传头像到教务"
				// },
				{
					style: {},
					type: "",
					btnClick: this.showImport,
					text: this.$t("memberlist_4")
				}
			],
			selectedIds: [], //选中的ids
			currentIds: [], //当前页的ids
			pageNo: 1,
			dataTotal: 0, //总数
			pageSize: this.$store.state.app.pageSizeGlobal,
			tableColumnArray: [
				{
					key: "code",
					minWidth: 65
				},
				{
					key: "enName",
					render(h, params) {
						return h("div", {}, params.row.enName);
					}
				},
				{
					key: "officeName"
					// minWidth: 140
				},
				{
					key: "bindFlag"
					//width: 70
				},
				{
					key: "phone",
					minWidth: 65,
					render(h, params) {
						return h("div", {}, params.row.phone);
					},
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
					key: "signCourseNames"
					//minWidth: 70
				},
				{
					key: "joinClassNames"
					//minWidth:70
				},
				{
					key: "photoPath",
					render(h, params) {
						return h(
							"div",
							{},
							params.row.photoPath
								? this.$t("memberlist_15")
								: this.$t("memberlist_16")
						);
					}
				},
				{
					key: "isSyncPhoto",
					render(h, params) {
						return h(
							"div",
							{},
							params.row.isSyncPhoto == true
								? this.$t("memberlist_18")
								: this.$t("memberlist_19")
						);
					}
				},
				{
					key: "typeName"
				},
				{
					key: "gradeName"
				},
				{
					key: "registerDate",
					sortable: 'custom',
					minWidth: 86,
					render: (h, params) => {
						return h(
							"div",
							{},
							params.row.registerDate
								? params.row.registerDate
								: "/"
						);
					}
				},
				{
					key: "loginDate",
					//width: 110,
					minWidth: 86,
					sortable: 'custom',
					render: (h, params) => {
						return h(
							"div",
							{},
							params.row.loginDate ? params.row.loginDate : "/"
						);
					}
				},
				{
					key: "releaseDate",
					minWidth: 86,
					render: (h, params) => {
						return h(
							"div",
							{},
							params.row.releaseDate
								? params.row.releaseDate
								: "/"
						);
					}
				},
				{
					title: this.$t("classlist_compontents_detailinfo_45"),
					key: "doAction",
					minWidth: 60,
					render: (h, params) => {
						return h("div", [
							h(
								"a",
								{
									style: {
										"word-break": "break-word"
									},
									props: {
										status: status
									},
									on: {
										click: () => {
											this.$refs.modifyRef.modifyRefShowMethods(
												params.row
											);
										}
									}
								},
								this.$t("memberlist_compontents_modify_237")
							)
						]);
						// }
					}
				}
			],
			tableColumnArray1: [],
			tableData: [],
			LastColumn: {},
			// findList: true
		};
	},
	components: {
		vSearchCollapse,
		bigTable,
		modify
	},
	computed: {
		...mapState(["userInfo", "app", "calendarConfig"]),
		__tableHeightOut__() {
			// console.log(this.tableHeightOut)
			let add = this.tabName ? 57 : 0;
			let num = this.tableHeightOut;
			return num + add;
		}
	},
	mounted() {
		if(this.$route.name != 'hootie.memberList'){
			this.registerDate = []	
			this.options3 = null
			this.options31 = null
		}
		if (!this.tabName) {
			this.tableColumnArray1 = [].concat(this.tableColumnArray);
			this.getShowTitle();
			this.getDrowList();
		}
		// this.getPeopleList(9);
		// this.getPeopleList(10);
		// this.getPeopleList(6);
		// this.TabFn();
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		resetDefaultCol(){
			this.updateLoadingStatus({ isLoading: true });
            jxStudent.clearShowField({
                pageIdentifier: "jxStudent",
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.getShowTitle(true);
                } else {
                    this.updateLoadingStatus({ isLoading: false });
                }
            })
            .catch(errors.call(this))
            .finally(() => {

            });
        },
		setOptTime(flag){
			if(flag){
				this.registerDate = []
			}
		},
		setOptTime1(flag){
			if(flag){
				this.loginDate = []
			}
		},
		TabPaneChange() {
			if (this.tabName) {
				this.btnList = [];
				this.tableColumnArray.pop();
				this.canSelection = false;
			} else {
				this.canSelection = true;
				this.btnList = [].concat(this.btnListClone);
				this.tableColumnArray = [].concat(this.tableColumnArray1);
			}
			this.getListData();
			this.getShowTitle();
		},
		changeDivHeight(height) {
			this.tableHeightOut = height;
		},
		sortChange(val) {
			this.sortObj=val;
			// debugger;
			// this.orderByType = val.key;
			// if (val.order == "asc") {
			// 	//升序
			// 	this.orderByStatus = 1;
			// } else {
			// 	//desc 降序
			// 	this.orderByStatus = 2;
			// }
			this.getListData();
		},
		emitGetListData() {
			this.getListData();
		},
		//不是数字就清空数据
		numArea(value) {
			var patt1 = new RegExp(/^[0-9]{0,}$/);
			return patt1.test(value);
		},
		RemoveSpace(val) {
			if (!this.numArea(this.findObj.phone)) {
				this.findObj.phone = parseInt(this.findObj.phone)
					? parseInt(this.findObj.phone)
					: "";
			}
		},
		getShowTitle(closeLoad) {
			jxStudent
				.getShowTitle({
					pageIdentifier: "jxStudent",
					voName: "JxStudentVO",
					lang: this.$i18n.locale
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.defaultShowCol = res.data.data;
						if (this.$route.query.from == "classList" && !closeLoad) {
							this.btnList = [];
							this.tableColumnArray.pop();
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
                    if(closeLoad){
                        this.updateLoadingStatus({ isLoading: false });
                    }
                });
		},

		getDrowList() {
			//校区列表
			sysUser
				.dataScopeFilter()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.roomAreaList = res.data.data;
						waitUntil(
							() => {
                                if (this.app.currOfficeId == 'all') {
                                    this.$set(this.findObj, "officeId", '');
                                }else{
                                    this.$set(this.findObj, "officeId", this.app.currOfficeId);
                                }
								return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval )|| false;
							},
							() => {
								if(this.$route.name == 'hootie.memberList'){
									this.registerDate = defaultDatePickerValue();
									this.options3 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
									this.options31 = DatePickerOpt(this,'DatePicker1',Number(this.calendarConfig.maxMonthInterval));
								} 
								this.getListData();
							}
						);
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					// this.updateLoadingStatus({ isLoading: false });
				});
		},
		//获取数据，根据情况修改接口、传参
		getListData() {
			this.updateLoadingStatus({ isLoading: true });
			let param = {
				pageNumber: this.pageNo,
				pageSize: this.pageSize,
				// orderByType: this.orderByType,
				// orderByStatus: this.orderByStatus
			};
			this.$route.name=='hootie.classList'
				? (param.classId = this.$route.query.id)
				: "";
			if (this.sortObj.order != "normal" && this.sortObj.key) {
				param.orderByType = this.sortObj.key;
				param.orderByStatus = this.sortObj.order == "asc" ? "1" : "2";
			}
			this.findObj.registerDateStart = this.registerDate[0]
			? new Date(this.registerDate[0].format('yyyy-MM-dd 00:00:00')).getTime()
			: "";
			this.findObj.registerDateEnd = this.registerDate[1]
			? new Date(this.registerDate[1].format('yyyy-MM-dd 23:59:59')).getTime()
			: "";
			this.findObj.loginDateStart = this.loginDate[0]
			? new Date(this.loginDate[0].format('yyyy-MM-dd 00:00:00')).getTime()
			: "";
			this.findObj.loginDateEnd = this.loginDate[1]
			? new Date(this.loginDate[1].format('yyyy-MM-dd 23:59:59')).getTime()
			: "";
			param = Object.assign({}, param, this.findObj);
			this.$route.name=='hootie.classList'
			? param.officeId = this.app.currOfficeId:'';
			jxStudent
				.listPage(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data.content;
						this.tableData = result;
						this.dataTotal = res.data.data.totalElements;
						//合并列表的 机构
						let ids = this.roomAreaList.map(item => {
							return item.id;
						});
						// console.log(ids)
						if (
							res.data.data.selfOffices &&
							res.data.data.selfOffices.length
						) {
							res.data.data.selfOffices.forEach(item => {
								if (ids.indexOf(item.id) < 0) {
									this.roomAreaList.push(item);
								}
							});
							// console.log(this.roomAreaList.length)
						}
						this.roomAreaList.sort(function(a, b) {
							return a.sort - b.sort;
						});
						// console.log(this.roomAreaList)
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		getPeopleList(roleId, query) {
			/* if(!this.findeObj.officeId){
        this.$Message.error('请先选择所属校区');
        return 
      } */
			let param = {
				roleId
				/*  pageSize: 0,
        pageNo: 1,
        isService: 1,
        isEnable: 1,
        officeId: this.findeObj.officeId,
        name: query */
			};
			sysUser
				.userListRoleUser(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						if (roleId == 9) {
							// 授课教师
							this.teacherList = res.data.data.list;
						}
						if (roleId == 10) {
							// 授课助教
							this.assistList = res.data.data.list;
						}
						if (roleId == 6) {
							// 服务oo
							this.classTeacherList = res.data.data.list;
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
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
		searchInfo() {
			// this.findList = true;
			this.pageNo = 1;
			this.getListData();
		},
		resetSearch() {
			// debugger;
			for (let item in this.findObj) {
				if (typeof this.findObj[item] === "string") {
					this.findObj[item] = "";
				}
			}
			this.loginDate = [];
			if(this.$route.name == 'hootie.memberList'){
				this.registerDate = defaultDatePickerValue();
			} else {
				this.registerDate = [];
			}

			this.pageNo = 1;
            if (this.app.currOfficeId == 'all') {
                this.$set(this.findObj, "officeId", '');
            }else{
                this.$set(this.findObj, "officeId", this.app.currOfficeId);
            }
            this.getListData();
		},
		getLists() {
			this.updateLoadingStatus({ isLoading: true });
			let params = {};
			common
				.listPage(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let list = res.data.data.list;
						let listD1 = []; //有效
						let listD2 = []; //无效

						for (let i in list) {
							if (list[i].isEnable === "0") {
								listD2.push(list[i]);
							} else if (list[i].isEnable === "1") {
								listD1.push(list[i]);
							}
						}
						this.data = listD1;
						this.data1 = listD2;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		showImport() {
			this.$router.push({ name: "hootie.jxStudentImport" });
		},
		uploadLogo() {},
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
	watch: {
		"app.currOfficeId": function(val, oldVal) {
		    if(oldVal && this.$route.name == 'hootie.memberList'){
                if (this.app.currOfficeId == 'all') {
                    this.$set(this.findObj, "officeId", '');
                }else{
                    this.$set(this.findObj, "officeId", this.app.currOfficeId);
                }
                this.getListData();
            }

		}
	}
};
</script>
 