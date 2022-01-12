<style lang="less">
.mm-detail-container {
	height: 100%;
	.chats-record-content {
		height: ~"calc(100% - 121px)";
		padding-top: 16px;
	}
	.chats-record {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		b {
			font-weight: normal;
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
		.cr-left {
			position: relative;
			height: 100%;
			width: 260px;
			background: #fff;
			.class-box {
				height: 204px;
				background: #fff;
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
			}
			.compass-box {
				height: calc(~"100% - 98px");
				background: #fff;
				overflow-y: auto;
				.cb-item-1 {
					cursor: pointer;
				}
				.cb-item {
					padding-left: 20px;
					height: 32px;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					span {
						margin-left: 8px;
						color: #495060;
						font-size: 14px;
					}
					img {
						margin-left: 3px;
						height: 24px;
						width: 24px;
					}
				}
				._item {
					b {
						vertical-align: middle;
						transform: translateX(5px);
						height: 16px;
						border-radius: 10px;
						min-width: 14px;
						background: #e64630;
						border: 1px solid transparent;
						color: #fff;
						line-height: 15px;
						text-align: center;
						padding: 0 4px;
						font-size: 12px;
						white-space: nowrap;
						box-shadow: 0 0 0 1px #fff;
					}
				}
			}
			.chat-header {
				padding-left: 20px;
				height: 32px;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				background: linear-gradient(
					90deg,
					rgba(121, 223, 220, 1) 0%,
					rgba(68, 188, 183, 1) 100%
				);
				span {
					margin-left: 10px;
					color: #fff;
				}
			}
			.ivu-tree {
				padding-left: 20px;
				.ivu-tree-children {
					li {
						.cb-item {
							display: flex;
							flex-direction: row;
							justify-content: flex-start;
							align-items: center;
							span {
								margin-left: 8px;
								color: #495060;
								font-size: 14px;
							}
							img {
								margin-left: 3px;
								height: 24px;
								width: 24px;
							}
						}
						._item {
							vertical-align: middle;
							b {
								margin-left: 6px;
								height: 16px;
								border-radius: 10px;
								min-width: 14px;
								background: #e64630;
								border: 1px solid transparent;
								color: #fff;
								line-height: 15px;
								text-align: center;
								padding: 0 4px;
								font-size: 12px;
								white-space: nowrap;
								box-shadow: 0 0 0 1px #fff;
							}
						}
					}
				}
			}
			.ivu-badge-count {
				vertical-align: middle;
				transform: translateX(50%);
				height: 16px;
				border-radius: 10px;
				min-width: 14px;
				background: #e64630;
				border: 1px solid transparent;
				color: #fff;
				line-height: 15px;
				text-align: center;
				padding: 0 4px;
				font-size: 12px;
				white-space: nowrap;
				box-shadow: 0 0 0 1px #fff;
			}
			.chat-body {
				height: calc(~"100% - 332px + 58px");
				background: #fff;
				overflow-y: auto;
				.chat-item {
					&.no-diolog {
						background: #f7f8fa;
						.ci-r .ci-r-1 {
							color: #999;
						}
					}
					&.active {
						cursor: default;
						background: #e3f2fd;
					}
					height: 62px;
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: flex-start;
					background: #fff;
					cursor: pointer;
					border-bottom: 1px solid #f1f1f1;
					&:nth-last-of-type(1) {
						border-bottom: none;
					}
				}
				.ci-l {
					width: 66px;
					padding-top: 16px;
					padding-left: 34px;
					&.gray {
						img {
							filter: grayscale(100%);
							filter: gray;
						}
					}
					img {
						height: 24px;
						width: 24px;
						border-radius: 24px;
					}
				}
				.ci-r {
					margin-left: 8px;
					width: calc(~"100 - 74px");
					.ci-r-1 {
						font-size: 14px;
						font-weight: normal;
						color: rgba(73, 80, 96, 1);
						margin-top: 10px;
						b {
							margin-left: 6px;
							height: 16px;
							border-radius: 10px;
							min-width: 14px;
							background: #e64630;
							border: 1px solid transparent;
							color: #fff;
							line-height: 15px;
							text-align: center;
							padding: 0 4px;
							font-size: 12px;
							white-space: nowrap;
							box-shadow: 0 0 0 1px #fff;
						}
					}
					.ci-r-2 {
						font-size: 12px;
						font-weight: normal;
						color: rgba(153, 153, 153, 1);
					}
					.ci-r-3 {
						font-size: 14px;
						font-weight: normal;
						color: rgba(102, 102, 102, 1);
					}
				}
			}
			.change-compass {
				background: #fff;
				padding: 16px 20px;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				span {
					font-size: 16px;
					font-weight: 400;
					color: rgba(73, 80, 96, 1);
				}
			}
		}
		.cr-right {
			height: 100%;
			width: calc(~"100% - 266px");
			background: #fff;
			border-radius: 4px;
			.crr-header {
				height: 64px;
				width: 100%;
				position: relative;
				.crr-header-1 {
					height: 64px;
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					span {
						display: inline-block;
						height: 24px;
						width: 48px;
						line-height: 24px;
						text-align: center;
						font-size: 12px;
						color: rgba(73, 80, 96, 1);
						cursor: pointer;
						margin-right: 40px;
					}
					.active {
						cursor: default;
						color: #fff;
						background: linear-gradient(to right, #79dfdc, #44bcb7);
					}
				}
				.crr-header-2 {
					position: absolute;
					right: 16px;
					top: 16px;
				}
			}
			.crr-body {
				height: ~"calc(100% - 64px)";
			}
		}
	}
	.chat-footer {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 36px;
		background: #fff;
		padding-left: 20px;
		padding-top: 8px;
	}
	.scroll-left {
		position: absolute;
		left: 0;
		right: 0;
		top: 58px;
		bottom: 0;
		padding-bottom: 36px;
	}
}
</style>

<template>
	<div class="mm-detail-container">
		<infos></infos>
		<div class="chats-record-content">
			<div class="chats-record">
				<div class="cr-left">
					<div class="change-compass">
						<Icon
							@click="changeSchoolFn"
							size="26"
							color="#999999"
							type="ios-list"
							style="cursor: pointer"
						/>
						<span>{{officeName}}</span>
					</div>
					<div v-if="changeSchool">
						<div style="padding-left:20px;background: #fff;padding-bottom:8px;">
							<Input
								@on-change="filterCompassDate"
								v-model="searchSchool"
								icon="ios-search"
								:placeholder="$t('message_addressbook_267')"
								style="width: 220px;"
							/>
						</div>
						<div class="compass-box">
							<div
								class="cb-item-1"
								@click="chooseCompass(item)"
								v-for="(item, i) in compassData"
								:key="i"
							>
								<div class="cb-item _item">
									<img style="width:14px;height:12px;" src="../../assets/img/sub-class.png" />
									<span>{{$t('messagemanagement_detail_333', [item.officeName,item.personCount||0])}}</span>
									<!-- <b v-if="item.sum > 0">{{item.sum > 0 && item.sum  < 100 ? item.sum:  item.sum  > 99 ? '99+' : ''}}</b> -->
								</div>
							</div>
						</div>
					</div>
					<div v-else class="scroll-left">
						<div style="padding-left:20px;background: #fff;padding-bottom:8px;position: relative;">
							<Input
								v-model.trim="search"
								icon="ios-search"
								:placeholder="$t('message_addressbook_267')"
								clearable
								style="width: 220px"
							/>
						</div>
						<search-lists
							v-if="search"
							:keyWord="search"
							:officeId="officeId"
							:stuId="stuId"
							@onClickChatRecord="clickChatRecord"
							@onClickChat="searchClickChat"
						/>
						<div class="class-box">
							<div class="cb-header">
								<img src="../../assets/img/class.png" />
								<span>{{$t('message_index_285')}}</span>
							</div>
							<Tree :data="classList" :load-data="loadData" :render="renderContent"></Tree>
						</div>
						<div class="chat-header">
							<img src="../../assets/img/chat-icon.png" />
							<span>{{$t('messagemanagement_components_searchlists_325')}}</span>
						</div>
						<div class="chat-body">
							<div
								:class="{active:item.teacherId == onlyId, 'no-diolog': item.dialogId == -1}"
								class="chat-item"
								@click="clickChat(item)"
								v-for="(item, index) in chatData"
								:key="index"
							>
								<div class="ci-l" :class="{gray: item.dialogId == -1}">
									<img v-if="item.avator" :src="item.avator" />
									<img v-else src="../../assets/img/touxiang.png" />
								</div>
								<div class="ci-r">
									<!-- <div class="ci-r-1">{{item.teacherName}}<b v-if="item.sum && item.sum > 0">{{item.sum}}</b></div> -->
									<div class="ci-r-1">{{item.teacherName}}</div>
									<div class="ci-r-2">{{item.classCourseName}}</div>
								</div>
							</div>
						</div>
						<div class="chat-footer">
							<Checkbox
								v-model="showAllNotChat"
								@on-change="getListTeacherByLaster"
							>{{$t('messagemanagement_detail_336')}}</Checkbox>
						</div>
					</div>
				</div>
				<div class="cr-right">
					<div class="crr-header">
						<div class="crr-header-1">
							<span
								:class="{active:curr == '1'}"
								@click="showMessage('1')"
							>{{$t('message_index_287')}}</span>
							<span
								:class="{active:curr == '4'}"
								@click="showMessage('4')"
							>{{$t('message_index_288')}}</span>
							<span
								:class="{active:curr == '3'}"
								@click="showMessage('3')"
							>{{$t('message_index_289')}}</span>
						</div>
						<div class="crr-header-2">
							<DatePicker
								@on-change="changeDate"
								:value="dateRange"
								type="daterange"
								separator=" ~ "
								:placeholder="$t('message_index_290')"
								style="width: 224px"
							></DatePicker>
						</div>
					</div>
					<div class="crr-body">
						<histroy-lists ref="histroyLists" :curr="curr" :stuId="stuId" :dateRange="dateRange"></histroy-lists>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import subClassImg from "../../assets/img/sub-class.png";
import defaultImg from "../../assets/img/touxiang.png";
import infos from "./components/infos.vue";
import histroyLists from "./components/histroyLists.vue";
import searchLists from "./components/searchLists.vue";
import valid, { errors, jxChatMessage } from "../../libs/request";
export default {
	name: "hootie.messageManagement.detail",
	components: {
		infos,
		histroyLists,
		searchLists
	},
	data() {
		return {
			search: "",
			classList: [],
			officeName: "",
			stuId: "",
			chatData: [],
			curr: "1",
			onlyId: "",
			showAllNotChat: "",
			dialogId: "",
			changeSchool: false,
			searchSchool: "",
			compassData: [],
			compassDataCopy: [],
			officeId: "",
			dateRange: []
		};
	},
	mounted() {
		this.stuId = this.$route.query.id;
		this.officeId = this.$route.query.officeId;
		// this.officeName = this.$route.query.officeName;
		setTimeout(() => {
			this.$nextTick(() => {
				this.getListByClass();
				this.getListTeacherByLaster();
			});
		}, 1000);
		this.getListByXq();
	},

	methods: {
		...mapMutations(["updateLoadingStatus"]),
		showMessage(idx) {
			this.curr = idx;
		},
		searchClickChat(item, str) {
			this.search = "";
			this.clickChat(item, str);
		},
		clickChatRecord(item) {
			this.$refs.histroyLists.showSearchChatRecordLists(item);
		},
		clickChat(item, str) {
			// 点击教室，查看聊天记录
			// console.log(item)
			this.onlyId = item.teacherId;
			this.dialogId = item.dialogId;
			// if(item.dialogId == '-1') {
			//     this.$Message.error(this.$t('messagemanagement_detail_341'));
			//     return false;
			// }
			// console.log(item.dialogId)
			// this.findHistory(item.dialogId);
			this.$refs.histroyLists.uploadParams(this.dialogId);
		},
		getListByClass() {
			// 班级列表
			this.updateLoadingStatus({
				isLoading: true
			});
			let params = {
				officeId: this.officeId,
				stuId: this.stuId
			};
			jxChatMessage
				.listByClass(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let list = [];
						let arr = res.data.data;
						// console.log('arr')
						// console.log(arr)
						arr.forEach(v => {
							list.push({
								title: v.classCourseName,
								classCourseName: v.classCourseName,
								classCourseId: v.classCourseId,
								jxStudentChatMessageVOS:
									v.jxStudentChatMessageVOS,
								personCount: v.personCount,
								sum: v.sum,
								loading: false,
								children: [],
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
																"messagemanagement_detail_342"
															)
													)
													// h('b', {
													//     style: {
													//         display: data.sum > 0 ? 'inline' : 'none'
													//     }
													// }, data.sum > 0 && data.sum < 100 ? data.sum : data.sum > 99 ? '99+' : ''),
												]
											)
										]
									);
								}
							});
						});
						// console.log(list)
						this.classList = list;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		loadData(item, callback) {
			// 获取某个班级下面的教师列表
			let datas = [];
			let params = {
				classCourseId: item.classCourseId,
				stuId: this.stuId
			};
			jxChatMessage
				.listByTeacher(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						datas = res.data.data;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					callback(datas);
				});
		},
		// 渲染教师列表的方式
		renderContent(h, { root, node, data }) {
			return h(
				"div",
				{
					style: {
						display: "inline-block",
						cursor: "pointer"
					},
					class: {
						"cb-item": true,
						_item: true
					},
					on: {
						click: () => {
							this.clickChat(data);
						}
					}
				},
				[
					h(
						"div",
						{
							style: {
								display: "flex",
								"justify-content": "flex-start",
								"align-items": "center"
							}
						},
						[
							h("img", {
								attrs: {
									src: data.avator || defaultImg
								},
								style: {
									width: "16px",
									height: "16px",
									borderRadius: "16px"
								}
							}),
							h("span", data.roleName)
							// h('b', {
							//     style: {
							//         display: data.sum > 0 ? 'inline' : 'none'
							//     }
							// }, data.sum > 0 && data.sum < 100 ? data.sum : data.sum > 99 ? '99+' : ''),
						]
					)
				]
			);
		},
		getListTeacherByLaster() {
			let params = {
				officeId: this.officeId,
				stuId: this.stuId
			};
			if (this.showAllNotChat) params.dialogId = -1;
			jxChatMessage
				.listTeacherByLaster(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.chatData = res.data.data.list;
						// console.log(this.chatData)
						if (this.chatData && this.chatData.length) {
							this.clickChat(this.chatData[0]);
						}
					}
				})
				.catch(errors.call(this));
		},
		getListByXq() {
			let params = {
				stuId: this.stuId
			};
			jxChatMessage
				.listByXq(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.compassData = res.data.data;
						let _dataLits = this.compassData.filter(item => {
							return item.officeId == this.officeId;
						});
						if (_dataLits && _dataLits.length) {
							this.officeName = _dataLits[0].officeName;
						}
						this.compassDataCopy = [...this.compassData];
					}
				})
				.catch(errors.call(this));
		},
		changeSchoolFn() {
			// this.getListByXq();
			this.changeSchool = !this.changeSchool;
		},
		chooseCompass(val) {
			this.changeSchool = false;
			this.officeId = val.officeId;
			this.officeName = val.officeName;
			this.searchSchool = "";
			this.compassData = [...this.compassDataCopy];
			this.getListByClass();
			this.getListTeacherByLaster();
		},
		changeDate(val) {
			// console.log(val)
			this.dateRange = val;
		},
		filterCompassDate() {
			// console.log(this.searchSchool)
			if (this.searchSchool) {
				let arr = [];
				this.compassDataCopy.forEach(compass => {
					// console.log(compass)
					let _name = compass.officeName;
					if (compass.officeName.indexOf(this.searchSchool) > -1) {
						arr.push(compass);
					}
				});
				this.compassData = arr;
			} else {
				this.compassData = [...this.compassDataCopy];
			}
		}
	}
};
</script>
