<style lang="less">
.schoolManagement {
	.ivu-table-cell {
		padding-left: 5px;
		padding-right: 5px;
	}
	.mytable {
		margin-top: 10px;
		width: 100%;
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		padding: 0 16px;
	}
}

.createSchoolClass {
	overflow: hidden;
	.ivu-modal-body {
		padding-bottom: 0;
	}
	.ivu-form-item {
		&:last-child {
			margin-bottom: 24px;
		}
	}
	.w240 {
		width: 240px;
	}
	.w50 {
		display: inline-block;
		width: 50%;
	}
}
</style>
<template>
	<div class="schoolManagement">
		<v-search-collapse
			@search="doSearch"
			@reset="resetSearch"
			@changeDivHeight="changeDivHeight"
		>
			<!-- <DatePicker
				type="daterange"
				separator=" ~ "
				placement="top-start"
				v-model="searchObj.createDateSearch"
				:placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_239')"
				style="width: 200px;"
			></DatePicker> -->
			<Input v-model="searchObj.name" :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_240')" clearable></Input>
			<Select v-model="searchObj.type" :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_241')" clearable>
				<Option v-for="(item, index) in com_student_school_type" :key="index" :value="item.value">{{item.label}}</Option>
			</Select>
			<Select v-model="searchObj.province" :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_242')" clearable @on-change="getCityListSearch">
				<Option :value="item.id" v-for="item in provinceList" :key="item.id">{{item.name}}</Option>
			</Select>
			<Select v-model="searchObj.city" :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_243')" clearable @on-change="getCityName">
				<Option :value="item.id" v-for="item in searchCityList" :key="item.id">{{item.name}}</Option>
			</Select>
			<Input v-model="searchObj.address" :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_244')" clearable></Input>
			<Input v-model="searchObj.contact" :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_245')" clearable></Input>
		</v-search-collapse>
		<big-table
			v-if="defaultShowCol"
			class="mytable"
			:tableName="$t('core.schoolManagement')"
			:tableData="tableData"
            :tableHeightOut="tableHeightOut"
			:tableColumnArray="tableColumnArray"
			:defaultShowCol="defaultShowCol"
			:canSelection="true"
			:dataTotal="dataTotal"
			:btnList="btnList"
			:canChangeHeight="true"
			:isShowSelectTableColumn="false"
			:pageNo="pageNo"
			@pageChange="pageChange"
			@selectionChange="selectionChange"
		></big-table>
		<Modal
			:mask-closable="false"
			v-model="createSchool"
			:title="editId? $t('modules_spoc_core_web_src_views_schoolmanagement_index_247') : $t('modules_spoc_core_web_src_views_schoolmanagement_index_248')"
			:loading="loading"
			width="800"
			class="createSchoolClass"
			@on-ok="ok"
			@on-cancel="cancel"
		>
			<div>
				<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
					<FormItem :label="$t('modules_spoc_core_web_src_views_schoolmanagement_index_249')" prop="name" class="w50">
						<Input v-model="formValidate.name" class="w240" :placeholder="$t('scoretemplate_compontents_scoremodify_528')"></Input>
					</FormItem>
					<FormItem :label="$t('modules_spoc_core_web_src_views_schoolmanagement_index_251')" prop="type" class="w50">
						<Select class="w240" v-model="formValidate.type" clearable transfer>
							<Option v-for="(item, index) in com_student_school_type" :key="index" :value="item.value">{{item.label}}</Option>
						</Select>
					</FormItem>
					<FormItem :label="$t('modules_spoc_core_web_src_views_schoolmanagement_index_252')" prop="province" class="w50">
						<Select class="w240" transfer v-model="formValidate.province" :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_253')" @on-change="getCityList">
							<Option :value="item.id" v-for="item in provinceList" :key="item.id">{{item.name}}</Option>
						</Select>
					</FormItem>
					<FormItem :label="$t('modules_spoc_core_web_src_views_schoolmanagement_index_254')" prop="city" class="w50">
						<Select class="w240" transfer v-model="formValidate.city" :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_255')" @on-change="getCityName">
							<Option :value="item.id" v-for="item in cityList" :key="item.id">{{item.name}}</Option>
						</Select>
					</FormItem>
					<FormItem :label="$t('modules_spoc_core_web_src_views_schoolmanagement_index_256')" prop="address" class="w50">
						<Input v-model="formValidate.address" class="w240" :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_244')"></Input>
					</FormItem>
					<FormItem :label="$t('modules_spoc_core_web_src_views_schoolmanagement_index_257')" prop="contact" class="w50">
						<Input v-model="formValidate.contact" class="w240" :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_245')"></Input>
					</FormItem>
					<FormItem :label="$t('modules_spoc_core_web_src_views_schoolmanagement_index_258')" prop="schoolLeader" class="w50">
						<Input v-model="formValidate.schoolLeader" class="w240" :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_259')"></Input>
					</FormItem>
					<FormItem :label="$t('modules_spoc_core_web_src_views_schoolmanagement_index_260')" prop="schoolLeaderContact" class="w50">
						<Input v-model="formValidate.schoolLeaderContact" class="w240" :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_261')"></Input>
					</FormItem>
					<FormItem :label="$t('views_staff_components_lefttree_648')" prop="remarks">
						<Input v-model="formValidate.remarks" style="width:616px;" type="textarea"  :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_263')"></Input>
					</FormItem>
				</Form>
			</div>
		</Modal>
	</div>
</template>
<script>
import valid, { errors, sys, sysUser, sysDict, common } from "../../libs/request";
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import { waitUntil } from "@public/libs/util";
import bigTable from "@public/modules/bigTable.vue";
export default {
	name: "core.schoolManagement",
	data() {
		return {
			isActioning: false, // 多次提交拦截
            tableHeightOut: 72, // 324,
			searchObj: {
				name : '',
				type : '',
				province : '',
				city : '',
				address : '',
				contact : ''
			},
			com_student_school_type: [], // 学校级别
			provinceList:[], // 省
			cityList:[], // 市
			searchCityList:[], // 市
			com_service_user_type: [],
			selection: [],
			loading: true,
			formValidate: {
				name: "",
				type: "",
				typeName: "",
				province: "",
				provinceName: "",
				city: "",
				cityName: "",
				address: "",
				contact: "",
				schoolLeader: "",
				schoolLeaderContact: "",
				remarks: ''
			},
			ruleValidate: {
				name: [
					{
						required: true,
						message: this.$t('modules_spoc_core_web_src_views_schoolmanagement_index_264'),
						trigger: "change"
					}
				],
				type: [
					{
						required: true,
						message: this.$t('modules_spoc_core_web_src_views_schoolmanagement_index_241'),
						trigger: "change"
					}
				],
				province: [
					{
						required: true,
						message: this.$t('modules_spoc_core_web_src_views_schoolmanagement_index_242'),
						trigger: "change"
					}
				],
				city: [
					{
						required: true,
						message: this.$t('modules_spoc_core_web_src_views_schoolmanagement_index_243'),
						trigger: "change"
					}
				],
			},
			// validateResultValue: (rule, value, callback) => {
			// 	console.log(rule)
			// 	let index = rule.field.split('.')[1]
			// 	let reg = /^[a-zA-Z0-9_]+$/;
			// 	if (this.formValidate.completeResultList.length > 1) {
			// 		console.log(reg.test(value));
			// 		if (!value.trim()) {
			// 			callback(new Error("状态值不能为空"));
			// 		} else if (!reg.test(value)) {
			// 			callback(new Error("状态值只能为英文、数字、英文下划线"));
			// 		} else {
			// 			let count = 0;
			// 			this.formValidate.completeResultList.forEach(item => {
			// 				if (item.resultValue.trim() == value) {
			// 					count = count + 1;
			// 				}
			// 			});
			// 			if (count > 1) {
			// 				callback(new Error("状态值不能重复"));
			// 			} else {
			// 				let _arr = this.formValidate.completeResultList
			// 				this.checkResultValueRpt(value, callback, _arr[index]);
			// 				// callback();
			// 			}
			// 		}
			// 	} else {
			// 		if (
			// 			this.formValidate.completeResultList[0].resultLabel.trim()
			// 		) {
			// 			if (!value.trim()) {
			// 				callback(new Error("状态值不能为空"));
			// 			} else if (!reg.test(value)) {
			// 				callback(new Error("状态值只能为英文、数字、英文下划线"));
			// 			} else {
			// 				let _arr = this.formValidate.completeResultList
			// 				this.checkResultValueRpt(value, callback, _arr[index]);
			// 				// callback();
			// 			}
			// 		} else {
			// 			callback();
			// 		}
			// 	}
			// },
			validateResultLabel: (rule, value, callback) => {
				if (this.formValidate.completeResultList.length > 1) {
					if (!value.trim()) {
						callback(new Error(this.$t('modules_spoc_core_web_src_views_schoolmanagement_index_265')));
					} else {
						let count = 0;
						this.formValidate.completeResultList.forEach(item => {
							if (item.resultLabel.trim() == value) {
								count = count + 1;
							}
						});
						if (count > 1) {
							callback(new Error(this.$t('modules_spoc_core_web_src_views_schoolmanagement_index_266')));
						} else {
							callback();
						}
						callback();
					}
				} else {
					callback();
				}
			},
			createSchool: false,
			dataTotal: 0,
			tableData: [],
			pageNo: 1,
			pageSize: this.$store.state.app.pageSizeGlobal,
			defaultShowCol: {
				true: [
					{
						name: "name",
						title: this.$t('modules_spoc_core_web_src_views_schoolmanagement_index_267'),
						selected: true,
						required: false,
						sort: 0,
					},
					{
						name: "typeName",
						title: this.$t('modules_spoc_core_web_src_views_schoolmanagement_index_268'),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "schoolLeader",
						title: this.$t('modules_spoc_core_web_src_views_schoolmanagement_index_269'),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "schoolLeaderContact",
						title: this.$t('modules_spoc_core_web_src_views_schoolmanagement_index_270'),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "location",
						title: this.$t('modules_spoc_core_web_src_views_schoolmanagement_index_271'),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "address",
						title: this.$t('modules_spoc_core_web_src_views_schoolmanagement_index_272'),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "contact",
						title: this.$t('modules_spoc_core_web_src_views_schoolmanagement_index_273'),
						selected: true,
						required: false,
						sort: 0
					}
				]
			},
			tableColumnArray: [
				{
					title: this.$t('classlist_compontents_detailinfo_45'),
					key: "doAction",
					width: 100,
					render: (h, params) => {
						return h(
							"div",
							{
								style: {}
							},
							[
								h(
									"a",
									{
										style: {
											"margin-right": "10px",
											// "color": params.row.isSys == "1"? '#999' : ''
										},
										on: {
											click: () => {
												this.$Modal.confirm({
													title: this.$t('views_coursepack_bigtableexample_345'),
													content:
														this.$t('modules_spoc_core_web_src_views_schoolmanagement_index_276'),
													onOk: () => {
														this.deleteSchool(
															params.row.id
														);
													},
													onCancel: () => {}
												});
											}
										}
									},
									this.$t('classlist_compontents_detailinfo_46')
								),
								h(
									"a",
									{
										style: {
											// "color": params.row.isSys == "1"? '#999' : ''
										},
										on: {
											click: () => {
												this.formDetail(params.row.id);
											}
										}
									},
									this.$t('classroom_allscore_51')
								)
							]
						);
					}
				}
			],
			btnList: [
				{
					type: "",
					btnClick: this.addSchool,
					text: this.$t('modules_spoc_core_web_src_views_schoolmanagement_index_279')
				},
				{
					type: "",
					btnClick: this.delIds,
					text: this.$t('spoc_hootie_web_481')
				}
			],
		};
	},
	computed: {
		...mapState(["userInfo"])
	},
	components: {
		vSearchCollapse,
		bigTable,
	},
	mounted() {
		this.batchListData();
		this.comSchoolListPage();
		this.getProvinceList();
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		selectionChange(selection) {
			this.selection = selection;
		},
		getProvinceList(){
			let params={
				id: 'CN7'
			}
			sys.listLocation(params)
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
					this.provinceList = res.data.data;
				}
			})
			.catch(errors.call(this))
			.finally(() => {
			});
		},
		getCityListSearch(val){
			this.searchObj.city = ''
			if(val){
				let params={
					id: val
				}
				sys.listLocation(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.searchCityList = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
				});
			}
		},
		getCityList(val, isEditLoad , obj){
			let _obj = this.provinceList.filter(item=>{
				return item.id == val
			})[0]
			if(_obj){
				this.formValidate.provinceName = _obj.name
			}
			
			if(val){
				this.updateLoadingStatus({ isLoading: true });
				let params={
					id: val
				}
				sys.listLocation(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						if(isEditLoad){
							this.formValidate = obj
							this.createSchool = true;
						} else{
							this.formValidate.city = ''
							this.formValidate.cityName = ''
						}
						this.cityList = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
			} else {
				if(isEditLoad){
					this.formValidate = obj
					this.createSchool = true;
				} 
				this.updateLoadingStatus({ isLoading: false });
			}
		},
		getCityName(val){
			if(val){
				let _obj = this.cityList.filter(item=>{
					return item.id == val
				})[0]
				if(_obj){
					this.formValidate.cityName = _obj.name
				}
			} else {
				this.formValidate.cityName = ''
			}
		},
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
		comSchoolListPage() {
			this.updateLoadingStatus({ isLoading: true });
			let param = Object.assign({},this.searchObj)
			param.pageNo = this.pageNo
			param.pageSize = this.pageSize
			common
				.comSchoolListPage(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data;
						this.tableData = result.list;
						this.dataTotal = result.total;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		//获取详情
		formDetail(id) {
			this.updateLoadingStatus({ isLoading: true });
			common
				.comSchoolForm({ id })
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data;
						this.editId = result.id;
						// this.formValidate = result
						this.getCityList(result.province, true , result)
					} else {
						this.updateLoadingStatus({ isLoading: false });
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					// this.updateLoadingStatus({ isLoading: false });
				});
		},
		//获取学校类型
		batchListData() {
			sysDict
				.batchListData({
					types: "com_student_school_type"
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.com_student_school_type = res.data.data.com_student_school_type;
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		pageChange(pageNo, pageSize) {
			if (!pageNo) {
				//防止无用重复请求
				return;
			}
			this.pageNo = pageNo;
			this.pageSize = pageSize;
			this.comSchoolListPage();
		},
		delIds(){
			if(!this.selection.length){
				this.$Message.error(this.$t('modules_spoc_core_web_src_views_schoolmanagement_index_281'))
				return;
			}
			let ids = this.selection.map(item=>{return item.id})
			this.updateLoadingStatus({
				isLoading: true
			});
			common
				.comSchoolBatchDelete({
					ids
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.doSearch();
					} else {
						this.updateLoadingStatus({
							isLoading: false
						});
					}
				})
				.catch(errors.call(this))
				.finally(() => {
				});
		},
		//打开添加学校
		addSchool() {
			this.editId = "";
			this.formValidate.id = '';
			this.$refs["formValidate"].resetFields();
			this.cityList = []
			this.createSchool = true;
		},
		resetSearch() {
			this.tableData = [];
			this.searchObj = {
				name : '',
				type : '',
				province : '',
				city : '',
				address : '',
				contact : ''
			},
			this.pageNo = 1
			this.comSchoolListPage();
		},
		doSearch() {
			this.pageNo = 1
			this.tableData = [];
			this.comSchoolListPage();
		},
		//删除
		deleteSchool(id) {
			this.updateLoadingStatus({
				isLoading: true
			});
			common
				.comSchoolDeleteById({
					id
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.doSearch();
					} else {
						this.updateLoadingStatus({
							isLoading: false
						});
					}
				})
				.catch(errors.call(this))
				.finally(() => {
				});
		},
		ok() {
			this.$refs["formValidate"].validate(validRes => {
				if (validRes) {
					if(this.isActioning){ //多次提交拦截
						return
					}
					this.isActioning = true
					this.updateLoadingStatus({ isLoading: true });

					let _typeNameObj = this.com_student_school_type.filter(item=>{
						return item.value == this.formValidate.type
					})[0]
					if(_typeNameObj){
						this.formValidate.typeName = _typeNameObj.label
					}

					let obj = Object.assign({}, this.formValidate);

					if (this.editId) {
						obj.id = this.editId;
					}

					common
						.comSchoolSave(obj)
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								this.createSchool = false;
								this.loading = false;
								setTimeout(() => {
									this.loading = true;
								}, 0);
								if(this.editId){
									this.comSchoolListPage();
								} else {
									this.doSearch()
								}
							} else {
								this.createSchool = true;
								this.loading = false;
								setTimeout(() => {
									this.loading = true;
								}, 0);
							}
						})
						.catch(errors.call(this))
						.finally(() => {
							this.updateLoadingStatus({ isLoading: false });
							setTimeout(()=>{
								//多次提交拦截
								this.isActioning = false
							},200)
						});
				} else {
					this.createSchool = true;
					this.loading = false;
					setTimeout(() => {
						this.loading = true;
					}, 0);
				}
			});
		},
		cancel() {
			this.createSchool = false;
		}
	},
	watch: {
		/* "formValidate.status" : {
				deep: true,
				handler: function(){
					this.$refs['formValidate'].validate()
				}
			} */
	}
};
</script>