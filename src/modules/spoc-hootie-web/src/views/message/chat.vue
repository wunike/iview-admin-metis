<style lang="less">
.chat {
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	height: 100%;
	width: 100%;
	.historys {
		flex: 1;
		width: 100%;
	}
}
</style>

<template>
	<div class="chat">
		<historys
			ref="historys"
			class="historys"
			:userId="fromId"
			:roleId="roleId"
			:toId="toId"
			:chatList="chatList"
			:formAvator="formAvator"
			@again="again"
			:toAvator="toAvator"
			:pageNo="pageNo"
			@getHistory="getHistory"
			:hasHistory="hasHistory"
			@offhistoryFlag="offhistoryFlag"
			@copy="copy"
			@withdraw="towithdraw"
			@remind="remind"
		></historys>
		<editor
			ref="editor"
			v-if="fromId&&dialogId&&classCourseId&&officeId&&toId"
			@on-send="onSend"
			@uploadFile="uploadFile"
		></editor>
	</div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import editor from "./myEditor.vue";
import historys from "./myHistory.vue";
import { waitUntil } from "../../libs/util.js";
import conn, { config } from "./socket.js";
let ws,
	opts = {
		onopen: () => {},
		onmessage: () => {}
	};
export default {
	props: {
		officeId: {
			type: [String, Number],
			default: ""
		},
		classCourseId: {
			type: [String, Number],
			default: ""
		},
		dialogId: {
			type: [String, Number],
			default: ""
		},
		fromId: {
			type: [String, Number],
			default: ""
		},
		fromRoleId: {
			type: [String, Number],
			default: ""
		},
		formAvator: {
			type: [String, Number],
			default: ""
		},
		toId: {
			type: [String, Number],
			default: ""
		},
		toRoleId: {
			type: [String, Number],
			default: ""
		},
		toAvator: {
			type: [String, Number],
			default: ""
		}
	},
	data() {
		return {
			ws: "",
			timer: 0,
			chatList: [],
			pageNo: 1,
			hasHistory: false
		};
	},
	computed: {
		...mapState(["userInfo"]),
		login() {
			return {
				act: "init"
			};
		}
	},
	components: {
		editor,
		historys
	},
	mounted() {
		waitUntil(
			() => {
				if (this.login.act) {
					return true;
				}
			},
			this.start,
			() => {
				console.warn("timeout");
			},
			1000
		);
	},
	beforeDestroy() {
		console.log("beforeDestroy");
		this.ws.close();
		clearInterval(this.timer);
		this.chatList = [];
	},
	methods: {
		showSearchChatRecordLists(item) {
			console.log(item);
		},
		start() {
			if (this.ws) {
				this.ws.close();
				clearInterval(this.timer);
			}
			const self = this;
			let options = {
				onopen(e) {
					ws.send(self.login);
					self.startTimer();
				},
				onmessage(data) {
					if (data.act) {
						if (typeof self[data.act] == "function") {
							self[data.act](data);
						} else {
							console.warn("act not found", data.data.act);
						}
					} else if (data.data.act) {
						if (typeof self[data.data.act] == "function") {
							self[data.data.act](data);
						} else {
							console.warn("act not found", data.data.act);
						}
					} else {
						console.warn("error param act missing");
					}
				},
				onclose() {
					ws = null;
					this.ws = ws;
					clearInterval(this.timer);
					this.timer = 0;
					console.log("onclose");
				},
				onerror() {
					console.log("onerror");
				}
			};
			if (ws) {
				this.ws = ws;
				opts.onopen = options.onopen;
				opts.onmessage = options.onmessage;
				opts.onclose = options.onclose;
				this.getHistory(1);
			} else {
				opts.onopen = options.onopen;
				opts.onmessage = options.onmessage;
				opts.onclose = options.onclose;
				ws = new conn(
					config.url +
						"?userId=" +
						this.fromId +
						"&roleId=" +
						this.fromRoleId +
						"&classCourseId=" +
						this.classCourseId +
						"&dialogId=" +
						this.dialogId,
					opts
				);
				this.ws = ws;
			}
			this.$root.onLogout = () => {
				ws = null;
			};
		},
		startTimer() {
			clearInterval(this.timer);
			this.timer = setInterval(() => {
				this.ws.send({
					act: "ping",
					fromId: this.fromId,
					fromRoleId: this.fromRoleId,
					classCourseId: this.classCourseId
				});
			}, 1000 * 60);
		},
		getHistory(val) {
			this.ws.send({
				act: "history",
				fromId: this.fromId,
				fromRoleId: this.fromRoleId,
				toId: this.toId,
				toRoleId: this.toRoleId,
				classCourseId: this.classCourseId,
				dialogId: this.dialogId,
				page: {
					pageNo: val,
					pageSize: "10"
				}
			});
		},
		init(data) {
			// 登录返回
			if (data.statusCode === "0") {
				this.getHistory(1);
			} else {
				console.warn("login failed");
			}
		},
		onSend(data) {
			const payload = {
				act: "say",
				fromId: this.fromId,
				fromRoleId: this.fromRoleId,
				toId: this.toId,
				toRoleId: this.toRoleId,
				officeId: this.officeId,
				classCourseId: this.classCourseId,
				dialogId: this.dialogId,
				id: this.guid(),
				...data
			};
			payload.fromAvator = location.origin + this.userInfo.photo;
			this.chatList.push({
				data: payload,
				statusCode: ""
			});
			let dom = this.$refs.historys.$el.querySelector(
				".ivu-scroll-container"
			);
			let contentDom = this.$refs.historys.$el.querySelector(
				".ivu-scroll-content"
			);
			setTimeout(() => {
				this.$nextTick(() => {
					dom.scrollTop = contentDom.clientHeight;
				});
			}, 100);
			setTimeout(() => {
				this.chatList.forEach(v => {
					if (v.data.id == payload.id) {
						if (v.statusCode === "") {
							v.statusCode = "1";
						}
					}
				});
			}, 1000 * 60);
			if (!payload.message) {
				return this.$Message.error(this.$t("message_chat_281"));
			}
			this.ws.send(payload);
			this.$refs.editor.content = "";
		},
		say(data) {
			if (
				data.data.fromId === this.fromId &&
				data.data.toId === this.toId
			) {
				this.chatList.forEach(v => {
					if (v.data.id == data.data.id) {
						v.data = data.data;
						v.statusCode = data.statusCode;
						v.message = data.message;
						if (data.statusCode == 1) {
							this.$Message.error(data.message);
						}
					}
				});
			} else if (
				data.data.fromId === this.toId &&
				data.data.toId === this.fromId
			) {
				this.chatList.push(data);
				this.doRead();
			} else {
				//其他人的未读消息
			}

			let dom = this.$refs.historys.$el.querySelector(
				".ivu-scroll-container"
			);
			let contentDom = this.$refs.historys.$el.querySelector(
				".ivu-scroll-content"
			);
			this.$nextTick(() => {
				setTimeout(() => {
					dom.scrollTop = contentDom.clientHeight;
				}, 100);
			});
		},
		history(data) {
			this.hasHistory = true;
			let arr = data.data.list.map(v => {
				return {
					data: v,
					message: this.$t("message_chat_282"),
					statusCode: "0"
				};
			});
			let list = [...arr, ...this.chatList];
			this.chatList = list;
			this.doRead();
		},
		offhistoryFlag() {
			this.hasHistory = false;
		},
		doRead(id) {
			this.ws.send({
				act: "read",
				dialogId: this.dialogId,
				classCourseId: this.classCourseId,
				fromId: this.fromId,
				fromRoleId: this.fromRoleId,
				toId: this.toId,
				toRoleId: this.toRoleId
			});
		},
		read(data) {
			if (
				data.data.fromId === this.fromId &&
				data.data.toId === this.toId
			) {
				this.$emit("readed", this.dialogId);
			} else if (
				data.data.fromId === this.toId &&
				data.data.toId === this.fromId
			) {
				this.chatList.forEach(v => {
					v.data.isRead = 1;
				});
			} else {
				//其他人的未读消息
			}
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
		withdraw(data) {
			if (data.statusCode === "0") {
				let ind = this.chatList.findIndex(v => v.id == data.data.id);
				console.log(ind);
				this.chatList.splice(ind, 1);
			} else {
				console.warn("login failed");
			}
		},
		towithdraw(id) {
			this.ws.send({
				act: "withdraw",
				id: id
			});
		},
		copy(context) {
			this.$refs.editor.content = context;
		},
		remind(id, type, context) {
			const payload = {
				act: "push",
				fromId: this.fromId,
				fromRoleId: this.fromRoleId,
				toId: this.toId,
				toRoleId: this.toRoleId,
				officeId: this.officeId,
				classCourseId: this.classCourseId,
				dialogId: this.dialogId,
				id: id,
				msgType: type,
				message: context
			};
			payload.fromAvator = location.origin + this.userInfo.photo;
			this.ws.send(payload);
		},
		push(data) {
			this.$Message.info(data.message);
		},
		uploadFile(obj) {
			this.onSend(obj);
		},
		again(item) {
			this.onSend(item);
		}
	},
	watch: {
		dialogId: {
			handler: function(val, oldVal) {
				this.ws.close();
				clearInterval(this.timer);
				this.chatList = [];
				waitUntil(
					() => {
						if (this.login.fromId) {
							return true;
						}
					},
					this.start,
					() => {
						console.warn("timeout");
					},
					1000
				);
			},
			deep: true
		}
	}
};
</script>
