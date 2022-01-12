<style lang="less">
// .studentStyle {
//   .ivu-table-body {
//     max-height: 160px;
//     overflow-y: scroll;
//   }
// }
.checkStyle {
	background: #fff;
	border-radius: 4px;
	margin-top: -6px;
	.title {
		display: flex;
		// justify-content: center;
		align-items: center;
		padding-top: 20px;
		padding-left: 32px;
		> span {
			font-size: 20px;
			font-family: PingFangSC-Medium;
			font-weight: 500;
			color: rgba(73, 80, 96, 1);
		}
	}
	.classDetail {
		display: flex;
		margin-bottom: 14px;
		padding: 0px 16px;
		.classDetailRow {
			flex: 1;
			display: flex;
			flex-direction: column;
			> span {
				font-size: 14px;
				font-family: HiraginoSansGB-W3;
				font-weight: normal;
				color: rgba(153, 153, 153, 1);
				> span {
					color: #495060;
				}
			}
			> span:nth-child(2) {
				margin: 10px 0px;
			}
		}
	}
}
</style>
<template>
	<div>
		<Modal
			:mask-closable="false"
			v-model="trurNumberShow"
			class-name="classShow"
			:title="$t('classlist_compontents_detailinfo_15')"
			width="1100"
			:styles="{top: '20px'}"
		>
			<div class="checkStyle">
				<div class="classDetail">
					<div class="classDetailRow">
						<span>
							{{$t('classlist_compontents_detailinfo_16')}}
							<span>{{InfoObj.className}}</span>
						</span>
						<span>
							{{$t('classlist_compontents_detailinfo_17')}}
							<span>{{InfoObj.officeName}}</span>
						</span>
						<span>
							{{$t('classlist_compontents_detailinfo_18')}}
							<span>{{InfoObj.classroomName}}</span>
						</span>
					</div>
					<div class="classDetailRow">
						<span>
							{{$t('classlist_compontents_detailinfo_19')}}
							<!-- <span>{{InfoObj.startTime.substr(0,10)+$t("classlist_compontents_detailinfo_20")+new Date(InfoObj.startTime.substr(0,10)).getDay()+")  "+InfoObj.startTime.substr(-8,5)+'-'+InfoObj.endTime.substr(-8,5)}}</span> -->
							<span>{{startTime}}</span>
						</span>
						<span>
							{{$t('classlist_compontents_detailinfo_21')}}
							<span>{{InfoObj.teacherName}}</span>
						</span>
						<span>
							{{$t('classlist_compontents_detailinfo_22')}}
							<span>{{InfoObj.classTeacherName}}</span>
						</span>
					</div>
					<div class="classDetailRow">
						<span>
							{{$t('classlist_compontents_detailinfo_23')}}
							<span>{{InfoObj.classCode}}</span>
						</span>
						<span>
							{{$t('classlist_compontents_detailinfo_24')}}
							<span>{{InfoObj.assistName}}</span>
						</span>
						<span>
							{{$t('courselist_compontents_detailinfo_151')}}
							<span>{{InfoObj.stuProportion}}</span>
						</span>
					</div>
				</div>
			</div>
			<div class="studentStyle">
				<div style="display:flex;justify-content:flex-end;margin-bottom:8px;">
					<div>
						<Checkbox
							v-model="single"
							@on-change="singleChange"
							style="margin-right:0px;"
						>{{$t('classlist_compontents_detailinfo_26')}}</Checkbox>
					</div>
				</div>
				<Table v-if="trurNumberShow" :columns="tableColumnArray" border :data="tableData" max-height="260"></Table>
			</div>
			<div slot="footer" class="modiRoomTip"></div>
		</Modal>
	</div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import valid, { errors, sysUser, jxLesson } from "../../../libs/request";
import bigTable from "@public/modules/bigTable.vue";
export default {
	components: { bigTable },
	mounted() {},
	computed: {
		...mapState(["userInfo", "app"]),
		startTime: function() {
			if (!this.InfoObj.startTime) {
				return;
			}
			let a = this.InfoObj.lessonDate.replace(/\//g, "-");
			let b = this.InfoObj.lessonTime.split("-");
			let text = "";
			if (new Date(a.substr(0, 10)).getDay() == 0) {
				text = this.$t("classlist_compontents_detailinfo_27");
			} else if (new Date(a.substr(0, 10)).getDay() == 1) {
				text = this.$t("classlist_compontents_detailinfo_28");
			} else if (new Date(a.substr(0, 10)).getDay() == 2) {
				text = this.$t("classlist_compontents_detailinfo_29");
			} else if (new Date(a.substr(0, 10)).getDay() == 3) {
				text = this.$t("classlist_compontents_detailinfo_30");
			} else if (new Date(a.substr(0, 10)).getDay() == 4) {
				text = this.$t("classlist_compontents_detailinfo_31");
			} else if (new Date(a.substr(0, 10)).getDay() == 5) {
				text = this.$t("classlist_compontents_detailinfo_32");
			} else if (new Date(a.substr(0, 10)).getDay() == 6) {
				text = this.$t("classlist_compontents_detailinfo_33");
			}
			return (
				a.substr(0, 10) +
				this.$t("classlist_compontents_detailinfo_20") +
				text +
				")  " +
				b[0] +
				"-" +
				b[1]
			);
		}
	},
	data() {
		return {
			// startTime:'',
			rowData: "",
			InfoObj: {},
			single: false,
			trurNumberShow: false,
			tableColumnArray: [
				{
					title: this.$t("courselist_compontents_detailinfo_160"),
					key: "order",
                    width:null,
                    resizable:true,
					tooltip: true
				},
				{
					title: this.$t("classlist_compontents_detailinfo_34"),
					key: "code",
                    width:null,
                    resizable:true,
					// fixed: "left",
					tooltip: true
				},

				{
					title: this.$t("classlist_compontents_detailinfo_35"),
					key: "name",
                    width:null,
                    resizable:true,
					tooltip: true
				},
				{
					title: this.$t("classlist_compontents_detailinfo_36"),
					key: "enName",
                    width:null,
                    resizable:true,
				},
				{
					title: this.$t("classlist_compontents_detailinfo_37"),
					key: "phone",
                    width:null,
                    resizable:true,
					tooltip: true
				},
				{
					title: this.$t("classlist_compontents_detailinfo_38"),
					key: "bindFlag",
                    width:null,
                    resizable:true,
					tooltip: true,
					render: (h, params) => {
						let status;
						// 0：未绑定；1：已绑定；2：已解绑
						if (params.row.bindFlag == 0) {
							status = this.$t(
								"courselist_compontents_detailinfo_166"
							);
						} else if (params.row.bindFlag == 1) {
							status = this.$t(
								"courselist_compontents_detailinfo_167"
							);
						} else if (params.row.bindFlag == 2) {
							status = this.$t(
								"courselist_compontents_detailinfo_168"
							);
						}
						return h("div", {}, status);
					}
				},
				{
					title: this.$t("classlist_compontents_detailinfo_42"),
					key: "attendanceFlag",
                    width:null,
                    resizable:true,
					tooltip: true
				},
				{
					title: this.$t("classlist_compontents_detailinfo_43"),
					key: "attendanceByName",
                    width:null,
                    resizable:true,
					tooltip: true,
					render: (h, params) => {
						return h(
							"div",
							{},
							params.row.attendanceByName
								? params.row.attendanceByName
								: "/"
						);
					}
				},
				{
					title: this.$t("classlist_compontents_detailinfo_44"),
					key: "attendanceDate",
                    width:null,
                    resizable:true,
					tooltip: true,
					render: (h, params) => {
						return h(
							"div",
							{},
							params.row.attendanceDate
								? params.row.attendanceDate
								: "/"
						);
					}
				},
				{
					title: this.$t("classlist_compontents_detailinfo_45"),
					key: "doAction",
					width: 80,
					// fixed: "right",
					render: (h, params) => {
						return h("div",[
								(this.userInfo.admin || this.userInfo.permissions.includes(
									"hootie:jxLesson:edit:delStu"
								)) && params.row.delFlag == 0 ? h(
								"a",
								{
									style:{
										display: 'inline-block',
										'min-width': '52px',
										color: this.rowData.updateFlag == 0 ? "#ccc" : ""
									},
									on: {
										click: () => {
											if (this.rowData.updateFlag != 0) {
												this.$Modal.confirm({
													title: this.$t(
														"courselist_compontents_detailinfo_173"
													),
													content:
														"<p>" +
														this.$t(
															"courselist_compontents_detailinfo_174"
														) +
														"</p>",
													onOk: () => {
														this.deleteFn(
															params.row.studentId,0
														);
													},
													onCancel: () => {}
												});
											}
										}
									}
								},
								this.$t("classlist_compontents_detailinfo_46")
							) : '',
							(this.userInfo.admin || this.userInfo.permissions.includes(
									"hootie:jxLesson:edit:delStuAll"
								)) && params.row.delFlag == 0 ? h(
								"a",
								{
									style:{
										display: 'inline-block',
										'min-width': '52px',
										color: this.rowData.updateFlag == 0 ? "#ccc" : ""
									},
									on: {
										click: () => {
											if (this.rowData.updateFlag != 0) {
												this.$Modal.confirm({
													title: this.$t(
														"courselist_compontents_detailinfo_173"
													),
													content:
														"<p>" +
														this.$t(
															"courselist_compontents_detailinfo_1741"
														) +
														"</p>",
													onOk: () => {
														this.deleteFn(
															params.row.studentId,1
														);
													},
													onCancel: () => {}
												});
											}
										}
									}
								},
								this.$t("courselist_compontents_detailinfo_1751")
							) : '',
							(this.userInfo.admin || this.userInfo.permissions.includes(
									"hootie:jxLesson:edit:recoveryStu"
								)) && params.row.delFlag == 1 ? h(
								"a",
								{
									style:{
										display: 'inline-block',
										'min-width': '52px',
										color: this.rowData.updateFlag == 0 ? "#ccc" : ""
									},
									on: {
										click: () => {
											if(this.rowData.updateFlag != 0){
												this.$Modal.confirm({
													title: this.$t(
														"courselist_compontents_detailinfo_1754"
													),
													content:
														"<p>" +
														this.$t(
															"courselist_compontents_detailinfo_1755"
														) +
														"</p>",
													onOk: () => {
														this.recoveryFn(
															params.row.studentId,0
														);
													},
													onCancel: () => {}
												});
											}
										}
									}
								},
								this.$t("courselist_compontents_detailinfo_1752")
							) : '',
							(this.userInfo.admin || this.userInfo.permissions.includes(
									"hootie:jxLesson:edit:recoveryStuAll"
								)) && params.row.delFlag == 1 ? h(
								"a",
								{
									style:{
										display: 'inline-block',
										'min-width': '52px',
										color: this.rowData.updateFlag == 0 ? "#ccc" : ""
									},
									on: {
										click: () => {
											if(this.rowData.updateFlag != 0){
												this.$Modal.confirm({
													title: this.$t(
														"courselist_compontents_detailinfo_1754"
													),
													content:
														"<p>" +
														this.$t(
															"courselist_compontents_detailinfo_1756"
														) +
														"</p>",
													onOk: () => {
														this.recoveryFn(
															params.row.studentId,1
														);
													},
													onCancel: () => {}
												});
											}
										}
									}
								},
								this.$t("courselist_compontents_detailinfo_1753")
							) : '',
						]);
					}
				}
			],
			tableData: [],
			saveTableData: []
		};
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		recoveryFn(studentId, type) {  //isAll（0：恢复一个；1:恢复所有）
			this.updateLoadingStatus({ isLoading: true });
			jxLesson
				.recoveryStudent({
					studentId: studentId,
					lessonId: this.InfoObj.id,
					isAll: type
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.detailForm(this.rowData);
						this.$emit("emitGetListData");
						this.InfoObj.stuProportion =
							this.InfoObj.stuProportion.split("/")[0] +
							"/" +
							--this.InfoObj.stuProportion.split("/")[1];
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		deleteFn(studentId, delType) {  // delType isAll（0：删除一个；1:删除所有）
			this.updateLoadingStatus({ isLoading: true });
			jxLesson
				.deleteStudent({
					studentId: studentId,
					lessonId: this.InfoObj.id,
					isAll: delType
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.detailForm(this.rowData);
						this.$emit("emitGetListData");
						this.InfoObj.stuProportion =
							this.InfoObj.stuProportion.split("/")[0] +
							"/" +
							--this.InfoObj.stuProportion.split("/")[1];
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		detailForm(row) {
			this.getTableList(row);
			this.InfoObj = row;
		},
		getTableList(row) {
			this.updateLoadingStatus({ isLoading: true });
			jxLesson
				.listExpectStudents({ classId: row.classId, lessonId: row.id })
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data;
						let a = 0;
						result.map(item => {
							item.order = ++a;
						});
						this.saveTableData = result;
						if(this.single){
							this.tableData =  result
						} else {
							this.tableData = [].concat(result).filter(item => {
								return item.delFlag != '1';
							});
						}
						// this.dataTotal = res.data.data.totalPages;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		detailInfoRefShowMethods(val) {
			this.single = false
			this.trurNumberShow = true;
			this.rowData = val;
			this.detailForm(val);
		},
		singleChange(val) {
			this.single = val;
			let b = JSON.parse(JSON.stringify(this.saveTableData));
			if (this.single) {
				this.tableData = this.saveTableData;
			} else {
				let a = b.filter(item => {
					return item.delFlag != '1';
				});
				this.tableData = a;
			}
		}
	}
};
</script>