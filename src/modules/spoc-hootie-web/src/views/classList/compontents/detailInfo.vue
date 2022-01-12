<style lang="less">
// .studentStyle {
//   .ivu-Table-body {
//     max-height: 160px;
//     overflow-y: scroll;
//   }
// }
.checkStyle {
	background: #fff;
	border-radius: 4px;
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
		// background: #fff;
		// border-radius: 4px;
		// padding: 20px 32px;
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
			width="1000"
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
							{{$t('classlist_compontents_detailinfo_25')}}
							<span>{{InfoObj.stuProportion}}</span>
						</span>
					</div>
				</div>
			</div>
			<div class="studentStyle">
				<div style="display:flex;justify-content:flex-end;margin-bottom:8px;margin-top:20px;">
					<div>
						<Checkbox
							v-model="single"
							@on-change="singleChange"
							style="margin-right:0px;"
						>{{$t('classlist_compontents_detailinfo_26')}}</Checkbox>
					</div>
				</div>
				<Table :columns="tableColumnArray" :data="tableData" border  max-height="260"></Table>
			</div>
			<div slot="footer" class="modiRoomTip"></div>
		</Modal>
	</div>
</template>
<script>
import { mapMutations } from "vuex";
import valid, { errors, sysUser, jxLesson } from "../../../libs/request";
import bigTable from "@public/modules/bigTable.vue";
export default {
	components: { bigTable },
	mounted() {},
	computed: {
		startTime: function() {
			if (!this.InfoObj.startTime) {
				return;
			}
			let a = this.InfoObj.startTime;
			let b = this.InfoObj.endTime;
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
				a.substr(-5) +
				"-" +
				b.substr(-5)
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
					title: this.$t("classlist_compontents_detailinfo_34"),
					key: "code",
					// minWidth: 150,
                    width:null,
                    resizable:true,
					// fixed: "left",
					tooltip: true
				},

				{
					title: this.$t("classlist_compontents_detailinfo_35"),
					key: "name",
					// minWidth: 100,
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
					// minWidth: 150,
                    width:null,
                    resizable:true,
					tooltip: true
				},
				{
					title: this.$t("classlist_compontents_detailinfo_38"),
					key: "bindFlag",
					// minWidth: 100,
					tooltip: true,
                    width:null,
                    resizable:true,
					render(h, params) {
						alert(params.row.bindFlag);
						let status;
						// 0：未绑定；1：已绑定；2：已解绑
						if (params.row.bindFlag == 0) {
							status = this.$t(
								"classlist_compontents_detailinfo_39"
							);
						} else if (params.row.bindFlag == 1) {
							status = this.$t(
								"classlist_compontents_detailinfo_40"
							);
						} else if (params.row.bindFlag == 2) {
							status = this.$t(
								"classlist_compontents_detailinfo_41"
							);
						}
						return h("div", {}, status);
					}
				},
				{
					title: this.$t("classlist_compontents_detailinfo_42"),
					key: "attendanceFlag",
					// minWidth: 100,
                    width:null,
                    resizable:true,
					tooltip: true
				},
				{
					title: this.$t("classlist_compontents_detailinfo_43"),
					key: "attendanceByName",
					// minWidth: 100,
                    width:null,
                    resizable:true,
					tooltip: true,
					render: (h, params) => {
						return h(
							"div",
							{},
							params.row.registerDate
								? params.row.attendanceByName
								: "/"
						);
					}
				},
				{
					title: this.$t("classlist_compontents_detailinfo_44"),
					key: "attendanceDate",
					// minWidth: 120,
					tooltip: true,
                    width:null,
                    resizable:true,
					render: (h, params) => {
						return h(
							"div",
							{},
							params.row.registerDate
								? params.row.attendanceDate
								: "/"
						);
					}
				},
				{
					title: this.$t("classlist_compontents_detailinfo_45"),
					key: "doAction",
					width: 60,
					fixed: "right",
					render: (h, params) => {
						return h("div", [
							h(
								"a",
								{
									style: {
										color:
											params.row.delFlag == 1
												? "#ccc"
												: ""
									},
									on: {
										click: () => {
											if (params.row.delFlag == 0) {
												this.deleteFn(
													params.row.studentId
												);
											}
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
			saveTableData: []
		};
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		deleteFn(studentId) {
			jxLesson
				.deleteStudent({
					studentId: studentId,
					lessonId: this.InfoObj.id
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.detailForm(this.rowData);
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
			jxLesson
				.listExpectStudents({ classId: row.classId, lessonId: row.id })
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data;
						this.tableData = result;
						this.saveTableData = result;
						// this.dataTotal = res.data.data.totalPages;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		detailInfoRefShowMethods(val) {
			this.trurNumberShow = true;
			this.rowData = val;
			this.detailForm(val);
		},
		singleChange(val) {
			//debugger;
			this.single = val;
			let b = JSON.parse(JSON.stringify(this.saveTableData));
			if (this.single) {
				let a = b.filter(item => {
					return item.delFlag == 1;
				});
				this.tableData = a;
			} else {
				this.tableData = this.saveTableData;
			}
		}
	}
};
</script>