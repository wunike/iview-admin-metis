<style lang="less">
@themeGreen: #2d8cf0;
.leftMenu {
    .fr {
        float: right;
    }
    .fl {
        float: left;
    }
    .popmenu {
        position: absolute;
        top: 0;
        // right: -190px;
        left: 0;
        width: 230px;
        background-color: #fff;
        box-shadow: 0 0 9px rgba(200, 200, 200, 0.5);
        padding: 1.8em 0;
        z-index: 80;
        ul {
            & > li {
                text-indent: 2em;
                height: 30px;
                line-height: 30px;
                cursor: pointer;
                &:hover {
                    background-color: #e6e6e6;
                }
            }
        }
    }
    .main-re-item {
        padding: 10px;
        .name {
            font-size: 16px;
            font-weight: bold;
            display: inline-block;
            width: 160px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: middle;
        }
        .iconfont {
            display: inline-block;
            cursor: pointer;
            vertical-align: middle;
            &:hover {
                color: #000;
            }
        }
    }
    .res-list {
        position: relative;
        min-height: 44px;
        .res-item {
            position: relative;
            height: 46px;
            line-height: 46px;
            cursor: pointer;
            overflow: hidden;
            &:hover {
                background-color: rgba(0, 136, 249, 0.09);
            }
            &.active {
                background-color: rgba(0, 136, 249, 0.3);
            }
            &:hover {
                .img-caozuo {
                    display: block;
                }
                .fav {
                    display: block;
                }
            }
            .icon-box {
                position: absolute;
                right: 0;
                top: 0;
                width: 52px;
            }
            .fav {
                color: #000;
                display: none;
                margin-right: 6px;
                &.icon-biaoqian2 {
                    color: #2d8cf0;
                    display: inline-block;
                }
            }
            .icon {
                display: block;
                float: left;
                width: 50px;
                height: 46px;
                padding-left: 15px;
                &-img {
                    width: 24px;
                    height: 24px;
                    display: inline-block;
                    vertical-align: middle;
                    padding: 3px;
                }
            }
            .name {
                display: block;
                float: left;
                font-size: 12px;
                width: 126px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .vddl-dragging {
            opacity: 0.7;
        }

        .vddl-dragging-source {
            display: none;
        }
        .vddl-placeholder{
            width: 100%;
            height: 46px;
            background: rgba(68, 188, 183, 0.2);
            border: 1px dotted #CCCCCC;
        }
    }
    .reswrapper {
        .img-caozuo {
            background: url('../assets/svg/leftmenu/dots.svg') no-repeat left center;
            width: 20px;
            height: 46px;
            float: right;
            background-size: contain;
            margin-right: 10px;
            display: none;
        }
    }
    .tabs {
        margin: 15px;
        height: 26px;
        border: 1px solid @themeGreen;
        border-radius: 4px;
        .itemone {
            float: left;
            width: 33.33%;
            text-align: center;
            line-height: 24px;
            cursor: pointer;
            &.active {
                color: @themeGreen;
            }
            & + .itemone {
                border-left: 1px solid @themeGreen;
            }
        }
        &.noshow {
            visibility: hidden;
            margin: 0;
        }
    }
}
.addmodulemask {
    .module-icon {
        width: 80px;
        height: 80px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        // display: inline-block;
        float: left;
        margin-right: 20px;
        background-color: #f1f1f1;
        margin-top: -2px;
    }
    .ivu-upload-select {
        margin-top: 22px;
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
    <div class="leftMenu">
        <!--<user-banner :info="userInfo"></user-banner>-->
        <div class="main-re-item">
            <div>
                <span class="name">{{ $t('core.resource') }}</span>
                <i class="iconfont icon-tianjiajigou" @click.stop="addRes" v-if="resource_edit"></i>
            </div>
        </div>
        <!--<div class="tabs noshow">
    </div>-->
        <div class="item-wrapper reswrapper" ref="scrollWrap">
            <vddl-list class="panel__body--list res-list" :list="appMenuList" :horizontal="false" v-if="appMenuList.length" :inserted="handleDragEnd">
                <vddl-draggable
                    class="panel__body--item res-item"
                    :class="{ active: state.item.id == item.id }"
                    v-for="(item, index) in appMenuList"
                    :key="item.id"
                    :draggable="item"
                    :index="index"
                    :wrapper="appMenuList"
                    effect-allowed="move"
                >
                    <!-- @dragenter="handleDragEnter($event, item)"
                        @dragend.prevent="handleDragEnd($event, item)" -->
                    <div class="" @click="resClick(item)">
                        <i class="icon"><img v-if="item.icon" :src="item.icon" class="icon-img" :style="{ backgroundColor: item.colour }" /></i>
                        <span class="name" v-text="item.name"></span>

                        <div class="icon-box">
                            <i class="iconfont fl" v-if="item.isQuick == '1'"></i>
                            <i class="iconfont fav fl" v-else :class="{ 'icon-biaoqian2': item.isFav, 'icon-biaoqian3': !item.isFav }" @click.stop="addFav(item)"></i>

                            <!-- <i class="images-caozuo" v-if="resource_edit"></i> -->
                            <Dropdown transfer-class-name="icon-dropdown" :transfer="true" placement="right-start" @on-click="showPopMenu(item, $event)" v-if="resource_edit">
                                <a href="javascript:void(0)"><Icon class="img-caozuo"></Icon></a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="edit">{{ $t('modules_expandrow_15') }}</DropdownItem>
                                    <DropdownItem name="del">{{ $t('classlist_compontents_detailinfo_46') }}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </vddl-draggable>
                <vddl-placeholder class="vddl-placeholder"></vddl-placeholder>
            </vddl-list>
            <!-- <ul class=""></ul> -->
            <!-- <div class="popmenu" :style="{top:menu.top}" v-show="menu.show" v-if="resource_edit">
            <ul>
                <li @click.stop="modify">{{$t('modules_expandrow_15')}}</li>
                <li @click.stop="delres">{{$t('classlist_compontents_detailinfo_46')}}</li>
            </ul>
        </div> -->
        </div>
        <Modal
            v-if="resource_edit"
            class-name="vertical-center-modal addmodulemask"
            v-model="addModuleItem.show"
            :loading="loading"
            :title="addModuleItem.add ? addModuleItem.addtitle : addModuleItem.edittitle"
        >
            <div>
                <i-form ref="addmodule" :model="addModuleItem" :rules="addModuleItem.ruleValidate" :label-width="90">
                    <form-item :label="$t('modules_leftremenu_78')" prop="icon" class="uploaddiv">
                        <i-input v-model="addModuleItem.icon" v-show="false"></i-input>
                        <img :src="addModuleItem.icon" alt="" class="module-icon" />
                        <Upload
                            :data="{
                                bizId: '',
                                bizType: 'image',
                                isSingle: true
                            }"
                            :headers="headers"
                            ref="upload"
                            :show-upload-list="false"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png','svg']"
                            :max-size="100"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :action="uploadurl"
                            name= "file"
                            style="display: inline-block;width:94px;">
                            <Button type="primary">{{$t('modules_leftremenu_79')}}</Button>
                        </Upload>
                        <!-- <cos-upload
                            ref="lrUpload"
                            v-if="objectType && kind && addModuleItem.show"
                            :objectType="objectType"
                            :objectId="objectId"
                            :kind="kind"
                            :accept="['svg']"
                            :maxNum="1"
                            :maxSize="1"
                            :uploadButtonName="$t('views_resource_520')"
                            fileInputId="lrModal"
                            :isChangeFile="true"
                            @hasUploadFile="hasUploadFile"
                        ></cos-upload> -->
                        <div class="tip">{{ $t('modules_leftremenu_80') }}</div>
                    </form-item>
                    <form-item :label="$t('modules_leftremenu_81')" prop="color"><ColorPicker v-model="addModuleItem.color" /></form-item>

                    <form-item :label="$t('modules_leftremenu_82')" prop="name">
                        <i-input v-model="addModuleItem.name" :placeholder="$t('modules_leftremenu_83')"></i-input>
                    </form-item>
                    <form-item :label="$t('modules_leftremenu_84')" prop="href">
                        <i-input v-model="addModuleItem.href" :placeholder="$t('modules_leftremenu_85')"></i-input>
                    </form-item>
                    <!-- <form-item :label="$t('modules_leftremenu_86')" prop="sort">
                <InputNumber v-model="addModuleItem.sort"></InputNumber>
            </form-item> -->
                    <form-item :label="$t('messagemanagement_components_histroylists_309')" prop="type">
                        <RadioGroup v-model="addModuleItem.type">
                            <Radio label="0">pc</Radio>
                            <Radio label="1">App</Radio>
                        </RadioGroup>
                    </form-item>
                    <form-item :label="$t('pushsettings_index_496')" prop="isShow">
                        <i-switch size="large" v-model="addModuleItem.isShow">
                            <span slot="open">{{ $t('modules_expandrow_25') }}</span>
                            <span slot="close">{{ $t('modules_expandrow_14') }}</span>
                        </i-switch>
                    </form-item>
                    <form-item :label="$t('modules_leftremenu_91')" prop="checkFlag" v-if="addModuleItem.checkFlag">
                        <RadioGroup v-model="addModuleItem.checkFlag">
                            <Radio label="1">{{ $t('modules_leftremenu_92') }}</Radio>
                            <Radio label="0">{{ $t('modules_leftremenu_93') }}</Radio>
                        </RadioGroup>
                    </form-item>
                    <form-item :label="$t('modules_leftremenu_94')" prop="isQuick">
                        <i-switch size="large" v-model="addModuleItem.isQuick">
                            <span slot="open">{{ $t('modules_leftremenu_92') }}</span>
                            <span slot="close">{{ $t('modules_leftremenu_93') }}</span>
                        </i-switch>
                    </form-item>
                    <form-item :label="$t('modules_expandrow_26')"><i-input v-model="addModuleItem.permission" :placeholder="$t('modules_expandrow_27')"></i-input></form-item>
                    <form-item :label="$t('modules_leftremenu_97')" prop="remarks" class="last-child">
                        <i-input v-model="addModuleItem.remarks" type="textarea" :placeholder="$t('modules_leftremenu_98')" :rows="2"></i-input>
                    </form-item>
                </i-form>
            </div>
            <div slot="footer">
                <Button @click="addModuleClose">{{ $t('classroom_allscore_53') }}</Button>
                <Button type="primary" @click="addModuleOk">{{ $t('classroom_allscore_54') }}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import userBanner from '_c/common/userBanner';
import { mapState, mapMutations, mapGetters } from 'vuex';
import valid, { errors, sysUser, sysMenu, api } from '../libs/request';
import { getItemIndex } from '../libs/util.js';
import cosUpload from '@public/modules/cosUpload.vue';

export default {
    mounted(){
        this.headers = {
            token: localStorage.getItem('token'),
            tenant: localStorage.getItem('tenant')
        }
    },
    data() {
        return {
            headers:{},
            objectType: 'sys_menu_logo',
            objectId: '',
            kind: 'image',
            loading: true,
            isready: false,
            state: {
                menuitem: {},
                item: {
                    id: this.$route.query.id
                },
                dragHoverItem: {}
            },
            addModuleItem: {
                show: false,
                add: true,
                addtitle: this.$t('modules_leftremenu_101'),
                edittitle: this.$t('modules_leftremenu_102'),
                level: 1,
                name: '',
                href: '',
                color: '#19be6b',
                permission: '',
                icon: '',
                sort: 0,
                isShow: true,
                isQuick: false,
                remarks: '',
                checkFlag: '',
                type: '0',
                ruleValidate: {
                    name: [
                        { required: true, message: this.$t('modules_leftremenu_103'), trigger: 'blur' },
                        {
                            required: true,
                            pattern: /^(^[\w\-]{1,20}$)|(^[\w\-\u4e00-\u9fa5]{1,10}$)$/,
                            message: this.$t('modules_leftremenu_104'),
                            trigger: 'blur'
                        }
                    ],
                    icon: [{ required: true, message: this.$t('modules_leftremenu_105') }],
                    color: [{ required: true, message: this.$t('modules_leftremenu_106') }],
                    href: [{ required: true, message: this.$t('modules_leftremenu_107') }],
                    checkFlag: [{ required: true, message: this.$t('modules_leftremenu_108') }],
                    //   sort: [{ required: true }],
                    isShow: [{ required: true }],
                    remarks: [
                        {
                            required: false,
                            type: 'string',
                            max: 100,
                            message: this.$t('modules_leftremenu_109'),
                            trigger: 'blur'
                        }
                    ]
                }
            },
            currentId: ''
        };
    },
    computed: {
        ...mapState(['userInfo', 'asideApp', 'appMenuList']),
        ...mapGetters('core', ['resource_edit']),
        uploadurl() {
            return api.fileAttachmentUploadUrl(); // sysUser.uploadImg();
        }
    },
    components: {
        userBanner,
        cosUpload
    },
    created() {
        this.$watch('appMenuList', this.menuListReady, { immediate: true });
    },
    methods: {
        hasUploadFile(fileObj) {
            // console.log(fileObj)
            this.addModuleItem.icon = fileObj.filePath;
        },
        update(payload) {},
        menuListReady() {
            if (!this.isready && this.appMenuList.length > 0) {
                if (!this.state.item.id) {
                    this.resClick(this.appMenuList[0]);
                    this.isready = true;
                }
            }
        },
        addRes() {
            this.$refs.addmodule.resetFields();
            this.addModuleItem.show = true;
            this.addModuleItem.add = true;
        },
        resClick(item) {
            // console.log(item)
            this.currentId = item.id;
            this.state.item = item;
            this.$router.push({ name: 'core.resource', query: { id: item.id, byLfRm: true } });
        },
        addModuleClose() {
            this.addModuleItem.show = false;
            this.$refs.addmodule.resetFields();
        },
        addModuleOk() {
            this.$refs.addmodule.validate(validok => {
                if (validok) {
                    let info = {
                        name: this.addModuleItem.name,
                        colour: this.addModuleItem.color,
                        href: this.addModuleItem.href,
                        remarks: this.addModuleItem.remarks,
                        permission: this.addModuleItem.permission,
                        icon: this.addModuleItem.icon,
                        sort: this.addModuleItem.sort,
                        level: this.addModuleItem.level,
                        isShow: this.addModuleItem.isShow ? 1 : 0,
                        isQuick: this.addModuleItem.isQuick ? 1 : 0,
                        'parent.id': 0
                    };
                    if (!this.addModuleItem.add) {
                        info.id = this.state.menuitem.id;
                    }
                    if (this.addModuleItem.checkFlag) {
                        info.checkFlag = this.addModuleItem.checkFlag;
                    }
                    sysMenu
                        .saveMenu(info)
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                this.addModuleItem.show = false;
                                this.addModuleClose();
                                this.$store.dispatch('portal/updateAppMenu');
                            }
                        })
                        .catch(errors.call(this));
                } else {
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 0);
                }
            });
        },
        handleSuccess(data) {
            if (data.code === 0 && data.data.url) {
                this.addModuleItem.icon = data.data.url;
            } else {
                this.$Message.error(data.message);
            }
            console.info(data);
        },
        handleFormatError() {
            this.$Message.error(this.$t('modules_leftremenu_110'));
        },
        handleMaxSize() {
            this.$Message.error(this.$t('modules_leftremenu_111'));
        },
        showPopMenu(item, name) {
            this.state.menuitem = item;
            if (name == 'edit') this.modify();
            else if (name == 'del') this.delres();
        },
        modify() {
            this.$refs.addmodule.resetFields();
            this.addModuleItem.add = false;
            this.addModuleItem.show = true;
            sysMenu
                .menuGetById({ id: this.state.menuitem.id })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let d = res.data.data;
                        this.addModuleItem.name = d.name || '';
                        this.addModuleItem.remarks = d.remarks || '';
                        this.addModuleItem.icon = d.icon || '';
                        this.addModuleItem.isShow = d.isShow == '1' ? true : false;
                        this.addModuleItem.isQuick = d.isQuick == '1' ? true : false;
                        this.addModuleItem.sort = d.sort || '';
                        this.addModuleItem.color = d.colour || '';
                        this.addModuleItem.href = d.href || '';
                        this.addModuleItem.permission = d.permission || '';
                        this.addModuleItem.checkFlag = d.checkFlag || '';
                        this.addModuleItem.type = d.type || '0';
                    }
                })
                .catch(errors.call(this));
        },
        delres() {
            this.$Modal.confirm({
                title: this.$t('modules_leftremenu_112'),
                content: this.$t('modules_expandrow_36'),
                onOk: () => {
                    this.delresOk(this.state.menuitem.id);
                }
            });
        },
        delresOk(id) {
            sysMenu
                .deleteMenu({ id })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$store.dispatch('portal/updateAppMenu');
                        // console.log(this.currentId)
                        // console.log(id)
                        if (this.currentId == id && this.appMenuList.length > 1) {
                            // console.log('resClick')
                            this.resClick(this.appMenuList[1]);
                        }
                    }
                })
                .catch(errors.call(this));
        },
        handleDragEnter(e, item) {
            this.state.dragHoverItem = item;
        },
        handleDragEnd(e) {
            // console.log(e,ind, item);
            // return false;
            // let resList = this.appMenuList.concat([]);
            // let index = getItemIndex(resList, this.state.dragHoverItem);
            // let rindex = getItemIndex(resList, item);
            // resList.splice(rindex, 1);
            // resList.splice(index, 0, item);
            console.log(e)
            let resList=e.list.filter(v=>v.id!=e.item.id);
            if(e.item.sort<e.index){
                resList.splice(e.index-1,0,e.item);
            }else{
                resList.splice(e.index,0,e.item);
            }
            let menuList = [];
            resList.forEach((item, i) => {
                menuList.push({ id: item.id, sort: i });
            });
            sysMenu
                .sortMenu({ menuList: JSON.stringify(menuList) })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$store.dispatch('portal/updateAppMenu');
                        window.location.reload();
                    }
                })
                .catch(errors.call(this));
        },
        addFav(item) {
            // console.log(item.type)
            sysMenu
                .saveQuickMenu(item.id, item.isFav ? '0' : '1', item.type)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$store.dispatch('portal/updateAppMenu');
                        this.$store.dispatch('portal/updateAside');
                    }
                })
                .catch(errors.call(this));
        }
    }
};
</script>
