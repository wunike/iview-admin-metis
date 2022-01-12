<style lang="less">
.to-evaluation-container {
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
		padding: 0 !important;
	}
	.evaluation-container-box {
	}
	.ivu-modal-footer {
		padding: 10px 24px 10px 18px;
	}
	.to-evaluation-container-box {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		height: 225px;
		.only-one-info {
			height: 100%;
			width: 636px;
			padding: 24px;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: flex-start;
			> span {
				font-size: 14px;
				font-weight: normal;
				color: rgba(153, 153, 153, 1);
				margin-right: 10px;
				margin-top: 10px;
			}
		}
		.only-one {
			height: 100%;
			width: 163px;
			padding: 0 30px;
			border-right: 1px solid #d9d9d9;
			.only-one-top {
				height: 75px;
				width: 100px;
				margin-top: 63px;
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
}
</style>

<template>
	<Modal
		class="to-evaluation-container"
		width="800"
		v-model="evaluation"
		:title="$t('classroom_evaluation_90')"
		:mask-closable="false"
		@on-cancel="evaluationCancel"
	>
		<div class="to-evaluation-container-box">
			<div class="only-one" v-if="stuList.length == 1">
				<div class="only-one-top">
					<div class="stu-box">
						<img class="stu" v-if="stuList[0].classAvatarPath !== null" :src="stuList[0].classAvatarPath" />
						<img class="stu" v-else-if="randomTX(stuList[0].phone) === 0" src="../../assets/img/tx-0.png" />
						<img class="stu" v-else-if="randomTX(stuList[0].phone) === 1" src="../../assets/img/tx-1.png" />
						<img class="stu" v-else-if="randomTX(stuList[0].phone) === 2" src="../../assets/img/tx-2.png" />
						<img class="stu" v-else-if="randomTX(stuList[0].phone) === 3" src="../../assets/img/tx-4.png" />
						<img class="stu" v-else-if="randomTX(stuList[0].phone) === 5" src="../../assets/img/tx-5.png" />
						<img class="stu" v-else-if="randomTX(stuList[0].phone) === 6" src="../../assets/img/tx-6.png" />
						<img class="stu" v-else-if="randomTX(stuList[0].phone) === 7" src="../../assets/img/tx-7.png" />
						<img class="stu" v-else-if="randomTX(stuList[0].phone) === 8" src="../../assets/img/tx-8.png" />
						<img class="stu" v-else-if="randomTX(stuList[0].phone) === 9" src="../../assets/img/tx-9.png" />
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
			<div class="only-one-info">
				<span>{{$t('classroom_toevaluation_134')}}</span>
				<Input
					v-model="text"
					type="textarea"
					style="width:455px;"
					:autosize="{minRows: 8,maxRows: 8}"
					:placeholder="$t('classroom_toevaluation_135')"
				/>
				<Button
					style="margin-top:72px;margin-left:24px;"
					@click="clear"
				>{{$t('classroom_toevaluation_136')}}</Button>
			</div>
		</div>
		<div slot="footer">
			<Button @click="evaluationCancel">{{value}}</Button>
			<Button type="primary" @click="evaluationOK">{{$t('classroom_allscore_54')}}</Button>
		</div>
	</Modal>
</template>

<script>
import valid, { errors, jxLessonStudentRel } from "../../libs/request";
import { mapMutations } from "vuex";
export default {
	name: "toEvaluation",
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
			evaluation: false,
			text: "",
			params: {},
			value: this.$t("classroom_allscore_53")
		};
	},
	mounted() {},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		randomTX(number) {
			//                console.log(number)
			let num = Number(number.slice(-2)) % 11;
			// console.log(num)
			return num;
		},
		show() {
			this.text = "";
			this.evaluation = true;
			this.text = this.stuList[0].jxLessonStudentRel.evaluation;
			//                console.log(this.stuList[0].jxLessonStudentRel.evaluation)
		},
		evaluationCancel() {
			this.evaluation = false;
			this.params = {};
		},
		clear() {
			this.text = "";
		},
		evaluationOK() {
			let txt = this.text.replace(/\s+/g, "");
			if (txt.length > 0) {
				this.updateLoadingStatus({ isLoading: true });
				this.params.id = this.stuList[0].jxLessonStudentRel.id;
				this.params.evaluation = this.text;
				jxLessonStudentRel
					.evaluate(this.params)
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							this.$Message.success({
								duration: 2,
								top: 30,
								content: this.$t("classroom_toevaluation_139")
							});
							this.evaluation = false;
							this.$emit("getfaList");
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({ isLoading: false });
					});
			} else {
				this.$Message.warning({
					duration: 3,
					top: 30,
					content: this.$t("classroom_toevaluation_140")
				});
			}
		}
	}
};
</script>
