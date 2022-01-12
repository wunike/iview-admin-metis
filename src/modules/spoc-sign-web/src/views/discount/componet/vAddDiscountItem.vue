<style lang="less">
	.v_sign_discount_add_item {
		@border: 1px solid #dddee1;
		@h: 36px;
		padding-right: 32px;
		.ivu-form-item.last {
			margin-bottom: 0;
		}
		.add-btn {
			float: right;
		}
		.table-div {
			padding-left: 50px;
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
				width: 90%;
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
			float: left;
			padding-left:20px;
			&:nth-child(1) {
				width: 28%;
			}
			&:nth-child(2) {
				width: 22%;
			}
			&:nth-child(3) {
				width: 22%;
			}
			&:nth-child(4) {
				width: 22%;
			}
			&:nth-child(5) {
				width: 22%;
			}
		}
		.table-item {
			border-bottom: @border;
		}
		.ivu-form .ivu-form-item-label{
			color: #b8b8b8;
		}
	}
</style>
<template>
	<div class="v_sign_discount_add_item">
		<Form ref="disform" :label-width="135" :model="formData" :rules="rule">
			<FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6158')" prop="name">
				<Input v-model="formData.name" :maxlength="35" style="width:500px;"/><span style="margin-left:8px;color:red;">{{formData.name ? formData.name.length : 0}}/35</span>
			</FormItem>

			<Row type="flex">
				<Col span="12">
			<!-- 	<FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6159')" prop="type">
					<Select v-model="formData.type">
						<Option v-for="item in dictData.ht_item_type" :key="item.id" :value="item.value">{{item.label}}</Option>
					</Select>
				</FormItem> -->
				</Col>
				<Col span="6" v-if="formData.type=='discount'">
				<FormItem :label-width="20" prop="ratio">
					<Input :placeholder="$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6160')" v-model="ratio">
					<span style="lin-height:normal" slot="append">%</span>
					</Input>
				</FormItem>
				</Col>
				<Col span="6" v-if="formData.type=='gift'">
				<FormItem :label-width="20" prop="giftCount">
					<Input :placeholder="$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6161')" v-model="formData.giftCount" />
				</FormItem>
				</Col>
			</Row>

			<Row type="flex" v-if="['gift','increase'].indexOf(formData.type)>=0">
				<Col span="12">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6162')" prop="publicPrice">
					<Input style="width:198px" v-model="formData.publicPrice" />
				</FormItem>
				</Col>
				<Col span="12">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6163')" prop="costPrice">
					<Input style="width:198px" v-model="formData.costPrice" />
				</FormItem>
				</Col>
			</Row>
			<FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6164')">
				<Input v-model="formData.itemDesc" type="textarea" />
			</FormItem>
			<Row type="flex" v-if="false">
				<Col span="12">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6165')">
					<Select v-model="formData.level">
						<Option v-for="item in dictData.ht_item_level" :key="item.id" :value="item.value">{{item.label}}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="12">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6166')">
					<Select v-model="formData.auditor">
						<Option v-for="item in approverList" :key="item.id" :value="item.id">{{item.name}}</Option>
					</Select>
				</FormItem>
				</Col>
			</Row>
			<Row type="flex" v-if="false">
				<Col span="12">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6167')" prop="lowestPrice">
					<Input style="width:198px" v-model="formData.lowestPrice"></Input>
				</FormItem>
				</Col>
				<Col span="12">
				<Row type="flex">
					<Col span="16">
					<FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6168')">
						<RadioGroup v-model="formData.isLimitCount">
							<Radio label="1">{{$t('modules_leftremenu_92')}}</Radio>
							<Radio label="0">{{$t('modules_leftremenu_93')}}</Radio>
						</RadioGroup>
					</FormItem>
					</Col>
					<Col span="8" v-if="formData.isLimitCount=='1'">
					<Input :placeholder="$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6171')" v-model="formData.count" />
					</Col>
				</Row>
				</Col>
			</Row>
			<FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6172')" v-if="false">
				<Input v-model="formData.productDesc" />
			</FormItem>
			<FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6173')" v-if="false">
				<RadioGroup v-model="formData.isMetux">
					<Radio label="1">{{$t('modules_leftremenu_92')}}</Radio>
					<Radio label="0">{{$t('modules_leftremenu_93')}}</Radio>
				</RadioGroup>
				<CheckboxGroup v-if="formData.isMetux=='1'" v-model="formData.metuxPolicies" class="margin-left:140px">
					<Checkbox v-for="item in htPolicyList" :label="item.id" :key="item.name+item.id">{{item.name}}</Checkbox>
				</CheckboxGroup>
			</FormItem>

			<!-- <FormItem label="" :label-width="0"> -->
			<!--<Button type="primary" class="add-btn" @click="addPolicy">{{$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6174')}}</Button>-->
			<div class="table-div">
				<div class="table-content">
					<div class="table-header">
						<ul>
							<li class="table-li">{{$t('views_coursepack_coursepack_384')}}</li>
							<li class="table-li" style="text-align:right;padding-right:10px;">{{$t('views_coursepack_coursepack_379')}}</li>
							<li class="table-li" style="text-align:right;padding-right:10px;">{{$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6177')}}</li>
							<li class="table-li" style="text-align:right;padding-right:10px;">{{$t('views_coursepack_coursepackgroup_453')}}</li>
							<!--<li class="table-li">{{$t('classlist_compontents_detailinfo_45')}}</li>-->
						</ul>
					</div>
					<div class="table-footer">
						<div class="table-item" v-for="(item, index) in formData.htItemSubList" :key="item.name + index">
							<ul>
								<li class="table-li">
									<!--<Select v-model="item.name" v-if="item.tableEdit" :disabled="true">
										<Option v-for="item in xqLists" :key="item.name + item.name" :value="item.name" :disabled="isSelected(item.name)">{{ item.name }}</Option>
									</Select>-->
									<span>{{ item.name }}</span>
								</li>
								<li class="table-li">
									<Input v-model="item.num" :number="true" v-if="item.tableEdit" />
									<span v-else>{{ item.num }}</span>
								</li>
								<li class="table-li" style="text-align:right;padding-right:20px;">
									<div class="div-input" v-if="item.tableEdit" v-text=" item.publicPrice!=0&&item.num!=0?Number(item.publicPrice/item.num).toFixed(2): 0 "></div>
									<!--<Input v-model="item.costPrice" v-if="item.tableEdit"/>-->
									<span v-else v-text=" item.publicPrice!=0&&item.num!=0? Number(item.publicPrice/item.num).toFixed(2): 0 "></span>
								</li>
								<li class="table-li">
									<Input v-model="item.publicPrice" :number="true" v-if="item.tableEdit" />
									<!--<div class="div-input" v-if="item.tableEdit" v-text=" Number(item.costPrice * item.num).toFixed(2) "></div>-->
									<span v-else v-text=" Number(item.publicPrice).toFixed(2) "></span>
								</li>
								<!--<li class="table-li">
									<a @click="saveTable(item)" v-if="item.tableEdit">{{$t('courselist_compontents_servicecontent_215')}}</a>
									<a @click="editTable(item)" v-else>{{$t('classroom_allscore_51')}}</a>
									<a @click="delTable(item, index)">{{$t('classlist_compontents_detailinfo_46')}}</a>
								</li>-->
							</ul>
						</div>
						<div class="table-item" v-if="addNewBoo">
							<ul>
								<li class="table-li">
									<Select v-model="newObj.name">
										<Option v-for="item in xqLists" :key="item.name + item.name" :value="item.name" :disabled="isSelected(item.name)">{{ item.name }}</Option>
									</Select>
								</li>
								<li class="table-li">
									<Input v-model="newObj.num" />
								</li>
								<li class="table-li">
									<div class="div-input">{{ newObj.publicPrice / newObj.num }}</div>
								</li>
								<li class="table-li">
									<Input v-model="newObj.publicPrice" />
								</li>
								<li class="table-li">
									<a @click="saveAddTable()">{{$t('courselist_compontents_servicecontent_215')}}</a>
									<a @click="delAddTable()">{{$t('classlist_compontents_detailinfo_46')}}</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<!-- </FormItem> -->

			<!-- <Row type="flex">
				<Col span="12">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6183')" prop="protocalType">
					<Select v-model="formData.protocalType" @on-change="onTplChange">
						<Option v-for="(item,i) in currTpls" :key="item.name+item.id" :value="i">{{item.name}}</Option>
					</Select>
				</FormItem>
				</Col>
			</Row>
			<FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6184')" class="last">
				<editor v-model="formData.protocal"></editor>
			</FormItem> -->
		</Form>
	</div>
</template>
<script>
	import { tpls } from './tpls.js';
	import editor from '../../../modules/editor/editor.vue'

	export default {
		props: {
			activeItem: {
				type: Object,
				required: true,
			},
			htPolicyList: {
				type: Array,
				required: true,
			},
			dictData: {
				type: Object,
				required: true,
			},
			approverList: {
				type: Array,
				required: true,
			},
			data: {
				type: Object,
				required: true
			},
			xqLists: {
				type: Array,
				required: true,
			}
		},

		data() {
			const $this = this;
			const req = [{
				pattern: /^[1-9]\d{0,9}?$/,
				message: this.$t('modules_spoc_crm_web_src_views_performanceplan_modal_1488')
			}];
			const req2 = [{
				validator(rule, value, callback, source, options) {
					$this.$nextTick(() => {
						const val = $this.ratio;
						if(/^[1-9]\d{0,2}$/.test(val)) {
							const v = parseInt(val);
							if(v > 0 && v <= 100) {
								callback([]);
							} else {
								callback([new Error(this.$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6186'))]);
							}
						} else {
							callback([new Error(this.$t('modules_spoc_crm_web_src_views_performanceplan_modal_1488'))]);
						}
					})
				}
			}];
			return {
				tpls: tpls(),
				formData: JSON.parse(JSON.stringify(this.data)),
				ratio: this.data.ratio * 100,
				rule: {
					name: [{
						required: true,
						message: this.$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6187'),
						trigger: 'blur'
					}],
				/* 	type: [{
						required: true,
						message: '优惠类型必选',
						trigger: 'change'
					}], */
					protocalType: [
						// {required: true, message: '模板类型必选', trigger: 'change'}
					],
					ratio: req2,
					giftCount: req,
					publicPrice: req,
					costPrice: req,
					lowestPrice: req,
				},
				addNewBoo: false,
				newObj: {
					subId: '',
					name: '',
					type: 'sys_office',
					num: '',
					costPrice: '',
					publicPrice: '',
					sort: '',
					tableEdit: false,
				},
				newObj2: {}
			}
		},
		computed: {
			hasMany() {
				const c = this.tpls[this.activeItem.id];
				if(c) {
					return c.length > 1;
				}
			},
			currTpls() {
				const c = this.tpls[this.activeItem.id];
				if(c) {
					return c;
				}
				return [];
			},
		},
		components: {
			editor
		},
		created() {
			this.newObj2 = JSON.parse(JSON.stringify(this.newObj));
		},
		mounted(){
		},
		methods: {
			onTplChange(index) {
				if(this.currTpls[index]) {
					this.formData.protocal = this.currTpls[index].tpl;
				}
			},
			reset() {
				// this.formData = this.data;
				this.formData = JSON.parse(JSON.stringify(this.data));
				this.ratio = this.data.ratio * 100;
			},
			addPolicy() {
				// 添加
				this.addNewBoo = true;
			},
			saveAddTable() {
				this.formData.htItemSubList.push(this.newObj);
				this.$emit('saveTable', this.formData);
				this.delAddTable();
			},
			resetAddTable() {
				this.addNewBoo = false;
				this.newObj = JSON.parse(JSON.stringify(this.newObj2));
			},
			delAddTable() {
				this.resetAddTable();
			},
			saveTable(item) {
				item.tableEdit = false;
				this.$emit('saveTable', this.formData);
			},
			editTable(item) {
				item.tableEdit = true;
			},
			delTable(item, index) {
				this.formData.htItemSubList.splice(index, 1);
			},
			isSelected(val) {
				return this.formData.htItemSubList.some(item => {
					return item.name == val
				});
			}
		},
		watch: {
			data(val) {
				// this.formData = val;
				let res = JSON.parse(JSON.stringify(val));
				res.htItemSubList.forEach(item => {
					item.publicPrice = Number(item.publicPrice) ? Number(item.publicPrice).toFixed(2): 0
				});
				this.formData = res
				this.ratio = val.ratio * 100;
			},
			ratio(val) {
				this.$nextTick(() => {
					this.formData.ratio = parseFloat(val / 100);
				});
			}
		}
	}
</script>