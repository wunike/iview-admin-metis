<style lang="less">
.taskTemplate {
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

.createTaskTemplateClass {
	.ivu-modal-body {
		padding-bottom: 0;
	}
	.ivu-form-item {
		&:last-child {
			margin-bottom: 8px;
		}
	}
	.w306 {
		width: 306px;
	}
	.w149 {
		width: 149px;
	}
	.fl {
		float: left;
	}
	.addTask {
		cursor: pointer;
		&:hover {
			/*color: #44bcb7;*/
		}
	}
	.addOrRemoves {
		margin-bottom: 16px;
		// overflow:hidden;
		&:last-child {
			margin-bottom: 4px;
		}
		.addOrRemove {
			display: inline-block;
			width: 24px;
			height: 24px;
			margin-left: 8px;
			text-align: center;
			line-height: 18px;
			color: #ccc;
			cursor: pointer;
			border: 1px solid #ccc;
			font-size: 20px;
			border-radius: 2px;
			&:hover {
				border: 1px solid #44bcb7;
				color: #44bcb7;
			}
		}
	}
	.formData {
		display: inline-block;
		background: #ebecf0;
		border-radius: 4px;
		padding: 6px 12px;
		font-size: 12px;
		line-height: 12px;
		color: #495060;
		margin-right: 8px;
	}

	.formData-row-select {
		height: 104px;
		width: 400px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-end;
		span {
			height: 104px;
			width: 104px;
			border: 1px dashed rgba(217, 217, 217, 1);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			border-radius: 4px;
			background: #fafafa;
			&:hover {
				border-color: #44bcb7;
			}
		}
		// &:hover span {
		//   background:red;
		//   }
		strong {
			color: rgba(0, 0, 0, 0.65);
			font-weight: normal;
		}
		b {
			margin-left: 10px;
			line-height: 14px;
			font-weight: normal;
			color: rgba(0, 0, 0, 0.45);
		}
	}
	.formData-row-select-img {
		height: 104px;
		width: 104px;
		cursor: pointer;

		img {
			height: 102px;
			width: 102px;
		}
		box-sizing: border-box;
		// border: 1px dashed rgba(217, 217, 217, 1);
		border-radius: 4px;
	}

	.img-box {
		width: 520px;
		margin-left: 10px;
		background: #fff;
		box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
	}
	.img-box-in {
		padding: 12px 20px 36px 20px;
		height: 248px;
		overflow: scroll;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
		.isDefined {
			width: 84px;
			height: 84px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
			border-radius: 4px;
			.ivu-upload-select {
				width: 84px;
				height: 84px;
			}
			.cosUpload{
				button{
					width:100%;
					height:100%;
				}
			}
		}
		.img-item {
			margin-bottom: 12px;
			border-radius: 4px;
			margin-right: 12px;
			height: 84px;
			width: 84px;
			box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
			cursor: pointer;
			img {
				height: 84px;
				width: 84px;
			}
			&:nth-of-type(5n) {
				margin-right: 0;
			}
		}
		.add-img {
			/*  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
			span {
				height: 104px;
				width: 104px;
				border: 1px dashed rgba(217, 217, 217, 1);
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				border-radius: 4px;
			}
			strong {
				color: rgba(0, 0, 0, 0.65);
				font-weight: normal;
			}
		}
	}
}
.taskPreview{
    .ivu-modal-content{
        .ivu-modal-body{
            // padding: 14px 14px 14px 14px;
        }
    }
}
</style>
<template>
	<div class="taskTemplate">
		<v-search-collapse
			@search="doSearch"
			@reset="resetSearch"
			@changeDivHeight="changeDivHeight"
		>
			<DatePicker
				type="daterange"
				separator=" ~ "
				placement="top-start"
				v-model="searchObj.createDateSearch"
				:placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_239')"
				style="width: 200px;"
			></DatePicker>
			<Input v-model="searchObj.name" :placeholder="$t('modules_spoc_core_web_src_views_tasktemplate_index_377')"></Input>
			<Select v-model="searchObj.isEnable" :placeholder="$t('modules_spoc_core_web_src_views_tasktemplate_index_378')" clearable>
				<Option value="1">{{$t('scoretemplate_scoretemplate_559')}}</Option>
				<Option value="0">{{$t('scoretemplate_scoretemplate_558')}}</Option>
			</Select>
			<Select v-model="searchObj.type" :placeholder="$t('modules_spoc_core_web_src_views_tasktemplate_index_381')" clearable>
				<Option
					v-for="(item, index) in com_task_tpl_type"
					:value="item.value"
					:key="index"
				>{{ item.label }}</Option>
			</Select>
		</v-search-collapse>
		<big-table
			v-if="defaultShowCol"
			class="mytable"
			:tableName="$t('core.taskTemplate')"
			:tableData="tableData"
            :tableHeightOut="tableHeightOut"
			:tableColumnArray="tableColumnArray"
			:defaultShowCol="defaultShowCol"
			:canSelection="false"
			:dataTotal="dataTotal"
			:btnList="btnList"
			:canChangeHeight="true"
			:isShowSelectTableColumn="false"
			:updateShowTitleMethod="updateShowTitle"
			:updateShowTitleKey="updateShowTitleKey"
			:pageNo="pageNo"
			@pageChange="pageChange"
		></big-table>
		<Modal
			:mask-closable="false"
			v-model="createTaskTemplate"
			:title="editId? (formValidate.isSys == '1' ? $t('modules_spoc_core_web_src_views_tasktemplate_index_383') : $t('modules_spoc_core_web_src_views_tasktemplate_index_384')) : $t('modules_spoc_core_web_src_views_tasktemplate_index_384')"
			:loading="loading"
			width="600"
			class="createTaskTemplateClass"
		>
			<div>
				<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160">
					<FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_385')" prop="name">
						<Input v-model="formValidate.name" :disabled="formValidate.isSys == '1'" class="w306" :placeholder="$t('scoretemplate_compontents_scoremodify_528')"></Input>
					</FormItem>
					<FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_387')" prop="imgUrl">
						<div v-if="!formValidate.imgUrl" class="formData-row-select">
							<span @click="showImgsFn(formValidate.isSys)" class="formData-row-selectSpan">
								<Icon size="44" color="rgba(0, 0, 0, 0.45)" type="ios-add" />
								<strong>{{$t('courselist_compontents_servicecontent_206')}}</strong>
							</span>
							<b>{{$t('modules_spoc_core_web_src_views_tasktemplate_index_389')}}</b>
						</div>
						<div v-else @click="showImgsFn(formValidate.isSys)" class="formData-row-select-img">
							<img :src="formValidate.imgUrl" />
							<Input v-model="formValidate.imgUrl" style="display:none"></Input>
						</div>
						<Input v-model="formValidate.imgUrl" style="display:none;"></Input>
					</FormItem>
					<div v-if="showImgs" class="img-box">
						<div class="img-box-in">
							<div
								class="img-item"
								v-for="(item,index) in getImgSrcList"
								:key="item.bizId"
								style="position:relative"
							>
								<img :src="item.url" @click="selectImg(item.url)" />
								<i
									v-show="item.creator!=1"
									class="iconfont icon-cuowuguanbi-fuzhi ImgClose"
									style="color:#D9D9D9;right:-5px;top:-10px;position:absolute;width:16px;height:16px;border-radius:50%;background:#fff"
									@click="deleteById(item.bizId,'remove',item.url,index)"
								></i>
								<!-- <Icon type="ios-close" size="20" @click="selectImgCancel('jx_lesson_service_file',index)" style="right:0px;top:-1px;position:absolute"/> -->
							</div>
							<div class="isDefined">
								<div style="position:relative;width:84px;height:84px;">
									
									<Upload ref="upload"
										:data="{
											bizId: objectId,
											bizType: objectType,
											isSingle: true
										}"
										:headers="headers"
										:show-upload-list="false"
										:on-success="handleSuccess"
										:format="['png','jpg','jpeg']"
										:max-size="10240"
										:on-format-error="handleFormatError"
										:on-exceeded-size="handleMaxSize"
										:action="uploadUrl"
										name="file"
										style="display: inline-block;width:94px;">
										<div style="cursor: pointer; display:flex;justify-content:center;flex-direction:column;width:84px;height:84px;text-align:center">
											<Icon type="ios-add" size="24" style="color: #3399ff;margin-bottom:8px;color:#999999;"></Icon>
												<p style="font-weight:400;color:rgba(0,0,0,0.65);">{{$t('scoretemplate_compontents_scoremodify_526')}}</p>
										</div>
									</Upload>
									<!-- <cos-upload
										style="width:84px;height:84px;position:absolute;top:0;left:0;opacity:0"
										ref="taskModalUpload"
										v-if="formValidate.isSys != '1' && createTaskTemplate && objectType && kind"
										:objectType="objectType"
										:objectId="objectId"
										:kind="kind"
										:accept="['png','jpg','jpeg']"
										:maxNum="1"
										:uploadButtonName="$t('modules_spoc_core_web_src_views_tasktemplate_index_390')"
										fileInputId="taskModal"
										:isChangeFile="true"
										@hasUploadFile="hasUploadFile"
									>
									</cos-upload> -->
								</div>
							</div>
						</div>
					</div>
					<div v-show="!showImgs">
						<FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_391')" prop="type">
							<Select :disabled="formValidate.isSys == '1'" @on-change="changeType" class="w306" v-model="formValidate.type" clearable transfer>
								<Option
									v-for="(item, index) in com_task_tpl_type"
									:value="item.value"
									:key="index"
								>{{ item.label }}</Option>
							</Select>
						</FormItem>
						<FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_392')" prop="scope">
							<RadioGroup v-model="formValidate.scope">
								<Radio label="0">{{$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_332')}}</Radio>
								<Radio label="1">{{$t('modules_spoc_core_web_src_views_tasktemplate_index_394')}}</Radio>
							</RadioGroup>
						</FormItem>
						<FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_395')" prop="actionType">
							<RadioGroup v-model="actionType" @on-change="changeType">
								<Radio label="roles"  :disabled="formValidate.isSys == '1'">{{$t('modules_spoc_core_web_src_views_tasktemplate_index_396')}}</Radio>
								<Radio label="serviceTypes"  :disabled="formValidate.isSys == '1'">{{$t('modules_spoc_core_web_src_views_tasktemplate_index_397')}}</Radio>
							</RadioGroup>
						</FormItem>
						<FormItem v-if="actionType == 'roles'" :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_398')" prop="roles"  :rules="[{ validator: validateRoles, trigger: 'change' }]">
							<Select :disabled="formValidate.isSys == '1'" class="w306" v-model="formValidate.roles" :multiple="formValidate.type!='sop task'" clearable transfer>
								<Option
									:value="item.id"
									v-for="(item, index) in roleList"
									:key="index">
									{{item.name}}
								</Option>
							</Select>
						</FormItem>
						<FormItem v-if="actionType == 'serviceTypes'" :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_398')" prop="serviceTypes"  :rules="[{ validator: validateServiceTypes, trigger: 'change' }]">
							<Select :disabled="formValidate.isSys == '1'" class="w306" v-model="formValidate.serviceTypes" :multiple="formValidate.type!='sop task'" clearable transfer>
								<Option
									:value="item.value"
									v-for="(item, index) in com_service_user_type"
									:key="index">
									{{item.label}}
								</Option>
							</Select>
						</FormItem>
						<FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_399')" prop="reminderType" :rules="[{ validator: validateReminderType, trigger: 'change' }]">
							<div
								class="addOrRemoves"
								style="display:inline-block;"
								v-for="(item,index) in formValidate.reminderType"
								:key="index"
							>
								<Select :disabled="formValidate.isSys == '1'" class="w306"  v-model="item.reminderTypeValue" transfer>
									<Option value="0" v-show="formValidate.reminderType.length <= 1">{{$t('modules_spoc_core_web_src_views_tasktemplate_index_400')}}</Option>
									<!-- <Option value="15" :disabled="hasSelectedReminderType.indexOf('15') >= 0">{{$t('modules_spoc_core_web_src_views_tasktemplate_index_401')}}</Option>
									<Option value="60" :disabled="hasSelectedReminderType.indexOf('60') >= 0">{{$t('modules_spoc_core_web_src_views_tasktemplate_index_402')}}</Option> -->
									<Option value="1" :disabled="hasSelectedReminderType.indexOf('1') >= 0">{{$t('modules_spoc_core_web_src_views_tasktemplate_index_403')}}</Option>
									<Option value="3600" :disabled="hasSelectedReminderType.indexOf('3600') >= 0">{{$t('modules_spoc_core_web_src_views_tasktemplate_index_404')}}</Option>
									<Option value="24200" :disabled="hasSelectedReminderType.indexOf('24200') >= 0">{{$t('modules_spoc_core_web_src_views_tasktemplate_index_405')}}</Option>
								</Select>
								<div style="display:inline-block;">
									<span v-show="formValidate.isSys != '1'" class="addOrRemove" @click="addItemTX(index)">+</span>
									<span
										class="addOrRemove"
										v-show="formValidate.reminderType.length > 1 &&  formValidate.isSys != '1'"
										@click="removeItemTX(index)"
									>-</span>
								</div>
							</div>
						</FormItem>
						<FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_406')" prop="formData">
							<div v-for="(item,index) in formValidate.formData" :key="index" class="formData">
								<span>{{item.name}}</span>
								<span style="color:red;margin-left:4px;" v-show="item.required == '1'">*</span>
							</div>
							<i v-show="formValidate.isSys != '1'" class="iconfont icon-bianzu31 addTask" @click="showPageFields"></i>
							<Input v-model="formValidate.formData" style="display:none;"></Input>
						</FormItem>
						<!-- <FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_407')" prop="jsonData">
							<Upload
							    :default-file-list="defaultList"
							    :action="uploadImg"
							    :show-upload-list="false"
							    name="files"
							    :format="['jpg','png']"
							    :on-format-error="handleFormatError1"
							    :on-success="HandleSuccess1"
							    :on-remove="HandleRemove"
							    :data="{type:'crmQrcode',fileType:'image',dirName:'all',remarks:'',menuId:'2001'}"
							>
							    <Button icon="ivu-icon ivu-icon-ios-cloud-upload-outline">{{$t('modules_spoc_core_web_src_views_tasktemplate_index_408')}}</Button>
							</Upload>
						</FormItem> -->
						<FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_409')">
							<div
								class="addOrRemoves"
								v-for="(item,index) in formValidate.completeResultList"
								:key="index"
							>
								<FormItem
									label=""
									:label-width="0"
									style="display:inline-block;"
									:prop="'completeResultList.'+index+'.resultLabel'"
									:rules="[{ validator: validateResultLabel, trigger: 'change' }]"
								>
									<Input v-model="item.resultLabel" :disabled="formValidate.isSys == '1'" class="w306" :placeholder="$t('modules_spoc_core_web_src_views_tasktemplate_index_410')"></Input>
								</FormItem>
							<!-- 	<FormItem
									label
									:label-width="0"
									style="display:inline-block;margin-left:8px;"
									:prop="'completeResultList.'+index+'.resultValue'"
									:rules="[{ validator: validateResultValue, trigger: 'blur' }]"
								>
									<Input v-model="item.resultValue" class="w149" :placeholder="$t('modules_spoc_core_web_src_views_tasktemplate_index_411')"></Input>
								</FormItem> -->
								<div style="display:inline-block;">
									<span v-show="formValidate.isSys != '1'" class="addOrRemove" @click="addItem(index)">+</span>
									<span
										class="addOrRemove"
										v-show="formValidate.completeResultList.length > 1 &&  formValidate.isSys != '1'"
										@click="removeItem(index)"
									>-</span>
								</div>
							</div>
							<Input v-model="formValidate.completeResultList" style="display:none;"></Input>
						</FormItem>
					</div>
				</Form>
			</div>
            <div slot="footer">
                <Button @click="cancel">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="preview">{{$t('modules_spoc_core_web_src_views_tasktemplate_index_413')}}</Button>
                <Button type="primary" @click="ok">{{$t('classroom_allscore_54')}}</Button>
            </div>
		</Modal>
        <Modal
            v-model="previewModal"
            width="600"
            :mask-closable="false"
            class-name="taskPreview"
			:title="$t('modules_spoc_core_web_src_views_tasktemplate_index_415')"
        >
            <div style="">

                <Form :label-width="84">
                    <FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_416')">
                        <Input :placeholder="formValidate.name"></Input>
                    </FormItem>
                    <FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_417')">
                        <RadioGroup>
                            <Radio label="apple">{{$t('modules_leftremenu_92')}}</Radio>
                            <Radio label="android">{{$t('modules_leftremenu_93')}}</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_420')">
                        <Input :placeholder="$t('modules_spoc_core_web_src_views_tasktemplate_index_421')"></Input>
                    </FormItem>
                    <FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_422')">
                        <Select :placeholder="$t('modules_spoc_core_web_src_views_tasktemplate_index_423')">
                            <Option value="shenzhen">Sydney</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_424')">
                        <DatePicker type="date" :placeholder="$t('modules_spoc_core_web_src_views_tasktemplate_index_421')" style="width: 200px"></DatePicker>
                    </FormItem>
                    <form-create ref="fc" v-model="fApi" :rule="rule" :option="option"></form-create>
                    <FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_425')">
                        <Input type="textarea" :rows="4" :placeholder="$t('modules_spoc_core_web_src_views_tasktemplate_index_426')" />
                    </FormItem>
                    <FormItem :label="$t('modules_spoc_core_web_src_views_tasktemplate_index_427')">
                        <RadioGroup>
                            <Radio label="apple">{{$t('modules_leftremenu_92')}}</Radio>
                            <Radio label="android">{{$t('modules_leftremenu_93')}}</Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
            </div>

            <!-- <div slot="footer"> -->
                <!-- <Button @click="modal1=false">{{$t('modules_spoc_core_web_src_views_tasktemplate_index_428')}}</Button> -->
                <!-- <Button @click="cancelImg" v-if="titleVal==2||titleVal==3">{{$t('classroom_allscore_53')}}</Button>
                <Button @click="OkBtn" v-if="titleVal==2||titleVal==3" type="primary">{{$t('classroom_allscore_54')}}</Button>-->
            <!-- </div> -->
        </Modal>
		<pageFields ref="pageFieldRef" v-if="createTaskTemplate" :editFormData="editFormData" @chooseDetailMethod="chooseDetailMethod"></pageFields>
	</div>
</template>
<script>
import valid, { errors, sysUser, sysDict, sysRole, common, sysAttachment, api} from "../../libs/request";
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import { waitUntil } from "@public/libs/util";
import bigTable from "@public/modules/bigTable.vue";
import cosUpload from "@public/modules/cosUpload.vue";
import pageFields from "./taskTemplatePageFields";
import formCreateSetting from './formCreate.js';
export default {
	name: "core.taskTemplate",
    mixins: [formCreateSetting],
	data() {
		return {
            previewModal:false,
			actionType: 'roles', //roles || serviceTypes
			roleList: [],
			isActioning: false, //多次提交拦截
            tableHeightOut: 72, //324,
			// objectType:'customer',
			objectType:'taskTempleteImg',
            objectId: '',
            kind: 'image',
			editId: '',
			editFormData: [], //用于编辑时动态表单反现选中，及其他状态
			searchObj: {
				name: "",
				createDateSearch: ["", ""],
				isEnable: "",
				type: ""
			},
			com_task_tpl_type: [],
			com_service_user_type: [],
			loading: true,
			formValidate: {
				name: "",
				type: "",
				scope: "0",
				formData: [],
				serviceTypes: [],
				roles: [],
				reminderType: [{reminderTypeValue: '0'}],
				completeResultList: [
					{
						resultLabel: "",
						resultValue: this.guid(),
						isModify: '1'
					}
				],
                fieldJsonData:{},
			},
			ruleValidate: {
				name: [
					{
						required: true,
						message: this.$t('modules_spoc_core_web_src_views_tasktemplate_index_429'),
						trigger: "change"
					}
				],
				type: [
					{
						required: true,
						message: this.$t('modules_spoc_core_web_src_views_tasktemplate_index_381'),
						trigger: "change"
					}
				],
				imgUrl: [
					{
						required: true,
						message: this.$t('modules_spoc_core_web_src_views_tasktemplate_index_430'),
						trigger: "change"
					}
				],
				reminderType: [
					// {
					// 	required: true,
					// 	message: "请选择提醒类别",
					// 	trigger: "change"
					// }
					{
						required: true,
						type: "array",
						min: 1,
						message: this.$t('modules_spoc_core_web_src_views_tasktemplate_index_431'),
						trigger: "change"
					}
				],
				// formData: [
				// 	{
				// 		required: true,
				// 		type: "array",
				// 		min: 1,
				// 		message: "请设置创建任务项",
				// 		trigger: "change"
				// 	}
				// ],
				// serviceTypes: [
				// 	{
				// 		required: true,
				// 		type: "array",
				// 		min: 1,
				// 		message: "请选择执行人类型",
				// 		trigger: "change"
				// 	}
				// ]
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
						callback(new Error(this.$t('modules_spoc_core_web_src_views_tasktemplate_index_432')));
					} else {
						let count = 0;
						this.formValidate.completeResultList.forEach(item => {
							if (item.resultLabel.trim() == value) {
								count = count + 1;
							}
						});
						if (count > 1) {
							callback(new Error(this.$t('modules_spoc_core_web_src_views_tasktemplate_index_433')));
						} else {
							callback();
						}
						callback();
					}
				} else {
					callback();
				}
			},
			validateServiceTypes: (rule, value, callback) => {
				if(this.formValidate.type != 'sop task'){ // 跟进任务  服务任务
					if (this.formValidate.serviceTypes.length >= 1) {
						callback();
					} else {
						callback(new Error(this.$t('modules_spoc_core_web_src_views_tasktemplate_index_434')));
					}
				} else {
					if (!this.formValidate.serviceTypes) { // SOP任务
						callback(new Error(this.$t('modules_spoc_core_web_src_views_tasktemplate_index_434')));
					} else {
						callback();
					}
				}
			},
			validateRoles: (rule, value, callback) => {
				if(this.formValidate.type != 'sop task'){ // 跟进任务  服务任务
					if (this.formValidate.roles.length >= 1) {
						callback();
					} else {
						callback(new Error(this.$t('modules_spoc_core_web_src_views_tasktemplate_index_434')));
					}
				} else {
					if (!this.formValidate.roles) { // SOP任务
						callback(new Error(this.$t('modules_spoc_core_web_src_views_tasktemplate_index_434')));
					} else {
						callback();
					}
				}
			},
			validateReminderType: (rule, value, callback) => {
				let flag = true
				this.formValidate.reminderType.forEach(item => {
					if (item.reminderTypeValue === '') {
						flag = false
					}
				});
				if(!flag){
					callback(new Error(this.$t('modules_spoc_core_web_src_views_tasktemplate_index_435')));
				} else {
					callback();
				}
			},
			createTaskTemplate: false,
			updateShowTitle: common.updateShowTitle,
			updateShowTitleKey: "",
			dataTotal: 0,
			tableData: [],
			pageNo: 1,
			pageSize: 20,
			defaultShowCol: null,
			tableColumn: {
				true: [
					{
						name: "name",
						title: this.$t('modules_spoc_core_web_src_views_announcement_index_111'),
						selected: true,
						required: true,
						sort: 0,
						dynamiced: false
					},
					{
						name: "completeResultList",
						title: this.$t('modules_spoc_core_web_src_views_tasktemplate_index_437'),
						selected: true,
						required: true,
						sort: 1,
						dynamiced: false
					},
					{
						name: "typeName",
						title: this.$t('modules_spoc_core_web_src_views_tasktemplate_index_438'),
						selected: true,
						required: true,
						sort: 2,
						dynamiced: false
					},
					{
						name: "createDate",
						title: this.$t('scoretemplate_scoretemplate_556'),
						selected: true,
						required: true,
						sort: 3,
						dynamiced: false
					},
					{
						name: "createByName",
						title: this.$t('scoretemplate_scoretemplate_569'),
						selected: true,
						required: true,
						sort: 4,
						dynamiced: false
					},
					{
						name: "isEnable",
						title: this.$t('modules_spoc_core_web_src_views_tasktemplate_index_441'),
						selected: true,
						required: true,
						sort: 5,
						dynamiced: false
					},
					{
						name: "isSys",
						title: this.$t('modules_spoc_core_web_src_views_tasktemplate_index_442'),
						selected: true,
						required: true,
						sort: 5,
						dynamiced: false
					}
				]
			},
			tableColumnArray: [
				{
					key: "completeResultList",
					minWidth: 100,
					render: (h, params) => {
						let _arr = params.row.completeResultList ? params.row.completeResultList.map(item => {
							return item.resultLabel;
						}) : [];
						return h(
							"div",
							{
								style: {}
							},
							_arr.join(",")
						);
					}
				},
				{
					key: "isEnable",
					minWidth: 100,
					render: (h, params) => {
						return h(
							"div",
							{
								style: {}
							},
							params.row.isEnable == "1" ? this.$t('scoretemplate_scoretemplate_559') : this.$t('scoretemplate_scoretemplate_558')
						);
					}
				},
				{
					key: "isSys",
					minWidth: 100,
					render: (h, params) => {
						return h(
							"div",
							{
								style: {}
							},
							params.row.isSys == "1" ? this.$t('modules_leftremenu_92') : this.$t('modules_leftremenu_93')
						);
					}
				},
				{
					title: this.$t('classlist_compontents_detailinfo_45'),
					key: "doAction",
					minWidth: 100,
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
											"color": params.row.isSys == "1"? '#999' : ''
										},
										on: {
											click: () => {
												if(params.row.isSys == "1"){
													return
												}
												this.copyComTaskTpl(
													params.row.id
												);
											}
										}
									},
									this.$t('message_myhistory_298')
								),
								h(
									"a",
									{
										style: {
											"margin-right": "10px",
											"color": params.row.isSys == "1"? '#999' : ''
										},
										on: {
											click: () => {
												if(params.row.isSys == "1"){
													return
												}
												this.updateIsEnableComTaskTpl(
													params.row.id,
													params.row.isEnable == "1"
														? "0"
														: "1"
												);
											}
										}
									},
									params.row.isEnable == "1" ? this.$t('scoretemplate_scoretemplate_558') : this.$t('scoretemplate_scoretemplate_559')
								),
								params.row.isSys == "1" ? "" : h(
									"a",
									{
										style: {
											"margin-right": "10px",
											"color": params.row.isSys == "1"? '#999' : ''
										},
										on: {
											click: () => {
												if(params.row.isSys == "1"){
													return
												}
												if (
													params.row.isEnable == "1"
												) {
													this.$Message.error(
														this.$t('modules_spoc_core_web_src_views_tasktemplate_index_445')
													);
													return;
												}
												this.$Modal.confirm({
													title: this.$t('views_coursepack_bigtableexample_345'),
													content:
														this.$t('modules_spoc_core_web_src_views_tasktemplate_index_447'),
													onOk: () => {
														this.deleteTaskTemplate(
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
												// if(params.row.isSys == "1"){
												// 	return
												// }
												if(this.$refs.taskModalUpload){
													this.$refs.taskModalUpload.reset()
												}
												this.formDetail(params.row.id);
											}
										}
									},
									params.row.isSys == "1" ? this.$t('modules_spoc_core_web_src_views_tasktemplate_index_449') : this.$t('classroom_allscore_51')
								)
							]
						);
					}
				}
			],
			btnList: [
				{
					type: "",
					btnClick: this.addTemplate,
					text: this.$t('modules_spoc_core_web_src_views_tasktemplate_index_451')
				}
			],
			showImgs: false,
			getImgSrcList:[],
			headers: {}
		};
	},
	computed: {
		...mapState(["userInfo"]),
		uploadUrl() {
            return api.fileAttachmentUploadUrl(); // sysUser.uploadImg();
        },
		hasSelectedReminderType: function(){
			let _arr = []
			if(Array.isArray(this.formValidate.reminderType) && this.formValidate.reminderType.length > 0){
				this.formValidate.reminderType.forEach(item=>{
					if(item.reminderTypeValue){
						_arr.push(item.reminderTypeValue)
					}
				})
			} else {
				let reminderTypeArray = this.formValidate.reminderType.split(',')
				if(Array.isArray(reminderTypeArray) && reminderTypeArray.length > 0){
					reminderTypeArray.forEach(item=>{
						if(item.reminderTypeValue){
							_arr.push(item.reminderTypeValue)
						}
					})
				}
			}
			return _arr
		},
        uploadImg: function() {
            return sysAttachment.uploadFileUrl();
        }
	},
	components: {
		vSearchCollapse,
		bigTable,
		pageFields,
		cosUpload
	},
	mounted() {
		this.defaultShowCol = this.tableColumn;
		this.batchListData();
		// this.formDetail('0575b481e04e4f58b00401a30371ffa3')
		this.listPageComTaskTpl();
		this.headers = {
            token: localStorage.getItem('token'),
            tenant: localStorage.getItem('tenant')	
        }
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		handleMaxSize() {
			this.$Message.error('请选择不超过10M的文件')
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: this.$t('modules_spoc_core_web_src_views_tasktemplate_index_452'),
                desc: this.$t('modules_spoc_core_web_src_views_tasktemplate_index_453') + file.name + this.$t('modules_spoc_core_web_src_views_tasktemplate_index_454')
            });
        },
        handleSuccess(data) {
            /* this.$Message.success(this.$t('modules_spoc_core_web_src_views_tasktemplate_index_455'));
            this.formValidate.fieldJsonData=data.data;
            this.ok(); */
			console.log(data) 
			this.$Message.success('上传成功');
			this.getImgList();
        },
		changeType(){
			if(this.formValidate.type!='sop task'){
				this.formValidate.serviceTypes = []
				this.formValidate.roles = []
			} else {
				this.formValidate.serviceTypes = ''
				this.formValidate.roles = ''
			}
		},
		selectImg(filePath) {
			console.log(filePath,"filePath~~~~~~`")
			this.showImgs = false;
			// this.formData.iconPath = this.filePathSrc;
			this.formValidate.imgUrl = filePath;
		},
		showImgsFn(isSys) {
			if(isSys == '1'){
				return
			}
			this.showImgs = !this.showImgs;
		},
		hasUploadFile(fileObj){
			// console.log(fileObj)
			// this.$set(this.formValidate, 'imgUrl',fileObj.filePath)
			// this.formValidate.attachmentIds = [fileObj.id]
			this.$Message.success(this.$t('modules_spoc_core_web_src_views_tasktemplate_index_455'));
			this.getImgList();
		},
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
		guid() {
			return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
				/[xy]/g,
				function(c) {
					var r = (Math.random() * 16) | 0,
						v = c == "x" ? r : (r & 0x3) | 0x8;
					return v.toString(16);
				}
			);
		},
		listPageComTaskTpl() {
			this.updateLoadingStatus({ isLoading: true });

			let param = {
				pageNo: this.pageNo,
				pageSize: this.pageSize
			};
			this.searchObj.startDate = this.searchObj.createDateSearch[0]
				? new Date(this.searchObj.createDateSearch[0]).format('yyyy-MM-dd') + " 00:00:00"
				: "";
			this.searchObj.endDate = this.searchObj.createDateSearch[1]
				? new Date(this.searchObj.createDateSearch[1]).format('yyyy-MM-dd') + " 23:59:59"
				: "";
			param = Object.assign({}, param, this.searchObj);

			common
				.listPageComTaskTpl(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						console.log(res.data.data);
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
		//判重values
		checkResultValueRpt(val, callback, obj) {
			this.updateLoadingStatus({ isLoading: true });
			let isModify
			if(obj.resultValueOld && (obj.resultValueOld != obj.resultValue)){
				isModify = '1'
			} else {
				isModify = obj.isModify
			}
			common
				.checkResultValueRpt({
					resultValue: val,
					isModify
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						console.log(res.data.data);
						if (res.data.data == 400) {
							return callback(new Error(res.data.message));
						} else {
							return callback();
						}
					} else {
						console.log(res.data.data);
						return callback(new Error(res.data.message));
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		//获取详情
		formDetail(id,flag=true) {
			this.updateLoadingStatus({ isLoading: true });
			common
				.formComTaskTpl({ id })
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data;
						this.editId = result.id;

						let formData;
						if (result.formData) {
							formData = JSON.parse(result.formData);
						} else {
							formData = [];
						}

						if(result.completeResultList){
							result.completeResultList.forEach(item=>{
								item.isModify = '0'
							})
						}

						let reminderTypeArray = []
						let _array = result.reminderType.split(',')
						_array.forEach(item=>{
							if(item !== ''){
								reminderTypeArray.push({
									reminderTypeValue: item
								})
							}
						})

						this.editFormData = formData
						this.formValidate = {
							isSys: result.isSys,
							name: result.name,
							type: result.type,
							scope: result.scope,
							formData,
							imgUrl: result.imgUrl,
							attachmentIds:result.attachmentIds,
							completeResultList: result.completeResultList ? result.completeResultList :[
								{
									resultLabel: "",
									resultValue: this.guid(),
									isModify: '1'
								}
							],
							serviceTypes: result.serviceTypes ? result.serviceTypes.split(',') : [],
							roles: result.roles ? result.roles.split(',') : [],
							reminderType: reminderTypeArray // result.reminderType
						};

						if(this.formValidate.roles.length){
							this.actionType = 'roles'
						}
						if(this.formValidate.serviceTypes.length){
							this.actionType = 'serviceTypes'
						}

                        if(flag){
                            this.createTaskTemplate = true;
                        }else{

                        }
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		//获取任务类型
		batchListData() {
			sysDict
				.batchListData({
					types: "com_task_tpl_type,com_service_user_type"
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.com_task_tpl_type = res.data.data.com_task_tpl_type;
						this.com_service_user_type = res.data.data.com_service_user_type;
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
			sysRole
				.roleList({
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.roleList = res.data.data.roleList
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		//返回选择的动态列表的字段
		chooseDetailMethod(data) {
			this.formValidate.formData = data.filter((item, index) => {
				return item.isEdit == "1";
			});
		},
		//显示选择动态列
		showPageFields() {
			this.$refs.pageFieldRef.classShowMethods();
		},
		pageChange(pageNo, pageSize) {
			if (!pageNo) {
				//防止无用重复请求
				return;
			}
			this.pageNo = pageNo;
			this.pageSize = pageSize;
			this.listPageComTaskTpl();
		},
		getImgList(){
			api.findAttachmentByBizTypesAndBizIds({ bizTypes: "taskTempleteImg" })
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.getImgSrcList = res.data.data
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		//打开添加模板
		addTemplate() {
			this.showImgs = false;
			this.getImgList();
			this.editId = "";
			this.editFormData = [];
			this.actionType = 'roles'
			this.formValidate = {
				name: "",
				type: "",
				scope: '0',
				formData: [],
				roles:[],
				serviceTypes: [],
				reminderType: [{
					reminderTypeValue:'0'
				}],
				completeResultList: [
					{
						resultLabel: "",
						resultValue: this.guid(),
						isModify: '1'
					}
				]
			}
			this.$refs["formValidate"].resetFields();
			this.createTaskTemplate = true;
		},
		resetSearch() {
			this.tableData = [];
			this.searchObj = {
				name: "",
				createDateSearch: ["", ""],
				isEnable: "",
				type: ""
			}
			this.pageNo = 1
			this.listPageComTaskTpl();
		},
		doSearch() {
			this.tableData = [];
			this.listPageComTaskTpl();
		},
		copyComTaskTpl(id) {
			this.updateLoadingStatus({
				isLoading: true
			});
			common
				.copyComTaskTpl({
					id
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.$Message.success(this.$t('modules_spoc_core_web_src_views_tasktemplate_index_456'))
						this.pageNo = 1;
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
		//删除
		deleteTaskTemplate(id) {
			this.updateLoadingStatus({
				isLoading: true
			});
			common
				.deleteByIdComTaskTpl({
					id
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.pageNo = 1;
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
		//修改状态
		updateIsEnableComTaskTpl(id, isEnable) {
			this.updateLoadingStatus({
				isLoading: true
			});
			common
				.updateIsEnableComTaskTpl({
					id,
					isEnable
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
		addItem(index) {
			this.formValidate.completeResultList.splice(index + 1, 0, {
				resultLabel: "",
				resultValue: this.guid(),
				isModify: '1'
			});
		},
		removeItem(index) {
			this.formValidate.completeResultList.splice(index, 1);
		},
		addItemTX(index) {
			this.formValidate.reminderType.splice(index + 1, 0, {
				reminderTypeValue: ''
			});
			this.formValidate.reminderType.forEach(item=>{
				if(item.reminderTypeValue == '0'){
					item.reminderTypeValue = ''
				}
			})
		},
		removeItemTX(index) {
			this.formValidate.reminderType.splice(index, 1);
		},
		ok() {
			if(this.formValidate.isSys == '1'){
				this.createTaskTemplate = false;
				return;
			}
			this.$refs["formValidate"].validate(validRes => {
				if (validRes) {
					console.log(this.formValidate);
					let obj = Object.assign({}, this.formValidate);
					obj.formData = JSON.stringify(obj.formData);

					if(this.isActioning){ //多次提交拦截
						return
					}
					this.isActioning = true
					this.updateLoadingStatus({ isLoading: true });

					if (this.editId) {
						obj.id = this.editId;
						// obj.completeResultList.forEach(item =>{
						// 	if(item.resultValueOld && (item.resultValueOld != item.resultValue)){
						// 		item.isModify = '1'
						// 	}
						// })
					}

					if(obj.completeResultList.length == 1 && obj.completeResultList[0].resultLabel == ''){
						obj.completeResultList = []
					}

					if(Array.isArray(obj.serviceTypes)){
						obj.serviceTypes = obj.serviceTypes.join(',')
					}
					if(Array.isArray(obj.roles)){
						obj.roles = obj.roles.join(',')
					}

					let reminderTypeArray = []
					obj.reminderType.forEach(item=>{
						reminderTypeArray.push(item.reminderTypeValue)
					})
					reminderTypeArray.sort(function(a,b){
						return Number(a) - Number(b)
					})
					obj.reminderType = reminderTypeArray.join(',')

					common
						.saveComTaskTpl(obj)
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								this.createTaskTemplate = false;
								this.loading = false;
								setTimeout(() => {
									this.loading = true;
								}, 0);
								if(!this.editId){
									this.pageNo = 1
								}
								this.doSearch()
							} else {
								this.createTaskTemplate = true;
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
					this.createTaskTemplate = true;
					this.loading = false;
					setTimeout(() => {
						this.loading = true;
					}, 0);
				}
			});
		},
		cancel() {
			this.createTaskTemplate = false;
		},
        preview(){
            this.previewModal=true;
            this.setFormAttr(this.formValidate.formData);
        },
		deleteById(bizId){
			api.delBybiz({ 
				bizId: bizId,
				bizType: "taskTempleteImg" 
			})
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
					console.log(res.data)
					this.getImgList()
				}
			})
			.catch(errors.call(this))
			.finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
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
