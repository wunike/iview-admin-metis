<style lang="less">
.course-time-header-container {
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
	.sign-in-top {
		float: left;
		padding-left: 23px;
		button {
			margin-left: 32px;
		}
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
	<div class="course-time-header-container">
		<div class="top-left">
			<Checkbox v-model="single" v-if="needCheckbox" @on-change="changeSingle" label></Checkbox>
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
					<span>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentcourses_923')}}</span>
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
						<Tooltip theme="light" placement="top" class="header-tooltip">
                            <div slot="content">
                                <div v-if="from == 'signIn'">{{$t('modules_spoc_jw_web_src_views_schooltimetable_components_coursetimeheader_3045')}}</div>
                                <div v-else-if="from == 'class'">{{$t('modules_spoc_jw_web_src_views_schooltimetable_components_coursetimeheader_3046')}}</div>
                                <div v-else-if="from == 'teacher'">{{$t('modules_spoc_jw_web_src_views_schooltimetable_components_coursetimeheader_3047')}}</div>
                            </div>
							<Icon type="ios-help-circle" style="font-size: 14px;color: #999;" />
						</Tooltip>
					</div>
				</li>
			</ul>
			<div class="sign-in-top" v-if="fromSignIn">
				<Checkbox v-model="showStudentLists" @on-change="change">{{$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1049')}}</Checkbox>
				<Button type="primary" @click="goCheckInElectronic" v-if="myButtonPrem && myButtonPrem.indexOf('electronic') >-1">{{$t('jw.checkInElectronic')}}</Button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
	props: {
		headerTitle: {
			type: String,
			default: ""
		},
		fromSignIn: {
			// 手工签到
			type: Boolean,
			default: !false
		},
		needCheckbox: {
			// 多选
			type: Boolean,
			default: false
		},
		id: {
			type: [String, Number],
			required: true
        },
        from: {
            type: String,
            default: ''
        }
	},
	data() {
		return {
			showStudentLists: false,
			single: false
		};
	},
	computed:{
		...mapState(["app", "buttonPerm"]),
        myButtonPrem() {
            return this.buttonPerm ? (this.buttonPerm["jw.schoolTimetableSignIn"] || []) : [];
        },
    },
	methods: {
		change(val) {
			// console.log(val);
			this.$emit("setShowStudentLists", val);
		},
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


