<style>

</style>

<template>
	<div>
		<div :id="id" ref="editorAnnouncement"></div>
		<input type="hidden" v-model="model"/>
	</div>
</template>

<script>
	import E from 'wangeditor'
	let editor;
	export default {
		props: {
			value: {
				type: String,
				required: true,
            	default:'',
			},
			id:{
				type: String,
				required: true,
			}
		},
		data() {
			return {
				model: this.value,
			}
		},
		mounted() {
			let _this=this
			editor = new E(_this.$refs.editorAnnouncement) 
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
				// editor.txt.html('<p>用 JS 设置的内容</p>')
				editor.txt.clear()
			}
		},
		watch: {
		}
	}
</script>