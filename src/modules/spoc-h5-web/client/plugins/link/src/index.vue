<!--矩形边框-->
<template>
    <a class="qk-link" :href="href" :target="target">{{ text }}</a>
</template>

<script>
export default {
    name: 'QkLink', // 这个名字很重要，它就是未来的标签名
    props: {
        text: {
            type: String,
            default: '链 接'
        },
        href: {
            type: String,
            default: '#'
        },
        target: {
            type: String,
            default: '_blank'
        },
        
    }
};
</script>

<style lang="less" scoped>
    .qk-link{
        color: inherit;
        text-decoration: unset;
        display: block;
        width: 100%;
        height: 100%;
    }
</style>
