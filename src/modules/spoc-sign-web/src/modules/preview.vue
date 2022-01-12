<style lang="less">
	.sign-preview {
		font-size: 14px;
		width: 960px;
		margin: 0 auto;
		padding-bottom: 100px;
		.pdfviewer {
			border: none;
			height: 90vh;
			box-shadow: 1px 1px 15px #ddd;
		}
		.pdf-converting {
			height: 20vh;
			box-shadow: 1px 1px 15px #ddd;
			font-size: 20px;
			display: flex;
			justify-content: center;
			background: rgba(1, 1, 1, 0.4);
			.text {
				align-self: center;
				color: #fff;
			}
		}
		.title {
			width: 960px;
			font-size: 16px;
			margin: 26px 0 16px;
			position: relative;
			height: 24px;
			.edit {
				width: 90px;
				height: 32px;
				float: right;
			}
			.fl {
				float: left;
			}
			.btnTop {
				margin: 0;
				float: right;
				text-align: left;
				.ivu-btn {
					line-height: 16px;
					font-size: 14px;
					margin: 0 10px;
					width: 90px;
					height: 30px;
				}
				span {
					cursor: pointer;
				}
				.dropdown {
					text-align: center;
					font-weight: normal;
				}
			}
			.dyinfo {
				&.hid {
					display: none;
				}
				width: 294px;
				height: 114px;
				font-weight: normal;
				position: absolute;
				top: 14px;
				right: 0;
				padding-top: 8px;
				.down {
					text-align: center;
					margin-top: 4px;
				}
				.close {
					color: #999899;
					font-size: 16px;
					position: absolute;
					top: 8px;
					right: 8px;
				}
			}
		}
		.info {
			width: 100%;
			border: 1px #e0e0e0 solid;
			padding: 10px 0;
			background: #fafafa;
			.list {
				width: 49%;
				display: inline-block;
				margin-bottom: 0px;
				.ivu-form-item-label {
					color: #999999;
				}
				p {
					display: inline-block;
					&.ec {
						color: #80cdc9;
					}
				}
			}
		}
		.subjoin {
			width: 960px;
			border: 1px #e0e0e0 solid;
			padding: 10px;
			background: #fafafa;
			.sm {
				width: 48%;
			}
			.mt30 {
				margin-top: 15px;
			}
			.long {
				width: 100%;
			}
			p {
				display: inline-block;
				line-height: 32px;
			}
			.cont {
				margin-top: 12px;
				p {
					line-height: 1.2em;
				}
			}
		}
		.btn {
			margin: 0;
			text-align: center;
			clear: both;
			padding-top: 40px;
			.ivu-btn {
				line-height: 16px;
				font-size: 16px;
				margin: 0 50px;
				width: 127px;
				height: 40px;
			}
		}
	}
</style>

<template>
	<div class="sign-preview">
		<slot name="header"></slot>
		<h3 class="title" v-text="info.name"></h3>
		<div class="info">
			<Form ref="formModal" :label-width="112" class="formModal">
				<FormItem :label="$t('modules_spoc_sign_web_src_modules_preview_4894')" class=" list">
					<p v-text="signTypeMap[info.signType]"></p>
				</FormItem>
				<FormItem :label="$t('modules_spoc_sign_web_src_modules_preview_4895')" class=" list">
					<p v-text="info.code"></p>
				</FormItem>
				<FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_944')" class=" list">
					<p class="ec" v-text="info.student.code?info.student.code:$t('modules_spoc_portal_views_workbenchnew_plugin_fastaccess_4362')"></p>
				</FormItem>
				<FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_945')" class=" list">
					<p v-text="info.student.name"></p>
				</FormItem>
				<FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_719')" class=" list">
					<p class="ec" v-text="info.student.birthday?(new Date(info.student.birthday)).format('yyyy-MM-dd'):$t('modules_spoc_portal_views_workbenchnew_plugin_fastaccess_4362')"></p>
				</FormItem>
				<FormItem :label="$t('views_staff_components_staffinfo_669')" class=" list">
					<p v-text="info.student.gender == 'm' ? $t('views_staff_components_staffinfo_670') : $t('views_staff_components_staffinfo_671')"></p>
				</FormItem>
				<FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_signlists_869')" class=" list">
					<p v-text="parseFloat((info.price)).toFixed(2)"></p>{{$t('modules_spoc_sign_web_src_modules_pactcard_4840')}}</FormItem>
				<FormItem :label="$t('modules_spoc_sign_web_src_modules_preview_4905')" class=" list">
					<p v-text="parseFloat((info.htSign.signPrice)).toFixed(2)"></p>{{$t('modules_spoc_sign_web_src_modules_pactcard_4840')}}<FormItem :label="$t('modules_spoc_sign_web_src_modules_pactcard_4847')" style="display: inline-block;width: 226px; ">
						<p style="width: 100px;" v-text="parseFloat((info.htSign.deratePrice)).toFixed(2)+$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')"></p>
					</FormItem>
				</FormItem>
			</Form>
		</div>
		<div class="mainview" v-if="hasAttac">
			<div>
				<h3 class="title">
					<div class="fl" v-if="hasMain">{{$t('modules_spoc_sign_web_src_modules_preview_4908')}}</div>
					<!--<div class="fl" v-else-if="hasProtocol">{{$t('modules_spoc_sign_web_src_modules_preview_4909')}}</div>-->
					<div class="btnTop">
						<slot name="middlebtn"></slot>
    				<Button type="primary" size="large" @click="goEdit" v-if="(info.status=='committed'||info.status=='checked'||info.status=='signed ')&&sellerId==info.sellerId">{{$t('classroom_allscore_51')}}</Button>
					</div>
				</h3>
			</div>
			<div>
				<div v-if="!hasMain">{{$t('modules_spoc_sign_web_src_modules_preview_4911')}}</div>
				<!-- <iframe class="pdfviewer" v-else-if="pdfurl" :src="pdfurl" width="960"></iframe> -->
				<div ref="cpdf" v-else-if="pdfurl" class="pdfBox" style="text-align: center">
					<canvas
						v-for="n in viewHt.page_count"
						:key="n"
						class="canvasstyle"
						:id="'canvasDivviewHt' + n"
						:ref="'canvasDivviewHt' + n"
					></canvas>
				</div>
				<div class="pdf-converting" v-else>
					<p class="text">{{$t('modules_spoc_sign_web_src_modules_preview_4912')}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { sysAttachment, htContract } from '../libs/request.js';
	import { mapGetters, mapState, mapMutations } from 'vuex';
	import PDFJS from "pdfjs-dist";
	PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.min");
	export default {
		props: {
			info: {
				type: Object,
				required: true,
			},
			pdfinfo: {
				type: Object,
				required: true,
			},
			preview: {
				type: Boolean,
				default: false,
			},
			detail: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				/*pdfjs 开始*/
				noPdf: false,
				viewHt: {
					isloading: false,
					pdfDoc: null, //pdfjs 生成的对象
					pageNum: 1, //
					pageRendering: false,
					pageNumPending: null,
					page_num: 0, //当前页数
					page_count: 0, //总页数
				},
				previewTimer: "",
				previewProgress: -1,
				previewMsg: "",
				wid: 948, //刚进入页面中的pdf容器的宽度
				scale: null, //放大倍数
				/*pdfjs 结束*/
				signTypeMap: {
					new: this.$t('modules_spoc_portal_views_contractmanage_contractmanage_3403'),
					replenish: this.$t('modules_spoc_report_web_src_views_refundreport_index_4671'),
					// again: '再次续签'
				},
				send: false,
				infoma: false,
				modalOff: false,
				reason: '',
				appoModal: false,
				appoForm: {
					appoDate: '',
					remind: false
				},
				promModal: false,
				promForm: {
					money: '',
					promDate: '',
					id: '',
					partner: [{
						people: '',
						shared: ''
					}]
				},
				r: 0,
				modalAccount: false,
				accountData: {
					sum: '',
					pay: '',
					receiptId: '',
					receipt: [{
						sum: '',
						time: ''
					}],
					fileUrl: '',
					remind: false,
				},
				modalFile: false,
				fileData: {
					pactId: '2017BJ-G-VIP-001',
					scanUrl: '',
				},
				sendForm: {
					disabledGroup: [],
					email: '',
					reason: '',
				}
			}
		},
		computed: {
			...mapState(['userInfo', 'appMenuList',"calendarConfig"]),
			sellerId() {
				if(this.userInfo) {
					return this.userInfo.id || '';
				}
			},
			pdfurl() {
				console.log(this.pdfinfo,this.info,1212)
				let obj=this.info.attachments.find(v=>v.bizType==this.pdfinfo.bizType);
				if(!this.detail) { // 生成合同 预览页
					return this.pdfinfo.url;
				}
				return obj?obj.url:false;
			},
			tpl() {
				if(this.info.protocolContent) {
					return '<p>' + this.info.protocolContent.split('\n').join('</p><p>') + '</p>';
				}
			},
			hasMain() { // 有主合同
				// const k = 'ht_contract' + (this.preview ? '_preview' : '');
				return this.info.attachments && (this.info.attachments.findIndex(item => item.type == this.pdfinfo.type) > -1);
			},
			hasAttac() {
				console.log(this.info.attachments)
				return this.info.attachments && this.info.attachments.length;
			},
			hasProtocol() {
				return this.info.isProtocol == '1';
			},
			fj() {
				if(this.hasAttac && this.hasMain) {
					return true;
				} else if(this.hasAttac && !this.hasMain && this.hasProtocol) {
					return false;
				} else if(this.hasAttac && !this.hasMain && !this.hasProtocol) {
					return true;
				} else {
					return true;
				}
				return this.hasMain
			}
		},
		methods: {
			...mapMutations(["updateLoadingStatus"]),
			loadPdf(pdfurl, type) {
				let that = this;
				this.updateLoadingStatus({ isLoading: true });
				PDFJS.getDocument(pdfurl)
					.then((pdfDoc_) => {
						//初始化pdf
						that[type].isloading = false;
						that[type].pdfDoc = pdfDoc_;
						that[type].page_count = that[type].pdfDoc.numPages;
						console.log(that[type].page_count, that[type].pdfDoc);
						that.$nextTick(() => {
							that.updateLoadingStatus({ isLoading: false });
							for (let i = 1; i <= that[type].page_count; i++) {
								that.renderPage(i, type);
							}
						});
					})
					.catch((error) => {
						console.log(
							error,
							this.$t(
								"modules_spoc_sign_web_src_views_pactdetails_pactdetails_6942"
							)
						);
						that[type].isloading = true;
						that.updateLoadingStatus({ isLoading: false });
					});
			},
			renderPage(num, type) {
				//渲染pdf
				let vm = this;
				this[type].pageRendering = true;
				let canvas = document.getElementById("canvasDiv" + type + num); // Using promise to fetch the page
				vm[type].pdfDoc.getPage(num).then(function (page) {
					vm.scale = vm.wid / page.getViewport(1.0).width;
					//vm.wid是在data中定义的一个变量，最初设置的pdf的宽度
					var viewport = page.getViewport(vm.scale);
					// var viewport = page.getViewport(vm.scale); //alert(vm.canvas.height)
					canvas.height = viewport.height;
					canvas.width = viewport.width; // Render PDF page into canvas context
					console.log(canvas);
					let ctx = canvas.getContext("2d");
					var renderContext = {
						canvasContext: ctx,
						viewport: viewport,
					};
					var renderTask = page.render(renderContext); // Wait for rendering to finish
					renderTask.promise.then(function () {
						vm[type].pageRendering = false;
						if (vm[type].pageNumPending !== null) {
							// New page rendering is pending
							vm.renderPage(vm[type].pageNumPending);
							vm[type].pageNumPending = null;
						}
					});
				});
				vm[type].page_num = vm[type].pageNum;
			},
			goEdit() {
				this.$emit('go-edit', this.info);
			},
			reloadPdf() {
				this.r = Math.random();
			}
		},
		watch: {
			pdfurl: {
				handler: function (val, oldVal) {
					if (val) {
						this.$nextTick(() => {
							this.loadPdf(this.pdfurl, "viewHt");
						});
					}
				},
				immediate: true,
			},
		},
	}
</script>
