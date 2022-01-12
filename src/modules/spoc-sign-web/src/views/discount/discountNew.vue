<style lang="less">
.spoc_sign_discount_new{
	position: relative;
	.check-setting {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 99;
	}
}
.check-modal-class {
	.add-condition {
		margin-left: 696px;
	}
	.condition-table {
		margin-top: 10px;
		.ivu-table-cell {
			padding-left: 0;
			padding-right: 0;
			text-align: center;
		}
	}
}

   .spgzRuleSettingTable{
        @border: 1px solid #dddee1;
		@h: 36px;
		padding-right: 14px;
		.table-div {
            text-align: left;
			zoom: 1;
			&::before {
				content: "";
				clear: both;
				height: 0;
				font-size: 0;
				line-height: 0;
				display: table;
			}
		}
		.table-content {
			@selectHeight: 26px;
			margin-bottom: 30px;
			margin-top: 20px;
			border: @border;
			border-bottom: none;
			.ivu-select,
			.ivu-input-wrapper {
				height: @selectHeight;
			}
			.ivu-select-single .ivu-select-selection {
				height: @selectHeight;
			}
			.ivu-select-single .ivu-select-selection .ivu-select-placeholder,
			.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
				height: @selectHeight - 2px;
				line-height: @selectHeight - 2px;
			}
			.ivu-input {
				height: @selectHeight;
				text-align: right;
			}
		}
		.table-header {
			background: #f8f8f9;
			border-bottom: @border;
		}
		.table-header,
		.table-footer {
			ul {
				overflow: hidden;
				zoom: 1;
			}
		}
		.table-li {
			height: @h;
			line-height: @h;
            list-style: none;
            margin: 0 10px;
			float: left;
			text-align: center;
			&:nth-child(1) {
				width: 114px;
			}
			&:nth-child(2) {
				width: 100px;
			}
			&:nth-child(3) {
				width: 208px;
			}
			&:nth-child(4) {
				width: 86px;
			}
		}
		.table-item {
			border-bottom: @border;
		}
    }
</style>
<template>
	<div class="spoc_sign_discount_new">
		<div class="check-setting">
			<Button  style="margin-right:20px;" v-show="discountType == 'abroad'" type="primary" @click="zzdd">{{$t('modules_spoc_sign_web_src_views_discount_discountnew_6281')}}</Button>
			<Button  type="primary" @click="checkSetting">{{$t('core.approvalSet')}}</Button>
		</div>
		<Tabs v-model="discountType" @on-click="tabClick">
			<TabPane :label="item.name" :name="item.type" v-for="(item,index) in tabList"  :key="index"></TabPane>
		</Tabs>
		<div v-show="discountType == 'abroad'">
			<discount-tab :dataList="dataList" ref="liuxue"></discount-tab>
		</div>
		<div v-show="discountType == 'trainning'||discountType == 'other'||discountType == 'activity'">
			<discount-tab-other
				:current="discountType == 'trainning' ? '10' : discountType == 'other'? '16' : discountType == 'activity'? '21' : ''"
			></discount-tab-other>
		</div>
		<!-- 对话框 -->
		<Modal
            :title="$t('core.approvalSet')"
            v-model="checkModal"
            width=809
            class-name='check-modal-class'
        >
			<Button class="add-condition" type="primary" @click="addCondition">{{$t('modules_spoc_sign_web_src_views_discount_discountnew_6283')}}</Button>
			<div class="condition-table">
				<Table border :columns="columns" border :data="data.list" ></Table>
			</div>

			<div slot="footer">
				<Button @click="checkModal=false">{{$t('classroom_allscore_54')}}</Button>
               <!--  <Button type="primary"  @click="checkModalOk">{{$t('classroom_allscore_54')}}</Button> -->
			</div>
        </Modal>
		<Modal
            :title="$t('modules_spoc_sign_web_src_views_discount_discountnew_6285')"
            v-model="addModal"
            width=651
            class-name='add-modal-class'
			@on-ok="addModalOk"
        	@on-cancel="addModalOkCancel"
			:loading="addModalOkLoading"
        >
			<Form  :label-width="94" :model="policyObj" ref="formValidate" :rules="ruleValidate">
				<Row>
					<Col span="24">
						<FormItem :label="$t('modules_spoc_sign_web_src_views_discount_discountnew_6286')" prop="companys">
							<Select v-model="policyObj.companys" multiple style="width:511px;">
								<Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
								<!-- <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.remarks }}</Option> -->
							</Select>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="24">
						<div style="position: relative;">
							<FormItem :label="$t('modules_spoc_sign_web_src_views_discount_discountnew_6287')" prop="htAuditRuleItems" style="margin-bottom: 0">
							</FormItem>
							<Button type="primary" style="position: absolute;right: 14px;top: 0;" @click="newRule">{{$t('importPage_action3')}}</Button>
						</div>
					</Col>
				</Row>
				<!-- <Table :columns="columnsR" :data="tableObj.list" ></Table> -->
				<div class="spgzRuleSettingTable">
					<div class="table-div">
						<div class="table-content">
							<div class="table-header">
								<ul>
									<li class="table-li">{{$t('modules_spoc_sign_web_src_views_discount_discountnew_6289')}}</li>
									<li class="table-li">{{$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6165')}}</li>
									<li class="table-li">{{$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6166')}}</li>
									<li class="table-li">{{$t('classlist_compontents_detailinfo_45')}}</li>
								</ul>
							</div>
							<div class="table-footer">
								<div class="table-item" v-for="(item, index) in policyObj.htAuditRuleItems" :key="index">
									<ul>
										<li class="table-li">
											<InputNumber :min="0.01" :max="100" v-model="item.ratio" style="text-align: right;" size="small"/>%
										</li>
										<li class="table-li">
											<Select v-model="item.level">
												<Option v-for="item in ht_item_level" :value="item.value" :key="item.value">{{ item.label }}</Option>
											</Select>
										</li>
										<li class="table-li">
											<Select v-model="item.auditRoleId">
												<Option v-for="item in rolePersonList" :value="item.id" :key="item.id">{{ item.name }}</Option>
											</Select>
										</li>
										<li class="table-li" @click="deleteRuleChild(index)" style="color:#F5222D;cursor:pointer;">{{$t('classlist_compontents_detailinfo_46')}}</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Form>
        </Modal>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import discountTab from "./discountTab";
import discountTabOther from "./discountTabOther";
import valid, { errors, htPolicy, htRule, common, htAuditRulem, sysRole, sysDict } from '../../libs/request.js';

export default {
	data () {
		let _this = this
		const validatePass = (rule, value, callback) => {
			let flag = 0;
			console.log(_this.policyObj.htAuditRuleItems)
			if(!_this.policyObj.htAuditRuleItems.length){
				flag = 1
			} else {
				let checkObj = {}
				_this.policyObj.htAuditRuleItems.forEach(item =>{
					if(!item.ratio || !item.level || !item.auditRoleId){
						flag = 1
					}
					if(item.ratio){
						checkObj['a' + item.ratio] = this.$t('modules_spoc_sign_web_src_views_discount_discountnew_6294')
					}
				})
				if(flag != 1 && Object.keys(checkObj).length != _this.policyObj.htAuditRuleItems.length){
					flag = 2
				}
			}
			if (flag == 1) {
				callback(new Error(this.$t('modules_spoc_sign_web_src_views_discount_discountnew_6295')));
			} else if(flag == 2){
				callback(new Error(this.$t('modules_spoc_sign_web_src_views_discount_discountnew_6296')));
			} else {
				callback();
			}
		};
		return {
			htAuditRuleItems: [
				{
					ratio:'',
					level:'',
					auditRoleId:''
				},
			],
			value1: 1,
			options2: [],
			policyObj:{
				id:'',
				companys: [],
				htAuditRuleItems:[
					{
						ratio: null,
						level:'',
						auditRoleId:''
					},
				]
			},
			model1: '',
			loading2: false,
			model14: '',
			companyList: [],
			ruleValidate: {
                companys: [
					{ required: true, type: 'array', min: 1, message: this.$t('modules_spoc_sign_web_src_views_discount_discountnew_6297'), trigger: 'change' }
				],
				htAuditRuleItems: [
					{ required: true, validator: validatePass, trigger: 'blur' }
				]
            },
			tabList:[],
			addModal: false,
			addModalOkLoading: true,
			discountType: 'abroad',
			dataList:[],
			checkModal: false,
			data: {
				list: [
				],
			},
			columns: [
				{
					title:this.$t('courselist_compontents_detailinfo_160'),
					type: 'index',
					minWidth: 65,
					resizable: true,
					width: null,
					align: 'center'
				},
				{
					title:this.$t('views_approvalnotice_approvalset_index_300'),
					key:'levelName',
					align:'center',
					minWidth: 255,
					resizable: true,
					width: null,
					render: (h, params) => {
						return h('div', {
							style: {
								textAlign: 'left',
								padding: '8px 0',
								paddingLeft: '18px'
							}
						}, [params.row.offices.map(item => {
							return h('span',{
								style: {
									color: '#495060',
									display: 'inline-block',
									padding: '2px 0',
									marginBottom: '2px'
								}
							},[h("span",{
									style: {
										/* marginRight: '20px' */
									}
								},
								item.name /* + '、' */
								),
								
							// h("i",{
							// 		class: {
							// 			'icon-guanbi2': true,
							// 			'iconfont': true,
							// 		},
							// 	}),
							// <Icon type="ios-close-empty"></Icon>
							// h("Icon",{
							// 		props: {
							// 			type: "ios-close-empty",
							// 			size: 18
							// 		},
							// 		style: {
							// 			verticalAlign: 'middle'
							// 		}
							// 	}),
								
								]
							)
						})])
					}
				},
				{
					title:this.$t('modules_spoc_sign_web_src_views_discount_discountnew_6289'),
					key:'name',
					align:'center',
					minWidth:70,
					resizable: true,
					width: null,
					render: (h, params) => {
						return h('div', {
							style: {
								textAlign: 'left',
								padding: '8px 0'
							}
						}, [params.row.htAuditRuleItems.map((item, index) => {
							return h('div',{
								style: {
									color: '#495060',
									padding: '2px 0',
									textAlign: 'center',
									height: '23px',
									marginBottom: '2px',
									borderBottom: params.row.htAuditRuleItems.length-1 == index ? 'none' : '1px solid #e9eaec'
								}
							},[h("span",{
										style: {
										}
									},
									item.ratio + '%'
									),
								]
							)
						})])
					}
				},
				{
					title:this.$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6165'),
					key:'levelName',
					minWidth: 90,
					resizable: true,
					width: null,
					align:'center',
					render: (h, params) => {
						return h('div', {
							style: {
								textAlign: 'center',
								padding: '8px 0'
							}
						}, [params.row.htAuditRuleItems.map((item, index) => {
							return h('div',{
								style: {
									color: '#495060',
									padding: '2px 0',
									marginBottom: '2px',
									height: '23px',
									borderBottom: params.row.htAuditRuleItems.length-1 == index ? 'none' : '1px solid #e9eaec'
								}
							},[h("div",{
										style: {
										}
									},
									item.level + this.$t('modules_spoc_sign_web_src_views_discount_discountnew_6300')
									),
								]
							)
						})])
					}
				},
				{
					title:this.$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6166'),
					key:'levelName',
					align:'center',
					resizable: true,
					width: null,
					render: (h, params) => {
						return h('div', {
							style: {
								textAlign: 'center',
								padding: '8px 0',
							}
						}, [params.row.htAuditRuleItems.map((item, index) => {
							return h('div',{
								style: {
									color: '#495060',
									padding: '2px 0',
									marginBottom: '2px',
									height: '23px',
									borderBottom: params.row.htAuditRuleItems.length-1 == index ? 'none' : '1px solid #e9eaec'
								}
							},[h("div",{
										style: {
										}
									},
									item.auditRole
									),
								]
							)
						})])
					}
				},
				{
					title:this.$t('classlist_compontents_detailinfo_45'),
					key:'levelName',
					align:'center',
					minWidth: 103,
					resizable: true,
					width: null,
					render: (h, params) => {
						return h('span', [
							h('a',{
								on: {
									click: () => {
										this.formAuditRule(params.row.id)
									}
								}
							}, this.$t('classroom_allscore_51')),
							h('span',{
								style: {
									cursor: 'pointer',
									color: 'red',
									marginLeft: '10px'
								},
								on: {
									click: () => {
										this.$Modal.confirm({
											title: this.$t('classlist_classlist_12'),
											content: this.$t('modules_spoc_sign_web_src_views_discount_discountnew_6303'),
											onOk: () => {
												this.deleteRule(params.row.id)
											},
											onCancel: () => {
											}
										});
										
									}
								}
							}, this.$t('classlist_compontents_detailinfo_46')),
						])
					}
				},
			],
			rolePersonList:[],
			ht_item_level: []
		}
	},
	computed:{
	},
	components: {
		discountTab,
		discountTabOther
	},
	created(){
	},
	mounted(){
		this.getDfl(0)
		this.getRulePerson()
		this.getRuleLevel()
	},
	methods: {
		deleteRuleChild(index){
			this.policyObj.htAuditRuleItems.splice(index,1)
		},
		getRulePerson(){
			let obj = {
				menuId: 201
			}
			sysRole.listMenuRole(obj).then(valid.call(this)).then(res=>{
				if (res.ok) {
					this.rolePersonList = res.data.data.roleList
				}
			}).catch(errors.call(this));
		},
		getRuleLevel(){
			sysDict.batchListData({types:'ht_item_level'}).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.ht_item_level = res.data.data.ht_item_level;
				}
			}).catch(errors.call(this));
		},
		newRule() {
			this.policyObj.htAuditRuleItems.push({
				ratio: null,
				level:'',
				auditRoleId:''
			})
		},

		checkRulesDelete(val) {
			console.log(val)
		},

		tabClick(val) {
		},

		getRuleList() {
			let obj = {
				policyType:this.discountType
			}
			htAuditRule.ruleList(obj).then(valid.call(this)).then(res=>{
				if (res.ok) {
					this.data.list = res.data.data
				}
			}).catch(errors.call(this));
		},

		getDfl(parentId){
			let param = {
				parentId
			}
			htPolicy.list(param).then(valid.call(this)).then(res=>{
				if(res.ok){
					if(parentId == 0){
						this.tabList = res.data.data
						this.discountType = res.data.data[0].type
						this.getDfl(res.data.data[0].id)
					} else {
						let q = []
						let result = res.data.data
						result.forEach((item)=>{
							//if(item.name!='折扣优惠'){
								q.push(item)
							//}
						})
						this.dataList = q
						this.$refs.liuxue.doSelect(0)
					}
				}
			}).catch(errors.call(this));
		},

		checkSetting() {
			this.getRuleList()
			this.checkModal = true
		},

		checkModalOk() {

		},

		addCondition() {
			let obj = {
				policyType:this.discountType
			}
			htAuditRule.unSettingCompanyList(obj).then(valid.call(this)).then(res=>{
				if (res.ok) {
					this.companyList = res.data.data
					this.policyObj = {
						id:'',
						companys: [],
						htAuditRuleItems:[
							{
								ratio: null,
								level:'',
								auditRoleId:''
							},
						]
					}
					this.addModal = true
				}
			}).catch(errors.call(this));
		},
		addModalOkCancel(){
			this.addModal = false
		},
		addModalOk() {
			// console.log(this.policyObj.htAuditRuleItems)
			// console.log(this.policyObj.companys)
			let offices = []
			this.policyObj.companys.forEach(item =>{
				offices.push({
					id:item,
					name:  this.companyList.filter((item1)=>{
						return item1.id == item;
					})[0].name
				})
			})

			this.$refs.formValidate.validate((validRes) => {
                if (validRes) {
					let obj = {
						offices: offices,
						htAuditRuleItems: this.policyObj.htAuditRuleItems,
						policyType: this.discountType
					}
					if(this.policyObj.id){
						obj.id = this.policyObj.id
					}
					htAuditRule.saveAuditRule(obj).then(valid.call(this)).then(res=>{
						if (res.ok) {
							this.addModal = false
							this.getRuleList()
						} else {
							this.addModal = true
							this.addModalOkLoading = false 
							setTimeout(()=>{
								this.addModalOkLoading = true
							},0)
						}
					}).catch(errors.call(this));
                } else {
					this.addModal = true
					this.addModalOkLoading = false 
					setTimeout(()=>{
						this.addModalOkLoading = true
					},0)
                }
            })
		},
		formAuditRule(id) {
			htAuditRule.unSettingCompanyList({
				id: id,
				policyType:this.discountType
			}).then(valid.call(this)).then(res=>{
				if (res.ok) {
					this.companyList = res.data.data
					htAuditRule.formAuditRule({
						id: id
					}).then(valid.call(this)).then(res=>{
						if (res.ok) {
							this.policyObj.companys = res.data.data.officeIds.split(',')
							this.policyObj.htAuditRuleItems = res.data.data.htAuditRuleItems
							this.policyObj.id = res.data.data.id
							this.addModal = true
						}
					}).catch(errors.call(this));
				}
			}).catch(errors.call(this));
		},
		// 删除规则
		deleteRule(id) {
			let obj = {id}
			htAuditRule.deleteAuditRule(obj).then(valid.call(this)).then(res=>{
				if (res.ok) {
					this.$Message.info(res.data.message)
					this.getRuleList()
				}
			}).catch(errors.call(this));
		},

		zzdd(){
			this.$router.push({
				name:'sign.zzdd'
			})
		}
	}
}
</script>
