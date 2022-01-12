<style lang="less">
	.coursePack {
		.ivu-table-cell {
			padding-left: 5px;
			padding-right: 5px;
		}
		.tableArea {
			margin-top: 10px;
			width: 100%;
			background: rgba(255, 255, 255, 1);
			border-radius: 4px;
			padding: 0 16px;
			.tableName {
				height: 60px;
				padding-bottom: 12px;
				position: relative;
				.name {
					font-size: 16px;
					font-weight: bold;
					color: rgba(73, 80, 96, 1);
					position: absolute;
					left: 16px;
					bottom: 12px;
				}
				.myButton {
					position: absolute;
					right: 0;
					bottom: 12px;
				}
			}
			.myPage {
				text-align: center;
				padding: 16px 0;
			}
		}
	}
	
	.coursePackCreateModal {
		.ivu-modal-body {
			padding: 24px;
			font-size: 12px;
			line-height: 1.5;
		}
		.ivu-checkbox-group-item {
			display: inline-block;
			width: 150px;
		}
		.w50 {
			display: inline-block;
			width: 50%;
		}
		.w100 {
			display: inline-block;
			width: 100%
		}
		.syxqsz {
			width: 752px;
			background: rgba(250, 250, 250, 1);
			border-radius: 4px 4px 0px 0px;
			border: 1px solid rgba(232, 232, 232, 1);
			font-size: 12px;
			font-weight: bold;
			color: rgba(73, 80, 96, 1);
			/* .quickSet, .syxqszHeader, .xqSet{ */
			.quickSet,
			.xqSet {
				border-bottom: 1px solid rgba(232, 232, 232, 1);
			}
			.xqSet {
				background: #fff;
			}
			.xqSet:first-child {
				border-bottom: 1px solid rgba(232, 232, 232, 1);
			}
			.xqSet:last-child {
				border-bottom: none;
			}
			.xqSet:hover {
				background: #E3F2FD;
			}
			.d1 {
				width: 126px;
				display: inline-block;
				line-height: 50px;
				height: 50px;
				padding-left: 16px;
			}
			.d2,
			.d3,
			.d4,
			.d5,
			.d6 {
				line-height: 50px;
				height: 50px;
				width: 106px;
				margin-right: 20px;
				display: inline-block;
			}
			.d6 {
				margin: 0;
			}
		}
		.des {
			margin: 10px 0 0 16px;
			width: 483px;
			height: 20px;
			font-size: 12px;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			line-height: 20px;
		}
		.yhzc {
			margin-top: 10px;
			.ivu-select-multiple .ivu-tag {
				width: 32%;
			}
			.ivu-tag-text {
				display: inline-block;
				width: 87%;
			}
		}
		.w250p {
			width: 250px;
		}
	}
</style>
<template>
	<div class="coursePack">
		<v-search-collapse @search="getCourseList" @reset="resetSearch" @changeDivHeight="changeDivHeight">
			<DatePicker type="daterange" separator=" ~ " placement="top-start" v-model="salerDateSearch" :placeholder="$t('views_coursepack_coursepack_356')" style="width: 200px;"></DatePicker>
			<Select v-model="officeIds" :placeholder="$t('views_approvalnotice_approvalset_index_300')" multiple>
				<Option :value="item.id" v-for="(item, index) in courseOwnerList" :key="index">{{item.code}}{{item.name}}</Option>
			</Select>
			<Input v-model="name" :placeholder="$t('views_coursepack_bigtableexample_319')"></Input>
			<Select v-model="type" :placeholder="$t('views_coursepack_bigtableexample_322')" clearable @on-change="changeType(1)">
				<Option :value="item.value" v-for="(item, index) in jw_course_type" :key="index">{{item.label}}</Option>
			</Select>
			<Select v-model="grade" :placeholder="$t('courselist_courselist_224')" clearable>
				<Option :value="item.value" v-for="(item, index) in jw_course_type_child" :key="index" v-show="searchSelectTypeId == item.type">{{item.label}}</Option>
			</Select>
			<Select v-model="status" :placeholder="$t('views_coursepack_coursepack_353')" clearable>
				<Option value="1">{{$t('scoretemplate_scoretemplate_559')}}</Option>
				<Option value="0">{{$t('scoretemplate_scoretemplate_558')}}</Option>
			</Select>
		</v-search-collapse>
		<div class="tableArea">
			<div class="tableName">
				<p class="name">{{$t('views_coursepack_coursepack_357')}}</p>
				<div class="myButton">
					<Button type="primary" @click="showCreateModal">{{$t('views_coursepack_coursepack_358')}}</Button>
				</div>
			</div>
			<Table border id="bigTableMiddle" :height="_tableHeight" :columns="columns1" :data="data1" @on-sort-change="sortChange"></Table>
			<div class="myPage">
				<Page :total="dataTotal" :current="pageNo" :page-size="pageSize" :page-size-opts="[10, 20, 30, 40]" @on-change="pageChange" @on-page-size-change="pageSizeChange" show-sizer show-elevator show-total/>
			</div>
		</div>

		<Modal class="coursePackCreateModal" :mask-closable="false" v-model="createModal" :loading="createModalLoading" :title="title" width=800 @on-ok="ok" @on-cancel="cancel">
			<div>
				<Form ref="createCoursePackRef" :model="formItem" :style="{height: openType=='1'? '193px': ''}" :label-width="120">
					<FormItem :label="$t('views_coursepack_coursepack_359')" class="w50" prop="name" :rules="{required: true,  validator: validateCourseName, trigger: 'change'}">
						<Input v-model="formItem.name" :placeholder="$t('views_coursepack_coursepack_360')" :disabled="openType== '2'" class="w250p"></Input>
					</FormItem>
					<FormItem v-if="openType== '0' || openType== '1'" :label="$t('views_coursepack_coursepack_361')" class="w50" prop="officeId" :rules="{required: true, message: $t('views_coursepack_coursepack_362'), trigger: 'change'}">
						<Input v-model="formItem.officeId" :placeholder="$t('views_coursepack_coursepack_362')" disabled class="w250p"></Input>
						<!-- <Select v-model="formItem.officeId">
							<Option :value="item.id"  v-for="(item,index) in courseOwnerList" :key="index">{{item.name}}</Option>
						</Select> -->
					</FormItem>
					<FormItem v-if="openType== '0' || openType== '1'" :label="$t('views_coursepack_coursepack_363')" class="w50" prop="type" :rules="{required: true, message: $t('views_coursepack_coursepack_364'), trigger: 'change'}">
						<Select v-model="formItem.type" @on-change="changeType(0)" class="w250p">
							<Option :value="item.value" v-for="(item, index) in jw_course_type" :key="index">{{item.label}}</Option>
						</Select>
					</FormItem>
					<FormItem v-if="openType== '0' || openType== '1'" :label="$t('views_coursepack_coursepack_365')" class="w50" prop="grade" :rules="{required: true, message: $t('views_coursepack_coursepack_366'), trigger: 'change'}">
						<Select v-model="formItem.grade" class="w250p">
							<Option :value="item.value" v-for="(item, index) in jw_course_type_child" :key="index" v-if="addSelectTypeId == item.type">{{item.label}}</Option>
						</Select>
					</FormItem>
					<FormItem v-if="openType== '0' || openType== '1'" :label="$t('views_coursepack_coursepack_367')" class="w50" prop="isDelayed" :rules="{required: true, message: $t('views_coursepack_coursepack_368'), trigger: 'change'}">
						<RadioGroup v-model="formItem.isDelayed">
							<Radio label="1">
								<span>{{$t('modules_leftremenu_92')}}</span>
							</Radio>
							<Radio label="0">
								<span>{{$t('modules_leftremenu_93')}}</span>
							</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem v-if="openType== '0' || openType== '1'" :label="$t('views_coursepack_coursepack_371')" class="w50" prop="salerDate" :rules="{ required: false, validator: validateSalerDate2, message: $t('views_coursepack_coursepack_372'), trigger: 'change' }">
						<DatePicker type="daterange" separator=" ~ " placement="bottom-end" @on-change="changeDate" v-model="formItem.salerDate" :placeholder="$t('views_coursepack_coursepack_372')" class="w250p"></DatePicker>
					</FormItem>
					<FormItem v-if="openType== '0' || openType== '1'" :label="$t('views_coursepack_coursepack_373')" class="w50" number prop="indate" :rules="{ required: true,  validator: validateSalerDate, message: $t('views_coursepack_coursepack_374'), trigger: 'change' }">
						<Input v-model="formItem.indate" type="number" class="w250p">
						<span slot="append">{{$t('message_socket_302')}}</span>
						</Input>
					</FormItem>
					<FormItem v-if="openType== '0' || openType== '2'" :label="$t('scoretemplate_compontents_scoremodify_533')" class="w100" prop="officeIds" :rules="{ required: true, validator: validateSalerDate1,message: $t('views_coursepack_coursepack_377'), trigger: 'change' }">
						<checkbox-all v-if="courseOwnerList.length && createModal &&(openType != '2' || (defaultSelectRes && defaultSelectRes.length && openType=='2') || (!defaultSelectRes && openType=='2'))" :dataList="courseOwnerList" nameKey="name" valueKey="id" :myStyle="{'width': '574px', 'margin-right': '8px'}" :defaultSelectRes="defaultSelectRes" @changeSelectEmit="changeSelectEmit"></checkbox-all>
						<Input v-model="formItem.officeIds" style="display:none;" />
					</FormItem>
					<div class="syxqsz" v-if="openType== '0' || openType== '2'">
						<div class="quickSet">
							<div class="d1">{{$t('views_coursepack_coursepack_378')}}</div>
							<div class="d2">
								<Input v-model="quickSet.num" type="number" @on-change="changeQuickSet('num')" :placeholder="$t('views_coursepack_coursepack_379')"></Input>
							</div>
							<div class="d3">
								<Input v-model="quickSet.price" type="number" @on-change="changeQuickSet('price')" :placeholder="$t('views_coursepack_coursepack_380')"></Input>
							</div>
							<div class="d4">
								<Input v-model="quickSet.totalPrice" type="number" @on-change="changeQuickSet('totalPrice')" :placeholder="$t('views_coursepack_coursepack_381')"></Input>
							</div>
							<div class="d5">
								<Input v-model="quickSet.duration" type="number" @on-change="changeQuickSet('duration')" :placeholder="$t('views_coursepack_coursepack_382')"></Input>
							</div>
							<div class="d6">
								<Input v-model="quickSet.singleNum" type="number" @on-change="changeQuickSet('singleNum')" :placeholder="$t('views_coursepack_coursepack_383')"></Input>
							</div>
						</div>
						<div class="syxqszHeader">
							<div class="d1">{{$t('views_coursepack_coursepack_384')}}</div>
							<div class="d2">{{$t('views_coursepack_coursepack_379')}}</div>
							<div class="d3">{{$t('views_coursepack_coursepack_385')}}</div>
							<div class="d4">{{$t('views_coursepack_coursepack_386')}}</div>
							<div class="d5">{{$t('views_coursepack_coursepack_387')}}</div>
							<div class="d6">{{$t('views_coursepack_coursepack_388')}}</div>
						</div>
						<div class="xqSet" v-for="(val , key , index) in comProductPriceList" :key="index">
							<div class="d1">{{val.schoolName}}</div>
							<div class="d2">
								<Input v-model="val.num" type="number" @on-change="changeSet(key, 'num')" :placeholder="$t('views_coursepack_coursepack_379')"></Input>
							</div>
							<div class="d3">
								<Input v-model="val.price" type="number" @on-change="changeSet(key, 'price')" :placeholder="$t('views_coursepack_coursepack_380')"></Input>
							</div>
							<div class="d4">
								<Input v-model="val.totalPrice" type="number" @on-change="changeSet(key, 'totalPrice')" :placeholder="$t('views_coursepack_coursepack_381')"></Input>
							</div>
							<div class="d5">
								<Input v-model="val.duration" type="number" @on-change="changeSet(key, 'duration')" :placeholder="$t('views_coursepack_coursepack_382')"></Input>
							</div>
							<div class="d6">
								<Input v-model="val.singleNum" type="number" @on-change="changeSet(key, 'singleNum')" :placeholder="$t('views_coursepack_coursepack_383')"></Input>
							</div>
						</div>
					</div>
					<div class="des" v-if="openType== '0' || openType== '2'">{{$t('views_coursepack_coursepack_389')}}</div>
					<!-- <div class="yhzc">
						<FormItem v-if="yhzcList.length && (openType== '0' || openType== '2')" :label="$t('views_coursepack_coursepack_390')" class="w100" prop="yhzcIdsCheckbox">
							<checkbox-all v-if="yhzcList.length && createModal && (openType== '0' || (openType== '2' && formItem.yhzcIdsCheckbox))" :dataList="yhzcList" nameKey="name" valueKey="id" :myStyle="{'width': '574px', 'margin-right': '8px'}" :defaultSelectRes="formItem.yhzcIdsCheckbox" @changeSelectEmit="changeYhzc"></checkbox-all>
						</FormItem>
					</div> -->
				</Form>
			</div>
			<div slot="footer">
				<Button @click="cancel">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="ok">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
		<Modal :mask-closable="false" v-model="setStatuModal" :title="$t('views_coursepack_coursepack_393')" width=800 ok-:text="$t('views_coursepack_coursepack_394')" @on-ok="okSetStatu" @on-cancel="cancelSetStatu">
			<div class="coursePackCreateModal">
				<div class="des" style="width: 550px;color:red;">{{$t('views_coursepack_coursepack_395')}}</div>
				<Table :columns="columns2" :height="_tableHeight" :data="data2"></Table>
				<div class="myPage" style="text-align:center;padding-top:20px;">
					<Page :total="dataTotalStatu" :page-size="5" @on-change="pageChangeStatu" show-elevator show-total/>
				</div>
			</div>
		</Modal>
	</div>
</template>
<script>
	import valid, {
		errors,
		// jwCourse,
		sysUser,
		sysDict,
		common
	} from "../../libs/request";
	import { htPolicy } from '../../../../spoc-sign-web/src/libs/htPolicy'
	import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
	import checkboxAll from "@public/modules/checkboxAll/checkboxAll.vue";
	import vSearchCollapse from '@public/modules/vSearchCollapse';
    import tableDropdown from '@public/modules/tableDropdown';
    import { waitUntil } from '@public/libs/util';
	export default {
		name: 'core.coursePack',
		data() {
			return {
				isActioning: false, //多次提交拦截
				tableHeightOut: 72, //324,
				mainBodyHeight: '',
				title: this.$t('views_coursepack_coursepack_358'),
				yhzcList: [],
				setStatuModal: false,
				officeIds: [],
				sortObj: {},
				defaultSelectRes: [],
				courseOwnerList: [],
				addSelectTypeId: '',
				searchSelectTypeId: '',
				jw_course_type: [],
				jw_course_type_child: [],
				jw_course_grade: [],
				pageNo: 1,
				pageNoStatu: 1,
				courseIdForChangeStatu: '',
				pageSize: this.$store.state.app.pageSizeGlobal,
				pageCount: 1,
				dataTotal: 0,
				dataTotalStatu: 0,
				name: '', //课程包名称
				type: '', //课程包分类
				grade: '', //适用年级
				status: '', //课程状态
				salerDateSearch: [], //售卖日期至

				openType: '0', //'0', '1', '2' 0创建模式 1设置模式 2修改价格
				comProductPriceList: {},
				quickSet: {
					num: '',
					price: '',
					totalPrice: '',
					duration: '',
					singleNum: '',
				},
				createModalLoading: true,
				createModal: false,
				formItem: {
					officeId: '', //课程包归属
					name: '', //课程包名称
					type: '', //课程包分类
					grade: '', //适用年级
					isDelayed: '0', //是否延伸课程
					salerDate: [], //售卖日期
					indate: null, //课程包有效期
					officeIds: '', //适用校区
					yhzcIds: '', //优惠设置
					yhzcIdsCheckbox: [],
					comProductPriceList: [], //对应校区具体价格
					saleStartDate: '',
					saleEndDate: ''
				},
				columns2: [{
						title: this.$t('views_coursepack_coursepack_396'),
						key: 'name',
						sortable: 'custom'
					},
					{
						title: this.$t('views_coursepack_coursepack_397'),
						key: 'gradeLabel'
					},
					{
						title: this.$t('views_coursepack_coursepack_398'),
						key: 'officeName'
					},
					{
						title: this.$t('views_coursepack_coursepack_399'),
						key: 'createByName'
					},
					{
						title: this.$t('views_coursepack_coursepack_400'),
						key: 'createDate'
					},
				],
				data2: [],
				columns1: [{
						title: this.$t('views_coursepack_bigtableexample_319'),
						key: 'name',
						sortable: 'custom',
						minWidth: 120,
						width:null,
						resizable:true,
						/* maxWidth: 120,
						tooltip: true */
						render: (h, params) => {
							return h('div',{
								style:{
									'word-break': 'break-all'
								}
							}, params.row.name)
						}
					},
					{
						title: this.$t('views_coursepack_bigtableexample_320'),
						key: 'officeName',
						minWidth: 100,
						width:null,
						resizable:true,
						// tooltip: true
						render: (h, params) => {
							return h('div',{
								style:{
									'word-break': 'break-all'
								}
							}, params.row.officeName)
						}
					},
					// {
					// 	title: this.$t('views_approvalnotice_approvalset_index_300'),
					// 	key: 'officeNames',
					// 	// tooltip: true
					// 	minWidth: 200,
					// 	width:null,
					// 	resizable:true,
					// 	render: (h, params) => {
					// 		return h('div',{
					// 			style:{
					// 				'word-break': 'break-all'
					// 			}
					// 		}, params.row.officeNames)
					// 	}
					// },
					{
						title: this.$t('views_coursepack_bigtableexample_322'),
						key: 'typeLabel',
						// tooltip: true
						minWidth: 80,
						width:null,
						resizable:true,
						render: (h, params) => {
							return h('div',{
								style:{
									'word-break': 'break-all'
								}
							}, params.row.typeLabel)
						}
					},
					{
						title: this.$t('messagemanagement_index_355'),
						key: 'gradeLabel',
						// maxWidth: 130,
						// tooltip: true
						minWidth: 80,
						width:null,
						resizable:true,
						render: (h, params) => {
							return h('div',{
								style:{
									'word-break': 'break-all'
								}
							}, params.row.gradeLabel)
						}
					},
					{
						title: this.$t('pushsettings_index_496'),
						key: 'status',
						width: 75,
						resizable:true,
						render: (h, params) => {
							return h('div', [
								h('div', {
									style: {
										'display': 'inline-block',
										'width': '6px',
										'height': '6px',
										'border-radius': '4px',
										'margin-right': '6px',
										'background': (params.row.status == '1') ? 'rgba(70,188,21,1)' : '#999999'
									},
								}),
								h('div', {
									style: {
										'display': 'inline-block',
									},
								}, params.row.status == '1' ? this.$t('scoretemplate_scoretemplate_559') : this.$t('scoretemplate_scoretemplate_558'))
							])
						},
					},
					{
						title: this.$t('views_coursepack_bigtableexample_327'),
						key: 'saleEndDate',
						minWidth: 100,
						width:null,
						resizable:true,
						render: (h, params) => {
							return h('div',{
								style:{
									'word-break': 'break-all'
								}
							}, params.row.saleEndDate)
						}
					},
					{
						title: '是否管辖',
						key:'ifCanModify',
						align:'left',
						tooltip: true,
						resizable: true,
						width: null,
						render: (h, params) => {
							let str = ''
							if(params.row.ifCanModify == '1'){
								str = '是'
							} else {
								str = '否'
							}
							return h('div', str);
						}
					},
					{
						title: this.$t('classlist_compontents_detailinfo_45'),
						width: 165,
						render: (h, params) => {
							return h('div', [
								params.row.ifCanModify == '1' ? h('a', {
									style: {
										/* color:  (params.row.editable == '0') ? '#999':'' */
									},
									on: {
										click: () => {
											this.quickSet.num = ''
											this.quickSet.price = ''
											this.quickSet.totalPrice = ''
											this.quickSet.duration = ''
											this.quickSet.singleNum = ''

											this.openType = '2'
											this.title = '设置课程包价格'
											this.createModal = true
											this.getDetail(params.row.id)
										}
									}
								}, '设置价格') : '',
								params.row.ifCanModify == '1' ? h('a', {
									style: {
										'margin-left': '5px',
										/*  color:  params.row.canDo == '1' ? '':'#999' */
									},
									on: {
										click: () => {
											this.openType = '1'
											this.title = '修改课程包'
											this.quickSet.num = ''
											this.quickSet.price = ''
											this.quickSet.totalPrice = ''
											this.quickSet.duration = ''
											this.quickSet.singleNum = ''
											this.createModal = true
											this.getDetail(params.row.id)
										}
									}
								}, '修改') : '',
								params.row.ifCanModify == '1' ? h(tableDropdown, {
									style: {
										'margin-left': '10px',
									},
									props: {
										buttonList: [{
												label: params.row.status == '1' ? '无效' : '有效',
												key: 'changeStatus'
											},
											{
												label: '删除',
												key: 'delData',
												title: params.row.status == '1' ? '有效课程包不能删除' : '',
												disabled: params.row.status == '1'
											},
											{
												label: '复制',
												key: 'copy'
											}
										],
									},
									on: {
										dropFn: (key) => {
											this.doActionItem({
												key,
												row: params.row
											})
										}
									}
								}) : '',
							])
						}
					},
				],
                data1: [],
                actualHeight: 0,
                uploadHeight: false, //继续更新高度
			};
		},
		computed: {
			...mapState(['userInfo','app']),
			/* ...mapGetters("core", ["resource_edit"]), */
			_tableHeight() {
				// console.log('tableHeightOut:init = ' + this.tableHeightOut) // 搜索框的高度
				let hasPage = 65
				// 计算出的表格内容最大的高度
				// 48 + 12为表格名称的高度
				// 16为margin-top的高度
				// 40为表头的高度
                let __maxHeight__ = this.mainBodyHeight - this.tableHeightOut - hasPage - 48 - 12 - 16;
                let num = __maxHeight__ > this.actualHeight ? '' : (__maxHeight__ < 48 * this.data1.length && __maxHeight__ < 48 * 6 ? 48 * 6 : __maxHeight__);
				// console.log('_tableHeight:change = ' + num)
				return num;
			},
		},
		components: {
			checkboxAll,
			vSearchCollapse,
			tableDropdown
		},
		mounted() {
			this.baseData();
			this.initMainBodyHeight()
			window.onresize = () => {
				this.initMainBodyHeight();
			}
            waitUntil (()=>{
                this.actualHeightFun();
                return this.uploadHeight || !!this.actualHeight;
            },()=>{
                // console.log(this.actualHeight)
			});
			
            waitUntil(
				() => {
					console.log("this.app.currOfficeId ==" + this.app.currOfficeId);
					if (this.app.currOfficeId) {
						this.officeIds = this.app.currOfficeId == 'all' ? [] : [this.app.currOfficeId];
					}
					return this.app.currOfficeId || false;
				},
				() => {
					this.getCourseList();
				}
			);
		},
		methods: {
			...mapMutations(["updateLoadingStatus"]),
            /*...mapActions("portal", ["updateAside"]), */
            actualHeightFun() {
                // table实际渲染高度
                if(document.getElementById('bigTableMiddle') && 
                    document.getElementById('bigTableMiddle').getElementsByTagName('table') && 
                    document.getElementById('bigTableMiddle').getElementsByTagName('table').length &&
                    document.getElementById('bigTableMiddle').getElementsByTagName('table')[1].offsetHeight > 0) {
                    this.actualHeight = document.getElementById('bigTableMiddle').getElementsByTagName('table')[1].offsetHeight
                }
                console.log('actualHeight')
            },
			changeDivHeight(height) {
				this.tableHeightOut = height
			},
			initMainBodyHeight() {
				// console.log(document.getElementById('mainBody').offsetHeight - 16 * 2)
				this.mainBodyHeight = document.body.offsetHeight - 104 - 16 * 2;
			},
			validateCourseName(rule, value, callback) {
				if(!value || !value.trim()) {
					callback(new Error('请输入有效课程包名称'));
				} else {
					callback();
				}
			},
			validateSalerDate(rule, value, callback) {
				let reg = /^[1-9]\d*$/;
				if(!value || !reg.test(value)) {
					callback(new Error('请输入正整数'));
				} else {
					callback();
				}
			},
			validateSalerDate1(rule, value1, callback) {
				if(!this.formItem.officeIds) {
					callback(new Error('请选择适用校区'));
				} else {
					callback();
				}
			},
			validateSalerDate2(rule, value1, callback) {
				callback();

				// if(!this.formItem.salerDate || this.formItem.salerDate[0] == '') {
				// 	callback(new Error(this.$t('views_coursepack_coursepack_372')));
				// } else {
				// 	callback();
				// }
			},
			doActionItem(obj) {
				if(obj.key === 'delData') { //删除
					if(obj.row.status != '1') {
						this.$Modal.confirm({
							title: '确认删除',
							content: '确定删除该课程包？',
							onOk: () => {
								this.deleteCoursePack(obj.row.id)
							},
							onCancel: () => {}
						});
					}
				} else if(obj.key === 'changeStatus') {
					if(obj.row.status == '1') {
						this.pageNoStatu = 1
						this.courseIdForChangeStatu = obj.row.id
						this.changeStatusBefore()
					} else {
						this.$Modal.confirm({
							title: '确认状态修改',
							content: '确定设置该课程包为有效？',
							onOk: () => {
								this.changeStatus(obj.row.id, obj.row.status)
							},
							onCancel: () => {}
						});
					}
				} else if(obj.key === 'copy') {
					this.copyCoursePack(obj.row.id)
				}
			},
			changeType(type, isEdit) { //type 1为搜索触发  2为模态框内的触发
				if(type) {
					if(this.type) {
						this.searchSelectTypeId = this.jw_course_type.filter((item) => {
							return item.value == this.type
						})[0].value
					}
					this.grade = ''
				} else {
					let obj = this.jw_course_type.filter((item) => {
						return item.value == this.formItem.type
					})[0]
					if(obj) {
						this.addSelectTypeId = obj.value
					}
					if((!isEdit) && obj && obj.remarks) {
						this.formItem.indate = obj.remarks
					}
					this.$nextTick(() => {
						if(!isEdit) {
							this.formItem.grade = ''
						}
					})

				}
			},
			getSchool() {
				/* let type = '3' //课程包分类,适用年级
				jwCourse.officeList({
					type
				}) */
				sysUser.dataScopeFilter({ type:3 })
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.courseOwnerList = res.data.data //.allCompany
						}
					})
					.catch(errors.call(this))
					.finally(() => {
					});
			},
			baseData() {
				let types = 'jw_course_type' //,jw_course_grade' //课程包分类,适用年级
				sysDict.batchListData({
						types
					})
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.jw_course_type = res.data.data.jw_course_type
							//this.jw_course_grade = res.data.data.jw_course_grade
							this.getSchool();
						}
					})
					.catch(errors.call(this))
					.finally(() => {
					});

				let type = 'jw_course_type'
				sysDict.findChildDictByParentDict({
						type
					})
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.jw_course_type_child = res.data.data
						}
					})
					.catch(errors.call(this))
					.finally(() => {
					});
			},
			pageSizeChange(pageSize) {
				this.pageSize = pageSize
				this.getCourseList()
			},
			pageChange(pageNo) {
				this.pageNo = pageNo
				this.getCourseList()
			},
			pageChangeStatu(pageNo) {
				this.pageNoStatu = pageNo
				this.changeStatusBefore()
			},
			resetSearch() {
				this.officeIds = this.app.currOfficeId == 'all' ? [] : [this.app.currOfficeId];
				this.name = ''
				this.type = ''
				this.grade = ''
				this.status = ''
				this.salerDateSearch = []
				this.pageNo = 1
				this.getCourseList()
			},
			copyCoursePack(id) {
				// jwCourse.saveCopy({
				common.jwCourseSaveCopy({
						id
					})
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.$Message.success(this.$t('views_coursepack_coursepack_406'));
							this.pageNo = 1
							this.getCourseList()
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			getDetail(id) {
				this.updateLoadingStatus({
					isLoading: true
				});
				// jwCourse.form({
				common.jwCourseForm({
						id
					})
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							if(this.openType == '1') {
								//设置基础信息
								this.formItem = res.data.data
								this.changeType(0, true)
								this.formItem.salerDate = [res.data.data.saleStartDate, res.data.data.saleEndDate]
							}
							if(this.openType == '2') {
								//修改价格
								this.formItem = res.data.data
								let defaultSelectRes = res.data.data.officeIds ? res.data.data.officeIds.split(',') : null
								if(defaultSelectRes && !defaultSelectRes[0]){
									defaultSelectRes.shift()
								}
								if(defaultSelectRes && !defaultSelectRes[defaultSelectRes.length - 1]){
									defaultSelectRes.splice(defaultSelectRes.length - 1 , 1)
								}
								this.defaultSelectRes = defaultSelectRes
								//this.changeSelectEmit(this.defaultSelectRes)

								this.comProductPriceList = {}
								this.formItem.comProductPriceList.forEach(item => {
									let result = this.courseOwnerList.filter((_item) => {
										return _item.id == item.officeId
									})
									if(result && result[0]){
										item.schoolName = result[0].name
										item.price = parseFloat(Number(item.price).toFixed(2))
										item.totalPrice = parseFloat(Number(item.totalPrice).toFixed(2))
										this.comProductPriceList[item.officeId] = item
									}
								})
								this.formItem.yhzcIdsCheckbox = null
								this.listYhzc(this.formItem.officeIds)
							}
							this.formItem.officeId = this.userInfo.officeName
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({
							isLoading: false
						});
					});
			},
			changeStatusBefore() {
				this.updateLoadingStatus({
					isLoading: true
				});
				let param = {
					pageNo: this.pageNoStatu,
					pageSize: 5,
					courseId: this.courseIdForChangeStatu,
					status: '1'
				}
				// jwCourse.coursePackGroupListPage(param)
				common.coursePackGroupListPage(param)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							if(res.data.data.list.length) {
								if(!this.setStatuModal) {
									this.setStatuModal = true
								}
								this.data2 = res.data.data.list
								this.dataTotalStatu = res.data.data.total
							} else {
								this.$Modal.confirm({
									title: this.$t('views_coursepack_bigtableexample_347'),
									content: '<p>' + this.$t('views_coursepack_coursepack_408') + '</p>',
									onOk: () => {
										this.changeStatus(this.courseIdForChangeStatu, '1')
									},
									onCancel: () => {}
								});
							}
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({
							isLoading: false
						});
					});
			},
			changeStatus(id, status) {
				let params = {
					id,
					status: status == '1' ? '0' : '1'
				}
				// jwCourse.saveStatus(params)
				common.jwCourseSaveStatus(params)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.$Message.success(this.$t('views_coursepack_coursepack_409'));
							// this.pageNo = 1
							this.getCourseList();
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			deleteCoursePack(id) {
				// jwCourse.delete({
				common.jwCourseDelete({
						id
					})
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.$Message.success(this.$t('scoretemplate_compontents_scoremodify_549'));
							this.pageNo = 1
							this.getCourseList();
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			handleJwProductPriceList() {
				let res = []
				for(let key in this.comProductPriceList) {
					res.push(this.comProductPriceList[key])
				}
				this.formItem.comProductPriceList = res
			},
			changeSet(key, type) {
				setTimeout(() => {
					this.$set(this.comProductPriceList[key], type, parseFloat(Number(this.comProductPriceList[key][type]).toFixed(2)))
					this.$forceUpdate()
				}, 0)
				if(type == 'totalPrice' && this.comProductPriceList[key].num) {
					let price = parseFloat((Number(this.comProductPriceList[key].totalPrice) / Number(this.comProductPriceList[key].num)).toFixed(2))
					this.comProductPriceList[key].price = price
				}
				if(type == 'price' && this.comProductPriceList[key].num) {
					let totalPrice = parseFloat((Number(this.comProductPriceList[key].price) * Number(this.comProductPriceList[key].num)).toFixed(2))
					this.comProductPriceList[key].totalPrice = totalPrice
				}
				if(type == 'num' && this.comProductPriceList[key].price) {
					let totalPrice = parseFloat((Number(this.comProductPriceList[key].price) * Number(this.comProductPriceList[key].num)).toFixed(2))
					this.comProductPriceList[key].totalPrice = totalPrice
				}
				this.$forceUpdate()
			},
			changeQuickSet(type) {
				setTimeout(() => {
					this.$set(this.quickSet, type, parseFloat(Number(this.quickSet[type]).toFixed(2)))
				}, 0)
				for(let key in this.comProductPriceList) {
					this.comProductPriceList[key][type] = parseFloat(Number(this.quickSet[type]).toFixed(2))
					if(type == 'totalPrice' && this.comProductPriceList[key].num) {
						let price = parseFloat((Number(this.quickSet[type]) / Number(this.comProductPriceList[key].num)).toFixed(2))
						this.comProductPriceList[key].price = price
						this.quickSet.price = price
					}
					if(type == 'price' && this.comProductPriceList[key].num) {
						let totalPrice = parseFloat((Number(this.quickSet[type]) * Number(this.comProductPriceList[key].num)).toFixed(2))
						this.comProductPriceList[key].totalPrice = totalPrice
						this.quickSet.totalPrice = totalPrice
					}
					if(type == 'num' && this.comProductPriceList[key].price) {
						let totalPrice = parseFloat((Number(this.quickSet[type]) * Number(this.comProductPriceList[key].price)).toFixed(2))
						this.comProductPriceList[key].totalPrice = totalPrice
						this.quickSet.totalPrice = totalPrice
					}
				}
				this.handleJwProductPriceList()
			},
			changeDate(date) {
				// [Tue Apr 23 2019 00:00:00 GMT+0800 (中国标准时间), Fri May 31 2019 00:00:00 GMT+0800 (中国标准时间), __ob__: Observer]
				if(date && date.length && date[0]) {
					this.formItem.saleStartDate = date[0] + ' 00:00:00'
					this.formItem.saleEndDate = date[1] + ' 00:00:00'
				} else {
					this.formItem.saleStartDate = ''
					this.formItem.saleEndDate = ''
				}
			},
			changeYhzc(selectRes) {
				this.formItem.yhzcIdsCheckbox = selectRes
			},
			changeSelectEmit(selectRes) {
				this.formItem.officeIds = selectRes.join(',')
				this.$set(this.formItem, 'officeIds', selectRes.join(','))
				let xqSetKeys = Object.keys(this.comProductPriceList)
				selectRes.forEach(item => { //如果已选校区不在上次选择的结果中，则加入校区设置Map
					if(xqSetKeys.indexOf(item) < 0) {
						this.comProductPriceList[item] = {
							officeId: this.courseOwnerList.filter((_item) => {
								return _item.id == item
							})[0].id,
							schoolName: this.courseOwnerList.filter((_item) => {
								return _item.id == item
							})[0].name
						}
					}
				});
				let xqSetKeys1 = Object.keys(this.comProductPriceList)
				xqSetKeys1.forEach(item => { //如果现有校区中，存在不在选择结果集中的学校，则删除
					if(selectRes.indexOf(item) < 0) {
						delete this.comProductPriceList[item]
					}
				});
				this.handleJwProductPriceList()
				this.listYhzc(this.formItem.officeIds)
				this.$forceUpdate()
			},
			listYhzc(officeIds) {
				if(!officeIds) {
					return
				}
				htPolicy.listYhzc({
						officeIds
					})
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.yhzcList = res.data.data
							if(this.openType == '2') {
								this.$nextTick(() => {
									this.formItem.yhzcIdsCheckbox = this.formItem.yhzcIds ? this.formItem.yhzcIds.split(',') : []
									this.$forceUpdate()
								})
							}
						}
					})
					.catch(errors.call(this))
					.finally(() => {
					});
			},
			okSetStatu() {
				this.$Modal.confirm({
					title: this.$t('views_coursepack_bigtableexample_347'),
					content: '<p>' + this.$t('views_coursepack_coursepack_408') + '</p>',
					onOk: () => {
						this.changeStatus(this.courseIdForChangeStatu, '1')
					},
					onCancel: () => {}
				});
			},
			cancelSetStatu() {
				this.setStatuModal = false
			},
			validModal(flag) {
				this.createModalLoading = false
				this.createModal = flag
				setTimeout(() => {
					this.createModalLoading = true;
				}, 0);
			},
			ok() {
				//  this.$refs[name].resetFields();
				this.$refs.createCoursePackRef.validate((validRes) => {
					if(validRes) {
						if(this.openType == '0' || this.openType == '2') {
							let reg = /^\d+(\.\d{1,2})?$/;
							let failFlag = false
							this.formItem.comProductPriceList.forEach(item => {
								if(!item.num || item.num == '0' || !reg.test(item.num)) {
									failFlag = true
								};
								if(!reg.test(item.price)) {
									failFlag = true
								};
								if(!reg.test(item.totalPrice)) {
									failFlag = true
								};
								if(!item.duration || !reg.test(item.duration)) {
									failFlag = true
								};
								if(!item.singleNum || !reg.test(item.singleNum)) {
									failFlag = true
								};
							})
							if(failFlag) {
								this.$Message.error({
									content: this.$t('views_coursepack_coursepack_411'),
									duration: 5
								})
								this.validModal(true)
								return;
							}
						}
						if(this.openType == '0') { //新建
							let params = Object.assign({}, this.formItem)
							params.name = params.name.trim()
							params.officeId = this.userInfo.officeId
							params.yhzcIds = this.formItem.yhzcIdsCheckbox ? this.formItem.yhzcIdsCheckbox.join(',') : ''
							params.saleStartDate = params.saleStartDate ? params.saleStartDate : '1900-01-01 00:00:00'
							params.saleEndDate = params.saleEndDate ? params.saleEndDate : '9999-12-31 23:59:59'
							
							let officeIds = []
							if(this.formItem.officeIds){
								if(Array.isArray(this.formItem.officeIds)) {
									officeIds = this.formItem.officeIds
								} else {
									officeIds = this.formItem.officeIds.split(',')
								}
								if(officeIds && !officeIds[0]){
									officeIds.shift()
								}
								if(officeIds && !officeIds[officeIds.length - 1]){
									officeIds.splice(officeIds.length - 1 , 1)
								}
							}
							params.officeIds = ',' + officeIds.join(',') + ',';

							if(this.isActioning){ //多次提交拦截
								return
							}
							this.isActioning = true
							this.updateLoadingStatus({
								isLoading: true
							});
							//jwCourse.save(params)
							common.jwCourseSave(params)
								.then(valid.call(this))
								.then(res => {
									if(res.ok) {
										this.$Message.success(this.$t('views_coursepack_coursepack_412'));
										this.validModal(false)
										this.defaultSelectRes = []
										this.pageNo = 1
										this.getCourseList();
									} else {
										this.validModal(true)
									}
								})
								.catch(errors.call(this))
								.finally(() => {
									this.updateLoadingStatus({
										isLoading: false
									});
									setTimeout(()=>{
										//多次提交拦截
										this.isActioning = false
									},200)
								});
						}
						if(this.openType == '1') { //设置基础信息
							let params = Object.assign({}, this.formItem)
							params.name = params.name.trim()
							params.officeId = this.userInfo.officeId

							let officeIds = []
							if(this.formItem.officeIds){
								if(Array.isArray(this.formItem.officeIds)) {
									officeIds = this.formItem.officeIds
								} else {
									officeIds = this.formItem.officeIds.split(',')
								}
								if(officeIds && !officeIds[0]){
									officeIds.shift()
								}
								if(officeIds && !officeIds[officeIds.length - 1]){
									officeIds.splice(officeIds.length - 1 , 1)
								}
							}
							params.officeIds = ',' + officeIds.join(',') + ',';

							if(this.isActioning){ //多次提交拦截
								return
							}
							this.isActioning = true
							this.updateLoadingStatus({
								isLoading: true
							});
							// jwCourse.saveBase(params)
							common.jwCourseSaveBase(params)
								.then(valid.call(this))
								.then(res => {
									if(res.ok) {
										this.$Message.success(this.$t('views_coursepack_coursepack_413'));
										this.defaultSelectRes = []
										this.validModal(false)
										// this.pageNo = 1
										this.getCourseList();
									} else {
										this.validModal(true)
									}
								})
								.catch(errors.call(this))
								.finally(() => {
									this.updateLoadingStatus({
										isLoading: false
									});
									setTimeout(()=>{
										//多次提交拦截
										this.isActioning = false
									},200)
								});
						}
						if(this.openType == '2') { // 修改价格
							let params = Object.assign({}, this.formItem)
							params.officeId = this.userInfo.officeId
							params.yhzcIds = this.formItem.yhzcIdsCheckbox.join(',')

							let officeIds = []
							if(this.formItem.officeIds){
								if(Array.isArray(this.formItem.officeIds)) {
									officeIds = this.formItem.officeIds
								} else {
									officeIds = this.formItem.officeIds.split(',')
								}
								if(officeIds && !officeIds[0]){
									officeIds.shift()
								}
								if(officeIds && !officeIds[officeIds.length - 1]){
									officeIds.splice(officeIds.length - 1 , 1)
								}
							}

							params.officeIds = ',' + officeIds.join(',') + ',';
							if(this.isActioning){ //多次提交拦截
								return
							}
							this.isActioning = true
							this.updateLoadingStatus({
								isLoading: true
							});
							// jwCourse.saveItemPrice(params)
							common.jwCourseSaveItemPrice(params)
								.then(valid.call(this))
								.then(res => {
									if(res.ok) {
										this.$Message.success(this.$t('scoretemplate_compontents_scoremodify_550'));
										this.validModal(false)
										this.defaultSelectRes = []
										// this.pageNo = 1
										this.getCourseList();
									} else {
										this.validModal(true)
									}
								})
								.catch(errors.call(this))
								.finally(() => {
									this.updateLoadingStatus({
										isLoading: false
									});
									setTimeout(()=>{
										//多次提交拦截
										this.isActioning = false
									},200)
								});
						}
					} else {
						//this.$Message.error('Fail!');
						this.updateLoadingStatus({
							isLoading: false
						});
						this.validModal(true)
					}
				})
			},
			cancel() {
				this.defaultSelectRes = []
				this.createModal = false
			},
			showCreateModal() {
				this.openType = '0'
				this.title = this.$t('views_coursepack_coursepack_358')
				this.addSelectTypeId = ''
				if(this.$refs.createCoursePackRef) {
					this.$refs.createCoursePackRef.resetFields();
				}
				this.defaultSelectRes = []
				this.yhzcList = []
				this.quickSet = {
					num: '',
					price: '',
					totalPrice: '',
					duration: '',
					singleNum: '',
				}
				this.comProductPriceList = {}
				this.formItem = {}
				this.formItem.isDelayed = '0'
				this.formItem.comProductPriceList = []
				this.formItem.officeId = this.userInfo.officeName
				this.createModal = true
			},
			sortChange(sortObj) {
				// console.log(sortObj.column)
				// console.log(sortObj.key)
				// console.log(sortObj.order)  // desc, asc, normal
				this.sortObj = sortObj
				this.pageNo = 1
				this.getCourseList();
			},
			getCourseList() {
				this.updateLoadingStatus({
					isLoading: true
				});
                let param = {
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					officeIds: this.officeIds.join(','),
					name: this.name,
					type: this.type,
					grade: this.grade,
					status: this.status,
					startTime: this.salerDateSearch.length && this.salerDateSearch[0] ? new Date(this.salerDateSearch[0]).format('yyyy-MM-dd') : '',
					endTime: this.salerDateSearch.length && this.salerDateSearch[1] ? new Date(this.salerDateSearch[1]).format('yyyy-MM-dd') : '',
				}
				if(this.sortObj.order != 'normal' && this.sortObj.key) {
					param.orderByType = this.sortObj.key
					param.orderByStatus = this.sortObj.order == 'asc' ? '1' : '2'
				}

				// jwCourse.listPage(param)
				common.jwCourseListPage(param)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							let result = res.data.data
                            this.data1 = result.list
                            this.uploadHeight = true;
							this.dataTotal = result.total
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({
							isLoading: false
						});
					});
			},
		},
		watch: {
			"app.currOfficeId": function(val, oldVal) {
				if (oldVal) {
					this.officeIds = val == 'all' ? [] : [val];
					this.getCourseList();
				}
			}
		}
	};
</script>