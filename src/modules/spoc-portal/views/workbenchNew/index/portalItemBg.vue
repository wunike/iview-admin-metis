<template>
<div :class="['portalItemBgContent',{itemEditMode:editMode}]">
    <div class="itemRow" v-for="(item,index) in databaseMap" :key="index" :style="computedVerticalStyle(databaseMap,index)">
        <div :class="['itemCel',{fullBgColor:childItem.tag==2}]" v-for="(childItem,childIndex) in item" :key="childIndex" :style="computedHorizontalStyle(item,childIndex)">
        </div>
    </div>
</div>
</template>
<script>
export default {
    props: {
        //垂直数量
        value:{
            type: Number,
            default: 6
        },
        //数据
        itemData: {
            type: Object
        },
        //水平数量
        horizontalCount: {
            type: Number,
            default: 6
        },
        partHeight: {
            type: Number,
            default: 140
        },
        horizontalGap: {
            type: Number,
            default: 16
        },
        verticalGap: {
            type: Number,
            default: 16
        },
        editMode:{
            type: Boolean,
            default: false
        },
        eventBus:{
            type:Object
        }
    },
    data() {
        return {
            partWidth: 0,
            verticalNumber:0,
            databaseMap:[],
            leftWidth: 180,
        }
    },
    created(){
        this.resetVerticalCount(this.value);
    },
    computed:{
        //实际高度(多少格)
        actualHeight(){
            var height=0;
            Object.keys(this.itemData).forEach(key=>{
                var item=this.itemData[key];
                if(!item)return;
                var newHeight=parseInt(item.data.portalItemY)+parseInt(item.data.height);
                if(newHeight>height)height = newHeight;
            })
            return height;
        }
    },
    methods: {
        onWindowResize() {
            var sessionWidth = window.document.documentElement.offsetWidth;
            sessionWidth = sessionWidth<1280?1280:sessionWidth;
            this.partWidth = [sessionWidth - this.leftWidth - 16 * 2 - 8 - ((this.horizontalCount - 1) * this.horizontalGap)] / this.horizontalCount;
        },
        //判断能否填充
        canSelect(x,y,w,h){
            // cjf
            if(x<0 || y<0 || w<=0 || h<=0)return false;
            // if(y+h>this.databaseMap.length || x+w>this.horizontalCount)return false;
            if(x+w>this.horizontalCount) return false;
            if(y+h>this.databaseMap.length) this.resetVerticalCount(y+h);
            for(var _y=y;_y<y+h;_y++){
                var row=this.databaseMap[_y];
                if(row instanceof Array==false || row.length<this.horizontalCount)return false;
                for(var _x=x;_x<x+w;_x++){
                    if(row[_x].tag==1)return false;
                }
            }
            return true;
        },
        check(x,y,w,h){
            var can=false;
            var canRect={
                x:x,
                y:y,
                width:w,
                height:h
            };
            if(this.canSelect(x,y,w,h)){
                return canRect;
            }
            return false;
        },
        checkRect(x,y,w,h,_w,_h){
            var can=false;
            var canRect={
                x:x,
                y:y,
                width:_w,
                height:_h
            };
            for(var _y=0;_y<=h-_h;_y++){
                for(var _x=0;_x<=w-_w;_x++){
                    can=this.canSelect(x+_x,y+_y,_w,_h);
                    if(can){
                        canRect.x=x+_x;
                        break;
                    }
                }
                if(can){
                    canRect.y=y+_y;
                    break;
                }
            }
            return can?canRect:false;
        },
        full(x,y,w,h,value){
            for(var i=0;i<this.databaseMap.length;i++){
                var item=this.databaseMap[i];
                if(i>=y && i<y+h){
                    for(var c=0;c<item.length;c++){
                        if(c>=x && c<x+w){
                            item[c].tag=value;
                        }
                    }
                }
            }
        },
        //清除所有标记
        clear(){
            for(var i=0;i<this.databaseMap.length;i++){
                var item=this.databaseMap[i];
                for(var c=0;c<item.length;c++){
                    item[c].tag=0;
                }
            }
        },
        //设置新的高度
        resetVerticalCount(newValue){
            var databaseMapLength=this.databaseMap.length;
            if(newValue < databaseMapLength){
                //删减数据
                this.databaseMap.splice(databaseMapLength-newValue-1,databaseMapLength-newValue);
            }
            //增加数据
            for(var i=0;i<newValue-databaseMapLength;i++){
                var arr=[];
                for(var cc=0;cc< this.horizontalCount;cc++){
                    arr.push({tag:0})
                }
                this.databaseMap.push(arr);
            }
            if(newValue!=this.databaseMap.length){
                this.$emit("input",this.databaseMap.length);
            }
        },
        //计算水平间距
        computedHorizontalStyle(data, index) {
            return {
                width: this.partWidth + 'px',
                height: this.partHeight + 'px',
                marginRight: (data instanceof Array && index == data.length - 1) ? '0px' : this.horizontalGap + "px"
            }
        },
        //计算垂直间距
        computedVerticalStyle(data, index) {
            return {
                marginBottom: (data instanceof Array && index == data.length - 1) ? "0px" : this.verticalGap + "px"
            }
        },
        //清除所有选中标记
        onClearSelectEvent(){
            for(var i=0;i<this.databaseMap.length;i++){
                var item=this.databaseMap[i];
                for(var c=0;c<item.length;c++){
                    if(item[c].tag==2)item[c].tag=0;
                }
            }
        },
        //根据数据自动填充
        onAutoFullEvent(value){
            this.clear();
            var valueData=isNaN(parseInt(value))?0:parseInt(value);
            this.resetVerticalCount(this.actualHeight+valueData<6?6:this.actualHeight+valueData);
            Object.keys(this.itemData).forEach(key=>{
                var item=this.itemData[key];
                if(item && item.data){
                    var data=item.data;
                    this.full(data.portalItemX - 0,data.portalItemY - 0,data.width,data.height,1);
                }
            })
        }
    },
    watch: {
        value(newValue,oldValue){
            this.resetVerticalCount(newValue);
        },
        '$store.state.app.collapsed'(val) {
            // console.log('$store.state.app.collapsed', val)
            this.leftWidth = val ? 64 : 180;
            this.onWindowResize();
        }
    },
    created() {
        this.eventBus.$on("onAutoFullEvent",this.onAutoFullEvent);
        this.eventBus.$on("onClearSelectEvent",this.onClearSelectEvent);
    },
    mounted() {
        this.leftWidth = this.$store.state.app.collapsed ? 64 : 180;
        window.addEventListener("resize", this.onWindowResize);
        this.onWindowResize();
    },
    beforeDestroy() {
        this.eventBus.$off("onAutoFullEvent",this.onAutoFullEvent);
        this.eventBus.$off("onClearSelectEvent",this.onClearSelectEvent);
        window.removeEventListener("resize", this.onWindowResize);
    }
}
</script>
<style lang="less">
.portalItemBgContent{
    position: relative;
    z-index: 0;
    &.itemEditMode{
        .itemRow{
            opacity: 0.5;
        }
    }
}
.itemRow {
    opacity: 0.3;
    white-space: nowrap;
    .itemCel {
        display: inline-block;
        vertical-align: top;
        background-color: #fff;
        height: 50px;
        box-shadow: 0 0 10px rgba(0,0,0,0.02);
        &.fullBgColor{
            background-color: rgba(0,0,0,0.1);
        }
    }
}
</style>
