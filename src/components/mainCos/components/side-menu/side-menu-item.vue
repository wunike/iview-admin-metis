<style lang="less">
.drawer_box {
    .drawer_title {
        height: 50px;
        overflow: hidden;
        white-space: nowrap;
        color: rgba(255, 255, 255, 0.7);
        padding: 14px 24px;
        position: relative;
        cursor: pointer;
        z-index: 1;
        -webkit-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        outline: none;
        list-style: none;
        font-size: 14px;
        span {
            word-break: keep-all;
            white-space: normal;
        }
        .svg {
            width: 16px;
            height: 16px;
            margin-right: 12px;
            opacity: 0.7;
        }
        i {
            margin-right: 12px;
            display: inline-block;
            speak: none;
            font-style: normal;
            font-weight: 400;
            font-letiant: normal;
            text-transform: none;
            text-rendering: auto;
            line-height: 1;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            vertical-align: middle;
        }
        .gt {
            flex: 1;
            margin-right: 0;
            text-align: right;
        }
        &:hover {
            color: #fff;
            /*background: #001529rgba(47, 66, 72, 1);*/
            .svg {
                opacity: 1;
                path {
                    fill: #ffffff;
                }
            }
        }
    }
}
</style>
<template>
    <!--<Submenu :name="`${parentName}`">
    <template slot="title">
      <common-icon :type="parentItem.icon || ''"/>
      <span>{{ showTitle(parentItem) }}</span>
    </template>
    <template v-for="item in children">
      <template v-if="item.children && item.children.length === 1">555|
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
        <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`"><common-icon :type="item.children[0].icon || ''"/><span>{{ showTitle(item.children[0]) }}</span></menu-item>
      </template>
      <template v-else>666|
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
        <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`"><common-icon :type="item.icon || ''"/><span>{{ showTitle(item) }}</span></menu-item>
      </template>
    </template>
  </Submenu>-->
    <div class="drawer_box">
        <div class="drawer_title" @click="handler(parentItem.meta.title)">
            <!--<common-icon :type="parentItem.icon || ''" :size="18"/>-->
            <img :src="parentItem.icon" width="16" height="16" class="svg" />
            <span>{{ $i18n.locale == 'zh-CN' ? parentItem.meta.title || '' : parentItem.meta.enTitle || '' }}</span>
            <!--<Icon type="ios-arrow-forward" class="gt"/>-->
        </div>
    </div>
</template>
<script>
import mixin from './mixin';
import itemMixin from './item-mixin';
export default {
    name: 'SideMenuItem',
    mixins: [mixin, itemMixin],
    mounted() {
        this.$el.querySelectorAll('img.svg').forEach(function(img) {
            let imgID = img.id;
            let imgClass = img.className;
            let imgURL = img.src;
            fetch(imgURL, {
            })
                .then(function(response) {
                    return response.text();
                    console.log(response, 111);
                })
                .then(function(text) {
                    let parser = new DOMParser();
                    let xmlDoc = parser.parseFromString(text, 'text/xml');

                    // Get the SVG tag, ignore the rest
                    let svg = xmlDoc.getElementsByTagName('svg')[0];
                    // console.log(svg,xmlDoc,text)
                    // Add replaced image's ID to the new SVG
                    if (typeof imgID !== 'undefined' && imgID !== '') {
                        svg.setAttribute('id', imgID);
                    }
                    // Add replaced image's classes to the new SVG
                    if (typeof imgClass !== 'undefined' && imgClass !== '') {
                        svg.setAttribute('class', imgClass + ' replaced-svg');
                    }

                    // Remove any invalid XML tags as per http://validator.w3.org
                    svg.removeAttribute('xmlns:a');

                    // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                    if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
                        svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'));
                    }

                    // Replace image with new SVG
                    if (img.parentNode) {
                        img.parentNode.replaceChild(svg, img);
                    }
                });
        });
    },
    methods: {
        handler(val) {
            this.$emit('openDrawer', this.children, val);
        }
    }
};
</script>
