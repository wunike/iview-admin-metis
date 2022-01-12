<style lang="less">
.replenish {
	padding-top: 16px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	.replenish_wrap {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 0 64px;
		.replenish_tit {
			width: 90px;
			font-size: 14px;
			font-weight: normal;
			color: rgba(153, 153, 153, 1);
			line-height: 21px;
			text-align: right;
			padding-right: 10px;
		}
		.replenish_cont {
			flex: 1;
			font-size: 14px;
			font-weight: 400;
			color: rgba(73, 80, 96, 1);
			line-height: 20px;
		}
	}
}
</style>

<template>
	<div class="replenish">
		<div class="replenish_wrap">
			<div class="replenish_tit">{{$t('mycourse_viewstucontent_463')}}</div>
			<div class="replenish_cont">
				<Input
					v-model="replenishRemarks"
					style="width:520px;"
					:autosize="{minRows: 5,maxRows: 5}"
					type="textarea"
					:maxlength="300"
					:placeholder="$t('teachpush_replenish_621')"
				/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		replenishRemarksProp: {
			type: String
		}
	},
	mounted() {
		this.replenishRemarks = this.replenishRemarksProp + "";
	},
	data() {
		return {
			replenishRemarks: ""
		};
	}
};
</script>

