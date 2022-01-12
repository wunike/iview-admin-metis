<style lang="less">
@green:#44bcb7;
.spoc_sign_discount{
	border-top: 1px solid #e0e0e0;
	@text:#495060;
	.policy_title{
		margin: 30px 0;
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
		width:100%;
		margin-top: 20px;
		text-align: center;
		button{
			width: 140px;
			height: 40px;
			font-size: 16px;
		}
	}
}
.vertical-center-modal{
	.ivu-modal{
		max-height: 80%;
	}
}
</style>
<template>
	<div class="spoc_sign_discount">
		<div class="setting-tips-wrap" v-if="false">
			<a class="setting-tips" @click="showSetting">{{$t('modules_spoc_sign_web_src_views_discount_discount_6246')}}</a>
		</div>
		<div class="policy_title">
			<div v-for="(item,index) in htPolicyList" :key="index"	:class="{'p-item':1,active:item.id==activeItem.id}" @click="doSelect(index)">
				<span class="label" v-text="item.name"></span>	
				<i class="iconfont icon-xia">
					<div class="dropdown">
						<p class="litem" @click="modifyName(item)">{{$t('modules_expandrow_15')}}</p>
					</div>
				</i>
			</div>
		</div>
		<div class="discount">
			<div class="title" v-text="activeItem.name" v-if="false"></div>
			<div class="subTitle">{{$t('modules_spoc_sign_web_src_views_discount_discounttab_6306')}}<Button class="add" type="primary" @click="showAddItem">{{$t('classroom_allscore_52')}}</Button>
			</div>
				<Table border :columns="columns" :data="activeItem.htItemList" style="margin-bottom:50px;"></Table>
			<div class="subTitle" v-if="false">{{$t('modules_spoc_sign_web_src_views_discount_discounttab_6309')}}</div>
			<Input type="textarea" v-model="activeItem.protocal" v-if="false"/>
		</div>
		<div class="save">
			<Button type="primary" @click="saveCurrent">{{$t('courselist_compontents_servicecontent_215')}}</Button>
		</div>
		<!-- 添加新政策 -->
		<Modal :title="flagadd?$t('modules_spoc_sign_web_src_views_discount_discount_6253'):$t('modules_spoc_sign_web_src_views_discount_discount_6254')" v-model="modalShow.showPolicy">
			<Form :data="policyObj">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_category_category_5138')">
					<Row>
						<Col span="8">
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
		<Modal width="748" v-model="modalShow.showAddItem" :title="$t('modules_spoc_sign_web_src_views_discount_discount_6261')" class-name="vertical-center-modal" @on-cancel="doAddItemCancel">
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
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import vDelModal from "../../modules/vDelModal";
import vAddDiscountItem from "./componet/vAddDiscountItem";
import ruleSetting from "./componet/ruleSetting";
import valid, { errors, htPolicy, htRule, common, sysRole,sysOffice, sysDict } from '../../libs/request.js';
import { getHtPolicyList } from '../../store/index.js';
import { extendKey } from '../../libs/util.js';

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
		itemDesc:'',
		protocal:'',
		protocalType:-1,
		htItemSubList: []
	}
}

export default {
	data () {
		return {
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
			activeIndex:0,
			operateShow:{},
			columns:[
				{
					title:this.$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6165'),
					key:'levelName',
					align:'center',
					resizable: true,
					width: null,
					render: (h, params) => {
						return h('div', params.row.levelName ? params.row.levelName : this.$t('modules_spoc_sign_web_src_views_discount_discount_bak_6439'));
					}
				},
				{
					title:this.$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_bak_6188'),
					key:'name',
					align:'center',
					resizable: true,
					width: null,
				},
				{
					title:this.$t('modules_expandrow_28'),
					key:'itemDesc',
					align:'center',
					resizable: true,
					width: null,
				},
				// {
				// 	title:'适用产品',
				// 	key:'productDesc',
				// 	align:'center'
				// },
				// {
				// 	title:'审批人',
				// 	key:'auditorName',
				// 	align:'center'
				// },
				{
					title:this.$t('classlist_compontents_detailinfo_45'),
					align:'center',
					resizable: true,
					width: null,
					render:(h,params)=>{
						return h('div',{
							style:{
								display:'flex',
								justifyContent: 'center',
								color: '#44bcb7'
							}
						},[
							h('div',{
								style:{
									cursor:'pointer',
									paddingLeft:'10px',
									paddingRight:'10px',
								},
								on:{
								click:()=>{
									this.showEditItem(params)
								}
								}
							},this.$t('classroom_allscore_51')),
							h('div',{
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
			modalShow:{
				delItem:{},
				showPolicy:false,
				showDelMenu:false,
				showAddItem:false,
				showDelMenuItem:false,
				showSetting:false,
			},
			discountItemObj:{
				metuxPolicies:[]
			},
			flagadd:true,
		}
	},
	computed:{
	},
	components: {
		vDelModal,
		vAddDiscountItem,
		ruleSetting
	},
	created(){
		this.initPage();
	},
	mounted(){
		
	},
	methods: {
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
					// this.approverList = res.data.data.roleList.filter(item=>{
					// 	return item;
					// });
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
		getListData(cb){
			htPolicy.list().then(valid.call(this)).then(res=>{
				if(res.ok){
					this.htPolicyList = res.data.data.list;
					cb&&cb(this.htPolicyList);
					this.doSelect(this.activeIndex);
				}
			}).catch(errors.call(this));
		},
		showSetting(){
			this.modalShow.showSetting = true;
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
		doSelect(index){
			this.activeIndex = index;
			this.activeItem = this.htPolicyList[index];
		},
		//添加优惠/促签项目条款弹窗
		showAddItem(){
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
		},
		//删除弹窗
		showDelItem(item){
			this.modalShow.delItem = item.row;
			this.modalShow.showDelMenuItem = true;
		},
		showEditItem(item){
			this.modalShow.additem = false;
			this.modalShow.showAddItem = true;
			let po = Object.assign({},item.row);
			po.metuxPolicies=po.metuxPolicies.split(',');
			this.discountItemObj =po;
			let form = this.$refs.discountItem;
			form.$refs.disform.resetFields();
			if(this.discountItemObj.htItemSubList.length > 0) {
				this.discountItemObj.htItemSubList.forEach(item => {
					item.tableEdit = true;
				});
			}
			// console.log(this.discountItemObj)
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
			htPolicy.deleteItem(this.modalShow.delItem.id).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.getListData();
				}
			}).catch(errors.call(this));
		},
		
		// 确认添加优惠/促签项目条款
		doAddItem(){
			// 调接口
			let form = this.$refs.discountItem;
//			 console.log(form.formData)
			form.$refs.disform.validate(ok=>{
				if(ok){
					let data = JSON.parse(JSON.stringify(form.formData));
					// console.log(data)
					if(data.htItemSubList.length > 0) {
						data.htItemSubList.forEach((item, index) => {
							// 校区id和name
							let htItemSubData= this.xqLists.filter(function(child){
								return item.name == child.name; 
							})[0]
							item.subId = htItemSubData.subId;
							// 计算定价
							item.costPrice = (item.publicPrice/item.num).toFixed(2);
							// 排序
							item.sort = index;
							// 删除编辑标志
							delete item.tableEdit;
						});
					}
					data.policyId = this.activeItem.id;
					data.metuxPolicies = data.metuxPolicies.join(',');
					// console.log(data);
					htPolicy.saveItem(data).then(valid.call(this)).then(res=>{
						if(res.ok){
							this.modalShow.showAddItem=false;
							this.getListData();
						}
					}).catch(errors.call(this));
				}
			})
		},
		//保存
		saveCurrent(){
			if(this.activeItem){
				let data = {
					id:this.activeItem.id,
					name:this.activeItem.name,
					protocal:this.activeItem.protocal
				}
				htPolicy.save(data).then(valid.call(this)).then(res=>{
					if(res.ok){
						this.$Message.success(res.data.message);
						this.getListData();
					}
				}).catch(errors.call(this));
			}
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
