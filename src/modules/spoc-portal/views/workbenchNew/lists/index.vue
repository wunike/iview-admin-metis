<style lang="less">
@import "../plugin/libs/theme.less";
.work-bench-lists-container{
    position: relative;
    padding: 0 16px 16px;
    .my-table {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px;
        margin-top: 10px;
        .subTypeNameStyle {
            margin-left: 11px;
            .ivu-table-cell {
                margin-left: 11px;
            }
        }
    }
    .dot-green,.dot-gray {
        position: relative;padding-left: 14px;
        &::before{
            @w: 6px;
            content: '';
            position: absolute;left: 2px;top: 6px;
            width: @w;height: @w;border-radius: @w;
        }
    }
    .dot-green::before{
        background: @baseThemeColor;
    }
    .dot-gray::before{
        background: #999;
    }
}
.lists-delete-modal{
    .ivu-modal-header{
        display: none;
    }
    .ivu-modal-body{
        padding: 16px 0 0;
    }
    .ivu-modal-footer {
        height: 32px + 24px;
        border-top: none;
        button{
            float: right;
            width: 66px;height: 32px;padding: 0;
        }
    }
    .title{
        @h: 22px;
        position: relative;
        padding: 16px 0 14px 70px;
        line-height: @h;height: @h + 30px;
        font-size: 16px;
        i{
            position: absolute;left: 32px;top: 16px;
            color: #FAAD14;font-size: 22px;
        }
        em{
            font-style: inherit;color: #F39945;
        }
    }
    .detail{
        line-height: 22px;
        padding: 0 32px 22px 70px;font-size: 14px;font-weight: 400;
        span{
            color: #FF1B1B;
        }
    }
}
</style>
    
<template>
<div class="work-bench-lists-container">
    <big-table v-if="defaultShowCol"
        class="my-table"
        tableName="门户模板列表"
        :tableData="tableData"
        :tableColumnArray="tableColumnArray"
        :defaultShowCol="defaultShowCol"
        :isShowSelectTableColumn="false"
        :dataTotal="dataTotal"
        :btnList="btnList"
        :pageNo="pageNo"
        :tableHeightOut="tableHeightOut"
        @pageChange="pageChange">
    </big-table>
    <Modal v-model="listsModal"
        class-name="lists-add-modal"
        width="600"
        :loading="loading"
        :title="modalTitle"
        ok-text="下一步"
        @on-cancel="cancel"
        @on-ok="next">
        <Form ref="editItemRef" :model="formData" :label-width="156" :show-message="false">
            <FormItem prop="name" label="模板名称：" required>
                <Input v-model="formData.name" placeholder="请输入" style="width: 306px"/>
            </FormItem>
            <FormItem prop="roleId" label="适用角色：" required>
                <Select v-model="formData.roleId"  placeholder="请选择" style="width: 306px">
                    <Option v-for="item in roleLists" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
            </FormItem>
        </Form>
    </Modal>
    <Modal
        v-model="listsDeleteModal"
        :closable="false"
        width="433"
        class="lists-delete-modal">
        <div slot="header"></div>
        <div class="title">
            <Icon type="md-help-circle" />
            <span>提示</span>
        </div>
        <div class="detail">
            确认删除该模版？
        </div>
        <div slot="footer">
            <div>
                <Button type="primary" style="margin-left: 8px" @click="stopUsing">确定</Button>
                <Button @click="stopUsingCancel">取消</Button>
            </div>
        </div>
    </Modal>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 工作台 - 门户模板
 */
import valid, { errors, comPortalTpl } from '../../../libs/request.js';
import { mapMutations, mapState } from "vuex";
import { waitUntil } from "@public/libs/util";
import bigTable from "@public/modules/bigTable.vue";
import tableDropdown from '@public/modules/tableDropdown.vue';
export default {
    name: 'portal.workbenchLists',
    components: {
        bigTable, tableDropdown
    },
    data(){
        return {
            tableHeightOut: 1,
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            defaultShowCol: null,
            tableData: [],
            dataTotal: 0,
            btnList: [
                {
                    type: '',
                    btnClick: this.addNew,
                    text: '新增模板',
                    style: 'margin-right: 0'
                },
            ],
            tableColumnArray: [
                {
                    title: "使用状态",
                    key: "isPub",
                    render: (h, params) => {
                        return h('div', {
                            class: params.row.isPub == '1' ? 'dot-green' : 'dot-gray'
                        }, params.row.isPub == '1' ? '使用中' : '未发布')
                    }
                },
                {
                    title: "操作",
                    key: "doAction",
                    width: 180,
                    render: (h, params) => {
                        return h("div", [
                            h('a', {
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: "portal.workbenchNew",
                                            query: {
                                                protalTplId: params.row.id,
                                            }
                                        });
                                    }
                                } 
                            }, '查看'),
                            
                            h(tableDropdown, {
                                style:{
                                    'margin-left':'10px'
                                },
                                props: {
                                    buttonList: [
                                        {label: '编辑基本信息', key: 'base'},
                                        {label: '编辑工作台', key: 'index'}
                                    ],
                                    actionName: '编辑'
                                },
                                on: {
                                    dropFn : (key)=> {
                                        this.onEdit(key, params.row)
                                    }
                                }
                            }),
                            h('a', {
                                style:{
                                    'margin-left':'5px',
                                },
                                on: {
                                    click: () => {
                                        this.curItem = Object.assign({}, params.row);
                                        this.curFlag = 'delFlag';
                                        this.listsDeleteModal = true;
                                        // this.updatePortalItem(params.row, 'delFlag');
                                    }
                                } 
                            }, '删除'),
                            h('a', {
                                style:{
                                    'margin-left':'5px',
                                },
                                on: {
                                    click: () => {
                                        this.updatePortalItem(params.row, 'pub');
                                    }
                                } 
                            }, params.row.isPub == '1' ? '取消发布' : '发布'),
                        ]);
                    }
                }
            ],
            listsModal: false,
            modalTitle: '新建模版',
            formData: {
                name: '',
                roleId: ''
            },
            loading: true,
            roleLists: [],
            listsDeleteModal: false,
            stopId: '',
            curItem: null,
            curFlag: '',
        };
    },
    mounted(){
        this.getShowTitle();
        this.getListData();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        getShowTitle() {
            this.defaultShowCol = {
                'true': [
                    {
                        'name': 'name',
                        'title': '模版名称',
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    },
                    {
                        'name': 'createByName',
                        'title': '创建人',
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    },
                    {
                        'name': 'updateByName',
                        'title': '修改人',
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    },
                    {
                        'name': 'createDate',
                        'title': '创建时间',
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    },
                    {
                        'name': 'roleName',
                        'title': '适用角色',
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    },
                    {
                        'name': 'isPub',
                        'title': '使用状态',
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    }
                ]
            }
        },
        pageChange(pageNo, pageSize) {
            if (!pageNo) {
                //防止无用重复请求
                return;
            }
            this.pageNo = pageNo;
            this.pageSize = pageSize;
            this.getListData();
        },
        getListData() {
            let params = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
            }
            this.updateLoadingStatus({ isLoading: true });
            comPortalTpl.listPage(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data
                    this.tableData = _data.list || [];
                    this.dataTotal = _data.total;
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        addNew() {
            this.modalTitle = '新建模版';
            this.formData = {
                name: '',
                roleId: ''
            }
            this.findUsableRole();
            this.handleReset('editItemRef');
            this.listsModal = true;
        },
        changeLoading() {
            this.loading = false;
            setTimeout(() => {
                this.loading = true;
            }, 0);
        },
        next() {
            this.handleSubmit('editItemRef');
        },
        cancel() {
            this.listsModal = false;
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.save();
                } else {
                    this.changeLoading();
                }
            })
        },
        save() {
            let params = Object.assign({}, this.formData);
            this.updateLoadingStatus({ isLoading: true });
            comPortalTpl.save(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    // this.$Message.success('保存成功');
                    this.getListData();
                    this.listsModal = false;
                    this.$router.push({
                        name: "portal.workbenchNew",
                        query: {
                            protalTplId: res.data.data,
                            edit: '1'
                        }
                    });
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        onEdit(key, row) {
            if(key == 'index') {
                this.$router.push({
                    name: "portal.workbenchNew",
                    query: {
                        protalTplId: row.id,
                        edit: '1'
                    }
                });
            } else {
                this.modalTitle = '编辑模版';
                this.formData = Object.assign({}, row);
                this.findUsableRole(row.id);
                this.handleReset('editItemRef');
                this.listsModal = true;
            }
        },
        findUsableRole(id) {
            let params = {};
            if(id) params.portalTplId = id;
            comPortalTpl.findUsableRole(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    this.roleLists = _data;
                }
            })
            .catch(errors.call(this))
        },
        stopUsing() {
            this.updatePortalItem(this.curItem, this.curFlag);
        },
        stopUsingCancel() {
            this.listsDeleteModal = false;
        },
        updatePortalItem(row, type) {
            let params = {
                protalTplId: row.id
            }
            if(type == 'delFlag') params.delFlag = '1';
            else params.pub = row.isPub == '1' ? '0' : '1';
            this.updateLoadingStatus({ isLoading: true });
            comPortalTpl.updatePortalItem(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    if(type == 'delFlag') this.stopUsingCancel();
                    else {
                        let str = params.pub == '0' ? '取消发布门户模板成功！': '发布门户模板成功！';
                        this.$Message.success(str);
                    }
                    this.getListData();
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
    },
}
</script>


