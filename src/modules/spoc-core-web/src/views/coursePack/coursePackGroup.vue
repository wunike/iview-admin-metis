<style lang="less">
	.coursePackGroup {
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
	
	.coursePackGroupCreateModal {
		.ivu-modal-body {
			padding: 24px;
			font-size: 12px;
			line-height: 1.5;
		}
		.w50 {
			display: inline-block;
			width: 50%;
		}
		.w424 {
			display: block;
			width: 424px;
		}
		.w748 {
			display: block;
			width: 748px;
		}
		.createForm {
			width: 424px;
			margin: 24px 0 0 86px;
		}
		.chooseCourse {
			overflow: hidden;
			.ivu-checkbox-wrapper{
				min-width:105px;
			}
		}
		.forChoose,
		.hasChoosed {
			float: left;
			width: 366px;
			border: 1px solid #e0e0e0;
			border-radius: 5px;
			.title {
				line-height: 38px;
				border-bottom: 1px solid #e0e0e0;
				padding-left: 22px;
			}
			.courseList {
				height: 192px;
				overflow-y: scroll;
				padding: 10px 20px;
			}
			.courseList1 {
				height: 244px;
				overflow-y: scroll;
				padding: 10px 20px;
			}
			.addButton {
				border-top: 1px solid #e0e0e0;
				line-height: 50px;
			}
		}
		.hasChoosed {
			margin-left: 20px;
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
				width: 177px;
				display: inline-block;
				line-height: 50px;
				height: 50px;
				padding-left: 16px;
				margin-right: 10px;
				/* overflow: hidden;
			text-overflow: ellipsis;
			white-space: normal; */
			}
			.d2,
			.d3,
			.d4,
			.d5,
			.d6 {
				line-height: 50px;
				height: 50px;
				margin-right: 20px;
				display: inline-block;
			}
			.d2 {
				width: 50px;
			}
			.d3 {
				width: 65px;
			}
			.d4 {
				width: 84px;
			}
			.d5 {
				width: 90px;
			}
			.d6 {
				width: 150px;
				margin: 0;
			}
		}
		.remarks {
			margin: 10px 0 20px 16px;
			width: 483px;
			height: 20px;
			font-size: 12px;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			line-height: 20px;
		}
		.ivu-checkbox-wrapper {
			margin-right: 0;
		}
	}
</style>
<template>
	<div class="coursePackGroup">
		<v-search-collapse @search="getListData" @reset="resetSearch" @changeDivHeight="changeDivHeight">
			<DatePicker type="daterange" separator=" ~ " placement="bottom-start" v-model="salerDateSearch" :placeholder="$t('views_coursepack_coursepack_356')" class="w140 mr12" style="width: 200px;"></DatePicker>
			<Select v-model="officeIds" :placeholder="$t('views_approvalnotice_approvalset_index_300')" multiple class="w140 mr12">
				<Option :value="item.id" v-for="(item, index) in courseOwnerList" :key="index">{{item.code}}{{item.name}}</Option>
			</Select>
			<Input v-model="name" :placeholder="$t('views_coursepack_bigtableexample_319')" class="w140 mr12"></Input>
			<Select v-model="grade" clearable :placeholder="$t('courselist_courselist_224')" filterable class="w140 mr12">
				<Option :value="item.value" v-for="(item, index) in jw_course_grade" :key="index">{{item.label}}</Option>
			</Select>
			<Select v-model="status" clearable :placeholder="$t('views_coursepack_coursepack_353')" class="w140 mr12">
				<Option value="1">{{$t('scoretemplate_scoretemplate_559')}}</Option>
				<Option value="0">{{$t('scoretemplate_scoretemplate_558')}}</Option>
			</Select>
			<Button @click="bigTableExample" style="display:none;">{{$t('views_coursepack_coursepackgroup_422')}}</Button>
		</v-search-collapse>
		<div class="tableArea">
			<div class="tableName">
				<p class="name">{{$t('views_coursepack_coursepackgroup_423')}}</p>
				<div class="myButton">
					<Button type="primary" @click="showCreateModal">{{$t('views_coursepack_coursepackgroup_424')}}</Button>
				</div>
			</div>
			<Table border id="bigTableMiddle" :height="_tableHeight" :columns="columns1" :data="data1" @on-sort-change="sortChange"></Table>
			<div class="myPage">
				<Page :total="total" :current="pageNo" :page-size-opts="[10, 20, 30, 40]" @on-change="pageChange" @on-page-size-change="pageSizeChange" show-sizer show-elevator show-total/>
			</div>
		</div>

		<Modal class="coursePackGroupCreateModal" :mask-closable="false" v-model="createModal" 
			:loading="createModalLoading" :title="title" width=800
			@on-visible-change="visibleChange">
			<div>
				<Steps :current="currentStep" style="margin:0 auto 20px;width:580px;">
					<Step :title="$t('views_coursepack_coursepackgroup_425')" :content="$t('views_coursepack_coursepackgroup_426')"></Step>
					<Step :title="$t('views_coursepack_coursepackgroup_427')" :content="$t('views_coursepack_coursepackgroup_428')"></Step>
					<Step :title="$t('views_coursepack_coursepackgroup_429')" :content="$t('views_coursepack_coursepackgroup_430')"></Step>
				</Steps>
				<Form class="createForm" ref="createCoursePackGroupRef0" v-show="currentStep == 0" :model="formItem" :label-width="140">
					<FormItem :label="$t('views_coursepack_coursepackgroup_431')" class="w424" prop="name" :rules="{required: true, validator: validateCourseName, trigger: 'change'}">
						<Input style="width:426px;" v-model="formItem.name" :placeholder="$t('views_coursepack_coursepack_360')"></Input>
					</FormItem>
					<FormItem :label="$t('views_coursepack_coursepack_365')" class="w424" prop="grade" :rules="{required: true, message: $t('views_coursepack_coursepack_366'), trigger: 'change'}">
						<Select style="width:426px;" v-model="formItem.grade" filterable>
							<Option :value="item.value" v-for="(item, index) in jw_course_grade" :key="index">{{item.label}}</Option>
						</Select>
					</FormItem>
					<FormItem :label="$t('views_coursepack_coursepack_361')" class="w424" prop="officeId" :rules="{required: true, message: $t('views_coursepack_coursepackgroup_436'), trigger: 'change'}">
						<Input style="width:426px;" v-model="formItem.officeId" disabled :placeholder="$t('views_coursepack_coursepackgroup_436')"></Input>
						<!-- <Select v-model="formItem.officeId" disabled>
							<Option :value="item.id"  v-for="(item,index) in courseOwnerList" :key="index">{{item.name}}</Option>
						</Select> -->
					</FormItem>
					<FormItem :label="$t('views_coursepack_coursepackgroup_437')" class="w424" prop="salerDate" :rules="{ required: true, validator: validateSalerDate, trigger: 'change' }">
						<DatePicker style="width:426px;" type="daterange" separator=" ~ " placement="bottom-end" @on-change="changeDate" v-model="formItem.salerDate" :placeholder="$t('views_coursepack_coursepackgroup_438')"></DatePicker>
					</FormItem>
					<FormItem :label="$t('principalmailbox_feedbackdetail_478')" class="w424" number prop="remarks" style="margin-bottom: 0px;">
						<Input style="width:426px;" v-model="formItem.remarks" type="textarea" :rows="4" :placeholder="$t('views_coursepack_coursepackgroup_440')" />
					</FormItem>
				</Form>
				<div v-show="currentStep == 1">
					<div class="chooseCourse">
						<div class="forChoose">
							<div class="title">{{$t('views_coursepack_coursepackgroup_441', [courseForChoose.length])}}</div>
							<div class="search" style="position: relative;">
								<!-- <v-select style="width: 312px;margin: 10px;" 
									:otherStyle="{}"
									:placeholder="$t('views_coursepack_coursepackgroup_442')" icon="ios-search" 
									v-model="coursePackName" k='cnname' :datafunc="searchDropList" 
									@on-enter="textChange" @on-click="textChange">
								</v-select> -->
								<Input v-model="coursePackName" suffix="ios-search" :placeholder="$t('views_coursepack_coursepackgroup_442')" style="width: 312px;margin: 10px;" />
								<!-- <Input v-model="coursePackName"  :placeholder="$t('views_coursepack_coursepackgroup_442')" style="width: 312px;margin: 10px;" @on-enter="" />
								<Icon type="ios-search" style="position: absolute;right: 48px;top: 18px;font-size: 16px;" /> -->
							</div>
							<div class="courseList">
								<CheckboxGroup v-model="courseForChoose">
									<Checkbox :label="item.id" v-show="item.name.indexOf(coursePackName) >=0 && isIncludeArr(item.officeList)" v-for="(item,index) in courseForChooseList" :key="item.id + '_' + index">
										<span :style="{color: item.isMark == '1'? 'red': ''}">{{item.name}}</span>
									</Checkbox>
								</CheckboxGroup>
							</div>
							<div class="addButton" style="text-align: right;padding-right:30px;">
								<Button @click="addChooseCourse">添加 > </Button>
							</div>
						</div>
						<div class="hasChoosed">
							<div class="title">{{$t('views_coursepack_coursepackgroup_443', [courseHasChoosed.length])}}</div>
							<div class="courseList1">
								<CheckboxGroup v-model="courseHasChoosed" vertical>
									<Checkbox :label="item.id" v-for="item in courseHasChoosedList" :key="item.id"><span :style="{color: item.isMark == '1'? 'red': ''}">{{item.name}}</span></Checkbox>
								</CheckboxGroup>
							</div>
							<div class="addButton" style="padding-left:30px;">
								<Button @click="removeChooseCourse"> &lt; {{$t('modules_rolepeople_216')}}</Button>
							</div>
						</div>
					</div>
					<div v-show="showOverTime" style="color:red;margin-top:12px;">{{$t('views_coursepack_coursepackgroup_445')}}</div>
				</div>
				<Form v-show="currentStep == 2" ref="createCoursePackGroupRef2" :model="formItem">
					<FormItem :label="$t('scoretemplate_compontents_scoremodify_533')" class="w748" prop="officeIds" :rules="{ required: true, validator: validateOfficeIds, trigger: 'change' }">
						<checkbox-all v-if="canUseSchool.length && createModal" :dataList="canUseSchool" nameKey="officeName" valueKey="officeId" :myStyle="{'width': '606px', 'margin-right': '8px'}" :defaultSelectRes="defaultSelectRes" @changeSelectEmit="changeSelectEmit"></checkbox-all>
						<Input v-model="formItem.officeIds" style="display:none;"></Input>
					</FormItem>
					<div class="syxqsz">
						<div class="quickSet">
							<div class="d1">{{$t('views_coursepack_coursepack_378')}}</div>
							<div class="d2">--</div>
							<div class="d3">--</div>
							<div class="d4">--</div>
							<div class="d5">
								<Input v-model="quickSet.totalPrice" type="number" @on-change="changeQuickSet('totalPrice')" :placeholder="$t('views_coursepack_coursepackgroup_449')"></Input>
							</div>
							<div class="d6">
								<DatePicker type="daterange" separator=" ~ " placement="bottom-end" v-model="quickSet.yxq" @on-change="changeQuickSet('yxq')" :placeholder="$t('views_coursepack_coursepackgroup_450')" style="width: 180px;"></DatePicker>
							</div>
						</div>
						<div class="syxqszHeader">
							<div class="d1">{{$t('views_coursepack_coursepack_384')}}</div>
							<div class="d2">{{$t('views_coursepack_coursepack_379')}}</div>
							<div class="d3">{{$t('views_coursepack_coursepackgroup_453')}}</div>
							<div class="d4">{{$t('views_coursepack_coursepackgroup_454')}}</div>
							<div class="d5">{{$t('views_coursepack_coursepackgroup_455')}}</div>
							<div class="d6">{{$t('views_coursepack_coursepackgroup_456')}}</div>
						</div>
						<div class="xqSet" v-for="(val , key , index) in jwProductPriceList" :key="index">
							<div class="d1">{{val.schoolName}}</div>
							<div class="d2">{{val.num}}</div>
							<div class="d3">{{val.groupPrice}}</div>
							<div class="d4">{{val.discountAmount}}</div>
							<div class="d5">
								<Input v-model="val.totalPrice" type="number" :placeholder="$t('views_coursepack_coursepackgroup_449')" @on-change="changeZhzj(val.groupPrice, val.totalPrice, key)"></Input>
							</div>
							<div class="d6">
								<DatePicker type="daterange" separator=" ~ " placement="bottom-end" @on-change="changeDateYxq(val.salerDate, key)" v-model="val.salerDate" :placeholder="$t('views_coursepack_coursepackgroup_450')" style="width: 180px;"></DatePicker>
							</div>
						</div>
					</div>
				</Form>
			</div>
			<div slot="footer">
				<Button @click="cancel" v-show="currentStep == 0">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="prev" v-show="currentStep > 0">{{$t('teachpush_teachpush_656')}}</Button>
				<Button type="primary" @click="next" v-show="currentStep < 2" :disabled="showOverTime">{{$t('teachpush_teachpush_658')}}</Button>
				<Button type="primary" @click="ok" v-show="currentStep == 2">{{$t('classroom_allscore_54')}}</Button>
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
	import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
	import checkboxAll from "@public/modules/checkboxAll/checkboxAll.vue";
	import vSelect from "@public/modules/vSelect.vue";
	import vSearchCollapse from '@public/modules/vSearchCollapse';
    import tableDropdown from '@public/modules/tableDropdown';
    import { waitUntil } from '@public/libs/util';
	export default {
		name: 'core.coursePackGroup',
		data() {
			return {
				isActioning: false, //多次提交拦截
				tableHeightOut: 72, //324,
				mainBodyHeight: '',
				showOverTime: false,
				total: 1,
				title: this.$t('views_coursepack_coursepackgroup_461'),
				officeIds: [],
				isEdit: false,
				sortObj: {}, //组合课程包排序
				defaultSelectRes: [],
				canUseSchool: [],
				courseOwnerList: [],
				jw_course_grade: [], //组合课程包所属年级
				courseForChooseList: [],
				coursePackName: '', //名称搜索课程包
				courseForChoose: [],
				courseHasChoosed: [],
				courseHasChoosedList: [],
				currentStep: 0,
				pageNo: 1,
				pageSize: 10,
				pageCount: 1,
				name: '', // 名称搜索组合课程包
				grade: '', // 适用年级搜索组合课程包
				status: '', //课程状态搜索组合课程包  默认查全部
				salerDateSearch: '', //售卖日期至
				jwProductPriceList: {},
				quickSet: {
					num: '',
					groupPrice: '',
					totalPrice: '',
					yxq: '',
				},
				createModalLoading: true,
				createModal: false,
				formItem: {
					officeId: '', //课程包归属
					name: '', //课程包名称
					grade: '', //适用年级
					salerDate: [], //售卖日期
					officeIds: '', //适用校区校验占位
					jwProductPriceList: [], //对应校区具体价格
					remarks: '',
				},
				columns1: [{
						title: this.$t('views_coursepack_coursepack_396'),
						key: 'name',
						sortable: 'custom',
						minWidth: 100,
						width:null,
						resizable:true,
						// tooltip: true
						render: (h, params) => {
							return h('div', {
								style: {
									'word-break': 'break-all'
								},
							}, params.row.name)
						},
					},
					{
						title: this.$t('views_coursepack_coursepack_398'),
						key: 'officeName',
						minWidth: 100,
						width:null,
						resizable:true,
						// maxWidth: 200,
						// tooltip: true
						render: (h, params) => {
							return h('div', {
								style: {
									'word-break': 'break-all'
								},
							}, params.row.officeName)
						},
					},
					// {
					// 	title: this.$t('views_approvalnotice_approvalset_index_300'),
					// 	key: 'officeNames',
					// 	minWidth: 200,
					// 	width:null,
					// 	resizable:true,
					// 	// tooltip: true
					// 	render: (h, params) => {
					// 		return h('div', {
					// 			style: {
					// 				'word-break': 'break-all'
					// 			},
					// 		}, params.row.officeNames)
					// 	},
					// },
					{
						title: this.$t('views_coursepack_coursepack_397'),
						key: 'gradeLabel',
						minWidth: 80,
						width:null,
						resizable:true,
						// maxWidth: 100,
						// tooltip: true
						render: (h, params) => {
							return h('div', {
								style: {
									'word-break': 'break-all'
								},
							}, params.row.gradeLabel)
						},
					},
					{
						title: this.$t('views_coursepack_coursepackgroup_465'),
						key: 'courseNames',
						minWidth: 100,
						width:null,
						resizable:true,
						// tooltip: true
						render: (h, params) => {
							return h('div', {
								style: {
									'word-break': 'break-all'
								},
							}, params.row.courseNames)
						},
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
						title: this.$t('views_coursepack_coursepackgroup_467'),
						key: 'endTime',
						minWidth: 85,
						width:null,
						resizable:true,
						render: (h, params) => {
							return h('div', {
								style: {
									'word-break': 'break-all'
									/* color:  (params.row.editable == '0') ? '#999':'' */
								},
							}, params.row.startTime + ' -- ' + params.row.endTime)
						},
					},
					{
						title: '创建人',
						key: 'createByName',
						// tooltip: true
						minWidth: 85,
						width:null,
						resizable:true,
						render: (h, params) => {
							return h('div', {
								style: {
									'word-break': 'break-all'
								},
							}, params.row.createByName)
						},
					},
					{
						title: '创建时间',
						key: 'createDate',
						minWidth: 85,
						width:null,
						resizable:true,
						render: (h, params) => {
							return h('div', {
								style: {
									'word-break': 'break-all'
								},
							}, params.row.createDate)
						},
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
						title: '操作',
						width: 90,
						render: (h, params) => {
							return h('div', [
								params.row.ifCanModify == '1' ? h('a', {
									style: {
										/* 'margin-left':'5px', */
										/*  color:  params.row.canDo == '1' ? '':'#999' */
									},
									on: {
										click: () => {
											this.title = '设置组合课程包'
											this.currentStep = 0
											this.coursePackName = ''
											this.createModal = true
											this.getDetail(params.row.id)
										}
									}
								}, '设置') : '',
								params.row.ifCanModify == '1' ? h(tableDropdown, {
									style: {
										'margin-left': '10px'
									},
									props: {
										buttonList: [{
												label: params.row.status == '1' ? '无效' : '有效',
												key: 'changeStatus'
											},
											{
												label: '删除',
												key: 'delData',
												title: params.row.status == '1' ? '有效组合课程包不能删除' : '',
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
			jiaojiKcb() { //所选课程包的适用校区交集
				let arr = this.courseForChooseList.filter(item => {
					return this.courseForChoose.indexOf(item.id) >= 0
				})
				let ids = {}
				arr.forEach(item => {
					item.officeList.forEach(itemOfficeId => {
						let flag = true
						arr.forEach(itemChild => {
							if(itemChild.officeList.indexOf(itemOfficeId) < 0) {
								flag = false
							}
						})
						if(flag) {
							ids[itemOfficeId] = 1
						}
					})
				})
				return Object.keys(ids)
			},
			allSchoolIdList() {
				let arr = []
				this.schoolList.forEach(item => {
					arr.push(item.subId)
				})
				return arr
			},
			courseForChooseObj() {
				let obj = {}
				this.courseForChooseList.forEach(item => {
					obj[item.id] = item
				});
				return obj
			},
			jwCourseIds() {
				let arr = []
				this.courseHasChoosedList.forEach(item => {
					arr.push(item.id)
				})
				return arr
			},
			data1Ids() {
				let arr = []
				this.data1.forEach(item => {
					arr.push(item.subId)
				})
				return arr
			},
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
			vSelect,
			vSearchCollapse,
			tableDropdown
		},
		mounted() {
			this.baseData();
			this.getSchools();
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
					if (this.app.currOfficeId) {
						this.officeIds = this.app.currOfficeId == 'all' ? [] : [this.app.currOfficeId];
					}
					return this.app.currOfficeId || false;
				},
				() => {
					this.getListData();
				}
			);
		},
		methods: {
			...mapMutations(["updateLoadingStatus"]),
			/*...mapActions("portal", ["updateAside"]), */
			visibleChange(val){
				this.createModal = val
				if(!val){
					this.canUseSchool = []
					this.defaultSelectRes = []
				}
			},
            actualHeightFun() {
                // table实际渲染高度
                if(document.getElementById('bigTableMiddle') && 
                    document.getElementById('bigTableMiddle').getElementsByTagName('table') && 
                    document.getElementById('bigTableMiddle').getElementsByTagName('table').length &&
                    document.getElementById('bigTableMiddle').getElementsByTagName('table')[1].offsetHeight > 0) {
                    this.actualHeight = document.getElementById('bigTableMiddle').getElementsByTagName('table')[1].offsetHeight
                }
                // console.log('actualHeight')
            },
			changeDivHeight(height) {
				this.tableHeightOut = height
			},
			initMainBodyHeight() {
				// console.log(document.getElementById('mainBody').offsetHeight - 16 * 2)
				this.mainBodyHeight = document.body.offsetHeight - 104 - 16 * 2;
			},
			isIncludeArr(arr) {
				let flag = true
				this.jiaojiKcb.forEach(item => {
					if(arr.indexOf(item) < 0) {
						flag = false
					}
				})
				return flag
			},
			bigTableExample() {
				this.$router.push({
					name: 'core.bigTableExample'
				})
			},
			doActionItem(obj) {
				if(obj.key === 'delData') { //删除
					if(obj.row.status != '1') {
						this.$Modal.confirm({
							title: '确认删除',
							content: '确定删除该组合课程包？',
							onOk: () => {
								this.deleteCoursePackGroup(obj.row.id)
							},
							onCancel: () => {}
						});
					}
				} else if(obj.key === 'changeStatus') {
					this.$Modal.confirm({
						title: '确认状态修改',
						content: '确定设置该组合课程包为' + (obj.row.status == '1' ? '无效' : '有效') + '？',
						onOk: () => {
							this.changeStatus(obj.row.id, obj.row.status)
						},
						onCancel: () => {}
					});
				} else if(obj.key === 'copy') {
					this.copyCoursePack(obj.row.id)
				}
			},
			validateOfficeIds(rule, value, callback) {
				if(!this.formItem.officeIds) {
					callback(new Error(this.$t('views_coursepack_coursepackgroup_447')));
				} else {
					callback();
				}
			},
			validateCourseName(rule, value, callback) {
				if(!value || !value.trim()) {
					callback(new Error('请输入有效组合课程包名称'));
				} else {
					callback();
				}
			},
			validateSalerDate(rule, value, callback) {
				if(!value || value.length != 2 || value[0] == '') {
					callback(new Error('请选择组合有效期'));
				} else {
					callback();
				}
			},
			getDetail(id) {
				this.updateLoadingStatus({
					isLoading: true
				});
				// jwCourse.coursePackGroupForm({
				common.coursePackGroupForm({
						id
					})
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							let result = res.data.data
							this.isEdit = true
							this.formItem = result
							this.formItem.officeId = this.userInfo.officeName
							this.formItem.salerDate = [result.startTime, result.endTime]
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({
							isLoading: false
						});
					});
			},
			getSchools() {
				/*let type = '3' //课程包分类,适用年级
				jwCourse.officeList({
					type
				})*/
				sysUser.dataScopeFilter({type:3})
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
				// let types = 'jw_course_type,jw_course_grade' //课程包分类,适用年级
				// sysDict.batchListData({
				// 	types
				// })
				// .then(valid.call(this))
				// .then(res => {
				// 	if (res.ok) {
				// 		this.jw_course_type = res.data.data.jw_course_type
				// 		this.jw_course_grade = res.data.data.jw_course_grade
				// 	}
				// })
				// .catch(errors.call(this))
				// .finally(() => {
				// 	this.updateLoadingStatus({ isLoading: false });
				// });

				let type = 'jw_course_type'
				sysDict.findChildDictByParentDict({
						type
					})
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.jw_course_grade = res.data.data
						}
					})
					.catch(errors.call(this))
					.finally(() => {
					});
			},
			textChange: function(val) {
				this.coursePackName = val
				this.getCourseList()
			},
			searchDropList(word) {
				return new Promise((resolve, reject) => {});
			},
			addChooseCourse() {
				this.courseForChoose.forEach(item => {
					if(this.jwCourseIds.indexOf(item) < 0) {
						this.courseHasChoosedList.push(this.courseForChooseObj[item])
					}
				});
			},
			removeChooseCourse() {
				let q = []
				this.courseHasChoosedList.forEach((item, index) => {
					if(this.courseHasChoosed.indexOf(item.id) < 0) {
						q.push(item)
					}
				})
				this.courseHasChoosedList = q
				let q1 = []
				this.courseForChoose.forEach((item, index) => {
					if(this.courseHasChoosed.indexOf(item) < 0) {
						q1.push(item)
					}
				})
				this.courseForChoose = q1
				this.courseHasChoosed = []
			},
			prev() {
				this.currentStep = this.currentStep - 1
			},
			next() {
				if(this.currentStep == 0) {
					if(this.validForm(this.currentStep)) {
						this.updateLoadingStatus({
							isLoading: true
						});
						let obj = {
							name: this.formItem.name,
						}
						if(this.isEdit) {
							obj.id = this.formItem.id
						}
						// jwCourse.checkName(obj)
						common.checkName(obj)
							.then(valid.call(this))
							.then(res => {
								if(res.ok) {
									this.currentStep = this.currentStep + 1
									if(this.currentStep == 1) {
										this.getCourseList()
									}
								}
							})
							.catch(errors.call(this))
							.finally(() => {
								this.updateLoadingStatus({
									isLoading: false
								});
							});
					}
				} else {
					if(this.courseHasChoosedList.length) {
						this.getListGroupOfficePrice()
					} else {
						this.$Message.error('请选择课程包')
					}
				}
			},
			getListGroupOfficePrice() {
				let param = {
					itemIds: this.jwCourseIds.join(','),
				}
				this.updateLoadingStatus({
					isLoading: true
				});
				// jwCourse.listGroupOfficePrice(param)
				common.listGroupOfficePrice(param)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							if(res.data.data.length) {
								this.currentStep = this.currentStep + 1
								this.canUseSchool = res.data.data
								if(this.isEdit) {
									// this.defaultSelectRes = this.formItem.officeIds.split(',')
									let defaultSelectRes = this.formItem.officeIds ? this.formItem.officeIds.split(',') : []
									if(defaultSelectRes && !defaultSelectRes[0]){
										defaultSelectRes.shift()
									}
									if(defaultSelectRes && !defaultSelectRes[defaultSelectRes.length - 1]){
										defaultSelectRes.splice(defaultSelectRes.length - 1 , 1)
									}
									this.defaultSelectRes = defaultSelectRes

									//this.formItem.jwProductPriceList.map((item)=>{return item.officeId})
									let _jwProductPriceListMap = {}
									this.formItem.jwProductPriceList.forEach(item => {
										let _obj = this.canUseSchool.filter((_item) => {
											return _item.officeId == item.officeId
										})[0]
										if(_obj){
											item.schoolName = _obj.officeName
											item.salerDate = [item.startTime, item.endTime]
											let groupPrice = this.canUseSchool.filter((_item) => {
												return _item.officeId == item.officeId
											})[0].groupPrice
											item.groupPrice = parseFloat(Number(groupPrice).toFixed(2))
											item.totalPrice = parseFloat(Number(item.totalPrice).toFixed(2))
											item.discountAmount = parseFloat((item.groupPrice - item.totalPrice).toFixed(2))
											_jwProductPriceListMap[item.officeId] = item
										}
									})
									this.jwProductPriceList = _jwProductPriceListMap
								} else {
									this.quickSet.yxq = [].concat(this.formItem.salerDate)
								}
							} else {
								this.$Message.info('所选课程包组合没有适用的校区，请重新选择')
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
			getCourseList() {
				this.updateLoadingStatus({
					isLoading: true
				});
				let param = {
					pageNo: 1,
					pageSize: 1000,
					officeId: this.userInfo.officeId
					// name: this.coursePackName,
					// status: '1',
				}
				if(this.formItem.id) {
					param.packId = this.formItem.id
				}
				// jwCourse.coursePackGroupListCourse(param)
				common.coursePackGroupListCourse(param)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							let result = res.data.data
							this.courseForChooseList = result
							if(this.isEdit) {
								this.courseForChoose = [].concat(this.formItem.jwCourseIds)
								this.courseHasChoosedList = this.courseForChooseList.filter(item => {
									return this.formItem.jwCourseIds.indexOf(item.id) >= 0
								})

								let showOverTime = false
								this.courseHasChoosedList.forEach(item => {
									if(item.isMark == '1') {
										showOverTime = true
									}
								})
								this.showOverTime = showOverTime
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
			validForm(step) {
				let flag = false
				this.$refs['createCoursePackGroupRef' + step].validate((validRes) => {
					if(validRes) {
						flag = true
					}
				})
				return flag
			},
			pageSizeChange(pageSize) {
				this.pageSize = pageSize
				this.getListData()
			},
			pageChange(pageNo) {
				this.pageNo = pageNo
				this.getListData()
			},
			resetSearch() {
				this.officeIds = this.app.currOfficeId == 'all' ? [] : [this.app.currOfficeId];
				this.name = ''
				this.grade = ''
				this.status = ''
				this.salerDateSearch = []
				this.pageNo = 1
				this.getListData()
			},
			copyCoursePack(id) {
				// jwCourse.saveCopyCoursePackGroup({
				common.saveCopyCoursePackGroup({
						id
					})
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.$Message.success('复制成功');
							this.pageNo = 1
							this.getListData()
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			changeStatus(id, status) {
				let params = {
					id,
					status: status == '1' ? '0' : '1'
				}
				// jwCourse.saveStatusCoursePackGroup(params)
				common.saveStatusCoursePackGroup(params)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.$Message.success('状态修改成功');
							// this.pageNo = 1
							this.getListData();
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			deleteCoursePackGroup(id) {
				// jwCourse.deleteCoursePackGroup({
				common.deleteCoursePackGroup({
						id
					})
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.$Message.success('删除成功');
							this.pageNo = 1
							this.getListData();
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			changeQuickSet(type) {
				if(type != 'yxq') {
					setTimeout(() => {
						this.$set(this.quickSet, type, parseFloat(Number(this.quickSet[type]).toFixed(2)))
					}, 0)
				}
				for(let key in this.jwProductPriceList) {
					if(type != 'yxq') {
						let totalPrice = parseFloat(Number(this.quickSet[type]).toFixed(2))
						this.jwProductPriceList[key][type] = totalPrice
						this.changeZhzj(this.jwProductPriceList[key].groupPrice, totalPrice, key)
					} else {
						if(this.quickSet[type] && this.quickSet[type].length && this.quickSet[type][0]) {
							this.jwProductPriceList[key].salerDate = [new Date(this.quickSet[type][0]), new Date(this.quickSet[type][1])]
							this.jwProductPriceList[key]['startTime'] = new Date(this.quickSet[type][0]).format('yyyy-MM-dd') + ' 00:00:00'
							this.jwProductPriceList[key]['endTime'] = new Date(this.quickSet[type][1]).format('yyyy-MM-dd') + ' 00:00:00'
						} else {
							this.jwProductPriceList[key]['startTime'] = ''
							this.jwProductPriceList[key]['endTime'] = ''
						}
					}
				}
				this.handleJwProductPriceList()
			},
			changeDate(date) {
				// [Tue Apr 23 2019 00:00:00 GMT+0800 (中国标准时间), Fri May 31 2019 00:00:00 GMT+0800 (中国标准时间), __ob__: Observer]
				if(date && date.length) {
					this.formItem.startTime = date[0] + ' 00:00:00'
					this.formItem.endTime = date[1] + ' 00:00:00'
				} else {
					this.formItem.startTime = ''
					this.formItem.endTime = ''
				}
			},
			changeZhzj(dj, zj, key) {
				let yhje = parseFloat((Number(dj) - Number(zj)).toFixed(2))
				//this.jwProductPriceList[key].totalPrice = parseFloat(Number(zj).toFixed(2))
				setTimeout(() => {
					this.$set(this.jwProductPriceList[key], 'totalPrice', parseFloat(Number(zj).toFixed(2)))
					this.$forceUpdate()
				})
				this.$set(this.jwProductPriceList[key], 'discountAmount', yhje)
				this.handleJwProductPriceList()
			},
			changeDateYxq(date, key) {
				// [Tue Apr 23 2019 00:00:00 GMT+0800 (中国标准时间), Fri May 31 2019 00:00:00 GMT+0800 (中国标准时间), __ob__: Observer]
				if(date && date.length && date[0]) {
					this.$set(this.jwProductPriceList[key], 'startTime', new Date(date[0]).format('yyyy-MM-dd') + ' 00:00:00')
					this.$set(this.jwProductPriceList[key], 'endTime', new Date(date[1]).format('yyyy-MM-dd') + ' 00:00:00')
				} else {
					this.$set(this.jwProductPriceList[key], 'startTime', '')
					this.$set(this.jwProductPriceList[key], 'endTime', '')
				}
				this.handleJwProductPriceList()
			},
			changeSelectEmit(selectRes) {
				console.log(selectRes)
				this.formItem.officeIds = selectRes.join(',')
				this.$set(this.formItem, 'officeIds', selectRes.join(','))
				let xqSetKeys = Object.keys(this.jwProductPriceList)
				selectRes.forEach(item => { //如果已选校区不在上次选择的结果中，则加入校区设置Map
					if(xqSetKeys.indexOf(item) < 0) {
						let obj = this.canUseSchool.filter((_item) => {
							return _item.officeId == item
						})[0]
						console.log(obj)
						this.jwProductPriceList[item] = {
							officeId: obj.officeId,
							schoolName: obj.officeName,
							num: obj.num,
							groupPrice: parseFloat(Number(obj.groupPrice).toFixed(2))
						}
						//如果先设置了快速设置的日期。总价。则计算
						if(this.quickSet.yxq && this.quickSet.yxq.length == 2 && this.quickSet.yxq[0] != ''){
							this.jwProductPriceList[item].salerDate = [new Date(this.quickSet.yxq[0]), new Date(this.quickSet.yxq[1])]
							this.jwProductPriceList[item].startTime = new Date(this.quickSet.yxq[0]).format('yyyy-MM-dd') + ' 00:00:00'
							this.jwProductPriceList[item].endTime = new Date(this.quickSet.yxq[1]).format('yyyy-MM-dd') + ' 00:00:00'
						}
						if(this.quickSet.totalPrice){
							this.jwProductPriceList[item].totalPrice = parseFloat(Number(this.quickSet.totalPrice).toFixed(2))
							this.jwProductPriceList[item].discountAmount = parseFloat((Number(this.jwProductPriceList[item].groupPrice) - this.jwProductPriceList[item].totalPrice).toFixed(2))
						}
					}
				});
				let xqSetKeys1 = Object.keys(this.jwProductPriceList)
				xqSetKeys1.forEach(item => { //如果现有校区中，存在不在选择结果集中的学校，则删除
					if(selectRes.indexOf(item) < 0) {
						delete this.jwProductPriceList[item]
					}
				});
				this.handleJwProductPriceList()
			},
			handleJwProductPriceList() {
				let res = []
				for(let key in this.jwProductPriceList) {
					res.push(this.jwProductPriceList[key])
				}
				this.formItem.jwProductPriceList = res
				this.$forceUpdate()
			},
			isFailVaild(flag) {
				this.createModalLoading = false
				this.createModal = flag
				setTimeout(() => {
					this.createModalLoading = true;
				}, 0);
			},
			ok() {
				if(!this.formItem.officeIds) {
					this.$Message.error('请选择适用校区')
					this.isFailVaild(true)
					return;
				}
				let isFullJwProductPriceList = true
				//let reg = /^\+?[1-9][0-9]*$/;  
				let reg = /^\d+(\.\d{1,2})?$/;
				this.formItem.jwProductPriceList.forEach(item => {
					if(!item.totalPrice || !reg.test(item.totalPrice)) {
						isFullJwProductPriceList = false
					}
					if(item.salerDate.length != 2 || item.salerDate[0] == '') {
						isFullJwProductPriceList = false
					}
				})
				if(!isFullJwProductPriceList) {
					this.$Message.error({
						content: '请完善各校区组合总价、有效期。组合总价必须为正数',
						duration: 5
					})
					this.isFailVaild(true)
					return;
				}

				if(this.isActioning){ //多次提交拦截
					return
				}
				this.isActioning = true
				this.updateLoadingStatus({ isLoading: true });

				this.formItem.jwCourseIds = this.jwCourseIds
				this.formItem.officeId = this.userInfo.officeId
				this.formItem.name = this.formItem.name.trim()

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
				this.formItem.officeIds = ',' + officeIds.join(',') + ',';
				// jwCourse.coursePackGroupSave(this.formItem)
				common.coursePackGroupSave(this.formItem)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							/* this.courseOwnerList = res.data.data.allCompany */
							this.isFailVaild(false)
							// if(this.title == this.$t('views_coursepack_coursepackgroup_468')) {
							if(this.isEdit) {
								this.$Message.success(this.$t('views_coursepack_coursepack_413'));
							} else {
								this.$Message.success(this.$t('views_coursepack_coursepackgroup_470'));
							}
							// if(this.title != this.$t('modules_spoc_core_web_src_views_coursepack_coursepackgroup_129')){
							if(!this.isEdit){
								this.pageNo = 1
							}
							this.getListData()
						} else {
							this.isFailVaild(true)
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
				//  this.$refs[name].resetFields();
			},
			cancel() {
				this.createModal = false
			},
			showCreateModal() {
				this.title = this.$t('views_coursepack_coursepackgroup_424')
				this.isEdit = false
				this.showOverTime = false
				this.formItem = {}
				if(this.$refs.createCoursePackGroupRef0) {
					this.$refs.createCoursePackGroupRef0.resetFields();
				}
				if(this.$refs.createCoursePackGroupRef1) {
					this.$refs.createCoursePackGroupRef1.resetFields();
				}
				if(this.$refs.createCoursePackGroupRef2) {
					this.$refs.createCoursePackGroupRef2.resetFields();
				}
				this.formItem.officeId = this.userInfo.officeName
				this.currentStep = 0
				this.jwProductPriceList = {}
				this.courseHasChoosed = []
				this.courseForChoose = []
				this.courseHasChoosedList = []
				this.formItem.jwProductPriceList = []
				this.quickSet = {}
				this.coursePackName = ''
				this.createModal = true
			},
			sortChange(sortObj) {
				this.sortObj = sortObj
				this.pageNo = 1
				this.getListData();
			},
			getListData() {
				this.updateLoadingStatus({
					isLoading: true
				});
				let param = {
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					name: this.name,
					grade: this.grade,
					officeIds: this.officeIds.join(','),
					status: this.status,
					startTime: this.salerDateSearch.length && this.salerDateSearch[0] ? new Date(this.salerDateSearch[0]).format('yyyy-MM-dd') : '',
					endTime: this.salerDateSearch.length && this.salerDateSearch[1] ? new Date(this.salerDateSearch[1]).format('yyyy-MM-dd') : '',
				}
				if(this.sortObj.order != 'normal' && this.sortObj.key) {
					param.orderByType = this.sortObj.key
					param.orderByStatus = this.sortObj.order == 'asc' ? '1' : '2'
				}

				// jwCourse.coursePackGroupListPage(param)
				common.coursePackGroupListPage(param)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							let result = res.data.data
                            this.data1 = result.list
                            this.uploadHeight = true;
							this.total = result.total
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
			courseHasChoosedList(newVal) {
				let showOverTime = false
				this.courseHasChoosedList.forEach(item => {
					if(item.isMark == '1') {
						showOverTime = true
					}
				})
				this.showOverTime = showOverTime
			},
			"app.currOfficeId": function(val, oldVal) {
				if (oldVal) {
					this.officeIds = val == 'all' ? [] : [val];
					this.getListData();
				}
            },
            data1: {
                handler(val, oval) {
                    // setTimeout(() => {
                    //     this.actualHeightFun();
                    // }, 100);
                    this.$nextTick(() => {
                        this.actualHeightFun();
                    })
                },
                deep: true
            }
		}
	};
</script>