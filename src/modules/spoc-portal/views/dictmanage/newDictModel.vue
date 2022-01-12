<style lang="less">
    .dictable-wrap {
        @borderColor: #57a3f3;
        .menu-item-lists {
            min-height: 251px;
            padding-bottom: 1px;
        }
        .table_wrap {
            margin-top: 12px;
            .table_action {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                a {
                    margin-right: 14px;
                }
            }
        }
        .listMsg {
            .btnlist {
                position: relative;
                height: 40px;
                line-height: 40px;
                border: 1px solid #e0e0e0;
                background: #fafafa;
                border-radius: 2px;
                text-indent: 20px;
                .btnright {
                    position: absolute;
                    top: -1px;
                    right: 20px;
                }
                button {
                    height: 30px;
                    border-color: transparent;
                }
                .lineSide {
                    position: absolute;
                    top: -1px;
                    left: -1px;
                    height: 40px;
                    width: 5px;
                    /*background: #2d8cf0;*/
                    border-radius: 2px 0 0 2px;
                }
                .altersort {
                    border-color: #888;
                    color: #000;
                }
                .savesort {
                    border-color: @borderColor;
                    color: @borderColor;
                }
            }
        }
        .menulist-table {
            max-height: ~"calc(100vh - 180px)";
            overflow: auto;
            position: relative;
            .linkbtn {
                margin-left: 8px;
            }
            .nodata {
                padding: 40px 0;
                text-align: center;
            }
            .thead {
                color: #000;
                font-weight: bold;
                overflow: hidden;
                border-bottom: 1px solid #e5e5e5;
                margin-bottom: -1px;
                [class^="item-"] {
                    line-height: 40px;
                }
            }
            [class^="item-"] {
                float: left;
                min-height: 40px;
                min-width: 1%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: center;
            }
            .menu-item-lists {
                .menu-item {
                    &:first-child {
                        .menu-list-item {
                            border: none;
                        }
                    }
                }
            }
            .item-foldable {
                width: 2%;
                text-align: right;
                cursor: pointer;
                &:hover {
                    .iconfont {
                        color: #888;
                    }
                }
            }
            .item-name {
                width: 20%;
            }
            .item-val {
                width: 10%;
            }
            .item-type {
                width: 20%;
            }
            .item-brief {
                width: 10%;
            }
            .item-sort {
                width: 8%;
            }
            .item-show {
                width: 15%;
            }
            .item-ctrls {
                width: 17%;
            }
            .menu-list-item-wrap {
                .menu-list-item {
                    height: 40px;
                    line-height: 40px;
                    border-top: 1px solid #e5e5e5;
                    border-bottom: 1px solid #e5e5e5;
                    overflow: hidden;
                    margin-bottom: -1px;
                    .iconfont {
                        color: #d9d9d9;
                        transition: all 0.3s ease;
                    }
                }
            }
        }
        .page-box {
            padding-top: 20px;
            padding: 18px;
            text-align: center;
            margin-bottom: 120px;
        }
    }

    .new-dict-wrap {
        .ivu-form-item {
            margin-bottom: 15px;
        }
        .ivu-input,
        .ivu-input-number-input,
        .ivu-select-single .ivu-select-selection {
            width: 450px;
            height: 35px;
        }
        .ivu-select,
        .inline-block {
            width: 450px;
            height: 35px;
            float: left;
            margin-right: 20px;
        }
        .ivu-select-input {
            width: 178px;
            height: 33px;
        }
        .ivu-input-number {
            width: 192px;
        }
        .ivu-form-item-error-tip {
            top: 37px;
            padding: 0;
        }
        .ivu-select-input[disabled] {
            color: #495060;
        }
        .clear {
            zoom: 1;
            &:after {
                content: "";
                display: table;
                clear: both;
            }
        }
        .newEnglishName {
            .ivu-select;
            border: 1px solid #dddee1;
            background: #f1f1f1;
            border-radius: 3px;
            padding: 0 24px 0 8px;
            overflow: hidden;
        }
        .fullTextarea {
            .ivu-input {
                width: 100%;
            }
        }
        .addTypeBox {
            position: relative;
            .error {
                position: absolute;
                top: 37px;
                line-height: 1;
                color: #ed3f14;
                &:nth-of-type(1) {
                    left: 0;
                }
                &:nth-of-type(2) {
                    left: 200px;
                }
            }
            &.error {
                .newEnglishName,
                .ivu-select-selection {
                    border-color: #ed3f14;
                }
            }
        }
        .ivu-form-item-required .ivu-form-item-label:before {
            display: none;
        }
    }
</style>

<template>
    <div class="dictable-wrap">
        <Modal v-model="newDictModel" class="new-dict-wrap" :title="modalTitle" width="600" :loading="newDictModelLoading" ref='modal'>
            <Form ref="formItem" :model="formItem" :label-width="100" :rules="ruleValidate">
                <FormItem label="岗位名称：" prop="label" :rules="{required:true,message:'该项不能为空',trigger: 'blur'}">
                    <Input v-model="formItem.label" :maxlength="40" />
                </FormItem>
<!--                <FormItem label="字典值：" prop="value" :rules="{required:true,message:'该项不能为空',trigger: 'blur'}">-->
<!--                    <Input v-model="formItem.value" />&lt;!&ndash;:disabled="modalTitle=='编辑字典项'"&ndash;&gt;-->
<!--                </FormItem>-->
<!--                <FormItem label="父级：" v-if="formItem.parent">-->
<!--                    <div class="newEnglishName">{{ formItem.parent }}</div>-->
<!--                </FormItem>-->
<!--                <FormItem label="排序：">-->
<!--                    <InputNumber :precision="0" :min="1" v-model="formItem.sort" disabled></InputNumber>-->
<!--                </FormItem>-->
<!--                <FormItem label="状态：">-->
<!--                    <i-switch v-model="formItem.isHidden" size="large">-->
<!--                        <span slot="open">显示</span>-->
<!--                        <span slot="close">隐藏</span>-->
<!--                    </i-switch>-->
<!--                </FormItem>-->
<!--                <FormItem label="描述：">-->
<!--                    <Input v-model="formItem.description" />-->
<!--                </FormItem>-->
<!--                <FormItem label="备注：">-->
<!--                    <Input v-model="formItem.remarks" type="textarea" class="fullTextarea" :autosize="{minRows: 2,maxRows: 5}" />-->
<!--                </FormItem>-->
            </Form>
            <div slot="footer">
                <Button @click="cancel">取消</Button>
                <Button type="primary" @click="ok">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import childernTable from "./dictChildernTable.vue"
    import valid, {
        errors,
        sysDict
    } from '../../libs/request.js';

    import {
        mapMutations
    } from 'vuex';
    export default {
        data() {
            return {
                spinShow: true, //loading
                isEditList: false, //编辑状态
                title: '',
                delDictModal: false,
                pageNo: 1,
                pageCount: 0,
                pageSize: 10,
                listCount: 0,
                newDictModel: false,
                englishName: '',
                chineseName: '',
                addTypeShow: false,
                canAddType: true,
                descriptionRight: false,
                typeRight: false,
                chioceRight: false,
                initializeTypeID: '',
                initializeTypeName: '',
                initializeParentId: '',
                initValue: '',
                newDictModelLoading: true,
                isRoot: '',
                modalTitle: '新增字典项',
                delMenuID: '',
                menuId: 0,
                typeLists: [],
                formItem: {
                    label: '',
                    value: '',
                    sort: 1,
                    isHidden: true,
                    remarks: '',
                    type: '',
                    parent: '',
                    parentID: '',
                    parentVal: '',
                    parentLabel: ''
                },
                editMenuID: '',
                checkTree: false,
                ruleValidate: {
                    label: [{
                        required: true,
                        message: '显示名称不能为空',
                        trigger: 'blur'
                    }],
                    value: [{
                        required: true,
                        message: '字典值不能为空',
                        trigger: 'blur'
                    }]
                },
                currSubMenu: [],
                state: {
                    issort: false
                },
            }
        },
        components:{

        },
        mounted() {

        },

        methods: {
            ...mapMutations(['updateLoadingStatus']),
            show() {
                this.getTree()
            },
            getTree() {
                let params = {
                    type: 'root',
                    menuId: 0
                }
                sysDict.DictListDataNew(params).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        let _data = res.data.data;
                        let obj = _data.filter((item)=>{
                            return item.value == 'sys_user_job'
                        })
                       this.needUpload(obj[0])
                    }
                }).catch(errors.call(this));
            },
            needUpload(item) {
                this.formItem = {
                    label: '',
                    value: '',
                    sort: this.currSubMenu.length + 1,
                    isHidden: true,
                    remarks: '',
                    type: this.initializeTypeID,
                    parent: '',
                    parentID: '',
                    description: ''
                }
                this.newDictModel = true;
                this.isRoot = item.isRoot;
                this.initializeTypeID = item.id;
                this.initializeTypeName = item.type;
                this.initializeParentId = item.parentId;
                this.initValue = item.value;
                this.title = item.label;
                this.initMenuId = item.menuId;
            },
            RandomNumBoth(Min,Max){
                let Range = Max - Min;
                let Rand = Math.random();
                let num = Min + Math.round(Rand * Range); //四舍五入
                return num;
            },
            ok() {
                this.$refs.modal.buttonLoading = true;
                let params = {
                    description: this.title,
                    label: this.formItem.label,
                    remarks: this.formItem.remarks,
                    sort: this.formItem.sort,
                    value: "sys_user_job"+ this.RandomNumBoth(1,9999)+this.RandomNumBoth(1,99999),
                    type: this.initValue,
                    menuId: this.initMenuId
                }
                // 所选分类为一级分类即parentId=0或自定义分类，
                // 传参parentId=0,否则parentId=所选分类Id
                if(!this.initializeParentId || this.initializeParentId == 0) {
                    params.parentId = 0;
                } else {
                    params.parentId = this.initializeTypeID;
                }
                // 显示、隐藏
                if(this.formItem.isHidden) {
                    params.isHidden = 0
                } else {
                    params.isHidden = 3
                }
                // 编辑
                if(this.editMenuID) {
                    params.id = this.editMenuID
                }

                if(this.formItem.parent) {
                    // 添加下级
                    // console.log('添加下级')
                    params.parentId = this.formItem.parentID;
                    params.description = this.formItem.description;
                    params.type = this.formItem.parentVal;
                    this.chioceRight = false;
                } else {
                    params.description = this.formItem.description;
                }
                params.description = '在向导页添加！'
                this.$refs['formItem'].validate((validout) => {
                    if(validout) {
                        sysDict.DictSave(params).then(valid.call(this)).then(res => {
                            if(res.ok) {
                                this.newDictModel = false;
                                this.$emit('refresh');
                            }
                        }).catch(errors.call(this)).finally(() => {
                            this.$refs.modal.buttonLoading = false;
                        });
                    } else {
                        this.$refs.modal.buttonLoading = false;
                    }
                })
            },
            cancel() {
                this.newDictModel=false;
                this.$refs['formItem'].resetFields();
            },
        },

    }
</script>