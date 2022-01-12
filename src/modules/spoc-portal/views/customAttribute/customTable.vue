<style lang="less">
.customTable {
    padding: 10px;
    padding-top: 0;
    .customTable_tit {
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
                margin-right: 12px;
                // color: #5584ff;
                // &:last-of-type{
                //     margin: 0;
                // }
            }
            .add_wrap {
                flex: 1;
                text-align: center;
                a {
                    margin: 0;
                }
            }
        }
        .click_span {
            // cursor: pointer;
        }
        .disbaled {
            color: #cccccc;
            cursor: not-allowed;
            pointer-events: none;
            a {
                color: #cccccc;
                cursor: not-allowed;
                pointer-events: none;
            }
        }
    }
}

.szmj{
    .addOrRemove {
        display: inline-block;
        width: 24px;
        height: 24px;
        margin-top: 4px;
        margin-left: 8px;
        text-align: center;
        line-height: 18px;
        color: #ccc;
        cursor: pointer;
        border: 1px solid #ccc;
        font-size: 20px;
        border-radius: 2px;
        &:hover {
            // border: 1px solid #44bcb7;
            // color: #44bcb7;
        }
    }
}
</style>

<template>
    <div class="customTable">
        <div class="customTable_tit">自定义属性列表</div>
        <Table :columns="columns" :data="dataList" class="tbl" :draggable="true" @on-drag-drop="tableDrag" :span-method="handleSpan">
            <template slot-scope="{ row, index }" slot="name">
                <Input type="text" v-model="editName" placeholder="点击输入自定义名称" v-if="editIndex === index" />
                <span v-else class="click_span">{{ row.name }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="enName">
                <Input type="text" v-model="editEnName" placeholder="Click enter custom name" v-if="editIndex === index" />
                <span v-else class="click_span">{{ row.enName }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="field">
                <Input type="text" v-model="editField" v-if="editIndex === index" />
                <span v-else class="click_span">{{ row.field || '/' }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="type">
                <Select v-model="editjdbcType" placeholder="点击输入字段类型" clearable transfer filterable v-if="editIndex === index">
                    <Option v-for="item in formList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span v-else class="click_span">{{ row.type }}</span>
            </template>
            <!-- <template slot-scope="{ row, index }" slot="dictValue">
                <a href="javaScript:void(0);" v-if="editIndex === index && !editDictType" @click="dictModal = true">关联</a>
                <Tag type="border" :fade="false" closable v-else-if="editIndex === index" @on-close="closedictType">{{ editDictValue }}</Tag>
                <span v-else class="click_span">{{ row.dictValue || '/' }}</span>
            </template> -->
            <template slot-scope="{ row, index }" slot="filterSetting">
                <a @click="editFilterList(row, index)" v-if="editIndex === index">{{ row | filterListFilter}}</a>
                <span v-else class="click_span">{{ row | filterListFilter1 }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="required">
                <Checkbox :true-value="true" :false-value="false" v-model="row.required" :disabled="editIndex !== index"></Checkbox>
            </template>
            <template slot-scope="{ row, index }" slot="base">
                <Checkbox true-value="1" false-value="0" v-model="row.base" :disabled="editIndex !== index"></Checkbox>
            </template>
            <template slot-scope="{ row, index }" slot="editable">
                <Checkbox true-value="1" false-value="0" v-model="row.editable" :disabled="editIndex !== index"></Checkbox>
            </template>
            <template slot-scope="{ row, index }" slot="isList">
                <Checkbox true-value="1" false-value="0" v-model="row.isList" :disabled="editIndex !== index"></Checkbox>
            </template>
            <template slot-scope="{ row, index }" slot="isQuery">
                <Checkbox true-value="1" false-value="0" v-model="row.isQuery" :disabled="editIndex !== index"></Checkbox>
            </template>
            <template slot-scope="{ row, index }" slot="queryTypeValue">
                <Select v-model="editQueryType" clearable transfer filterable v-if="editIndex === index" @on-change="queryTypeChange(row, $event)">
                    <Option v-for="item in queryTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span v-else class="click_span">{{ row.queryTypeValue || '/' }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="sortable">
                <Checkbox true-value="true" false-value="false" v-model="row.sortable" :disabled="editIndex !== index"></Checkbox>
            </template>
            <template slot-scope="{ row, index }" slot="isFitPhone">
                <Checkbox true-value="1" false-value="0" v-model="row.isFitPhone" :disabled="editIndex !== index"></Checkbox>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <div class="active_box">
                    <div v-if="row.isAddAttribute" class="add_wrap" :class="{ disbaled: editIndex}"><a href="javascript:void(0);" @click="addAttribute">+ 新增属性</a></div>
                    <div v-else>
                        <a href="javaScript:void(0);" :class="{ disbaled: !editField || !editjdbcType }" v-if="editIndex === index" @click="save(row)">保存</a>
                        <a href="javaScript:void(0);" v-if="editIndex === index" @click="resetCol(index, row.type && row.field)">取消</a>
                        <a href="javaScript:void(0);" v-else @click="editCol(row, index)">编辑</a>
                        <!-- <a href="javaScript:void(0);" style="color: #FF0000;" @click="deleteById(row._id)" v-if="row._id">删除</a> -->
                        <CommonIcon type="_bianzu6" :size="16" :style="{ marginTop: '0px', display: 'inline-block', verticalAlign: 'middle'}" />
                    </div>
                </div>
            </template>
        </Table>

        <Modal v-model="dictModal" width="600" class-name="vertical-center-modal">
            <p slot="header"><span>新增字典项</span></p>
            <div class="body" transfer>
                <Form ref="dictForms" :model="dictForm" :rules="ruleValidate" :label-width="80">
                    <FormItem label="模块" prop="module">
                        <Select v-model="dictForm.module" @on-change="moduleChange">
                            <Option value="0">公共</Option>
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
        <Modal
            v-model="modal1"
            title="筛选设置"
            class="szmj"
            :loading="loading"
            @on-ok="ok"
            @on-cancel="cancel">
            <Form :label-width="100">
                <FormItem label="是否筛选：" prop="canFilter">
                    <RadioGroup v-model="canFilter" @on-change="changeCanFilter">
                        <Radio :label="true">是</Radio>
                        <Radio :label="false">否</Radio>
                    </RadioGroup>
                </FormItem>
                <div v-show="canFilter">
                    <FormItem label="是否复选：" prop="filterMultiple">
                        <RadioGroup v-model="filterMultiple">
                            <Radio :label="true">是</Radio>
                            <Radio :label="false">否</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="筛选类别：" prop="filterType">
                        <RadioGroup v-model="filterType" @on-change="changeFilterType">
                            <Radio label="filtersKey">字典</Radio>
                            <Radio label="filterList">自定义枚举</Radio>
                        </RadioGroup>
                    </FormItem>
                    <!-- <FormItem label="字典Key：" prop="name" v-show="filterType == 'filtersKey'">
                        <Input v-model="filtersKey" placeholder="请输入字典KEY"></Input>
                    </FormItem> -->
                    <FormItem label="模块：" prop="module" v-show="filterType == 'filtersKey'">
                        <Select v-model="dictForm.module" @on-change="moduleChange">
                            <Option value="0">公共</Option>
                            <Option :value="item.id" v-for="item in menuList" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="字典项：" prop="filtersKey" v-show="filterType == 'filtersKey'">
                        <Select v-model="filtersKey" @on-change="setFiltersLabel">
                            <Option :value="item.value" v-for="item in dictionaryList" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <div v-show="filterType == 'filterList'" style="padding-left: 50px;">
                        <div v-for="(item, index) in filterList" :key="index">
                            <FormItem
                                label="label："
                                :label-width="50"
                                style="display:inline-block;"
                            >
                                <Input v-model="item.label" style="width:120px;" placeholder="请输入label"></Input>
                            </FormItem>
                            <FormItem
                                label="value："
                                :label-width="50"
                                style="display:inline-block;margin-left:8px;"
                            >
                                <Input v-model="item.value" style="width:120px;" placeholder="请输入value"></Input>
                            </FormItem>
                            <div style="display:inline-block;">
                                <span class="addOrRemove" @click="addFilterList(index)">+</span>
                                <span class="addOrRemove" v-show="filterList.length > 1" @click="reduceFilterList(index)">-</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
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
                { label: '文本域', value: 'textarea' },
                { label: '隐藏字段', value: 'hidden' },
                { label: '数字输入框', value: 'InputNumber' },
                // { label: '自动生成', value: 'autoComplete' },
                { label: '单选框', value: 'radio' },
                { label: '多选框', value: 'checkbox' },
                { label: '下拉选择框', value: 'select' },
                { label: '开关', value: 'switch' },
                { label: '多级联动', value: 'cascader' },
                { label: '日期选择器', value: 'DatePicker' },
                { label: '时间选择器', value: 'TimePicker' },
                { label: '地址选择器', value: 'AddressMap' },
                { label: '颜色选择框', value: 'ColorPicker' },
                // { label: '上传', value: 'upload' },
                { label: '评分', value: 'rate' },
                { label: '滑块', value: 'slider' }
                // { label: '树形组件', value: 'tree' }
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
                // {
                //     title: '关联字典值',
                //     slot: 'dictValue',
                //     minWidth: 150
                // },
                {
                    title: '关联字典值',
                    slot: 'filterSetting',
                    minWidth: 120
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
                    title: '排序',
                    slot: 'sortable',
                    minWidth: 60
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
            editQueryTypeValue: '',
            filtersKey: '',
            filterList: [],
            modal1: false,
            loading: true,
            canFilter: false,
            filterType: '',
            filterMultiple: false,
            filtersLabel:'',
        };
    },
    computed: {},
    components: {
        CommonIcon
    },
    created() {
        console.log();
        this.getQueryType();
        this.getListMenu();
        this.getList();
    },
    mounted() {},
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        addFilterList(index){
            this.filterList.splice(index + 1, 0, {
                value:'',
                label:''
            });
        },
        reduceFilterList(index){
            this.filterList.splice(index,1)
        },
        changeCanFilter(val){
            if(val){
                if((this.filterList && this.filterList.length) && (!this.filtersKey)){
                    this.filterType = 'filterList'
                } else {
                    this.filterType = 'filtersKey'
                }
            }
        },
        changeFilterType(val){
            if(val == 'filtersKey'){

            } else {
                if((!this.filterList) || (!this.filterList.length)){
                    this.filterList = [{
                        value:'',
                        label:''
                    }]
                }
            }
        },
        editFilterList(row, index){
            //判断是否可筛选
            if(row.filtersKey || (row.filterList && row.filterList.length)){
                this.canFilter = true
            } else {
                this.canFilter = false
            }

            // 如果可筛选，判断现有设置的涉嫌类别
            if(this.canFilter){
                if(row.filtersKey){
                    this.filtersKey = row.filtersKey
                    this.filtersLabel=row.filtersLabel;
                    this.filterType = 'filtersKey'
                    this.filterList = []
                } else {
                    this.filterList = row.filterList
                    this.filterType = 'filterList'
                }
                this.filterMultiple = row.filterMultiple ? true : false
            } else {
                this.filtersKey = ''
                    this.filtersLabel= '';
                this.filterType = ''
                this.filterList = []
                this.filterMultiple = false
            }
            this.modal1 = true
        },
        ok(){
            if(this.canFilter){
                if(this.filterType == 'filtersKey'){
                    if(this.filtersKey){
                        this.$set(this.dataList[this.editIndex],'filterList', [])
                        this.$set(this.dataList[this.editIndex],'filtersKey', this.filtersKey)
                        this.$set(this.dataList[this.editIndex],'filtersLabel', this.filtersLabel)
                        this.$set(this.dataList[this.editIndex],'filterMultiple', this.filterMultiple)
                        this.modal1 = false
                    } else {
                        this.$Message.error('请选择字典项')
                        this.modal1 = true
                        this.loading = false
                        setTimeout(()=>{
                            this.loading = true
                        },1000)
                    }
                } else {
                    let flag = false
                    this.filterList.forEach((item)=>{
                        if(!item.value || !item.label){
                            flag = true
                        }
                    })
                    if(flag){
                        this.$Message.error('label、value均必须填写')
                        this.modal1 = true
                        this.loading = false
                        setTimeout(()=>{
                            this.loading = true
                        },1000)
                    } else {
                        this.$set(this.dataList[this.editIndex],'filterList', this.filterList)
                        this.$set(this.dataList[this.editIndex],'filtersKey', '')
                        this.$set(this.dataList[this.editIndex],'filtersLabel', '')
                        this.$set(this.dataList[this.editIndex],'filterMultiple', this.filterMultiple)
                        this.modal1 = false
                    }
                }
            } else {
                this.$set(this.dataList[this.editIndex],'filterList', [])
                this.$set(this.dataList[this.editIndex],'filtersKey', '')
                this.$set(this.dataList[this.editIndex],'filtersLabel', '')
                this.$set(this.dataList[this.editIndex],'filterMultiple', false)
                this.modal1 = false
            }
        },
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
                            name: '',
                            enName: '',
                            field: '',
                            jdbcType: '',
                            type: '',
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
                            tableName: this.tableName,
                            isAddAttribute: true
                        };
                        if (this.category == 'all') {
                        } else {
                            this.dataList.push(dataObj);
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
        saveSingle(params, isCheck) {
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
                    } else {
                        if (isCheck) {
                            this.getList();
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
        editCol(item, index,isAdd=null) {
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
            this.dictForm.module = item.menuId;
            this.moduleChange(item.menuId)
            if(!isAdd){
                this.dataList=this.dataList.filter(v=>(v.field && v.jdbcType)||v.isAddAttribute);
            }
        },
        resetCol(ind, isRetain) {
            console.log(isRetain);
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
            if (!isRetain) {
                this.dataList.splice(ind, 1);
            }
            this.getList();
        },
        save(item, isCheck) {
            let obj = Object.assign({}, item);
            if (!isCheck) {
                if(this.canFilter){
                    if(this.filterType == 'filtersKey'){
                        obj.filtersKey = this.filtersKey;
                        obj.filtersLabel = this.filtersLabel;
                        obj.filterList = [];
                        obj.filters = '[]';
                        obj.filterMultiple = this.filterMultiple;
                    } else {
                        obj.filtersKey = '';
                        obj.filtersLabel = '';
                        obj.filterList = this.filterList;
                        obj.filters = JSON.stringify(this.filterList);
                        obj.filterMultiple = this.filterMultiple;
                    }
                } else {
                    obj.filtersKey = '';
                    obj.filtersLabel = '';
                    obj.filterList = [];
                    obj.filters = '[]';
                    obj.filterMultiple = false;
                }

                obj.name = this.editName;
                obj.enName = this.editEnName;
                obj.field = this.editField;
                obj.jdbcType = this.editjdbcType;
                if (obj.jdbcType == 'AddressMap') {
                    obj.isObjField = '1';
                    obj.objFieldKeys = ['address','latLongAddress'];
                } else {
                    obj.isObjField = '0';
                    obj.objFieldKeys = null;
                }
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
            }
            if(isCheck&&this.editIndex){
            }else{
                this.saveSingle(obj, isCheck);
            }
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
        },
        handleSpan({ row, column, rowIndex, columnIndex }) {
            if (row.isAddAttribute == true && columnIndex === this.columns.length - 1) {
                return [1, this.columns.length];
            } else if (row.isAddAttribute == true) {
                return [0, 0];
            } else {
                return [1, 1];
            }
        },
        addAttribute() {
            let dataObj = {
                name: '',
                enName: '',
                field: '',
                jdbcType: '',
                type: '',
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
                this.dataList.splice(-1, 0, dataObj);
            }
            this.$nextTick(() => {
                this.editCol(dataObj, this.dataList.length - 2,true);
            });
        },
        setFiltersLabel(val){
            this.filtersLabel=this.dictionaryList.find(v=>v.value==val).label;
        }
    },
    watch: {
        tableName: {
            handler(val, oldVal) {
                this.getList();
            },
            deep: true
        }
    },
    filters:{
        filterListFilter(row){
            if(row.filtersKey){
                return row.filtersLabel + ' ' + (row.filterMultiple ? '复选': '单选')
            } else if(row.filterList && row.filterList.length){
                let labels = row.filterList.map(item=>{
                    return item.label
                })
                return labels.join(',') + ' ' + (row.filterMultiple ? '复选': '单选')
            } else {
                return '设置'
            }
        },
        filterListFilter1(row){
            if(row.filtersKey){
                return row.filtersLabel + ' ' + (row.filterMultiple ? '复选': '单选')
            } else if(row.filterList && row.filterList.length){
                let labels = row.filterList.map(item=>{
                    return item.label
                })
                return labels.join(',') + ' ' + (row.filterMultiple ? '复选': '单选')
            } else {
                return '/'
            }
        }
    }
};
</script>
