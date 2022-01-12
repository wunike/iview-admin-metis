<style lang="less">
.taskCenter {
	.my-table {
		width: 100%;
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		padding: 0 16px;
		margin-top: 10px;
		.subTypeNameStyle {
			margin-left: 11px;
			.ivu-table-cell {
				margin-left: 11px;
			}
		}
	}
	.search-title {
		padding: 10px;
		background: #fff;
		.ivu-tabs-bar {
			margin-bottom: 0;
			border-radius: 4px 4px 0 0;
		}
	}
	.v-search-collapse-container {
		padding-left: 16px;
	}
    .search_form_create{
        vertical-align: top;
    }
}

.taskCompleteModal{
	.w306{
		width: 306px;
	}
	.ivu-modal-body{
		padding-bottom: 0;
	}
}
</style>
<template>
	<div class="taskCenter">
		<Modal
			v-model="taskCompleteModal"
			:title="$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1721')"
			width="500"
			class="taskCompleteModal"
			:mask-closable="false"
			@on-cancel="cancelTaskComplete"
			:loading="loadingTaskCompleteModal"
		>
			<div>
				 <Form ref="taskCompleteFrom" :model="taskCompleteObj" :label-width="120" v-show="canShow">
                    <FormItem v-if="detailObj.taskTpl.completeResultList" :label="$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1722')" prop="resultValue"  :rules="{required: true, message: $t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1723'), trigger: 'change'}">
                        <Select v-model="taskCompleteObj.resultValue" class="w306" :placeholder="$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1724')">
                            <Option v-for="(item, index) in detailObj.taskTpl.completeResultList" :key="index" :value="item.resultValue">{{item.resultLabel}}</Option>
                        </Select>
                    </FormItem>
					<form-create
						ref="fc"
						v-model="fApi"
						:rule="rule"
						:option="option"
						v-if="taskCompleteModal && hasFormData"></form-create>
                    <FormItem :label="$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1725')" prop="remarks"
						:rules="{ required: true, message: $t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1726'), trigger: 'blur' }">
                        <Input v-model="taskCompleteObj.remarks" type="textarea" class="w306"  :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1727')"></Input>
                    </FormItem>
                </Form>
			</div>
			<div slot="footer">
				<Button @click="cancelTaskComplete" style="margin-right: 16px">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1728')}}</Button>
				<Button type="primary" @click="handleSubmit">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1729')}}</Button>
			</div>
		</Modal>
		<div class="search-title">
			<Tabs v-model="taskType" :animated="false" @on-click="changeTabs" @changeDivHeight="changeDivHeight">
				<TabPane :label="$t('modules_spoc_crm_web_src_views_customer360_components_tasklists_1036')" name="follow task"></TabPane>
				<TabPane :label="$t('modules_spoc_crm_web_src_views_customer360_components_tasklists_1037')" name="service task"></TabPane>
				<!-- <TabPane :label="$t('modules_spoc_crm_web_src_views_customer360_components_tasklists_1038')" name="sop task"></TabPane> -->
			</Tabs>
			<v-search-collapse @search="doSearch" @reset="resetSearch">
				<DatePicker
					ref="DatePicker"
					:options="options3"
					split-panels
					@on-open-change="setOptTime"
					@on-change="changeDateTimeOrStatus"
					v-model="searchObj.dateTime"
					type="daterange"
					:transfer="true"
					placement="bottom-start"
					separator=" ~ "
					:placeholder="$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1733')"
					style="width:224px;"
				></DatePicker>
				<Select v-model="searchObj.officeId" style="width: 224px;" clearable :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_537')">
					<Option v-for="item in officeIdList" :value="item.id" :key="item.id">{{item.code}}{{ item.name }}</Option>
				</Select>
				<Select v-model="searchObj.dateTime_status" @on-change="change_dateTime_status" style="width: 280px;" clearable :placeholder="$t('modules_spoc_core_web_src_views_tasktemplate_index_441')">
					<Option value="1">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1736')}}</Option>
					<Option value="2">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1737')}}</Option>
					<Option value="7">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1738')}}</Option>
					<Option value="30">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1739')}}</Option>
				</Select>
				<Select
					@on-change="changeDateTimeOrStatus"
					v-model="searchObj.status"
					style="width: 140px;"
					clearable
					:transfer="true"
					:placeholder="$t('modules_spoc_core_web_src_views_tasktemplate_index_441')"
				>
					<Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				<Select
					v-model="searchObj.isExpire"
					style="width: 140px;"
					clearable
					:transfer="true"
					:placeholder="$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1740')"
				>
					<Option v-for="item in isExpireList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				<!-- <Input v-model="searchObj.tplName" :placeholder="$t('modules_spoc_core_web_src_views_announcement_index_111')"></Input> -->
				<Select
					v-model="searchObj.tplName"
					:placeholder="$t('modules_spoc_core_web_src_views_announcement_index_111')"
					clearable
					filterable="true"
					remote
					@on-query-change="changeTplNameList"
					:remote-method="remoteTaskTplList">
					<Option
						v-for="item in tplNameList"
						:value="item.name"
						:key="item.id"
					>{{ item.name }}</Option>
				</Select>
				<Select
					v-model="searchObj.executorId"
					:placeholder="$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1742')"
					clearable
					filterable="true"
					remote
					@on-query-change="changeExecutorId"
					:remote-method="remoteExecutor">
					<Option
						v-for="item in executorList"
						:value="item.value"
						:key="item.value"
					>{{ item.name }}</Option>
				</Select>
				<Select
					v-model="searchObj.createBy"
					:placeholder="$t('scoretemplate_scoretemplate_569')"
					clearable
					filterable="true"
					@on-query-change="changeCreateBy"
					remote
					:remote-method="remoteCreateBy">
					<Option
						v-for="item in createByList"
						:value="item.value"
						:key="item.value"
					>{{ item.name }}</Option>
				</Select>
				<!-- <Input v-model="searchObj.executorId" :placeholder="$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1742')"></Input>
				<Input v-model="searchObj.createBy" :placeholder="$t('scoretemplate_scoretemplate_569')"></Input> -->
				<Input v-model="searchObj.objectName" :placeholder="$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1744')"></Input>
                <form-create ref="fc1" v-model="fApi1" :rule="rule1" :option="formOptions" class="search_form_create"></form-create>
			</v-search-collapse>
		</div>
		<big-table
			v-if="defaultShowCol"
			class="my-table"
			:tableName="tableName"
            :tableHeightOut="tableHeightOut"
			:tableData="tableData"
			:tableColumnArray="tableColumnArray"
			:defaultShowCol="defaultShowCol"
			:canSelection="taskType == 'sop task' && tabType == '0'"
			@selectionChange="selectionChange"
			:dataTotal="dataTotal"
			:btnList="btnList"
			:canChangeHeight="!ctNo"
			:isShowSelectTableColumn="true"
			:updateShowTitleMethod="updateShowTitle"
			:updateShowTitleKey="updateShowTitleKey"
			:pageNo="pageNo"
			@resetDefault="resetDefaultCol"
			@pageChange="pageChange"
			@changeTableType="changeTableType"
		></big-table>
		<task-modal ref="taskModalRef" @doSearch="doSearch"></task-modal>
		<task-detail-modal @refresh="doSearch" ref="taskDeatilModalRef"></task-detail-modal>
	</div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import valid, {
	errors,
	common,
	sysUser,
	sysDict,
    sysProps,
	sysCommonSql
} from "../../libs/request";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
import bigTable from "@public/modules/bigTable.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import taskModal from "./taskModal.vue";
import taskDetailModal from "./taskDetailModal.vue";
import formMaps from './utils/formMap.js';
import formOption from './utils/formOption.js';
import formCreateSetting from './utils/formCreate.js';
import formCreateSetting1 from './formCreate.js';
export default {
	name: 'crm.taskCenter',
    mixins: [formOption,formMaps,formCreateSetting,formCreateSetting1],
	data() {
		return {
			options3: DatePickerOpt(this,'DatePicker',3),
            /* 搜索相关开始 */
            tableHeightOut: 72 + 68, //324,
			tplNameList: [],
			isChangeDateOrStatus: false,
			createByList: [],
			executorList: [],
			tabType: '0',
			taskType: "follow task",
			btnList: [
				{
					type: "",
					btnClick: this.addNew1,
					text: "添加任务"
				},
				// {
				// 	type: "",
				// 	btnClick: this.addNew2,
				// 	text: "添加我的任务"
				// }
			],
			officeIdList: [],
			statusList: [
				{
					id: '0',
					name: '未完成'
				},
				{
					id: '1',
					name: '已完成'
				}
			],
			isExpireList: [
				{
					id: '0',
					name: '未过期'
				},
				{
					id: '1',
					name: '已过期'
				}
			],
			searchObj: {
				dateTime_status: '',
				dateTime: ["", ""],
				officeId: "",
				status: "",
				isExpire: "",
				tplName: "",
				executorId: "",
				createBy: "",
				objectName: "",
                fieldJsonData:{},
			},
			pageNo: 1,
			pageSize: this.$store.state.app.pageSizeGlobal,
            /*搜索相关结束*/
            updateShowTitleKey: 'comTaskListPage',
			updateShowTitle: common.updateShowTitleComTask,
			tableName: [
				// {
				// 	name: "全部",
				// 	value: "2"
				// },
				{
					name: this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1745'),
					value: "0"
				},
				{
					name: this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1746'),
					value: "1"
				}
			],
			defaultShowCol: null,
			dataTotal: 0,
			tableData: [],
			tableColumnArray: [
				{
					key:"objectName",
					render: (h, params) => {
						return h("div", [
							h(
								"a",
								{
									props: {
										type: "text",
										size: "small"
									},
									on: {
										click: () => {
											this.$router.push({
												name:'crm.customer360',
												query:{
													id:params.row.objectId
												}

											})
										}
									}
								},
								params.row.objectName
							)
						]);
					}
				},
				{
					key:"isSelf",
					render: (h, params) => {
						let label = '-'
						if(params.row.isSelf == '1'){
							label = this.$t('crm.taskCenter')
						}
						if(params.row.isSelf == '0'){
							label = this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1748')
						}
						return h("div", {}, label)
					}
				},
				{
					key:"status",
					render: (h, params) => {
						let label = '-'
						if(params.row.status == '1'){
							label = this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1749')
						}
						if(params.row.status == '0'){
							label = this.$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1445')
						}
						return h("div", {}, label)
					}
				},
				// {
				// 	key:"isExpire",
				// 	render: (h, params) => {
				// 		let label = '-'
				// 		if(params.row.isExpire == '1'){
				// 			label = '已过期'
				// 		}
				// 		if(params.row.isExpire == '0'){
				// 			label = '未过期'
				// 		}
				// 		return h("div", {}, label)
				// 	}
				// },
				{
					key:"isExpire",
					render: (h, params) => {
						let label = '-'
						if(params.row.isExpire == '1'){
							label = this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1751')
						}
						if(params.row.isExpire == '0'){
							label = this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1752')
						}
						return h("div", {}, label)
					}
				},
				{
					title: this.$t('classlist_compontents_detailinfo_45'),
					key: "doAction",
					width: 130,
					render: (h, params) => {
						let that = this;
						return h("div", {}, [
							this.myButtonPrem.indexOf('delete') >=0 && params.row.createBy == this.userInfo.id ? h(
								"a",
								{
									style: {
										"margin-right": "8px"
									},
									on: {
										click: () => {
											this.$Modal.confirm({
												title: this.$t('views_coursepack_bigtableexample_345'),
												content: this.$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1457'),
												onOk: () => {
													this.deleteById(params.row.id);
												},
												onCancel: () => {
												}
											});
										}
									}
								},
								this.$t('classlist_compontents_detailinfo_46')
							) : '',
							h(
								"a",
								{
									style: {
										"margin-right": "8px"
									},
									on: {
										click: () => {
											this.$refs.taskDeatilModalRef.showModal(params.row.id);
										}
									}
								},
								params.row.status == '1' ? this.$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1461') :this.$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1460')
							),
							// (params.row.status == '0' && this.myButtonPrem.indexOf('finish') >=0 && params.row.executorId == this.userInfo.id)  ? h(
							// 	"a",
							// 	{
							// 		style: {
							// 			"margin-right": "8px"
							// 		},
							// 		on: {
							// 			click: () => {
							// 				this.$refs.taskDeatilModalRef.showModalComplete(params.row.id);
							// 			}
							// 		}
							// 	},
							// 	"完成任务"
							// ) : ''
						]);
					}
				}
			],
			selection:[],
			taskCompleteModal: false,
			taskCompleteObj: {
				resultValue:'',
				remarks: ''
			},
			loadingTaskCompleteModal: false,
			detailObj:{
				completeResultObj: '',
				commentList: [],
				taskTpl:{}
			},
			canShow: false,
			hasFormData: false,
		};
	},
	computed: {
		...mapState(["app", "buttonPerm","userInfo"]),
        myButtonPrem() {
            return this.buttonPerm ? (this.buttonPerm["crm.taskCenter"] || []) : [];
        }
	},
	components: {
		bigTable,
		vSearchCollapse,
		taskModal,
		taskDetailModal
	},
	mounted() {
        this.getFormLayout();
        if(this.$route.query.modalType) {
            // 工作台任务中心点击确认到访
            this.$refs.taskDeatilModalRef.showModal(this.$route.query.taskId);
		}
		if(!this.$route.query.modalType && this.$route.query.taskId){
			//消息打开
			this.$refs.taskDeatilModalRef.showModal(this.$route.query.taskId)
		}
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		resetDefaultCol(){
			this.updateLoadingStatus({ isLoading: true });
			let request
			if(this.taskType != 'sop task'){
				request = common.clearShowFieldComTask({
					pageIdentifier: "comTaskListPage",
				})
			} else {
				request = common.clearShowFieldComTask({
					pageIdentifier: "comTasklistSopPage",
				})
			}
            request.then(valid.call(this))
            .then(res => {
                if (res.ok) {
					if(this.taskType != 'sop task'){
						this.getShowTitle(true);
					} else {
						this.getShowTitleSop(true);
					}
                } else {
                    this.updateLoadingStatus({ isLoading: false });
                }
            })
            .catch(errors.call(this))
            .finally(() => {

            });
        },
        getFormLayout() {
            let arr = [];
            let params = {
                tableName: 'com_task'
            };
            sysProps.list(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let list = res.data.data;
                        this.setFormAttr1(list);
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.$nextTick(() => {
                        this.getShowTitle();
                        this.dataScopeFilter();
                    });
                });
        },
		toCompleteMore(){
			if(!this.selection.length){
				this.$Message.error(this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1759'))
				return false
			}
			let taskType = ''
			let taskTypeFlag = false
			this.selection.forEach(item => {
				if(taskType == '') {
					taskType = item.tplId
				}
				if(taskType != item.tplId){
					taskTypeFlag = true
				}
			});
			if(taskTypeFlag){ // 不是同一主题的模板
				this.$Message.error(this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1760'))
				return false
			}


			let taskStatusFlag = false
			this.selection.forEach(item => {
				if(item.status != '0') {
					taskStatusFlag = true
				}
			});
			if(taskStatusFlag){ // 存在已完成的任务
				this.$Message.error(this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1761'))
				return false
			}

			this.getDetail(this.selection[0].id)
		},
		cancelTaskComplete(){
			this.taskCompleteModal = false
			this.$refs.taskCompleteFrom.resetFields()
		},
		//获取详情 查看是否包含动态表单、是否包含动态上传
		getDetail(id){
			this.updateLoadingStatus({ isLoading: true });
			common
			.formComTask({
				id,
			})
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
					this.detailObj = res.data.data

					this.hasFormData = false

					let _formData = this.detailObj.taskTpl.formData
					if(_formData && _formData.length){
						let formData = JSON.parse(_formData)
						if(formData && formData.length){
							let uploadFormData = formData.filter(item=>{ return item.jdbcType == 'upload' || item.jdbcType == 'uploadTemplate' })  //过滤出来是上传的动态表单
							if(uploadFormData.length){
								this.updateLoadingStatus({ isLoading: false });
								this.$Message.error(this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1762'))
								return false // 包含动态上传。返回
							}

							let noUploadFormData = formData.filter(item=>{ return item.jdbcType != 'upload' && item.jdbcType != 'uploadTemplate' }) // 过滤出来不是上传的动态表单
							if(noUploadFormData.length){
								this.hasFormData = true
								this.setFormAttr(formData);
								setTimeout(() => {
									let $f = this.$refs.fc.$f
									// let $f = this.fApi
									if($f){
										$f.disabled(false)
									}
								}, 1000);
							} else {
								this.hasFormData = false
							}
							this.taskCompleteModal = true

						} else {
							this.hasFormData = false
							this.taskCompleteModal = true
						}
					} else {
						this.hasFormData = false
						this.taskCompleteModal = true
					}
				}
			})
			.catch(errors.call(this))
			.finally(() => {
				setTimeout(()=>{
					this.canShow = true
					this.updateLoadingStatus({ isLoading: false });
				},1000)
			});
		},
		selectionChange(selection) {
            this.selection = selection
		},
		handleSubmit(){
			//有动态表单，并且直接完成，则先获取动态表单的值
			console.log(444444444444,this.hasFormData)
			if(this.hasFormData){
				let $f = this.fApi
				$f.submit((formData,api)=>{
					console.log(this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1763') , formData)
					this.doTaskCompleteMore(JSON.stringify(formData))
				},(api)=>{
					console.log(this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1764'))
					this.$refs.taskCompleteFrom.validate()
				})
			} else {
				this.doTaskCompleteMore("")
			}

		},
		doTaskCompleteMore(formData){
			this.$refs.taskCompleteFrom.validate((valid) => {
				if (valid) {
					this.taskCompleteModal = false
					let detailList = [{ "content":this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1765') }]
					let remarks = this.taskCompleteObj.remarks
					let completeResultObj = {}

					if(this.detailObj.taskTpl.completeResultList){
						let obj = this.detailObj.taskTpl.completeResultList.find(item=>{ return item.resultValue == this.taskCompleteObj.resultValue})
						if(obj){
							completeResultObj = {resultLabel: obj.resultLabel, resultValue: obj.resultValue}
						}
					}
					let ids = this.selection.map((item)=>{
						return item.id
					})
					this.doSave({
						ids,
						formData,
						completeResultObj,
						remarks,
						detailList
					})

				} else {
					this.loadingTaskCompleteModal = true
					this.taskCompleteModal = true
					setTimeout(()=>{
						this.loadingTaskCompleteModal = false
					},0)
				}
			})
		},
		doSave(obj){
			console.log(obj,111111111)
			this.updateLoadingStatus({ isLoading: true });
			common.batchComplete(obj)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.getListData()
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		setOptTime(flag){
            if(flag){
                this.searchObj.dateTime = []
            }
        },
        changeDivHeight(height) {
            this.tableHeightOut = height + 68;
        },
		deleteById(id){
			this.updateLoadingStatus({ isLoading: true });
			common
				.deleteById({id})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.$Message.success(this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1766'))
						this.doSearch()
					}
			})
			.catch(errors.call(this))
			.finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		},
		remoteTaskTplList(val){
			let params = {
				"mainTable":"com_task_tpl",
				"searchField":"name",
				"searchFieldParam": val,
				"field1":"id",
				}
			sysCommonSql
			.querySingleTableData(params)
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
					this.tplNameList=res.data.data;
				}
			})
			.catch(errors.call(this))
			.finally(() => {
				this.referralLoading=false;
			});
		},
		changeDateTimeOrStatus(){
			this.isChangeDateOrStatus = true
			this.searchObj.dateTime_status = ''
			setTimeout(()=>{
				this.isChangeDateOrStatus = false
			},200)
		},
		change_dateTime_status(val){
			if(!val){
				if(!this.isChangeDateOrStatus){
					this.searchObj.dateTime = ['','']
					this.searchObj.status = ''
				}
			} else{
				this.searchObj.status = '0'
				let now = new Date().getTime()
				let end = now + parseInt(val) * 24 * 3600 * 1000
				this.searchObj.dateTime = [new Date(),new Date(end)]
			}
		},
		changeTplNameList(val){
			if(val == ''){
                this.tplNameList = []
            }
		},
		changeExecutorId(val){
			if(val == ''){
                this.executorList = []
            }
		},
		changeCreateBy(val){
			if(val == ''){
                this.createByList = []
            }
		},
		 //执行人
        remoteExecutor(query) {
            let params = {
                mainTable: "com_task",
                mainField: "executor_id",
                joinField: "id",
                joinTable: "sys_user",
                secondField: "name",
                joinTableSearchParam: query
            };
            sysCommonSql
            .queryPageInputInitData(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.executorList = res.data.data;
                }
            })
            .catch(errors.call(this))
        },
        //创建人
        remoteCreateBy(query) {
            let params = {
                mainTable: "com_task",
                mainField: "create_by",
                joinField: "id",
                joinTable: "sys_user",
                secondField: "name",
                joinTableSearchParam: query
            };
            sysCommonSql
            .queryPageInputInitData(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.createByList = res.data.data;
                }
            })
            .catch(errors.call(this))
        },
		addNew1() {
			this.$refs.taskModalRef.showModal({
				modalName: this.$t('modules_spoc_core_web_src_views_tasktemplate_index_415'),
				// isSelf: '0',
				taskType: this.taskType
			});
		},
		changeTabs(val) {
			if (val == "follow task") {
				this.tableName = [
					// {
					// 	name: "全部",
					// 	value: "2"
					// },
					{
						name: this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1745'),
						value: "0"
					},
					{
						name: this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1746'),
						value: "1"
					}
				];
			} else {
				this.tableName = [
					// {
					// 	name: "全部",
					// 	value: "2"
					// },
					{
						name: this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1745'),
						value: "0"
					},
					{
						name: this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1768'),
						value: "1"
					}
				];
			}
			this.changeButtonList()
			this.resetSearch();
			if(val == 'sop task'){
				this.getShowTitleSop()
			} else {
				this.getShowTitle()
			}
			this.getListData();
		},
		createActivity(type) {
			this.$router.push({
				name: "crm.createEvent"
			});
		},
		dataScopeFilter() {
			//校区列表
			sysUser
				.dataScopeFilter()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.officeIdList = res.data.data;
						waitUntil(
							() => {
								if (this.app.currOfficeId) {
									// this.$set( this.searchObj, "officeId", this.app.currOfficeId);
									this.$set(this.searchObj, "officeId", this.app.currOfficeId=='all'?'':this.app.currOfficeId);
								}
								return (this.app.currOfficeId && JSON.stringify(this.buttonPerm) != "{}") || false;
							},
							() => {
								if(this.myButtonPrem.indexOf('edit') < 0){
									this.btnList = []
								}
								//1）如果今天有未完成任务，默认筛选项中任务时间选择今天；（2）如果今天无未完成任务，任务时间筛选为空，显示全部任务
								this.searchObj.dateTime = [new Date(),new Date()]
								this.searchObj.status = '0'
								this.getListData(true);
							}
						);
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		getListData(isFirst) {
			this.updateLoadingStatus({ isLoading: true });
            let $f = this.fApi1;
            if(this.rule1.length){
                $f.submit(
                    (formData, api) => {
                        for (let i in formData) {
                            if(Array.isArray(formData[i])){

                            }else{
                                formData[i]=[formData[i]];
                            }
                        }
                        this.searchObj.fieldJsonData = formData;
                    },
                    api => {
                        //验证未通过
                        console.log(this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1769'));
                    }
                );
            }
			let param = {
				pageNo: this.pageNo,
				pageSize: this.pageSize
			};
			this.searchObj.startTime = this.searchObj.dateTime[0]
				? new Date(this.searchObj.dateTime[0]).format('yyyy-MM-dd 00:00:00')
				: "";
			this.searchObj.endTime = this.searchObj.dateTime[1]
				? new Date(this.searchObj.dateTime[1]).format('yyyy-MM-dd 23:59:59')
				: "";
			param = Object.assign({}, param, this.searchObj);
			param.type = this.taskType
			param.tabType = this.tabType

			if(this.taskType != 'sop task'){
				let _request 
				if(this.tabType == '2'){ // 全部
					_request = common.listAllPage(param)
				} else {
					_request = common.listPageComTask(param)
				}
				
				_request.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							let result = res.data.data;
							this.tableData = result.list;
							this.dataTotal = result.total;
							if(isFirst && this.tableData.length == 0){
								//1）如果今天有未完成任务，默认筛选项中任务时间选择今天；（2）如果今天无未完成任务，任务时间筛选为空，显示全部任务
								this.searchObj.dateTime = ['','']
								this.searchObj.status = ''
								this.getListData();
							}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
			} else {
				let _request
				if(this.tabType == '2'){ // 全部
					_request = common.listAllSopPage(param)
				} else {
					_request = common.listSopPage(param)
				}
				_request.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							let result = res.data.data;
							this.tableData = result.list;
							this.dataTotal = result.total;
							if(isFirst && this.tableData.length == 0){
								//1）如果今天有未完成任务，默认筛选项中任务时间选择今天；（2）如果今天无未完成任务，任务时间筛选为空，显示全部任务
								this.searchObj.dateTime = ['','']
								this.searchObj.status = ''
								this.getListData();
							}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
			}
		},
		//获取数据，根据情况修改接口、传参
		doSearch() {
			this.pageNo = 1;
			this.getListData();
		},
		resetSearch() {
			for (let key in this.searchObj) {
				this.searchObj[key] = "";
			}
			this.pageNo = 1;

                let $f = this.fApi1;
            $f.resetFields();
			this.$set(this.searchObj, "dateTime_status", '');
			this.$set(this.searchObj, "dateTime", ["", ""]);
			this.$set(this.searchObj, "fieldJsonData", {});
			// this.$set(this.searchObj, "officeId", this.app.currOfficeId);
			this.$set(this.searchObj, "officeId", this.app.currOfficeId=='all'?'':this.app.currOfficeId);
			this.getListData();
		},
		changeTableType(val) {
			this.pageNo = 1;
			this.tabType = val
			let defaultShowCol = Object.assign({},this.defaultShowCol)
			this.defaultShowCol = defaultShowCol
			this.changeButtonList()
			this.getListData()
		},
		changeButtonList(){
			this.selection = []
			if(this.taskType == 'sop task' && this.tabType == '0'){
				if(this.myButtonPrem.indexOf('edit') < 0){
					this.btnList = [
						{
							type: "",
							btnClick: this.toCompleteMore,
							text: this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1770')
						}
					]
				} else {
					this.btnList = [
						{
							type: "",
							btnClick: this.toCompleteMore,
							text: this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1770')
						},
						{
							type: "",
							btnClick: this.addNew1,
							text: this.$t('modules_spoc_core_web_src_views_tasktemplate_index_415')
						}
					]
				}
			} else {
				if(this.myButtonPrem.indexOf('edit') < 0){
					this.btnList = []
				} else {
					this.btnList = [
						{
							type: "",
							btnClick: this.addNew1,
							text: this.$t('modules_spoc_core_web_src_views_tasktemplate_index_415')
						}
					]
				}
			}
		},
		//分页方法 如果有分页则为必须方法，修改getCourseList为自己的获取数据方法 这里注意。不再有每页个数改变的方法了
		pageChange(pageNo, pageSize) {
			if (!pageNo) {
				//防止无用重复请求
				return;
			}
			this.pageNo = pageNo;
			this.pageSize = pageSize;
			this.getListData();
		},
		//必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
		getShowTitle(closeLoad) {
			common
				.getShowTitleComTask({
					pageIdentifier: "comTaskListPage",
					voName: "com.windliven.spoc.modules.crm.vo.ComTaskVO",
                    tableName:'com_task'
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.defaultShowCol = res.data.data;
						console.log(this.defaultShowCol);
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					if(closeLoad){
                        this.updateLoadingStatus({ isLoading: false });
                    }
				});
		},
		getShowTitleSop(closeLoad) {
			common
				.getShowTitleComTask({
					pageIdentifier: "comTasklistSopPage",
					voName: "com.windliven.spoc.modules.crm.vo.ComTaskSOPVO",
                    tableName:'com_task'
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.defaultShowCol = res.data.data;
						console.log(this.defaultShowCol);
					}
					if(closeLoad){
						this.updateLoadingStatus({ isLoading: false });
					}
				})
				.catch(errors.call(this));
		}
	},
	watch: {
		"app.currOfficeId": function(val, oldVal) {
			if (oldVal&&this.$route.name=="crm.taskCenter") {
				this.$set(this.searchObj, "officeId",  val=='all'?'':val);
				this.getListData();
			}
		}
	}
};
</script>
