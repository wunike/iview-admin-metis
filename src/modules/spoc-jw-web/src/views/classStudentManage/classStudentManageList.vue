<style lang="less">
.mytable {
	margin-top: 10px;
	width: 100%;
	background: rgba(255, 255, 255, 1);
	border-radius: 4px;
	padding: 0 16px;
}

.printStuCard {
	font-size: 14px;
	.colors {
		display: inline-block;
		.colorBlock {
			width: 32px;
			height: 32px;
			cursor: pointer;
			margin: 30px;
			&:hover {
				box-shadow: 0px 3px 6px 0px rgba(0, 162, 154, 0.5);
				border: 1px solid rgba(68, 188, 183, 1);
			}
		}
	}
	.stuCard {
		width: 267px;
		height: 418px;
		display: inline-block;
		margin-left: 30px;
		margin-right: 30px;
		text-align: center;
		border: 1px solid #e0e0e0;
		.companyInfo {
			width: 170px;
			margin: 0 auto;
			padding: 20px 0 20px 0;
			img {
				max-width: 170px;
			}
		}
		.stuName {
			margin: 0 auto;
			text-align: center;
			color: #17b6a5;
			font-size: 14px;
			font-weight: bold;
			.avator {
				width: 110px;
				height: 120px;
			}
			.courseGrade {
				color: #fff;
				background: #17b6a5;
				display: inline-block;
				padding: 2px 12px;
				border-radius: 15px;
			}
			.myJsBarcode {
				height: 70px;
				width: 200px;
			}
		}
	}
}

.uploadAvator {
	overflow: hidden;
	.avator {
		float: left;
		width: 110px;
		height: 120px;
	}
	.uploadButton {
		float: left;
		margin-left: 30px;
		margin-top: 35px;
	}
    .uploadWarning{
        display:none;
    }
    .open-progress{
        display:none;
    }
}

.showReportDiv {
	.showReportCount {
		margin-bottom: 16px;
		font-size: 14px;
	}
	.showReporNum0 {
		color: #44bcb7;
	}
	.showReporNum1 {
		color: #44bcb7;
	}
	.showReporNum2 {
		color: #e64630;
	}
	.showReportTitle {
		overflow: hidden;
		height: 32px;
		margin-bottom: 12px;
		.showReportTitleName {
			float: left;
			font-size: 14px;
			height: 20px;
			line-height: 20px;
			margin-top: 12px;
		}
		.showReportTitleButton {
			float: right;
			height: 32px;
		}
	}
}

.showScheduleDivFather {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(55, 55, 55, 0.6);
	height: 100%;
	z-index: 999999999;
}

.showScheduleDiv {
	background-color: #ffffff;
	width: 800px;
	height: 224px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 999999;
	text-align: center;
	box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
	border-radius: 8px;
	.percentDiv {
		width: 610px;
		// height: 116px;
		height: 10px;
		// margin: 36px auto 23px;
		margin: 93px auto 31px;
	}
	.percentDes {
		width: 800px;
		text-align: center;
		font-size: 16px;
	}
}
</style>
<template>
	<div>
		<div v-if="this.tableType == '0'">
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
					v-model="courseTime"
					placement="bottom-start"
					separator=" ~ "
					:placeholder="$t('modules_spoc_crm_web_src_views_studentmanagement_studentmanagement_1683')"
					style="width:224px;"
				></DatePicker>
				<Select
					v-model="officeId"
					@on-change="changeSchool"
					:placeholder="$t('courselist_courselist_225')"
					style="width:224px;"
					clearable
					filterable
				>
					<Option v-for="item in schoolList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
				</Select>
				<Input v-model="stuName" :placeholder="$t('memberlist_memberlist_257')" style="width:140px;"></Input>
				<Select v-model="stuCourStatus" :placeholder="$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2778')" style="width:140px;" clearable filterable>
					<Option
						v-for="item in com_student_course_rel_status"
						:value="item.value"
						:key="item.value"
					>{{ item.label }}</Option>
				</Select>
				<Select v-model="isStudying" :placeholder="$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2779')" style="width:140px;" clearable>
					<Option value="1">{{$t('modules_leftremenu_92')}}</Option>
					<Option value="0">{{$t('modules_leftremenu_93')}}</Option>
				</Select>
				<Select v-model="teacherId" :placeholder="$t('courselist_courselist_226')" style="width:140px;" clearable filterable>
					<Option v-for="item in teacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				<Select v-model="assistId" :placeholder="$t('classlist_classlist_5')" style="width:140px;" clearable filterable>
					<Option v-for="item in assistList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				<Select v-model="classTeacherId" :placeholder="$t('classlist_classlist_6')" style="width:140px;" clearable filterable>
					<Option v-for="item in classTeacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				<Input v-model="phone" :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1637')" style="width:140px;"></Input>
				<Select
					v-model="courseIdList"
					:placeholder="$t('memberlist_memberlist_264')"
					style="width:140px;"
					clearable
					filterable
					multiple
					remote
					:remote-method="getCoursePack"
					:loading="getCoursePackLoading"
				>
					<Option v-for="item in coursePackList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				<Select
					v-model="classIdList"
					:placeholder="$t('memberlist_memberlist_265')"
					style="width:140px;"
					clearable
					filterable
					multiple
				>
					<Option v-for="item in classCourseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				<Input v-model="school" :placeholder="$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2788')" style="width:140px;"></Input>
			</v-search-collapse>
		</div>
		<div v-if="this.tableType == '1'">
			<v-search-collapse
				@search="getListData"
				@reset="resetSearch"
				@changeDivHeight="changeDivHeight"
				key="searchTableType1"
			>
				<DatePicker
					ref="DatePicker"
					:options="options3"
					split-panels
					@on-open-change="setOptTime"
					type="daterange"
					v-model="courseTime"
					placement="bottom-start"
					separator=" ~ "
					:placeholder="$t('modules_spoc_crm_web_src_views_studentmanagement_studentmanagement_1683')"
					style="width:224px;"
				></DatePicker>
				<Select
					@on-change="changeSchool"
					v-model="officeId"
					:placeholder="$t('courselist_courselist_225')"
					style="width:224px;"
					clearable
					filterable
				>
					<Option v-for="item in schoolList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
				</Select>
				<Input v-model="stuName" :placeholder="$t('memberlist_memberlist_257')" style="width:140px;"></Input>
				<Input v-model="phone" :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1637')" style="width:140px;"></Input>
				<Select
					v-model="courseIdList"
					:placeholder="$t('memberlist_memberlist_264')"
					style="width:140px;"
					clearable
					filterable
					multiple
					remote
					:remote-method="getCoursePack"
					:loading="getCoursePackLoading"
				>
					<Option v-for="item in coursePackList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				<Select
					v-model="classIdList"
					:placeholder="$t('memberlist_memberlist_265')"
					style="width:140px;"
					clearable
					filterable
					multiple
				>
					<Option v-for="item in classCourseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				<Input v-model="school" :placeholder="$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2788')" style="width:140px;"></Input>
				<Select v-model="synFlag" :placeholder="$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2789')" style="width:140px;" clearable filterable>
					<Option :value="1">{{$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2490')}}</Option>
					<Option :value="0">{{$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2489')}}</Option>
				</Select>
			</v-search-collapse>
		</div>
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
			@resetDefault="resetDefaultCol"	
			@selectionChange="selectionChange"
			@sortChange="sortChange"
			:pageNo="pageNo"
			@pageChange="pageChange"
			@changeTableType="changeTableType"
		></big-table>
		<export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
		<Modal
			class="printStuCard"
			v-model="showPrint"
			:title="$t('modules_spoc_crm_web_src_views_customer360_components_studentother_1002')"
			@on-ok="printOk"
			@on-cancel="printCancel"
		>
			<div>
				<div class="stuCard">
					<div class="companyInfo">
						<img src="../../assets/img/company.png" />
					</div>
					<div class="stuName">
						<img class="avator" :src="childItem.imgPath" />
						<div>{{childItem.name}}</div>
						<div style="font-weight: 400;margin-bottom:12px;">{{childItem.enName}}</div>
						<div>{{childItem.officeName}}</div>
						<span class="courseGrade" :style="{'background': myBackground}">{{childItem.grade}}</span>
						<div>
							<canvas class="myJsBarcode" :id="'canvas'+childItem.code"></canvas>
						</div>
					</div>
				</div>
				<div class="colors">
					<div
						class="colorBlock"
						:style="{'background': item}"
						v-for="(item, index) in colors"
						:key="index"
						@click="changeColor(item)"
					></div>
				</div>
			</div>
		</Modal>
		<Modal v-model="showUploadAvator" :title="$t('modules_usermanage_227')">
			<div class="uploadAvator">
				<img class="avator" :src="avatorUrl"/>
				<div class="uploadButton">
<!--                    <cos-upload-->
<!--                            ref="stuUpload"-->
<!--                            v-if="up.objectType && up.kind"-->
<!--                            :objectType="up.objectType"-->
<!--                            :objectId="up.objectId"-->
<!--                            :kind="up.kind"-->
<!--                            :accept="['png','jpg','jpeg']"-->
<!--                            :maxNum="1"-->
<!--                            :uploadButtonName="btnName"-->
<!--                            fileInputId="stu"-->
<!--                            :isChangeFile="true"-->
<!--                            @hasUploadFile="hasUploadFile"-->
<!--                    >-->
<!--                    </cos-upload>-->
					<Upload
						:action="uploadImg"
						style="line-height:32px;margin-bottom:8px;"
						:data="uploadAvatorData"
						:headers="headers"
						name="file"
						:show-upload-list="false"
						:on-success="uploadSuccess"
						:format="['jpg','jpeg','png']"
						:on-format-error="uploadFormatError"
						:on-exceeded-size="uploadSizeError"
						:max-size="3000"
					>
						<Button icon="ios-share-outline" v-if="avatorUrl">{{$t('portal_app_EditAvatar')}}</Button>
						<Button icon="ios-share-outline" v-else>{{$t('modules_usermanage_227')}}</Button>
					</Upload>
					<p class="uploadDes">{{$t('portal_app_SupportsAvatar')}}</p>
				</div>
			</div>
			<div slot="footer">
				<Button type="primary" size="large" @click="uploadAvatorCancel">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
		<Modal v-model="showReport" :title="$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2797')" width="800" :mask-closable="false">
			<div class="showReportDiv">
				<div class="showReportCount">{{$t('modules_spoc_crm_web_src_views_customer360_components_flowup_796')}}<span class="showReporNum0">{{totalReportNum}}</span>{{$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2799')}}<span class="showReporNum1">{{totalReportNum -totalReportFailNum}}</span>{{$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2800')}}<span class="showReporNum2">{{totalReportFailNum}}</span>{{$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2801')}}</div>
				<div class="showReportTitle">
					<div class="showReportTitleName">{{$t('importPage_result5before')}}</div>
					<div class="showReportTitleButton">
						<Button
							style="height:32px;"
							type="default"
							size="large"
							@click="downErrorReport"
							:disabled="totalReportFailNum==0"
						>{{$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2803')}}</Button>
					</div>
				</div>
				<div>
					<Table :columns="reportColumns" :data="reportData"></Table>
				</div>
			</div>
			<div slot="footer">
				<Button type="primary" size="large" @click="showReportClose">{{$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2804')}}</Button>
			</div>
		</Modal>
		<div v-if="showSchedule" class="showScheduleDivFather">
			<div class="showScheduleDiv">
				<div class="percentDiv">
					<!-- <Circle :percent="schedule">
                        <span class="demo-Circle-inner" style="font-size:24px">{{schedule}}%</span>
					</Circle>-->
					<Progress :percent="schedule" style="width:300px;" />
				</div>
				<div class="percentDes">{{$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2805')}}</div>
			</div>
		</div>
	</div>
</template>
<script>
let myInterval;
const JsBarcode = require("jsbarcode");
import { mapMutations, mapState } from "vuex";
import cosUpload from "@public/modules/cosUpload.vue";
import bigTable from "@public/modules/bigTable.vue";
import exportModal from "@public/modules/exportModal.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
import valid, {
	errors,
	jwClassCourse,
	sysUser,
	sysDict,
	sysAttachment,
	jwManualSign,
	jwLesson,
	common,
	sysApi
} from "../../libs/request";
export default {
	name: "jw.classStudentManageList",
	components: {
		bigTable,
		vSearchCollapse,
		cosUpload,
		exportModal
	},
	computed: {
		...mapState(["userInfo", "app", "buttonPerm","calendarConfig"]),
        myButtonPrem() {
            return this.buttonPerm ? (this.buttonPerm["jw.classStudentManageList"] || []) : [];
        },
	},
	mounted() {
		this.getSchools();
		this.getStudentStatus();
		this.headers = {
            token: localStorage.getItem('token'),
            tenant: localStorage.getItem('tenant')
        }
		// this.uploadImg = sysAttachment.uploadFileUrl()
		// this.uploadImg = sysApi.fileAttachmentUploadUrl();
		this.uploadImg = common.comStudentUploadAvatar();
		waitUntil(
			() => {
				console.log("this.app.currOfficeId ==" + this.app.currOfficeId);
				if (this.app.currOfficeId) {
					this.officeId = this.app.currOfficeId == 'all' ? this.userInfo.officeId : this.app.currOfficeId;
					// this.$set(this.findObj, 'officeId', this.app.currOfficeId)
				}
				return (this.app.currOfficeId && this.userInfo.officeId && this.buttonPerm && this.buttonPerm["jw.classStudentManageList"]) || false;
			},
			() => {
				this.courseTime = defaultDatePickerValue()
				this.options3 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
				this.changeTableType(0);
				this.changeSchool(this.officeId)
				if (this.myButtonPrem && this.myButtonPrem.indexOf('sync') > -1){
					this.btnList1.unshift(
						{
							style: {},
							type: "",
							btnClick: this.listTransferStudents,
							text: this.$t('modules_spoc_jw_web_src_views_classstudentmanage_classstudentmanagelist_2806')
						}
					)
				}
			}
		);
	},
	data() {
		return {
		    up:{
                objectType:"com_student_photo",
                kind:"image",
                objectId:"",
			},
			headers:{

            },
            btnName:this.avatorUrl?this.$t('portal_app_EditAvatar'):this.$t('modules_usermanage_227'),
			options3: null,
			tableHeightOut: 72, //324,
			reportColumns: [
				{
					title: this.$t('classlist_compontents_detailinfo_34'),
					key: "stuCode"
				},
				{
					title: this.$t('classlist_compontents_detailinfo_35'),
					key: "stuName"
				},
				{
					title: this.$t('importPage_tableError2'),
					key: "errorTitle"
				},
				{
					title: this.$t('importPage_tableError3'),
					key: "errorInfo"
				}
			],
			reportData: [],
			schedule: 0,
			showSchedule: false,
			showReport: false,
			totalReportNum: 0,
			totalReportFailNum: 0,
			synFlag: "",
			getCoursePackLoading: false,
			coursePackList: [],
			classCourseList: [],
			canSelection: true,
			courseTime: [],
			updateShowTitleKey: "jwClassCourse/listPageStudents", // 'jwClassCourse/listPageStudentVolumes'
			tableType: 0,
			myBackground: "rgb(0, 162, 154)",
			colors: [
				"rgb(253,205,0)",
				"rgb(243,153,69)",
				"rgb(0,47,103)",
				"rgb(233,72,49)",
				"rgb(0,162,154)",
				"rgb(0,175,236)"
			],
			showPrint: false,
			showUploadAvator: false,
			uploadImg: "",
			avatorUrl: "",
			editStuId: "",
			uploadAvatorData: {
				// objectId: '',
				// type:'com_student_photo',
				// dirName: 'images',
				// menuId:0,
				bizId:'',
                bizType:'image', // video audio file   image
                isSingle: true,
				stuId: ""
			},
			childItem: {},
			/*搜索相关开始*/
			officeId: "", // 所属校区
			stuName: "", // 学员姓名
			stuCourStatus: "", // 已报课程状态
			isStudying: "", // 是否在读
			teacherId: "", // 授课教师
			assistId: "", // 助教
			classTeacherId: "", //服务OO
			phone: "", // 学员电话
			courseIdList: [], // 已报课程
			classIdList: [], // 已报班课
			school: "", // 学校
			pageNo: 1,
			pageSize: this.$store.state.app.pageSizeGlobal,
			/*搜索相关结束*/
			schoolList: [],
			teacherList: [],
			assistList: [],
			classTeacherList: [],
			com_student_course_rel_status: [],
			tableName: [
				{
					name: this.$t('jw.classStudentManageList'), //"班课学员",
					value: "0"
				},
				{
					name: this.$t('classStudentManageList2'), //"学员名册",
					value: "1"
				}
			],
			name1: "",
			name2: "",
			selection: [],
			updateShowTitle: jwClassCourse.updateShowTitle,
			defaultShowCol: null,
			dataTotal: 0,
			sortObj: {},
			tableColumnArray: [],
			tableColumnArray0: [
				{
					// title: "学生编号",
					key: "code",
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.code
						);
					}
				},
				{
					// title: "学生姓名",
					key: "name",
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.name
						);
					}
				},
				{
					// title: "英文名",
					key: "enName",
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.enName
						);
					}
				},
				{
					key: "phone",
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.phone
						);
					}
				},
				{
					key: "courseName",
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.courseName
						);
					}
				},
				{
					key: "unAllocCourseHours",
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.unAllocCourseHours
						);
					}
				}
			],
			tableColumnArray1: [
				{
					// title: "学生编号",
					key: "code",
					// minWidth: 130,
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.code
						);
					}
				},
				{
					// title: "学生姓名",
					key: "name",
					/* minWidth: 100,
						maxWidth: 120,
						tooltip: true, */
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.name
						);
					}
				},
				{
					// title: "英文名",
					key: "enName",
					/* minWidth: 100,
						maxWidth: 120,
						tooltip: true, */
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.enName
						);
					}
				},
				{
					// title: "联系电话",
					key: "phone",
					// width: 110,
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.phone
						);
					}
				},
				{
					// title: "是否同步",
					key: "synFlag",
					render: (h, params) => {
						return h(
							"div",
							{},
							params.row.synFlag == '1' ? "已同步" : "未同步"
						);
					}
				},
				{
					// title: "已报课程",
					key: "courseNames",
					render: (h, params) => {
						return h(
							"div",
							{
								style: {
									"word-break": "break-all"
								}
							},
							params.row.courseNames
						);
					}
				},
				{
					// title: "是否上传头像",
					key: "isUploaded",
					render: (h, params) => {
						return h(
							"div",
							{},
							params.row.isUploaded ? "已上传" : "未上传"
						);
					}
				},
				{
					title: this.$t('classlist_compontents_detailinfo_45'),
					key: "doAction",
					width: 120,
					// fixed: 'right',
					render: (h, params) => {
						return h("div", [
							h(
								"a",
								{
									style: {},
									on: {
										click: () => {
											params.row.imgPath = params.row.imgPath || require('../../assets/img/avator.png');
											this.childItem = params.row;
											this.myBackground =
												"rgb(0, 162, 154)";
											this.showPrint = true;
											this.$nextTick(() => {
												var canvas = document.getElementById(
													"canvas" + params.row.code
												);
												JsBarcode(
													canvas,
													params.row.code
												);
											});
										}
									}
								},
								"打印"
							),
							(this.myButtonPrem && this.myButtonPrem.indexOf('details') > -1) ? h(
								"a",
								{
									style: {
										"margin-left": "5px"
									},
									on: {
										click: () => {
											// this.$router.push({
											// 	name: "jw.studentCourseDetail",
											// 	query: {
											// 		stuId: params.row.id,
											// 		officeId:
											// 			params.row.officeId
											// 	}
											// });
											this.$router.push({
                                                name:'crm.customer360',
                                                query:{
                                                    id:params.row.cusId
                                                }
                                            })
										}
									}
								},
								"详情"
							) : '',
							(this.myButtonPrem && this.myButtonPrem.indexOf('upload') > -1) ? h(
								"a",
								{
									style: {
										"margin-left": "5px"
									},
									on: {
										click: () => {
											this.avatorUrl = params.row.imgPath || require('../../assets/img/avator.png');
											this.editStuId = params.row.id;
											//this.uploadAvatorData.objectId = params.row.id
											this.uploadAvatorData.stuId = params.row.id;
											this.showUploadAvator = true;
										}
									}
								},
								"上传头像"
							) : ''
						]);
					}
				}
			],
			tableData: [],
			btnList: [],
			btnList0: [
				[
                    {
                        style: {},
                        type: "",
                        btnClick: this.isExport,
                        text: this.$t('integralflow_4'), //"导出全部",
                        value: "1",
                        parentName: this.$t('integralflow_5') //"导出"
                    },
                    {
                        style: {},
                        type: "",
                        btnClick: this.isExport,
                        text: this.$t('integralflow_6'), //"导出所选",
                        value: "2",
                        parentName: this.$t('integralflow_5') //"导出"
                    }
                ]
			],
			btnList1: [
				/* {
					style: {},
					type: "",
					btnClick: this.listTransferStudents,
					text: "同步数据"
				}, */
				{
					style: {},
					type: "",
					btnClick: this.print,
					text: "打印学生卡"
				},
				[
                    {
                        style: {},
                        type: "",
                        btnClick: this.isExport,
                        text: "导出全部",
                        value: "1",
                        parentName: "导出"
                    },
                    {
                        style: {},
                        type: "",
                        btnClick: this.isExport,
                        text: "导出所选",
                        value: "2",
                        parentName: "导出"
                    }
                ]
			],
			searchObj:{},
			exportMethod: jwClassCourse.exportClassStudent, //导出用到的方法对象
		};
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		resetDefaultCol(){
			this.updateLoadingStatus({ isLoading: true });
			let param
			if (this.tableType == "0") {
				param = { pageIdentifier: "jwClassCourse/listPageStudents" };
			}
			if (this.tableType == "1") {
				param = { pageIdentifier: "jwClassCourse/listPageStudentVolumes" };
			}
			jwClassCourse.clearShowField(param)
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
		setOptTime(flag){
			if(flag){
				this.courseTime = []
			}
		},
		changeDivHeight(height) {
			this.tableHeightOut = height;
		},
		showReportClose() {
			this.schedule = 0;
			this.showReport = false;
			this.clearCahce();
			this.pageNo = 1;
			this.getListData();
		},
		downErrorReport() {
			this.schedule = 0;
			this.showReport = false;
			this.clearCahce();
			window.open(jwClassCourse.downTransferReport());
			this.pageNo = 1;
			this.getListData();
		},
		getSyncSchedule() {
			this.schedule = 0;
			this.showSchedule = true;
			let _this = this;
			myInterval = setInterval(function() {
				_this.doGetSyncSchedule();
			}, 1000);
		},
		clearCahce() {
			jwClassCourse
				.clearCahce()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		getReportData() {
			jwClassCourse
				.getSynPromptData()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						// console.log(res.data)
						this.showReport = true;
						this.reportData = res.data.data.errorVOList;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		//完成后更新学员
		synUpdateStudents() {
			jwClassCourse
				.synUpdateStudents()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		doGetSyncSchedule() {
			jwClassCourse
				.getProgressData()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						// console.log(res.data)
						let result = res.data.data;
						this.schedule = parseInt(
							parseInt(result.successNum) /
								parseInt(result.totalNum)
						);
						if (result.completeed == 1) {
							//已完成
							this.schedule = 100;
							clearInterval(myInterval);
							let _this = this;
							setTimeout(() => {
								_this.showSchedule = false;
								_this.totalReportFailNum = result.failNum || 0;
								_this.synUpdateStudents();
								_this.getReportData();
							}, 1000);
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
		listTransferStudents() {
			if (!this.selection.length) {
				this.$Message.error("请选择数据");
				return;
			}
			let idList = [];
			let hasIsSync = false;
			this.selection.forEach(item => {
				if (item.synFlag == "1") {
					hasIsSync = true;
				}
				idList.push(item.id);
			});
			this.totalReportNum = idList.length;
			if (hasIsSync) {
				this.$Message.error(
					"您选择的数据中包含已同步的数据，请重新选择"
				);
				return;
			}
			jwClassCourse
				.listTransferStudents({
					stuIdList: idList
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						// console.log(res.data)
						this.getSyncSchedule();
						// this.$Message.info('同步数据成功')
						// this.pageNo = 1
						// this.getListData()
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		changeSchool(schoolId) {
			//复选 已选项清空
			this.classIdList = [];
			this.courseIdList = [];

			//下拉菜单备选项清空
			this.classCourseList = [];
			this.coursePackList = [];
			this.teacherList = [];
			this.assistList = [];
			this.classTeacherList = [];
			if (schoolId) {
				this.getClassCourseByOfficeId(schoolId);
			}

			if (this.tableType == "0") {
				this.teacherId = "";
				this.assistId = "";
				this.classTeacherId = "";
				if (schoolId) {
					this.getUserByOfficeIdAndRoleId(schoolId, "teacher_id"); // 授课教师 teacher_id
					this.getUserByOfficeIdAndRoleId(schoolId, "assist_id"); // 授课助教 assist_id
					this.getUserByOfficeIdAndRoleId(
						schoolId,
						"class_teacher_id"
					); // 服务oo class_teacher_id
				}
			}
		},
		getCoursePack(val) {
			if (!this.officeId) {
				return;
			}
			this.getCoursePackLoading = true;
			common
				.jwCourseListPage({
					officeIds: this.officeId,
					pageNo: 1,
					pageSize: 999,
					name: val,
					type: "",
					grade: "",
					status: "",
					startTime: "",
					endTime: ""
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.coursePackList = res.data.data.list;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.getCoursePackLoading = false;
				});
		},
		getClassCourseByOfficeId(schoolId) {
			jwManualSign
				.getClassCourseByOfficeId({
					officeId: schoolId
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.classCourseList = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		getStudentStatus() {
			let types = "com_student_course_rel_status"; //课程包分类,适用年级
			sysDict
				.batchListData({
					types
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.com_student_course_rel_status =
							res.data.data.com_student_course_rel_status;
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		getUserByOfficeIdAndRoleId(schoolId, teacherType) {
			let param = {
				officeId: schoolId,
				teacherType
			};
			jwLesson
				.getUserByOfficeIdAndRoleId(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						if (teacherType == "teacher_id") {
							// 授课教师
							this.teacherList = res.data.data.filter(item => {
								return item != null;
							});
						}
						if (teacherType == "assist_id") {
							// 授课助教
							this.assistList = res.data.data.filter(item => {
								return item != null;
							});
						}
						if (teacherType == "class_teacher_id") {
							// 服务oo
							this.classTeacherList = res.data.data.filter(
								item => {
									return item != null;
								}
							);
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					//this.updateLoadingStatus({ isLoading: false });
				});
		},
		getSchools() {
			sysUser
				.dataScopeFilter()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.schoolList = res.data.data;
					} else {
						this.$Message.error(res.data.message);
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		changeColor(color) {
			this.myBackground = color;
		},
		uploadSizeError() {
			this.$Message.error("请上传不超过3M的图片");
		},
		uploadFormatError() {
			this.$Message.error("请上传JPG,PNG,JPEG格式的图片");
		},
		uploadSuccess(response) {
			console.log(response)
			if (response.code === '200') {
				this.avatorUrl = response.data + "?_=" + Math.random() * 9999; //response.data.filePath
				//this.attachmentId = response.data.id
				this.getListData();
			} else {
				this.$Message.error(response.msg);
			}
		},
        hasUploadFile(r) {
            this.avatorUrl = r.filePath
        },
		uploadAvatorOk() {
			//使用公共头像后不用调用该方法
			let params = {
				attachmentId: this.attachmentId,
				stuId: this.editStuId
			};
			jwLesson
				.uploadImg(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.$Message.success("上传成功");
					}
				})
				.catch(errors.call(this));
		},
		uploadAvatorCancel() {
			this.showUploadAvator = false;
		},
		printOk() {
			let stuIdList = [this.childItem.id];
			let param = {
				changeColor: this.myBackground,
				stuIdList
			};
			localStorage.setItem("printStuCard", JSON.stringify(param));
			const { href } = this.$router.resolve({
				name: "jw.printStudentCard"
				/* query: {
					    childItem: this.childItem,
					    myBackground: this.myBackground
					} */
			});
			window.open(href, "_blank");
		},
		printCancel() {},
		changeTableType(val) {
			// console.log('changeTab ----> ' + val)
			this.resetSearchParam();
			this.tableData = [];
			this.dataTotal = 0
			this.selection = []
			this.tableType = val;
			this.tableColumnArray = [].concat(this["tableColumnArray" + val]);
			this.btnList = [].concat(this["btnList" + val]);
			this.getShowTitle();
			this.getListData();
			if (val == "0") {
				this.canSelection = true;
				this.updateShowTitleKey = "jwClassCourse/listPageStudents";
			} else {
				this.canSelection = true;
				this.updateShowTitleKey =
					"jwClassCourse/listPageStudentVolumes";
			}

			if (val == "0") {
				this.exportMethod = jwClassCourse.exportClassStudent
			} else {
				this.exportMethod = jwClassCourse.exportStudent
			}
		},
		doActionItem(obj) {
			if (obj.key === "delData") {
				if (obj.row.status != "1") {
					this.$Modal.confirm({
						title: "确认删除",
						content: "确定删除该课程包？",
						onOk: () => {
							this.deleteCoursePack(obj.row.id);
						},
						onCancel: () => {}
					});
				}
			} else if (obj.key === "changeStatus") {
				this.$Modal.confirm({
					title: "确认状态修改",
					content: "确定设置该课程包为有效？",
					onOk: () => {
						this.changeStatus(obj.row.id, obj.row.status);
					},
					onCancel: () => {}
				});
			} else if (obj.key === "copy") {
			}
		},
		//获取数据，根据情况修改接口、传参
		getListData() {
			this.updateLoadingStatus({
				isLoading: true
			});
			this.currentPage = this.pageNo;
			let param = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				admissionStartDate: this.courseTime[0] ? new Date(this.courseTime[0]).format('yyyy-MM-dd 00:00:00') : '', //入学开始时间
				admissionEndDate: this.courseTime[1] ? new Date(this.courseTime[1]).format('yyyy-MM-dd 23:59:59') : '', //入学结束时间
				officeId: this.officeId, // 所属校区
				stuName: this.stuName, // 学员姓名
				stuCourStatus: this.stuCourStatus, // 已报课程状态
				isStudying: this.isStudying, // 是否在读
				teacherId: this.teacherId, // 授课教师
				assistId: this.assistId, // 助教
				classTeacherId: this.classTeacherId, //服务OO
				phone: this.phone, // 学员电话
				courseIdList: this.courseIdList, // 已报课程
				classIdList: this.classIdList, // 已报班课
				school: this.school // 学校
			};

			// console.log(param)
			/* if(this.sortObj.order != 'normal' && this.sortObj.key){
				    param.orderByType = this.sortObj.key
				    param.orderByStatus = this.sortObj.order == 'asc' ? '1' : '2'
				} */
			this.searchObj = param //这里需要给searchObj 赋值，导出数据的时候需要用到
			let myRequestList;
			if (this.tableType == "0") {
				myRequestList = jwClassCourse.listPageStudents(param);
			}
			if (this.tableType == "1") {
				param.synFlag = this.synFlag;
				myRequestList = jwClassCourse.listPageStudentVolumes(param);
			}

			myRequestList
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.selection = []
						let result = res.data.data;
						this.tableData = result.list;
						this.dataTotal = result.total;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		isExport(val) {
            //这里val的值。是根据设置下拉类型button设定的值来匹配判断
            if (val == "2" && !this.selection.length) {
                this.$Message.error("请选择要导出的数据");
                return;
            }
            let searchObj = this.searchObj;
            delete searchObj.pageNo
			delete searchObj.pageSize
            if (val == "2") {
                //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
                searchObj = {
                    ids: this.selection
                        .map(item => {
                            return item.id;
                        })
                };
            }
            this.$refs.exportModal.noShowExport(this.exportMethod, searchObj);
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
		//必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
		getShowTitle(closeLoad) {
			let param = {};
			if (this.tableType == "0") {
				param = {
					pageIdentifier: "jwClassCourse/listPageStudents",
					voName: "JwStudentClassCourseVO",
					lang: this.$i18n.locale
				};
			}
			if (this.tableType == "1") {
				param = {
					pageIdentifier: "jwClassCourse/listPageStudentVolumes",
					voName: "JwClassCourseStudentVolumesVO"
				};
			}

			jwClassCourse
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
			this.resetSearchParam();
			this.getListData();
		},
		resetSearchParam() {
			this.officeId = this.app.currOfficeId == 'all' ? this.userInfo.officeId : this.app.currOfficeId;
			this.courseTime = defaultDatePickerValue();
			this.pageNo = 1;
			this.pageSize = this.$store.state.app.pageSizeGlobal;
			this.stuName = "";
			this.status = "";
			this.teacherId = "";
			this.assistId = "";
			this.classTeacherId = "";
			this.phone = "";
			this.courseIdList = [];
			this.classIdList = [];
			this.school = "";
		},
		getDetail(name) {
			alert(name);
		},
		print() {
			if (!this.selection.length) {
				this.$Message.error("请选择要打印的学生");
				return;
			}
			let stuIdList = [];
			this.selection.forEach(item => {
				stuIdList.push(item.id);
			});
			let param = {
				changeColor: false,
				stuIdList
			};
			localStorage.setItem("printStuCard", JSON.stringify(param));
			const { href } = this.$router.resolve({
				name: "jw.printStudentCard"
				/* query: {
					     students: this.selection 
					} */
			});
			window.open(href, "_blank");
		}
	},
	watch: {
		"app.currOfficeId": function(val, oldVal) {
			if (oldVal && this.$route.name == 'jw.classStudentManageList') {
				this.officeId = this.app.currOfficeId == 'all' ? this.userInfo.officeId : this.app.currOfficeId;
				this.getListData();
			}
		}
	}
};
</script>