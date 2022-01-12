<style lang="less">
	.turn-center-container {
		padding-left: 24px;
		.flexRow {
			display: flex;
			flex-direction: row;
		}
		.money {
			color: #f5222d !important;
		}
		// .ivu-modal-footer .ivu-btn-text{
		//     border:1px solid rgb(220, 222, 226);
		// }
		// .ivu-modal-footer .ivu-btn-text:hover{
		//     border:1px solid rgb(220, 222, 226);
		// }
		.ivu-modal-header {
			padding: 17px 24px 16px !important;
			background: #f7f8fa;
			border-radius: 4px;
			.ivu-modal-header-inner {
				font-size: 18px;
				font-weight: 500;
				color: rgba(0, 0, 0, 0.85);
			}
		}
		.turn_center_body {
			.cp-header {
				height: 116px;
			}
			.cp-header-item {
				width: 548px;
				height: 100%;
				border: 1px solid #e6e7eb;
				border-radius: 4px;
				.cp-header-item-header {
					height: 52px;
					position: relative;
					background: #f7f8fa;
					border-bottom: 1px solid #e6e7eb;
					div {
						height: 100%;
						.flexRow;
						justify-content: center;
						align-items: center;
						span {
							color: #495060;
							font-size: 14px;
							margin-left: 3px;
						}
					}
				}
				.header-info {
					height: calc(~'100% - 52px');
					padding: 0 20px;
					.flexRow;
					justify-content: space-between;
					align-items: center;
					.info-span {
						font-size: 14px;
						font-weight: 400;
					}
					.ivu-poptip-body-content {
						height: 64px;
					}
					.api {
						height: auto;
						.api_btn {
							width: 100%;
							display: flex;
							justify-content: flex-end;
							align-items: center;
							padding-top: 8px;
							button {
								width: 60px;
								height: 24px;
								padding: 0;
								text-align: center;
								line-height: 22px;
								margin-left: 12px;
							}
						}
					}
				}
			}
			.cp-course-item {
				height: 407px;
				width: 548px;
				border-radius: 4px;
				border: 1px solid #e6e7eb;
				overflow: visible;
				position: relative;
				.combination-course-table {
					height: 275px;
					width: 100%;
					box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
					background: #fff;
					border-radius: 4px;
					z-index: 10;
					.ivu-table td,
					.ivu-table-header th {
						height: 50px !important;
					}
					// .ivu-table-wrapper{
					//     border: none;
					// }
					// .ivu-table:before,.ivu-table:after{
					//     display: none;
					// }
				}
				.course-search {
					height: 64px;
					width: 100%;
					.flexRow;
					justify-content: flex-start;
					align-items: center;
				}
				.cp-course-item-t {
					height: 52px;
					border-radius: 4px 4px 0 0;
					.flexRow;
					justify-content: center;
					align-items: center;
					background: #f7f8fa;
					border-bottom: 1px solid #e6e7eb;
					span {
						color: #495060;
						font-size: 14px;
						margin-left: 3px;
					}
				}
				.cp-course-ul {
					height: 367px;
					background: #fff;
					overflow-y: scroll;
					padding-bottom: 24px;
					.cp-course-li {
						border-bottom: 1px solid #e6e7eb;
						.flexRow;
						justify-content: flex-start;
						align-items: flex-start;
						width: 100%;
						&:nth-last-of-type(1) {
							// border-bottom: 0;
						}
						.ivu-checkbox-group {
							width: 100%;
						}
						.ivu-checkbox-wrapper {
							width: 100%;
							display: flex;
							justify-content: center;
							align-items: center;
							.ivu-checkbox {
								padding: 0 30px;
							}
						}
					}
					.checkes {
						.flexRow;
						flex: 1;
						justify-content: center;
						align-items: center;
						height: 100%;
					}
					.ul-items {
						width: 302px;
						div {
							width: 288px;
							margin-top: 12px;
							font-size: 14px;
							span {
								font-size: 14px;
								color: #495060;
							}
						}
						.rollOut {
							div {
								margin-top: auto;
							}
						}
						.ul-items-s {
							margin-top: 10px;
							padding-top: 6px;
							margin-bottom: 10px;
							border-top: 1px dashed #e6e7eb;
						}
					}
				}
				.cp-course-item-b {
					height: 38px;
					background: #fff;
					border-radius: 0 0 4px 4px;
					padding: 0 8px;
					font-size: 14px;
					border-top: 1px solid #e6e7eb;
					a {
						cursor: default;
					}
					.left {
						float: left;
						line-height: 38px;
					}
					.right {
						float: right;
						line-height: 38px;
					}
				}
				.new-course {
					height: 403px;
					background: #fff;
				}
				.combination-course {
					height: 64px;
					background: #fff;
					border-bottom: 1px solid #e6e7eb;
					padding: 15px 16px 0;
					.kcb_wrap {
						display: flex;
						justify-content: space-around;
						align-items: center;
						div {
							padding: 0 8px;
							&.KcbMoney {
								flex: 1;
							}
						}
					}
					.course_table {
						padding-bottom: 18px;
					}
				}
				.new-course-box {
					height: 339px;
					overflow-y: scroll;
				}
				.new-course-item {
					padding-left: 16px;
					padding-right: 16px;
					width: 100%;
					border-bottom: 1px solid #e6e7eb;
					padding-bottom: 10px;
					.nc-1 {
						.flexRow;
						justify-content: space-between;
						align-items: center;
						padding: 10px 0;
						b {
							font-size: 16px;
							font-weight: 500;
							color: rgba(73, 80, 96, 1);
							line-height: 22px;
							margin-right: 6px;
						}
						span {
							font-size: 12px;
							font-weight: 400;
							color: rgba(153, 153, 153, 1);
							line-height: 17px;
						}
						a {
							font-size: 14px;
							font-weight: 400;
							line-height: 20px;
							margin-right: 16px;
						}
						.kcbAction {
							display: flex;
							justify-content: flex-start;
							align-items: center;
							.icon-shanchu {
								color: #d8d8d8;
								cursor: pointer;
								&:hover {
									color: #000000;
								}
							}
						}
					}
					.nc-2 {
						margin-bottom: 10px;
						span {
							font-size: 14px;
							color: rgba(73, 80, 96, 1);
						}
						b {
							font-size: 14px;
							font-weight: 400;
							color: rgba(73, 80, 96, 1);
							line-height: 20px;
							padding: 0 5px;
						}
					}
					.nc-3 {
						padding-bottom: 15px;
						border-bottom: 1px dashed #e6e7eb;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						span {
							font-size: 14px;
							font-weight: 400;
							color: rgba(73, 80, 96, 1);
						}
						.tags_box {
							width: 262px;
							min-height: 32px;
							padding: 0px 7px;
							font-size: 12px;
							border: 1px solid #dddee1;
							border-radius: 4px;
							cursor: pointer;
							.Row {
								.ivu-tag {
									background: #44bcb7;
									.ivu-tag-text,
									.ivu-icon-ios-close-empty {
										color: #ffffff;
									}
								}
								.arrow {}
							}
						}
					}
					.nc-4 {
						.flexRow;
						justify-content: space-between;
						align-items: center;
						margin-top: 5px;
						span {
							font-size: 14px;
							font-weight: 400;
							color: rgba(73, 80, 96, 1);
							line-height: 20px;
						}
					}
					.nc-5 {
						span {
							font-size: 14px;
							font-weight: 400;
							color: rgba(73, 80, 96, 1);
							line-height: 20px;
						}
					}
					&:nth-last-of-type(1) {
						border-bottom: 0;
					}
				}
			}
		}
        .ivu-upload-list{
            .ivu-upload-list-file{
                pointer-events:none;
                cursor: not-allowed;
            }
        }
	}
</style>

<template>
	<div class="turn-center-container">
		<div class="turn_center_body">
			<Form ref="turnCenterForm" :label-width="96" :model="formItem">
				<FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration1_5559')">
					<header class="cp-header">
						<div class="cp-header-item">
							<div class="cp-header-item-header">
								<div>
									<i class="iconfont icon-zhuanchuxueyuan"></i>
									<span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenter_5949')}}</span>
								</div>
							</div>
							<div class="header-info">
								<span class="info-span">{{ outStu.name || '--' }}</span>
								<span class="info-span">{{ outStu.No || '--' }}</span>
								<span class="info-span">{{ outStu.grade || '--' }}</span>
								<Button disabled @click="chooseStuAFn">{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenter_5950')}}</Button>
							</div>
						</div>
					</header>
				</FormItem>
				<FormItem :model="formItem" :label="$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenter_5951')">
					<RadioGroup v-model="formItem.type">
						<Radio disabled :label="1">{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_58531')}}</Radio>
						<Radio disabled :label="0">{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5853')}}</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem :label="$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenter_5954')">
					<Select disabled v-model="formItem.outOfficeId" filterable style="width:548px" v-if="officeIdList.length">
						<Option v-for="(item, index) in officeIdList" :key="item.id" :value="item.id" :label="item.name">{{ item.name }}</Option>
					</Select>
				</FormItem>
				<FormItem :label="$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenter_5956')">
					<div class="cp-course-item">
						<div class="cp-course-ul">
							<CheckboxGroup v-model="formItem.OutCourse" @on-change="OutCourseChange">
								<div class="cp-course-li" v-for="item in cpList" :key="item.id">
									<Checkbox :label="item.studentCourseId" disabled>
										<div class="checkes">
											<div class="ul-items">
												<div>
													<span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenter_5957')}}</span>
													<span>{{ item.courseName }}</span>
												</div>
												<div>
													<span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenter_5958')}}</span>
													<span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenterinfo_5992', [ item.courseUnitPrice.toFixed(2) , item.courseHourNum ])}}</span>
                                                    <span> {{ number_format(item.coursePrice, 2, '.', ',') }} {{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
												</div>
												<div>
													<span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenter_5961')}}</span>
													<span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenterinfo_5995', [ item.leftCourseHour ])}}</span>
												</div>
												<div>
													<span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenter_5963')}}</span>
													<span class="rollOut">
                                                            {{ item.courseUnitPrice.toFixed(2) }} x  <span v-if="OutCourseList.find(v => v.id==item.id)&&formItem.type==0"><Input disabled v-model="OutCourseList.find(v => v.id==item.id).outCourseHour" style="width: 40px"  @on-blur="hourNumChange(OutCourseList.find(v => v.id==item.id),$event)"/></span><span v-else>{{ item.leftCourseHour }}</span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenter_5964')}}<span v-if="OutCourseList.find(v => v.studentCourseId==item.studentCourseId)&&formItem.type==0&&(Number(OutCourseList.find(v => v.studentCourseId==item.studentCourseId).outCourseHour)!=Number(item.leftCourseHour))">{{ number_format(item.courseUnitPrice*OutCourseList.find(v => v.studentCourseId==item.studentCourseId).outCourseHour, 2, '.', ',') }}</span><span v-else>{{ number_format(item.leftCoursePrice||item.outCoursePrice, 2, '.', ',') }}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
												</div>
												<div class="ul-items-s">
													<span>{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5232')}}</span>
													<span>{{ number_format(item.publicPrice, 2, '.', ',') }}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}<span style="margin-left:10px;">{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5872')}}</span>
													<span>{{ number_format(item.publicPrice - item.coursePrice, 2, '.', ',') }}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</div>
											</div>
										</div>
									</Checkbox>
								</div>
							</CheckboxGroup>
						</div>
						<div class="cp-course-item-b">
							<div class="left">
								<Checkbox disabled v-model="ischangeAll" @on-change="changeAll">{{$t('modules_rolepeople_212')}}</Checkbox>
							</div>
							<div class="right">
								<span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5878')}}</span>
								<span>{{ OutCourseList.length }}</span>
								<span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5879')}}</span>
								<span class="money">{{ this.number_format(rollOut, 2, '.', ',') }}</span>
								<span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
							</div>
						</div>
					</div>
				</FormItem>
				<FormItem :label="$t('modules_spoc_jw_web_src_views_approval_jwapprovaldetial_2267')">
					<Input v-model="formItem.inRemarks" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenter_5973')" style="width:548px"></Input>
				</FormItem>
				<FormItem :label="$t('modules_spoc_sign_web_src_views_applyrefund_components_feedback_5021')">
					<!-- <Upload disabled multiple paste show-upload-list type="drag" :format="['rar','zip','doc','docx','pdf','jpg','jpeg','gif','psd','ppt','pptx','xls','xlsx','png']" :max-size="20480" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" :on-format-error="handleFormatError" :on-remove="moveFile" :on-success="handleSuccess" name="files" :data="{type:'ht_refund',fileType:'all',dirName:'all',remarks:'',menuId:'5001',objectId:''}" :action="uploadImg" :default-file-list="defaultFileList" style="width:548px"> -->
						<!-- <div style="padding: 20px 0">
							<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
							<p>{{$t('courselist_compontents_servicecontent_210')}}</p>
							<p>{{$t('modules_spoc_crm_web_src_views_customermanagement_importpage_1249')}}</p>
						</div> -->
					<!-- </Upload> -->
					<Upload 
                        disabled 
                        multiple 
                        paste 
                        show-upload-list 
                        type="drag" 
                        :format="['rar','zip','doc','docx','pdf','jpg', 'png']" 
                        :max-size="20480" 
                        :on-exceeded-size="handleMaxSize" 
                        :before-upload="handleBeforeUpload" 
                        :on-format-error="handleFormatError" 
                        :on-remove="moveFile" 
                        :on-success="handleSuccess" 
                        name="file" 
                        :data="uploadData" 
                        :action="imgAction" 
                        :default-file-list="defaultFileList" 
                        :headers="headers"
                        style="width:548px">
						<div style="padding: 20px 0">
							<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
							<p>点击或将文件拖拽到这里上传</p>
							<p>支持扩展名：.rar .zip .doc .docx .pdf .jpg .png ...</p>
						</div>
					</Upload>
				</FormItem>
				<FormItem :label="$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_regreward_2013')" prop="inSellerId" :rules="{required: true, message: $t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenterinfo_6010'), trigger: 'change'}" v-if="statusFlag!=0">
                    <Select :disabled="!showTab" v-model="formItem.inSellerId" style="width:200px">
                        <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
				</FormItem>
			</Form>
		</div>
	</div>
</template>

<script>
	import valid, {
		errors,
		htContract,
		common,
		sysDict,
		htTranslateApply,
		sysAttachment,
        sysUser,
		sysOffice,
		api
	} from '../../../libs/request';
	import CommonIcon from '_c/common-icon';
	import { mapMutations, mapState } from 'vuex';
	export default {
		name: 'turnCenter',
		props: {
			showTab:{
				type: String
			}
		},
		data() {
			return {
				ischangeAll: false,
				turnCenter: false,
				chooseStuShow: false,
				outStu: {
					name: '',
					No: '',
					grade: ''
				},
				cpList: [],
				officeId: '',
				formctInfo: {},
				formstuInfo: {},
				OutCourseList: [],
				formItem: {
					type: 1,
					OutCourse: [],
					outOfficeId: '',
					inRemarks: '',
                    inSellerId:'',
				},
				officeIdList: [],
				fileLists: [],
				id: '',
                roleList:[],
				statusFlag:0,
				imgAction: '',
                uploadData: {
                    bizId: '',
                    bizType: 'image',
                    isSingle: true
				},
				headers:{}
			};
		},
		components: {},
		computed: {
			uploadImg: function() {
				return sysAttachment.uploadFileUrl();
			},
			rollOut() {
				let num = 0;
				this.OutCourseList.forEach(v => {
                    if(Number(v.outCourseHour)==Number(v.leftCourseHour)){
                        num += Number(v.leftCoursePrice);
                    }else{
                        num += v.outCourseHour * v.courseUnitPrice;
                    }
				});
				return num;
			},
			defaultFileList() {
				return this.fileLists.map(v => {
					return {
						name: v.fileName,
						url: v.filePath
					}
				})
			}
		},

		created() {
			this.getofficeIdList();
		},

		mounted() {
			this.imgAction = api.fileAttachmentUploadUrl(); // sysUser.uploadImg();
            this.headers = {
                token: localStorage.getItem('token'),
                tenant: localStorage.getItem('tenant')	
            }
		},

		methods: {
			...mapMutations(['updateLoadingStatus']),
			editInfo(id) {
				htTranslateApply
					.form({
						id
					})
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
                            this.id=id;
							let data = res.data.data;
							this.formstuInfo = data.outStudentInfo ? data.outStudentInfo || {} : {};
							this.formItem.OutCourse = data.outJson.length ? data.outJson[0].OutCourse || [] : [];
							this.OutCourseList = data.outJson.length ? data.outJson || [] : [];
							// this.cpList = data.courseInfoVOList;
							this.cpList = data.outJson.length ? data.outJson || [] : [];
							this.officeId = data.outOfficeId;
							this.formItem.outOfficeId = data.inOfficeId;
							this.formctInfo = data.htContractInfoVO;
							this.outStu.name = this.formstuInfo.name;
							this.outStu.No = this.formstuInfo.phone;
							this.outStu.grade = this.formstuInfo.gradeLabel;
							this.formItem.inRemarks = data.inRemarks;
							this.fileLists = data.outJson.length ? data.outJson[0].fileLists || [] : [];
                            this.statusFlag=data.statusFlag;
                            this.formItem.type=Number(data.type);
                            this.formItem.inSellerId=data.inSellerId;
							if(this.formItem.OutCourse.length == this.cpList.length && this.formItem.OutCourse.length) {
								this.ischangeAll = true;
							} else {
								this.ischangeAll = false;
							}
							this.getListDataByRole();
							this.$emit('openModal')
						}
					})
					.catch(errors.call(this))
					.finally(() => {
                    });
			},
			showPop(id) {
				this.turnCenter = true;
				if(id) {
					this.id = id;
					this.editInfo(id);
				}
			},
			chooseStuAFn() {
				this.chooseStuShow = true;
				this.$nextTick(() => {
					this.$refs.chooseStu.showModal();
				})
			},
            getListDataByRole() {
                let params = {
                    roleIds: '6',
                    pageSize: -1,
                    officeIds: this.formItem.outOfficeId
                };
                sysUser
                    .listDataByRole(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.roleList = res.data.data;
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
            },
			clickActionFn(row, info) {
				//选择学生
				this.outStu.name = info.name;
				this.outStu.No = info.phone;
				this.outStu.grade = info.gradeLabel;
				this.cpList = row.courseInfoVOList;
				this.officeId = row.officeId;
				this.formctInfo = row;
				this.formstuInfo = info;
				this.formItem.OutCourse = [];
				this.OutCourseList = [];
				this.$refs.chooseStu.closeModal();
				this.$nextTick(() => {
					this.chooseStuShow = false;
				});
			},
			closeChooseStu() {
				this.chooseStuShow = false;
			},
			getofficeIdList() {
				sysOffice
					.officeList({type:3})
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.officeIdList = res.data.data.allCompany;
						}
					})
					.catch(errors.call(this));
			},
			OutCourseChange(params) {
				let arr = [];
				this.OutCourseList = [];
				this.cpList.forEach((v, k) => {
					if(params.indexOf(v.studentCourseId) != -1) {
						v.outCourseHour = v.leftCourseHour;
						let obj = Object.assign({}, v);
						obj = JSON.parse(JSON.stringify(obj));
						arr.push(obj);
						this.$set(this.OutCourseList, this.OutCourseList.length, obj);
					}
				});
				this.$set(this.$data, 'OutCourseList', arr);
				if(params.length == this.cpList.length && params.length) {
					this.ischangeAll = true;
				} else {
					this.ischangeAll = false;
				}
			},
			number_format(number, decimals, dec_point, thousands_sep) {
				/*
				 * 参数说明：
				 * number：要格式化的数字
				 * decimals：保留几位小数
				 * dec_point：小数点符号
				 * thousands_sep：千分位符号
				 * */
				number = (number + '').replace(/[^0-9+-Ee.]/g, '');
				var n = !isFinite(+number) ? 0 : +number,
					prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
					sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
					dec = typeof dec_point === 'undefined' ? '.' : dec_point,
					s = '',
					toFixedFix = function(n, prec) {
						var k = Math.pow(10, prec);
						return '' + Math.round(n * k) / k;
					};

				s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
				var re = /(-?\d+)(\d{3})/;
				while(re.test(s[0])) {
					s[0] = s[0].replace(re, '$1' + sep + '$2');
				}

				if((s[1] || '').length < prec) {
					s[1] = s[1] || '';
					s[1] += new Array(prec - s[1].length + 1).join('0');
				}
				return s.join(dec);
			},
			changeAll(val) {
				if(val) {
					let arr = [];
					this.OutCourseList = [];
					this.cpList.forEach((v, k) => {
						v.outCourseHour = v.leftCourseHour;
						let obj = Object.assign({}, v);
						obj = JSON.parse(JSON.stringify(obj));
						this.formItem.OutCourse.push(v.id);
						arr.push(obj);
						this.$set(this.OutCourseList, this.OutCourseList.length, obj);
					});
					this.$set(this.$data, 'OutCourseList', arr);
				} else {
					this.OutCourseList = [];
					this.formItem.OutCourse = [];
				}
			},
			handleMaxSize() {
				this.$Message.error(this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenter_5979'))
			},
			handleBeforeUpload() {},
			handleFormatError() {
				this.$Message.error(this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenter_5980'));
			},
			// handleSuccess(res, file) {
			// 	console.log(res)
			// 	console.log(file)
			// 	let _data = res.data;
			// 	this.fileLists.push(_data);
			// },
			handleSuccess(response) {
				let _data = response.data;
				this.fileLists.push(_data);
			},
			moveFile(file, fileList) {
				this.fileLists = [];
				fileList.forEach(e => {
					this.fileLists.push(e.response.data)
				});
			},
			cancel() {
				this.turnCenter = false;
				this.$emit('cancel')
			},
			submit() {
				this.updateLoadingStatus({
					isLoading: true
				});
				let params = {
					"type": this.formItem.type,
					"outStudentInfo": this.formstuInfo,
					"studentId": this.formstuInfo.id,
					"outOfficeId": this.officeId,
					"inOfficeId": this.formItem.outOfficeId,
					"outCtId": this.formctInfo.ctId,
					"outJson": [],
					"outPrice": this.rollOut,
					"inRemarks": this.formctInfo.inRemarks,
					"attachmentIds": [this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenter_5981'), ""]
				}
				let attachmentIds = this.fileLists.map(v => v.id);
				params.attachmentIds = attachmentIds;
				let outJson = [];
				this.OutCourseList.forEach((v, k) => {
					let obj = {
						"studentCourseId": v.studentCourseId,
						"courseId": v.courseId,
						"courseName": v.courseName,
						"courseUnitPrice": v.courseUnitPrice,
						"courseHourNum": v.courseHourNum,
						"coursePrice": v.coursePrice,
						"leftCourseHour": v.leftCourseHour,
						"publicPrice": v.publicPrice,
						"discountPrice": v.publicPrice - v.coursePrice, //edit
						"outCourseHour": v.outCourseHour,
						"publicUnitPrice": v.courseUnitPrice * v.outCourseHour,
						"finishLeaveNum": this.formctInfo.finishLeaveNum,
					}
					if(k == 0) {
						obj.OutCourse = this.formItem.OutCourse;
						obj.OutCourseList = this.OutCourseList;
						obj.cpList = this.cpList;
						obj.outStudentInfo = this.formstuInfo;
					}
					outJson.push(obj);
				})
				params.outJson = outJson;
				htTranslateApply
					.firstCommit(params)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.turnCenter = false;
							this.$Message.success(res.data.message)
							this.$emit('save');
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({
							isLoading: false
						});
					});
			},
			hourNumChange(item, e) {
				let num = Number(e.target.value);
				console.log(num < 1, num > Number(item.leftCourseHour), num);
				if(num < 1) {
					num = 1;
				}
				if(num >= Number(item.leftCourseHour)) {
					num = item.leftCourseHour - 1;
				}
				item.outCourseHour = num;
				this.$set(this, 'OutCourseList', this.OutCourseList);
			}
		},
		watch: {}
	};
</script>
