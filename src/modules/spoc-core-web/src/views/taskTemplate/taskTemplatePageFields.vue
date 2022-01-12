<style lang="less">
.taskTemplatePageFields {
    .ivu-modal-header {
        background: rgba(247, 248, 250, 1);
        border-radius: 4px 4px 0px 0px;
        .ivu-modal-header-inner {
            // font-size: 18px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
        }
    }
    .ivu-modal-footer {
        .ivu-btn-text {
            border: 1px solid #dcdee2;
        }
    }
    .add_wrap {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .ivu-modal-body {
        .ivu-input {
            font-size: 12px;
        }
        .ivu-select-input {
            font-size: 12px;
        }
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
    // .#dcdee
    // .pageStyle {
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     padding-top: 10px;
    //     /* .ivu-page-item-active {
    //   border-color: #2d8cf0;

    // } */
    // }
}
</style>
<template>
    <div>
        <Modal :mask-closable="false" v-model="classShowTipBoo" class-name="taskTemplatePageFields" title="选择H5页面字段" width="1000">
            <div>
                <Input v-model="fieldName" placeholder="字段名称" style="width:224px;" />
                <Button type="primary" style="margin-left:12px" @click="doSearch">搜索</Button>
                <Table :columns="columns0" :data="data0" style="margin-top:20px;" :draggable="!editIndex" @on-drag-drop="tableDragDrop" :span-method="handleSpan">
                    <template slot-scope="{ row, index }" slot="index">
                        {{ index + 1 }}
                    </template>
                    <template slot-scope="{ row, index }" slot="name">
                        <Input type="text" v-model="editName" placeholder="点击输入自定义名称" v-if="editIndex === index" />
                        <span v-else @click="editCol(row, index)" class="click_span">{{ row.name || '/' }}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="field">
                        <Input type="text" v-model="editField" placeholder="Click enter custom name" v-if="editIndex === index" />
                        <span v-else @click="editCol(row, index)" class="click_span">{{ row.field || '/' }}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="type">
                        <Select v-model="editjdbcType" placeholder="点击输入字段类型" clearable transfer filterable v-if="editIndex === index">
                            <Option v-for="item in formList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <span v-else @click="editCol(row, index)" class="click_span">{{ row.type }}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="filtersLabel">
                        <Upload
                            v-if="editIndex === index && editjdbcType == 'uploadTemplate' && !editFiltersKey"
                            :action="uploadUrl"
                            :headers="headers"
                            :show-upload-list="false"
                            name="file"
                            :format="['doc', 'docx']"
                            :on-format-error="handleFormatError"
                            :on-success="HandleSuccess"
                            :data="{
                                type: 'crmQrcode',
                                dirName: 'all',
                                remarks: '',
                                menuId: '1001',
                                bizId: 1,
                                bizType: 'file',
                                isSingle: true
                            }"
                        >
                            <a href="javaScript:void(0);">上传模板</a>
                        </Upload>
                        <a href="javaScript:void(0);" v-else-if="editIndex === index && !editFiltersKey" @click="dictModal = true">关联</a>
                        <Tag type="border" :fade="false" closable v-else-if="editIndex === index && isString(editFiltersLabel)" @on-close="closefiltersKey">
                            {{ editFiltersLabel }}
                        </Tag>
                        <Tag type="border" :fade="false" closable v-else-if="editIndex === index && isObject(editFiltersLabel)" @on-close="deleteById(editFiltersLabel.id)">
                            {{ editFiltersLabel.submittedFileName }}
                        </Tag>
                        <span v-else-if="editIndex !== index && isString(row.filtersLabel)" @click="editCol(row, index)" class="click_span">{{ row.filtersLabel || '/' }}</span>
                        <span v-else @click="editCol(row, index)" class="click_span">{{ row.filtersLabel.submittedFileName || '/' }}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="isSelect">
                        <Checkbox v-model="row.isEdit" true-value="1" false-value="0" @on-change="isEditChange(index, $event)"></Checkbox>
                        <!-- <i-switch v-model="row.isEdit" true-value="1" false-value="0" @on-change="isEditChange(index, $event)">
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </i-switch> -->
                    </template>
                    <template slot-scope="{ row, index }" slot="isRequire">
                        <i-switch v-model="row.required" true-value="1" false-value="0" @on-change="requiredChange(index, $event)">
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </i-switch>
                    </template>
                    <template slot-scope="{ row, index }" slot="move">
                        <div v-if="row.isAddAttribute" class="add_wrap" :class="{ disbaled: editIndex }"><a href="javascript:void(0);" @click="addAttribute">+ 新增属性</a></div>
                        <div v-else-if="editIndex === index">
                            <a href="javaScript:void(0);" :class="{ disbaled: !editField || !editjdbcType }" @click="save(row, index)">保存</a>
                            <a href="javaScript:void(0);" @click="resetCol(index, row.type && row.field)" style="margin-left: 10px;">取消</a>
                        </div>
                        <div v-else><CommonIcon type="_bianzu6" :size="16" :style="{ marginTop: '0px', display: 'inline-block', verticalAlign: 'middle' }" /></div>
                    </template>
                </Table>

                <!-- <div class="pageStyle"><Page :total="totalPage" size="small" show-elevator show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange" /></div> -->
            </div>
            <div slot="footer" class="modiRoomTip">
                <Button @click="handleReset" style="margin-left: 8px">取消</Button>
                <Button type="primary" @click="handleSubmit">确定</Button>
            </div>
        </Modal>
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
    </div>
</template>
<script>
import { mapMutations } from 'vuex';

import CommonIcon from '_c/common-icon';
import valid, { errors, common, sysDict, SysProps, sysMenu, sysAttachment, api } from '../../libs/request';
export default {
    mounted() {
        this.uploadUrl = api.fileAttachmentUploadUrl();
        this.headers = {
            token: localStorage.getItem('token'),
            tenant: localStorage.getItem('tenant')
        };
        this.getcustomerList();
        this.getListMenu();
    },
    props: {
        editFormData: {
            type: Array
        }
    },
    data() {
        return {
            headers: {},
            uploadUrl: '',
            fieldName: '',
            classShowTipBoo: false,
            data0: [],
            dataCopy: [],
            columns0: [
                {
                    title: '是否选择本字段',
                    slot: 'isSelect',
                    width: 120
                },
                {
                    title: '序号',
                    type: 'index',
                    slot: 'index',
                    width: 60
                },
                {
                    title: '字段名称',
                    slot: 'name'
                },
                {
                    title: '关联字段',
                    slot: 'field'
                },
                {
                    title: '填写方式',
                    slot: 'type'
                },
                {
                    title: '关联字典值',
                    slot: 'filtersLabel',
                    minWidth: 80
                },
                {
                    title: '是否必填',
                    slot: 'isRequire'
                },
                {
                    title: '位置管理',
                    slot: 'move'
                }
            ],
            editIndex: '',
            editName: '',
            editEnName: '',
            editField: '',
            editjdbcType: '',
            editType: '',
            editFiltersKey: '',
            editFiltersLabel: '',
            editQueryType: '',
            editQueryTypeValue: '',
            dictModal: false,
            dictForm: {
                module: '',
                dictionary: ''
            },
            ruleValidate: {
                module: [{ required: true, message: '请选择模块', trigger: 'change' }],
                dictionary: [{ required: true, message: '请选择字典项', trigger: 'change' }]
            },
            menuList: [],
            dictionaryList: [],
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
                {
                    label: '上传文档',
                    value: 'upload',
                    props: {
                        prop: '',
                        type: 'select',
                        uploadType: 'file',
                        name: 'files',
                        multiple: false,
                        accept: '.doc,.docx',
                        format: ['doc', 'docx'],
                        // "maxSize":2048,
                        maxLength: 1,
                        data: {
                            type: 'com_form_table_file',
                            dirName: 'all',
                            menuId: 1001,
                            bizId: '',
                            bizType: 'image',
                            isSingle: true
                        }
                    }
                },
                {
                    label: '按模板上传文档',
                    value: 'uploadTemplate',
                    props: {
                        prop: '',
                        type: 'select',
                        uploadType: 'file',
                        name: 'files',
                        multiple: false,
                        accept: '.doc,.docx',
                        format: ['doc', 'docx'],
                        // "maxSize":2048,
                        maxLength: 1,
                        data: {
                            type: 'com_form_table_file',
                            dirName: 'all',
                            menuId: 1001,
                            bizId: '',
                            bizType: 'image',
                            isSingle: true
                        }
                    }
                },
                { label: '评分', value: 'rate' },
                { label: '滑块', value: 'slider' }
                // { label: '树形组件', value: 'tree' }
            ]
        };
    },
    computed: {
        uploadImg: function() {
            return sysAttachment.uploadFileUrl();
        }
    },
    components: {
        CommonIcon
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        isObject(val) {
            return val != null && typeof val === 'object' && Array.isArray(val) === false;
        },
        isString(obj) {
            return obj === obj + '';
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '格式不正确',
                desc: '文件名为' + file.name + '格式不正确, 请选择.doc 或者.docx格式的文件'
            });
        },
        HandleSuccess(data) {
            if (data.isSuccess) {
                this.$Message.success('上传成功');
                this.editFiltersLabel = data.data;
                this.editFiltersKey = 'update';
            } else {
                this.$Message.error(data.msg);
            }
        },
        deleteById(id) {
            this.updateLoadingStatus({ isLoading: true });
            api
                .delBybiz({
                    bizId:id
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        console.log(res.data.data);
                        this.editFiltersLabel = null;
                        this.editFiltersKey = null;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
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
        doSearch() {
            if (this.fieldName) {
                this.data0 = this.dataCopy.filter(item => {
                    return item.name.indexOf(this.fieldName) > -1;
                });
            } else {
                this.data0 = [].concat(this.dataCopy);
            }
        },
        getcustomerList() {
            // let params = {
            //     // tableName: "crm_customer",
            //     // isFitPhone: 1
            //     tableName: 'com_task',
            //     category: 'ugcField'
            // };
            // SysProps.list(params)
            //     .then(valid.call(this))
            //     .then(res => {
            //         if (res.ok) {}
            //     })
            //     .catch(errors.call(this))
            //     .finally(() => {});

            let dataObj = {
                name: '',
                enName: '',
                field: '',
                jdbcType: '',
                type: '',
                menuId: '',
                filtersKey: '',
                filtersLabel: '',
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
            if (this.editFormData && this.editFormData.length) {
                //反现
                let q = []; //res.data.data;
                let arr = [];
                this.editFormData.forEach((item, index) => {
                    // q.forEach(itemChild => {
                    //     if (itemChild._id == item._id) {
                    //         itemChild.isEdit = item.isEdit;
                    //         itemChild.required = item.required;
                    //     } else {
                    //         if (!arr.find(v => v.field == item.field) && !q.find(v => v._id == item._id)) {
                    //             arr.push(item);
                    //         }
                    //     }
                    // });

                    if (!arr.find(v => v.field == item.field) && !q.find(v => v._id == item._id)) {
                        arr.push(item);
                    }
                });
                q = q.concat(arr);
                q.push(dataObj);
                this.data0 = q;
                this.dataCopy = [].concat(q);
            } else {
                let p = []; //res.data.data;
                p.push(dataObj);
                this.data0 = p;
                this.dataCopy = [].concat(p);
            }
        },
        handleSubmit() {
            this.classShowTipBoo = false;
            this.$emit('chooseDetailMethod', this.data0);
        },
        handleReset() {
            this.classShowTipBoo = false;
        },
        classShowMethods() {
            this.fieldName = '';
            this.classShowTipBoo = true;
        },
        tableDragDrop(index1, index2) {
            let item1 = this.data0[index1];
            let item2 = this.data0[index2];
            this.data0.splice(index1, 1, item2);
            this.data0.splice(index2, 1, item1);
            console.log(item1, item2);
        },
        isEditChange(ind, e) {
            this.$set(this.data0[ind], 'isEdit', e);
        },
        requiredChange(ind, e) {
            this.$set(this.data0[ind], 'required', e);
        },
        handleSpan({ row, column, rowIndex, columnIndex }) {
            if (row.isAddAttribute == true && columnIndex === this.columns0.length - 1) {
                return [1, this.columns0.length];
            } else if (row.isAddAttribute == true) {
                return [0, 0];
            } else {
                return [1, 1];
            }
        },
        editCol(item, index, isAdd = null) {
            this.editIndex = index;
            this.editName = item.name;
            this.editEnName = item.enName;
            this.editField = item.field;
            this.editjdbcType = item.jdbcType;
            this.editType = item.type;
            this.editFiltersKey = item.filtersKey;
            this.editFiltersLabel = item.filtersLabel;
            this.menuId = item.menuId;
            this.editQueryType = item.queryType;
            if (!isAdd) {
                this.data0 = this.data0.filter(v => (v.field && v.jdbcType) || v.isAddAttribute);
            }
        },
        closefiltersKey() {
            this.editFiltersKey = '';
            this.editFiltersLabel = '';
            this.menuId = '';
        },
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
                    this.editFiltersKey = this.dictForm.dictionary;
                    let obj = this.dictionaryList.find(v => v.value == this.dictForm.dictionary);
                    this.editFiltersLabel = obj ? obj.label : '--';
                    this.menuId = this.dictForm.module;
                    this.dictModal = false;
                    this.dictForm = {
                        module: '',
                        dictionary: ''
                    };
                    this.handleResetDict(name);
                } else {
                }
            });
        },
        handleResetDict(name) {
            this.$refs[name].resetFields();
        },
        addAttribute() {
            let dataObj = {
                name: '',
                enName: '',
                field: '',
                jdbcType: '',
                type: '',
                menuId: '',
                filtersKey: '',
                filtersLabel: '',
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
            this.data0.splice(-1, 0, dataObj);
            this.$nextTick(() => {
                this.editCol(dataObj, this.data0.length - 2, true);
            });
        },
        save(item, ind) {
            let obj = Object.assign({}, item);
            item.name = this.editName;
            item.enName = this.editEnName;
            item.field = this.editField;
            item.jdbcType = this.editjdbcType;
            if (item.jdbcType == 'AddressMap') {
                item.isObjField = '1';
                item.objFieldKeys = ['address', 'latLongAddress'];
            } else {
                item.isObjField = '0';
                item.objFieldKeys = null;
            }
            if (item.jdbcType == 'upload' || item.jdbcType == 'uploadTemplate') {
                item.props = this.formList.find(v => v.value == item.jdbcType).props;
            }
            // obj.type = this.editType;
            item.filtersKey = this.editFiltersKey;
            item.filtersLabel = this.editFiltersLabel;
            item.queryType = this.editQueryType;
            item.menuId = this.menuId;
            if (item.jdbcType) {
                let object = this.formList.find(v => v.value == item.jdbcType);
                item.type = object ? object.label : '--';
            } else {
                item.type = '';
            }
            if (item.queryType) {
                let object = this.queryTypeList.find(v => v.value == item.queryType);
                item.queryTypeValue = object ? object.label : '--';
            } else {
                item.queryTypeValue = '';
            }
            this.$set(this.data0, ind, item);
            this.editIndex = '';
            this.editName = '';
            this.editEnName = '';
            this.editField = '';
            this.editjdbcType = '';
            this.editType = '';
            this.editFiltersKey = '';
            this.editFiltersLabel = '';
            this.editQueryType = '';
            this.menuId = '';
        },
        resetCol(ind, isRetain) {
            this.editIndex = '';
            this.editName = '';
            this.editEnName = '';
            this.editField = '';
            this.editjdbcType = '';
            this.editType = '';
            this.editFiltersKey = '';
            this.editFiltersLabel = '';
            this.editQueryType = '';
            this.menuId = '';
            if (!isRetain) {
                this.data0.splice(ind, 1);
            }
        }
    }
};
</script>
