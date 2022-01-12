<style lang="less">

</style>

<template>
	<div>
		<div class="packsBox" v-for="(items,index) in data.policyData.list" :key="index">
			<Row type="flex">
				<Col span="8">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_modules_fund_5287')" :prop="'list.'+index+'.itemId'" :rules="{required: true, message: $t('modules_spoc_sign_web_src_views_contractgeneration_component_modules_plan_5321'), trigger: 'change'}">
					<Select v-model="items.itemId" @on-change="itemIdChange(items)">
						<Option v-for="item in data.htItemList" :value="item.id" :key="item.id">{{item.name}}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_modules_deposit_5282')">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" v-model="item.htItemSettingMap.TechCourse" v-if="item.id==items.itemId" disabled style="width:262px;"><span slot="append">{{$t('message_socket_305')}}</span></Input>
					</div>
					<div v-else>
						<Input disabled style="width:262px;"><span slot="append">{{$t('message_socket_305')}}</span></Input>
					</div>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_modules_plan_5324')">
					<div v-if="items.itemId">
						<Input style="width:80px;" v-for="item in data.htItemList" v-if="item.id==items.itemId" disabled  :key="item.id" v-model="item.htItemSettingMap.ServeLimit"></Input> — <Input style="width:122px;display: inline-table;" disabled v-for="item in data.htItemList" :key="'endMonth'+item.id" v-if="item.id==items.itemId"  v-model="item.htItemSettingMap.ServeLimitEnd"><span slot="append">{{$t('message_socket_302')}}</span></Input>
					</div>
					<div v-else>
						<Input style="width:80px;" disabled></Input> — <Input style="width:122px;display: inline-table;" disabled><span slot="append">{{$t('message_socket_302')}}</span></Input>
					</div>
				</FormItem>
				</Col>
			</Row>
			<Row type="flex">
				<Col span="8">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_modules_deposit_5284')">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" v-model="item.htItemSettingMap.MangageCourse" v-if="item.id==items.itemId" disabled style="width:262px;"><span slot="append">{{$t('message_socket_305')}}</span></Input>
					</div>
					<div v-else>
						<Input disabled style="width:262px;"><span slot="append">{{$t('message_socket_305')}}</span></Input>
					</div>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_modules_plan_5327')">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" v-model="item.htItemSettingMap.SimulateExplan" v-if="item.id==items.itemId" disabled style="width:262px;"><span slot="append">{{$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart5_3102')}}</span></Input>
					</div>
					<div v-else>
						<Input disabled style="width:262px;"><span slot="append">{{$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart5_3102')}}</span></Input>
					</div>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_modules_plan_5329')">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" v-model="item.htItemSettingMap.SummerCourse" v-if="item.id==items.itemId" disabled style="width:262px;"><span slot="append">{{$t('message_socket_305')}}</span></Input>
					</div>
					<div v-else>
						<Input disabled style="width:262px;"><span slot="append">{{$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart5_3102')}}</span></Input>
					</div>
				</FormItem>
				</Col>
			</Row>
			<Row type="flex">
				<Col span="8">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_modules_plan_5330')">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" v-model="item.htItemSettingMap.SignUp" v-if="item.id==items.itemId" disabled style="width:262px;"></Input>
					</div>
					<div v-else>
						<Input disabled style="width:262px;"></Input>
					</div>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_modules_plan_5331')">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" :value="Number(item.htItemSettingMap.BagPrice).toFixed(2)" v-if="item.id==items.itemId" disabled style="width:262px;"><span slot="append">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span></Input><!--BagPrice-->
					</div>
					<div v-else>
						<Input disabled style="width:262px;"><span slot="append">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span></Input>
					</div>
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
		<tpl10 :data="data" :info="info" :policy="data.policyData" ref="tp"></tpl10>
	</div>
</template>

<script>
	import tpl10 from './tpl10.vue';
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
			tpl10,
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
						o.publicPrice = Number(v.htItemSettingMap.BagPrice);
						o.ratio='100';
						this.ratioChange(o);
					}
				})
				this.$emit('on-change');
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
				o.ratioPrice=this.accMul(o.ratio,o.publicPrice)/100;
				let infoShare=this.infoPrice?(o.ratioPrice/this.infoPrice)*this.protocolExemptionPrice:0;
				o.share=(((o.ratioPrice/this.actualPrice*this.sharePrice)||0)+infoShare);
				o.costPrice = (Number(o.ratioPrice)-Number(o.share));
			}
		},
		watch: {
			'actualPrice': {
				handler: function(val, oldVal) {
					this.data.policyData.list.forEach(v=>{
						this.ratioChange(v);
					})
				},
				deep: true
			},
			'sharePrice': {
				handler: function(val, oldVal) {
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