<style lang="less">
@import "./libs/public.less";
.announcement-plugin-wrapper{
    // background-image: url("../../../assets/img/workbenchNew/bg_msg.png");
    background-color: #fff;
    .message-lists{
        padding: 0 20px 11px 24px;
        .messagePage{
            display: flex;
            justify-content: flex-end;
        }
        .rlpw-page{
            padding:0 16px;
            display: inline-block;
            text-align: right;
            width:100px;
            div{
                .icon{
                    &.active{
                        color:#44BCB7;
                        cursor:pointer;
                    }
                    color:#999;
                    cursor: default;
                    font-size: 28px;
                    margin-bottom:-9px;
                }

            }
        }
    }
    .message-item{
        display: flex;
        height: 40px;
        color: #999;
        align-items: center;
        /* &.new-msg{
            color: #495060;
            .icon{
                background: @themeColor;
            }
        } */
        .icon{
            line-height: 18px;
            text-align: center;
            width: 56px;
            height: 18px;
            color: #ffffff;
            font-size: 12px;
            border-radius: 4px;
            background-color: rgba(30, 84, 240, 0.5);
            margin-right: 10px;
        }
        .text{
            line-height: 44px;cursor: pointer;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            flex: 1;
            display: block;
        }
        .createByDateAndAuthor{
            display: flex;
            .createByDate{
                line-height: 44px;
                display: block; 
                width: 40px;
                overflow: hidden;
            }
            .author{
                display: block;
                width: 110px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                line-height: 44px;
            }
        }
    }
    .marquee_box {
        display: block;
        position: relative;
        height: 40px;
        overflow: hidden;
        padding-left: 44px;background: #F5F7FA;
        & > i, & > img{
            position: absolute;left: 21px;top: 12px;
            line-height: 1;
            color: #999;
        }
        & > img{
            width: 24px;top: 7px;left: 16px;
        }
    }

    .marquee_list {
        display: block;
        position: absolute;
        top: 0;left: 44px;right: 0;
        li{
            position: relative;
            height: 40px;
            line-height: 40px;
            font-size: 14px;padding-right: 80px;
            cursor: pointer;
            div{
                height: 40px;
                overflow: hidden;
            }
            .typeName{
                position: absolute;right: 20px;top: 0;
                width: 60px;
                text-align: right;
            }
        }
    }
    .marquee_top {
        transition: all 0.5s;
        margin-top: -40px
    }
}
</style>
<template>
<plugin-template class="announcement-plugin-wrapper"
    :style="{backgroundImage:`url(${require('../../../assets/img/workbenchNew/bg_msg.png')})`}"
    :mode="mode" :data="data" :dataLength="dataLength"
    :needMore="false"
    @clickMore="clickMore" @loadData="loadMessage"
    @onButtonClick="onButtonClick"
    @init="init">
    <!-- <div class="marquee_box">
        <img src="../../../assets/img/workbenchNew/announcement.gif" alt="">
        <ul class="marquee_list" :class="{'marquee_top':animate}">
            <li v-for="(item, index) in marqueeList" :key="index" @click="goDetail(item)">
                <div v-html="item.title"></div>
                <span class="typeName">{{item.typeName}}</span>
            </li>
        </ul>
    </div> -->
    <div class="message-lists">
        <!-- <div class="message-item" :class="{'new-msg': item.read == '0'}" v-for="(item,index) in messageData" v-if="index < 4" :key="index" @click="goDetail(item)"> -->
        <div class="message-item" v-for="(item,index) in messageData" :key="index" @click="goDetail(item)">
            <div class="icon">{{item.typeName}}</div>
            <div class="text oneLine" :title="item.title">{{item.title}}</div>
            <div class="createByDateAndAuthor">
                <div class="createByDate">{{item.sendTime}}</div>
                <div class="author" :title="item.createByName">{{$t('modules_spoc_portal_views_workbenchnew_plugin_announcement_4336', [item.createByName])}}</div>
            </div>
        </div>
        <div class="messagePage" v-show="pages>1">
            <div class="rlpw-page">
                <div>
                    <Icon
                            class="icon"
                            :class="{active: pageNo>1 && pageNo <= pages}"
                            style="margin-right:5px;"
                            type="ios-arrow-dropleft"
                            @click="prev"/>
                    <Icon
                            class="icon"
                            :class="{active: pageNo>=1 && pageNo < pages}"
                            type="ios-arrow-dropright"
                            @click="next"
                    /></div>
            </div>
        </div>
    </div>
    <detail-announcement ref="detailAnnouncementRef" @close="loadMessage"></detail-announcement>
</plugin-template>
</template>

<script>
/**
 * @author: 曹见芳
 *  插件 - 公告栏
 */
import MODE from "./mode.js";
import valid, { errors, common } from '../../../libs/request.js';
import pluginTemplate from './components/template.vue'
import detailAnnouncement from '../../../../spoc-core-web/src/views/announcement/detail.vue'
export default {
    components: {
        pluginTemplate, detailAnnouncement
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
    },
    data() {
        return {
            dataLength: false,
            messageData:[],//消息数据
            animate: false,
            marqueeList: [],
            pageNo: 1,
            pages:0,
        }
    },
    computed:{
        ...MODE,
    },
    created(){
        
    },
    mounted() {
        this.loadMessage();
    },
    methods: {
        prev() {
            // console.log(this.pageNo)
            // console.log(this.pageNo>1 && this.pageNo <= this.pages)
            if(this.pageNo>1 && this.pageNo <= this.pages){
                this.pageNo--
                this.loadMessage()
            }
        },
        next() {
            // console.log(this.pageNo>=1 && this.pageNo < this.pages)
            // console.log(this.pages)
            if(this.pageNo>=1 && this.pageNo < this.pages){
                this.pageNo++
                this.loadMessage()
            }
        },
        loadSysMessage(){
            let params = {
                pageNo: 1,
                pageSize: 0,
                isAll: '0',
                types :["sys_announcement"]
            };
            common.comAnnouncementListPage(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.marqueeList = res.data.data.list;
                    setInterval(this.showMarquee, 5000)
                } else {
                    this.marqueeList = [];
                }
            })
            .catch(errors.call(this))
        },
        showMarquee: function () {
            // 滚动效果
            this.animate = true;
            setTimeout(()=>{
                this.marqueeList.push(this.marqueeList[0]);
                this.marqueeList.shift();
                this.animate = false;
            },500)
        },
        goDetail(item){
            //消息变已读
            // if (item.read == '0') {
            //     this.updateRead(item.id);
            // } else {
                this.$refs.detailAnnouncementRef.show(item.id);
            // }
        },
        updateRead(id) {
            let params = {
                idList: [id],
                status: '1'
            }
			this.$refs.detailAnnouncementRef.show(id);
            /*common.comAnnouncementUpdateRead(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    
                }
            })
            .catch(errors.call(this))*/
        },
        //加载消息数据
        loadMessage(){
            let params = {
                pageNo: this.pageNo,
                pageSize: 5,
                isAll: '0',
                types :["sys_announcement","inform_announcement","transfer_announcement"]
            };
            common.comAnnouncementListPage(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let result = res.data.data;
                    this.messageData = result.list;
                    this.pageNo = result.pageNum;
                    this.pages = result.pages;
                    this.dataLength = result.list && result.list.length ? true : false;
                } else {
                    this.messageData = [];
                    this.dataLength = false;
                }
            })
            .catch(errors.call(this))
        },
        //点击更多
        clickMore(){
            this.$router.push({
                name: 'core.announcement',
            });
        },
        init() {
            this.$emit("init", this);
        },
        onButtonClick(str) {
            this.$emit('onButtonClick', str);
        }
    }
}
</script>
