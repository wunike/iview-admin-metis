<style lang="less">
.editScheduleModel {
	.w50 {
		display: inline-block;
		width: 50%;
	}
	.w100 {
		display: inline-block;
		width: 100%;
	}
	.w250p {
		width: 250px;
	}
	&.ivu-form {
		.ivu-form-item > .ivu-form-item-label {
			color: #999;
		}
		.ivu-form-item-Tip .ivu-form-item-error-tip {
			left: 84px;
		}
	}
}
</style>
<template>
	<div>
		<Modal
			v-model="addModal"
			:title="$t('memberlist_compontents_modify_237')"
			width="800"
			:mask-closable="false"
		>
			<Form ref="formRef" :model="addObj" class="editScheduleModel" :label-width="125">
				<FormItem :label="$t('memberlist_compontents_modify_238')" class="w50" prop="code">
					<Input v-model="addObj.code" class="w250p" disabled></Input>
				</FormItem>
				<!-- <FormItem class="w50" style=" visibility: hidden;"></FormItem> -->
				<!-- :rules="{required: true, message: $t('memberlist_compontents_modify_239'), trigger: 'change'}" -->
				<FormItem
					:label="$t('memberlist_compontents_modify_240')"
					class="w50"
					prop="name"
					:rules="{required: true,validator: validatePass1,  trigger: 'change'}"
				>
					<Input v-model="addObj.name" class="w250p"></Input>
				</FormItem>
				<FormItem
					:label="$t('memberlist_compontents_modify_241')"
					class="w50"
					style="margin-bottom:0px;"
					prop="enName"
					:rules="{required: true, message: $t('memberlist_compontents_modify_242'), trigger: 'change'}"
				>
					<Input v-model="addObj.enName" class="w250p"></Input>
				</FormItem>
				<!-- <div  style="display:flex"> -->
				<FormItem
					:style="{'padding-left': $i18n.locale == 'zh-CN' ? '30px':'45px','margin-bottom':'0px'}"
					label=""
					:label-width="10"
					class="w50 ivu-form-item-Tip"
					prop="phone"
					:rules="{required: true,validator: validatePass, message: $t('memberlist_compontents_modify_243'), trigger: 'change'}"
				>
					<Tooltip :content="$t('memberlist_compontents_modify_244')" theme="light" placement="top">
						<Icon type="ios-help-circle" color="#999" size="14" />
					</Tooltip>
					<span style="margin-right:12px;color:#999">{{$t('memberlist_compontents_modify_245')}}</span>
					<Input v-model="addObj.phone" class="w250p"></Input>
				</FormItem>
				<!-- </div> -->
			</Form>
			<div slot="footer">
				<Button @click="saveCancel">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="saveOk">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import { mapMutations } from "vuex";
import valid, { errors, sysUser, jxStudent } from "../../../libs/request";
import bigTable from "@public/modules/bigTable.vue";
export default {
	components: { bigTable },
	mounted() {
		// this.getShowTitle();
	},
	data() {
		return {
			lessonDate: "",
			addModal: false,
			teacherLoading: false,
			assistLoading: false,
			classTeacherLoading: false,
			// teacherList: [],
			// assistList: [],
			// classTeacherList: [],
			// classRoomList: [],
			// officeId: "",
			validatePass: (rule, value, callback) => {
				if (!value || value[0] === "") {
					callback(
						new Error(this.$t("memberlist_compontents_modify_248"))
					);
				} else if (!/^1[3456789]\d{9}$/.test(value)) {
					callback(
						new Error(this.$t("memberlist_compontents_modify_249"))
					);
				} else {
					callback();
				}
			},
			validatePass1: (rule, value, callback) => {
				let lenVal = value;
				let len = lenVal.replace(/[^\u0000-\u00ff]/g, "aa").length;
				if (!value || value[0] === "") {
					callback(
						new Error(this.$t("memberlist_compontents_modify_250"))
					);
				} else if (len >= 13) {
					callback(
						new Error(this.$t("memberlist_compontents_modify_251"))
					);
				} else {
					callback();
				}
			},
			addObj: {
				// id:'',
				// code: "",
				// name: "",
				// enName: "",
				// phone: ""
			}
		};
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),

		modifyRefShowMethods(val) {
			console.log(val);
			let rowObj = JSON.parse(JSON.stringify(val));
			this.$refs.formRef.resetFields();
			this.addModal = true;
			this.addObj = rowObj;
		},
		saveOk() {
			let Obj = {
				id: this.addObj.id,
				code: this.addObj.code,
				name: this.addObj.name,
				enName: this.addObj.enName,
				phone: this.addObj.phone
			};
			this.$refs.formRef.validate(validRes => {
				if (validRes) {
					this.updateLoadingStatus({ isLoading: true });
					jxStudent
						.saveBaseInfo(Obj)
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								this.$Message.success(
									this.$t("courselist_compontents_modify_200")
								);
								this.$emit("emitGetListData");
								this.addModal = false;
							}
						})
						.catch(errors.call(this))
						.finally(() => {
							this.updateLoadingStatus({ isLoading: false });
						});
				}
			});
		},
		saveCancel() {
			this.addModal = false;
		}
	}
};
</script>