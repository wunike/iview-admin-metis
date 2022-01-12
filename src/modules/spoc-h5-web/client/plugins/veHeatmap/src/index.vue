<!--test.vue-->
<template>
    <div class="qk-ve-heatmap"><ve-heatmap :data="chartData" width="100%" height="100%" :settings="chartSettings" ref="veChart"></ve-heatmap></div>
</template>

<script>
export default {
    name: 'QkVeHeatmap', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
    props: {
        chartData: {
            type: Object,
            default: () => {
                return {
                    columns: ['lat', 'lng', '人数'],
                    rows: [
                        { lat: 115.892151, lng: 28.676493, 人数: 1000 },
                        { lat: 117.000923, lng: 36.675807, 人数: 400 },
                        { lat: 113.665412, lng: 34.757975, 人数: 800 },
                        { lat: 114.298572, lng: 30.584355, 人数: 200 },
                        { lat: 112.982279, lng: 28.19409, 人数: 100 },
                        { lat: 113.280637, lng: 23.125178, 人数: 300 },
                        { lat: 110.33119, lng: 20.031971, 人数: 800 },
                        { lat: 104.065735, lng: 30.659462, 人数: 700 },
                        { lat: 108.948024, lng: 34.263161, 人数: 300 },
                        { lat: 103.823557, lng: 36.058039, 人数: 500 }
                    ]
                };
            }
        },
        chartSettings: {
            type: Object,
            default: () => {
                return {
                    position: 'china',
                    type: 'map',
                    geo: {
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#323c48',
                                borderColor: '#111'
                            },
                            emphasis: {
                                areaColor: '#2a333d'
                            }
                        }
                    }
                };
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
.qk-ve-heatmap {
    width: 100%;
    height: 100%;
    // word-break: keep-all;
}
</style>
