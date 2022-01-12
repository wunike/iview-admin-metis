<style lang="less">
.dict_left_menu {
    .he-tree {
        padding: 0px 0px 10px 0px;
    }
    .tree-node {
    }
    .tree-node-inner {
        cursor: move;
    }
    .draggable-placeholder {
    }
    .draggable-placeholder-inner {
        border: 1px dashed #0088f8;
        box-sizing: border-box;
        background: rgba(0, 136, 249, 0.09);
        color: #0088f9;
        text-align: center;
        padding: 0;
        display: flex;
        align-items: center;
    }
    height: 100%;
    position: relative;
    .nav {
        background-color: #ffffff;
        height: 100%;
        width: 230px;
        .dictwrapper {
            padding-top: 14px;
            .icon-tianjiajigou {
                color: #999;
                &:hover {
                    color: #495060;
                }
            }
        }
    }
    h2 {
        padding: 0 10px;
        line-height: 24px;
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        i {
            font-size: 14px;
            font-weight: normal;
            cursor: pointer;
        }
    }
    .search {
        height: 46px;
        padding-left: 10px;
        margin-top: 8px;
        position: relative;
        .v-select-wrap {
            width: 184px;
        }
    }
    .select-top {
        @h: 30px;
        width: 36px;
        height: @h;
        line-height: @h;
        font-size: 16px;
        color: #999;
        text-align: center;
        .iconSelect {
            color: #999;
        }
        &:hover {
            .iconSelect {
                color: #495060;
            }
        }
    }
    .ivu-select,
    .select-top {
        position: absolute;
        right: 0;
        top: 0;
    }
    .select-top {
        .ivu-select-dropdown {
            width: 100px !important;
        }
        .ivu-select-selection {
            opacity: 0;
        }
    }
    .dictTree {
        height: ~'calc(100% - 92px)';
        overflow: auto;
        background: #ffffff;
        .tree-clo-box {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 5px 5px 5px 15px;
            height: 46px;
            /*border: 1px solid #dcdee2;*/
            .show_more {
                display: none;
            }
            &:hover {
                background: rgba(0, 136, 249, 0.09);
                .show_more {
                    display: inline-block;
                }
            }
            &.active {
                background: rgba(0, 136, 249, 0.3);
            }
            .treeTit {
                font-size: 12px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                line-height: 14px;
                flex: 1;
                padding-top: 2px;
            }
        }
    }
    .v-select-wrap .select-able {
        .main-input {
            background: #fff;
            border-color: #fff;
            padding-right: 8px;
            padding-left: 32px;
            text-align: center;
        }
        .icon-right {
            right: auto;
            left: 15px;
            font-size: 16px;
        }
    }
    .popmenu {
        position: absolute;
        top: 0;
        right: -190px;
        width: 230px;
        background-color: #fff;
        box-shadow: 0 0 9px rgba(200, 200, 200, 0.5);
        padding: 1.8em 0;
        z-index: 80;
        ul {
            & > li {
                text-indent: 2em;
                height: 30px;
                line-height: 30px;
                cursor: pointer;
                &:hover {
                    background-color: #e6e6e6;
                }
            }
        }
    }
    .titleSelect {
        position: relative;
        height: 30px;
        width: 184px;
        .iconSearch {
            position: absolute;
            right: 2px;
            top: 2px;
            z-index: 9;
            font-size: 16px;
            width: 30px;
            bottom: 0;
            line-height: 26px;
            cursor: pointer;
            background: #fff;
            text-align: center;
            color: #999;
            &:hover {
                i {
                    color: #000;
                }
            }
        }
    }
}

.editType {
    li {
        @w: 200px;
        height: 55px;
        line-height: 35px;
        position: relative;
        padding-left: @w;
        span {
            position: absolute;
            left: 0;
            top: 0;
            width: @w;
            text-align: right;
            font-size: 14px;
            color: #999;
        }
        input {
            width: 306px;
            height: 35px;
            font-size: 16px;
        }
        p {
            line-height: 20px;
        }
    }
    .ivu-modal-body {
        padding: 0;
        padding-top: 20px;
    }
}
</style>

<template>
    <div class="dict_left_menu">
        <div class="nav nav-toggle">
            <!--<user-banner :info="userInfo"></user-banner>-->
            <div class="item-wrapper dictwrapper" ref="scrollWrap">
                <h2>
                    字典管理
                    <i class="iconfont icon-tianjiajigou" @click="addTreeType"></i>
                </h2>
                <div class="search">
                    <div class="titleSelect">
                        <span class="iconSearch" @click.stop="textChange"><Icon type="ios-search" /></span>
                        <Select value="" filterable ref="search" @on-change="checkTitle" @on-query-change="textQueryChange">
                            <Option v-for="item in orgDataBackups" :value="item.id" :key="item.id" v-if="item.id">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <span class="select-top">
                        <!--<span class="iconfont icon-shaixuanguolv iconSelect"></span>-->
                        <!--icon-wangxin-->
                        <CommonIcon type="_wangxin" :size="14" class="iconSelect" />
                        <Select value="" @on-change="choiceMenu" class="filter">
                            <Option v-for="item in menuList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </span>
                </div>
            </div>
            <div class="dictTree">
                <!--<stree :data="orgData" :curr="curr" :menu="org_edit" @item-click="itemClick" @menu-click="menuClick"></stree>
				<div class="popmenu" :style="{top:menu.top}" v-show="menu.show">
					<ul>
						<li @click.stop="modify">修改</li>
					</ul>
				</div>-->
                <stree :data="orgData" :space="0" draggable @drag="drag" @change="changeTree">
                    <div slot-scope="{ data, store }">
                        <template v-if="!data.isDragPlaceHolder">
                            <div class="tree-clo-box" :class="$route.query.type == data.value ? 'active' : ''">
                                <!--<b v-if="data.children && data.children.length" @click="store.toggleOpen(data)"><Icon type="ios-arrow-up" :size="14" v-if="data.open"/><Icon type="ios-arrow-down" :size="14" v-else/>&nbsp;</b>
								<b v-else style="width: 18px;display: inline-block;"></b>-->
                                <span class="treeTit" @click="itemClick(data)">{{ data.label }}</span>
                                <Dropdown placement="right-start" @on-click="alterDropdown(data, $event)" inner trigger="click" class="show_more">
                                    <a href="javascript:void(0)"><Icon type="ios-more" :size="26" color="#101010" /></a>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="alter">修改</DropdownItem>
                                        <DropdownItem name="del">删除</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </template>
                    </div>
                </stree>
            </div>
        </div>

        <Modal class="editType" v-model="editType" width="600" :title="titleTreeType">
            <ul>
                <li>
                    <span>中文分类名称：</span>
                    <Input v-model="editObj.label" @on-blur="validType1()" />
                    <p><i style="font-style: normal;color: #FF0000;" v-show="isLabelError">该项不能为空</i></p>
                </li>
                <li>
                    <span>英文分类名称：</span>
                    <Input v-model="editObj.value" :disabled="titleTreeType == '修改分类'" @on-blur="validType2()" />
                    <p><i style="font-style: normal;color: #FF0000;" v-show="isvalueError">该项不能为空</i></p>
                </li>
            </ul>
            <div slot="footer">
                <Button @click="closeEditType()">取消</Button>
                <Button type="primary" @click="editTreeType()">确定</Button>
            </div>
        </Modal>
        <!--<slide-toggle @status-change="statusChange"></slide-toggle>-->
        <Modal v-model="delDictModal" title="提示" @on-ok="delDictList" class-name="vertical-center-modal"><p>确定删除当前数据？</p></Modal>
    </div>
</template>

<script>
//	import slideToggle from '_c/common/slideToggle';
import { DraggableTree } from 'vue-draggable-nested-tree';
import userBanner from '_c/common/userBanner';
import { mapState, mapMutations } from 'vuex';
import CommonIcon from '_c/common-icon';
//	import stree from './tree/tree';
import valid, { errors, sysMenu, sysDict } from '../libs/request';
import treeVue from './tree/tree.vue';

export default {
    data() {
        return {
            state: {
                item: {
                    id: 0
                }
            },
            compact: '',
            orgData: [],
            orgDataBackups: [],
            model1: 'all',
            editType: false,
            initMenuID: 0,
            isLabelError: false,
            isvalueError: false,
            notclick: false,
            queryValue: '',
            editObj: {
                menuId: '',
                id: '',
                label: '',
                value: ''
            },
            org_edit: true,
            menu: {
                top: '0px',
                show: false
            },
            menuList: [],
            isClick: true,
            titleTreeType: '修改分类',
            delMenuID: '',
            delDictModal: false
        };
    },
    computed: {
        ...mapState(['userInfo']),
        curr() {
            if (this.$route.query.id) {
                return {
                    id: this.$route.query.id
                };
            }
            return this.state.item;
        }
    },
    components: {
        userBanner,
        //			slideToggle,
        CommonIcon,
        stree: DraggableTree
    },
    created() {
        this.getTree(this.resetInitFocus);
    },
    deactivated() {
        this.hideMenu();
    },
    mounted() {
        document.addEventListener('click', this.hideMenu, false);
        this.getMeunIndex();
    },
    beforeDestroy() {
        document.removeEventListener('click', this.hideMenu);
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getMeunIndex() {
            // 获取根节点级菜单列表
            sysMenu
                .listMenu({})
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.menuList = res.data.data;
                        this.menuList.unshift({
                            name: '全局公共',
                            id: -1
                        });
                        this.menuList.unshift({
                            name: '全部',
                            id: 'all'
                        });
                    }
                })
                .catch(errors.call(this));
        },
        choiceMenu(id) {
            // 获取id
            // let meunId = id;
            this.initMenuID = id;
            if (id == -1) {
                this.initMenuID = '0';
            }
            if (id == 'all') {
                this.initMenuID = '';
            }
            this.getTree(this.resetInitFocus, this.initMenuID);
            let cump = this.menuList.filter(list => {
                return list.id == id;
            })[0];
            // console.log(cump);
            this.$emit('changTitle', cump);
        },
        modify() {
            this.hideMenu();
            this.editType = true;
        },
        nullCallBack() {},
        editTreeType() {
            this.validType();
            if (this.isLabelError || this.isvalueError) {
                return false;
            }
            // 修改树
            let params = this.editObj;
            // console.log(params)
            sysDict
                .saveType(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.editType = false;
                        this.getTree(this.nullCallBack, this.initMenuID);
                    }
                })
                .catch(errors.call(this));
        },
        autoInitFocus() {
            if (!this.$route.query.id && this.orgData[0]) {
                this.itemClick(this.orgData[0]);
            } else {
                this.$emit('emptyLists');
            }
        },
        resetInitFocus() {
            if (this.orgData[0]) {
                this.itemClick(this.orgData[0]);
            } else {
                this.$emit('emptyLists');
            }
        },
        getTree(callback, id) {
            console.log(id);
            let params = {
                type: 'root',
                menuId: id || ''
            };
            //				if(id) {
            //					params = {
            //						type: 'root',
            //						menuId: id||0
            //					}
            //				}
            sysDict
                .DictListDataNew(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let _data = res.data.data;
                        _data.forEach(v => {
                            v.droppable = false;
                        });
                        if (Array.isArray(_data)) {
                            this.$nextTick(() => {
                                this.orgData = _data;
                                this.orgDataBackups = _data;
                                this.$emit('showAddBtn', _data.length);
                                callback && callback();
                            });
                        }
                    }
                })
                .catch(errors.call(this));
        },
        statusChange(status) {
            this.$emit('status-change', status);
        },
        textChange() {
            // 点击search按钮
            if (this.queryValue) {
                this.notclick = true;
                // 开始过滤树一级节点
                this.compact = this.queryValue;
                let newTree = this.orgDataBackups.filter(item => {
                    return item.label.indexOf(this.compact) >= 0;
                });
                this.orgData = newTree;
                this.compact = this.queryValue;
                setTimeout(() => {
                    this.notclick = false;
                }, 0);
            } else {
                // 空
                this.orgData = this.orgDataBackups;
                this.notclick = false;
            }
        },
        textQueryChange(item) {
            // 更改关键字
            this.notclick = false;
            this.queryValue = item;
        },
        checkTitle(id) {
            // 选择下拉菜单的某一项
            if (!this.notclick && id) {
                this.orgData = this.orgDataBackups;
                let cump = this.orgData.filter(list => {
                    return list.id == id;
                })[0];
                // this.itemClick(cump); //点击左侧树
                console.log(cump);
                this.queryValue = cump.label;
                this.textChange();
            }
        },
        itemClick(item) {
            // console.log('itemClick---1')
            // console.log(item)
            if (this.isClick) {
                this.hideMenu();
                this.$router.push({
                    name: 'portal.dictmanage',
                    query: Object.assign({}, this.$route.query, {
                        type: item.value
                    })
                });
                this.$emit('upload', item);
            }
        },
        menuClick(item) {
            // console.log('menuClick')
            this.state.item = item;
            this.editObj.id = item.id;
            this.editObj.label = item.label;
            this.editObj.value = item.value;
            this.editObj.menuId = this.initMenuID;
            //				let top = e.pageY;
            //				if(document.body.offsetHeight - top < 120) {
            //					top = top - 120;
            //				}
            //				this.menu = {
            //					top: `${top+15}px`,
            //					show: true
            //				};
        },
        hideMenu() {
            this.menu.show = false;
        },
        drag() {
            this.isclick = false;
        },
        changeTree(node, targetTree, oldTree) {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.isclick = true;
                }, 1000);
                let arr = [];
                targetTree.data.forEach((v, k) => {
                    arr.push({
                        id: v.id,
                        sort: k + 1
                    });
                });
                //					this.updateLoadingStatus({
                //						isLoading: true
                //					});
                sysDict
                    .sortDict(arr)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            //							let id=this.initMenuID||-1;
                            //							this.choiceMenu(id);
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        //						this.updateLoadingStatus({
                        //							isLoading: false
                        //						});
                    });
            });
        },
        alterDropdown(item, e) {
            if (e == 'alter') {
                this.titleTreeType = '修改分类';
                this.menuClick(item);
                this.modify();
            } else {
                this.delMenu(item.id);
            }
        },
        addTreeType() {
            this.titleTreeType = '新增分类';
            this.editObj.id = '';
            this.editObj.label = '';
            this.editObj.value = '';
            this.editObj.menuId = this.initMenuID;
            this.modify();
        },
        delMenu(id) {
            this.delMenuID = id;
            this.delDictModal = true;
        },
        delDictList() {
            // 删除某一项列表
            let params = {
                id: this.delMenuID
            };
            sysDict
                .DictDelect(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.delDictModal = false;
                        this.getTree(this.resetInitFocus, this.initMenuID);
                        let cump = this.menuList.filter(list => {
                            return list.id == this.initMenuID;
                        })[0];
                        this.$emit('changTitle', cump);
                    }
                })
                .catch(errors.call(this));
        },
        validType() {
            if (this.editObj.label) {
                this.isLabelError = false;
            } else {
                this.isLabelError = true;
            }
            if (this.editObj.value) {
                this.isvalueError = false;
            } else {
                this.isvalueError = true;
            }
        },
        validType1() {
            if (this.editObj.label) {
                this.isLabelError = false;
            } else {
                this.isLabelError = true;
            }
        },
        validType2() {
            if (this.editObj.value) {
                this.isvalueError = false;
            } else {
                this.isvalueError = true;
            }
        },
        closeEditType() {
            this.isvalueError = false;
            this.isLabelError = false;
            this.editType = false;
        }
    }
};
</script>
