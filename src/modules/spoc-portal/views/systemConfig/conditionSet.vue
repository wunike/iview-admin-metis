<style lang="less">
	.conditionSet {}
	
	.conditionModal {
		.ivu-form-item {
			margin-bottom: 20px;
		}
		.modalBody {
			.new_state {
				color: #357eee;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin: 12px 0 0;
				line-height: 1;
				a {
					i {
						line-height: 14px;
					}
					span {
						line-height: 14px;
					}
				}
			}
			.conditionsList {
				margin-bottom: 22px;
				.ivu-form-item {
					margin-bottom: 0px;
				}
			}
			.ivu-input-number {
				width: 100%;
			}
		}
	}
</style>

<template>
	<div class="conditionSet">
		<Modal v-model="modal" :title="title" :mask="true" width="600" scrollable class-name="conditionModal vertical-center-modal" @on-visible-change="visibleChange">

			<div class="modalBody">
				<Form ref="formCond" :model="items" :label-width="90" v-for="(items,index) in coursesList" :key="'coursesList'+index" v-if="items.id==num">
					<Row>
						<Col span="11">
						<FormItem prop="name" label="状态名称" :rules="{required:true,message:'该项必填',trigger: 'blur'}">
							<Input type="text" v-model="items.name" placeholder="状态名称">
							</Input>
						</FormItem>
						</Col>
						<Col span="11" style="margin-left: 28px;">
						<FormItem prop="id" label="序号" :rules="{required:true,message:'该项必填',trigger: 'blur'}">
							<Input type="text" v-model="items.id" placeholder="序号" disabled>
							</Input>
						</FormItem>
						</Col>
					</Row>
					<FormItem prop="logicalOperation" label="满足下面">
						<RadioGroup v-model="items.logicalOperation">
							<Radio label="and">全部</Radio>
							<Radio label="or">任一条件，则学员状态为 {{items.name||'__'}}</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem prop="conditions" label="条件设置">
						<div v-for="(condition,ind) in items.conditions" :key="'conditions_'+ind" class="conditionsList">
							<Row>
								<Col span="9">
								<FormItem :prop="`conditions.${ind}.field`" :label-width="1" :rules="{required:true,message:'该项必填',trigger: 'change'}">
									<Select v-model="condition.field" style="" @on-change="fieldChange(items.conditions,condition)">
										<Option v-for="item in dictList.jw_classcourse_student_status_field" :value="item.value" :key="item.value">{{ item.label }}</Option>
									</Select>
								</FormItem>
								</Col>
								<Col span="6" style="padding: 0 10px;">
								<FormItem :prop="`conditions.${ind}.operation`" :label-width="1" :rules="{required:true,message:'该项必填',trigger: 'change'}">
									<Select v-model="condition.operation" style="" @on-change="operationChange(items.conditions)">
										<Option v-for="item in dictList.operation_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
									</Select>
								</FormItem>
								</Col>
								<Col span="8">
								<FormItem :prop="`conditions.${ind}.value`" :label-width="1" :rules="validatePassCheck(condition)">
									<Select v-model="condition.value" style="" @on-change="statusChange(items.conditions)" v-if="condition.field=='jw_classcourse_student_status'">
										<Option v-for="item in dictList.jw_classcourse_student_status" :value="item.value" :key="item.value">{{ item.label }}</Option>
									</Select>
									<Select v-model="condition.value" style="" @on-change="endTypeChange(items.conditions)" v-else-if="condition.field=='jw_classcourse_student_end_type'">
										<Option v-for="item in dictList.jw_classcourse_student_end_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
									</Select>
									<div v-else>
										<Input v-model="condition.value" @on-change="timeChange(condition)" key="hasDay" v-if="condition.field=='LastLessonDays'">
										<span slot="append">天</span>
										</Input>
										<Input v-model="condition.value" @on-change="timeChange(condition)" v-else>
										</Input>
									</div>
								</FormItem>
								<!--<Row v-else>
										<Col :span="24">
										<InputNumber :value="condition.value-0" @on-change="setNumber(condition,$event)"></InputNumber>
										</Col>
										<Col span="4" v-if="condition.field=='LastLessonDays'" style="text-align: center;">
										<div class="day">天</div>
										</Col>
									</Row>-->
								</Col>
								<Col span="1" v-show="items.conditions.length">
								<a href="javascript:void(0);" @click="delCondition(items.conditions,ind,'formCond')">
									<Icon type="md-trash" color="#999" :size="18" />
								</a>
								</Col>
							</Row>
						</div>
						<p class="new_state">
							<a href="javascript:void(0);" @click="addCondition(items.conditions)">
								<Icon type="md-add" :size="15" /><span>添加条件</span></a>
						</p>
					</FormItem>
					<FormItem prop="remarks" label="备注">
						<Input type="textarea" :autosize="{minRows: 3,maxRows: 5}" v-model="items.remarks">
						</Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button @click="close">取消</Button>
				<Button type="primary" @click="ok('formCond')">确定</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import valid, {
		errors,
		sys,
		ssCaseCard,
		sysDict
	} from "../../libs/request.js";
	export default {
		props: {
			coursesList: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				title: '新增状态',
				modal: false,
				num: -1,
				//				formCond: {
				//					id: this.coursesList.length + 1,
				//					name: "",
				//					logicalOperation: "and",
				//					conditions: [{
				//						isDict: "",
				//						field: "",
				//						fieldName: "",
				//						operation: "",
				//						operationName: "",
				//						value: "",
				//						valueName: ""
				//					}, ],
				//					remarks: "",
				//					isHide: "0"
				//				},
				ruleCond: {
				},
				dictList: {

				}
			}
		},
		created() {

		},
		methods: {
			
			validatePassCheck(item) {
				if(item.field=='jw_classcourse_student_status'||item.field=='jw_classcourse_student_end_type'){
					return {required:true,message:'该项必填',trigger: 'change'};
				}else{
					return [{required:true,message:'该项必填',trigger: 'blur'},{pattern: /^\d+$/,message:'该项必须为正整数',trigger: 'blur'}];
				}
				
			},
			initDict() {
				let arr = ['jw_classcourse_student_status_field', 'operation_type', 'jw_classcourse_student_status', 'jw_classcourse_student_end_type'];
				let params = {
					types: arr.join()
				}
				sysDict.batchListData(params).then(valid.call(this)).then((res) => {
					if(res.ok) {
						this.dictList = res.data.data;
					}
				}).catch(errors.call(this)).finally(() => {
					this.modal = true;
				});
			},
			showModal(tit, num) {
				this.title = tit;
				this.num = num;
				this.initDict();
			},
			fieldChange(arr, list) {
				list.operation = "";
				list.operationName = "";
				list.value = "";
				list.valueName = "";
				this.dictList.jw_classcourse_student_status_field.forEach(v => {
					arr.map(item => {
						if(item.field == v.value) {
							item.fieldName = v.label;
						}
						if(item.field == 'jw_classcourse_student_status' || item.field == 'jw_classcourse_student_end_type') {
							item.isDict = '1';
						} else {
							item.isDict = '0';
						}
					})
				})
			},
			operationChange(arr) {
				this.dictList.operation_type.forEach(v => {
					arr.map(item => {
						if(item.operation == v.value) {
							item.operationName = v.label;
						}
					})
				})
			},
			statusChange(arr) {
				this.dictList.jw_classcourse_student_status.forEach(v => {
					arr.map(item => {
						if(item.value == v.value) {
							item.valueName = v.label;
						}
					})
				})
			},
			endTypeChange(arr) {
				this.dictList.jw_classcourse_student_end_type.forEach(v => {
					arr.map(item => {
						if(item.value == v.value) {
							item.valueName = v.label;
						}
					})
				})
			},
			timeChange(item) {
				item.valueName = item.value;
			},
			visibleChange(val) {
				if(!val) {
					this.close();
				}
			},
			addCondition(item) {
				let obj = {
					isDict: "",
					field: "",
					fieldName: "",
					operation: "",
					operationName: "",
					value: "",
					valueName: ""
				}
				item.push(obj);
			},
			delCondition(item, ind, name) {
				item.splice(ind, 1)
				this.$refs[name][0].validate();
			},
			close() {
				let k = '';
				this.coursesList.forEach((v, keys) => {
					if(v.id == this.num) {
						k = keys;
					}
				})
				this.modal = false;
				if(!this.coursesList[k].name || !this.coursesList[k].remarks.split('，')[0].substring(2)) {
					this.coursesList.splice(k, 1);
				}
				this.$emit('close')
			},
			ok(name) {
				this.$refs[name][0].validate((ok) => {
					if(ok) {
						this.$emit('ok')
					}
				})
			},
			setNumber(item, e) {
				item.value = e;
				this.timeChange(item);
			},
		},
		watch: {
			coursesList: {
				handler: (val, oldVal) => {
					val.forEach(item => {
						//		      		let arr=[];
						//		      		arr.push(item.conditions.filter(item=>item.field=='jw_classcourse_student_status'))
						//		      		arr.push(item.conditions.filter(item=>item.field=='RemainHours'))
						//		      		arr.push(item.conditions.filter(item=>item.field=='LessonNumber'))
						//		      		arr.push(item.conditions.filter(item=>item.field=='LastLessonDays'))
						//		      		arr.push(item.conditions.filter(item=>item.field=='jw_classcourse_student_end_type'))
						let txt = '如果';
						item.conditions.forEach((v, index) => {
							let t = '';
							if(index > 0) {
								if(item.logicalOperation == 'and') {
									t += '且';
								} else {
									t += '或';
								}
							}
							t += v.fieldName;
							t += v.operationName;
							t += v.valueName;
							txt += t;
						});
						txt += "，则学员状态为";
						txt += item.name;
						item.remarks = txt;
					})
				},
				deep: true
			}
		}
	}
</script>