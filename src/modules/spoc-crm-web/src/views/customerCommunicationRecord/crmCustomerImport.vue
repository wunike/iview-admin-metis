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
		crmTrace,
	} from '../../libs/request'
	export default {
		name: 'crm.customerCommunicationRecordImport',
		data() {
			return {
				templateLists: {
					curr: crmTrace.importFile, // 导入数据EXCEL  (一个地址)
					reportUrl: crmTrace.downReport, // 下载导入错误报告EXCEL (一个地址)
					download: crmTrace.downloadTemplate, // 下载EXCEL导入模板 (一个地址)
					overwriteUrl: null, // 覆盖用户信息
					unCoverUrl: null, // 不覆盖用户信息
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