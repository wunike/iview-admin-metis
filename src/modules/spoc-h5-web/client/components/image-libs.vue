<template>
    <el-dialog class="components-image-libs-wrapper" title="我的图片" :visible.sync="dialogVisible" width="600px">
        <div class="components-image-libs">
            <div class="image-lib-side-bar"></div>
            <div class="image-lib-inner">
                <div class="image-lib-btn">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" :before-upload="beforeUpload" accept="jpg,png,gif" :show-file-list="false">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip marginL20">只能上传jpg/png/gif文件，且不超过100M</span>
                    </el-upload>
                </div>
                <ul class="image-list-wrapper" v-if="imageList.length">
                    <li class="image-item" v-for="(item, index) in imageList" :key="index" @click="handleImageClick(item.url)"><img :src="item.url" alt="" /></li>
                </ul>
                <div class="padding60 text-center gray" v-else>暂无数据</div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import $bus from '@client/eventBus';
import valid, { errors, SysProps, common, report, api } from '@client/service/request.js';

export default {
    name: 'image-libs',
    data() {
        return {
            dialogVisible: false,
            uploading: false,
            hasLoadData: false,
            imageList: [],
            selectId: ''
        };
    },
    created() {
        $bus.$on('show-select-image', selectId => {
            this.dialogVisible = true;
            this.selectId = selectId;
        });
    },
    watch: {
        dialogVisible(val) {
            if (val && !this.uploading) {
                this.getMyImages();
            }
        }
    },
    methods: {
        beforeUpload(file) {
            if (file.size > 100 * 1024 * 1024) {
                this.$message.error('文件不能超过100M！');
                return;
            }
            let temp1 = file.name.split('.');
            let temp = temp1[temp1.length - 1];
            if (!['jpg', 'png', 'gif'].includes(temp)) {
                this.$message.error('请上传jpg/png/gif文件');
                return false;
            }
            this.uploadPsd(file);
            return false;
        },
        uploadPsd(file) {
            let params = new FormData();
            params.append('file', file);
            this.uploading = true;
            // this.$axios
            //     .post('/api/h5/person/uploadImage', params)
            //     .then(res => {
            //         this.uploading = false;
            //         this.imageList.splice(0, 0, res.body);
            //     })
            //     .catch(() => {
            //         this.uploading = true;
            //     });

            api.personUploadImage(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.uploading = false;
                        this.imageList.splice(0, 0, res.data.body);
                    }
                })
                .catch(errors.call(this))
                .catch(() => {
                    this.uploading = true;
                })
                .finally(() => {});
        },
        getMyImages() {
            this.hasLoadData = true;
            // this.$axios.get('/api/h5/person/images').then(res => {
            //     let list = res.body || [];
            //     if (list.length < 10) {
            //         this.imageList = list;
            //     } else {
            //         this.imageList = list.slice(list.length - 10);
            //     }
            // });
            api.personImages()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let list = res.data.body || [];
                        if (list.length < 10) {
                            this.imageList = list;
                        } else {
                            this.imageList = list.slice(list.length - 10);
                        }
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
        handleImageClick(url) {
            $bus.$emit('select-image', this.selectId, url);
            this.dialogVisible = false;
        }
    }
};
</script>

<style lang="less" scoped>
.image-list-wrapper {
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
.components-image-libs-wrapper {
    .el-dialog__body {
        padding: 0 20px 20px;
    }
}
</style>
