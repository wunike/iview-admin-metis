<style lang="less">
.taskModal{
	.w330{
		width:330px;
	}
	.w400{
		// width:400px;
	}
	.ivu-modal-body{
		padding-bottom: 0;
	}
}
.chooseTaskTypeModal{
	.taskType{
		width:120px;
		height:160px;
		background:rgba(255,255,255,1);
		box-shadow:0px 1px 3px 0px rgba(0,0,0,0.05);
		border-radius:4px;
		border:1px solid #E6E7EB;
		display: inline-block;
		text-align: center;
		margin: 0 26px 20px;
		cursor: pointer;
		.taskTypeImg{
			width: 70px;
			height: 70px;
			margin-top: 25px;
			margin-bottom: 19px;
		}
		p{
			font-size:16px;
			color: #495060;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			margin: 0 auto;
			width: 84px;
		}
	}
	.taskTypeActive{
		border: 1px solid #44BCB7;
		box-shadow:0px 4px 8px 0px rgba(68,188,183,0.25);
	}
}
</style>
<template>
	<div>
		<Modal
			v-model="chooseTaskTypeModal"
			:title="modalName"
			width="750"
			class="chooseTaskTypeModal"
			:mask-closable="false"
		>
			<div v-show="showSelectTaskType" style="margin-left:26px;margin-bottom:20px;">{{$t('modules_spoc_core_web_src_views_tasktemplate_index_391')}}<!-- <Select v-model="taskType" @on-change="listPageComTaskTpl" style="width:90px;">
					<Option value="follow task">{{$t('modules_spoc_crm_web_src_views_customer360_components_tasklists_1036')}}</Option>
					<Option value="service task">{{$t('modules_spoc_crm_web_src_views_customer360_components_tasklists_1037')}}</Option>
				</Select> -->
				<RadioGroup v-model="taskType" @on-change="listPageComTaskTplCopy" >
					<Radio label="follow task">{{$t('modules_spoc_crm_web_src_views_customer360_components_tasklists_1036')}}</Radio>
					<Radio label="service task">{{$t('modules_spoc_crm_web_src_views_customer360_components_tasklists_1037')}}</Radio>
				</RadioGroup>
			</div>
			<div style="height:480px;overflow-y: auto;" v-if="taskList.length">
				<div
					:id="item.id"
					@click="selectType(index, item.name)"
					class="taskType"
					:class="{'taskTypeActive' : activeIndex == index}"
					v-for="(item, index) in taskList"
					:key="index"
					>
					<img class="taskTypeImg" v-if="item.imgUrl" :src="item.imgUrl">
					<img class="taskTypeImg" v-else-if="item.name==$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1883')" src="../../assets/img/task/yyhf.png">
					<img class="taskTypeImg" v-else-if="item.name==$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1884')" src="../../assets/img/task/fwhf.png">
					<img class="taskTypeImg" v-else-if="item.name==$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1885')" src="../../assets/img/task/jxhf.png">
					<img class="taskTypeImg" v-else-if="item.name==$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1886')" src="../../assets/img/task/lx.png">
					<img class="taskTypeImg" v-else src="../../assets/img/task/other.png">
					<p :title="item.name">{{item.name}}</p>
				</div>
			</div>
			<div v-else>{{$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1887')}}</div>
			<div slot="footer">
				<Button v-if="taskList.length" @click="chooseCancel()" style="margin-right: 16px">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="chooseOk()">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
		<Modal
			v-model="createTaskModal"
			:title="modalName"
			width="600"
			class="taskModal"
			:mask-closable="false"
			:loading="loadingModal"
			@on-cancel="handleReset('formValidate')"
		>
			<div>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="84">
                    <FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_416')">
						{{tplName}}
                    </FormItem>
                    <FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_417')" prop="isHot" >
						<RadioGroup v-model="formValidate.isHot">
							<Radio label="1">{{$t('modules_leftremenu_92')}}</Radio>
							<Radio label="0">{{$t('modules_leftremenu_93')}}</Radio>
						</RadioGroup>
                    </FormItem>
                    <FormItem :label="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1894')" prop="classId"
						:rules="{required: true, message: $t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1895'), trigger: 'change'}"
						v-if="this.taskType == 'sop task'">
						<Select v-model="formValidate.classId"
							@on-change="changeClassCourse"
							class="w400"
							filterable
							:placeholder="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1895')">
							<Option v-for="item in classCourseList" :value="item.classId" :key="item.classId">{{item.className}}</Option>
						</Select>
                    </FormItem>
                    <FormItem :label="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1896')" prop="lessonId"
						:rules="{required: true, message: $t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1897'), trigger: 'change'}"
						 v-if="this.taskType == 'sop task'">
						<Select v-model="formValidate.lessonId"
							@on-change="changeLesson"
							class="w400"
							filterable
							:placeholder="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1897')">
							<Option v-for="item in lessonList" :value="item.id" :key="item.id">{{item.rowNum}}:  {{item.startTime}} ~ {{item.endTime | endTimeFilter}}</Option>
						</Select>
                    </FormItem>
                    <FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_420')" prop="objectId"
						:rules="{ required: true, message: $t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1899'), trigger: 'change' }"
						v-if="this.taskType != 'sop task'">
						<Select v-model="formValidate.objectId"
							class="w400"
							filterable
							remote
							:remote-method="remoteReferraler"
							@on-query-change="referralerQuery"
							:disabled="stuId != ''"
							:placeholder="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1900')"
							:loading="referralLoading">
							<Option v-for="item in students"
								:value="item.id" :key="item.id" :label="item.name">
								<span>{{item.name}}</span>
								<span style="float:right;color:#ccc">{{item.phone}}</span>
							</Option>
						</Select>
                    </FormItem>
                    <FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_420')" prop="objectIds"
						:rules="{ required: true, type: 'array', min: 1, message: $t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1899'), trigger: 'change' }"
						v-if="this.taskType == 'sop task'">
						<Select v-model="formValidate.objectIds"
							class="w400"
							filterable
							multiple
							:placeholder="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1900')">
							<Option v-for="item in studentList"
								:value="item.cusId" :key="item.cusId">{{item.studentName}}
							</Option>
						</Select>
                    </FormItem>
                   <!--  <FormItem :label="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1901')" prop="executorType">
                        <Select v-model="formValidate.executorType" multiple class="w400" @on-change="changeExecutorType" :placeholder="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1902')">
                            <Option :value="item.value" v-for="(item, index) in com_service_user_type" :key="index">{{item.label}}</Option>
                        </Select>
                    </FormItem> -->
                    <FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_422')" prop="executorId" v-if="taskTemplate.roles">
                        <Select v-model="formValidate.executorId"
							:disabled="this.taskType == 'sop task'"
							@on-change="changeExecutorId"
							not-found-:text="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1904')"
							class="w400" :placeholder="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1905')">
                            <Option :value="item.id" v-for="(item, index) in classTeacherList" :key="index">
								{{item.name}}
							</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_422')" prop="executorId" v-if="taskTemplate.serviceTypes">
                        <Select v-model="formValidate.executorId"
							:disabled="this.taskType == 'sop task'"
							@on-change="changeExecutorId"
							not-found-:text="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1906')"
							class="w400" :placeholder="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1907')">
                            <Option :value="item.id" :label="item.name" v-for="(item, index) in classTeacherList" :key="index">
								<span>{{item.name}}&nbsp;--&nbsp;{{item.officeName}}&nbsp;--&nbsp;{{item.serviceTypeName}}</span>
							</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_424')" prop="startTime" :rules="[{ required: true ,message:$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1909')},{ validator: validateResultValue, trigger: 'change' }]">
                        <DatePicker
							ref="producetime"
							@on-open-change="openChange('producetime')"
							@on-change="showTimePanel('producetime')"
							v-model="formValidate.startTime"
							type="datetime"
							format="yyyy-MM-dd HH:mm"
							:transfer="true"
							placement="bottom-start"
							:time-picker-options="{steps: [1, 5, 10]}"
							separator=" ~ "
							:placeholder="$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1733')"
							class="w400"
						></DatePicker>
                    </FormItem>
                    <!-- <FormItem :label="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1911')">
                        <div>{{formValidate.startTime ? new Date(formValidate.startTime).format('yyyy-MM-dd') + ' 23:59' : ''}}</div>
                    </FormItem> -->
                    <!-- <FormItem :label="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1912')" prop="reminderTime" v-if="isSelf == '1'" :rules="[{ required: true, message:$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1913')},{ validator: validateResultValue, trigger: 'change' }]"> -->
                    <!-- <FormItem :label="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1912')" prop="reminderTime" v-if="isSelf == '1'">
                        <DatePicker
							v-model="formValidate.reminderTime"
							type="datetime"
							format="yyyy-MM-dd HH:mm"
							:transfer="true"
							placement="bottom-start"
							:time-picker-options="{steps: [1, 5, 10]}"
							separator=" ~ "
							:placeholder="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1914')"
							class="w400"
						></DatePicker>
                    </FormItem> -->
                    <FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_425')" prop="description">
                        <Input v-model="formValidate.description" type="textarea" class="w400"  :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('scoretemplate_compontents_scoremodify_528')"></Input>
                    </FormItem>
                    <!-- <FormItem :label="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1917')" prop="status">
						<RadioGroup v-model="formValidate.status">
							<Radio label="1">{{$t('modules_leftremenu_92')}}</Radio>
							<Radio label="0">{{$t('modules_leftremenu_93')}}</Radio>
						</RadioGroup>
                    </FormItem> -->
					<FormItem :label="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1918')" prop="completeResultObjValue" v-if="taskList[activeIndex] && (formValidate.status == '1') && taskList[activeIndex].completeResultList && (taskList[activeIndex].completeResultList.length >0) ">
                        <Select v-model="formValidate.completeResultObjValue" class="w400" :placeholder="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1902')">
                            <Option
								v-for="(item, index) in taskList[activeIndex].completeResultList"
								:key="index"
								:value="item.resultValue">{{item.resultLabel}}</Option>
                        </Select>
                    </FormItem>
					<form-create
						ref="fc"
						v-model="fApi"
						:rule="rule"
						:option="option"
						v-if="taskList[activeIndex] && (formValidate.status == '1') && hasFormData"></form-create>
					<FormItem :label="$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1919')" prop="remarks" v-if="formValidate.status == '1'"
						:rules="{ required: true, message: $t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1920'), trigger: 'blur' }">
                        <Input v-model="formValidate.remarks" type="textarea" class="w400"  :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('scoretemplate_compontents_scoremodify_528')"></Input>
                    </FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button @click="handleReset('formValidate')" style="margin-right: 16px">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="handleSubmit('formValidate')">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import valid, {
	errors,
	common,
	sysUser,
	sysDict,
	sysCommonSql,
	crmActivity,
	crmCustomer
} from "../../libs/request";
import { waitUntil } from "@public/libs/util";
import formCreateSetting from './formCreate.js';

export default {
	mixins: [formCreateSetting],
	data() {
		return {
			isFrom360: false,
			from360Phone: '',
			classCourseList: [],
			lessonList: [],
			studentList: [],
			reminderType: '0',
			stuNameForFollow: '',
			stuNameForService: '',
			showSelectTaskType: false,
			isSaveing: false, //防止重复提交
			option:{
				form:{
					labelWidth: 84
				}
			},
			stuId: '',
			stuName: '',
			hasFormData: false,
			loadingModal: true,
			com_service_user_type: [],
			tplName: '',
			classTeacherList: [],
			referralLoading: false,
			students: [],
			taskType: '',
			taskList: [],
			taskTemplate: {},
			chooseTaskTypeModal: false,
			formValidate: {
				isHot: '0',
				objectId: '',
				objectIds: [],
				classId: '',
				lessonId: '',
				// executorType: [],
				executorId: '',
				startTime: '',
				reminderTime: '',
				description: '',
				status: '0',
				completeResultObjValue: '',
			},
			createTaskModal: false,
			modalName: '',
			activeIndex: 0, // 0预约上门  1联系 2其他主题
			isSelf: '0', // 0指派任务  1我的任务
			ruleValidate: {
                // objectId: [
                //     { required: true, message: '请选择服务对象', trigger: 'change' },
                // ],
                // executorType: [
				// 	{ required: true, type: 'array', min: 1, message: '请选择执行人类型', trigger: 'change' }
                // ],
                executorId: [
                    { required: true, message: this.$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1905'), trigger: 'change' },
                ],
                description: [
                    { required: true, message: this.$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1921'), trigger: 'blur' },
                ],
                // startTime: [
				// 	// { required: true, message: '请选择任务开始时间', trigger: 'change' },
                // ],
                // reminderTime: [
                //     { required: true, message: '请选择任务提醒时间', trigger: 'change' },
                // ],
                completeResultObjValue: [
                    { required: true , message: this.$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1922'), trigger: 'change' },
                ],
			},
			validateResultValue: (rule, value, callback) => {
				console.log(rule,value)
				if (!value) {
					callback(new Error(this.$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1923')));
				} else {
					callback();
				}
			},
			validateResultValue1: (rule, value, callback) => {
				console.log(rule,value)
				if (!value) {
					callback(new Error(this.$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1924')));
				} else {
					callback();
				}
			},
		};
	},
	computed: {
		...mapState(["app","userInfo"])
	},
	components: {
	},
	mounted() {
		this.isSaveing = false
		this.batchListData()
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		openChange(refName){
			this.$refs[refName].onSelectionModeChange('date');
		},
		showTimePanel(refName){
			this.$refs[refName].onSelectionModeChange('time');
			if(new Date(this.formValidate.startTime).getHours() == 0){
				this.formValidate.startTime = new Date(new Date(this.formValidate.startTime).format('yyyy-MM-dd 08:00:00'))
			}
        },
		changeExecutorId(val){
			if(val == this.userInfo.id){
				this.isSelf = '1'
			} else {
				this.isSelf = '0'
			}
		},
		changeExecutorType(){
			if(this.taskType == 'sop task'){
				return
			}
			if(this.taskTemplate.serviceTypes){
				common.getServiceObjectExecutor({
					objectId: this.formValidate.objectId,
					serviceTypes: this.taskTemplate.serviceTypes
				}).then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.classTeacherList = res.data.data
					}
				})
				.then(errors.call(this))
				.finally(() => {
				})
			} else {
				this.isRolesGetClassTeacherList()
			}
		},
		batchListData() {
			let types = "com_service_user_type";
			sysDict
				.batchListData({
					types
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.com_service_user_type = res.data.data.com_service_user_type;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
				});
		},
		referralerQuery(query){
			if(query == ''){
				this.students = []
			}
		},
		remoteReferraler(query){
			if(query && query != this.formValidate.objectId && !this.isFrom360){
				this.querySingleTableData(query);
			}
		},
		listPageComTaskTplCopy(taskType){
			if(taskType == 'follow task'){
				this.stuName = this.stuNameForFollow
			}
			if(taskType == 'service task'){
				this.stuName = this.stuNameForService
			}
			this.listPageComTaskTpl(taskType)
		},
		listPageComTaskTpl(taskType, canUseType) {
			this.updateLoadingStatus({ isLoading: true });

			let param = {
				pageNo: 1,
				pageSize: 0,
				isEnable: "1",
				type: taskType//跟进任务"follow task"，  服务任务"service task"
			};

			if(canUseType){
				param.tplNames = canUseType
			}

			let _request
			if(this.isFrom360){
				_request = common.listCanBeUsed(param)
			} else {
				_request = common.listPageComTaskTpl(param)
			}

			_request.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						console.log(res.data.data);
						this.taskList = res.data.data.list;
						if(this.taskList.length){
							this.tplName = this.taskList[0].name
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		getCustomerStatusRelTask(statusVal, taskType) {
			this.updateLoadingStatus({ isLoading: true });

			let param = {
				status:statusVal
			};
			common
				.getCustomerStatusRelTask(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.listPageComTaskTpl(taskType, res.data.data)
					} else {
						this.updateLoadingStatus({ isLoading: false });
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					// this.updateLoadingStatus({ isLoading: false });
				});
		},
		querySingleTableData(query, stuId) {
			this.updateLoadingStatus({ isLoading: true });
			this.referralLoading = true
			common.getServiceObject(
				{
					name: query,
					type: this.taskTemplate.type
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						if(stuId){
							// 这个判断应该不会用到了暂时注释
							// this.students = res.data.data.filter(item=>{ return item.id == stuId })
							// if(this.students.length){
							// 	this.formValidate.objectId = stuId
							// 	this.formValidate.objectName = this.students[0].name
							// } else {
							// 	this.formValidate.objectId = '' //非签约不能添加服务任务
							// }
							// this.changeExecutorType()
						} else {
							this.students = res.data.data
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.referralLoading = false
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		selectType(index, tplName){
			this.activeIndex = index
			this.tplName = tplName
		},
		showModal(obj){
			console.log(obj)
			if(obj.from == '360'){
				// this.showSelectTaskType = true
				this.isFrom360 = true
				this.from360Phone = obj.phone
				this.stuNameForFollow = obj.stuNameForFollow
				this.stuNameForService = obj.stuNameForService
			} else {
				this.isFrom360 = false
			}

			if(obj.from == '360'){
				// 如果从360创建跟进任务。需要先获取当前状态可以创建的跟进任务
				this.getCustomerStatusRelTask(obj.statusVal, obj.taskType)
			} else if(obj.from == 'quick'){
				this.showSelectTaskType = true
				this.listPageComTaskTpl(obj.taskType)
			} else {
				this.listPageComTaskTpl(obj.taskType)
			}
			this.isSaveing = false
			this.modalName = obj.modalName
			// this.isSelf = obj.isSelf
			this.taskType = obj.taskType
			this.activeIndex = 0
			this.chooseTaskTypeModal = true

			if(obj.stuId && obj.stuNameForFollow){
				this.stuId = obj.stuId
				this.stuName = obj.stuNameForFollow
			} else {
				this.stuId = ''
				this.stuName = ''
			}
			// if(obj.from == '360' && obj.type == '1'){
		},
		// 获取所选班课
		getClassCourse(){
			common
				.getClassByTaskCreateBy({
					userId: this.userInfo.id
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.classCourseList = res.data.data
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					// this.updateLoadingStatus({ isLoading: false });
				});
		},
		changeClassCourse(val){
			if(val){
				this.updateLoadingStatus({ isLoading: true });
				common
				.getClassInfoByClassId({
					classId: val
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.lessonList = res.data.data.lessonList
						this.studentList = res.data.data.studentList
						console.log(this.studentList, 2222222222222)
						this.formValidate.objectIds = []
						this.formValidate.lessonId = ''
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
			}
		},
		changeLesson(val){
			this.classTeacherList = []
			this.formValidate.executorId = ''
			if(val){
				let q = this.lessonList.filter(item=>{
					return item.id == val
				})
				let executorObj = q[0] ? q[0] : null
				if(executorObj){
					if(this.taskTemplate.serviceTypes){
						this.classTeacherList = [
							{
								id: executorObj[this.taskTemplate.serviceTypes],
								name: executorObj[this.taskTemplate.serviceTypes + ' name'],
								serviceTypeName: this.taskTemplate.serviceTypes,
								officeId: executorObj[this.taskTemplate.serviceTypes + ' officeId'],
								officeName: ''
							}
						]
						this.formValidate.executorId = executorObj[this.taskTemplate.serviceTypes]
					}
					if(this.taskTemplate.roles){
						this.classTeacherList = [
							{
								id: executorObj[this.taskTemplate.roles],
								name: executorObj[this.taskTemplate.roles + ' name'],
								serviceTypeName: this.taskTemplate.roles,
								officeId: executorObj[this.taskTemplate.roles + ' officeId'],
								officeName: ''
							}
						]
						this.formValidate.executorId = executorObj[this.taskTemplate.roles]
					}

					let ids = this.studentList.map(item=>{
						return item.cusId
					})
					this.formValidate.startTime = executorObj.endTime
				}
			}
		},
		chooseOk(){
			if(!this.taskList.length){ // 没有任务模板
				this.chooseTaskTypeModal = false
				return false
			}
			let taskTemplateId = this.taskList[this.activeIndex].id
			//获取详情
			this.students = []
			this.updateLoadingStatus({ isLoading: true });

			if(this.taskType == 'sop task') { // sop任务获取班课数据
				this.getClassCourse()
			}

			common
				.formComTaskTpl({ id:taskTemplateId })
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.taskTemplate = res.data.data;
						this.chooseTaskTypeModal = false
						this.isSaveing = false
						this.createTaskModal = true
						this.reminderType = res.data.data.reminderType;
						if(res.data.data.formData && res.data.data.formData.length){
							let formData = JSON.parse(res.data.data.formData)
							if(formData && formData.length){
								let noUploadFormData = formData.filter(item=>{ return item.jdbcType != 'upload' && item.jdbcType != 'uploadTemplate' }) // 过滤出来不是上传的动态表单
								if(noUploadFormData && noUploadFormData.length){
									this.hasFormData = true
									this.setFormAttr(noUploadFormData);
								} else {
									this.hasFormData = false
								}
							} else {
								this.hasFormData = false
							}
						} else {
							this.hasFormData = false
						}

						if(this.isFrom360){ //360添加任务
							console.log("this.stuName == " + this.stuName)
							// this.querySingleTableData(this.stuName, this.stuId)
							this.formValidate.objectId = this.stuId
							if(this.taskType == 'follow task'){
								this.students = [{
									id: this.stuId,
									name: this.stuNameForFollow,
									phone: this.from360Phone
								}]
								this.formValidate.objectName = this.stuNameForFollow
							}

							if(this.taskType == 'service task'){
								this.students = [{
									id: this.stuId,
									name: this.stuNameForService,
									phone: this.from360Phone
								}]
								this.formValidate.objectName = this.stuNameForService
							}

							this.changeExecutorType()
						}

						if(this.taskTemplate.roles){
							this.isRolesGetClassTeacherList()
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		isRolesGetClassTeacherList(){
			sysUser
				.dataScopeFilter()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let officeIds = res.data.data.map((item)=>{ return item.id }) || []
						sysUser.listDataByRole({
							officeIds: officeIds.join(','), //this.userInfo.officeId,
							pageSize:-1,
							roleIds: this.taskTemplate.roles
						})
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								this.classTeacherList = res.data.data;
							}
						})
						.catch(errors.call(this))
						.finally(() => {});
					}
				})
				.catch(errors.call(this))
				.finally(() => {

				});
		},
		chooseCancel(){
			this.chooseTaskTypeModal = false
		},
		handleReset(){
			this.$refs.formValidate.resetFields()
			this.createTaskModal = false
		},
		handleSubmit(){
			//有动态表单，并且直接完成，则先获取动态表单的值
			if(this.formValidate.status == '1' && this.hasFormData){
				let $f = this.fApi
				$f.submit((formData,api)=>{
					console.log(this.$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1925'))
					this.doSubmit(JSON.stringify(formData))
				},(api)=>{
					console.log(this.$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1926'))
				})
			} else if(this.hasFormData){
				this.doSubmit("") // 现在不让显示动态表单了。所以不做处理
				// let $f = this.fApi
				// this.doSubmit(JSON.stringify($f.formData())) //表单位置提前。不填写数据也可以保存
			} else {
				this.doSubmit("")
			}

		},
		doSubmit(formData){
			this.$refs.formValidate.validate((validRes) => {
				console.log("validRes === " + validRes)
				if (validRes) {
					console.log("this.isSaveing ==" + this.isSaveing)
					if(this.isSaveing){
						return
					}
					this.isSaveing = true

					let objectName
					if(!this.stuId && this.taskType != 'sop task'){
						objectName = this.students.find(item =>{ return item.id == this.formValidate.objectId }).name
						console.log("objectName ==" + objectName)
					}

					let obj = {
						"tplId": this.taskTemplate.id,
						"isHot": this.formValidate.isHot,
						"objectId": this.formValidate.objectId, //服务对象
						"objectName": this.taskType == 'sop task' ? '' : (this.stuId ? this.formValidate.objectName : objectName) , //服务对象
						"objectType": "crm_customer",
						"executorId": this.formValidate.executorId, //执行人
						"type": this.taskType,
						"startTime": this.formValidate.startTime ? new Date(this.formValidate.startTime).format('yyyy-MM-dd hh:mm:ss') : '',
						"endTime": this.formValidate.startTime ? new Date(this.formValidate.startTime).format('yyyy-MM-dd 23:59:59') : '',
						// "reminderTime": this.formValidate.reminderTime ? new Date(this.formValidate.reminderTime).format('yyyy-MM-dd hh:mm:ss') : '',
						"status": this.formValidate.status,
						"description": this.formValidate.description,
						"isSelf": this.isSelf,
						"formData" : formData
						// "finishTime": "2019-10-21 12:00:00",
					}

					obj.reminderTimeList = []
					let overdueList = []
					if(this.reminderType != '0'){
						if(this.formValidate.startTime){
							let reminderTypes = this.reminderType.split(',')
							reminderTypes.forEach(item=>{
								let times = new Date(this.formValidate.startTime).getTime() + Number(item) * 60 * 1000
								obj.reminderTimeList.push(new Date(times).format('yyyy-MM-dd hh:mm:ss'))
								if(times < new Date().getTime()){
									overdueList.push(1) // 用于计数。如果长度与reminderTimeList长度相等。则所有提醒时间均过期
								}
							})
						} else {
							obj.reminderTimeList = []
							// obj.reminderTime = ''
						}
					} else {
						// obj.reminderTime = ''
						obj.reminderTimeList = []
					}

					console.log(this.classTeacherList, "this.classTeacherList")
					let executorName = ''
					if(this.taskType != 'sop task'){
						let executorObj = this.classTeacherList.find(item=>{
							return item.id == this.formValidate.executorId
						})

						let stuObj = this.students.find(item=>{
							return item.id == this.formValidate.objectId
						})

						obj.objectPhone = stuObj.phone

						let serviceType = executorObj.serviceType
						let officeId = executorObj.officeId
						executorName = executorObj.name
						console.log(serviceType,"serviceType")
						obj.serviceType = serviceType
						obj.roles = this.taskTemplate.roles
						obj.officeId = officeId
					} else {
						obj.objectPhone = ''
						obj.serviceType = this.taskTemplate.serviceTypes
						obj.roles = this.taskTemplate.roles
						obj.officeId = this.classTeacherList[0].officeId
						executorName = this.classTeacherList[0].name

						// let studentNames = this.studentList.map(item=>{
						// 	return item.studentName
						// })
						// obj.objectName = studentNames.join(',')

						let studentNames = []
						this.studentList.forEach(item=>{
							if(this.formValidate.objectIds.indexOf(item.cusId) >= 0){
								studentNames.push(item.studentName)
							}
						})
						obj.objectName = studentNames.join(',')
						obj.objectId = this.formValidate.objectIds.join(',')

						obj.classId = this.formValidate.classId
						let classNameObj = this.classCourseList.find(item=>{
							return item.classId == this.formValidate.classId
						})
						obj.className = classNameObj.className

						obj.lessonId = this.formValidate.lessonId
						let lessonNameObj = this.lessonList.find(item=>{
							return item.id == this.formValidate.lessonId
						})
						obj.lessonName = lessonNameObj.name
						obj.lessonStartDate = lessonNameObj.startDate
						obj.lessonStartTime = lessonNameObj.startTime
						obj.lessonEndTime = lessonNameObj.endTime
					}

					if(this.formValidate.status == '1'){
						obj.remarks = this.formValidate.remarks
						let value = this.formValidate.completeResultObjValue
						if(this.taskList[this.activeIndex].completeResultList){
							let labelObj = this.taskList[this.activeIndex].completeResultList.find(item =>{
								return item.resultValue == value
							})
							let label = labelObj ? labelObj.resultLabel : ''
							obj.completeResultObj = {
								"resultLabel": label,
								"resultValue": value
							}
						} else {
							obj.completeResultObj = {
								"resultLabel": '',
								"resultValue": ''
							}
						}

						if(this.isSelf == '0'){
							obj.detailList = [
								{ "content":this.$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1927') },
								{ "content":this.$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1928') + executorName },
								{ "content":this.$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1929') }
							]
						} else {
							obj.detailList = [
								{ "content":this.$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1927') },
								{ "content":this.$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1929') }
							]
						}
					} else {
						obj.completeResultObj = {
							"resultLabel": "",
							"resultValue": ""
						}

						if(this.isSelf == '0'){
							obj.detailList = [
								{ "content":this.$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1927') },
								{ "content":this.$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1928') + executorName },
							]
						} else {
							obj.detailList = [
								{ "content":this.$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1927') },
							]
						}
					}
					if((obj.reminderTimeList.length == overdueList.length) && overdueList != 0) {
						 this.$Modal.confirm({
							title: this.$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1930'),
							content: this.$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1931'),
							okText: this.$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1932'),
							cancelText: this.$t('modules_spoc_crm_web_src_views_taskcenter_taskmodal_1933'),
							onOk: () => {
								obj.reminderTime = ''
								this.doSave(obj)
							},
							onCancel: () => {
								this.isSaveing = false
							}
						});
					} else {
						this.doSave(obj)
					}

				} else {
					this.isSaveing = false
					this.createTaskModal = true
					this.loadingModal = false
					setTimeout(() => {
						this.loadingModal = true
					}, 0);
				}
			})
		},
		doSave(obj){
			this.updateLoadingStatus({ isLoading: true });
			common.saveComTask(obj)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.$refs.formValidate.resetFields()
						this.createTaskModal = false
						this.loadingModal = false
						setTimeout(() => {
							this.loadingModal = true
						}, 0);
						this.$emit('doSearch')
					} else {
						this.createTaskModal = true
						this.loadingModal = false
						setTimeout(() => {
							this.loadingModal = true
						}, 0);
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					setTimeout(()=>{
						this.isSaveing = false
					},300)
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		/* dataScopeFilter() {
			//校区列表
			sysUser
				.dataScopeFilter()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.gjxqList = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		}, */
	},
	filters:{
		endTimeFilter(val){
			let res = ''
			if(val){
				let _arr = val.split(' ')
				if(_arr[1]){
					res = _arr[1]
				}
			}
			return res
		}
	},
	watch: {
		"formValidate.objectId": function(newVal, oldVal) {
			if (newVal) {
				this.changeExecutorType()
			}
		},
		"formValidate.status": function(newVal, oldVal) {
			if (newVal == '1') {
				setTimeout(() => {
					if(this.$refs.fc){
						let $f = this.$refs.fc.$f
						// let $f = this.fApi
						if($f){
							//填充默认到访时间
							$f.disabled(false)
							$f.setValue({'arrivalTime' : new Date()});
						}
					}
				}, 1000);
			}
		}

		// "app.currOfficeId": function(val, oldVal) {
		// 	if (oldVal) {
		// 		this.$set(this.searchObj, "gjxq", this.app.currOfficeId);
		// 		this.getListData();
		// 	}
		// }
	}
};
</script>
