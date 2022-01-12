<style lang="less">
.caseChart {
	width: 100%;
    height: 100%;
	background: rgba(255, 255, 255, 1);
	border-radius: 4px;
	padding: 16px;
	.fonts{
		display: flex;
		justify-content: space-between;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: #495060;
		line-height: 16px;
	}
    .chart{
        width: 100%;
        height: 100%; 
    }
}
</style>
<template>
	<div class="caseChart">
		<div class="fonts">
			<div>近5年录取榜单TOP50</div>
			<Button type="primary"  @click="goView">进入案例库</Button>
		</div>
		<div class="chart"></div>
	</div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import echarts from "echarts";
import valid, {
	errors,
	common,
	sysUser,
	sysDict,
	sysProps,
	sysCommonSql,
} from "../../libs/request";
import {
	waitUntil,
	DatePickerOpt,
	defaultDatePickerValue,
} from "@public/libs/util";
export default {
	name: "crm.caseChart",
	data() {
		return {
			chart: null,
		};
	},
	computed: {
		...mapState(["app", "buttonPerm", "userInfo"]),
		myButtonPrem() {
			return this.buttonPerm
				? this.buttonPerm["crm.caseManage"] || []
				: [];
		},
	},
	components: {},
	mounted() {
		let dom = this.$el.querySelector(".chart");
		this.chart = echarts.init(dom);

		let data = [];
		for (let i = 0; i < 10; ++i) {
			data.push(Math.round(Math.random() * 200));
		}

		let option = {
			color: 'rgb(85, 132, 255)',
			// color: '#44BCB7',
			grid:{
				right:'15%'
			},
			xAxis: {
				max: "dataMax",
			},
			yAxis: {
				type: "category",
				data: ["乔治亚理工学院（GA）", "乔治亚理工学院（GA）", 
				"乔治亚理工学院（GA）", "乔治亚理工学院（GA）", 
				"乔治亚理工学院（GA）", "乔治亚理工学院（GA）", 
				"乔治亚理工学院（GA）", "乔治亚理工学院（GA）", 
				"乔治亚理工学院（GA）", "乔治亚理工学院（GA）"],
				inverse: true,
			},
			series: [
				{
					realtimeSort: true,
					name: "录取人数",
					type: "bar",
					barWidth:'18',
					data: data,
					label: {
						show: true,
						position: "right",
					},
				},
			],
			legend: {
				show: true,
			},
		};

		let _data = option.series[0].data;
		for (var i = 0; i < _data.length; ++i) {
			if (Math.random() > 0.9) {
				_data[i] += Math.round(Math.random() * 2000);
			} else {
				_data[i] += Math.round(Math.random() * 200);
			}
		}

		this.$nextTick(()=>{
			this.chart.setOption(option, true);
		})
	},
	methods: {
		goView(){
			this.$router.push({
				name:'crm.caseList'
			})
		}
	},
	watch: {
		"app.currOfficeId": function (val, oldVal) {
			if (oldVal && this.$route.name == "crm.caseManage") {
				// this.$set(this.searchObj, "officeId", val=='all'?'':val);
			}
		},
	},
};
</script>
