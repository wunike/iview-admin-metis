<style lang="less">
.module_upload {
}
</style>

<template>
    <div class="module_upload">
        <a href="">下载</a>
        <Upload :action="" name="avatar" :on-success="uploadSuccess" ref="upload" class="organizatin-upload" :format="[]" :show-upload-list="false" :max-size="" :on-format-error="uploadFormatError" :on-exceeded-size="uploadMaxSize">
            <a href="javascript:void(0);">上传</a>
        </Upload>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Object
        }
    },
    data() {
        return {
            info: this.value
        };
    },
    components: {},
    methods: {
        uploadSuccess(res,file){
        },
        uploadFormatError() {
            this.$Message.error('上传失败');
        },
        uploadMaxSize() {
            this.$Message.error('上传文件不能大于100kb');
        },
    },
    watch: {
        info: {
            handler: function(val, oldVal) {
                this.$emit('input', val);
            },
            deep: true
        },
        value: {
            handler: function(val, oldVal) {
                this.info = val;
            },
            deep: true
        }
    }
};
</script>
