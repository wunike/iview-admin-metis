<style lang="less">
	.modalstud {
		.ivu-form{
			.ivu-form-item-label{
				font-size: 14px;
                color: #999999;
			}
		}
		.ivu-input{
			font-size: 14px;
		}
		.ivu-select-single{
			.ivu-select-selection{
				.ivu-select-selected-value {
					font-size: 14px;
				}
			}
		}
		.ivu-modal-body {
			overflow-y: auto;
			height: 460px;
			@media screen and (min-width: 1600px) {
				height: 580px;
			}
			@media screen and (min-width: 1920px) {
				height: 675px;
			}
		}
		.formstud {
			.ivu-divider {}
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
					button {
						margin-left: 12px;
					}
				}
			}
			.address {
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}
		}
	}
</style>

<template>
	<div>
		<Modal v-model="modalstud" :title="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_966')" width="800" :closable="true" :mask-closable="true" class-name="modalstud vertical-center-modal" @on-visible-change="modalstudVisible">
			<div style="padding-right: 14px; overflow: hidden;">
				<Form ref="formstud" :rules="studRule" :model="studData" :label-width="114" class="formstud">
					<Divider style="margin-top: 0;">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_883')}}</Divider>
					<!-- <Row>
						<Col span="12">
						<FormItem prop="code" :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_944')" v-if="studData.code">
							<Input v-model="studData.code" disabled style="width:250px;"></Input>
						</FormItem>
						</Col>
					</Row> -->
					<Row>
						<Col span="12">
						<FormItem prop="name" :label="$t('modules_rolemanage_167')">
							<Input v-model="studData.name" :placeholder="$t('modules_rolemanage_186')" style="width:250px;"></Input>
						</FormItem>
						</Col>
						<Col span="12">
						<FormItem prop="enName" :label="$t('messagemanagement_components_infos_319')">
							<Input v-model="studData.enName" :placeholder="$t('classlist_compontents_detailinfo_36')" style="width:250px;"></Input>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="12">
						<FormItem prop="mobile" :label="$t('modules_rolemanage_168')">
							<Input v-model="studData.mobile" :placeholder="$t('modules_usermanage_230')" style="width:250px;"></Input>
						</FormItem>
						</Col>
						<Col span="12">
						<FormItem prop="gender" :label="$t('views_staff_components_staffinfo_669')">
							<RadioGroup v-model="studData.gender">
								<Radio label="m">{{$t('views_staff_components_staffinfo_670')}}</Radio>
								<Radio label="f">{{$t('views_staff_components_staffinfo_671')}}</Radio>
							</RadioGroup>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="12">
						<FormItem prop="birthday" :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_719')">
							<DatePicker type="date" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_973')" :options="birthdayOption" :value="studData.birthday" transfer style="width:250px;" @on-change="swfTime('birthday',$event)"></DatePicker>
						</FormItem>
						</Col>
						<Col span="12">
						<FormItem prop="gradeType" :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_955')" :rules="{required: true, message:$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_974'), trigger: 'change'}">
						<Select v-model="studData.gradeType" transfer @on-change="getGradeList">
							<Option :value="item.value" v-for="(item, index) in jw_course_type" :key="index">{{item.label}}</Option>
						</Select>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="12">
						<FormItem prop="grade" :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_975')" :rules="{required: true, message: $t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_976'), trigger: 'change'}">
                            <Select v-model="studData.grade">
                                <Option :value="item.value" v-for="(item, index) in gradeList" :key="index">{{item.label}}</Option>
                            </Select>
						</FormItem>
						</Col>
						<Col span="12">
						<FormItem prop="school" :label="$t('modules_spoc_core_web_src_views_schoolmanagement_index_249')">
                            <Select
                                v-model="studData.schoolId"
                                :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_511')"
                                filterable
                                clearable
								@on-change="setSchoolType">
                                <Option v-for="(option, index) in schoolList" :value="option.id" :key="index">{{option.name}}</Option>
                            </Select>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="12">
						<FormItem prop="schoolGrade" :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_724')">
							<Select v-model="studData.schoolGrade" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_980')" style="width:250px;">
								<Option v-for="item in schoolGradeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</Select>
						</FormItem>
						</Col>
					<!-- </Row>
					<Row> -->
						<Col span="12">
						<FormItem prop="address" :label="$t('views_staff_components_lefttree_641')">
							<div class="address" style="width:250px;">
								<Input v-model="studData.address" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_977')"></Input>
								<Button @click="getMap(0)">{{$t('views_staff_components_lefttree_6412')}}</Button>
							</div>
						</FormItem>
						</Col>
					</Row>
                    <Row>
                        <Col span="24">
                        <FormItem :prop="remarks" :label="$t('views_staff_components_lefttree_648')">
                            <Input type="textarea" v-model="studData.remarks" :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_263')"></Input>
                        </FormItem>
                        </Col>
                    </Row>
					<Divider style="margin-top: 0;">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_897')}}</Divider>
					<div class="contacts_wrap" v-for="(items, index) in studData.comParentList" :key="index">
						<p class="linkman"><span class="linkman_tit"><span class="tit_cont">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_960', [index+1])}}</span>
							<Radio v-model="items.isMain" :true-value="1" :false-value="0" @on-change="setMain(index,$event)">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_961')}}</Radio>
							</span>
							<Button v-show="studData.comParentList.length>1" @click="delContacts(index)">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_982')}}</Button>
							<Button type="primary" v-show="index==studData.comParentList.length-1" @click="addContacts">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_898')}}</Button>
						</p>
						<Row>
							<Col span="12">
							<FormItem :prop="'comParentList.' + index + '.name'" :rules="{required: true, message: $t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_984'), trigger: 'blur'}" :label="$t('modules_rolemanage_167')">
								<Input v-model="items.name" :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_memberregistration_728')" style="width:250px;"></Input>
							</FormItem>
							</Col>
							<Col span="12">
							<FormItem :prop="'comParentList.' + index + '.relation'" :rules="{required: true, message: $t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_984'), trigger: 'change'}" :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_900')">
								<Select v-model="items.relation" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_986')" style="width:250px;">
									<Option v-for="item in relationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
								</Select>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span="12">
							<FormItem :prop="'comParentList.' + index + '.phone'" :rules="[{required: true,message: $t('modules_spoc_core_web_src_views_customstate_stategroup_204'),trigger: 'blur'}, {pattern: /^\d+$/,message: $t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_532'),trigger: 'blur'}]" :label="$t('modules_rolemanage_168')">
								<Input v-model="items.phone" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_989')" style="width:250px;"></Input>
							</FormItem>
							</Col>
							<Col span="12">
							<FormItem :prop="'comParentList.' + index + '.cellNumber'" :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_901')">
								<Input v-model="items.cellNumber" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_990')" style="width:250px;"></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span="12">
							<FormItem :prop="'comParentList.' + index + '.qq'" label="QQ：">
								<Input v-model="items.qq" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_991')" style="width:250px;"></Input>
							</FormItem>
							</Col>
							<Col span="12">
							<FormItem :prop="'comParentList.' + index + '.weChat'" label="Wechat：">
								<Input v-model="items.weChat" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_992')" style="width:250px;"></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span="12">
							<FormItem :prop="'comParentList.' + index + '.email'" label="E-mail：">
								<Input v-model="items.email" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_993')" style="width:250px;"></Input>
							</FormItem>
							</Col>
						</Row>
					</div>
				</Form>
			</div>
			<div slot="footer">
				<Button @click="modalstud=false">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="studOk('formstud')">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
		<mapModel ref="mapModel" @mapOk="mapOk"></mapModel>
	</div>
</template>

<script>
	import mapModel from './mapModel.vue';
	import valid, {
		errors,
		sys,
        common,
		sysDict
	} from '../../../libs/request';
	export default {
		props: {
			editList: {
				type: Object,
				default: () => {
					return {};
				}
			},
			//			selected: {
			//				type: [String, Number],
			//				default: ''
			//			}
		},
		data() {
			return {
				birthdayOption:{
					disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
				},
                loading:false,
                schoolList:[],
				modalstud: false,
				jw_course_type: [],
				studData: {
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
                    remarks:'',
					comParentList: [{
                        isMain: 1,
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
				studRule: {
					birthday: [{
						required: true,
						message: this.$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_996'),
						trigger: 'change'
					}, {
						required: true,
						message: this.$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_996'),
						trigger: 'blur'
					}, ],
					gender: [{
						required: true,
						message: this.$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_997'),
						trigger: 'change'
					}, ],
					name: [{
						required: true,
						message: this.$t('modules_spoc_core_web_src_views_customstate_stategroup_204'),
						trigger: 'blur'
					}, {
                        pattern: /^(\S+(\s?\S+)*)$/,
                        message: this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_531'),
                        trigger: 'blur'
                    }],
					mobile: [{
						required: true,
						message: this.$t('modules_spoc_core_web_src_views_customstate_stategroup_204'),
						trigger: 'blur'
					}, {
						pattern: /^\d+$/,
						message: this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_532'),
						trigger: 'blur'
					}]
				},
				schoolTypeList: [],
				schoolGradeList: [],
				gradeList: [],
				provinceList: [],
				cityList: [],
				regionList: [],
				relationList: [],
                mapName:'',
			}
		},
		components: {
			mapModel
		},
		created() {

		},
		mounted() {
			this.getListLocation(7, 'provinceList');
			this.getSourceType();
			this.getDict();
            this.getComSchoolListName('');
		},
		methods: {
            getComSchoolListName(name){
                this.loading=true;
                        console.log(1213123)
                let params={
                    name
                }
                common
                .comSchoolListName(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        console.log(res.data)
                      this.schoolList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loading=false;
                });
            },
            validatting(){
				if(this.editList.student) {
					let obj = Object.assign({}, this.studData, this.editList.student)
					this.studData = JSON.parse(JSON.stringify(obj));
				}
                this.$nextTick(()=>{
                    this.$refs['formstud'].validate((valid1) => {
                        if(valid1) {
                        } else {
                            this.modalstud = true;
                        }
                    })
                })
            },
            getSourceType(){
              	let types = 'jw_course_type' //,jw_course_grade' //课程包分类,适用年级
              	sysDict.batchListData({
              			types
              		})
              		.then(valid.call(this))
              		.then(res => {
              			if(res.ok) {
              				this.jw_course_type = res.data.data.jw_course_type
              			}
              		})
              		.catch(errors.call(this))
              		.finally(() => {
              		});
            },

            getGradeList(value) {
                let types = value; //课程包分类,适用年级
                if(!this.editList.student){
                    this.studData.grade='';
                }
                sysDict
                    .batchListData({
                        types
                    })
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.gradeList = res.data.data[value];
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                    });
            },
			getDict() {
				let params = {
					types: 'com_student_school_type,com_student_school_grade,ht_parent_relation'
				};
				sysDict
					.batchListData(params)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.schoolTypeList = res.data.data.com_student_school_type;
							this.schoolGradeList = res.data.data.com_student_school_grade;
							this.relationList = res.data.data.ht_parent_relation;
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			// findChildDictByParentDict() {
			// 	let params = {
			// 		type: 'jw_course_type'
			// 	};
			// 	sysDict
			// 		.findChildDictByParentDict(params)
			// 		.then(valid.call(this))
			// 		.then(res => {
			// 			if(res.ok) {
			// 				this.gradeList = res.data.data;
			// 			}
			// 		})
			// 		.catch(errors.call(this))
			// 		.finally(() => {});
			// },
			getCityList(id) {
				this.getListLocation(id, 'cityList');
			},
			getRegionList(id) {
				this.getListLocation(id, 'regionList');
			},
			getListLocation(id, list) {
				if(!id) return;
				let params = {
					id
				}
				sys
					.listLocation(params)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this[list] = res.data.data;
						}
					})
					.catch(errors.call(this));
			},
			studOk(name) {
				this.$refs[name].validate((valid1) => {
					if(valid1) {
						let obj = Object.assign({}, this.studData);
						obj = JSON.parse(JSON.stringify(obj));
						this.$emit('studOk', obj);
					} else {}
				})
			},
			close() {
				this.$nextTick(() => {
					this.modalstud = false;
					this.$refs.formstud.resetFields();
				})
			},
			modelShow() {
				if(this.editList.student) {
					let obj = Object.assign({}, this.studData, this.editList.student)
					this.studData = JSON.parse(JSON.stringify(obj));
                    if(this.studData.gradeType){
                        this.getGradeList(this.studData.gradeType)
                    }
				}
                this.$nextTick(()=>{
                    this.modalstud = true;
                })
			},
			swfTime(k, v) {
				console.log(v, (new Date(v)).format('yyyy-MM-dd'))
				if(v) {
					this.studData[k] = (new Date(v)).format('yyyy-MM-dd');
				} else {
					this.studData[k] = '';
				}
			},
			modalstudVisible(val) {
				if(!val) {
					this.$nextTick(() => {
						this.$refs.formstud.resetFields();
					})
				}
			},
			addContacts() {
				let obj = {
                    isMain: 0,
					name: '',
					relation: '',
					phone: '',
					cellNumber: '',
					qq: '',
					weChat: '',
					email: '',
					remarks: ''
				};
				this.studData.comParentList.push(obj);
			},
			delContacts(ind) {
				this.studData.comParentList.splice(ind, 1)
			},
			setMain(index, e) {
				this.studData.comParentList.forEach((v, k) => {
					if(k == index) {
						v.isMain = 1;
					} else {
						v.isMain = 0;
					}
				})
			},
			getMap(val) {
                this.mapName=val;
				this.$refs.mapModel.modelShow();
			},
			mapOk(keyword, province, city, region, lng, lat) {
                if(this.mapName==1){
				this.studData.school = keyword;
				this.studData.latLongSchool = lng+','+lat;
                }else{
				this.studData.address = keyword;
				this.studData.province = province;
				this.studData.city = city;
				this.studData.region = region;
				this.studData.lng = lng;
				this.studData.lat = lat;
				this.studData.latLongAddress = lng+','+lat;

                }
			},
			setSchoolType(item){
				// this.studData.schoolType
			}
		},
		watch: {
			//			xqList: {
			//				handler: function(val, oldVal) {
			//
			//				},
			//				deep: true
			//			}
		}
	}
</script>
