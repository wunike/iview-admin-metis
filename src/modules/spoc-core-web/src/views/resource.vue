<style lang="less">
@borderColor: #73cdc9;
@themeGreen: #2d8cf0;
.resource-administration {
    padding: 10px;
    height: 100%;
    overflow-y: auto;
    background: #ffffff;
    // 表格 start
    .drag-tree-table {
        margin-top: 0;
    }
    .drag-tree-table-header {
        padding: 0;
        height: 50px;
        line-height: 50px;
        background: #f8f8f9;
        color: #000;
        border-bottom: 1px solid #eee;
        .tree-column:nth-child(1) {
            padding-left: 17px;
        }
    }
    .tree-column {
        text-align: left;
    }
    .tree-row .tree-column:nth-child(1) {
        padding-right: 17px;
    }
    .tree-row {
        padding: 9px 0;
    }
    .action-item {
        margin-right: 8px;
    }
    // 表格 end
    // .search {
    //     margin: 10px 0;
    // }
    .resourceTd .ivu-table-cell {
        white-space: nowrap;
    }
    .listMsg {
        padding: 8px 0 12px;
    }
    .fr {
        float: right;
    }
    .uploaddiv {
        height: 80px;
        .uploadWarning {
            display: none;
        }
        .open-progress {
            display: none;
        }
        label {
            margin-top: 25px;
        }
        .tip {
            display: block;
        }
        .ivu-form-item-error-tip {
            padding-top: 0;
        }
    }
}
</style>
<template>
    <div class="resource-administration">
        <div v-if="isMenu">
            <div class="listMsg">
                <Input search :placeholder="$t('modules_expandrow_19')" style="width: 396px" @on-click="onSearch" @on-search="onSearch" @on-enter="onSearch" v-model="search.text" />
                <Button type="primary" class="fr" @click="showAddMenu">{{ $t('views_resource_518') }}</Button>
            </div>
            <dragTreeTable id="dragTreeTable" :data="treeData" :onDrag="changSort"></dragTreeTable>
            <Modal v-if="resource_edit" class-name="vertical-center-modal addmodulemask" v-model="addModuleItem.visible" :title="formTitle" :loading="loading">
                <div>
                    <i-form ref="addmodule" :model="addModuleItem" :rules="addModuleItem.ruleValidate" :label-width="90">
                        <form-item :label="$t('views_resource_519')" prop="icon" class="uploaddiv">
                            <i-input v-model="addModuleItem.icon" v-show="false"></i-input>
                            <img :src="addModuleItem.icon" alt="" class="module-icon" />
                            <Upload ref="upload"
                                :data="{
                                    bizId: objectId,
                                    bizType: 'image',
                                    isSingle: true
                                }"
                                :headers="headers"
                                :show-upload-list="false"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png','svg']"
                                :max-size="100"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :action="uploadUrl"
                                name="file"
                                style="display: inline-block;width:94px;">
                                <Button type="primary">{{$t('views_resource_520')}}</Button>
                            </Upload>
                            <!-- <cos-upload
                                ref="lrUpload1"
                                v-if="objectType && kind && addModuleItem.visible"
                                :objectType="objectType"
                                :objectId="objectId"
                                :kind="kind"
                                :accept="['svg']"
                                :maxNum="1"
                                :maxSize="1"
                                :uploadButtonName="$t('views_resource_520')"
                                fileInputId="lrModal1"
                                :isChangeFile="true"
                                @hasUploadFile="hasUploadFile"
                            ></cos-upload> -->
                            <div class="tip">{{ $t('views_resource_521') }}</div>
                        </form-item>
                        <form-item :label="$t('views_resource_519')" prop="icon" v-if="false"><i-input v-model="addModuleItem.icon"></i-input></form-item>
                        <form-item :label="$t('views_resource_522')" prop="color" v-if="false"><ColorPicker v-model="addModuleItem.color" /></form-item>
                        <form-item :label="$t('messagemanagement_components_histroylists_310')" prop="name">
                            <i-input v-model="addModuleItem.name" :placeholder="$t('modules_expandrow_19')"></i-input>
                        </form-item>
                        <form-item :label="$t('modules_expandrow_20')"><span v-text="addModuleItem.parent.name"></span></form-item>
                        <form-item :label="$t('modules_expandrow_21')" prop="href">
                            <i-input v-model="addModuleItem.href" :placeholder="$t('modules_expandrow_22')"></i-input>
                        </form-item>
                        <!-- <form-item :label="$t('views_resource_527')" prop="sort">
                            <InputNumber v-model="addModuleItem.sort"></InputNumber>
                        </form-item> -->
                        <form-item :label="$t('pushsettings_index_496')" prop="isShow">
                            <i-switch size="large" v-model="addModuleItem.isShow">
                                <span slot="open">{{ $t('modules_expandrow_25') }}</span>
                                <span slot="close">{{ $t('modules_expandrow_14') }}</span>
                            </i-switch>
                        </form-item>
                        <form-item :label="$t('modules_leftremenu_94')" prop="isQuick" v-if="!addModuleItem.issub">
                            <i-switch size="large" v-model="addModuleItem.isQuick">
                                <span slot="open">{{ $t('modules_leftremenu_92') }}</span>
                                <span slot="close">{{ $t('modules_leftremenu_93') }}</span>
                            </i-switch>
                        </form-item>
                        <form-item :label="$t('modules_expandrow_26')" prop="permission">
                            <i-input v-model="addModuleItem.permission" :placeholder="$t('modules_expandrow_27')"></i-input>
                        </form-item>
                        <form-item :label="$t('modules_expandrow_28')" prop="remarks" class="last-child">
                            <i-input v-model="addModuleItem.remarks" type="textarea" :placeholder="$t('modules_expandrow_29')" :rows="2"></i-input>
                        </form-item>
                    </i-form>
                </div>
                <div slot="footer">
                    <Button @click="addModuleClose">{{ $t('classroom_allscore_53') }}</Button>
                    <Button type="primary" @click="addModuleOk">{{ $t('classroom_allscore_54') }}</Button>
                </div>
            </Modal>
        </div>
        <div v-else><rolemanage :appmenu="currMenu" :edit="resource_edit" :menuId="currMenu.id"></rolemanage></div>
    </div>
</template>
<script>
import valid, { errors, sysUser, sysMenu, api } from '../libs/request';
import rolemanage from '../modules/rolemanage.vue';
import dragTreeTable from 'drag-tree-table';
import { mapMutations, mapGetters, mapActions } from 'vuex';
import cosUpload from '@public/modules/cosUpload.vue';

export default {
    name: 'core.resource',
    data() {
        return {
            objectType: 'sys_menu_logo',
            objectId: '',
            kind: 'image',
            loading: true,
            treeData: {
                lists: [],
                custom_field: {
                    id: 'id',
                    order: 'sort',
                    lists: 'lists',
                    parent_id: 'parentId2'
                },
                columns: []
            },
            sortError: false, // 拖动排序报错, true：报错，false：未报错
            currMenu: {
                id: ''
            },
            search: {
                text: ''
            },
            menuId: '',
            pageConfig: {
                pageSize: 10
            },
            level: 2,
            addModuleItem: {
                visible: false,
                update: false,
                issub: false,
                addtitle: this.$t('views_resource_518'),
                addsubtitle: this.$t('modules_menuitem_116'),
                edittitle: this.$t('views_resource_541'),
                parent: {},
                name: '',
                icon: '',
                color: '#19be6b',
                href: '',
                sort: 0,
                permission: '',
                isShow: false,
                isQuick: false,
                remarks: '',
                ruleValidate: {
                    name: [
                        {
                            required: true,
                            message: this.$t('modules_expandrow_32'),
                            trigger: 'blur'
                        }
                    ],
                    icon: [
                        {
                            required: false,
                            // message: this.$t('views_resource_543')
                        }
                    ],
                    color: [
                        {
                            required: true,
                            message: this.$t('views_resource_544')
                        }
                    ],
                    // href: [{
                    // 	required: true,
                    // 	message: this.$t('views_resource_545'),
                    // 	trigger: "blur"
                    // }],
                    // sort: [{ required: true }],
                    isShow: [
                        {
                            required: true
                        }
                    ],
                    isQuick: [
                        {
                            required: true
                        }
                    ],
                    remarks: [
                        {
                            required: false,
                            type: 'string',
                            max: 100,
                            message: this.$t('views_resource_546'),
                            trigger: 'blur'
                        }
                    ]
                }
            },
            isMenu: true,
            headers: {}
        };
    },
    computed: {
        ...mapGetters('core', ['resource_edit']),
        uploadUrl() {
            return api.fileAttachmentUploadUrl(); // sysUser.uploadImg();
        },
        formTitle() {
            if (this.addModuleItem.update) {
                return this.addModuleItem.edittitle;
            } else if (this.addModuleItem.issub) {
                return this.addModuleItem.addsubtitle;
            }
            return this.addModuleItem.addtitle;
        }
    },
    components: {
        rolemanage,
        dragTreeTable,
        cosUpload
    },
    created() {
        this.initPage();
    },
    mounted() {
        this.headers = {
            token: localStorage.getItem('token'),
            tenant: localStorage.getItem('tenant')	
        }
        this.treeData.columns = [
            {
                type: 'selection',
                title: this.$t('messagemanagement_components_histroylists_310'),
                field: 'name',
                align: 'left',
                flex: 1
            },
            {
                title: this.$t('modules_expandrow_21'),
                field: 'href',
                align: 'left',
                flex: 1
            },
            // {
            //     title: '排序',
            //     field: 'sort',
            //     align: 'left',
            //     width: 90,
            // },
            {
                title: this.$t('modules_expandrow_13'),
                field: 'isShow',
                align: 'left',
                width: 55,
                formatter: item => {
                    return item.isShow == '1' ? this.$t('modules_expandrow_25') : this.$t('modules_expandrow_14');
                }
            },
            {
                title: this.$t('views_resource_548'),
                field: 'permission',
                align: 'left',
                flex: 1
            },
            {
                type: 'action',
                title: this.$t('classlist_compontents_detailinfo_45'),
                align: 'left',
                width: 160,
                actions: [
                    {
                        onclick: this.showUpdateMenu,
                        formatter: item => {
                            return '<a>' + this.$t('modules_expandrow_15') + '</a>';
                        }
                    },
                    {
                        onclick: this.showDelMenu,
                        formatter: item => {
                            return '<a>' + this.$t('classlist_compontents_detailinfo_46') + '</a>';
                        }
                    },
                    {
                        onclick: this.showAddSubMenu,
                        formatter: item => {
                            return '<a>' + this.$t('modules_menuitem_116') + '</a>';
                        }
                    }
                ]
            }
        ];
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        ...mapActions('portal', ['updateAside']),
        hasUploadFile(fileObj) {
            // console.log(fileObj)
            this.addModuleItem.icon = fileObj.filePath;
        },
        initPage() {
            let mid = this.$route.query.id;
            if (!mid) return;
            this.currMenu.id = mid;
            this.getCurrentMenu(mid);
            this.getCurrrentSubMenu(mid);
            this.isMenu = true;
        },
        getCurrentMenu(id) {
            this.updateLoadingStatus({
                isLoading: true
            });
            sysMenu
                .menuGetById({
                    id
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.currMenu = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        getCurrrentSubMenu(id) {
            this.updateLoadingStatus({
                isLoading: true
            });
            let param = {
                'parent.id': id,
                level: 2
            };
            if (this.search.text) {
                param.name = this.search.text;
            }
            sysMenu
                .listMenuData(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let data = res.data.data.list;
                        this.treeData.lists = data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        onSearch() {
            this.getCurrrentSubMenu(this.currMenu.id);
        },
        showAddMenu() {
            this.level = 2;
            this.$refs.addmodule.resetFields();
            this.addModuleItem.parent = this.currMenu;
            this.addModuleItem.visible = true;
            this.addModuleItem.update = false;
            this.addModuleItem.issub = false;
        },
        showAddSubMenu(item) {
            this.level = Number(item.level) + 1;
            this.$refs.addmodule.resetFields();
            this.addModuleItem.parent = item;
            this.addModuleItem.visible = true;
            this.addModuleItem.update = false;
            this.addModuleItem.issub = true;
        },
        showUpdateMenu(item) {
            this.$refs.addmodule.resetFields();
            this.addModuleItem.visible = true;
            this.addModuleItem.update = item;
            this.addModuleItem.issub = false;

            this.addModuleItem.parent = this.currMenu;
            this.addModuleItem.icon = item.icon || '';
            this.addModuleItem.color = item.colour || '';
            this.addModuleItem.name = item.name || '';
            this.addModuleItem.href = item.href ? item.href.replace(new RegExp('&amp;','g'),"&") : '';
            this.addModuleItem.sort = item.sort || '';
            this.addModuleItem.isShow = item.isShow == '1' ? true : false;
            this.addModuleItem.isQuick = item.isQuick == '1' ? true : false;
            this.addModuleItem.permission = item.permission || '';
            this.addModuleItem.remarks = item.remarks || '';
        },
        showDelMenu(item) {
            let id = item.id;
            this.$Modal.confirm({
                title: this.$t('views_resource_553'),
                content: this.$t('modules_expandrow_36'),
                onOk: () => {
                    this.updateLoadingStatus({
                        isLoading: true
                    });
                    sysMenu
                        .deleteMenu({
                            id
                        })
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                this.$Message.success('删除成功');
                                this.getCurrrentSubMenu(this.currMenu.id);
                            }
                        })
                        .catch(errors.call(this))
                        .finally(() => {
                            this.updateLoadingStatus({
                                isLoading: false
                            });
                        });
                }
            });
        },
        addModuleClose() {
            this.addModuleItem.visible = false;
        },
        addModuleOk() {
            this.$refs.addmodule.validate(vad => {
                if (vad) {
                    let info = {
                        icon: this.addModuleItem.icon,
                        colour: this.addModuleItem.color,
                        name: this.addModuleItem.name,
                        remarks: this.addModuleItem.remarks,
                        sort: this.addModuleItem.sort,
                        href: this.addModuleItem.href,
                        permission: this.addModuleItem.permission,
                        isShow: this.addModuleItem.isShow ? 1 : 0,
                        isQuick: this.addModuleItem.isQuick ? 1 : 0,
                        level: this.level
                    };
                    if (this.addModuleItem.update) {
                        info.id = this.addModuleItem.update.id;
                    } else {
                        info['parent.id'] = this.addModuleItem.parent.id;
                    }
                    if (this.addModuleItem.issub) {
                        info.isQuick = 0;
                    }
                    this.updateLoadingStatus({
                        isLoading: true
                    });
                    sysMenu
                        .saveMenu(info)
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                this.addModuleItem.visible = false;
                                this.addModuleClose();
                                this.getCurrrentSubMenu(this.currMenu.id);
                                this.updateAside();
                            }
                        })
                        .catch(errors.call(this))
                        .finally(() => {
                            this.updateLoadingStatus({
                                isLoading: false
                            });
                        });
                } else {
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 0);
                }
            });
        },
        saveSorted(arr) {
            // 保存排序
            if (this.sortError) this.$Message.error(this.$t('views_resource_555'));
            else {
                // console.log(arr)
                // let menuList = [];
                // this.currSubMenu.forEach(item => {
                //     menuList.push({ id: item.id, sort: item.sort });
                // });
                this.updateLoadingStatus({
                    isLoading: true
                });
                sysMenu
                    .meunSort(arr)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.getCurrrentSubMenu(this.currMenu.id);
                        }
                    })
                    .catch(() => {
                        errors.call(this);
                        this.updateLoadingStatus({
                            isLoading: false
                        });
                    });
            }
        },
        changSort(list) {
            // 修改排序
            this.sortError = false;
            let arr = this.initSortList(list, this.$route.query.id);
            this.saveSorted(arr);
        },
        initSortList(list, id) {
            let arr = [];
            list.forEach(item => {
                let child = {
                    id: item.id,
                    // parentId: item.parentId,
                    lists: []
                };
                if (id && id != item.parentId) this.sortError = true;
                arr.push(child);
                if (item.lists && item.lists.length > 0) {
                    child.lists = this.initSortList(item.lists, item.id);
                }
            });
            return arr;
        },
        handleSuccess(data) {
            if (data.code === 0 && data.data.url) {
                this.addModuleItem.icon = data.data.url;
            } else {
                this.$Message.error(data.msg);
            }
        },
        handleFormatError() {
            this.$Message.error(this.$t('views_resource_556'));
        },
        handleMaxSize() {
            this.$Message.error(this.$t('views_resource_557'));
        },
        changeSort() {
            // 修改排序
            console.log(this.$t('views_resource_558'));
        }
    },
    watch: {
        '$route.query.id': {
            handler: function(val, oldVal) {
                // console.log(val, oldVal);
                if (val && oldVal) {
                    this.initPage();
                }
            },
            deep: true
        }
    }
};
</script>
