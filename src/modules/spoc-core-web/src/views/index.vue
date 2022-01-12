<style lang="less">
.core_container {
    display: flex;
    height: 100%;
    .mainLeft {
        width: 230px;
        height: 100%;
        background-color: #fff;
    }
    .nav-toggle-wrap {
        height: 100%;
        position: relative;
        margin: 16px 0 16px 16px;
    }
    .mainBody {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
    } // 重写本模块iview部分样式
    .ivu-table-wrapper {
        /*margin-top: 5px;*/
        border: none;
        .ivu-table {
            th {
                /*background-color: #fff;*/
            }
            &:after {
                display: none;
            }
        }
    }
}
</style>
<template>
    <div class="core_container">
        <div v-if="!needOrg" class="nav-toggle-wrap">
            <div class="mainLeft nav-toggle">
                <left-menu v-if="isOrg" :tab="nav" ref="org"></left-menu>
                <left-remenu v-else ref="res"></left-remenu>
            </div>
            <!--<slide-toggle></slide-toggle>-->
        </div>
        <div class="mainBody" id="mainBody">
            <keep-alive :include="cacheList"><router-view @update="needUpdate"></router-view></keep-alive>
        </div>
    </div>
</template>
<script>
import { MENUIDS } from '@public/libs/config';
import slideToggle from '_c/common/slideToggle';
import leftMenu from '../modules/leftMenu';
import leftRemenu from '../modules/leftRemenu';
import { getKValue, arrInclude } from '../libs/util.js';
import { mapState } from 'vuex';
import valid, { errors, sysMenu } from '../libs/request.js';

const defnav = 'core.organization';
let regist = false;
let navMap = {
    [defnav]: 1,
    'core.job': 2,
    'core.grade': 3
};
let navMap1 = {
    'core.createroom': 4,
    'core.classroom': 4,
    'core.staff': 4,
    'core.teacher': 4,
    'core.coursePack': 4,
    'core.coursePackGroup': 4,
    'core.staffImport': 4,
    'core.classimport': 4,
    'core.classDetails': 4,
    'core.approvalSet': 4,
    'core.tagsManage':4,
    'core.customState':4,
    'core.taskTemplate':4,
    'core.systemConfig':4,
    'core.announcement':4,
    'core.schoolManagement':4,
    'core.campusDataMigration':4,
    'core.funPackageManage':4,
    'core.between':4,

    'core.lessee':4,
    'core.attendancePage':4,
    'core.tenantAccount':4,
    'core.lesseeTrialTenant':4,
    'core.lesseeSharePage':4,
    'core.lesseeShareEditPage':4,
    'core.dataImport':4,
    'core.lessee360':4,
    'core.lesseeAnnouncement':4,
    'core.sopTaskSetting':4
};

let hasPermissions = (g, r) => {
    if (r && g) {
        return arrInclude(g, r.split(','));
    }
    return false;
};

export default {
    name: 'coreIndex',
    data() {
        return {
            pId: null,
            // name: this.$route.name
        };
    },
    components: {
        leftMenu,
        leftRemenu,
        slideToggle
    },
    computed: {
        ...mapState(['userInfo', 'appMenuList']),
        name(){
            return this.$route.name;
        },
        isOrg() {
            if (Object.keys(navMap).indexOf(this.name) > -1) {
                return true;
            } else {
                return false;
            }
        },
        needOrg() {
            if (Object.keys(navMap1).indexOf(this.name) > -1) {
                return true;
            } else {
				if(this.name.indexOf('core.')!=-1){
					return false;
				}else{
					return true;
				}
            }
        },
        nav() {
            return navMap[this.name];
        },
        tagNavList() {
            return this.$store.state.app.tagNavList;
        },
        cacheList() {
            const list = [...(this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : [])];
            return list;
        }
    },
    created() {
        this.loadMenuRights();
        if (!regist) {
            this.registerModule();
            regist = true;
        }
        this.pId = MENUIDS.CORE;
        this.$store.dispatch('core/getMenuData');
        this.$store.commit('updatePid', {
            pid: this.pId
        });
    },
    methods: {
        needUpdate(type, payload) {
            if (this.$refs[type]) {
                this.$refs[type].update(payload);
            }
        },
        loadMenuRights() {
            sysMenu
                .findMenu()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$store.commit('core/updateRights', {
                            rights: res.data.data
                        });
                    }
                })
                .catch(errors.call(this));
        },
        registerModule() {
            let _this = this;
            this.$store.registerModule('core', {
                namespaced: true,
                state: {
                    rights: {},
                    menus: []
                },
                getters: {
                    org_edit(state, getters, rootState) {
                        if (rootState.userInfo.admin) {
                            return true;
                        }
                        let r = getKValue(state.rights, 'core.organization', 'core.organization', 'edit');
                        return hasPermissions(rootState.userInfo.permissions, r);
                    },
                    job_edit(state, getters, rootState) {
                        if (rootState.userInfo.admin) {
                            return true;
                        }
                        let r = getKValue(state.rights, 'core.organization', 'core.job', 'edit');
                        return hasPermissions(rootState.userInfo.permissions, r);
                    },
                    grade_edit(state, getters, rootState) {
                        if (rootState.userInfo.admin) {
                            return true;
                        }
                        let r = getKValue(state.rights, 'core.organization', 'core.grade', 'edit');
                        return hasPermissions(rootState.userInfo.permissions, r);
                    },
                    resource_edit(state, getters, rootState) {
                        if (rootState.userInfo.admin) {
                            return true;
                        }
                        let r = getKValue(state.rights, 'core.organization', 'core.resource', 'edit');
                        return rootState.userInfo.permissions && rootState.userInfo.permissions.indexOf(r) > -1;
                    },
                    role_edit(state, getters, rootState) {
                        if (rootState.userInfo.admin) {
                            return true;
                        }
                        let r = getKValue(state.rights, 'core.organization', 'core.role', 'edit');
                        return hasPermissions(rootState.userInfo.permissions, r);
                    }
                },
                mutations: {
                    updateRights(state, payload) {
                        state.rights = payload.rights;
                    },
                    updateMenu(state, { menu }) {
                        state.menus = menu;
                    }
                },
                actions: {
                    getMenuData() {
                        const params = {
                            id: _this.pId
                        };
                        sysMenu
                            .listGrantMenu(params)
                            .then(valid.call(_this))
                            .then(res => {
                                this.commit('core/updateMenu', {
                                    menu: res.data.data
                                });
                                _this.ready = true;
                            })
                            .catch(errors.call(_this));
                    }
                }
            });
        }
    }
};
</script>
