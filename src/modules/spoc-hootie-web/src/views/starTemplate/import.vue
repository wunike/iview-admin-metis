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
		jxStarTpl,
	} from '../../libs/request'
	export default {
		data() {
			return {
				templateLists: {
					curr: jxStarTpl.importFile, // 导入数据EXCEL  (一个地址)
					reportUrl: jxStarTpl.downReport, // 下载导入错误报告EXCEL (一个地址)
					download: jxStarTpl.downloadTemplate, // 下载EXCEL导入模板 (一个地址)
					overwriteUrl: jxStarTpl.cover, // 覆盖用户信息
					unCoverUrl: jxStarTpl.unCover, // 不覆盖用户信息
					goBack: 'hootie.starTemplate'
                }
			}
		},
		components: {
			importPage
		},
		mounted() {}
	}
</script>