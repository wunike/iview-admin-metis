<style lang="less"></style>

<template>
	<div class="connectPreview">
		<import-page :templateLists="templateLists"></import-page>
	</div>
</template>

<script>
import importPage from "../../customerManagement/importPage.vue";
import valid, { errors, crmCustomer } from "../../../libs/request";
export default {
	name: "crm.activityImport",
	data() {
		return {
			templateLists: {
				curr: crmCustomer.importActivityMemberFile, // 导入数据EXCEL  (一个地址)
				reportUrl: crmCustomer.downActivityMemberReport, // 下载导入错误报告EXCEL (一个地址)
				download: crmCustomer.downloadExcelActivityMemberEnroll, // 下载EXCEL导入模板 (一个地址)
				overwriteUrl: crmCustomer.saveStus, // 覆盖用户信息
				unCoverUrl: crmCustomer.unCover, // 不覆盖用户信息
				downloadExcelRptInfo: crmCustomer.downloadActivityMemberExcelRptInfo, // 下载EXCEL导入模板中重复的模板数据
				goBack: "crm.activityEnrollment.detial"
			}
		};
	},
	components: {
		importPage
	}
};
</script>
