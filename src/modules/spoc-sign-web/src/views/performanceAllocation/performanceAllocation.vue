<style lang="less">
.mytable {
	margin-top: 10px;
	width: 100%;
	background: rgba(255, 255, 255, 1);
	border-radius: 4px;
	padding: 0 16px;
}

</style>
<template>
	<div>
		<v-search-collapse
			@search="getListData"
			@reset="resetSearch"
			@changeDivHeight="changeDivHeight"
			key="searchTableType0"
		>
			<DatePicker
				ref="DatePicker"
				:options="options3"
				split-panels
				@on-open-change="setOptTime"
				type="daterange"
				v-model="signTime"
				placement="bottom-start"
				separator=" ~ "
				:placeholder="$t('modules_spoc_report_web_src_views_salesreportbystudent_salesreportbystudent_4699')"
				style="width:224px;"
			></DatePicker>
				<!-- remote
				:remote-method="getOfficeList"
				:loading="loadingofficeList" -->
			<Select
				v-model="officeId"
				:placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1262')"
				clearable
				filterable
				style="width:224px;"
			>
				<Option v-for="item in officeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
			<Select 
				v-model="stuId" 
				:placeholder="$t('memberlist_memberlist_257')" 
				clearable
				filterable
				remote
				:remote-method="getStudentList"
				:loading="loadingStudentList"
				style="width:224px;"
				>
				<Option v-for="item in studentList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
			<Input v-model="courseName" :placeholder="$t('mycourse_mycourse_380')" clearable style="width:224px;"></Input>
			<Select 
				v-show="type == '0'"
				v-model="parter" 
				:placeholder="$t('modules_spoc_sign_web_src_views_performanceallocation_performanceallocation_6950')" 
				clearable
				filterable
				remote
				:remote-method="getParterList"
				:loading="loadingParterList"
				style="width:224px;"
				>
				<Option v-for="item in parterList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
				<!-- remote
				:remote-method="getPartOfficeList"
				:loading="loadingPartOfficeList" -->
			<Select
				v-show="type == '1'"
				v-model="partOfficeId"
				:placeholder="$t('modules_spoc_sign_web_src_views_performanceallocation_performanceallocation_6951')"
				clearable
				filterable
				style="width:224px;"
			>
				<Option v-for="item in partOfficeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
			<Select 
				v-model="signer" 
				:placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4476')" 
				clearable
				filterable
				remote
				:remote-method="getSignerList"
				:loading="loadingSignerList"
				style="width:224px;"
				>
				<Option v-for="item in signerList" :value="item.id" :key="item.id">{{ item.name }}</Option>
			</Select>
			<Select 
				v-model="signType" 
				:placeholder="$t('modules_spoc_report_web_src_views_generationleadsreport_index_4608')" 
				clearable
				style="width:224px;"
				>
				<Option v-for="item in ht_contract_sign_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			<Select 
				v-model="signCategory" 
				:placeholder="$t('modules_spoc_report_web_src_views_refundreport_index_4663')" 
				clearable
				style="width:224px;"
				>
				<Option v-for="item in ht_contract_category" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			<Select 
				v-model="flag" 
				:placeholder="$t('sfyjfp')" 
				clearable
				style="width:224px;"
				>
				<Option value="1">{{$t('modules_leftremenu_92')}}</Option>
				<Option value="0">{{$t('modules_leftremenu_93')}}</Option>
			</Select>
		</v-search-collapse>
		<big-table
			ref="bigTable"
			v-if="defaultShowCol"
			class="mytable"
			:tableName="tableName"
			:tableData="tableData"
			:tableColumnArray="tableColumnArray"
			:defaultShowCol="defaultShowCol"
			:btnList="btnList"
			:tableHeightOut="tableHeightOut"
			:canSelection="canSelection"
			:updateShowTitleMethod="updateShowTitle"
			:updateShowTitleKey="updateShowTitleKey"
			:dataTotal="dataTotal"
			@selectionChange="selectionChange"
			@sortChange="sortChange"
			:pageNo="pageNo"
			@resetDefault="resetDefaultCol"
			@pageChange="pageChange"
			@changeTableType="changeTableType"
		></big-table>
		<export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
	</div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import bigTable from "@public/modules/bigTable.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
import valid, {
	errors,
	htReceipt,
	sysUser,
	sysDict,
	sysAttachment,
	common,
	sysCommonSql
} from "../../libs/request";
import exportModal from '@public/modules/exportModal.vue';
export default {
	name: 'sign.performanceAllocation',
	components: {
		bigTable,
		vSearchCollapse,
		exportModal
	},
	computed: {
		...mapState(["userInfo", "app", "buttonPerm","calendarConfig"]),
        myButtonPrem() {
            return this.buttonPerm ? (this.buttonPerm["jw.classStudentManageList"] || []) : [];
        },
	},
	mounted() {
		this.batchListData();
		this.getOfficeList('')
		this.getPartOfficeList('')
		waitUntil(
			() => {
				// return (this.app.currOfficeId && this.userInfo.officeId && this.buttonPerm && this.buttonPerm["jw.classStudentManageList"]) || false;
				return (this.app.currOfficeId && this.userInfo.officeId && this.officeList.length) || false;
			},
			() => {
				this.officeId = this.app.currOfficeId == 'all' ? this.userInfo.officeId : this.app.currOfficeId;
				this.signTime = defaultDatePickerValue()
				this.options3 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
				this.changeTableType('0');
			}
		);
	},
	data() {
		return {
			options3: null,
			tableHeightOut: 72, //324,
			/*搜索相关开始*/
			officeId: "", // 所属校区
			officeList: [],
			loadingofficeList: false,
			stuId: "", // 学员姓名
			studentList: [],
			loadingStudentList: false,
			parter: '', // 提成人
			parterList: [],
			loadingParterList: false,
			partOfficeId: '', // 提成校区
			partOfficeList: [],
			loadingPartOfficeList: false,
			signer: '', // 签约人
			signerList: [],
			loadingSignerList: false,
			signType: '', // 签约类型
			ht_contract_sign_type: [],
			signCategory: '', // 合同分类
			flag: '', // 是否已分配  1是0否
			ht_contract_category: [],
			signTime: [], // 签约时间范围
			courseName: '', // 课程名
			pageNo: 1,
			pageSize: this.$store.state.app.pageSizeGlobal || 10,
			/*搜索相关结束*/
			tableName: [
				{
					name: this.$t('performanceAllocation1'), //"个人业绩分配记录",
					value: "0"
				},
				{
					name: this.$t('performanceAllocation2'), //"校区业绩分配记录",
					value: "1"
				}
			],
			type: 0,
			canSelection: true,
			selection: [],
			updateShowTitleKey: "sign.performanceAllocation.user",
			updateShowTitle: htReceipt.updateShowTitle,
			defaultShowCol: null,
			dataTotal: 0,
			sortObj: {},
			tableColumnArray:[],
			tableData: [],
			btnList: [
				// {
				// 	style: {},
				// 	type: "",
				// 	btnClick: this.exportData,
				// 	text: "导出",
				// 	value: "1",
				// },
				[
					{
						// hidden: this.myButtonPrem && this.myButtonPrem.indexOf('export') != -1 ? false : true,
						style: {},
						type: '',
						btnClick: this.exportData,
						text: this.$t('integralflow_4'),
						value: '1',
						parentName: this.$t('integralflow_5')
					},
					{
						// hidden: this.myButtonPrem && this.myButtonPrem.indexOf('export') != -1 ? false : true,
						style: {},
						type: '',
						btnClick: this.exportData,
						text: this.$t('integralflow_6'),
						value: '2',
						parentName: this.$t('integralflow_5')
					}
				]
			],
			exportMethod:htReceipt.exportParter
		};
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		resetDefaultCol(){
			this.updateLoadingStatus({ isLoading: true });
			let param = {
				pageIdentifier: "sign.performanceAllocation.user",
			}
			if(this.type == '1'){
				param = {
					pageIdentifier: "sign.performanceAllocation.office",
				}
			}
            htReceipt.clearShowField(param)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.getShowTitle(true);
                } else {
                    this.updateLoadingStatus({ isLoading: false });
                }
            })
            .catch(errors.call(this))
            .finally(() => {

            });
        },
		querySingleTableData(mainTable, searchFieldParam, listName, loadingName){
			this[loadingName] = true
			let params = {
				mainTable,
				"searchField":"name",
				searchFieldParam,
				// "field1":"id",
			}
			sysCommonSql
			.querySingleTableData(params)
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
					this[listName] = res.data.data;
				}
			})
			.catch(errors.call(this))
			.finally(() => {
				this[loadingName] = false
			});
		},
		getOfficeList(val){
			// 获取签约校区
			this.querySingleTableData('sys_office', val, 'officeList', 'loadingofficeList')
		},
		getStudentList(val){
			// 获取学生姓名
			this.querySingleTableData('com_student', val, 'studentList', 'loadingStudentList')
		},
		getParterList(val){
			// 提成人
			this.querySingleTableData('sys_user', val, 'parterList', 'loadingParterList')
		},
		getPartOfficeList(val){
			// 提成校区
			this.querySingleTableData('sys_office', val, 'partOfficeList', 'loadingPartOfficeList')
		},
		getSignerList(val){
			// 签约人
			this.querySingleTableData('sys_user', val, 'signerList', 'loadingSignerList')
		},
		setOptTime(flag){
			if(flag){
				this.signTime = []
			}
		},
		changeDivHeight(height) {
			this.tableHeightOut = height;
		},
		batchListData() {
			let types = "ht_contract_sign_type,ht_contract_category"; // 课程分类
			sysDict
				.batchListData({
					types
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.ht_contract_sign_type = res.data.data.ht_contract_sign_type;
						this.ht_contract_category = res.data.data.ht_contract_category;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
				});
		},
		changeTableType(val) {
			this.type = val;
			this.pageNo = 1
			if(this.type == '1'){
				this.updateShowTitleKey = 'sign.performanceAllocation.office'
			} else {
				this.updateShowTitleKey = 'sign.performanceAllocation.user'
			}
			this.getShowTitle()
			this.getListData();
		},
		//获取数据
		getListData() {
			this.updateLoadingStatus({
				isLoading: true
			});
			let param = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				startTime: this.signTime[0] ? new Date(this.signTime[0]).format('yyyy-MM-dd 00:00:00') : '', 
				endTime: this.signTime[1] ? new Date(this.signTime[1]).format('yyyy-MM-dd 23:59:59') : '', 
				officeId: this.officeId, 
				stuId: this.stuId, 
				courseName: this.courseName,
				signer: this.signer,
				signType: this.signType,
				signCategory: this.signCategory,
				flag: this.flag,
				type: this.type,
			};
			if(this.type == '0'){
				param.parter = this.parter
			}
			if(this.type == '1'){
				param.partOfficeId = this.partOfficeId
			}

			// console.log(param)
			/* if(this.sortObj.order != 'normal' && this.sortObj.key){
				    param.orderByType = this.sortObj.key
				    param.orderByStatus = this.sortObj.order == 'asc' ? '1' : '2'
				} */
			//this.searchObj = param  //这里需要给searchObj 赋值，导出数据的时候需要用到

			htReceipt.listPageReceiptParter(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data;
						this.tableData = result.list;
						this.dataTotal = result.total;
						this.selection = []
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
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
		//如果有排序字段则为 必须方法，修改getCourseList为自己的获取数据方法
		sortChange(obj) {
			// console.log(obj) // {key: "createByName" ,order: "desc"}
			this.sortObj = obj;
			this.getListData();
		},
		//可选方法，如果是多选的话必须有
		selectionChange(selection) {
			// console.log(selection)
			this.selection = selection;
		},
		getShowTitle(closeLoad) {
			let param = {
				pageIdentifier: "sign.performanceAllocation.user",
				voName: "HtReceiptPartnerUserVO",
				lang: this.$i18n.locale
			};	
			if(this.type == '1'){
				param = {
					pageIdentifier: "sign.performanceAllocation.office",
					voName: "HtReceiptPartnerOfficeVO",
					lang: this.$i18n.locale
				}
			}

			htReceipt
				.getShowTitle(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.defaultShowCol = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
                    if(closeLoad){
                        this.updateLoadingStatus({ isLoading: false });
                    }
                });
		},
		resetSearch() {
			this.officeId = this.app.currOfficeId == 'all' ? this.userInfo.officeId : this.app.currOfficeId;
			this.signTime = defaultDatePickerValue();
			this.pageNo = 1;
			this.pageSize = this.$store.state.app.pageSizeGlobal || 10;
			this.stuId = "";
			this.courseName = '';
			this.parter = ''
			this.partOfficeId = ''
			this.signer = ''
			this.signType = ''
			this.signCategory = ''
			this.flag = ''
			this.getListData();
		},
		exportData(val) {
			let param = {
				startTime: this.signTime[0] ? new Date(this.signTime[0]).format('yyyy-MM-dd 00:00:00') : '', 
				endTime: this.signTime[1] ? new Date(this.signTime[1]).format('yyyy-MM-dd 23:59:59') : '', 
				officeId: this.officeId, 
				stuId: this.stuId, 
				courseName: this.courseName,
				signer: this.signer,
				signType: this.signType,
				signCategory: this.signCategory,
				flag: this.flag,
				type: this.type,
			};
			if(this.type == '0'){
				param.parter = this.parter
			}
			if(this.type == '1'){
				param.partOfficeId = this.partOfficeId
			}
			if (val == 2) {
				if(!this.selection.length){
					this.$Message.error(this.$t('importPage_warning1'));
					return false;
				}
				param = {
					type: this.type,
					ids: this.selection.map(item=>{
						return item.id
					})
				}
			}
			this.$refs.exportModal.noShowExport(this.exportMethod, param);
		}
	},
	watch: {
		"app.currOfficeId": function(val, oldVal) {
			if (oldVal && this.$route.name == 'jw.1v1course') {
				this.officeId = this.app.currOfficeId == 'all' ? this.userInfo.officeId : this.app.currOfficeId;
				this.pageNo = 1
				this.getListData();
			}
		}
	}
};
</script>
