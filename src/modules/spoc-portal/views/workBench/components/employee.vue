<style lang="less">
.employee-container {
    background: #fff;
    border-radius: 4px;
    padding: 10px;
    h2 {
        padding: 8px 0 12px 16px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(73, 80, 96, 1);
    }
    .add-btn {
        text-align: center;
        padding: 11px 0 13px;
        border-bottom: 1px solid #e6e7eb;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        a {
            span {
                padding-left: 6px;
            }
        }
    }
}
</style>

<template>
    <div class="employee-container">
        <h2>{{ staffTitle }}</h2>
        <Table :columns="columns" :data="data" :height="tableHeight" ref="staffTable">
            <template slot-scope="{ row, index }" slot="name">
                <Input type="text" v-model="editorForm.name" placeholder="请输入姓名" v-if="row.edit" />
                <span v-else>{{ row.name }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="mobile">
                <Input type="text" v-model="editorForm.mobile" placeholder="请输入联系电话" v-if="row.edit" @on-keyup="setUsrName(editorForm)" />
                <span v-else>{{ row.mobile }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="loginName">
                <Input type="text" v-model="editorForm.loginName" placeholder="请输入用户名" v-if="row.edit" />
                <span v-else>{{ row.loginName }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="officeId">
                <Select transfer v-if="row.edit" v-model="editorForm.officeId" placeholder="请选择归属机构" @on-change="changeOffice(editorForm)">
                    <Option v-for="item in officeIdList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span v-else>{{ row.officeName }}</span>
            </template>

            <!-- <template slot-scope="{ row, index }" slot="jobValue">
                <div v-if="row.edit" style="display: flex;align-items: center">
                    <Select transfer v-model="editorForm.jobValue" placeholder="请选择岗位" @on-change="changeJob(editorForm)">
                        <Option v-for="item in jobValueList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <a><Icon type="md-add" size="20" style="margin-left:8px;" @click="handleCreateJobName" /></a>
                </div>
                <span v-else>{{ row.jobName }}</span>
            </template> -->
            <template slot-scope="{ row, index }" slot="no">
                <Input type="text" placeholder="请输入工号" v-model="editorForm.no" v-if="row.edit" />
                <span v-else>{{ row.no }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="roleIds">
                <div v-if="row.edit" style="display: flex;align-items: center">
                    <Select transfer multiple v-model="editorForm.roleIds" placeholder="请选择角色" @on-change="setRoleNames(editorForm)">
                        <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </div>
                <span v-else>{{ row.roleNames }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <div>
                    <a v-if="row.edit" @click="handleSave(row, index)" style="margin-right:16px;">保存</a>
                    <a v-if="row.edit" @click="handleClose(row, index)">取消</a>
                    <a v-if="!row.edit" @click="handleEdit(row, index)" style="margin-right:16px;">修改</a>
                    <a v-if="!row.edit && !row.readonly" @click="del(row, index)">删除</a>
                </div>
            </template>
        </Table>
        <div class="add-btn">
            <a @click="addNewStaff">
                <Icon size="14" type="md-add" />
                <span>添加新员工<span style="color:red">(初始密码：123456)</span></span>
            </a>
        </div>
        <newDictModel ref="newDictModel" @refresh="getOfficeIdList"></newDictModel>
        <!--        <Select transfer filterable allow-create @on-create="handleCreate" v-model="jobName" >-->
        <!--            <Option v-for="item in jobList"  :value="item.value" :key="item.value">{{ item.label }}</Option>-->
        <!--        </Select>-->
    </div>
</template>

<script>
import valid, { errors, sysOffice, sysRole, sysUser, sysDict } from '../../../libs/request';
import { mapMutations } from 'vuex';
import newDictModel from '../../dictmanage/newDictModel';
export default {
    components: {
        newDictModel
    },
    data() {
        return {
            editorForm: {
                adminNames: '',
                crossNames: '',
                departNames: '',
                email: '',
                enName: '',
                entryDate: '',
                fieldJsonData: {},
                gender: '',
                id: '',
                isEnable: '',
                isService: '',
                jobName: '',
                jobValue: '',
                leaveDate: '',
                loginName: '',
                mobile: '',
                name: '',
                no: '',
                officeId: '',
                officeName: '',
                roleIds: '',
                roleNames: '',
                userTypeName: ''
            },
            sys_user_job: [],
            jobValueList: [],
            officeIdList: [],
            columns: [
                {
                    title: '姓名',
                    slot: 'name'
                },
                {
                    title: '联系电话',
                    slot: 'mobile'
                },
                {
                    title: '用户名',
                    slot: 'loginName'
                },
                {
                    title: '归属机构',
                    slot: 'officeId'
                },
               /*  {
                    title: '岗位',
                    slot: 'jobValue'
                }, */
                {
                    title: '工号',
                    slot: 'no'
                },
                {
                    title: '角色',
                    slot: 'roleIds'
                },
                {
                    title: '操作',
                    slot: 'action'
                }
            ],
            data: [],
            staffTitle: '',
            thisId: '',
            title: '',
            code: '',
            loadingSave: true,
            tableHeight: 200,
            roleList: []
        };
    },
    mounted() {
        this.getOfficeIdList();
        this.officeListData();
        // console.log(this.tabelHeight)
        this.initTableHeight();
        this.getLists();
        window.onresize = () => {
            this.initTableHeight();
        };
    },
    destroyed() {
        window.onresize = null;
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getLists() {
            sysRole
                .roleList({})
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let data = res.data.data.roleList;
                        this.roleList = data;
                    }
                })
                .catch(() => {
                    errors.call(this);
                })
                .finally(() => {});
        },
        setRoleNames(ids) {
            let idArr = this.editorForm.roleIds;
            this.editorForm.roleNames = this.roleList
                .filter(v => idArr.indexOf(v.id) != -1)
                .map(v => v.name)
                .join(',');
        },
        initTableHeight() {
            this.tableHeight = document.querySelector('.cistern-center').clientHeight - 41 - 49 - 16 * 2;
        },
        setUsrName(row) {
            row.loginName = row.mobile;
        },
        setTitle(arr) {
            let t = arr[0] + '【' + arr[1] + '】';
            this.title = arr[0];
            this.code = arr[1];
            this.staffTitle = t;
        },
        generateUserNo(value,row){
            sysUser
                .generateUserNo({
                    officeId:value
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        row.no = res.data.data
                    }
                })
                .catch(errors.call(this));
        },
        //获取表格数据
        getTableDatas(id) {
            this.thisId = id;
            this.updateLoadingStatus({ isLoading: true });
            this.params = {
                entryDateEnd: '',
                entryDateStart: '',
                fieldJsonData: {},
                gender: '',
                isService: '',
                job: '',
                leaveDateStart: '',
                loginName: '',
                name: '',
                pageNo: 1,
                pageSize: 100,
                userType: '',
                "orderByType":"createDate",
                "orderByStatus":"1"
            };
            if (id) {
                this.params.officeId = id;
                this.params.searchOfficeId = id;
            }
            sysUser
                .listPage(this.params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let data = res.data;
                        // this.pageCounts = data.data.total;
                        let d = data.data.list;
                        d.forEach(item => {
                            item.edit = false;
                        });
                        // console.log(d)
                        this.data = d;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        changeOffice(row) {
            this.officeIdList.forEach(item => {
                if (row.officeId == item.value) {
                    row.officeName = item.label;
                }
            });
            this.generateUserNo(row.officeId, row)
        },
        changeJob(row) {
            this.jobValueList.forEach(item => {
                if (row.jobValue == item.value) {
                    row.jobName = item.label;
                }
            });
        },
        handleCreateJobName() {
            this.$refs.newDictModel.show();
        },
        getOfficeIdList() {
            sysDict
                .listData({ type: 'sys_user_job' })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let sys_user_job = res.data.data;
                        this.sys_user_job = res.data.data;
                        this.jobValueList = [];
                        for (let item in sys_user_job) {
                            let obj = {};
                            let obj1 = sys_user_job[item];
                            obj.value = obj1.value;
                            obj.label = obj1.label;
                            this.jobValueList.push(obj);
                        }
                    }
                })
                .catch(errors.call(this));
        },
        officeListData() {
            sysUser
                .dataScopeFilter()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let data = res.data.data;
                        this.officeIdList = []; //归属机构
                        for (let item in data) {
                            let obj = {};
                            let obj1 = data[item];
                            obj.value = obj1.id;
                            obj.label = obj1.name;
                            this.officeIdList.push(obj);
                        }
                    }
                })
                .catch(errors.call(this));
        },
        handleEdit(row, index) {
            this.editorForm = Object.assign({}, row);
            this.editorForm.roleIds = this.editorForm.roleIds.split(',');
            this.data.forEach(v => {
                v.edit = false;
            });
            row.edit = true;
            this.editIndex = index;
        },
        handleClose(row, index) {
            row.edit = false;
            this.editorForm = {
                adminNames: '',
                crossNames: '',
                departNames: '',
                email: '',
                enName: '',
                entryDate: '',
                fieldJsonData: {},
                gender: '',
                id: '',
                isEnable: '',
                isService: '',
                jobName: '',
                jobValue: '',
                leaveDate: '',
                loginName: '',
                mobile: '',
                name: '',
                no: '',
                officeId: '',
                officeName: '',
                roleIds: '',
                roleNames: '',
                userTypeName: ''
            };
            if (!row.id) {
                this.data.splice(index, 1);
            }
        },
        handleSave(row, index) {
            if (!this.editorForm.no) {
                this.$Message.warning('工号不能为空！');
                return false;
            } else {
                if (!this.editorForm.name) {
                    this.$Message.warning('姓名不能为空！');
                    return false;
                } else {
                    if (!this.editorForm.mobile) {
                        this.$Message.warning('联系电话不能为空！');
                        return false;
                    } else if (this.editorForm.mobile.length != '11') {
                        this.$Message.warning('请输入正确联系电话！');
                        return false;
                    } else {
                        if (!this.editorForm.loginName) {
                            this.$Message.warning('用户名不能为空！');
                            return false;
                        } else {
                            if (!this.editorForm.officeId) {
                                this.$Message.warning('归属机构不能为空！');
                                return false;
                            } else {
                                // if (!this.editorForm.jobValue) {
                                //     this.$Message.warning('岗位不能为空！');
                                //     return false;
                                // } else {
                                    if (!this.editorForm.roleIds.length) {
                                        this.$Message.warning('角色不能为空！');
                                        return false;
                                    }
                                // }
                            }
                        }
                    }
                }
            }
            let params = {
                id: this.editorForm.id ? this.editorForm.id : '',
                no: this.editorForm.no ? this.editorForm.no : '',
                name: this.editorForm.name ? this.editorForm.name : '',
                mobile: this.editorForm.mobile ? this.editorForm.mobile : '',
                loginName: this.editorForm.loginName ? this.editorForm.loginName : '',
                officeId: this.editorForm.officeId ? this.editorForm.officeId : '',
                job: this.editorForm.jobValue ? this.editorForm.jobValue : '',
                roleIds: this.editorForm.roleIds ? this.editorForm.roleIds.join(',') : ''
            };
            sysUser
                .saveEmployee(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success('保存成功！');
                        this.$emit('get-new-tree', [this.thisId, this.title, this.code]);
                        let obj = Object.assign({}, this.editorForm);
                        obj.roleIds = obj.roleIds.join(',');
                        this.editorForm = {
                            adminNames: '',
                            crossNames: '',
                            departNames: '',
                            email: '',
                            enName: '',
                            entryDate: '',
                            fieldJsonData: {},
                            gender: '',
                            id: '',
                            isEnable: '',
                            isService: '',
                            jobName: '',
                            jobValue: '',
                            leaveDate: '',
                            loginName: '',
                            mobile: '',
                            name: '',
                            no: '',
                            officeId: '',
                            officeName: '',
                            roleIds: '',
                            roleNames: '',
                            userTypeName: ''
                        };
                        // this.data.splice(index, 1, obj);
                        // row.edit = false;
                        // this.getTableDatas(this.thisId);
                    }
                })
                .catch(errors.call(this));
        },
        del(row, index) {
            // debugger;
            this.updateLoadingStatus({ isLoading: true });
            let params = {
                userIdList: row.id
            };
            sysUser
                .deleteEmployees(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success('删除成功！');
                        this.$emit('get-new-tree', [this.thisId, this.title, this.code]);
                        // this.getTableDatas(this.thisId)
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        addNewStaff() {
            this.data.forEach(v => {
                v.edit = false;
            });
            this.data = this.data.filter(v => v.id);
            let obj = {
                no:'',
                name:'',
                mobile:'',
                loginName:'',
                officeId:'',
                jobValue:'',
                roleIds:''
            };

            this.editorForm = Object.assign({}, obj);
            obj.edit = true;
            this.data.push(obj);
            this.$nextTick(() => {
                let dom = this.$refs.staffTable.$el.querySelector('.ivu-table-body');
                dom.scrollTop = dom.scrollHeight;
            });
        }
    }
};
</script>
