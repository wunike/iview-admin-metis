<template>
    <div>
        <el-form-item label="按钮字号："><el-input placeholder="请输入文本内容" v-model="tempsubmitStyle.fontSize"></el-input></el-form-item>
        <el-form-item label="按钮字体颜色：">
            <!-- <el-input placeholder="请输入文本内容" v-model="tempsubmitStyle.color"></el-input> -->
            <el-color-picker v-model="tempsubmitStyle.color" show-alpha size="small"></el-color-picker>
        </el-form-item>
        <el-form-item label="按钮颜色：">
            <!-- <el-input placeholder="请输入文本内容" v-model="tempsubmitStyle.background"></el-input> -->
            <el-color-picker v-model="tempsubmitStyle.background" show-alpha size="small"></el-color-picker>
        </el-form-item>
        <el-form-item label="按钮高度："><el-input placeholder="请输入文本内容" v-model="tempsubmitStyle.height"></el-input></el-form-item>
    </div>
</template>

<script>
export default {
    name: 'attr-qk-submitStyle',
    props: {
        submitStyle: {
            type: Object,
            default: () => {
                return {
                    fontSize: '14px',
                    color: '#606266',
                    background: '#25A589',
                    height: '36px '
                };
            }
        }
    },
    data() {
        return {
            tempsubmitStyle: ''
        };
    },
    mounted() {
        this.tempsubmitStyle = this.submitStyle;
    },
    watch: {
        submitStyle() {
            this.tempsubmitStyle = this.submitStyle;
        },
        tempsubmitStyle() {
            this.$emit('update:submitStyle', this.tempsubmitStyle);
        }
    }
};
</script>

<style scoped>
.el-form-item {
    margin-bottom: 10px;
}
</style>
