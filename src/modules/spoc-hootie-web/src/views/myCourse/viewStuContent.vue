<style lang="less">
@comColor: #495060;
.viewContent {
	.ivu-modal-body {
		padding-top: 0;
		padding-bottom: 0;
		padding: 0 !important;
	}
	.edit {
		position: relative;
		left: 900px;
	}
	.p340 {
		width: 340px;
	}
	.p324 {
		width: 324px;
	}
	.fl50 {
		float: left;
		width: 50%;
	}
	.fl100 {
		float: left;
		width: 100%;
	}
	.jxContent {
		.contentTitle {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 32px;
			color: #999999;
			background: #f0f2f5;
			border-radius: 4px 4px 0px 0px;
			border: 1px solid rgba(230, 231, 235, 1);
			// line-height: 32px;
			font-size: 16px;
			// text-align: center;
			.point {
				display: inline-block;
				margin-right: 4px;
				width: 4px;
				height: 4px;
				border-radius: 2px;
				background: #999999;
			}
		}
		.contentForm {
			padding: 24px 24px 0 24px;
		}
		.form1 {
			width: 464px;
			display: inline-block;
			margin-right: 22px;
			background: #ffffff;
		}
		.form2 {
			width: 464px;
			display: inline-block;
			background: #ffffff;
		}
	}
	.ap-info-item {
		h2 {
			font-size: 16px;
			font-weight: 500;
			color: rgba(73, 80, 96, 1);
			line-height: 22px;
		}
		.ap-row {
			padding: 16px 0 47px 103px;
			.ivu-steps-main {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;
			}
			.ivu-steps-content {
				padding-left: 0;
			}
			.ivu-steps-head-inner {
				span {
					display: none;
				}
			}
			.ivu-steps-title {
				margin-top: 8px;
			}
			.ivu-steps-tail {
				top: 5px;
			}
			.ivu-steps-head-inner {
				height: 12px;
				width: 12px;
			}
			.content-line {
				color: #495060;
				font-size: 12px;
				font-weight: normal;
				margin: 0;
			}
		}
		.ap-column {
			padding: 20px 0 58px 103px;
			font-size: 12px;
			.time {
				color: #22262c;
				font-weight: bold;
			}
			.content {
				margin-top: 8px;
				// color: @comColor;
			}
		}
	}
}
</style>
<template>
	<div v-if="viewContentModal">
		<Modal
			v-model="viewContentModal"
			:mask-closable="false"
			width="1000"
			:title="$t('mycourse_viewstucontent_454')"
			class="viewContent"
		>
			<Tabs v-model="tabValue" style="padding-top: 16px;">
				<TabPane :label="$t('courselist_compontents_servicecontent_202')" name="name1"></TabPane>
				<TabPane :label="$t('courselist_compontents_servicecontent_203')" name="name2"></TabPane>
			</Tabs>
			<div v-show="tabValue == 'name1'">
				<Button
					type="default"
					size="large"
					class="edit"
					@click="edit"
					v-show="!isEdit&&(formUrl!='classList')"
				>{{$t('classroom_allscore_51')}}</Button>
				<div class="jxContent">
					<div class="form1">
						<div class="contentTitle" style="width:166px;margin-left:191px;">
							<span class="point"></span>English Version
						</div>
						<div class="contentForm">
							<Form :model="sendPageDetail" :label-width="90" class="viewForm">
								<FormItem label="Course Materials:">
									<Input
										:readonly="!isEdit"
										v-model="sendPageDetail.courseMaterialsEn"
										type="textarea"
										:autosize="{minRows: 3,maxRows: 3}"
										placeholder="Enter something..."
										class="p324"
									></Input>
								</FormItem>
								<FormItem label="Target Objectives:">
									<Input
										:readonly="!isEdit"
										v-model="sendPageDetail.targetObjectivesEn"
										type="textarea"
										:autosize="{minRows: 3,maxRows: 3}"
										placeholder="Enter something..."
										class="p324"
									></Input>
								</FormItem>
								<FormItem label="Classwork:">
									<Input
										:readonly="!isEdit"
										v-model="sendPageDetail.classworkEn"
										type="textarea"
										:autosize="{minRows: 3,maxRows: 3}"
										placeholder="Enter something..."
										class="p324"
									></Input>
								</FormItem>
								<FormItem label="Homework:">
									<Input
										:readonly="!isEdit"
										v-model="sendPageDetail.homeworkEn"
										type="textarea"
										:autosize="{minRows: 3,maxRows: 3}"
										placeholder="Enter something..."
										class="p324"
									></Input>
								</FormItem>
							</Form>
						</div>
					</div>
					<div class="form2">
						<div class="contentTitle" style="width:166px;margin-left:191px;">
							<span class="point"></span>
							{{$t('mycourse_viewstucontent_458')}}
						</div>
						<div class="contentForm">
							<Form :model="sendPageDetail" :label-width="90" class="viewForm">
								<FormItem :label="$t('mycourse_viewstucontent_448')">
									<Input
										:readonly="!isEdit"
										v-model="sendPageDetail.courseMaterials"
										type="textarea"
										:autosize="{minRows: 3,maxRows: 3}"
										placeholder="Enter something..."
										class="p324"
									></Input>
								</FormItem>
								<FormItem :label="$t('mycourse_viewstucontent_449')">
									<Input
										:readonly="!isEdit"
										v-model="sendPageDetail.targetObjectives"
										type="textarea"
										:autosize="{minRows: 3,maxRows: 3}"
										placeholder="Enter something..."
										class="p324"
									></Input>
								</FormItem>
								<FormItem :label="$t('mycourse_viewstucontent_450')">
									<Input
										:readonly="!isEdit"
										v-model="sendPageDetail.classwork"
										type="textarea"
										:autosize="{minRows: 3,maxRows: 3}"
										placeholder="Enter something..."
										class="p324"
									></Input>
								</FormItem>
								<FormItem :label="$t('mycourse_viewstucontent_451')">
									<Input
										:readonly="!isEdit"
										v-model="sendPageDetail.homework"
										type="textarea"
										:autosize="{minRows: 3,maxRows: 3}"
										placeholder="Enter something..."
										class="p324"
									></Input>
								</FormItem>
							</Form>
						</div>
					</div>
				</div>
				<div>
					<Form :model="sendPageDetail" :label-width="114" class="viewForm">
						<FormItem :label="$t('mycourse_viewstucontent_463')">
							<Input
								:readonly="!isEdit"
								v-model="sendPageDetail.replenishRemarks"
								type="textarea"
								:autosize="{minRows: 3,maxRows: 3}"
								placeholder="Enter something..."
								style="width:810px;"
							></Input>
						</FormItem>
					</Form>
				</div>
			</div>
			<div v-show="tabValue == 'name2'">
				<div class="ap-info-item" style="padding:0 16px;">
					<h2 style="font-size:14px;">{{$t('courselist_compontents_servicecontent_212')}}</h2>
					<div class="ap-column">
						<Timeline>
							<TimelineItem
								:color="
                            item.status === 0? '#E72B00':
                            item.status === 1? '#44BCB7':
                            item.status === 2? '#A0A2AD':
                            '#A0A2AD'"
								v-for="item in TMLineColumn"
								:key="item.time"
							>
								<!-- unsubmit：未提交；unaudit：待审批；agree：已通过；reject：已驳回  commited 提交审批 -->
								<span
									slot="dot"
									:style="item.type === 'unsubmit'? 'background:#FFF;border:1px solid #A0A2AD':
                                    item.type === 'agree'? 'background:#44BCB7;':
                                    item.type === 'commited'? 'background:#A0A2AD;border:1px solid #A0A2AD':
                                    item.type === 'unaudit'? 'background:#A0A2AD;border:1px solid #A0A2AD':
                                    item.type === 'reject'? 'background:red;':
                                    'background:none;border:1px solid #A0A2AD'"
									style="display:inline-block;width:12px;height:12px;border-radius:50%;"
								>&nbsp;</span>
								<p class="time" style="font-size:14px;color:#22262c;font-weight:bold">
									<span>{{item.optTime}}</span>
									<span style="margin-left:50px;">{{item.optUserName}}</span>
								</p>
								<p class="content" style="font-size:12px;">{{item.reason}}</p>
							</TimelineItem>
						</Timeline>
					</div>
				</div>
			</div>
			<div slot="footer">
				<Button type="primary" size="large" @click="performanceView">{{$t('hootie.performanceView')}}</Button>
				<Button
					type="primary"
					size="large"
					@click="cancel"
					v-show="!isEdit&&(formUrl=='classList')"
				>{{$t('courselist_compontents_servicecontent_216')}}</Button>
				<Button
					type="default"
					size="large"
					@click="cancel"
					v-show="isEdit&&(formUrl!='classList')"
				>{{$t('classroom_allscore_53')}}</Button>
				<Button
					type="primary"
					size="large"
					@click="save"
					v-show="isEdit&&(formUrl!='classList')"
				>{{$t('courselist_compontents_servicecontent_215')}}</Button>
				<Button
					type="primary"
					size="large"
					@click="unPass"
					v-show="!isEdit&&(formUrl!='classList')"
				>{{$t('courselist_compontents_servicecontent_217')}}</Button>
				<Button
					type="primary"
					size="large"
					@click="pass"
					v-show="!isEdit&&(formUrl!='classList')"
				>{{$t('classlist_classlist_13')}}</Button>
			</div>
		</Modal>
		<Modal
			v-model="performanceViewModal"
			width="1000"
			:mask-closable="false"
			:title="$t('hootie.performanceView')"
		>
			<performanceView :id="lessonId" v-if="performanceViewModal && lessonId"></performanceView>
			<div slot="footer">
				<Button
					type="primary"
					size="large"
					@click="performanceViewModal = false"
				>{{$t('courselist_compontents_servicecontent_216')}}</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import valid, {
	errors,
	sysDict,
	jxLesson,
	jxClassCourse,
	jxLessonAudit
} from "../../libs/request";
import performanceView from "../teachPush/performanceView"
export default {
	components:{
		performanceView
	},
	data() {
		return {
			formUrl: "",
			tabValue: "name1",
			viewContentModal: false,
			performanceViewModal: false,
			sendPageDetail: {},
			isEdit: false,
			lessonId: "",
			TMLineColumn: []
		};
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		performanceView() {
			// this.viewContentModal = false;
			this.performanceViewModal = true;
			// this.$router.push({
			// 	name: "hootie.performanceView",
			// 	query: {
			// 		id: this.lessonId
			// 	}
			// });
		},
		edit() {
			this.isEdit = true;
		},
		cancel() {
			this.viewContentModal = false;
		},
		save() {
			jxLessonAudit
				.updateTeaching({
					lessonId: this.lessonId,
					jxCourseInfo: this.sendPageDetail
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.isEdit = false;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					//this.updateLoadingStatus({ isLoading: false });
				});
		},
		isEditFn() {
			this.isEdit = false;
		},
		isNoEditFn() {
			this.isEdit = true;
		},
		pass() {
			jxLessonAudit
				.audit({
					lessonId: this.lessonId,
					type: "teaching",
					auditStatus: "agree"
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.viewContentModal = false;
						this.$emit("doAction");
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					//this.updateLoadingStatus({ isLoading: false });
				});
		},
		unPass() {
			jxLessonAudit
				.audit({
					lessonId: this.lessonId,
					type: "teaching",
					auditStatus: "reject"
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.viewContentModal = false;
						this.$emit("doAction");
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					//this.updateLoadingStatus({ isLoading: false });
				});
		},
		getTeaching(lessonId, fromClassList) {
			if (fromClassList == "classList") {
				this.formUrl = fromClassList;
			} else {
				this.formUrl = "";
			}
			this.lessonId = lessonId;
			jxLessonAudit
				.getTeaching({
					lessonId
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data;
						this.sendPageDetail = result;
						console.log(result);
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					//this.updateLoadingStatus({ isLoading: false });
				});

			let params = {
				lessonId: lessonId,
				type: "teaching"
			};
			jxLessonAudit
				.listAuditLog(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.TMLineColumn = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					//this.updateLoadingStatus({ isLoading: false });
				});
		}
	}
};
</script>