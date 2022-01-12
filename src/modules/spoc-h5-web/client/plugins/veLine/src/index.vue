<!--test.vue-->
<template>
    <div class="qk-ve-line"><ve-line :data="chartData" width="100%" height="100%" :settings="chartSettings" ref="veChart"></ve-line></div>
</template>

<script>
export default {
    name: 'QkVeLine', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
    props: {
        chartData: {
            type: Object,
            default: () => {
                return {
                    columns: ['日期', '访问用户', '年龄', '下单用户'],
                    rows: [
                        { 日期: '1/1', 访问用户: 123, 年龄: 3, 下单用户: 1244 },
                        { 日期: '1/2', 访问用户: 1273, 年龄: 6, 下单用户: 2344 },
                        { 日期: '1/3', 访问用户: 3123, 年龄: 15, 下单用户: 4564 },
                        { 日期: '1/4', 访问用户: 2123, 年龄: 9, 下单用户: 3245 },
                        { 日期: '1/5', 访问用户: 4103, 年龄: 12, 下单用户: 4355 },
                        { 日期: '1/6', 访问用户: 7123, 年龄: 10, 下单用户: 3567 }
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
.qk-ve-line {
    width: 100%;
    height: 100%;
    // word-break: keep-all;
}
</style>
