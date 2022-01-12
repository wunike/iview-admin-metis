<style lang="less">
.permission-allocation-container{
    .clear {
        zoom: 1;
        &::before, &::after{
            content: "";display: block;clear: both;height: 0;
            line-height: 0;font-size: 0;
        }
    }
    .ivu-modal-body{
        padding: 0;
    }
    .ivu-tabs-bar{
        margin-bottom: 0;
    }
    .ivu-tabs-nav .ivu-tabs-tab{
        padding: 10px 16px;
    }
    .ivu-tabs .ivu-tabs-tabpane{
        position: relative;
        padding: 18px;padding-left: 22px;
    }
    .ivu-radio-wrapper{
        @h: 36px;
        height: @h;line-height: @h;
    }
    .list-permiss{
        float: left;margin-left: 80px - 22px;
        font-size: 14px;
    }
    .list-permiss-select{
        float: left;margin-top: 214px;margin-left: -12px;
    }
    .ivu-select.error .ivu-select-selection{
        border-color: red;
    }
    .iconAdd{
        font-size: 20px;
        color: #999;
        margin-left: 8px;
        cursor: pointer;
        &:hover{
            color: #44bcb7;
        }
    }

}
</style>

<template>
<div>
    <Modal
        title="权限配置"
        v-model="showModal"
        :loading="loading"
        class-name="permission-allocation-container"
        width="800px">
        <!-- <Tabs :value="tabs"> -->
        <Tabs v-model="tabs">
            <TabPane label="菜单功能权限" name="tab1">
                <Row :gutter="14">
                    <Col span="12">
                        <menu-permiss ref="menuPermissPC"
                            :treeData="treeDataPC"
                            @save="saveMenuPermissPC">
                        </menu-permiss>
                    </Col>
                    <Col span="12">
                        <menu-permiss ref="menuPermissAPP"
                            title="APP权限"
                            :treeData="treeDataApp"
                            @save="saveMenuPermissAPP">
                        </menu-permiss>
                    </Col>
                </Row>
            </TabPane>
            <TabPane label="列表数据权限" name="tab2">
                <div class="clear" style="padding-left: 58px">
                    <Select v-model="roleDataScope"
                        style="width:250px"
                        class="list-role-scope-select"
                        @on-change="changeRoleDataScope">
                        <Option v-for="(item, index) in roleDataScopeList"
                            :value="item.menuId"
                            :key="item.menuId"
                            :label="item.menuName">
                        </Option>
                    </Select>
                    <Icon type="md-add-circle" class="iconAdd"  @click="addRoleDataScope()"/>
                    <Icon type="md-remove-circle" class="iconAdd" @click="deleteRoleDataScope()" />
                </div>
                <RadioGroup v-model="listPermiss" @on-change="changePermiss" class="list-permiss">
                    <Radio v-for="item in listPermissList"
                        style="display: block"
                        :key="item.id"
                        :label="item.id">
                        {{ item.name }}
                    </Radio>
                </RadioGroup>
                <Select v-model="idNameModal"
                    style="width:250px"
                    placement="top-start"
                    multiple
                    :disabled="lineId != listPermiss"
                    :style="{ 'margin-top': line * 36 + 1 + 'px' }"
                    :class="[idNameModalError ? 'error' : '']"
                    @on-change="changNameModal"
                    class="list-permiss-select">
                    <Option v-for="item in idNameVOList"
                        :value="item.name"
                        :key="item.id">
                        {{ item.name }}
                    </Option>
                </Select>
            </TabPane>
        </Tabs>
        <div slot="footer">
            <Button @click="btnClose">取消</Button>
            <Button type="primary" @click="btnYes()">确定</Button>
        </div>
    </Modal>
    <Modal
        title="请选择菜单"
        v-model="roleDataScopeModal"
        :loading="loading"
        width="600"
        @on-ok="changeRoleDataScopeLists">
        <Select v-model="remainderDataScope"
            v-if="btnFunction == 'add'"
            style="width:250px" >
            <Option v-for="item in remainderDataScopeLists"
                :value="item.menuId"
                :key="item.menuId">
                {{ item.menuName }}
            </Option>
        </Select>
        <Select v-model="remainderDataScope"
            v-if="btnFunction == 'delete'"
            style="width:250px" >
            <Option v-for="item in roleDataScopeList"
                :value="item.menuId"
                :key="item.menuId">
                {{ item.menuName }}
            </Option>
        </Select>
    </Modal>
</div>
</template>

<script>

/**
 * 权限配置弹窗
 * @author 曹见芳
 */

import menuPermiss from './menuPermiss';
import valid, { errors, sysRole,sysMenu } from "../../../libs/request.js";
import { waitUntil, } from '@public/libs/util';
import { mapMutations } from 'vuex';

export default {
    props: {

    },
    data(){
        return {
            showModal: false,
            tabs: 'tab1',
            roleId: '',
            loading: true,
            listPermiss: '',
            saveListsPc: [],
            saveListsApp: [],
            listPermissList: [],
            idNameVOList: [],
            idNameModal: [],
            treeDataPC: [],
            treeDataApp: [],
            line: 1, // 仅本人数据（限定字段）在第几行，用于定位 select
            lineId: '', //用来标记选择权限字段是否可用
            idNameModalError: false, // 列表选择本人之后，没有选择下拉框，则置为true
            roleDataScopeList: [],
            roleDataScopeListCopy: [],
            roleDataScope: '',
            roleDataScopeModal: false,
            remainderDataScope: '',
            remainderDataScopeLists: [],
            prevMenuId: [],
            btnFunction: '',
            deleteRoleMenuDataScopeList: null
        };
    },
    computed: {

    },
    components: {
        menuPermiss
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        show(id) {
            // 打开弹窗
            this.tabs = 'tab1';
            this.roleId = id;
            this.saveListsPc = [];
            this.saveListsApp = [];
            this.roleDataScopeListCopy = [];
            this.getMenuLists(0);
            this.getMenuLists(1);
            this.getRoleDataScopeList(id);
            this.getDataScopeList();
            this.prevMenuId = [];
            this.roleDataScope = '';
            this.showModal = true;
        },
        getDataScopeList() {
            // 获取数据权限列表
            sysRole.roleGetDataScopeList().then(valid.call(this)).then(res => {
                if(res.ok) {
                    let data = res.data.data;
                    this.listPermissList = data;
                    data.forEach((item, index) => {
                        if(item.idNameVOList.length > 0) {
                            this.idNameVOList = item.idNameVOList;
                            this.line = index;
                            this.lineId = item.id; //用来标记选择权限字段是否可用
                        }
                    });
                }
            }).catch(errors.call(this));
        },
        getRoleDataScopeList(id) {
            let params = {
                id: id
            }
            sysRole.roleGetRoleDataScopeList(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let data = res.data.data;
                    this.roleDataScopeList = data;
                    let arr = [];
                    data.forEach(item => {
                        arr.push(Object.assign({}, item));
                    });
                    this.roleDataScopeListCopy = arr;
                    this.resetData();
                }
            }).catch(errors.call(this));
        },
        getMenuLists(type) {
            // 获取角色权限树
            this.updateLoadingStatus({isLoading:true});
            let params = {
                roleId: this.roleId,
                type: type
            }
            sysMenu.meunLists(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let data = res.data.data.children;
                    if(type == 0) {
                        this.treeDataPC = data;
                        this.computedChild(data, 'saveListsPc');
                    } else {
                        this.treeDataApp = data;
                        this.computedChild(data, 'saveListsApp');
                    }
                }
            }).catch(errors.call(this)).finally(() => {this.updateLoadingStatus({isLoading:false})});
        },
        computedChild(data, type) {
            data.forEach(child => {
                let lists = [];
                this[type].push({
                    id: child.id,
                    lists: []
                })
                if(child.children && child.children.length > 0) {
                    this.findChildren(child.children, child.id, type);
                }
            });
            // console.log(this.saveListsPc, this.saveListsApp)
        },
        findChildren(list, id, type) {
            list.forEach(out => {
                if(out.checked || out.indeterminate) {
                    let lists = this[type].filter(function(item){
                        return item.id == id;
                    })[0].lists;
                    lists.push(out.id);
                    if(out.children && out.children.length > 0) {
                        this.findChildren(out.children, id, type);
                    }
                }
            });
        },
        changePermiss() {
            // 修改列表数据权限
            let data = this.roleDataScopeList.find(item => item.menuId == this.prevMenuId[0]);
            data.dataScope = this.listPermiss;
            this.idNameModalError = false;
            if(this.listPermiss != '8') this.idNameModal = null;
            // console.log(data.dataScope, this.roleDataScopeList[0].dataScope, this.roleDataScopeListCopy[0].dataScope);
        },
        changNameModal() {
            if(this.idNameModal) this.idNameModalError = false;
            else if(this.listPermiss == '8' && !this.idNameModal) this.idNameModalError = true;
            let data = this.roleDataScopeList.find(item => item.menuId == this.prevMenuId[0]);
            data.dataScopeFieldName = this.idNameModal;
            // console.log(data.dataScope, this.roleDataScopeList[0].dataScope, this.roleDataScopeListCopy[0].dataScope);
        },
        btnYes(str) {
            // 保存权限
            if(!this.listPermiss) {
                this.$Message.error('请选择列表数据权限');
                return;
            }
            // 判断列表数据权限
            if(this.listPermiss == '8' && !this.idNameModal.length) {
                this.tabs = 'tab2';
                this.idNameModalError = true;
                this.$Message.error('列表数据权限仅本人数据需要限定字段');
                return;
            }
            let roleMenuDataScopeList = [...this.roleDataScopeList];

            let idNameLists = this.listPermissList.filter(item => {
                return item.idNameVOList && item.idNameVOList.length;
            });

            roleMenuDataScopeList.forEach(item => {
                let ids = [];
                if(item.dataScopeFieldName && typeof(item.dataScopeFieldName) == 'object') {
                    if(item.dataScopeFieldName.length) {
                        if(idNameLists && idNameLists.length) {
                            item.dataScopeFieldName.forEach(name => {
                                let _inner = idNameLists[0].idNameVOList.find(item => item.name == name);
                                if(_inner) ids.push(_inner.id);
                            });
                        }
                        item.dataScopeFieldName = item.dataScopeFieldName.join(',');
                        item.dataScopeField = ids.length ? ids.join(',') : '';
                    } else {
                        item.dataScopeFieldName = '';
                        item.dataScopeField = '';
                    }
                }
            });
            // let menuList = [...this.saveListsPc, ...this.saveListsApp];
            let menuList = [];
            this.saveListsPc.forEach(e => {
                // console.log(e.lists)
                if(e.lists && e.lists.length) menuList.push(e.id)
                menuList = [...menuList, ...e.lists];
            });
            this.saveListsApp.forEach(e => {
                if(e.lists && e.lists.length) menuList.push(e.id)
                menuList = [...menuList, ...e.lists];
            });
            if(menuList.length == 0) {
                this.$Message.error('菜单权限不能为空');
                this.tabs = 'tab1';
                return;
            }
            let params = {
                id: this.roleId,
                menuList: menuList,
                roleMenuDataScopeList: roleMenuDataScopeList,
            }
            if(this.deleteRoleMenuDataScopeList) params.deleteRoleMenuDataScopeList = [this.deleteRoleMenuDataScopeList]

            // bug 708 权限配置，保存后页面数据没有清除
            // console.log(params)

            sysRole.roleGrantRoleToMenu(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$Message.success('保存成功');
                    if(!str) {
                        this.$emit('refresh');
                        this.showModal = false;
                    } else {
                        if(str == 'current') this.getRoleDataScopeList(this.roleId);
                        else if(str == 'delete') {
                            this.roleDataScopeModal = false;
                            this.getRoleDataScopeList(this.roleId);
                        }
                    }
                }
            }).catch(() => {
                this.changLoading();
                // if(str && str == 'current') {
                //     this.roleDataScopeList.splice(this.roleDataScopeList.length - 1, 1)
                // }
                // if(str && str == 'delete') {
                //     this.roleDataScopeList.push(this.deleteRoleMenuDataScopeList);
                // }
                errors.call(this);
            });
        },
        changLoading() {
            this.loading = false;
            setTimeout(() => {
                this.loading = true;
            }, 0);
        },
        btnClose() {
            // 取消
            this.showModal = false;
        },
        saveMenuPermissPC(arr, compact) {
            // 菜单功能权限修改后的数据
            console.log('saveMenuPermissPC', arr, compact)
            let saveArr=[];
            if(compact) {
                // 当前保存的是部分权限
                let data = this.saveListsPc.filter(function(e){
                    return e.id == compact;
                })[0];
                if(data){
                    data.lists = arr[0]? arr[0].lists : [];
                    saveArr.push(data)
                }
                // console.log(arr, this.saveListsPc)
            } else {
                arr.forEach(list => {
                    let data = this.saveListsPc.filter(function(e){
                        return e.id == list.id;
                    })[0];
                    if(data){
                        data.lists = list.lists;
                        saveArr.push(data)
                    } else {
                        saveArr.push(list)
                    }
                });
            }
            this.saveListsPc = saveArr;
        },
        saveMenuPermissAPP(arr, compact) {
            // 菜单功能权限修改后的数据
            // this.saveListsApp = arr;
            let saveArr=[];
            if(compact) {
                // 当前保存的是部分权限
                let data = this.saveListsApp.filter(function(e){
                    return e.id == compact;
                })[0];
                if(data){
                    data.lists = arr[0]? arr[0].lists : [];
                    saveArr.push(data)
                }
                // console.log(arr, this.saveListsApp)
            } else {
                arr.forEach(list => {
                    let data = this.saveListsApp.filter(function(e){
                        return e.id == list.id;
                    })[0];
                    if(data){
                        data.lists = list.lists;
                        saveArr.push(data)
                    }
                });
                this.saveListsApp = saveArr;
            }
        },
        checkChang() {
            let flag = false;//初始化为未修改
            let data = this.roleDataScopeList.filter(item => {
                return item.menuId == this.prevMenuId[0];
            });
            let dataCopy = this.roleDataScopeListCopy.filter(item => {
                return item.menuId == this.prevMenuId[0];
            });
            if(this.prevMenuId.length && data &&
                data.length &&
                dataCopy &&
                dataCopy.length) {
                    // 判断空数组
                    if(typeof(data[0].dataScopeFieldName) == 'object' &&
                        data[0].dataScopeFieldName != null &&
                        data[0].dataScopeFieldName.length == 0) data[0].dataScopeFieldName = null;
                    if(data[0].dataScopeFieldName == '') data[0].dataScopeFieldName = null;
                    if(typeof(dataCopy[0].dataScopeFieldName) == 'object' &&
                        dataCopy[0].dataScopeFieldName != null &&
                        dataCopy[0].dataScopeFieldName.length == 0) dataCopy[0].dataScopeFieldName = null;
                    if(dataCopy[0].dataScopeFieldName == '') dataCopy[0].dataScopeFieldName = null;

                    if(data[0].dataScope != dataCopy[0].dataScope ||
                        data[0].dataScopeFieldName != dataCopy[0].dataScopeFieldName ||
                        this.roleDataScopeListCopy.length != this.roleDataScopeList.length) flag = true;
            }
            return flag;
        },
        addRoleDataScope() {
            // 添加菜单
            // 先验证当前是否保存
            this.btnFunction = 'add';
            let flag = this.checkChang();
            if(flag) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>是否保存已修改的内容？</p>',
                    onOk: () => {
                        // 保存
                        this.btnYes('current');
                    },
                    onCancel: () => {
                        if(this.roleDataScopeListCopy.length != this.roleDataScopeList.length) {
                            this.roleDataScopeList.pop();
                        }
                        this.resetData();
                        this.addRoleDataScope();
                    }
                });
            } else {
                this.updateLoadingStatus({isLoading:true});
                this.remainderDataScope = '';
                let params = {
                    id: this.roleId
                }
                sysRole.roleGetRemainderDataScopeMenu(params)
                .then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.remainderDataScopeLists = res.data.data;
                        this.roleDataScopeModal = true;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {this.updateLoadingStatus({isLoading:false})});
            }
        },
        changeRoleDataScopeLists() {
            // 添加菜单弹窗ok
            // console.log('添加菜单弹窗ok', this.remainderDataScope);
            if(!this.remainderDataScope) {
                this.$Message.error('请选择添加的菜单');
                this.changLoading();
            } else {
                if(this.btnFunction == 'add') {
                    let data = this.remainderDataScopeLists.filter(item => {
                        return item.menuId == this.remainderDataScope;
                    })[0];
                    this.roleDataScopeList.push(data);
                    this.roleDataScopeModal = false;
                    this.prevMenuId.unshift(data.menuId);
                } else {
                    // if (index > -1) {
                    //     this.splice(index, 1);
                    // }
                    let index = -1;
                    let obj = null;
                    this.roleDataScopeList.forEach((item, i) => {
                        if(item.menuId == this.remainderDataScope) {
                            index = i;
                            obj = item;
                        }
                    });
                    // console.log(index, obj)
                    if(index > -1 && obj) {
                        this.deleteRoleMenuDataScopeList = obj;
                        this.roleDataScopeList.splice(index, 1);
                        this.btnYes('delete');
                    }
                }
            }
        },
        changeRoleDataScope() {
            // 切换菜单
            // 判断切换之前是否修改
            let flag = this.checkChang();
            // console.log('切换菜单', flag);
            if(flag) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>是否保存已修改的内容？</p>',
                    onOk: () => {
                        // 保存
                        this.btnYes('current');
                    },
                    onCancel: () => {
                        if(this.roleDataScopeListCopy.length != this.roleDataScopeList.length) {
                            this.roleDataScopeList.pop();
                        }
                        this.resetData();
                        this.changeRoleDataScope();
                    }
                });
            } else {
                // console.log('切换之后的菜单', this.roleDataScope)
                if(this.roleDataScope) {
                    if(this.prevMenuId[0] != this.roleDataScope) this.prevMenuId.unshift(this.roleDataScope);
                } else {
                    this.prevMenuId.shift();
                    this.resetData();
                }
            }
        },
        resetData() {
            if(this.prevMenuId.length) {
                let _first = this.roleDataScopeList.filter(item => {
                    return item.menuId == this.prevMenuId[0];
                });
                if(!_first || _first.length == 0) {
                    this.prevMenuId.shift();
                    if(this.prevMenuId.length == 0) this.prevMenuId = [this.roleDataScopeList[0].menuId];
                }
            } else this.prevMenuId = [this.roleDataScopeList[0].menuId];
            if(this.roleDataScope == '' )this.roleDataScope = this.roleDataScopeList[0].menuId;
            this.resetPrevMenuid();
        },
        resetPrevMenuid() {
            let data = this.roleDataScopeList.find(item => item.menuId == this.prevMenuId[0]);
            let dataCopy = this.roleDataScopeListCopy.find(item => item.menuId == this.prevMenuId[0]);
            if(data && JSON.stringify(data) != '{}' && dataCopy && JSON.stringify(dataCopy) != '{}') {
                data.dataScope = dataCopy.dataScope;
                data.dataScopeFieldName = dataCopy.dataScopeFieldName;
                this.prevMenuIdChange();
            } else {
                this.prevMenuId.shift();
            }
        },
        prevMenuIdChange() {
            let data = this.roleDataScopeList.find(item => item.menuId == this.prevMenuId[0]);
            if(data && JSON.stringify(data) != '{}') {
                this.roleDataScope = data.menuId;
                this.listPermiss = data.dataScope;
                if(!data.dataScopeFieldName) {
                    this.idNameModal = [];
                } else {
                    this.idNameModal = typeof(data.dataScopeFieldName) == 'string' ? data.dataScopeFieldName.split(',') : data.dataScopeFieldName;
                }
            }
        },
        deleteRoleDataScope() {
            // 删除菜单
            // 先验证当前是否保存
            this.btnFunction = 'delete';
            let flag = this.checkChang();
            if(flag) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>是否保存已修改的内容？</p>',
                    onOk: () => {
                        // 保存
                        this.btnYes('current');
                    },
                    onCancel: () => {
                        if(this.roleDataScopeListCopy.length != this.roleDataScopeList.length) {
                            this.roleDataScopeList.pop();
                        }
                        this.resetData();
                        this.deleteRoleDataScope();
                    }
                });
            } else {
                this.deleteRoleMenuDataScopeList = null;
                this.remainderDataScope = '';
                this.roleDataScopeModal = true;
            }
        },
    },
    watch: {
        prevMenuId: {
            handler(val, oval) {
                if(val.length > 5) val.length = 5;
                // console.log(val)
                this.prevMenuIdChange();
            },
            deep: true
        }
    }
}
</script>
