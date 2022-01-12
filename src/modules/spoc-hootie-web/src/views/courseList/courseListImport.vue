<style lang="less"></style>

<template>
	<div class="connectPreview">
		<import-page :templateLists="templateLists"></import-page>
	</div>
</template>

<script>
import importPage from "@public/modules/importPage.vue";
import valid, { errors, jxLesson } from "../../libs/request";
export default {
	name: "hootie.courseListImport",
	data() {
		return {
			templateLists: {
				curr: jxLesson.import, // 导入数据EXCEL  (一个地址)
				reportUrl: jxLesson.downReport, // 下载导入错误报告EXCEL (一个地址)
				download: jxLesson.template, // 下载EXCEL导入模板 (一个地址)
				overwriteUrl: jxLesson.cover, // 覆盖用户信息
				unCoverUrl: jxLesson.unCover, // 不覆盖用户信息
				goBack: "hootie.courseListImport"
			}
		};
	},
	components: {
		importPage
	},
	mounted() {}
};
</script>
