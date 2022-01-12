<style lang="less"></style>

<template>
	<div class="connectPreview">
		<import-page :templateLists="templateLists"></import-page>
	</div>
</template>

<script>
	import importPage from '@public/modules/importPage.vue'
	import valid, {
		errors,
		jwClassroom,
	} from '../../libs/request'
	export default {
		name: 'core.classimport',
		data() {
			return {
				templateLists: {
					curr: jwClassroom.importMore, // 导入数据EXCEL  (一个地址)
					reportUrl: jwClassroom.downReport, // 下载导入错误报告EXCEL (一个地址)
					download: jwClassroom.template, // 下载EXCEL导入模板 (一个地址)
					overwriteUrl: jwClassroom.cover, // 覆盖用户信息
					unCoverUrl: jwClassroom.unCover, // 不覆盖用户信息
					goBack: 'core.classroom'
				}
			}
		},
		components: {
			importPage
		},
		mounted() {}
	}
</script>