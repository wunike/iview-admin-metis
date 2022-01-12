<style lang="less">
.sihin-detail-container {
	.mytable {
		width: 100%;
		border-radius: 4px;
		padding: 0 16px;
		background: #fff;
	}
	.ivu-form .ivu-form-item-label {
		padding-right: 0;
	}
	.ivu-form-inline .ivu-form-item {
		width: 33.33333%;
		margin-right: 0;
		margin-bottom: 0;
	}
	.ivu-form .ivu-form-item-label {
		color: #999;
		font-size: 14px;
	}
	.ivu-form-item-content {
		font-size: 14px;
	}
	.form-box {
		padding: 22px 32px;
		background: #fff;
		margin-bottom: 16px;
	}
}
</style>

<template>
	<div class="sihin-detail-container">
		<div class="form-box">
			<Form ref="formInline" :model="formInline" inline>
				<FormItem :label="$t('courselist_compontents_modify_177')">{{ formInline.classCourseName }}</FormItem>
				<FormItem :label="$t('courselist_compontents_modify_181')">{{ formInline.date }}</FormItem>
				<!-- <FormItem :label="$t('modules_spoc_jw_web_src_views_signindetail_index_3162')">{{ formInline.courseId }}</FormItem> -->
				<FormItem :label="$t('modules_spoc_jw_web_src_views_signindetail_index_3163')">{{ formInline.courseName }}</FormItem>
				<FormItem :label="$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2129')">{{ formInline.officeName }}</FormItem>
				<FormItem :label="$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2295')">{{ formInline.teacherName }}</FormItem>
				<FormItem :label="$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2297')">{{ formInline.assistName }}</FormItem>
				<FormItem :label="$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2293')">{{ formInline.classroomName }}</FormItem>
				<FormItem :label="$t('courselist_compontents_modify_193')">{{ formInline.classTeacherName }}</FormItem>
				<FormItem :label="$t('modules_spoc_jw_web_src_views_signindetail_index_3169')">{{ `${formInline.actualNumber}/${formInline.numberPeople}` }}</FormItem>
			</Form>
		</div>
		<big-table-normal @uploadForm="uploadForm" :status="status"></big-table-normal>
	</div>
</template>

<script>
import { mapMutations } from "vuex";
import bigTableNormal from "./components/bigTableNormal";
import valid, { errors, sys, jwManualSign, jwLesson } from "../../libs/request";

export default {
	name: "jw.signinDetail",
	props: {},
	data() {
		return {
			formInline: {},
			status: ""
		};
	},
	components: {
		bigTableNormal
	},
	mounted() {
		this.uploadForm();
	},
	methods: {
		uploadForm() {
			this.getForm();
			this.getStatus();
		},
		getForm() {
			let params = {
				lessonId: this.$route.query.lessonId
			};
			jwManualSign
				.form(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let _data = res.data.data;
						let _weekNum = new Date(
							_data.startTime.split(" ")[0]
						).getDay();
						let _week;
						if (_weekNum === 1) _week = this.$t('classlist_compontents_detailinfo_28');
						else if (_weekNum === 2) _week = this.$t('classlist_compontents_detailinfo_29');
						else if (_weekNum === 3) _week = this.$t('classlist_compontents_detailinfo_30');
						else if (_weekNum === 4) _week = this.$t('classlist_compontents_detailinfo_31');
						else if (_weekNum === 5) _week = this.$t('classlist_compontents_detailinfo_32');
						else if (_weekNum === 6) _week = this.$t('classlist_compontents_detailinfo_33');
						else _week = this.$t('classlist_compontents_detailinfo_27');
						// console.log(_weekNum)
						_data.date = `${
							_data.startTime.split(" ")[0]
						}(${_week}) ${_data.startTime.split(" ")[1]}-${
							_data.endTime.split(" ")[1]
						}`;
						this.formInline = _data;
					}
				})
				.catch(errors.call(this));
		},
		getStatus() {
			let params = {
				id: this.$route.query.lessonId
			};
			jwLesson
				.form(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.status = res.data.data.status;
					}
				})
				.catch(errors.call(this));
		}
	}
};
</script>