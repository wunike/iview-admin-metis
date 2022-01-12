<style lang="less">
</style>

<template>
	<div>
		<import-page :templateLists="templateLists"></import-page>
	</div>
</template>

<script>
import importPage from "@public/modules/importPage.vue";
import valid, { errors, jxCourseTpl } from "../../libs/request";
import { mapMutations } from "vuex";
export default {
	name: "hootie.pushSettings.import",
	data() {
		return {
			templateLists: {
				curr: jxCourseTpl.import, // 导入数据EXCEL
				reportUrl: jxCourseTpl.downReport, // 下载导入错误报告EXCEL
				download: jxCourseTpl.downloadTemplate, // 下载EXCEL导入模板
				overwriteUrl: jxCourseTpl.cover, // 覆盖用户信息
				unCoverUrl: jxCourseTpl.unCover, // 不覆盖用户信息
				goBack: "hootie.pushSettings"
			}
		};
	},
	components: {
		importPage
	}
};
</script>
