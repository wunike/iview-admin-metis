<!--test.vue-->
<template>
    <div class="qk-ve-radar"><ve-radar :data="chartData" width="100%" height="100%" :settings="chartSettings" ref="veChart"></ve-radar></div>
</template>

<script>
export default {
    name: 'QkVeRadar', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
    props: {
        chartData: {
            type: Object,
            default: () => {
                return {
                    columns: ['日期', '访问用户', '下单用户', '下单率'],
                    rows: [
                        { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
                        { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
                        { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
                        { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
                        { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
                        { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
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
.qk-ve-radar {
    width: 100%;
    height: 100%;
    // word-break: keep-all;
}
</style>
