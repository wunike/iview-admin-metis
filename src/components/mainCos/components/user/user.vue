<style lang="less">
.userInfo {
	width: 248px;
	background: rgba(255, 255, 255, 1);
	padding: 0 20px;
	cursor: default;
	.hasBottom {
		border-bottom: 1px solid rgba(230, 231, 235, 1);
		padding: 10px 0;
		overflow: hidden;
	}
	.fl {
		float: left;
	}
	.pg {
		width: 16px;
		height: 16px;
		margin: 0 8px 0 6px;
	}
	.text {
		line-height: 17px;
		width: 164px;
	}
}
</style>
<template>
	<div class="user-avator-dropdown">
		<Dropdown @on-click="handleClick" trigger="click">
			<Badge :dot="!!messageUnreadCount">
				<Avatar :src="userAvator" />
			</Badge>
			<Icon :size="18" type="md-arrow-dropdown"></Icon>
			<DropdownMenu slot="list">
				<!-- <DropdownItem name="message">
          消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
				<DropdownItem name="logout">退出登录</DropdownItem>-->
				<div class="userInfo">
					<div class="hasBottom" style="margin-top:10px;">
						<img class="fl pg" src="../../../../assets/images/userInfo/ren.svg" />
						<div class="fl text">{{userInfo.name}}</div>
					</div>
					<div class="hasBottom">
						<img class="fl pg" src="../../../../assets/images/userInfo/shenfen.svg" />
						<div class="fl text">{{userInfo.roleNameMap ? userInfo.roleNameMap['0'] : ''}}</div>
					</div>
					<div class="hasBottom">
						<img class="fl pg" src="../../../../assets/images/userInfo/zuzhijigou.svg" />
						<div
							class="fl text"
							style="width:178px;max-height: 200px;overflow-y: auto;overflow-x: hidden;word-break: break-all;"
						>
							<!-- v-if="userInfo.adminNames"
							<p v-for="(item,index) in userInfo.adminNames.split(',')" :key="index">{{item}}</p> -->
							<p>{{userInfo.officeName}}</p>
						</div>
					</div>
					<div class="hasBottom" style="height:48px;line-height:1;">
						<Button @click="logout()" type="primary" style="width:208px;height:28px;line-height:1;">
							{{$t('portal_app_logout')}}
							<!-- 退出登录 -->
						</Button>
					</div>
					<div class="hasBottom" style="border:none;margin-bottom:3px;line-height:17px;">
						<a style="float:left;" @click="editPasswordModal">
							{{$t('portal_app_changeThePassword')}}
							<!-- 修改密码 -->
						</a>
						<a style="float:right;" @click="goPersonEdit">
							{{$t('portal_app_myProfile')}}
							<!-- 个人信息维护 -->
						</a>
					</div>
				</div>
			</DropdownMenu>
		</Dropdown>
		<Modal
			:loading="showLoading"
			:mask-closable="false"
			v-model="showEditPasswordModal"
			width="600"
			:title="$t('portal_app_changeThePassword')"
			@on-ok="editPwd"
			@on-cancel="cancelPwd"
		>
			<div>
				<Form ref="editPwd" :model="formValidate" :rules="basicFormValidate" :label-width="150">
					<FormItem :label="$t('portal_app_OriginalPassword')" prop="oldPwd">
						<Input
							v-model="formValidate.oldPwd"
							type="password"
							:placeholder="$t('portal_app_EnterOriginalPassword')"
							style="width:306px;"
						></Input>
					</FormItem>
					<FormItem :label="$t('portal_app_NewPassword')" prop="newPwd">
						<Input
							v-model="formValidate.newPwd"
							type="password"
							:placeholder="$t('portal_app_EnterNewPassword')"
							style="width:306px;"
						></Input>
					</FormItem>
					<FormItem :label="$t('portal_app_ConfirmPassword')" prop="againPwd">
						<Input
							v-model="formValidate.againPwd"
							type="password"
							:placeholder="$t('portal_app_EnterNewPasswordAgain')"
							style="width:306px;"
						></Input>
					</FormItem>
				</Form>
			</div>
		</Modal>
	</div>
</template>

<script>
import "./user.less";
import { mapActions, mapState } from "vuex";
import valid, {
	errors,
	sysUser
} from "../../../../modules/spoc-portal/libs/request.js";
export default {
	name: "User",
	props: {
		userAvator: {
			type: String,
			default: ""
		},
		messageUnreadCount: {
			type: Number,
			default: 0
		}
	},
	computed: {
		...mapState(["userInfo"])
		/*  userInfo(){
      return this.$store.state.userInfo
    } */
	},
	data() {
		const validatePass = (rule, value, callback) => {
			if (value === "") {
				//callback(new Error('请输入新密码'));
				callback(new Error(this.$t("portal_app_EnterNewPassword")));
			} else if (value.indexOf(" ") >= 0) {
				callback(new Error(this.$t("portal_app_noSpaces")));
				// callback(new Error('密码不能包含空格'));
			} else {
				if (this.formValidate.againPwd !== "") {
					this.$refs.editPwd.validateField("againPwd");
				}
				callback();
			}
		};
		const validatePassCheck = (rule, value, callback) => {
			if (value === "") {
				// callback(new Error('请输入确认新密码'));
				callback(
					new Error(this.$t("portal_app_EnterNewPasswordAgain1"))
				);
			} else if (value.indexOf(" ") >= 0) {
				// callback(new Error('密码不能包含空格'));
				callback(new Error(this.$t("portal_app_noSpaces")));
			} else if (this.formValidate.newPwd != this.formValidate.againPwd) {
				callback(new Error(this.$t("portal_app_passwordNoSame")));
				// callback(new Error('两次密码不一致'));
			} else {
				callback();
			}
		};
		return {
			showLoading: true,
			showEditPasswordModal: false,
			formValidate: {
				oldPwd: "",
				newPwd: "",
				againPwd: ""
			},
			basicFormValidate: {
				oldPwd: [
					{
						required: true,
						message: this.$t(
							"portal_app_EnterOriginalPassword"
						) /* '请输入原密码' */,
						trigger: "change"
					}
				],
				newPwd: [
					{
						required: true,
						validator: validatePass,
						trigger: "change"
					}
				],
				againPwd: [
					{
						required: true,
						validator: validatePassCheck,
						trigger: "change"
					}
				]
			}
		};
	},
	methods: {
		...mapActions(["handleLogOut"]),
		logout() {
			this.handleLogOut().then(() => {
				if (this.$root.onLogout) {
					this.$root.onLogout();
				}
				this.$store.dispatch("portal/autoLogout");
				this.$router.push({
					name: "portal.login"
				});
			});
		},
		message() {
			this.$router.push({
				name: "portal.news"
			});
		},
		handleClick(name) {
			switch (name) {
				case "logout":
					this.logout();
					break;
				case "message":
					this.message();
					break;
			}
		},
		goPersonEdit() {
			this.$router.push({
				name: "portal.personEdit"
			});
		},
		editPasswordModal() {
			this.showEditPasswordModal = true;
		},
		editPwd() {
			this.$refs.editPwd.validate(validres => {
				this.showEditPasswordModal = true;
				if (validres) {
					let data = {
						userId: this.userInfo.id,
						newPwd: this.formValidate.newPwd,
						oldPwd: this.formValidate.oldPwd,
						newPwdagain: this.formValidate.againPwd
					};
					sysUser
						.updatePwd(data)
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								this.showEditPasswordModal = false;
								this.$store.dispatch("portal/autoLogout");
							} else {
								this.showLoading = false;
								setTimeout(() => {
									this.showLoading = true;
								}, 0);
							}
						})
						.catch(errors.call(this));
				} else {
					this.showLoading = false;
					setTimeout(() => {
						this.showLoading = true;
					}, 0);
				}
			});
		},
		cancelPwd() {
			this.$refs.editPwd.resetFields();
			this.showLoading = false;
			setTimeout(() => {
				this.showLoading = true;
			}, 0);
			this.showEditPasswordModal = false;
		}
	}
};
</script>
