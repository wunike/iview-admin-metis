<style lang="less"></style>

<template>
	<div class="connectPreview">
		<span style="color:red;margin-left:14px;margin-right:8px;">*</span>
		<Select v-model="officeId" :placeholder="$t('messagemanagement_index_344')" style="width:200px;" @on-change="officeIdChange">
			<Option v-for="item in roomAreaList" :value="item.id" :key="item.value">{{ item.name }}</Option>
		</Select>
		<import-page :templateLists="templateLists" :officeId="officeId" ref="importRef"></import-page>
	</div>
</template>

<script>
import importPage from "@public/modules/importPage.vue";
import valid, { errors, jwClassCourse, sysUser } from "../../libs/request";
export default {
	name: "jw.classManageImport",
	data() {
		return {
			officeId: "",
			roomAreaList: [],
			templateLists: {
				curr: jwClassCourse.importFile, // 导入数据EXCEL  (一个地址)
				reportUrl: jwClassCourse.downReport, // 下载导入错误报告EXCEL (一个地址)
				download: jwClassCourse.downloadTemplate, // 下载EXCEL导入模板 (一个地址)
				overwriteUrl: jwClassCourse.cover, // 覆盖用户信息
				unCoverUrl: jwClassCourse.unCover, // 不覆盖用户信息
				checkTemplateData: jwClassCourse.checkTemplateData, // 验证校区是否有数据模板
				goBack: "jw.classManageList"
			}
		};
	},
	components: {
		importPage
	},
	mounted() {
		this.getMoreList();
		// this.$set(this.classListFind, "officeId", this.app.currOfficeId);
	},
	methods: {
		officeIdChange(val) {
			this.$refs["importRef"].getOfficeId();
		},
		getMoreList() {
			//校区列表
			sysUser
				.dataScopeFilter()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.roomAreaList = res.data.data;
						this.officeId = this.$route.query.currOfficeId;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					// this.updateLoadingStatus({ isLoading: false });
				});
		}
	}
};
</script>