<style lang="less">
	.res-sub-menu-row {
		.sub-menu-item {
			overflow: hidden;
			line-height: 40px;
			.item-foldable{
				cursor: initial;
			}
		}
		.iconfont{
            color: #d9d9d9;
			transition: all 0.3s ease;
			cursor: pointer;
        }
	}
</style>
<template>
	<div class="res-sub-menu-row">
		<div class="sub-menu-item">
			<div class="item-foldable"></div>
            <div class="item-name">
				<span @click="toggleFold">
					<i class="iconfont" :class="foldcls"></i>
				</span>
				<span v-text="data.name"></span>
			</div>
            <div class="item-contractCount" v-text="data.count"></div>
            <div class="item-ctrls">
                <a href="javascript:void(0)" class="linkbtn" @click="showAddDiscounts">{{$t('modules_spoc_sign_web_src_views_category_category_5137')}}</a>
                <a href="javascript:void(0)" class="linkbtn" @click="showAddApplyState">{{$t('modules_spoc_sign_web_src_views_category_component_menuitem_5168')}}</a>
                <a href="javascript:void(0)" class="linkbtn" @click="showUpdateMenu">{{$t('classroom_allscore_51')}}</a>
                <a href="javascript:void(0)" class="linkbtn" @click="showDelMenu">{{$t('classlist_compontents_detailinfo_46')}}</a>
            </div>
		</div>
		
		<div class="subfold" v-if="state.visible">
			<expand-row v-for="(item,index) in subMenuList" :key="index" :data="item" :subTree="item.children&&item.children.length>0?true:false" :eventList="eventList">
				<!-- <expand-row slot="subTree" v-for="(value,ind) in item.children" :key="ind" :data="value" :marginLeft="40"></expand-row> -->
			</expand-row>
        </div>
		
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
	</div>
</template>
<script>
import expandRow from "./expandRow";
export default {
	name:'subMenuItem',
	props:{
		data:{
			type:Object,
			default:function(){
				return {};
			}
		},
	},
	data () {
		return {
			state:{
                visible:false
			},
			subMenuList:[
				{id:1,name:this.$t('modules_spoc_sign_web_src_views_category_component_submenuitem_5207'),count:'6',children:[]},
				{id:1,name:this.$t('modules_spoc_sign_web_src_views_category_component_submenuitem_5208'),count:'6'},
				{id:1,name:this.$t('modules_spoc_sign_web_src_views_category_component_submenuitem_5209'),count:'6',children:[]},	
			],
			eventList:[
				{id:1,eventName:this.$t('modules_spoc_sign_web_src_views_category_category_5137'),event:this.showSubAddDiscounts},
				{id:2,eventName:this.$t('classroom_allscore_51'),event:this.showSubModify},
				{id:3,eventName:this.$t('classlist_compontents_detailinfo_46'),event:this.showSubDelMenu},
			],
			currOperateData:{},
			modalShow:{
				showUpdateMenu:false,
				showDelMenu:false,
				showAddDiscounts:false,
			},
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
		}
	},
	computed: {
		foldcls(){
			return {
                'icon-tright':!this.state.visible,
                'icon-xiala':this.state.visible,
            };
		}
	},
	components: {
		expandRow
	},
	methods: {
		toggleFold(){
			this.state.visible = !this.state.visible;
		},
		showAddDiscounts(){
			this.$emit('on-add-discounts',this.data);
		},
		showAddApplyState(){
			this.$emit('on-add-apply-state',this.data);
		},
		showUpdateMenu(){
			this.$emit('on-update-menu',this.data);
		},
		showDelMenu(){
			this.$emit('on-del-menu',this.data);
		},

		//显示modal框
		showSubAddDiscounts(data){
			this.currOperateData =data;
			this.modalShow.showAddDiscounts = true;
		},
		showSubModify(data){
			this.currOperateData =data;
		},
		showSubDelMenu(data){
			this.currOperateData =data;
			this.modalShow.showDelMenu = true;
		},


		//删除modal操作
		comfirmDel(){
			this.modalShow.showDelMenu = false;
			console.log('some ............');				
		},
		comfirmCancel(){
			this.modalShow.showDelMenu = false;
		},

		//添加优惠政策
		showDiscountItem(index){
			this.btnActiveIndex = index
		},
		checkAllGroupChange(){
			if(this.checkGroupList.length ==this.checkAllGroup.length){
				this.checkAll = true;
			}else{
				this.checkAll = false;
			}
		},
		addDiscounts(){

		}
	},
	watch: {
		checkAll(val){
			if(val){
				let arr = this.checkGroupList.map(v=>{
					return v.value;
				})
				this.checkAllGroup = arr;
			}else if(this.checkAllGroup.length>0&&this.checkAllGroup.length<this.checkGroupList.length){
				this.checkAll =false;
			}else {
				this.checkAllGroup =[];
			}
		}
	}
}
</script>


