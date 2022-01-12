<template>
    <div style="display:inline-block;padding:0 6px;">
        <Dropdown trigger="click" @on-click="setTheme">
            <a href="javascript:void(0)">
                <Icon :style="{marginTop: '-2px', verticalAlign: 'middle'}" color="#495060" :size="16" type="md-color-fill"></Icon>
        	<Icon :size="18" type="md-arrow-dropdown" />
            </a>
            <DropdownMenu slot="list">
                <DropdownItem v-for="(item, index) in themeList" :key="index" :name="item.name">
                    <Row type="flex" justify="start" align="middle">
                        <span style="margin-right:10px;"><Icon :size="20" :type="item.name !== themeName ? 'ios-happy-outline' : 'ios-happy'" :color="item.element"/></span>
                        <span><Icon :size="22" type="ios-radio-button-on" :color="item.element"/></span>{{item.name}}
                    </Row>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import Vue from 'vue';
// import config from '../../../../build/config.js';
export default {
    name: 'themeSwitch',
    data () {
        return {
        	themeName:localStorage.theme?JSON.parse(localStorage.theme)[0].mainTheme:'default',
            themeList: [
                {
                    name: 'default',
                    menu: '#495060',
                    element: '#2d8cf0'
                },
                {
                    name: 'green',
                    menu: '#495060',
                    element: '#44bcb7'
                },
                {
                    name: 'orange',
                    menu: '#495060',
                    element: '#e96500'
                },
                {
                    name: 'red',
                    menu: '#495060',
                    element: '#e43e31'
                }
            ]
        };
    },
    computed:{
        	
    },
    methods: {
        setTheme (themeFile) {
            let menuTheme = themeFile.substr(0, 1);
            let mainTheme = themeFile.substr();
            if (menuTheme === 'default') {
                // 黑色菜单
                this.$store.commit('changeMenuTheme', 'dark');
                menuTheme = 'dark';
            } else {
                this.$store.commit('changeMenuTheme', 'light');
                menuTheme = 'light';
            }
            let path = '';
            let themeLink = document.querySelector('link[name="theme"]');
            let themeWrap = document.querySelector('#app');
            let userName = Cookies.get('user');
            if (localStorage.theme) {
                let themeList = JSON.parse(localStorage.theme);
                let index = 0;
                let hasThisUser = themeList.some((item, i) => {
                    if (item.userName === userName) {
                        index = i;
                        return true;
                    } else {
                        return false;
                    }
                });
                if (hasThisUser) {
                    themeList[index].mainTheme = mainTheme;
                    themeList[index].menuTheme = menuTheme;
                } else {
                    themeList.push({
                        userName: userName,
                        mainTheme: mainTheme,
                        menuTheme: menuTheme
                    });
                }
                localStorage.theme = JSON.stringify(themeList);
            } else {
                localStorage.theme = JSON.stringify([{
                    userName: userName,
                    mainTheme: mainTheme,
                    menuTheme: menuTheme
                }]);
            }
            let stylePath = '';
            if (process.env.NODE_ENV.indexOf('dev') > -1) {
                stylePath = '/';
            } else {
                stylePath = '/';
            }
            if (mainTheme !== 'default') {
                path = stylePath + mainTheme + '.css';
            } else {
//              path = '';
				
                path = stylePath + mainTheme + '.css';
            }
            themeLink.setAttribute('href', path);
            themeWrap.setAttribute('class', mainTheme+"_wrap");
            this.themeName=JSON.parse(localStorage.theme)[0].mainTheme;
        }
    },
    created () {
//		setTimeout(()=>{
//			this.$nextTick(()=>{
	
            let themeDom = document.querySelector('link[name="theme"]');
            if(!themeDom){
				let dom=document.createElement("LINK");
				dom.setAttribute("type","text/css");
				dom.setAttribute("rel","stylesheet");
				dom.setAttribute("name","theme");
				dom.setAttribute("href","");
				document.querySelector("head").appendChild(dom);
            }
//			})
//		},1000)
        let path = '';
        if (process.env.NODE_ENV.indexOf('dev') > -1) {
            path = '/';
        } else {
            path = '/';
        }
        let name = Cookies.get('user');
        if (localStorage.theme) {
            let hasThisUser = JSON.parse(localStorage.theme).some(item => {
                if (item.userName === name) {
                    this.$store.commit('changeMenuTheme', item.menuTheme);
                    this.$store.commit('changeMainTheme', item.mainTheme);
                    return true;
                } else {
                    return false;
                }
            });
            if (!hasThisUser) {
                this.$store.commit('changeMenuTheme', 'dark');
                this.$store.commit('changeMainTheme', 'green');
            }
        } else {
            this.$store.commit('changeMenuTheme', 'dark');
            this.$store.commit('changeMainTheme', 'green');
        }
        // 根据用户设置主题
        if (this.$store.state.app.themeColor !== 'default') {
            let stylesheetPath = path + this.$store.state.app.themeColor + '.css';
            let themeLink = document.querySelector('link[name="theme"]');
            let themeWrap = document.querySelector('#app');
            themeLink.setAttribute('href', stylesheetPath);
            themeWrap.setAttribute('class', this.$store.state.app.themeColor+"_wrap");
        }else{
            let stylesheetPath = path + this.$store.state.app.themeColor + '.css';
            let themeLink = document.querySelector('link[name="theme"]');
            let themeWrap = document.querySelector('#app');
            themeLink.setAttribute('href', stylesheetPath);
            themeWrap.setAttribute('class', this.$store.state.app.themeColor+"_wrap");
        }
    },
    watch:{
    }
};
</script>
