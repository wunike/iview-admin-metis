import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user';
import app from './module/app';
import actions from './module/actions.js';
import mutations from './module/mutations.js';
import editor from './module/editor'

import { Message } from 'element-ui'
Vue.use(Vuex)

export default new Vuex.Store({
	strict:true,
  	state: {
		showError: false,
		isLoading:false,
		loadingBg:'',
		userInfo:{
			roleId:'',
			roleMap:{},
			roleNameMap:{},
		},
		token: '',
		tenant: '',
		calendarConfig:{},
		pid:0,
		noLogin:['sign.pdfview'],
		asideApp:[],
		appMenuList:[], // 控制台所有应用列表
		currentAsideApp:{},
		buttonPerm:{} ,//按钮权限,
        logoUrl: '',
        logoUrlLight: '',
        miniLogoUrl: '',
  	},
	getters: {
		roleName(state){
			if(state.userInfo.roleNameMap){
				return state.userInfo.roleNameMap[state.pid];
			}
		}
	},
	mutations,
	actions,
	modules: {
		user,
		app,
        editor
	}
})
