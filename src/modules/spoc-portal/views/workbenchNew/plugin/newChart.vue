<style lang="less">
.newChart {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	.title {
		font-size: 14px;
		line-height: 50px;
		font-weight: bold;
		margin-left: 20px;
	}
	.chartArea{
		display: flex;
		flex: 1;
		flex-direction: column;
	}
	.chartSearchArea{
		display: flex;
		padding-left: 20px;
		margin-bottom: 5px;
		flex-wrap: wrap;
		.groupStyle{
			display: flex;
			align-items: center;
			margin-right: 12px;
		}
	}
	.charts-part{
		flex: 1;
		padding-bottom: 30px;
	}
	.myProgress{
		padding: 0 20px;
		margin-bottom: 10px;
		height: 30px;
		display: flex;
		align-items: center;
		&:last-child{
			margin-bottom: 0;
		}
		.progressName{
			width:100px;
			text-align: left;
			width: 65px;
			padding-right: 10px;
		}
		.progressBlock{
			flex: 1;
			position: relative;
			background-color: #f3f3f3;
			border-radius: 12px;
			height: 12px;
			.progressBlockContent{
				border-radius: 12px;
				position: absolute;
				left: 0;
				top: 0;
				height: 12px;
				line-height: 12px;
				font-size: 12px;
				text-align: right;
				color: #fff;
				padding-right: 4px;
			}
		}
		.progressNum{
			padding-left: 10px;
			width: 100px;
		}
	}
	.noData{
		display: flex;
		justify-content: center;
		align-items: center;
		img{
			width:140px; 
			height:118px;
		}
	}
	.countItem{
		width: 50%;
		display: flex;
		justify-content: space-between;
		padding: 0 20px;
		margin-bottom: 10px;
		border-radius: 10px;
		border-bottom: 1px solid #f0f4fc;
		&:hover{
            background-color: #f0f4fc;
        }
	}
}
</style>
<template>
<plugin-template class="birthday-list-plugin-wrapper" 
    :style="{backgroundImage:`url(${require('../../../assets/img/workbenchNew/bg_birth.png')})`}"
    :mode="mode" :data="data" :dataLength="dataLength"
    @loadData="loadData"
    @onButtonClick="onButtonClick"
    @init="init">
	<div class="newChart">
		<!-- <div class="title">{{ chartSet.name }}</div> -->
		<div style="height:52px;" v-if="chartSet.dataJson && chartSet.dataJson.length > 1">
			<Tabs
				v-model="tabName"
				:animated="false"
				@on-click="changeTab"
			>
				<TabPane
					v-for="(item, index) in chartSet.dataJson"
					:key="index"
					:label="item.title"
					:name="'tab_' + index"
				>
				</TabPane>
			</Tabs>
		</div>
		<div
			v-show="tabName == 'tab_' + index"
			v-for="(item, index) in chartSet.dataJson"
			v-if="chartSet.dataJson && chartSet.dataJson.length"
			:key="index"
			class="chartArea"
		>
			<div class="chartSearchArea">
				<!-- 过滤 -->
				<div class="groupStyle"
					v-for="(filterItem, filterIndex) in filterFiledsArry"
					:key="filterIndex"
					v-if="tabName == 'tab_' + index"
				>
					<div v-if="filterItem">{{ filterItem.label }}：</div>
					<Select
						:transfer="true"
						v-if="filterItem"
						v-model="filterFileds[index][filterItem.searchKey]"
						style="width: 200px" filterable clearable :multiple="filterFiledsType"
						@on-change="changeFilterFileds(filterItem.searchKey)">
						<Option v-for="(itemChild, indexChild) in filterItem.options" :value="itemChild.id" :key="indexChild">{{itemChild.name}}</Option>
					</Select>
				</div>
				<!-- 排序 -->
				<div class="groupStyle" v-if="(tabName == 'tab_' + index) && item.sortFileds && item.sortFileds.length">
					排序：
					<Select
						:transfer="true"
						v-if="(tabName == 'tab_' + index) && item.sortFileds && item.sortFileds.length"
						v-model="sortFileds[index]"
						style="width: 200px;display: inline;"
						@on-change="changeSortFileds(index)"
					>
						<Option
							v-for="(itemChild, indexChild) in item.sortFileds"
							:value="itemChild.sortField"
							:key="indexChild"
						>
							{{ itemChild.sortName }}
						</Option>
					</Select>
				</div>
				<!-- 分组 -->
				<div class="groupStyle" v-if="item.groupFileds && item.groupFileds.length">
					分组：
					<div v-if="(tabName == 'tab_' + index) && (item.groupFileds[0].type == 'multiple')">
						<CheckboxGroup
							v-model="groupFileds[index]"
							@on-change="changeGroupFileds(index)"
						>
							<Checkbox
								v-for="(itemChild, indexChild) in item.groupFileds"
								:key="indexChild"
								:label="itemChild.groupField"
								:disabled="groupFileds[index] && groupFileds[index].length == 1 && itemChild.groupField == groupFileds[index][0]"
							>
								{{ itemChild.groupName }}
							</Checkbox>
						</CheckboxGroup>
					</div>
					<div v-else-if="(tabName == 'tab_' + index)">
						<RadioGroup
							v-model="groupFileds[index]"
							@on-change="changeGroupFileds(index)"
						>
							<Radio
								v-for="(itemChild, indexChild) in item.groupFileds"
								:key="indexChild"
								:label="itemChild.groupField"
							>
								{{ itemChild.groupName }}
							</Radio>
						</RadioGroup>
					</div>
				</div>
				<div class="groupStyle" v-if="item.periodFileds && item.periodFileds.length">
					时间：
					<RadioGroup v-if="item.periodFileds" v-model="timeType" @on-change="changeTime">
						<Radio
							v-for="item in item.periodFileds"
							:key="item.code"
							:label="item.code"
						>{{item.desc}}</Radio>
					</RadioGroup>
					<DatePicker v-show="hasOther" :transfer="true" @on-change="changeOther" type="daterange" style="width: 200px"></DatePicker>
				</div>
			</div>
			<echarts-parent class="charts-part" :option="option" v-if="option && (option.type != 'PROGRESS' && option.type != 'COUNT') && (tabName == 'tab_' + index)"></echarts-parent>
			<div style="flex: 1;" v-if="option && (option.type == 'PROGRESS') && (tabName == 'tab_' + index)">
				<div v-if="dataLengthPROGRESS">
					<div class="myProgress" v-for="(progressItem, progressIndex) in option.resArr" :key="progressIndex" :title="progressItem.tips">
						<div class="progressName">
							{{progressItem.name}}
						</div>
						<div class="progressBlock">
							<div class="progressBlockContent" 
								:style="{
									'background-color': (progressItem.progressNum != 0 ? 'rgb(85, 132, 255)' : 'gray'),
									width: progressItem.isMax ? '100%' : progressItem.progressNum + '%',
									'min-width': progressItem.progressNum != 0 ? '40px': '30px'}">
								{{progressItem.progressNum}}%
							</div>
						</div>
						<div class="progressNum">{{progressItem.actual}}/{{progressItem.plan}}</div>
					</div>
				</div>
				<div v-else class="noData">
					<img src="../../../assets/img/workbenchNew/favoriteNoData.png">
				</div>
			</div>
			<div style="flex: 1;" v-if="option && (option.type == 'COUNT') && (tabName == 'tab_' + index)">
				<div v-if="dataLengthCOUNT" style="display: flex;flex-wrap: wrap;padding:0 20px;">
					<div class="countItem" v-for="(countItem, countIndex) in option.resArr" :key="countIndex">
						<span>{{countItem.name}}</span>
						<span>{{countItem.value}}</span>
					</div>
				</div>
				<div v-else class="noData">
					<img src="../../../assets/img/workbenchNew/favoriteNoData.png">
				</div>
			</div>
		</div>
	</div>
</plugin-template>
</template>
<script>
import axios from "axios";
import { barOption } from './barOption.js';
import { lineOption } from './lineOption.js';
import { pieOption } from './pieOption.js';
import { funnelOption } from './funnelOption.js';
import echartsParent from './echartsParent'
import MODE from "./mode.js";
import valid, { errors, sysCommonSql, sysUser } from '../../../libs/request.js';
import pluginTemplate from './components/template.vue'
import { mapMutations, mapState } from "vuex";
import { waitUntil } from "@public/libs/util";
export default {
	props: {
		mode: { //当前模式
            type: String,
            default: '',
            required: true
        },
        data: { //节点数据
            type: Object,
            required: true
        },
	},
	components:{
		echartsParent,
		pluginTemplate
	},
	computed: {
		...mapState(['userInfo'])
	},
	mounted() {

		waitUntil(
			() => {
				return Object.keys(this.userInfo).length;
			},
			() => {
				
				let chartSet = Object.assign({}, this.data);
				// 初始过滤对象
				let newChartSet = []
				if(chartSet.dataJson){
					let i = 0;
					chartSet.dataJson.forEach((item, index)=>{
						if(item.roleList && item.roleList.length){
							// 有适用角色
							// this.userInfo.roleIdList.forEach(_item=>{
							// 	if(item.roleList.indexOf(_item) >= 0){
							// 		newChartSet.push(item)
							// 		this.filterFileds[i] = {}
							// 		i++;
							// 	}
							// })
							for(let q = 0; q < this.userInfo.roleIdList.length; q++){
								if(item.roleList.indexOf(this.userInfo.roleIdList[q]) >= 0){
									newChartSet.push(item)
									this.filterFileds[i] = {}
									i++;
									break;
								}
							}
						} else {
							newChartSet.push(item)
							this.filterFileds[i] = {}
							i++;
						}
					})
				}
				this.chartSet.dataJson = newChartSet
				this.changeTab(this.tabName);
			}
		);
						
	},
	data() {
		return {
			filterFiledsType: true,
			dataLength: true,
			option: null,
			chartSet: {},
			tabName: "tab_0",
			groupFileds: {},
			filterFileds: {},
			sortFileds: {},
			filterFiledsArry: [],
			startTime: '',
			endTime: '',
			timeType: '',
			hasOther: false,
			dataLengthPROGRESS: true,
			dataLengthCOUNT: true
		};
	},
	methods: {
        init() {
            this.$emit("init", this);
        },
        onButtonClick(str) {
            this.$emit('onButtonClick', str);
		},
		changeOther(val){
			this.timeType = ''
			if(val[0] && val[1]){
				this.startTime = new Date(val[0]).format('yyyy-MM-dd 00:00:00')
				this.endTime = new Date(val[1]).format('yyyy-MM-dd 23:59:59')
			} else {
				this.startTime = '' 
				this.endTime = ''
			}
			this.doSearch()
		},
		changeTime(val){
			console.log(val)
			// {desc: "今天", code: "DAY"}
			// {desc: "最近七天", code: "WEEK"}
			// {desc: "本月", code: "MONTH"}
			// {desc: "本季", code: "QUATER"}
			// {desc: "本年", code: "YEAR"}
			// {desc: "自定义", code: "OTHER"}
			
			let day = new Date()
			let year = day.getFullYear()
			let month = (day.getMonth() + 1) < 10 ? '0' + (day.getMonth()+1) : (day.getMonth()+1)
			if(val == 'DAY'){
				this.startTime = day.format('yyyy-MM-dd 00:00:00') 
				this.endTime = day.format('yyyy-MM-dd 23:59:59')
			}
			if(val == 'WEEK'){
				let newDay = new Date(day.getTime() - 7 * 24 * 60 * 60 * 1000)
				this.startTime = newDay.format('yyyy-MM-dd 00:00:00') 
				this.endTime = day.format('yyyy-MM-dd 23:59:59')
			}
			if(val == 'MONTH'){
				this.startTime = year + '-' + month + '-01 00:00:00' 
				this.endTime = day.format('yyyy-MM-dd 23:59:59')
			}
			if(val == 'QUATER'){
				if(month >= 1 && month <= 3){
					this.startTime = year + '-01-01 00:00:00' 
					this.endTime = year + '-03-31 23:59:59'
				}
				if(month >= 4 && month <= 6){
					this.startTime = year + '-04-01 00:00:00' 
					this.endTime = year + '-06-30 23:59:59'
				}
				if(month >= 7 && month <= 9){
					this.startTime = year + '-07-01 00:00:00' 
					this.endTime = year + '-09-30 23:59:59'
				}
				if(month >= 10 && month <= 12){
					this.startTime = year + '-10-01 00:00:00' 
					this.endTime = year + '-12-31 23:59:59'
				}
			}
			if(val == 'YEAR'){
				this.startTime = year + '-01-01 00:00:00' 
				this.endTime = year + '-12-31 23:59:59' 
			}
			if(val == 'OTHER'){
				this.startTime = '' 
				this.endTime = ''
			}
			this.doSearch()
		},
		createFilterSelect(item, index) {
			console.log(item, 'FilterSet')
			if(item.ifDataScopeFilter == '1'){
				if(item.mainTable == "sys_office"){
					let params = {}
					if(item.dataFilterField){
						params[item.dataFilterField] = item.dataFilterValue
					}
					sysUser
					.dataScopeFilter(params)
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							this.filterFiledsArry[index] = {
								label: item.filterName,
								searchKey: item.filterFiled,
								options: res.data.data,
							};
							this.$forceUpdate();
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
				}
				if(item.mainTable == "sys_user"){
					let params = {}
					if(item.dataFilterField){
						params[item.dataFilterField] = item.dataFilterValue
					}
					sysUser
					.dataScopeFilter(params)
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							let officeIds = res.data.data.map(itemChild=>{
								return itemChild.id
							}).join(',')
							
							sysUser
							.listRoleUser({
								roleIds: item.dataScopeFilterRoleIds,
								officeIds: officeIds,
								pageSize:0,
								isService:1,
                                dsfFlag:1
							})
							.then(valid.call(this))
							.then(res => {
								if (res.ok) {
									this.filterFiledsArry[index] = {
										label: item.filterName,
										searchKey: item.filterFiled,
										options: res.data.data.list,
									};
									this.$forceUpdate();
								}
							})
							.catch(errors.call(this))
							.finally(() => {});
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
				}
			} else {
				let params = {
					searchField: item.searchField,
					searchFieldParam: item.searchFieldParam || "",
					mainTable: item.mainTable,
				};
				sysCommonSql
					.querySingleTableData(params)
					.then(valid.call(this))
					.then((res) => {
						if (res.ok) {
							this.filterFiledsArry[index] = {
								label: item.filterName,
								searchKey: item.filterFiled,
								options: res.data.data,
							};
							this.$forceUpdate();
						}
					})
					.catch(errors.call(this))
					.finally(() => {
					});
			}
		},
		changeTab(val) {
			this.option = null
			let index = val.split("_")[1];
			let chartSearch = this.chartSet.dataJson[index];
			console.log(chartSearch,"chartSearch")
			if(chartSearch){

				this.filterFiledsType = chartSearch.filterFiledsType == 'multiple' 
				// 构造过滤项下拉菜单
				this.filterFiledsArry = [];
				if (chartSearch.filterFileds && chartSearch.filterFileds.length) {
					chartSearch.filterFileds.forEach((item, _index) => {
						this.createFilterSelect(item, _index);
					});
				}
	
				// 构造初始的分组项
				if(chartSearch.groupFileds && chartSearch.groupFileds.length){
					if(chartSearch.groupFileds[0].type == 'multiple'){
						this.groupFileds[index] = [chartSearch.groupFileds[0].groupField]
					} else {
						this.groupFileds[index] = chartSearch.groupFileds[0].groupField
					}
				}
				
				// 构造初始的排序项
				if(chartSearch.sortFileds && chartSearch.sortFileds.length){
					this.sortFileds[index] = chartSearch.sortFileds[0].sortField
				}
				if(chartSearch.periodFileds && chartSearch.periodFileds.length){
					this.timeType = chartSearch.periodFileds[chartSearch.periodFileds.length -1].code
					let arr = chartSearch.periodFileds.filter(item=>{
						return item.code == 'OTHER'
					})
					if(arr.length){
						this.hasOther = true
					} else {
						this.hasOther = false
					}
				} else {
					this.timeType = ''
					this.hasOther = false
				}
				this.changeTime(this.timeType)
			}
		},
		// 切换分组
		changeGroupFileds(index) {
            this.doSearch()
		},
		// 切换过滤
		changeFilterFileds(key) {
			// let index = this.tabName.split("_")[1];
            this.doSearch()
		},
		// 切换排序
		changeSortFileds(index) {
            this.doSearch()
        },
        doSearch(){
            let index = this.tabName.split("_")[1];
            let filterFields = []
            if(this.filterFileds[index]){
                for(let key in this.filterFileds[index]){
					if(this.filterFileds[index][key]){
						if(Array.isArray(this.filterFileds[index][key])){
							let val = this.filterFileds[index][key].join(',')
							if(val){
								filterFields.push({
									"filterFiled": key,
									"values": val
								})
							}
						} else {
							let val = this.filterFileds[index][key]
							if(val){
								filterFields.push({
									"filterFiled": key,
									"values": val
								})
							}
						}
					}
                }
            }
            let sortFields = this.sortFileds[index]
            let groupFields = ''
            if(this.groupFileds[index]){
				if(Array.isArray(this.groupFileds[index])){
					groupFields = this.groupFileds[index].join(',')
				} else {
					groupFields = this.groupFileds[index]
				}
			}
			
			let tjzb = {}
			let tjzbKey = []
			if(this.chartSet.dataJson[index].tjzb && this.chartSet.dataJson[index].tjzb.length){
				this.chartSet.dataJson[index].tjzb.forEach(item=>{
					tjzbKey.push(item.value)
					tjzb[item.value] = item.name
				})
				this.doSearchAction(index, groupFields, sortFields, filterFields, tjzbKey, tjzb)
			} else {
				let that = this
				axios.get('/api/report/' + that.chartSet.dataJson[index].url + '/supportItem',{
					headers:{
						tenant: localStorage.getItem('tenant'),
						token: localStorage.getItem('token')
					},
					params: {
						groupFieldId: groupFields
					}
				})
				.then(function (response) {
					if(response.data.code == '200'){
						let arr = []
						for(let key in response.data.data){
							arr.push({
								name: response.data.data[key],
								value: key
							})
						}
						arr.forEach(item=>{
							tjzbKey.push(item.value)
							tjzb[item.value] = item.name
						})
						that.doSearchAction(index, groupFields, sortFields, filterFields, tjzbKey, tjzb)

					} else {
						that.$Message.error(response.data.msg)
					}
				})
				.catch(function (error) {
					console.log(error);
				});
			}

            
		},
		doSearchAction(index, groupFields, sortFields, filterFields, tjzbKey, tjzb){
			let params = {
                "groupFields": groupFields,
                "sortFields": sortFields,
				"filterFields": filterFields,
				startTime: this.startTime,
				endTime:this.endTime
            }
			
			let that = this
            axios.post('/api/report/' + that.chartSet.dataJson[index].url + '/data', params,{
                headers:{
                    tenant: localStorage.getItem('tenant'),
                    token: localStorage.getItem('token')
                }
            })
            .then(function (response) {
				if(response.data.code == '200'){
					if(that.chartSet.dataJson[index].type == 'BAR' || that.chartSet.dataJson[index].type =='LINE'){
						let array = response.data.data
						if(!array[0]){
							that.dataLength = false
							that.option = {
								series:[{
									data:[]
								}]
							}
							return 
						}
						if(array.length > 5){
							array.length = 5
						}
						let valObj = {}

						if(tjzbKey){
							tjzbKey.forEach(item=>{
								valObj[tjzb[item]] = [] // tjzb[item] 根据统计项中英文转换
							})
						}

						let qdKeys = []
						if(array){
							array.forEach((item)=>{
								qdKeys.push(item.name)
								if(tjzbKey){
									tjzbKey.forEach(itemKey=>{
										valObj[tjzb[itemKey]].push(item[itemKey])
									})
								}
							})
						}
						if(!qdKeys.length){
							that.dataLength = false
						} else {
							that.dataLength = true
						}
						if(that.chartSet.dataJson[index].type == 'BAR'){
							that.option = barOption(qdKeys,valObj,false,true)
						}
						if(that.chartSet.dataJson[index].type == 'LINE'){
							that.option = lineOption(qdKeys,valObj)
						}
					}
					if(that.chartSet.dataJson[index].type == 'PIE'){
						// 饼图
						let title = that.chartSet.dataJson[index].title
						let _data = response.data.data
						let names = []
						let datas = []
						if(tjzbKey){
							tjzbKey.forEach((_item)=>{
								names.push(tjzb[_item])
								datas.push({
									value: _data[_item] ? Number(_data[_item]) : 0,
									name: tjzb[_item] 
								})
							})
						}
						if(!names.length){
							that.dataLength = false
						} else {
							that.dataLength = true
						}
						that.option = pieOption(title,names,datas)
					}
					if(that.chartSet.dataJson[index].type == 'FUNNEL'){
						// 漏斗图
						let title = that.chartSet.dataJson[index].title
						let _data = response.data.data
						let names = []
						let datas = []
						if(tjzbKey){
							tjzbKey.forEach((_item)=>{
								let dataRes = _data[_item] ? Number(_data[_item]) : 0
								if(dataRes){
									names.push(tjzb[_item])
									datas.push({
										value: _data[_item] ? Number(_data[_item]) : 0,
										name: tjzb[_item] 
									})
								}
							})
						}
						if(!names.length){
							that.dataLength = false
						} else {
							that.dataLength = true
						}
						that.option = funnelOption(title,names,datas)
					}
					if(that.chartSet.dataJson[index].type == 'PROGRESS'){
						// 进度条
						console.log(that.chartSet.dataJson[index])
						let title = that.chartSet.dataJson[index].title
						let tjzb = []
						if(that.chartSet.dataJson[index].tjzb && that.chartSet.dataJson[index].tjzb.length){
							tjzb = that.chartSet.dataJson[index].tjzb.map(item=>{
								return item.value
							})
						}
						let _data = response.data.data || []
						let resArr = []
						_data.forEach(item=>{
							if(tjzb.indexOf(item.key)>=0){
								let actual = Number(item.actual) || 0
								let plan = Number(item.plan) || 0
								let progressNum = plan > 0 ? parseFloat(Number(actual/plan*100).toFixed(2)) : 0
								resArr.push({
									name: item.name,
									tips: item.tips,
									actual: actual,
									plan: plan,
									progressNum: progressNum,
									isMax: progressNum > 100
								})
							}
						})

						if(!resArr.length){
							that.dataLengthPROGRESS = false
						} else {
							that.dataLengthPROGRESS = true
						}
						that.option = {
							type: 'PROGRESS',
							resArr: resArr
						}
					}
					if(that.chartSet.dataJson[index].type == 'COUNT'){
						// 工作量统计-销售业绩
						let title = that.chartSet.dataJson[index].title
						let resArr = []
						if(that.chartSet.dataJson[index].tjzb && that.chartSet.dataJson[index].tjzb.length){
							that.chartSet.dataJson[index].tjzb.forEach(item=>{
								resArr.push({
									key: item.value,
									name: item.name,
									value: response.data.data[item.value] || 0
								})
							})
						}

						if(!resArr.length){
							that.dataLengthCOUNT = false
						} else {
							that.dataLengthCOUNT = true
						}
						
						that.option = {
							type: 'COUNT',
							resArr: resArr
						}
					}
				} else {
					that.$Message.error(response.data.msg)
				}
            })
            .catch(function (error) {
                console.log(error);
            });
		}
	},
};
</script>
