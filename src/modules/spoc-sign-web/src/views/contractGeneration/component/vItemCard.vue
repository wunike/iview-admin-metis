<style lang="less">
	.sign_contract_generation_item_card {
		background: #FFFFFF;
		.content {
			position: relative;
			margin-bottom: 16px;
			.title {
				font-size: 18px;
				padding: 0 16px 10px;
				/*box-shadow: 0 2px 0px 0px #dddee1;*/
				border-bottom: 1px #dddee1 solid;
				.btnCol {
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}
				.tooltip {
					display: inline-block;
					.tooltip_content {
						div:nth-of-type(1) {
							color: #f7ab01;
						}
					}
				}
				.ivu-tooltip-inner {
					white-space: normal;
				}
				.icon-info {
					color: #f7ab01;
				}
				.close {
					position: absolute;
					right: 14px;
					top: 2px;
					font-size: 26px;
					color: #888;
					cursor: pointer;
					&:hover {
						color: #111;
					}
				}
			}
			.bagBox {
				max-height: 600px;
				min-height: 130px;
				overflow-y: auto;
				.combination-course {
					background: #fff;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					padding-bottom: 12px;
					.combination-title {
						font-size: 14px;
						font-weight: normal;
						color: rgba(73, 80, 96, 1);
						line-height: 21px;
					}
					.kcb_wrap {
						display: flex;
						justify-content: space-around;
						align-items: center;
						div {
							padding: 0 8px;
							&.KcbMoney {
								flex: 1;
							}
						}
					}
					.course_table {
						padding-bottom: 18px;
						.bag_table {
							padding-top: 8px;
							.ivu-table:before {
								display: none;
							}
						}
					}
				}
				.tags_box {
					width: 262px;
					min-height: 32px;
					padding: 0px 7px;
					font-size: 12px;
					border: 1px solid #dddee1;
					border-radius: 4px;
					cursor: pointer;
					background: #FFFFFF;
					.Row {
						.ivu-dropdown .ivu-select-dropdown {
							width: 259px;
							left: -242px !important;
							max-height: 157px;
							overflow-y: auto;
						}
						.arrow {}
                        .ivu-tag .ivu-icon-ios-close{
                            color: #FFFFFF;
                            font-weight: bold;
                        }
					}
				}
				.tags_box2 {
					width: 262px;
					min-height: 32px;
					padding: 0px 7px;
					font-size: 12px;
					border: 1px solid #dddee1;
					border-radius: 4px;
					cursor: pointer;
					background: #f3f3f3;
				}
				.ivu-tag {
					background: #44bcb7;
					.ivu-tag-text,
					.ivu-icon-ios-close-empty {
						color: #FFFFFF;
					}
				}
			}
			.preferentialBox {
				border-top: 1px #dddee1 solid;
				padding-top: 24px;
				z-index: 10;
			}
		}
	}

	.card_dropdown {
        max-height: 200px !important;
	}
</style>
<template>
	<Card class="sign_contract_generation_item_card" :bordered="false" dis-hover :class="{other:data.id==12}" @click="tags_boxHide">
		<p slot="title">{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5447')}}</p>
		<div class="content" v-if="data.policyData">
			<div class="bagBox" @click="tags_boxHide">
				<Form :label-width="100" :rules="rules" :model="data.policyData" ref="f">
					<div v-if="data.id==9">
						<div class="combination-course">
							<div class="combination-title">{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5448')}}</div>
							<Select v-model="kcbId" ref="kcbSel" clearable prefix="ios-search" filterable :placeholder="$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5449')" style="width:240px;margin-right:16px;" remote @on-query-change="kcbRemote" @on-change="addBag">
								<Option v-for="item in kcbOptions" :value="item.id" :key="item.id" :label="item.name" v-if="item.htItemSubList.length">
									<div class="kcb_wrap">
										<div>{{ item.name }}</div>
										<div class="KcbMoney">{{getKcbInfo(item)}}</div>
										<div>{{ item.gradeLabel }}</div>
										<div>
											<Button type="primary">{{$t('spoc_hootie_web_282')}}</Button>
										</div>
									</div>
								</Option>
							</Select>
							<Poptip placement="bottom" width="550" @on-popper-hide="courseTableHide">
								<Button>{{$t('core.coursePackGroup')}}</Button>
								<div class="course_table" slot="content">
									<!--组合课程包搜索-->
									<div class="combination-course-table">
										<div class="course-search">
											<Select v-model="gradeId" ref="gradeSel" clearable style="width:140px;margin-right: 10px;">
												<Option v-for="item in gradeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
											</Select>
											<Input v-model="packageCoursesName" :placeholder="$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5452')" style="width:224px;margin-right: 24px;" />
											<Button type="primary" @click="courseSearch">{{$t('message_addressbook_267')}}</Button>
										</div>
										<Table border height="211" :columns="courseTableCol" :data="courseTableData" class="bag_table"></Table>
									</div>
								</div>
							</Poptip>
						</div>
						<Table border :columns="packageColumns" :data="data.policyData.list">
							<template slot-scope="{ row, index }" slot="name">
								<span>{{ getPackageName(row)}}</span>
							</template>
							<template slot-scope="{ row, index }" slot="payCount">
								<InputNumber :active-change="false" :min="0" v-model="row.payCount" @on-change="numChange(row,$event,index)"></InputNumber>
							</template>
							<template slot-scope="{ row, index }" slot="htCostPrice">
								<InputNumber :active-change="false" :min="0" disabled v-model="row.publicUnitPrice" :formatter="value => `￥ ${number_format(value, 2, '.', ',')}`" :parser="value => value.replace(/￥s?|(,*)/g, '')" @on-change="htPriceChange(row,$event,index)"></InputNumber>
							</template>
							<template slot-scope="{ row, index }" slot="publicPrice">
								<InputNumber :active-change="false" :min="0" disabled v-model="row.publicPrice" :formatter="value => `￥ ${number_format(value, 2, '.', ',')}`" :parser="value => value.replace(/￥s?|(,*)/g, '')" @on-change="publicPriceChange(row,$event,index)"></InputNumber>
							</template>
							<template slot-scope="{ row, index }" slot="leaveNum">
								<Input v-model="row.leaveNum" @on-change="leaveNumChange(row,$event,index)"></Input>
							</template>
							<template slot-scope="{ row, index }" slot="discounts">
								<div class="tags_box" @click.stop="tags_boxShow(row,index)" v-if="!row.parentItemId">
									<Row type="flex" class="Row" align="middle">
										<Col span="23">
										<Tag v-for="(item,ind) in row.jsonData.policyList" :key="index+'typeList'+ind" closable @on-close="closeTag(row.policyIds,item.id,ind,row,index)">
											<Poptip v-model="row.popVisible" placement="right" transfer width="220" v-if="item.type=='relief'" @on-popper-hide="popperHide(row,index)">
												<span>{{item.name}}
                                        <span v-if="item.type=='relief'">{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5454', [row.jsonData.exemptionPrice||0])}}</span></span>
												<div class="api" slot="content">
													<InputNumber :ref="'exemptionPrice'+index" :active-change="false" :min="0" :v-model="0" :placeholder="$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5455')" style="width: 100px;"></InputNumber>
													<Button type="primary" @click="exemptionPriceOk('exemptionPrice'+index,row,index)" style="margin-left: 12px;">{{$t('classroom_allscore_54')}}</Button>
												</div>
											</Poptip>
											<span v-else>{{item.name}}</span>
										</Tag>
										<input v-model="zkyhSearch" @blur="blurBoxShow(index)" style="width:235px;display:inline-block;border: none;height: 31px;"></input>
										</Col>
										<Col span="1">
										<Dropdown  transfer-class-name="card_dropdown" transfer stop-propagation trigger="custom" :visible="row.visible" placement="bottom-end" @on-click="policyChange(row.policyIds,row,$event,index)" :key="'Dropdown'+index">
											<a href="javascript:void(0)" @click.stop="tags_boxShow(row,index)" class="arrow">
												<Icon type="md-arrow-dropdown" v-show="!row.visible" color="#80848f" size="14"></Icon>
												<Icon type="md-arrow-dropup" v-show="row.visible" color="#80848f" size="14"></Icon>
											</a>
											<DropdownMenu slot="list" v-if="policyItemList(row.itemId).length" style="width: 252px;">
												<DropdownItem v-for="(item,ind) in policyItemList(row.itemId)" v-show="item.name.indexOf(zkyhSearch) >= 0" :name="item.id" :key="item.id+'|'+index" :selected="row.policyIds.indexOf(item.id)!=-1&&item.type!='discount'" :disabled="(row.policyIds.indexOf(item.id)!=-1&&item.type!='discount')?false:(row.jsonData.policyList.find(oitem=>oitem.type==item.type)&&item.type!='discount'&&row.policyIds.indexOf(item.id)==-1)||row.policyIds.length>=3">{{item.name}}
												</DropdownItem>
											</DropdownMenu>
											<DropdownMenu slot="list" v-else>
												<DropdownItem>{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5457', [暂无数据])}}</DropdownItem>
											</DropdownMenu>
										</Dropdown>
										</Col>
									</Row>
								</div>
								<div class="tags_box2" v-else>
									<Row type="flex" class="Row" align="middle">
										<Col span="23">
										<Tag>{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5458', [(row.publicPrice-row.discountsPaidUp).toFixed(2)])}}</Tag>
										</Col>
										<Col span="1">
										<Icon type="arrow-down-b" color="#80848f" size="14"></Icon>
										</Col>
									</Row>
								</div>
							</template>
							<template slot-scope="{ row, index }" slot="costUnitPrice">
								{{number_format(row.costPrice/row.payCount, 2, '.', ',')}}
							</template>
							<template slot-scope="{ row, index }" slot="costPrice">
								{{number_format(row.costPrice, 2, '.', ',')}}
							</template>
							<template slot-scope="{ row, index }" slot="share">
								{{number_format(row.publicPrice-row.costPrice, 2, '.', ',')}}
							</template>
							<template slot-scope="{ row, index }" slot="action">
								<span @click="remBag(row, index)">
                                    <CommonIcon type="_shanchu" :size="14" :style="{ marginTop: '0px', display: 'inline-block', verticalAlign: 'middle',cursor:'pointer' }" />
                                </span>
							</template>
						</Table>
					</div>
					<div class="preferentialBox" v-else>
						<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5459')" prop="preferential " class="sale">
							<Select filterable v-model="data.policyData.preferential" multiple @on-change="preferential">
								<!--<Option v-for="item in data.htItemList" :value="item.id" :key="item.id">{{item.htItemSubList[0].costPrice}}</Option>-->
								<Option :value="item.id" v-for="(item,index) in data.htItemList" :key="item.id">{{item.name}}</Option>
							</Select>
						</FormItem>
					</div>
				</Form>
				<slot name="content"></slot>
			</div>
		</div>
		<!-- <modelbag ref="modelBag" @BagOk="BagOk" :bagList="bagList"></modelbag> -->
	</Card>
</template>
<script>
	import tpl1 from './tpl1.vue';
	import tpl2 from './tpl2.vue';
	import tpl3 from './tpl3.vue';
	import tpl4 from './tpl4.vue';
	import tpl5 from './tpl5.vue';
	import tpl6 from './tpl6.vue';
	import tpl7 from './tpl7.vue';
	import tpl8 from './tpl8.vue';
	import tpl9 from './tpl9.vue';
	import modelbag from './modelBag.vue';
	import CommonIcon from '_c/common-icon';
	import valid, {
		errors,
		htContract,
		common,
		htChangeApply,
		sysDict,
        sysConfig
	} from '../../../libs/request';
	const othersId = -100;
	export default {
		name: 'vItemCard',
		props: {
			data: {
				type: Object,
				required: true,
			},
			info: { // 主合同信息
				type: Object,
				required: true,
			},
			bagList: {
				type: Array,
				default: ()=>{
					return []
				},
			},
			discountsList: {
				type: Object,
				default: ()=>{
					return []
				},
			},
			apportion: {
				type: [String, Number],
				default: 0,
			},
		},
		data() {
			return {
                divisor:40,
				kcbId: '',
				kcbOptions: [],
				zkyhSearch: '',
				rules: {
					// itemId: [{
					// 	required: true,
					// 	message: "此为必选项"
					// }],
					//					protocal: [{
					//						required: true,
					//						message: "此为必选项"
					//					}]，
					// preferential: [{
					// 	required: true,
					// 	message: "此为必选项"
					// }]
				},
				discountsPaidSum: '',
				courseTableCol: [{
						title: this.$t('views_coursepack_bigtableexample_319'),
						align: 'center',
						key: 'name',
						resizable: true,
						width: null,
					},
					{
						title: this.$t('views_coursepack_coursepackgroup_465'),
						align: 'center',
						resizable: true,
						width: null,
						render: (h, params) => {
							return h('div', {}, params.row.htItemList.map(item => item.name).join(','))
						}
					},
					{
						title: this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_modelbag_5261'),
						align: 'center',
						resizable: true,
						width: null,
						render: (h, params) => {
							return h('div', {}, params.row.htItemSubList.find(item => item.type == 'sys_office').publicPrice)
						}
					},
					{
						title: this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_modelbag_5262'),
						align: 'center',
						resizable: true,
						width: null,
						render: (h, params) => {
							return h('div', {}, params.row.htItemSubList.find(item => item.type == 'sys_office').discountAmount)
						}
					},
					{
						title: this.$t('classlist_compontents_detailinfo_45'),
						align: 'center',
						resizable: true,
						width: null,
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'primary',
									size: 'small'
								},
								style: {

								},
								on: {
									click: () => {
										this.BagOk(params.row, this.bagList.find(item => item.id == 10).protocal);
									}
								}
							}, this.$t('classroom_allscore_52'))
						}
					},
				],
				courseTableData: [],
				packageCoursesName: '',
				gradeId: '',
				gradeList: [],
				packageColumns: [{
						title: this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5466'),
						slot: 'name',
						minWidth: 18,
						resizable: true,
						width: null,
					}, {
						title: this.$t('views_coursepack_coursepack_379'),
						slot: 'payCount',
						resizable: true,
						width: null,
					}, {
						title: this.$t('views_coursepack_coursepack_380'),
						slot: 'htCostPrice',
						minWidth: 40,
						resizable: true,
						width: null,
					}, {
						title: this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5469'),
						slot: 'publicPrice',
						minWidth: 40,
						resizable: true,
						width: null,
					}, {
						title: this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5470'),
						slot: 'leaveNum',
						resizable: true,
						width: null,
					}, {
						title: this.$t('modules_spoc_sign_web_src_views_category_category_5151'),
						slot: 'discounts',
						minWidth: 190,
						resizable: true,
						width: null,
					}, {
						title: this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5472'),
						slot: 'costUnitPrice',
						resizable: true,
						width: null,
					}, {
						title: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5010'),
						slot: 'costPrice',
						resizable: true,
						width: null,
					}, {
						title: this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5474'),
						slot: 'share',
						resizable: true,
						width: null,
					},
					{
						title: this.$t('classlist_compontents_detailinfo_45'),
						slot: 'action',
						resizable: true,
						width: null,
					}
				],
			};
		},
		computed: {
			kcbList() {
				return this.data.htItemList;
			},
		},
		components: {
			tpl1,
			tpl2,
			tpl3,
			tpl4,
			tpl5,
			tpl6,
			tpl7,
			tpl8,
			tpl9,
			modelbag,
			CommonIcon
		},
		created() {
			console.log(this.data)
			if(this.data.htItemList) {
				this.data.htItemList.forEach(item => {
					item.htItemSubList.forEach(items => {
						items.costPrice = String(Number(items.costPrice));
						items.publicPrice = String(Number(items.publicPrice));
					})
				})
			}
			if(this.data.id == 12) {
				this.data.policyData.preferential = [];
			}
			this.data.policyData.list.forEach(items => {
				if(this.data.id == 12) {
					this.data.policyData.preferential.push(items.itemId);
				}
				items.visible = false;
				items.popVisible = false;
				items.share = 0;
				items.realityPrice = items.publicPrice || 0;
				items.typeList = [];
				items.policyIds = items.policyIds ? items.policyIds : [];
				items.policyIds.forEach(v => {
					let discount = this.policyItemList(items.itemId).find(item => item.id == v);
					discount = Object.assign({}, discount);
					discount = JSON.parse(JSON.stringify(discount));
					items.typeList.push(discount);
				})
			})
			if(this.data.id == 9) {
				this.data.policyData.list.forEach(items => {
					if(items.parentItemId) {
						let parentItem = this.bagList.find(item => item.id == 10).htItemList.find(val => val.id == items.parentItemId);
						let childrenItem = parentItem.htItemList.find(val => val.id == items.itemId);
						let rate = parentItem.htItemSubList[0].publicPrice / parentItem.htItemSubList[0].groupPrice;
						items.discountsPaidUp = String(childrenItem.htItemSubList[0].costPrice * rate * childrenItem.htItemSubList[0].num);
						items.costPrice = String(childrenItem.htItemSubList[0].costPrice * rate * childrenItem.htItemSubList[0].num);
					} else {
						this.concessions(items);
					}

                    items.publicUnitPrice = items.publicPrice / items.payCount;
				})
				this.upDatePrice()
				this.findChildDictByParentDict();
			}
		},
		mounted() {
            this.getConfig();
			this.$nextTick(() => {
				this.kcbOptions = this.kcbList;
				this.courseTableData = this.bagList.find(item => item.id == 10).htItemList;
			})
		},
		methods: {
            getConfig(){
                let params={
                    menuId:'5001',
                    configId:'ct:leaveConfig',
                }
                sysConfig
                .getConfig(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.divisor=res.data.data.num||0;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                });
            },
			findChildDictByParentDict() {
				let params = {
					type: 'jw_course_type'
				};
				sysDict
					.findChildDictByParentDict(params)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.gradeList = res.data.data;
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			blurBoxShow(index) {
				this.data.policyData.list[index].visible = false;
			},
			policyItemList(id) {
				if(id) {
					return this.data.htItemList.find(v => v.htItemSubList[0].itemId == id) ? this.data.htItemList.find(v => v.htItemSubList[0].itemId == id).policyItemList : [];
				} else {
					return [];
				}
			},
			numChange(o, e, indexs) {
                console.log(o)
				o.payCount = e;
				let costUnitPrice = this.data.htItemList.find(v => v.id == o.itemId).htItemSubList[0].costPrice;
				o.publicPrice = this.accMul(o.payCount, o.publicUnitPrice || costUnitPrice);
				this.$set(this.data.policyData.list, indexs, o)
				this.setLeaveNum(o);
				this.concessions(o);
			},
			htPriceChange(o, e, indexs) {
				o.publicUnitPrice = e;
				let costUnitPrice = this.data.htItemList.find(v => v.id == o.itemId).htItemSubList[0].costPrice;
				o.publicPrice = this.accMul(o.payCount, o.publicUnitPrice || costUnitPrice);
				this.$set(this.data.policyData.list, indexs, o)
				this.setLeaveNum(o);
				this.concessions(o);
			},
			publicPriceChange(o, e, indexs) {
				o.publicPrice = e;
				o.publicUnitPrice = o.publicPrice / o.payCount;
				this.$set(this.data.policyData.list, indexs, o)
				this.setLeaveNum(o);
				this.concessions(o);
			},
            leaveNumChange(o, e, indexs) {
				this.$set(this.data.policyData.list, indexs, o)
			},
			setLeaveNum(o) {
				//				this.data.policyData.list.forEach(item => {
				o.leaveNum = parseInt(o.payCount / this.divisor);
				o.discountsPaidUp = String(o.publicPrice);
				//				})
				this.costPriceChange(o);
				this.upDatePrice();
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
			addBag(val) {
				if(!val) {
					return;
				}
				let obj = {
					policyType: 'kcb',
					policyName: this.$t('core.coursePack'),
					itemId: '',
                    itemName:'',
                    promotionAverage:'',
					jsonData: {
                        exemptionPrice: '',
                        policyList:[],
                    },
					costPrice: '',
					discountsPaidUp: '',
					publicPrice: '',
					policyIds: [],
					visible: false,
					popVisible: false,
					payCount: '',
					typeList: [],
					realityPrice: '',
					leaveNum: '',
					protocal: '',
					parentItemId: '',
					parentItemSubId: '',
					costUnitPrice: '',
					publicUnitPrice: '',
					grade:''
				}
				this.data.htItemList.forEach(v => {
					if(v.id == val) {
						obj.itemId = val;
						obj.payCount = v.htItemSubList[0].num;
						obj.publicPrice = v.htItemSubList[0].publicPrice;
						obj.publicUnitPrice = v.htItemSubList[0].costPrice;
						obj.costUnitPrice = v.htItemSubList[0].costPrice;
						obj.grade = v.gradeVal;
					}
				})
				this.data.policyData.list.push(obj);
				this.$emit('on-change');
				let length = this.data.policyData.list.length;
				this.setLeaveNum(this.data.policyData.list[length - 1]);
				this.$nextTick(() => {
					this.kcbId = '';
					this.$refs.kcbSel.clearSingleSelect();
				})
			},
			groupBag() {
				this.$refs.modelBag.modelShow();
			},
			remBag(row, ind) {
				if(row.parentItemId) {
					this.data.policyData.list = this.data.policyData.list.filter(item => {
						return item.parentItemId != row.parentItemId;
					})
				} else {
					this.data.policyData.list.splice(ind, 1);
				}
			},
			// remGroupBag(id) {
			// 	this.data.policyData.list = this.data.policyData.list.filter(item => {
			// 		return item.parentItemId != id;
			// 	})
			// },
			onChange() {
				this.$emit('on-change');
			},
			close() {
				this.$emit('on-close', this.data)
			},
			chooseData() {
				if(this.data.id === othersId) {
					return {
						itemId: othersId,
						protocal: this.data.policyData.protocal,
					}
				}
				let arr = [];
				this.data.policyData.list.forEach(item => {
					this.data.htItemList.forEach(items => {
						if(item.itemId == items.id) {
                            // item.jsonData.exemptionPrice=item.exemptionPrice;
                            // item.jsonData.policyList=item.typeList;
							arr.push({
								policyType: item.policyType || items.policyType,
								policyId: this.data.id || '',
								itemId: item.itemId || '',
								itemName: items.name || '',
								policyName: items.policyName,
								jsonData: item.jsonData || '',
								protocal: String(JSON.stringify(item.protocal)) || '',
								payCount: item.payCount || '',
								costPrice: item.costPrice || '',
								discountsPaidUp: item.discountsPaidUp || '',
								leaveNum: item.leaveNum || 0,
								policyIds: item.policyIds ? item.policyIds.join(',') : '',
								promotionAverage: item.share || '',
								publicPrice: item.publicPrice || '',
								parentItemId: item.parentItemId || '',
								parentItemSubId: item.parentItemSubId || '',
								itemSubId: items.htItemSubList.length ? items.htItemSubList[0].id : '',
								itemSubName: items.htItemSubList.length ? items.htItemSubList[0].name : '',
								costUnitPrice: (item.costPrice/item.payCount) || '',
								publicUnitPrice: item.publicUnitPrice || '',
								oldPublicUnitPrice: items.htItemSubList.length ? items.htItemSubList[0].costPrice : '',
                                grade:items.gradeVal,
								//								payCount: items.htItemSubList[0].num
							});
						}
					})
				})
				return arr;
			},
			setData() {
				try {
					if(this.data.policyData && this.data.id == 9) {
						this.$refs.tp.setData();
					}
				} catch(e) {
					console.warn(e);
				};
			},
			validForm() {
				return new Promise((res, rej) => {
					this.$refs.f.validate().then(ok => {
						if(ok) {
							if(!this.$refs.tp) {
								res(ok);
								return
							}
							this.$refs.tp.validForm().then(ok2 => {
								res(ok2);
							});
						} else {
							res(ok);
						}
					})
				});
			},
			BagOk(arr, protocal) {
				let subList = arr.htItemSubList,
					rate = subList[0].publicPrice / subList[0].groupPrice;
				arr.htItemList.forEach(v => {
					let obj = {
						policyType: arr.policyType,
						policyName: arr.policyName,
						itemId: v.htItemSubList[0].itemId,
						itemName: v.htItemSubList[0].name,
						jsonData: {
                            exemptionPrice:"",
                            policyList:[],
                        },
						costPrice: String(v.htItemSubList[0].costPrice * rate * v.htItemSubList[0].num),
						discountsPaidUp: String(v.htItemSubList[0].costPrice * rate * v.htItemSubList[0].num),
						publicPrice: v.htItemSubList[0].publicPrice,
						policyIds: [],
                        promotionAverage:'',
						visible: false,
						popVisible: false,
						payCount: v.htItemSubList[0].num,
						realityPrice: String(v.htItemSubList[0].costPrice * rate * v.htItemSubList[0].num),
						parentItemId: arr.id,
						parentItemSubId: arr.htItemSubList[0].id,
						leaveNum: parseInt(v.htItemSubList[0].num / this.divisor),
						protocal: protocal,
						costUnitPrice: v.htItemSubList[0].costPrice * rate,
						publicUnitPrice: v.htItemSubList[0].costPrice,
                        grade : v.gradeVal
					}
					this.data.policyData.list.push(obj);
				})
				this.data.policyData.list = this.data.policyData.list.filter(v => v.itemId);
			},
			policyChange(obj, o, id, indexs) {
				this.zkyhSearch = ''
				let discount = this.policyItemList(o.itemId).find(item => item.id == id);
				discount = Object.assign({}, discount);
				discount = JSON.parse(JSON.stringify(discount));
				let index = obj.indexOf(id);
				//				let type={
				//					fullReductionDiscount: discount.fullReductionDiscount,
				//					fullReductionLimit: discount.fullReductionLimit,
				//					fullReductionPrice: discount.fullReductionPrice,
				//					levelSort: discount.levelSort,
				//					type: discount.type,
				//					name:discount.name
				//				}
				let flag = o.jsonData.policyList.find(item => item.type == discount.type);
				if(discount.type == 'discount') {
					if(obj.length < 3) {
						obj.push(id);
						o.jsonData.policyList.push(discount)
					}
				} else {
					if(index == -1) {
						if(!flag) {
							if(obj.length < 3) {
								obj.push(id);
								o.jsonData.policyList.push(discount)
							}
						}
					} else {
						obj.splice(index, 1);
						let ind = o.jsonData.policyList.findIndex(v => v.id == id);
						o.jsonData.policyList.splice(ind, 1);
					}
				}
				if(discount.type == 'relief') {
					o.popVisible = true;
				}
				// let object = Object.assign({}, o);
				// object = JSON.parse(JSON.stringify(object));
				this.$set(this.data.policyData.list, indexs, o)
				this.concessions(o);
			},
			concessions(o) {
				let privilege = []
				if(o && o.jsonData && o.jsonData.policyList){
					privilege = o.jsonData.policyList.sort((a, b) => {
						return a.levelSort - b.levelSort;
					})
				}
				o.discountsPaidUp = o.realityPrice;
				privilege.forEach(v => {
					if(v.type == "fullreduction") {
						let num = parseInt(o.discountsPaidUp / v.fullReductionPrice);
						if(num > v.fullReductionLimit && v.fullReductionLimit > 0) {
							num = v.fullReductionLimit;
						}
						o.discountsPaidUp -= num * v.fullReductionDiscount;
					}
					if(v.type == "discount") {
						o.discountsPaidUp = o.discountsPaidUp * v.ratio;
                        console.log(o.discountsPaidUp,123)
					}
					if(v.type == "relief") {
						o.discountsPaidUp -= o.jsonData.exemptionPrice;
					}
				})
				o.discountsPaidUp = String(o.discountsPaidUp);
				o.costPrice = o.discountsPaidUp - o.share || 0;
				if(this.data.id == 9) {
					this.balance();
				}
			},
			closeTag(obj, id, ind, o,indexs) {
				let index = obj.indexOf(id)
				obj.splice(index, 1);
				o.jsonData.policyList.splice(ind, 1);
                console.log(o.jsonData.policyList.find(oitem => oitem.type == 'relief'))
				if(!o.jsonData.policyList.find(oitem => oitem.type == 'relief')) {
					o.jsonData.exemptionPrice = '';
				}
				// let object = Object.assign({}, o);
				// object = JSON.parse(JSON.stringify(object));
				this.$set(this.data.policyData.list, indexs, o)
				this.concessions(o);
			},
			costPriceChange(obj, val) {
				obj.realityPrice = obj.discountsPaidUp;
				obj.jsonData.exemptionPrice = '';
				obj.policyIds = [];
				obj.jsonData.policyList = [];
			},
			balance() {
				let arr = [],
					contPrice = 0,
					discountsPaidUp = 0,
					totalPrice = 0;
				this.data.policyData.list.forEach(item => {
					if(item.jsonData && item.jsonData.policyList){
						item.jsonData.policyList.forEach(v => {
							if(!arr.find(val => val == v.name)) {
								if(v.type=='relief'){
									arr.push(v.name+(item.jsonData.exemptionPrice||0)+this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617'));
								}else{
									arr.push(v.name);
								}
							}
						})
					}
					contPrice += Number(item.costPrice);
					discountsPaidUp += Number(item.discountsPaidUp);
					totalPrice += Number(item.publicPrice);
				})
				this.$emit("balance", arr.join('、'), discountsPaidUp, totalPrice, contPrice);
			},
			preferential(val) {
				let arr = [];
				this.data.policyData.preferential.forEach(v => {
					arr.push({
						itemId: v,
						policyId: this.data.id,
						policyType: this.data.type
					})
				})
				this.data.policyData.list = arr;
			},
			tags_boxShow(items, ind) {
				// let obj = items;
				// obj.visible = !items.visible;
				// this.$set(this.data.policyData.list, ind, obj)
				this.data.policyData.list.forEach((v, k) => {
					if(k == ind) {
						v.visible = true;
					} else {
						v.visible = false;
					}
					v.popVisible = false;
					// let obj = Object.assign({}, v);
					// obj = JSON.parse(JSON.stringify(obj));
					this.$set(this.data.policyData.list, k, v)
				})
			},
			tags_boxHide() {
				// let obj = items;
				// obj.visible = false;
				// this.$set(this.data.policyData.list, ind, obj)
				this.data.policyData.list.forEach((v, k) => {
					v.visible = false;
					// let obj = Object.assign({}, v);
					// obj = JSON.parse(JSON.stringify(obj));
					this.$set(this.data.policyData.list, k, v)
				})
			},
			upDatePrice() {
				if(this.data.id == 9) {
					this.discountsPaidSum = this.data.policyData.list.reduce((a, b) => Number(a) + Number(b.discountsPaidUp), 0)
					this.data.policyData.list.forEach(items => {
						items.share = (items.discountsPaidUp / this.discountsPaidSum * this.apportion);
					})
					let shareSum = this.data.policyData.list.reduce((a, b) => {
						return Number(a) + Number(b.share)
					}, 0)
					let maxValue = this.data.policyData.list.map(el => el.share).reduce((max, cur) => Math.max(max, cur), -Infinity);
					this.data.policyData.list.forEach(v => {
						if(v.share == maxValue) {
							v.share += this.apportion - shareSum;
						}
						console.log(v.discountsPaidUp, v.share, 555555)
						v.costPrice = v.discountsPaidUp - v.share || 0;
					})
				}
			},
			kcbRemote(query) {
				if(query !== '') {
					this.kcbOptions = this.kcbList.filter(v => v.name.toLowerCase().indexOf(query.toLowerCase()) != -1);
				} else {
					this.kcbOptions = this.kcbList;
				}
			},
			getKcbInfo(item) {
				if(item.htItemSubList.length) {
					return(
						this.number_format(item.htItemSubList[0].costPrice, 2, '.', ',') +
						this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5477') +
						this.number_format(item.htItemSubList[0].num, 0, '', '') +
						this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5478') +
						this.number_format(item.htItemSubList[0].publicPrice, 2, '.', ',') +
						this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')
					);
				} else {
					return '';
				}
			},
			number_format(number, decimals, dec_point, thousands_sep) {
				/*
				 * 参数说明：
				 * number：要格式化的数字
				 * decimals：保留几位小数
				 * dec_point：小数点符号
				 * thousands_sep：千分位符号
				 * */
				number = (number + '').replace(/[^0-9+-Ee.]/g, '');
				let n = !isFinite(+number) ? 0 : +number,
					prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
					sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
					dec = typeof dec_point === 'undefined' ? '.' : dec_point,
					s = '',
					toFixedFix = function(n, prec) {
						let k = Math.pow(10, prec);
						return '' + Math.round(n * k) / k;
					};

				s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
				let re = /(-?\d+)(\d{3})/;
				while(re.test(s[0])) {
					s[0] = s[0].replace(re, '$1' + sep + '$2');
				}

				if((s[1] || '').length < prec) {
					s[1] = s[1] || '';
					s[1] += new Array(prec - s[1].length + 1).join('0');
				}
				return s.join(dec);
			},
			//组合课程包
			courseSearch() {
				let arr = [];
				this.bagList.find(item => item.id == 10).htItemList.forEach(v => {
					if((v.name.indexOf(this.packageCoursesName) != -1 || !this.packageCoursesName) && (v.gradeVal == this.gradeId || !this.gradeId)) {
						arr.push(v);
					}
				})
				this.courseTableData = arr;
			},
			courseTableHide() {
				this.gradeId = '';
				this.packageCoursesName = '';
				this.$refs.gradeSel.clearSingleSelect();
			},
			getPackageName(row) {
				let itemId = row.itemId;
				return this.data.htItemList.find(v => v.id == itemId).name;
			},
			exemptionPriceOk(input, row, index) {
				let num = this.$refs[input][0].formatterValue;
				row.jsonData.exemptionPrice = num;
				row.popVisible = false;
				// let obj = Object.assign({}, row);
				// obj = JSON.parse(JSON.stringify(obj));
				this.$set(this.data.policyData.list, index, row)
				this.concessions(row);
			},
			popperHide(row, index) {
				row.popVisible = false;
				// let obj = Object.assign({}, row);
				// obj = JSON.parse(JSON.stringify(obj));
				this.$set(this.data.policyData.list, index, row)
			}
		},
		watch: {
			'data.policyData.itemId' () {},
			'data.policyData.list': {
				handler: function(val, oldVal) {
					if(this.data.id == 9) {
						this.balance();
					}
				},
				deep: true
			},
			'data.policyData.protocal' () {
				this.$emit('on-change');
			},
			'apportion': {
				handler: function(val, oldVal) {
					this.upDatePrice();
				},
				deep: true
			},
		}
	}
</script>
