<template>
    <div v-if="Object.keys(chartSettings).length">
        <!-- <div v-if="tempValue.form">
            <el-form-item label="标签的位置：">
                <el-radio-group v-model="tempValue.form.labelPosition" size="small">
                    <el-radio-button label="left">左对齐</el-radio-button>
                    <el-radio-button label="right">右对齐</el-radio-button>
                    <el-radio-button label="top">顶部对齐</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="标签宽度：">
                <el-input placeholder="标签宽度" v-model="tempValue.form.labelWidth" ></el-input>
            </el-form-item>
            <el-form-item label="标签组件尺寸：">
                <el-radio-group v-model="tempValue.form.size" size="small">
                    <el-radio-button label="medium">中</el-radio-button>
                    <el-radio-button label="small">小</el-radio-button>
                    <el-radio-button label="mini">迷你</el-radio-button>
                </el-radio-group>
            </el-form-item>
        </div>
        <div v-if="tempValue.submitBtn">
            <el-form-item label="按钮类型：">
                <el-radio-group v-model="tempValue.submitBtn.type" size="small">
                    <el-radio-button label="">默认按钮</el-radio-button>
                    <el-radio-button label="primary">主要按钮</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="按钮组件尺寸：">
                <el-radio-group v-model="tempValue.submitBtn.size" size="small">
                    <el-radio-button label="medium">中</el-radio-button>
                    <el-radio-button label="small">小</el-radio-button>
                    <el-radio-button label="mini">迷你</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="按钮内容：">
                <el-input placeholder="按钮内容" v-model="tempValue.submitBtn.innerText" ></el-input>
            </el-form-item>
            <el-form-item label="按钮宽度：">
                <el-input placeholder="按钮宽度" v-model="tempValue.submitBtn.width" ></el-input>
            </el-form-item>
        </div> -->
        <!-- <el-form-item label="表单样式："><el-input type="textarea" :rows="3" placeholder="请输入url地址" v-model="tempValue"></el-input></el-form-item> -->
    </div>
</template>

<script>
export default {
    name: 'attr-qk-chartSettings',
    props: {
        chartSettings: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            tempValue: ''
        };
    },
    mounted() {
        this.tempValue = this.chartSettings;
    },
    watch: {
        chartSettings(val) {
            this.tempValue = val;
        },
        tempValue() {
            this.$emit('update:chartSettings', this.tempValue);
        }
    }
};
</script>

<style scoped>
    .el-form-item{
        margin-bottom: 10px;
    }
</style>
