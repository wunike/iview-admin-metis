<style lang="less">
.colorStyle {
	color: #999;
	font-size: 14px;
}

.createRoomPage {
	.ivu-card:hover {
		box-shadow: none;
	}
	.ivu-table-wrapper {
		border: 1px solid #dcdee2;
		.ivu-table {
			&:after {
				display: 1px solid #dcdee2;
			}
		}
	}
	.chooseAreaS {
		display: flex;
		.chooseAreaSinner {
			// margin-left: 31px;
			color: #999;
			.ivu-form-item-label {
				color: #999;
				.colorStyle;
			}
		}
	}
	.productInfo {
		.title {
			margin: 8px 0 20px 16px;
			font-weight: 800;
			color: rgba(73, 80, 96, 1);
			& + div > span {
				.colorStyle;
			}
		}
		.title1 {
			margin: 16px 0 16px 16px;
		}
		.colorbtn {
			.ivu-btn {
				// margin-left: 10px;
				font-size: 14px;
			}
		}
		.checkDataOut {
			margin-top: 10px;
			margin-left: 55px;
			.ivu-col {
				span:nth-child(1) {
					.colorStyle;
				}
				span:nth-child(2) {
					color: #495060;
				}
			}
		}
		.classInfoStyle {
			.ivu-form-item-label {
				.colorStyle;
			}
			display: flex;
			justify-content: flex-start;
			// margin-left: 60px;
			.colorStyle;
			.Infotext {
				margin-right: 10px;
				margin-bottom: 20px;
				line-height: 32px;
				width: 60px;
				text-align: right;
			}
			.alertStyle {
				padding-right: 10px !important;
				height: 100%;
				display: flex;
				font-size: 14px;
				margin-bottom: 20px;
				align-items: center;
				.ivu-alert-icon {
					width: 30px;
					height: 100%;
					margin-top: 12px;
				}
			}
			.bg {
				display: block;
				width: 14px;
				height: 14px;
				background: #ffac99;
			}
			.conflictCon {
				position: relative;
				height: 34px;
				line-height: 34px;
				margin-left: 8px;
				color: rgba(73, 80, 96, 1);
			}
			.conflictTable {
				&.ivu-table-wrapper {
					overflow: visible;
					position: relative;
					border: 1px solid #dcdee2;
					border-bottom: 0;
					border-right: 0;
					.ivu-table {
						&:after {
							display: block;
						}
					}
				}
				.ivu-table-body {
					.conflict-red {
						background: #ffac99;
						// line-height: 47px;
						// text-align: center;
						// width: 100%;
						// height: 100%;
						// padding: 0 10px;
						cursor: pointer;
					}
				}
			}
		}
	}
	.footerBtn {
		height: 56px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		background: #fff;
		box-shadow: 0px -1px 3px 0px rgba(0, 0, 0, 0.12);
		position: fixed;
		width: calc(~"100% - 180px");
		bottom: 0px;
		padding-right: 32px;
		z-index: 1000;
		left: 180px;
	}
	.ivu-input-number {
		width: 100%!important;
	}
}
.myDropdown {
	.ivu-icon-ios-arrow-down {
		display: none;
	}
	&.redstyle {
		.a-button {
			color: red;
		}
		.ivu-icon-ios-arrow-down {
			display: inline;
		}
	}
}
</style>
<template>
	<div class="createRoomPage">
		<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="130">
			<Card :bordered="false" v-if="!$route.query.lessonId">
				<div class="chooseAreaS">
					<div class="chooseAreaSinner">
						<FormItem :label="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2613')" prop="officeId">
							<Select
								v-if="roomAreaList && roomAreaList.length"
								style="width:306px;"
								:disabled="$route.query.id"
								@on-change="selChange"
								v-model="formValidate.officeId"
								:placeholder="$t('importPage_warning2')"
							>
								<Option v-for="item in roomAreaList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
							</Select>
						</FormItem>
					</div>
					<div class="chooseAreaSinner" v-if="$route.query.type==3">
						<FormItem :label="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2615')" prop="shareArea">
							<Select
								v-if="shareAreaList && shareAreaList.length"
								multiple
								style="width:306px;"
								:disabled="$route.query.id"
								v-model="formValidate.shareArea"
								:placeholder="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2616')"
							>
								<Option
									v-show="formValidate.officeId!=item.id"
									v-for="item in shareAreaList"
									:value="item.id"
									:key="item.id"
								>{{ item.code }}{{ item.name }}</Option>
							</Select>
						</FormItem>
					</div>
				</div>
				<div class="productInfo">
					<div class="title">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2617')}}</div>
					<div class="colorbtn">
						<span style="width:130px;display:inline-block;text-align:right;padding-right:12px;">
							<span style="color:red;margin-right:4px;">*</span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2618')}}</span>
						<Button
							@click="showClassBtn"
							:disabled="!formValidate.officeId||$route.query.id"
						>{{checkData.name?$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2619'):$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_classshowtip_2569')}}</Button>
					</div>
					<Row class-name="checkDataOut" v-if="classDetailShow">
						<Col span="5">
							<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2621')}}</span>
							<span style="margin-left:5px;">{{checkData.name?checkData.name:'/'}}</span>
						</Col>
						<Col span="5">
							<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2622')}}</span>
							<span style="margin-left:5px;">{{checkData.timeLimit?checkData.timeLimit:'/'}}</span>
						</Col>
						<Col span="5">
							<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2623')}}</span>
							<!-- Number(params.row.price).toFixed(2) -->
							<span style="margin-left:5px;">{{checkData.price? Number(checkData.price).toFixed(2):'/'}}</span>
						</Col>
						<Col span="5">
							<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2624')}}</span>
							<span style="margin-left:5px;">{{checkData.num?checkData.num:'/'}}</span>
						</Col>
						<Col span="4">
							<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2625')}}</span>
							<span style="margin-left:5px;">{{checkData.totalPrice? Number(checkData.totalPrice).toFixed(2):'/'}}</span>
						</Col>
					</Row>
					<Row class-name="checkDataOut" v-if="classDetailShow">
						<!-- <Col span="5">
							<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2626')}}</span>
							<span style="margin-left:5px;">{{checkData.subject?checkData.subject:'/'}}</span>
						</Col> -->
						<Col span="5">
							<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2627')}}</span>
							<span style="margin-left:5px;">{{checkData.gradeLabel?checkData.gradeLabel:'/'}}</span>
						</Col>
						<!-- <Col span="5">
							<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2628')}}</span>
							<span style="margin-left:5px;">{{checkData.year?checkData.year:'/'}}</span>
						</Col>
						<Col span="5">
							<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2629')}}</span>
							<span style="margin-left:5px;">{{checkData.season?checkData.season:'/'}}</span>
						</Col> -->
					</Row>
				</div>
			</Card>
			<Card :bordered="false" style="margin-top: 10px;" v-if="!$route.query.lessonId">
				<div class="productInfo">
					<div class="title title1">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2630')}}</div>
					<Row class-name="classInfoStyle">
						<Col span="8">
							<FormItem :label="$t('classlist_compontents_detailinfo_16')" prop="name">
								<Input :placeholder="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2684')" v-model="formValidate.name"></Input>
								<!-- <Input :placeholder="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2632')" v-model="formValidate.name"></Input> -->
							</FormItem>
						</Col>
						<Col span="8">
							<FormItem
								:label="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2633')"
								prop="beginDate"
								:rules="{required: true,  message: $t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2634'), trigger: 'change'}"
							>
								<DatePicker
									type="date"
									:placeholder="$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2606')"
									format="yyyy-MM-dd"
									style="width:100%"
									v-model="beginDate"
									@on-change="beginDateChange"
									:disabled="$route.query.id"
								></DatePicker>
							</FormItem>
						</Col>
						<Col span="8">
							<FormItem :label="$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2604')" prop="classroomId">
                                <!-- v-if="classroomIdList&& classroomIdList.length" -->
								<Select
									:placeholder="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2637')"
                                    :disabled="allNotChange"
									v-model="formValidate.classroomId"
								>
									<Option v-for="item in classroomIdList" :value="item.id" :key="item.id">{{ item.name }}</Option>
								</Select>
							</FormItem>
						</Col>
					</Row>
					<Row class-name="classInfoStyle">
						<Col span="8">
							<FormItem :label="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2638')" prop="memberCount">
								<Input :placeholder="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2639')" :disabled="onlyChangeclassAndTeacher" v-model="formValidate.memberCount" @on-keyup="removeSpace(1)"></Input>
							</FormItem>
						</Col>
						<Col span="8">
							<!-- {{formValidate.grade}} -->
							<FormItem :label="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2640')" prop="grade">
                                <!--  v-if="jw_course_grade&& jw_course_grade.length" -->
								<Select v-model="formValidate.grade" :disabled="onlyChangeclassAndTeacher" :placeholder="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2641')"  @on-change="gradeChange">
									<Option
										v-for="item in jw_course_grade"
										:value="item.value"
										:key="item.label"
									>{{ item.label }}</Option>
								</Select>
							</FormItem>
						</Col>
						<Col span="8">
							<FormItem :label="$t('classlist_compontents_detailinfo_22')" prop="classTeacherId">
								<Select
									filterable
									clearable
                                    :disabled="allNotChange"
									:placeholder="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2643')"
									v-model="formValidate.classTeacherId"
								>
									<Option v-for="item in classTeacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
								</Select>
							</FormItem>
						</Col>
					</Row>
					<Row class-name="classInfoStyle">
						<Col span="8">
							<FormItem :label="$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2601')" prop="teacherId">
								<Select
									filterable
                                    :disabled="allNotChange"
									clearable
									:placeholder="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2645')"
									v-model="formValidate.teacherId"
								>
									<Option v-for="item in teacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
								</Select>
							</FormItem>
						</Col>

						<Col span="8">
							<FormItem :label="$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2602')" prop="assistId">
								<Select
									filterable
									clearable
                                    :disabled="allNotChange"
									:placeholder="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2647')"
									v-model="formValidate.assistId"
								>
									<Option v-for="item in assistList" :value="item.id" :key="item.id">{{ item.name }}</Option>
								</Select>
							</FormItem>
						</Col>
						<Col span="8">
							<FormItem :label="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2648')" prop="expandHour">
								<InputNumber  :placeholder="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2649')" :disabled="allNotChange" :min="0" v-model="formValidate.expandHour"></InputNumber>
							</FormItem>
						</Col>
					</Row>
					<Row class-name="classInfoStyle">
						<Col span="8">
							<FormItem :label="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2650')" prop="remarks">
								<Input :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_263')" :disabled="onlyChangeclassAndTeacher" v-model="formValidate.remarks"></Input>
							</FormItem>
						</Col>
					</Row>
				</div>
			</Card>
			<detailInfo v-if="$route.query.lessonId">
				<div slot="classtitle">
					<div class="title">
						<span>{{classData.name}}</span>
					</div>
				</div>
				<div slot="classDetail">
					<div class="classDetail">
						<div class="classDetailRow">
							<span>{{$t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2427')}}<span>{{classData.grade}}</span>
							</span>
							<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2653')}}<span>{{classData.teacherName}}</span>
							</span>
							<span>{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2394')}}<span>{{classData.courseName}}</span>
							</span>
						</div>
						<div class="classDetailRow">
							<span>{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2389')}}<span>{{`${classData.actualMemberCount}/${classData.memberCount}`}}</span>
							</span>
							<span>{{$t('courselist_compontents_modify_190')}}<span>{{classData.assistName}}</span>
							</span>
							<span style="white-space: nowrap;">{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2395')}}<span>{{classData.startDate}}</span>
							</span>
						</div>
						<div class="classDetailRow">
							<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2658')}}<span>{{`${classData.finishCourseHour}/${classData.courseHour}`}}</span>
							</span>
							<span>{{$t('courselist_compontents_modify_193')}}<span>{{classData.classTeacherName}}</span>
							</span>
						</div>
					</div>
				</div>
			</detailInfo>
			<detailInfo style="margin-top:16px" v-if="$route.query.lessonId">
				<div slot="classDetail">
					<div class="classDetail">
						<div class="classDetailRow">
							<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2660')}}<span>{{classData.courseHour}}</span>
							</span>
						</div>
						<div class="classDetailRow">
						    <span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2661')}}<span>{{classData.expandHour || 0}}</span>
                            </span>
                        </div>
						<div class="classDetailRow">
							<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2662')}}<span>{{classData.arrangedHour}}</span>
							</span>
						</div>
						<div class="classDetailRow">
							<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2663')}}<span>{{Number(classData.courseHour) + Number(classData.expandHour || 0) - Number(classData.arrangedHour)}}</span>
							</span>
						</div>
						<div class="classDetailRow">
							<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2664')}}<span>{{classData.attendanceHour}}</span>
							</span>
						</div>
						<div class="classDetailRow">
							<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2665')}}<span>{{classData.finishCourseHour}}</span>
							</span>
						</div>
					</div>
				</div>
			</detailInfo>
			<Card :bordered="false" style="margin-top: 10px;">
				<div class="productInfo">
					<div class="title title1">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2666')}}</div>
					<Row class-name="classInfoStyle">
						<Col span="8">
							<FormItem :label="$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2596')" prop="dateRangeTime" v-if="$route.query.lessonId">
								<DatePicker
									:transfer="true"
									separator=" ~ "
									format="yyyy-MM-dd"
									type="daterange"
									:options="optionsDisableObj"
									v-model="formValidate.dateRangeTime"
									@on-change="startDateChange0"
									:clearable="false"
									:editable="false"
									:placeholder="$t('courselist_compontents_modify_179')"
									style="display:block;"
								></DatePicker>
							</FormItem>
							<FormItem :label="$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2596')" prop="dateRangeTime" v-else>
								<DatePicker
									:transfer="true"
									separator=" ~ "
									format="yyyy-MM-dd"
									type="daterange"
									:options="optionsDisableObj"
									v-model="formValidate.dateRangeTime"
									@on-change="startDateChange"
									:clearable="false"
									:editable="false"
									:placeholder="$t('courselist_compontents_modify_179')"
									style="display:block;"
								></DatePicker>
							</FormItem>
						</Col>
						<Col span="16">
							<FormItem :label="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2669')" prop="regular" v-if="$route.query.lessonId" style="width: 50%; float: left;">
								<Select v-if="jw_class_course_regular && jw_class_course_regular.length" v-model="formValidate.regular" @on-change="regularChange0">
									<Option
										v-for="item in jw_class_course_regular"
										:value="item.value"
										:key="item.value"
									>{{ item.label }}</Option>
								</Select>
							</FormItem>
							<FormItem :label="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2669')" prop="regular" v-else style="width: 50%; float: left;">
								<Select
									v-if="jw_class_course_regular && jw_class_course_regular.length"
									v-model="formValidate.regular"
									@on-change="regularChange"
								>
									<Option
										v-for="item in jw_class_course_regular"
										:value="item.value"
										:key="item.value"
									>{{ item.label }}</Option>
								</Select>
							</FormItem>
                            <p v-if="!columns2datas1 || columns2datas1.length === 0" style="float: left;padding-left: 20px;line-height: 34px;">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2670')}}</p>
						</Col>
					</Row>
					<Row class-name="classInfoStyle" align="top">
						<Col span="16" style="display:flex">
							<classRuleTable
								ref="classRuleTableRef"
								@getTableData="getTableData"
								:regular="formValidate.regular"
								:productCheckData="$route.query.lessonId?classData.comProductPrice:checkData"
							></classRuleTable>
						</Col>
					</Row>
					<Row class-name="classInfoStyle" style="margin-top:10px" v-if="columns2datas1 && columns2datas1.length">
						<Col>
							<div class="Infotext" style="width:130px;margin-left: -12px;margin-bottom: 0px;">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_modifyconflict_2596')}}</div>
						</Col>
						<Col span="20">
							<div v-if="checkConflictData.flag==true">
								<Alert type="error" show-icon>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2671')}}<span v-if="checkConflictData.teacherId">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2672')}}<span style="color:#FF3000;margin:0 8px;">{{checkConflictData.teacherId}}</span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2673')}}</span>
									<span v-if="checkConflictData.assistId">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2674')}}<span style="color:#FF3000;margin:0 8px;">{{checkConflictData.assistId}}</span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2673')}}</span>
									<span v-if="checkConflictData.classTeacherId">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2675')}}<span style="color:#FF3000;margin:0 8px;">{{checkConflictData.classTeacherId}}</span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2673')}}</span>
									<span v-if="checkConflictData.classroomId">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2676')}}<span style="color:#FF3000;margin:0 8px;">{{checkConflictData.classroomId}}</span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2673')}}</span>
									<span>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2677')}}</span>
								</Alert>
							</div>
							<div v-else-if="checkConflictData.flag==false">
								<Alert type="success" show-icon>{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2678')}}</Alert>
							</div>
						</Col>
					</Row>
                    <Row class-name="classInfoStyle" v-if="columns2datas1 && columns2datas1.length">
						<Col>
							<div class="Infotext" style="width: 118px;"></div>
						</Col>
						<Col span="20">
							<Table :columns="columns2" :data="columns2datas1" class="conflictTable" border></Table>
						</Col>
					</Row>
				</div>
			</Card>
		</Form>
		<div style="width:100px;height:50px;"></div>
		<div class="footerBtn">
			<Button @click="cancelHandle">{{$t('classroom_allscore_53')}}</Button>
            <Button
                :disabled="formValidate && formValidate.regularJson && formValidate.regularJson.length<1"
                type="primary"
                style="margin-left:16px;"
                @click="lookConflict"
            >{{setClassRuleShowTitle}}</Button>
			<Button type="primary" style="margin-left:16px;" @click="saveHandle">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2680')}}</Button>
		</div>
		<classShowTip
			ref="classShowTipRef"
			@chooseDetailMethod="chooseDetailMethod"
			:officeId="formValidate.officeId"
			:shareArea="formValidate.shareArea"
		></classShowTip>
		<modifyConflict ref="modifyConflictRef" @okModify="okModify"></modifyConflict>
	</div>
</template>
<script>
import { mapMutations } from "vuex";
import tableDropdown from "@public/modules/tableDropdown.vue";
import classShowTip from "./components/classShowTip";
import classRuleTable from "./components/classRuleTable";
import modifyConflict from "./components/modifyConflict";
import detailInfo from "./../sortClass/compontents/detailInfo";
import valid, {
	errors,
	sysUser,
	sysDict,
	sysOffice,
	jwClassroom,
	jwClassCourse,
	jwLesson
} from "../../../libs/request";
export default {
	//		name: this.$route.query.type==3?'jw.shareClass':'jw.createClass',
	data() {
		return {
			regularJson1:[],
			isActioning: false, //多次提交拦截
			grade_type:'',
			divText: "",
			btnList: [{ label: this.$t('jw.classManage.sortClass'), key: "sortClass" }],
			classData: {},
			actualMemberCount: "",
			optionsDisableObj: {},
			checkMyData: "", //查看课次列表数据
			checkConflictData: "", //冲突的数据
			ruleValidate: {
				officeId: [
					{
						required: true,
						message: this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2682'),
						trigger: "change"
					}
				],
				shareArea: [
					{
						required: true,
						message: this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2683'),
						trigger: "change",
						type: "array"
					}
				],
				name: [
					{
						required: true,
						message: this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2684'),
						trigger: "change"
					}
				],
				beginDate: [
					{
						required: true,
						message: this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2685'),
						trigger: "change"
					}
				],
				classroomId: [
					{
						required: true,
						message: this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2686'),
						trigger: "change"
					}
				],
				memberCount: [
					{
						required: true,
						message: this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2687'),
						trigger: "change"
					}
				],
				grade: [
					{
						required: true,
						message: this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2688'),
						trigger: "change"
					}
				],
				classTeacherId: [
					{
						required: true,
						message: this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2689'),
						trigger: "change"
					}
				],
				teacherId: [
					{
						required: true,
						message: this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2690'),
						trigger: "change"
					}
				],
				dateRangeTime: [
					{
						required: true,
						message: this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2691'),
						trigger: "change",
						type: "array"
					}
				],
				regular: [
					{
						required: true,
						message: this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2692'),
						trigger: "change"
					}
				]
			},
			beginDate: "",
			formValidate: {
				id: "",
				officeId: "", //所属校区
				shareArea: [],
				name: "", //班课名称
				beginDate: "", //开班日期
				classroomId: "", //授课教室
				memberCount: "", //满课人数
				grade: "", //年级
				classTeacherId: "", //服务oo姓名
				teacherId: "", //授课教师
				assistId: "", //助教
				remarks: "", //备注
				dateRangeTime: [], //日期范围
				startDate: "", //上课开始日期
				endDate: "", //上课结束日期
				regular: "", //排课规律
				regularJson: [], //排课规律JSON obj
				expandHour: 0, //延补课时
            },
            formValidateCopy: {},
            // initFormValidate: {}, // 只用来保存form接口获取的排课参数
			roomAreaList: [],
			shareAreaList: [],
			classroomIdList: [],
			jw_course_grade: [],
			classTeacherList: [],
			teacherList: [],
			assistList: [],
			jw_class_course_regular: [],

			checkData: {},
			classDetailShow: false,
			classChangeval: true,
			columns2: [
				{
					title: this.$t('courselist_compontents_detailinfo_160'),
					key: "code",
					width: null,
                    resizable: true,
					// minWidth: 60
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2694'),
					key: "startTime",
					width: null,
                    resizable: true,
					render: (h, params) => {
						return h("div", {}, params.row.startTime.split(" ")[0]);
					}
				},
				{
					title: this.$t('message_socket_303'),
					key: "week",
					width: null,
                    resizable: true,
					render: (h, params) => {
						let text = this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2696');
						if (params.row.week == "1") {
							text = text + this.$t('classlist_compontents_detailinfo_28');
						} else if (params.row.week == "2") {
							text = text + this.$t('classlist_compontents_detailinfo_29');
						} else if (params.row.week == "3") {
							text = text + this.$t('classlist_compontents_detailinfo_30');
						} else if (params.row.week == "4") {
							text = text + this.$t('classlist_compontents_detailinfo_31');
						} else if (params.row.week == "5") {
							text = text + this.$t('classlist_compontents_detailinfo_32');
						} else if (params.row.week == "6") {
							text = text + this.$t('classlist_compontents_detailinfo_33');
						} else if (params.row.week == "7") {
							text = text + this.$t('classlist_compontents_detailinfo_27');
						}
						return h("div", {}, text);
					}
				},
				{
					title: this.$t('mycourse_mycourse_377'),
					key: "endTime",
					width: null,
                    resizable: true,
					render: (h, params) => {
						return h(
							"div",
							{},
							params.row.startTime.slice(-8, -3) +
								"-" +
								params.row.endTime.slice(-8, -3)
						);
					}
				},
				{
					title: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_604'),
					key: "hours",
					width: null,
                    resizable: true,
				},
				{
					title: this.$t('courselist_12'),
					key: "teacherName",
					width: null,
                    resizable: true,
					align: "center",
					render: (h, params) => {
						params.row.teacherIdConflict = false;
						if (
							this.checkConflictData.teacherId &&
							params.index == params.row.code - 1 &&
							this.checkConflictData.conflictList[params.row.code]
						) {
							this.checkConflictData.conflictList[params.row.code].filter(item => {
								if (item.conflictField == "teacherId") {
									params.row.teacherIdConflict = true;
									params.row.teacherIdType = item.isConflict;
									params.row.num = this.checkData.num;
									params.row.cellClassName={name:'conflict-red'};
								}
							});
						}

						return h(
							"div",
							{
								props: {},
								class: params.row.teacherIdConflict
									? "conflict-red"
									: "",
								on: {
									click: () => {
										if (params.row.teacherIdConflict) {
											this.$refs.modifyConflictRef.conflictShowMethods(
												params.row,
												this.$route.query.lessonId
													? this.classData.office.id
													: this.formValidate.officeId,
												this.checkConflictData.conflictList[params.row.code]
											);
										}
									}
								}
							},
							params.row.teacherName
						);
					}
				},
				{
					title: this.$t('courselist_13'),
					key: "assistName",
					align: "center",
					width: null,
                    resizable: true,
					render: (h, params) => {
						params.row.assistIdConflict = false;

						if (
							this.checkConflictData.assistId &&
							params.index == params.row.code - 1 &&
							this.checkConflictData.conflictList[params.row.code]
						) {
							this.checkConflictData.conflictList[params.row.code].filter(item => {
								if (item.conflictField == "assistId") {
									params.row.assistIdConflict = true;
									params.row.assistIdType = item.isConflict;
									params.row.num = this.checkData.num;
									params.row.cellClassName={name:'conflict-red'};
								}
							});
						}
						//  cellClassName: {
                        //     name: 'demo-table-info-cell-name'
                        // }
						return h(
							"div",
							{
								class: params.row.assistIdConflict
									? "conflict-red"
									: "",
								on: {
									click: () => {
										if (params.row.assistIdConflict) {
											this.$refs.modifyConflictRef.conflictShowMethods(
												params.row,
												this.$route.query.lessonId
													? this.classData.office.id
													: this.formValidate.officeId,
												this.checkConflictData.conflictList[params.row.code]
											);
										}
									}
								}
							},
							params.row.assistName
						);
					}
				},
				{
					title: this.$t('mycourse_mycourse_374'),
					key: "classTeacherName",
					align: "center",
					width: null,
                    resizable: true,
					render: (h, params) => {
						params.row.classTeacherIdConflict = false;

						if (
							this.checkConflictData.classTeacherId &&
							params.index == params.row.code - 1 &&
							this.checkConflictData.conflictList[params.row.code]
						) {
							this.checkConflictData.conflictList[params.row.code].filter(item => {
								if (item.conflictField == "classTeacherId") {
									params.row.classTeacherIdConflict = true;
									params.row.classTeacherIdType =
										item.isConflict;
									params.row.num = this.checkData.num;
									params.row.cellClassName={name:'conflict-red'};
								}
							});
						}
						return h(
							"div",
							{
								props: {},
								class: params.row.classTeacherIdConflict
									? "conflict-red"
									: "",
								on: {
									click: () => {
										if (params.row.classTeacherIdConflict) {
											this.$refs.modifyConflictRef.conflictShowMethods(
												params.row,
												this.$route.query.lessonId
													? this.classData.office.id
													: this.formValidate.officeId,
												this.checkConflictData.conflictList[params.row.code]
											);
										}
									}
								}
							},
							params.row.classTeacherName
						);
					}
				},
				{
					title: this.$t('courselist_16'),
					key: "classroomName",
					align: "center",
					width: null,
                    resizable: true,
					render: (h, params) => {
						params.row.classroomIdConflict = false;
						if (
							this.checkConflictData.classroomId &&
							params.index == params.row.code - 1 &&
							this.checkConflictData.conflictList[params.row.code]
						) {
							this.checkConflictData.conflictList[params.row.code].filter(item => {
								if (item.conflictField == "classroomId") {
									params.row.classroomIdConflict = true;
									params.row.classroomIdType =
										item.isConflict;
									params.row.num = this.checkData.num;
									params.row.cellClassName={name:'conflict-red'};
								}
							});
						}
						return h(
							"div",
							{
								props: {},
								class: params.row.classroomIdConflict
									? "conflict-red"
									: "",
								on: {
									click: () => {
										if (params.row.classroomIdConflict) {
											this.$refs.modifyConflictRef.conflictShowMethods(
												params.row,
												this.$route.query.lessonId
													? this.classData.office.id
													: this.formValidate.officeId,
												this.checkConflictData.conflictList[params.row.code]
											);
										}
									}
								}
							},
							params.row.classroomName
						);
					}
                },
                {
					title: this.$t('mycourse_scoreexchage_421'),
					key: "statusName",
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2711'),
					key: "endTime",
					width: null,
                    resizable: true,
					render: (h, params) => {
						let len;
						let arr;
                        let ne = "";
						if (
							this.checkConflictData &&
							this.checkConflictData.conflictList &&
							this.checkConflictData.conflictList[params.row.code] &&
							this.checkConflictData.conflictList[params.row.code]["0"] &&
							this.checkConflictData.conflictList[params.row.code]["0"].conflictStudentList
						) {
							len = this.checkConflictData.conflictList[params.row.code]["0"].conflictStudentList.length;
                            arr = this.checkConflictData.conflictList[params.row.code]["0"].conflictStudentList;
                            let out = this.checkConflictData.conflictList[params.row.code]["0"]
							arr.filter(item => {
								item.label = `${item.name} ${item.phone} ` + this.$t('messagemanagement_components_searchlists_326') + `: ${out.classCourseName} ` + this.$t('router_routers_7576') + `: ${out.startTime}`;
								item.value = `${item.name} ${item.phone} ` + this.$t('messagemanagement_components_searchlists_326') + `: ${out.classCourseName} ` + this.$t('router_routers_7576') + `: ${out.startTime}`;
							});
						}
						let a = len ? len : "0";
						let b = this.actualMemberCount
							? this.actualMemberCount
							: "0";
						return h(tableDropdown, {
							class: a > 0 ? "redstyle" : "",
							props: {
								buttonList: arr,
								actionName: a + "/" + b
							},
							on: {
								dropFn: key => {
									// this.doActionItem({
									// 	key,
									// 	row: params.row
									// });
								}
							}
						});
					}
				},
				{
					title: this.$t('classlist_compontents_detailinfo_45'),
					key: "doAction",
					// fixed: "right",
					// width: null,
                    // resizable: true,
					render: (h, params) => {
						return h("div", [
							h(
								"a",
								{
									props: {
										type: "text",
										size: "small"
									},
									style:{
                                       color:(params.row.status=='finishAttendance' || params.row.status=='unFinishAttendance')?'#ccc':''
									},
									on: {
										click: () => {
											if(params.row.status=='finishAttendance' || params.row.status=='unFinishAttendance'){
												 //完成考勤、未完成考勤不能编辑
												 return
											}
											// 屏蔽不能删除最后一个考勤
											// if(this.columns2datas1 && this.columns2datas1.length<=1){
											// 	this.$Message.error(this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2713'));
                                            //      return
											// }
											this.columns2datas1.splice(
												params.index,
												1
											);
											// let a=JSON.parse(JSON.stringify(this.columns2datas1)
											this.columns2datas1 = [].concat(
												this.columns2datas1
											);
											this.columns2datas1.filter(
												(item, index) => {
													return (item.code =
														index + 1);
												}
											);
											// this.checkConflictData=[].concat(this.checkConflictData)
											this.checkConflict();
										}
									}
								},
								this.$t('classlist_compontents_detailinfo_46')
							)
						]);
					}
				}
			],
            columns2datas1: [],
            onlyChangeclassAndTeacher: false,
            allNotChange: false,
		};
    },
    computed: {
        setClassRuleShowTitle() {
            return this.columns2datas1 && this.columns2datas1.length ? this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2715') : this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2716')
        }
    },
	components: {
		classShowTip,
		classRuleTable,
		modifyConflict,
		detailInfo,
		tableDropdown
	},
	mounted() {
        /**
         *  班课状态：
            ready：未上课 和 lose：无效，编辑进入编辑排课，所有信息可以修改
            doing：上课中，编辑进入编辑排课，教室 、授课老师、服务OO、助教可以修改，修改后需要进行重排
            finish：已结课 ，编辑进行什么都不能改，只能看
         */
        let status = this.$route.query.status;
        if(status == 'doing') this.onlyChangeclassAndTeacher = true;
        if(status == 'finish') {
            this.allNotChange = false;
            this.onlyChangeclassAndTeacher = false;
        }

		let p1 = new Promise((resolve, reject) => {
                this.getMoreList(resolve);
            });
		let p2 = new Promise((resolve, reject) => {
                this.baseData1(resolve);
            });
		let p3 = new Promise((resolve, reject) => {
                this.baseData2(resolve);
            });
		// this.getMoreList(); //校区列表接口
		// this.baseData1(); //年级列表接口  课程包全部分类接口
		// this.baseData2(); //年级列表接口  课程包全部分类接口
		Promise.all([p1, p2, p3])
			.then(result => {
				console.log(result); //["ok", "ok"]
				if (result[0] == "ok" && result[1] == "ok" && result[2] == "ok") {
					if (this.$route.query.id) {
						this.classGetData({
							id: this.$route.query.id
						});
					}
					if (this.$route.query.lessonId) {
						this.classFormData();
					}
				}
			})
			.catch(error => {
				console.log(error);
			});
	},
	methods: {
		...mapMutations(["updateLoadingStatus",'closeTag']),
		listUnConflictedUsers(officeId, userType) {
			jwLesson.listUnConflictedUsers({
                officeId,
                startTime: '',
                endTime: '',
                userType
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    if (userType == "teacher") {
                        this.teacherList = res.data.data;
                    }
                    if (userType == "assit") {
                        this.assistList = res.data.data;
                    }
                    if (userType == "classTeacher") {
                        this.classTeacherList = res.data.data;
                    }
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
		},
		changeOfficeIdGetPeople(officeId) {
			this.listUnConflictedUsers(officeId,"teacher");
			this.listUnConflictedUsers(officeId,"assit");
			this.listUnConflictedUsers(officeId,"classTeacher");
		},
		conflictDomChangeColorFn(){
			this.$nextTick(()=>{
				let tableCell=document.querySelectorAll('.conflictTable')[0].querySelectorAll('td');
				if(tableCell){
					tableCell.forEach((item)=>{
					  item.style.background='';
					})
				}
				let conflictDom=document.querySelectorAll('.conflict-red');
				if(conflictDom){
					conflictDom.forEach((item)=>{
						item.parentNode.parentNode.style.background='#ffac99';
					})
				}
			})
		},
		gradeChange(val){
			if(val){
				let types = this.jw_course_grade.filter((v)=>{ return v.value == val });
				this.grade_type = types[0].type;
			} else {
				this.grade_type = ''
			}
			// console.log('this.grade_type:'+this.grade_type);
		},
		classFormData() {
			jwClassCourse
				.form({
					id: this.$route.query.lessonId
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data;
						this.classData = res.data.data;
						this.actualMemberCount = this.classData.actualMemberCount;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		tabRoute() {
			this.$refs["formValidate"].resetFields();
			this.beginDate = "";
			for (let item in this.formValidate) {
				this.formValidate[item] = "";
			}
			// this.getRoomList();
			this.classroomIdList = []
			this.teacherList = [];
			this.assistList = [];
			this.classTeacherList = [];
			this.classDetailShow = false;
			this.checkData = [];
			this.reSetData();
		},
		classGetData(id) {
            // 手动开班 form
			jwClassCourse
				.form(id)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						console.log(res,'jwClassCourse.form!!!!!!!!!!~~~~~~')
						let result = res.data.data;
						this.actualMemberCount = result.actualMemberCount;
						this.formValidate.officeId = result.office.id;
						let arr = [];
						result.jwClassShareList.filter(function(item) {
							arr.push(item.office.id);
						});
						this.formValidate.shareArea = arr;

						this.formValidate.id = result.id;
						let comProductPrice = JSON.parse(
							JSON.stringify(result.comProductPrice)
						);
						//产品信息函数字段
						this.classDetailShow = true;
						this.checkData = comProductPrice;
						this.checkData.num = Number(comProductPrice.num);
						this.checkData.gradeLabel = result.gradeLabel;
						this.checkData.name = result.courseName;
						this.checkData.id = result.courseId;
						this.checkData.type = result.comCourse.type;
						this.checkData.timeLimit = `${result.comCourse.saleStartDate.slice(
							0,
							10
						)}~${result.comCourse.saleEndDate.slice(0, 10)}`;
						this.formValidate.name = result.name;
						this.formValidate.beginDate = result.beginDate;
						this.beginDate = result.beginDate;
						this.getRoomList(); //根据校区获取教室列表
						this.formValidate.classroomId = result.classroomId;
						this.formValidate.memberCount = result.memberCount;
						this.formValidate.grade = result.grade;
						this.formValidate.classTeacherId =
							result.classTeacherId;
						this.formValidate.teacherId = result.teacherId;
						this.formValidate.assistId = result.assistId;

                        // this.classTeacherRemote(result.classTeacherName);
                        // this.teacherRemote(result.teacherName);
						// this.assistRemote(result.assistName);
						this.changeOfficeIdGetPeople(result.office.id)
						this.formValidate.remarks = result.remarks;
						this.formValidate.expandHour = result.expandHour || 0;
						this.formValidate.dateRangeTime = [];
						this.formValidate.dateRangeTime.push(
							result.startDate.slice(0, 10)
						);
						this.formValidate.dateRangeTime.push(
							result.endDate.slice(0, 10)
						);
						this.formValidate.startDate = result.startDate.slice(
							0,
							10
						);
						this.startDate = result.startDate.slice(0, 10);
						this.formValidate.endDate = result.endDate.slice(0, 10);
						this.endDate = result.endDate.slice(0, 10);
                        this.formValidate.regular = result.regular;
                        this.formValidate.regularJson = JSON.parse(result.regularJson);

                        // 规则丢失
                        if(!JSON.parse(result.regularJson) || result.regularJson === '[]') {
                            this.formValidate.regularJson = [
                                {
                                    week: "",
                                    hours: '',
                                    startTime: "",
                                    endTime: ""
                                }
                            ]
                        }

						this.$refs["classRuleTableRef"].EimtaddData(
							"id",
							JSON.parse(JSON.stringify(this.formValidate.regularJson)),this.checkData.num
						);
						this.checkConflictData = {};
						this.checkConflictData.flag = false;
						this.columns2datas1 = result.jwLessonList;
						this.columns2datas1.filter((item, index) => {
							return (item.code = index + 1);
                        });
                        this.formValidateCopy = Object.assign({}, this.formValidate);
                        // this.initFormValidate = Object.assign({}, this.formValidate);
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		beginDateChange(val) {
			this.formValidate.dateRangeTime = [];
			this.reSetData();
			this.optionsDisableObj = {
				disabledDate(date) {
					return date && date.valueOf() < ddd - 86400000;
				}
			};
			this.formValidate.beginDate = val;
			let ddd = new Date(val).getTime();
			if (this.formValidate.dateRangeTime[0]) {
				let startDay = new Date(
					this.formValidate.dateRangeTime[0]
				).getTime();
				if (startDay < ddd) {
					this.formValidate.dateRangeTime = [];
					this.$refs["classRuleTableRef"].EimtaddData();
					this.ClassDate = false;
					this.columns2datas1 = [];
				}
			}
		},
		teacherRemote(query) {
			// this.getSearchList(9, query); // 授课教师roleId=9 屏蔽远程搜索
			this.getSearchList(9, ''); // 授课教师roleId=9
		},
		assistRemote(query) {
			// 授课助教roleId=10
			// this.getSearchList(10, query);屏蔽远程搜索
			this.getSearchList(10, '');
		},
		classTeacherRemote(query) {
			// if (this.formValidate.classTeacherId == query) {
			// 	return;
			// }
			// 服务oo roleId=6
			// this.getSearchList(6, query); 屏蔽远程搜索
			this.getSearchList(6, '');
		},
		getSearchList(roleId, query) {
            console.log(this.formValidate.officeId)
			if (!this.formValidate.officeId) {
				this.$Message.error("请先选择所属校区");
				return;
			}
			let param = {
				roleId,
				pageSize: 0,
				pageNo: 1,
				isService: 1,
				isEnable: 1,
				officeId: this.formValidate.officeId,
				name: ''//query
			};
			sysUser
				.userListRoleUser(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						if (roleId == 9) {
							// 授课教师
							this.teacherList = res.data.data.list;
						}
						if (roleId == 10) {
							// 授课助教
							this.assistList = res.data.data.list;
						}
						if (roleId == 6) {
							// 服务oo
							this.classTeacherList = res.data.data.list;
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
		getRoomList() {
			// debugger
			if(!this.formValidate.officeId){
				return
			}
			let params = {
				// pagesize: -1,
				// status: 1,
				officeId: this.formValidate.officeId
			};
			jwClassroom
				.listPage(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.classroomIdList = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		baseData1(resolve) {
			let types = "jw_class_course_regular"; //课程包分类,适用年级
			sysDict
				.batchListData({
					types
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.jw_class_course_regular =
							res.data.data.jw_class_course_regular;
						resolve('ok')
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					});
		},
		baseData2(resolve) {
			let type = "jw_course_type"; //适用年级
			sysDict
				.findChildDictByParentDict({
					type
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.jw_course_grade = res.data.data;
						resolve('ok')
					}
				})
				.catch(errors.call(this))
				.finally(() => {
				});
		},
		getMoreList(resolve) {
			//校区列表
			sysUser
				.dataScopeFilter()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.roomAreaList = res.data.data;
						resolve('ok')
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
			if (this.$route.query.type == 3) {
				//参数type=3说明是共享校区此时调用共享的代码下拉
				//共享校区列表
				sysOffice
					.officeList({
						grade: "3"
					})
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							// debugger;
							this.shareAreaList = res.data.data.allCompany;
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			}
		},

		//不是数字就清空数据
		numArea(value) {
			var patt1 = new RegExp(/^[0-9]{0,}$/);
			return patt1.test(value);
		},
		removeSpace(val) {
			if (val == 1) {
				if (!this.numArea(this.formValidate.memberCount)) {
					this.formValidate.memberCount = "";
				}
				this.formValidate.memberCount = this.formValidate.memberCount.replace(
					/\s+/g,
					""
				);
			}
		},
		getTableData(tableData) {
			this.formValidate.regularJson = tableData;
			this.regularJson1 = tableData;
		},
		reSetData() {
			//课次重置
			this.formValidate.regularJson = "";
			this.regularJson1 = [];
			this.ClassDate = false;
			this.columns2datas1 = [];
			this.$refs["classRuleTableRef"].isShowTips();
		},
		selChange(val) {
			this.$refs["formValidate"].resetFields();
			this.beginDate = "";
			for (let item in this.formValidate) {
				if (item != "officeId") {
					this.formValidate[item] = "";
				} else {
					this.formValidate.officeId = val;
				}
            }
			this.getRoomList();
			this.teacherList = [];
			this.assistList = [];
			this.classTeacherList = [];
			this.classDetailShow = false;
			this.checkData = [];

            if(val) {
				this.changeOfficeIdGetPeople(val)
                // this.classTeacherRemote();
                // this.teacherRemote();
                // this.assistRemote();
            }
			this.reSetData();
		},
		repeatSetData() {
			//课次重置
			this.formValidate.regularJson = "";
			this.regularJson1 = [];
			// this.ClassDate = false;
			// this.columns2datas1 = [];
			if (!this.checkData.name) {
				this.formValidate.regular = null;
				this.formValidate.dateRangeTime = [];
				this.$Message.error("请选择课程");
				return;
			}
			if (
				this.formValidate.dateRangeTime[0] &&
				this.formValidate.regular
			) {
				this.$refs["classRuleTableRef"].EimtaddData();
			}
		},
		startDateChange0(val) {
			// debugger;
			this.formValidate.dateRangeTime = val;
			this.formValidate.startDate = this.formValidate.dateRangeTime[0];
			this.formValidate.endDate = this.formValidate.dateRangeTime[1];
			if (
				this.formValidate.dateRangeTime[0] &&
				this.formValidate.regular
			) {
				this.$refs["classRuleTableRef"].EimtaddData();
			}
		},
		startDateChange(val) {
			// debugger;
			this.formValidate.dateRangeTime = val;
			this.formValidate.startDate = this.formValidate.dateRangeTime[0];
			this.formValidate.endDate = this.formValidate.dateRangeTime[1];
			// this.repeatSetData();
		},
		regularChange0() {
			if (
				this.formValidate.dateRangeTime[0] &&
				this.formValidate.regular
			) {
				this.$refs["classRuleTableRef"].EimtaddData();
			}
			this.ClassDate = false;
			this.columns2datas1 = [];
		},
		regularChange(val) {
			// debugger
			//课次重置
			if (val) {
				this.repeatSetData();
			}
		},
		classChange(val) {
			this.classChangeval = true;
		},
		chooseDetailMethod(checkData) {
			// debugger;
            // console.log(checkData)
			this.classDetailShow = true;
			this.checkData = checkData;
			this.formValidate.grade = this.checkData.grade;
			this.gradeChange(checkData.grade)
			this.repeatSetData();
		},
		showClassBtn() {
			if (!this.formValidate.officeId) {
				this.$Message.error("请选择所属校区");
				return;
			}
			this.$refs.classShowTipRef.classShowMethods();
			this.$refs.classShowTipRef.baseTableList();
		},
		okModify(val) {
			// debugger;
			if (
				val.classroomIdType == 2 ||
				val.teacherIdType == 2 ||
				val.assistIdType == 2 ||
				val.classTeacherIdType == 2
			) {
				if (this.$route.query.lessonId) {
					this.classData.teacherId = val.teacherId;
					this.classData.assistId = val.assistId;
					this.classData.classTeacherId = val.classTeacherId;
					this.classData.classroomId = val.classroomId;
				} else {
					this.formValidate.teacherId = val.teacherId;
					this.formValidate.assistId = val.assistId;
					this.formValidate.classTeacherId = val.classTeacherId;
					this.formValidate.classroomId = val.classroomId;
				}
				//判断是冲突或者和是异常 是异常重新排课  冲突就只改当前的列
				this.lookConflict();
			} else {
				typeof val.assistName == "object" && val.assistName != null
					? (this.columns2datas1[val._index].assistName =
							val.assistName.label)
					: "";
				this.columns2datas1[val._index].assistId = val.assistId;
				this.columns2datas1[val._index].assistIdConflict =
					val.assistIdConflict;

				typeof val.teacherName == "object"
					? (this.columns2datas1[val._index].teacherName =
							val.teacherName.label)
					: "";
				this.columns2datas1[val._index].teacherId = val.teacherId;
				this.columns2datas1[val._index].teacherIdConflict =
					val.teacherIdConflict;

				typeof val.classTeacherName == "object"
					? (this.columns2datas1[val._index].classTeacherName =
							val.classTeacherName.label)
					: "";
				this.columns2datas1[val._index].classTeacherId =
					val.classTeacherId;
				this.columns2datas1[val._index].classTeacherIdConflict =
					val.classTeacherIdConflict;

				typeof val.classroomName == "object"
					? (this.columns2datas1[val._index].classroomName =
							val.classroomName.label)
					: "";
				this.columns2datas1[val._index].classroomId = val.classroomId;
				this.columns2datas1[val._index].classroomIdConflict =
					val.classroomIdConflict;
				this.checkConflict();
				return;
			}
		},
		lookConflict() {
            // 开始排课、重新排课
			let obj, errornum = 0;
			if (this.$route.query.lessonId) {
				if (!this.formValidate.dateRangeTime[0]) {
					this.$Message.error("请先选择上课日期");
					return;
				}
				if (!this.formValidate.regularJson) {
					this.$Message.error("请先选择排课规则");
					return;
                }
				obj = {
					classroomId: this.classData.classroomId,
					teacherId: this.classData.teacherId,
					assistId: this.classData.assistId,
					classTeacherId: this.classData.classTeacherId,
					startDate: this.formValidate.startDate,
					endDate: this.formValidate.endDate,
					regular: this.formValidate.regular,
					regularJson: JSON.stringify(this.formValidate.regularJson),
					courseHour:
						Number(this.classData.courseHour) + Number(this.classData.expandHour || 0) - Number(this.classData.arrangedHour),
					// courseHour: this.classData.num,
					courseUnitHour: this.classData.courseUnitHour,
                    courseUnitMinute: this.classData.courseUnitMinute,
                    expandHour: this.classData.expandHour || 0,
				};
				if (!this.classData.courseUnitHour||!this.classData.courseUnitMinute) {
					this.$Message.error("课程有问题,不能生成排课");
					return;
				}
			} else {
				if (!this.formValidate.dateRangeTime[0]) {
					this.$Message.error("请先选择上课日期");
					return;
				}
				if (!this.formValidate.regularJson) {
					this.$Message.error("请先选择排课规则");
					return;
				} else if (!this.formValidate.teacherId) {
					this.$Message.error("请先选择授课教师");
					return;
				} else if (!this.formValidate.classTeacherId) {
					this.$Message.error("请先选择服务OO");
					return;
				} else if (!this.formValidate.classroomId) {
					this.$Message.error("请先选择授课教室");
					return;
				} else if (this.$refs["classRuleTableRef"].getisEdit()) {
					this.$Message.error("请先保存当前操作");
					return;
                }

                // 判断排课规则是否正确
                if(this.formValidate.regularJson && this.formValidate.regularJson.length) {
                        this.formValidate.regularJson.forEach(item => {
                            if(this.formValidate.regular == 'per week' || this.formValidate.regular == 'interval week') {
                                // 每周和隔周
                                if(!item.week) {
                                    this.$Message.error("请完善排课规则");
                                    errornum++;
                                    return;
                                }
                            }
                            if(!item.hours || !item.startTime || !item.endTime) {
                                this.$Message.error("请完善排课规则");
                                errornum++;
                                return;
                            }
                        });

                } else {
                    this.$Message.error("请先选择排课规则");
					return;
                }

                if(errornum > 0) {
                    return;
                }

				obj = {
					classroomId: this.formValidate.classroomId,
					teacherId: this.formValidate.teacherId,
					assistId: this.formValidate.assistId,
					classTeacherId: this.formValidate.classTeacherId,
					startDate: this.formValidate.startDate,
					endDate: this.formValidate.endDate,
					regular: this.formValidate.regular,
					regularJson: JSON.stringify(this.formValidate.regularJson),
					courseHour: this.checkData.num,
					courseUnitMinute: this.checkData.duration,
                    expandHour: this.formValidate.expandHour || 0,
					courseUnitHour: this.checkData.singleNum || 0
				};
				if (!this.checkData.duration||!this.checkData.singleNum) {
					this.$Message.error("课程有问题,不能生成排课");
					return;
				}
            }

			this.updateLoadingStatus({
				isLoading: true
            });
            // 需要判断是第一次排课、还是重新排课
            if(this.$route.query.id) {
                // 传了id，则是重新排课
                let _params = Object.assign({
                    classCourseId: this.$route.query.id
                }, obj);
                jwLesson.reGenerateLessonByClass(_params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.lookConflictCallBack(res, obj);
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            } else {
                jwLesson.generateLessonByClass(obj)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.lookConflictCallBack(res, obj);
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            }
        },
        lookConflictCallBack(res, obj) {
            this.isActioning = false;
            this.checkMyData = res.data.data;
            this.checkMyData.filter((item, index) => {
                return (item.code = index + 1);
            });
            this.columns2datas1 = this.checkMyData;
            if(obj) {
                this.formValidateCopy = Object.assign(this.formValidateCopy, obj);
                this.formValidateCopy.regularJson = JSON.parse(this.formValidateCopy.regularJson)
            }
            this.checkConflict();
        },
		checkConflict() {
			// debugger;
			this.updateLoadingStatus({
				isLoading: true
			});
			let columns2datas1 = [].concat(this.columns2datas1);
			if(columns2datas1){
				columns2datas1.forEach(item => {
					//处理请求异常
					delete item.assistIdConflict;
					delete item.teacherIdConflict;
					delete item.classTeacherIdConflict;
					delete item.classroomIdConflict;
				});
			}
			let objs = {
				startDate: this.formValidate.startDate,
				endDate: this.formValidate.endDate,
				jwLessonList: columns2datas1
			};
			this.formValidate.id ? (objs.classId = this.formValidate.id) : "";
			// console.log(objs);
			jwLesson
				.checkConflict(objs)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.checkConflictData = res.data.data;
						this.conflictDomChangeColorFn();
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		cancelHandle() {
			this.$router.push({
				name: "jw.classManageList",
			});
		},
		saveHandle() {
			if (!this.formValidate.startDate) {
				this.formValidate.dateRangeTime = [];
			}
			this.$refs["formValidate"].validate(validres => {
				if (validres) {
                    if(JSON.stringify(this.formValidateCopy) != '{}') {
                        // 修改的时候，才有 formValidateCopy， 新增为空对象
                        // 排课之后，formValidateCopy不再是空对象
                        /**
                          需要重新排课的情况
                          1.修改了 教室 、授课老师、服务OO、助教
                          2.上课日期
                          3.规律排课
                          4.上课规则
                         */
                        if (this.$route.query.id) {
                            let num = 0, errornum = 0;
                            if(this.formValidate.classroomId != this.formValidateCopy.classroomId) num++;
                            if(this.formValidate.teacherId != this.formValidateCopy.teacherId) num++;
                            if(this.formValidate.assistId != this.formValidateCopy.assistId) num++;
                            if(this.formValidate.classTeacherId != this.formValidateCopy.classTeacherId) num++;
                            if(this.formValidate.endDate != this.formValidateCopy.endDate) num++;
                            if(this.formValidate.startDate != this.formValidateCopy.startDate) num++;
                            if(this.formValidate.regular != this.formValidateCopy.regular) num++;
                            if(JSON.stringify(this.formValidate.regularJson) != JSON.stringify(this.formValidateCopy.regularJson)) num++;

                            // 判断排课规则是否正确
                            if(this.formValidate.regularJson && this.formValidate.regularJson.length) {
                                    this.formValidate.regularJson.forEach(item => {
                                        if(this.formValidate.regular == 'per week' || this.formValidate.regular == 'interval week') {
                                            // 每周和隔周
                                            if(!item.week) {
                                                this.$Message.error(this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2717'));
                                                errornum++;
                                                return;
                                            }
                                        }
                                        if(!item.hours || !item.startTime || !item.endTime) {
                                            this.$Message.error(this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2717'));
                                            errornum++;
                                            return;
                                        }
                                    });

                            } else {
                                this.$Message.error(this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2718'));
                                return;
                            }

                            if(errornum > 0) {
                                return;
                            }

                            if(num > 0) {
                                this.$Message.error(this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2719'));
                                this.updateLoadingStatus({ isLoading: false });
                                return;
                            }
                        }
                    } else {
                        this.$Message.error(this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2720'));
                        this.updateLoadingStatus({ isLoading: false });
                        return;
                    }
					if(this.checkConflictData.flag) {
                        this.$Message.error(this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2721'));
                        this.updateLoadingStatus({isLoading: false});
                        return;
                    }
					if(this.isActioning){ //多次提交拦截
						return
					}
                    this.isActioning = true

                    let params = Object.assign({}, this.formValidate)

					if (this.$route.query.type == 3) {
						params.jwClassShareList = [];
						params.shareArea.filter(item => {
							params.jwClassShareList.push({
								isJoin: "2",
								office: {
									id: item
								}
							});
						});
						params.isShare = "1";
					}
					params.allocType = "class course";
					params.jwLessonList =
						(this.columns2datas1 && this.columns2datas1.length > 0)
							? this.columns2datas1
							: this.formValidate.jwLessonList;
					// params.jwLessonList.filter(item => {
					// 	delete item.id;
                    // });
                    // console.log(this.regularJson1, this.formValidate.regularJson)
                    params.regularJson = this.regularJson1 && this.regularJson1.length ?
                        JSON.stringify(this.regularJson1) :
                        JSON.stringify(this.formValidate.regularJson)
					// if(this.$route.query.lessonId){
					// 	this.formValidate.classId = this.$route.query.lessonId;
					// }else{
					params.office = { id: this.formValidate.officeId };
					params.courseId = this.checkData.id;
					params.type = this.grade_type;
					params.courseHour = this.checkData.num;
					params.courseUnitMinute = this.checkData.duration;
					params.courseUnitHour = this.checkData.singleNum;
					params.expandHour = this.formValidate.expandHour || 0; // 延补课时

					// }
					//提交数据
					// alert(this.formValidate.dateRangeTime[0]);

					// this.formValidate.startDate = this.formValidate.dateRangeTime[0];
					// this.formValidate.endDate = this.formValidate.dateRangeTime[1];
					if (!params.startDate) {
						params.dateRangeTime = [];
					}
					if (!params.id) {
						delete params.id;
					}
					// debugger
                    let type = 'single'
					let obj = {};
					if (this.$route.query.lessonId) {
						if (!this.classData.courseUnitHour||!this.classData.courseUnitMinute) {
                            this.$Message.error(this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2722'));
                            this.isActioning = false
							return;
                        }
                        type = 'minute'
						obj.startDate = this.formValidate.startDate;
						obj.endDate = this.formValidate.endDate;
						obj.classId = this.$route.query.lessonId;
						obj.jwLessonList = this.columns2datas1;
					} else {
						if (!this.checkData.duration||!this.checkData.singleNum) {
                            this.$Message.error(this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2722'));
                            this.isActioning = false
							return;
                        }
                        obj = Object.assign({}, params);
                        // if(this.onlyChangeclassAndTeacher) {
                        //     delete params.jwLessonList
                        // }

                        // 如果没有修改影响排课信息的项，删除 jwLessonList 字段
                        // if(JSON.stringify(this.initFormValidate) != '{}') {
                        //     let deleteNum = 0;
                        //     if(this.formValidate.classroomId != this.initFormValidate.classroomId) deleteNum++;
                        //     if(this.formValidate.teacherId != this.initFormValidate.teacherId) deleteNum++;
                        //     if(this.formValidate.assistId != this.initFormValidate.assistId) deleteNum++;
                        //     if(this.formValidate.classTeacherId != this.initFormValidate.classTeacherId) deleteNum++;
                        //     if(this.formValidate.endDate != this.initFormValidate.endDate) deleteNum++;
                        //     if(this.formValidate.startDate != this.initFormValidate.startDate) deleteNum++;
                        //     if(this.formValidate.regular != this.initFormValidate.regular) deleteNum++;
                        //     if(JSON.stringify(this.formValidate.regularJson) != JSON.stringify(this.initFormValidate.regularJson)) deleteNum++;
                        //     console.log(deleteNum)
                        //     if(deleteNum === 0) {
                        //         delete obj.jwLessonList
                        //     }
                        // }
					}
                    this.updateLoadingStatus({isLoading: true});
                    if(type == 'single') {
						obj.assistId = obj.assistId ? obj.assistId : '' // 防止不传assistId，为空也得传
                        jwClassCourse.save(obj).then(valid.call(this)).then(res => {
                            console.log(res)
                            if (res.ok) {
                                this.saveCallBack(res)
                            } else {
                                // 保存的时候，排课冲突
                                if(res.data.statusCode == '7000') {
                                    this.saveErrorCallBack(res)
                                }
                            }
                        }).catch(errors.call(this))
                        .finally(() => {
                            this.updateLoadingStatus({isLoading: false});
                            setTimeout(()=>{
                                //多次提交拦截
                                this.isActioning = false
                            },200)
                        });
                    } else {
                        console.log(obj)
                        jwLesson.saveBatch(obj).then(valid.call(this)).then(res => {
                            if (res.ok) {
                                this.saveCallBack(res)
                            } else {
                                // 保存的时候，排课冲突
                                if(res.data.statusCode == '7000') {
                                    this.saveErrorCallBack(res)
                                }
                            }
                         }).catch(errors.call(this))
                        .finally(() => {
                            this.updateLoadingStatus({isLoading: false});
                            setTimeout(()=>{
                                //多次提交拦截
                                this.isActioning = false
                            },200)
                        });
                    }
				} else {
					this.$Message.error(this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2723'));
				}
			});
        },
        saveCallBack(res) {
            this.$Message.success(res.data.message);
            this.closeTag(this.$route)
            if (this.$route.name == "jw.shareClass") {
                //共享开班保存跳转
                this.$router.push({
                    name: "jw.classManageList",
                    params: {
                        from: "shareClass",
                        officeId: this.formValidate.officeId
                    }
                });
            } else {
                if (this.$route.query.lessonId) {
                    // this.$router.push({
                    //     name: "jw.classManage.sortClass",
                    //     query: {
                    //         id: this.$route.query.lessonId
                    //     }
					// });
					this.$router.push({
                        name: "jw.classManageList",
                        params: {
                            from: "createClass",
                            officeId: this.formValidate.officeId
                        }
                    });
                } else {
                    this.$router.push({
                        name: "jw.classManageList",
                        params: {
                            from: "createClass",
                            officeId: this.formValidate.officeId
                        }
                    });
                }
            }
        },
        saveErrorCallBack(res) {
            // let _data = res.data.data
            // if(_data && _data.length) {
            //     this.checkMyData = _data;
            //     this.checkMyData.filter((item, index) => {
            //         return (item.code = index + 1);
            //     });
            //     this.columns2datas1 = this.checkMyData;
            // }
            // this.lookConflict();
        },
	},
	watch: {
		$route(to, from, next) {
			if(this.$route.name == 'jw.createClass'){
				this.tabRoute();
				if (to.query.id) {
					this.classGetData({
						id: to.query.id
					});
				}
			}
		}
	}
};
</script>
