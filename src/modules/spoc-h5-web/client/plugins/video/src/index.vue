<!--矩形边框-->
<template>
    <video class="qk-video" crossorign="anonymous" :poster="imageSrc" webkit-playsinline="true" playsinline="true" controls id="video">
        <source :src="videoSrc" />
        您的浏览器不支持 video 标签。
    </video>
</template>

<script>
export default {
    name: 'QkVideo', // 这个名字很重要，它就是未来的标签名
    props: {
        videoSrc: {
            type: String,
            default: ''
        },
        imageSrc: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="less" scoped>
.qk-video {
    width: 100%;
    height: 100%;
}
</style>
