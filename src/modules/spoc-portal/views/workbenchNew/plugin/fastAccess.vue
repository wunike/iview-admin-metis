<style lang="less">
@import "./libs/public.less";
.fast-access-plugin-wrapper {
    // background-image: url("../../../assets/img/workbenchNew/bg_fastAccess.png");
    background-color: #fff;
    background-size: 100% 100%;
    .fast-access-lists{
        @w: 60px;
        li{
            float: left;
            width: 25%;
            height: 106px;
            &:hover{
                color: rgba(255,255,255,.8);
            }
        }
        .inner{
            width: @w;cursor: pointer;margin: 0 auto;
            line-height: 46px;font-size: 12px;
            text-align: center;color: #fff;font-weight: bold;
        }
        img{
            display: block;width: 28px;
            position: absolute; top: 50%;left: 50%;transform: translate(-50%,-50%);
        }
        .img-box{
            position: relative;
            width: @w;height: @w;
            background: url("../../../assets/img/workbenchNew/fast-access-bg.png") no-repeat top center;
            background-size: cover;
        }
    }
}
.edit-fast-access{
    @h: 72px;
    .ivu-modal-body{
        padding-bottom: 4px;
    }
    .item{
        position: relative;
        padding-left: 82px;
        overflow: hidden;
        &.top{
            min-height: @h + 1px;
            margin-bottom: 20px;
            border-bottom: 1px solid #D9D9D9;
        }
        .tips{
            color: #D0021B;line-height: @h;
        }
    }
    .title {
        position: absolute;left: 0;top: 0;
        line-height: @h;
    }
    .lists{
        .clear();
        margin-right: -16px;
        & > div{
            float: left;margin-right: 16px;margin-bottom: 20px;
            height: @h;width: @h;
            border: 1px solid #E6E7EB;
        }
    }
}
</style>

<template>
<plugin-template class="fast-access-plugin-wrapper" 
    :style="{backgroundImage:`url(${require('../../../assets/img/workbenchNew/bg_fastAccess.png')})`}"
    :mode="mode" :data="dataCopy" :dataLength="dataLength" 
    :needMore="true"
    titleColor="white"
    @clickMore="clickMore" @loadData="loadData"
    @onButtonClick="onButtonClick"
    iconName="md-settings"
    @init="init">
    <!-- start -->
    <div class="fast-access-lists">
        <ul v-if="cardCheckIds && cardCheckIds.length">
            <li v-for="item in listsAll" 
                :key="item.id" 
                v-if="cardCheckIds.indexOf(item.id) > -1">
                <div class="inner" @click="toDetail(item)">
                    <div class="img-box">
                        <img :src="item.icon" alt="">
                    </div>
                    <div>{{item.title}}</div>
                </div>
            </li>
        </ul>
        <ul v-else>
            <li>
                <div class="inner">
                    <div class="img-box"></div>
                    <div>暂无</div>
                </div>
            </li>
        </ul>
    </div>
    <Modal v-model="editFastAccess"
        width="818"
        title="编辑快捷操作"
        class-name="edit-fast-access"
        :loading="loading"
        @on-ok="saveFastAccess"
        @on-cancel="cancel">
        <div class="item top">
            <div class="title">已选功能：</div>
            <div class="lists" v-if="checkIds && checkIds.length">
                <fast-access-item
                    v-for="(top, index) in listsAll" 
                    :key="index" 
                    v-if="checkIds.indexOf(top.id) > -1"
                    :checked="true"
                    :data="top"
                    @onDel="onDel">
                </fast-access-item>
            </div>
            <div class="tips" v-else>请到下方选择您的快捷操作。</div>
        </div>
        <div class="item" v-for="(cards, index) in lists" :key="index">
            <div class="title">{{cards.title}}：</div>
            <div class="lists">
                <fast-access-item 
                    v-for="(card, index) in cards.lists" 
                    v-if="checkIds.indexOf(card.id) == -1"
                    :key="index" 
                    :data="card"
                    @onAdd="onAdd">
                </fast-access-item>
            </div>
        </div>
    </Modal>
    <!-- end -->
</plugin-template>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 插件 - 快捷操作
 */
import MODE from "./mode.js";
import valid, { errors, sysAttachment, sysMenu, sysUser } from '../../../libs/request.js';
import pluginTemplate from './components/template.vue'
import fastAccessItem from './components/fastAccessItem.vue'
import { mapMutations, mapState } from "vuex";
import { waitUntil } from "@public/libs/util";
export default {
    components: {
        pluginTemplate, fastAccessItem
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
            loading: true,
            dataLength: true,
            editFastAccess: false,
            lists: [],
            listsAll: [],
            checkIds: [],
            cardCheckIds: [],
            idNameArr: [],
            dataCopy: {},
            checkIdsCopy: [],
            over: false,
            listsAllOver: false,
        }
    },
    computed: {
        ...MODE
    },
    
    mounted() {
        this.over = false;
        this.listsAllOver = false;
        this.getMenuList();
        this.dataCopy = Object.assign({}, this.data);
        this.initLists();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        init() {
            this.$emit("init", this);
        },
        //加载数据
        initLists() {
            if(this.$route.query.protalTplId) {
                this.over = true;
                this.setDataCheckids();
            } else {
                this.findMenuByMenuIds();
            }
        },
        setDataCheckids() {
            // this.checkIds = this.dataCopy.itemContent ? this.dataCopy.itemContent.split(',') : [];
            // this.checkIdsCopy = this.dataCopy.itemContent ? this.dataCopy.itemContent.split(',') : [];
            this.filterCheckIds(this.dataCopy.itemContent ? this.dataCopy.itemContent.split(',') : []);
            // 非弹窗数据
            this.cardCheckIds = this.data.itemContent ? this.data.itemContent.split(',') : [];
            // this.dataLength = this.cardCheckIds && this.cardCheckIds.length ? true : false;
        },
        filterCheckIds(arr) {
            // 过滤
            if(arr && arr.length) {
                waitUntil(
                    () => {
                        return (this.listsAllOver && this.over) || false
                    },
                    () => {
                        if(this.listsAll && this.listsAll.length) {
                            let allIds = [];
                            this.listsAll.forEach(item => {
                                allIds.push(item.id)
                            });
                            let arrFinish = [];
                            arr.forEach(item => {
                                if(allIds.indexOf(item) > -1) {
                                    arrFinish.push(item)
                                }
                            });
                            // console.log(allIds, arrFinish, arr, this.listsAll)
                            this.checkIds = [...arrFinish];
                            this.checkIdsCopy = [...arrFinish];
                        }
                    }
                );
            } else {
                this.checkIds = [];
                this.checkIdsCopy = [];
            }
        },
        findMenuByMenuIds() {
            sysMenu.findMenuByMenuIds({})
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    let _arr = [];
                    if(_data && _data.length) {
                        _data.forEach(list => {
                            _arr.push(list.id)
                        });
                        // this.checkIds = [..._arr];
                        // this.checkIdsCopy = [..._arr];
                        this.filterCheckIds(_arr);
                        this.cardCheckIds = [..._arr];
                        // this.dataLength = true;
                    } else {
                        this.setDataCheckids();
                    }
                    this.over = true;
                }
            })
            .catch(errors.call(this))
        },
        getMenuList() {
            sysMenu.listGrantAllMenu().then(valid.call(this)).then(res => {
                if (res.ok) {
                    //获取菜单权限开始
                    let _data = res.data.data,
                        _children = _data.children,
                        _favoMap = _data.favoMap;
                    this.idNameArr = [];
                    this.lists = [];
                    _children.forEach(item => {
                        this.idNameArr.push({
                            id: item.id,
                            name: item.meta.title
                        })
                    });
                    for (let key in _favoMap) {
                        let title = this.idNameArr.filter(function(item){
                            return item.id == key; 
                        })[0].name;
                        let _lists = [];
                        if(_favoMap[key] && _favoMap[key].length) {
                            _favoMap[key].forEach(item => {
                                _lists.push({
                                    id: item.id,
                                    title: item.meta.title,
                                    icon: item.meta.icon,
                                    name: item.name,
                                })
                            });
                        }
                        this.lists.push({
                            id: key,
                            title: title,
                            lists: _lists
                        });
                    }
                    this.listsAll = [];
                    this.lists.forEach(list => {
                        this.listsAll = [...this.listsAll, ...list.lists];
                    });
                    this.listsAllOver = true;
                }
            }).catch(errors.call(this))
        },
        onDel(item) {
            // if(this.checkIds.length == 1) {
            //     this.$Message.error('请至少选择1个功能')
            // } else {
                let _id = item.id;
                let _num = this.checkIds.indexOf(_id);
                if(_num > -1) {
                    this.checkIds.splice(_num, 1);
                }
            // }
        },
        onAdd(item) {
            if(this.checkIds.length < 8) {
                this.checkIds.push(item.id);
            } else {
                this.$Message.error('请最多选择8个功能')
            }
        },
        loadData() {
            
        },
        //点击设置
        clickMore(){
            this.checkIds = [...this.checkIdsCopy];
            this.editFastAccess = true;
        },
        saveFastAccess() {
            // this.updateLoadingStatus({ isLoading: true });
            if(this.$route.query.protalTplId) {
                this.dataCopy.itemContent = this.checkIds.join(',');
                this.cancel();
                this.$emit('onUploadFastAccess', this.dataCopy, 'saveFastAccess')
            } else {
                this.updateQuickMenu();
            }
        },
        updateQuickMenu() {
            let params = {
                quickMenus: this.checkIds.join(',')
            }
            sysUser.updateQuickMenu(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.cancel();
                    this.findMenuByMenuIds();
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.changeLoading();
            });
        },
        cancel() {
            this.editFastAccess = false;
        },
        changeLoading() {
            this.loading = false;
            setTimeout(() => {
                this.loading = true;
            }, 0);
        },
        onButtonClick(str) {
            this.$emit('onButtonClick', str);
        },
        toDetail(route) {
            this.$router.push({
                name: route.name,
            });
        },
    },
    watch:{
        data: {
            handler(val, oval) {
                this.dataCopy = Object.assign({}, val);
                this.initLists();
            },
            deep: true
        }
    }
}
</script>
