<style lang="less">
	.signManage {
		background: #FFFFFF;
		.descript {
			font-size: 12px;
			i,
			b {
				font-size: 18px;
				font-style: normal;
				font-weight: normal;
				color: #44bcb7;
			}
			b {
				color: red;
			}
		}
		.tableContent {
			.page {
				text-align: center;
				margin-top: 20px;
			}
		}
		.v_search_options .v_search_options_content .title {
			padding: 6px 0px 3px 0;
		}
		.ivu-dropdown-item {
			text-indent: 0;
			text-align: center;
		}
		
	}
	
	.cancleBorder {
		.ivu-table-wrapper {
			border: none;
			.ivu-table-cell{
				padding: 0;
			}
			.ivu-checkbox-wrapper{
				margin: auto;
			}
		}
		.ivu-table:after {
			content: '';
			width: 0px;
		}
		// .ivu-table-column-center {
		// 	background-color: #fff;
		// }
	}
	.history-GSX-new {
		.ivu-tooltip, .ivu-tooltip-rel {
			display: inline-block;
		}
	}
	.iviewLoading {
		.demo-spin-icon-load {
			animation: ani-demo-spin 1s linear infinite;
		}
		@keyframes ani-demo-spin {
			from {
				transform: rotate(0deg);
			}
			50% {
				transform: rotate(180deg);
			}
			to {
				transform: rotate(360deg);
			}
		}
		.ivu-spin-text {
			margin-left: 456px;
			margin-bottom: 80px;
			div {
				width: 100px;
				text-align: center;
			}
		}
	}
</style>
<template>
	<div class="signManage">
		<div class="signTitle">
			<Tabs @on-click="toggleSatus()" v-model="tabValue">
				<TabPane :label="$t('message_index_287')" name="name1"></TabPane>
				<TabPane :label="$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7296')" name="name2"></TabPane>
			</Tabs>
		</div>
		<v-select style="width: 396px;margin: 15px 0;" :placeholder="$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7297')" icon="search" :datafunc="datafunc" v-model="compact" @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select>
		<sign-tag-bar v-if="status" :title="$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7298')" :num="resNum" @getIndex="getResIndex" :controlledList="resList">
		</sign-tag-bar>
		<statistics-time :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1642')" v-show="resNum==0||resNum==1" :timeTitle="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1642')" v-if="isAdmin||isCeo" :dateType="dateType" :statisticsTimeList="statisticsTimeList" @upDateAnalyseSellDetail="upDateAnalyseSellDetail" @allDate="allDate" :currentTime="currentTime" :startTime="startTime" :endTime="endTime" :isFuture="isFuture" ref='componentStati'>
		</statistics-time>
		<statistics-time :placeholder="$t('principalmailbox_8')" v-show="resNum==0||resNum==2" :timeTitle="$t('principalmailbox_8')" v-if="isAdmin||isCeo" :dateType="dateType" :statisticsTimeList="statisticsTimeList" @upDateAnalyseSellDetail="upDateAnalyseSellDetail2" @allDate="allDate2" :currentTime="currentTime" :startTime="startTime2" :endTime="endTime2" :isFuture="isFuture" ref='componentStati2'>
		</statistics-time>
		<!--<v-search-option v-if="isAdmin||isCeo" @on-select-item="getControlledIds" :title="$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7301')" labelWidth="60" align="right" :controlledData="firm.countryList">
		</v-search-option>-->
		<!--<v-search-option v-if="isAdmin||isCeo" @on-select-item="getxqIds" :title="$t('modules_spoc_crm_web_src_views_performanceplan_modal_1478')" labelWidth="60" align="right" :controlledData="campus.countryList">
		</v-search-option>-->
		<v-search-options :data="campus.countryList" byKey="name" :searchTitle="campus.searchName" @on-select-item="getxqIds" labelWidth="69" multiple mgrt="6px" v-if="campus.countryList.length"></v-search-options>
		<div v-if="status">
			<p v-if="wayStatus" class="descript">{{$t('teachpush_slidecard_625')}}<i> {{attach.total}} </i>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7304')}}<b> {{attach.signPriceSum|filterWan}} </b>{{$t('modules_spoc_crm_web_src_views_performanceplan_modal_1482')}}<p v-else class="descript">{{$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7306')}}<i> {{attach.total}} </i>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7307')}}<b> {{attach.signPriceSum|filterWan}} </b>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7308')}}<i> {{attach.presentPriceCostSum|filterWan}} </i>{{$t('modules_spoc_crm_web_src_views_performanceplan_modal_1482')}}</p>
		</div>
		<v-title :title="$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7309')">
			<div slot="right">
				<Button style="width:120px; margin: 0 5px;border: 1px solid #999;" class="bt2" @click="model3=true">{{$t('modules_spoc_sign_web_src_views_contractmanage_components_exportinovicemodal_5627')}}</Button>
				<Button style="width:120px; margin: 0 5px;border: 1px solid #999;" v-if="signId" class="bt2" @click="batchScan">{{$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7311')}}</Button>
				<Dropdown trigger="click" @on-click="exportCurr">
					<!--<Button v-if="isBranchOfficeLeader" @click="signComplete('deleteAll')" style="width:86px;" type="primary" >{{$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1444')}}</Button>--> 
					<Button style="width:94px; margin: 0 5px;border: 1px solid #999;" class="bt2">{{$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5705')}}<Icon type="arrow-down-b"></Icon>
					</Button>
					<DropdownMenu slot="list">
						<DropdownItem :name="1">{{$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7314')}}</DropdownItem>
						<DropdownItem :name="0">{{$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7315')}}</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<Dropdown trigger="click" @on-click="exportKCB">
					<!-- <Button v-if="isBranchOfficeLeader" @click="signComplete('deleteAll')" style="width:86px;" type="primary" >{{$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1444')}}</Button> -->
					<Button style="width:94px; margin: 0 5px;border: 1px solid #999;" class="bt2">{{$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5707')}}<Icon type="arrow-down-b"></Icon>
					</Button>
					<DropdownMenu slot="list">
						<DropdownItem :name="1">{{$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7314')}}</DropdownItem>
						<DropdownItem :name="0">{{$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7315')}}</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<Button  @click="deleteSign=true" v-if="signId&&isAdmin" style="width:86px;color:#e8352c;border:1px solid #e8352c;" >{{$t('classlist_compontents_detailinfo_46')}}</Button>
			</div>
		</v-title>
		<div class="tableContent cancleBorder">
			<Table border @on-select-all="signSelectAll" @on-selection-change="signChange" v-if="status&&wayStatus" @on-filter-change="filterChange" :columns="columns" :data="data.list" @on-sort-change="onSortChange"></Table>
			<Table border @on-select-all="signSelectAll" @on-selection-change="signChange" v-if="status&&!wayStatus" @on-filter-change="filterChange" :columns="columns" :data="data.list" @on-sort-change="onSortChange"></Table>
			<Table border @on-select-all="signSelectAll" @on-selection-change="signChange" v-if="!status" :columns="columns" :data="data.list" @on-sort-change="onSortChange"></Table>
			<div class="page">
				<Page show-elevator show-total show-sizer @on-page-size-change="onPageSizeChange" :current="data.pageNo" :total="data.count" @on-change="onPageChange" v-if="data.count>10" :page-size-opts="[10,20, 50, 80, 100]"></Page>
			</div>
		</div>
		<Modal v-model="modal1" :title="$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7318')" @on-ok="transferOk" width='728' ok-:text="$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7318')" @on-cancel="cancel">
			<p style="text-align:center;font-size:16px;line-height:100px">{{$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7319')}}</p>
		</Modal>
		<Modal v-model="deleteSign" :title="$t('modules_spoc_sign_web_src_views_library_pact_pact_6614')" @on-ok="deleteSignOk" width='728' @on-cancel="deleteSignCancel">
			<p style="text-align:center;font-size:16px;line-height:100px">{{$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7321')}}</p>
		</Modal>
		<Modal v-model="model3" ref="modalHistory" :title="$t('modules_spoc_sign_web_src_views_contractmanage_components_exportinovicemodal_5627')" @on-ok="okHistory" width='728' @on-cancel="cancelHistroy" class="history-GSX-new">
			<div style="over-flow:hidden">
				<span style="color:#b8b8b8;line-height:100px">{{$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7322')}}</span> 
				<DatePicker type="date" style="width: 178px" @on-change='historyStartChange' :value="exportStartDate"></DatePicker>
				　<span style="border-top: 2px solid #44bcbc;display: inline-block;width: 15px;"></span>　
				<DatePicker type="date" style="width: 178px" @on-change='historyEndChange' :value="exportEndDate"></DatePicker>
				<Tooltip :content="$t('modules_spoc_sign_web_src_views_contractmanage_components_exportinovicemodal_5630')" placement="top">
					<Icon type="ios-information-outline" size="25" style="vertical-align:middle;margin:0 5px 5px" color="#ffaa49"></Icon>
    			</Tooltip>
				<Button type="primary" @click="exportAllInvoive">{{$t('modules_spoc_sign_web_src_views_contractmanage_components_exportinovicemodal_5631')}}</Button>
				
			</div>
		</Modal>
		<Modal v-model="modal2" :title="dialogTittle" @on-ok="addBarOk" width='728' ref="modal2" @on-cancel="cancel">
			<div v-if="dialogTittle==$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7325')" style="padding-left:45px;">
				<Button type="primary" @click="onUploadLocal">{{$t('modules_spoc_sign_web_src_views_contractmanage_components_scannedupload_5645')}}</Button>
				<p>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7327')}}</p>
				<div v-if="file.name">
					<span style="margin-left:11px">{{$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7329')}}</span>
					<a>{{file.name}}</a> <span @click="deleteFile" style="margin-left:11px;color:red;cursor:pointer">{{$t('classlist_compontents_detailinfo_46')}}</span>
				</div>
				<p>
					<span style="position: relative; top: 20px">{{$t('views_staff_components_lefttree_648')}}</span>
					<div style="margin-left: 85px">
						<Input v-model="textareaText" type="textarea" :rows="4" placeholder="Enter something..."></Input>
					</div>
				</p>
				<div v-if="loadingStatus" class="iviewLoading">
					<Col class="demo-spin-col" span="8">
					<Spin fix>
						<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
						<div>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7331')}}</div>
					</Spin>
					</Col>
				</div>
			</div>
			<div v-if="dialogTittle==$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7332')">
				<p>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7333')}}<DatePicker v-model="finishDate" format="yyyy-MM" type="month" transfer :placeholder="$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7334')" style="width: 130px"></DatePicker>
				</p>
				<p style="margin-top:10px;">{{$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7335')}}</p>
			</div>
		</Modal>
		<role-people @fresh="offrole" ref="rolepeople">
		</role-people>
		<up-to-pan ref="uptopan" :remarks='textareaText' :studentId="ecId" :prehook="prehook" :object-id="objId" dir="" :format="['docx','pdf','doc']" type="business" fileType="all" @uploadok="onUploadOk" menuId=201/>
		</up-to-pan>
		<!-- 新增对话框 -->
		
			<add-invoice
				ref="invoiceModel"
				:isShowinfor='isShowinfor'
				@updataTable='updataTable'
				from='admin'
			>
			</add-invoice>
	</div>
	</div>
</template>
<script>
	import addInvoice from '../../modules/addInvoice'
	import vSelect from "../../modules/vSelect"
	import vTitle from "@public/modules/vTitle";
	import upToPan from '@public/modules/upToPan'
	import rolePeople from '@public/modules/rolePeopleRadio';
	import vSearchOptions from "../../modules/vSearchOptions";
	import vSearchOption from "../../modules/vSearchOption";
	import statisticsTime from "../../modules/statisticsTime1"
	import signTagBar from "./signTagBar"
	import valid, {
		errors,
		invoice,
		htContract,
		common,
		uploadToPanUrl,
		sysOffice
	} from "../../libs/request"
	import { mapMutations, mapState, mapGetters, } from "vuex";
	export default {
		data() {
			return {
				exportStartDate: `${new Date(new Date().getTime()).format('yyyy-MM')}-01`,
				exportEndDate: new Date(new Date().getTime()).format('yyyy-MM-dd'),
				isShowinfor: true,
				model3: false,
				deleteSign: false,
				ecId: '',
				objId: '',
				momentTemp: '',
				isFuture: true,
				dialogTittle: '',
				attach: '',
				finishDate: '',
				signId: '',
				orderBy: '',
				ids: '',
				compact: '',
				companyIds: '',
				textareaText: '',
				timeType: 3,
				startTime: '',
				startTime2: '',
				endTime: '',
				endTime2: '',
				beforeTime: '',
				afterTime: '',
				isPartner: '',
				currentTime: '',
				titleTime: '',
				tempStatus: '',
				uploadResole: '',
				controlledIndex: '',
				isArchived: '',
				wayNum: 0,
				resNum: 0,
				timeNum: 0,
				uploadStatus: false,
				modal2: false,
				modal1: false,
				file: {},
				loadingStatus: false,
				status: true,
				wayStatus: true,
				tabValue: 'name1',
				signStatus: '',
				controlledMsg: [],
				controlledList: [],
				resList: [this.$t('message_index_287'), this.$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4485'), this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6640')],
				wayList: [this.$t('message_index_287'), this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7338'), this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6709')],
				statisticsTimeList: [this.$t('message_index_287'), this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7340'), this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7341'), this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7342')],
				dateType:{
					format:'yyyy-MM-dd',
					type:'date'
				},
				isShowNum: true,
				firm: {
					searchName: this.$t('modules_spoc_sign_web_src_views_discount_discounttabother_6398'),
					countryList: [],
				},
				campus: {
					searchName: this.$t('views_coursepack_coursepack_384'),
					countryList: [],
				},
				columns: [{
						type: "selection",
						width: 36,
						align: "center"
					},
					{
						title: this.$t('modules_spoc_sign_web_src_views_approval_approvalnew_5071'),
						align: "left",
						ellipsis:true,
						minWidth:150,
						resizable: true,
						width: null,
						render: (h, params) => {
							return h('div', {
							}, [
								h('a', {
									style: {
										color: '#3b9ad1',
										cursor: 'pointer',
									},
									on: {
										click: () => {
											this.$router.push({
												name: "sign.pactPreview",
												query: {
													id: params.row.id
												}
											});
										}
									}
								}, this.isShowNum ? params.row.signTime ? params.row.no || params.row.code: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6640') : this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6640')),
								h('i', {
									'class': {
										'iconfont': true,
										'icon-wenjianjia': true
									},
									style: {
										color: '#3b9ad1',
										fontSize: '14px',
										display: params.row.isProtocol == 1 ? '' : 'none'
									}
								}, '')
							])
						},
					},
					{
						title: this.$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4476'),
						key: "ur.name",
						sortable: "custom",
						minWidth:80,
						align: "left",
						resizable: true,
						width: null,
						render: (h, params) => {
							return h('span', params.row.sellerName)
						}
					},
					{
						title: this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7347'),
						key: "xqName",
						align: "left",
						minWidth:100,
						resizable: true,
						width: null,
					},
					{
						title: this.$t('principalmailbox_8'),
						key: "a.create_date",
						sortable: "custom",
						align: "left",
						minWidth:100,
						resizable: true,
						width: null,
						render: (h, params) => {
							return h('span', params.row.createDate?(new Date(params.row.createDate)).format('yyyy-MM-dd'):'NaN')
						}
					},
					{
						title: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1642'),
						key: "sign.sign_time",
						sortable: "custom",
						align: "left",
						minWidth:100,
						resizable: true,
						width: null,
						render: (h, params) => {
							return h('span', params.row.htSign.signTime?(new Date(params.row.htSign.signTime)).format('yyyy-MM-dd'):'--')
						}
					},
					{
						title: this.$t('modules_spoc_report_web_src_views_generationleadsreport_index_4608'),
						align: "left",
						key: "signTypeName",
						minWidth: 70,
						resizable: true,
						width: null,
						filters: [{
								label: this.$t('modules_spoc_portal_views_contractmanage_contractmanage_3403'),
								value: 'new'
							},
							{
								label: this.$t('modules_spoc_report_web_src_views_refundreport_index_4671'),
								value: 'replenish'
							},
							// {
							// 	label: '再次续签',
							// 	value: 'again'
							// },
						],
						filterMultiple: false,
						filterRemote() {

						}
					},
					{
						title: this.$t('memberlist_memberlist_257'),
						key: "studentName",
						align: "left",
						minWidth:100,
						resizable: true,
						width: null,
					},
// 					{
// 						title: "学员编号",
// 						key: "ecId",
// 						align: "left",
// 						minWidth:100,
// 						render: (h, params) => {
// 							return h(
// 								"div", {
// 									props:{
// //										content:params.row.ecId
// 									}
// 								},
// 								params.row.ecId
// 							);
// 						}
// 					},
					{
						title: this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7352'),
						key: "price",
						sortable: "custom",
						align: "right",
						minWidth:100,
						resizable: true,
						width: null,
						render: (h, params) => {
							return h(
								"div", {
									style:{
										'padding-right':'10px'
									}
								},
								parseFloat(params.row.price).toFixed(2)
							);
						}
					},
					{
						title: this.$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4477'),
						key: "sign.sign_price",
						align: "right",
						sortable: "custom",
						minWidth:100,
						resizable: true,
						width: null,
						render: (h, params) => {
							return h(
								"div", {
									style:{
										'padding-right':'15px'
									}
								},
								parseFloat(params.row.htSign.signPrice).toFixed(2)
							);
						}
					},
					{
						title: this.$t('modules_spoc_jw_web_src_views_models_2936'),
						align: "center",
						key: "labelStatus",
						minWidth:100,
						resizable: true,
						width: null,
						filters: [{
								label: this.$t('modules_spoc_portal_views_selfcentred_feedback_3905'),
								value: 1
						},{
								label: this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7356'),
								value: 2
						},{
								label: this.$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4485'),
								value: 3
						},
						],
						filterMultiple: false,
						filterRemote() {}
					},
					{
						title: this.$t('classlist_compontents_detailinfo_45'),
						className: 'opation',
						align: "left",
						minWidth: 160,
						resizable: true,
						width: null,
						render: (h, params) => {
							return h("div",{
								style:{
									// width:'100px',
									// overflow:'hidden',
									// margin:''
								}
							}, [
								h(
									"a", {
										style: {
											// 'float': "left",
//											marginRight: "10px",
											display: params.row.status != 'finished' ? 'inline-block' : 'none',
										},
										on: {
											click: () => {
												this.log(params.row.id);
											}
										}
									},
									this.$t('principalmailbox_16')
								),
								h(
									"a",

									{
										style: {
											// 'float':"right",
											display: 'inline-block',
											width: '49px',
											marginLeft: "10px",
										},
										on: {
											click: () => {
												this.isShowinfor = params.row.invoiceStatus == 1 ? false : true;
												this.$refs.invoiceModel.show(params.row)
											}
										}
									},
									params.row.invoiceStatus == 1 ? this.$t('modules_spoc_sign_web_src_modules_addinvoice_4781') : this.$t('modules_spoc_sign_web_src_modules_pactcard_4874')
								),
								h(
									"a",

									{
										style: {
											// 'float':"right",
											marginLeft: "10px",
											display: params.row.isArchived == 1 ? 'inline-block' : 'none',
										},
										on: {
											click: () => {
												this.downSign(params.row.id);
											}
										}
									},
									this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5728')
								),
								
								//							h(
								//								"a",
								//								{
								//									style: {
								//									marginLeft: "10px",
								//									display: params.row.status != 'finished' ? 'inline-block': 'none',
								//								},
								//									on: {
								//										click: () => {
								//											this.transfer(params.row);
								//										}
								//									}
								//								},
								//								"转让"
								//							),
								//							h(
								//								"a",
								//								{	
								//									style: {
								//									marginLeft: "10px",
								//									},
								//									on: {
								//										click: () => {
								//											this.replenish(params.row);
								//										}
								//									}
								//								},
								//								"补充"
								//							),
							]);
						}
					}
				],
				listParams: {
					sort: "asc",
					pageNo: "1",
					pageSize: "10",
					cnName: ""
				},
				data: {
					pageNo: 1,
					list: []
				},
				columns1: [{
						type: "selection",
						width: 60,
						align: "center"
					},
					{
						title: this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7362'),
						align: "left",
						resizable: true,
						width: null,
						render: (h, params) => {
							return h('div', {}, [
								h('a', {
									style: {
										color: '#3b9ad1',
										cursor: 'pointer',
									},
									on: {
										click: () => {
											this.$router.push({
												name: "sign.pactPreview",
												query: {
													id: params.row.id
												}
											});
										}
									}
								}, params.row.no),
								h('i', {
									'class': {
										'iconfont': true,
										'icon-wenjianjia': true
									},
									style: {
										color: '#3b9ad1',
										fontSize: '14px',
										display: params.row.isProtocol == 1 ? '' : 'none'
									}
								}, '')
							])
						},
					},
					{
						title: this.$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4476'),
						key: "ur.name",
						sortable: "custom",
						align: "left",
						resizable: true,
						width: null,
						render: (h, params) => {
							return h('span', params.row.reportedUser.name || '0')
						}
					},
					{
						title: this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7352'),
						key: "price",
						sortable: "custom",
						align: "right",
						resizable: true,
						width: null,
						render: (h, params) => {
							return h(
								"div", {},
								parseFloat(params.row.price).toLocaleString()
							);
						}
					},
					{
						title: this.$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4477'),
						key: "sign.sign_price",
						align: "left",
						sortable: "custom",
						resizable: true,
						width: null,
						render: (h, params) => {
							return h(
								"div", {},
								parseFloat(params.row.htSign.signPrice).toLocaleString()
							);
						}
					},
					{
						title: this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7363'),
						align: "left",
						key: "sign.derate_price",
						sortable: "custom",
						resizable: true,
						width: null,
						render: (h, params) => {
							return h(
								"div", {},
								parseFloat(params.row.htSign.deratePrice).toLocaleString()
							);
						}
					},
					{
						title: this.$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6163'),
						align: "left",
						key: 'sign.present_price_cost',
						sortable: "custom",
						resizable: true,
						width: null,
						render: (h, params) => {
							return h(
								"div", {},
								parseFloat(params.row.htSign.presentPriceCost).toLocaleString()
							);
						}
					},
					{
						title: this.$t('classlist_compontents_detailinfo_45'),
						align: "left",
						resizable: true,
						width: null,
						// width: 171,
						render: (h, params) => {
							return h("div", [
								h(
									"a", {
										on: {
											click: () => {
												this.downSign(params.row.id);
											}
										}
									},
									this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5728')
								),
								h(
									"a", {
										style: {
											margin: "0 3px"
										},
										'style': {
											display: params.row.status == 'signed' ? 'none' : 'inline-block',
											marginLeft: '8px',
										},
										on: {
											click: () => {
												this.downReceipt(params.row.id);
											}
										}
									},
									this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7365')
								)
							]);
						}
					}
				],
				data2: [],
				pageSize: 10,
				pageNo: 1,
				signTime: '',
				signType: '',
				xqIds: ''
			}
		},

		components: {
			addInvoice,
			vSelect,
			vTitle,
			vSearchOptions,
			vSearchOption,
			statisticsTime,
			signTagBar,
			rolePeople,
			upToPan
		},

		computed: {
			...mapGetters('sign', ['isAdmin', 'isCeo']),
			...mapGetters('sign', ['isBranchOfficeLeader']),
			uploadToPan: function() {
				return sysAttachment.uploadToPanUrl();
			},
		},

		beforeCreate() {},

		mounted() {
			this.getSignManageList('first');
			this.getControlledMsg();
			this.getCampusList();
		},

		methods: {
			...mapMutations(['updateLoadingStatus']),

			batchScan(){
				this.downSign(this.signId);
			},
			updataTable() {
				this.getSignManageList()
			},

			getSignManageList(type = {}) {
				this.updateLoadingStatus({isLoading:true});
				// if(this.startTime == this.endTime && this.endTime == this.currentTime) {
				// 	this.startTime = this.endTime = ''
				// }
				let obj = {
					name: this.compact,
					isArchived: this.isArchived,
					status: this.signStatus,
					timeType: this.timeType,
					signStartDate: this.startTime,
					createStartDate: this.startTime2,
					signEndDate: this.endTime,
					createEndDate: this.endTime2,
					isPartner: this.isPartner,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					orderBy: this.orderBy,
					from: '2',
					timePrecision: 'month',
					signType: this.signType,
					signTime: this.signTime,
					xqIds: this.xqIds,
					companyIds: this.companyIds
				}

				//			if(this.isAdmin) {
				obj = Object.assign(obj, {
					companyIds: this.companyIds,
				})
				//			}

				htContract.list(obj).then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.data = res.data.data
							this.attach = res.data.data.attach
							if(type === 'first') {
								this.currentTime = `${res.data.data.attach.newDate.substr(0,7)}-01`
								this.timeType = 2
							}
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({isLoading:false});});
			},

			getSignManageListSave(type = {}) {
				this.updateLoadingStatus({isLoading:true});
				let obj = {
					name: this.compact,
					from: '2',
					orderBy: this.orderBy,
					pageSize: this.pageSize,
					pageNo: this.pageNo,
					signStartDate: this.startTime,
					createStartDate: this.startTime2,
					signEndDate: this.endTime,
					createEndDate: this.endTime2,
					isArchived: this.isArchived,
					xqIds: this.xqIds,
					timeType: 3,
				}

				//			if(this.isAdmin) {
				obj = Object.assign(obj, {
					companyIds: this.companyIds,
				})
				//			}

				htContract.list(obj).then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.data = res.data.data
							this.attach = res.data.data.attach
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({isLoading:false});});
			},

			getControlledMsg() {
				let params1 = {
					type: 2
				}
				sysOffice.officeList(params1).then(valid.call(this)).then(res => {
					if(res.ok) {
						let data = res.data.data.allCompany;
						//					data.unshift({
						//						id: '',
						//						name: "全部"
						//					});
						this.firm.countryList = data;
						//					console.log(this.firm)
					}
				}).catch(errors.call(this));
			},
			getCampusList(val) {
//				let params = {
//					parentIds: val ? val : 0
//				}
				htContract.getXq().then(valid.call(this)).then(res => {
					if(res.ok) {
						this.campus.countryList = res.data.data;
						this.campus.countryList.unshift({id:'',name:this.$t('message_index_287')});
					}
				}).catch(errors.call(this));
			},
			textChange() {
				this.getSignManageList()
			},

			upDateAnalyseSellDetail(obj) {
				this.startTime = obj[0]
				this.endTime = obj[1]
//				this.getSignManageList()
				if(this.tabValue == 'name1') {
					this.getSignManageList()
					return
				}

				if(this.tabValue == 'name2') {
					this.getSignManageListSave()
					return
				}
			},

			upDateAnalyseSellDetail2(obj) {
				this.startTime2 = obj[0]
				this.endTime2 = obj[1]
//				this.getSignManageList()
				if(this.tabValue == 'name1') {
					this.getSignManageList()
					return
				}

				if(this.tabValue == 'name2') {
					this.getSignManageListSave()
					return
				}
			},

			allDate() {
				this.startTime = this.endTime = ''
//				this.getSignManageList()
				if(this.tabValue == 'name1') {
					this.getSignManageList()
					return
				}

				if(this.tabValue == 'name2') {
					this.getSignManageListSave()
					return
				}
			},

			allDate2() {
				this.startTime2 = this.endTime2 = ''
//				this.getSignManageList()
				if(this.tabValue == 'name1') {
					this.getSignManageList()
					return
				}

				if(this.tabValue == 'name2') {
					this.getSignManageListSave()
					return
				}
			},

			getResIndex(index) {
				this.resNum = index
				if(index == 0) {
					this.signStatus = ''
					this.wayStatus = true
					this.statisticsTimeList = [this.$t('message_index_287'), this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7340'), this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7341'), this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7342')]
					this.timeType = 3
					if(this.momentTemp == 0 || this.momentTemp == 1) {
						this.isPartner = this.momentTemp
					}
					this.isFuture = true
				}

				if(index == 1) {
					this.signStatus = 'signed,accounted,collected,refund,archived,finished'
					this.wayStatus = true
					this.statisticsTimeList = [this.$t('message_index_287'), this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7340'), this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7341'), this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7342')]
					this.timeType = 2
					if(this.momentTemp == 0 || this.momentTemp == 1) {
						this.isPartner = this.momentTemp
					}

					this.isFuture = true
				}

//				if(index == 2) {
//					this.signStatus = 'committed,checked'
//					this.wayStatus = false
//					this.statisticsTimeList = ['全部', '当前月', '未来3个月', '未来6个月']
//					this.timeType = 1
//					this.timeNum = 0
//					this.momentTemp = this.isPartner
//					this.isPartner = ''
//					this.isFuture = false
//				}
				this.isShowNum = true
				if(index == 2) {
					this.signStatus = 'committed,checked'
					this.wayStatus = false
					this.statisticsTimeList = [this.$t('message_index_287'), this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7340'), this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7341'), this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7342')]
					this.timeType = 1
					this.timeNum = 0
					this.momentTemp = this.isPartner
					this.isPartner = ''
					this.isFuture = true
					this.isShowNum = false
				} 
				this.startTime = this.endTime = ''
				this.$refs.componentStati&&this.$refs.componentStati.setReset(0)
				this.startTime2 = this.endTime2 = ''
				this.$refs.componentStati2&&this.$refs.componentStati2.setReset(0)
				if(this.tabValue == 'name1') {
					this.getSignManageList()
					return
				}

				if(this.tabValue == 'name2') {
					this.getSignManageListSave()
					return
				}
			},

			getWayIndex(index) {
				this.wayNum = index
				this.isPartner = index - 1 < 0 ? '' : index - 1
				this.getSignManageList()
			},

			toggleSatus() {
				this.isShowNum = true
				this.pageSize = 10
				this.pageNo = 1
				this.startTime='';
				this.startTime2='';
				this.endTime='';
				this.endTime2='';
				this.resNum=0;
				this.signStatus = ''
				this.$refs.componentStati&&this.$refs.componentStati.setReset(0);
				this.$refs.componentStati2&&this.$refs.componentStati2.setReset(0);
				this.isArchived = this.tabValue == 'name1' ? '' : 1;
				this.status = this.tabValue == 'name1' ? true : false;
				if(this.tabValue == 'name1') {
					this.signStatus = this.tempStatus
					this.getSignManageList()
					return
				}

				if(this.tabValue == 'name2') {
					this.tempStatus = this.signStatus
					this.signStatus = ''
					this.getSignManageListSave()
					return
				}

			},

			onPageSizeChange(val) {
				this.pageSize = val
				if(this.tabValue == 'name1') {
					this.getSignManageList()
					return
				}
				this.getSignManageListSave()
			},

			onPageChange(val) {
				this.pageNo = val
				if(this.tabValue == 'name1') {
					this.getSignManageList()
					return
				}
				this.getSignManageListSave()
			},

			onSortChange(obj) {
				if(obj.order == 'normal') {
					this.orderBy = ''
				} else {
					this.orderBy = `${obj.key} ${obj.order}`
				}

				if(this.tabValue == 'name1') {
					this.getSignManageList()
					return
				}

				if(this.tabValue == 'name2') {
					this.getSignManageListSave()
					return
				}
			},

			transfer(signId) {
				this.modal1 = true;
				this.signId = signId.id
			},

			replenish(obj) {
				this.ecId = obj.ecId
				this.objId = obj.id
				this.dialogTittle = this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7325')
				this.modal2 = true;
			},

			signComplete(val) {
				this.dialogTittle = this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7332')
				this.modal2 = true;
				if(val === 'deleteAll') {
					if(!this.signId.length) {
						this.$Message.warning(this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7366'))
						return
					}
					this.ids = this.signId
					return
				}
				this.ids = val
			},

			transferOk() {
				this.$refs.rolepeople.show();
			},

			cancel() {

			},

			log(index) {
				this.$emit('jump', {
					name: 'sign.signManageDetail',
					query: {
						signNumber: index
					}
				})
			},

			offrole(val) {
				this.signTransfer(val[0].id)
			},

			signTransfer(transferId) {
				let obj = {
					id: this.signId,
					sellerId: transferId
				}
				htContract.attornContract(obj).then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.$Message.success(this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7367'))
							this.getSignManageList()
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},

			addBarOk() {
				if(this.dialogTittle == this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7325')) {
					this.uploadImg()
					return
				}

				if(this.dialogTittle == this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7332')) {
					this.finishSign()
				}

			},

			uploadImg() {
				if(!this.file.name) {
					this.$refs.modal2.visible = true
					this.modal2 = true
					this.$Message.info(this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7368'))
					return
				}

				this.$refs.uptopan.doUploadFile(this.file)
			},

			prehook(f, val) {
				this.file = f
			},

			finishSign() {
				if(!this.finishDate) {
					this.$Message.warning(this.$t('modules_spoc_core_web_src_views_staff_components_staffdynamic_302'))
					return
				}
				let [month, year] = this.finishDate.toString().match(/\d+/g)
				let obj = {
					ids: this.ids,
					finishDate: `${year}-${month}-00 00:00:00`,
				}
				htContract.finishContract(obj).then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.$Message.success(this.$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1028'))
							this.getSignManageList()
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},

			deleteFile() {
				this.file = {};
			},

			onUploadLocal() {
				this.$refs.uptopan.doUpload()
			},

			onUploadOk(data) {
				if(data.status == "success") {
					this.textareaText = ''
					this.$Message.success(data.message);
					this.file = {}
				} else {
					this.$Message.error(data.message);
				}
			},

			signChange(obj) {
				this.getSignIds(obj)
			},

			signSelectAll(obj) {
				this.getSignIds(obj)
			},

			getSignIds(obj) {
				this.signId = ''
				let str = ''
				if(obj.length == 0) {
					return
				}

				obj.forEach(item => {
					str += item.id + ','
				})
				this.signId = str.substr(0, str.length - 1)

			},

			deleteSignCancel() {},

			deleteSignOk() {

				let obj = {
					id: this.signId
				}

				htContract.delete(obj).then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.$Message.success(this.$t('scoretemplate_compontents_scoremodify_549'))
							this.signId = ''
							this.getSignManageList()
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},

			filterChange(val) {
				let key = val._filterChecked[0]
				switch(key) {
					case 1:
						this.signStatus = 'committed';
						break;
					case 2:
						this.signStatus = 'checked';
						break;
					case 3:
						this.signStatus = 'signed';
						break;
					default:
						this.signStatus = '';
				}
				switch(key) {
					case 'new':
						this.signType = 'new';
						break;
					case 'replenish':
						this.signType = 'replenish';
						break;
					case 'again':
						this.signType = 'again';
						break;
					default:
						this.signType = '';
				}
				this.isArchived = ''
				this.getSignManageList()
			},

			// 下载合同
			downSign(val) {
				let obj = {
					templateName: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6943'),
					objectId: val,
					type: 'HT_CONTRACT_SCAN'
				}
				window.open(htContract.downloadSignReceipt(obj))
			},

			// 下载收据
			downReceipt(val) {
				let obj = {
					templateName: this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7373'),
					objectId: val,
				}
				window.open(htContract.downloadSignReceiptPut(obj))
			},

			exportCurr(val) {
				let obj = {
					ids: this.signId,
					isArchived: this.isArchived,
				}
				if(val == 1) {
					if(!this.signId.length) {
						this.$Message.error(this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7374'));
					} else {
						if(this.signStatus === 'committed,checked') {
							window.open(htContract.exportSelectContract(obj))
						} else {
							window.open(htContract.exportSelectContract(obj))
						}
					}
				} else {
					let obj1 = {
						name: this.compact,
						isArchived: this.isArchived,
						status: this.signStatus,
						timeType: this.timeType,
						signStartDate: this.startTime,
						createStartDate: this.startTime2,
						signEndDate: this.endTime,
						createEndDate: this.endTime2,
						isPartner: this.isPartner,
						orderBy: this.orderBy,
						from: '2',
						timePrecision: 'month',
						companyIds: this.companyIds,
					};
					console.log(obj1)
					window.open(htContract.exportContract(obj1))
				}
			},
			exportKCB(val) {
				let obj = {
					ids: this.signId,
					isArchived: this.isArchived,
				}
				if(val == 1) {
					if(!this.signId.length) {
						this.$Message.error(this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7374'));
					} else {
						if(this.signStatus === 'committed,checked') {
							window.open(htContract.exportSelectKCB(obj))
						} else {
							window.open(htContract.exportSelectKCB(obj))
						}
					}
				} else {
					let obj1 = {
						name: this.compact,
						isArchived: this.isArchived,
						status: this.signStatus,
						timeType: this.timeType,
						signStartDate: this.startTime,
						createStartDate: this.startTime2,
						signEndDate: this.endTime,
						createEndDate: this.endTime2,
						isPartner: this.isPartner,
						orderBy: this.orderBy,
						from: '2',
						timePrecision: 'month',
						companyIds: this.companyIds,
					}
					window.open(htContract.exportKCB(obj1))
				}
			},

			datafunc(val) {
				return new Promise((resole, reject) => {

				})
			},

			getControlledIds(ids) {
				this.companyIds = ids
				this.getCampusList(ids);
				if(this.tabValue == 'name1') {
					this.getSignManageList()
					return
				}
				if(this.tabValue == 'name2') {
					this.getSignManageListSave()
					return
				}
			},

			getxqIds(ids) {
				let arr=[];
				ids.childTags.forEach(item=>{
					arr.push(item.id);
				})
				this.xqIds = arr.join(',');
				if(this.tabValue == 'name1') {
					this.getSignManageList();
				}
				if(this.tabValue == 'name2') {
					this.getSignManageListSave();
				}
			},

			historyStartChange(val) {
				this.exportStartDate = val
			},

			historyEndChange(val) {
				this.exportEndDate = val
			},

			cancelHistroy() {

			},

			okHistory() {
					console.log(this.exportStartDate ,this.exportEndDate)
				if (!this.exportStartDate || !this.exportEndDate) {
					this.$refs.modalHistory.visible = true
					this.model3 = true
					this.$Message.error(this.$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7375'))
					return	
				}
				let obj = {
					startTime: this.exportStartDate,
					endTime: this.exportEndDate,
					isArchived: this.isArchived,
					name: '',
					status: this.signStatus,
					isPartner: '',
					orderBy: '',
					from: '',
					companyIds: '',
				}
				
				window.open(invoice.exportInvoiceHistory(obj))
			},

			exportAllInvoive() {
				this.model3 = false
				let obj = {
					startTime: '',
					endTime: '',
					name: this.compact,
					isArchived: this.isArchived,
					status: this.signStatus,
					isPartner: this.isPartner,
					orderBy: this.orderBy,
					from: '2',
					companyIds: this.companyIds,
				}
				window.open(invoice.exportInvoiceHistory(obj))

			},
		},
		filters: {
			filterWan: function(value) {
				if(!value) return '0'
				let val = value.toFixed(0) / 10000
				return val
			},
		}
	}
</script>