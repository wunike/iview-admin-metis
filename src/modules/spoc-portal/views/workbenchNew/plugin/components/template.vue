<style lang="less">
@import "../libs/public.less";
// 所有模块公用样式
.plugin-public-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: default;background-size: cover;
    .top {
        position: relative;
        width: 100%;
        height: 50px;
        .title {
            position: absolute;
            height: 40px;
            font-size: 14px;
            line-height: 40px;
            font-weight: bold;
            left: 20px;
            top: 0;
            right: 100px;
            // display: flex;
            // align-items: flex-end;
            // overflow: hidden;
        }
        .pageBox{
            width: auto;
            height: 100%;
            line-height: 50px;
            position: absolute;
            right: 60px;
            top: 0;
            color:#aaa;;
            .pageIndex{
                float: left;
                font-size: 14px;
            }
            .pageBtn{
                float: left;
                width: 30px;
                height: 100%;
                line-height: 50px;
                margin-left: 20px;
                cursor: pointer;
                &:hover{
                    color: @themeColor!important;
                }
            }

        }
        .more {
            position: absolute;
            right: 20px;
            top: 0;
            height: 50px;
            width: 25px;
            text-align: right;
            font-size: 30px;
            cursor: pointer;
            color: #c5cad4;
            &:hover {
                color: @themeColor;
            }
            i{
                color:#aaa;
            }
            &.more-setting{
                line-height: 48px;font-size: 16px;
                span{
                    position: absolute;right: 22px;top: 2px;
                    width: 60px;
                    text-align: right;
                }
            }
        }
    }
    .main {
        position: absolute;
        left: 0;
        bottom: 0;
        top: 40px;
        width: 100%;
        overflow: hidden;
        line-height: 38px;
        .noDataText {
            position: absolute;
            top: 45%;
            width: 100%;
            left: 0;
            margin-top: -60px;
            background: url("../../../../assets/img/workbenchNew/favoriteNoData.png") no-repeat top center;background-size: 140px 118px;
            height: 118px;
        }
    }
    .templateBlock {
        position: absolute;
        left: 20px;
        bottom: 0;
        top: 55px;
        right: 20px;
        overflow: hidden;
        line-height: 38px;
        .item {
            height: 20px;
            overflow: hidden;
            margin-bottom: 20px;
            position: relative;
            &:nth-of-type(1) {
                .itemLeft {
                    right: 250px;
                }
            }
            &:nth-of-type(2) {
                .itemLeft {
                    right: 300px;
                }
            }
            &:nth-of-type(3) {
                .itemLeft {
                    right: 370px;
                }
            }
            &:nth-of-type(4) {
                .itemLeft {
                    right: 280px;
                }
            }
            &:nth-of-type(5) {
                .itemLeft {
                    right: 320px;
                }
            }
            &:nth-of-type(6) {
                .itemLeft {
                    right: 280px;
                }
            }
            .itemLeft {
                background: @messageBarBgColor;
                height: 100%;
                position: absolute;
                left: 0;
            }
            .itemCenter {
                width: 80px;
                background: @messageBarBgColor;
                height: 100%;
                position: absolute;
                right: 110px;
            }
            .itemRight {
                width: 100px;
                background: @messageBarBgColor;
                height: 100%;
                position: absolute;
                right: 0;
            }
        }
    }
}
</style>

<template>
<div class="plugin-public-wrapper" @mouseenter="onMouseEnter($event)" @mouseleave="onMouseLeave($event)">
    <div class="top clearfix" :style="{color: titleColor}">
        <div class="title">
            {{data.name}}
            <slot name="name"></slot>
        </div>
        <div class="pageBox" v-show="pageShow">
            <Icon class="pageBtn" type="chevron-left" size="16" @click.native="pageMinus"></Icon>
            <span class="pageIndex">{{pageIndex+1}}</span>
            <Icon class="pageBtn" type="chevron-right" size="16" @click.native="pageAdd"></Icon>
        </div>
        <slot name="btttons"></slot>
        <div class="more" v-if="needMore" :class="{'more-setting': iconName == 'md-settings'}" @click="clickMore">
            <span v-if="iconName == 'md-settings'" :style="{color: titleColor}">{{$t('views_approvalnotice_approvalset_index_311')}}</span>
            <Icon :type="iconName" :style="{color: titleColor}"/>
        </div>
    </div>
    <div class="main" v-show="mode==MODE_PREVIEW || mode==MODE_EDIT">
        <div class="noDataText" v-if="!dataLength && infoLoaded"></div>
        <slot></slot>
    </div>
    <div class="templateBlock" v-show="mode==MODE_TEMPLATE">
        <div class="item">
            <div class="itemLeft"></div>
            <div class="itemCenter"></div>
            <div class="itemRight"></div>
        </div>
        <div class="item">
            <div class="itemLeft"></div>
            <div class="itemCenter"></div>
            <div class="itemRight"></div>
        </div>
        <div class="item">
            <div class="itemLeft"></div>
            <div class="itemCenter"></div>
            <div class="itemRight"></div>
        </div>
        <div class="item">
            <div class="itemLeft"></div>
            <div class="itemCenter"></div>
            <div class="itemRight"></div>
        </div>
        <div class="item">
            <div class="itemLeft"></div>
            <div class="itemCenter"></div>
            <div class="itemRight"></div>
        </div>
        <div  class="item">
            <div class="itemLeft"></div>
            <div class="itemCenter"></div>
            <div class="itemRight"></div>
        </div>
    </div>
    <loading :loadingStatus="showloading"></loading>
    <editMode v-model="showSetting" @onNameChangEvent="onNameChangEvent" :name="data.name" :data="data">
        <editModeButtons :mode="mode" :data="data" @click="$emit('onButtonClick','lock')" type="lock"></editModeButtons>
        <editModeButtons :mode="mode" :data="data" type="delete" @click="$emit('onButtonClick','delete')"></editModeButtons>
    </editMode>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 插件 - 模板
 */
import MODE from "./mode.js";
import editMode from "../libs/editMode.vue";
import editModeButtons from "../libs/editModeButtons.vue";
import loading from "./loading.vue";
export default {
    components: {
        editMode,
        editModeButtons,
        loading
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
        iconName: {
            type: String,
            default: 'ios-more'
        },
        dataLength: { // 是否有数据标识
            type: Boolean,
            default: false, // false: 数据为空，显示空的图片
        },
        needMore: {
            type: Boolean,
            default: false,
        },
        titleColor: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            showSetting: false,
            infoLoaded: false, //是否已加载了数据
            pageShow:false,//是否显示分页
            pageIndex:0,//当前活动的页数
            routerIds:null,//跳转路由需要的id对象
            showloading:false,
            totalPage:0,//总页码
        }
    },
    computed: {
        ...MODE
    },
    created() {
        this.$emit("init", this);
    },
    mounted() {
        this.updateView(this.mode);
    },
    methods: {
        pageMinus(){
            if(this.pageIndex == 0)return;
            this.pageIndex--;
        },
        pageAdd(){
            if(this.pageIndex == this.totalPage-1)return;
            this.pageIndex++;
        },
        //加载数据
        loadData() {
            // this.showloading = true;
            this.$emit('loadData')
            this.infoLoaded = true;
        },
        //点击更多
        clickMore(){
            this.$emit('clickMore')
        },
        //交互方法
        updateView(mode) {
            switch (mode) {
                case this.MODE_EDIT:
                    break;
                case this.MODE_PREVIEW:
                    if (!this.infoLoaded) this.loadData();
                    break;
                case this.MODE_TEMPLATE:
                    break;
                default:
            }
        },
        onNameChangEvent(name) {
            this.data.name = name;
        },
        onMouseEnter(event) {
            this.showSetting = this.mode == this.MODE_EDIT || this.mode == this.MODE_TEMPLATE;
        },
        onMouseLeave(event) {
            this.showSetting = false;
        }
    },
    watch: {
        mode(newValue, oldValue) {
            this.updateView(newValue);
        }
    },
}
</script>
