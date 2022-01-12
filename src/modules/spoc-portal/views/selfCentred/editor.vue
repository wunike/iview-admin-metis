<style>

</style>

<template>
	<div>
		<div :id="oname" ref="mySelfCenterEditor">
			<p>
				[步骤]<br />	
				[结果]<br />	
				[期望]
			</p>
		</div>
		<input type="hidden" v-model="model" />
	</div>
</template>

<script>
	import E from 'wangeditor'
	export default {
		props: {
			value: {
				type: String,
				required: true,
				default: '',
			},
			name:{
				type: String,
				default: 'editor',
			}
		},
		data() {
			return {
				model: this.value,
				oname:this.name,
				editor:'',
			}
		},
		mounted() {
			let _this = this
			_this.editor = new E(this.$refs.mySelfCenterEditor)
			//_this.editor = new E('#'+_this.oname)
			_this.editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
			_this.editor.customConfig.zIndex = 10;
			_this.editor.customConfig.menus = [
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
				'emoticon', // 表情
				'undo', // 撤销
				'redo' // 重复
			]
			_this.editor.customConfig.onchange = function(html) {
				// html 即变化之后的内容
				_this.model = html;
			}
			_this.editor.create()
		},
		watch: {
			value(val) {
				this.model = val;
				this.editor.txt.html(this.model);
			},
			model(model) {
				this.editor.txt.html(this.model);
				this.$emit('input', model);
			}
		}
	}
</script>