<style lang="less" >
@import "../plugin/libs/theme.less";
.indexFrame {
    height: ~"calc(100% - 16px)";
    &.editMode { 
        
    }
    .portalItemFrame {
        height: 100px;
        position: relative;
        z-index: 10;
        background-color: #fff;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
        .portalItemMask {
            height: 100px;
            background-color: #fff;
        }
        .portalItemBody {
            position: absolute;
            left: 0;
            width: 100%;
            top: 0;
            height: 100%;
            overflow: hidden;
            .portalItemList {
                position: absolute;
                height: 100%;
                left: 0;
                top: 0;
                right: 200px;
            }
            .portalItemSetting {
                position: absolute;
                height: 100%;
                top: 0;
                right: 0;
                width: 200px;
            }
        }
    }
    .indexBodyFrame {
        width: 100%;
        min-height: 300px;
        .indexBodyMaxwidth{
            width: 100%;
            height:auto;
            display:table;
			background: #eff1f4;
        }
        .indexMenuFrame {
            position: relative;
            border-top:1px solid #ebedf1;
            z-index: 2;
            display: table-cell;
            vertical-align: top;
            width: 200px;
            background: #fff;
            box-shadow: 10px 0 10px rgba(0,0,0,.03);
            .leftMenuFrame{
                width: 200px;
                left: 0;
            }
        }
        .indexBody {
            position: relative;
            z-index: 1;
            display: table-cell;
            vertical-align: top;
            height:100%;
            padding-left:10px;
            padding-bottom:10px;
            .edittModelBar {
                height: 72px;
                position: relative;
                z-index: 8;
                margin: 16px 16px 0 0;
                background-color: #fff;
                .datetimeBar {
                    position: absolute;
                    left: 30px;
                    top: 0;
                    height: 100%;
                    width: 50%;
                    .dateBar,
                    .timeWeekBar {
                        height: 40px;
                        margin-top: 10px;
                        display: inline-block;
                        vertical-align: top;
                    }
                    .dateBar {
                        font-size: 32px;
                        line-height: 40px;
                        color: @themeColor;
                    }
                    .timeWeekBar {
                        position: relative;
                        display: inline-block;
                        height: 40px;
                        margin-left: 10px;
                        border-left: 1px solid #ddd;
                        .timeBar,
                        .weekBar {
                            margin-left: 10px;
                            height: 20px;
                            line-height: 20px;
                            color: #999;
                        }
                    }
                }
                .editBtn {
                    position: absolute;
                    right: 0;
                    top: 0;
                    height: 100%;
                    width: 120px;
                    line-height: 72px;
                    text-align: center;
                    background-color: #f8f8f8;
                    cursor: pointer;
                    > * {
                        vertical-align: middle;
                    }
                    &:hover {
                        color: @themeColor;
                        font-weight: bold;
                    }
                    i {
                        font-size: 20px;
                        margin-left: 10px;
                    }
                }
            }
            .itemBodyFrame {
                position: relative;
                margin: 10px 0 0 0;
                .itemBody {
                    position: relative;
                }
            }
        }
    }
}
</style>
<template>
<div class="indexFrame" id="workBenchNew">
    <div :class="['portalItemFrame']" v-show="editMode">
        <iconTabBar :eventBus="eventBus" :isShow="editMode" :class="['animated',{fadeIn:editMode}]"
        v-model="portalItemList" :expandWidth="200">
            <Button name="button" @click="cancelSavePortalSetting()">取消</Button>
            <Button type="primary" @click="savePortalSetting()" style="margin-left:10px" name="button">完成配置</Button>
        </iconTabBar>
    </div>
    <portalLeadPage v-if="showEmpty"></portalLeadPage>
    <div class="indexBodyFrame" v-if="!showEmpty">
        <div class="indexBodyMaxwidth clearfix">
            <div class="indexBody">
                <div class="edittModelBar" v-show="!editMode" v-if="false">
                    <div class="datetimeBar">
                        <div class="dateBar" v-text="dataTimeInfo.date"></div>
                        <div class="timeWeekBar">
                            <div class="weekBar" v-text="dataTimeInfo.week"></div>
                            <div class="timeBar" v-text="dataTimeInfo.time"></div>
                        </div>
                    </div>
                    <div class="editBtn" @click="inEditMode()">
                        <span>编辑门户项</span>
                        <Icon type="ios-gear"></Icon>
                    </div>
                </div>
                <div class="itemBodyFrame">
                <!-- <div class="itemBodyFrame"> -->
                    <div class="itemBody">
                        <portalItemBody 
                            :eventBus="eventBus" 
                            :editMode="editMode" 
                            :mode="mode" 
                            :data="portalItemLayout" 
                            @onUploadFastAccess="savePortalSetting"
                            :contentBodyHeight="getContentBodyHeight">
                        </portalItemBody>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import iconTabBar from "../index/iconTabBar.vue";
import portalItemBody from "../index/portalItemBody.vue";
import portalLeadPage from "../index/portalLeadPage.vue";
import MODE from "../plugin/mode.js";
import pluginList from "../plugin/libs/pluginData.js";
import valid, { errors, comPortalTpl, comPortalItem, api } from '../../../libs/request.js';
import { mapMutations, mapState } from "vuex";
//原始数据
var originalPortalItemLayout=[];//原始门户项布局
var originalPortalItem=[];//原始门户项
export default {
    components: {
        iconTabBar,
        portalItemBody,
        portalLeadPage
    },
    data() {
        return {
            editMode: false, //是否编辑模式
            mode:this.$route.query.edit ? MODE.MODE_EDIT() : MODE.MODE_NORMAL(),
            showEmpty:true,//是否显示空数据状态
            //门户项信息
            portalItemInfo: {
                templateId: "",
                //全部门户项列表
                itemLayout: {},
                //当前展示门户项列表
                itemList: []
            },
            dataTimeInfo: {
                date: "",
                time: "",
                week: ""
            }
        };
    },
    computed: {
        ...MODE,
        ...mapState(["webUiInfo"]),
        eventBus(){
            return this;
        },
        //门户项列表
        portalItemList: {
            get() {
                return this.portalItemInfo.itemList;
            },
            set(value) {
                this.portalItemInfo.itemList = value instanceof Array ? value : [];
            }
        },
        //门户项布局列表
        portalItemLayout:{
            get() {
                return this.portalItemInfo.itemLayout;
            },
            set(value) {
                this.portalItemInfo.itemLayout = (value && typeof value =="object") ? value : {};
            }
        },
        componentList() {
            let arr = [];
            if(pluginList && pluginList.plugin) {
                pluginList.plugin.forEach(item => {
                    arr.push(item.className);
                });
            }
            // console.log(arr)
            return arr;
        }
    },
    mounted() {
        if(this.$route.query.edit) this.inEditMode();
        // window.addEventListener("resize", this.onWindowResize);
        document.getElementById('workBenchNew').addEventListener("resize", this.onWindowResize, true);
        this.onWindowResize();
        this.dataTimeInfo.timeId = setInterval(this.timeUpdate, 1000);
        this.timeUpdate();
        this.loadUserPortalItemInfo();
        this.eventBus.$on("onIconDragstartEvent",this.onIconDragstartEvent);
        this.eventBus.$on("addItemPushEvent",this.addItemPushEvent);
        this.eventBus.$on("delItemPushEvent",this.delItemPushEvent);
        // this.$eventBus.$emit('webHeaderFixedEvent',true,'index');
        // window.addEventListener('scroll', () => {
        //     console.log(document.getElementById('workBenchNew').parentNode.scrollTop)
        // }, true);
    },
    beforeRouteEnter (to, from, next) {
        if(localStorage.getItem('token')){
            api.tenantForm({}).then(valid.call(this)).then(res => {
                if(res.ok) {
                    console.log(res.data.data)
                    if(res.data.data && res.data.data.status && res.data.data.status.code == 'UNINIT'){
                        next((vm)=>{
                            vm.$router.push({
                                name: 'portal.workBenchCreate'
                            })
                        })
                    } else {
                        next()
                    }
    
                }
            }).catch(errors.call(this))
        } else {
            next()
        }
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        //获取用户门户布局信息
        loadUserPortalItemInfo() {
            if(this.$route.query.protalTplId) {
                this.findPortalDetail();
            } else {
                this.findUserPortal();
            }
        },
        findPortalDetail() {
            this.updateLoadingStatus({ isLoading: true });
            let params = {
                protalTplId: this.$route.query.protalTplId,
            }
            comPortalTpl.findPortalDetail(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    if(_data){
                        this.portalItemInfo.templateId = _data.portalTplId;
                        //获取布局并执行清洗
                        originalPortalItemLayout = _data.protalItemList;
                        // for(var i=_data.protalItemList.length-1;i>=0;i--){
                        //     if(this.componentList.indexOf(originalPortalItemLayout[i].allocation)<0){
                        //         originalPortalItemLayout.splice(i,1);
                        //     }
                        // }
                        _data.protalItemList.forEach(item => {
                            item.width = Number(item.width);
                            item.height = Number(item.height);
                        });
                        this.sortingAllData(originalPortalItemLayout);
    
                        this.$nextTick(tick=>{
                            this.eventBus.$emit("onAutoFullEvent");//自动填充布局
                        })
                        if(this.portalItemInfo.templateId){
                            this.loadPortalItemList(this.portalItemInfo.templateId); //加载模板
                        }else{
    
                        }
                    }
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        findUserPortal() {
            this.updateLoadingStatus({ isLoading: true });
            let params = {
                protalTplId: this.$route.query.protalTplId,
            }
            comPortalTpl.findUserPortal(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    if(_data){
                        this.portalItemInfo.templateId = _data.portalTplId;
                        //获取布局并执行清洗
                        originalPortalItemLayout = _data.protalItemList;
                        // for(var i=_data.protalItemList.length-1;i>=0;i--){
                        //     if(this.componentList.indexOf(originalPortalItemLayout[i].allocation)<0){
                        //         originalPortalItemLayout.splice(i,1);
                        //     }
                        // }
                        _data.protalItemList.forEach(item => {
                            item.width = Number(item.width);
                            item.height = Number(item.height);
                        });
                        this.sortingAllData(originalPortalItemLayout);
    
                        this.$nextTick(tick=>{
                            this.eventBus.$emit("onAutoFullEvent");//自动填充布局
                        })
                        if(this.portalItemInfo.templateId){
                            this.loadPortalItemList(this.portalItemInfo.templateId); //加载模板
                        }else{
    
                        }
                    }
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        //获得门户列表
        loadPortalItemList(templateId) {
            let params = {
                delFlag: 0,
                display: 1
            }
            this.updateLoadingStatus({ isLoading: true });
            comPortalItem.findPortalItemList(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    originalPortalItem = _data.map(item => {
                        item.width = Number(item.width);
                        item.height = Number(item.height);
                        item.portalItemX = Number(item.portalItemX);
                        item.portalItemY = Number(item.portalItemY);
                        item.isShow = true;//是否显示，用于左右控制
                        item.hidden = false;//是否隐藏，当有些门户项拖动下来后小隐藏
                        return item;
                    });
                    // for(var i=originalPortalItem.length-1;i>=0;i--){
                    //     if(this.componentList.indexOf(originalPortalItem[i].allocation)<0){
                    //         originalPortalItem.splice(i,1);
                    //     }
                    // }
                    this.portalItemList = JSON.parse(JSON.stringify(originalPortalItem));
                    this.$nextTick(tick=>{
                        this.synPortalItem();
                        var event = document.createEvent("HTMLEvents");
                        event.initEvent("resize", true, true);
                        window.dispatchEvent(event);
                    })
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        inEditMode() {
            this.editMode = true;
            this.mode=this.MODE_EDIT;
        },
        outEditMode() {
            this.editMode = false;
            this.mode=this.MODE_PREVIEW;
            this.$nextTick(tick=>{
                this.eventBus.$emit("onAutoFullEvent");
            })
        },
        savePortalSetting(fasrAccess, flag){
            let params = [];
            // console.log(fasrAccess, fasrAccess.id, this.portalItemLayout[fasrAccess.id])
            Object.keys(this.portalItemLayout).forEach(key=>{
                var item=this.portalItemLayout[key];
                if(item) {
                    if(fasrAccess && item.data.id == fasrAccess.id) {
                        params.push({
                            itemId: fasrAccess.id,
                            portalItemX: fasrAccess.portalItemX,
                            portalItemY: fasrAccess.portalItemY,
                            tplId: this.$route.query.protalTplId || this.portalItemInfo.templateId,
                            itemContent: Array.isArray(fasrAccess.itemContent) ? fasrAccess.itemContent.join(',') : fasrAccess.itemContent
                        })
                    } else {
                        params.push({
                            itemId: item.data.id,
                            portalItemX: item.data.portalItemX,
                            portalItemY: item.data.portalItemY,
                            tplId: this.$route.query.protalTplId || this.portalItemInfo.templateId,
                            itemContent: Array.isArray(item.data.itemContent) ? item.data.itemContent.join(',') : item.data.itemContent
                            // itemContent: item.data.itemContent && item.data.itemContent.length ? item.data.itemContent.join(',') : ''
                        });
                    }
                }
            });
            // console.log(params)
            comPortalTpl.savePortal(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    // this.loadUserPortalItemInfo();
                    // this.$nextTick(tick=>{
                    //     this.outEditMode();
                    // });
                    if(!flag) {
                        this.$router.push({
                            name: 'portal.workbenchLists',
                        });
                    }
                    if(flag && flag == 'saveFastAccess') {
                        // 刷新页面数据
                        this.loadUserPortalItemInfo();
                    }
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        cancelSavePortalSetting(){
            // this.outEditMode();
            // this.onReductionItemEvent();
            this.$router.push({
                name: 'portal.workbenchLists',
            });
        },
        //清洗数据
        sortingAllData(portalItemLayerData){
            var itemObject={};
            portalItemLayerData.forEach((item,index)=>{
                itemObject[index]=this.sortingPortalItem(item);
            })
            this.portalItemLayout=JSON.parse(JSON.stringify(itemObject));
            // console.log(this.portalItemLayout)
            this.$nextTick(()=>{
                var event = document.createEvent("HTMLEvents");
                event.initEvent("resize", true, true);
                window.dispatchEvent(event);
                if(!this.$route.query.edit) this.mode=this.MODE_PREVIEW;
                this.synPortalItem();
            });
        },
        /**
         * 整理一项数据
         * @param  {object} item 整理的节点
         * @return {void}
         */
        sortingPortalItem(item){
            return {
                view:{//style样式
                    left:0,
                    top:0,
                    width:0,
                    height:0,
                    zIndex:1,
                    moving:true
                },
                context:null,//上下文
                data:item//数据
            }
        },
        /**
         * 添加一个元素事件
         * @param {object} item 节点对象
         * @param {number} x    插入X点
         * @param {number} y    插入Y点
         */
        addItemPushEvent(item,x,y){
            var item=JSON.parse(JSON.stringify(item));
            item.portalItemX=x;
            item.portalItemY=y;
            var insertItem={};
            insertItem[Object.keys(this.portalItemLayout).length]=this.sortingPortalItem(item);
            this.portalItemLayout=Object.assign({},this.portalItemLayout,insertItem);
            // console.log(item, this.portalItemLayout)
            this.synPortalItem();
        },
        //删除一项事件
        delItemPushEvent(item){
            var keys=Object.keys(this.portalItemLayout);
            keys.forEach(keys=>{
                if(this.portalItemLayout[keys]==item){
                    this.portalItemLayout[keys]=null;//删除一个门户项
                }
            });
            this.synPortalItem();
        },
        //同步门户项
        synPortalItem(){
            this.portalItemList.forEach(portalItem=>{
                var keys=Object.keys(this.portalItemLayout);
                if(!portalItem.isRepeat){
                    var hidden=false;
                    keys.forEach(keys=>{
                        var item=this.portalItemLayout[keys];
                        if(!item)return;
                        if(item.data.id===portalItem.id){
                            hidden=true;
                        }
                    })
                    portalItem.hidden=hidden;
                }
            });
            this.$emit("onUpdateIconTabBarEvent");//更新图标控制器
        },
        //还原原来的布局
        onReductionItemEvent(){
            this.sortingAllData(originalPortalItemLayout);
            this.eventBus.$emit("onAutoFullEvent");//自动填充布局
        },
        onIconDragstartEvent(){
            this.showEmpty=false;
        },
        onWindowResize() {
            var indexBodyFrame = this.$el.querySelector(".indexBodyFrame");
            // var indexBodyFrameMinHeight = window.document.documentElement.clientHeight - this.webUiInfo.header.height;
            var indexBodyFrameMinHeight = window.document.documentElement.clientHeight;
            indexBodyFrameMinHeight = indexBodyFrameMinHeight - (this.editMode ? 100 : 0);
            // if (indexBodyFrame) {
            //     indexBodyFrame.style.minHeight = (indexBodyFrameMinHeight + 200) + "px";
            //     indexBodyFrame.style.height = (indexBodyFrameMinHeight + 200) + "px";
            // }
            var sessionWidth = window.document.documentElement.offsetWidth;
            sessionWidth = sessionWidth<1280?1280:sessionWidth;
            // console.log(sessionWidth)
        },
        timeUpdate() {
            var time = new Date();
            this.dataTimeInfo.date = time.format("yyyy.MM.dd");
            this.dataTimeInfo.time = time.format("hh:mm:ss");
            this.dataTimeInfo.week = "星期" + "日,一,二,三,四,五,六".split(",")[time.getDay()];
        },
        //获取首页内容高度
        getContentBodyHeight(val){
            // console.log(val);
        }
    },
    beforeDestroy() {
        clearInterval(this.dataTimeInfo.timeId);
        this.eventBus.$off("onIconDragstartEvent",this.onIconDragstartEvent);
        this.eventBus.$off("addItemPushEvent",this.addItemPushEvent);
        this.eventBus.$off("delItemPushEvent",this.delItemPushEvent);
        // window.removeEventListener("resize", this.onWindowResize);
        document.getElementById('workBenchNew') && document.getElementById('workBenchNew').removeEventListener("resize", this.onWindowResize, true);
        this.$eventBus && this.$eventBus.$emit('webHeaderFixedEvent',false,'index');
    },
    watch: {
        editMode(newValue) {
            this.onWindowResize();
        },
        portalItemLayout:{
            handler(newValue){
                if(this.$route.query.edit) {
                    this.showEmpty = false;
                } else {
                    var showEmpty=true;
                    Object.keys(newValue).forEach(key=>{
                        var item=newValue[key];
                        if(item){
                            return showEmpty=false;
                        };
                    });
                    this.showEmpty=showEmpty;
                }
            }
        }
    },
}
</script>

