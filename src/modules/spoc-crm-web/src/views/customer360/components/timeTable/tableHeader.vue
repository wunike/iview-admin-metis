<style lang="less">
.table-header-container-crm {
	@h: 56px;
	@border-top: 1px solid #dcdee3;
	@border-right: 1px solid #a0a2ad;
	@timeWidth: 105px;
	// --- 基础样式 --- //
	.clear() {
		zoom: 1;
		&::after,
		&::before {
			content: "";
			display: block;
			height: 0;
			line-height: 0;
			clear: both;
			font-size: 0;
		}
	}
	// --- 具体样式 --- //

	position: relative;
	height: @h;
	border-bottom: @border-top;
	.scrollbarBox {
		display: block;
		width: 10px;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		border-top: @border-top;
		background: #f2f3f7;
	}
	ul {
		// margin-left: @timeWidth;
		position: absolute;
		left: @timeWidth;
		right: 0;
		top: 0;
		display: flex;
	}
	li {
		position: relative;
		flex: 1;
		height: @h - 1px;
		text-align: center;
		border-left: @border-right;
		color: #495060;
		background: #f2f3f7;
		border-top: @border-top;
		// &.today{
		//     background: #f1f1f1;
		// }
	}
	.table-th {
		& > div {
			@h: 18px;
			padding-top: 9px;
			line-height: @h;
			height: @h + 9px;
			font-size: 12px;
		}
		& > span {
			@h: 22px;
			line-height: @h;
			height: @h;
			font-size: 14px;
		}
		& > i {
			position: absolute;
			top: 16px;
			right: 14px;
			font-size: 22px;
			color: #f7c806;
		}
	}
	.sign-th {
		& > i {
			position: absolute;
			top: 16px;
			right: 14px;
			font-size: 22px;
			color: #f7c806;
		}
	}
	.time {
		position: absolute;
		left: 0;
		top: 0;
		width: @timeWidth;
		height: @h - 1px;
		background: #f2f3f7;
		border-top: @border-top;
		&.del-border {
			border-top: none;
		}
	}
	.sign-in-prev,
	.sign-in-next {
		@h: 55px;
		position: absolute;
		top: 0;
		z-index: 2;
		width: 32px;
		height: @h;
		line-height: @h;
		background: #b4e4e2;
		color: #fff;
		text-align: center;
		cursor: pointer;
		font-size: 24px;
		&.gray {
			// border-top: @border-top;border-left: @border-top;
			background-color: #d4d5da;
			cursor: default;
		}
	}
	.sign-in-prev {
		left: 73px;
	}
	.sign-in-next {
		right: 0;
	}
	.class-name {
		font-size: 14px;
		line-height: 54px;
	}
}
</style>
    
<template>
	<div class="table-header-container-crm">
		<div
			class="time"
			:style="{background: fromSignIn ? '#fff' : ''}"
			:class="{'del-border': fromSignIn}"
		></div>
		<!-- <div class="time" :style="[fromSignIn ? 'background: #fff' : '']"></div> -->
		<ul v-if="fromSignIn" :style="{ marginRight: scrollbarWidth + 'px' }">
			<li v-for="(item, index) in classRoomName" v-if="index < 7" class="sign-th" :key="index">
				<div class="class-name">{{ item.name }}</div>
				<Icon v-if="timeCardLists[index].lists.length" type="md-star" />
				<!-- <i v-if="item.star" class="iconfont icon-collection_fill"></i> -->
			</li>
			<li v-if="spaceNum > 0" v-for="(item, index) in spaceNum"></li>
		</ul>
		<ul v-else :style="{ marginRight: scrollbarWidth + 'px' }">
			<li
				v-for="(item, index) in headerLists"
				class="table-th"
				:key="'header' + index"
				:class="{today: index == todayIndex}"
			>
				<div>{{ item.date }}</div>
				<span>{{ item.week | week }}</span>
				<!-- <i v-if="item.star" class="iconfont icon-shouye"></i> -->
				<Icon v-if="timeCardLists[index].lists.length" type="md-star" />
			</li>
		</ul>
		<div class="sign-in-prev" :class="{gray: pageNo == 1}" v-if="fromSignIn" @click="pagePrev">
			<Icon type="ios-arrow-back" />
		</div>
		<div
			class="sign-in-next"
			:class="{gray: pageNo == pageCount}"
			v-if="fromSignIn"
			@click="pageNext"
		>
			<Icon type="ios-arrow-forward" />
		</div>
		<div class="scrollbarBox" v-if="scrollbarWidth" :style="{ width: scrollbarWidth + 'px' }"></div>
	</div>
</template>

<script>
export default {
	props: {
		scrollbarWidth: {
			type: Number,
			required: true
		},
		fromSignIn: {
			// 手工签到
			type: Boolean,
			required: true
		},
		classRoomName: {
			type: Array,
			required: true
		},
		headerLists: {
			type: Array,
			required: true
		},
		todayIndex: {
			type: Number,
			required: true
		},
		pageNo: {
			type: Number
		},
		pageCount: {
			type: Number
		},
		timeCardLists: {
			type: Array
		}
	},
	data() {
		return {
			spaceNum: 0
		};
	},
	mounted() {
		this.supplementDom();
	},
	methods: {
		supplementDom() {
			let num = 7 - this.classRoomName.length;
			this.spaceNum = num > 0 ? num : 0;
		},
		pagePrev() {
			// 获取上一页
			if (this.pageNo > 1) this.$emit("pagePrev");
		},
		pageNext() {
			// 获取下一页
			if (this.pageCount > this.pageNo) this.$emit("pageNext");
		}
	},
	filters: {
		week: function(val) {
			if (val === 1) return '周一';
			else if (val === 2) return '周二';
			else if (val === 3) return '周三';
			else if (val === 4) return '周四';
			else if (val === 5) return '周五';
			else if (val === 6) return '周六';
			else return '周日';
		}
	},
	watch: {
		classRoomName(val) {
			this.supplementDom();
		}
	}
};
</script>


