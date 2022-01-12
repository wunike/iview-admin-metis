<style lang="less">
.collapsed_box {
    .drop-menu-a {
        display: inline-block;
    }
    .svg {
        width: 16px;
        height: 16px;
        opacity: 0.7;
    }
    &:hover {
        color: #fff;
        /*background: #001529rgba(47, 66, 72, 1);*/
        .svg {
            opacity: 1;
        }
    }
}
</style>
<template>
    <!--<Dropdown ref="dropdown" @on-click="handleClick" :class="hideTitle ? '' : 'collased-menu-dropdown'" :transfer="hideTitle" :placement="placement">
    <a class="drop-menu-a" type="text" @mouseover="handleMousemove($event, children)" :style="{textAlign: !hideTitle ? 'left' : ''}"><common-icon :size="rootIconSize" :color="textColor" :type="parentItem.icon"/><span class="menu-title" v-if="!hideTitle">{{ showTitle(parentItem) }}</span><Icon style="float: right;" v-if="!hideTitle" type="ios-arrow-forward" :size="16"/></a>
    <DropdownMenu ref="dropdown" slot="list">
      <template v-for="child in children">
        <collapsed-menu v-if="showChildren(child)" :icon-size="iconSize" :parent-item="child" :key="`drop-${child.name}`"></collapsed-menu>
        <DropdownItem v-else :key="`drop-${child.name}`" :name="child.name"><common-icon :size="iconSize" :type="child.icon"/><span class="menu-title">{{ showTitle(child) }}</span></DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>-->
    <div class="collapsed_box">
        <div class="collapsed_title" @click="handler(parentItem.meta.title)">
            <Tooltip transfer :content="parentItem.meta.title" placement="right">
                <a
                    class="drop-menu-a"
                    type="text"
                    :style="{ textAlign: !hideTitle ? 'left' : '' }"
                    style="display: flex;
					justify-content: flex-start;align-items: center;min-height: 50px;padding: 14px 24px;"
                >
                    <!--<common-icon :size="rootIconSize" :type="parentItem.icon" /><span class="menu-title" v-if="!hideTitle">{{ parentItem.meta.title }}</span>-->
                    <img :src="parentItem.icon" width="16" height="16" class="svg" />
                    <Icon style="float: right;" v-if="!hideTitle" type="ios-arrow-forward" :size="16" />
                </a>
            </Tooltip>
        </div>
    </div>
</template>
<script>
import mixin from './mixin';
import itemMixin from './item-mixin';
import { findNodeUpperByClasses } from '@/libs/util';

export default {
    name: 'CollapsedMenu',
    mixins: [mixin, itemMixin],
    props: {
        hideTitle: {
            type: Boolean,
            default: false
        },
        rootIconSize: {
            type: Number,
            default: 18
        }
    },
    data() {
        return {
            placement: 'right-end'
        };
    },
    methods: {
        handler(val) {
            this.$emit('openDrawer', this.children, val);
        }
    },
    mounted() {
        this.$el.querySelectorAll('img.svg').forEach(function(img) {
            let imgID = img.id;
            let imgClass = img.className;
            let imgURL = img.src;
            fetch(imgURL, {
            })
                .then(function(response) {
                    return response.text();
                })
                .then(function(text) {
                    let parser = new DOMParser();
                    let xmlDoc = parser.parseFromString(text, 'text/xml');

                    // Get the SVG tag, ignore the rest
                    let svg = xmlDoc.getElementsByTagName('svg')[0];

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
    }
};
</script>
