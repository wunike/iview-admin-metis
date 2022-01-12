<style lang="less">
.v-search-collapse-container {
    position: relative;
    padding: 20px 32px;
    padding-bottom: 8px;
    background: #fff;
    .clear() {
        display: block;
        zoom: 1;
        &::before,
        &::after {
            content: "";
            display: block;
            clear: both;
            height: 0;
            line-height: 0;
            font-size: 0;
        }
    }
    .init() {
        @h: 32px;
        height: @h;
        margin-right: 12px;
        margin-bottom: 12px;
    }
    .ivu-input-wrapper,
    .ivu-select,
    .ivu-date-picker,
    .ivu-input-number,
    .v-input-select-wrapper {
        @h: 32px;
        height: @h;
        margin-bottom: 12px;
    }
    .ivu-input-wrapper,
    .ivu-select-single,
    .ivu-date-picker,
    .ivu-input-number,
    .v-input-select-wrapper {
        width: 140px;
    }
    .ivu-select-multiple {
        @h: 32px;
        min-width: 140px;
        width: auto;
        max-width: 140px * 2;
        .ivu-select-selection {
            &::before {
                left: 0;
            }
            &::after {
                right: 0;
            }
            &::before,
            &::after {
                content: "";
                position: absolute;
                top: 1px;
                height: 28px;
                width: 4px;
                background: #fff;
                z-index: 1;
            }
            height: @h;
            overflow: hidden;
            // text-overflow: ellipsis;
            white-space: nowrap;
            & > div {
                position: absolute;
                right: 24px;
                min-width: ~"calc(100% - 28px)";
            }
            .ivu-tag-checked {
                & ~ input {
                    display: none;
                }
            }
            .ivu-select-arrow {
                position: absolute;
                top: 14px;
                right: -24px;
                // margin-left: -12px;
            }
        }
        .ivu-select-arrow {
            padding: 7px;
            right: -4px;
            top: 15px;
            margin-top: 0;
            z-index: 3;
            background: #fff;
            transition: transform 0.2s ease-in-out;
            border-radius: 50%;
        }
    }
    .ivu-date-picker {
        .ivu-input-wrapper {
            width: 100%;
        }
    }
    div.v-btn-box {
        // float: left;
        display: inline-block;
        position: relative;margin-right: 0;margin-bottom: 0;
        top: -7px;
        .ivu-btn {
            margin-right: 12px;
            padding: 5px 17px 6px;
        }
    }
    .lineTop,
    .lineOther {
        .clear();
        & > input,
        & > select {
            width: 140px;
            border-radius: 3px;
            border: 1px solid #dcdee2;
        }
        & > *{
            .init();
            display: inline-block;
        }
    }
    .lineOther {
        height: 0;
        overflow: hidden;
        &.v-show-line-other {
            height: auto;
            overflow: inherit;
        }
    }
    .v-show-more-selects {
        // width:200px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 20px;
        right: 32px;
        @h: 32px;
        height: @h;
        line-height: @h;
        font-size: 14px;
        color: #999;
        cursor: pointer;
        &:hover {
            color: #333;
            .TagStyle{
                color:#999;
            }
        }
        // ydx加入内容
        .TagStyle {
            display: flex;
            margin-right: 2px;
            justify-content: center;
            align-items: center;
            // display: inline-block;
            padding: 0 8px;
            height: 32px;
            border-radius: 4px;
            border: 1px solid rgba(217, 217, 217, 1);
            .kailong {
                display: inline-block;
                width: 0;
                height: 0;
                margin-left: 5px;
                border-right: 7px solid transparent;
                border-left: 7px solid transparent;
                border-top: 8px solid #d8d8d8;
            }
        }
        .fa-tags{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
        }
    }
    .special-box {
        // float: left;
        display: inline-block;
        margin-right: 12px;
        .ivu-input-wrapper,
        .ivu-select,
        .ivu-date-picker {
            margin-right: 0;
        }
    }
}
</style>

<template>
    <div class="v-search-collapse-container" id="vSearchCollapseContainer">
        <div class="v-show-more-selects" v-if="needOtherLine" @click="clickShowMore">
            <span @click.stop="downFlow" v-if="hasTag">
                <userLabel
                    ref="userLabelRef"
                    :menuId="2001"
                    :flag="0"
                    @userLabelTrueChoose="userLabelTrueChoose"
                    @userLabelTrueChooseClear="userLabelTrueChooseClear">
                    <span slot="hasTagName" class="fa-tags">
                        <span class="TagStyle">
                            <!-- :style="{color:trueData.length<1?'#D9D9D9':'#44bcb7'}" -->
                            标签
                            <Icon type="md-pricetag" size="14" style="transform:rotate(-90deg)"/>
                            <span v-if="trueData.length" style="margin-right:8px;color:#44BCB7">{{trueData.length}}</span>
                            <span class="kailong"></span>
                        </span>
                    </span>
                </userLabel>
            </span>
            <span v-text="moreText"></span>
            <Icon type="ios-arrow-up" style="position: relative; top: -2px;" v-if="flag" />
            <Icon type="ios-arrow-down" v-else />
        </div>
        <div class="v-show-more-selects" v-else>
            <span @click.stop="downFlow" v-if="hasTag">
                <userLabel
                    ref="userLabelRef"
                    @userLabelTrueChoose="userLabelTrueChoose"
                    @userLabelTrueChooseClear="userLabelTrueChooseClear"
                    :menuId="2001"
                    :flag="0">
                    <span slot="hasTagName"  class="fa-tags">
                        <span class="TagStyle">
                            <!-- :style="{color:trueData.length<1?'#D9D9D9':'#44bcb7'}" -->
                            标签
                            <Icon type="md-pricetag" size="16" style="transform:rotate(-90deg)"/>
                            <span v-if="trueData.length" style="margin-right:8px;color:#44BCB7">{{trueData.length}}</span>
                            <span class="kailong"></span>
                        </span>
                    </span>
                </userLabel>
            </span>
        </div>
        <searchCollapseContainer
            ref="searchCollapse"
            :searchText="mySearchText"
            :resetText="myResetText"
            :flag="flag"
            :needOtherLine="needOtherLine"
            :topNum="topNum"
            @onSearch="search"
            @onReset="reset">
            <slot></slot>
        </searchCollapseContainer>
    </div>
</template>

<script>
/**
 * 列表上面搜索条件的组件
 * 根据浏览器宽度响应显示
 * 页面的 Input, Select, DatePicker 不设置宽度，平铺在组件的 slot 区域
 * @author 曹见芳
 */

import Vue from "vue";
import userLabel from "./userLabel.vue";

Vue.component("searchCollapseContainer", {
    props: ["searchText", "resetText", "flag", "needOtherLine", "topNum"],
    render: function(h) {
        // console.log(this.topNum)
        if (this.$slots.default && this.$slots.default.length) {
            let topDom = [];
            let otherDom = [];
            if (this.needOtherLine) {
                // 数量超过一行的最高，则有第二行
                for (let i = 0; i < this.$slots.default.length; i++) {
                    if (i < this.topNum) topDom.push(this.$slots.default[i]);
                    else otherDom.push(this.$slots.default[i]);
                }
            } else {
                topDom = this.$slots.default;
            }
            let top = h(
                "div",
                {
                    attrs: {
                        id: "lineTop"
                    },
                    class: {
                        "lineTop": true,
                    }
                },
                [
                    topDom,
                    h(
                        "div",
                        {
                            class: {
                                "v-btn-box": true
                            }
                        },
                        [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary"
                                    },
                                    on: {
                                        click: () => {
                                            this.$emit("onSearch");
                                        }
                                    }
                                },
                                this.searchText
                            ),
                            h(
                                "Button",
                                {
                                    on: {
                                        click: () => {
                                            this.$emit("onReset");
                                        }
                                    }
                                },
                                this.resetText
                            )
                        ]
                    )
                ]
            );
            let bottom = h(
                "div",
                {
                    attrs: {
                        id: "lineOther"
                    },
                    class: {
                        "lineOther": true,
                        "v-show-line-other": this.flag
                    }
                },
                otherDom
            );
            return h("div", [top, bottom]);
        }
    }
});

export default {
    props: {
        searchText: {
            type: String
        },
        resetText: {
            type: String
        },
        hasTag: {
            type: Boolean
        }
    },
    components: {
        userLabel
    },
    data() {
        return {
            moreText: this.$t("views_room_selectcomp_629"),
            needOtherLine: false,
            flag: false, // 显示展开的时候为 false； 显示收起的时候为 true。
            topNum: 0,
            screenWidth: document.body.clientWidth,
            trueData: [],
            leftWidth: 180,
        };
    },
    computed: {
        mySearchText() {
            let searchText = this.$t("modules_rolepeople_210");
            if (this.searchText) {
                searchText = this.searchText;
            }
            return searchText;
        },
        myResetText() {
            let resetText = this.$t("classroom_clock_87");
            if (this.resetText) {
                resetText = this.resetText;
            }
            return resetText;
        }
    },
    activated(){
        // console.log('mounted',1111111)
        this.leftWidth = this.$store.state.app.collapsed ? 64 : 180;
        let _this = this;
        this.$nextTick(() => {
            this.initDom();
        });
        window.addEventListener("resize", _this.resetDom, false);
    },
    mounted() {
        // console.log('mounted',1111111)
        this.leftWidth = this.$store.state.app.collapsed ? 64 : 180;
        let _this = this;
        this.$nextTick(() => {
            this.initDom();
        });
        window.addEventListener("resize", _this.resetDom, false);
    },
    destroyed() {
        let _this = this;
        window.removeEventListener("resize", _this.resetDom, false);
    },
    methods: {
        downFlow() {
            this.$emit("hasTagEmitFn");
        },
        resetTrueFn(){
            this.trueData=[];
            this.$refs.userLabelRef.clearBtn();
        },
        userLabelTrueChoose(data) {
            this.trueData = data.hasCheckedTagids;
            // console.log("点击确定触发的事件:userLabelTrueChoose");
            this.$emit("userLabelTrueChoose", data.hasCheckedTagidsByGroup);
        },
        userLabelTrueChooseClear(){
           this.trueData = [];
            this.$emit("userLabelTrueChooseClear", []);
        },
        resetDom() {
            // console.log('resetDom' + this.screenWidth)
            this.needOtherLine = false;
            this.initDom();
        },
        initDom() {
            // 查看当前 box 的宽度
            this.flag = false;
            this.moreText = this.$t("views_room_selectcomp_629"); // '展开';
            if (document.getElementById("vSearchCollapseContainer")) {
                let _width = document.getElementById("vSearchCollapseContainer").offsetWidth -
                    144 - // 查询、重置
                    42 - // more
                    32 * 2; // padding
                // let _width = document.body.offsetWidth -
                //     this.leftWidth -
                //     32 * 2 - 
                //     144 - // 查询、重置
                //     42 - // more
                //     32 * 2; // padding
                this.hasTag ? (_width -= 74) : "";
                // 144为 两个按钮的宽度
                // 42为 展开收起的宽度
                // 32为 box 的 padding
                // 计算第一行放几个
                if (this.$slots.default && this.$slots.default.length) {
                    let w = 0;
                    for (let i = 0; i < this.$slots.default.length; i++) {
                        let _innerWidth = 140;
                        // console.log(this.$slots.default[i].elm)
                        if(this.$slots.default[i].elm) {
                            if(!this.$slots.default[i].tag) {
                                _innerWidth = -12;
                            } else {
                                if(this.$slots.default[i].elm.style.width) _innerWidth = parseInt(this.$slots.default[i].elm.style.width);
                                // else if(this.$slots.default[i].elm.offsetWidth) _innerWidth = this.$slots.default[i].elm.offsetWidth;
                            }
                        }
                        w += _innerWidth + 12;
                        // console.log(_width, w)
                        if (w > _width) {
                            this.needOtherLine = true;
                            this.topNum = i;
                            // console.log(this.topNum)
                            break;
                        } else {
                            this.needOtherLine = false;
                        }
                    }
                }
            }
        },
        search() {
            this.$emit("search");
        },
        reset() {
            this.$emit("reset");
        },
        clickShowMore() {
            if (this.flag) {
                this.flag = false;
                this.moreText = this.$t("views_room_selectcomp_629"); // '展开';
            } else {
                this.flag = true;
                this.moreText = this.$t("vSearchCollapse_retract"); // '收起';
            }
            this.$nextTick(() => {
                this.$emit(
                    "changeDivHeight",
                    document.getElementById("vSearchCollapseContainer")
                        .offsetHeight
                );
            });
        }
    },
    watch: {
        '$store.state.app.collapsed'(val) {
            // console.log('$store.state.app.collapsed', val)
            this.leftWidth = val ? 64 : 180;
            setTimeout(() => {
                this.resetDom();
            }, 500);
        }
    }
};
</script>
