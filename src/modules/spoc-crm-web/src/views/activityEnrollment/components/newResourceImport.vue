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
	name: "crm.newResourceImport",
	data() {
		return {
			templateLists: {
				/* 
				 //下载活动非会员报名导入模板
     downloadTemplate(params) {
        return `${baseURL}${k}/downloadTemplate`
    },
        // 导入活动非会员报名
    importActivityNoMemerFile(params) {
        return `${baseURL}${k}/importActivityNoMemerFile`
    },
    // 下载重复资源数据导入模板
    downloadActivityNoMemberExcelRptInfo(params) {
        return `${baseURL}${k}/downloadActivityNoMemberExcelRptInfo`
    },
     //下载活动资源导入错误报告EXCEL
     downActivityNoMemberReport(params) {
        return `${baseURL}${k}/downActivityNoMemberReport`
    },
				*/
				curr: crmCustomer.importActivityNoMemerFile, // 导入数据EXCEL  (一个地址)
				reportUrl: crmCustomer.downActivityNoMemberReport, // 下载导入错误报告EXCEL (一个地址)
				download: crmCustomer.downloadTemplate, // 下载EXCEL导入模板 (一个地址)
				overwriteUrl: crmCustomer.saveStus, // 覆盖用户信息
				unCoverUrl: crmCustomer.unCover, // 不覆盖用户信息
				downloadExcelRptInfo: crmCustomer.downloadActivityNoMemberExcelRptInfo, // 下载EXCEL导入模板中重复的模板数据
				goBack: "crm.activityEnrollment.detial"
			}
		};
	},
	components: {
		importPage
	}
};
</script>
