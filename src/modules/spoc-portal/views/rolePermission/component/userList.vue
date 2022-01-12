<style lang="less">
.user-list-container{
    .page-card{
        height: 33px + 14px;
        padding-top: 14px;
        text-align: center;
    }
}
</style>
    
<template>
   
<div class="user-list-container">
    <div class="top">
        <h3>成员列表</h3>
        <Input placeholder="请输入姓名查询" 
            style="max-width: 224px;" 
            search
            @on-click="debounce" 
            @on-search="debounce" 
            @on-enter="debounce" 
            v-model="roleName"/>
        <Button type="primary" @click="addUser">分配成员</Button>
    </div>
    <div class="bottom" :style="{height: `${bottomHeight}px`}">
        <Table :columns="colUser" :data="userList"></Table>
        <div class="page-card">
            <Page :current="pageNo"
                :total="count"
                show-elevator show-total show-sizer
                :page-size="pageSize"
                @on-change="pageChange"
                @on-page-size-change="sizeChange">
            </Page>
        </div>
    </div>
    <add-user-use-institution-role 
        title="分配成员" 
        :roleId="roleId"
        @save="doAddUser"
        ref="people">
    </add-user-use-institution-role>
</div>
       
</template>

<script>

import addUserUseInstitutionRole from '@public/modules/addUserUseInstitutionRole';
import valid, { errors, sysUser, sysRole } from "../../../libs/request.js";
import { mapMutations } from 'vuex';

export default {
    props: {
        tabelHeight: {
            type: Number,
            default: 200,
        },
    },
    data(){
        return {
            roleName: '',
            colUser: [],
            userList: [],
            initTableHeight: null,
            roleId: '',
            pageNo: 1,//当前页码
            pageCount: 1,//页码总数
            pageSize: this.$store.state.app.pageSizeGlobal,//每页条数
            count: 0,//数据总数
            timer: null,
            bottomHeight: null
        };
    },
    computed: {

    },
    components: {
        addUserUseInstitutionRole
    },
    created() {
        this.colUser = [
            {
                title: '姓名',
                key: 'name'
            },
            // {
            //     title: '区域',
            //     key: 'companyName'
            // },
            {
                title: '归属机构',
                key: 'officeName'
            },
            {
                title: '用户名',
                key: 'loginName'
            },
            {
                title: '管辖机构',
                key: 'adminNames',
                tooltip: true,
            },
            {
                title: '角色',
                key: 'roleName',
                tooltip: true,
            },
            {
                title: '操作',
                width: 60,
                render: (h, params) => {
                    const _this = this;
                    return h('a', {
                        on: {
                            click() {
                                _this.openModal(params.row.id, (params.row.roleIdList && params.row.roleIdList.length > 1));
                            },
                        },
                    }, '移除');
                },
            }
        ];
    },
    mounted(){
        this.initHeight(this.tabelHeight);
        // this.$nextTick(() => {
        //     let _this = this;
        //     let table_box = this.$el.querySelector(".ivu-table-body");
        //     let table_tbody = this.$el.querySelector(".ivu-table-tbody");
        //     table_box.addEventListener('scroll', function() {
        //         // console.log(table_box.scrollTop)
        //         if(Math.ceil(table_box.clientHeight + table_box.scrollTop) >= Math.ceil(table_tbody.offsetHeight)) {
        //             if(_this.pageNo < _this.pageCount) {
        //                 _this.pageNo += 1;
        //                 _this.getLists();
        //             }
        //         }
        //     }, false);
        // });
        this.clearUserList();
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        initId(roleId, officeId) {
            this.roleName = '';
            this.roleId = roleId;
            this.clearUserList();
        },
        debounce() {
            // 防抖 500ms，防止多次发起请求
            if(!this.timer) {
                this.clearUserList();
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
        clearUserList() {
            this.pageNo = 1;
            this.getLists();
        },
        getLists() {
            // 获取成员列表
            this.updateLoadingStatus({isLoading:true});
            let params = {
                pageNo: this.pageNo,
                pageSize: this.pageSize
            }
            if(this.roleName) params.name = this.roleName;
            if(this.roleId) params.roleId = this.roleId;
            params.flag = '0';
            sysUser.userListRoleUser(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let data = res.data.data;
                    // if(b) this.userList = data.list;
                    // else this.userList = this.userList.concat(data.list);
                    this.userList = data.list;
                    this.pageNo = data.pageNum;
                    this.pageCount = data.pages;
                    this.pageSize = data.pageSize;
                    this.count = data.total;
                    this.initHeight(this.tabelHeight);
                }
            }).catch(errors.call(this)).finally(() => {this.updateLoadingStatus({isLoading:false})});
            
        },
        initHeight(h) {
            // console.log(h)
            // console.log(this.userList.length, this.userList.length * 48 + 36)
            let maxHeight = this.userList.length * 48 + 36;
            this.initTableHeight = h ? (h - 47 > maxHeight ? maxHeight : h - 47) : 200;
            this.bottomHeight = h ? h : 200;
        },
        openModal(id, flag) {
            // 移除
            // console.log(flag)
            if(flag) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确定移除该成员吗？',
                    onOk: () => {
                        this.removeUser(id);
                    }
                });
            } else {
                this.$Modal.error({
                    title: '提示',
                    content: '该员工只有此职位，不允许移除',
                });
            }
        },
        removeUser(id) {
            // 执行删除
            // console.log(id, this.roleId);
            let params = {
                userId: id,
                roleId: this.roleId
            }
            sysRole.roleOutrole(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$Message.success('删除成功');
                    this.$Modal.remove();
                    this.pageNo = 1;
                    this.$emit('refreshRoleList');
                    this.roleName = '';
                    this.clearUserList();
                }
            })
            .catch(errors.call(this));
        },
        addUser() {
            this.$refs.people.show();
        },
        doAddUser(arr) {
            let idsArr = [];
            arr[0].forEach(item => {
                idsArr.push({
                    id: item.id
                });
            });
            let params = {
                id: arr[1],
                userList: idsArr
            }
            sysRole.roleAssignrole(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$emit('refreshRoleList');
                    this.roleName = '';
                    this.clearUserList();
                    this.$Message.success(res.data.message);
                    this.$refs.people.hide();
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.$refs.people.closeLoading();
            });
        },
        pageChange(page) {
            this.pageNo = page;
            this.getLists();
        },
        sizeChange(size) {
            this.pageSize = size;
            this.getLists();
        },
    },
    watch: {
        tabelHeight(val) {
            this.initHeight(val);
        }
    }
}
</script>


