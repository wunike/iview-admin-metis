<style lang="less">
.menu-list-item-wrap{
    .menu-list-item{
        height: 40px;
        line-height: 40px;
        border-top: 1px solid #e5e5e5;
        overflow: hidden;
        .iconfont{
            color: #d9d9d9;
            transition: all 0.3s ease;
        }
    }
}
</style>
<template>
    <div class="menu-list-item-wrap">
        <div class="menu-list-item">
            <div class="item-foldable" @click="toggleFold">
                <i class="iconfont" :class="foldcls"></i>
            </div>
            <div class="item-name" v-text="data.name"></div>
            <div class="item-contractCount" v-text="data.count"></div>
            <div class="item-ctrls">
                <a href="javascript:void(0)" class="linkbtn" @click="addDiscounts">{{$t('modules_spoc_sign_web_src_views_category_category_5137')}}</a>
                <a href="javascript:void(0)" class="linkbtn" @click="addProductType">{{$t('modules_spoc_sign_web_src_views_category_category_5128')}}</a>

                <a href="javascript:void(0)" class="linkbtn" @click="updateMenu">{{$t('classroom_allscore_51')}}</a>
                <a href="javascript:void(0)" class="linkbtn" @click="delMenu">{{$t('classlist_compontents_detailinfo_46')}}</a>
            </div>
        </div>
        <div class="subfold" v-if="state.visible">
            <sub-menu-item  v-for="item in subMenuList" :data="item" :key="item.id" @on-add-discounts="showAddDiscounts" @on-add-apply-state="showAddApplyState" @on-update-menu="showUpdateMenu" @on-del-menu="showDelMenu"></sub-menu-item>
        </div>

        <!-- 添加申请阶段 -->
        <Modal :title="$t('modules_spoc_sign_web_src_views_category_component_menuitem_5168')" v-model="modalShow.showAddApplyState" ok-:text="$t('courselist_compontents_servicecontent_215')"  @on-ok="addApplyState">
			<Form :data="addApplyStateObj">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_category_category_5129')">{{addApplyStateObj.fname}}</FormItem>
				<FormItem :label="$t('modules_spoc_sign_web_src_views_category_category_5130')">{{addApplyStateObj.name}}</FormItem>
				<FormItem :label="$t('modules_spoc_sign_web_src_views_category_component_menuitem_5172')">
					<Row>
						<Col span="8">
							<Input v-model="addApplyStateObj.type"></Input>	
						</Col>
					</Row>
				</FormItem>	
			</Form>
		</Modal>
        <!-- 添加优惠政策 -->
        <Modal width="728" class-name="modal-policy" :title="$t('modules_spoc_sign_web_src_views_category_category_5137')" v-model="modalShow.showAddDiscounts" @on-ok="addDiscountsPolicy">
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

        <!-- 删除 -->
		<Modal class-name="modal-del" :title="$t('classlist_compontents_detailinfo_46')" v-model="modalShow.showDelMenu">
			<div class="message">{{$t('modules_spoc_sign_web_src_views_category_category_5132')}}<span>{{$t('modules_spoc_sign_web_src_views_category_category_5133')}}</span>{{$t('pushsettings_23')}}</div>
			<div class="btns" slot="footer">
				<Button type="error"  @click="comfirmDel">{{$t('classroom_allscore_54')}}</Button>
				<Button @click="comfirmCancel">{{$t('classroom_allscore_53')}}</Button>
			</div>
		</Modal>
        
    </div>
</template>
<script>

import subMenuItem from './subMenuItem';

export default {
    props:{
        data:{
            type:Object,
            default:function(){
                return {};
            }
        },
        edit:{
            type:Boolean,
            default:true,
        }
    },
    data(){
        return {
            state:{
                visible:false
            },
            subMenuList:[
				{id:1,fname:'Elite',name:this.$t('modules_spoc_sign_web_src_views_category_component_menuitem_5181'),count:12},
				{id:2,fname:'Elite',name:this.$t('modules_spoc_sign_web_src_views_category_category_5133'),count:15},
			],
            modalShow:{
				showAddDiscounts:false,
				showAddApplyState:false,
				showUpdateMenu:false,
				showDelMenu:false,
			},
            addApplyStateObj:{},
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
        };
    },
    computed:{
        foldcls(){
            return {
                'icon-tright':!this.state.visible,
                'icon-xiala':this.state.visible,
            };
        }
    },
    components:{
        subMenuItem
    },
    // filters:{
    //     showText(isShow){
    //         if(isShow){
    //             return '显示';
    //         }
    //         return '隐藏';
    //     }
    // },
    methods:{
        toggleFold(){
            this.state.visible = !this.state.visible;
        },
        updateMenu(){
            this.$emit('onupdate',this.data);
        },
        delMenu(){
            this.$emit('ondel',this.data);
        },
        addDiscounts(){
            this.$emit('on-add-discounts',this.data);
        },
        addProductType(){
            this.$emit('on-add-product-type',this.data);
        },
        //开启模态框
       
        showAddDiscounts(data){
           this.addApplyStateObj = data;
            this.modalShow.showAddDiscounts = true;            
        },
        showAddApplyState(data){
           this.addApplyStateObj = data;
           this.modalShow.showAddApplyState = true;
            
        },
        showUpdateMenu(data){
            console.log(data);
            
        },
        showDelMenu(data){
            this.addApplyStateObj = data;
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
        addDiscountsPolicy(){

        },
        //添加申请类型
        addApplyState(){
            console.log('some operate');
            
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


