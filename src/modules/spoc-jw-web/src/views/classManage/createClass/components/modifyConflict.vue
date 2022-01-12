<style lang="less">
.conflictShow {
	.ivu-modal-header {
		background: rgba(247, 248, 250, 1);
		border-radius: 4px 4px 0px 0px;
		.ivu-modal-header-inner {
			// font-size: 18px;
			font-family: PingFangSC-Medium;
			font-weight: 500;
			color: rgba(0, 0, 0, 0.85);
		}
	}
	.mainAll {
		margin-top: 20px;
		display: flex;
		> .mainAllBoth {
			flex: 1;
			// width: 471px;
			// height:299px;
			border: 1px solid rgba(212, 213, 218, 1);
			.title {
				height: 40px;
				padding-left: 12px;
				line-height: 40px;
				font-size: 14px;
				border-bottom: 1px solid rgba(212, 213, 218, 1);
			}
			.mainAllLeftContain {
				border-bottom: 1px solid #d4d5da;
				&:nth-last-child(1) {
					border-bottom: 0px solid #d4d5da;
				}
				margin-top: 20px;
				&.leftStyle {
					padding: 24px 0px;
					margin: 9px 16px 12px;
					background: rgba(255, 255, 255, 1);
					box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.14);
				}
				// margin-bottom: 66px;
				.mainAllLeftContainRow {
					display: flex;
					> div {
						flex: 1;
						display: flex;
					}
					> div:nth-child(2),
					> div:nth-child(1) {
						height: 22px;
						// background:green;
						line-height: 22px;
						margin-left: 12px;
						display: flex;
						align-items: center;
						> span:nth-child(1) {
							display: inline-block;
							width: 60px;
							text-align: right;
							margin-right: 8px;
							color: #999;
						}
						> span:nth-child(2) {
							.ivu-input,
							.ivu-select {
								width: 138px;
								height: 34px;
								// margin-top: -10px;
								color: #495060;
							}
						}
					}
					&:not(:first-child) {
						margin-top: 28px;
					}
					.conflict-red {
						border: 1px solid #ff3000;
						border-radius: 4px;
						.ivu-select-selection {
							border-color: transparent;
						}
					}
					&.dateRangeTime {
						.beginClassDate {
							.ivu-input-suffix {
								// top: 0px;
							}
						}
						.startTime {
							.ivu-input-suffix {
								// top: 0px;
								right: -20px;
							}
						}
						// .ivu-input-suffix {
						//   top: -10px;
						// }
					}
				}
				.modifyBtn {
					display: flex;
					margin: 39px 0 10px 0;
					justify-content: center;
					align-items: center;
				}
			}
		}
		.mainAllRight {
			margin-left: 10px;
			.mainAllLeftContainRow {
				// margin-top:26px !important;
				&:not(:first-child) {
					margin-top: 26px;
				}
				.ivu-input {
					height: 32px !important;
				}
			}
		}
	}
	.ivu-modal-footer {
		.ivu-btn-text {
			border: 1px solid #dcdee2;
			&:hover {
				border: 1px solid #57a3f3;
			}
		}
	}
}
</style>
<template>
	<div v-if="conflictShowTipBoo">
		<Modal
			v-model="conflictShowTipBoo"
			:mask-closable="false"
			class-name="conflictShow"
			:title="$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2582')"
			width="1050"
		>
			<div
				v-if="((rowData.teacherIdConflict)||(rowData.assistIdConflict)||(rowData.classTeacherIdConflict)||(rowData.classroomIdConflict))"
				style="background:rgba(242,243,247,1);padding:16px 22px;color:#E72B00"
			>
				<div style="font-size:14px;">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2583')}}</div>
				<div>
					<div style="margin:8px 0 0 0px;" v-if="rowData.teacherIdConflict">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2584')}} {{ rowData.teacherIdType == 1 ? $t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_25851') : $t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2585') }}
					</div>
					<div style="margin:8px 0 0 0px;" v-if="rowData.assistIdConflict">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2586')}} {{ rowData.assistIdType == 1 ? $t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_25851') : $t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2585') }}
					</div>
					<div style="margin:8px 0 0 0px;" v-if="rowData.classTeacherIdConflict">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2587')}} {{ rowData.classTeacherIdType == 1 ? $t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_25851') : $t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2585') }}
					</div>
					<div style="margin:8px 0 0 0px;" v-if="rowData.classroomIdConflict">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2588')}} {{ rowData.classroomIdType == 1 ? $t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_25851') : $t('scoretemplate_scoretemplate_558') }}
					</div>
					<!-- <div  style="margin:8px 0 0 0px;">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2590')}}</div> -->
				</div>
			</div>
			<!-- <Alert type="warning" show-icon v-if="AlertShow==1">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2591')}}</Alert> -->
			<Alert type="success" show-icon v-else>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2592')}}</Alert>
			<div class="mainAll">
				<div class="mainAllLeft mainAllBoth">
					<div class="title">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2593')}}</div>
					<div v-if="checkConflictData && checkConflictData.length" style="height:332px;overflow-y:scroll;padding-top:9px">
						<!-- <div style=""> -->
						<div
							class="mainAllLeftContain leftStyle"
							v-for="(item,index) in checkConflictData"
							:key="index"
							v-show="item.isConflict=='1'"
						>
							<div class="mainAllLeftContainRow">
								<div>
									<span>{{$t('classlist_compontents_detailinfo_16')}}</span>
									<span>{{item.classCourseName}}</span>
								</div>
								<div>
									<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2595')}}</span>
									<span>{{item.statusLabel}}</span>
								</div>
							</div>
							<div class="mainAllLeftContainRow">
								<div>
									<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2596')}}</span>
									<span>{{item.startDate}}</span>
								</div>
								<div>
									<span>{{$t('classlist_compontents_detailinfo_19')}}</span>
									<span>{{item.startTime}}</span>
								</div>
							</div>
							<div class="mainAllLeftContainRow">
								<div>
									<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2598')}}</span>
									<span>{{item.hours}}</span>
								</div>
								<div>
									<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2599')}}</span>
									<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2600', [item.duration])}}</span>
								</div>
							</div>
							<div class="mainAllLeftContainRow">
								<div>
									<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2601')}}</span>
									<span
										:style="{color:(item.conflictField=='teacherId'&&rowData.teacherIdConflict  ? '#E72B00' : '' )}"
									>{{item.teacherName}}</span>
								</div>
								<div>
									<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2602')}}</span>
									<!--  :class='rowData.teacherIdConflict ? "conflict-red" : ""' -->
									<span
										:style="{color:(item.conflictField=='assistId'&&rowData.assistIdConflict  ? '#E72B00' : '' )}"
									>{{item.assistName}}</span>
								</div>
							</div>

							<div class="mainAllLeftContainRow">
								<div>
									<span>{{$t('classlist_compontents_detailinfo_22')}}</span>
									<span
										:style="{color:(item.conflictField=='classTeacherId'&&rowData.classTeacherIdConflict ? '#E72B00' : '' )}"
									>{{item.classTeacherName}}</span>
								</div>
								<div>
									<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2604')}}</span>
									<!-- <span :style='{color:(classroomNameBool ? "#E72B00" : "" )}'>{{rowData.classroomName}}</span> -->
									<span
										:style="{color:(item.conflictField=='classroomId'&&rowData.classroomIdConflict ? '#E72B00' : '' )}"
									>{{item.classroomName}}</span>
								</div>
							</div>
							<!-- <div></div> -->
						</div>
					</div>
				</div>
				<div class="mainAllRight mainAllBoth">
					<div class="title">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2605')}}</div>
					<div class="mainAllLeftContain">
						<div class="mainAllLeftContainRow">
							<!--创建班课的时候这时候还没有这东西呢 -->
							<div>
								<span>{{$t('classlist_compontents_detailinfo_16')}}</span>
								<span>{{rowData.objectName}}</span>
							</div>
							<div>
								<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2595')}}</span>
								<span>{{rowData.statusName}}</span>
							</div>
						</div>
						<div class="mainAllLeftContainRow dateRangeTime">
							<div>
								<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2596')}}</span>
								<span>
									<DatePicker
										disabled
										v-model="rowData.startDate"
										format="yyyy-MM-dd"
										class="beginClassDate"
										type="date"
										:clearable="false"
										:editable="false"
										:placeholder="$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2606')"
										@on-change="startDateChange"
										style="display:block;"
									></DatePicker>
									<!-- </Col> -->
								</span>
							</div>
							<div>
								<span>{{$t('classlist_compontents_detailinfo_19')}}</span>
								<span>
									<!-- <Input></Input> -->
									<!-- <TimePicker format="HH:mm" placeholder="Select time" style="width: 112px"></TimePicker> -->
									<TimePicker
										disabled
										v-model="rowData.startTime"
										@on-change="startTimeChange"
										class="startTime"
										format="HH:mm"
										type="time"
										style="width:120px;"
										placement="bottom-end"
										:placeholder="$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_classruletable_2542')"
										:editable="false"
										:clearable="false"
									></TimePicker>
								</span>
							</div>
						</div>
						<div class="mainAllLeftContainRow">
							<div>
								<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2598')}}</span>
								<span>
                                    <!-- v-if="rowData && rowData.num && rowData.num.length" -->
									<Select v-model="rowData.hours" disabled>
										<Option
											v-show="item>0"
											v-for="item in rowData.num"
											:value="''+item"
											:key="item"
										>{{ item }}</Option>
									</Select>
								</span>
							</div>
							<div>
								<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2599')}}</span>
								<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2600', [rowData.duration])}}</span>
							</div>
						</div>

						<div class="mainAllLeftContainRow">
							<div>
								<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2601')}}</span>
								<span>
									<Select
										v-if="teacherList && teacherList.length"
										:disabled="rowData.teacherIdType?false:true"
										:label-in-value="true"
										:placeholder="rowData1.teacherName"
										:class="rowData.teacherIdConflict ? 'conflict-red' : ''"
										v-model="rowData.teacherId"
										@on-change="teacherNameChange"
									>
										<Option v-for="item in teacherList" :value="item.id" v-show="item.id!=rowData1.teacherId" :key="item.id">{{ item.name }}</Option>
									</Select>
								</span>
							</div>
							<div>
								<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2602')}}</span>
								<span>
									<Select
									v-if="assistList && assistList.length"
										:disabled="rowData.assistIdType?false:true"
										:label-in-value="true"
										:placeholder="rowData1.assistName"
										:class="rowData.assistIdConflict ? 'conflict-red' : ''"
										v-model="rowData.assistId"
										@on-change="assistNameChange"
									>
										<Option v-for="item in assistList" :value="item.id" v-show="item.id!=rowData1.assistId" :key="item.id">{{ item.name }}</Option>
									</Select>
								</span>
							</div>
						</div>
						<div class="mainAllLeftContainRow">
							<div>
								<span>{{$t('classlist_compontents_detailinfo_22')}}</span>
								<span>
									<Select
										v-if="classTeacherList && classTeacherList.length"
										:disabled="rowData.classTeacherIdType?false:true"
										:label-in-value="true"
										:placeholder="rowData1.classTeacherName"
										:class="rowData.classTeacherIdConflict ? 'conflict-red' : ''"
										v-model="rowData.classTeacherId"
										@on-change="classTeacherNameChange"
									>
										<Option v-for="item in classTeacherList" :value="item.id" v-show="item.id!=rowData1.classTeacherId" :key="item.id">{{ item.name }}</Option>
									</Select>
								</span>
							</div>
							<div>
								<span>{{$t('courselist_16')}}</span>
								<span>
									<Select
										v-if="classroomIdList && classroomIdList.length"
										:disabled="rowData.classroomIdType?false:true"
										:label-in-value="true"
										:placeholder="rowData1.classroomName"
										:class="rowData.classroomIdConflict ? 'conflict-red' : ''"
										v-model="rowData.classroomId"
										@on-change="classroomNameChange"
									>
										<Option v-for="item in classroomIdList" :value="item.id" v-show="item.id!=rowData1.classroomId" :key="item.id">{{ item.name }}</Option>
									</Select>
								</span>
							</div>
						</div>
						<div class="modifyBtn">
							<!-- <Button style="margin-left:18px;">{{$t('classroom_allscore_53')}}</Button>
							<Button type="primary" style="margin-left:8px;">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2610')}}</Button>-->
						</div>
					</div>
				</div>
			</div>
			<div class="footerBtn" slot="footer">
				<Button @click="cancel">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" style="margin-left:16px;" @click="ok">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import { mapMutations } from "vuex";
import valid, {
	errors,
	sysUser,
	jwClassroom,
	jwLesson
} from "../../../../libs/request";
import { setTimeout } from "timers";
export default {
	components: {},
	mounted() {
		// this.getUser(9); // 授课教师roleId=9
		// this.getUser(10); // 授课助教roleId=10
		// this.getUser(6); // 服务oo roleId=6
	},
	props: {},
	data() {
		return {
			timeOut: false,
			checkConflictData: [],
			teacherNameBool: false,
			assistNameBool: false,
			classTeacherNameBool: false,
			classroomNameBool: false,

			conflictShowTipBoo: false,

			AlertShow: 1,
			teacherList: [],
			assistList: [],
			classroomIdList: [],
			classTeacherList: [],
			rowData: {
				objectName: "",
				status: "",
				startDate: "",
				startTime: "",
				endTime: "",
				hours: "",
				duration: "",

				teacherId: "",
				teacherName: "",
				assistId: "",
				assistName: "",
				classroomId: "",
				classroomName: "",
				classTeacherId: "",
				classTeacherName: ""
			},
			rowData1: {}
			/*  datechange: false,
      timechange: false */
		};
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		startDateChange(val) {
			this.rowData.startDate = val;
			// this.datechange = true;
		},
		startTimeChange(val) {
			this.rowData.startTime = val;
			// this.timechange = true;
		},
		ok() {
			if (
				!this.rowData.classroomIdConflict &&
				!this.rowData.classTeacherIdConflict &&
				!this.rowData.assistIdConflict &&
				!this.rowData.teacherIdConflict
			) {
				this.updateLoadingStatus({
					isLoading: true
				});
				this.conflictShowTipBoo = false;
				this.$emit("okModify", this.rowData);
			} else {
				this.$Message.error(this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2612'));
			}
		},
		cancel() {
			this.conflictShowTipBoo = false;
		},
		teacherNameChange(val1) {
			this.rowData.teacherName = val1;
			if (this.rowData.teacherIdConflict) {
				this.rowData.teacherIdConflict = false;
			}
		},
		assistNameChange(val1) {
			this.rowData.assistName = val1;
			if (this.rowData.assistIdConflict) {
				this.rowData.assistIdConflict = false;
			}
		},
		classTeacherNameChange(val1) {
			this.rowData.classTeacherName = val1;
			if (this.rowData.classTeacherIdConflict) {
				this.rowData.classTeacherIdConflict = false;
			}
		},
		classroomNameOpenChange(bool) {},
		classroomNameChange(val1) {
			this.rowData.classroomName = val1;
			this.rowData.classroomName = val1;
			if (this.rowData.classroomIdConflict) {
				this.rowData.classroomIdConflict = false;
			}
		},
		getDownList(rowDatas, officeId, userType) {
			let obj = {
				officeId: officeId,
				startTime: rowDatas.startTime,
				endTime: rowDatas.endTime,
				userType: userType
			};
			jwLesson
				.listUnConflictedUsers(obj)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						if (userType == "teacher") {
							// 授课教师
							this.teacherList = res.data.data;
						}
						if (userType == "assit") {
							// 授课助教
							this.assistList = res.data.data;
						}
						if (userType == "classTeacher") {
							// 服务oo
							this.classTeacherList = res.data.data;
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		getRoomDownList(rowDatas, officeId) {
			let obj = {
				officeId: officeId,
				startTime: rowDatas.startTime,
				endTime: rowDatas.endTime
			};
			jwLesson
				.listUnConflictedRoomss(obj)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.classroomIdList = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		conflictShowMethods(rowDatas, officeId, checkConflictData) {
			this.checkConflictData = checkConflictData;
			this.getDownList(rowDatas, officeId, "teacher"); // 授课教师roleId=9
			this.getDownList(rowDatas, officeId, "assit"); // 授课助教roleId=10
			this.getDownList(rowDatas, officeId, "classTeacher"); // 服务oo roleId=6
			this.getRoomDownList(rowDatas, officeId); //教室
			this.conflictShowTipBoo = true;
			let rowData = JSON.parse(JSON.stringify(rowDatas));
			let rowData1 = JSON.parse(JSON.stringify(rowDatas));
			rowData.startTime = rowData.startTime.split(" ")[1].substr(0, 5);
			rowData.startDate = rowData.endTime.split(" ")[0];
			this.rowData1 = rowData1;
			// this.rowData1.startTime = rowData.startTime;
			// this.rowData1.startDate = rowData.startDate;
            this.rowData = rowData;
            this.rowData.duration = this.rowData.duration ? Number(this.rowData.duration) : 0;
            // console.log(this.rowData)
		}
	}
};
</script>
