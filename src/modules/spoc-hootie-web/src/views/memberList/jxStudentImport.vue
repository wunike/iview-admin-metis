<style lang="less"></style>

<template>
	<div class="connectPreview">
		<import-page :templateLists="templateLists" prevPage="jxStudentImport"></import-page>
	</div>
</template>

<script>
import importPage from "@public/modules/importPage.vue";
import valid, { errors, jxStudent } from "../../libs/request";
export default {
	name: "hootie.jxStudentImport",
	data() {
		return {
			// templateLists: {
			//     curr: jxStudent.import, // 导入数据EXCEL  (一个地址)
			//     reportUrl: jxStudent.downReport, // 下载导入错误报告EXCEL (一个地址)
			//     download: jxStudent.template, // 下载EXCEL导入模板 (一个地址)
			//     overwriteUrl: jxStudent.cover, // 覆盖用户信息
			//     unCoverUrl: jxStudent.unCover, // 不覆盖用户信息
			//     goBack: 'hootie.memberList'
			// },
			templateLists: {
				curr: jxStudent.import, // 导入数据EXCEL  (一个地址)
				reportUrl: jxStudent.downReport, // 下载导入错误报告EXCEL (一个地址)
				download: jxStudent.template, // 下载EXCEL导入模板 (一个地址)
				overwriteUrl: jxStudent.saveStus, // 覆盖用户信息
				unCoverUrl: jxStudent.unCover, // 不覆盖用户信息
				goBack: "hootie.memberList"
			}
		};
	},
	components: {
		importPage
	}
};
</script>
