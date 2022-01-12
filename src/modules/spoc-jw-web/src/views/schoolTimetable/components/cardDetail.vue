<style lang="less">
.card-detail-container {
	position: relative;
}
</style>
    
<template>
	<div class="card-detail-container">
		<p class="p">{{ item.detail.classroomName }}</p>
		<p class="p" v-if="!fromSignIn">{{headerLists[index1].date}}&nbsp;&nbsp;{{item.detail.startTime}}-{{item.detail.endTime}}</p>
		<p class="p" v-else>{{ date }}</p>
		<div class="div">{{ item.detail.classCourseName }}</div>
		<p class="p">{{$t('modules_spoc_jw_web_src_views_schooltimetable_components_carddetail_3036', [ item.detail.teacherName ])}}</p>
		<p class="p">{{$t('modules_spoc_jw_web_src_views_schooltimetable_components_carddetail_3037', [ item.detail.assistName ])}}</p>
		<p class="p">{{$t('modules_spoc_jw_web_src_views_schooltimetable_components_carddetail_3038', [ item.detail.classTeacherName ])}}</p>
		<p class="p">{{$t('modules_spoc_jw_web_src_views_schooltimetable_components_carddetail_3039', [ item.detail.actualNumber , item.detail.numberPeople ])}}</p>
	</div>
</template>

<script>
export default {
	props: {
		item: {
			type: Object
		},
		fromSignIn: {
			type: Boolean
		},
		headerLists: {
			type: Array
		},
		index1: {
			type: Number
		},
		date: {
			type: String
		}
	}
};
</script>


