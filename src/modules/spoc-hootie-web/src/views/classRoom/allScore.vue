<style lang="less">
.score-all-container {
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
			width: 203px;
			height: 100%;
			border-right: 1px solid rgba(230, 231, 235, 1);
			.not-one {
				height: 100%;
				width: 100%;
				padding-left: 24px;
				overflow-y: auto;
				.title {
					font-size: 14px;
					font-weight: 400;
					color: rgba(73, 80, 96, 1);
					margin-top: 10px;
					margin-bottom: 12px;
					span {
						color: #44bcb7;
					}
					b {
						font-weight: 400;
					}
				}
				.not-one-box {
					width: 100%;
					margin-top: 38px;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: flex-start;
					flex-wrap: wrap;
					.stu-item {
						height: 80px;
						width: 59px;
						margin-right: 30px;
						margin-bottom: 11px;
						&:nth-of-type(even) {
							margin-right: 0px;
						}

						.stu-item-box {
							height: 44px;
							width: 100%;
							position: relative;
							margin-bottom: 16px;
							background: rgba(255, 255, 255, 1);
							box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.05);
							border-radius: 6px;
							border: 1px solid rgba(247, 248, 250, 1);
							.stu-box {
								width: 100%;
								height: auto;
								top: -36px;
								left: 10px;
								position: absolute;
								display: flex;
								flex-direction: row;
								justify-content: center;
								align-items: flex-end;
								img {
									height: 35px;
									width: auto;
								}
							}
							.del {
								position: absolute;
								height: 14px;
								width: 14px;
								top: -7px;
								right: -7px;
								cursor: pointer;
							}
							div {
								width: 80px;
								margin-left: -10px;
								text-align: center;
								margin-top: 10px;
								font-size: 12px;
								font-weight: 500;
								color: rgba(73, 80, 96, 1);
							}
						}
					}
				}
			}
		}
		.scb-right {
			width: 596px;
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
				padding: 0 10px 0 24px;
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
		<audio src="/spoc-jw/upload/sounds/Points/Positive.mp3" id="all_point0" style="display:none;" />
		<!-- 加分 -->
		<audio src="/spoc-jw/upload/sounds/Points/NeedsToWork.mp3" id="all_point1" style="display:none;" />
		<!-- 扣分 -->
		<Modal
			class="score-all-container"
			width="800"
			v-model="score"
			:title="scoreTitle"
			:mask-closable="false"
			@on-cancel="scoreCancel"
		>
			<div class="score-container-box">
				<div class="scb-left">
					<div class="not-one" v-if="stuListCopy.length >= 1">
						<div class="title">
							{{$t('classroom_allscore_47')}}
							<span>{{selectTotal}}</span>/
							<b>{{stuList.length}}</b>）
						</div>
						<div class="not-one-box">
							<div class="stu-item" v-for="(item,index) in stuListCopy" :key="index">
								<div class="stu-item-box">
									<div class="stu-box">
										<img v-if="item.classAvatarPath !== null" :src="item.classAvatarPath" />
										<img v-else-if="randomTX(item.phone) === 0" src="../../assets/img/tx-0.png" />
										<img class="stu" v-else-if="randomTX(item.phone) === 1" src="../../assets/img/tx-1.png" />
										<img class="stu" v-else-if="randomTX(item.phone) === 2" src="../../assets/img/tx-2.png" />
										<img class="stu" v-else-if="randomTX(item.phone) === 3" src="../../assets/img/tx-4.png" />
										<img class="stu" v-else-if="randomTX(item.phone) === 5" src="../../assets/img/tx-5.png" />
										<img class="stu" v-else-if="randomTX(item.phone) === 6" src="../../assets/img/tx-6.png" />
										<img class="stu" v-else-if="randomTX(item.phone) === 7" src="../../assets/img/tx-7.png" />
										<img class="stu" v-else-if="randomTX(item.phone) === 8" src="../../assets/img/tx-8.png" />
										<img class="stu" v-else-if="randomTX(item.phone) === 9" src="../../assets/img/tx-9.png" />
										<img class="stu" v-else-if="randomTX(item.phone) === 10" src="../../assets/img/tx-10.png" />
									</div>
									<img class="del" src="../../assets/img/delete-stu.png" @click="delStu(item)" />
									<div>{{item.enName}}</div>
									<div style="margin-top:0px;">{{item.name}}</div>
								</div>
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
								v-for="item in reward"
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
								<div class="score">{{item.points}}</div>
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
				<Button @click="scoreCancel">{{$t('classroom_allscore_53')}}</Button>
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
	props: {},
	data() {
		return {
			score: false,
			showModel: false,
			scoreTitle: this.$t("classroom_allscore_55"),
			chooseScoreType: "1",
			selectTotal: 0,
			stuScore: 0, //可用积分
			reward: [],
			punishment: [],
			stuList: [],
			stuListCopy: [],
			ifEdit: false,
			jxPointsList: [],
			open: true,
			tmr: null,
			lang: 0
		};
	},
	components: {
		addScore
	},
	mounted() {
		console.log();
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		randomTX(number) {
			//                console.log(number)
			let num = Number(number.slice(-2)) % 11;
			console.log(num);
			return num;
		},
		toAdd(type) {
			this.$refs.addScore.showNewScore({}, type);
		},
		getScoreDatas() {
			this.findBySubType(0);
			this.findBySubType(1);
		},
		show(obj) {
			this.lang = this.$i18n.locale == "en-US" ? 1 : 0;
			this.score = true;
			this.findBySubType(0);
			this.findBySubType(1);
			this.chooseScoreType = "1";
			this.stuList = obj.stu;
			this.stuListCopy = this.deepClone(this.stuList);
			this.selectTotal = this.stuList.length;
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
						console.log();
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
					let stu = [];
					let stuSucess = [];
					this.stuListCopy.forEach(item => {
						if (this.stuScore + item.point < 0) {
							stu.push(item.name);
						} else {
							stuSucess.push(item.jxLessonStudentRel.id);
						}
					});
					if (stu.length > 0) {
						let config = {
							title: this.$t("classroom_allscore_57"),
							content:
								"<div>" +
								this.$t("classroom_allscore_58") +
								stu.length +
								this.$t("classroom_allscore_59") +
								"</div>" +
								stu.join("、")
						};
						this.$Modal.error(config);
						this.open = true;
					} else {
						let params = {
							lessonId: this.stuList[0].jxLessonStudentRel
								.lessonId,
							lessonStudentRelIds: stuSucess,
							jxPointsList: this.jxPointsList
						};
						if (this.jxPointsList[0].subType == "1") {
							//加分
							document.getElementById("all_point0").play();
						} else if (this.jxPointsList[0].subType == "0") {
							//减分
							document.getElementById("all_point1").play();
						}
						jxLessonStudentRel
							.ratedPoint(params)
							.then(valid.call(this))
							.then(res => {
								if (res.ok) {
									this.$Message.success({
										duration: 2,
										top: 30,
										content: this.$t(
											"classroom_allscore_60"
										)
									});
									this.stuScore = 0;
									this.score = false;
									this.jxPointsList = [];
									this.$emit("getfaList");
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
			if (this.selectTotal < 2) {
			} else {
				this.stuListCopy.forEach((item1, index) => {
					if (item1.name == item.name) {
						this.stuListCopy.splice(index, 1);
					}
				});
			}
			this.selectTotal = this.stuListCopy.length;
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
		}
	}
};
</script>
