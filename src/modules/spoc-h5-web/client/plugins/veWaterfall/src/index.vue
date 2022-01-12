<!--test.vue-->
<template>
    <div class="qk-ve-waterfall"><ve-waterfall :data="chartData" width="100%" height="100%" :settings="chartSettings" ref="veChart"></ve-waterfall></div>
</template>

<script>
export default {
    name: 'QkVeWaterfall', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
    props: {
        chartData: {
            type: Object,
            default: () => {
                return {
                    columns: ['活动', '时间'],
                    rows: [{ 活动: '吃饭', 时间: 4 }, { 活动: '睡觉', 时间: 10 }, { 活动: '打豆豆', 时间: 5 }]
                };
            }
        },
        chartSettings: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            timer: ''
        };
    },
    mounted() {},
    methods: {}
};
</script>

<style lang="less">
.qk-ve-waterfall {
    width: 100%;
    height: 100%;
    // word-break: keep-all;
}
</style>
