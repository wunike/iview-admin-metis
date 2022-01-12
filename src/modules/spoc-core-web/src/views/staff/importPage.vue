<style lang="less">

</style>

<template>
	<div class="staff-import-container">
		<import-page :templateLists="templateLists"></import-page>
	</div>
</template>

<script>
	import importPage from '@public/modules/importPage.vue'
	import valid, {
		errors,
		sysUser
	} from '../../libs/request';
	import { mapMutations } from 'vuex';
	export default {
		name: 'core.staffImport',
		data() {
			return {
				templateLists: {
					curr: sysUser.import, // 导入数据EXCEL
					reportUrl: sysUser.downReport, // 下载导入错误报告EXCEL
					download: sysUser.downloadTemplate, // 下载EXCEL导入模板
					overwriteUrl: sysUser.cover, // 覆盖用户信息
					unCoverUrl: sysUser.unCover, // 不覆盖用户信息
					goBack: 'core.staff',
				},
			}
		},
		components: {
			importPage
		}
	}
</script>