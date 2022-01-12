<template>
    <Layout style="height: 100%;min-width: 1280px;overflow: hidden;" class="main">
        <Sider v-show="leftMenu" hide-trigger collapsible :width="180" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{ overflow: 'hidden' }">
            <side-menu
                accordion
                ref="sideMenu"
                :active-name="$route.name"
                :collapsed="collapsed"
                @on-select="turnToPage"
                :menu-list="menuList"
                @on-coll-change="handleCollapsedChange"
            >
                <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
                <div class="logo-con">
                    <img v-show="!collapsed && app.menuTheme == 'dark'" :src="logoImgUrl||logoUrl" key="max-logo" />
                    <img v-show="!collapsed && app.menuTheme == 'light'" :src="logoImgUrlLight||logoUrlLight" key="max-logo" />
                    <!-- <img v-show="!collapsed" :src="maxLogo" key="max-logo" /> -->
                    <img v-show="collapsed" :src="miniImgUrl||miniLogoUrl" key="min-logo" />
                    <!-- <img v-show="collapsed" :src="minLogo" key="min-logo" /> -->
                </div>
            </side-menu>
        </Sider>
        <Layout>
            <Header class="header-con">
                <header-bar :logoImgUrl="app.menuTheme == 'light' ?logoImgUrlLight : logoImgUrl" :leftMenu="leftMenu">
                    <user :message-unread-count="unreadCount" :user-avator="userAvator" />
                    <Dropdown @on-click="campusChange" style="margin-right: 12px;" trigger="click" transfer-class-name="campusMenu">
                        <a href="javascript:void(0)">
                            {{ campus }}
                            <Icon :size="18" type="md-arrow-dropdown" />
                        </a>
                        <DropdownMenu slot="list" style="max-height: 300px;overflow: hidden auto; line-height: 36px;">
                            <Input
                                v-model="campusSearch"
                                icon
                                clearable
                                prefix="ios-search"
                                size="small"
                                placeholder="校区筛选"
                                style="margin: 0 14px;width: auto;"
                                class="campusSearch"
                            />
                            <DropdownItem name="all" :selected="'all' == campusId">全部校区</DropdownItem>
                            <DropdownItem v-for="(item, index) in campusListSearched" :key="index" :name="item.id" :selected="item.code ? item.code == campus:(''  + item.name) == campus">
                                {{ item.code ? item.code :'' }}{{ item.name }}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <language v-if="$config.useI18n" @on-lang-change="_setLocal" style="margin-right: 12px;" :lang="local" />
                    <!--<error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader" :has-read="hasReadErrorPage" :count="errorCount"></error-store>-->
                    <Dropdown trigger="click" style="margin-right: 12px" @on-click="helpChange">
                        <a href="javascript:void(0)" style="line-height: 18px;display: inline-block;">
                            <CommonIcon
                                type="_bangzhu"
                                :size="16"
                                :style="{
                                    marginTop: '0px',
                                    display: 'inline-block',
                                    verticalAlign: 'middle'
                                }"
                            />
                            <!-- 在线帮助 -->
                            {{ $t('portal.help') }}
                            <Icon :size="18" type="md-arrow-dropdown" />
                        </a>
                        <DropdownMenu slot="list">
                            <!-- <DropdownItem name="help">帮助中心</DropdownItem> -->
                            <DropdownItem name="tickling">意见反馈</DropdownItem>
                            <DropdownItem name="myTickling">我的反馈</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <!-- <theme-switch style="margin-right: 6px;display: none;"></theme-switch> -->
                    <notice style="margin-right: 14px;"></notice>
                    <fullscreen v-model="isFullscreen" style="margin-right: 14px;" />
                    <lock-screen style="margin-right: 20px;"></lock-screen>
                </header-bar>
            </Header>
            <Content class="main-content-con">
                <Layout class="main-layout-con">
                    <div class="tag-nav-wrapper" v-if="leftMenu">
                        <tags-nav :value="$route" @input="handleClick" @reload="reload" :list="tagNavList" @on-close="handleCloseTag" />
                    </div>
                    <Content class="content-wrapper">
                        <keep-alive :include="cacheList"><router-view v-if="isRviewShow"></router-view></keep-alive>
                        <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
                    </Content>
                </Layout>
            </Content>
        </Layout>
        <Modal v-model="addBackModel" width="730" class-name="vertical-center-modal" @on-visible-change="isloading = false" :mask-closable="false" :closable="false">
            <p slot="header" style="line-height: 22px;font-size: 16px;">提交反馈</p>
            <div class="addBackBody">
                <Form ref="addBackForm1" :model="addBackForm" :rules="addBackRuler" :label-width="120">
                    <FormItem prop="title" label="问题标题："><Input v-model="addBackForm.title" style="width: 300px" /></FormItem>
                    <FormItem prop="priority" label="优先级：">
                        <RadioGroup v-model="addBackForm.priority">
                            <Radio v-for="item in priorityList" :key="item.id" :label="item.value">{{ item.label }}</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem prop="type" label="问题分类：">
                        <Select v-model="addBackForm.type" style="width: 300px;">
                            <Option v-for="item in classList" :key="item.id" :value="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem prop="content" label="问题描述："><editor ref="editor"></editor></FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="closeAddBackModel('addBackForm1')">取消</Button>
                <Button type="primary" @click="addBackOk('addBackForm1')" :loading="isloading">确定</Button>
            </div>
        </Modal>
    </Layout>
</template>
<script>
import CommonIcon from '_c/common-icon';
import SideMenu from './components/side-menu';
import HeaderBar from './components/header-bar';
import TagsNav from './components/tags-nav';
import User from './components/user';
import notice from './components/notice';
import ABackTop from './components/a-back-top';
import Fullscreen from './components/fullscreen';
import lockScreen from './components/lockscreen';
import themeSwitch from './components/theme-switch';
import Language from './components/language';
import ErrorStore from './components/error-store';
import { mapMutations, mapActions, mapGetters, mapState } from 'vuex';
import { getNewTagList, routeEqual, getHomeRoute } from '@/libs/util';
import routers from '@/router/routers';
import minLogo from '@/assets/images/logo-min.png';
import maxLogo from '@/assets/images/logo.png';
import './main.less';
import editor from './editor.vue';
import valid, { errors, sysDict, sysMenu, sysUser, sysWorkorder } from '@/modules/spoc-portal/libs/request';
// import {
//     getBreadCrumbList,
//     setTagNavListInLocalstorage,
//     getMenuByRouter,
//     getTagNavListFromLocalstorage,
//     getHomeRoute,
//     getNextRoute,
//     routeHasExist,
//     routeEqual,
//     getRouteTitleHandled,
//     localSave,
//     localRead
// } from "@/libs/util";
import { waitUntil } from '@public/libs/util';
export default {
    name: 'Main',
    components: {
        SideMenu,
        HeaderBar,
        Language,
        TagsNav,
        Fullscreen,
        lockScreen,
        themeSwitch,
        ErrorStore,
        User,
        ABackTop,
        CommonIcon,
        editor,
        notice
    },
    data() {
        return {
            orginRouter: [],
            logoImgUrl: '',
            logoImgUrlLight: '',
            campusSearch: '',
            isloading: false,
            addBackModel: false,
            isRviewShow: true,
            collapsed: false,
            minLogo,
            maxLogo,
            isFullscreen: false,
            campusList: [],
            campusId: '',
            campus: '',
            menuList: [],
            addBackForm: {
                id: '',
                priority: '1',
                type: '',
                content: '',
                status: '',
                url: window.location.href,
                browser: '',
                os: '',
                username: '',
                pwdFlag: '',
                sysWorkorderLogList: [],
                title: ''
            },
            addBackRuler: {
                title: {
                    required: true,
                    message: '标题不能为空',
                    trigger: 'blur'
                },
                priority: {
                    required: true,
                    message: '优先级不能为空',
                    trigger: 'change'
                },
                type: {
                    required: true,
                    message: '问题分类不能为空',
                    trigger: 'change'
                },
                content: {
                    required: true,
                    // pattern: /^<p>([\u4e00-\u9fa5]|\w)+<\/p>+$/,
                    message: '问题描述不能为空',
                    trigger: 'change'
                }
            },
            classList: [],
            priorityList: []
        };
    },
    computed: {
        ...mapState(['app', 'userInfo', 'logoUrl','logoUrlLight','miniLogoUrl', 'noLogin']),
        ...mapGetters(['errorCount']),
        leftMenu() {
            return this.$route.meta.leftMenu !== false;
            // 是否要显示左侧菜单
        },
        tagNavList() {
            return this.$store.state.app.tagNavList;
        },
        tagRouter() {
            return this.$store.state.app.tagRouter;
        },
        userAvator() {
            return this.$store.state.user.avatorImgPath;
        },
        cacheList() {
            let list = [];
            //				console.log(this.tagNavList,list)
            if (this.isRviewShow) {
                list = [
                    'coreIndex',
                    'hootie.index',
                    'jwIndex',
                    'sign.index',
                    'report.index',
                    'portal.appList',
                    'classRoom',
                    'crm.index',
                    'h5.index',
                    ...(this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : [])
                ];
            } else {
            }
            return list;
        },
        local() {
            return this.$store.state.app.local;
        },
        hasReadErrorPage() {
            return this.$store.state.app.hasReadErrorPage;
        },
        unreadCount() {
            return this.$store.state.user.unreadCount;
        },
        allinfo() {
            let navigate = {};
            navigate.appName = navigator.appName; //浏览器的正式名称
            navigate.appVersion = navigator.appVersion; //浏览器的版本号
            navigate.cookieEnabled = navigator.cookieEnabled; // 返回用户浏览器是否启用了cookie
            navigate.cpuClass = navigator.cpuClass; //返回用户计算机的cpu的型号，通常intel芯片返回"x86"（火狐没有）

            navigate.mimeType = navigator.mimeTypes; // 浏览器支持的所有MIME类型的数组
            navigate.platform = navigator.platform; // 浏览器正在运行的操作系统平台，包括Win16(windows3.x)
            //   Win32(windows98,Me,NT,2000,xp),Mac68K(Macintosh 680x0)
            //     和ＭacPPC(Macintosh PowerPC)
            navigate.plugins = navigator.plugins; //  安装在浏览器上的所有插件的数组
            navigate.userLanguage = navigator.userLanguage; // 用户在自己的操作系统上设置的语言（火狐没有）
            navigate.userAgent = navigator.userAgent; //包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform
            navigate.systemLanguage = navigator.systemLanguage; // 用户操作系统支持的默认语言（火狐没有）

            navigate.type = '';

            navigate.appCodeName = navigator.appCodeName; //与浏览器相关的内部代码名
            navigate.appMinorVersion = navigator.appMinorVersion; //辅版本号（通常应用于浏览器的补丁或服务包)

            navigate.language = navigator.language; //浏览器支持的语言 （IE没有）

            navigate.onLine = navigator.onLine; //返回浏览器是否处于在线模式（IE4以上版本）

            navigate.opsProfile = navigator.opsProfile; // 未定义   （IE、火狐没有）

            navigate.oscpu = navigator.oscpu; //浏览器正在运行的操作系统，其中可能有CPU的信息（IE没有）

            navigate.product = navigator.product; // 浏览器的产品名（IE没有）

            navigate.productSub = navigator.productSub; //关于浏览器更多信息（IE没有）

            navigate.securityPolicy = navigator.securityPolicy; // 浏览器支持的加密类型（IE没有）

            navigate.userProfile = navigator.userProfile; //  返回一个UserProfile对象，它存储用户的个人信息（火狐没有）

            navigate.vender = navigator.vender; // 浏览器厂商名称（IE、火狐没有）

            navigate.vendorSub = navigator.vendorSub; // 关于浏览器厂商更多的信息

            return navigate;
        },
        campusListSearched() {
            return this.campusList.filter(v => {
                if (!this.campusSearch) {
                    return true;
                } else {
                    let flag = false,
                        flag1 = false;
                    if (v.code) {
                        flag = v.code.toLocaleLowerCase().indexOf(this.campusSearch.toLocaleLowerCase()) != -1;
                    }
                    if (v.name) {
                        flag1 = v.name.toLocaleLowerCase().indexOf(this.campusSearch.toLocaleLowerCase()) != -1;
                    }
                    return flag || flag1;
                }
            });
        }
    },
    created() {
        this.getMenuList();
        let params1 = {
            type: 'sys_workorder_type'
        };
        sysDict
            .listData(params1)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.classList = res.data.data;
                }
            })
            .catch(errors.call(this));
        let params2 = {
            type: 'sys_workorder_priority'
        };
        sysDict
            .listData(params2)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.priorityList = res.data.data;
                }
            })
            .catch(errors.call(this));
    },
    methods: {
        ...mapMutations(['setBreadCrumb', 'setTagNavList', 'addTag', 'setLocal', 'setHomeRoute', 'closeTag', 'updateLoadingStatus', 'setCurrOfficeId', 'updateButtonPerm']),
        ...mapActions(['handleLogin', 'getUnreadMessageCount']),
        _setLocal(val) {
            //切换页面后重载页面
            this.isRviewShow = false;
            this.setLocal(val);
            location.reload();
        },
        dataScopeFilter() {
            sysUser
                .dataScopeFilter()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let _result = res.data.data;
                        // _result.unshift({code:'ALL',name:'全部校区',id:' '})

                        waitUntil(
                            () => {
                                return Object.keys(this.userInfo).length;
                            },
                            () => {
                                if (this.userInfo.officeId) {
                                    let ind = _result.findIndex(v => v.id == this.userInfo.officeId);
                                    if (ind != -1) {
                                        this.campus = (_result[ind].code ? _result[ind].code : '') + _result[ind].name;
                                        this.campusId = _result[ind].id;
                                    } else {
                                        this.campus = (_result[0].code ? _result[0].code : '') + _result[0].name;
                                        this.campusId = _result[0].id;
                                    }
                                } else {
                                    this.campus = (_result[0].code ? _result[0].code : '') + _result[0].name;
                                    this.campusId = _result[0].id;
                                }
                                this.setCurrOfficeId(this.campusId);
                                this.campusList = _result;
                            }
                        );
                    }
                })
                .catch(errors.call(this));
        },
        getMenuList() {
            sysMenu
                .listGrantAllMenu()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        //获取菜单权限开始
                        let buttonPerm = {};
                        res.data.data.children.forEach(item => {
                            buttonPerm[item.id] = {};
                            this.groupButtonPerm(item.children, buttonPerm, item.id);
                        });

                        let resultButtonPerm = {}
                        for(let key in buttonPerm){
                            for(let childKey in buttonPerm[key]){
                                resultButtonPerm[childKey] = buttonPerm[key][childKey]
                            }
                        }
                        this.$store.commit('updateButtonPerm', {
                            buttonPerm: resultButtonPerm
                        });
                        //获取菜单权限结束

                        let routers = [res.data.data];
                        this.menuList = this.$store.getters.menuList(routers)[0].children;
                        this.orginRouter = routers;
                        this.setHomeRoute(routers);
                        let newRoute = this.$route;
                        let tRoute = getHomeRoute(this.orginRouter, newRoute.name);
                        // newRoute=Object.assign({},newRoute,tRoute);
                        if (tRoute.meta) {
                            newRoute.meta.title = tRoute.meta.title || newRoute.meta.title;
                            newRoute.meta.enTitle = tRoute.meta.enTitle || newRoute.meta.enTitle;
                            newRoute.meta.icon = tRoute.meta.icon || newRoute.meta.icon;
                        }
                        newRoute.matched.forEach(v => {
                            let tMatch = getHomeRoute(this.orginRouter, v.name);
                            // console.log(v, v.name, tMatch, 11111);
                            if (Object.keys(tMatch).length) {
                                v.meta.title = tMatch.meta.title || v.meta.title;
                                v.meta.enTitle = tMatch.meta.enTitle || v.meta.enTitle;
                                v.meta.icon = tMatch.meta.icon || v.meta.icon;
                            }
                        });
                        this.setBreadCrumb(newRoute);
                        this.setTagNavList();
                        this.addTag({
                            route: this.$store.state.app.homeRoute
                        });
                        console.log(this.$store.state.app.homeRoute, this.$route);
                        // 如果当前打开页面不在标签栏中，跳到homeName页
                        if (!this.tagNavList.find(item => item.name === this.$route.name) && this.$route.name != 'portal.workBenchCreate') {
                            // 如果是初始化企业不进行跳转其他路由
                            this.$router.push({
                                name: this.$config.homeName
                            });
                        }
                    }
                })
                .catch(errors.call(this));
        },
        groupButtonPerm(menuList, buttonPerm, id) {
            if (menuList && menuList.length) {
                menuList.forEach(item => {
                    if (item.name && item.permTypes && item.permTypes.length) {
                        buttonPerm[id][item.name] = item.permTypes;
                    }
                    if (item.children && item.children.length) {
                        this.groupButtonPerm(item.children, buttonPerm, id);
                    }
                });
            }
        },
        turnToPage(route) {
            let { name, params, query } = {};
            if (typeof route === 'string') name = route;
            else {
                name = route.name;
                params = route.params;
                query = route.query;
            }
            if (name.indexOf('isTurnByHref_') > -1) {
                window.open(name.split('_')[1]);
                return;
            }
            this.$router.push({
                name,
                params,
                query
            });
        },
        handleCollapsedChange(state) {
            this.collapsed = state;
            this.$store.commit('changeCollapsed', this.collapsed);
        },
        handleCloseTag(res, type, route) {
            if (type !== 'others') {
                if (type === 'all') {
                    this.turnToPage(this.$config.homeName);
                } else {
                    if (routeEqual(this.$route, route)) {
                        this.closeTag(route);
                    }
                }
            }
            this.setTagNavList(res);
        },
        handleClick(item) {
            this.turnToPage(item);
        },
        campusChange(campusId) {
            if (campusId != 'all') {
                this.campusId = campusId;
                this.setCurrOfficeId(this.campusId);
                let _campus = this.campusList.filter(item => {
                    return item.id == campusId;
                })[0];
                this.campus = (_campus.code ? _campus.code : '') + _campus.name;
            } else {
                this.campusId = 'all';
                this.campus = '全部校区';
                this.setCurrOfficeId('all');
            }
        },
        reload() {
            this.isRviewShow = false;
            this.$nextTick(() => {
                this.isRviewShow = true;
            });
        },
        browserInfo(userAgent) {
            let broName;
            //FireFox
            if (userAgent.indexOf('Firefox') != -1) {
                let isFireFox = true;
                /*broName = 'FireFox浏览器';*/
                let strStart = userAgent.indexOf('Firefox');
                let temp = userAgent.substring(strStart);
                broName = temp.replace('/', '版本号');
            }

            //Edge
            if (userAgent.indexOf('Edge') != -1) {
                let isEdge = true;
                /*broName = 'Edge浏览器';*/
                let strStart = userAgent.indexOf('Edge');
                let temp = userAgent.substring(strStart);
                broName = temp.replace('/', '版本号');
            }

            //IE浏览器
            if (userAgent.indexOf('NET') != -1 && userAgent.indexOf('rv') != -1) {
                let isIE = true;
                /*broName = 'IE浏览器'; */
                let strStart = userAgent.indexOf('rv');
                let strStop = userAgent.indexOf(')');
                let temp = userAgent.substring(strStart, strStop);
                broName = temp.replace('rv', 'IE').replace(':', '版本号');
            }

            //360极速模式可以区分360安全浏览器和360极速浏览器
            if (userAgent.indexOf('WOW') != -1 && userAgent.indexOf('NET') < 0 && userAgent.indexOf('Firefox') < 0) {
                if (navigator.javaEnabled()) {
                    let is360 = true;
                    broName = '360安全浏览器-极速模式';
                } else {
                    let is360 = true;
                    broName = '360极速浏览器-极速模式';
                }
            }

            //360兼容
            if (userAgent.indexOf('WOW') != -1 && userAgent.indexOf('NET') != -1 && userAgent.indexOf('MSIE') != -1 && userAgent.indexOf('rv') < 0) {
                let is360 = true;
                broName = '360兼容模式';
            }

            //Chrome浏览器
            if (userAgent.indexOf('WOW') < 0 && userAgent.indexOf('Edge') < 0) {
                let isChrome = true;
                /*broName = 'Chrome浏览器';*/
                let strStart = userAgent.indexOf('Chrome');
                let strStop = userAgent.indexOf(' Safari');
                let temp = userAgent.substring(strStart, strStop);
                broName = temp.replace('/', '版本号');
            }
            return broName;
        },
        setDeviceAndOS() {
            let obj = {};
            var name = 'unknown';
            if (window.navigator.userAgent.indexOf('Android') != -1) {
                name = 'Android';
            } else if (window.navigator.userAgent.indexOf('iPhone') != -1) {
                name = 'iPhone';
            } else if (window.navigator.userAgent.indexOf('SymbianOS') != -1) {
                name = 'SymbianOS';
            } else if (window.navigator.userAgent.indexOf('Windows Phone') != -1) {
                name = 'Windows Phone';
            } else if (window.navigator.userAgent.indexOf('iPad') != -1) {
                name = 'iPad';
            } else if (window.navigator.userAgent.indexOf('iPod') != -1) {
                name = 'iPod';
            }
            if (name != 'unknown') {
                _AgentInfo.OSname = name;
                _AgentInfo.deviceType = 'mobile';
                return;
            }
            if (window.navigator.userAgent.indexOf('Windows NT 10.0') != -1) {
                name = 'Windows 10';
            } else if (window.navigator.userAgent.indexOf('Windows NT 6.2') != -1) {
                name = 'Windows 8';
            } else if (window.navigator.userAgent.indexOf('Windows NT 6.1') != -1) {
                name = 'Windows 7';
            } else if (window.navigator.userAgent.indexOf('Windows NT 6.0') != -1) {
                name = 'Windows Vista';
            } else if (window.navigator.userAgent.indexOf('Windows NT 5.1') != -1) {
                name = 'Windows XP';
            } else if (window.navigator.userAgent.indexOf('Windows NT 5.0') != -1) {
                name = 'Windows 2000';
            } else if (window.navigator.userAgent.indexOf('Mac') != -1) {
                name = 'Mac/iOS';
            } else if (window.navigator.userAgent.indexOf('X11') != -1) {
                name = 'UNIX';
            } else if (window.navigator.userAgent.indexOf('Linux') != -1) {
                name = 'Linux';
            }
            obj.OSname = name;
            obj.deviceType = 'pc';
            return obj;
        },
        closeAddBackModel(name) {
            this.addBackForm = {
                id: '',
                priority: '',
                type: '',
                content: '',
                status: '',
                url: window.location.href,
                browser: '',
                os: '',
                username: '',
                pwdFlag: '',
                sysWorkorderLogList: [],
                title: ''
            };
            this.$refs[name].resetFields();
            this.addBackModel = false;
        },
        addBackOk(name, id) {
            this.addBackForm.content = this.$refs.editor.model;
            this.$refs[name].validate(valid1 => {
                if (valid1) {
                    this.updateLoadingStatus({ isLoading: true });
                    let params5 = {};
                    params5 = this.addBackForm;
                    params5.browser = this.browserInfo(this.allinfo.userAgent);
                    params5.os = this.setDeviceAndOS().OSname;
                    params5.username = this.userInfo.name;
                    if (this.isEditBack) {
                        params5.status = 'commited';
                    } else {
                        params5.id = '';
                        params5.status = 'commited';
                    }
                    params5.pwdFlag = 0;
                    sysWorkorder
                        .workorferSave(params5)
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                //this.$Message.success(res.data.message);
                                this.closeAddBackModel(name);
                                this.updateLoadingStatus({ isLoading: false });
                                this.$Modal.confirm({
                                    title: '提示',
                                    content: '<p>您的反馈提交成功，可前往反馈列表查看详情及解决结果。</p>',
                                    okText: '前往我的反馈',
                                    cancelText: '留在当前页面',
                                    onOk: () => {
                                        /* const {href} = this.$router.resolve({
											name: 'crm.detail',
											query: {
												id: params.row.cusId,
												from:'public'
											}
										})
										window.open(href, '_blank') */
                                        this.$router.push({
                                            name: 'portal.workorderM',
                                            query: {
                                                showInfo: false
                                            }
                                        });
                                    },
                                    onCancel: () => {}
                                });
                            }
                        })
                        .catch(errors.call(this));
                }
            });
        },
        helpChange(name) {
            if (name == 'help') {
            } else if (name == 'myTickling') {
                // 我的反馈
                this.$router.push({
                    name: 'portal.myFeedback'
                });
            } else {
                this.$refs.editor.reset();
                this.addBackForm.content = '';
                this.addBackModel = true;
            }
        }
    },
    watch: {
        $route(newRoute, oldRoute) {
            let tRoute = getHomeRoute(this.orginRouter, newRoute.name);
            // newRoute=Object.assign({},newRoute,tRoute);
            if (tRoute.meta) {
                newRoute.meta.title = tRoute.meta.title || newRoute.meta.title;
                newRoute.meta.enTitle = tRoute.meta.enTitle || newRoute.meta.enTitle;
                newRoute.meta.icon = tRoute.meta.icon || newRoute.meta.icon;
            }
            newRoute.matched.forEach(v => {
                let tMatch = getHomeRoute(this.orginRouter, v.name);
                console.log(v, v.name, tMatch, 2222222);
                if (Object.keys(tMatch).length) {
                    v.meta.title = tMatch.meta.title || v.meta.title;
                    v.meta.enTitle = tMatch.meta.enTitle || v.meta.enTitle;
                    v.meta.icon = tMatch.meta.icon || v.meta.icon;
                }
            });
            console.log(newRoute, 1111);
            const { name, query, params, meta } = newRoute;
            if (newRoute.meta.title == oldRoute.meta.title || query.byLfRm) return;
            if (meta.hasOwnProperty('title')) {
                // this.addTag({
                //     route: {
                //         name,
                //         query,
                //         params,
                //         meta
                //     },
                //     type: 'push'
                // });
                this.setBreadCrumb(newRoute);
                this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
                this.$refs.sideMenu.updateOpenName(newRoute.name);
            }
            if (oldRoute.meta.outClose) {
                let res = this.tagNavList.filter(item => !routeEqual(oldRoute, item));
                this.handleCloseTag(res, undefined, oldRoute);
            }
        }
        // 'addBackForm.content':{
        // 	handler(val, oldVal) {
        // 		this.$refs.addBackForm1.validateField('content')
        // 	},
        // 	deep:true
        // }
    },
    mounted() {
        /**
         * @description 初始化设置面包屑导航和标签导航
         */
        // this.setHomeRoute(routers)
        // 设置初始语言
        this.setLocal(this.$i18n.locale);
        // console.log(this.$i18n)
        // 获取未读消息条数
        //  this.getUnreadMessageCount()
        this.dataScopeFilter();
        waitUntil(
            () => {
                if (this.$store.state.logoUrlLight && this.$store.state.logoUrl && this.$store.state.miniLogoUrl) {
                    // console.log("logo图片地址", this.$store.state);
                }
                return (this.$store.state.logoUrlLight && this.$store.state.logoUrl && this.$store.state.miniLogoUrl) || false;
            },
            () => {
                    this.logoImgUrlLight = this.$store.state.logoUrlLight;
                    this.logoImgUrl = this.$store.state.logoUrl;
                    this.miniImgUrl = this.$store.state.miniLogoUrl;
            }
        );
    }
};
</script>
