<style lang="less">
.score-container {
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
		padding: 0px !important;
	}
	.ivu-modal-footer {
		padding: 10px 24px 10px 18px;
	}
	.score-container-box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
		height: 383px;
		.scb-left {
			width: 160px;
			height: 100%;
			border-right: 1px solid rgba(230, 231, 235, 1);
			.only-one {
				height: 100%;
				width: 100%;
				padding: 0 30px;
				.only-one-top {
					height: 75px;
					width: 100px;
					margin-top: 130px;
					position: relative;
					margin-bottom: 16px;
					background: rgba(255, 255, 255, 1);
					box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.05);
					border-radius: 6px;
					border: 1px solid rgba(247, 248, 250, 1);
					.stu-box {
						width: 100%;
						height: auto;
						top: -65px;
						left: 0;
						position: absolute;
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: flex-end;
						img {
							height: 59px;
							width: auto;
						}
					}
					div {
						text-align: center;
						margin-top: 25px;
						font-size: 14px;
						font-weight: 500;
						color: rgba(73, 80, 96, 1);
					}
				}
				.only-one-bottom {
					div {
						width: 120%;
						span {
							font-size: 14px;
							font-weight: 400;
							color: rgba(73, 80, 96, 1);
						}
						b {
							font-size: 14px;
							font-weight: 400;
							color: rgba(73, 80, 96, 1);
							&.s {
								color: rgba(68, 188, 183, 1);
							}
						}
					}
				}
			}
		}
		.scb-right {
			width: 639px;
			height: 100%;
			.operation-tab {
				width: 639px;
				height: 91px;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				border-radius: 6px;
				.btn {
					height: 42px;
					width: 200px;
					line-height: 42px;
					text-align: center;
					color: #44bcb7;
					border: 1px solid #44bcb7;
					cursor: pointer;
					&.active {
						background: #44bcb7;
						color: #fff;
						cursor: default;
					}
				}
			}
			.operation-box {
				width: 100%;
				padding: 0 10px 0 46px;
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
					&:nth-of-type(4n) {
						margin-right: 0px;
					}
					.score {
						width: 38px;
						height: 34px;
						text-align: center;
						background: #44bcb7;
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
						&.punish {
							background: #e64630;
						}
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
				.reward {
					height: 268px;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: flex-start;
					flex-wrap: wrap;
					overflow-y: auto;
				}
				.punishment {
					height: 268px;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: flex-start;
					flex-wrap: wrap;
					overflow-y: auto;
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
		}
	}
}
</style>

<template>
	<div>
		<audio :src="positiveFilePath" id="point0" style="display:none;" />
		<!-- 加分 -->
		<audio :src="needsToWorkFilePath" id="point1" style="display:none;" />
		<!-- 扣分 -->
		<Modal
			class="score-container"
			width="800"
			v-model="score"
			:title="scoreTitle"
			:mask-closable="false"
			@on-cancel="scoreCancel"
		>
			<div class="score-container-box">
				<div class="scb-left">
					<div class="only-one" v-if="stuList.length == 1">
						<div class="only-one-top">
							<div class="stu-box">
								<img
									class="stu"
									v-if="stuList[0].classAvatarPath !== null"
									:src="stuList[0].classAvatarPath"
								/>
								<img
									class="stu"
									v-else-if="randomTX(stuList[0].phone) === 0"
									src="../../assets/img/tx-0.png"
								/>
								<img
									class="stu"
									v-else-if="randomTX(stuList[0].phone) === 1"
									src="../../assets/img/tx-1.png"
								/>
								<img
									class="stu"
									v-else-if="randomTX(stuList[0].phone) === 2"
									src="../../assets/img/tx-2.png"
								/>
								<img
									class="stu"
									v-else-if="randomTX(stuList[0].phone) === 3"
									src="../../assets/img/tx-4.png"
								/>
								<img
									class="stu"
									v-else-if="randomTX(stuList[0].phone) === 5"
									src="../../assets/img/tx-5.png"
								/>
								<img
									class="stu"
									v-else-if="randomTX(stuList[0].phone) === 6"
									src="../../assets/img/tx-6.png"
								/>
								<img
									class="stu"
									v-else-if="randomTX(stuList[0].phone) === 7"
									src="../../assets/img/tx-7.png"
								/>
								<img
									class="stu"
									v-else-if="randomTX(stuList[0].phone) === 8"
									src="../../assets/img/tx-8.png"
								/>
								<img
									class="stu"
									v-else-if="randomTX(stuList[0].phone) === 9"
									src="../../assets/img/tx-9.png"
								/>
								<img
									class="stu"
									v-else-if="randomTX(stuList[0].phone) === 10"
									src="../../assets/img/tx-10.png"
								/>
							</div>
							<div>{{stuList[0].enName}}</div>
							<div style="margin-top:0px;">{{stuList[0].name}}</div>
						</div>
						<div class="only-one-bottom">
							<div>
								<span>{{$t('classroom_exchange_97')}}</span>
								<b class="s">{{stuList[0].point}}</b>
							</div>
							<div>
								<span>{{$t('classroom_score_111')}}</span>
								<b>{{stuList[0].totalpoint == undefined ? 0 : stuList[0].totalpoint}}</b>
							</div>
						</div>
					</div>
				</div>
				<div class="scb-right">
					<div class="operation-tab">
						<div
							class="btn"
							@click="chooseScoreTypeFn('1')"
							:class="chooseScoreType == '1' ? 'active':''"
							style="border-radius:6px 0px 0px 6px"
						>{{$t('classroom_allscore_48')}}</div>
						<div
							class="btn"
							@click="chooseScoreTypeFn('2')"
							:class="chooseScoreType == '2' ? 'active':''"
							style="border-radius:0px 6px 6px 0px"
						>{{$t('classroom_allscore_49')}}</div>
					</div>
					<div class="operation-box">
						<div class="reward" v-if="chooseScoreType == '1'">
							<div
								class="item"
								:class="{'selected':item.selected }"
								v-for="(item,index) in reward"
								:key="index"
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

							<!--<div class="item" v-if="!ifEdit" >-->
							<!--<img src="../../assets/img/edit-score.png">-->
							<!--<span>{{$t('classroom_allscore_51')}}</span>-->
							<!--</div>-->
							<div @click="toAdd('1')" class="item" v-if="!ifEdit">
								<img src="../../assets/img/reward-add.png" />
								<span>{{$t('classroom_allscore_52')}}</span>
							</div>
						</div>
						<div class="punishment" v-if="chooseScoreType == '2'">
							<div
								class="item"
								:class="{'selected':item.selected }"
								v-for="item in punishment"
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
								<div class="score punish">{{item.points}}</div>
							</div>

							<!--<div class="item" v-if="!ifEdit" >-->
							<!--<img src="../../assets/img/edit-score.png">-->
							<!--<span>{{$t('classroom_allscore_51')}}</span>-->
							<!--</div>-->
							<div @click="toAdd('0')" class="item" v-if="!ifEdit">
								<img src="../../assets/img/reward-add.png" />
								<span>{{$t('classroom_allscore_52')}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer">
				<Button @click="scoreCancel">{{value}}</Button>
				<Button type="primary" @click="scoreOK">{{$t('classroom_allscore_54')}}</Button>
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
	name: "score",
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
			positiveFilePath:
				(location.hostname == "hootie.athenaca.com" ? "" : "/spoc-jw") +
				"/upload/sounds/Points/Positive.mp3",
			needsToWorkFilePath:
				(location.hostname == "hootie.athenaca.com" ? "" : "/spoc-jw") +
				"/upload/sounds/Points/NeedsToWork.mp3",
			score: false,
			showModel: false,
			scoreTitle: this.$t("classroom_allscore_55"),
			chooseScoreType: "1",
			totalScore: 0, //累计积分
			stuScore: 0, //可用积分
			reward: [],
			punishment: [],
			ifEdit: false,
			jxPointsList: [],
			open: true,
			tmr: null,
			value: this.$t("classroom_allscore_53"),
			lang: 0
		};
	},
	components: {
		addScore
	},
	mounted() {
		//            console.log(this.stuList)
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		randomTX(number) {
			//                console.log(number)
			let num = Number(number.slice(-2)) % 11;
			// console.log(num)
			return num;
		},
		toAdd(type) {
			this.$refs.addScore.showNewScore({}, type);
		},
		getScoreDatas() {
			this.findBySubType(0);
			this.findBySubType(1);
		},
		show(val) {
			this.lang = this.$i18n.locale == "en-US" ? 1 : 0;
			if (val == "course") {
				this.value = this.$t("classroom_exchange_105");
			} else {
				this.value = this.$t("classroom_allscore_53");
			}
			this.score = true;
			this.findBySubType(0);
			this.findBySubType(1);
			this.chooseScoreType = "1";
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
						if (type == 0) {
							this.punishment = data;
						} else if (type == 1) {
							this.reward = data;
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		outItem(item) {
			item.mask = !item.mask;
		},
		inItem(item) {
			item.mask = !item.mask;
		},
		deleteScore(item) {},
		editScore() {
			this.ifEdit = true;
		},
		scoreCancel() {
			this.score = false;
			this.stuScore = 0;
			this.jxPointsList = [];
		},
		selectScore(item) {
			item.selected = !item.selected;
			let obj = {};
			if (item.selected) {
				this.stuScore += item.points;
				this.totalScore += item.points;
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
				this.totalScore += item.points;
				this.jxPointsList.forEach((item1, index) => {
					if (item1.name == item.name) {
						this.jxPointsList.splice(index, 1);
					}
				});
			}
		},
		scoreOK() {
			if (this.open) {
				this.open = false;
				if (this.jxPointsList.length == 0) {
					this.$Message.warning({
						duration: 2,
						top: 30,
						content: this.$t("classroom_allscore_56")
					});
					this.open = true;
				} else {
                    // console.log(this.stuScore)
                    // console.log(this.jxPointsList)
                    // console.log(this.stuList[0])
				    if(this.stuList[0].totalpoint + this.stuScore < 0){
                        let config = {
                            title: this.$t("classroom_allscore_57"),
                        };
                        this.$Modal.error(config);
                        this.open = true;
                    } else {
                        let params = {
                            lessonId: this.stuList[0].jxLessonStudentRel.lessonId,
                            lessonStudentRelIds: [
                                this.stuList[0].jxLessonStudentRel.id
                            ],
                            jxPointsList: this.jxPointsList
                        };
                        if (this.jxPointsList[0].subType == "1") {
                            //加分
                            document.getElementById("point0").play();
                        } else if (this.jxPointsList[0].subType == "0") {
                            //减分
                            document.getElementById("point1").play();
                        }
                        jxLessonStudentRel
                        .ratedPoint(params)
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                this.$Message.success({
                                    duration: 2,
                                    top: 30,
                                    content: this.$t("classroom_allscore_60")
                                });
                                this.score = false;
                                this.$emit("getfaList", this.jxPointsList);
                                this.jxPointsList = [];
                                this.stuScore = 0;
                                this.open = true;
                            }
                        })
                        .catch(errors.call(this));
                    }

				}
			} else {
				this.tmr = setTimeout(() => {
					this.open = true;
					clearTimeout(this.tmr);
				}, 1000);
			}
		},
		chooseScoreTypeFn(type) {
			this.chooseScoreType = type;
		},
		delStu(item) {
			//                console.log(item)
		}
	}
};
</script>
