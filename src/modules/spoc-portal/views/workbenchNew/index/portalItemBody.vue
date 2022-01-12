<style lang="less">
.portalItemContent {
    .portalItemContentBody {
        z-index: 10;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .portalItemNode {
        position: absolute;
        z-index: 1;
        overflow: hidden;
        background-color: #fff;
        &.hoverMode{
            &:hover{
                box-shadow: 0 0 15px rgba(68,188,183,0.5);;
            }
        }
        .moving .portalItemSettingMode{
            display: block;
        }
    }
}
</style>
<template>
<div class="portalItemContent">
    <div class="portalItemContentBody">
        <div v-if="item && hasComponent(item)"
            :class="['portalItemNode',
            {
                hoverMode:mode==MODE_EDIT||mode==MODE_TEMPLATE,
                transition:!item.view.moving
            }]" v-for="(item,key,index) in database" :key="key" :style="getStyle(item)" @mousedown="onItemMouseDown(item,$event)">
            <component :class="[{moving:item.view.moving}]" v-model="item.value"
                :is="getComponent(item)" :data="item.data" :view="item.view" :mode="mode"
                @onButtonClick="onButtonClick.apply(this,[item,...arguments])"
                @onUploadFastAccess="onUploadFastAccess"
                @init="context=>{item.context=context}">
            </component>
        </div>
    </div>
    <PortalItemBg :itemData="data" :eventBus="eventBus" v-model="verticalCount" ref="portalItemBg"  :editMode="editMode"></PortalItemBg>
</div>
</template>
<script>
import pluginList from "../plugin/libs/pluginData.js";
import PortalItemBg from "./portalItemBg.vue";
import MODE from "../plugin/mode.js";

const PART_WIDTH=6;//宽度
var bodyMousemoveEvent = null,
    bodyMouseupEvent = null,
    movePointData = {};
var getParentForClass=function(className){
    var index=String(this.className).split(" ").indexOf(className);
    if(index>=0)return this;
    var parentElement=this.parentNode;
    while (parentElement) {
        index=String(parentElement.className).split(" ").indexOf(className);
        if(index>=0)return parentElement;
        parentElement=parentElement.parentNode;
    }
    return null;
}

export default {
    components: {
        PortalItemBg,
    },
    props: {
        //数据
        data: {
            type: Object
        },
        //水平数量
        horizontalCount: {
            type: Number,
            default: 6
        },
        //块高度
        partHeight: {
            type: Number,
            default: 140
        },
        //水平间距
        horizontalGap: {
            type: Number,
            default: 16
        },
        //垂直间距
        verticalGap: {
            type: Number,
            default: 16
        },
        //是否编辑模式
        mode: {
            type: String,
            default: ""
        },
        editMode:{
            type:Boolean,
            default:false
        },
        eventBus:{
            type:Object
        }
    },
    data() {
        return {
            //一个单元格宽度
            partWidth: 0,
            //垂直显示数量
            verticalCount:0,
            onAutoFullEventValue: 2,
            leftWidth: 180,
        };
    },
    computed: {
        ...MODE,
        database() {
            return this.data;
        },
        bgView(){
           return this.$refs.portalItemBg;
        },
        //实际高度(多少格)
        actualHeight(){
            var height=0;
            Object.keys(this.database).forEach(key=>{
                var item=this.database[key];
                if(!item)return;
                var newHeight=parseInt(item.data.portalItemY)+parseInt(item.data.height);
                if(newHeight>height)height = newHeight;
            })
            return height;
        },
        ToBodyTop() {
            // 104
            return this.offsetToBodyTop(this.$el, 'top');
        },
        ToBodyLeft() {
            // 196
            return this.offsetToBodyTop(this.$el, 'left');
        },
    },
    mounted() {
        this.leftWidth = this.$store.state.app.collapsed ? 64 : 180;
        window.addEventListener("resize", this.onWindowResize);
        this.onWindowResize();
        this.eventBus.$on("onIconDragingEvent",this.onIconDragingEvent);
        this.eventBus.$on("onIconDragendEvent",this.onIconDragendEvent);
        this.eventBus.$on("onIconDragstartEvent",this.onIconDragstartEvent);
        //this.eventBus.$on("onGetSettingEvent",this.onGetSettingEvent);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onWindowResize);
        this.eventBus.$off("onIconDragingEvent",this.onIconDragingEvent);
        this.eventBus.$off("onIconDragendEvent",this.onIconDragendEvent);
        this.eventBus.$off("onIconDragstartEvent",this.onIconDragstartEvent);
        //this.eventBus.$off("onGetSettingEvent",this.onGetSettingEvent);
    },
    methods: {
        onWindowResize() {
            var sessionWidth = window.document.documentElement.offsetWidth;
            sessionWidth = sessionWidth<1280?1280:sessionWidth;
            this.partWidth = [sessionWidth - this.leftWidth - 16 * 2 - 8 - ((this.horizontalCount - 1) * this.horizontalGap)] / this.horizontalCount;
            this.updateView();
        },
        //公共方法更新视图
        updateView() {
            this.eventBus.$emit("onAutoFullEvent",(this.mode == this.MODE_EDIT || this.mode == this.MODE_TEMPLATE)?this.onAutoFullEventValue : 0);
            Object.keys(this.database).forEach(key=>{
                var item=this.database[key];
                if(!item)return;
                item.view.width = item.data.width * this.partWidth + this.horizontalGap * (item.data.width - 1);
                item.view.height = item.data.height * this.partHeight + this.verticalGap * (item.data.height - 1);
                item.view.left = item.data.portalItemX * this.partWidth + item.data.portalItemX * this.horizontalGap;
                item.view.top = item.data.portalItemY * this.partHeight + item.data.portalItemY * this.verticalGap;
            });
        },
        //组件是否存在
        hasComponent(item){
            var hasComponent=false;
            pluginList.plugin.forEach(itemPlugin=>{
                if(itemPlugin.className===item.data.allocation && itemPlugin.classObjct){
                    hasComponent=true;
                    return false;
                }
            });

            if((item.data.allocation == 'customChart') && item.data.dataJson && item.data.dataJson[0]){
                // 新的图标插件
                hasComponent=true;
            }
            return hasComponent;
        },
        //获取异步加载组件
        getComponent(item){
            var componentPlugin=null;
            pluginList.plugin.forEach(itemPlugin=>{
                if(itemPlugin.className===item.data.allocation){
                    componentPlugin=itemPlugin.classObjct;
                    return false;
                }
            });
            return componentPlugin;
        },
        getStyle(item){
            // console.log(item)
            if(!item)return {};
            return {
                left:item.view.left+'px',
                top:item.view.top+'px',
                width:item.view.width+'px',
                height:item.view.height+'px',
                zIndex:item.view.zIndex
            }
        },
        //自动计算高度，最小为6
        autoVerticalCount(value){
            // console.log('autoVerticalCount', value)
            this.$set(this,"verticalCount",(this.actualHeight+value)<6?6:(this.actualHeight+value));
        },
        /**
         * 获取覆盖区域
         * @param  {int} x 左上角
         * @param  {int} y 右上角
         * @param  {int} w 宽度
         * @param  {int} h 高度
         * @return {void}
         */
        getCoverRect(x,y,w,h){
            for(var _x=0;_x<0;_x++){
                for(var _y=0;_y<0;_y++){

                }
            }
        },
        onItemMouseDown(item, event) {
            event=event||window.event;
            var target=getParentForClass.bind(event.target)("editModeBtn");
            if(target)return;

            if (this.mode == this.MODE_EDIT || this.mode == this.MODE_TEMPLATE) {
                if(item.data.isLock)return;
                this.autoVerticalCount(item.data.height);
                window.document.body.removeEventListener("mousemove", bodyMousemoveEvent);
                window.document.body.removeEventListener("mouseup", bodyMouseupEvent);
                bodyMousemoveEvent = event=>{
                    this.onItemMove(item, event||window.event);
                };
                bodyMouseupEvent =  event=>{
                    this.onItemUp(item, event||window.event);
                };
                let moveItem = event.currentTarget;
                // console.log(moveItem)
                Object.keys(this.database).forEach(key=>{
                    var item=this.database[key];
                    if(item){
                        item.view.zIndex=1;
                        item.view.moving=false;
                    }
                })
                item.view.zIndex=2;
                item.view.moving=true;

                if(!this.bgView)return;
                this.bgView.full(item.data.portalItemX - 0,item.data.portalItemY - 0,item.data.width,item.data.height,0);
                window.document.body.addEventListener("mousemove", bodyMousemoveEvent);
                window.document.body.addEventListener("mouseup", bodyMouseupEvent);
                movePointData = {
                    target:moveItem,
                    // cjf
                    // itemOffset: moveItem.getOffset(),
                    itemOffset: moveItem.offsetParent,
                    pageX: event.pageX,
                    pageY: event.pageY,
                    top: parseInt(item.view.top),
                    left: parseInt(item.view.left),
                    width: moveItem.offsetWidth,
                    height: moveItem.offsetHeight,
                    toX:-1,
                    toY:-1
                }
            }
        },
        onItemMove(item, event) {
            // 移动位置
            event=event||window.event;
            if(event.buttons!=1 || !movePointData)return this.onItemUp(item, event);
            var body = this.$el;
            if (this.mode == this.MODE_EDIT || this.mode == this.MODE_TEMPLATE) {
                // cjf
                // var bodyOffset = body.getOffset();
                var bodyOffset = body.offsetParent
                var pyX = event.pageX - movePointData.pageX,
                    pyY = event.pageY - movePointData.pageY,
                    left = movePointData.left + pyX,
                    top = movePointData.top + pyY;
                if (left < 0) {
                    left = 0;
                } else if (left + movePointData.width > body.offsetWidth) {
                    left = body.offsetWidth - movePointData.width;
                }
                if (top < 0) {
                    top = 0;
                } else if (top + movePointData.height > body.offsetHeight) {
                    top = body.offsetHeight - movePointData.height;
                }
                item.view.left = left;
                item.view.top = top;
                //--------------------------------
                // cjf
                // var mX=event.pageX-body.getOffset().left,
                //     mY=event.pageY-body.getOffset().top;
                var mX = event.pageX-body.offsetParent.offsetLeft,
                    mY=event.pageY-body.offsetParent.offsetTop;
                if(mX<0)mX=0;
                if(mY<0)mY=0;
                if(mX>body.offsetWidth)mX=body.offsetWidth;
                if(mY>body.offsetHeight)mY=body.offsetHeight;

                mX=Math.floor(mX/(this.partWidth+this.horizontalGap));
                mY=Math.floor(mY/(this.partHeight+this.verticalGap));

                var sX=Math.floor((left+this.horizontalGap)/(this.partWidth+this.horizontalGap));
                var sW=item.data.width+(item.data.width>1?1:0);
                var sY=Math.floor((top+this.verticalGap)/(this.partHeight+this.verticalGap));
                var sH=item.data.height+(item.data.height>1?1:0);

                if(sX+sW>PART_WIDTH){
                    sX=PART_WIDTH-item.data.width;
                    sW=item.data.width;
                };
                if(sY+sH>this.verticalCount){
                    sY=this.verticalCount-item.data.height;
                    sH=item.data.height;
                };
                // 222
                this.eventBus.$emit("onClearSelectEvent");
                if(!this.bgView)return;
                var rect=this.bgView.checkRect(sX,sY,sW,sH,item.data.width,item.data.height);
                if(!rect)return movePointData.toX=movePointData.toY=-1;
                this.bgView.full(rect.x - 0,rect.y - 0,rect.width,rect.height,2);
                movePointData.toX=rect.x;
                movePointData.toY=rect.y;
                // console.log(movePointData)
            }
        },
        onItemUp(item, event) {
            event=event||window.event;
            window.document.body.removeEventListener("mousemove", bodyMousemoveEvent);
            window.document.body.removeEventListener("mouseup", bodyMouseupEvent);

            this.eventBus.$emit("onClearSelectEvent");

            if(Math.abs(event.pageX-movePointData.pageX)<5 && Math.abs(event.pageY-movePointData.pageY)<5){
                //当点击再小范围区域内时不移动，过滤单击事件
            }else if(movePointData.toX>=0 && movePointData.toY>=0){
                item.data.portalItemX=movePointData.toX;
                item.data.portalItemY=movePointData.toY;
            }
            movePointData.toX=movePointData.toY=-1;
            item.view.moving=false;

            this.$nextTick(tick=>{
                var event = document.createEvent("HTMLEvents");
                event.initEvent("resize", true, true);
                window.dispatchEvent(event);
            })
        },
        onIconDragstartEvent(item){
            this.autoVerticalCount(item.height);
        },
        onIconDragingEvent(item,event,moveItem){
            // 从导航移下来
            var body = this.$el;
            var mX=document.getElementById('workBenchNew').parentNode.scrollLeft + event.pageX - this.ToBodyLeft - moveItem.offsetWidth / 2,
                mY=document.getElementById('workBenchNew').parentNode.scrollTop + event.pageY - this.ToBodyTop - moveItem.offsetHeight / 2;
            if(mX<0)mX=0;
            if(mY<0)mY=0;
            if(mX>body.offsetWidth)mX=body.offsetWidth;
            if(mY>body.offsetHeight)mY=body.offsetHeight;

            mX=Math.floor(mX/(this.partWidth+this.horizontalGap));
            mY=Math.floor(mY/(this.partHeight+this.verticalGap));
            this.eventBus.$emit("onClearSelectEvent");
            if(!this.bgView)return;

            var rect=this.bgView.check(mX,mY,item.width,item.height);

            if(!rect)return movePointData.toX=movePointData.toY=-1;
            this.bgView.full(rect.x - 0,rect.y - 0,rect.width,rect.height,2);
            movePointData.toX=rect.x;
            movePointData.toY=rect.y;
        },
        offsetToBodyTop(item, type) {
            var num = 0;
            computedNum(item, type);
            return num;
            function computedNum(item, type) {
                if(item.tagName && item.tagName != 'BODY') {
                    if(type == 'top') num += item.offsetTop;
                    else num += item.offsetLeft;
                    computedNum(item.offsetParent, type);
                }
            };

        },
        onIconDragendEvent(item,event){
            this.eventBus.$emit("onClearSelectEvent");
            if(movePointData.toX>=0 && movePointData.toY>=0){
                this.eventBus.$emit("addItemPushEvent",item,movePointData.toX,movePointData.toY);
            }
            movePointData.toX=movePointData.toY=-1;
            this.$nextTick(tick=>{
                var event = document.createEvent("HTMLEvents");
                event.initEvent("resize", true, true);
                window.dispatchEvent(event);
            })
        },
        onButtonClick(item,command){
            if(command=="delete"){
                // if(!(this.mode==this.MODE_TEMPLATE) && (!item.data.isDel || item.data.isLock)){
                //     return;
                // }
                // console.log(item)
                this.eventBus.$emit("delItemPushEvent",item);
                // this.bgView.full(item.data.portalItemX - 0,item.data.portalItemY - 0,item.data.width - 0,item.data.height - 0,0);

                this.$nextTick(tick=>{
                    this.eventBus.$emit("onAutoFullEvent",(this.mode == this.MODE_EDIT || this.mode == this.MODE_TEMPLATE)?this.onAutoFullEventValue : 0);
                })
            }else if(command=="lock"){
                if(this.mode==this.MODE_TEMPLATE){
                    this.$set(item.data,"isLock",(!item.data.isLock)?1:0);
                }
            }
        },
        onUploadFastAccess(data, flag) {
            // 保存快捷方式
            this.$emit('onUploadFastAccess', data, flag);
        },
    },
    watch: {
        mode(newValue, oldValue) {
            window.document.body.removeEventListener("mousemove", bodyMousemoveEvent);
            window.document.body.removeEventListener("mouseup", bodyMouseupEvent);
            this.$nextTick(tick=>{
                this.eventBus.$emit("onAutoFullEvent",(this.mode == this.MODE_EDIT || this.mode == this.MODE_TEMPLATE)?this.onAutoFullEventValue : 0);
            })
        },
        data(newValue, oldValue) {
            this.$emit("onAutoFullEvent");
        },
        '$store.state.app.collapsed'(val) {
            // console.log('$store.state.app.collapsed', val)
            this.leftWidth = val ? 64 : 180;
            this.onWindowResize();
        }
    },
}
</script>
