/** 切换图片，提供图片选择，图片上传等功能 */
<template>
    <div class="video-select-wrapper">
        <div class="video-select-l">
            <div class="component-video-select" @click="handleClick">
                <!-- <img :src="url" alt="" v-if="url" /> -->
                <div class="video-preview-null">
                    <p><i class="el-icon-plus"></i></p>
                    <p>选择视频</p>
                </div>
            </div>
        </div>
        <div class="video-select-r"><el-input type="textarea" :rows="4" placeholder="请输入视频地址" v-model="tempValue"></el-input></div>
    </div>
</template>

<script>
import $bus from '@client/eventBus';

export default {
    props: {
        url: String
    },
    data() {
        return {
            // 唯一得id用于选择图片后事件通知
            selectId: +new Date(),
            tempValue: ''
        };
    },
    created() {
        $bus.$on('select-video', this.changeIamge);
        this.tempValue = this.url;
    },
    watch: {
        url(val) {
            this.tempValue = val;
        },
        tempValue(val) {
            this.changeIamge(this.selectId, val);
        }
    },
    methods: {
        changeIamge(id, url) {
            if (id !== this.selectId) {
                return;
            }
            this.$emit('update:url', url);
            this.$emit('change', url);
        },
        /**
         * 点击弹出选择图片弹窗
         */
        handleClick() {
            $bus.$emit('show-select-video', this.selectId);
        }
    }
};
</script>

<style lang="less" scoped>
.component-video-select {
    width: 100px;
    height: 100px;
    border: 1px dashed $primary;
    border-radius: 3px;
    margin-bottom: 18px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.28s;
    position: relative;
    background: #eee 50% / contain no-repeat;
    justify-content: center;
    align-items: center;
    display: flex;
    &:hover {
        color: $primary;
    }
    img {
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
    }
    p {
        line-height: 1;
        padding-bottom: 10px;
    }
}

.video-preview-null {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding-top: 25px;
    background: rgba(0, 0, 0, 0.2);
}

.video-select-wrapper {
    display: flex;
    .video-select-l {
        width: 108px;
    }
    .video-select-r {
        flex: 1;
    }
}
</style>
