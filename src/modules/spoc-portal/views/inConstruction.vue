<style lang="less">
	.plan_container .content {
		position: relative;
	}
	
	.in-construction-container {
		position: absolute;
		left: 15px;
		top: 16px;
		right: 15px;
		bottom: 16px;
		// margin-top: 10px;margin-bottom: 16px;
		background: #fff;
		text-align: center;
		div {
			position: absolute;
			top: 50%;
			left: 0;
			right: 0;
			transform: translate(0, -60%);
		}
		img {
			@w: 220px;
			display: block;
			width: @w;
			height: @w;
			margin-left: auto;
			margin-right: auto;
		}
		a {
			@h: 76px;
			display: block;
			height: @h;
			line-height: @h;
			font-size: 18px;
			cursor: default;
		}
	}
</style>

<template>
	<div class="in-construction-container">
		<div>
			<img :src="nothing" alt="">
			<a>正在建设中～</a>
		</div>
	</div>
</template>

<script>
	import nothing from '@/assets/images/nothing.png'

	export default {
		name: 'portal.inConstruction',
		data() {
			return {
				nothing
			};
		},
	}
</script>