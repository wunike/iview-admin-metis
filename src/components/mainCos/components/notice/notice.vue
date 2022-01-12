<style lang="less">
.notice {
    .ivu-scroll-loader{
        height: 0;
    }
    .ivu-select-dropdown {
        width: 340px;
        max-height: 500px !important;
        min-height: 150px;
        overflow: auto !important;
    }
    .dropdown_tit {
        font-size: 14px;
        text-align: right;
        line-height: 3;
        padding: 0 16px;
        border-bottom: 1px solid #dcdee2;
    }
    div.ivu-tabs-bar {
        margin-bottom: 0;
    }
    .news_list {
        padding-bottom: 6px;
        max-height: 400px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .news_box {
        padding: 0 16px;
        cursor: pointer;
        &:first-of-type {
            padding-top: 0;
        }
        &:hover{
            background: rgba(0,0,0,.05);
        }
    }
    .news-inner{
        padding: 16px 0;
        border-bottom: 1px solid #dcdee2;
    }
    .news_info {
        font-size: 14px;
        text-align: left;
        line-height: 1.6;
        a {
            color: #44bcb7;
        }
    }
    .news-title{
        @h: 32px;
        height: @h;
        line-height: @h;
        h3{
            float: left;
            font-size: 14px;
        }
        span{
            float: right;
            font-size: 12px;
            color: #999;
        }
    }
    .readed {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 100%;
        span {
            cursor: pointer;
            color: #44bcb7;
        }
    }
}
</style>

<template>
    <div class="notice">
        <Dropdown trigger="click" @on-visible-change="resetNews">
            <div class="notice_box">
                <Badge :dot="unreadList.length"><Icon type="ios-notifications-outline" size="26" style="cursor: pointer;"></Icon></Badge>
            </div>
            <DropdownMenu slot="list" style="width: 350px">
                <div class="dropdown_tit">系统消息</div>
                <Tabs :animated="false">
                    <TabPane label="未读">
                        <div class="news_list">
                            <Scroll :on-reach-bottom="updataUnreadlist">
                                <div class="news_box" v-for="item in unreadList" :key="item.id" @click="seeInfo(item)">
                                    <div class="news-inner">
                                        <div class="news-title">
                                            <h3>{{ item.title }}</h3>
                                            <span>{{ item.showTime }}</span>
                                        </div>
                                        <div class="news_info">
                                            {{ item.content }}
                                        </div>
                                    </div>
                                </div>
                            </Scroll>
                        </div>
                        <div class="readed"><span @click="setRead('')">全部已读</span></div>
                    </TabPane>
                    <TabPane label="已读">
                        <div class="news_list">
                            <Scroll :on-reach-bottom="updataReadlist">
                                <div class="news_box" v-for="item in readList" :key="item.id" @click="seeInfo(item)">
                                    <div class="news-inner">
                                        <div class="news-title">
                                            <h3>{{ item.title }}</h3>
                                            <span>{{ item.showTime }}</span>
                                        </div>
                                        <div class="news_info">
                                            {{ item.content }}
                                        </div>
                                    </div>
                                </div>
                            </Scroll>
                        </div>
                    </TabPane>
                </Tabs>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
import valid, { errors, sys, sysDict, sysMenu, sysUser, sysWorkorder } from '@/modules/spoc-portal/libs/request';
export default {
    name: 'notice',
    data() {
        return {
            pageNo:1,
            unpageNo:1,
            readList: [],
            unreadList: []
        };
    },
    watch: {},
    computed: {},
    mounted() {
        this.getReadlist();
        this.getUnreadList();
    },
    methods: {
        getReadlist() {
            let params = {
                method: 'web',
                readFlag: 1,
                pageNo: 1,
                pageSize: 10
            };
            sys.listUserNotify(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.readList = res.data.data.list;
                    }
                })
                .catch(errors.call(this));
        },
        getUnreadList() {
            let params = {
                method: 'web',
                readFlag: 0,
                pageNo: 1,
                pageSize: 10
            };
            sys.listUserNotify(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.unreadList = res.data.data.list;
                    }
                })
                .catch(errors.call(this));
        },
        setRead(id) {
            let params1 = {
                id: '',
                method: 'web'
            };
            params1.id = id;
            sys.markRead(params1)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.getReadlist();
                        this.getUnreadList();
                    }
                })
                .catch(errors.call(this));
        },
        seeInfo(item) {
            let url = item.stationUrl;
            let name = url.split('?')[0].split(':')[0];
            let params = url.split('?')[1].split('&');
            let obj = {};
            params.forEach(v => {
                obj[v.split('=')[0]] = v.split('=')[1];
            });
            this.$router.push({ name: name, query: obj });
            this.setRead(item.notifyId);
        },
        updataUnreadlist() {
            this.unpageNo++;
            let params = {
                method: 'web',
                readFlag: 0,
                pageNo: this.unpageNo,
                pageSize: 10
            };
            sys.listUserNotify(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if(this.unpageNo<=res.data.data.pages){
                            this.unreadList = this.unreadList.concat(res.data.data.list);
                        }
                    }
                })
                .catch(errors.call(this));
        },
        updataReadlist() {
            this.pageNo++;
            let params = {
                method: 'web',
                readFlag: 1,
                pageNo: this.pageNo,
                pageSize: 10
            };
            sys.listUserNotify(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if(this.pageNo<=res.data.data.pages){
                            this.readList = this.readList.concat(res.data.data.list);
                        }
                    }
                })
                .catch(errors.call(this));
        },
        resetNews(flag){
            if(flag){
                this.pageNo=1;
                this.unpageNo=1;
                    this.getReadlist();
                    this.getUnreadList();
            }
        }
    }
};
</script>
