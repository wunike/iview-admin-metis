<!--test.vue-->
<template>
    <div class="qk-input"><input class="qk-input-item" v-model="value" :placeholder="placeholder" type="text" /></div>
</template>

<script>
export default {
    name: 'QkInput',
    props: {
        placeholder: {
            type: String,
            default: '请输入'
        },
        value: {
            require: false
        }
    },
    data() {
        return {};
    }
};
</script>

<style lang="less" scoped>
.qk-input-item {
    display: block;
    background-color: inherit;
    color: inherit;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
}
</style>
