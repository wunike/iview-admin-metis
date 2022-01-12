

<style lang="less">
.spoc_sign_category{
	.search_item{
		margin:20px 0; 		
	}
	.menulist-table {
		max-height: ~"calc(100vh - 180px)";
		overflow: auto;
		.linkbtn {
			color: #2d83bb;
			& + .linkbtn {
				margin-left: 8px;
			}
		}
		.nodata {
			padding: 40px 0;
			text-align: center;
		}
		.thead {
			color: #000;
			font-weight: bold;
			overflow: hidden;
			border-bottom: 1px solid #e5e5e5;
			[class^="item-"] {
				line-height: 40px;
			}
		}
		[class^="item-"] {
			float: left;
			min-height: 40px;
			min-width: 1%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.menu-item-lists{
			border-bottom: 1px solid #e5e5e5;
			.menu-item{
				&:first-child{
					.menu-list-item{
						border: none;
					}
				}
			}
		}
		
		.item-foldable {
			width: 2%;
			text-align: right;
			cursor: pointer;
			&:hover {
				.iconfont {
				color: #888;
				}
			}
		}
		.item-name {
			width: 30%;
		}
		.item-contractCount {
			width: 30%;
			.item-ctrls {
				width: 40%;
			}
		}
	}	
	.menu-item-lists{
		border-bottom: 1px solid #e5e5e5;
		.menu-item{
			&:first-child{
				.menu-list-item{
					border: none;
				}
			}
		}
	}
	
}
.modal-del{
	.message{
		text-align:center; 
		padding:45px 0 ;
		font-size:18px;
		span{
			color:#e8352c;
		}
	}
	.ivu-modal-footer{
		border: none;
		padding:0 0 50px;
		.btns {
			text-align:center;
			button{
				width: 120px;
			}
		}
	}
}
.modal-policy{
	.ivu-modal-footer{
		border: none;
	}
	.title{
		height: 40px;
		background-color: #fafafa;
		border-bottom: solid 1px #e0e0e0;
		font-size: 16px;
		text-align: center;
		line-height: 40px;
	}
	.policy-content{
		display: flex;
		justify-content: space-around;
		.right,
		.left{
			width: 328px;
			border: solid 1px #e0e0e0;
		}
		.left{
			width: 284px;
		}
		.right_contnet{
			padding: 8px 0;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			button{
				width: 140px;
				margin:22px 0; 
			}
		}
		.left_content{
			padding:20px;
		}
	}	
}
</style>
<template>
	<div class="spoc_sign_category">
		<div class="search_item">
			<v-search-options :data="country.countryList" :searchTitle="country.searchName" @on-select-item="onSelectItem"></v-search-options>
		</div>
		<div>
			<v-title :title="$t('modules_spoc_sign_web_src_views_category_category_5118')">
				<div slot="right">
					<Button type="primary" @click="showAddCategory">{{$t('modules_spoc_sign_web_src_views_category_category_5119')}}</Button>
				</div>
			</v-title>
		</div>
		<div class="menulist-table">
			<div class="thead">
				<div class="item-foldable"></div>  
				<div class="item-name">{{$t('messagemanagement_components_histroylists_310')}}</div>
				<div class="item-contractCount">{{$t('modules_spoc_sign_web_src_views_category_category_5121')}}</div>
				<div class="item-ctrls">{{$t('classlist_compontents_detailinfo_45')}}</div>
			</div>
			<div class="menu-item-lists" v-if="currSubMenu.length">
				<tabmenu-item class="menu-item" v-for="item in currSubMenu" :data="item" :key="item.id" @onupdate="showUpdateMenu(item)" @ondel="showDelMenu(item)" @on-add-discounts="showAddDiscounts(item)" @on-add-product-type="showAddProductType(item)"></tabmenu-item>
			</div>
			<div v-else class="nodata">
				<p>{{$t('integralflow_19')}}</p>
			</div>
		</div>
		<!-- 添加分类 -->
		<Modal :title="$t('modules_spoc_sign_web_src_views_category_category_5124')" v-model="modalShow.showAddCategory" ok-:text="$t('courselist_compontents_servicecontent_215')" @on-ok="addCategory">
			<Form :data="addCategoryObj" :label-width="80">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_category_category_5126')">
					<Row>
						<Col span="9">
							<Select v-model="addCategoryObj.country">
								<Option>fff</Option>
							</Select>
						</Col>	
					</Row>	
				</FormItem>
				<FormItem :label="$t('modules_spoc_sign_web_src_views_category_category_5127')">
					<Row>
						<Col span="9">
							<Input v-model="addCategoryObj.name"></Input>	
						</Col>	
					</Row>	
				</FormItem>	
			</Form>
		</Modal>
		<!-- 添加产品类型 -->
		<Modal :title="$t('modules_spoc_sign_web_src_views_category_category_5128')" v-model="modalShow.showAddProductType" ok-:text="$t('courselist_compontents_servicecontent_215')" @on-ok="AddProductType">
			<Form :data="AddProductTypeObj" >
				<FormItem :label="$t('modules_spoc_sign_web_src_views_category_category_5129')">{{AddProductTypeObj.name}}</FormItem>
				<FormItem :label="$t('modules_spoc_sign_web_src_views_category_category_5130')">
					<Row>
						<Col span="8">
							<Input v-model="AddProductTypeObj.type"></Input>	
						</Col>
					</Row>
				</FormItem>	
			</Form>
		</Modal>
		<!-- 删除 -->
		<Modal class-name="modal-del" :title="$t('classlist_compontents_detailinfo_46')" v-model="modalShow.showDelMenu">
			<div class="message">{{$t('modules_spoc_sign_web_src_views_category_category_5132')}}<span>{{$t('modules_spoc_sign_web_src_views_category_category_5133')}}</span>{{$t('pushsettings_23')}}</div>
			<div class="btns" slot="footer">
				<Button type="error"  @click="comfirmDel">{{$t('classroom_allscore_54')}}</Button>
				<Button @click="comfirmCancel">{{$t('classroom_allscore_53')}}</Button>
			</div>
		</Modal>
		<!-- 添加优惠政策 -->
		<Modal width="728" class-name="modal-policy" :title="$t('modules_spoc_sign_web_src_views_category_category_5137')" v-model="modalShow.showAddDiscounts" @on-ok="addDiscounts">
			<div class="policy-content">
				<div class="right">
					<div class="title">{{$t('modules_spoc_sign_web_src_views_category_category_5138')}}</div>
					<div class="right_contnet">
						<Button :type="index == btnActiveIndex? 'primary':'ghost'" v-for="(item,index) in policyList" :key="index" @click="showDiscountItem(index)">{{item.label}}</Button>
					</div>
				</div>
				<div class="left">
					<div class="title">{{$t('modules_spoc_sign_web_src_views_category_category_5139')}}</div>
					<div class="left_content">
						<Checkbox v-model="checkAll">{{$t('modules_rolepeople_212')}}</Checkbox>
						<CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
							<Checkbox :label="item.value" v-for="(item,index) in checkGroupList" :key="index">{{item.label}}</Checkbox>
						</CheckboxGroup>
					</div>
				</div>
			</div>
		</Modal>
		<!-- 编辑	 -->
		<Modal :title="$t('modules_spoc_sign_web_src_views_category_category_5141')" v-model="modalShow.showUpdateMenu" ok-:text="$t('courselist_compontents_servicecontent_215')" @on-ok="updateMenu">
			<Form :data="editObj" >
				<FormItem :label="$t('modules_spoc_sign_web_src_views_category_category_5142')">{{editObj.pname}}</FormItem>
				<FormItem :label="$t('modules_spoc_sign_web_src_views_category_category_5127')">
					<Row>
						<Col span="8">
							<Input v-model="editObj.name"></Input>	
						</Col>
					</Row>
				</FormItem>	
			</Form>
		</Modal>
	</div>
</template>
<script>
import vSearchOptions from "../../modules/vSearchOptions";
import vTitle from "@public/modules/vTitle";
import tabmenuItem from "./component/menuItem";
import valid,{errors,htClass } from "../../libs/request";
import { mapMutations } from "vuex";

export default {
	name:'category',
	data () {
		return {
			country:{
				searchName:this.$t('modules_spoc_sign_web_src_views_category_category_5143'),
				countryList:[
					{id:1,label:this.$t('modules_spoc_sign_web_src_views_category_category_5144')},
					{id:2,label:this.$t('modules_spoc_sign_web_src_views_category_category_5145')},
					{id:3,label:this.$t('modules_spoc_sign_web_src_views_category_category_5146')},
					{id:4,label:this.$t('modules_spoc_sign_web_src_views_category_category_5147')},
					{id:5,label:this.$t('modules_spoc_sign_web_src_views_category_category_5148')},
				],
			},
			currSubMenu: [
				{id:1,name:'Elite',count:42},
				{id:2,name:this.$t('modules_spoc_sign_web_src_views_category_category_5149'),count:0},
				{id:3,name:this.$t('modules_spoc_sign_web_src_views_category_category_5150'),count:0},
			],
			policyList:[
				{id:1,label:this.$t('modules_spoc_sign_web_src_views_category_category_5151'),},
				{id:2,label:this.$t('modules_spoc_sign_web_src_views_category_category_5152'),},
				{id:3,label:this.$t('modules_spoc_sign_web_src_modules_tabledetails_4970'),},
				{id:4,label:this.$t('modules_spoc_sign_web_src_views_category_category_5154'),},
				{id:5,label:this.$t('modules_spoc_sign_web_src_views_category_category_5155'),},
				{id:6,label:this.$t('modules_spoc_sign_web_src_views_category_category_5156'),},
				{id:7,label:this.$t('modules_spoc_sign_web_src_views_category_category_5157'),},
				{id:8,label:this.$t('modules_spoc_sign_web_src_views_category_category_5158'),},
			],
			btnActiveIndex:0,
			checkAllGroup:[],
			checkAll:false,	
			checkGroupList:[
				{id:1,value:this.$t('modules_spoc_sign_web_src_views_category_category_5159'),label:this.$t('modules_spoc_sign_web_src_views_category_category_5159')},
				{id:1,value:this.$t('modules_spoc_sign_web_src_views_category_category_5160'),label:this.$t('modules_spoc_sign_web_src_views_category_category_5160')},
				{id:1,value:this.$t('modules_spoc_sign_web_src_views_category_category_5161'),label:this.$t('modules_spoc_sign_web_src_views_category_category_5161')},
				{id:1,value:this.$t('modules_spoc_sign_web_src_views_category_category_5162'),label:this.$t('modules_spoc_sign_web_src_views_category_category_5162')},
				{id:1,value:this.$t('modules_spoc_sign_web_src_views_category_category_5163'),label:this.$t('modules_spoc_sign_web_src_views_category_category_5163')},
			],
			modalShow:{
				showAddCategory:false,
				showUpdateMenu:false,
				showDelMenu:false,
				showAddDiscounts:false,
				showAddProductType:false
			},
			AddProductTypeObj:{
				name:'',
				id:11,
				type:''
			},
			addCategoryObj:{
				country:'',
				name:''
			},
			editObj:{
			}
		}
	},
	computed: {
		
	},
	components: {
		vSearchOptions,
		vTitle,
		tabmenuItem,
	},
	created () {
		// this.fetchBuildTree()
	},
	methods: {
		...mapMutations(['updateLoadingStatus']),
		onSelectItem(item){
			console.log(item);	
		},
		//开启模态框
		showUpdateMenu(item){
			this.editObj = item;
			this.modalShow.showUpdateMenu = true;
		},
		showDelMenu(item){
			this.modalShow.showDelMenu = true;
		},
		showAddDiscounts(item){
			this.modalShow.showAddDiscounts = true;
		},
		showAddProductType(item){
			this.AddProductTypeObj = item;
			this.modalShow.showAddProductType = true;
		},
		showAddCategory(){
			this.modalShow.showAddCategory = true;
		},
		//添加合同分类
		addCategory(){
			alert(111);
		},
		//添加产品类型操作
		AddProductType(){
			alert('fetch data')
		},
		//编辑
		updateMenu(){
			
		},
		//删除modal操作
		comfirmDel(){
			this.modalShow.showDelMenu = false;
			console.log('some ............');
						
		},
		comfirmCancel(){
			this.modalShow.showDelMenu = false;
		},
		/*添加优惠政策*/
		addDiscounts(){
			//接口
		},
		showDiscountItem(index){
			this.btnActiveIndex = index
		},
		checkAllGroupChange(){
			if(this.checkGroupList.length == this.checkAllGroup.length){
				this.checkAll = true;
			}else{
				this.checkAll = false;
			}
		},
		//获取合同分类树形列表
		fetchBuildTree(){
			this.updateLoadingStatus({ isLoading: true });
			htClass
			.fetchBuildTree()
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
					console.log(res);
				}
			})
			.catch(errors.call(this))
			.finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		}
	},
	watch: {
		checkAll(val){
			if(val){
				let arr = this.checkGroupList.map(v=>{
					return v.value;
				})
				this.checkAllGroup = arr;
			}else {
				if(this.checkAllGroup.length==this.checkGroupList.length){
					this.checkAllGroup =[];
				}	 
			}
		}
	}
}
</script>
