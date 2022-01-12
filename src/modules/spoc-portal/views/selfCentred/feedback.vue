<style lang='less'>
	.feedbackDetail{
		padding: 10px;
		height: 100%;
		background: rgba(255, 255, 255, 1);
	}
	.feedbacktable {
		width: 100%;
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		padding: 0 16px;
		margin-top: 10px;
		.subTypeNameStyle {
			margin-left: 11px;
			.ivu-table-cell {
				margin-left: 11px;
			}
		}
	}
	.verifymodel {
		.verifyBody {
			height: 70vh;
			overflow: auto;
		}
	}
</style>
<template>
	<div class="feedback">
		<div v-if="!isShowDetail">
			<div class="search-title">
				<v-search-collapse @search="getList" @reset="resetSearch">
					<Input v-model="name" placeholder="问题描述" style="width:224px;"></Input>
					<DatePicker
						ref="DatePicker"
						:options="options3"
						split-panels
						@on-open-change="setOptTime"
						v-model="optTime"
						type="daterange"
						:transfer="true"
						placement="bottom-start"
						separator=" ~ "
						placeholder="提交时间"
						style="width:224px;"
					></DatePicker>
					<Select v-model="type" style="width: 100px;" clearable placeholder="问题分类">
						<Option v-for="(item, index) in classList" :value="item.value" :key="index">{{item.label}}</Option>
					</Select>
					<Select v-model="priority" style="width: 100px;" clearable placeholder="优先级">
						<Option v-for="(item, index) in priorityList" :value="item.value" :key="index">{{item.label}}</Option>
					</Select>
					<Select v-model="status" style="width: 100px;" clearable placeholder="状态">
						<Option v-for="(item, index) in statusList" :value="item.value" :key="index">{{item.label}}</Option>
					</Select>
				</v-search-collapse>
			</div>
			<big-table
				v-if="defaultShowCol"
				class="feedbacktable"
				:tableName="tableName"
				:tableHeightOut="tableHeightOut"
				:tableData="data"
				:tableColumnArray="tableColumnArray"
				:defaultShowCol="defaultShowCol"
				:canSelection="false"
				:dataTotal="dataTotal"
				:canChangeHeight="true"
				:isShowSelectTableColumn="false"
				:btnList="btnList"
				:pageNo="pageNo"
				@pageChange="pageChange"
			></big-table>
		</div>
		<div v-else class="feedbackDetail">
			<view-feedback-detail :detailId='detailId' @on-back="back"></view-feedback-detail>
		</div>
		<!-- <p class="all">共计<i>{{count}}</i>条</p> -->
		<!-- <v-title title="反馈列表">
			<v-btn-options slot="right" :btns="btnsNormal1">
			</v-btn-options>
		</v-title> -->
	<!-- 	<Table :columns="columns" :data="data" @on-sort-change="onSortChange" @on-filter-change="filterChange" :loading="tableLoad"></Table> -->
		<!-- <div class="page">
			<Page :total="count" :page-size="10" :current="pageNo" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
		</div> -->
		<!-- 对话框 -->
		<Modal v-model="addBackModel" width="730" class-name="vertical-center-modal" @on-visible-change="isloading=false" :mask-closable="false" :closable="false">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				提交反馈
			</p>
			<div class="addBackBody">
				<Form ref="addBackForm1" :model="addBackForm" :rules="addBackRuler" :label-width="120">
					<FormItem prop="priority" label="优先级：">
						<RadioGroup v-model="addBackForm.priority">
							<Radio v-for="item in priorityList" :key="item.id" :label="item.value">{{item.label}}</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem prop="type" label="问题分类：">
						<Select v-model="addBackForm.type" style="width: 300px;">
							<Option v-for="item in classList" :key="item.id" :value="item.value">{{item.label}}</Option>
						</Select>
					</FormItem>
					<FormItem prop="content" label="问题描述：">
						<editor v-model="addBackForm.content"></editor>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button @click="closeAddBackModel('addBackForm1')">取消</Button>
				<Button type="primary" @click="addBackOk('addBackForm1')">确定</Button>
			</div>
		</Modal>
		<Modal v-model="verifyModel" width="730" class-name="verifymodel vertical-center-modal" @on-visible-change="">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				提交反馈
			</p>
			<div class="verifyBody">
				<Form :model="verifyForm" :label-width="120">
					<FormItem prop="priority" label="优先级：">
						<div>{{verifyForm.priority}}</div>
					</FormItem>
					<FormItem prop="type" label="问题分类：">
						<div>{{verifyForm.type}}</div>
					</FormItem>
					<FormItem prop="content" label="问题描述：">
						<div v-html="verifyForm.content"></div>
					</FormItem>
					<FormItem prop="content" label="解决结果：">
						<div v-html="verifyForm.action"></div>
					</FormItem>
					<FormItem prop="content" label="理由：">
						<div v-html="verifyForm.content1"></div>
					</FormItem>
				</Form>
			</div>
			<div slot="footer" style="text-align: right;">
				<Button @click="reasonModel=true">重新激活</Button>
				<Button type="primary" @click="pass">验证通过</Button>
			</div>
		</Modal>
		<Modal v-model="reasonModel" width="730" class-name="vertical-center-modal">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				激活理由
			</p>
			<div class="reasonBody">
				<Form ref="reasonForm1" :model="reasonForm" :rules="reasonRuler" :label-width="120">
					<FormItem prop="content" label="请输入激活理由：">
						<editor name="editor2" v-model="reasonForm.content" v-if="reasonModel"></editor>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button @click="closereasonModel('reasonForm1')">取消</Button>
				<Button type="primary" @click="activate('reasonForm1')">确定</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import vSelect from '@public/modules/vSelect';
	import vTitle from "@public/modules/vTitle";
	import vBtnOptions from '@public/modules/vBtnOptions';
	import bigTable from "@public/modules/bigTable.vue";
	import vSearchCollapse from "@public/modules/vSearchCollapse";
	import viewFeedbackDetail from './viewFeedbackDetail.vue'
	import editor from './editor';
	import { mapMutations, mapState } from 'vuex';
	import valid, {
		errors,
		sys,
		sysDict,
		sysWorkorder
	} from '../../libs/request';
	import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
	export default {
		data() {
			return {
				detailId: '',
				isShowDetail: false,
				btnList:[{
                    style: {},
                    type: "",
                    btnClick: this.addFeedBack,
                    text: "提交反馈"
                }],
				defaultShowCol: null,
				tableName: '反馈列表',
				tableHeightOut: 72,
				optTime: [],
				tableLoad: false,
				verifyModel: false,
				reasonModel: false,
				verifyForm: {
					priority: '',
					type: '',
					content: '',
					content1: '',
					action: ""
				},
				reasonForm: {
					content: ''
				},
				reasonRuler: {
					content: {
						required: true,
						message: '激活理由不能为空',
						trigger: 'blur'
					}
				},
				name: '',
				startTime: '',
				endTime: '',
				priority: '',
				sort: '',
				status: '',
				type: '',
				pageNo: 1,
				pageSize: 10,
				dataTotal: 0,
				addBackModel: false,
				isEditBack: false,
				priorityList: [],
				statusList:[],
				classList: [],
				addBackForm: {
					id: '',
					priority: "1",
					type: "",
					content: '',
					status: '',
					'url': window.location.href,
					browser: '',
					os: '',
					username: '',
					pwdFlag: '',
					sysWorkorderLogList: [],
				},
				addBackRuler: {
					priority: {
						required: true,
						message: '优先级不能为空',
						trigger: 'change'
					},
					type: {
						required: true,
						message: '问题分类不能为空',
						trigger: 'change'
					},
					content: {
						required: true,
						message: '问题描述不能为空',
						trigger: 'blur'
					},
				},
				data: [],
				tableColumnArray: [{
						title: "编号",
						key: "no",
						align: "center",
						render: (h, params) => {
							let _this = this;
							return h('a', {
								attr: {
									src: "javascript:void(0);",
								},
								on: {
									click: () => {
										_this.detailId = params.row.id
										_this.isShowDetail = true
										// _this.$router.push({
										// 	name: 'portal.viewFeedbackDetail',
										// 	query: {
										// 		detailId: params.row.id
										// 	}
										// })
									}
								}
							},params.row.no)
						}
					},
					{
						title: "问题内容",
						key: "creator",
						align: "center",
						ellipsis: true,
						width: 240,
						render: (h, params) => {
							let _this = this;
							return h('div', {
								style: {
									height: "54px",
									padding: "12px 0"
								}
							}, [h('a', {
								style: {
									display: "block",
									whiteSpace: "normal",
									overflow: "hidden",
									height: "32px",
									width: "100%",
									position: "relative"
								},
								attr: {
									src: "javascript:void(0);",
								},
								domProps: {
									innerHTML:_this.getSimpleText(params.row.content).substr(0,10)+'...'
								},
								class: {
								},
								on: {
									click: () => {
										_this.detailId = params.row.id
										_this.isShowDetail = true
										// _this.$router.push({
										// 	name: 'portal.viewFeedbackDetail',
										// 	query: {
										// 		detailId: params.row.id
										// 	}
										// })
									}
								}
							})])
						}
					},
					{
						title: "问题分类",
						key: "type",
						align: "center",
					},
					{
						title: "优先级",
						key: "priority",
						align: "center",
						width: 120,
					},
					{
						title: "提交时间",
						key: "updateDate",
						sortable: "custom",
						align: "center"
					},
					{
						title: "状态",
						key: "status",
						align: "center",
					},
					{
						title: "操作",
						key: "doAction",
						align: "center",
						render: (h, params) => {
							let self = this;
							return h('div', {}, [h('a', {
									attr: {
										src: "javascript:void(0);"
									},
									style: {
										display: params.row.status == "已提交" ? '' : 'none'
									},
									on: {
										click: () => {
											this.editBackModel(params.row.id)
										}
									}
								},
								'编辑'
							), h('a', {
									attr: {
										src: "javascript:void(0);"
									},
									style: {
										display: params.row.status == "已解决" || params.row.status == "已拒绝" ? '' : 'none'
									},
									on: {
										click: () => {
											this.verify(params.row);
										}
									}
								},
								'验证'
							)])
						}
					},
				]
			}
		},
		computed: {
			...mapState(['userInfo', 'noLogin', 'calendarConfig']),
			allinfo() {
				let navigate = {};
				navigate.appName = navigator.appName; //浏览器的正式名称
				navigate.appVersion = navigator.appVersion; //浏览器的版本号
				navigate.cookieEnabled = navigator.cookieEnabled; // 返回用户浏览器是否启用了cookie
				navigate.cpuClass = navigator.cpuClass; //返回用户计算机的cpu的型号，通常intel芯片返回"x86"（火狐没有）

				navigate.mimeType = navigator.mimeTypes; // 浏览器支持的所有MIME类型的数组
				navigate.platform = navigator.platform; // 浏览器正在运行的操作系统平台，包括Win16(windows3.x)  
				//   Win32(windows98,Me,NT,2000,xp),Mac68K(Macintosh 680x0)
				//     和ＭacPPC(Macintosh PowerPC)
				navigate.plugins = navigator.plugins; //  安装在浏览器上的所有插件的数组
				navigate.userLanguage = navigator.userLanguage; // 用户在自己的操作系统上设置的语言（火狐没有）
				navigate.userAgent = navigator.userAgent; //包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform
				navigate.systemLanguage = navigator.systemLanguage; // 用户操作系统支持的默认语言（火狐没有）

				navigate.type = "";

				navigate.appCodeName = navigator.appCodeName; //与浏览器相关的内部代码名
				navigate.appMinorVersion = navigator.appMinorVersion; //辅版本号（通常应用于浏览器的补丁或服务包)

				navigate.language = navigator.language; //浏览器支持的语言 （IE没有）

				navigate.onLine = navigator.onLine; //返回浏览器是否处于在线模式（IE4以上版本）

				navigate.opsProfile = navigator.opsProfile; // 未定义   （IE、火狐没有）

				navigate.oscpu = navigator.oscpu; //浏览器正在运行的操作系统，其中可能有CPU的信息（IE没有）

				navigate.product = navigator.product; // 浏览器的产品名（IE没有）

				navigate.productSub = navigator.productSub; //关于浏览器更多信息（IE没有）

				navigate.securityPolicy = navigator.securityPolicy; // 浏览器支持的加密类型（IE没有）

				navigate.userProfile = navigator.userProfile; //  返回一个UserProfile对象，它存储用户的个人信息（火狐没有）

				navigate.vender = navigator.vender; // 浏览器厂商名称（IE、火狐没有）

				navigate.vendorSub = navigator.vendorSub; // 关于浏览器厂商更多的信息  

				return navigate;

			}
		},
		components: {
			vSelect,
			vBtnOptions,
			vTitle,
			editor,
			bigTable,
			vSearchCollapse,
			viewFeedbackDetail
		},
		mounted() {
			let params1 = {
				types: "sys_workorder_type,sys_workorder_priority,sys_workorder_status",
			}
			sysDict.batchListData(params1).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.classList = res.data.data.sys_workorder_type;
					this.priorityList = res.data.data.sys_workorder_priority;
					this.statusList = res.data.data.sys_workorder_status;
				}
			}).catch(errors.call(this));

			waitUntil(
				() => {
					return (
						(this.calendarConfig && this.calendarConfig.maxMonthInterval) || false
					);
				},
				() => {
					this.optTime = defaultDatePickerValue(this.calendarConfig.maxMonthInterval)
					this.options3 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
					
					this.defaultShowCol = {
						"true":[
							{"name":"no","title":"编号","selected":true,"required":true,"percent":false,"total":"","filter":"","sort":1,"dynamiced":false},
							{"name":"creator","title":"问题内容","selected":true,"required":true,"percent":false,"total":"","filter":"","sort":10,"dynamiced":false},
							{"name":"type","title":"问题分类","selected":true,"required":true,"percent":false,"total":"","filter":"","sort":30,"dynamiced":false},
							{"name":"priority","title":"优先级","selected":true,"required":true,"percent":false,"total":"","filter":"","sort":40,"dynamiced":false},
							{"name":"updateDate","title":"提交时间","selected":true,"required":true,"percent":false,"total":"","filter":"","sort":50,"dynamiced":false},
							{"name":"status","title":"状态","selected":true,"required":true,"percent":false,"total":"","filter":"","sort":60,"dynamiced":false},
						]
					}
					this.getList();
				}
			);

		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
			back() {
				this.isShowDetail = false;
			},
			pageChange(pageNo, pageSize) {
				if (!pageNo) {
					//防止无用重复请求
					return;
				}
				this.pageNo = pageNo;
				this.pageSize = pageSize;
				this.data = [];
				this.getList();
			},
			addFeedBack(){
				this.addBackModel = true
			},
			changeDivHeight(height) {
				this.tableHeightOut = height;
			},
			setOptTime(flag){
				if(flag){
					this.optTime = []
				}
			},
			getSimpleText(html) {
				var re1 = new RegExp("<.+?>", "g"); //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
				var msg = html.replace(re1, ''); //执行替换成空字符
				return msg;
			},
			getList() {
				this.tableLoad = true;
				let params = {
					name: this.name,
					
					priority: this.priority,
					sort: this.sort,
					status: this.status,
					type: this.type,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
				}
				params.startTime = this.optTime[0] ? this.optTime[0].format('yyyy-MM-dd 00:00:00') : "";
            	params.endTime = this.optTime[1] ? this.optTime[1].format('yyyy-MM-dd 23:59:59') : "";
				sysWorkorder.wordorderMList(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.dataTotal = res.data.data.count;
						this.data = res.data.data.list;
						this.tableLoad = false;
					}
				}).catch(errors.call(this));
			},
			browserInfo(userAgent) {
				let broName;
				//FireFox
				if(userAgent.indexOf('Firefox') != -1) {
					let isFireFox = true;
					/*broName = 'FireFox浏览器';*/
					let strStart = userAgent.indexOf('Firefox');
					let temp = userAgent.substring(strStart);
					broName = temp.replace('/', '版本号')

				}

				//Edge
				if(userAgent.indexOf('Edge') != -1) {
					let isEdge = true;
					/*broName = 'Edge浏览器';*/
					let strStart = userAgent.indexOf('Edge');
					let temp = userAgent.substring(strStart);
					broName = temp.replace('/', '版本号');
				}

				//IE浏览器
				if(userAgent.indexOf('NET') != -1 && userAgent.indexOf("rv") != -1) {
					let isIE = true;
					/*broName = 'IE浏览器'; */
					let strStart = userAgent.indexOf('rv');
					let strStop = userAgent.indexOf(')');
					let temp = userAgent.substring(strStart, strStop);
					broName = temp.replace('rv', 'IE').replace(':', '版本号');
				}

				//360极速模式可以区分360安全浏览器和360极速浏览器
				if(userAgent.indexOf('WOW') != -1 && userAgent.indexOf("NET") < 0 && userAgent.indexOf("Firefox") < 0) {
					if(navigator.javaEnabled()) {
						let is360 = true;
						broName = '360安全浏览器-极速模式';
					} else {
						let is360 = true;
						broName = '360极速浏览器-极速模式';
					}
				}

				//360兼容
				if(userAgent.indexOf('WOW') != -1 && userAgent.indexOf("NET") != -1 && userAgent.indexOf("MSIE") != -1 && userAgent.indexOf("rv") < 0) {
					let is360 = true;
					broName = '360兼容模式';
				}

				//Chrome浏览器
				if(userAgent.indexOf('WOW') < 0 && userAgent.indexOf("Edge") < 0) {
					let isChrome = true;
					/*broName = 'Chrome浏览器';*/
					let strStart = userAgent.indexOf('Chrome');
					let strStop = userAgent.indexOf(' Safari');
					let temp = userAgent.substring(strStart, strStop);
					broName = temp.replace('/', '版本号');
				}
				return broName;
			},
			setDeviceAndOS() {
				let obj = {};
				var name = "unknown";
				if(window.navigator.userAgent.indexOf("Android") != -1) {
					name = "Android";
				} else if(window.navigator.userAgent.indexOf("iPhone") != -1) {
					name = "iPhone";
				} else if(window.navigator.userAgent.indexOf("SymbianOS") != -1) {
					name = "SymbianOS";
				} else if(window.navigator.userAgent.indexOf("Windows Phone") != -1) {
					name = "Windows Phone";
				} else if(window.navigator.userAgent.indexOf("iPad") != -1) {
					name = "iPad";
				} else if(window.navigator.userAgent.indexOf("iPod") != -1) {
					name = "iPod";
				}
				if(name != "unknown") {
					_AgentInfo.OSname = name;
					_AgentInfo.deviceType = "mobile";
					return;
				}
				if(window.navigator.userAgent.indexOf("Windows NT 10.0") != -1) {
					name = "Windows 10";
				} else if(window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) {
					name = "Windows 8";
				} else if(window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) {
					name = "Windows 7";
				} else if(window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) {
					name = "Windows Vista";
				} else if(window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) {
					name = "Windows XP";
				} else if(window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) {
					name = "Windows 2000";
				} else if(window.navigator.userAgent.indexOf("Mac") != -1) {
					name = "Mac/iOS";
				} else if(window.navigator.userAgent.indexOf("X11") != -1) {
					name = "UNIX";
				} else if(window.navigator.userAgent.indexOf("Linux") != -1) {
					name = "Linux";
				}
				obj.OSname = name;
				obj.deviceType = "pc";
				return obj;
			},
			closeAddBackModel(name) {
				this.addBackForm = {
					id: '',
					priority: '',
					type: "",
					content: '',
					status: '',
					'url': window.location.href,
					browser: '',
					os: '',
					username: '',
					pwdFlag: '',
					sysWorkorderLogList: [],
				};
				this.$refs[name].resetFields();
				this.isEditBack = false;
				this.addBackModel = false;
			},
			addBackOk(name, id) {
				this.$refs[name].validate((valid1) => {
					if(valid1) {
						this.updateLoadingStatus({
							isLoading: true
						});
						let params5 = {};
						params5 = this.addBackForm;
						params5.browser = this.browserInfo(this.allinfo.userAgent);
						params5.os = this.setDeviceAndOS().OSname;
						params5.username = this.userInfo.name;
						if(this.isEditBack) {
							params5.status = "commited";
						} else {
							params5.id = '';
							params5.status = "commited";
						}
						params5.pwdFlag = 0;

						sysWorkorder.workorferSave(params5).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.$Message.success(res.data.message);
								this.pageNo = 1
								this.getList();
								this.closeAddBackModel(name);
							}
						}).catch(errors.call(this)).finally(() => {
							this.updateLoadingStatus({
								isLoading: false
							});
						});;
					}
				})
			},
			editBackModel(id) {
				this.isEditBack = true;
				let params = {
					id
				}
				sysWorkorder.sysWorkorderForm(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						let obj = res.data.data
						this.addBackForm.id = id;
						this.addBackForm.priority = obj.priority;
						this.addBackForm.type = obj.type;
						this.addBackForm.content = obj.content;
						this.addBackModel = true;
					}
				}).catch(errors.call(this));
			},
			verify(val) {
				let params = {
					id: val.id
				}
				if(val.status=='已解决'){
					params.status = 'fixed'
				}
				if(val.status=='不予解决'){
					params.status = 'willnotfix'
				}
				sysWorkorder.editStatusView(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						//						this.verifyForm = res.data.data;
						this.verifyForm.type = val.type;
						this.verifyForm.id = val.id;
						this.verifyForm.priority = val.priority;
						this.verifyForm.content = val.content;
						if(res.data.data){
							this.verifyForm.content1 = res.data.data.content;
						}
						this.verifyForm.action = val.status;
						this.verifyModel = true;
					}
				}).catch(errors.call(this));
			},
			pass() {
				let params = {
					status: 'confirm',
					content: '',
					id: this.verifyForm.id
				}
				console.log(this.updateLoadingStatus)
				this.updateLoadingStatus({
					isLoading: true
				});
				sysWorkorder.editStatusMe(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.getList();
						this.verifyModel = false;
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});;
			},
			closereasonModel(name) {
				this.$refs[name].resetFields();
				this.reasonModel = false;
			},
			activate(name) {
				this.$refs[name].validate((valid1) => {
					if(valid1) {
						this.updateLoadingStatus({
							isLoading: true
						});
						let params = {
							status: 'reactive',
							content: this.reasonForm.content,
							id: this.verifyForm.id
						}
						console.log(params)
						sysWorkorder.editStatusMe(params).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.$Message.success(res.data.message);
								this.getList();
								this.closereasonModel(name);
								this.verifyModel = false;
							}
						}).catch(errors.call(this)).finally(() => {
							this.updateLoadingStatus({
								isLoading: false
							});
						});
					}
				})
			},
		}
	}
</script>