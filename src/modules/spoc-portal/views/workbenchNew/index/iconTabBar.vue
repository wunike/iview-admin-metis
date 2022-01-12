<style lang="less">
@import "../plugin/libs/theme.less";
@iconBarHerght: 100px;
.iconFrame {
    height: @iconBarHerght;
    z-index: 10;
    user-select: none;
    background: #fff;
    .animated {
        animation-duration: 1s;
        animation-fill-mode: both;
    }
    .swing {
        transform-origin: top center;
        animation-name: swing;
    }
    @keyframes swing {
    20% {
        transform: rotate3d(0, 0, 1, 15deg);
    }

    40% {
        transform: rotate3d(0, 0, 1, -10deg);
    }

    60% {
        transform: rotate3d(0, 0, 1, 5deg);
    }

    80% {
        transform: rotate3d(0, 0, 1, -5deg);
    }

    to {
        transform: rotate3d(0, 0, 1, 0deg);
    }
    }
    .iconFrameMask {
        height: 100px;
        background-color: #fff;
    }
    .iconItemBody {
        position: fixed;
        display: block;
        height: 100px;
        top: 104px;
        left: 180px;right: 0;
        height: @iconBarHerght;
        overflow: hidden;
        background: #fff;
        box-shadow:0px 2px 15px 0px rgba(0,0,0,0.2);
        .iconItemList {
            vertical-align: middle;
            overflow: hidden;
            height: 100px;
            position: absolute;left: 0;right: 200px;
            .iconItemContent {
                position: absolute;
                top: 0;
                bottom: 0;
                height: 100px;
                left: 40px;
                right: 40px;
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                .iconItemContentEmpty{
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    height: 100px;
                    width: 100%;
                    line-height: 100px;
                    font-size: 25px;
                    color: #ccc;
                    &>*{
                        vertical-align: middle;
                    }
                    &>span{
                        font-size: 20px;
                        padding-left: 10px;
                        white-space: normal;
                    }
                }
            }
            .iconItemBtn {
                position: absolute;
                width: 40px;
                top: 0;
                text-align: center;
                font-size: 40px;
                bottom: 0;
                line-height: 88px;
                color: #ccc;
                cursor: pointer;
                &:hover {
                    color: @baseThemeColor;
                }
                &.disable {
                    cursor: default;
                    &:hover {
                        color: #ccc;
                    }
                }
                &.iconItemLeftBtn {
                    left: 0;
                }
                &.iconItemRightBtn {
                    right: 0;
                }
            }

        }
        .iconItemSetting {
            position: absolute;right: 0;width: 200px;height: 100%;padding-top: 34px;
            vertical-align: middle;
            text-align: center;
            background-color: #F0F2F5;
            & > * {
                display: inline-block;
                text-align: center;
                vertical-align: middle;
            }
        }
    }
    .iconNodeFrame {
        position: relative;
        display: inline-block;
        height: @iconBarHerght;
        vertical-align: top;
        width: 90px;
        .maskFrame{
            position: absolute;
            left: 0;
            top: 0;
            width:100%;
            height: 100%;
            z-index: 2;
            font-size: 14px;
        }
        &:hover {
            background-color: #EAEDF1;
        }
        &.dragItem{
            cursor: move;
            position: fixed;
            background-color: #fff;
            box-shadow: 0 0 10px @baseThemeColor;
            z-index: 100;
        }
        .iconBody {
            position: relative;
            margin: 0 auto;
            width: 50px;
            height: 50px;
            line-height: 50px;
            font-size: 35px;
            margin-top: 10px;
            text-align: center;
            color: @baseThemeColor;
            &.imgModel {
                font-size: 0;
            }
            img {
                display: inline-block;
                max-width: 30px;
                max-height: 30px;
                margin: 0;
                vertical-align: middle;
            }
        }
        .iconName {
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 25px;
            padding: 5px;
        }
    }
}
</style>
<!--
name:顶部图标控制器
notes:
    广播 "onIconDragingEvent",item.item,event.pageX,event.pageY
    广播 "onIconDragendEvent",item.item,event.pageX,event.pageY
-->
<template>
<div class="iconFrame clearfix">
    <!-- 拖动元素 -->
    <div :class="['iconNodeFrame','dragItem', 'animated']" v-show="dragItem.show" :style="{left:dragItem.view.left+'px',top:dragItem.view.top+'px'}">
        <div class="maskFrame"></div>
        <div :class="['iconBody',{imgModel:iconCheck(dragItem.item.img).type=='url'}]">
            <Icon v-if="iconCheck(dragItem.item.img).type=='icon'" :type="iconCheck(dragItem.item.img).name"></Icon>
            <img draggable="false" v-if="iconCheck(dragItem.item.img).type=='url'" :src="dragItem.item.img" />
        </div>
        <div class="iconName" v-text="dragItem.item.name"></div>
    </div>
    <div class="iconFrameMask"></div>
    <div class="iconItemBody" :style="{top:fixTop+'px'}">
        <div class="iconItemList">
            <div :class="['iconItemBtn','iconItemLeftBtn',{disable:!control.leftBtn}]" @click="onLeftBtnClick(!control.leftBtn)" v-show="value.length">
                <i class="iconfont icon-zuo"></i>
            </div>
            <div class="iconItemContent" v-show="control.showEmpty">
                <div class="iconItemContentEmpty">
                    <Icon type="social-buffer"></Icon>
                    <span>暂无可拖拽门户项</span>
                </div>
            </div>
            <div class="iconItemContent" v-show="!control.showEmpty">
                <div v-for="item in value" :class="['iconNodeFrame','animated',{swing:item.isShow}]" v-show="item.isShow" @mousedown="onMousedownEvent(item,$event)">
                    <div class="maskFrame"></div>
                    <div :class="['iconBody',{imgModel:iconCheck(item.img).type=='url'}]">
                        <Icon v-if="iconCheck(item.img).type=='icon'" :type="iconCheck(item.img).name"></Icon>
                        <img draggable="false" v-if="iconCheck(item.img).type=='url'" :src="item.img" />
                    </div>
                    <div class="iconName" v-text="item.name"></div>
                </div>
            </div>
            <div :class="['iconItemBtn','iconItemRightBtn',{disable:!control.rightBtn}]" @click="onRightBtnClick(!control.rightBtn)" v-show="value.length">
                <i class="iconfont icon-you"></i>
            </div>
        </div>
        <div class="iconItemSetting" :style="{'width':expandWidth}">
            <slot></slot>
        </div>
    </div>
</div>
</template>
<script>
var bodyMousemoveEvent = null,
    bodyMouseupEvent = null,
    movePointData = {};
export default {
    props: {
        isShow:{
           type:Boolean,
           default:false
        },
        value: {
            type: Array,
            default(){
                return [];
            }
        },
        expandWidth: {
            type: Number,
            default: 200
        },
        fixTop:{
            type: Number,
            default: 104
        },
        eventBus:{
            type:Object
        }
    },
    data() {
        return {
            currentIndex: 0,
            control: {
                leftBtn: true,//左侧按钮是否有效
                rightBtn: true,//右方按钮是否有效
                showEmpty: false//是否显示空状态
            },
            dragItem:{//被拖拽的元素
                show:false,
                view:{
                   left:0,
                   top:0
                },
                item:{
                    "allocation": "",
                    "data": "",
                    "dataType": "",
                    "display": "",
                    "id": "",
                    "img": "",
                    "width": 2,
                    "height": 2,
                    "isShow": 1,
                    "name": "",
                    "portalItemX": "",
                    "portalItemY": "",
                    "sys": "",
                    "type": "",
                    "url": ""
                }
            },
            dataListArr: []
        };
    },
    computed: {
        iconListArr() {
            // console.log(this.value)
            return this.value;
        }
    },
    mounted() {
        this.eventBus.$on("delItemPushEvent",this.onDelItemPushEvent);
        this.eventBus.$on("onUpdateIconTabBarEvent",this.onUpdateIconTabBarEvent);
        window.addEventListener("resize", this.onWindowResize);
        this.onWindowResize();
    },
    methods: {
        updateView() {
            var width = window.document.documentElement.offsetWidth-this.expandWidth-80;
            var hasCount = Math.floor(width / 90);
            var iconShowData=[];

            this.iconListArr.forEach(item=>{
                // console.log(item)
                if(item.hidden==true){
                    item.isShow=false;
                }else{
                    iconShowData.push(item);
                    item.isShow=true;
                }
            })
            this.control.showEmpty=!iconShowData.length;
            var totalCount = iconShowData.length;
            this.control.leftBtn = this.currentIndex > 0;
            this.control.rightBtn = this.currentIndex < totalCount - hasCount;
            if (hasCount > totalCount) {
                this.control.leftBtn = this.control.rightBtn = false;
                this.currentIndex = 0;
            } else if (this.currentIndex < 0) {
                this.currentIndex = 0;
            } else if (this.currentIndex > totalCount - hasCount) {
                this.currentIndex = totalCount - hasCount;
            }
            iconShowData.forEach((item,index)=>{
                if (index >= this.currentIndex && index < this.currentIndex + hasCount) {
                    item.isShow = true;
                } else {
                    item.isShow = false;
                }
            })
        },
        onLeftBtnClick(disable) {
            if (disable) return;
            this.currentIndex--;
            this.updateView();
        },
        onRightBtnClick(disable) {
            if (disable) return;
            this.currentIndex++;
            this.updateView();
        },
        onWindowResize() {
            this.updateView();
        },
        onMousedownEvent(item,event){
            event=event||window.event;
            this.dragItem.item=item;
            window.document.body.removeEventListener("mousemove", bodyMousemoveEvent);
            window.document.body.removeEventListener("mouseup", bodyMouseupEvent);
            var moveItem = event.currentTarget;
            bodyMousemoveEvent = event=>{
                this.onItemMove(this.dragItem, event||window.event, moveItem)
            };
            bodyMouseupEvent = event=>{
                this.onItemUp(this.dragItem, event||window.event)
            };
            window.document.body.addEventListener("mousemove", bodyMousemoveEvent);
            window.document.body.addEventListener("mouseup", bodyMouseupEvent);
            // cjf
            // var itemOffset=moveItem.getOffset();
            var itemOffset=moveItem.offsetParent;
            // console.log(event.screenY,event.pageY, event.clientY, event.offsetTop)
            movePointData = {
                itemOffset: itemOffset,
                pageX: event.pageX,
                pageY: event.pageY,
                // left:itemOffset.offsetLeft,
                // top:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop,
                left:event.clientX - moveItem.offsetWidth / 2,
                top:event.clientY - moveItem.offsetHeight / 2,
                width:moveItem.offsetWidth,
                height:moveItem.offsetHeight,
                toX:-1,
                toY:-1
            }
            this.dragItem.view.left=movePointData.left;
            this.dragItem.view.top=movePointData.top;
            this.dragItem.show=true;

            this.eventBus.$emit("onIconDragstartEvent",item,event);
        },
        onItemMove(item, event, moveItem) {
            event=event||window.event;
            if(event.buttons!=1 || !movePointData)return this.onItemUp(item, event);
            var body = window.document.body;
            // var pyX = event.pageX - movePointData.pageX,
            //     pyY = event.pageY - movePointData.pageY,
            //     left = movePointData.left + pyX,
            //     top = movePointData.top + pyY;
            // if (left < 0) {
            //     left = 0;
            // } else if (left + movePointData.width > body.offsetWidth) {
            //     left = body.offsetWidth - movePointData.width;
            // }
            // if (top < 0) {
            //     top = 0;
            // } else if (top + movePointData.height > body.offsetHeight) {
            //     top = body.offsetHeight - movePointData.height;
            // }
            var left = event.clientX - moveItem.offsetWidth / 2,
                top = event.clientY - moveItem.offsetHeight / 2;
            // console.log(left, top)
            item.view.left = left;
            item.view.top = top;
            //--------------------------------
            this.eventBus.$emit("onIconDragingEvent",item.item,event, moveItem);
        },
        onItemUp(item, event) {
            event=event||window.event;
            this.dragItem.show=false;
            window.document.body.removeEventListener("mousemove", bodyMousemoveEvent);
            window.document.body.removeEventListener("mouseup", bodyMouseupEvent);
            // console.log(item.item)
            this.eventBus.$emit("onIconDragendEvent",item.item,event);
        },
        iconCheck(src) {
            // if (String(src).substr(0, 7) === "http://" || String(src).substr(0, 8) === "https://") {
            //     return {
            //         type: "url",
            //         url: src
            //     }
            // } else if (String(src).substr(0, 7) === "icon://") {
            //     var listData = String(src).substr(7).split(",");
            //     return {
            //         type: "icon",
            //         name: listData.length > 0 ? listData[0] : "",
            //         color: listData.length > 1 ? listData[1] : ""
            //     }
            // } else if (String(src).substr(0, 11) === "data:image/") {
            //     return {
            //         type: "url",
            //         url: src
            //     }
            // }
            // return {
            //     type: "",
            //     url: "",
            //     name: "",
            //     color: ""
            // };
            return {
                type: "url",
                url: src
            }
        },
        onDelItemPushEvent(item){

        },
        onUpdateIconTabBarEvent(){
            this.updateView();
        }
    },
    beforeDestroy() {
        this.eventBus.$off("delItemPushEvent",this.onDelItemPushEvent);
        window.removeEventListener("resize", this.onWindowResize);
    },
        watch:{
        //当右侧宽度变化的时候需要更新窗口
        expandWidth(newValue) {
            this.$nextTick(() => {
                this.onWindowResize();
            });
        },
        isShow(newValue,oldValue){
           this.$nextTick(tick=>{
               this.updateView();
           })
        }
    },
}
</script>
