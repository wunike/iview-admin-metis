<style lang="less">
@green:#44bcb7;
.spoc_sign_discount{
	background: #FFFFFF;
    padding: 0 16px 16px;
	@text:#495060;
	.policy_title{
        padding-top: 30px;
		display: flex;
		flex-wrap: wrap;
		font-size: 14px;
		.p-item{
			position: relative;
			width: 170px;
			border: solid 1px #e6e6e6;
			border-radius: 4px;
			padding: 0 20px;
			margin: 0 20px 20px 0;
			height: 46px;
			line-height: 46px;
			cursor: pointer;
			position: relative;
			&.active{
				/*background-color: @green;*/
				color: #fff;
				.iconfont{
					color: #fff;
				}
			}
			.iconfont{
				right: 9px;
				top: 0;
				position: absolute;
				color: #cccccc;
				&:hover{
					.dropdown{
						display: block;
					}
				}
				.dropdown{
					display: none;
					position: absolute;
					z-index: 22;
					top: 18px;
					left: -70px;
					padding: 10px 4px;
					width: 120px;
					box-sizing: border-box;
					box-shadow: 0 0 18px 2px rgba(4, 0, 0, 0.2);
					border-radius: 4px;
					font-size: 14px;
					background-color: #fff;
					.litem{
						height: 32px;
						line-height: 32px;
						cursor: pointer;
						text-align: center;
						color: #333;
						&:hover{
							color: @green;
							background-color:rgb(233, 247, 247);
						}
					}
				}
			}
		}
		.new_policy{
			padding-left: 10px;
			.plus{
				color: @green;
				border: dashed 1px @green;
				padding:3px 8px;
				border-radius: 5px;
			}
		}
	}
	.discount{
		.title{
			font-size: 18px;
			color: #333333;
			margin-bottom: 22px;
		}
		.subTitle{
			font-size: 14px;
			margin-bottom:21px;
		}
		.add{
			width: 90px;
			float: right;
		}
		.discount_items{
			margin-bottom: 39px;
		}
	}
	.setting-tips-wrap{
		margin-top: 15px;
		margin-bottom: 10px;
		.setting-tips{
			color: #0d70b0;
			font-size: 14px;
			&:hover{
				color: #0b619b;
			}
		}
	}


	.save{
		margin-top: 20px;
		text-align: center;
		button{
			width: 140px;
			height: 40px;
			font-size: 16px;
		}
	}
	.page {
		text-align: center;
		margin-top: 24px;
	}
}
.vertical-center-modal{
	.ivu-modal{
		max-height: 80%;
	}
}
.addYhzcRuleModal{
	.ivu-modal-body{
		padding-bottom: 0;
	}
}
.addOtherRuleModal{
	.ivu-modal-body{
		padding-bottom: 0;
	}
}
</style>
<template>
	<div class="spoc_sign_discount">
		<div class="setting-tips-wrap" v-if="false">
			<a class="setting-tips" @click="showSetting">{{$t('modules_spoc_sign_web_src_views_discount_discount_6246')}}</a>
		</div>
		<!-- <div class="policy_title">
			<div v-for="(item,index) in htPolicyList" :key="index"	:class="{'p-item':1,active:item.id==activeItem.id}" @click="doSelect(index,item.type)">
				<span class="label" v-text="item.name"></span>
				<i class="iconfont icon-xia">
					<div class="dropdown">
						<p class="litem" @click="modifyName(item)">{{$t('modules_expandrow_15')}}</p>
					</div>
				</i>
			</div>
		</div> -->
		<Tabs @on-click="doSelect" style="padding-top:5px;">
			<TabPane 
				v-for="(item,index) in htPolicyList" 
				:key="index"
				:label="item.name" 
				:name="index">
			</TabPane>
		</Tabs>
		<div class="discount">
			<div class="title" v-text="activeItem.name" v-if="false"></div>
			<div class="subTitle">
				<Input search :placeholder="$t('modules_spoc_sign_web_src_views_discount_discount_6248')" style="width: 224px" @on-click="doSearch" @on-search="doSearch" @on-enter="doSearch" v-model="searchName" />
				<!-- • 优惠/促签项目：<Input :placeholder="$t('modules_spoc_sign_web_src_views_discount_discount_6248')" style="width:150px;margin-right:12px;" v-model="searchName"/><Button type="primary" @click="doSearch">{{$t('modules_rolepeople_210')}}</Button> -->
				<Button class="add" type="primary" @click="showAddItem">{{$t('classroom_allscore_52')}}</Button>
			</div>
			<Table border :columns="columns" :data="htItemList"></Table>
			<div class="page">
				<Page
					size="small"
					show-elevator
					show-sizer
					show-total
					:page-size="pageSize"
					:current="pageNo"
					:total="count"
					@on-change="onPageChange"
					@on-page-size-change="onPageSizeChange">
				</Page>
			</div>
			<div v-show="activeIndex == 0 || activeIndex == 1">
				<div class="subTitle">{{$t('modules_spoc_sign_web_src_views_discount_discount_6251')}}</div>
				<div>
					<editor v-model="editorProtocal" heightStyle="200"></editor>
				</div>
				<div class="save">
					<Button type="primary" @click="saveCurrent">{{$t('courselist_compontents_servicecontent_215')}}</Button>
				</div>
			</div>
			<Input type="textarea" v-model="activeItem.protocal" v-if="false"/>
		</div>
		<!-- 添加新政策 -->
		<Modal width="380" :title="flagadd?$t('modules_spoc_sign_web_src_views_discount_discount_6253'):$t('modules_spoc_sign_web_src_views_discount_discount_6254')" v-model="modalShow.showPolicy">
			<Form :data="policyObj" style='padding-left:20px;'>
				<FormItem :label="$t('modules_spoc_sign_web_src_views_discount_discount_6255')">
					<Row>
						<Col span="16">
							<Input v-model="policyObj.name"/>
						</Col>
					</Row>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button @click="modalShow.showPolicy=false">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" :disabled="!policyObj.name" @click="addPolicy">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>

		<!-- 删除优惠项目 -->
		<v-del-modal v-model="modalShow.showDelMenuItem" @on-comfirm="comfirmDelItems">
			<div slot="message">{{$t('modules_spoc_sign_web_src_views_category_category_5132')}}<span class="warning">{{$t('modules_spoc_sign_web_src_views_discount_discount_6259')}}</span>{{$t('pushsettings_23')}}</div>
		</v-del-modal>
		<!-- 添加优惠项目 -->
		<Modal width="600" v-model="modalShow.showAddItem" :title="$t('modules_spoc_sign_web_src_views_discount_discount_6261')" class-name="vertical-center-modal" @on-cancel="doAddItemCancel">
			<v-add-discount-item ref="discountItem" :data="discountItemObj"
				:dict-data="dictData"
				:approver-list="approverList"
				:ht-policy-list="htPolicyList"
				:active-item="activeItem"
				:xqLists="xqLists">
			</v-add-discount-item>
			<div slot="footer">
                <Button @click="doAddItemCancel">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="doAddItem">{{$t('classroom_allscore_54')}}</Button>
            </div>
		</Modal>
		<!-- 使用规则 -->
		<Modal width="748" v-model="modalShow.showSetting" :title="$t('modules_spoc_sign_web_src_views_discount_discount_6246')">
			<rule-setting ref="rulesetting" :rules="settingData.list"></rule-setting>
			<div slot="footer">
                <Button @click="modalShow.showSetting=false">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="saveSetting">{{$t('classroom_allscore_54')}}</Button>
            </div>
		</Modal>
		<Modal width="960" v-model="modalShow.showAddCourseGroupRule" :loading="modalShow.loadingCourseGroupRule" :title="$t('modules_spoc_sign_web_src_views_discount_discount_6262')">
			<course-group-rule-setting ref="courseGroupRuleSetting" :courseForChooseList="courseForChooseList" @doSearchCourse="getCourseNopage" :rules="settingData.list"></course-group-rule-setting>
			<div slot="footer">
                <Button @click="modalShow.showAddCourseGroupRule=false">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="saveCourseGroupRule">{{$t('classroom_allscore_54')}}</Button>
            </div>
		</Modal>
		<Modal width="600" v-model="modalShow.showAddYhzcRule"  class="addYhzcRuleModal" :title="$t('modules_spoc_sign_web_src_views_discount_discount_6263')" :loading="modalShow.loadingYhzcRule">
			<yhzc-rule-setting ref="yhzcRuleSetting"
				:rules="settingData.list"
				:dict-data="dictData"
				:xqLists="xqLists"
				:courseForChooseList="courseForChooseList"></yhzc-rule-setting>
			<div slot="footer">
                <Button @click="modalShow.showAddYhzcRule=false">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="saveYhzcRule">{{$t('classroom_allscore_54')}}</Button>
            </div>
		</Modal>
		<Modal width="600" v-model="modalShow.showAddOtherRule" class="addOtherRuleModal" :title="$t('modules_spoc_sign_web_src_views_discount_discount_6264')" :loading="modalShow.loadingOtherRule">
			<other-rule-setting ref="otherRuleSetting" :rules="settingData.list"></other-rule-setting>
			<div slot="footer">
                <Button @click="modalShow.showAddOtherRule=false">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="saveOtherRule">{{$t('classroom_allscore_54')}}</Button>
            </div>
		</Modal>
	</div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import vDelModal from "../../modules/vDelModal";
import vAddDiscountItem from "./componet/vAddDiscountItem";
import ruleSetting from "./componet/ruleSetting";
import courseGroupRuleSetting from "./componet/courseGroupRuleSetting";
import yhzcRuleSetting from "./componet/yhzcRuleSetting";
import otherRuleSetting from "./componet/otherRuleSetting";
import valid, { errors, htPolicy, htRule, common, htItem, sysRole, sysOffice, sysDict } from '../../libs/request.js';
import { getHtPolicyList } from '../../store/index.js';
import { extendKey } from '../../libs/util.js';
import editor from '../../modules/editor/editor.vue'

const policyObj = ()=>{
	return {
		metuxPolicies:[],
		isMetux:'0',
		isLimitCount:'0',
		itemDesc:'',
		costPrice:0,
		lowestPrice:0,
		type:'',
		auditor:'',
		level:'',
		protocal:'',
		protocalType:-1,
		htItemSubList: []
	}
}

export default {
	name: 'sign.discount',
	data () {
		let _this = this
		return {
			count: 0,
			pageCount: 1,
			pageNo: 1,
			pageSize: 10,
			htItemList: [],
			columnsArray:[
				//课程包
				[
					{
						title:this.$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_bak_6188'),
						key:'name',
						align:'left',
						minWidth: 300,
						resizable: true,
						width: null,
						tooltip: true,
					},
					{
						title:this.$t('modules_expandrow_28'),
						key:'itemDesc',
						align:'left',
						resizable: true,
						width: null,
						tooltip: true,
					},
					{
						title:this.$t('classlist_compontents_detailinfo_45'),
						align:'left',
						width: null,
						tooltip: true,
						render:(h,params)=>{
							return h('div',{
								style:{
									display:'flex',
									justifyContent: 'left',
									color: '#44bcb7'
								}
							},[
								h('a',{
									attrs:{
										href:"javascript:void(0);"
									},
									style:{
										cursor:'pointer',
										paddingRight:'10px',
									},
									on:{
										click:()=>{
											this.showEditItem(params)
										}
									}
								},this.$t('classroom_allscore_51')),
								h('a',{
									attrs:{
										href:"javascript:void(0);"
									},
									style:{
									cursor:'pointer',
									paddingLeft:'10px',
									paddingRight:'10px',
									color:'#ff0000',
									},
									on:{
									click:()=>{
										this.showDelItem(params)
									}
									}
								},this.$t('classlist_compontents_detailinfo_46'))
							])
						}
					},
				],
				//组合课程包
				[
					{
						title:this.$t('views_coursepack_coursepack_396'),
						key:'name',
						align:'left',
						minWidth: 300,
						resizable: true,
						width: null,
						tooltip: true,
					},
					{
						title:this.$t('modules_spoc_sign_web_src_views_discount_discount_6271'),
						key:'bnkc',
						align:'left',
						minWidth: 300,
						resizable: true,
						width: null,
						tooltip: true,
						/* render: (h, params) => {
							let q = params.row.htItemList
							let res = []
							q.forEach(item=>{
								res.push(item.name)
							})
							return h('div',res.join('、'));
						} */
					},
					{
						title:'描述',
						key:'itemDesc',
						align:'left',
						tooltip: true,
						resizable: true,
						width: null,
					},
					{
						title:'状态',
						key:'itemDesc',
						align:'left',
						minWidth:60,
						resizable: true,
						width: null,
						render:(h,params)=>{
							return h('div',{},
								params.row.obsolete == '0' ? '有效': '无效'
							)
						}
					},
					{
						title:this.$t('classlist_compontents_detailinfo_45'),
						align:'left',
						width: 170,
						render:(h,params)=>{
							return h('div',{
								style:{
									display:'flex',
									justifyContent: 'left',
									color: '#44bcb7'
								}
							},[
								h('a',{
									attrs:{
										href:"javascript:void(0);"
									},
									style:{
										cursor:'pointer',
										paddingRight:'10px',
									},
									on:{
										click:()=>{
											this.showEditCourseGroup(params)
										}
									}
								},'编辑'),
								h('a',{
									attrs:{
										href:"javascript:void(0);"
									},
									style:{
									cursor:'pointer',
									paddingLeft:'10px',
									paddingRight:'10px',
									color:'#ff0000',
									},
									on:{
									click:()=>{
										this.showDelItem(params)
									}
									}
								},'删除'),
								h('a',{
									attrs:{
										href:"javascript:void(0);"
									},
									style:{
										cursor:'pointer',
										paddingLeft:'10px',
										paddingRight:'10px',
										color:'#ff0000',
										width:'44px'
									},
									on:{
										click:()=>{
											if(params.row.obsolete == '1'){
												this.$Modal.confirm({
                    								title: '提示',
													content: '有效操作前请确认已经修改过优惠金额',
													okText:'确认执行有效操作',
													onOk: () => {
														this.uploadObsolete(params.row.id)
													},
													onCancel: () => {
														//this.$Message.info('Clicked cancel');
													}
												});
											}
										}
									}
								}, params.row.obsolete == '1' ? '有效' : '')
							])
						}
					},
				],

				//优惠政策
				[
					{
						title:'项目名称',
						key:'name',
						align:'left',
						resizable: true,
						width: null,
						tooltip: true,
					/* 	render: (h, params) => {
							return h('div', params.row.levelName ? params.row.levelName : '1级');
						} */
					},
					{
						title:'优惠类型',
						key:'type',
						align:'left',
						resizable: true,
						width: null,
						render: (h, params) => {
							let q  =_this.dictData.ht_item_type.filter(item=>{
								return  item.value == params.row.type
							})
							return h('div', q[0].label);
						}
					},
					{
						title:'归属校区',
						key:'officeName',
						align:'left',
						tooltip: true,
						resizable: true,
						width: null,
					},
					// {
					// 	title:'适用校区',
					// 	key:'syxq',
					// 	align:'left',
					// 	tooltip: true,
					// 	resizable: true,
					// 	width: null,
					// },
					{
						title:'有效日期',
						key:'startTime',
						align:'left',
						resizable: true,
						width: null,
						render: (h, params) => {
							let str = ''
							if((!params.row.startTime) && (!params.row.endTime)){
								str = '长期有效'
							} else if(!params.row.startTime){
								str = '不限 ~ ' + new Date(params.row.endTime).format('yyyy-MM-dd')
							} else if(!params.row.endTime){
								str = new Date(params.row.startTime).format('yyyy-MM-dd') + ' ~ 不限'
							} else {
								str = new Date(params.row.startTime).format('yyyy-MM-dd') + ' ~ ' + new Date(params.row.endTime).format('yyyy-MM-dd')
							}
							return h('div', str);
						}
					},
					{
						title:'适用范围',
						key:'itemDesc',
						align:'left',
						resizable: true,
						width: null,
						render: (h, params) => {
							let q =  params.row.htItemSettings
							let value = q.filter((item)=>{
								return item.key == 'syfw'
							})[0]
							let _value = value? value.value.split(','): []
							let strArr = []
							if(_value.length){
								_value.forEach(item=>{
									if(item == '1'){
										strArr.push('订单')
									}
									if(item == '2'){
										strArr.push('课包')
									}
								})
							}
							return h('div', strArr.join(','));
						}
					},
					{
						title: '是否管辖',
						key:'ifCanModify',
						align:'left',
						tooltip: true,
						resizable: true,
						width: null,
						render: (h, params) => {
							let str = ''
							if(params.row.ifCanModify == '1'){
								str = '是'
							} else {
								str = '否'
							}
							return h('div', str);
						}
					},
					{
						title:this.$t('classlist_compontents_detailinfo_45'),
						align:'left',
						width: 130,
						render:(h,params)=>{
							return params.row.ifCanModify == '1' ? h('div',{
								style:{
									display:'flex',
									justifyContent: 'left',
									color: '#44bcb7'
								}
							},[
								h('a',{
									attrs:{
										href:"javascript:void(0);"
									},
									style:{
										cursor:'pointer',
										paddingRight:'10px',
									},
									on:{
										click:()=>{
											this.showEditYhzc(params)
										}
									}
								},this.$t('classroom_allscore_51')),
								h('a',{
									attrs:{
										href:"javascript:void(0);"
									},
									style:{
									cursor:'pointer',
									paddingLeft:'10px',
									paddingRight:'10px',
									color:'#ff0000',
									},
									on:{
									click:()=>{
										this.showDelItem(params)
									}
									}
								},this.$t('classlist_compontents_detailinfo_46'))
							]) : ''
						}
					},
				],

				//其他
				[
					{
						title:this.$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_bak_6188'),
						key:'name',
						align:'left',
						resizable: true,
						width: null,
						tooltip: true,
					},
					{
						title:this.$t('modules_spoc_sign_web_src_views_discount_discount_6272'),
						key:'lpjz',
						align:'left',
						resizable: true,
						width: null,
						tooltip: true,
						render: (h, params) => {
							let q = params.row.htItemSettings
							let value = q.filter((item)=>{
								return item.key == 'lpjz'
							})
							let myValue = value.length ? value[0].value : ''
							return h('div', myValue);
						}
					},
					{
						title:'归属校区',
						key:'officeName',
						align:'left',
						tooltip: true,
						resizable: true,
						width: null,
					},
					{
						title:this.$t('modules_spoc_sign_web_src_views_discount_componet_addzzdd_6121'),
						key:'itemDesc',
						align:'left',
						resizable: true,
						width: null,
						render: (h, params) => {
							let str = ''
							if((!params.row.startTime) && (!params.row.endTime)){
								str = this.$t('modules_spoc_sign_web_src_views_discount_discount_6274')
							} else if(!params.row.startTime){
								str = this.$t('modules_spoc_sign_web_src_views_discount_discount_6275') + new Date(params.row.endTime).format('yyyy-MM-dd')
							} else if(!params.row.endTime){
								str = new Date(params.row.startTime).format('yyyy-MM-dd') + this.$t('modules_spoc_sign_web_src_views_discount_discount_6276')
							} else {
								str = new Date(params.row.startTime).format('yyyy-MM-dd') + ' ~ ' + new Date(params.row.endTime).format('yyyy-MM-dd')
							}
							return h('div', str);
							//return h('div', params.row.startTime + '~' + params.row.endTime);
						}
					},
					{
						title:this.$t('modules_expandrow_28'),
						key:'itemDesc',
						align:'left',
						tooltip: true,
						resizable: true,
						width: null,
					},
					{
						title: '是否管辖',
						key:'ifCanModify',
						align:'left',
						tooltip: true,
						resizable: true,
						width: null,
						render: (h, params) => {
							let str = ''
							if(params.row.ifCanModify == '1'){
								str = '是'
							} else {
								str = '否'
							}
							return h('div', str);
						}
					},
					{
						title:this.$t('classlist_compontents_detailinfo_45'),
						align:'left',
						width: 130,
						render:(h,params)=>{
							return params.row.ifCanModify == '1' ? h('div',{
								style:{
									display:'flex',
									justifyContent: 'left',
									color: '#44bcb7'
								}
							},[
								h('a',{
									attrs:{
										href:"javascript:void(0);"
									},
									style:{
										cursor:'pointer',
										paddingRight:'10px',
									},
									on:{
										click:()=>{
											this.showEditOther(params)
										}
									}
								},this.$t('classroom_allscore_51')),
								h('a',{
									attrs:{
										href:"javascript:void(0);"
									},
									style:{
									cursor:'pointer',
									paddingLeft:'10px',
									paddingRight:'10px',
									color:'#ff0000',
									},
									on:{
									click:()=>{
										this.showDelItem(params)
									}
									}
								},this.$t('classlist_compontents_detailinfo_46'))
							]) : ''
						}
					},
				],
			],
			xqLists: [],
			htPolicyList:getHtPolicyList(),
			dictData:{
				ht_item_level:[],
				ht_item_type:[],
			},
			approverList:[],
			settingData:{
				list:[]
			},
			policyObj:{
				id:'',
				name:''
			},
			activeItem:{},
			activeIndex: -1,
			operateShow:{},
			columns: [],
			modalShow:{
				delItem:{},
				showPolicy:false,
				showDelMenu:false,
				showAddItem:false,
				showDelMenuItem:false,
				showSetting:false,
				showAddCourseGroupRule: false,
				loadingCourseGroupRule: true,
				showAddYhzcRule: false,
				loadingYhzcRule: true,
				showAddOtherRule: false,
				loadingOtherRule: true
			},
			discountItemObj:{
				metuxPolicies:[]
			},
			flagadd:true,
			courseForChooseList:[],
			editorProtocal:'',
            typeMap:{
                kcb:0,
                zhkcb:1,
                yhzc:2,
                others:3
			},
			searchName:''
		}
	},
	computed:{
	},
	components: {
		vDelModal,
		vAddDiscountItem,
		ruleSetting,
		courseGroupRuleSetting,
		yhzcRuleSetting,
		otherRuleSetting,
		editor
	},
	created(){
		this.initPage();
	},
	mounted(){
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		doSearch(){
			this.getChildrenList(this.activeItem.id)
		},
		uploadObsolete(id){
			let obj = {
				id: id,
				obsolete: '0'
			}
			htItem.uploadObsolete(obj).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.getChildrenList(this.activeItem.id)
				}
			}).catch(errors.call(this));
		},
		saveCurrent(){
			let obj = {
				id: this.activeItem.id,
				protocal: this.editorProtocal
			}
			htPolicy.updateProtocal(obj).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.getListData(true);
					this.$Message.success(res.data.message);
				}
			}).catch(errors.call(this));
		},
		onPageSizeChange(val){
			this.pageSize = val
			this.getChildrenList(this.activeItem.id)
		},
		//分页
		onPageChange(val) {
			this.pageNo = val
			this.getChildrenList(this.activeItem.id)
		},
		getOfficeList() {
			let params = {
				type: 3
			}
			sysOffice.officeList(params).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.xqLists = [];
					let data = res.data.data.allCompany;
					data.forEach(item => {
						this.xqLists.push({
							subId: item.id,
							name: item.name
						});
					});
				}
			}).catch(errors.call(this));
		},
		initPage(){
			sysDict.batchListData({types:'ht_item_type,ht_item_level'}).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.dictData = res.data.data;
				}
			}).catch(errors.call(this));
			sysRole.listMenuRole({menuId: 201}).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.approverList = res.data.data.roleList;
					 this.approverList = res.data.data.roleList.filter(item=>{
					 	return item;
					 });
				}
			}).catch(errors.call(this));
			htRule.list().then(valid.call(this)).then(res=>{
				if(res.ok){
					this.settingData = res.data.data;
				}
			}).catch(errors.call(this));
			this.getListData();
			this.getOfficeList();
		},
		getListData(noDoSelect){
			htPolicy.list().then(valid.call(this)).then(res=>{
				if(res.ok){
					this.htPolicyList = res.data.data.list;
					if(!noDoSelect){
						this.doSelect(0);
					}
				}
			}).catch(errors.call(this));
		},
		showSetting(){
			this.modalShow.showSetting = true;
		},
		saveOtherRule(){
			this.$refs.otherRuleSetting.$refs.otherRuleSettingForm.validate((ok) => {
                if (ok) {
					let otherRuleSetting = this.$refs.otherRuleSetting.formValidate
					let obj = {
						policyId: this.activeItem.id,
						name: otherRuleSetting.name,
						itemDesc: otherRuleSetting.itemDesc,
						startTime: otherRuleSetting.startTime ? new Date(otherRuleSetting.startTime).format('yyyy-MM-dd') + ' 00:00:00':'',
						endTime: otherRuleSetting.endTime ? new Date(otherRuleSetting.endTime).format('yyyy-MM-dd') + ' 23:59:59':'',
						htItemSettings:[
							{
								key:'lpjz',
								value: otherRuleSetting.lpjz
							},
						]
					}
					if(otherRuleSetting.id){
						obj.id = otherRuleSetting.id
					}
					htItem.save(obj).then(valid.call(this)).then(res=>{
						if(res.ok){
							this.modalShow.showAddOtherRule = false
							this.getChildrenList(this.activeItem.id)
						}
					}).catch(errors.call(this));
                } else {
					this.modalShow.showAddOtherRule = true
					this.modalShow.loadingOtherRule = false
					setTimeout(()=>{
						this.modalShow.loadingOtherRule = true
					},0)
                }
            })
		},
		saveYhzcRule(){
			this.$refs.yhzcRuleSetting.$refs.yhzcRuleSettingForm.validate((ok) => {
                if (ok) {
					let yhzcRuleSetting = this.$refs.yhzcRuleSetting.formValidate
					let obj = {
						policyId: this.activeItem.id,
						name: yhzcRuleSetting.name,
						type: yhzcRuleSetting.type,
						itemDesc: yhzcRuleSetting.itemDesc,
						startTime: yhzcRuleSetting.startTime ? new Date(yhzcRuleSetting.startTime).format('yyyy-MM-dd') + ' 00:00:00':'',
						endTime: yhzcRuleSetting.endTime ? new Date(yhzcRuleSetting.endTime).format('yyyy-MM-dd') + ' 23:59:59':'',
						htItemSettings:[
							{
								key:'syfw',
								value: yhzcRuleSetting.syfw.join(',')
							},
							{
								key:'syxq',
								value: yhzcRuleSetting.syxq.join(',')
							},
							{
								key:'sykcb',
								value: yhzcRuleSetting.sykcb.join(',')
							}
						]
					}
					if(yhzcRuleSetting.type == "fullreduction"){
						obj.fullReductionDiscount = yhzcRuleSetting.fullReductionDiscount
						obj.fullReductionLimit = yhzcRuleSetting.fullReductionLimit
						obj.fullReductionPrice = yhzcRuleSetting.fullReductionPrice
					}
					if(yhzcRuleSetting.type == "discount"){
						obj.ratio = yhzcRuleSetting.ratio
					}
					if(yhzcRuleSetting.id){
						obj.id = yhzcRuleSetting.id
					}
					htItem.save(obj).then(valid.call(this)).then(res=>{
						if(res.ok){
							this.modalShow.showAddYhzcRule = false
							this.getChildrenList(this.activeItem.id)
						}
					}).catch(errors.call(this));
                } else {
					this.modalShow.showAddYhzcRule = true
					this.modalShow.loadingYhzcRule = false
					setTimeout(()=>{
						this.modalShow.loadingYhzcRule = true
					},0)
                }
            })
		},
		saveCourseGroupRule(){
			let q = this.$refs.courseGroupRuleSetting.data1
			let res = []
			let loadingFlag = false
			q.forEach((item)=>{
				item.startTime = item.startTime ? new Date(item.startTime).format('yyyy-MM-dd') + ' 00:00:00' : ''
				item.endTime = item.endTime ? new Date(item.endTime).format('yyyy-MM-dd') + ' 23:59:59': ''
				item.discountAmount = Number(item.publicPrice) ? (Number(item.groupPrice) - Number(item.publicPrice)) : 0
				res.push(item)

				if(!Number(item.publicPrice)){
					loadingFlag = true
				}
				if(Number(item.publicPrice) &&  (Number(item.publicPrice) <= 0 || Number(item.publicPrice) > Number(item.groupPrice)) ){
					loadingFlag = true
				}
			})
			if(loadingFlag){
				this.$Message.error(
					{
						content: this.$t('modules_spoc_sign_web_src_views_discount_discount_6277'),
						duration: 3
					}
				);
				this.modalShow.showAddCourseGroupRule = true
				this.modalShow.loadingCourseGroupRule = false
				setTimeout(()=>{
					this.modalShow.loadingCourseGroupRule = true
				},0)
				return false;
			}
			this.$refs.courseGroupRuleSetting.$refs.formValidate.validate((ok) => {
                if (ok) {

					let courseGroupRuleSetting = this.$refs.courseGroupRuleSetting
					let courseGroupRule = {
						name : courseGroupRuleSetting.formValidate.name,
						itemDesc : courseGroupRuleSetting.formValidate.itemDesc,
						htItemList: courseGroupRuleSetting.courseHasChoosedList,
						htItemSubList: res,
						policyId: this.activeItem.id
					}
					if(courseGroupRuleSetting.id){
						courseGroupRule.id = courseGroupRuleSetting.id
					}
					htItem.save(courseGroupRule).then(valid.call(this)).then(res=>{
						if(res.ok){
							this.modalShow.showAddCourseGroupRule = false
							this.getChildrenList(this.activeItem.id)
						}
					}).catch(errors.call(this));
                } else {
					this.modalShow.showAddCourseGroupRule = true
					this.modalShow.loadingCourseGroupRule = false
					setTimeout(()=>{
						this.modalShow.loadingCourseGroupRule = true
					},0)
                }
            })
		},
		saveSetting(){
			let data = this.$refs.rulesetting.rules;
			htRule.save(data).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.$Message.success(res.data.message);
				}
			}).catch(errors.call(this)).finally(()=>{
				this.modalShow.showSetting = false;
			});
		},
		// 切换选中状态
		doSelect(index,type){
			this.searchName = ''
            if(!type){
                type=this.htPolicyList[index].type;
            }
            let ind=this.typeMap[type];
			if(ind == this.activeIndex){
				return
			}
			if(ind == 1 || ind == 2){
				this.getCourseNopage()
			}
			this.resetListAndPage()
			this.activeIndex = ind;
			this.columns = this.columnsArray[ind];
            console.log(ind,type)
			this.activeItem = this.htPolicyList[index];
            console.log(this.activeItem,66666666666);
			this.editorProtocal = this.activeItem.protocal ? this.activeItem.protocal : ''
			this.getChildrenList(this.activeItem.id)
		},
		getCourseNopage(searchName){
			let obj  = {
                pageNo:1,pageSize:0,officeIds:'',name:'',type:'',grade:'',status:1,startTime:'',endTime:''
			}
			if(searchName){
				obj.name = searchName
			}
			common.jwCourseListPage(obj).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.courseForChooseList  = res.data.data.list
				}
			}).catch(errors.call(this)).finally(()=>{

			});
		},
		resetListAndPage(){
			this.pageNo = 1
			this.pageSize = 10
			this.count = 0
			this.pageCount = 0
			this.htItemList =  []
		},
		getChildrenList(policyId){
			this.updateLoadingStatus({isLoading:true});
			let obj  = {
				name: this.searchName,
				policyId,
				pageNo: this.pageNo,
				pageSize: this.pageSize
			}
			htItem.listPage(obj).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.htItemList = res.data.data.list
					if(this.activeIndex == 1){
						this.htItemList.forEach(itemP => {
							let q =  itemP.htItemList
							let res = []
							q.forEach(item=>{
								res.push(item.name)
							})
							itemP.bnkc = res.join('、')
						})
					}
					if(this.activeIndex == 2) {
						this.htItemList.forEach(itemP => {
							let q =  itemP.htItemSettings
							let values = q.filter((item)=>{
								return item.key == 'syxq'
							})
							let myValue = values.length ? values[0].value.split(',')  : []
							let nameArr = []
							this.xqLists.forEach(item =>{
								if(myValue.indexOf(item.subId) >= 0){
									nameArr.push(item.name)
								}
							})
							itemP.syxq =  nameArr.join(',')
						})
					}
					this.count = res.data.data.total
					this.pageCount =  res.data.data.pageCount
				}
			}).catch(errors.call(this)).finally(()=>{
				this.updateLoadingStatus({isLoading:false});
			});
		},
		//添加优惠/促签项目条款弹窗
		showAddItem(){
			if(this.activeIndex == 1) {
				let newCourseGroupRuleSetting  = this.$refs.courseGroupRuleSetting
				newCourseGroupRuleSetting.id = ''
				newCourseGroupRuleSetting.data1 = []
				newCourseGroupRuleSetting.formValidate.name = ''
				newCourseGroupRuleSetting.formValidate.city = ''
				newCourseGroupRuleSetting.compact = ''
            	newCourseGroupRuleSetting.courseForChoose = []
            	newCourseGroupRuleSetting.courseHasChoosed = []
            	newCourseGroupRuleSetting.courseHasChoosedList = []
            	newCourseGroupRuleSetting.model10 = []
				this.modalShow.showAddCourseGroupRule = true
			} else if(this.activeIndex == 2) {
				this.$refs.yhzcRuleSetting.checkAllSyfw = false
				this.$refs.yhzcRuleSetting.checkAllSyxq = false
            	this.$refs.yhzcRuleSetting.checkAllSykcb =  false
				this.$refs.yhzcRuleSetting.formValidate = {
					id: '',
					name: '',
					type: '',
					ratio: '',
					fullReductionPrice: '',
					fullReductionDiscount: '',
					fullReductionLimit: '',
					syfw: [],
					syxq: [],
					sykcb: [],
					startTime: '',
					endTime: '',
					itemDesc: '',
				};
				this.$refs.yhzcRuleSetting.$refs.yhzcRuleSettingForm.resetFields();
				this.modalShow.showAddYhzcRule = true
			} else if(this.activeIndex == 3) {
				this.$refs.otherRuleSetting.formValidate = {
					id: '',
					name: '',
					lpjz: '',
					startTime: '',
					endTime: '',
					itemDesc: '',
				};
				this.$refs.otherRuleSetting.$refs.otherRuleSettingForm.resetFields();
				this.modalShow.showAddOtherRule = true
			} else {
				this.modalShow.additem = true;
				this.modalShow.showAddItem = true;
				let form = this.$refs.discountItem;
				form.$refs.disform.resetFields();
				form.reset();
				let obj=policyObj();

				this.xqLists.forEach((v,k)=>{
					obj.htItemSubList.push({
						subId: v.subId,
						name: v.name,
						type: 'sys_office',
						num: 0,
						costPrice: '',
						publicPrice: 0,
						sort: k,
						tableEdit: true,
					})
				})
				this.discountItemObj = obj;
			}
		},
		//删除弹窗
		showDelItem(item){
			this.modalShow.delItem = item.row;
			// this.modalShow.showDelMenuItem = true;
			this.$Modal.confirm({
				title: this.$t('views_coursepack_bigtableexample_345'),
				content: this.$t('modules_spoc_sign_web_src_views_discount_discount_6279'),
				onOk: () => {
					this.comfirmDelItems()
				},
				onCancel: () => {
				}
			});
		},
		showEditItem(item){
			this.modalShow.additem = false;
			this.modalShow.showAddItem = true;
			let po = Object.assign({},item.row);
			this.discountItemObj =po;
			let form = this.$refs.discountItem;
			form.$refs.disform.resetFields();
			if(this.discountItemObj.htItemSubList.length > 0) {
				this.discountItemObj.htItemSubList.forEach(item => {
					item.tableEdit = true;
				});
			}
		},
		showEditCourseGroup(detail){
			let item = detail.row
			let newCourseGroupRuleSetting  = this.$refs.courseGroupRuleSetting
			newCourseGroupRuleSetting.id =  item.id
			newCourseGroupRuleSetting.formValidate.name = item.name
			newCourseGroupRuleSetting.formValidate.itemDesc = item.itemDesc
			newCourseGroupRuleSetting.data1 = item.htItemSubList  //校区设置的明细
			let schoolIdArray = []
			item.htItemSubList.forEach(q=>{
				schoolIdArray.push(q.subId)
			})

			newCourseGroupRuleSetting.courseHasChoosedList = item.htItemList  //已选的课程包
			let kcbIdArray = []
			item.htItemList.forEach(q=>{
				kcbIdArray.push(q.id)
			})
			newCourseGroupRuleSetting.courseHasChoosed = []  //右侧选中标记
			newCourseGroupRuleSetting.courseForChoose = kcbIdArray  //左侧选中标记
			newCourseGroupRuleSetting.compact = ''
			newCourseGroupRuleSetting.getSchool(true)

			newCourseGroupRuleSetting.model10 = schoolIdArray
			this.modalShow.showAddCourseGroupRule = true
		},
		showEditYhzc(item){
			let row = item.row
			let q = this.$refs.yhzcRuleSetting
			q.$refs.yhzcRuleSettingForm.resetFields();

			let htItemSettings =  row.htItemSettings;
			let syfw = htItemSettings.filter((item1)=>{
				return item1.key == 'syfw'
			})
			let syxq = htItemSettings.filter((item1)=>{
				return item1.key == 'syxq'
			})
			let sykcb = htItemSettings.filter((item1)=>{
				return item1.key == 'sykcb'
			})

			q.formValidate = {
                id: row.id,
                name: row.name,
                type: row.type,
                ratio: row.type == 'discount' ? ''+row.ratio : '',
                fullReductionPrice: row.type == 'fullreduction' ?  '' + row.fullReductionPrice : '',
                fullReductionDiscount: row.type == 'fullreduction' ? ''+row.fullReductionDiscount : '',
                fullReductionLimit: row.type == 'fullreduction' ?  ''+row.fullReductionLimit : '',
                syfw: syfw.length ? syfw[0].value.split(',') : [],
                syxq: syxq.length ? syxq[0].value.split(',') : [],
                sykcb: sykcb.length ? sykcb[0].value.split(',') : [],
                startTime: row.startTime ? new Date(row.startTime) : '',
                endTime: row.endTime? new Date(row.endTime) : '',
                itemDesc: row.itemDesc,
			},

			q.checkAllSyfw = q.formValidate.syfw.length == 2
			q.checkAllSyxq = q.formValidate.syxq.length == this.xqLists.length
            q.checkAllSykcb = q.formValidate.sykcb.length == this.courseForChooseList.length
			this.modalShow.showAddYhzcRule = true
		},
		showEditOther(item){
			let row = item.row
			let q = this.$refs.otherRuleSetting
			q.$refs.otherRuleSettingForm.resetFields();

			let htItemSettings =  row.htItemSettings
			let lpjz = htItemSettings.filter((item1)=>{
				return item1.key == 'lpjz'
			})

			q.formValidate = {
                id: row.id,
                name: row.name,
                lpjz: lpjz.length ?  ''+lpjz[0].value : '',
                startTime: row.startTime ? new Date(row.startTime) : '',
                endTime: row.endTime? new Date(row.endTime) : '',
                itemDesc: row.itemDesc,
			};

			this.modalShow.showAddOtherRule = true
		},
		// 添加/编辑政策
		addPolicy(){
			let	data = extendKey(['id','name'],this.policyObj,{});
			htPolicy.updateName(data).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.modalShow.showPolicy=false;
					this.getListData();
				}
			}).catch(errors.call(this));
		},
		comfirmDelItems(){
			htItem.delete({id: this.modalShow.delItem.id}).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.getChildrenList(this.activeItem.id)
				}
			}).catch(errors.call(this));
		},

		// 确认添加优惠/促签项目条款
		doAddItem(){
			// 调接口
			let form = this.$refs.discountItem;
//			 console.log(form.formData)
			form.$refs.disform.validate(ok=>{
				console.log("ok ==" + ok)
				if(ok){
					let data = JSON.parse(JSON.stringify(form.formData));

					let loadingFlag = false
					if(data.htItemSubList.length > 0) {
						data.htItemSubList.forEach((item, index) => {
							// 校区id和name
							let htItemSubData= this.xqLists.filter(function(child){
								return item.name == child.name;
							})[0]
							item.subId = htItemSubData.subId;
							// 计算定价
							item.costPrice = item.num && Number(item.num)? (item.publicPrice/item.num).toFixed(2) : 0;
							// 排序
							item.sort = index;

							if( (Number(item.num) !== 0 && (!Number(item.num)) ) || (Number(item.publicPrice) !== 0 && (!Number(item.publicPrice)) ) ||  item.num < 0 || item.publicPrice < 0){
								loadingFlag = true
							}
						});
					}

					if(loadingFlag){
						this.$Message.error(
							{
								content: this.$t('modules_spoc_sign_web_src_views_discount_discount_6280'),
								duration: 3
							}
						);
						return false;
					}

					data.policyId = this.activeItem.id;
					let newData = {
						policyId: data.policyId,
						name: data.name,
						htItemSubList: data.htItemSubList,
						itemDesc: data.itemDesc,
					}
					if(data.id){
						newData.id =data.id
					}

					console.log(newData)
					htItem.save(newData).then(valid.call(this)).then(res=>{
						if(res.ok){
							this.modalShow.showAddItem=false;
							this.getChildrenList(this.activeItem.id)
						}
					}).catch(errors.call(this));
				}
			})
		},
		modifyName(item){
			this.flagadd = false;
			this.modalShow.showPolicy=true;
			this.policyObj = extendKey(['id','name'],item,{});
		},
		doAddItemCancel() {
			this.modalShow.showAddItem=false;
			let form = this.$refs.discountItem;
			form.resetAddTable();
		},
	}
}
</script>
