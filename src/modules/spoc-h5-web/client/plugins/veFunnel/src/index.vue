<!--test.vue-->
<template>
    <div class="qk-ve-funnel"><ve-funnel :data="chartData" width="100%" height="100%" :settings="chartSettings" ref="veChart"></ve-funnel></div>
</template>

<script>
export default {
    name: 'QkVeFunnel', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
    props: {
        chartData: {
            type: Object,
            default: () => {
                return {
                    columns: ['状态', '数值'],
                    rows: [{ 状态: '展示', 数值: 900 }, { 状态: '访问', 数值: 600 }, { 状态: '点击', 数值: 300 }, { 状态: '订单', 数值: 100 }]
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
.qk-ve-funnel {
    width: 100%;
    height: 100%;
    // word-break: keep-all;
}
</style>
