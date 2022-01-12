<style lang="less">
.studentCourseDetail {
	background: rgba(240, 242, 245, 1);
	.stuInfo {
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		margin-bottom: 16px;
		padding: 20px 32px;
		.stuName {
			font-size: 20px;
			margin-bottom: 4px;
			font-weight: bold;
		}
		.stuOther {
			width: 291px;
			display: inline-block;
			font-size: 14px;
			line-height: 14px;
			margin-top: 10px;
			.label {
				color: #999999;
			}
		}
	}
	.courseInfos {
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		padding: 0 32px 22px;
		.courseInfo {
			padding-bottom: 20px;
			border-bottom: 1px #e8e8e8 solid;
		}
		.courseInfo:last-child {
			padding-bottom: 0;
			border-bottom: none;
		}
		.courseHead {
			padding-top: 32px;
			.courseName {
				display: inline-block;
				font-size: 16px;
				font-weight: bold;
				margin-right: 22px;
			}
			.courseStatus {
				display: inline-block;
				color: #495060;
				background: #ebecf0;
				text-align: center;
				width: 60px;
				line-height: 24px;
				height: 24px;
				border-radius: 4px;
			}
			.hasCourse {
				background: rgba(70, 188, 21, 1);
				color: #ffffff;
			}
		}
		.courseOther {
			width: 291px;
			display: inline-block;
			font-size: 14px;
			line-height: 14px;
			margin-top: 10px;
			.label {
				color: #999999;
			}
		}
		.classInfo {
			background: rgba(246, 246, 246, 1);
			padding: 0 16px 16px 16px;
			margin-top: 10px;
			.classOther {
				width: 283px;
				display: inline-block;
				font-size: 14px;
				line-height: 14px;
				margin-top: 10px;
				.label {
					color: #999999;
				}
			}
		}
	}
}
</style>
<template>
	<div class="studentCourseDetail">
		<div class="stuInfo">
			<div class="stuName">{{studentDetail.name}}</div>
			<div class="stuOthers">
				<div class="stuOther">
					<span class="label">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentother_1000')}}</span>
					<span>{{studentDetail.code}}</span>
				</div>
				<div class="stuOther">
					<span class="label">{{$t('messagemanagement_components_infos_319')}}</span>
					<span>{{studentDetail.enName}}</span>
				</div>
				<div class="stuOther">
					<span class="label">{{$t('modules_spoc_jw_web_src_views_classstudentmanage_studentcoursedetail_2818')}}</span>
					<span>{{studentDetail.statusName}}</span>
				</div>
				<div class="stuOther">
					<span class="label">{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2120')}}</span>
					<span>{{studentDetail.courseNum}}</span>
				</div>
				<div class="stuOther">
					<span class="label">{{$t('modules_spoc_jw_web_src_views_classstudentmanage_studentcoursedetail_2820')}}</span>
					<span>{{studentDetail.classCourseNum}}</span>
				</div>
				<div class="stuOther">
					<span class="label">{{$t('views_staff_components_staffinfo_674')}}</span>
					<span>{{studentDetail.phone}}</span>
				</div>
				<div class="stuOther">
					<span class="label">{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2121')}}</span>
					<span>{{studentDetail.school}}</span>
				</div>
				<div class="stuOther">
					<span class="label">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_719')}}</span>
					<span>{{studentDetail.birthday}}</span>
				</div>
				<div class="stuOther">
					<span class="label">{{$t('messagemanagement_components_infos_320')}}</span>
					<span>{{studentDetail.officeName}}</span>
				</div>
				<div class="stuOther">
					<span class="label">{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2119')}}</span>
					<span>{{studentDetail.admissionDate}}</span>
				</div>
				<div class="stuOther">
					<span class="label">{{$t('modules_spoc_jw_web_src_views_classstudentmanage_studentcoursedetail_2826')}}</span>
					<span>{{studentDetail.age}}</span>
				</div>
			</div>
		</div>
		<div
			class="courseInfos"
			v-if="studentDetail.stuDetailCourseVOList && studentDetail.stuDetailCourseVOList.length"
		>
			<div
				class="courseInfo"
				v-for="(item, index) in studentDetail.stuDetailCourseVOList"
				:key="index"
			>
				<div class="courseHead">
					<div class="courseName">{{$t('modules_spoc_jw_web_src_views_classstudentmanage_studentcoursedetail_2827', [item.courseName])}}</div>
						<!-- :class="{hasCourse: item.studentCourseStatusName != $t('modules_spoc_jw_web_src_views_classstudentmanage_studentcoursedetail_2828')}" -->
					<div
						class="courseStatus"
						:class="{hasCourse: item.studentCourseStatusName != '未入班'}"
					>{{item.studentCourseStatusName}}</div>
				</div>
				<div>
					<div class="courseOther">
						<span class="label">{{$t('views_coursepack_coursepack_361')}}</span>
						<span>{{item.courseOfficeName}}</span>
					</div>
					<div class="courseOther">
						<span class="label">{{$t('views_coursepack_coursepack_363')}}</span>
						<span>{{item.courseType}}</span>
					</div>
					<div class="courseOther">
						<span class="label">{{$t('modules_spoc_jw_web_src_views_classstudentmanage_studentcoursedetail_2831')}}</span>
						<span>{{item.courseGrade}}</span>
					</div>
					<div class="courseOther">
						<span class="label">{{$t('modules_spoc_jw_web_src_views_classstudentmanage_studentcoursedetail_2832')}}</span>
						<span>{{item.expiredDate}}</span>
					</div>
				</div>
				<!-- <div v-if="item.studentCourseStatusName != $t('modules_spoc_jw_web_src_views_classstudentmanage_studentcoursedetail_2828')"> -->
				<div v-if="item.studentCourseStatusName != '未入班'">
					<div
						class="classInfo"
						v-for="(childItem, indexChildItem) in item.stuDetailClassCourseVOList"
						:key="indexChildItem"
					>
						<div class="classOther">
							<span class="label">{{$t('courselist_compontents_modify_177')}}</span>
							<span>{{childItem.classCourseName}}</span>
						</div>
						<div class="classOther">
							<span class="label">{{$t('courselist_compontents_modify_181')}}</span>
							<span>{{childItem.classCourseTime}}</span>
						</div>
						<!-- <div class="classOther"><span class="label">{{$t('modules_spoc_jw_web_src_views_classstudentmanage_studentcoursedetail_2835')}}</span><span>{{childItem.currentStuNum}}</span></div> -->
						<div class="classOther">
							<span class="label">{{$t('modules_spoc_jw_web_src_views_classstudentmanage_studentcoursedetail_2836')}}</span>
							<span>{{childItem.stuNum}}</span>
						</div>
						<div class="classOther">
							<span class="label">{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2129')}}</span>
							<span>{{childItem.classCourseOfficeName}}</span>
						</div>
						<div class="classOther">
							<span class="label">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2295')}}</span>
							<span>{{childItem.teacherName}}</span>
						</div>
						<div class="classOther">
							<span class="label">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2297')}}</span>
							<span>{{childItem.assistName}}</span>
						</div>
						<div class="classOther">
							<span class="label">{{$t('courselist_compontents_modify_193')}}</span>
							<span>{{childItem.classTeacherName}}</span>
						</div>
						<div class="classOther">
							<span class="label">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2293')}}</span>
							<span>{{childItem.classroomName}}</span>
						</div>
						<div class="classOther">
							<span class="label">{{$t('modules_spoc_jw_web_src_views_classstudentmanage_studentcoursedetail_2842')}}</span>
							<span>{{childItem.classCourseStatusName}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapMutations } from "vuex";
import valid, { errors, jwClassCourse } from "../../libs/request";
export default {
	name: "jw.studentCourseDetail",
	components: {},
	mounted() {
		this.getStudentDetail();
	},
	data() {
		return {
			studentDetail: {}
		};
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		getStudentDetail() {
			this.updateLoadingStatus({
				isLoading: true
			});
			let param = {
				stuId: this.$route.query.stuId,
				officeId: this.$route.query.officeId
			};
			jwClassCourse
				.getStudentDetail(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.studentDetail = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		}
	}
};
</script>