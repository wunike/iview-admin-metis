<style lang="less">
.ivu-modal-footer .ivu-btn-text {
	border: 1px solid rgb(220, 222, 226);
}
.ivu-modal-footer .ivu-btn-text:hover {
	border: 1px solid rgb(220, 222, 226);
}

.ivu-modal-header {
	padding: 16.5px 24px;
	.ivu-modal-header-inner {
		font-size: 18px;
	}
}
.ivu-modal-footer {
	padding: 10px 24px;
}

.ivu-form-item {
	.ivu-form-item-label {
		color: #999999 !important;
	}
}
.ivu-input {
	font-size: 14px !important;
}
.ivu-select-selected-value,
.ivu-select-placeholder {
	font-size: 14px !important;
}

.ivu-form-item-content {
	font-size: 14px;
}
.form-row-line {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	min-height: 32px;
}
.last-line {
	.ivu-form-item {
		margin-bottom: 0px;
	}
}

.staff-class-info {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	.info-item {
		height: 14px;
		width: 50%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-top: 2px;
		margin-bottom: 26px;
		span {
			min-width: 70px;
			color: #999999;
			font-size: 14px;
			margin-right: 10px;
		}
		div {
			color: #495060;
			font-size: 14px;
		}
	}
}

.sure-back {
	.ivu-table td {
		height: 40px !important;
	}
	.choose-course-search {
		margin-bottom: 10px;
	}
}
.sure-back1 {
	.choose-course-search {
		margin-bottom: 10px;
	}
}
</style>

<template>
	<div class="models-container">
		<div>
			<Button @click="reClass = true">{{$t('modules_spoc_jw_web_src_views_models_2899')}}</Button>
			<Button @click="staffClass = true">{{$t('modules_spoc_jw_web_src_views_models_2900')}}</Button>
			<Button @click="classAttendanceDetails = true">{{$t('modules_spoc_jw_web_src_views_models_2901')}}</Button>
			<Button @click="chooseCourse = true">{{$t('modules_spoc_jw_web_src_views_models_2902')}}</Button>
		</div>
		<Modal class-name="sure-back" width="800" v-model="reClass" :mask-closable="false" :title="$t('modules_spoc_jw_web_src_views_models_2899')">
			<Form ref="reClassCourse" v-model="formClass" :label-width="120">
				<div class="form-row-line">
					<FormItem :label="$t('courselist_compontents_modify_177')" prop="className">
						<div style="width:224px;color:#495060;">{{formClass.className}}</div>
					</FormItem>
					<FormItem :label="$t('modules_spoc_core_web_src_views_customstate_customizestate_154')" prop="status">
						<div style="width:224px;color:#495060;">{{formClass.status}}</div>
					</FormItem>
				</div>
				<div class="form-row-line">
					<FormItem :label="$t('courselist_compontents_modify_178')" prop="date">
						<DatePicker
							type="date"
							v-model="formClass.date"
							:placeholder="$t('pushsettings_index_505')"
							style="width: 224px;color:#495060;"
						></DatePicker>
					</FormItem>
					<FormItem :label="$t('courselist_compontents_modify_181')" prop="time">
						<DatePicker
							type="date"
							v-model="formClass.time"
							:placeholder="$t('pushsettings_index_505')"
							style="width: 224px;color:#495060;"
						></DatePicker>
					</FormItem>
				</div>
				<div class="form-row-line">
					<FormItem :label="$t('courselist_compontents_modify_184')" prop="classTime">
						<Input v-model="formClass.classTime" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" style="width: 224px;color:#495060;" />
					</FormItem>
					<FormItem :label="$t('courselist_compontents_modify_186')" prop="times">
						<div style="width:224px;color:#495060;">{{formClass.times}}</div>
					</FormItem>
				</div>
				<div class="form-row-line">
					<FormItem :label="$t('courselist_compontents_modify_187')" prop="teac">
						<Select v-model="formClass.teac" style="width:224px;color:#495060;">
							<Option
								v-for="item in formClass.teacList"
								:value="item.value"
								:key="item.value"
							>{{ item.label }}</Option>
						</Select>
					</FormItem>
					<FormItem :label="$t('courselist_compontents_modify_190')" prop="subTeac">
						<Select v-model="formClass.subTeac" style="width:224px;color:#495060;">
							<Option
								v-for="item in formClass.subTeacList"
								:value="item.value"
								:key="item.value"
							>{{ item.label }}</Option>
						</Select>
					</FormItem>
				</div>
				<div class="form-row-line last-line">
					<FormItem :label="$t('courselist_compontents_modify_193')" prop="teac">
						<Select v-model="formClass.service" style="width:224px;color:#495060;">
							<Option
								v-for="item in formClass.serviceList"
								:value="item.value"
								:key="item.value"
							>{{ item.label }}</Option>
						</Select>
					</FormItem>
					<FormItem :label="$t('courselist_compontents_modify_196')" prop="room">
						<Select v-model="formClass.room" style="width:224px;color:#495060;">
							<Option
								v-for="item in formClass.roomList"
								:value="item.value"
								:key="item.value"
							>{{ item.label }}</Option>
						</Select>
					</FormItem>
				</div>
				<div slot="footer">
					<Button @click="reClass = false">{{$t('classroom_allscore_53')}}</Button>
					<Button type="primary" @click="reClass = false">{{$t('scoretemplate_scoretemplate_561')}}</Button>
				</div>
			</Form>
		</Modal>
		<Modal
			class-name="sure-back"
			width="800"
			v-model="staffClass"
			:mask-closable="false"
			:title="$t('modules_spoc_jw_web_src_views_models_2900')"
		>
			<div class="staff-class-info">
				<div class="info-item">
					<span>{{$t('courselist_compontents_modify_177')}}</span>
					<div>SH01LWP1A-190302A</div>
				</div>
				<div class="info-item">
					<span>{{$t('courselist_compontents_modify_177')}}</span>
					<div>SH01LWP1A-190302A</div>
				</div>
			</div>
			<Table border :columns="reCols" :data="reDatas"></Table>
			<div slot="footer">
				<Button @click="staffClass = false">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="staffClass = false">{{$t('scoretemplate_scoretemplate_561')}}</Button>
			</div>
		</Modal>
		<Modal
			class-name="sure-back"
			width="800"
			v-model="classAttendanceDetails"
			:mask-closable="false"
			:title="$t('modules_spoc_jw_web_src_views_models_2901')"
		>
			<div class="staff-class-info">
				<div class="info-item">
					<span style="padding-left:16px;">{{$t('modules_spoc_jw_web_src_views_models_2917')}}</span>
					<div>SH01LWP1A-190302A</div>
				</div>
			</div>
			<Table border :columns="deCols" :data="deDatas"></Table>
			<div slot="footer">
				<Button @click="classAttendanceDetails = false">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="classAttendanceDetails = false">{{$t('scoretemplate_scoretemplate_561')}}</Button>
			</div>
		</Modal>
		<Modal
			class-name="sure-back1"
			width="1044"
			v-model="chooseCourse"
			:mask-closable="false"
			:title="$t('modules_spoc_jw_web_src_views_models_2902')"
		>
			<div class="choose-course-search">
				<Select
					v-model="belongClass"
					clearable
					:placeholder="$t('messagemanagement_index_344')"
					style="width:140px;margin-right:12px;"
				>
					<Option v-for="item in belongClassList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<DatePicker
					separator=" ~ "
					type="daterange"
					v-model="dates"
					placement="bottom-end"
					:placeholder="$t('mycourse_mycourse_360')"
					style="width: 224px;margin-right:12px;"
				></DatePicker>
				<Select
					v-model="chooseClass"
					clearable
					:placeholder="$t('courselist_courselist_224')"
					style="width:140px;margin-right:12px;"
				>
					<Option v-for="item in chooseClassList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Input v-model="className" :placeholder="$t('modules_spoc_jw_web_src_views_models_2921')" style="width: 140px;margin-right:12px;" />
				<Input v-model="teacName" :placeholder="$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2492')" style="width: 140px;margin-right:32px;" />
				<Button @click="chooseCourseSearch" type="primary" style="margin-right:12px;">{{$t('modules_rolepeople_210')}}</Button>
				<Button @click="chooseCourseReset">{{$t('classroom_clock_87')}}</Button>
			</div>
			<Table border :columns="ccCols" :data="ccDatas"></Table>
			<div slot="footer">
				<Button @click="chooseCourse = false">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="chooseCourse = false">{{$t('scoretemplate_scoretemplate_561')}}</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
export default {
	props: {},
	data() {
		return {
			reClass: false,
			staffClass: false,
			classAttendanceDetails: false,
			chooseCourse: false,
			formClass: {
				className: "SH01LWP1A-190302A",
				status: this.$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1043'),
				date: "",
				time: "",
				classTime: "",
				times: "234feb",
				teac: "",
				teacList: [
					{ value: 0, label: "lizhi0" },
					{ value: 1, label: "lizhi1" },
					{ value: 2, label: "lizhi2" }
				],
				subTeac: "",
				subTeacList: [
					{ value: 0, label: "lizhi0" },
					{ value: 1, label: "lizhi1" },
					{ value: 2, label: "lizhi2" }
				],
				service: "",
				serviceList: [
					{ value: 0, label: "lizhi0" },
					{ value: 1, label: "lizhi1" },
					{ value: 2, label: "lizhi2" }
				],
				room: "",
				roomList: [
					{ value: 0, label: "lizhi0" },
					{ value: 1, label: "lizhi1" },
					{ value: 2, label: "lizhi2" }
				]
			},
			reCols: [
				{
					type: "selection",
					width: 70
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_models_2926'),
					key: "student",
					minWidth: 100
				},
				{
					title: this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1397'),
					key: "phone",
					minWidth: 100
				},
				{
					title: this.$t('pushsettings_index_496'),
					key: "status",
					minWidth: 100
				},
				{
					title: this.$t('classlist_compontents_detailinfo_45'),
					key: "doAction",
					Width: 70,
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
											params.row.action === 0
												? "block"
												: "none"
									},
									on: {
										click: () => {}
									}
								},
								this.$t('modules_spoc_jw_web_src_views_models_2930')
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
											params.row.action === 1
												? "block"
												: "none"
									},
									on: {
										click: () => {}
									}
								},
								this.$t('modules_spoc_jw_web_src_views_models_2931')
							)
						]);
					}
				}
			],
			reDatas: [
				{
					student: "liuyueyu",
					phone: "18500251102",
					status: this.$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1043'),
					action: 0
				},
				{
					student: "liuyueyu",
					phone: "18500251102",
					status: this.$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1043'),
					action: 0
				},
				{
					student: "liuyueyu",
					phone: "18500251102",
					status: this.$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1043'),
					action: 1
				},
				{
					student: "liuyueyu",
					phone: "18500251102",
					status: this.$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1043'),
					action: 1
				}
			],
			deCols: [
				{
					title: this.$t('classlist_compontents_detailinfo_34'),
					key: "stuNo",
					minWidth: 100
				},
				{
					title: this.$t('classlist_compontents_detailinfo_35'),
					key: "stuName",
					minWidth: 100
				},
				{
					title: this.$t('classlist_compontents_detailinfo_42'),
					key: "situation",
					minWidth: 100
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_checkinelectronic_index_2385'),
					key: "details",
					minWidth: 100
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_models_2936'),
					key: "contract",
					minWidth: 100
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_models_2937'),
					key: "deduction",
					minWidth: 100
				}
			],
			deDatas: [
				{
					stuNo: "90909",
					stuName: "lzijhi",
					situation: "2",
					details: "details",
					contract: this.$t('modules_spoc_jw_web_src_views_models_2936'),
					deduction: this.$t('modules_spoc_jw_web_src_views_models_2937')
				},
				{
					stuNo: "90909",
					stuName: "lzijhi",
					situation: "2",
					details: "details",
					contract: this.$t('modules_spoc_jw_web_src_views_models_2936'),
					deduction: this.$t('modules_spoc_jw_web_src_views_models_2937')
				},
				{
					stuNo: "90909",
					stuName: "lzijhi",
					situation: "2",
					details: "details",
					contract: this.$t('modules_spoc_jw_web_src_views_models_2936'),
					deduction: this.$t('modules_spoc_jw_web_src_views_models_2937')
				},
				{
					stuNo: "90909",
					stuName: "lzijhi",
					situation: "2",
					details: "details",
					contract: this.$t('modules_spoc_jw_web_src_views_models_2936'),
					deduction: this.$t('modules_spoc_jw_web_src_views_models_2937')
				}
			],
			belongClass: "",
			belongClassList: [
				{ value: 0, label: "666" },
				{ value: 1, label: "777" },
				{ value: 2, label: "888" },
				{ value: 3, label: "999" }
			],
			chooseClass: "",
			chooseClassList: [
				{ value: 0, label: "666" },
				{ value: 1, label: "777" },
				{ value: 2, label: "888" },
				{ value: 3, label: "999" }
			],
			dates: "",
			className: "",
			teacName: "",
			ccCols: [
				{
					type: "selection",
					width: 50
				},
				{
					title: this.$t('views_coursepack_coursepack_384'),
					key: "school",
					minWidth: 70
				},
				{
					title: this.$t('mycourse_mycourse_372'),
					key: "className",
					minWidth: 110
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2498'),
					key: "belongCourse",
					minWidth: 70
				},
				{
					title: this.$t('courselist_compontents_modify_180'),
					key: "classDate",
					minWidth: 70
				},
				{
					title: this.$t('mycourse_mycourse_377'),
					key: "classTime",
					minWidth: 70
				},
				{
					title: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_604'),
					key: "courseTime",
					minWidth: 70
				},
				{
					title: this.$t('courselist_12'),
					key: "teac",
					minWidth: 70
				},
				{
					title: this.$t('courselist_13'),
					key: "subTeac",
					minWidth: 70
				},
				{
					title: this.$t('mycourse_mycourse_374'),
					key: "service",
					minWidth: 70
				},
				{
					title: this.$t('courselist_16'),
					key: "classRoom",
					minWidth: 70
				}
			],
			ccDatas: [
				{
					school: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2118'),
					className: "SH03GGR2A-190203C",
					belongCourse: "GGR2A-50",
					classDate: "2019-01-01",
					classTime: "14:00",
					courseTime: "2",
					teac: "Yona",
					subTeac: "Yona",
					service: "Yona   ",
					classRoom: this.$t('modules_spoc_jw_web_src_views_models_2949')
				},
				{
					school: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2118'),
					className: "SH03GGR2A-190203C",
					belongCourse: "GGR2A-50",
					classDate: "2019-01-01",
					classTime: "14:00",
					courseTime: "2",
					teac: "Yona",
					subTeac: "Yona",
					service: "Yona   ",
					classRoom: this.$t('modules_spoc_jw_web_src_views_models_2949')
				},
				{
					school: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2118'),
					className: "SH03GGR2A-190203C",
					belongCourse: "GGR2A-50",
					classDate: "2019-01-01",
					classTime: "14:00",
					courseTime: "2",
					teac: "Yona",
					subTeac: "Yona",
					service: "Yona   ",
					classRoom: this.$t('modules_spoc_jw_web_src_views_models_2949')
				},
				{
					school: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2118'),
					className: "SH03GGR2A-190203C",
					belongCourse: "GGR2A-50",
					classDate: "2019-01-01",
					classTime: "14:00",
					courseTime: "2",
					teac: "Yona",
					subTeac: "Yona",
					service: "Yona   ",
					classRoom: this.$t('modules_spoc_jw_web_src_views_models_2949')
				}
			]
		};
	},
	components: {},
	methods: {
		chooseCourseSearch() {},
		chooseCourseReset() {
			(this.belongClass = ""),
				//                this.belongClassList=[]
				(this.chooseClass = "");
			//                this.chooseClassList=[]
			this.dates = "";
			this.className = "";
			this.teacName = "";
		}
	}
};
</script>
