<style lang="less">
.workload-statistics {
	@icon: 46px;
	height: 100%;
	ul {
		height: 100%;
        padding: 0 22px;
        display: flex;
        flex-wrap: wrap;
	}
	li {
		width: 50%;
        height: 25%;
        padding-right: 10px;
        &:nth-child(1){
            .icon-wrapper{
                background-position: 0 -76px;
            }
        }
        &:nth-child(2){
            .icon-wrapper{
                background-position: 0 -38px;
            }
        }
        &:nth-child(3){
            .icon-wrapper{
                background-position: -76px -38px;
            }
        }
        &:nth-child(4){
            .icon-wrapper{
                background-position: -38px -38px;
            }
        }
        &:nth-child(5){
            .icon-wrapper{
                background-position: 0 0;
            }
        }
        &:nth-child(6){
            .icon-wrapper{
                background-position: -76px 0;
            }
        }
	}
	.inner {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        border-radius: 10px;
        padding-left: 10px;
        padding-right: 10px;
        &:hover{
            background-color: #f0f4fc;
        }
		.innerContent {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #f0f4fc;
		}
	}
	.icon-wrapper {
        background-image: url("../../../assets/img/bygzltj.png");
		width: 32px;
		height: 32px;
        margin-right: 16px;
	}
	.number {
		@h: 33px;
		display: block;
		height: @h;
		line-height: @h;
		font-size: 24px;
		font-weight: bold;
	}
	.title {
		@h: 26px;
		line-height: @h;
		font-size: 14px;
	}
}
</style>

<template>
	<plugin-template
		class="workload-statistics-plugin-wrapper"
		:mode="mode"
		:data="data"
		:dataLength="true"
		@loadData="loadData"
		@onButtonClick="onButtonClick"
		@init="init"
	>
		<!-- start -->
		<div class="workload-statistics">
			<ul>
				<li>
					<div class="inner">
						<div class="icon-wrapper">
							<span class="icon-bg blue"></span>
						</div>
						<div class="innerContent">
							<span>本月新增客户</span>
							<span>{{customData.dayNewCount ? customData.dayNewCount :'0'}}个</span>
						</div>
					</div>
				</li>
				<li>
					<div class="inner">
						<div class="icon-wrapper">
							<span class="icon-bg purple"></span>
						</div>
						<div class="innerContent">
							<span>本月跟进客户</span>
							<span>{{customData.dayFollowCount ? customData.dayFollowCount :'0'}}个</span>
						</div>
					</div>
				</li>
				<li>
					<div class="inner">
						<div class="icon-wrapper">
							<span class="icon-bg orange"></span>
						</div>
						<div class="innerContent">
							<span>A/B类客户数量</span>
							<span>{{customData.monthAbleadsCount ? customData.monthAbleadsCount :'0'}}个</span>
						</div>
					</div>
				</li>
				<li>
					<div class="inner">
						<div class="icon-wrapper">
							<span class="icon-bg blue"></span>
						</div>
						<div class="innerContent">
							<span>本月签单数量</span>
							<span>{{customData.monthSignCount ? customData.monthSignCount :'0'}}个</span>
						</div>
					</div>
				</li>
				<li>
					<div class="inner">
						<div class="icon-wrapper">
							<span class="icon-bg orange"></span>
						</div>
						<div class="innerContent">
							<span>本月跟进次数</span>
							<span>{{statisticsData.total ? statisticsData.total :'0'}}次</span>
						</div>
					</div>
				</li>
				<li>
					<div class="inner">
						<div class="icon-wrapper">
							<span class="icon-bg orange"></span>
						</div>
						<div class="innerContent">
							<span>本月通话时长</span>
							<span>{{statisticsData.duration ? statisticsData.duration :'0'}}分钟</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<!-- end -->
	</plugin-template>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 插件 - 本月工作量统计
 */
import MODE from "./mode.js";
import valid, {
	errors,
	sysUser,
	crmCustomerStatistics,
	crmRecord,
} from "../../../../spoc-crm-web/src/libs/request.js";
import pluginTemplate from "./components/template.vue";

export default {
	components: {
		pluginTemplate,
	},
	props: {
		mode: {
			//当前模式
			type: String,
			default: "",
			required: true,
		},
		data: {
			//节点数据
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			customData: {},
			statisticsData: {},
		};
	},
	computed: {
		...MODE,
	},
	methods: {
		//加载数据
		loadData() {
			this.performanceData();
			this.statisticsRecord();
		},
		performanceData() {
			let params = {
				startDate: new Date(
					new Date().getFullYear(),
					new Date().getMonth(),
					1
				).format("yyyy-MM-dd hh:mm:ss"),
				endDate:
					new Date(
						new Date().getFullYear(),
						new Date().getMonth() + 1,
						0
					).format("yyyy-MM-dd") + " 23:59:59",
				userId: "",
				stateGroupType: "",
			};
			crmCustomerStatistics
				.myPerformance(params)
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.customData = res.data.data;
					}
				})
				.catch(errors.call(this));
		},
		statisticsRecord() {
			let param = {
				callDateStart: new Date(
					new Date().getFullYear(),
					new Date().getMonth(),
					1
				).format("yyyy-MM-dd hh:mm:ss"),
				callDateEnd:
					new Date(
						new Date().getFullYear(),
						new Date().getMonth() + 1,
						0
					).format("yyyy-MM-dd") + " 23:59:59",
			};
			crmRecord
				.statisticsRecord(param)
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						let result = res.data.data;
						this.statisticsData.creatorCount = result.creatorCount;
						this.statisticsData.customerCount =
							result.customerCount;
						this.statisticsData.total = this.dataTotal;
						this.statisticsData.duration = result.duration;
					}
				})
				.catch(errors.call(this));
		},
		init() {
			this.$emit("init", this);
		},
		onButtonClick(str) {
			this.$emit("onButtonClick", str);
		},
	},
};
</script>
