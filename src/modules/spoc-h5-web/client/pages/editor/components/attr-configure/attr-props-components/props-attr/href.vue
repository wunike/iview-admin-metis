<template>
  <el-form-item label="url地址：">
    <el-input
            type="textarea"
            :rows="3"
            placeholder="tel:1234567898=>指定手机号码  mailto:123456@163.com=>指定邮箱"
            v-model="tempValue">
    </el-input>
  </el-form-item>
</template>

<script>
	export default {
		name: "attr-qk-href",
		props: {
			href: String
		},
		data() {
			return {
				tempValue: ''
			}
		},
		mounted() {
			this.tempValue = this.href;
		},
		watch: {
			href(val) {
				this.tempValue = val;
			},
			tempValue() {
				this.$emit('update:href', this.tempValue);
			}
		}
	}
</script>

<style scoped>

</style>
