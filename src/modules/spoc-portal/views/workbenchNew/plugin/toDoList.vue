<style lang="less">
@import "./libs/public.less";
.to-do-list-plugin-wrapper {
    background-color: #fff;
    .ivu-tabs-nav-scrollable{
        padding: 0 32px;
    }
    .ivu-tabs-bar{
        margin-bottom: 0;
    }
    .lists{
        padding: 10px 16px 30px;
    }
    .item{
        @h: 34px;
        position: relative;
        height: @h;line-height: @h;
        padding-left: 36px;
        & > i{
            position: absolute;left: 5px;top: 0px;
            color: #9B9B9B;font-size: 16px;
        }
    }
    .lists-inner{
        @right: 100px;
        position: relative;padding-right: @right + 10px;
        float: left;max-width: ~"calc(100% - 36px)";
        height: 100%;
        a{
            position: absolute;right: 0;top: 0;width: @right;
        }
        div{
            display: block;
        }
    }
    .ivu-tabs-nav .ivu-tabs-tab{
        // margin-right: 0;
        padding-left: 12px;padding-right: 12px;
    }
    .rlpw-page{
        padding:0 16px;
        display: inline-block;
        text-align: right;
        position: absolute;
        width:200px;
        // top:-5px;
        bottom: 10px;
        right:0;
        z-index: 2;
        div{
            .icon{
                &.active{
                    color:#44BCB7;
                    cursor:pointer;
                }
                color:#495960;
                cursor: default;
                font-size: 28px;
                margin-bottom:-9px;
            }

        }
    }
    .ivu-badge-count {
        background: #f66;
    }
}
</style>

<template>
<plugin-template class="to-do-list-plugin-wrapper" 
    :style="{backgroundImage:`url(${require('../../../assets/img/workbenchNew/bg_todo.png')})`}"
    :mode="mode" :data="data" :dataLength="dataLength"
    @loadData="loadData"
    @onButtonClick="onButtonClick"
    @init="init">
    <!-- start -->
    <Tabs :value="tabVal" @on-click="changeTabs" v-if="JSON.stringify(lists) != '{}'">
        <TabPane 
            :label="computedLabel(tab.label, tab.value)" 
            :name="tab.value" 
            v-for="(tab,index) in com_todo_type" 
            v-if="keys.indexOf(tab.value) > -1"
            :key="index">
        </TabPane>
    </Tabs>
    <div class="lists">
        <div class="item" v-for="(item, index) in showLists" :key="item.id"
            v-if="(index + 1) >= (pageNo - 1) * pageSize + 1 && (index + 1) <= (pageNo - 1) * pageSize + pageSize">
            <i class="iconfont icon-xingzhuang"></i>
            <div class="lists-inner">
                <!--  theme="light" -->
                <Tooltip max-width="300" transfer :content="getContent(item.toContent)">
                    <p class="oneLine">{{getContent(item.toContent)}}</p>
                </Tooltip>
                <a @click="toDetail(item)">{{getLink(item.toContent)}}</a>
            </div>
        </div>
    </div>
    <div class="rlpw-page" v-if="dataLength">
        <div>
            <Icon class="icon" :class="{active: pageNo>1 && pageNo <= pages}" style="margin-right:5px;" type="ios-arrow-dropleft" @click="prev"/>
            <Icon class="icon" :class="{active: pageNo>=1 && pageNo < pages}" type="ios-arrow-dropright" @click="next"/>
        </div>
    </div>
    <Modal
        v-model="sendModal"
        title="是否确定推送"
        ok-text="确认推送"
        cancel-text="再看看"
        @on-ok="send"
        @on-cancel="cancel">
        <p>点击确认后，将推送本课次的教学内容和服务内容给家长端小程序？</p>
    </Modal>
    <!-- end -->
</plugin-template>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 插件 - 待办事项
 */
import MODE from "./mode.js";
import valid, { errors, sysDict, common } from '../../../libs/request.js';
import { jxLesson } from '../../../../spoc-hootie-web/src/libs/request.js';
import pluginTemplate from './components/template.vue'
import { waitUntil } from "@public/libs/util";
import { mapMutations, mapState } from "vuex";
export default {
    components: {
        pluginTemplate
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
            com_todo_type: [],
            tabVal: '',
            keys: [],
            lists: {},
            showLists: [],
            officeId: '',
            sendModal: false,
            lessonId: '',
            pageNo: 1,
            pageSize: 5,
            pages: 1,
        }
    },
    computed: {
        ...MODE,
        ...mapState(["app"]),
    },
    mounted() {
        waitUntil(
            () => {
                if (this.app.currOfficeId) this.officeId = this.app.currOfficeId;
                return this.app.currOfficeId
            },
            () => {
                this.batchListData();
            }
        );
    },
    methods: {
        computedLabel(label, value) {
            // console.log(this.lists, label, value)
            return (h) => {
                return h('div', [
                    h('span', {
                        style: {
                            marginRight: '4px'
                        }
                    }, label),
                    h('Badge', {
                        props: {
                            count: this.lists[value].length
                        }
                    })
                ])
            }
        },
        changeTabs(name) {
            if(name != this.tabVal) {
                this.pageNo = 1;
                this.tabVal = name;
                this.showLists = this.lists[this.tabVal];
                this.pages = this.showLists && this.showLists.length ? Math.ceil(this.showLists.length / this.pageSize) : 1;
            }
        },
        batchListData() {
            // 获取字典项
            let types = [
                'com_todo_type', // 转介绍类型
            ]
            sysDict.batchListData({types: types.join(',')})
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    this.com_todo_type = _data.com_todo_type;
                    this.loadData();
                }
            })
            .catch(errors.call(this))
        },
        //加载数据
        loadData(type) {
            this.keys = [];
            let params = {
                officeIds: [this.officeId]
            }
            common.comTodoTodoTypeMap(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    if(_data && JSON.stringify(_data) != '{}') {
                        this.dataLength = true;
                    } else this.dataLength = false;
                    this.lists = _data;
                    for (let key in _data) {
                        this.keys.push(key)
                    }
                    if(type) this.tabVal = type;
                    else {
                        for (let i = 0; i < this.com_todo_type.length; i++) {
                            let current = this.com_todo_type[i];
                            // console.log(current.value, this.keys, this.keys.indexOf(current.value))
                            if(this.keys.indexOf(current.value) > -1) {
                                this.tabVal = current.value;
                                break; 
                            }
                        }
                    }
                    this.showLists = _data[this.tabVal];
                    this.pages = this.showLists && this.showLists.length ? Math.ceil(this.showLists.length / this.pageSize) : 1;
                }
            })
            .catch(errors.call(this))
        },
        init() {
            this.$emit("init", this);
        },
        onButtonClick(str) {
            this.$emit('onButtonClick', str);
        },
        getContent(txt) {
            let _arr = txt.split('，');
            _arr.pop();
            let newStr = _arr.join('，');
            return newStr;
        },
        getLink(txt) {
            let _arr = txt.split('，').pop();
            return _arr;
        },
        toDetail(item) {
            let _arr = item.toUrl.split(':');
            let _keyValueLists = _arr.pop().split('&');
            let _keyVal = {
                modalType:  _arr[1]
            };
            _keyValueLists.forEach(i => {
                _keyVal[i.split('=')[0]] = i.split('=')[1];
            });
            // console.log(_arr, _keyVal)
            // 待推送，在本页弹窗
            if(_arr[0] == 'hootie.myCourse' && _arr[1] == 'send') {
                // console.log(_keyVal)
                this.lessonId = _keyVal.lessonId;
                this.sendModal = true;
            } else {
                // 其他的，路由跳转
                this.$router.push({
                    name: _arr[0],
                    query: _keyVal
                });
            }
        },
        send() {
            let type = 'todo jx un send';
            let length = this.lists[type].length;
            let params = {
                lessonId: this.lessonId
            }
            jxLesson.send(params).then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    if(length > 1) this.loadData(type);
                    else this.loadData();
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        cancel() {
            // 进我的课程页
            this.$router.push({
                name: 'hootie.myCourse'
            });
        },
        prev() {
            if(this.pageNo > 1 && this.pageNo <= this.pages) this.pageNo--;
        },
        next() {
            if(this.pageNo >= 1 && this.pageNo < this.pages) this.pageNo++;
        },
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal) {
                this.officeId = this.app.currOfficeId;
                this.loadData();
            }
        }
    }
}
</script>
