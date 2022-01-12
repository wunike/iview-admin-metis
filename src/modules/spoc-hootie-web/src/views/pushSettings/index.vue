<style lang="less">
.push-settings-container {
	height: 100%;
	width: 100%;
	.approval {
		position: relative;
		color: #495060;
		padding-left: 12px;
		&::before {
			position: absolute;
			display: block;
			content: "";
			width: 4px;
			height: 4px;
			border-radius: 50%;
			left: 0;
			top: 4px;
		}
	}
	.approval-1 {
		.approval;
		&::before {
			background: #999;
		}
	}
	.approval-2 {
		.approval;
		&::before {
			background: #46bc15;
		}
	}
	.mytable {
		margin-top: 10px;
		width: 100%;
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		padding: 0 16px;
	}
}
.new-temp-container {
	.ivu-modal-footer .ivu-btn-text {
		border: 1px solid rgb(220, 222, 226);
	}
	.ivu-modal-footer .ivu-btn-text:hover {
		border: 1px solid rgb(220, 222, 226);
	}
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
	.ivu-form-item-label {
		font-size: 14px;
		color: rgba(153, 153, 153, 1) !important;
	}
	.ivu-form-item {
		margin-bottom: 0;
	}
	.ivu-modal-body {
		padding: 0;
	}
	.form-row-line {
		margin-top: 20px;
		color: rgba(153, 153, 153, 1);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		position: relative;
		.tips {
			position: absolute;
			top: 8px;
			left: 0px;
		}
	}
	.nm-header {
		color: #999;
		font-size: 14px;
		padding-left: 24px;
		padding-right: 24px;
		padding-top: 24px;
		b {
			font-weight: normal;
		}
	}
	.form-box {
		padding-left: 24px;
		padding-right: 24px;
	}
	.nm-content {
		padding: 24px;
		background: rgba(242, 243, 247, 1);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
		.nm-item {
			width: 464px;
			border: 1px solid rgba(230, 231, 235, 1);
			border-radius: 4px;
		}
		.nmc-header {
			height: 52px;
			line-height: 52px;
			color: #999;
			font-size: 14px;
			font-weight: 500;
			text-align: center;
			border-bottom: 1px solid rgba(230, 231, 235, 1);
			background: rgba(247, 248, 250, 1);
			span {
				font-size: 14px;
				font-weight: 900;
				line-height: 52px;
				margin-right: 3px;
			}
		}
		.nmc-item {
			background: #fff;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-start;
			position: relative;
			padding-left: 16px;
			padding-right: 24px;
			padding-bottom: 20px;
			._input {
				position: absolute;
				bottom: 25px;
				right: 25px;
				height: 16px;
				width: 90px;
				text-align: right;
				margin: 0;
				padding: 0;
				font-size: 14px;
				color: rgba(204, 204, 204, 1);
				z-index: 2;
			}
			span {
				display: inline-block;
				text-align: right;
				width: 80px;
				margin-right: 10px;
				font-size: 14px;
				color: rgba(153, 153, 153, 1);
				padding-top: 10px;
			}
		}
	}
}
.exportIng{
    .ivu-modal-body{
        padding-bottom: 35px;
    }
    .ivu-modal-footer{
        display: none;
    }
}
</style>

<template>
	<div class="push-settings-container">
		<vSearchCollapse @search="searchInfo" @reset="resetSearch" @changeDivHeight="changeDivHeight">
			<Input
				v-model="searchBox.tempNo"
				:placeholder="$t('mycourse_viewstucontent_443')"
				style="width: 224px;margin-right:12px;"
			/>
			<Select
				@on-change="selectCourse(searchBox.courseType,'search')"
				:placeholder="$t('courselist_courselist_223')"
				v-model="searchBox.courseType"
				clearable
				style="width:140px;margin-right:12px;"
			>
				<Option
					v-for="item in searchBox.courseTypeList"
					:value="item.value"
					:key="item.id"
				>{{ item.label }}</Option>
			</Select>
			<Select
				:placeholder="$t('messagemanagement_index_355')"
				v-model="searchBox.course"
				clearable
				style="width:140px;margin-right:12px;"
			>
				<Option v-for="item in searchBox.courseList" :value="item.value" :key="item.id">{{ item.label }}</Option>
			</Select>
			<Select
				:placeholder="$t('pushsettings_index_496')"
				v-model="searchBox.status"
				clearable
				style="width:140px;margin-right:12px;"
			>
				<Option
					v-for="item in searchBox.statusList"
					:value="item.value"
					:key="item.value"
				>{{ item.label }}</Option>
			</Select>
		</vSearchCollapse>
		<big-table
			v-if="defaultShowCol"
			class="mytable"
			:tableName="tableTitle"
			:tableData="dataT"
			:pageNo="pageNo"
			:btnList="btnList"
			:tableHeightOut="tableHeightOut"
			:tableColumnArray="columnsT"
			:defaultShowCol="defaultShowCol"
			:canSelection="true"
			:isShowSelectTableColumn="false"
			:dataTotal="dataTotal"
			@selectionChange="selectTableItem"
			@pageChange="pageChange"
		></big-table>
		<Modal
			class="new-temp-container"
			width="1000"
			v-model="showModel"
			:title="modelName"
			:mask-closable="false"
			@on-cancel="cancelScore"
		>
			<Form
				ref="form"
				:rules="ruleCustom"
				class="form-box"
				:model="form"
				label-position="right"
				:label-width="110"
			>
				<div class="form-row-line">
					<Poptip class="tips" placement="bottom-start" width="200" trigger="hover">
						<i class="iconfont icon-tishi" style="margin-right:3px;color: #999999;font-size:12px;"></i>
						<div slot="content">
							<p>{{$t('pushsettings_index_497')}}</p>
							<p>{{$t('pushsettings_index_498')}}</p>
							<p>{{$t('pushsettings_index_499')}}</p>
							<p>{{$t('pushsettings_index_500')}}</p>
							<p>{{$t('pushsettings_index_501')}}</p>
						</div>
					</Poptip>
					<FormItem
						:label="$t('pushsettings_index_502')"
						prop="code"
						:rules="{required: true, message: $t('pushsettings_index_504'), trigger: 'blur'}"
					>
						<Input
							v-model="form.code"
							:disabled="view"
							:placeholder="$t('pushsettings_index_520')"
							style="width: 340px"
						/>
					</FormItem>
					<FormItem
						:label="$t('pushsettings_index_503')"
						prop="types"
						:rules="{required: true, message: $t('pushsettings_index_504'), trigger: 'change'}"
					>
						<Select
							:disabled="ifEdit||view"
							@on-change="selectCourse(form.types,'myFormOpen')"
							@on-clear="clearCourseAndGrade"
							:placeholder="$t('pushsettings_index_505')"
							v-model="form.types"
							clearable
							style="width:340px;"
						>
							<Option v-for="item in form.typesList" :value="item.value" :key="item.id">{{ item.label }}</Option>
						</Select>
					</FormItem>
				</div>
				<div class="form-row-line" style="margin-bottom: 20px">
					<FormItem
						:label="$t('messagemanagement_components_infos_322')"
						prop="grade"
						:rules="{required: true,   message: $t('pushsettings_index_507'), trigger: 'change'}"
					>
						<Select
							:placeholder="$t('pushsettings_index_505')"
							:disabled="ifEdit||view"
							@on-change="getCourse"
							@on-clear="clearCourse"
							v-model="form.grade"
							clearable
							style="width:340px;"
						>
							<Option v-for="item in form.gradeList" :value="item.value" :key="item.id">{{ item.label }}</Option>
						</Select>
					</FormItem>
					<FormItem
						:label="$t('pushsettings_index_508')"
						prop="course"
						:rules="{required: true,type:'number',  message: $t('pushsettings_index_507'), trigger: 'change'}"
					>
						<Select
							:placeholder="$t('pushsettings_index_505')"
							:disabled="ifEdit||view"
							v-model="form.course"
							clearable
							style="width:340px;"
						>
							<Option
								v-for="item in form.courseLists"
								:value="item.value"
								:key="item.value"
							>{{ item.label }}</Option>
						</Select>
					</FormItem>
				</div>
			</Form>
			<div class="nm-content">
				<div class="nm-item">
					<div class="nmc-header">
						<span>·</span>English Version
					</div>
					<div class="nmc-item" style="padding-top:26px;">
						<span>Course Materials：</span>
						<Input
							v-model="EV.cm"
							type="textarea"
							style="width:324px;"
							:readonly="view"
							:maxlength="1000"
							@keyup.native="setLimit(1000,EV.cm,'EV.cm',0)"
							@on-blur="clearSpace(EV.cm,'EV.cm')"
							:autosize="{minRows: 3,maxRows: 3}"
							placeholder="Please input the information of Course Materials(Limit to 1000 characters or less)"
						></Input>
					</div>
					<div class="nmc-item">
						<span>Target Objectives：</span>
						<Input
							v-model="EV.to"
							type="textarea"
							style="width:324px;"
							:maxlength="1000"
							:readonly="view"
							@on-blur="clearSpace(EV.to,'EV.to')"
							@keyup.native="setLimit(1000,EV.to,'EV.to',0)"
							:autosize="{minRows: 3,maxRows: 3}"
							placeholder="Please input the information of Target Objectives(Limit to 1000 characters or less)"
						></Input>
					</div>
					<div class="nmc-item">
						<span>Classwork：</span>
						<Input
							v-model="EV.cw"
							type="textarea"
							style="width:324px;"
							:maxlength="1000"
							:readonly="view"
							@on-blur="clearSpace(EV.cw,'EV.cw')"
							@keyup.native="setLimit(1000,EV.cw,'EV.cw',0)"
							:autosize="{minRows: 3,maxRows: 3}"
							placeholder="Please input the information of ClassWork(Limit to 1000 characters or less)"
						></Input>
					</div>
					<div class="nmc-item" style="padding-bottom:28px;">
						<span>Homework：</span>
						<Input
							v-model="EV.hw"
							type="textarea"
							style="width:324px;"
							:maxlength="1000"
							:readonly="view"
							@on-blur="clearSpace(EV.hw,'EV.hw')"
							@keyup.native="setLimit(1000,EV.hw,'EV.hw',0)"
							:autosize="{minRows: 3,maxRows: 3}"
							placeholder="Please input the information of HomeWork(Limit to 1000 characters or less)"
						></Input>
					</div>
				</div>
				<div class="nm-item">
					<div class="nmc-header">
						<span>·</span>
						{{$t('mycourse_viewstucontent_458')}}
					</div>
					<div class="nmc-item" style="padding-top:26px;">
						<span>{{$t('mycourse_viewstucontent_448')}}</span>
						<Input
							v-model="CN.cm"
							style="width:324px;"
							:maxlength="1000"
							:readonly="view"
							@on-blur="clearSpace(CN.cm,'CN.cm')"
							@keyup.native="setLimit(1000,CN.cm,'CN.cm',1)"
							type="textarea"
							:autosize="{minRows: 3,maxRows: 3}"
							:placeholder="$t('pushsettings_index_511')"
						></Input>
					</div>
					<div class="nmc-item">
						<span>{{$t('mycourse_viewstucontent_449')}}</span>
						<Input
							v-model="CN.to"
							style="width:324px;"
							:maxlength="1000"
							:readonly="view"
							@on-blur="clearSpace(CN.to,'CN.to')"
							@keyup.native="setLimit(1000,CN.to,'CN.to',1)"
							type="textarea"
							:autosize="{minRows: 3,maxRows: 3}"
							:placeholder="$t('pushsettings_index_513')"
						></Input>
					</div>
					<div class="nmc-item">
						<span>{{$t('mycourse_viewstucontent_450')}}</span>
						<Input
							v-model="CN.cw"
							style="width:324px;"
							:maxlength="1000"
							:readonly="view"
							@on-blur="clearSpace(CN.cw,'CN.cw')"
							@keyup.native="setLimit(1000,CN.cw,'CN.cw',1)"
							type="textarea"
							:autosize="{minRows: 3,maxRows: 3}"
							:placeholder="$t('pushsettings_index_515')"
						></Input>
					</div>
					<div class="nmc-item" style="padding-bottom:28px;">
						<span>{{$t('mycourse_viewstucontent_451')}}</span>
						<Input
							v-model="CN.hw"
							style="width:324px;"
							:maxlength="1000"
							:readonly="view"
							@on-blur="clearSpace(CN.hw,'CN.hw')"
							@keyup.native="setLimit(1000,CN.hw,'CN.hw',1)"
							type="textarea"
							:autosize="{minRows: 3,maxRows: 3}"
							:placeholder="$t('pushsettings_index_517')"
						></Input>
					</div>
				</div>
			</div>
			<div slot="footer">
				<Button v-if="view" @click="back">{{$t('classroom_exchange_105')}}</Button>
				<Button v-if="!view" @click="cancelScore">{{$t('classroom_clock_87')}}</Button>
				<Button v-if="!view" type="primary" @click="submitScore">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
		<export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
		<Modal v-model="modal3" width="400" class="exportIng" :closable="false" :mask-closable="false">
			<div>
				<div class="ivu-modal-confirm">
					<div class="ivu-modal-confirm-head">
						<div class="ivu-modal-confirm-head-icon ivu-modal-confirm-head-icon-info">
								<i class="ivu-icon ivu-icon-ios-information-circle"></i>
						</div>
						<div class="ivu-modal-confirm-head-title">{{$t('modules_spoc_crm_web_src_views_activityenrollment_index_761')}}</div>
					</div>
					<div class="ivu-modal-confirm-body">
						<div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_index_762')}}</div>
					</div>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script>
/**
 **@date: 2019/6/18 10:18
 **@author: lizhi
 **
 */
import vSearchCollapse from "@public/modules/vSearchCollapse";
import bigTable from "@public/modules/bigTable.vue";
import exportModal from "@public/modules/exportModal.vue";
import valid, {
	errors,
	sysUser,
	jxCourseTpl,
	sysDict
} from "../../libs/request";
import { mapMutations } from "vuex";
export default {
	name: "hootie.pushSettings",
	data() {
		const number = (rule, value, callback) => {
			let va = value.replace(/^\s*/g, "");
			if (va === "") {
				callback(new Error(this.$t("pushsettings_index_507")));
			} else if (!/^([1-9][0-9]{0,1}|100)$/.test(value)) {
				return callback(new Error(this.$t("pushsettings_2")));
			} else {
				callback();
			}
		};
		return {
			modal3: false,
			view: false,
			tableHeightOut: 72, //324,
			modelName: "",
			showSelectImg: false,
			showImgs: false,
			form: {
				code: "",
				types: "",
				typesList: [],
				grade: "",
				gradeList: [],
				course: "",
				courseLists: []
			},
			EV: {
				cm: "",
				to: "",
				cw: "",
				hw: ""
			},
			CN: {
				cm: "",
				to: "",
				cw: "",
				hw: ""
			},
			ruleCustom: {
				course: [{ required: true, validator: number, trigger: "blur" }]
			},
			showModel: false,
			tableTitle: this.$t("pushsettings_3"),
			searchBox: {
				tempNo: "",
				courseType: "",
				courseTypeList: [],
				course: "",
				courseList: [],
				gradeArr: [],
				status: "",
				statusList: [
					{ value: "1", label: this.$t("scoretemplate_scoretemplate_559") },
					{ value: "0", label: this.$t("scoretemplate_scoretemplate_558") }
				]
			},
			defaultShowCol: null,
			exportMethod: jxCourseTpl.export,
			btnList: [
				{
					style: {},
					type: "",
					btnClick: this.showNewTemp,
					text: this.$t("pushsettings_6")
				},
				{
					style: {},
					type: "",
					btnClick: this.showImport,
					text: this.$t("hootie.importStarTemplate")
				},
				[
					{
						style: {},
						type: "",
						btnClick: this.isExport,
						text: this.$t("integralflow_4"),
						value: "1",
						parentName: this.$t("integralflow_5")
					},
					{
						style: {},
						type: "",
						btnClick: this.isExport,
						text: this.$t("integralflow_6"),
						value: "2",
						parentName: this.$t("integralflow_5")
					}
				]
			],
			selectedIds: [], //选中的ids
			currentIds: [], //当前页的ids
			pageNo: 1,
			dataTotal: 0, //总数
			pageSize: this.$store.state.app.pageSizeGlobal,
			params: {},
			columnsT: [
				{
					title: this.$t("mycourse_viewstucontent_443"),
					key: "no",
					minWidth: 100
				},
				{
					title: this.$t("courselist_courselist_223"),
					key: "courseType",
					minWidth: 100,
					tooltip: true
				},
				{
					title: this.$t("messagemanagement_index_355"),
					key: "courseGrade",
					minWidth: 100,
					tooltip: true
				},

				{
					title: this.$t("pushsettings_index_496"),
					key: "status",
					minWidth: 100,
					tooltip: true,
					render: (h, params) => {
						return h(
							"span",
							{
								class:
									params.row.status === "0"
										? "approval-1"
										: params.row.status === "1"
										? "approval-2"
										: ""
							},
							params.row.status === "0"
								? this.$t("scoretemplate_scoretemplate_558")
								: params.row.status === "1"
								? this.$t("scoretemplate_scoretemplate_559")
								: ""
						);
					}
				},
				{
					title: this.$t("startemplate_index_577"),
					key: "updateByName",
					minWidth: 100,
					tooltip: true
				},
				{
					title: this.$t("startemplate_index_578"),
					key: "updateDate",
					minWidth: 100,
					tooltip: true
				},
				{
					title: this.$t("scoretemplate_scoretemplate_569"),
					key: "createByName",
					minWidth: 100
				},
				{
					title: this.$t("scoretemplate_scoretemplate_556"),
					key: "createDate",
					minWidth: 100,
					tooltip: true
				},
				{
					title: this.$t("classlist_compontents_detailinfo_45"),
					key: "doAction",
					minWidth: 150,
					render: (h, params) => {
						let _this = this;
						return h("div", [
							h(
								"a",
								{
									props: {
										type: "text",
										size: "small"
									},
									style: {
										color:
											_this.isAdmin ||
											_this.isAdmin == params.row.isAdmin
												? ""
												: "#999",
										cursor:
											_this.isAdmin ||
											_this.isAdmin == params.row.isAdmin
												? "pointer"
												: "default",
										"margin-right": "12px",
										display: "inline-block"
									},
									on: {
										click: () => {
											if (
												_this.isAdmin ||
												_this.isAdmin ==
													params.row.isAdmin
											) {
												this.ableOrUnable(
													params.row.id,
													params.row.status
												);
											}
										}
									}
								},
								params.row.status === "0"
									? this.$t("scoretemplate_scoretemplate_559")
									: params.row.status === "1"
									? this.$t("scoretemplate_scoretemplate_558")
									: ""
							),
							h(
								"a",
								{
									props: {
										type: "text",
										size: "small"
									},
									style: {
										color:
											_this.isAdmin ||
											_this.isAdmin == params.row.isAdmin
												? ""
												: "#999",
										cursor:
											_this.isAdmin ||
											_this.isAdmin == params.row.isAdmin
												? "pointer"
												: "default",
										"margin-right": "12px",
										display: "inline-block"
									},
									on: {
										click: () => {
											if (
												_this.isAdmin ||
												_this.isAdmin ==
													params.row.isAdmin
											) {
												this.showNewTemp({
													id: params.row.id,
													key: 1
												});
											}
										}
									}
								},
								this.$t("classroom_allscore_51")
							),
							h(
								"a",
								{
									props: {
										type: "text",
										size: "small"
									},
									style: {
										color:
											_this.isAdmin ||
											params.row.isAdmin == 1
												? ""
												: "#999",
										cursor:
											_this.isAdmin ||
											params.row.isAdmin == 1
												? "pointer"
												: "default",
										"margin-right": "12px",
										display: "inline-block"
									},
									on: {
										click: () => {
											if (
												_this.isAdmin ||
												params.row.isAdmin == 1
											) {
												this.view = true;
												this.showNewTemp({
													id: params.row.id,
													key: 2
												});
											}
										}
									}
								},
								this.$t("courselist_compontents_servicecontent_219")
							),
							h(
								"a",
								{
									props: {
										type: "text",
										size: "small"
									},
									style: {
										color:
											(_this.isAdmin ||
												_this.isAdmin ==
													params.row.isAdmin) &&
											params.row.status == "0"
												? ""
												: "#999",
										cursor:
											(_this.isAdmin ||
												_this.isAdmin ==
													params.row.isAdmin) &&
											params.row.status == "0"
												? "pointer"
												: "default",
										display: "inline-block"
									},
									on: {
										click: () => {
											if (
												(_this.isAdmin ||
													_this.isAdmin ==
														params.row.isAdmin) &&
												params.row.status == "0"
											) {
												let val = params.row.no;
												this.$Modal.confirm({
													title:
														"<p>" +
														this.$t(
															"pushsettings_21"
														) +
														'<span style="color:#FAAD14;">' +
														this.$t(
															"pushsettings_22"
														) +
														val +
														"</span>" +
														this.$t(
															"pushsettings_23"
														) +
														"</p>",
													content:
														'<p style="color:#495060;font-size:14px;">' +
														this.$t(
															"pushsettings_24"
														) +
														val +
														this.$t(
															"pushsettings_25"
														) +
														"</p>",
													onOk: () => {
														this.delete(
															params.row.id
														);
													}
												});
											}
										}
									}
								},
								this.$t("classlist_compontents_detailinfo_46")
							)
						]);
					}
				}
			],
			dataT: [],
			cols: {
				false: [
					{
						name: "no",
						title: this.$t("mycourse_viewstucontent_443"),
						selected: true,
						required: true,
						sort: 0
					},
					{
						name: "courseType",
						title: this.$t("courselist_courselist_223"),
						selected: true,
						required: true,
						sort: 0
					},

					{
						name: "courseGrade",
						title: this.$t("messagemanagement_index_355"),
						selected: true,
						required: true,
						sort: 0
					},
					{
						name: "lesson",
						title: this.$t("classlist_classlist_7"),
						selected: true,
						required: true,
						sort: 0
					},
					{
						name: "createByName",
						title: this.$t("scoretemplate_scoretemplate_569"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "status",
						title: this.$t("pushsettings_index_496"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "updateByName",
						title: this.$t("startemplate_index_577"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "updateDate",
						title: this.$t("startemplate_index_578"),
						selected: true,
						required: false,
						sort: 0
					},
					{
						name: "createDate",
						title: this.$t("scoretemplate_scoretemplate_556"),
						selected: true,
						required: false,
						sort: 0
					}
				],
				true: []
			},
			open: true,
			type: "",
			editId: "",
			ifEdit: false,
			isAdmin: null
		};
	},
	components: {
		vSearchCollapse,
		bigTable,
		exportModal
	},
	created() {},
	mounted() {
		this.loginer();
		this.getShowTitle();
		this.getBelongCourseType();
		this.getLists();
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		loginer() {
			sysUser
				.userInfoData()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						//                       console.log(res.data.data.admin)
						this.isAdmin = res.data.data.admin;
					}
				})
				.catch(errors.call(this));
		},
		changeDivHeight(height) {
			this.tableHeightOut = height;
		},
		clearCourseAndGrade() {
			this.form.courseLists = [];
			this.form.gradeList = [];
			this.form.course = "";
		},
		clearCourse() {
			this.form.courseLists = [];
			this.form.course = "";
		},
		clearSpace(val, obj) {
			let a = obj.split(".")[0];
			let b = obj.split(".")[1];
			let str = val;
			str = str.replace(/\s+/g, "");
			if (str.length < 1) {
				this[a][b] = "";
			}
		},
		courseName(val) {
			let value = val == undefined ? "" : val;
			return value;
		},
		getGradeName(val) {
			let name = "";
			if (val) {
				this.form.gradeList.forEach(item => {
					if (item.value == val) {
						name = item.label;
					}
				});
			}
			return name;
		},
		ableOrUnable(id, status) {
			let param = {
				id: id,
				status: status === "0" ? "1" : "0"
			};
			jxCourseTpl
				.saveStauts(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.getLists();
					}
				})
				.catch(errors.call(this));
		},
		delete(id) {
			let param = { id: id };
			jxCourseTpl
				.deleteById(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.getLists();
					}
				})
				.catch(errors.call(this));
		},
		getForm(id) {
			let param = { id: id };
			jxCourseTpl
				.form(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let data = res.data.data;
						this.form.types = data.courseType;
						this.form.code = data.no;

						this.selectCourse(this.form.types, "myFormOpen");
						this.form.grade = data.courseGrade;
						this.form.courseLists = [];
						let arr = [...Array.from(new Array(100).keys())];
						arr.forEach(item => {
							let obj = {
								value: item,
								label: item
							};
							this.form.courseLists.push(obj);
						});
						this.form.course = Number(data.lesson);
						this.EV.cm = data.courseMaterialsEn;
						this.EV.to = data.targetObjectivesEn;
						this.EV.cw = data.classworkEn;
						this.EV.hw = data.homeworkEn;
						this.CN.cm = data.courseMaterials;
						this.CN.to = data.targetObjectives;
						this.CN.cw = data.classwork;
						this.CN.hw = data.homework;
					}
				})
				.catch(errors.call(this));
		},
		getBelongCourseType() {
			let type = "jw_course_type"; //,jw_course_grade' //课程包分类,适用年级
			sysDict
				.batchListData({
					type
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.searchBox.courseTypeList =
							res.data.data.jw_course_type;
						this.form.typesList = res.data.data.jw_course_type;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});

			sysDict
				.findChildDictByParentDict({
					type
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.searchBox.gradeArr = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		getCourse(val) {
			if (
				this.form.types != "" &&
				this.form.grade != "" &&
				this.form.types != undefined &&
				this.form.grade != undefined
			) {
				let params = {
					courseType: this.form.types,
					courseGrade: this.form.grade
				};
				jxCourseTpl
					.optionalLesson(params)
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							this.form.courseLists = [];
							res.data.data.forEach(item => {
								let obj = {
									value: item,
									label: item
								};
								this.form.courseLists.push(obj);
							});
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({ isLoading: false });
					});
			}
		},
		selectCourse(type, types) {
			this.form.courseLists = [];
			if (type) {
				if (types == "myFormOpen") {
					this.form.gradeList = this.searchBox.gradeArr.filter(
						item => {
							return item.type == type;
						}
					);
				} else if (types == "search") {
					this.searchBox.courseList = this.searchBox.gradeArr.filter(
						item => {
							return item.type == type;
						}
					);
				}
			} else {
				if (types == "myFormOpen") {
					this.form.gradeList = [];
					this.form.grade = "";
				} else if (types == "search") {
					this.searchBox.courseList = [];
					this.searchBox.course = "";
				}
			}
		},
		setLimit(limit, val, obj, lang) {
			if (!lang) {
				let a = obj.split(".")[0];
				let b = obj.split(".")[1];
				//                    let value = val.replace(/^\s$/g,'')
				this[a][b] = val.replace(
					/[^A-Za-z0-9,.?：\/、\\;:\(\)!'"@#\^\$\&\*-=\+\[\]《》_\>\<%\s ]/g,
					""
				);
				if (val.length == limit) {
					this[a][b] = val.replace(
						/[^A-Za-z0-9,.?：\/、\\;:\(\)!'"@#\^\$\&\*-=\+\[\]《》_\>\<%\s ]/g,
						""
					);
					if (this.open) {
						this.open = false;
						this.$Message.warning({
							top: 50,
							duration: 3,
							content: "Limit to" + limit + "characters or less"
						});
						setTimeout(() => {
							this.open = true;
						}, 2000);
					}
				}
			} else {
				if (val.length == limit) {
					if (this.open) {
						this.open = false;
						this.$Message.warning({
							top: 50,
							duration: 3,
							content:
								this.$t("startemplate_index_598") +
								limit +
								this.$t("startemplate_index_599")
						});
						setTimeout(() => {
							this.open = true;
						}, 2000);
					}
				}
			}
		},
		submitScore() {
			this.$refs["form"].validate(valid1 => {
				if (valid1) {
					let parm = {};
					if (this.type == "edit") {
						parm.id = this.editId;
					}
					parm.no = this.form.code;
					jxCourseTpl
						.rptValidateNo(parm)
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								if (res.data.data.isRepeat) {
									this.$Message.warning({
										top: 30,
										duration: 3,
										content: this.$t("pushsettings_301")
									});
								} else {
									if (
										this.EV.cm ||
										this.EV.to ||
										this.EV.cw ||
										this.EV.hw ||
										this.CN.cm ||
										this.CN.to ||
										this.CN.cw ||
										this.CN.hw
									) {
										let param = {};
										param.courseType = this.form.types;
										param.courseGrade = this.form.grade;
										param.lesson = this.form.course;
										param.no = this.form.code;
										param.courseMaterials = this.CN.cm;
										param.courseMaterialsEn = this.EV.cm;
										param.targetObjectives = this.CN.to;
										param.targetObjectivesEn = this.EV.to;
										param.classwork = this.CN.cw;
										param.classworkEn = this.EV.cw;
										param.homework = this.CN.hw;
										param.homeworkEn = this.EV.hw;
										if (this.type == "edit") {
											param.id = this.editId;
										}
										jxCourseTpl
											.save(param)
											.then(valid.call(this))
											.then(res => {
												if (res.ok) {
													this.$Message.success(
														this.$t(
															"pushsettings_29"
														)
													);
													this.getLists();
													this.type = "";
													this.editId = "";
													this.showModel = false;
													this.EV.cm = "";
													this.EV.to = "";
													this.EV.cw = "";
													this.EV.hw = "";
													this.CN.cm = "";
													this.CN.to = "";
													this.CN.cw = "";
													this.CN.hw = "";
													this.$refs[
														"form"
													].resetFields();
												}
											})
											.catch(errors.call(this))
											.finally(() => {
												this.updateLoadingStatus({
													isLoading: false
												});
											});
									} else {
										this.$Message.warning({
											top: 30,
											duration: 3,
											content: this.$t("teachpush_teachpush_661")
										});
									}
								}
							}
						})
						.catch(errors.call(this));
				}
			});
		},
		cancelScore() {
			this.EV.cm = "";
			this.EV.to = "";
			this.EV.cw = "";
			this.EV.hw = "";
			this.CN.cm = "";
			this.CN.to = "";
			this.CN.cw = "";
			this.CN.hw = "";
			if (this.type == "add") {
				this.$refs["form"].resetFields();
			}
			this.view = false;
		},
		back() {
			this.view = false;
			this.showModel = false;
		},
		selectImg() {
			this.showSelectImg = true;
			this.showImgs = false;
		},
		showImgsFn() {
			this.showImgs = true;
		},
		asyncOK() {},
		asyncCancel() {},
		showNewTemp(obj) {
			this.$refs["form"].resetFields();
			this.showModel = true;
			if (obj.key === 1) {
				this.modelName = this.$t("pushsettings_31");
				this.getForm(obj.id);
				this.type = "edit";
				this.editId = obj.id;
				this.ifEdit = true;
			} else if (obj.key === 2) {
				this.modelName = this.$t("pushsettings_2011");
				this.getForm(obj.id);
				this.ifEdit = false;
				this.type = "view";
			} else {
				this.modelName = this.$t("pushsettings_6");
				this.type = "add";
				this.ifEdit = false;
			}
		},
		showImport() {
			this.$router.push({
				name: "hootie.pushSettings.import"
			});
		},
		isExport(val) {
			//这里val的值。是根据设置下拉类型button设定的值来匹配判断
			if (val == "2" && !this.selectedIds.length) {
				this.$Message.error(this.$t("scoretemplate_scoretemplate_572"));
				return;
			}
			this.columnsT.map(item => {
				item.name = item.key;
				if (item.fixed) {
					item.selected = true;
				} else {
					item.selected = false;
				}
			});
			let data = this.columnsT.filter(item => {
				return item.key != "doAction";
			});
			let params = {};
			params.no = this.searchBox.tempNo;
			params.courseType = this.searchBox.courseType;
			params.courseGrade = this.searchBox.course;
			params.status = this.searchBox.status;
			if (val == "2") {
				//如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
				params.ids = this.selectedIds.join(",");
				this.exportMethod = jxCourseTpl.exportSelected;
			} else {
				delete params.ids;
				this.exportMethod = jxCourseTpl.export;
			}
			this.$refs.exportModal.noShowExport(this.exportMethod, params);
			// this.exportFn(data, params);
		},
		exportFn(data, params) {
			console.log(data);
			let param = {};
			param = params;
			let arr = [];
			let arr1 = data;
			arr1.forEach(e => {
				arr.push({
					name: e.name,
					title: e.title,
					selected: true
				});
			});
			//this.exportRequestParams  为当前页面搜索的参数
			//arr  为所选导出列的集合  需要把arr加入到导出参数中去
			param.showFieldList = arr;
			this.modal3 = true
			this.exportMethod(param)
				.then(valid.call(this))
				.then(res => {
					if (res.data) {
						const blob = new Blob([res.data], {
							type: "application/actet-stream;charset=utf-8"
						});
						const contentDisposition =
							res.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
						const patt = new RegExp(
							"filename=([^;]+\\.[^\\.;]+);*"
						);
						const result = patt.exec(contentDisposition);
						if (!result) {
							this.$Message.error(this.$t("integralflow_19"));
							return;
						}
						const filename = decodeURIComponent(result[1]);
						const downloadElement = document.createElement("a");
						const href = window.URL.createObjectURL(blob); //创建下载的链接
						downloadElement.style.display = "none";
						downloadElement.href = href;
						downloadElement.download = filename; //下载后文件名
						document.body.appendChild(downloadElement);
						downloadElement.click(); //点击下载
						document.body.removeChild(downloadElement); //下载完成移除元素
						window.URL.revokeObjectURL(href);
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					setTimeout(()=>{
						this.modal3 = false
					},1000)
					/* this.updateLoadingStatus({ isLoading: false }); */
				});
		},
		selectTableItem(row) {
			//选择导出
			let s = this.selectedIds;
			let c = this.currentIds;
			for (let i in c) {
				if (s.includes(c[i])) {
					let num = this.selectedIds.indexOf(c[i]);
					s.splice(num, 1);
				}
			}
			if (row.length) {
				row.forEach(item => {
					s.push(item.id);
				});
			}
		},
		getShowTitle() {
			this.defaultShowCol = this.cols;
		},
		searchInfo() {
			this.pageNo = 1;
			this.getLists();
		},
		resetSearch() {
			for (let item in this.searchBox) {
				if (typeof this.searchBox[item] === "string") {
					this.searchBox[item] = "";
				}
			}
			this.selectedIds = [];
			this.pageNo = 1;
			this.getLists();
		},
		getLists() {
			this.updateLoadingStatus({ isLoading: true });
			this.params.no = this.searchBox.tempNo;
			this.params.courseType = this.searchBox.courseType;
			this.params.courseGrade = this.searchBox.course;
			this.params.status = this.searchBox.status;
			this.params.pageNumber = this.pageNo;
			this.params.pageSize = this.pageSize;
			jxCourseTpl
				.listPage(this.params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let data = res.data.data;
						console.log(data);
						this.dataTotal = data.totalElements;
						let d = data.content;
						this.currentIds = [];
						for (let i in d) {
							this.currentIds.push(d[i].id);
							if (this.selectedIds.includes(d[i].id)) {
								d[i]._checked = true;
							}
						}
						this.dataT = d;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},

		//改变页码
		pageChange(page, size) {
			this.pageNo = page;
			this.pageSize = size;
			this.getLists();
		}
	}
};
</script>
