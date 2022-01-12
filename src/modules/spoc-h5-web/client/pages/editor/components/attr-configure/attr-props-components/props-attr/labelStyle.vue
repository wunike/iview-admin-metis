<template>
    <div>
        <el-form-item label="标签字号："><el-input placeholder="请输入文本内容" v-model="templabelStyle.fontSize"></el-input></el-form-item>
        <el-form-item label="标签颜色：">
            <!-- <el-input placeholder="请输入文本内容" v-model="templabelStyle.color"></el-input> -->
            <el-color-picker v-model="templabelStyle.color" show-alpha size="small"></el-color-picker>
        </el-form-item>
    </div>
</template>

<script>
export default {
    name: 'attr-qk-labelStyle',
    props: {
        labelStyle: {
            type: Object,
            default: () => {
                return {
                    fontSize: '14px',
                    color: '#606266'
                };
            }
        }
    },
    data() {
        return {
            templabelStyle: ''
        };
    },
    mounted() {
        this.templabelStyle = this.labelStyle;
    },
    watch: {
        labelStyle() {
            this.templabelStyle = this.labelStyle;
        },
        templabelStyle() {
            this.$emit('update:labelStyle', this.templabelStyle);
        }
    }
};
</script>

<style scoped>
.el-form-item {
    margin-bottom: 10px;
}
</style>
