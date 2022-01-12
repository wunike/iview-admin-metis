<style lang="less">
.add-user-use-institution-role{
    @h: 266px;
    @border: 1px solid #D4D5DA;
    @topHeight: 50px;
    @bottomHeight: 40px;
    @borderLi: 1px solid #E6E7EB;
    li{
        list-style: none;
    }
    .clear {
        zoom: 1;
        &::before, &::after{
            content: "";display: block;clear: both;height: 0;
            line-height: 0;font-size: 0;
        }
    }
    .ivu-modal-body{
        padding: 24px;padding-left: 22px;
    }
    .left-box, .right-box{
        height: @h;
        border: @border;
    }
    .left-box{
        float: left;width: 508px;
    }
    .right-box{
        float: right;width: 234px;
    }
    .top-select, .top-title{
        position: relative;z-index: 2;
        height: @topHeight;border-bottom: @border;
    }
    .top-title{
        padding-left: 12px;padding-right: 24px;line-height: @topHeight;
        a{
            float: right;
        }
    }
    .select-institution{
        float: left;
        margin: 9px 12px 0;
    }
    .select-role{
        float: left;margin-top: 9px;margin-right: 12px;
    }
    .select-search{
        float: left;margin-top: 9px;
    }
    .top-title{
        line-height: @topHeight;
    }
    .user-select-list{
        ul{
            height: 215px;overflow-y: auto;
        }
        li{
            padding-left: 12px;padding-right: 24px;
            height: @bottomHeight;line-height: @bottomHeight;border-bottom: @borderLi;
            a{
                float: right;
            }
            span{
                float: left;width: 150px;
                overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
            }
        }
    }
    // table
    .ivu-table-wrapper{
        border: none;
    }
    .ivu-table th, .ivu-table td{
        height: @bottomHeight;
    }
    .ivu-table th{
        border-bottom: none;
    }
    .ivu-table:after{
        width: 0;
    }
    .ivu-table:before{
        height: 0;
    }
    .form-role-box{
        width:110%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .form-role{
            width: 508px;
        }
        .form-role-remarks{
            margin-left:10px;
            margin-top:-20px;
            width: 250px;
            color:#999999;
            span{
                margin-left:4px;
            }
        }
    }
}
</style>

<template>
    <Modal 
        :title="title" 
        v-model="showModal" 
        :loading="loading"
        class-name="add-user-use-institution-role"
        @on-cancel="hide"
        width="800px">
        <div class="clear">
            <div class="form-role-box">
                <Form class="form-role" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90" label-colon>
                    <FormItem label="分配角色" prop="roleName" >
                        <Select  v-model="formValidate.roleName" clearable>
                            <Option v-for="item in roleListCopy"  :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                </Form>
                <div class="form-role-remarks">
                    <Icon color="#D4D5DA" size="14" type="md-information-circle" /><span>为您即将添加的成员选择一个相应的角色。</span>
                </div>
            </div>
            <div class="left-box">
                <div class="top-select">
                    <div class="select-institution">
                        <v-select-tree :treeData="treeData"
                            style="width: 140px;"
                            :label="selectTreeLabel"
                            placeholder="选择归属机构"
                            @onChange="changeTree"></v-select-tree>
                    </div>
                    <div class="select-role">
                        <Select v-model="roleIdSelect" clearable @on-change="clearDataAllUser" style="width: 140px">
                            <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </div>
                    <Input placeholder="请输入关键词" 
                        class="select-search"
                        style="width: 180px;" 
                        search
                        @on-search="debounce" 
                        @on-click="debounce" 
                        @on-enter="debounce" 
                        v-model="searchName"/>
                </div>
                <Table ref="selection" :columns="cloAllUser" @on-selection-change="selectUser" :data="dataAllUser" height="214"></Table>
            </div>
            <div class="right-box">
                <div class="top-title">
                    <span>已选</span>
                    <a @click="cleanUp">清空</a>
                </div>
                <div class="user-select-list">
                    <ul>
                        <li v-for="(item, index) in userSelectList" :key="'select' + index">
                            <span>{{ item.name }}</span>
                            <a @click="del(item.id)">移除</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div slot="footer">
            <Button @click="hide">取消</Button>
            <Button type="primary" @click="btnYes">确定</Button>
        </div>
    </Modal>
</template>

<script>

/**
 * 添加成功弹窗
 * 根据机构、角色查找员工
 * @author 曹见芳
 */

import vSelectTree from '@public/modules/vSelectTree';
import valid, { errors, sysUser, sysRole, sysOffice } from "../libs/request.js";
import { mapMutations } from 'vuex';
import { waitUntil, } from '@public/libs/util';

export default {
    props:{
        title: {
            type: String,
            default: '添加成员'
        },
        // userSelectList: { // 已选择成员列表
        //     type: Array,
        //     required: true
        // }
        roleId: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            showModal: false,
            searchName: '', // 搜索
            roleIdSelect: '', // 已选择角色
            officeId: '', // 归属机构id
            dataAllUser: [], // 筛选出的成员列表
            userSelectList: [], // 已选择成员列表
            userSelectListTemporary: [], // 搜索之前，把已经选择的成员暂存到这里
            roleList: [], // 角色列表
            roleListCopy: [], // 角色列表
            selectTreeLabel: '',
            cloAllUser: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '姓名',
                    width: 130,
                    key: 'name'
                },
                {
                    title: '归属机构',
                    width: 200,
                    tooltip: true,
                    key: 'companyName'
                },
                {
                    title: '角色',
                    tooltip: true,
                    key: 'roleName'
                },
            ],
            treeData: [],
            loading: true,
            pageNo: 1,//当前页码
            pageCount: 1,//页码总数
            pageSize: 10,//每页条数
            // count: 0,//数据总数
            timer: null,
            formValidate: {
                roleName: '',
            },
            ruleValidate: {
                roleName: [
                    { required: true, message: '不能为空！', trigger: 'change' }
                ],
            }
        };
    },
    components: {
        vSelectTree
    },
    mounted() {            
        this.$nextTick(() => {
            let _this = this;
            let table_box = this.$el.querySelector(".ivu-table-body");
            let table_tbody = this.$el.querySelector(".ivu-table-tbody");
            table_box.addEventListener('scroll', function() {
                if(Math.ceil(table_box.clientHeight + table_box.scrollTop) >= Math.ceil(table_tbody.offsetHeight)) {
                    if(_this.pageNo < _this.pageCount) {
                        _this.pageNo += 1;
                        _this.getUserList(false);
                    }
                }
            }, false);
        })
    },
    methods:{
        ...mapMutations(['updateLoadingStatus']),
        debounce() {
            // 防抖 500ms，防止多次发起请求
            if(!this.timer) {
                this.clearDataAllUser();
                this.timer = setTimeout(() => { 
                    this.timer = null; 
                }, 1000);
            }else{
                this.$Message.warning('点击过快，请稍后再试');
                clearTimeout(this.timer);
                this.timer = setTimeout(() => { 
                    this.timer = null; 
                }, 500);
            }
        },
        buildTree() {
            sysOffice.getOfficeTree().then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.treeData = res.data.data.children;
                }
            }).catch(errors.call(this));
        },
        getRoleLists() {
            // 获取成员列表
            sysRole.roleList(this.roleListParams).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.roleListCopy = res.data.data.roleList;
                }
            }).catch(errors.call(this));
        },
        getUserList(b) {
            this.updateLoadingStatus({isLoading:true});
            this.userSelectListTemporary = [...this.userSelectList];
            let params = {
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            if(this.searchName) params.name = this.searchName;
            if(this.officeId) params.officeId = this.officeId;
            if(this.roleIdSelect) params.roleId = this.roleIdSelect;
            params.excludeRoleId = this.roleId;
            sysUser.userListRoleUser(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let data = res.data.data;
                    let ids = [];
                    this.userSelectList.forEach(item => {
                        ids.push(item.id);
                    });
                    if(b) this.dataAllUser = data.list;
                    else this.dataAllUser = this.dataAllUser.concat(data.list);
                    this.dataAllUser.forEach((item) => {
                        if(ids.indexOf(item.id) != -1){
                            item._checked = true;
                        }else{
                            item._checked = false;
                        }
                    });
                    this.pageNo = data.pageNum;
                    this.pageCount = data.pages;
                    this.pageSize = data.pageSize;
                }
            }).catch(errors.call(this)).finally(() => {this.updateLoadingStatus({isLoading:false})});
        },  
        changeTree(value, label) {
            // 选择归属机构
            this.officeId = value;
            this.selectTreeLabel = label;
            this.clearDataAllUser();
        }, 
        clearDataAllUser() {
            this.pageNo = 1;
            this.getUserList(true);
        },
        cleanUp() {
            // 清空
            this.userSelectList = [];
            this.userSelectListTemporary = [];
            this.$refs.selection.selectAll(false);
        },
        del(id) {
            // 单个移除
            this.delUserSelectList(id);
            this.delDataAllUser();
        },
        delUserSelectList(id) {
            for (let i = 0; i < this.userSelectList.length; i++) {
                if(this.userSelectList[i].id == id) {
                    this.userSelectList.splice(i, 1);
                    break;
                }                
            }
            for (let i = 0; i < this.userSelectListTemporary.length; i++) {
                if(this.userSelectListTemporary[i].id == id) {
                    this.userSelectListTemporary.splice(i, 1);
                    break;
                }                
            }
        },
        delDataAllUser() {
            let ids = [];
            this.userSelectList.forEach(item => {
                ids.push(item.id);
            });
            let q = this.dataAllUser.concat([]);
            for (let i = 0; i < q.length; i++) {
                if(ids.indexOf(q[i].id) != -1) {
                    q[i]._checked = true;
                }else{
                    q[i]._checked = false;
                }
            }
            this.dataAllUser = q;
        },
        btnYes() {
            // 弹窗点击确定
            // console.log(this.formValidate.roleName)
            this.$refs['formValidate'].validate((va) => {
                if (va) {
                    if(this.userSelectList.length){
                        // this.$refs['formValidate'].resetFields();
                        this.$emit('save', [this.userSelectList,this.formValidate.roleName]);
                    }else{
                        this.$Message.warning("请选择学员！")
                    }
                }
            })

        },
        show() {
            // 打开弹窗
            this.getRoleLists();
            this.buildTree();
            this.selectTreeLabel = '';
            this.searchName = '';
            this.roleIdSelect = '';
            this.officeId = '';
            this.userSelectList = [];
            this.userSelectListTemporary = [];
            this.dataAllUser = [];
            this.showModal = true;
            waitUntil(()=>{
				return !!this.roleListCopy.length > 0;
			},()=>{
				let obj = JSON.parse(JSON.stringify(this.roleListCopy));
                obj.forEach((item, index) => {
                    if(item.id == this.roleId) obj.splice(index, 1);
                });
                this.roleList = obj;
                this.formValidate.roleName = this.roleId
			});
        },
        hide() {
            // 关闭弹窗
            this.$refs['formValidate'].resetFields();
            this.showModal = false;
        },
        closeLoading() {
            this.loading = false;
            setTimeout(() => {
                this.loading = true;
            }, 0);
        },
        selectUser(selection) {
            // 左边 table 选择成员
            let ids = [];
            this.userSelectListTemporary.forEach(item => {
                ids.push(item.id);
            });
            let arr = [];
            selection.forEach(item => {
                if(ids.indexOf(item.id) == -1) arr.push(item);
            });
            console.log(ids)
            this.userSelectList = [...arr, ...this.userSelectListTemporary];
        },
    },
}
</script>


