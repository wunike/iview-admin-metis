<style lang="less">
.editorMass {
	.headers {
		font-size: 18px;
		font-weight: 500;
		color: rgba(73, 80, 96, 1);
		line-height: 25px;
	}
	.body {
		.studentList {
			.info {
				font-size: 12px;
				font-weight: normal;
				color: rgba(153, 153, 153, 1);
				line-height: 18px;
				span {
					color: #44bcb7;
				}
			}
			.students {
				overflow: hidden;
				padding-top: 12px;
				.people {
					float: left;
					height: 24px;
					background: rgba(247, 248, 250, 1);
					border-radius: 4px;
					position: relative;
					padding: 0 12px;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin: 0 6px 12px;
					.name {
						font-size: 14px;
						font-weight: normal;
						color: rgba(73, 80, 96, 1);
						line-height: 24px;
					}
					.className {
						font-size: 12px;
						font-weight: normal;
						color: rgba(153, 153, 153, 1);
						line-height: 24px;
						padding-left: 6px;
					}
					.clear {
						position: absolute;
						top: -7px;
						right: -7px;
						font-size: 14px;
						color: rgba(153, 153, 153, 1);
						cursor: pointer;
					}
				}
			}
		}
	}
}
</style>

<template>
	<div v-if="massEditorShow">
		<Modal
			v-model="modal"
			:closable="false"
			footer-hide
			transfer
			class-name="vertical-center-modal editorMass"
			:width="800"
		>
			<p slot="header" class="headers">
				{{$t('spoc_hootie_web_56')}}
				<!-- 编辑内容 -->
			</p>
			<div class="body">
				<div class="studentList">
					<div class="info" v-if="isAll">
						{{$t('spoc_hootie_web_57')}}
						<!-- 全体通知 -->
					</div>
					<div class="info" v-else>
						<!-- 您将发送消息给 -->
						{{$t('spoc_hootie_web_58')}}
						<span>{{ stuList.length }}</span>
						{{$t('spoc_hootie_web_59')}}
						<!-- 个人 -->
					</div>
					<div class="students" v-if="!isAll">
						<div class="people" v-for="item in stuList" :key="item.studentId">
							<div class="name" v-if="$i18n.locale=='zh-CN'">{{ item.studentName }}</div>
							<div class="name" v-else-if="item.studentEnName">{{ item.studentEnName }}</div>
							<div class="name" v-else>{{ item.studentName }}</div>
							<div class="className">{{ item.classCourseName }}</div>
							<Icon class="my-icon clear" type="ios-close-circle" @click="delStu(item)" />
						</div>
					</div>
				</div>
				<myEditor ref="editor" @on-send="onSend" @uploadFile="uploadFile" @close="close" @back="back"></myEditor>
			</div>
		</Modal>
	</div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import myEditor from "./massMEditor";
import valid, { errors, jxChatGroupMessage } from "../../libs/request";
export default {
	props: {
		stuList: {
			type: Array,
			default: []
		},
		officeId: {
			type: [String, Number],
			default: ""
		},
		isAgain: {
			type: Boolean,
			default: false
		},
		againPrm: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {
			modal: false,
			massEditorShow: false,
			isAll: false
		};
	},
	computed: {
		...mapState(["userInfo"])
	},
	components: {
		myEditor
	},
	mounted() {
		console.log(this.stuList, 66666666666666666666);
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		show() {
			if (this.isAgain) {
				console.log(1212112);
				if (this.againPrm.toId == "@All") {
					this.isAll = true;
				} else {
					this.isAll = false;
					let toId = this.againPrm.toId.split(","),
						classCourseId = this.againPrm.classCourseId.split(","),
						classCourseName = this.againPrm.classCourseName.split(
							","
						),
						toName = this.againPrm.toName.split(",");
					let list = [];
					toName.forEach((v, k) => {
						list.push({
							studentId: toId[k],
							studentName: v,
							classCourseId: classCourseId[k],
							classCourseName: classCourseName[k]
						});
					});
					this.stuList = list;
				}
			}
			this.modal = true;
		},
		delStu(item) {
			this.stuList = this.stuList.filter(
				v => v.studentId != item.studentId
			);
		},
		onSend(data) {
			let toId = [],
				classCourseId = [],
				classCourseName = [],
				toName = [];
			// if (this.isAgain) {
			//     toId = this.againPrm.toId.split(',');
			//     classCourseId = this.againPrm.classCourseId.split(',');
			//     toName = this.againPrm.toName.split(',');
			//     console.log(toName)
			// } else {
			this.stuList.forEach(v => {
				toId.push(v.studentId);
				classCourseId.push(v.classCourseId);
				classCourseName.push(v.classCourseName);
				toName.push(
					this.$i18n.locale == "zh-CN"
						? v.studentName
						: v.studentEnName
				);
			});
			// }
			let payload = {
				act: "say",
				fromId: this.userInfo.id,
				fromRoleId: this.fromRoleId,
				toId: toId.join(","),
				officeId: this.officeId,
				classCourseId: classCourseId.join(","),
				classCourseName: classCourseName.join(","),
				toName: toName.join(","),
				fromName: this.userInfo.name
			};
			payload.fromAvator = location.origin + this.userInfo.photo;
			payload.msgType = data.msgType;
			payload.message = data.message;
			this.save(payload);
			this.$refs.editor.content = "";
		},
		uploadFile(data) {
			let toId = [],
				classCourseId = [],
				classCourseName = [],
				toName = [];
			// if (this.isAgain) {
			//     toId = this.againPrm.toId.split(',');
			//     classCourseId = this.againPrm.classCourseId.split(',');
			//     toName = this.againPrm.toName.split(',');
			// } else {
			this.stuList.forEach(v => {
				toId.push(v.studentId);
				classCourseId.push(v.classCourseId);
				classCourseName.push(v.classCourseName);
				toName.push(
					this.$i18n.locale == "zh-CN"
						? v.studentName
						: v.studentEnName
				);
			});
			// }
			let payload = {
				act: "say",
				fromId: this.userInfo.id,
				fromRoleId: this.fromRoleId,
				toId: toId.join(","),
				officeId: this.officeId,
				classCourseId: classCourseId.join(","),
				classCourseName: classCourseName.join(","),
				toName: toName.join(","),
				fromName: this.userInfo.name
			};
			payload.fromAvator = location.origin + this.userInfo.photo;
			payload.msgType = data.msgType;
			payload.filePath = data.filePath;
			payload.message = JSON.stringify(data.message);
			this.save(payload);
		},
		save(params) {
			this.updateLoadingStatus({
				isLoading: true
			});
			jxChatGroupMessage
				.save(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.back();
						this.$nextTick(() => {
							this.$Message.success(this.$t('modules_spoc_hootie_web_src_views_message_masseditor_2045'));
							this.$emit("close");
						});
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		close() {
			this.$emit("close");
		},
		back() {
			this.modal = false;
			this.$nextTick(() => {
				this.$emit("back");
			});
		}
	}
};
</script>
