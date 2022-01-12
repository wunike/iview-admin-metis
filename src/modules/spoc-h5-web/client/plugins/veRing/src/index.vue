<!--test.vue-->
<template>
    <div class="qk-ve-ring"><ve-ring :data="chartData" width="100%" height="100%" :settings="chartSettings" ref="veChart"></ve-ring></div>
</template>

<script>
export default {
    name: 'QkVeRing', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
    props: {
        chartData: {
            type: Object,
            default: () => {
                return {
                    columns: ['日期', '访问用户'],
                    rows: [
                        { 日期: '1/1', 访问用户: 1393 },
                        { 日期: '1/2', 访问用户: 3530 },
                        { 日期: '1/3', 访问用户: 2923 },
                        { 日期: '1/4', 访问用户: 1723 },
                        { 日期: '1/5', 访问用户: 3792 },
                        { 日期: '1/6', 访问用户: 4593 }
                    ]
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
.qk-ve-ring {
    width: 100%;
    height: 100%;
    // word-break: keep-all;
}
</style>
