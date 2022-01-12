<style lang="less">
@import "./libs/public.less";
.marketing-performance-plugin-wrapper {
    // background-image: url("../../../assets/img/workbenchNew/bg_todo.png");
    background-color: #fff;
}
</style>

<template lang="html">
<plugin-template class="marketing-performance-plugin-wrapper" 
    :style="{backgroundImage:`url(${require('../../../assets/img/workbenchNew/bg_todo.png')})`}"
    :mode="mode" :data="data" :dataLength="dataLength"
    @clickMore="clickMore" @loadData="loadData"
    @onButtonClick="onButtonClick"
    @init="init">
    <!-- start -->
    <marketCharts :menuRoute="data.menuRoute"></marketCharts>
    <!-- end -->
</plugin-template>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 插件 - 市场榜单
 */
import MODE from "./mode.js";
import valid, { errors, sysAttachment } from '../../../libs/request.js';
import pluginTemplate from './components/template.vue'
import marketCharts from '../../../../spoc-crm-web/src/views/marketCharts/marketCharts.vue'
export default {
    components: {
        pluginTemplate, marketCharts
    },
    props: {
        mode: { //当前模式
            type: String,
            default: '',
            required: true
        },
        data: { //节点数据
            type: Object,
            required: true
        },
    },
    data() {
        return {
            dataLength: !false,
        }
    },
    computed: {
        ...MODE
    },
    methods: {
        //加载数据
        loadData() {
            this.showloading = true;
        },
        //点击更多
        clickMore(){
            console.log('clickMore')
        },
        init() {
            this.$emit("init", this);
        },
        onButtonClick(str) {
            this.$emit('onButtonClick', str);
        }
    },
}
</script>
