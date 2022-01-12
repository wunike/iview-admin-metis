<style lang="less">
	.student_info {
        padding: 0px 24px 30px;
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
        .edit_btn{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 15px 20px 0 0;
        }
		.formstud {
			.ivu-divider {}
			.contacts_wrap {
				.linkman {
					margin-bottom: 10px;
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
            .edit_footer{
                display: flex;
                justify-content: center;
                align-items: center;
            }
		}
        .mark-line{
            font-size:16px;
            font-weight:500;
            color:rgba(73,80,96,1);
            line-height:22px;
            span{
                left: 0;
            }
            .line{
                display: none;
            }
        }
        .student_info_box{
            .student_info_tit{
                font-size: 16px;
                font-weight: 500;
                color: #495060;
                line-height: 22px;
                padding-bottom: 10px;
            }
            .ivu-form-item-label{
                font-size:14px;
                font-weight:normal;
                color:rgba(153,153,153,1);
            }
            .ivu-form-item-content{
                font-size:14px;
                font-weight:normal;
                color:rgba(73,80,96,1);
                line-height: 34px;
            }
            .ivu-form-item{
                margin-bottom: 0;
            }
        }
	}
</style>

<template>
	<div class="student_info">
        <div class="edit_btn">
            <Tooltip :content="$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_496')" placement="bottom-end" v-if="!modalstud">
                <span @click="modelShow" style="cursor: pointer;">
                    <Icon type="ios-create-outline" size="18" />
                </span>
            </Tooltip>
        </div>
        <div class="student_info_box" v-if="!modalstud">
			<div class="student_info_tit">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_883')}}</div>
            <!-- <Divider orientation="left" style="margin-top: 0;margin-bottom: 6px;font-weight: normal;">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_883')}}</Divider> -->
            <Form :model="editList" :label-width="140">
                <div class="formBox">
                    <div class="clientInfo">
                        <Row type="flex">
                            <Col span="12">
                            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_944')">
                                {{editList.code||'- -'}}
                            </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex">
                            <Col span="12">
                            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_945')">
                                {{editList.name||'- -'}}
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_946')">
                                {{editList.enName||'- -'}}
                            </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex">
                            <Col span="12">
                            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_947')">
                                {{editList.gender=='m'?$t('views_staff_components_staffinfo_670'):editList.gender=='f'?$t('views_staff_components_staffinfo_671'):'- -'}}
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_950')">
                                {{editList.birthday?(new Date(editList.birthday)).format('yyyy-MM-dd'):'- -'}}
                            </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex">
                            <Col span="12">
                            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_951')">
                                {{editList.mobile?editList.mobile:'- -'}}
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_720')">
                                {{schoolType}}
                            </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex">
                            <Col span="12">
                            <FormItem :label="$t('modules_spoc_core_web_src_views_schoolmanagement_index_249')">
                                {{schoolName}}
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_724')">{{schoolGrade}}
                            </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex">
                            <Col span="12">
                            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_955')">{{gradeType}}
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem :label="$t('messagemanagement_components_infos_322')">{{getGradeName}}
                            </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex">
                            <Col span="12">
                            <FormItem :label="$t('views_room_classroom_576')">
                                {{editList.address?editList.address:'- -'}}
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                            <FormItem :label="$t('views_staff_components_lefttree_648')">
                                {{editList.remarks?editList.remarks:'- -'}}
                            </FormItem>
                            </Col>
                        </Row>
                        <div class="student_info_tit">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_897')}}</div>
                        <div class="contacts_wrap" v-for="(items, index) in editList.comParentList" :key="index">
                        	<p class="linkman" style="margin-bottom: 10px;font-size: 14px;"><span class="linkman_tit"><span class="tit_cont">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_960', [index+1])}}</span>
                        		<Radio disabled v-model="items.isMain" true-value="1" false-value="0" @on-change="setMain(index,$event)">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_961')}}</Radio>
                        		</span>
                        	</p>
                        	<Row>
                        		<Col span="12">
                        		<FormItem :label="$t('memberlist_compontents_modify_240')">
                                    {{items.name||'--'}}
                        		</FormItem>
                        		</Col>
                        		<Col span="12">
                        		<FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_900')">
                                    {{relationList.find(v=>v.value==items.relation)?relationList.find(v=>v.value==items.relation).label:'--'}}
                        		</FormItem>
                        		</Col>
                        	</Row>
                        	<Row>
                        		<Col span="12">
                        		<FormItem :label="$t('modules_rolemanage_168')">
                        			{{items.phone||'--'}}
                        		</FormItem>
                        		</Col>
                        		<Col span="12">
                        		<FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_901')">
                        			{{items.cellNumber||'--'}}
                        		</FormItem>
                        		</Col>
                        	</Row>
                        	<Row>
                        		<Col span="12">
                        		<FormItem label="QQ：">
                                    {{items.qq||'--'}}
                                </FormItem>
                        		</Col>
                        		<Col span="12">
                        		<FormItem label="Wechat：">
                        			{{items.weChat||'--'}}
                        		</FormItem>
                        		</Col>
                        	</Row>
                        	<Row>
                        		<Col span="12">
                        		<FormItem label="E-mail：">
                                    {{items.email||'--'}}
                        		</FormItem>
                        		</Col>
                        	</Row>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
		<!-- <Modal v-model="modalstud" :title="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_966')" width="800" :closable="true" :mask-closable="true" class-name="modalstud vertical-center-modal" @on-visible-change="modalstudVisible"> -->
			<!-- <div style="padding-right: 14px; overflow: hidden;"> -->
				<Form ref="formstud" :rules="studRule" :model="studData" :label-width="140" class="formstud" v-if="modalstud">
					<Divider  orientation="left" style="font-weight: normal;">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_883')}}</Divider>
					<Row>
						<Col span="12">
						<FormItem prop="code" :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_944')" v-if="studData.code">
							<Input v-model="studData.code" disabled style="width:250px;"></Input>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="12">
						<FormItem prop="name" :label="$t('memberlist_compontents_modify_240')">
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
						<FormItem prop="gradeType" :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_955')" :rules="{required: tenant=='0012'?false:true, message:$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_974'), trigger: 'change'}">
						<Select v-model="studData.gradeType" transfer style="width:250px;" @on-change="getGradeList">
							<Option :value="item.value" v-for="(item, index) in jw_course_type" :key="index">{{item.label}}</Option>
						</Select>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="12">
						<FormItem prop="grade" :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_975')" :rules="{required: tenant=='0012'?false:true, message: $t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_976'), trigger: 'change'}">
				            <Select v-model="studData.grade" transfer style="width:250px;">
				                <Option :value="item.value" v-for="(item, index) in gradeList" :key="index">{{item.label}}</Option>
				            </Select>
						</FormItem>
						</Col>
						<Col span="12">
						<FormItem prop="address" :label="$t('views_room_classroom_576')">
							<div class="address" style="width:250px;">
								<Input v-model="studData.address" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_977')"></Input>
								<Button @click="getMap(0)">{{$t('views_staff_components_lefttree_6412')}}</Button>
							</div>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="12">
						<FormItem prop="school" :label="$t('modules_spoc_core_web_src_views_schoolmanagement_index_249')">
                            <Select
                                v-model="studData.schoolId"
                                :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_511')"
                                filterable
                                clearable
								@on-change="setSchoolType"
                                style="width:250px;">
                                <Option v-for="(option, index) in schoolList" :value="option.id" :key="index">{{option.name}}</Option>
                            </Select>
						</FormItem>
						</Col>
						<Col span="12">
						<FormItem prop="schoolGrade" :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_724')">
							<Select v-model="studData.schoolGrade" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_980')" style="width:250px;">
								<Option v-for="item in schoolGradeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</Select>
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
					<Divider orientation="left"  style="margin-top: 0;">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_897')}}</Divider>
					<div class="contacts_wrap" v-for="(items, index) in studData.comParentList" :key="index">
						<p class="linkman"><span class="linkman_tit"><span class="tit_cont">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_960', [index+1])}}</span>
							<Radio v-model="items.isMain" true-value="1" false-value="0" @on-change="setMain(index,$event)">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_961')}}</Radio>
							</span>
							<Button v-show="studData.comParentList.length>1" @click="delContacts(index)">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_982')}}</Button>
							<Button type="primary" v-show="index==studData.comParentList.length-1" @click="addContacts">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_898')}}</Button>
						</p>
						<Row>
							<Col span="12">
							<FormItem :prop="'comParentList.' + index + '.name'" :rules="{required: true, message: $t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_984'), trigger: 'blur'}" :label="$t('memberlist_compontents_modify_240')">
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
							<FormItem :prop="'comParentList.' + index + '.phone'" :rules="[{required: true,message: $t('modules_spoc_core_web_src_views_customstate_stategroup_204'),trigger: 'blur'}, {pattern: /^\d+$/,message: $t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_988'),trigger: 'blur'}]" :label="$t('modules_rolemanage_168')">
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
                    <div class="edit_footer">
                        <Button @click="close">{{$t('classroom_allscore_53')}}</Button>
                        <Button type="primary" @click="studOk('formstud')" style="margin-left: 10px;">{{$t('classroom_allscore_54')}}</Button>
                    </div>
				</Form>
			<!-- </div> -->
		<!-- </Modal> -->
		<mapModel ref="mapModel" @mapOk="mapOk"></mapModel>
	</div>
</template>

<script>
	import mapModel from "@public/modules/mapModel.vue";
    import { mapMutations, mapState } from "vuex";
	import valid, {
		errors,
		sys,
		sysDict,
        common
	} from '../../../libs/request';
	export default {
		props: {
            id:{
                type:'String',
                default:''
            },
		},
		data() {
			return {
                tenant:localStorage.getItem('tenant'),
                editList:{},
				birthdayOption:{
					disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
				},
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
					gender: '',
					schoolType: '',
					school: '',
					schoolId:'',
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
					},
					// {
					// 	pattern: /(^[\u4e00-\u9fa5\d]{1,7}$)|(^[A-Za-z_\.\d]{1,14}$)/,
					// 	message: '最多输入7个汉字或14个字母（包含数字和下划线）',
					// 	trigger: 'blur'
					// },
					],
					mobile: [
     //                    {
					// 	required: true,
					// 	message: '该项为必填',
					// 	trigger: 'blur'
					// },
                    {
						pattern: /^\d*$/,
						message: this.$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_988'),
						trigger: 'blur'
					}]
				},
				schoolTypeList: [],
				schoolGradeList: [],
				gradeList: [],
                gradeListChild:[],
				provinceList: [],
				cityList: [],
				regionList: [],
				relationList: [],
                mapName:'',
                dictData:{

                },
				schoolList:[],
			}
		},
        computed: {
            schoolName() {
                let info = this.schoolList.find(v => v.id == this.editList.schoolId);
                if(info){
                    return info.name||'--';
                }else{
                    return '--';
                }
			},
			schoolType() {
                let info = this.schoolList.find(v => v.id == this.editList.schoolId);
                if(info){
                    return info.typeName||'--';
                }else{
                    return '--';
                }
			},
			schoolGrade() {
				if(this.dictData.com_student_school_grade) {
					return this.dictData.com_student_school_grade.find(v => v.value == this.editList.schoolGrade) ? this.dictData.com_student_school_grade.find(v => v.value == this.editList.schoolGrade).label : '- -';
				};
			},
			getGradeName() {
				if(this.gradeListChild.length) {
					return this.gradeListChild.find(v => v.value == this.editList.grade) ? this.gradeListChild.find(v => v.value == this.editList.grade).label : '- -';
				};
			},
            gradeType() {
				if(this.jw_course_type.length) {
					return this.jw_course_type.find(v => v.value == this.editList.gradeType) ? this.jw_course_type.find(v => v.value == this.editList.gradeType).label : '- -';
				};
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
            this.getDictData();
            this.findChildDictByParentDict();
            this.getComSchoolListName('');
		},
		methods: {
            ...mapMutations(["updateLoadingStatus"]),
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
            getDictData(){
                this.updateLoadingStatus({ isLoading: true });
                sysDict.batchListData({
                	types: 'com_student_school_type,com_student_school_grade,ht_contract_sign_type,ht_parent_relation,ht_receipt_detail_type'
                }).then(valid.call(this)).then(res => {
                	if(res.ok) {
                		this.dictData = res.data.data;
                	}
                }).catch(errors.call(this)).finally(() => {
                    this.getInfo();
                });
            },
            getInfo(){
                common.comStudentForm({
                    id: this.id,
                })
                .then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.editList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
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
                if(!Object.keys(this.editList).length){
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
			findChildDictByParentDict() {
				let params = {
					type: 'jw_course_type'
				};
				sysDict
					.findChildDictByParentDict(params)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.gradeListChild = res.data.data;
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
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
                        this.updateLoadingStatus({ isLoading: true });
						let obj = Object.assign({}, this.studData);
						obj = JSON.parse(JSON.stringify(obj));
                        common.comStudentSave(obj)
                        .then(valid.call(this))
                        .then(res => {
                            if(res.ok) {
                                this.getInfo();
								this.close();
								this.$emit("uploadTags");
                            }
                        })
                        .catch(errors.call(this))
                        .finally(() => {
                            this.updateLoadingStatus({ isLoading: false });
                        });
					} else {}
				})
			},
			modelShow(isJumpEditor) {
				if(Object.keys(this.editList).length) {
					let obj = Object.assign({}, this.studData, this.editList)
					this.studData = JSON.parse(JSON.stringify(obj));
                    if(!this.studData.comParentList.length){
                        this.studData.comParentList=[{
                            isMain: 1,
                            name: '',
                            relation: '',
                            phone: '',
                            cellNumber: '',
                            qq: '',
                            weChat: '',
                            email: '',
                            remarks: ''
                            }]
                    }
                    if(this.studData.gradeType){
                        this.getGradeList(this.studData.gradeType)
                    }
				}
				this.modalstud = true;
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
            close(){
                this.$nextTick(() => {
                    this.$refs.formstud.resetFields();
                })
                this.modalstud=false;
                this.studData= {
					code: '',
					name: '',
					enName: '',
					mobile: '',
					birthday: '',
                    gradeType:'',
                    grade:'',
					gender: '',
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
				};
            }
		},
		watch: {
            editList: {
                handler: function(val, oldVal) {
					let obj = Object.assign({}, this.studData, this.editList)
					this.studData = JSON.parse(JSON.stringify(obj));
                    if(!this.studData.comParentList.length){
                        this.studData.comParentList=[{
                            isMain: 1,
                            name: '',
                            relation: '',
                            phone: '',
                            cellNumber: '',
                            qq: '',
                            weChat: '',
                            email: '',
                            remarks: ''
                            }]
                    }
                    if(this.studData.gradeType){
                        this.getGradeList(this.studData.gradeType)
                    }
                },
                deep: true
            }
		}
	}
</script>
