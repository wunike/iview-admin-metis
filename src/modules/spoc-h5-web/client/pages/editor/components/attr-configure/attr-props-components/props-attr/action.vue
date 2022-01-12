<template>
    <el-form-item label="表单提交地址："><el-input type="textarea" :rows="3" placeholder="请填写表单提交地址" v-model="tempValue"></el-input></el-form-item>
</template>

<script>
export default {
    name: 'attr-qk-action',
    props: {
        action: String
    },
    data() {
        return {
            tempValue: ''
        };
    },
    mounted() {
        this.tempValue = this.action;
    },
    watch: {
        action(val) {
            this.tempValue = val;
        },
        tempValue() {
            this.$emit('update:action', this.tempValue);
        }
    }
};
</script>

<style scoped>
.el-form-item {
    margin-bottom: 10px;
}
</style>
