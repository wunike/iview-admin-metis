<style lang="less">
.layoutTable {
    padding: 10px;
    padding-top: 0;
    .layoutTable_tit {
        font-size: 16px;
        font-weight: normal;
        color: rgba(73, 80, 96, 1);
        line-height: 24px;
        padding-bottom: 10px;
    }
    .tbl {
        border: none;
        .ivu-table th {
            height: 50px;
        }
        .ivu-table:before {
            display: none;
        }
        .ivu-table:after {
            display: none;
        }
        .ivu-table-cell{
            padding-left: 8px;
            padding-right: 8px;
        }
        .active_box {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            a {
                margin-right: 16px;
                // color: #5584ff;
            }
        }
        .click_span {
            cursor: pointer;
        }
    }
}
</style>

<template>
    <div class="layoutTable">
        <div class="layoutTable_tit">属性列表</div>
        <Table :columns="columns" :data="dataList" class="tbl" :draggable="islayout" @on-drag-drop="tableDrag">
            <template slot-scope="{ row, index }" slot="name">
                <Input type="text" v-model="editName" v-if="editIndex === index" />
                <span v-else @click="editCol(row, index)" class="click_span">{{ row.name }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="enName">
                <Input type="text" v-model="editEnName" v-if="editIndex === index" />
                <span v-else @click="editCol(row, index)" class="click_span">{{ row.enName }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="field">
                <Input type="text" v-model="editField" v-if="editIndex === index" />
                <span v-else @click="editCol(row, index)" class="click_span">{{ row.field }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="type">
                <Select v-model="editjdbcType" clearable transfer filterable v-if="editIndex === index">
                    <Option v-for="item in formList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span v-else @click="editCol(row, index)" class="click_span">{{ row.type }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="dictValue">
                <a href="javaScript:void(0);" v-if="editIndex === index && !editDictType" @click="dictModal = true">关联</a>
                <Tag type="border" :fade="false" closable v-else-if="editIndex === index" @on-close="closedictType">{{ editDictValue }}</Tag>
                <span v-else @click="editCol(row, index)" class="click_span">{{ row.dictValue || '/' }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="required">
                <Checkbox disabled :true-value="true" :false-value="false" v-model="row.required"></Checkbox>
            </template>
            <template slot-scope="{ row, index }" slot="base">
                <Checkbox disabled true-value="1" false-value="0"  v-model="row.base"></Checkbox>
            </template>
            <template slot-scope="{ row, index }" slot="editable">
                <Checkbox disabled true-value="1" false-value="0"  v-model="row.editable"></Checkbox>
            </template>
            <template slot-scope="{ row, index }" slot="isList">
                <Checkbox disabled true-value="1" false-value="0"  v-model="row.isList"></Checkbox>
            </template>
            <template slot-scope="{ row, index }" slot="isQuery">
                <Checkbox disabled true-value="1" false-value="0"  v-model="row.isQuery"></Checkbox>
            </template>
            <template slot-scope="{ row, index }" slot="queryTypeValue">
                <Select v-model="editQueryType" clearable transfer filterable v-if="editIndex === index" @on-change="queryTypeChange(row, $event)">
                    <Option v-for="item in queryTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span v-else @click="editCol(row, index)" class="click_span">{{ row.queryTypeValue || '/' }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="isFitPhone">
                <Checkbox disabled true-value="1" false-value="0"  v-model="row.isFitPhone"></Checkbox>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <div class="active_box">
                    <!-- <a href="javaScript:void(0);" style="color: #FF0000;" @click="deleteById(row._id)" v-if="row._id">删除</a> -->
                    <CommonIcon type="_bianzu6" :size="16" v-show="islayout" :style="{marginTop: '0px',display:'inline-block', verticalAlign: 'middle'}"/>
                </div>
            </template>
        </Table>

        <Modal v-model="dictModal" width="600" class-name="vertical-center-modal">
            <p slot="header"><span>新增字典项</span></p>
            <div class="body" transfer>
                <Form ref="dictForms" :model="dictForm" :rules="ruleValidate" :label-width="80">
                    <FormItem label="模块" prop="module">
                        <Select v-model="dictForm.module" @on-change="moduleChange">
                            <Option :value="item.id" v-for="item in menuList" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="字典项" prop="dictionary">
                        <Select v-model="dictForm.dictionary">
                            <Option :value="item.value" v-for="item in dictionaryList" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer"><Button type="primary" @click="saveDict('dictForms')">保存</Button></div>
        </Modal>
    </div>
</template>

<script>
import valid, { errors, SysProps, sysDict, sysMenu } from '../../libs/request';
import { mapMutations, mapState } from 'vuex';
import CommonIcon from '_c/common-icon';
export default {
    props: {
        category: {
            type: String,
            required: true
        },
        tableName: {
            type: String,
            required: true
        },
        islayout: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dictModal: false,
            menuList: [],
            dictionaryList: [],
            dictForm: {
                module: '',
                dictionary: ''
            },
            ruleValidate: {
                module: [{ required: true, message: '请选择模块', trigger: 'change' }],
                dictionary: [{ required: true, message: '请选择字典项', trigger: 'change' }]
            },
            formList: [
                { label: '输入框', value: 'input' },
                { label: '隐藏字段', value: 'hidden' },
                { label: '数字输入框', value: 'InputNumber' },
                { label: '自动生成', value: 'autoComplete' },
                { label: '单选框', value: 'radio' },
                { label: '多选框', value: 'checkbox' },
                { label: '下拉选择框', value: 'select' },
                { label: '开关', value: 'switch' },
                { label: '多级联动', value: 'cascader' },
                { label: '日期选择器', value: 'DatePicker' },
                { label: '时间选择器', value: 'TimePicker' },
                { label: '颜色选择框', value: 'ColorPicker' },
                { label: '上传', value: 'upload' },
                { label: '评分', value: 'rate' },
                { label: '滑块', value: 'slider' },
                { label: '树形组件', value: 'tree' }
            ],
            dataList: [],
            columns: [
                {
                    title: '字段名称',
                    slot: 'name',
                    minWidth: 100
                },
                {
                    title: '英文名称',
                    slot: 'enName',
                    minWidth: 120
                },
                {
                    title: '关联字段',
                    slot: 'field',
                    minWidth: 110
                },
                {
                    title: '字段类型',
                    slot: 'type',
                    minWidth: 100
                },
                {
                    title: '关联字典值',
                    slot: 'dictValue',
                    minWidth: 150
                },
                {
                    title: '必填',
                    slot: 'required',
                    minWidth: 60
                },
                {
                    title: '插入',
                    slot: 'base',
                    minWidth: 60
                },
                {
                    title: '编辑',
                    slot: 'editable',
                    minWidth: 60
                },
                {
                    title: '列表',
                    slot: 'isList',
                    minWidth: 60
                },
                {
                    title: '查询',
                    slot: 'isQuery',
                    minWidth: 60
                },
                {
                    title: '查询类型',
                    slot: 'queryTypeValue',
                    minWidth: 76
                },
                {
                    title: '适配手机',
                    slot: 'isFitPhone',
                    minWidth: 60
                },
                {
                    title: '操作',
                    slot: 'action',
                    minWidth: 100
                }
            ],
            queryTypeList: [],
            editIndex: '',
            editName: '',
            editEnName: '',
            editField: '',
            editjdbcType: '',
            editType: '',
            editDictType: '',
            editDictValue: '',
            editQueryType: '',
            editQueryTypeValue: ''
        };
    },
    computed: {},
    components: {CommonIcon},
    created() {
        console.log();
        this.getQueryType();
        this.getListMenu();
        this.getList();
    },
    mounted() {},
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getListMenu() {
            let params = {};
            sysMenu
                .listMenu(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.menuList = res.data.data;
                    }
                })
                .catch(errors.call(this));
        },
        getQueryType() {
            let params = {
                types: 'sys_props_queryType'
            };
            sysDict
                .batchListData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.queryTypeList = res.data.data.sys_props_queryType;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        getList() {
            this.updateLoadingStatus({
                isLoading: true
            });
            let params = {
                tableName: this.tableName
            };
            if (this.category != 'all') {
                params.category = this.category;
            } else {
            }
            SysProps.list(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.editIndex = '';
                        this.editName = '';
                        this.editEnName = '';
                        this.editField = '';
                        this.editjdbcType = '';
                        this.editType = '';
                        this.editDictType = '';
                        this.editDictValue = '';
                        this.editQueryType = '';
                        this.dataList = res.data.data;
                        let dataObj = {
                            name: '点击输入自定义名称',
                            enName: 'Click enter custom name',
                            field: '/',
                            jdbcType: '',
                            type: '点击输入字段类型',
                            menuId: '',
                            dictType: '',
                            dictValue: '',
                            required: 0,
                            base: 0,
                            editable: 0,
                            isList: 0,
                            isQuery: 0,
                            queryType: '',
                            queryTypeValue: '',
                            category: this.category,
                            tableName: this.tableName
                        };
                        if (this.category == 'all') {
                        } else {
                            // this.dataList.push(dataObj);
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        saveSingle(params) {
            this.updateLoadingStatus({
                isLoading: true
            });
            SysProps.saveSingle(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.editIndex = '';
                        this.editName = '';
                        this.editEnName = '';
                        this.editField = '';
                        this.editjdbcType = '';
                        this.editType = '';
                        this.editDictType = '';
                        this.editDictValue = '';
                        this.editQueryType = '';
                        this.menuId = '';
                        this.$Message.success(res.data.message);
                        this.getList();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        editCol(item, index) {
            return ;
            this.editIndex = index;
            this.editName = item.name;
            this.editEnName = item.enName;
            this.editField = item.field;
            this.editjdbcType = item.jdbcType;
            this.editType = item.type;
            this.editDictType = item.dictType;
            this.editDictValue = item.dictValue;
            this.menuId = item.menuId;
            this.editQueryType = item.queryType;
        },
        save(item) {
            let obj = Object.assign({}, item);
            obj.name = this.editName;
            obj.enName = this.editEnName;
            obj.field = this.editField;
            obj.jdbcType = this.editjdbcType;
            // obj.type = this.editType;
            obj.dictType = this.editDictType;
            obj.dictValue = this.editDictValue;
            obj.queryType = this.editQueryType;
            obj.menuId = this.menuId;
            if (obj.jdbcType) {
                let object = this.formList.find(v => v.value == obj.jdbcType);
                obj.type = object ? object.label : '--';
            } else {
                obj.type = '';
            }
            if (obj.queryType) {
                let object = this.queryTypeList.find(v => v.value == obj.queryType);
                obj.queryTypeValue = object ? object.label : '--';
            } else {
                obj.queryTypeValue = '';
            }
            this.saveSingle(obj);
        },
        closedictType() {
            this.editDictType = '';
            this.editDictValue = '';
            this.menuId = '';
        },
        queryTypeChange(item, e) {},
        moduleChange(item) {
            let params = {
                type: 'root',
                menuId: item || 0
            };
            sysDict
                .DictListDataNew(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.dictionaryList = res.data.data;
                    }
                })
                .catch(errors.call(this));
        },
        saveDict(name) {
            this.$refs[name].validate(ok => {
                if (ok) {
                    this.editDictType = this.dictForm.dictionary;
                    let obj = this.dictionaryList.find(v => v.value == this.dictForm.dictionary);
                    this.editDictValue = obj ? obj.label : '--';
                    this.menuId = this.dictForm.module;
                    this.dictModal = false;
                    this.dictForm = {
                        module: '',
                        dictionary: ''
                    };
                    this.handleReset(name);
                } else {
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        deleteById(id) {
            this.updateLoadingStatus({
                isLoading: true
            });
            let params = {
                id
            };
            SysProps.deleteById(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.getList();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        tableDrag(index1, index2) {
            let arr = [];
            let ind1 = this.dataList[index2].sort;
            let ind2 = this.dataList[index1].sort;
            this.dataList.forEach((v, k) => {
                if (k == index1) {
                    arr.push({ id: v.id, sort: ind1, name: v.name });
                } else if (k == index2) {
                    arr.push({ id: v.id, sort: ind2, name: v.name });
                } else {
                    if (v._id) {
                        arr.push({ id: v.id, sort: v.sort, name: v.name });
                    }
                }
            });
            this.updateLoadingStatus({
                isLoading: true
            });
            let params = {
                propsList: arr
            };
            SysProps.saveSort(arr)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.getList();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        }
    },
    watch: {
        tableName: {
            handler(val, oldVal) {
                this.getList();
            },
            deep: true
        }
    }
};
</script>
