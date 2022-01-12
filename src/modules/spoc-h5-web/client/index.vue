<template>
    <div id="h5_app">
        <!-- <div class="page-header-wrapper" v-show="!$route.meta.hideHeader">
      <page-header></page-header>
    </div>
      :class="{hideHeader: $route.meta.hideHeader}"-->
        <keep-alive :include="cacheList"><router-view class="sub-page" /></keep-alive>
    </div>
</template>
<script>
import PageHeader from '@client/components/page-header';

import 'handsontable/dist/handsontable.full.css';
import 'handsontable/languages/zh-CN';
import { mapState } from 'vuex';
export default {
    name: 'h5.index',
    components: {
        [PageHeader.name]: PageHeader
    },
    computed: {
        ...mapState(['userInfo', 'appMenuList']),
        tagNavList() {
            return this.$store.state.app.tagNavList;
        },
        cacheList() {
            const list = [...(this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : [])];
            return list;
        }
    }
};
</script>
<style lang="less">
html,
body {
    position: relative;
    height: 100%;
}
#h5_app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    position: relative;
    height: 100%;
    // padding-top: 48px;
    .page-header-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100;
    }
    &.hideHeader {
        padding-top: 0;
    }
}
.sub-page {
    position: relative;
    height: 100%;
}
</style>
