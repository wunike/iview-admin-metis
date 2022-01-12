<style lang="less">
.evaluation-container {
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
		padding: 21px 24px 27px 24px !important;
	}
	.evaluation-container-box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		.item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 160px;
			width: 120px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
			border-radius: 4px;
			border: 1px solid rgba(230, 231, 235, 1);
			cursor: pointer;
			&:hover {
				border: 1px solid rgba(68, 188, 183, 0.55);
				box-shadow: 0px 1px 6px 0px rgba(68, 188, 183, 0.55);
			}
			img {
				height: 70px;
				width: 70px;
			}
			span {
				text-align: center;
				margin-top: 10px;
				font-size: 16px;
				font-weight: normal;
				color: rgba(73, 80, 96, 1);
			}
			&.active {
				border: 1px solid rgba(68, 188, 183, 0.55);
				box-shadow: 0px 1px 6px 0px rgba(68, 188, 183, 0.55);
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
			class="evaluation-container"
			width="800"
			v-model="showModel"
			:title="$t('classroom_evaluation_88')"
			:footer-hide="true"
			:mask-closable="false"
			@on-cancel="asyncCancel"
		>
			<div class="evaluation-container-box">
				<div @click="selectType('1')" class="item" :class="common == '1' ? 'active' :''">
					<img src="../../assets/img/coin-creator.png" />
					<span>{{$t('classroom_allscore_55')}}</span>
				</div>
				<div @click="selectType('3')" class="item" :class="common == '3' ? 'active' :''">
					<img src="../../assets/img/block-reward.png" />
					<span>{{$t('classroom_evaluation_91')}}</span>
				</div>
				<div @click="selectType('2')" class="item" :class="common == '2' ? 'active' :''">
					<img src="../../assets/img/permissioned-blockchain.png" />
					<span>{{$t('classroom_evaluation_90')}}</span>
				</div>
				<div @click="selectType('4')" class="item" :class="common == '4' ? 'active' :''">
					<img src="../../assets/img/distributed-ledger-.png" />
					<span>{{$t('classroom_evaluation_92')}}</span>
				</div>
				<div @click="selectType('5')" class="item" :class="common == '5' ? 'active' :''">
					<img src="../../assets/img/peer-to-peer.png" />
					<span>{{$t('classroom_evaluation_921')}}</span>
				</div>
			</div>
			<div slot="footer">
				<Button @click="asyncCancel">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="asyncOK">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
		<score ref="score" :stuList="stuList" @getfaList="getfaList"></score>
		<exchange ref="exchange" :stuList="stuList" @getfaList="getfaList"></exchange>
		<star ref="star" :stuList="stuList" @getfaList="getfaList"></star>
		<toEvaluation ref="toEvalution" :stuList="stuList" @getfaList="getfaList"></toEvaluation>
		<avatarChange ref="avatarChange" :stuList="stuList" @getfaList="getfaList"></avatarChange>
	</div>
</template>

<script>
import score from "./score";
import exchange from "./exchange";
import star from "./star";
import toEvaluation from "./toEvaluation";
import avatarChange from "./avatarChange";

import { mapMutations } from "vuex";
export default {
	name: "evaluation",
	props: {},
	data() {
		return {
			showModel: false,
			common: "",
			score: false,
			evaluation: false,
			star: false,
			exchange: false,
			scoreTitle: this.$t("classroom_allscore_55"),
			stuList: []
		};
	},
	components: {
		score,
		exchange,
		star,
		toEvaluation,
		avatarChange
	},
	mounted() {},
	methods: {
		show(data) {
			this.showModel = true;
			if (data != null && data.type == "score") {
				this.stuList = data.stu;
			}
		},
		asyncOK() {
			this.showModel = false;
			if (this.common == "1") {
				this.$refs.score.show();
			} else if (this.common == "2") {
				this.$refs.toEvalution.show();
			} else if (this.common == "3") {
				this.$refs.star.show();
			} else if (this.common == "4") {
				this.$refs.exchange.show();
			} else if (this.common == "5") {
				this.$refs.avatarChange.show();
			}
			this.common = "";
		},
		asyncCancel() {
			this.showModel = false;
			this.common = "";
		},
		selectType(type) {
			this.common = type;
			this.asyncOK();
		},
		getfaList() {
			this.$emit("getfaList");
		}
	}
};
</script>
