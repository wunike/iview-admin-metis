<style>

</style>

<template>
	<div>
		<div id="editor1" ref="commonEdit"></div>
		<input type="hidden" v-model="model"/>
	</div>
</template>

<script>
	import E from 'wangeditor'
	var editor;
	export default {
		props: {
			value: {
				type: String,
				required: true,
            	default:'',
			},
		},
		data() {
			return {
				model: this.value,
			}
		},
		mounted() {
			let _this=this
			editor = new E(_this.$refs.commonEdit) 
			editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片
			editor.customConfig.zIndex = 10;
			editor.customConfig.menus = [
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
			editor.customConfig.onchange = function(html) {
				// html 即变化之后的内容
				_this.model=html;
			}
			editor.customConfig.onchangeTimeout=200;
			editor.create()
		},
		methods:{
			reset(){
				this.model = ''
				editor.txt.html('');
			}
		},
		watch: {
			// value(val) {
			// 	this.model = val;
    		// 	editor.txt.html(this.model);
			// },
			// model(model) {
			// 	this.$emit('input', model);
			// }
		}
	}
</script>