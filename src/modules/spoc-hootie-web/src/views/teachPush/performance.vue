<style lang="less">
.studPerformance {
	background: #ffffff;
	width: 100%;
	padding-top: 16px;
	.performance_tit {
		height: 22px;
		font-size: 14px;
		font-weight: 400;
		color: rgba(73, 80, 96, 1);
		line-height: 20px;
		padding: 0 20px;
		.orange {
			color: #e64630;
			font-size: 16px;
			font-weight: 600;
		}
	}
	.carousel {
		.prev {
			border-radius: 50%;
			background: rgba(0, 0, 0, 0.4);
			text-align: center;
			line-height: 42px !important;
			&:hover {
				background: rgba(0, 0, 0, 0.7) !important;
			}
			span {
				margin-right: 5px;
				color: #fff;
			}
		}
		.next {
			border-radius: 50%;
			background: rgba(0, 0, 0, 0.4);
			text-align: center;
			line-height: 42px !important;
			&:hover {
				background: rgba(0, 0, 0, 0.7) !important;
			}
			span {
				margin-left: 5px;

				color: #fff;
			}
		}
		.carousel-3d-container {
			padding: 10px;
			height: 520px !important;
			overflow-x: hidden;
			margin-bottom: 0;
		}
		.carousel-3d-slide {
			background: #ffffff;
			border: none;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2px 10px 4px rgba(0, 0, 0, 0.15);
			border-radius: 4px;
			// position: relative;
			&::after {
				content: "";
				position: absolute;
				top: 0px;
				left: 0;
				right: 0;
				bottom: 0;
				// background: rgba(0, 0, 0, 0.5);
				background: transparent;
				z-index: 100;
			}
		}
		// .carousel-3d-slide:not(.current){
		// 	// height:418px !important;
		// 	// width:318px !important;
		// 	// margin-top:27px;
		// 	// margin-right:30px !important;

		// }
		.carousel-3d-slide {
			.rightHandle {
				display: none;
			}
			.leftHandle {
				display: none;
			}
		}
		// .carousel-3d-slide:not(.right-1){
		// 	.leftHandle{
		// 		display: none;
		// 		}
		// }
		// .left-1{
		// 			margin-left:40px !important;
		// 		}
		// 		.right-1{
		// 			margin-left:27px !important;
		// 		}
		.carousel-3d-slide.current {
			&::after {
				content: "";
				display: none;
			}
		}
	}
	.left-1 {
		// transform: translateX(-200px) translateZ(-100px) rotateY(10deg) !important;
		.rightHandle {
			display: none !important;
		}
		.leftHandle {
			display: block !important;
		}
	}
	.right-1 {
		// transform: translateX(200px) translateZ(-100px) rotateY(-10deg) !important;
		.rightHandle {
			display: block !important;
		}
		.leftHandle {
			display: none !important;
		}
	}
}
</style>

<template>
	<div class="studPerformance">
		<div class="performance_tit">
			{{$t('teachpush_performance_616')}}
			<span style="font-weight:800">
				（
				<a style="cursor: default;">{{nums.sendNum}}</a>
				/ {{total}}）
			</span>
			{{$t('teachpush_performance_617')}}
			<span class="orange">{{nums.UnFeedbackNum}}</span>
			{{$t('teachpush_performance_618')}}
		</div>
		<div class="carousel" v-if="lessonDetailInfo.studentList && lessonDetailInfo.studentList.length">
			<carousel-3d
				ref="carousel3D"
				@after-slide-change="onSlideChange"
				:controlsVisible="true"
				:clickable="false"
				:animationSpeed="1000"
				:width="662"
				:height="490"
				:display="5"
				:count="lessonDetailInfo.studentList.length"
				:disable3d="false"
			>
				<slide :index="index" v-for="(item,index) in lessonDetailInfo.studentList" :key="index">
					<slide-card
						:allDisabled="allDisabled"
						@starWrite="changeIndex"
						:curSlideIndex="curSlideIndex"
						:studentListLength="studentListLength"
						:jxStarTpl="jxStarTpl"
						:lessonId="lessonId"
						@updateSendStatus="getShowLessonStudentSendStatus"
						v-if="item"
						:stuDetailProp="item"
						:stuIndex="index"
					></slide-card>
					<!-- 左侧 -->
					<!-- <div class="leftHandle">
					     <span style="color:#ccc;width:55px;height:46px;display:block;font-size:55px;margin:auto;position:absolute;top:140px;left:0px;right:0;z-index:200">
							<img src="../../../src/assets/img/shou.png" alt="" width="100%" height="100%">
						</span> 
						<i
					class="iconfont icon-BACK"
					style="color:#FFF;width:100px;height:28px;display:block;font-size:28px;margin:auto;position:absolute;top:225px;left:0px;right:0;z-index:200"
					></i>

					</div>-->
					<!-- 右侧 -->
					<!-- <div class="rightHandle">
					 <span style="color:#ccc;width:55px;height:46px;display:block;font-size:55px;margin:auto;position:absolute;top:140px;left:0px;right:0px;z-index:200">
							<img src="../../../src/assets/img/shou1.png" alt="" width="100%" height="100%">
						</span>
						<i
					class="iconfont icon-NEXT"
					style="color:#FFF;width:100px;height:28px;display:block;font-size:28px;margin:auto;position:absolute;top:225px;left:0px;right:0px;z-index:200"
					></i> 
					</div>-->
				</slide>
			</carousel-3d>
		</div>
	</div>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
import slideCard from "./slideCard.vue";
import { mapMutations } from "vuex";
import valid, {
	errors,
	sysUser,
	jxCourseTpl,
	jxLessonStudentRel
} from "../../libs/request";
export default {
	props: {
		lessonId: {
			type: String,
			required: true
		},
		jxStarTpl: {
			type: Object,
			required: true
		},
		allDisabled: {
			//只查看。不可修改
			type: Boolean,
			default: false
		}
	},
	mounted() {
		this.getLessonDetailInfo(this.lessonId);
	},
	data() {
		return {
			lessonDetailInfo: {},
			nums: {},
			curSlideIndex: 0,
			total: "",
			studentListLength: 0,
			startIndex: 0,
			list: [],
			lock: false
		};
	},
	components: {
		Carousel3d,
		Slide,
		slideCard
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		changeIndex(val) {
			// if(this.list.length > 1){
			//     this.list.forEach((item,idx) => {
			//         if(item.id == val.id){
			//             if(this.list.length == idx+1){
			//                 this.startIndex = this.list[0].index
			//             }else{
			//                 this.startIndex = this.list[idx+1].index
			//             }
			//             this.$refs.carousel3D.currentIndex=this.startIndex
			//             this.list.splice(idx,1)
			//             this.lock = true
			//         }
			//     })
			// }
		},
		setCurrent() {
			this.lessonDetailInfo.studentList.forEach((item, index) => {
				if (item.jxLessonStudentRel.isFeedback == "0") {
					this.list.push({
						id: item.jxLessonStudentRel.id,
						index: index
					});
				}
			});
			//                console.log(this.list)
		},
		isObject(o) {
			return (
				(typeof o === "object" || typeof o === "function") && o !== null
			);
		},
		deepClone(obj) {
			if (!this.isObject(obj)) {
				throw new Error(this.$t("classroom_allscore_61"));
			}
			let isArray = Array.isArray(obj);
			let cloneObj = isArray ? [] : {};
			for (let key in obj) {
				cloneObj[key] = this.isObject(obj[key])
					? this.deepClone(obj[key])
					: obj[key];
			}
			return cloneObj;
		},
		onSlideChange(val) {
			//                console.log(val)
			//                console.log(this.startIndex)
			if (this.lock) {
				this.lock = false;
				this.$refs.carousel3D.currentIndex = this.startIndex;
			} else {
				this.$refs.carousel3D.currentIndex = val;
			}
		},
		getLessonDetailInfo(id) {
			this.updateLoadingStatus({ isLoading: true });
			jxLessonStudentRel
				.getLessonDetailInfo({
					id: id
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data;
						this.total = result.lessonTotalAttendanceNum;
						//这里要转换为数字格式的评星。否则修改评星时候可能不正确

						let obj = this.deepClone(result);
						//                        console.log(obj)
						obj.studentList = [];
						obj.studentList = result.studentList.filter(item => {
							if (
								item.jxLessonStudentRel.jxAttendance.status ==
								"present"
							) {
								return item;
							}
						});
						console.log(this.jxStarTpl);
						obj.studentList.forEach(item => {
							if (item.jxLessonStudentRel) {
								item.jxLessonStudentRel.jxStarList.forEach(
									childItem => {
										childItem.starNum = parseInt(
											childItem.starNum
										);
									}
								);
							}
							if (item.jxLessonStudentRel.jxStarList.length < 1) {
								item.jxLessonStudentRel.jxStarList = JSON.parse(
									JSON.stringify(
										this.jxStarTpl.jxStarTplDetailList
									)
								);
							}
						});
						this.lessonDetailInfo = obj;
						console.log(this.lessonDetailInfo);
						this.studentListLength =
							this.lessonDetailInfo.studentList.length - 1;
						this.getShowLessonStudentSendStatus();
						this.setCurrent();
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		getShowLessonStudentSendStatus() {
			jxLessonStudentRel
				.showLessonStudentSendStatus({
					lessonId: this.lessonId
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.nums = res.data.data;
						this.$emit("classData", {
							c: this.nums.sendNum,
							t: this.total,
							unclick: this.nums.UnFeedbackNum
						});
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