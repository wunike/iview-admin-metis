<style lang="less">
html,
body,
.wrapper {
    height: 100%;
    /*min-width: 960px;
		min-height: 600px;*/
}

.wrapper-main {
    /*position: fixed;
		left: 60px;
		right: 0;
		top: 0;
		bottom: 0;*/
    height: 100%;
    overflow: auto;
    .ivu-table {
        .ivu-tooltip,
        .ivu-tooltip-rel {
            display: block;
        }
    }
}

button.ivu-btn:focus {
    box-shadow: none;
}
</style>
<template>
    <div class="wrapper" v-if="hasAside">
        <!--<div class="aside">
			<asidebar></asidebar>
		</div>-->
        <div class="wrapper-main" id="mainBody">
            <!--<router-view></router-view>-->
            <index-main></index-main>
        </div>
    </div>
    <router-view v-else></router-view>
</template>
<script>
import asidebar from '../modules/aside';
import { mapMutations, mapState } from 'vuex';
import valid, { errors, sys, sysUser, sysConfig, sysMenu } from '../libs/request';
import indexMain from '@/components/mainCos';
import Cookies from 'js-cookie';
let regist = false;

export default {
    name: 'portal.index',
    components: {
        asidebar,
        indexMain
    },
    data() {
        return {};
    },
    computed: {
        ...mapState(['userInfo', 'noLogin', 'calendarConfig']),
        hasAside() {
            return this.$route.meta.aside !== false;
        }
    },
    created() {
        // localStorage.theme = JSON.stringify([{
        // 	mainTheme: 'green',
        // 	menuTheme: 'light'
        // }]);
        if (this.noLogin.indexOf(this.$route.name) < 0) {
            if (!regist) {
                this.registerModule();
                regist = true;
            }
            if (!this.calendarConfig.maxMonthInterval) {
                this.$store.dispatch('portal/getlogoinfo');
                this.$store.dispatch('portal/getCalendarConfig');
            }
            if (!this.userInfo.id) {
                this.$store.dispatch('portal/getUserInfo');
                this.$store.dispatch('portal/updateAppMenu');
                this.$store.dispatch('portal/updateAside');
                // this.$store.dispatch('app/listGrantAllMenu')
            }
        }
        //		setTimeout(()=>{
        //			this.$nextTick(()=>{

        // let themeDom = document.querySelector('link[name="theme"]');
        // if(!themeDom) {
        // 	let dom = document.createElement("LINK");
        // 	dom.setAttribute("type", "text/css");
        // 	dom.setAttribute("rel", "stylesheet");
        // 	dom.setAttribute("name", "theme");
        // 	dom.setAttribute("href", "");
        // 	document.querySelector("head").appendChild(dom);
        // }
        //			})
        //		},1000)
        // let path = '';
        // if(process.env.NODE_ENV.indexOf('dev') > -1) {
        // 	path = '/';
        // } else {
        // 	path = '/';
        // }
        // let name = Cookies.get('user');
        // if(localStorage.theme) {
        // 	let hasThisUser = JSON.parse(localStorage.theme).some(item => {
        // 		if(item.userName === name) {
        // 			this.$store.commit('changeMenuTheme', item.menuTheme);
        // 			this.$store.commit('changeMainTheme', item.mainTheme);
        // 			return true;
        // 		} else {
        // 			return false;
        // 		}
        // 	});
        // 	if(!hasThisUser) {
        // 		this.$store.commit('changeMenuTheme', 'dark');
        // 		this.$store.commit('changeMainTheme', 'green');
        // 	}
        // } else {
        // 	this.$store.commit('changeMenuTheme', 'dark');
        // 	this.$store.commit('changeMainTheme', 'green');
        // }
        // 根据用户设置主题
        // if(this.$store.state.app.themeColor !== 'default') {
        // 	let stylesheetPath = path + this.$store.state.app.themeColor + '.css';
        // 	let themeLink = document.querySelector('link[name="theme"]');
        // 	let themeWrap = document.querySelector('#app');
        // 	themeLink.setAttribute('href', stylesheetPath);
        // 	themeWrap.setAttribute('class', this.$store.state.app.themeColor + "_wrap");
        // } else {
        // 	let stylesheetPath = path + this.$store.state.app.themeColor + '.css';
        // 	let themeLink = document.querySelector('link[name="theme"]');
        // 	let themeWrap = document.querySelector('#app');
        // 	themeLink.setAttribute('href', stylesheetPath);
        // 	themeWrap.setAttribute('class', this.$store.state.app.themeColor + "_wrap");
        // }
    },
    mounted() {
        console.log('执行获取logo');
        this.$store.dispatch('portal/getlogoinfo');
    },
    methods: {
        ...mapMutations([
            'updateLoadingStatus',
            'updateUserInfo',
            'updateCalendarConfig',
            'updateToken',
            'updateTenant',
            'updateLogoUrl',
            'updateMiniLogoUrl',
            'updateLogoUrlLight'
        ]),
        setLink(color = 'default', type = 'leftStyle') {
            console.log(color, type, 1231231);
            localStorage.theme = color;
            localStorage.exterior = type;
            if (type == 'topStyle') {
                this.$store.commit('changeMenuTheme', 'light');
            } else {
                this.$store.commit('changeMenuTheme', 'dark');
            }
            let themeWrap = document.querySelector('body');
            let classcont = themeWrap.className;
            if (classcont.search(/\w+_wrap/gi) == -1) {
                classcont = classcont + ' ' + color + '_wrap';
            } else {
                classcont = classcont.replace(/\w+_wrap/gi, color + '_wrap');
            }
            if (classcont.search(/\w+Style/gi) == -1) {
                classcont = classcont + ' ' + type;
            } else {
                classcont = classcont.replace(/\w+Style/gi, type);
            }
            themeWrap.className = classcont;
        },
        registerModule() {
            let _this = this;
            this.$store.registerModule('portal', {
                namespaced: true,
                state: {
                    menus: []
                },
                getters: {},
                mutations: {
                    updateMenu(state, { menu }) {
                        state.menus = menu;
                    }
                },
                actions: {
                    updateAside(context) {
                        //          sys.listQuickMenu().then(valid.call(_this)).then(res => {
                        //            if (res.ok) {
                        //              this.commit('updateAsideApp', { asideApp: res.data.data })
                        //            }
                        //          }).catch(errors.call(_this))
                    },
                    updateAppMenu(context) {
                        sysMenu
                            .listGrantMenu({
                                id: 0
                            })
                            .then(valid.call(_this))
                            .then(res => {
                                if (res.ok) {
                                    this.commit('appMenuList', {
                                        appMenuList: res.data.data
                                    });
                                }
                            })
                            .catch(errors.call(_this));
                    },
                    getUserInfo(context) {
                        _this.updateLoadingStatus({
                            isLoading: true,
                            loadingBg: 'rgba(255,255,255,0.99)'
                        });
                        sysUser
                            .userInfoData()
                            .then(valid.call(_this))
                            .then(res => {
                                if (res.ok) {
                                    localStorage.setItem('roleId', res.data.data.roleId);
                                    this.commit('updateUserInfo', {
                                        userInfo: res.data.data
                                    });
                                    this.commit('setAvator', res.data.data.photo);
                                } else {
                                    _this.$Message.error(res.data.message);
                                }
                            })
                            .catch(e => {
                                _this.$Message.error(e.message ? e.message : e.toString());
                                _this.$router.push({
                                    name: this.state.config.loginRouter
                                });
                            })
                            .finally(() => {
                                setTimeout(() => {
                                    _this.updateLoadingStatus({
                                        isLoading: false,
                                        loadingBg: false
                                    });
                                }, 20);
                            });
                    },
                    getCalendarConfig() {
                        sysConfig
                            .getConfig({
                                menuId: 0,
                                configId: 'base:calendarConfig'
                            })
                            .then(valid.call(_this))
                            .then(res => {
                                if (res.ok) {
                                    this.commit('updateCalendarConfig', {
                                        calendarConfig: res.data.data
                                    });
                                } else {
                                    _this.$Message.error(res.data.message);
                                }
                            })
                            .catch(e => {})
                            .finally(() => {});
                    },
                    getlogoinfo() {
                        sysConfig
                            .form(
                                // {configId: 'base:businesslicenseinfo'}
                                // {configId: 'base:systeninfo'}
                                { configId: 'base:logoinfo' }
                            )
                            .then(valid.call(_this))
                            .then(res => {
                                let logoUrlObj = JSON.parse(res.data.data.value);
                                this.commit('updateLogoUrl', { logoUrl: logoUrlObj.logoUrl });
                            })
                            .catch(e => {})
                            .finally(() => {});

                        sysConfig
                            .form(
                                // {configId: 'base:businesslicenseinfo'}
                                // {configId: 'base:systeninfo'}
                                { configId: 'base:logoinfo_light' }
                            )
                            .then(valid.call(_this))
                            .then(res => {
                                let logoUrlLightObj = JSON.parse(res.data.data.value);
                                this.commit('updateLogoUrlLight', { logoUrlLight: logoUrlLightObj.logoUrl });
                            })
                            .catch(e => {})
                            .finally(() => {});

                        sysConfig
                            .form({ configId: 'base:minilogoinfo' })
                            .then(valid.call(_this))
                            .then(res => {
                                let logoUrlObj = JSON.parse(res.data.data.value);
                                this.commit('updateMiniLogoUrl', { miniLogoUrl: logoUrlObj.miniLogoUrl||logoUrlObj.logoUrl });
                            })
                            .catch(e => {})
                            .finally(() => {});

                        sysConfig
                            .form({
                                configId: 'base:systeninfo'
                            })
                            .then(valid.call(_this))
                            .then(res => {
                                if (res.ok) {
                                    let systeninfo = JSON.parse(res.data.data.value);
                                    let favicon = document.querySelector('link[type="image/x-icon"]');
                                    let favicon1 = document.querySelector('link[rel="shortcut icon"]');
                                    document.title = systeninfo.sysName;
                                    favicon.setAttribute('href', systeninfo.sysPicUrl);
                                    favicon.setAttribute('mce_href', systeninfo.sysPicUrl);
                                    favicon1.setAttribute('href', systeninfo.sysPicUrl);
                                    _this.setLink(systeninfo.color, systeninfo.exterior);
                                } else {
                                    _this.$Message.error(res.data.message);
                                }
                            })
                            .catch(e => {})
                            .finally(() => {});
                    },
                    autoLogin() {
                        //          sys.autoLogin().then(res => {
                        //          }).catch(e => {})
                    },
                    autoLogout() {
                        _this.updateToken({
                            token: ''
                        });
                        localStorage.setItem('token', '');
                        _this.updateTenant({
                            tenant: ''
                        });
                        localStorage.setItem('tenant', '');
                        sys.logout()
                            .then(res => {
                                // console.log('res', res);
                                res.data.status = 'login';
                                _this.$store.commit('appMenuList', {
                                    appMenuList: []
                                });
                                _this.$store.commit('updateLogoUrl', { logoUrl: '' });
                                _this.$store.commit('updateLogoUrlLight', { logoUrl: '' });
                                _this.$store.commit('updateMiniLogoUrl', { miniLogoUrl: '' });
                                _this.updateUserInfo({
                                    userInfo: {
                                        roleId: '',
                                        roleMap: {},
                                        roleNameMap: {}
                                    }
                                });
                                return res;
                            })
                            .then(valid.call(_this));
                    }
                }
            });
        }
    }
};
</script>
