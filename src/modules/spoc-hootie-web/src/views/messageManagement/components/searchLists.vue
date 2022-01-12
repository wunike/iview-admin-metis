<style lang="less">
.search-lists-container {
	position: absolute;
	z-index: 2;
	left: 20px;
	width: 220px;
	top: 32px;
	overflow-y: scroll;
	max-height: ~"calc(100% - 52px)";
	background: #fff;
	box-shadow: 0px 3px 12px 2px rgba(0, 0, 0, 0.15);
	.danhang() {
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.search-item {
		&:first-child .search-title {
			border-top: none;
			margin-top: 7px;
			margin-bottom: 4px;
		}
	}
	.search-title {
		margin: 0 10px;
		height: 29px;
		line-height: 28px;
		border-top: 1px solid #e6e7eb;
		font-size: 14px;
		color: #bfbfbf;
		.title {
			float: left;
		}
		.more {
			float: right;
			cursor: pointer;
		}
	}
	.chat-item {
		position: relative;
		height: 58px;
		padding-left: 54px;
	}
	.item-img {
		@w: 24px;
		position: absolute;
		left: 20px;
		top: 10px;
		width: @w;
		height: @w;
		border-radius: @w;
		background-color: #eee;
		img {
			display: block;
			width: 100%;
		}
		&.class-course-img {
			border-radius: 0;
			background: transparent;
			padding-top: 4px;
			padding-left: 4px;
			.ivu-avatar {
				border-radius: 0;
				width: 16px;
				height: 16px;
				background: #fff;
				img {
					height: 16px;
				}
			}
		}
	}
	.item-txt {
		padding-top: 8px;
	}
	.item-txt-title {
		@h: 18px;
		height: @h;
		line-height: @h;
		font-size: 14px;
		color: #495060;
		.danhang();
	}
	.item-txt-detail {
		@h: 16px;
		height: @h;
		line-height: @h;
		font-size: 12px;
		color: #999;
		.danhang();
	}
	.ivu-avatar {
		@w: 24px;
		width: @w;
		height: @w;
		border-radius: @w;
		line-height: @w;
		& > * {
			line-height: @w;
		}
	}
	.blue {
		color: #44bcb7;
	}
	.no-lists {
		padding: 18px 0px;
		line-height: 2;
		color: #999;
		font-size: 14px;
		text-align: center;
	}
}
</style>
    
<template>
	<div class="search-lists-container">
		<div
			v-if="(contactsLists && contactsLists.length) || (classCourseLists && classCourseLists.length) || (chatRecordLists && chatRecordLists.length)"
		>
			<div
				class="search-item"
				v-if="!showAllChatRecordLists && !showAllClassCourseLists && contactsLists && contactsLists.length"
			>
				<div class="search-title">
					<span class="title">{{$t('messagemanagement_components_searchlists_325')}}</span>
					<span
						class="more"
						v-if="contactsLists.length > 2 - 0"
						@click="showMore('contacts')"
					>{{ moreTxt }}</span>
				</div>
				<div
					class="chat-item"
					v-for="(item, index) in contactsLists"
					v-if="showAllContactsLists || index < 2 - 0"
					@click="clickChat(item, 'contacts')"
					:key="index"
				>
					<div class="item-img">
						<Avatar :src="item.avator" v-if="item.avator" />
						<Avatar style="background-color: #87d068" icon="ios-person" v-else />
					</div>
					<div class="item-txt">
						<div class="item-txt-title">
							<span v-if="item.roleName != 'student'">{{ item.roleName }}(</span>
							<span><span v-html="item.objectName"></span><span v-if="item.objectNameEn">({{item.objectNameEn}})</span></span>
							<span v-if="item.roleName != 'student'">)</span>
							<!-- {{ item.roleName }}({{ item.objectName }}) -->
						</div>
						<div class="item-txt-detail">{{ item.className }}</div>
					</div>
				</div>
			</div>
			<div
				class="search-item"
				style="padding-bottom: 6px;"
				v-if="!showAllContactsLists && !showAllChatRecordLists && classCourseLists && classCourseLists.length"
			>
				<div class="search-title">
					<span class="title">{{$t('messagemanagement_components_searchlists_326')}}</span>
					<span
						class="more"
						v-if="classCourseLists.length > 2 - 0"
						@click="showMore('classCourse')"
					>{{ moreTxt }}</span>
				</div>
				<!-- <div class="chat-item" 
                v-for="(item, index) in classCourseLists" 
                v-if="showAllClassCourseLists || index < 2 - 0" 
                :key="index">
                <div class="item-img class-course-img">
                    <img src="../../../assets/img/class.png" alt="" class="ivu-avatar"/>
                </div>
                <div class="item-txt" style="padding-top: 12px;">
                    <div class="item-txt-title" v-html="item.className"></div>
                </div>
				</div>-->
				<Tree
					v-if="showAllClassCourseLists"
					:data="classCourseLists"
					:load-data="loadData"
					:render="renderContent"
				></Tree>
				<Tree v-else :data="classCourseListsSub" :load-data="loadData" :render="renderContent"></Tree>
			</div>
			<div
				class="search-item"
				v-if="!showAllContactsLists && !showAllClassCourseLists && chatRecordLists && chatRecordLists.length"
			>
				<div class="search-title">
					<span class="title">{{$t('messagemanagement_components_searchlists_327')}}</span>
					<span
						class="more"
						v-if="chatRecordLists.length > 2 - 0"
						@click="showMore('chatRecord')"
					>{{ moreTxt }}</span>
				</div>
				<div
					class="chat-item"
					v-for="(item, index) in chatRecordLists"
					v-if="showAllChatRecordLists || index < 2 - 0"
					@click="clickChatRecord(item)"
					:key="index"
				>
					<div class="item-img">
						<Avatar :src="item.avator" v-if="item.avator" />
						<Avatar style="background-color: #87d068" icon="ios-person" v-else />
					</div>
					<div class="item-txt">
						<div class="item-txt-title">{{ item.objectName }}<span v-if="item.objectNameEn">({{item.objectNameEn}})</span></div>
						<div class="item-txt-detail" v-html="item.chatDetail"></div>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="no-lists">{{$t('messagemanagement_components_searchlists_328')}}</div>
	</div>
</template>

<script>
import valid, {
	errors,
	jxChatDialog,
	jxChatMessage
} from "../../../libs/request";
import subClassImg from "../../../assets/img/sub-class.png";
import defaultImg from "../../../assets/img/touxiang.png";
export default {
	props: {
		keyWord: {
			type: String,
			default: ""
		},
		stuId: {
			type: String,
			default: ""
		},
		parent: {
			type: String,
			default: "detail"
		},
		officeId: {
			type: String,
			default: ""
		},
		teacherId: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			moreTxt: this.$t("messagemanagement_components_searchlists_329"),
			showMoreFlag: false, //初始化 false 不显示全部
			timer: null,
			keyWordCopy: "",
			contactsLists: [], //联系人
			classCourseLists: [], //班课
			chatRecordLists: [], //聊天记录
			showAllContactsLists: false, //显示全部联系人
			showAllClassCourseLists: false, //显示全部班课
			showAllChatRecordLists: false //显示全部聊天记录
		};
	},
	mounted() {
		// console.log('mounted' + this.keyWord)
		this.remoteMethod(this.keyWord);
	},
	methods: {
		remoteMethod(query) {
			// 名字不为空，发起查询，查询重名
			if (query !== "") {
				this.keyWordCopy = query;
				this.debounce();
			} else {
				// this.stuList = [];
			}
		},
		debounce() {
			// 防抖 500ms内没有输入文字，才开始查询，防止多次发起请求
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
			this.timer = setTimeout(() => {
				// 检索聊天记录
				let params = {
					keyword: this.keyWordCopy,
					officeId: this.officeId
				};
				if (this.parent == "message") {
					params.teacherId = this.teacherId;
				} else {
					params.studentId = this.$route.query.id;
				}
				// 检索聊天记录
				this.searchChatRecordLists(params);
				// 检索班课
				this.searchClassCourseLists(params);
				// 检索联系人
				this.searchContactsLists(params);
			}, 500);
		},
		// 检索聊天记录
		searchChatRecordLists(params) {
			jxChatDialog
				.searchChatRecord(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let _data = res.data.data;
						_data.forEach(chat => {
							if (chat.list.length > 1) {
								chat.chatDetail =
									chat.list.length +
									this.$t(
										"messagemanagement_components_searchlists_330"
									);
							} else {
								let str = chat.list[0].message;
								if (chat.list[0].msgType == "1") {
									let txt2 = str.replace(/<\/?.+?>/g, "");
									str = txt2.replace(/ /g, ""); //txt3为得到后的内容
								}
								chat.chatDetail = str
									.split(this.keyWordCopy)
									.join(
										'<b class="blue">' +
											this.keyWordCopy +
											"</b>"
									);
							}
						});
						this.chatRecordLists = _data;
						// console.log(_data)
					}
				})
				.catch(errors.call(this));
		},
		// 检索班课
		searchClassCourseLists(params) {
			jxChatDialog
				.searchClassCourse(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let arr = res.data.data;
						// _data.forEach(chat => {
						//     chat.className = chat.className.split(this.keyWordCopy).join('<b class="blue">' + this.keyWordCopy + '</b>')
						// });
						// this.classCourseLists = _data;
						// console.log('arr')
						// console.log(arr)
						let list = [];
						arr.forEach(v => {
							list.push({
								title: v.className,
								classCourseName: v.className,
								classCourseId: v.classId,
								jxStudentChatMessageVOS: [],
								sum: 0,
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
														data.classCourseName
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
						});
						// console.log(list)
						this.classCourseLists = list;
						let maxLength = 2 - 0;
						this.classCourseListsSub =
							list.length > maxLength
								? list.slice(0, maxLength)
								: list;
					}
				})
				.catch(errors.call(this));
		},
		// 检索联系人
		searchContactsLists(params) {
			jxChatDialog
				.searchContacts(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let _data = res.data.data;
						_data.forEach(contact => {
							contact.objectNameCopy = contact.objectName;
							contact.objectName = contact.objectName
								.split(this.keyWordCopy)
								.join(
									'<b class="blue">' +
										this.keyWordCopy +
										"</b>"
								);
							// console.log(contact.objectName)
						});
						this.contactsLists = _data;
						// console.log(_data)
					}
				})
				.catch(errors.call(this));
		},
		showMore(type) {
			// 点击 显示更多 或者 收起
			if (this.showMoreFlag) {
				// 显示全部 => 显示部分
				this.showMoreFlag = false;
				this.moreTxt = this.$t(
					"messagemanagement_components_searchlists_329"
				);
				this.showAllContactsLists = false;
				this.showAllClassCourseLists = false;
				this.showAllChatRecordLists = false;
			} else {
				//  显示部分 => 显示全部
				this.showMoreFlag = true;
				this.moreTxt = this.$t(
					"messagemanagement_components_searchlists_331"
				);
				if (type == "contacts") {
					// 联系人
					this.showAllContactsLists = true;
					this.showAllClassCourseLists = false;
					this.showAllChatRecordLists = false;
				} else if (type == "classCourse") {
					// 班课
					this.showAllContactsLists = false;
					this.showAllClassCourseLists = true;
					this.showAllChatRecordLists = false;
				} else {
					// 聊天记录
					this.showAllContactsLists = false;
					this.showAllClassCourseLists = false;
					this.showAllChatRecordLists = true;
				}
			}
		},
		clickChat(item, str) {
			// 点击联系人
			if (str == "contacts" && this.parent == "message") {
				// 我的消息，联系人
				let obj = {
					avator: item.avatorUrl,
					classCourseId: item.classId,
					classCourseName: item.className,
					dialogId: item.dialogId,
					officeId: this.officeId,
					// studentId: '0:' + item.objectId,
					studentId: item.objectId,
					studentName: item.objectNameCopy
				};
				console.log(obj);
				this.$emit("onClickChat", obj);
			} else {
				this.$emit("onClickChat", item);
			}
		},
		clickChatRecord(item) {
			// 点击聊天记录
			console.log(item);
			if (this.parent == "message") {
				// 我的消息，联系人
				// let obj = {
				//     avator: item.avatorUrl,
				//     classCourseId: item.classId,
				//     classCourseName: item.className,
				//     dialogId: item.dialogId,
				//     officeId: this.officeId,
				//     studentId: item.objectId,
				//     studentName: item.objectName
				// }
				// this.$router.push({
				//     name:'hootie.messageManagement.detail',
				//     query:{
				//         id: item.objectId,
				//         officeId: this.officeId,
				//         dialogId: item.dialogId
				//     }
				// })
				// this.$emit('onClickChatRecord', obj);
			} else {
				this.$emit("onClickChatRecord", item);
			}
		},
		loadData(item, callback) {
			// 获取某个班级下面的教师列表
			let datas = [];
			if (this.parent == "detail") {
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
			} else {
				let params = {
					officeId: this.officeId,
					classCourseId: item.classCourseId
				};
				jxChatMessage
					.listByStudent(params)
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
			}
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
							this.parent == "detail"
								? h("span", data.roleName)
								: h("span", data.studentName),
							this.parent == "message"
								? h(
										"b",
										{
											style: {
												display:
													data.sum > 0
														? "inline"
														: "none"
											}
										},
										data.sum > 0 && data.sum < 100
											? data.sum
											: data.sum > 99
											? "99+"
											: ""
								  )
								: ""
						]
					)
				]
			);
		}
	},
	watch: {
		keyWord(val) {
			// console.log(val)
			this.remoteMethod(val);
		}
	}
};
</script>


