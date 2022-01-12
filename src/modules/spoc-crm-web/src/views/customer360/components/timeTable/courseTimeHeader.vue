<style lang="less">
.course-time-header-container-crm {
	@h: 47px;
	height: @h;
	line-height: @h;
	padding-right: 32px;
	.bgcord {
		display: inline-block;
		width: 28px;
		height: 6px;
		margin-right: 8px;
		margin-left: 32px;
	}
	.top-left {
		float: left;
		padding-left: 32px;
		font-size: 14px;
		color: #495060;
	}
	.ivu-checkbox + span,
	.ivu-checkbox-wrapper + span {
		margin-right: 0;
	}
	.header-tooltip {
		display: inline-block;
		height: 26px;
		line-height: 1;
		.ivu-icon {
			position: relative;
			top: -1px;
		}
	}
}
</style>
    
<template>
	<div class="course-time-header-container-crm">
		<div class="top-left">
			<!-- <Checkbox v-model="single" @on-change="changeSingle" label></Checkbox> -->
			<span v-if="headerTitle" class="header-title">{{ headerTitle }}</span>
		</div>
		<div class="fr">
			<ul class="fl">
				<li class="fl">
					<i class="bgColor0 bgcord"></i>
					<span>{{$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1043')}}</span>
				</li>
				<li class="fl">
					<i class="bgColorA bgcord"></i>
					<span>{{$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1044')}}</span>
				</li>
				<li class="fl">
					<i class="bgColorB bgcord"></i>
					<span>{{$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1045')}}</span>
				</li>
				<li class="fl">
					<i class="bgColorC bgcord"></i>
					<span>{{$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1046')}}</span>
				</li>
				<li class="fl">
					<i class="bgColorD bgcord"></i>
					<div style="display: inline-block;">
						<span>{{$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1047')}}</span>
						<Tooltip :content="$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1048')" theme="light" placement="top" class="header-tooltip">
							<Icon type="ios-help-circle" style="font-size: 14px;color: #999;" />
						</Tooltip>
					</div>
				</li>
			</ul>
			<div class="sign-in-top">
				<Checkbox v-model="showStudentLists" @on-change="change">{{$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1049')}}</Checkbox>
				<Button type="primary" @click="goCheckInElectronic">{{$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1050')}}</Button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		headerTitle: {
			type: String,
			default: ""
		},
		id: {
			type: [String, Number],
			required: true
		}
	},
	data() {
		return {
			showStudentLists: false,
			single: false
		};
	},
	methods: {
		changeSingle(val) {
			this.$emit("changeSingle", val, this.id);
		},
		goCheckInElectronic() {
			this.$router.push({
				name: "jw.checkInElectronic"
			});
		}
	}
};
</script>


