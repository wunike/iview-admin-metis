<style lang="less">
.preview {
	font-size: 14px;
	width: 960px;
	height: 100%;
	padding-bottom: 100px;
	margin: auto;
	// .pdfviewer{
	//     border: none;
	// 	height: 90vh;
	// 	box-shadow: 1px 1px 15px #ddd;
	// }
	// .noPdf, .pdf-converting{
	// 	height: 20vh;
	// 	box-shadow: 1px 1px 15px #ddd;
	// 	font-size: 20px;
	// 	display: flex;
	// 	justify-content: center;
	// 	background: rgba(1, 1, 1, 0.4);
	// 	.text{
	// 		align-self: center;
	// 		color: #fff;
	// 	}
	// }

	.pdf-converting {
		height: 20vh;
		box-shadow: 1px 1px 15px #ddd;
		font-size: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: rgba(1, 1, 1, 0.4);
		.text {
			align-self: center;
			color: #fff;
		}
	}
}
</style>

<template>
	<div class="preview">
		<div ref="cpdf" v-if="pdfurl" class="pdfBox" style="text-align: center">
			<canvas
				v-for="n in viewHt.page_count"
				:key="n"
				class="canvasstyle"
				:id="'canvasDivviewHt' + n"
				:ref="'canvasDivviewHt' + n"
			></canvas>
		</div>
		<div
			class="pdf-converting"
			v-if="previewProgress == 100 && pdfurl && viewHt.isloading"
		>
			<p class="text">
				{{
					$t(
						"modules_spoc_sign_web_src_views_pactdetails_pactdetails_6890"
					)
				}}
			</p>
		</div>
		<div class="pdf-converting" v-else-if="previewProgress == -99">
			<p class="text">{{ previewMsg }}</p>
		</div>
		<div
			class="pdf-converting"
			v-else-if="previewProgress >= 0 && previewProgress < 100"
		>
			<p class="text">【 转码中请稍后！】</p>
			<p style="width: 400px">
				<Progress
					:percent="previewProgress"
					:stroke-width="20"
					text-inside
					:stroke-color="['#17b6a5', '#17b6a5']"
				/>
			</p>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import valid, {
	errors,
	common,
	htContract,
	htContractTpl,
	sysAttachment,
	sys,
} from "../../../libs/request.js";
import PDFJS from "pdfjs-dist";
PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.min");
export default {
	data() {
		return {
			info: {},
			noPdf: false,
			pdfurl: "",
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
		};
	},
	mounted() {
		this.getProgress();
	},
	// beforeDestroy(){
	// 	this.stopPolling();
	// },
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		getProgress() {
			this.previewTimer = setInterval(() => {
				if (this.$route.query.id && !this.pdfurl) {
					htContractTpl
						.getContractConverterProgress({
							ctId: this.$route.query.id,
						})
						.then(valid.call(this))
						.then((res) => {
							if (res.ok) {
								let response = res.data.data;
								if (response.percent == 100) {
									this.previewProgress = response.percent;
									setTimeout(() => {
										this.pdfurl = htContractTpl.displayUrl({
											id: this.$route.query.id,
											tenant: localStorage.getItem(
												"tenant"
											),
										});
									}, 1000);
									window.clearInterval(this.previewTimer);
								} else if (response.percent == -99) {
									window.clearInterval(this.previewTimer);
									this.previewProgress = response.percent;
									this.previewMsg = response.errorMsg;
								} else {
									this.previewProgress = response.percent;
								}
							}
						})
						.catch(errors.call(this))
						.finally(() => {});
				}
			}, 1000);
		},
		// stopPolling(){
		// 	clearInterval(this.previewTimer)
		// },
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
};
</script>
