<style scoped lang="less">
</style>
<template>
	<div>
		<router-view></router-view>
	</div>
</template>
<script>
export default {
	mounted() {
		document.getElementById('app').style.overflow = ''
	},
}
</script>
