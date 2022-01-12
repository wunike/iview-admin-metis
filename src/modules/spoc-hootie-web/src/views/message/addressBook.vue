<style lang="less">
.address-book-container {
	background: #fff;
	position: relative;
	.ivu-modal-body {
		padding: 0;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.ivu-icon-ios-close:before {
		/*display: none !important;*/
	}
	.ivu-modal-footer {
		border: none;
	}
	.abc-left {
		width: 299px;
		border-right: 1px solid #eee;
	}
	.abc-right {
		width: 300px;
		height: 480px;
		position: relative;
		padding-top: 25px;
		padding-bottom: 50px;
		.footer-button {
			position: absolute;
			right: 16px;
			bottom: 16px;
		}
		.abc-header {
			display: block;
			margin-left: 20px;
			color: #999;
			font-size: 14px;
			padding-bottom: 30px;
			span {
				font-size: 14px;
				font-weight: normal;
				color: #999;
			}
		}
		.abc-body {
			height: 352px;
			overflow-y: auto;
			.abc-body-item {
				height: 32px;
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				padding-left: 20px;
				padding-right: 16px;
				position: relative;
				img {
					width: 16px;
					height: 16px;
					padding-right: 8px;
				}
				span {
					font-size: 14px;
					font-weight: 400;
					color: rgba(73, 80, 96, 1);
					padding-right: 6px;
				}
				b {
					font-size: 12px;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
				}
				.my-icon {
					font-size: 14px;
					color: #d9d9d9;
					position: absolute;
					top: 9px;
					right: 20px;
					cursor: pointer;
				}
			}
		}
	}
	.right {
		transition: all 0.3s;
		transform-origin: center;
		transform: rotate(-180deg);
		font-size: 15px;
		margin-right: 5px;
	}
	.down {
		transition: all 0.3s;
		transform-origin: center;
		transform: rotate(-90deg);
		font-size: 15px;
		margin-right: 5px;
	}
	.class-box {
		height: 362px;
		overflow-y: auto;
		.cb-header {
			padding-left: 20px;
			height: 32px;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			span {
				margin-left: 8px;
			}
		}
		.sel-all {
			padding-left: 20px;
			height: 32px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			span {
				margin-left: 10px;
			}
		}
	}
	.cb-item {
		padding-left: 20px;
		height: 32px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		position: relative;
		.cb {
			position: absolute;
			right: 0px;
			top: 5px;
			> span {
				&:nth-last-of-type(1) {
					display: none;
				}
			}
		}
		.cb-1 {
			position: absolute;
			right: 0px;
			top: 5px;
		}
		span {
			margin-left: 8px;
			color: #495060;
			font-size: 14px;
		}
		img {
			margin-left: 6px;
		}
	}
	.history {
		position: absolute;
		left: 16px;
		bottom: 20px;
		font-size: 12px;
		font-weight: 400;
		color: rgba(68, 188, 183, 1);
		line-height: 17px;
	}
}
</style>

<template>
	<div>
		<Modal
			class="address-book-container"
			transfer
			footer-hide
			width="600"
			height="480"
			:mask-closable="false"
			v-model="showModel"
			class-name="vertical-center-modal"
		>
			<div class="abc-left">
				<div style="padding-left:20px;padding-top:16px;padding-bottom:20px;background: #fff;">
					<Input
						v-model="search"
						icon="ios-search"
						:placeholder="$t('message_addressbook_267')"
						style="width: 224px;margin-right:10px;"
						@on-enter="getListByClass"
						@on-click="getListByClass"
					/>
				</div>
				<div class="class-box">
					<div class="cb-header">
						<img src="../../assets/img/class.png" />
						<span>{{ name }}</span>
					</div>
					<div class="sel-all">
						<span>{{ $t('message_addressbook_268') }}</span>
						<Checkbox v-model="selAll" @on-change="selAllFn"></Checkbox>
					</div>
					<div class="cb-item-1" v-for="item in classList" :key="item.id">
						<div class="cb-item _item">
							<Icon
								style="cursor: pointer"
								size="15"
								type="ios-arrow-back"
								:class="{ down: item.expand, right: !item.expand }"
								@click.stop="item.expand = !item.expand"
							/>
							<img style="width:14px;height:12px;" src="../../assets/img/sub-class.png" />
							<span>{{ $t('message_addressbook_269', [item.classCourseName, item.personCount]) }}</span>
							<Checkbox
								class="cb-1"
								v-model="item.select"
								:label="item.classCourseId"
								@on-change="selectItems(item)"
							></Checkbox>
						</div>
						<div v-if="item.children && item.expand">
							<CheckboxGroup v-model="item.checkAllGroup" @on-change="checkAllGroupChange">
								<div
									class="cb-item _item"
									style="cursor: pointer"
									v-for="item1 in item.children"
									:key="item1.studentId"
								>
									<img style="width:16px;height:16px;margin-left:24px;" :src="item1.avator" />
									<span v-if="$i18n.locale == 'zh-CN'">{{ item1.studentName }}</span>
									<span v-else>{{ item1.studentEnName }}</span>
									<Checkbox class="cb" :label="item1.studentId"></Checkbox>
								</div>
							</CheckboxGroup>
						</div>
					</div>
				</div>
			</div>
			<div class="abc-right">
				<span v-if="selectStu.length < 1" class="abc-header">{{ $t('message_addressbook_270') }}</span>
				<span class="abc-header" v-else>
					{{ $t('message_addressbook_271') }}
					<span>{{ selectStu.length }}</span>
					{{ $t('message_addressbook_272') }}
				</span>
				<div class="abc-body">
					<div v-for="item in selectStu" class="abc-body-item">
						<img :src="item.avator" />
						<span v-if="$i18n.locale == 'zh-CN'">{{ item.studentName }}</span>
						<span v-else>{{ item.studentEnName }}</span>
						<b>{{ item.classCourseName }}</b>
						<Icon class="my-icon" type="ios-close-circle" @click="delStudent(item.studentId)" />
					</div>
				</div>
				<div class="footer-button">
					<Button style="margin-right:20px;" @click="cancel">{{ $t('classroom_allscore_53') }}</Button>
					<Button
						type="primary"
						@click="submit"
						:disabled="!selectStu.length"
					>{{ $t('message_addressbook_274') }}</Button>
				</div>
			</div>
			<a href="javascript:void(0)" class="history" @click="showHistory">
				<Icon type="ios-time-outline" :size="12" />
				{{ $t('spoc_hootie_web_49') }}
			</a>
		</Modal>
		<massEditor
			ref="massEditor"
			:stuList="selectStu"
			:officeId="officeId"
			@toHistory="toHistory"
			@close="close"
			@back="back"
			:isAgain="isAgain"
			:againPrm="againPrm"
		></massEditor>
		<history ref="history" :officeId="officeId" @close="close" @back="histroyBack" @again="again"></history>
	</div>
</template>
<script>
import massEditor from "./massEditor";
import history from "./history";
import valid, {
	errors,
	sysDict,
	jxChatMessage,
	jxChatDialog
} from "../../libs/request";
export default {
	props: {
		list: {
			type: Array,
			default: () => {
				return [];
			}
		},
		officeId: {
			type: [String, Number],
			default: ""
		}
	},
	data() {
		return {
			name: this.$t("message_addressbook_275"),
			showModel: false,
			search: "",
			selAll: false,
			selectStu: [],
			isAgain: false,
			classList: [],
			againPrm: {}
		};
	},
	computed: {
		//			classList() {
		//				let arr = [...this.list];
		//				return arr;
		//			}
	},
	components: {
		massEditor,
		history
	},

	mounted() {
		console.log(this.classList);
		this.getList();
	},

	methods: {
		showPop() {
			this.showModel = true;
		},
		checkAllGroupChange(arr) {
			let num = 0;
			let num1 = 0;
			let list = [];
			this.classList.forEach((item, index) => {
				let flag = false;
				item.children.forEach(obj => {
					if (item.checkAllGroup.indexOf(obj.studentId) == -1) {
						flag = true;
					} else {
						if (
							!list.find(v => v.studentId == obj.studentId) &&
							list.find(v => v.studentId == obj.studentId) != 0
						) {
							list.push(obj);
						}
					}
				});
				this.selectStu = list;
				if (flag) {
					item.select = false;
					num -= 1;
				} else {
					item.select = true;
					num += 1;
				}
			});
			if (num == this.classList.length) {
				this.selAll = true;
			} else {
				this.selAll = false;
			}
		},
		selAllFn() {
			this.selectStu = [];
			if (this.selAll) {
				this.classList.forEach((item, index) => {
					this.$set(item, "checkAllGroup", []);
					this.$set(item, "select", true);
					item.children.forEach(obj => {
						item.checkAllGroup.push(obj.studentId);
						if (
							!this.selectStu.find(
								v => v.studentId == obj.studentId
							) &&
							this.selectStu.find(
								v => v.studentId == obj.studentId
							) != 0
						) {
							this.selectStu.push(obj);
						}
					});
				});
			} else {
				this.classList.forEach((item, index) => {
					this.$set(item, "checkAllGroup", []);
					this.$set(item, "select", false);
				});
			}
		},
		selectItems(item) {
			if (item.select) {
				item.children.forEach(v => {
					item.checkAllGroup.push(v.studentId);
				});
			} else {
				this.$set(item, "checkAllGroup", []);
			}
			this.$nextTick(() => {
				let flag = false;
				let list = [];
				this.classList.forEach((item1, index) => {
					item1.children.forEach(obj => {
						if (item1.checkAllGroup.indexOf(obj.studentId) == -1) {
						} else {
							if (
								!list.find(v => v.studentId == obj.studentId) &&
								list.find(v => v.studentId == obj.studentId) !=
									0
							) {
								list.push(obj);
							}
						}
					});
					if (!item1.select) {
						flag = true;
					}
				});
				this.selectStu = list;
				if (flag) {
					this.selAll = false;
				} else {
					this.selAll = true;
				}
			});
		},
		cancel() {
			this.showModel = false;
			this.selectStu = [];
			this.selAll = false;
			this.classList.forEach((item, index) => {
				this.$set(item, "checkAllGroup", []);
				this.$set(item, "select", false);
				this.$set(item, "expand", false);
			});
			this.$emit("clearBook", false);
		},
		submit() {
			this.$refs.massEditor.massEditorShow = true;
			this.$nextTick(() => {
				setTimeout(() => {
					this.$refs.massEditor.show();
				}, 100);
			});
		},
		getList() {
			this.getListByClass();
		},
		getListByClass() {
			let params = {
				officeId: this.officeId
			};
			jxChatMessage
				.listByClass(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let list = [];
						let arr = res.data.data;
						arr.forEach((v, k) => {
							let datas = [];
							let expanded = this.classList[k]
								? this.classList[k].expand || false
								: false;
							let selected = this.classList[k]
								? this.classList[k].select || false
								: false;
							datas = v.jxStudentChatMessageVOS;
							list.push({
								title: v.classCourseName,
								classCourseName: v.classCourseName,
								classCourseId: v.classCourseId,
								personCount: v.personCount,
								sum: v.sum,
								expand: expanded,
								select: selected,
								checkAllGroup: [], // loading: false,
								children: datas,
								render: (h, { root, node, data }) => {
									return h(
										"span",
										{
											style: {
												display: "inline-block"
											},
											class: {
												"cb-item": true,
												_item: true
											}
										},
										[
											h(
												"span",
												{
													style: {
														display: "flex",
														"justify-content":
															"flex-start",
														"align-items": "center"
													}
												},
												[
													h("img", {
														attrs: {
															src: subClassImg
														},
														style: {
															width: "14px",
															height: "12px"
														}
													}),
													h(
														"span",
														data.classCourseName +
															"（" +
															data.personCount +
															this.$t(
																"message_index_291"
															)
													),
													h(
														"b",
														{
															style: {
																display:
																	data.sum > 0
																		? "inline"
																		: "none"
															}
														},
														data.sum > 0 &&
															data.sum < 100
															? data.sum
															: data.sum > 99
															? "99+"
															: ""
													)
												]
											)
										]
									);
								}
							});
							if (list.length == k + 1) {
								this.classList = list;
							}
						});
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					//						this.updateLoadingStatus({
					//							isLoading: false
					//						});
				});
		},
		delStudent(id) {
			this.selectStu = this.selectStu.filter(v => v.studentId != id);
			this.classList.forEach((item, index) => {
				let ind = item.checkAllGroup.indexOf(id);
				console.log(item.checkAllGroup, ind, id);
				if (ind != -1) {
					item.checkAllGroup.splice(ind, 1);
					item.select = false;
					this.selAll = false;
				}
			});
		},
		close() {
			this.cancel();
		},
		back() {
			this.$nextTick(() => {
				setTimeout(() => {
					this.$refs.massEditor.massEditorShow = false;
					this.isAgain = false;
				}, 100);
			});
		},
		showHistory() {
			this.$refs.history.historyShow = true;
			this.$nextTick(() => {
				setTimeout(() => {
					this.$refs.history.show();
				}, 100);
			});
		},
		histroyBack() {
			this.$refs.history.historyShow = false;
		},
		again(item) {
			this.isAgain = true;
			this.againPrm = item;
			console.log(this.againPrm);
			this.histroyBack();
			this.submit();
		},
		toHistory() {
			this.showHistory();
			// this.back();
		}
	}
};
</script>
