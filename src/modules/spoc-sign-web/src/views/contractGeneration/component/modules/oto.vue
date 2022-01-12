<style lang="less">

</style>

<template>
	<div>
		<div class="packsBox" v-for="(items,index) in data.policyData.list" :key="index">
			<Row type="flex">
				<Col span="8">
				<FormItem :label="$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2414')" :prop="'list.'+index+'.itemId'" :rules="{required: true, message: $t('modules_spoc_sign_web_src_views_contractgeneration_component_modules_oto_5308'), trigger: 'change'}">
					<Select v-model="items.itemId" @on-change="itemIdChange(items)">
						<Option v-for="item in data.htItemList" :value="item.id" :key="item.id" :disabled="data.policyData.list.find(v=>v.itemId==item.id)">{{item.name}}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="4" offset="12" class="btnCol">
				<Button @click="addBag" v-show="data.policyData.list.length==index+1">{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_modules_oto_5309')}}</Button>
				<Button @click="remBag(index)" v-show="data.policyData.list.length>1" style="margin-left: 20px;">{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_modules_oto_5310')}}</Button>
				</Col>
			</Row>
			<Row type="flex">
				<Col span="8">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5234')" :rules="{required: true,pattern: /^\d+$/, message: $t('modules_spoc_sign_web_src_views_contractgeneration_component_modules_background_5275'), trigger: 'change'}">
					<Input v-model="items.giftCount" @on-change="numChange(items,$event)" style="width:262px;"><span slot="append">{{$t('message_socket_305')}}</span></Input>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5233')">
						<Input v-model="items.unitPrice" disabled style="width:262px;"><span slot="append">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span></Input>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5232')">
					<Input v-model="items.publicPrice" disabled style="width:262px;"><span slot="append">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span></Input>
				</FormItem>
				</Col>
			</Row>
			<Row type="flex">
				<Col span="8">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_modules_background_5274')" :rules="{required: true,pattern: /^\d+$/, message: $t('modules_spoc_sign_web_src_views_contractgeneration_component_modules_background_5275'), trigger: 'change'}">
					<Input v-model="items.ratio" @on-blur="ratioChange(items,$event)" style="width:262px;"><span slot="append">%</span></Input>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_signlists_870')">
						<Input v-model="items.costPrice" disabled style="width:262px;"><span slot="append">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span></Input>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_modules_background_5277')">
					<Input v-model="items.share" disabled style="width:262px;"><span slot="append">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span></Input>
				</FormItem>
				</Col>
			</Row>
		</div>
		<tpl9 :data="data" :info="info" :policy="data.policyData" ref="tp"></tpl9>
	</div>
</template>

<script>
	import tpl9 from './tpl9.vue';
	export default{
		props: {
			data: {
				type: Object,
				required: true,
			},
			info: { // 主合同信息
				type: Object,
				required: true,
			},
			actualPrice: {
				type: [String,Number],
				required: true,
			},
			sharePrice: {
				type: [String,Number],
				required: true,
			},
			protocolExemptionPrice: {
				type: [String,Number],
				required: true,
			},
			infoPrice: {
				type: [String,Number],
				required: true,
			},
		},
		data(){
			return {
				
			}
		},
		computed: {},
		components: {
			tpl9,
		},
		created(){
		},
		mounted() {
			this.$nextTick(() => {
			})
		},
		methods: {
			itemIdChange(o) {
				this.data.htItemList.forEach(v => {
					if(v.id == o.itemId) {
						o.giftCount = v.giftCount;
						o.unitPrice = v.costPrice;
						o.publicPrice = this.accMul(v.giftCount,v.costPrice);
						o.ratio='100';
						this.ratioChange(o);
					}
				})
				this.$emit('on-change');
			},
			addBag() {
				let obj = {
					itemId: '',
					jsonData: {},
					costPrice: '',
					publicPrice: '',
					giftCount: '',
					protocalText: '',
					unitPrice:'',
					ratio:'100',
					ratioPrice:'',
					share:''
				}
				this.data.policyData.list.push(obj);
				this.$nextTick(()=>{
					this.$parent.$parent.$el.querySelector('.bagBox').scrollTop=this.$parent.$parent.$refs.f.$el.scrollHeight;
				})
			},
			remBag(ind) {
				this.data.policyData.list.splice(ind, 1);
			},
			numChange(o, e) {
				o.giftCount = e.target.value;
				o.publicPrice = this.accMul(o.giftCount, o.unitPrice);
				this.ratioChange(o);
			},
			accMul(arg1, arg2) {
				let m = 0,
					s1 = String(arg1),
					s2 = String(arg2);
				try {
					m += s1.split(".")[1].length
				} catch(e) {}
				try {
					m += s2.split(".")[1].length
				} catch(e) {}
				return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
			},
			ratioChange(o){
				console.log('ratioChange')
				o.ratioPrice=this.accMul(o.ratio,o.publicPrice)/100;
				let infoShare=this.infoPrice?(o.ratioPrice/this.infoPrice)*this.protocolExemptionPrice:0;
				console.log(infoShare,this.infoPrice,this.protocolExemptionPrice)
				o.share=(((o.ratioPrice/this.actualPrice*this.sharePrice)||0)+infoShare);
				o.costPrice = (Number(o.ratioPrice)-Number(o.share));
			}
		},
		watch: {
			'actualPrice': {
				handler: function(val, oldVal) {
					console.log('actualPrice')
					this.data.policyData.list.forEach(v=>{
						this.ratioChange(v);
					})
				},
				deep: true
			},
			'sharePrice': {
				handler: function(val, oldVal) {
					console.log('sharePrice')
					this.data.policyData.list.forEach(v=>{
						this.ratioChange(v);
					})
				},
				deep: true
			},
			'protocolExemptionPrice': {
				handler: function(val, oldVal) {
					this.data.policyData.list.forEach(v=>{
						this.ratioChange(v);
					})
				},
				deep: true
			},
		}
	}
</script>