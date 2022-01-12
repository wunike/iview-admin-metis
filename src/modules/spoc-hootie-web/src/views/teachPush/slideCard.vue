<style lang="less">
.slide {
	padding: 18px;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	box-sizing: border-box;
	.ivu-rate-star-chart {
		margin-right: 2px !important;
	}
	&.undo {
		border-top: 2px solid #f00;
	}
	.slide_header {
		height: 24px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.student {
			/*padding-bottom: 18px;*/
			.enName {
				font-size: 16px;
				font-weight: 600;
				color: rgba(73, 80, 96, 1);
				line-height: 22px;
				font-family: PingFangSC-Medium;
			}
			.cnName {
				font-size: 12px;
				font-weight: 400;
				color: rgba(73, 80, 96, 1);
				line-height: 17px;
				padding-left: 4px;
			}
		}
		.warn {
			min-width: 124px;
			padding: 0 10px;
			height: 24px;
			background: rgba(255, 236, 228, 1);
			border-radius: 4px;
			font-size: 14px;
			text-align: center;
			font-weight: 500;
			color: rgba(255, 48, 0, 1);
			line-height: 24px;
		}
	}
	.evaluate {
		margin-top: 12px;
		.ivu-rate-star-chart.ivu-rate-star-full .ivu-rate-star-first,
		.ivu-rate-star-chart.ivu-rate-star-full .ivu-rate-star-second {
			color: rgba(253, 206, 0, 1);
		}
		.rate {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-content: center;

			.rate_lf {
				width: 510px;
				/*min-width: 150px;*/
				height: 36px;
				font-size: 12px;
				font-weight: 400;
				color: #495060;
				text-align: left;
				line-height: 20px;
				padding-left: 10px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: wrap;
				margin-bottom: 12px;
				.star {
					color: #ff3000;
				}
			}
			.rate_gt {
				/*flex: 1;*/
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-content: center;
				height: 100%;
				/*padding-bottom: 6px;*/
				padding-left: 5px;
				margin-top: 8px;
				.ivu-rate {
					line-height: 0 !important;
				}
				.nums {
					margin-left: 8px;
					margin-top: 2px;
					color: #fdce00;
				}
			}
		}
		.evaluate_text {
			margin-top: 12px;
		}
	}
	.evaluate_img {
		padding-top: 16px;
		/*min-height: calc(~"100% - 227px - 24px");*/
		height: 70px;

		/*max-height:300px;*/
		/*height:auto;*/
		/*background: red;*/
		.evaluate_img_tit {
			font-size: 14px;
			font-weight: 400;
			color: #495060;
			line-height: 20px;

			.green {
				padding-left: 5px;
				color: #44bcb7;
				font-size: 16px;
				line-height: 20px;
			}
			.red {
				padding-left: 5px;
				color: #e64630;
				font-size: 16px;
				line-height: 20px;
			}
		}
		.images_box {
			height: 70px;
			/*background: red;*/
			overflow-y: auto;
			padding-top: 12px;
			.top {
				box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
				background: #44bcb7 !important;
			}
			.down {
				box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
				background: #e64630 !important;
			}
			.ivu-badge {
				margin: 0 18px 9px 0;
				float: left;
			}
			.badge_box {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				border: 1px solid rgba(218, 218, 218, 1);
				background: #ffffff;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				overflow: hidden;
				.icon {
					border-radius: 50%;
					img {
						width: 22px;
						height: auto;
						margin-top: 6px;
					}
				}
				.del {
					position: absolute;
					display: none;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: rgba(0, 0, 0, 0.7);
					cursor: pointer;
					text-align: center;
					line-height: 40px;
				}
				&:hover {
					.del {
						display: block;
					}
				}
			}
			.add_btn {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				border: 1px solid rgba(218, 218, 218, 1);
				background: #ffffff;
				display: flex;
				justify-content: center;
				align-items: center;
				overflow: hidden;
				float: left;
				margin: 0 18px 9px 0;
			}
		}
	}
}
</style>

<template>
	<div class="slide" :class="{'undo':stuDetail.jxLessonStudentRel.isFeedback == '0'}">
		<div class="slide_header">
			<div class="student">
				<span class="enName">{{stuIndex + 1}}、{{stuDetail.enName}}</span>
				<span class="cnName">{{stuDetail.name}}</span>
			</div>
			<!--<Checkbox v-model="stuDetail.selected" @on-change="changeSendStatus">{{$t('teachpush_slidecard_622')}}</Checkbox>-->
			<div
				class="warn"
				v-if="stuDetail.jxLessonStudentRel.isFeedback == '0'"
			>{{$t('teachpush_slidecard_623')}}</div>
		</div>
		<div class="evaluate">
			<div
				v-if="stuDetail.jxLessonStudentRel && stuDetail.jxLessonStudentRel.jxStarList && stuDetail.jxLessonStudentRel.jxStarList.length "
			>
				<!-- 如果已经有了评星过的学生，则肯定有评星模板 -->
				<div class="rate" v-for="(item,index) in stuDetail.jxLessonStudentRel.jxStarList" :key="index">
					<div class="rate_lf" v-if="item.status == '1'">
						<!--<Tooltip :transfer="true"  v-if="item.remarks != null && item.remarks.length != 0 " placement="top" :max-width="200" trigger="hover">-->
						<!--<i  class="iconfont icon-tishi" style="margin-right:3px;color: #ccc;font-size:14px;"></i>-->
						<!--<div slot="content">-->
						<!--<p>{{item.remarks}}</p>-->
						<!--</div>-->
						<!--</Tooltip >-->
						<span class="star">*</span>
						{{item.remarks}}:
					</div>
					<!--:disabled="stuIndex != curSlideIndex"-->
					<div class="rate_gt" v-if="item.status == '1'">
						<Rate
							:disabled="allDisabled"
							v-model="item.starNum"
							clearable
							icon="md-star"
							@on-change="ratedStar(item.remarks,item.starNum)"
						/>
						<!--<span class="nums">{{$t('teachpush_slidecard_624', [item.starNum])}}</span>-->
						<!--<span class="nums">{{item.starNum}}</span>-->
					</div>
				</div>
			</div>
			<div>
				<Input
					@on-blur="evaluate"
					:readonly="allDisabled"
					v-model="stuDetail.jxLessonStudentRel.evaluation"
					:placeholder="$t('scoretemplate_compontents_scoremodify_528')"
					type="textarea"
					:autosize="{minRows: 3,maxRows: 3}"
					class="evaluate_text"
				/>
			</div>
		</div>
		<div class="evaluate_img">
			<div class="evaluate_img_tit">
				{{$t('teachpush_slidecard_625')}}
				<span
					:class="pointsTotal >= 0?'green':'red'"
				>{{pointsTotal > 0 ? '+' + pointsTotal : pointsTotal}}</span>
			</div>
			<div class="images_box">
				<div class="add_btn" @click="changePoints" v-show="!allDisabled">
					<Icon type="md-add" color="#999999" :size="20" />
				</div>
				<Badge
					:count="10"
					:text="item.points > 0 ? '+' + item.points : ''+item.points"
					:class-name="item.points > 0 ? 'top': 'down'"
					v-for="(item, index) in stuDetail.jxLessonStudentRel.jxPointsList"
					:key="index"
				>
					<div class="badge_box">
						<div class="icon">
							<img :src="item.iconPath" alt />
						</div>
						<!--<div class="del" @click="delFn(item,index)"><i class="iconfont icon-shanchu" style="color:#fff;font-size: 16px"></i></div>-->
					</div>
				</Badge>
			</div>
		</div>
		<score ref="score" :stuList="stuDetailList" @getfaList="getfaList"></score>
	</div>
</template>

<script>
import { mapMutations } from "vuex";
import score from "../classRoom/score";
import valid, {
	errors,
	sysUser,
	jxCourseTpl,
	jxLessonStudentRel
} from "../../libs/request";
export default {
	props: {
		allDisabled: {
			//只查看。不可修改
			type: Boolean,
			default: false
		},
		stuDetailProp: {
			type: Object,
			required: true
		},
		stuIndex: {
			type: Number,
			required: true
		},
		curSlideIndex: {
			type: Number,
			required: true
		},
		studentListLength: {
			type: Number,
			required: true
		},
		jxStarTpl: {
			type: Object,
			required: true
		},
		lessonId: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			stuDetail: {
				jxLessonStudentRel: {
					jxPointsList: []
				}
			},
			stuDetailList: []
		};
	},
	components: {
		score
	},
	computed: {
		pointsTotal() {
			let sum = 0;
			this.stuDetail.jxLessonStudentRel.jxPointsList.forEach(item => {
				sum = sum + item.points;
			});
			return sum;
		}
	},
	created() {},
	mounted() {
		this.stuDetail = this.stuDetailProp;
		this.stuDetail.selected =
			this.stuDetail.jxLessonStudentRel.sendFlag == 1 ? true : false;
		//this.stuDetail.jxLessonStudentRel.id //考勤ID
		//            console.log(this.stuDetail.jxLessonStudentRel)
		let texts = this.$el; //.querySelector("textarea");
		texts.addEventListener("mousedown", e => {
			e.stopPropagation();
		}),
			texts.addEventListener("mouseup", e => {
				e.stopPropagation();
			}),
			texts.addEventListener("mousemove", e => {
				e.stopPropagation();
			});
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		delFn(item, idx) {
			this.stuDetail.jxLessonStudentRel.jxPointsList.splice(idx, 1);
		},
		ratedStar(name, val) {
			//			    console.log(name,val)
			let jxStarList;
			jxStarList = this.stuDetail.jxLessonStudentRel.jxStarList;
			let open = true;
			jxStarList.forEach(item => {
				if (item.item == name) {
					item.starNum = parseInt(val);
				}
				if (!item.starNum && item.status == "1") {
					open = false;
				}
			});
			if (open) {
				let params = {
					id: this.stuDetail.jxLessonStudentRel.id, //考勤ID
					//id:'852b4d32f5614aed978db39f92b762c8',
					jxStarList: jxStarList,
					jxStarTpl: this.jxStarTpl
				};
				jxLessonStudentRel
					.ratedStar(params)
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							this.stuDetail.jxLessonStudentRel.isFeedback = "1";
							this.$emit("updateSendStatus");
							this.$emit("starWrite", {
								id: this.stuDetail.jxLessonStudentRel.id
							});
						} else {
							this.$Message(res.data.message);
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({ isLoading: false });
					});
			}
		},
		changeSendStatus(val) {
			let params = {
				id: this.stuDetail.jxLessonStudentRel.id, //考勤ID
				sendFlag: val ? 1 : 0
			};
			jxLessonStudentRel
				.changeSendStatus(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.$emit("updateSendStatus");
					} else {
						this.$Message(res.data.message);
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		evaluate() {
			if (!this.stuDetail.jxLessonStudentRel.evaluation) {
				return;
			}
			let params = {
				id: this.stuDetail.jxLessonStudentRel.id,
				evaluation: this.stuDetail.jxLessonStudentRel.evaluation
			};
			jxLessonStudentRel
				.evaluate(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.$emit("updateSendStatus");
					} else {
						this.$Message(res.data.message);
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		getfaList(val) {
			console.log(val);

			val.forEach(item => {
				let point = parseInt(item.points);
				if (point > 0) {
					this.stuDetail.totalpoint =
						parseInt(this.stuDetail.totalpoint) + point;
					this.stuDetail.point =
						parseInt(this.stuDetail.point) + point;
				} else {
					this.stuDetail.point =
						parseInt(this.stuDetail.point) + point;
				}
			});
			this.stuDetail.jxLessonStudentRel.jxPointsList = this.stuDetail.jxLessonStudentRel.jxPointsList.concat(
				val
			);
			this.$emit("updateSendStatus");
		},
		changePoints() {
			console.log(this.stuDetail);
			this.stuDetailList = [this.stuDetail];
			this.$refs.score.show();
			// 	let params = {
			// 		//TODO
			// 		//"lessonId":"ba76c7255c6f4eddab85df645f201b7f",
			// 		"lessonId": this.lessonId,
			// 		"lessonStudentRelIds":[
			// 			//TODO
			// 			//"852b4d32f5614aed978db39f92b762c8"
			// 			this.stuDetail.jxLessonStudentRel.id
			// 		],
			// 		"jxPointsList":[
			// 			{
			// 				"name": "表现活跃",
			// 				"iconPath": "/spoc-jw/upload/all/20190702/2_20190702185030_395.jpg",
			// 				"type": "0",
			// 				"subType": "1",
			// 				"points": 2
			// 			},
			// 			{
			// 				"name": "表现良",
			// 				"iconPath": "/spoc-jw/upload/all/20190704/bee73cc609c26d83a22ceebc880d3009_20190704143508_389.png",
			// 				"type": "0",
			// 				"subType": "1",
			// 				"points": 1
			// 			},
			// 		]
			// 	}
			// 	jxLessonStudentRel.ratedPoint(params)
			// 	.then(valid.call(this))
			// 	.then(res => {
			// 		if (res.ok) {
			// 			this.stuDetail.jxLessonStudentRel.jxPointsList = this.stuDetail.jxLessonStudentRel.jxPointsList.concat(params.jxPointsList)
			// 			this.$emit('updateSendStatus')
			// 		} else {
			// 			this.$Message(res.data.message)
			// 		}
			// 	})
			// 	.catch(errors.call(this))
			// 	.finally(() => {
			// 		this.updateLoadingStatus({ isLoading: false });
			// 	});
		}
	}
};
</script>