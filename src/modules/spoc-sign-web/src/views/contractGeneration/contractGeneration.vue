<style lang="less">
	.sign_contract_generation {
		@color: #44bcb7;
		position: relative;
		.form-content {
			min-width: 1137px;
			.ivu-menu {
				z-index: auto;
			}
			.ivu-menu-submenu {
				border-top: 1px solid #e0e0e0;
			}
			.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
				color: #495060;
			}
			.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
				border-right: 0px solid transparent;
			}
			.sign_contract_generation .form-content .ivu-menu-light.ivu-menu-vertical .ivu-menu-item {
				border: none;
			}
			.ivu-menu-light.ivu-menu-vertical .ivu-menu-item {
				padding-left: 14px !important;
				border: none;
			}
			.ivu-menu-vertical .ivu-menu-item:hover {
				background: #FFFFFF;
			}
			.ivu-menu-vertical.ivu-menu-light:after {
				display: none;
			}
			.ivu-menu-vertical .ivu-menu-item:hover,
			{
				cursor: auto;
			}
			.ivu-card {
				margin-bottom: 16px;
			}
			.showbtn {
				padding: 14px;
			}
			.top {
				margin-bottom: 12px;
				span {
					font-size: 16px;
					color: #333333;
					line-height: 2em;
				}
			}
			.tip {
				span {
					color: #ff0000;
				}
			}
			.frmTit {
				padding: 14px 0px 14px 16px;
				border-top: 1px solid #e0e0e0;
				.titName {
					display: inline-block;
					font-size: 16px;
					font-weight: bold;
				}
				.titTip {
					display: inline-block;
					font-size: 14px;
					color: #999999;
					.red {
						color: #FF0000;
					}
				}
			}
			.MenuTit {
				margin-bottom: 12px;
				display: inline-block;
				.titName {
					display: inline-block;
					font-size: 16px;
					font-weight: bold;
				}
				.titTip {
					display: inline-block;
					font-size: 14px;
					color: #999999;
					.red {
						color: #FF0000;
					}
				}
			}
			.formBox {
				.addParentBtn {
					padding-bottom: 14px;
					text-align: right;
					padding-right: 95px;
				}
				.ivu-form-item {
					margin-bottom: 0px;
				}
			}
			.chooseStudent {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.search {
					height: 32px;
					line-height: 32px;
					.select-able {
						.main-input {
							border-radius: 4px 0px 0px 4px;
						}
						.icon-right {
							top: 6px;
						}
					}
				}
				.addStudent {
					width: 47px;
					height: 32px;
					line-height: 24px;
					display: inline-block;
					padding: 0;
					text-align: center;
					border-radius: 0px 4px 4px 0px;
				}
			}
			.clientInfo {
				.addStudent {
					width: 56px;
					height: 28px;
					line-height: 24px;
					display: inline-block;
					padding: 0 6px;
					text-align: center;
					border-radius: 4px;
					margin-left: 96px;
				}
			}
			.cooperator {
				display: flex;
			}
			.item-list {
				display: flex;
				flex-wrap: wrap;
				.item {
					margin: 20px 10px 0 0;
					padding: 0 8px;
					background-color: @color;
					color: #fff;
					span {
						margin-right: 8px;
						&:nth-last-of-type(1) {
							margin: 0;
							cursor: pointer;
						}
					}
				}
			}
			.contacts_wrap {
				.linkman {
					margin-bottom: 14px;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.linkman_tit {
						flex: 1;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						.tit_cont {
							font-weight: bold;
						}
					}
				}
			}
            .student_info_editor_box{
                overflow: hidden;
                height: 22px;
                width: 100%;
                .student_info_editor_btn{
                    float: right;
                    margin-right: 12px;
                    cursor: pointer;
                }
            }
            .ivu-divider{
                margin: 12px 0 4px;
            }
		}
		.big-create-wrap {
			text-align: center;
			.big-create {
				// padding: 12px 24px;
				font-size: 14px;
			}
		}
		.protocol_content {
			.ivu-input-wrapper {
				width: 120px;
			}
		}
		.balance_card {
            margin-bottom: 0px !important;
			.ivu-card-body {
				padding: 16px 0;
			}
			.submit-btns {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.balance {
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					align-items: flex-start;
					.dropdown_menu {
						width: 100%;
						flex: 1;
						padding: 0 16px;
						p {
							line-height: 20px;
						}
						.saleSel {
							.ivu-tag {
								background: #44bcb7;
								.ivu-tag-text,
								.ivu-icon-ios-close-empty {
									color: #FFFFFF;
								}
							}
						}
						.total {
							.ivu-form-item-label {
								font-size: 14px;
							}
							.ivu-form-item {
								margin-bottom: 0px;
							}
                            .total_title{
                                text-align: left;
                                padding: 6px 28px 6px;
                                font-size:14px;
                                font-weight:500;
                                color:rgba(73,80,96,1);
                                line-height:20px;
                            }
							p {
								text-align: right;
								line-height: 32px;
								font-size: 16px;
								.red {
									color: #FF0000;
								}
							}
						}
						.sale {
							.tags_box {
								/*width: 262px;*/
								min-height: 32px;
								padding: 0px 7px;
								font-size: 12px;
								border: 1px solid #dddee1;
								border-radius: 4px;
								cursor: pointer;
								background: #FFFFFF;
								.Row {
									.pulldown_generration {
										position: relative;
									}
									.ivu-dropdown .ivu-select-dropdown {
										left: auto !important;
										margin-right: 0px !important;
										height: 157px;
										overflow-y: auto;
										background: #FFFFFF;
										top: 32px !important;
										right: -7px !important;
									}
									.arrow {}
								}
							}
							.ivu-tag {
								background: #44bcb7;
								.ivu-tag-text,
								.ivu-icon-ios-close-empty {
									color: #FFFFFF;
								}
							}
						}
					}
					.footer_btn {
						width: 100%;
						height: 48px;
						border-top: 1px #E6E7EB solid;
						.btns {
							display: flex;
							justify-content: space-between;
							align-items: center;
							button {
								padding: 4px 16px;
								font-size: 14px;
							}
						}
					}
				}
			}
		}
		.intro {
			margin: 20px 0;
			font-weight: bold;
			.bgreen {
				color: @color;
				font-size: 14px;
			}
			.bred {
				color: #f00;
				font-size: 14px;
			}
		}
	}
</style>
<template>
	<div class="sign_contract_generation">
		<div v-show="!$route.query.pid">
			<div class="form-content">
				<Form :model="formData" ref="generation" :rules="rules" :label-width="100">
					<Card :bordered="false" dis-hover>
						<div class="top">
							<div>
								<span>{{$t('modules_spoc_sign_web_src_modules_pactcard_4830')}}</span>
								<span>{{info.name}}</span>
							</div>
						</div>
						<div class="MenuTit">
							<div class="title">
								<div class="titName">{{$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5505')}}</div>
								<div class="titTip">{{$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5506')}}<span class="red">*</span>{{$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5507')}}</div>
							</div>
						</div>
						<div class="formBox">
							<Row type="flex">
								<Col span="16">
								<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5508')">
									<div class="chooseStudent">
										<v-select style="width: 354px;" class="search" :placeholder="$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5509')" v-model="searchValue" k='name' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange" icon="ios-search" o="phone" :otherStyle="{'text-align':'right'}">
										</v-select>
										<!-- <Button class="addStudent" @click="addStudent">{{$t('importPage_action3')}}</Button> -->
                                            <!-- <Button type="primary" class="addStudent" >{{$t('classroom_allscore_51')}}</Button> -->
                                        <span style="cursor: pointer;margin-left: 12px;" @click="addCustomer">
                                            <Icon type="md-person-add" size="18"/>
                                        </span>
									</div>
								</FormItem>
								</Col>
								<Col span="6" push="2" style="overflow: hidden;">
								<FormItem prop="signType" :label="$t('modules_spoc_sign_web_src_modules_preview_4894')" style="float: right;">
									<RadioGroup v-model="formData.signType" v-if="dictData.ht_contract_sign_type">
										<Radio :label="item.value" v-for="(item, index) in dictData.ht_contract_sign_type" :key="index">{{item.label}}</Radio>
									</RadioGroup>
								</FormItem>
								</Col>
							</Row>
                            <Divider />
                            <div class="student_info_editor_box">
                                <span @click="editStudent" class="student_info_editor_btn">
                                    <CommonIcon type="_bianzu31" color="#999999" :size="14" :style="{ display: 'inline-block', verticalAlign: 'middle' }" />
                                </span>
                            </div>
							<div class="clientInfo">
								<Row type="flex">
									<Col span="6">
									<!-- <FormItem :label="$t('modules_spoc_portal_views_selfcentred_viewfeedbackdetail_3920')">
										{{formData.student.code||'- -'}}
									</FormItem> -->
									<FormItem :label="$t('modules_rolemanage_167')">
										{{formData.student.name||'- -'}}
									</FormItem>
									</Col>
									<Col span="6">
									<FormItem :label="$t('messagemanagement_components_infos_319')">
										{{formData.student.enName||'- -'}}
									</FormItem>
									</Col>
									<Col span="6">
									<FormItem :label="$t('views_staff_components_staffinfo_669')">
										{{formData.student.gender=='m'?$t('views_staff_components_staffinfo_670'):formData.student.gender=='f'?$t('views_staff_components_staffinfo_671'):'- -'}}
									</FormItem>
									</Col>
									<Col span="6">
									<FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_719')">
										{{formData.student.birthday?(new Date(formData.student.birthday)).format('yyyy-MM-dd'):'- -'}}
									</FormItem>
									</Col>
								</Row>
								<Row type="flex">
									<Col span="6">
									<FormItem :label="$t('modules_rolemanage_168')">
										{{formData.student.mobile?formData.student.mobile:'- -'}}
									</FormItem>
									</Col>
									<Col span="6">
									<FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_720')">{{schoolType}}
									</FormItem>
									</Col>
									<Col span="6">
									<FormItem :label="$t('modules_spoc_core_web_src_views_schoolmanagement_index_249')">
										{{schoolName}}
									</FormItem>
									</Col>
									<Col span="6">
									<FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_724')">{{schoolGrade}}
									</FormItem>
									</Col>
								</Row>
								<Row type="flex">
									<Col span="6">
									<FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_955')">{{gradeType}}
									</FormItem>
									</Col>
									<Col span="6">
									<FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_975')">{{getGradeName}}
									</FormItem>
									</Col>
									<!-- <Col span="6">
									<FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_907')">
										{{formData.student.province||'- -'}}
									</FormItem>
									</Col>
									<Col span="6">
									<FormItem :label="$t('views_staff_components_lefttree_637')">
										{{formData.student.city?formData.student.city:'- -'}}
									</FormItem>
									</Col>
									<Col span="6">
									<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5528')">
										{{formData.student.region?formData.student.region:'- -'}}
									</FormItem>
									</Col>
								</Row>
								<Row type="flex"> -->
									<Col span="12">
									<FormItem :label="$t('views_staff_components_lefttree_641')">
										{{formData.student.address?formData.student.address:'- -'}}
									</FormItem>
									</Col>
								</Row>
							</div>
						</div>
					</Card>
					<v-item-card v-for="(item,index) in itemCardList" :key="'v_item_card'+item.index" :data="item" :info="info" :discountsList="htPolicyList.find(item=>item.id==11)" :apportion="discountsPaidUp-items.discountsPaidUp" @on-close="itemCardClose" @on-change="onPolicyCheapChange" :bagList="htPolicyList.filter(item=>item.id==10)" ref="disitem" @balance="balance">
					</v-item-card>

					<Card :bordered="false" dis-hover class="balance_card">
						<p slot="title">{{$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5530')}}</p>
						<div class="submit-btns">
							<div class="balance">
								<div class="dropdown_menu" style="padding-bottom: 0;">
									<Row align="top" type="flex">
										<Col span="9">
										<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5238')" :label-width="124">
											<Input :value="(discountRemarks)+(discountRemarks&&items.typeList.length?'、':'')+(items.typeList.length?items.typeList.map(v=>v.name+(v.type=='relief'?(items.exemptionPrice||0)+$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617'):'')+$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5533')).join('、'):'')" readonly type="textarea" :rows="2"></Input>
										</FormItem>
										<FormItem :label="$t('views_staff_components_lefttree_648')" :label-width="124">
											<Input v-model="formData.remarks" type="textarea" :rows="2" :maxlength="255"></Input>
											<p style="text-align: right;">{{formData.remarks.length}}/255</p>
										</FormItem>
										</Col>
										<Col span="9">
										<Row type="flex">
											<Col span="24">
											<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5535')" class="sale" :label-width="124">
												<div class="tags_box" @click="itemsClick">
													<Row type="flex" class="Row" align="middle">
														<Col span="23">
														<Tag v-for="(item,index) in items.typeList" :key="index" closable @on-close="closeTag(items.policyIds,item.id,index,items)">
															<Poptip v-model="items.popVisible" placement="right" transfer width="220" v-if="item.type=='relief'" @on-popper-hide="popperHide(items)">
																<span>
															{{item.name}}
                                        <span v-if="item.type=='relief'">{{$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5536', [ items.exemptionPrice ? items.exemptionPrice : 0 ])}}</span></span>
																<div class="api" slot="content">
																	<InputNumber :ref="'exemptionPrice'" :active-change="false" :min="0" :v-model="0" :placeholder="$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5455')" style="width: 100px;"></InputNumber>
																	<Button type="primary" @click="exemptionPriceOk('exemptionPrice',items)" style="margin-left: 12px;">{{$t('classroom_allscore_54')}}</Button>
																</div>
															</Poptip>
															<span v-else>{{item.name}}</span>
														</Tag>
														<input v-model="zdxmyhSearch" style="display:inline-block;border: none;height: 31px;"></input>
														</Col>
														<Col span="1">
														<Dropdown class="pulldown_generration" trigger="custom" :visible="items.visible" placement="bottom-end" @on-click="policyChange(items.policyIds,items,$event)">
															<a href="javascript:void(0)" @click.stop="itemsClick" class="arrow">
																<Icon type="ios-arrow-down" v-show="!items.visible" color="#80848f" size="14"></Icon>
																<Icon type="ios-arrow-up" v-show="items.visible" color="#80848f" size="14"></Icon>
															</a>
															<DropdownMenu slot="list" v-if="htPolicyList.find(item=>item.id==11)" style="width: 322px;">
																<DropdownItem v-show="item.name.indexOf(zdxmyhSearch) >= 0" v-for="(item,index) in _htItemList" :name="item.id" :key="item.id" :selected="items.policyIds.indexOf(item.id)!=-1&&item.type!='discount'" :disabled="(items.typeList.find(oitem=>oitem.type==item.type)&&item.type!='discount'&&items.policyIds.indexOf(item.id)==-1)||items.policyIds.length>=3">{{item.name}}</DropdownItem>
															</DropdownMenu>
														</Dropdown>
														</Col>
													</Row>
												</div>
											</FormItem>
                                            <FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5539')" prop="preferential " :label-width="124">
                                                <Select filterable v-model="otherItem.preferential" multiple @on-change="preferential" v-if="htPolicyList.find(v=>v.type=='others')">
                                                    <Option :value="item.id" v-for="(item,index) in htPolicyList.find(v=>v.type=='others').htItemList" :key="item.id">{{item.name}}</Option>
                                                </Select>
                                            </FormItem>
											</Col>
											<!-- <Col span="6">
											<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5230')" v-show="items.typeList.find(oitem=>oitem.type=='relief')" :label-width="80">
												<Input v-model="items.exemptionPrice" style="width:130px;" @on-blur="concessions(items)"><span slot="append">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span></Input>
											</FormItem>
											</Col> -->
										</Row>
										</Col>
										<Col span="6">
										<div class="total" style="padding-top: 0px;">
                                            <p class="total_title">{{$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5530')}}</p>
											<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5242')" :label-width="124">
												<p>{{ number_format(totalPrice,2,'.',',') }}{{$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5542') }} </p>
											</FormItem>
											<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5241')" :label-width="124">
												<p>{{ number_format(totalPrice-contPrice,2,'.',',') }}{{$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5542')}}</p>
											</FormItem>
											<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5243')" :label-width="124">
												<p><span class="red">{{ number_format(contPrice,2,'.',',') }}</span>{{$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5542')}}</p>
											</FormItem>
										</div>
										</Col>
									</Row>
								</div>
								<Row class="footer_btn" type="flex" align="bottom">
									<Col span="24">
									<div class="btns" style="padding-right: 16px;justify-content: flex-end;">
										<Button type="primary" @click="preview">{{$t('modules_spoc_core_web_src_views_tasktemplate_index_413')}}</Button>
										<Button type="primary" @click="generate" style="margin-left: 12px">{{$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5547')}}</Button>

									</div>
									</Col>
								</Row>
							</div>
						</div>
					</Card>
				</Form>
			</div>
		</div>
		<template v-if="$route.query.pid">
			<preview :info="previewData" :preview="true" :pdfinfo="pdfInfo" @go-edit="goEdit">
			</preview>
			<div class="big-create-wrap">
				<Button type="primary" class="big-create" @click="createNow">{{$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5548')}}</Button>
			</div>
		</template>
		<modelxq ref="xqmodel" :xqList="xqList" @XQOk="XQOk" :selected="officeId"></modelxq>
		<student-model ref="stuModel" @studOk="studOk"></student-model>
		<student-model ref="stuEditModel" @studOk="stuEditOk" :editList="formData"></student-model>
	</div>
</template>
<script>
	const othersId = -100;
	let t, time;
	let index = 0;
	import { mapMutations, mapGetters, mapState } from 'vuex';
	import vBtn from "./component/vBtn";
	import vItemCard from "./component/vItemCard";
	import modelxq from "./component/modelXQ";
	import studentModel from "./component/studentModel";
	import preview from '../../modules/preview.vue';
	import vSelect from '../../modules/vSelect.vue';
	import valid, {
		errors,
		htPolicy,
		htContract,
        htContractNew,
		htContractTpl,
		ec,
		common,
		sysUser,
		sysDict,
		sys
	} from '../../libs/request.js';
	import { getHtPolicyList } from '../../store/index.js';
	import { arrayRemove, extendKey, validIdCard, clone } from '../../libs/util.js';
	import CommonIcon from '_c/common-icon';
	export default {
		name: "sign.contractGeneration",
		data() {
			const must = [{
				required: true,
				message: this.$t('modules_spoc_core_web_src_views_customstate_stategroup_204'),
				trigger: 'blur'
			}, ]
			let self = this;
			return {
                otherItem:{
                    preferential:[],
                    list:[]
                },
				zdxmyhSearch: '',
				contPrice: 0,
				totalPrice: 0,
				discountsPaidUp: 0,
				items: {
					itemId: '',
					policyIds: [],
					exemptionPrice: 0,
					visible: false,
					popVisible: false,
					typeList: [],
					realityPrice: '',
					discountsPaidUp: 0,
					costPrice: this.contPrice
				},
				preference: [],
				balanceVisible: false,
				xqList: [],
				officeId: '',
				dictData: {},
				htPolicyList: getHtPolicyList(),
				info: {
					htOptLogList: [],
					htPartnerList: [],
					htSign: {
						sellerOffice: {}
					},
					attachments: []
				},
				pdfInfo: {},
				ecInfo: {
					data: {},
				},
				userMapList: [],
				userMapListLoading: false,

				previewData: {
					previewId: this.$route.query.pid,
					htSign: {},
					attachments: []
				},
				editView: {
					eid: ''
				},
				discountRemarks: '',
				formData: {
					student: {
                        code: '',
                        name: '',
                        enName: '',
                        mobile: '',
                        birthday: '',
                        gradeType:'',
                        grade:'',
                        gender: 'm',
                        schoolType: '',
                        school: '',
                        latLongSchool:'',
                        schoolGrade: '',
                        province: '',
                        city: '',
                        region: '',
                        address: '',
                        latLongAddress:'',
                        lng: '',
                        lat: '',
						comParentList: [{
                            isMain:1,
							name: '',
							relation: '',
							phone: '',
							cellNumber: '',
							qq: '',
							weChat: '',
							email: '',
							remarks: ''
						}, ],
					},
					signType: 'new',
					discountRemarks: '',
					remarks: '',
					isProtocol: '0',
					htContractItemList: [],
					// htContractData: {
					// 	settingJson: "",
					// 	resultJson: ""
					// },
					signPriceNew: this.contPrice,
					price: this.totalPrice
				},
				tmpData: {
					htSign: {},
					htAuditorList: [],
				},
				studentId: '',
				studendreaded: false,
				freeze: true,
				rules: {
					signType: [{
						required: true,
						message: this.$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5550'),
						trigger: 'change'
					}, ],
				},
				itemCardList: [],
				isSave: false,
				searchValue: '',
				tags_boxWid: 0,
				wid: 0,
				gradeList: [],
                gradeTypeList:[],
                schoolList:[],
			}
		},
		computed: {
			...mapGetters('sign', ['roleId']),
			...mapState(['userInfo']),
			_htItemList() {
				//整单优惠政策，有重复数据，去重
				let arr = this.htPolicyList.find(item => item.id == 11).htItemList
				let res = []
				let ids = []
				arr.forEach((item) => {
					if(ids.indexOf(item.id) < 0) {
						ids.push(item.id)
						res.push(item)
					}
				})
				return res
			},
			totalCheap() {
				console.log(Object.keys(this.tmpData.htSign), 111111)
				if(Object.keys(this.tmpData.htSign).length > 0) {
					return this.tmpData.htSign.deratePrice + this.tmpData.htSign.presentPrice;
				}
				return 0;
			},
			reviewer() {
				let arr = [];
				this.tmpData.htAuditorList.forEach(item => {
					arr.push(item.auditorName);
				})
				return arr.join(',');
			},
			package() {
				let obj = {
					originalPrice: 0,
					money: 0,
					discount: 0
				};
				if(this.itemCardList[0].policyData) {
					if(this.itemCardList[0].policyData.list) {
						this.itemCardList[0].policyData.list.forEach(item => {
							obj.originalPrice += Number(item.publicPrice);
							obj.money += Number(item.costPrice);
						})
					}
				}
				obj.discount = parseFloat((obj.originalPrice - obj.money));
				return obj;
			},
			schoolType() {
                let info = this.schoolList.find(v => v.id == this.formData.student.schoolId);
                if(info){
                    return info.typeName||'--';
                }else{
                    return '--';
                }
			},
			schoolGrade() {
				if(this.dictData.com_student_school_grade) {
					return this.dictData.com_student_school_grade.find(v => v.value == this.formData.student.schoolGrade) ? this.dictData.com_student_school_grade.find(v => v.value == this.formData.student.schoolGrade).label : '- -';
				};
			},
            schoolName() {
                let info = this.schoolList.find(v => v.id == this.formData.student.schoolId);
                if(info){
                    return info.name||'--';
                }else{
                    return '--';
                }
			},
			getGradeName() {
				if(this.gradeList.length) {
					return this.gradeList.find(v => v.value == this.formData.student.grade) ? this.gradeList.find(v => v.value == this.formData.student.grade).label : '- -';
				};
			},
            gradeType() {
				if(this.gradeTypeList.length) {
					return this.gradeTypeList.find(v => v.value == this.formData.student.gradeType) ? this.gradeTypeList.find(v => v.value == this.formData.student.gradeType).label : '- -';
				};
			}
		},
		components: {
			vBtn,
			vItemCard,
			modelxq,
			preview,
			vSelect,
			studentModel,
            CommonIcon
		},
		created() {
			this.getXq();
			this.$nextTick(() => {
				if(!this.$route.query.pid && !this.$route.query.mid && !this.officeId) {
					this.$refs.xqmodel.modelShow()
				} else {
					this.initPage();
				}
			})
		},
		mounted() {
			// this.$nextTick(() => {
			// 	// this.$el.querySelector(".balance .sale .tags_box .ivu-dropdown .ivu-select-dropdown").style.left = 0;
			// 	time = setInterval(() => {
			// 		let wid = this.$el.children[0].offsetWidth;
			// 		if(this.wid != wid) {
			// 			this.$el.querySelector(".submit-btns").style.width = wid + 'px';
			// 			this.$el.querySelector(".dropdown_menu").style.width = wid + 'px';
			// 			this.wid = wid;
			// 		}
			// 		let tags_boxWid = this.$el.querySelector(".balance .sale .tags_box").clientWidth;
			// 		if(this.tags_boxWid != tags_boxWid) {
			// 			this.$el.querySelector(".balance .sale .tags_box .ivu-dropdown .ivu-select-dropdown").style.width = tags_boxWid + 'px';
			// 			this.tags_boxWid = tags_boxWid;
			// 		}
			// 	}, 10)
			// 	const that = this
			// 	window.onresize = () => {
			// 		return(() => {
			// 			window.screenWidth = document.body.clientWidth
			// 			that.screenWidth = window.screenWidth
			// 		})()
			// 	};
			//				let dom = document.querySelector('.sign_container .s-content');
			//				dom.addEventListener("scroll", () => {
			//					if(this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()) {　　　　
			//						document.querySelector('.sign_contract_generation').style.paddingBottom = "300px";
			//						console.log(dom.scrollTop)
			//						dom.scrollTop = dom.scrollTop + 300;
			//						this.balanceVisible = true;
			//						//						this.balanceShow();
			//					} else {
			//						document.querySelector('.sign_contract_generation').style.paddingBottom = "50px";
			//						//						dom.scrollTop=dom.scrollTop-300;
			//						//						this.balanceVisible = false;
			//					}
			//				})
			// 	if(window.addEventListener) //FF,火狐浏览器会识别该方法
			// 		window.addEventListener('DOMMouseScroll', this.wheel, false);
			// 	window.onmousewheel = document.onmousewheel = this.wheel; //W3C
			// })
            if(this.$route.query.officeId){
                this.officeId=this.$route.query.officeId;
            }
            if(this.$route.query.cusId){
                this.textChange({cusId:this.$route.query.cusId})
            }
			if(this.$route.query.cusCode) { // 从跟单页跳到合同页，再跳过来，自动根据cusCode填充ec信息
				this.formData.student.code = this.$route.query.cusCode;
				this.$refs.generation.validateField('code'); // 触发根据id取得ec信息
			}
            this.getComSchoolListName('');
		},
		beforeDestroy() {
			this.stopPolling();
			clearInterval(time);
		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
            getComSchoolListName(name){
                let params={
                    name
                }
                common
                .comSchoolListName(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                      this.schoolList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                });
            },
			relation(items) {
				if(this.dictData.ht_parent_relation) {
					return this.dictData.ht_parent_relation.find(v => v.value == items.relation) ? this.dictData.ht_parent_relation.find(v => v.value == items.relation).label : '- -';
				};
			},
			//统一处理滚轮滚动事件
			wheel(event) {
				var delta = 0;
				if(!event) event = window.event;
				if(event.wheelDelta) { //IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
					delta = event.wheelDelta / 120;
					if(window.opera) delta = -delta; //因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
				} else if(event.detail) { //FF浏览器使用的是detail,其值为“正负3”
					delta = -event.detail / 3;
				}
				if(delta)
					this.handle(delta);
			},
			//上下滚动时的具体处理函数
			handle(delta) {
				let dom = document.querySelector('.sign_container .s-content');
				if(delta < 0) { //向下滚动
					if(this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()) {　　
						if(document.querySelector('.sign_contract_generation')) {
							document.querySelector('.sign_contract_generation').style.paddingBottom = "300px";
						}　　
						dom.scrollTop = dom.scrollTop + 250;
						this.balanceVisible = true;
						console.log(dom.scrollTop, 0)
						//						this.balanceShow();
					}
				} else { //向上滚动
					if(this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()) {
						if(document.querySelector('.sign_contract_generation')) {
							document.querySelector('.sign_contract_generation').style.paddingBottom = "50px";
						}
						if(this.balanceVisible) {
							this.balanceVisible = false;
							setTimeout(() => {
								dom.scrollTop = dom.scrollTop + 250;
							}, 50)
						}
						//						this.balanceShow();
					}
					//						console.log(dom.scrollTop)
				}
			},
			//滚动条在Y轴上的滚动距离

			getScrollTop() {
				let dom = document.querySelector('.sign_container .s-content');
				var scrollTop = 0,
					bodyScrollTop = 0,
					documentScrollTop = 0;
				if(document.body) {
					bodyScrollTop = dom.scrollTop;
				}
				if(document.documentElement && dom) {
					documentScrollTop = dom.scrollTop;
				}
				scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;　　
				return scrollTop;
			},

			//文档的总高度

			getScrollHeight() {
				let dom = document.querySelector('.sign_container .s-content');
				var scrollHeight = 0,
					bodyScrollHeight = 0,
					documentScrollHeight = 0;
				if(document.body) {
					bodyScrollHeight = dom.scrollHeight;
				}
				if(document.documentElement) {
					documentScrollHeight = dom.scrollHeight;
				}
				scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;　　
				return scrollHeight;
			},

			//浏览器视口的高度

			getWindowHeight() {　　
				let dom = document.querySelector('.sign_container .s-content');
				var windowHeight = 0;　　
				if(document.compatMode == "CSS1Compat") {　　　　
					windowHeight = dom.clientHeight;　　
				} else {　　　　
					windowHeight = dom.clientHeight;　　
				}　　
				return windowHeight;
			},
			getXq() {
				htContract.getXq({
					tplId: this.$route.query.id
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.xqList = res.data.data;
					}
				}).catch(errors.call(this));
			},
			swfTime(k, v) {
				this.formData[k] = v ? (new Date(v)).format('yyyy-MM-dd 00:00:00') : '';
			},
			htContractItemList() {
				if(this.itemCardList && this.$refs.disitem && this.$refs.disitem.length) {
					const itemList = this.$refs.disitem.map(item => {
						return item.chooseData();
					});
					// this.items.policyIds.forEach(v => {
					// 	this.items.typeList.forEach(val => {
					// 		if(v == val.id) {
					// 			itemList.push({
					// 				policyId: val.policyId,
					// 				itemId: v,
					// 				exemptionPrice: this.items.exemptionPrice || 0,
					// 				name: val.name,
     //                                ratio:val.ratio,
					// 				policyType: val.policyType,
					// 				policyName: val.policyName
					// 			});
					// 		}
					// 	});
					// });
     //                this.otherItem.list.forEach(val => {
     //                    itemList.push(val);
     //                });
					let arr = [];
					itemList.filter(item => item.itemId != '').forEach(v => {
						arr = arr.concat(v);
					})

					return arr;
				}
				let arr = [];
				return arr;
			},
			tpls() {
				let arr = [];
				if(this.itemCardList && this.$refs.disitem && this.$refs.disitem.length) {
					const itemList = this.$refs.disitem.map(item => {
						return item.policy.tpl;
					})
					arr = itemList.filter(item => item.itemId != '');
				}
				arr = arr.map((item, i) => {
					return `1.${i+1} ${item}`
				});
				return arr.join('\r\n');
			},
			remoteMethod(name) {
				if(name) {
					this.userMapListLoading = true;
					sysUser.listAllUserMap({
						name
					}).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.userMapList = res.data.data;
						}
					}).catch(errors.call(this)).finally(() => {
						this.userMapListLoading = false;
					});
				}
			},
			initPage() {
				let cb = () => {
					if(this.$route.query.eid) { // 预览返回编辑
						this.getPreviewData(this.$route.query.eid, data => {
							this.editView = data;
							this.restoreEdit(data);
						});
					}

					if(this.$route.query.mid) { // 创建完成后的编辑
						this.getInfo(this.$route.query.mid, data => {
							this.editView = data;
							this.restoreEdit(data);
						});
					}
				}
                if(this.$route.query.cusId){
                    this.textChange({cusId:this.$route.query.cusId})
                }
				if(this.$route.query.mid) { // 创建完成后的编辑
					const params = {
						id: this.$route.query.mid
					};
					htContract.formOld(params).then(valid.call(this)).then(res => {
						if(res.ok) {
							//								this.formData.gender = res.data.data.gender;
							// this.formData.htContractData = res.data.data.htContractData;
							this.officeId = res.data.data.htSign.officeId;
							this.getListData(cb);
						}
					}).catch(errors.call(this));
				} else {
					this.getListData(cb);
				}

				if(this.$route.query.id) {
					this.getHtContractTplInfo(this.$route.query.id);
				}
				if(this.$route.query.pid) { // preview
					this.getPreviewData(this.$route.query.pid, data => {
						this.previewData = data;
						const ht = this.previewData.attachments.find(item => item.bizType == 'HT_CONTRACT_PREVIEW');
						if(ht) {
							if(ht.url) {
								this.pdfInfo = ht;
							} else {
								this.startPolling(ht.id);
							}
						}
					});
				}
				sysDict.batchListData({
					types: 'com_student_school_type,com_student_school_grade,ht_contract_sign_type,ht_parent_relation,ht_receipt_detail_type'
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.dictData = res.data.data;
					}
				}).catch(errors.call(this));
				this.findChildDictByParentDict();
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

                sysDict.batchListData({
                		types:'jw_course_type'
                	})
                	.then(valid.call(this))
                	.then(res => {
                		if(res.ok) {
                			this.gradeTypeList = res.data.data.jw_course_type
                		}
                	})
                	.catch(errors.call(this))
                	.finally(() => {
                	});
			},
			getListData(cb) {
				this.updateLoadingStatus({
					isLoading: true
				});
				htContract.findItemListData({
					officeId: this.officeId
				}).then(valid.call(this)).then(res => {
					if(res.ok && res.data.data) {
						// if(!this.formData.htContractData.settingJson) {
							this.htPolicyList = res.data.data.map(item => {
								item.policyData = {
									list: [{
										itemId: '',
										jsonData: {exemptionPrice: 0,},
										costPrice: '',
										publicPrice: '',
										policyIds: [],
										payCount: '',
                                        promotionAverage:'',
										visible: false,
										parentItemId: '',
										parentItemSubId: '',
										derate: '',
										typeList: [],
										leaveNum: '',
										protocal: ''
									}]
								};
								return item;
							});
							// this.formData.htContractData.settingJson = String(JSON.stringify(this.htPolicyList)) || '';
						// } else {
						// 	this.htPolicyList = JSON.parse(this.formData.htContractData.settingJson);
						// }
						let d = clone(this.htPolicyList.find(v => v.type == 'kcb'))
						d.policyId = d.id;
						d.index = ++index;
						d.payCount = 0;
						d.policyData = {
							list: []
						};
						this.itemCardList.push(d);
						cb && cb(this.htPolicyList);
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},
			getHtContractTplInfo(id) {
				htContractTpl.form({
					id
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.info = res.data.data;
					}
				}).catch(errors.call(this));
			},
			getPreviewData(pid, cb) {
				htContract.formPreview({
					id: pid
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.officeId = res.data.data.htSign.officeId;
						cb(res.data.data);
					}
				}).catch(errors.call(this));
			},
			getInfo(id, cb) {
				const params = {
					id
				};
				htContract.formOld(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.formData.gender = res.data.data.gender;
						// this.formData.htContractData = res.data.data.htContractData;
						this.officeId = res.data.data.htSign.officeId;
						cb && cb(res.data.data);
					}
				}).catch(errors.call(this));
			},
			onPolicyCheapChange(val) {
				//				this.$nextTick(() => {
				//					const data = this.getPostData();
				//					if(val) {
				//						data.protocolCustom = "1";
				//					}
				//					htContract.calculteContract(data).then(valid.call(this)).then(res => {
				//						if(res.ok) {
				//							this.tmpData = res.data.data;
				//						}
				//					}).catch(errors.call(this));
				//				})
			},
			tryGetEc(cb) {
				if(this.formData.student.code) {
					htContract.getcode({
						code: this.formData.student.code
					}).then(valid.call(this)).then(res => {
						cb && cb(res);
						if(res.ok && res.data.data && res.data.data.code !== -1) {
							this.ecInfo.data = res.data.data;
						}
					}).catch(errors.call(this));
				}
			},
			goEdit(info) {
				this.$router.push({
					name: 'sign.contractGeneration',
					query: {
						eid: info.previewId,
						mid: this.$route.query.mid
					}
				})
				this.getPreviewData(info.previewId, data => {
					this.editView = data;
				});
				this.previewData = {};
				if(!this.$route.query.pid && !this.officeId) {
					this.$refs.xqmodel.modelShow()
				}
				// this.$nextTick(() => {
				// 	let wid = this.$el.children[0].clientWidth;
				// 	this.$el.querySelector(".submit-btns").style.width = wid + 'px';
				// 	this.$el.querySelector(".dropdown_menu").style.width = wid + 'px';
				// 	let tags_boxWid = this.$el.querySelector(".balance .sale .tags_box").clientWidth;
				// 	this.$el.querySelector(".balance .sale .tags_box .ivu-dropdown .ivu-select-dropdown").style.width = tags_boxWid + 'px';
				// })
			},
			//添加附加协议
			showTab(data, show) {
				//				this.itemCardList = [];
				let d = clone(data);
				if(show || d.type == '1') {
					d.policyId = d.id;
					d.index = ++index;
					d.payCount = 0;
					this.itemCardList.push(d);
					if(data.id == othersId) {
						this.onPolicyCheapChange(true);
					} else {
						this.onPolicyCheapChange();
					}
				} else {
					this.itemCardClose(d);
				}
				console.log(data.id)
				if(data.id == 12) {
					this.$nextTick(() => {
						let obj = this.$el.querySelector('.other');
						let dom = document.querySelector('.sign_container .s-content');
						if(obj) {
							//获取某元素以浏览器左上角为原点的坐标
							var t = obj.offsetTop; //获取该元素对应父容器的上边距
							var l = obj.offsetLeft; //对应父容器的上边距
							//判断是否有父容器，如果存在则累加其边距
							while(obj = obj.offsetParent) { //等效 obj = obj.offsetParent;while (obj != undefined)
								t += obj.offsetTop; //叠加父容器的上边距
								l += obj.offsetLeft; //叠加父容器的左边距
							}
							//							console.log(this.$el.querySelector('.other').offsetHeight)
							dom.scrollTop = t - (window.innerHeight - this.$el.querySelector('.other').offsetHeight) / 2;
						}
					})
				}
			},
			itemCardClose(data) {
				let index = this.itemCardList.findIndex(value =>
					value.id == data.id
				)
				this.itemCardList.splice(index, 1);
				this.onPolicyCheapChange();
			},
			//预览合同
			preview() {
				if(!this.itemCardList.length) {
					this.$Message.error(this.$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5551'));
					return
				} else {
					let kcbNum = 0
					this.itemCardList.forEach(item => {
						if(item.type == 'kcb') {
							kcbNum = kcbNum + 1
						}
					})
					if(kcbNum == 0) {
						this.$Message.error(this.$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5551'));
						return
					}
				}
				if(this.isSave) { // 防止重复提交
					return
				}
				this.isSave = true;
				this.formData.discountRemarks = (this.discountRemarks) + (this.discountRemarks && this.items.typeList.length ? '、' : '') + (this.items.typeList.length ? this.items.typeList.map(v => v.name+(v.type=='relief'?(this.items.exemptionPrice||0)+this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617'):'') + this.$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5533')).join('、') : '');
				const a = [this.$refs.generation.validate()];
				Promise.all(a).then((ok) => {
					const o = ok.every(item => item);
					if(!o) {
						this.freeze = true;
						this.isSave = false;
						return this.$Message.error(this.$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5552'));
					}
					const data = this.getPostData();
					if(data.htContractItemList.filter(v=>v.policyType.indexOf('kcb')!=-1).length > 5) {
						this.freeze = true;
						this.isSave = false;
						return this.$Message.error(this.$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5553'));
					}
					this.freeze = false;
					if(this.editView.previewId) {
						data.previewId = this.editView.previewId;
					}
					if(this.$route.query.mid) {
						data.id = this.$route.query.mid;
					}
					if(this.xqList.length === 1) {
						data.officeId = this.xqList[0].id;
					} else {
						data.officeId = this.officeId;
					}
					this.updateLoadingStatus({
						isLoading: true
					});
					htContract.preview(data).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.freeze = false;
							this.previewData = res.data.data;
							this.$router.push({
								name: 'sign.contractGeneration',
								query: {
									id: this.info.id,
									pid: res.data.data.previewId,
									mid: this.$route.query.mid
								}
							});
							const ht = this.previewData.attachments.find(item => item.bizType == 'HT_CONTRACT_PREVIEW');
							if(ht) {
								if(ht.url) {
									this.pdfInfo = ht;
								} else {
									this.startPolling(ht.id);
								}
							}
						} else {
							this.freeze = true;
						}
					}).catch(errors.call(this)).finally(() => {
						this.isSave = false;
						this.updateLoadingStatus({
							isLoading: false
						});
					});
				}).catch(err => {
					this.isSave = false;
					this.$Message.error(String(err));
				})
			},
			//生成合同
			generate() {
				console.log(this.itemCardList)
				if(!this.itemCardList.length) {
					this.$Message.error(this.$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5551'));
					return
				} else {
					let kcbNum = 0
					this.itemCardList.forEach(item => {
						if(item.type == 'kcb') {
							kcbNum = kcbNum + 1
						}
					})
					if(kcbNum == 0) {
						this.$Message.error(this.$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5551'));
						return
					}
				}
				if(this.isSave) { // 防止重复提交
					return
				}
				this.isSave = true;
				this.updateLoadingStatus({
					isLoading: true
				});
				const a = [this.$refs.generation.validate()];
				Promise.all(a).then((ok) => {
					const o = ok.every(item => item);
					if(!o) {
						this.updateLoadingStatus({
							isLoading: false
						});
						this.isSave = false;
						this.freeze = true;
						return this.$Message.error(this.$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5552'));
					}
					this.freeze = false;
                    console.log(123123123)
					this.dogen();
				}).catch(err => {
					this.isSave = false;
					this.freeze = true;
					this.updateLoadingStatus({
						isLoading: false
					});
					this.$Message.error(String(err));
				})
			},
			createNow() {
				let data = {
					previewId: this.previewData.previewId
				};
				this.dogen(data);
			},
			XQOk(data, officeId) {
				this.officeId = officeId;
				this.initPage();
			},
			dogen(payload) {
				this.formData.discountRemarks = (this.discountRemarks) + (this.discountRemarks && this.items.typeList.length ? '、' : '') + (this.items.typeList.length ? this.items.typeList.map(v => v.name+(v.type=='relief'?(this.items.exemptionPrice||0)+this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617'):'') + this.$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5533')).join('、') : '');
				this.updateLoadingStatus({
					isLoading: true
				});
				const data = payload ? payload : this.getPostData();
				if(this.$route.query.mid) {
					data.id = this.$route.query.mid;
				}
				if(this.officeId) {
					data.officeId = this.officeId;
				} else if(this.xqList.length === 1) {
					data.officeId = this.xqList[0].id;
				} else {
					this.$refs.xqmodel.modelShow()
				}
				// data.htContractData=null;
                console.log(data)
				if(data.htContractItemList&&data.htContractItemList.filter(v=>v.policyType.indexOf('kcb')!=-1).length > 5) {
					this.isSave = false;
					this.updateLoadingStatus({
						isLoading: false
					});
					return this.$Message.error(this.$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5553'));
				}
				htContract.save(data).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.$router.push({
							name: 'sign.myContract'
						});
					}
				}).catch(errors.call(this)).finally(() => {
					this.isSave = false;
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},
			getPostData() {
				const data = Object.assign({}, this.formData);
				data.tplId = this.info.id;
				data.name = this.info.name;
				// data.exemptionPrice = this.items.exemptionPrice;
				data.student.birthday = data.student.birthday ? (new Date(data.student.birthday)).format('yyyy-MM-dd') : '';
				if(this.studentId) {
					data.studentId = this.studentId;
				}
				if(this.itemCardList.length) {
					let iList = this.htContractItemList();
					const index = iList.findIndex(item => item.itemId === othersId);
					if(index > -1) {
						data.protocolCustom = iList[index].protocal;
						iList.splice(index, 1);
					}
					data.htContractItemList = iList;
				} else {
					data.htContractItemList = [];
				}
                let arr=[];
                this.items.policyIds.forEach(v => {
                	this.items.typeList.forEach(val => {
                		if(v == val.id) {
                			arr.push({
                				policyId: val.policyId,
                				itemId: v,
                				exemptionPrice: this.items.exemptionPrice || 0,
                				name: val.name,
                                ratio:val.ratio,
                				policyType: val.policyType,
                				policyName: val.policyName
                			});
                		}
                	});
                });
                this.otherItem.list.forEach(val => {
                    arr.push(val);
                });
                data.jsonData = {
                            exemptionPrice:this.items.exemptionPrice||0,
                            policyList:arr,
                        };
				return data;
			},
			getAllSubPromise() {
				if(this.$refs.disitem && this.$refs.disitem.length && this.itemCardList[0].policyData) {
					return this.$refs.disitem.map(item => {
						return item.validForm();
					})
				}
				return [];
			},
			restoreEdit(data) {
				const keys = ['student', 'signType', 'discountRemarks', 'remarks'];
				extendKey(keys, data, this.formData);
				console.log(this.formData, data)
				if(this.formData.student && this.formData.student.code) {
					this.$nextTick(() => {
						//						this.tryGetEc();
					});
				}

				let arr9 = [],
					arr11 = [],
					arr12 = [],
					arrayMain = [];

				arr9 = data.htContractItemList.filter(v => {
					return v.policyId == 9
				});
				arr11 = data.htContractItemList.filter(v => {
					return v.policyId == 11
				});
				arr12 = data.htContractItemList.filter(v => {
					return v.policyId == 12
				});
				this.itemCardList = [];
				arrayMain = [arr9, arr12, arr11];
				console.log(arrayMain,'arrayMain~~~~~~~~~')
                this.otherItem.preferential=arr12.map(v=>v.itemId);
				arrayMain.forEach((v, k) => {
					let it = {};
					let arr = [];
					if(k < 2) {
						v.forEach(item => {
							it = this.getCerPolicy(item.policyId);
							console.log(this.getCerPolicy(item.policyId), 'getCerPolicy', it)
							if(!it) {
								it = {};
							}
							let obj = extendKey(['jsonData', 'itemId', 'policyId', 'protocal', 'policyIds', 'payCount', 'costPrice', 'leaveNum', 'publicPrice', 'itemSubId', 'itemSubName', 'parentItemId', 'parentItemSubId', 'policyType','promotionAverage', 'itemName', 'policyName'], item, {});
							obj.costPrice = String(obj.costPrice);
							obj.policyIds = obj.policyIds ? obj.policyIds : '';
							obj.policyIds = obj.policyIds.length ? obj.policyIds.split(',') : [];
							arr.push(obj);
						})
						if(it.policyData) {
							it.policyData.list = arr;
						} else {}
						it.index = ++index;
						it.payCount = 0;
						console.log(it, 'it')
						if(it.policyData) {
							this.itemCardList.push(it);
						}
					} else {
						v.forEach(item => {
							if(item.exemptionPrice) {
								this.items.exemptionPrice = item.exemptionPrice;
							}
							this.items.policyIds.push(item.itemId)
							let discount = this.htPolicyList.find(item => item.id == 11).htItemList.find(v => v.id == item.itemId);
							if(discount) {
								this.items.typeList.push(discount);
							}
						})
					}
				})
				console.log(this.itemCardList)
				//				if(data.protocolCustom) {
				//					this.itemCardList.push({
				//						id: othersId,
				//						index: ++index,
				//						name: '其他',
				//						policyData: {
				//							itemId: othersId,
				//							protocal: data.protocolCustom
				//						},
				//						htItemList: [{
				//							productDesc: '自定义条款至少需要分总审批'
				//						}],
				//					});
				//				}
				this.$nextTick(() => {
					this.$refs.disitem && this.$refs.disitem.forEach(item => {
						if(item.setData) {
							// item.setData();
						}
					})
					this.onPolicyCheapChange();
				})
				this.getHtContractTplInfo(data.tplId);
			},
			getCerPolicy(policyId) {
				return this.htPolicyList.find(item => item.id == policyId);
			},
			startPolling(id) {
				t = setInterval(() => {
					sys.convertForm(id).then(valid.call(this)).then(res => {
						if(res.ok && res.data.data) {
							this.pdfInfo = res.data.data;
							if(res.data.data.status == '1') {
								this.stopPolling();
							}
						}
					}).catch(errors.call(this));
				}, 5000)
			},
			stopPolling() {
				clearInterval(t)
			},
			searchDropList(word) {
				return new Promise((resolve, reject) => {
					htContractNew.searchCtCusList({
						term: word
					}).then(valid.call(this)).then(res => {
						if(res.ok) {
							resolve(res.data.data);
						} else {
							reject(res);
						}
					}).catch(err => {
						errors.call(this);
						reject(err);
					});
				});
			},
			textChange(val) {
				if(!val.cusId) {
					return
				}
				htContractNew.searchStudent({
					term: val.cusId
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						let keys = ['student'];
						let obj = this.formData.student;
						this.formData.student = Object.assign({}, obj, res.data.data)
console.log('textChange')
                        if(this.$route.query.mid||this.$route.query.eid){
                        }else{
                            this.formData.signType=res.data.data.signType;
                        }
						if(!this.formData.student.comParentList.length) {
							this.formData.student.comParentList = [{
								isMain: 1,
								name: '',
								relation: '',
								phone: '',
								cellNumber: '',
								qq: '',
								weChat: '',
								email: '',
								remarks: ''
							}, ];
						}
						// extendKey(keys, res.data.data, this.formData);

                        this.$refs.stuEditModel.validatting();
					} else {
						// this.$Message.error(res.data.message);
					}
				}).catch(errors => {
					errors.call(this);
				});
			},
			studOk(obj) {
				/*/*/
				this.$refs.generation.resetFields();
				//				this.formData = Object.assign({}, this.formData, obj);
				this.formData.student = Object.assign({}, this.formData.student, obj);
				this.$refs.stuModel.close();
			},
			stuEditOk(obj) {
				this.formData.student = Object.assign({}, this.formData.student, obj);
				this.$refs.stuEditModel.close();
			},
			addStudent() {
				this.$refs.stuModel.modelShow();
			},
			editStudent() {
				this.$refs.stuEditModel.modelShow();
			},
			balance(discountRemarks, discountsPaidUp, totalPrice, contPrice) {
				this.discountRemarks = discountRemarks;
				this.formData.signPriceNew = contPrice;
				this.formData.price = totalPrice;
				this.contPrice = contPrice;
				this.discountsPaidUp = discountsPaidUp;
				this.items.realityPrice = discountsPaidUp;
				this.items.discountsPaidUp = discountsPaidUp;
				//				this.items.exemptionPrice = 0;
				//				this.items.policyIds = [];
				//				this.items.typeList = [];
				this.totalPrice = totalPrice;
				this.concessions(this.items);
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
				var n = !isFinite(+number) ? 0 : +number,
					prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
					sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
					dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
					s = '',
					toFixedFix = function(n, prec) {
						var k = Math.pow(10, prec);
						return '' + Math.round(n * k) / k;
					};

				s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
				var re = /(-?\d+)(\d{3})/;
				while(re.test(s[0])) {
					s[0] = s[0].replace(re, "$1" + sep + "$2");
				}

				if((s[1] || '').length < prec) {
					s[1] = s[1] || '';
					s[1] += new Array(prec - s[1].length + 1).join('0');
				}
				return s.join(dec);
			},
			policyChange(obj, o, id) {
				this.zdxmyhSearch = ''
				let discount = this.htPolicyList.find(item => item.id == 11).htItemList.find(item => item.id == id);
				let index = obj.indexOf(id);
				let flag = o.typeList.find(item => item.type == discount.type);
				if(discount.type == 'discount') {
					if(obj.length < 3) {
						obj.push(id);
						o.typeList.push(discount)
					}
				} else {
					if(index == -1) {
						if(!flag) {
							if(obj.length < 3) {
								obj.push(id);
								o.typeList.push(discount)
							}
						}
					} else {
						obj.splice(index, 1);
						o.typeList.splice(index, 1);
					}
				}
				if(discount.type == 'relief') {
					o.popVisible = true;
				}
				this.concessions(o);
			},
			concessions(o) {
				let privilege = o.typeList.sort((a, b) => {
					return a.levelSort - b.levelSort;
				})
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
					}
					if(v.type == "relief") {
						o.discountsPaidUp -= o.exemptionPrice;
					}
				})
				o.discountsPaidUp = String(o.discountsPaidUp);
				//				this.balance2(o);
			},
			closeTag(obj, id, ind, o) {
				let index = obj.indexOf(id)
				obj.splice(index, 1);
				o.typeList.splice(ind, 1);
				if(!o.typeList.find(oitem => oitem.type == 'relief')) {
					o.exemptionPrice = 0;
				}
				this.concessions(o);
			},
			//			balance2(o) {
			//				this.contPrice = o.costPrice;
			//			},
			balanceShow(val) {
				this.balanceVisible = !this.balanceVisible;
				let dom = document.querySelector('.sign_container .s-content');
				if(!this.balanceVisible) {
					if(this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()) {
						if(document.querySelector('.sign_contract_generation')) {
							document.querySelector('.sign_contract_generation').style.paddingBottom = "50px";
						}
						setTimeout(() => {
							dom.scrollTop = dom.scrollTop + 250;
						}, 50)
					}
				}
			},
			itemsClick() {
				this.items.visible = !this.items.visible;
				// let tags_boxWid = this.$el.querySelector(".balance .sale .tags_box").clientWidth;
				// this.$nextTick(() => {
				// 	this.$el.querySelector(".balance .sale .tags_box .ivu-dropdown .ivu-select-dropdown").style.width = tags_boxWid + 'px';
				// 	this.$el.querySelector(".balance .sale .tags_box .ivu-dropdown .ivu-select-dropdown").style.right = '0px !important';
				// 	this.$el.querySelector(".balance .sale .tags_box .ivu-dropdown .ivu-select-dropdown").style.left = 'auto !important';
				// 	this.$el.querySelector(".balance .sale .tags_box .ivu-dropdown .ivu-select-dropdown").style.top = '32px';
				// })
			},
			exemptionPriceOk(input, row) {
				let num = this.$refs[input][0].formatterValue;
				row.exemptionPrice = num;
				row.popVisible = false;
                this.concessions(row);
			},

            popperHide(row) {
            	row.popVisible = false;
            },
            preferential(val){
				let arr = [];
                let pList=this.htPolicyList.find(v=>v.type=='others');
                pList.htItemList.forEach(val=>{
                    this.otherItem.preferential.forEach(v => {
                        if(v==val.id){
                            arr.push({
                                itemId: v,
                                policyId: pList.id,
                                policyType: pList.type,
                                itemName: val.name || '',
                                policyName:pList.policyName,
                                jsonData:'',
                                protocal: '',
                                payCount: '',
                                promotionAverage:'',
                                costPrice: '',
                                discountsPaidUp: '',
                                leaveNum: 0,
                                policyIds: '',
                                publicPrice: '',
                                parentItemId: '',
                                parentItemSubId: '',
                                itemSubId: '',
                                itemSubName: '',
                                unitPrice:''
                            })
                        }

				})
                })

				this.otherItem.list = arr;
            },
            addCustomer(){
                this.$router.push({
                    name: "crm.leadsEntry",
                    query: {
                        source:"sign.contractGeneration",
                        officeId:this.officeId,
                        signId:this.$route.query.id
                    }
                })
            }
		},
		watch: {
			// screenWidth(val) {
			// 	this.screenWidth = val
			// 	let wid = this.$el.children[0].clientWidth;
			// 	this.$el.querySelector(".submit-btns").style.width = wid + 'px';
			// 	this.$el.querySelector(".dropdown_menu").style.width = wid + 'px';
			// 	let tags_boxWid = this.$el.querySelector(".balance .sale .tags_box").clientWidth;
			// 	// this.$el.querySelector(".balance .sale .tags_box .ivu-dropdown .ivu-select-dropdown").style.width = tags_boxWid + 'px';
			// }
		}
	}
</script>
