<style lang="less">
.role-list-modal {
    @padding: 20px;
    .ivu-modal-body {
        padding: @padding;
        padding-bottom: 0;
    }
    .ivu-form-item {
        margin-bottom: @padding;
    }
}
</style>

<template>
    <div class="role-list-container">
        <div class="top">
            <h3>角色列表</h3>
            <Input placeholder="请输入角色名查询" style="max-width: 224px;" search @on-click="searchRole" @on-search="searchRole" @on-enter="searchRole" v-model="roleName" />
            <Button type="primary" @click="addNewRole">添加角色</Button>
        </div>
        <div class="bottom"><Table highlight-row @on-current-change="changeRoleTable" :columns="colRole" :height="tabelHeight" :data="roleList"></Table></div>

        <Modal v-model="newAndEditModal" width="600" :loading="loadingModal" class="role-list-modal" :title="newAndEditTitle">
            <Form ref="form" :model="formValidate" :rules="ruleValidate" :label-width="140">
                <FormItem label="角色名称：" prop="name"><Input v-model.trim="formValidate.name" style="width: 306px;" /></FormItem>
                <FormItem label="英文名称：" prop="enname"><Input v-model.trim="formValidate.enname" style="width: 306px;" /></FormItem>
                <FormItem label="角色等级：" prop="level">
                    <Select v-model="formValidate.level" style="width: 306px;">
                        <Option v-for="item in levelList" :key="'level' + item.value" :value="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <!-- <FormItem label="只读：" prop="readOnly">
                    <RadioGroup v-model="formValidate.readOnly">
                        <Radio label="1">是</Radio>
                        <Radio label="0">否</Radio>
                    </RadioGroup>
                </FormItem> -->
                <FormItem label="描述：" prop="remarks">
                    <Input v-model.trim="formValidate.remarks" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" style="width: 306px;" />
                </FormItem>
                <FormItem v-if="isNewRole" label="复制已有的角色权限：" prop="roleSyncIds">
                    <Checkbox @on-change="changeRoleSyncIdsCheckbox" v-model="roleSyncIds" style="margin-right: 40px;"></Checkbox>
                    <Select v-model="formValidate.roleSyncIds" style="width: 250px;">
                        <Option v-for="item in roleList" :key="'roleSyncIds' + item.id" :value="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancel">取消</Button>
                <Button type="primary" @click="saveRile">确定</Button>
            </div>
        </Modal>
        <permission-allocation @refresh="getLists" ref="permissionAllocation"></permission-allocation>
    </div>
</template>

<script>
import permissionAllocation from './permissionAllocation';
import valid, { errors, sys, sysRole, sysDict } from '../../../libs/request.js';
import { mapMutations } from 'vuex';

export default {
    props: {
        tabelHeight: {
            type: Number,
            default: 200
        }
    },
    data() {
        return {
            roleName: '',
            colRole: [],
            roleList: [],
            roleListCopy: [],
            newAndEditModal: false,
            newAndEditTitle: '添加角色',
            ruleValidate: {
                name: [{ required: true, message: '请输入', trigger: 'blur' }, { pattern: /^[^\s]*$/, message: '不能输入空格', trigger: 'blur' }],
                enname: [{ required: true, message: '请输入', trigger: 'blur' }, { pattern: /^[^\s]*$/, message: '不能输入空格', trigger: 'blur' }],
                level: [{ required: true, message: '请输入', trigger: 'change' }]
            },
            formValidate: {
                name: '',
                enname: '',
                readOnly: '0',
                remarks: '',
                roleSyncIds: '',
                level: ''
            },
            formValidateReset: {},
            loadingModal: true,
            initTableHeight: null,
            isNewRole: true,
            roleSyncIds: false,
            levelList: [], // 角色等级列表
            roleListParams: {},
            selectedId: ''
        };
    },
    computed: {},
    components: {
        permissionAllocation
    },
    created() {
        this.colRole = [
            {
                title: '角色姓名',
                key: 'name',
                tooltip: true
            },
            {
                title: '成员数量',
                key: 'num'
            },
            {
                title: '角色等级',
                key: 'level'
            },
            {
                title: '描述',
                key: 'remarks',
                render: (h, params) => {
                    return h('div', params.row.remarks ? params.row.remarks : '-');
                }
            },
            {
                title: '操作',
                width: 110,
                render: (h, params) => {
                    const _this = this;
                    const renderArr = [
                        h(
                            'a',
                            {
                                style: {
                                    'margin-right': '8px'
                                },
                                on: {
                                    click() {
                                        _this.editRole(params.row);
                                    }
                                }
                            },
                            '修改'
                        ),
                        h(
                            'a',
                            {
                                on: {
                                    click() {
                                        _this.permissChange(params.row);
                                    }
                                }
                            },
                            '权限配置'
                        )
                    ];
                    return h('div', renderArr);
                }
            }
        ];
    },
    mounted() {
        this.formValidateReset = Object.assign({}, this.formValidate);
        this.initHeight(this.tabelHeight);
        this.getLists();
        this.getBatchListData();
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getLists() {
            this.updateLoadingStatus({ isLoading: true });
            sysRole
                .roleList(this.roleListParams)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let data = res.data.data.roleList;
                        if (data && data.length > 0 && !this.selectedId) {
                            data[0]._highlight = true;
                            this.changeRoleTable(data[0]);
                        } else if(data){
                            data.forEach(item => {
                                if(item.id == this.selectedId){
                                    item._highlight = true;
                                } 
                            });
                        }
                        this.roleList = data;
                        this.roleListCopy = JSON.parse(JSON.stringify(data));
                    }
                })
                .catch(() => {
                    errors.call(this);
                    this.updateLoadingStatus({ isLoading: false });
                })
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        initHeight(h) {
            this.initTableHeight = h ? h : 200;
        },
        searchRole() {
            // 搜索角色列表
            // 数据是缓存的形式，所以后台无法过滤，采用前端过滤
            // if(this.roleName) this.roleListParams.name = this.roleName;
            // else delete this.roleListParams.name;
            // this.getLists();
            if (this.roleName) {
                let w = this.roleName;
                let data = this.roleListCopy.filter(function(item) {
                    return item.name.indexOf(w) > -1;
                });
                if (data && data.length > 0) {
                    data[0]._highlight = true;
                    this.changeRoleTable(data[0]);
                }
                this.roleList = data;
            } else {
                this.roleList = this.roleListCopy;
            }
        },
        saveRile() {
            // 弹窗确定
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.saveRoles();
                } else {
                    this.loadingModal = false;
                    setTimeout(() => {
                        this.loadingModal = true;
                    }, 0);
                }
            });
        },
        saveRoles() {
            // 保存角色
            if (this.roleSyncIds) {
                if (!this.formValidate.roleSyncIds) {
                    this.$Message.error('请选择复制的角色');
                    this.loadingModal = false;
                    setTimeout(() => {
                        this.loadingModal = true;
                    }, 0);
                    return;
                }
            } else {
                this.formValidate.roleSyncIds = '';
            }
            let params = { ...this.formValidate };
            if (!params.readOnly) {
                delete params.readOnly;
            }
            sysRole
                .roleSave(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success('保存成功');
                        this.newAndEditModal = false;
                        this.getLists();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loadingModal = false;
                    setTimeout(() => {
                        this.loadingModal = true;
                    }, 0);
                });
        },
        cancel() {
            // 弹窗取消
            this.newAndEditModal = false;
            this.$refs.form.resetFields();
        },
        addNewRole() {
            // 添加新角色
            this.isNewRole = true;
            this.newAndEditTitle = '添加';
            this.formValidate = Object.assign({}, this.formValidateReset);
            this.openModal();
        },
        openModal() {
            this.newAndEditModal = true;
        },
        editRole(obj) {
            sysRole
                .formRole({ id: obj.id })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.formValidate = Object.assign({}, res.data.data.role);
                    } else {
                        this.formValidate = Object.assign(
                            {},
                            {
                                id: obj.id,
                                name: obj.name,
                                enname: obj.enname,
                                readOnly: obj.readOnly,
                                remarks: obj.remarks,
                                level: obj.level
                            }
                        );
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // 修改
                    this.isNewRole = false;
                    this.roleSyncIds = false;
                    this.newAndEditTitle = '修改';
                });
            // console.log(this.formValidate)
            this.openModal();
        },
        permissChange(item) {
            // 权限配置
            this.$refs.permissionAllocation.show(item.id, item.dataScope, item.dataScopeField);
        },
        changeRoleSyncIdsCheckbox(b) {
            // 修改 复制已有的角色权限 复选框
            // console.log(this.roleSyncIds);
            // if(!b) {
            //     this.formValidate.roleSyncIds = '';
            // }
        },
        getBatchListData() {
            // 获取字典字段
            let arr = [
                'sys_role_level' //角色等级
            ];
            let params = {
                types: arr.join()
            };
            sysDict
                .batchListData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let data = res.data.data;
                        this.levelList = data.sys_role_level;
                    }
                })
                .catch(errors.call(this));
        },
        changeRoleTable(currentRow) {
            // 选中角色列表某一行
            this.selectedId = currentRow.id
            this.$emit('changeRoleTable', currentRow.id, currentRow.office.id);
        }
    },
    watch: {
        tabelHeight(val) {
            this.initHeight(val);
        }
    }
};
</script>
