<style lang="less">
.teachPush {
	position: relative;
	width: 100%;
	/*height: 100%;*/
	padding-top: 34px;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	/*overflow-x: hidden;*/
	/*background: #fff;*/
	&.clear-top {
		padding-top: 0px;
	}
	.alert {
		position: absolute;
		top: -14px;
		left: -14px;
		right: -14px;
	}
	.step {
		width: 100%;
		background: #ffffff;
		min-height: 134px;
		margin-bottom: 16px;
		padding-bottom: 16px;
		.class-info {
			height: 22px;
			/*width:100%;*/
			margin: 16px 0 16px 32px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			h2 {
				font-size: 16px;
				font-family: PingFangSC-Medium;
				font-weight: 500;
				color: rgba(73, 80, 96, 1);
				margin-right: 32px;
			}
			div {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-right: 16px;
				span {
					font-size: 14px;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
				}
				b {
					font-size: 14px;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(73, 80, 96, 1);
				}
			}
		}
		.ivu-steps {
			display: flex;
			justify-content: center;
			align-items: flex-start;
			width: 90%;
			margin: auto;
			.ivu-steps-item {
				flex: 1;
				&:last-of-type {
					flex: initial;
					width: auto !important;
				}
				.ivu-steps-head {
					width: 180px;
					display: block;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.ivu-steps-main {
					display: block;
					width: 210px;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					.ivu-steps-content {
						text-align: center;
						padding: 0;
					}
				}
				.ivu-steps-tail {
					left: 100px;
					right: 60px;
					z-index: 100;
					width: ~"calc(100% - 40px)";
				}
			}
		}
	}
	.teachPush_main {
		background: #ffffff;
		/*margin: 10px 0px;*/
		width: 100%;
		/*min-height:100px;*/
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: column;
		.teachs_btn {
			margin-left: 180px;
			width: calc(~"100% - 180px");
			padding: 10px;
			&.spc {
				width: 100%;
				margin-left: 0;
			}
		}
	}
	.teachs_btn {
		display: flex;
		justify-content: center;
		align-items: center;
		button {
			margin: 0 6px;
		}
	}
}
</style>

<template>
	<div class="teachPush" :class="{'clear-top': dels == true}">
		<Alert
			@on-close="closeAlert"
			banner
			show-icon
			closable
			type="warning"
			class="alert"
		>{{$t('teachpush_teachpush_643')}}</Alert>
		<div class="step">
			<div class="class-info">
				<h2>{{lessonName}}</h2>
				<div>
					<span>{{$t('pushsettings_index_508')}}</span>
					<b>{{lessonTotalActive}} / {{lessonTotal}}</b>
				</div>
				<div>
					<span>{{$t('courselist_compontents_modify_181')}}</span>
					<b>{{strTime}}</b>
				</div>
			</div>
			<Steps :current="current">
				<Step :title="$t('teachpush_teachpush_646')" :content="$t('teachpush_teachpush_647')">
					<p class="ivu-steps-content">{{$t('teachpush_teachpush_648')}}{{$t('teachpush_teachpush_649')}}</p>
				</Step>
				<Step :title="$t('teachpush_teachpush_650')" :content="$t('teachpush_teachpush_651')"></Step>
				<Step :title="$t('teachpush_teachpush_652')" :content="$t('teachpush_teachpush_653')"></Step>
			</Steps>
		</div>
		<div class="teachPush_main" v-if="lessonId && jxStarTpl">
			<teach-list
				@no-data="noData"
				ref="teachList"
				@if-edit="ifEditFn"
                @if-save="isSaveFn"
                :isSaved="isSave"
                :isReject="isReject"
				:classCourseData="classCourseData"
				:sendPageDetailProp="sendPageDetail"
				v-if="current == 0 && classCourseData.courseType"
			></teach-list>
<!--            && classCourseData.courseType-->
			<performances
				:allDisabled="$route.query.from == 'myCourse'"
				:lessonId="lessonId"
				@classData="classData"
				:jxStarTpl="jxStarTpl"
				v-else-if="current == 1"
			></performances>
			<replenish ref="replenish" :replenishRemarksProp="replenishRemarksProp" v-else></replenish>
			<div v-if="!noDatas" class="teachs_btn" :class=" current != 0?'spc':''">
				<div v-if="isEdit">
					<Button @click="cancelsaveFn">{{$t('classroom_allscore_53')}}</Button>
					<Button type="primary" @click="savePage">{{$t('courselist_compontents_servicecontent_215')}}</Button>
				</div>
				<div v-else>
					<Button @click="cancelFn">{{$t('classroom_allscore_53')}}</Button>
					<Button type="primary" v-if="current != 0" @click="prev">{{$t('teachpush_teachpush_656')}}</Button>
					<Button type="primary" v-if="current == 2" @click="refer">{{$t('courselist_compontents_servicecontent_214')}}</Button>
					<Button type="primary" v-if="current != 2" @click="next">{{$t('teachpush_teachpush_658')}}</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import teachList from "./teachList.vue";
import performances from "./performance.vue";
import replenish from "./replenish.vue";
import { mapMutations } from "vuex";
import valid, {
	errors,
	sysUser,
	jxCourseTpl,
	jxLessonStudentRel,
	jxLessonAudit
} from "../../libs/request";

export default {
	name: "hootie.teachPush",
	data() {
		return {
			dels: false,
			current: 0,
			isEdit: false,
			value2: "",
			lessonId: "",
			jxStarTpl: null,
			replenishRemarksProp: "",
			sendPageDetail: {},
			lessonName: "",
			lessonTotalActive: "",
			lessonTotal: "",
			strTime: "",
			noDatas: false,
			c: "",
			t: "",
			unclick: "",
			classCourseData: {},
			toTeachingSubmitAudit: false,
            isSave:false,
            saveObj:{},
            isReject:false,
		};
	},
	computed: {},
	components: {
		teachList,
		performances,
		replenish
	},
	created() {},
	mounted() {
	    // console.log(this.$route.query.from)
		this.lessonId = this.$route.query.id;
		this.getMainInfo(this.lessonId);
		// console.log(this.$route.query.isReject == true && !this.isSave)
		if (this.$route.query.isReject == true && !this.isSave) {
			this.getTeaching();
			this.isReject = true
		}
		this.getLessonDetailInfo();
		console.log(999,this.current)
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		classData(val) {
			this.c = val.c;
			this.t = val.t;
			this.unclick = val.unclick;
		},
		closeAlert() {
			this.dels = true;
		},
		noData(val) {
			this.noDatas = val;
		},
		getMainInfo(id) {
			jxLessonStudentRel
				.getLessonDetailInfo({ id: id })
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						// console.log(res)
						this.lessonName = res.data.data.lesson.className;
						this.lessonTotalActive = res.data.data.lesson.curLesson;
						this.lessonTotal = res.data.data.lesson.totalLesson;
						this.strTime = res.data.data.lesson.startTimeStr;
						this.classCourseData = res.data.data.lesson;
					} else {
						this.updateLoadingStatus({ isLoading: false });
					}
				})
				.catch(()=>{
					errors.call(this)
				})
				.finally(() => {
				});
		},
		ifEditFn(val) {
			this.isEdit = val;
		},
        isSaveFn(obj){
		    // console.log(obj)
            this.isSave = obj.isSave
            this.sendPageDetail = obj.obj
        },
		cancelsaveFn() {
			this.$Modal.confirm({
				title: this.$t("teachpush_teachpush_659"),
				content:
					'<span style="color:#F5222D;">' +
					this.$t("teachpush_teachpush_660") +
					"</span>",
				onCancel: () => {},
				onOk: () => {
					this.isEdit = false;
					this.$refs.teachList.setEdit();
				}
			});
		},
		savePage() {
			this.$refs.teachList.saveSendPageDetail();
		},
		cancelFn() {
			//            console.log(this.$route.query.classId)
			if (this.$route.query.from == "hootie.classList") {
				this.$router.push({
					name: "hootie.classList",
					query: {
						id: this.$route.query.classId
					}
				});
			} else {
				this.$router.push({
					name: "hootie.myCourse"
				});
			}
		},
		getTeaching() {
			jxLessonAudit
				.getTeaching({
					lessonId: this.$route.query.id
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
                        // console.log(res)
						let result = res.data.data;
						this.sendPageDetail = result;
						this.replenishRemarksProp = this.sendPageDetail.replenishRemarks;
						//					console.log(result)
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		savePushed() {
			this.isEdit = false;
			let replenishRemarks = this.$refs.replenish.replenishRemarks;
			this.jxCourseInfo.replenishRemarks = replenishRemarks;
			this.updateLoadingStatus({ isLoading: true });
			if (this.toTeachingSubmitAudit) {
				return;
			}
			this.toTeachingSubmitAudit = true;
			jxLessonAudit
				.teachingSubmitAudit({
					lessonId: this.lessonId,
					jxCourseInfo: this.jxCourseInfo
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data;
						if (this.$route.query.from == "hootie.classList") {
							this.$router.push({
								name: "hootie.classList",
								query: { id: this.$route.query.classId }
							});
							return;
						}
						this.$router.push({
							name: "hootie.myCourse"
						});
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.toTeachingSubmitAudit = false;
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		next() {
			if (this.current == 0) {
				this.jxCourseInfo = this.$refs.teachList.sendPageDetail;
				if (
					this.jxCourseInfo.classwork ||
					this.jxCourseInfo.classworkEn ||
					this.jxCourseInfo.targetObjectives ||
					this.jxCourseInfo.targetObjectivesEn ||
					this.jxCourseInfo.courseMaterialsEn ||
					this.jxCourseInfo.courseMaterials ||
					this.jxCourseInfo.homework ||
					this.jxCourseInfo.homeworkEn
				) {
					this.current += 1;
				} else {
					this.$Message.warning({
						top: 30,
						duration: 3,
						content: this.$t("teachpush_teachpush_661")
					});
				}
			} else if (this.current == 1) {
				if (this.unclick < 1) {
					this.current += 1;
				} else {
					this.$Modal.error({
						title: this.$t("teachpush_teachpush_662"),
						width: "600px",
						content: this.$t("teachpush_teachpush_663"),
						onCancel: () => {},
						onOk: () => {}
					});
				}
			} else {
				this.current += 1;
			}
		},
		prev() {
		    // console.log(this.sendPageDetail)
            // this.$refs.teachList.shangeSaveStauts({isSave:true})
			this.current -= 1;
		},
		refer() {
			this.$Modal.confirm({
				title: this.$t("teachpush_teachpush_664"),
				content:
					this.$t("teachpush_teachpush_665", [this.c, this.t]) +
					'<span style="color:#F5222D;">' +
					this.$t("teachpush_teachpush_666") +
					"</span>",
				onCancel: () => {},
				onOk: () => {
					let replenishRemarks = this.$refs.replenish
						.replenishRemarks;
					this.jxCourseInfo.replenishRemarks = replenishRemarks;
					this.updateLoadingStatus({ isLoading: true });
					if (this.toTeachingSubmitAudit) {
						return;
					}
					this.toTeachingSubmitAudit = true;
					jxLessonAudit
						.teachingSubmitAudit({
							lessonId: this.lessonId,
							jxCourseInfo: this.jxCourseInfo
						})
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								let result = res.data.data;
								if (
									this.$route.query.from == "hootie.classList"
								) {
									this.$router.push({
										name: "hootie.classList",
										query: { id: this.$route.query.classId }
									});
									return;
								}
								this.$router.push({
									name: "hootie.myCourse"
								});
							}
						})
						.catch(errors.call(this))
						.finally(() => {
							this.toTeachingSubmitAudit = false;
							this.updateLoadingStatus({ isLoading: false });
						});
				}
			});
		},
		getLessonDetailInfo() {
			//获取默认的评星模板。并且初始的评星数starNum  为0

			jxLessonStudentRel
				.showStarInfo({
					lessonId: this.lessonId
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						//				    console.log(res)
						let result = res.data.data;
						result.jxStarTplDetailList.forEach(item => {
							item.starNum = 0;
						});
						this.jxStarTpl = result;
						// console.log(this.jxStarTpl);
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		}
	}
};
</script>
