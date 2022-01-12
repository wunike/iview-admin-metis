<template>
    <el-dialog class="components-video-libs-wrapper" title="我的图片" :visible.sync="dialogVisible" width="600px">
        <div class="components-video-libs">
            <div class="video-lib-side-bar"></div>
            <div class="video-lib-inner">
                <div class="video-lib-btn">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" :before-upload="beforeUpload" accept="video/*" :show-file-list="false">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip marginL20">只能上传视频文件，且不超过200M</span>
                    </el-upload>
                </div>
                <!-- <ul class="video-list-wrapper" v-if="videoList.length">
          <li class="video-item" v-for="(item, index) in videoList" :key="index" @click="handlevideoClick(item.url)">
            <img :src="item.url" alt="">
          </li>
        </ul> -->
                <!-- <div class="padding60 text-center gray" v-else>暂无数据</div> -->
            </div>
        </div>
    </el-dialog>
</template>

<script>
import $bus from '@client/eventBus';
import valid, { errors, SysProps, common, report, api } from '@client/service/request.js';
export default {
    name: 'video-libs',
    data() {
        return {
            dialogVisible: false,
            uploading: false,
            hasLoadData: false,
            videoList: [],
            selectId: ''
        };
    },
    created() {
        $bus.$on('show-select-video', selectId => {
            console.log(123123);
            this.dialogVisible = true;
            this.selectId = selectId;
        });
    },
    watch: {
        dialogVisible(val) {
            if (val && !this.uploading) {
                this.getMyvideos();
            }
        }
    },
    methods: {
        beforeUpload(file) {
            if (file.size > 200 * 1024 * 1024) {
                this.$message.error('psd文件不能超过100M！');
                return;
            }
            this.uploadPsd(file);
            return false;
        },
        uploadPsd(file) {
            let params = new FormData();
            params.append('file', file);
            this.uploading = true;
            api.personUploadvideo(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.uploading = false;
                        this.videoList.splice(0, 0, res.data.body);
                        this.handlevideoClick(res.data.body.url);
                    }
                })
                .catch(errors.call(this))
                .catch(() => {
                    this.uploading = true;
                })
                .finally(() => {});
        },
        getMyvideos() {
            this.hasLoadData = true;
            api.personVideos()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.videoList = res.data.body || [];
                    }
                })
                .catch(errors.call(this))
                .catch(() => {})
                .finally(() => {});
        },
        /**
         * 点击图片
         * @param url
         */
        handlevideoClick(url) {
            $bus.$emit('select-video', this.selectId, url);
            this.dialogVisible = false;
        }
    }
};
</script>

<style lang="less" scoped>
.video-list-wrapper {
    display: flex;
    height: 400px;
    padding-top: 20px;
    li {
        width: 120px;
        height: 120px;
        background: #eee 50% / contain no-repeat;
        cursor: pointer;
        justify-content: center;
        align-items: center;
        display: flex;
        transition: all 0.28s;
        &:hover {
            box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.16);
            transform: translate3d(0, -2px, 0);
        }
        img {
            display: inline-block;
            max-width: 100%;
            max-height: 100%;
        }
    }
}
</style>
<style lang="less">
.components-video-libs-wrapper {
    .el-dialog__body {
        padding: 0 20px 20px;
    }
}
</style>
