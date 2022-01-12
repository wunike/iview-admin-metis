<template>
	<div class="contentBox">
		<div class="loginBox">
			<div class="logo"></div>
			<template v-if="!firstLogin && !isFindPassword">
				<div class="infoList">
					<Select
						v-model="tenant"
						@on-change="changeTenant"
						ref="tenantSelect"
						clearable
						:filterable="!disabledTenantSelect"
						:remote="!disabledTenantSelect"
						:disabled="disabledTenantSelect"
						:remote-method="
							!disabledTenantSelect ? getTenantList : () => {}
						"
						:loading="loadingTenant"
						placeholder="请选择租户"
					>
						<Option
							v-for="item in tenantList"
							:value="item.code"
							:key="item.code"
							>{{ item.name }}</Option
						>
					</Select>
					<!-- <Input @on-enter="entLand" v-model="tenant" size="large" placeholder="请输入租户码"></Input> -->
					<p class="erro">{{ tenantTrue }}</p>
				</div>
				<div class="infoList">
					<Input
						@on-enter="entLand"
						v-model="userName"
						size="large"
						placeholder="邮箱 账号 手机号"
					></Input>
					<p class="erro">{{ nameTrue }}</p>
				</div>
				<div class="infoList">
					<Input
						@on-enter="entLand"
						type="password"
						v-model="password"
						size="large"
						placeholder="密码"
					></Input>
					<p class="erro">{{ PassTrue }}</p>
				</div>
				<div class="infoList clearfix" v-if="captchaFlag">
					<div class="fl codeIpt">
						<Input
							@on-enter="entLand"
							v-model="code"
							placeholder="请输入验证码"
						></Input>
						<p class="erro">{{ CodeTrue }}</p>
					</div>
					<div class="fr codeImg" @click="getCode">
						<img
							:src="imageCode"
							@click="captchaFun"
							alt="codeImage"
						/>
					</div>
				</div>
				<div class="infoList clearfix" v-if="showCode">
					<div class="fl codeIpt">
						<Input
							@on-enter="entLand"
							v-model="code"
							size="large"
							placeholder="验证码"
						></Input>
						<p class="erro">{{ CodeTrue }}</p>
					</div>
					<div class="fr codeImg" @click="getCode">
						<img :src="codeImgUrl" />
					</div>
				</div>
				<div class="loginRelated clearfix">
					<div class="fl">
						<Checkbox v-model="isRememberLoginInfo"
							>两周内免登录</Checkbox
						>
					</div>
					<div class="fr forgetBtn" @click="forgetPassword">
						忘记密码？
					</div>
				</div>
				<div class="infoList">
					<Button type="primary" long size="large" @click="judge"
						>登录</Button
					>
				</div>
			</template>
			<template v-if="firstLogin && !isFindPassword">
				<div>
					<h3>设置登录密码</h3>
					<p>为了您的账户安全，请修改系统登录初始密码。</p>
				</div>
				<Form
					ref="resetForm"
					:model="reset"
					:rules="resetRule"
					:label-width="0"
					class="resetForm"
				>
					<FormItem label="" prop="oldpass">
						<div class="infoList">
							<Input
								type="password"
								v-model="reset.oldpass"
								size="large"
								placeholder="初始密码"
							></Input>
						</div>
					</FormItem>
					<FormItem label="" prop="newpass">
						<div class="infoList">
							<Input
								type="password"
								v-model="reset.newpass"
								size="large"
								placeholder="新密码为6-32位字符"
							></Input>
						</div>
					</FormItem>
					<FormItem label="" prop="newpass2">
						<div class="infoList">
							<Input
								type="password"
								v-model="reset.newpass2"
								size="large"
								placeholder="确认密码"
							></Input>
						</div>
					</FormItem>
				</Form>
				<div class="infoList">
					<Button type="primary" long size="large" @click="doReset"
						>修改密码</Button
					>
				</div>
			</template>
			<div v-if="isFindPassword">
				<Form
					ref="changePasswordForm"
					:model="changePasswordForm"
					:rules="changePasswordRule"
					:label-width="0"
					class="changePasswordForm"
				>
					<!-- <FormItem label="" prop="findName">
                        <div class="infoList">
                            <Input v-model="changePasswordForm.findName" size="large" placeholder="请输入您的账号"></Input>
                        </div>
                    </FormItem> -->
					<FormItem label="" prop="findTel">
						<div class="infoList">
							<Input
								type="text"
								:disabled="!resetPwdType"
								v-model="changePasswordForm.findTel"
								size="large"
								placeholder="请填写您的手机号"
								autoComplete="new-password"
							></Input>
						</div>
					</FormItem>
					<FormItem label="" prop="findAuthCode">
						<div class="infoList login-auth-code">
							<Input
								v-model="changePasswordForm.findAuthCode"
								:disabled="!resetPwdType"
								size="large"
								placeholder="验证码"
								autoComplete="new-password"
							></Input>
							<Button
								type="primary"
								:disabled="btnType || !resetPwdType"
								@click="onclickGetAuthCode"
								>{{ findButtonText }}</Button
							>
						</div>
					</FormItem>
					<FormItem label="" prop="findPassword">
						<div class="infoList">
							<Input
								type="password"
								v-model="changePasswordForm.findPassword"
								size="large"
								placeholder="请输入新密码"
								@on-blur="verify"
								autoComplete="new-password"
							></Input>
						</div>
						<!-- @on-keyup="passwordTipsChange(2)" -->
					</FormItem>
					<FormItem label="" prop="verifyPassword">
						<div class="infoList">
							<Input
								type="password"
								v-model="changePasswordForm.verifyPassword"
								size="large"
								placeholder="请验证新密码"
								@on-blur="verify"
								autoComplete="new-password"
							></Input>
						</div>
					</FormItem>
					<!-- <div id="passwordTips">
                            <span>弱</span>
                            <span>中</span>
                            <span>强</span>
                            <span>很强</span>
                    </div> -->
					<div class="infoList">
						<Button
							type="primary"
							:disabled="resetPwdType"
							long
							size="large"
							@click="resetPwd"
							>修改密码</Button
						>
					</div>
				</Form>
			</div>
		</div>
	</div>
</template>
<script>
import valid, {
	errors,
	codeImgUrl,
	login,
	captcha,
	sysUser,
	api,
} from "../libs/request.js";
import { randomNum } from "../libs/util";
import { mapMutations, mapState, mapActions } from "vuex";
import Cookies from "js-cookie";
let themeName = localStorage.theme;
let themeExterior = localStorage.exterior;
export default {
	data() {
		const validatecode = (rule, value, callback) => {
			console.log(!this.resetPwdType, "!this.resetPwdType");
			if (!this.resetPwdType) {
				callback();
			}
			if (value === "") {
				callback(new Error("请输入验证码"));
			} else {
				if (this.verificationFunc("code") == undefined) {
					const data = {
						code: value,
						mobile: this.changePasswordForm.findTel,
						type: {
							code: "FORGET_PASSWORD",
							desc: "",
						},
						// loginName: this.changePasswordForm.findName.trim(),
					};
					api.verification(data)
						.then(valid.call(this))
						.then((res) => {
							if (res.data.data) {
								this.$Message.success("验证成功");
								this.resetPwdType = false;
								callback();
							} else {
								callback(new Error("请输入正确验证码"));
							}
						})
						.catch(errors.call(this));
				}
			}
		};
		const validatePass = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入密码"));
			} else {
				if (this.changePasswordForm.verifyPassword !== "") {
					// 对第二个密码框单独验证
					this.$refs.changePasswordForm.validateField(
						"verifyPassword"
					);
				}
				callback();
			}
		};
		const validatePassCheck = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请再次输入密码"));
			} else if (value !== this.changePasswordForm.findPassword) {
				callback(new Error("输入密码不一致!"));
			} else {
				callback();
			}
		};
		const validateNewpass = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入新密码"));
			} else {
				if (this.reset.newpass2 !== "") {
					// 对第二个密码框单独验证
					this.$refs.resetForm.validateField("newpass2");
				}
				callback();
			}
		};
		const validateNewpass2 = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请再次输入新密码"));
			} else if (value !== this.reset.newpass) {
				callback(new Error("输入密码不一致!"));
			} else {
				callback();
			}
		};

		return {
			resetPwdType: true,
			captchaFlag: true,
			disabledTenantSelect: true,
			loadingTenant: false,
			tenantList: [],
			key: "",
			tenant: "",
			imageCode: "",
			firstLogin: false,
			userName: "",
			password: "",
			code: "",
			isRememberLoginInfo: false,
			codeImgUrl: "",
			nameTrue: "",
			tenantTrue: "",
			PassTrue: "",
			CodeTrue: "",
			showCode: false,
			reset: {
				oldpass: "",
				newpass: "",
				newpass2: "",
				err: {
					olderr: "",
					newerr: "",
					sameerr: "",
				},
			},
			resetRule: {
				oldpass: [
					{
						required: true,
						message: "旧密码不能为空",
						trigger: "blur",
					},
				],
				newpass: [
					{
						required: true,
						message: "新密码不能为空",
						trigger: "blur",
					},
					{
						pattern: /^\w{6,20}$/,
						message: "请输入6-20位包括下划线的任何单词",
						trigger: "blur",
					},
					{ validator: validateNewpass, trigger: "blur" },
				],
				newpass2: [
					{
						required: true,
						message: "验证新密码不能为空",
						trigger: "blur",
					},
					{ validator: validateNewpass2, trigger: "blur" },
				],
			},
			count: 60,
			getting: false, // 读秒是否结束
			changePasswordForm: {
				// findName: null,
				findTel: "",
				findAuthCode: "",
				findPassword: "",
				verifyPassword: "",
			},
			changePasswordRule: {
				// findName: [
				//     { required: true, message: '请输入账号', trigger: 'blur' }
				// ],
				findTel: [
					{
						required: true,
						message: "请输入手机号",
						trigger: "blur",
					},
					{
						pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
						message: "请输入正确的手机号",
						trigger: "blur",
					},
				],
				findAuthCode: [
					{
						required: true,
						message: "请输入验证码",
						trigger: "blur",
					},
					{ validator: validatecode, trigger: "blur" },
				],
				findPassword: [
					{
						required: true,
						message: "密码不能为空",
						trigger: "blur",
					},
					{
						pattern: /^\w{6,20}$/,
						message: "请输入6-20位包括下划线的任何单词",
						trigger: "blur",
					},
					{ validator: validatePass, trigger: "blur" },
				],
				verifyPassword: [
					{
						required: true,
						message: "验证密码不能为空",
						trigger: "blur",
					},
					{ validator: validatePassCheck, trigger: "blur" },
				],
			},
			isFindPassword: false,
			btnType: false,
			findButtonText: "获取验证码",
			curNode: null,
		};
	},
	computed: {
		...mapState(["userInfo"]),
	},
	methods: {
		...mapMutations([
			"updateLoadingStatus",
			"updateUserInfo",
			"updateTenant",
			"updateToken",
		]),
		...mapActions(["handleLogin", "getUserInfo"]),
		changeTenant(val) {
			if (this.tenant) {
				this.tenantTrue = "";
				let useCaptcha = this.tenantList.find((item) => {
					return item.code == this.tenant;
				});
				this.curNode = useCaptcha;
				if (useCaptcha.captcha) {
					this.captchaFlag = true;
					this.captchaFun();
				} else {
					this.captchaFlag = false;
				}
				let obj = this.tenantList.find((v) => v.code == val);
				if (obj && obj.domain) {
					let params = {
						domain: obj.domain,
					};
					api.getByDomain(params)
						.then(valid.call(this))
						.then((res) => {
							if (res.ok) {
								// let loginLogo = document.querySelector('.loginBox .logo');
								if (res.data.data) {
									let data = res.data.data;
									// loginLogo.style.background = "url(" + data.logo + ") center center no-repeat"
									if (
										(data.theme &&
											data.theme != themeName) ||
										(data.theme &&
											data.exterior != themeExterior)
									) {
										this.setLink(data.theme, data.exterior);
									}
									this.$store.commit("updateLogoUrlLight", {
										logoUrlLight: data.logoLight,
									});
									this.$store.commit("updateLogoUrl", {
										logoUrlLight: data.logo,
									});
								}
							}
						})
						.finally(() => {});
				}
			}
		},
		setLink(color = "default", type = "leftStyle") {
			localStorage.theme = color;
			localStorage.exterior = type;
			if (type == "topStyle") {
				this.$store.commit("changeMenuTheme", "light");
			} else {
				this.$store.commit("changeMenuTheme", "dark");
			}
			let themeWrap = document.querySelector("body");
			let classcont = themeWrap.className;
			if (classcont.search(/\w+_wrap/gi) == -1) {
				classcont = classcont + " " + color + "_wrap";
			} else {
				classcont = classcont.replace(/\w+_wrap/gi, color + "_wrap");
			}
			if (classcont.search(/\w+Style/gi) == -1) {
				classcont = classcont + " " + type;
			} else {
				classcont = classcont.replace(/\w+Style/gi, type);
			}
			themeWrap.className = classcont;
		},
		getTenantList(query) {
			if (query !== "") {
				this.loadingTenant = true;
				if (query == "*") {
					query = "";
					this.$refs.tenantSelect.query = "";
				}
				api.tenantListByName({
					name: query,
				})
					.then(valid.call(this))
					.then((res) => {
						if (res.ok) {
							this.tenantList = res.data.data;
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.loadingTenant = false;
					});
			} else {
				this.tenantList = [];
			}
		},
		captchaFun() {
			this.key = randomNum(24, 16);
			captcha({ key: this.key, loginTenant: this.tenant })
				.then((response) => {
					const res = response.data;
					if (res.byteLength <= 100) {
						console.log("shibai");
						this.$Message.error("获取验证码失败，请重试");
					}
					return (
						"data:image/png;base64," +
						btoa(
							new Uint8Array(res).reduce(
								(data, byte) =>
									data + String.fromCharCode(byte),
								""
							)
						)
					);
				})
				.then((res) => {
					this.imageCode = res;
				})
				.catch((e) => {
					this.$Message.error("获取验证码失败，请重试1");
				});
		},
		passwordTipsChange() {
			let spanDoms = document.querySelectorAll("#passwordTips span");
			//获取用户输入的密码,然后判断其强度 返回0 或者 1 2 3 4
			let index = this.checkPassWord(
				this.changePasswordForm.findPassword
			);
			for (let i = 0; i < spanDoms.length; i++) {
				spanDoms[i].className = ""; //清空span标签所有的class样式
				if (index) {
					//0 代表false 其余代表true
					spanDoms[index - 1].className = "s" + index;
				}
			}
		},
		checkPassWord(value) {
			//校验密码强度
			// 0： 表示第一个级别 1：表示第二个级别 2：表示第三个级别
			// 3： 表示第四个级别 4：表示第五个级别
			var modes = 0;
			if (value.length < 6) {
				//最初级别
				return modes;
			}
			if (/\d/.test(value)) {
				//如果用户输入的密码 包含了数字
				modes++;
			}
			if (/[a-z]/.test(value)) {
				//如果用户输入的密码 包含了小写的a到z
				modes++;
			}
			if (/[A-Z]/.test(value)) {
				//如果用户输入的密码 包含了大写的A到Z
				modes++;
			}
			if (/\W/.test(value)) {
				//如果是非数字 字母 下划线
				modes++;
			}
			switch (modes) {
				case 1:
					return 1;
					break;
				case 2:
					return 2;
					break;
				case 3:
					return 3;
					break;
				case 4:
					return 4;
					break;
			}
		},
		entLand() {
			this.judge();
		},
		judge() {
			var regexpTel = /^([0-9]|[a-zA-Z]|[@$]){4,32}$/;
			console.log("this.tenant", this.tenant);
			if (!this.tenant) {
				this.tenantTrue = "请选择租户";
				return;
			} else {
				this.tenantTrue = "";
			}

			if (this.userName == "") {
				this.nameTrue = "请填写账号";
				return;
			} else {
				this.nameTrue = "";
			}

			if (this.userName.length > "40") {
				this.nameTrue = "账号长度40个字符之内";
				return;
			} else {
				this.nameTrue = "";
			}

			if (this.password == "") {
				this.PassTrue = "请填写密码";
				return;
			} else {
				this.PassTrue = "";
			}

			if (!this.password.match(regexpTel)) {
				this.PassTrue = "请输入6-32位密码";
				return;
			} else {
				this.PassTrue = "";
			}

			if (this.captchaFlag && this.code.length == 0) {
				this.CodeTrue = "请填写验证码";
				return;
			} else {
				this.CodeTrue = "";
			}

			let loginData = {
				account: this.userName.trim(),
				password: this.password,
				tenant: this.tenant,
				isRememberLoginInfo: this.isRememberLoginInfo,
				// username: this.userName.trim(),
				// password: this.password,
				// validateCode: this.code,
				// isRememberLoginInfo: this.isRememberLoginInfo,
				// type:6, //登录类型 0 保持登录 1 手机登录 2 微信登录 3 小程序登录 4 企业微信登录 5 用户密码登录 6 账号或手机 + 密码 -> 登录
			};

			if (this.captchaFlag) {
				loginData.key = this.key;
				loginData.code = this.code;
			}
			console.log("loginData _ this.tenant===" + this.tenant);
			this.loginAction(loginData);
		},
		valids() {
			var regexpTel = /^([0-9]|[a-zA-Z]|[@$]){4,32}$/;
			if (!this.reset.oldpass) {
				this.reset.err.olderr = "请填写旧密码";
				return;
			}
			this.reset.err.olderr = "";
			if (!this.reset.newpass) {
				this.reset.err.newerr = "请填写新密码";
				return;
			}
			this.reset.err.newerr = "";
			if (!this.reset.newpass.match(regexpTel)) {
				this.reset.err.newerr =
					"建议使用数字、字母、字符（@、$）的组合密码";
				return;
			}
			this.reset.err.newerr = "";
			if (this.reset.newpass != this.reset.newpass2) {
				this.reset.err.sameerr = "两次输入的密码不一致";
				return;
			}
			this.reset.err.sameerr = "";
			if (
				!(
					this.reset.newpass.length >= 6 &&
					this.reset.newpass.length <= 32
				)
			) {
				this.reset.err.newerr = "密码为6-32位字符";
				return;
			}
			this.reset.err.newerr = "";
			if (this.reset.oldpass == this.reset.newpass) {
				this.reset.err.newerr = "新密码与初始密码重复";
				return;
			}
			this.reset.err.newerr = "";
			return true;
		},
		doReset() {
			// if(!this.valids()) {
			// 	return
			// }
			this.$refs.resetForm.validate((ok) => {
				if (ok) {
					this.updateLoadingStatus({
						isLoading: true,
					});
					let d = {
						loginName: this.userName.trim(),
						oldPwd: this.reset.oldpass,
						newPwd: this.reset.newpass,
					};
					sysUser
						.annoResetPwd(d)
						.then((res) => {
							if (res.data.status == "success") {
								// var loginData = {
								// 	username: d.loginName.trim(),
								// 	password: d.newPwd,
								// 	type:6 //登录类型 0 保持登录 1 手机登录 2 微信登录 3 小程序登录 4 企业微信登录 5 用户密码登录 6 账号或手机 + 密码 -> 登录
								// }

								let loginData = {
									account: d.loginName.trim(),
									password: this.reset.newpass,
									tenant: this.tenant,
									isRememberLoginInfo: this
										.isRememberLoginInfo,
								};
								this.loginAction(loginData);
							} else {
								this.$Message.error(res.data.message);
								this.updateLoadingStatus({
									isLoading: false,
								});
							}
						})
						.catch((err) => {
							errors.call(this)(err);
							this.updateLoadingStatus({
								isLoading: false,
							});
						});
				} else {
				}
			});
		},
		loginAction(loginData) {
			this.updateLoadingStatus({
				isLoading: true,
			});
			login(loginData)
				.then((res) => {
					if (!Cookies.get("lang")) {
						Cookies.set("lang", "zh", {
							expires: 180,
						});
					}

					if (res.data.code == 200 || res.data.code == 0) {
						localStorage.setItem("passWord", loginData.password);
						this.updateUserInfo({
							userInfo: {},
						}); // set empty will trigger getUserInfo

						if (res.data.data.token) {
							this.updateToken({
								token: res.data.data.token,
							});
							localStorage.setItem("token", res.data.data.token);
							localStorage.setItem(
								"curNode",
								JSON.stringify(this.curNode)
							);
						}

						console.log("this.tenant===" + this.tenant);
						this.updateTenant({
							tenant: this.tenant,
						});
						localStorage.setItem("tenant", this.tenant);

						this.handleLogin().then((res) => {
							api.tenantForm({})
								.then(valid.call(this))
								.then((res) => {
									if (res.ok) {
										if (
											res.data.data &&
											res.data.data.status &&
											res.data.data.status.code ==
												"UNINIT"
										) {
											// 进入初始化企业
											this.$router.push({
												name: "portal.workBenchCreate",
											});
										} else {
											this.$router.push({
												name: this.$store.state.config
													.homeRouter,
											});
										}
									}
								})
								.catch(errors.call(this));
						});
					} else if (res.data.code == 100) {
						// 首次登陆
						localStorage.setItem("tenant", this.tenant);
						this.firstLogin = true;
					} else {
						this.captchaFun();
						this.code = "";
						// this.showCode = res.data.data ? res.data.data.validateCodeLogin: ''
						if (res.data.data && res.data.data.firstLogin) {
							this.firstLogin = true;
						} else {
							this.$Message.error(res.data.msg);
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false,
					});
				});
		},
		forgetPassword() {
			this.$refs.changePasswordForm.resetFields();
			localStorage.setItem("tenant", this.tenant);
			this.$nextTick(() => {
				this.isFindPassword = true;
			});
		},
		getCode() {
			this.codeImgUrl = codeImgUrl();
		},
		browserInfo() {
			var document = window.document,
				navigator = window.navigator,
				agent = navigator.userAgent.toLowerCase(),
				// IE8+支持.返回浏览器渲染当前文档所用的模式
				// IE6,IE7:undefined.IE8:8(兼容模式返回7).IE9:9(兼容模式返回7||8)
				// IE10:10(兼容模式7||8||9)
				IEMode = document.documentMode,
				// chorme
				chrome = window.chrome || false,
				System = {
					// user-agent
					agent: agent,
					// 是否为IE
					//						isIE: /msie/.test(agent),
					isIE: !!window.ActiveXObject || "ActiveXObject" in window,
					// Gecko内核
					isGecko:
						agent.indexOf("gecko") > 0 &&
						agent.indexOf("like gecko") < 0,
					// webkit内核
					isWebkit: agent.indexOf("webkit") > 0,
					// 是否为标准模式
					isStrict: document.compatMode === "CSS1Compat",
					// 是否支持subtitle
					supportSubTitle: function () {
						return "track" in document.createElement("track");
					},
					// 是否支持scoped
					supportScope: function () {
						return "scoped" in document.createElement("style");
					},
					// 获取IE的版本号
					ieVersion: function () {
						try {
							return agent.match(/msie ([\d.]+)/)[1] || 0;
						} catch (e) {
							return IEMode;
						}
					},
					// Opera版本号
					operaVersion: function () {
						try {
							if (window.opera) {
								return agent.match(/opera.([\d.]+)/)[1];
							} else if (agent.indexOf("opr") > 0) {
								return agent.match(/opr\/([\d.]+)/)[1];
							}
						} catch (e) {
							return 0;
						}
					},
					// 描述:version过滤.如31.0.252.152 只保留31.0
					versionFilter: function () {
						if (
							arguments.length === 1 &&
							typeof arguments[0] === "string"
						) {
							var version = arguments[0];
							start = version.indexOf(".");
							if (start > 0) {
								end = version.indexOf(".", start + 1);
								if (end !== -1) {
									return version.substr(0, end);
								}
							}
							return version;
						} else if (arguments.length === 1) {
							return arguments[0];
						}
						return 0;
					},
				};

			try {
				// 浏览器类型(IE、Opera、Chrome、Safari、Firefox)
				System.type = System.isIE
					? "IE"
					: window.opera || agent.indexOf("opr") > 0
					? "Opera"
					: agent.indexOf("chrome") > 0
					? "Chrome"
					: // safari也提供了专门的判定方式
					window.openDatabase
					? "Safari"
					: agent.indexOf("firefox") > 0
					? "Firefox"
					: "unknow";

				// 版本号
				System.version =
					System.type === "IE"
						? System.ieVersion()
						: System.type === "Firefox"
						? agent.match(/firefox\/([\d.]+)/)[1]
						: System.type === "Chrome"
						? agent.match(/chrome\/([\d.]+)/)[1]
						: System.type === "Opera"
						? System.operaVersion()
						: System.type === "Safari"
						? agent.match(/version\/([\d.]+)/)[1]
						: "0";

				// 浏览器外壳
				System.shell = function () {
					// 遨游浏览器
					if (agent.indexOf("maxthon") > 0) {
						System.version =
							agent.match(/maxthon\/([\d.]+)/)[1] ||
							System.version;
						return "傲游浏览器";
					}
					// QQ浏览器
					if (agent.indexOf("qqbrowser") > 0) {
						System.version =
							agent.match(/qqbrowser\/([\d.]+)/)[1] ||
							System.version;
						return "QQ浏览器";
					}

					// 搜狗浏览器
					if (agent.indexOf("se 2.x") > 0) {
						return "搜狗浏览器";
					}

					// Chrome:也可以使用window.chrome && window.chrome.webstore判断
					if (chrome && System.type !== "Opera") {
						var external = window.external;
						var clientInfo = window.clientInformation;
						// 客户端语言:zh-cn,zh.360下面会返回undefined
						var clientLanguage = clientInfo.languages;

						// 猎豹浏览器:或者agent.indexOf("lbbrowser")>0
						if (external && "LiebaoGetVersion" in external) {
							return "猎豹浏览器";
						}
						// 百度浏览器
						if (agent.indexOf("bidubrowser") > 0) {
							System.version =
								agent.match(/bidubrowser\/([\d.]+)/)[1] ||
								agent.match(/chrome\/([\d.]+)/)[1];
							return "百度浏览器";
						}
						// 360极速浏览器和360安全浏览器
						if (
							System.supportSubTitle() &&
							typeof clientLanguage === "undefined"
						) {
							// object.key()返回一个数组.包含可枚举属性和方法名称
							var storeKeyLen = Object.keys(chrome.webstore)
								.length;
							var v8Locale = "v8Locale" in window;
							return storeKeyLen > 1
								? "360极速浏览器"
								: "360安全浏览器";
						}
						return "Chrome";
					}
					return System.type;
				};

				// 浏览器名称(如果是壳浏览器,则返回壳名称)
				System.name = System.shell();
				// 对版本号进行过滤过处理
				System.version = System.versionFilter(System.version);
			} catch (e) {}
			return {
				client: System,
			};
		},
		/*
		 * 找回密码
		 */
		onclickGetAuthCode() {
			if (this.verificationFunc("auth") == undefined) {
				this.resetPwdType = true;
				this.getting = true;
				this.btnType = true; // disabled
				const data = {
					mobile: this.changePasswordForm.findTel,
					type: {
						code: "FORGET_PASSWORD",
						desc: "",
					},
					// loginName: this.changePasswordForm.findName.trim(),
				};
				api.send(data)
					.then(valid.call(this))
					.then((res) => {
						console.log(res.ok, 1111);
						if (res.ok) {
							this.getting = true;
							this.btnType = true; // disabled
							this.findButtonText = `${this.count}s后重新获取`;
							let timer = window.setInterval(() => {
								this.count--;
								this.findButtonText = `${this.count}s后重新获取`;
								if (this.count <= 0) {
									this.count = 60;
									this.getting = false;
									this.btnType = false;
									this.findButtonText = "获取验证码";
									clearInterval(timer);
								}
							}, 1000);
						} else {
							this.btnType = false;
							this.getting = false;
						}
					})
					.catch(errors.call(this));
			}
		},
		resetPwd() {
			// this.verificationFunc('code')
			this.updateLoadingStatus({
				isLoading: true,
			});
			this.$refs.changePasswordForm.validate((ok) => {
				if (ok) {
					const data = {
						// loginName: this.changePasswordForm.findName.trim(),
						mobile: this.changePasswordForm.findTel,
						password: this.changePasswordForm.findPassword,
					};
					api.forgetPwd(data)
						.then(valid.call(this))
						.then((res) => {
							if (res.ok) {
								this.$Message.success("修改成功");
								this.$refs.changePasswordForm.resetFields();
								this.firstLogin = false;
								this.isFindPassword = false;
							}
						})
						.catch(errors.call(this))
						.finally(() => {
							this.updateLoadingStatus({
								isLoading: false,
							});
						});
				}
			});
		},
		verificationFunc(type) {
			const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
			// if(!this.changePasswordForm.findName) {
			// 	// this.$Message.error('请输入您的账号')
			//                 this.$refs.changePasswordForm.validateField('findName');
			// 	return false
			// }
			if (!reg.test(this.changePasswordForm.findTel)) {
				this.$refs.changePasswordForm.validateField("findTel");
				return false;
			}
			if (this.getting && type === "auth") {
				this.$Message.error(`请${this.count}秒后再试`);
				return false;
			}
			if (!this.changePasswordForm.findAuthCode && type === "code") {
				this.$refs.changePasswordForm.validateField("findAuthCode");
				return false;
			}
		},
	},
	watch: {
		userName(newVal, oldVal) {
			if (newVal) {
				this.nameTrue = "";
			}
		},
		password(newVal, oldVal) {
			if (newVal) {
				this.PassTrue = "";
			}
		},
		code(newVal, oldVal) {
			if (newVal) {
				this.CodeTrue = "";
			}
		},
	},
	mounted() {
		localStorage.setItem("token", "");
		localStorage.setItem("tenant", "");
		let params = {
			domain: location.host,
		};
		api.getByDomain(params)
			.then(valid.call(this))
			.then((res) => {
				if (res.ok) {
					let loginLogo = document.querySelector(".loginBox .logo");
					if (res.data.data) {
						let data = res.data.data;
						this.captchaFlag = data.captcha; // 是否需要验证码
						loginLogo.style.background =
							"url(" + data.logo + ") center center no-repeat";
						let loginCode = data.code;
						let loginName = data.name;
						if (loginCode == "0000") {
							// 千目智慧
							//如果有缓存
							let curNodeStr = localStorage.getItem("curNode");
							let curNode = JSON.parse(curNodeStr);
							console.log(curNode, "curNode");
							if (curNode && curNode.code) {
								this.tenantList = [curNode];
								this.tenant = curNode.code;
								console.log(this.tenantList, this.tenantList);
								this.changeTenant(curNode.code);
								this.$nextTick(() => {
									this.disabledTenantSelect = false;
								});
							} else {
								// this.tenantList = [
								// 	{
								// 		code: loginCode,
								// 		name: loginName,
								// 	},
								// ];
								// this.tenant = loginCode;
								setTimeout(() => {
									this.disabledTenantSelect = false;
								}, 200);

								if (this.captchaFlag) {
									this.captchaFun();
								}
								if (
									(data.theme && data.theme != themeName) ||
									(data.theme &&
										data.exterior != themeExterior)
								) {
									this.setLink(data.theme, data.exterior);
								}
								this.$store.commit("updateLogoUrlLight", {
									logoUrlLight: data.logoLight,
								});
								this.$store.commit("updateLogoUrl", {
									logoUrlLight: data.logo,
								});
							}
						} else {
							// 非千目智慧
							this.disabledTenantSelect = true;
							this.tenantList = [
								{
									code: loginCode,
									name: loginName,
								},
							];
							this.tenant = loginCode;
							if (this.captchaFlag) {
								this.captchaFun();
							}
							if (
								(data.theme && data.theme != themeName) ||
								(data.theme && data.exterior != themeExterior)
							) {
								this.setLink(data.theme, data.exterior);
							}
							this.$store.commit("updateLogoUrlLight", {
								logoUrlLight: data.logoLight,
							});
							this.$store.commit("updateLogoUrl", {
								logoUrlLight: data.logo,
							});
						}
					}
				}
			})
			.finally(() => {});
		// 获取验证码
		this.getCode();
		let Browser = this.browserInfo();
		var browser = Browser.client.name ? Browser.client.name : "IEedg";
		if (Browser.client.isIE) {
			// ||Browser.client.type === "Safari"
			this.$Message.info({
				render: (h) => {
					return h("span", [
						"系统检测到您使用的浏览器可能存在兼容性问题，为了更好的操作体验，推荐下载",
						h(
							"a",
							{
								attrs: {
									href: "javascript:void(0)",
								},
								on: {
									click: () => {
										window.open(
											"https://dl.google.com/tag/s/appguid%3D%7B8A69D345-D564-463C-AFF1-A69D9E530F96%7D%26iid%3D%7B9E5235DA-DD13-8895-F4BF-EB61DF4546FA%7D%26lang%3Dzh-CN%26browser%3D4%26usagestats%3D1%26appname%3DGoogle%2520Chrome%26needsadmin%3Dprefers%26ap%3Dx64-stable-statsdef_1%26installdataindex%3Dempty/update2/installers/ChromeSetup.exe"
										);
									},
								},
							},
							"谷歌"
						),
						" 、 ",
						h(
							"a",
							{
								attrs: {
									href: "javascript:void(0)",
								},
								on: {
									click: () => {
										window.open(
											"https://download-ssl.firefox.com.cn/releases-sha2/stub/official/zh-CN/Firefox-latest.exe"
										);
									},
								},
							},
							"火狐"
						),
						" 、 ",
						h(
							"a",
							{
								attrs: {
									href: "javascript:void(0)",
								},
								on: {
									click: () => {
										window.open("https://ie.sogou.com/");
									},
								},
							},
							"搜狗"
						),
						" 、 ",
						h(
							"a",
							{
								attrs: {
									href: "javascript:void(0)",
								},
								on: {
									click: () => {
										window.open(
											"https://browser.360.cn/se/"
										);
									},
								},
							},
							"360浏览器（极速）"
						),
						"浏览器访问。",
					]);
				},
				duration: 0,
				closable: true,
			});
		}
	},
};
</script>
<style scoped lang="less">
.contentBox {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: url("../assets/img/login/login_bg.png") no-repeat bottom center;
	background-size: cover;
}

.loginBox {
	width: 386px;
	height: 485px;
	background: #fff;
	border-radius: 4px;
	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
	border-top: 5px solid #2d8cf0;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -193px;
	margin-top: -240px;
	padding: 0px 35px;
	.logo {
		margin: 30px 0px;
		height: 60px;
		width: 100%;
	}
	.infoList {
		margin-top: 15px;
		.codeIpt {
			width: 200px;
		}
		.codeImg {
			width: 100px;
			height: 36px;
			// border: 1px solid #e0e0e0;
			background: #f4fcfe;
			border-radius: 4px;
			img {
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
		}
	}
	.resetForm,
	.changePasswordForm {
		.infoList {
			margin-top: 0;
		}
	}
	.loginRelated {
		margin-top: 15px;
		.forgetBtn {
			font-size: 12px;
			cursor: pointer;
		}
	}
	.erro {
		font-size: 12px;
		color: #444;
		color: red;
		height: 20px;
	}
}

.login-auth-code {
	.ivu-input-wrapper {
		width: 200px;
	}
	button {
		color: #fff;
		height: 36px;
		float: right;
		border: none;
		outline: none;
		padding: 0 15px;
		border-radius: 5px;
	}
}
#passwordTips {
	display: flex;
	margin-top: 15px;
}
#passwordTips span {
	width: 40px;
	height: 20px;
	color: #fff;
	overflow: hidden;
	margin-right: 10px;
	background: #d7d9dd;
	line-height: 20px;
	text-align: center;
}
#passwordTips .s1 {
	background: #f45a68;
} /*红色*/
#passwordTips .s2 {
	background: #fc0;
} /*橙色*/
#passwordTips .s3 {
	background: #cc0;
} /*黄色*/
#passwordTips .s4 {
	background: #14b12f;
} /*绿色*/
</style>
