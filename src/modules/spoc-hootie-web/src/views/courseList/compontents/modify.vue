<style lang="less">
.editScheduleModel {
	.w50 {
		display: inline-block;
		width: 50%;
	}
	.w100 {
		display: inline-block;
		width: 100%;
	}
	.w250p {
		width: 250px;
	}
	// .ivu-form-item-required .ivu-form-item-label:before{
	//   display: none;
	// }
}
</style>
<template>
	<div>
		<Modal
			v-model="addModal"
			:title="$t('courselist_compontents_modify_176')"
			width="800"
			:mask-closable="false"
		>
			<!-- 

                {
	"assistId": "",
	"classTeacherId": "",
	"classroomName": "",
	"endTime": "",
	"id": "",
	"startTime": "",
	"teacherId": ""
}
			-->
			<Form ref="formRef" :model="addObj" class="editScheduleModel" :label-width="125">
				<FormItem :label="$t('courselist_compontents_modify_177')" class="w50" prop="className">
					<Input v-model="addObj.className" disabled />
				</FormItem>
				<!-- <FormItem class="w50" style=" visibility: hidden;"></FormItem> -->
				<FormItem
					:label="$t('courselist_compontents_modify_178')"
					class="w50"
					prop="lessonDate"
					:rules="{ required: true,  message: $t('courselist_compontents_modify_179'), trigger: 'change' }"
				>
					<DatePicker
						@on-change="change_startDate"
						v-model="lessonDate"
						format="yyyy-MM-dd"
						type="date"
						placement="bottom-start"
						:placeholder="$t('courselist_compontents_modify_180')"
						class="w250p"
					></DatePicker>
				</FormItem>
				<FormItem
					:label="$t('courselist_compontents_modify_181')"
					class="w50"
					prop="courseTime"
					:rules="{ required: true, validator: validatePass, message: $t('courselist_compontents_modify_182'), trigger: 'change' }"
				>
					<TimePicker
						v-model="addObj.courseTime"
						format="HH:mm"
						:steps="[1, 10]"
						type="timerange"
						placement="bottom-start"
						@on-change="courseTimeChange"
						separator=" ~ "
						:placeholder="$t('courselist_compontents_modify_183')"
						class="w250p"
					></TimePicker>
				</FormItem>
				<!-- <FormItem :label="$t('courselist_compontents_modify_184')" class="w50" prop="hours"
                    :rules="{ required: true, type: 'number', message: $t('courselist_compontents_modify_185'), trigger: 'change'}">
                    <InputNumber :min="0" v-model="addObj.hours" class="w250p"></InputNumber>
                </FormItem>
                <FormItem :label="$t('courselist_compontents_modify_186')" class="w50" prop="duration">
				{{addObj.duration}}分钟-->
				<!-- </FormItem> -->
				<FormItem
					:label="$t('courselist_compontents_modify_187')"
					class="w50"
					prop="teacherId"
					:rules="{required: true, message: $t('courselist_compontents_modify_188'), trigger: 'change'}"
				>
					<Select
						v-model="addObj.teacherId"
						class="w250p"
						clearable
						filterable
					>
						<Option disabled value="isTeacherSync">
							<div>
								<Checkbox
									v-model="isTeacherSync"
									style="margin-right:0px;color:#495060"
								>{{$t('courselist_compontents_modify_189')}}</Checkbox>
							</div>
						</Option>
						<Option :value="item.id" v-for="(item, index) in teacherList" :key="index">{{item.name}}</Option>
					</Select>
				</FormItem>

				<FormItem
					:label="$t('courselist_compontents_modify_190')"
					class="w50"
					prop="assistId"
					:rules="{required: false, message: $t('courselist_compontents_modify_191'), trigger: 'change',}"
				>
					<Select
						v-model="addObj.assistId"
						clearable
						class="w250p"
						filterable
					>
						<Option disabled value="isAssistSync">
							<div>
								<Checkbox
									v-model="isAssistSync"
									style="margin-right:0px;color:#495060"
								>{{$t('courselist_compontents_modify_192')}}</Checkbox>
							</div>
						</Option>
						<Option :value="item.id" v-for="(item, index) in assistList" :key="index">{{item.name}}</Option>
					</Select>
				</FormItem>
				<FormItem
					:label="$t('courselist_compontents_modify_193')"
					class="w50"
					prop="classTeacherId"
					:rules="{required: true, message: $t('courselist_compontents_modify_194'), trigger: 'change',}"
				>
					<Select
						v-model="addObj.classTeacherId"
						class="w250p"
						filterable
						clearable
					>
						<Option disabled value="isAssistSync">
							<div>
								<Checkbox
									v-model="isClassTeacherSync"
									style="margin-right:0px;color:#495060"
								>{{$t('courselist_compontents_modify_195')}}</Checkbox>
							</div>
						</Option>
						<Option :value="item.id" v-for="(item, index) in classTeacherList" :key="index">{{item.name}}</Option>
					</Select>
				</FormItem>
				<FormItem
					:label="$t('courselist_compontents_modify_196')"
					style="margin-bottom:0px;"
					class="w50"
					prop="classroomName"
					:rules="{required: true, message: $t('courselist_compontents_modify_197'), trigger: 'change'}"
				>
					<Input v-model="addObj.classroomName" class="w250p"></Input>
					<!-- <Select v-model="addObj.classroomName" class="w250p" filterable>
                        <Option :value="item.id" v-for="(item, index) in classRoomList" :key="index">{{item.name}}</Option>
					</Select>-->
				</FormItem>
			</Form>
			<div slot="footer">
				<Button @click="saveCancel">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="saveOk">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import { mapMutations } from "vuex";
import valid, { errors, sysUser, jxLesson } from "../../../libs/request";
import bigTable from "@public/modules/bigTable.vue";
export default {
	components: { bigTable },
	mounted() {
		// this.getShowTitle();
	},
	data() {
		return {
			isTeacherSync: false, // 授课教师
			isClassTeacherSync: false, //服务OO
			isAssistSync: false, //授课助教
			lessonDate: "",
			addModal: false,
			teacherLoading: false,
			assistLoading: false,
			classTeacherLoading: false,
			teacherList: [],
			assistList: [],
			classTeacherList: [],
			classRoomList: [],
			officeId: "",
			validatePass: (rule, value, callback) => {
				if (!value || value[0] === "") {
					callback(
						new Error(this.$t("courselist_compontents_modify_182"))
					);
				} else {
					callback();
				}
			},
			addObj: {
				className: "",
				statusName: "",
				lessonDate: "",
				courseTime: "",
				hours: "",
				duration: "",
				teacherId: "",
				assistId: "",
				classTeacherId: "",
				classroomName: ""
			}
		};
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		singleChange() {},
		courseTimeChange(val) {
			console.log(val);
		},
		modifyRefShowMethods(val) {
			//debugger;
			this.addModal = true;
			this.updateLoadingStatus({ isLoading: true });
			let objVal = JSON.parse(JSON.stringify(val));
			this.lessonDate = objVal.lessonDate.replace(/\//g, "-");
			this.addObj.lessonDate = this.lessonDate;
			this.addObj.id = objVal.id;
			this.addObj.classId = objVal.classId;
			this.addObj.className = objVal.className;
			this.addObj.courseTime = objVal.lessonTime.split("-");
			/* this.addObj.teacherId = objVal.teacherId;
      this.addObj.assistId = objVal.assistId;
      this.addObj.classTeacherId = objVal.classTeacherId; */
			this.addObj.classroomName = objVal.classroomName;
			this.officeId = objVal.officeId;
			this.getSearchList(9, objVal.teacherName, objVal);
			this.getSearchList(10, objVal.assistName, objVal);
			this.getSearchList(6, objVal.classTeacherName, objVal);
		},
		teacherClear() {
			this.getSearchList(9, "");
		},
		assistClear() {
			this.getSearchList(10, "");
		},
		classTeacherClear() {
			this.getSearchList(6, "");
		},
		teacherRemote(query) {
			// if(query!=this.addObj.teacherId){
			this.getSearchList(9, query);
			// }
		},
		assistRemote(query) {
			if (query != this.addObj.assistId) {
				this.getSearchList(10, query);
			}
		},
		classTeacherRemote(query) {
			if (query != this.addObj.classTeacherId) {
				this.getSearchList(6, query);
			}
		},
		getSearchList(userType, query, objVal) {
			// if (query != "") {
			if (userType == 9) {
				this.teacherLoading = true;
			} else if (userType == 10) {
				this.assistLoading = true;
			} else if (userType == 6) {
				this.classTeacherLoading = true;
			}
			let obj = {
				roleIds: userType,
				pageSize: -1,
				// name: query,
				officeIds: this.officeId
			};
			sysUser
				.listDataByRole(obj)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						if (userType == 9) {
							this.teacherLoading = false;
							this.teacherList = res.data.data;
							if (objVal) {
								this.addObj.teacherId = objVal.teacherId;
							}
						} else if (userType == 10) {
							this.assistLoading = false;
							this.assistList = res.data.data;
							// objVal.assistId?this.addObj.assistId = objVal.assistId:'';
							if (objVal) {
								this.addObj.assistId = objVal.assistId;
							}
						} else if (userType == 6) {
							this.classTeacherLoading = false;
							this.classTeacherList = res.data.data;
							if (objVal) {
								this.addObj.classTeacherId =
									objVal.classTeacherId;
							}
							// objVal.classTeacherId?this.addObj.classTeacherId = objVal.classTeacherId:'';
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
			// }
		},
		change_startDate(val) {
			this.lessonDate = val;
			this.addObj.lessonDate = val;
		},

		saveOk() {
			let Obj = {
				id: this.addObj.id,
				classId: this.addObj.classId,
				teacherId: this.addObj.teacherId,
				assistId: this.addObj.assistId,
				classTeacherId: this.addObj.classTeacherId,
				classroomName: this.addObj.classroomName,
				endTime: new Date(
					this.addObj.lessonDate +
						" " +
						this.addObj.courseTime[1] +
						":00"
				).getTime(),
				startTime: new Date(
					this.addObj.lessonDate +
						" " +
						this.addObj.courseTime[0] +
						":00"
				).getTime(),
				isTeacherSync: this.isTeacherSync ? "1" : "0", // 授课教师
				isClassTeacherSync: this.isClassTeacherSync ? "1" : "0", //服务OO
				isAssistSync: this.isAssistSync ? "1" : "0" //授课助教
			};
			this.$refs.formRef.validate(validRes => {
				if (validRes) {
					jxLesson
						.save(Obj)
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								this.$Message.success(
									this.$t("courselist_compontents_modify_200")
								);
								this.$emit("emitGetListData");
								this.addModal = false;
							}
						})
						.catch(errors.call(this))
						.finally(() => {
							// this.updateLoadingStatus({ isLoading: false });
						});
				}
			});
		},
		saveCancel() {
			this.addModal = false;
		}
	}
};
</script>