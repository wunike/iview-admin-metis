<style lang="less">
.new-score-container {
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
	.ivu-formData-item-label {
		font-size: 14px;
		color: rgba(153, 153, 153, 1) !important;
	}

	.ivu-formData-item {
		margin-bottom: 0;
	}
	.formData-row-line {
		margin-bottom: 20px;
		color: rgba(153, 153, 153, 1);
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
}
</style>
<template>
	<div>
		<Modal
			class="new-score-container"
			width="600"
			v-model="showModel"
			:title="isEdit?$t('scoretemplate_compontents_scoremodify_520'):$t('scoretemplate_compontents_scoremodify_521')"
			:mask-closable="false"
			@on-cancel="cancelAddScore"
		>
			<Form
				ref="formData"
				:rules="ruleCustom"
				class="formData-box"
				:model="formData"
				label-position="right"
				:label-width="120"
			>
				<div class="formData-row-line">
					<FormItem
						:label="$t('scoretemplate_compontents_scoremodify_522')"
						prop="iconPath"
						:rules="{required: true,  message: $t('scoretemplate_compontents_scoremodify_523'), }"
					>
						<div v-if="!formData.iconPath" class="formData-row-select">
							<span @click="showImgsFn" class="formData-row-selectSpan">
								<Icon size="44" color="rgba(0, 0, 0, 0.45)" type="ios-add" />
								<strong>{{$t('courselist_compontents_servicecontent_206')}}</strong>
							</span>
							<b>{{$t('scoretemplate_compontents_scoremodify_525')}}</b>
						</div>
						<div v-else @click="showImgsFn" class="formData-row-select-img">
							<img :src="formData.iconPath" />
							<Input v-model="formData.iconPath" style="display:none"></Input>
						</div>
					</FormItem>
				</div>
				<div v-if="showImgs" class="img-box">
					<div class="img-box-in">
						<div
							class="img-item"
							v-for="(item,index) in getImgSrcList"
							:key="item.id"
							style="position:relative"
						>
							<img :src="item.filePath" @click="selectImg(item.filePath)" />
							<i
								v-show="item.creator!=1"
								class="iconfont icon-cuowuguanbi-fuzhi ImgClose"
								style="color:#D9D9D9;right:-5px;top:-10px;position:absolute;width:16px;height:16px;border-radius:50%;background:#fff"
								@click="deleteById(item.id,'remove',item.filePath,index)"
							></i>
							<!-- <Icon type="ios-close" size="20" @click="selectImgCancel('jx_lesson_service_file',index)" style="right:0px;top:-1px;position:absolute"/> -->
						</div>
						<div class="isDefined">
								
										<div style="position:relative;width:84px;height:84px;">
										<div
											style="display:flex;justify-content:center;flex-direction:column;width:84px;height:84px;text-align:center"
										>
											<Icon type="ios-add" size="24" style="color: #3399ff;margin-bottom:8px;color:#999999;"></Icon>
											<p
												style="font-weight:400;color:rgba(0,0,0,0.65);"
											>{{$t('scoretemplate_compontents_scoremodify_526')}}</p>
										</div>
									    	<cos-upload
									style="width:84px;height:84px;position:absolute;top:0;left:0;opacity:0"
										ref="cosUploadImg"
										v-if="objectType && kind" 
										:objectType="objectType" 
										:objectId="objectId"
										:kind="kind"
										:warnBool="false"
										:accept="['jpg','png']"
										:maxNum="1"
										:uploadButtonName="$t('scoretemplate_compontents_scoremodify_526')"
										fileInputId="taskModal" 
										:isChangeFile="false"
										@hasUploadFile="hasUploadFile"
									>
									</cos-upload>
										</div>
							<Upload
								style="width:84px;height:84px;justify-content:center;align-items: center;display:block;"
								:action="uploadImg"
								:format="['jpg','png']"
								:on-format-error="handleFormatError"
								name="file"
                                :headers="headers"
								:show-upload-list="false"
								:data="dataUploadFile"
								:on-success="HandleSuccess"
							>
								<div
									style="display:flex;justify-content:center;flex-direction:column;width:84px;height:84px;text-align:center"
								>
									<Icon type="ios-add" size="24" style="color: #3399ff;margin-bottom:8px;color:#999999;"></Icon>
									<p
										style="font-weight:400;color:rgba(0,0,0,0.65);"
									>{{$t('scoretemplate_compontents_scoremodify_526')}}</p>
								</div>
							</Upload>
						</div>
					</div>
				</div>
				<div v-if="!showImgs" class="formData-row-line">
					<FormItem
						:label="$t('scoretemplate_compontents_scoremodify_527')"
						prop="name"
						:rules="{required: true,validator: validatePass,  trigger: 'change'}"
					>
						<Input
							:disabled="showDataobj.disabled=='yes'"
							style="width:400px;"
							:placeholder="$t('scoretemplate_compontents_scoremodify_528')"
							v-model="formData.name"
							@on-change="nameChange"
						></Input>
					</FormItem>
				</div>
				<div v-if="!showImgs" class="formData-row-line">
					<FormItem
						:label="$t('scoretemplate_compontents_scoremodify_5271')"
						prop="nameEn"
						:rules="{required: true,validator: validatePass1,  trigger: 'change'}"
					>
						<Input
							:disabled="showDataobj.disabled=='yes'"
							style="width:400px;"
							:placeholder="$t('scoretemplate_compontents_scoremodify_528')"
							v-model="formData.nameEn"
							@on-change="nameChange"
						></Input>
					</FormItem>
				</div>
				<div v-if="!showImgs" class="formData-row-line">
					<FormItem
						:label="$t('scoretemplate_compontents_scoremodify_529')"
						prop="subType"
						:rules="{required: true,  message: $t('scoretemplate_compontents_scoremodify_530'), trigger: 'change'}"
					>
						<!--:rules="{required: true,type:'number', message: $t('pushsettings_index_504'), trigger: 'change'}">-->
						<Select
							:disabled="showDataobj.disabled=='yes'"
							:placeholder="$t('pushsettings_index_505')"
							v-model="formData.subType"
							clearable
							style="width:400px;"
						>
							<Option v-for="item in subTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
				</div>
				<div v-if="!showImgs" class="formData-row-line">
					<FormItem
						:label="$t('scoretemplate_compontents_scoremodify_533')"
						prop="officeId"
						:rules="{required: true,  message: $t('scoretemplate_compontents_scoremodify_534'), trigger: 'change'}"
					>
						<!--:rules="{required: true,type:'number', message: $t('pushsettings_index_504'), trigger: 'change'}">-->
						<Select
							:disabled="showDataobj.disabled=='yes'"
							:placeholder="$t('pushsettings_index_505')"
							v-model="formData.officeId"
							clearable
							style="width:400px;"
						>
							<Option
								v-for="item in officeList"
								:value="item.officeId"
								:key="item.officeId"
							>{{ item.officeName }}</Option>
						</Select>
					</FormItem>
				</div>
				<div v-if="!showImgs" class="formData-row-line" style="margin-bottom: 0">
					<FormItem
						:label="$t('scoretemplate_compontents_scoremodify_535')"
						prop="points"
						:rules="{required: true, type:'number', message: $t('pushsettings_index_504'), trigger: 'change'}"
					>
						<InputNumber
							:disabled="showDataobj.disabled=='yes'"
							style="width:82px;margin-right:4px;"
							:min="1"
							v-model="formData.points"
						></InputNumber>
						{{$t('scoretemplate_compontents_scoremodify_536')}}
					</FormItem>
				</div>
			</Form>
			<div slot="footer" v-if="showDataobj.disabled=='yes'">
				<Button @click="cancelAddScore">{{$t('courselist_compontents_servicecontent_216') }}</Button>
			</div>
			<div slot="footer" v-else>
				<Button @click="cancelAddScore">{{$t('classroom_allscore_53')}}</Button>
				<Button
					type="primary"
					@click="submitAddScore"
				>{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import { mapMutations } from "vuex";
import valid, {
	errors,
	sysUser,
	sysAttachment,
	jxPointsTpl,
	api
} from "../../../libs/request";
import bigTable from "@public/modules/bigTable.vue";
import cosUpload from '@public/modules/cosUpload';
export default {
	components: { bigTable,cosUpload },
	mounted() {
		this.findOffice();
	},
	computed: {
		uploadImg: function() {
			return api.fileAttachmentUploadUrl();
		}
	},
	data() {
		return {
			objectType:'pointsTpl',
			objectId: '',
			kind: 'image',
			subTypeList: [
				//(0：惩罚；1：奖励; 2: 积分兑换)
				{
					value: "0",
					label: this.$t("classroom_allscore_49")
				},
				{
					value: "1",
					label: this.$t("classroom_allscore_48")
				},
				{
					value: "2",
					label: this.$t("classroom_evaluation_92")
				}
			],
			officeList: [],
			iconPathSave: "",
			formData: {
				// selImg:
				//   "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2076837581,1213258388&fm=26&gp=0.jpg",
				iconPath: "",
				name: "",
				type: "",
				subType: "",
				points: null,
				officeId: "",
				nameEn: ""
			},
			showSelectImg: false,
			showImgs: false,
			showModel: false,
			isEdit: false,
			detailFormData: "",
			ruleCustom: {},
			showDataobj: {},
			isAction: false,
			dataUploadFile:{
                bizId: '',
                bizType: 'pointsTpl',
                isSingle: true,
            },
            headers:{},
		};
	},

	methods: {
		...mapMutations(["updateLoadingStatus"]),
		hasUploadFile(attachmentObj){
			this.showImgs = false;
			this.$Message.success(
				this.$t("scoretemplate_compontents_scoremodify_545")
			);
			this.getImgList("success");
		},
		cancelAddScore() {
			this.$refs["formData"].resetFields();
			this.showModel = false;
		},
		showImgsFn() {
			if (this.showDataobj.disabled != "yes") {
				this.showImgs = !this.showImgs;
			}
			// this.showImgs = true;
		},
		selectImg(filePath) {
			this.showSelectImg = true;
			this.showImgs = false;
			// this.formData.iconPath = this.filePathSrc;
			this.formData.iconPath = filePath;
			this.$refs["formData"].validateField("iconPath", function(val) {});
		},
		handleFormatError(file) {
			this.$Notice.warning({
				title: this.$t("scoretemplate_compontents_scoremodify_542"),
				desc:
					this.$t("scoretemplate_compontents_scoremodify_543") +
					file.name +
					this.$t("scoretemplate_compontents_scoremodify_544")
			});
		},
		HandleSuccess(data) {
			// let id = new Date().getTime();
			console.log(this.getImgSrcList);
			this.showImgs = false;
			this.$Message.success(
				this.$t("scoretemplate_compontents_scoremodify_545")
			);
			this.getImgList("success");
		},
		validatePass(rule, value, callback) {
			let lenVal = value;
			let len = lenVal.replace(/[^\u0000-\u00ff]/g, "aa").length;
			let reg = /^\s{0,}$/;
			if (!value || value[0] === "") {
				callback(
					new Error(
						this.$t("scoretemplate_compontents_scoremodify_546")
					)
				);
			} else if (reg.test(value)) {
				callback(new Error(this.$t("hootie.onlySpace")));
			} else if (len >= 36) {
				callback(
					new Error(
						this.$t("scoretemplate_compontents_scoremodify_547")
					)
				);
			} else {
				callback();
			}
		},
		validatePass1(rule, value, callback) {
			let lenVal = value;
			let len = lenVal.replace(/[^\u0000-\u00ff]/g, "aa").length;
			let reg = /^[\sa-zA-Z0-9]+$/;
			let reg1 = /^\s{0,}$/;
			if (!value || value[0] === "") {
				callback(
					new Error(
						this.$t("scoretemplate_compontents_scoremodify_548")
					)
				);
			} else if (reg1.test(value)) {
				callback(new Error(this.$t("hootie.onlySpace")));
			} else if (!reg.test(value)) {
				callback(new Error(this.$t("hootie.engAndNumber")));
			} else if (len >= 36) {
				callback(
					new Error(
						this.$t("scoretemplate_compontents_scoremodify_547")
					)
				);
			} else {
				callback();
			}
		},
		nameChange() {
			// this.formData.name = this.formData.name.replace(/\s+/g, "");
		},
		findOffice() {
			this.updateLoadingStatus({ isLoading: true });
			jxPointsTpl
				.findOffice()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.officeList = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		getImgList(success) {
			this.updateLoadingStatus({ isLoading: true });
			sysAttachment
				.findAttachmentByTypes({ types: "pointsTpl" })
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.getImgSrcList = res.data.data;
						if (success == "success") {
							this.showImgs = true;
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		//删除附件--虚拟删除
		deleteById(id, remove, filePath, index) {
			if (remove == "remove") {
				this.showImgs = false;
			}
			sysAttachment
				.deleteById({ id: id })
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.$Message.success(
							this.$t("scoretemplate_compontents_scoremodify_549")
						);
						this.showImgs = true;
						if (this.isEdit && filePath == this.formData.iconPath) {
							this.formData.iconPath = this.iconPathSave;
						}
						if (
							!this.isEdit &&
							filePath == this.formData.iconPath
						) {
							this.formData.iconPath = "";
						}
						this.getImgSrcList.splice(index, 1);
						this.getImgList();
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		showNewScore(obj, type) {
			this.showDataobj = obj;
			this.showModel = true;
			this.showImgs = false;
			(this.formData = {
				iconPath: "",
				name: "",
				type: "",
				subType: "",
				points: null,
				officeId: "",
				nameEn: ""
			}),
				this.updateLoadingStatus({ isLoading: true });
			this.getImgList();
			//  (0：惩罚；1：奖励; 2: 积分兑换)
			if (type == "0") {
				this.subTypeList = [
					{
						value: "0",
						label: this.$t(
							"scoretemplate_compontents_scoremodify_539"
						)
					}
				];
			} else if (type == "1") {
				this.subTypeList = [
					{
						value: "1",
						label: this.$t(
							"scoretemplate_compontents_scoremodify_540"
						)
					}
				];
			} else if (type == "2") {
				this.subTypeList = [
					{
						value: "2",
						label: this.$t(
							"scoretemplate_compontents_scoremodify_541"
						)
					}
				];
			}
			if (obj && obj.id) {
				this.isEdit = true;
				jxPointsTpl
					.form({ id: obj.id })
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							let data = res.data.data;
							this.detailFormData = res.data.data;
							this.formData.iconPath = data.iconPath;
							this.iconPathSave = data.iconPath;
							this.formData.officeId = data.officeId;
							this.formData.nameEn = data.nameEn;
							this.formData.name = data.name;
							this.formData.type = data.type;
							this.formData.subType = data.subType;
							this.formData.points =
								data.points < 0
									? Math.abs(data.points)
									: data.points;
							this.showSelectImg = true;
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({ isLoading: false });
					});
			} else {
				this.isEdit = false;
				this.$refs["formData"].resetFields();
			}
		},
		// addScoreMethod(){

		// },
		submitAddScore() {
			this.$refs["formData"].validate(validres => {
				if (validres) {
					if (this.formData.subType == 2) {
						this.formData.type = 1;
					} else {
						this.formData.type = 0;
					}
					if (
						this.formData.subType != 1 &&
						this.formData.points >= 0
					) {
						this.formData.points = Number(
							"-" + this.formData.points
						);
					}
					let paramObj;
					if (this.isEdit) {
						paramObj = Object.assign(
							{},
							this.detailFormData,
							this.formData
						);
					} else {
						paramObj = this.formData;
					}
					console.log("this.isAction ===" + this.isAction)
					if(this.isAction){ //防止重复提交
						return
					}
					this.isAction = true
					this.updateLoadingStatus({ isLoading: true });
					jxPointsTpl
						.save(paramObj)
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								this.showModel = false;
								this.$Message.success(
									this.isEdit
										? this.$t(
												"scoretemplate_compontents_scoremodify_550"
										  )
										: this.$t(
												"scoretemplate_compontents_scoremodify_551"
										  )
								);
								this.isEdit = false;
								this.$emit("updateList");
							}
						})
						.catch(errors.call(this))
						.finally(() => {
							let _this = this
							setTimeout(()=>{
								_this.isAction = false
							},300)
							this.updateLoadingStatus({ isLoading: false });
						});
				} else {
					if (this.isEdit) {
						this.$Message.error(
							this.$t("scoretemplate_compontents_scoremodify_552")
						);
					}
					this.updateLoadingStatus({ isLoading: false });
				}
			});
		}
	}
};
</script>