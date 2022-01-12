<template>
    <el-form-item label="视频："><videoSelect :url.sync="tempValue" /></el-form-item>
</template>

<script>
import videoSelect from '@client/components/video-select';
export default {
    name: 'attr-qk-videoSrc',
    props: {
        videoSrc: String
    },
    components: {
        videoSelect
    },
    data() {
        return {
            tempValue: ''
        };
    },
    mounted() {
        this.tempValue = this.videoSrc;
    },
    watch: {
        videoSrc(val) {
            this.tempValue = val;
        },
        tempValue() {
            this.$emit('update:videoSrc', this.tempValue);
        }
    }
};
</script>

<style lang="less" scoped>
.arrt-eidt-wrapper {
    display: flex;
    .arrt-eidt-l {
        width: 108px;
    }
    .arrt-eidt-r {
        flex: 1;
    }
}
</style>
