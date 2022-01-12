<style lang="less">
	.market-editor-container {
		@border: 1px solid #ccc;
		table {
			border-top: @border;
			border-left: @border;
			td,
			th {
				width: 100px;
				border-bottom: @border;
				border-right: @border;
				padding: 3px 10px;
				text-align: center;
			}
		}
		.toolbar {
			border: 1px solid #ccc;
		}
		.text {
			border: 1px solid #ccc;
			border-top: 0;
		}
	}
</style>

<template>
	<div class="market-editor-container">
		<div id="marketEditor" class="toolbar">
		</div>
		<div id="marketEditorText" class="text" :style="{height: heightStyle + 'px'}" v-if="heightStyle">
		</div>
		<input type="hidden" v-model="model" />
	</div>
</template>

<script>
	import E from 'wangeditor'
	import 'wangeditor/release/wangEditor.min.css'
	var editor;
	export default {
		props: {
			value: {
				type: String,
				required: true,
				default: '',
			},
			heightStyle: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				model: this.value,
			}
		},
		mounted() {
			let _this=this;
			if(this.heightStyle) {
				this.editor = new E('#marketEditor', '#marketEditorText')
			} else {
				this.editor = new E('#marketEditor')
			}
			this.editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
			this.editor.customConfig.zIndex = 10;
			this.editor.customConfig.menus = [
				'head', // 标题
				'bold', // 粗体
				'fontSize', // 字号
				'fontName', // 字体
				'italic', // 斜体
				'underline', // 下划线
				'strikeThrough', // 删除线
				'foreColor', // 文字颜色
				'backColor', // 背景颜色
				'justify', // 对齐方式
				'table', // 表格
				/* 'emoticon', // 表情
				'undo', // 撤销
				'redo' // 重复 */
			]

			this.editor.customConfig.onchange = function(html) {
				// html 即变化之后的内容
				_this.model = html;
			}
			this.editor.create();
		},
		watch: {
			value(val) {
				this.model = val;
				this.$nextTick(()=>{
					this.editor.txt.html(this.model);
				})
			},
			model(model) {
				this.$emit('input', model);
			},
		}
	}
</script>