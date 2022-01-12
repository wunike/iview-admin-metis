<style lang="less">
.star-container {
	.ivu-modal-header {
		padding: 17px 24px 16px !important;
		background: #f7f8fa;
		border-radius: 4px;
		.ivu-modal-header-inner {
			font-size: 18px;
			font-weight: 500;
			color: rgba(0, 0, 0, 0.85);
		}
	}
	.ivu-modal-body {
		padding: 24px 24px 14px 24px !important;
	}
	.ivu-rate-star-chart.ivu-rate-star-full .ivu-rate-star-first,
	.ivu-rate-star-chart.ivu-rate-star-full .ivu-rate-star-second {
		color: rgba(253, 206, 0, 1);
	}
	.ivu-rate-star-second {
		.ivu-icon-md-star {
			margin-top: -10px;
		}
	}
	.star-container-box {
		// padding-left:56px;
		> div {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			color: #fdce00;
			margin-bottom: 10px;
			.span-name {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				width: 580px;
				height: 40px;
				margin-right: 10px;
				text-align: left;
				font-size: 14px;
				font-weight: normal;
				color: rgba(153, 153, 153, 1);
			}
			b {
				font-size: 14px;
				margin-left: 26px;
				margin-bottom: 10px;
				font-weight: normal;
				color: #fdce00;
			}
		}
	}
	.ivu-modal-footer {
		padding: 10px 24px 10px 18px;
	}
}
</style>

<template>
	<div>
		<Modal
			class="star-container"
			width="800"
			v-model="star"
			:title="$t('classroom_evaluation_91')"
			:mask-closable="false"
			@on-cancel="starCancel"
		>
			<div class="star-container-box">
				<div v-for="(item, index) in list" :key="item.item">
					<div class="span-name">{{parseInt(index+1)+','+item.remarks}}：</div>
					<Rate v-model="item.starNum" icon="md-star" />
				</div>
			</div>
			<div slot="footer">
				<Button @click="starCancel">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="starOK">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
import valid, { errors, jxLessonStudentRel } from "../../libs/request";
import { mapMutations } from "vuex";
export default {
	props: {
		stuList: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	data() {
		return {
			star: false,
			list: [],
			params: {},
			jxStarTpl: {},
			open: true,
			tmr: null
		};
	},
	mounted() {},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		show() {
			this.showTemplate();
		},
		showTemplate() {
			this.updateLoadingStatus({ isLoading: true });
			this.params = {};
			let jxStarList = this.deepClone(
				this.stuList[0].jxLessonStudentRel.jxStarList
			);
			//                console.log(jxStarList)
			this.params.id = this.stuList[0].jxLessonStudentRel.id; //考勤id
			let lessonId = this.stuList[0].jxLessonStudentRel.lessonId;
			this.list = [];
			jxLessonStudentRel
				.showStarInfo({ lessonId: lessonId })
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						if (res.data.data == null) {
							let config = {
								title: this.$t("classroom_star_127"),
								content: this.$t("classroom_star_128")
							};
							this.$Modal.warning(config);
							this.star = false;
						} else {
							this.star = true;
							this.params.jxStarTpl = res.data.data;
							//                            console.log(this.params.jxStarTpl)
							let arr = this.deepClone(
								res.data.data.jxStarTplDetailList
							);
							arr.forEach(item => {
								if (item.status == "1") {
									if (jxStarList.length > 0) {
										jxStarList.forEach(it => {
											if (it.sort == item.sort) {
												//                                                delete(item.status)
												item.starNum = Number(
													it.starNum
												);
												this.list.push(item);
											}
										});
									} else {
										//                                        delete(item.status)
										item.starNum = 0;
										this.list.push(item);
									}
								}
							});
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
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
		starCancel() {
			this.star = false;
		},
		starOK() {
			if (this.open) {
				this.open = false;
				this.params.jxStarList = this.list;
				jxLessonStudentRel
					.ratedStar(this.params)
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							this.$Message.success({
								duration: 2,
								top: 30,
								content: this.$t("classroom_star_130")
							});
							this.star = false;
							this.$emit("getfaList");
							this.open = true;
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({ isLoading: false });
					});
			} else {
				this.tmr = setTimeout(() => {
					this.open = true;
					clearTimeout(this.tmr);
				}, 1000);
			}
		}
	}
};
</script>
