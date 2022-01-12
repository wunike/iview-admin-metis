<template>
    <el-form-item label="打开方式">
        <!-- <el-input
            type="textarea"
            :rows="3"
            placeholder="请选择打开方式"
            v-model="tempValue">
    </el-input> -->
        <el-radio-group v-model="tempValue" size="mini">
            <el-radio-button label="_self">默认</el-radio-button>
            <el-radio-button label="_blank">新窗口</el-radio-button>
            <el-radio-button label="_parent">父框架集</el-radio-button>
            <el-radio-button label="_top">整个窗口</el-radio-button>
        </el-radio-group>
    </el-form-item>
</template>

<script>
export default {
    name: 'attr-qk-target',
    props: {
        target: String
    },
    data() {
        return {
            tempValue: ''
        };
    },
    mounted() {
        this.tempValue = this.target;
    },
    watch: {
        target(val) {
            this.tempValue = val;
        },
        tempValue() {
            this.$emit('update:target', this.tempValue);
        }
    }
};
</script>

<style scoped></style>
