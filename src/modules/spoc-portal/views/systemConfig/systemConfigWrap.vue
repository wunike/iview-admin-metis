<style lang="less">
	.systemConfigWrap {
		background: #FFFFFF;
		padding: 26px 20px;
	}
</style>

<template>
	<div class="systemConfigWrap">
		<Tabs :animated="false" v-model="tabName">
			<TabPane label="基础信息" name="basics"></TabPane>
			<TabPane label="教务管理" name="education"></TabPane>
			<TabPane label="合同管理" name="contract"></TabPane>
            <TabPane label="客户管理" name="client"></TabPane>

        </Tabs>
		<basics v-if="tabName=='basics'"></basics>
		<education v-if="tabName=='education'"></education>
		<contract v-if="tabName=='contract'"></contract>
        <client v-if="tabName=='client'"></client>
    </div>
</template>

<script>
	import basics from "./systemConfig.vue";
	import education from "./educationManage.vue";
	import contract from "../contractManage/contractManage.vue";
    import client from "./clientManage.vue";

	export default {
		name: 'portal.systemConfig',
		data() {
			return {
				tabName: 'basics',
			}
		},
		components: {
			basics,
			education,
			contract,
            client
		},
        created() {
            console.log(this.$route)
        }
	}
</script>
