<style lang="less">
.exchange-container {
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
		padding: 24px 24px 12px 24px !important;
	}
	.exchange-container-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		div {
			width: 100%;
			height: 36px;
			line-height: 16px;
		}
		span {
			font-size: 14px;
			font-weight: normal;
			color: rgba(153, 153, 153, 1);
			margin-right: 10px;
		}
		b {
			font-size: 14px;
			font-weight: normal;
			color: rgba(73, 80, 96, 1);
		}
	}
	.exchange-container-box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		width: 100%;
		.box-left {
			span {
				display: inline-block;
				width: 70px;
				font-size: 14px;
				font-weight: normal;
				color: rgba(153, 153, 153, 1);
			}
		}
		.box-right {
			width: calc(~"100% - 70px");
			min-height: 128px;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: flex-start;
			flex-wrap: wrap;
			overflow-y: auto;
			margin-left: 10px;
			.item {
				width: 128px;
				height: 128px;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				align-items: center;
				background: rgba(250, 250, 250, 1);
				border-radius: 6px;
				border: 1px solid rgba(218, 218, 218, 1);
				margin-right: 12px;
				margin-bottom: 12px;
				position: relative;
				cursor: pointer;
				&.selected {
					background: #eafffe;
					border: 1px solid rgba(68, 188, 183, 0.5);
				}
				.score {
					width: 38px;
					height: 34px;
					text-align: center;
					background: rgba(68, 188, 183, 1);
					box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
					border-radius: 21px;
					border: 3px solid rgba(255, 255, 255, 1);
					position: absolute;
					top: 4px;
					right: 4px;
					font-size: 12px;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
					line-height: 30px;
				}
				.mask {
					width: 128px;
					height: 128px;
					position: absolute;
					top: 0;
					left: 0;
					background: rgba(0, 0, 0, 0.7);
					border-radius: 6px;
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					align-items: center;
					color: #fff;
					font-size: 14px;
					cursor: pointer;
					z-index: 2;
					span {
						margin-top: 14px;
						margin-bottom: 20px;
					}
				}
				> img {
					height: 50px;
					width: 50px;
				}
				> span {
					font-size: 14px;
					font-weight: 400;
					color: rgba(73, 80, 96, 1);
					margin-top: 14px;
					margin-bottom: 20px;
				}
			}
		}
	}
	.ivu-modal-footer {
		padding: 10px 24px 10px 18px;
	}
	.overH {
		display: inline-block;
		width: 90px;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
</style>

<template>
	<div>
		<audio :src="exchangeGiftsFilePath" id="point2" style="display:none;" />
		<!-- 兑换 -->
		<Modal
			class="exchange-container"
			width="600"
			v-model="exchange"
			:title="$t('classroom_evaluation_92')"
			:mask-closable="false"
			@on-cancel="exchangeCancel"
		>
			<div class="exchange-container-header">
				<div>
					<span>{{$t('classroom_exchange_96')}}</span>
					<b>{{this.stuList.length >0 ? this.stuList[0].name :''}}</b>
				</div>
				<div>
					<span>{{$t('classroom_exchange_97')}}</span>
					<b>{{this.stuList.length >0 ? this.stuList[0].point:''}}</b>
				</div>
			</div>
			<div class="exchange-container-box">
				<div class="box-left">
					<span>{{$t('classroom_exchange_98')}}</span>
				</div>
				<div class="box-right">
					<div
						class="item"
						:class="{'selected':item.selected }"
						v-for="item in exchangeList"
						:key="item.name"
						@mouseenter="inItem(item)"
						@mouseleave="outItem(item)"
						@click="selectScore(item)"
					>
						<div class="mask" v-if="item.mask && ifEdit" @click="deleteScore(item)">
							<Icon size="30" type="ios-trash-outline" />
							<span>{{$t('classroom_allscore_50')}}</span>
						</div>
						<img :src="item.iconPath" />
						<span
							class="overH"
							:title="lang == 0 ? item.name : item.nameEn"
						>{{lang == 0 ? item.name : item.nameEn}}</span>
						<div class="score">{{item.points}}</div>
					</div>
					<!--<div class="item" v-if="!ifEdit">-->
					<!--<img src="../../assets/img/edit-score.png">-->
					<!--<span>{{$t('classroom_allscore_51')}}</span>-->
					<!--</div>-->
					<div class="item" v-if="!ifEdit" @click="toAdd('2')">
						<img src="../../assets/img/reward-add.png" />
						<span>{{$t('classroom_allscore_52')}}</span>
					</div>
				</div>
			</div>
			<div slot="footer">
				<Button @click="exchangeCancel">{{value}}</Button>
				<Button type="primary" @click="exchangeOK">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
		<addScore ref="addScore" @updateList="getScoreDatas"></addScore>
	</div>
</template>

<script>
import valid, {
	errors,
	jxLessonStudentRel,
	jxPointsTpl
} from "../../libs/request";
import addScore from "../scoreTemplate/compontents/scoreModify.vue";

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
			exchangeGiftsFilePath:
				(location.hostname == "hootie.athenaca.com" ? "" : "/spoc-jw") +
				"/upload/sounds/Points/ExchangeGifts.mp3",
			exchange: false,
			Title: this.$t("classroom_allscore_55"),
			exchangeList: [],
			ifEdit: false,
			jxPointsList: [],
			stuScore: 0, //可用积分
			open: true,
			tmr: null,
			value: this.$t("classroom_allscore_53"),
			lang: 0
		};
	},
	mounted() {},
	components: {
		addScore
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		toAdd(type) {
			this.$refs.addScore.showNewScore({}, type);
		},
		getScoreDatas() {
			this.findBySubType(2);
		},
		show(val) {
			this.lang = this.$i18n.locale == "en-US" ? 1 : 0;
			if (val == "course") {
				this.value = this.$t("classroom_exchange_105");
			} else {
				this.value = this.$t("classroom_allscore_53");
			}
			this.findBySubType(2);
			this.exchange = true;
		},
		findBySubType(type) {
			this.updateLoadingStatus({ isLoading: true });
			let params = {
				subType: type
			};
			jxPointsTpl
				.findBySubType(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let data = res.data.data;
						data.forEach(item => {
							item.selected = false;
							item.mask = false;
						});
						if (type == 2) {
							this.exchangeList = data;
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		exchangeCancel() {
			this.exchange = false;
			this.stuScore = 0;
			this.jxPointsList = [];
		},
		selectScore(item) {
			item.selected = !item.selected;
			let obj = {};
			if (item.selected) {
				this.stuScore += item.points;
				obj = {
					name: item.name,
					nameEn: item.nameEn,
					iconPath: item.iconPath,
					type: item.type,
					subType: item.subType,
					points: item.points
				};
				this.jxPointsList.push(obj);
			} else {
				this.stuScore -= item.points;
				this.jxPointsList.forEach((item1, index) => {
					if (item1.name == item.name) {
						this.jxPointsList.splice(index, 1);
					}
				});
			}
		},
		exchangeOK() {
			//                console.log(-this.stuScore)
			if (this.open) {
				this.open = false;
				if (this.jxPointsList.length > 0) {
					if (this.stuScore + this.stuList[0].point < 0) {
						let config = {
							duration: 2,
							top: 30,
							content: this.$t("classroom_exchange_106")
						};
						this.$Message.error(config);
						this.open = true;
					} else {
						let params = {
							lessonId: this.stuList[0].jxLessonStudentRel
								.lessonId,
							lessonStudentRelIds: [
								this.stuList[0].jxLessonStudentRel.id
							],
							jxPointsList: this.jxPointsList
						};
						document.getElementById("point2").play();
						jxLessonStudentRel
							.ratedPoint(params)
							.then(valid.call(this))
							.then(res => {
								if (res.ok) {
									this.$Message.success({
										duration: 2,
										top: 30,
										content:
											this.$t("classroom_exchange_107") +
											"<span>" +
											parseInt(-this.stuScore) +
											"</span>" +
											this.$t("classroom_exchange_108")
									});
									this.score = false;
									this.$emit("getfaList",true);
									this.exchange = false;
									this.stuScore = 0;
									this.jxPointsList = [];
									this.open = true;
								}
							})
							.catch(errors.call(this));
					}
				} else {
					this.$Message.warning({
						duration: 2,
						top: 30,
						content: this.$t("classroom_exchange_109")
					});
					this.open = true;
				}
			} else {
				this.tmr = setTimeout(() => {
					this.open = true;
					clearTimeout(this.tmr);
				}, 1000);
			}
		},
		deleteScore(item) {},
		editScore() {
			this.ifEdit = true;
		},
		outItem(item) {
			item.mask = !item.mask;
		},
		inItem(item) {
			item.mask = !item.mask;
		}
	}
};
</script>
