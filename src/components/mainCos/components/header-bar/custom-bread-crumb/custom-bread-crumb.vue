<!--
 * @Author: your name
 * @Date: 2020-05-14 16:43:43
 * @LastEditTime: 2020-05-18 15:14:07
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /spoc-portal-cos/src/components/mainCos/components/header-bar/custom-bread-crumb/custom-bread-crumb.vue
--> 
<template>
    <div class="custom-bread-crumb">
        <Breadcrumb :style="{fontSize: `${fontSize}px`}" v-if="$i18n&&list.length">
            <BreadcrumbItem
                v-for="(item,index) in list"
                :to="item.to"
                :key="`bread-crumb-${item.name}`"
            >
                <common-icon
                    style="margin-right: 4px;"
                    :type="item.meta.icon || ''"
                    v-if="index==0"
                />
                <!-- {{ showTitle(item) }} -->
                <!-- {{$t(item.name)}} -->
                {{
                $i18n && $i18n.locale == "zh-CN"
                ? item.meta.title || $t(item.name)
                : item.meta.enTitle || $t(item.name)
                }}
            </BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>
<script>
import { showTitle } from "@/libs/util";
import CommonIcon from "_c/common-icon";
import "./custom-bread-crumb.less";
export default {
    name: "customBreadCrumb",
    components: {
        CommonIcon
    },
    props: {
        list: {
            type: Array,
            default: () => []
        },
        fontSize: {
            type: Number,
            default: 14
        },
        showIcon: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },
    created() {},
    methods: {
        showTitle(item) {
            return showTitle(item, this);
        },
        isCustomIcon(iconName) {
            return iconName.indexOf("_") === 0;
        },
        getCustomIconName(iconName) {
            return iconName.slice(1);
        }
    }
};
</script>
