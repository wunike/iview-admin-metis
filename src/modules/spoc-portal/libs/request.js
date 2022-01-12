import axios from 'axios';
import qs from 'qs';
import config from '@/config'
import store from '@/store'
import router from '@/router';
import { Message } from 'view-design';
import { setToken } from '@/libs/util'
let flag = true;

export const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
export const baseURLSys = baseUrl + '/api/common/a/ws/sys';

const loginRouter = 'portal.login';

const headers = {
	'X-Requested-With': 'XMLHttpRequest',
	'Pragma': 'no-cache',
	'Expires': 0,
};

export const httpCreate = (baseURL, transformRequest) => {
	const config = {};
	if(transformRequest) {
		config.transformRequest = transformRequest;
	}
	let request = axios.create(Object.assign({
		baseURL,
		timeout: 30000,
		withCredentials: true,
		headers,
	}, config));

	request.interceptors.request.use(config=>{
		// console.log(config,"requestConfig")
		if(store.state.token || localStorage.getItem('token')){
			config.headers.token = store.state.token || localStorage.getItem('token')
		}
		if(store.state.tenant || localStorage.getItem('tenant')){
			config.headers.tenant = store.state.tenant || localStorage.getItem('tenant')
		}
		if(config.headers.menuRouteCover){
			config.headers.menuRoute = config.headers.menuRouteCover
		} else {
			config.headers.menuRoute = store.state.routerName
		}

		if(config.url.indexOf('/api/authority/anno/login') >= 0){ // 登录
			if(config.data.isRememberLoginInfo === true){
				config.headers['login-type'] = 'pc' // 两周内免登录
			}
			config.headers['tenant'] = config.data.tenant
		}
		
		if(config.url.indexOf('/crmQrcode/anno/form') >= 0 ||
			config.url.indexOf('crmCustomer/anno/saveUnLoginEnrollCustomer') >= 0){ // 扫码打开页面 post类接口
			if(config.data.tenant){
				config.headers['tenant'] = config.data.tenant
			}
		}
		if(config.url.indexOf('dict/anno/batchListData') >= 0 || 
			config.url.indexOf('crmCustomer/anno/findPhonePlace') >= 0 || 
			config.url.indexOf('crmCustomer/anno/getCustomerByPhone') >= 0){ // 扫码打开页面.获取字典 扫码打开页面.获取手机号信息  get类接口
			if(config.params.tenant){ 
				config.headers['tenant'] = config.params.tenant
			}
		}

		if(config.url.indexOf('migarate')>= 0){
			config.timeout = 120000
		}
		return config
	},err=>{
		console.log(err)
	})

	return request
};

const headersForm = {
	'X-Requested-With': 'XMLHttpRequest',
	'Pragma': 'no-cache',
	'Expires': 0,
	'Content-Type': 'application/x-www-form-urlencoded'
};
export const httpCreateForm = (baseURL, transformRequest) =>{
	const config = {};
	if(transformRequest) {
		config.transformRequest = transformRequest;
	}
	let request = axios.create(Object.assign({
		baseURL,
		timeout: 30000,
		withCredentials: true,
		headers: headersForm,
	}, config));
	
	request.interceptors.request.use(config=>{
		if(store.state.token || localStorage.getItem('token')){
			config.headers.token = store.state.token || localStorage.getItem('token')
		}
		if(store.state.tenant || localStorage.getItem('tenant')){
			config.headers.tenant = store.state.tenant || localStorage.getItem('tenant')
		}
		if(config.headers.menuRouteCover){
			config.headers.menuRoute = config.headers.menuRouteCover
		} else {
			config.headers.menuRoute = store.state.routerName
		}
		return config
	},err=>{
		console.log(err)
	})

	return request
};

export const httpCreateBlob = (baseURL, transformRequest) => {
	const config = {};
	if(transformRequest) {
		config.transformRequest = transformRequest;
	}
	let request = axios.create(Object.assign({
		baseURL,
		timeout: 120000,
		withCredentials: true,
		headers,
		responseType: 'blob',
	}, config));
	
	request.interceptors.request.use(config=>{
		if(store.state.token || localStorage.getItem('token')){
			config.headers.token = store.state.token || localStorage.getItem('token')
		}
		if(store.state.tenant || localStorage.getItem('tenant')){
			config.headers.tenant = store.state.tenant || localStorage.getItem('tenant')
		}
		if(config.headers.menuRouteCover){
			config.headers.menuRoute = config.headers.menuRouteCover
		} else {
			config.headers.menuRoute = store.state.routerName
		}
		return config
	},err=>{
		console.log(err)
	})

	return request
	
};
export const httpCreateArraybuffer = (baseURL, transformRequest) => {
	const config = {};
	if(transformRequest) {
		config.transformRequest = transformRequest;
	}
	let request = axios.create(Object.assign({
		baseURL,
		timeout: 120000,
		withCredentials: true,
		headers,
		responseType: 'arraybuffer'
	}, config));
	request.interceptors.request.use(config=>{
		if(store.state.token || localStorage.getItem('token')){
			config.headers.token = store.state.token || localStorage.getItem('token')
		}
		if(config.params.loginTenant || store.state.tenant || localStorage.getItem('tenant')){
			config.headers.tenant = config.params.loginTenant || store.state.tenant || localStorage.getItem('tenant')
		}
		if(config.headers.menuRouteCover){
			config.headers.menuRoute = config.headers.menuRouteCover
		} else {
			config.headers.menuRoute = store.state.routerName
		}
		return config
	},err=>{
		console.log(err)
	})

	return request
	
};

export {
	sysNotificationUserSetting
}
from './sysNotificationUserSetting';
export {
	sysConfig
}
from './sysConfig';
export {
	sys
}
from './sys';
export {
	sysUser
}
from './sysUser';
export {
	sysAttachment
}
from './sysAttachment';
export {
	sysDict
}
from './sysDict';
export {
	sysOffice
}
from './sysOffice';
export {
	sysRole
}
from './sysRole';
export {
	sysMenu
}
from './sysMenu';
export {
    sysCommonSql,
}
from './sysCommonSql';
export {
	sysWorkorder
}
from './sysWorkorder';
export {
	common,
}
from './common';
export {
     comAuditFlow
}
from './comAuditFlow';
export {
	SysProps
}
from './props';
export {
	api
}
from './api';

let autoLogoutNumber = 0;
let timmer = null
export default function() {
	return(res) => {
		//		 bug 1077 曹见芳 2018-7-20 start
		let urlStr = res.config.url;
		let logoutUrl = baseUrl + '/api/common/a/ws/sys/logout';
		if((res.data.code == 401 || res.data.code =='40001') && urlStr != logoutUrl && autoLogoutNumber == 0) {
			autoLogoutNumber++;
			setToken('')
			router.push({
				name: 'portal.login'
			});
			// if(this.$root.onLogout) {
			// 	this.$root.onLogout();
			// }
			// store.dispatch('portal/autoLogout');
		}
		//		 bug 1077 曹见芳 2018-7-20 end
		if(res.data) {
			if(res.data.status == 'login') {
				if(this.$route.name != loginRouter) {
					this.$router.push({
						name: loginRouter
					});
				}
			} else if(res.data.status == 'error' || res.data.status == 'authority' || (res.data.code && res.data.code < 0)) {
				let message = res.data.message || res.data.msg
				if(timmer){
					clearTimeout(timmer)
					timmer = null
				}
				timmer = setTimeout(() => {
					if(message.indexOf('电话已存在') > -1) {
						//BUG #2085
						Message.error({
							content: message,
							duration: 6
						});
					} else {
						Message.error({
							content: message,
							duration: 4
						});
					}
				}, 1000);
			} else if(res.data.status == 'location') {
				location.href = res.data.location;
			} else if(res.data.status == 'success') {
				res.ok = true;
			} else if(res.data.code == 200 || res.data.code == 0) {
				res.ok = true;
			} else if(res.data.type && res.status == 200) {
				// 导出
				res.ok = true;
			} else {
				res.ok = false;
				if(flag) {
					flag = false;
					if(res.data.message || res.data.msg){
						Message.error({
							content: res.data.message || res.data.msg,
							duration: 4
						});
					}
					setTimeout(() => {
						flag = true;
					}, 4000)
				}
				console.error('unknow status');
			}
		}
		return res;
	};
}

export const errors = function() {
	return(err) => {
		store.commit('updateShowErrorStatus', {
			showError: true
		})
		let bin = false;
		if(err) {
			if(err.response) {
				switch(err.response.status) {
					case 400:
						err.message = '错误请求';
						bin = true;
						break
					case 401:
						err.message = '未授权，请重新登录'
						bin = true;
						break
					case 403:
						err.message = '拒绝访问'
						bin = true;
						break
					case 404:
						err.message = '请求错误,未找到该资源'
						bin = true;
						break
					case 405:
						err.message = '请求方法未允许'
						bin = true;
						break
					case 408:
						err.message = '请求超时'
						bin = true;
						break
					case 500:
						err.message = '服务器端出错'
						bin = true;
						break
					case 501:
						err.message = '网络未实现'
						bin = true;
						break
					case 502:
						err.message = '网络错误'
						bin = true;
						break
					case 503:
						err.message = '服务不可用'
						bin = true;
						break
					case 504:
						err.message = '网络超时'
						bin = true;
						break
					case 505:
						err.message = 'http版本不支持该请求'
						bin = true;
						break
					default:err.message = err.message
						bin = true;
						break
						//		        err.message = `连接错误${err.response.status}`
				}
			}
			if(bin) {
				if(flag) {
					flag = false;
					Message.error({
						content: err.message,
						duration: 4
					});
					setTimeout(() => {
						flag = true;
					}, 4000)
				}
			} else {
				Message.error({
					content: err.toString(),
					duration: 4
				});
			}
		}
	};
};

const httpSysForm = httpCreate(baseURLSys,[function(data, headers) {
	return qs.stringify(data);
}]);

const httpSys = httpCreate(baseURLSys);
const httpRequest = httpCreate(baseUrl);
const httpArraybufferRequest = httpCreateArraybuffer(baseUrl);

export const login = (loginData) => {
	autoLogoutNumber = 0;
	return httpRequest.post('/api/authority/anno/login', loginData);
	//return httpSysForm.post('/login', loginData);
};
export const captcha = (loginData) => {
	return httpArraybufferRequest.get('/api/authority/anno/captcha', {params:loginData});
};

export const codeImgUrl = () => {
	return '/api/jw/servlet/validateCodeServlet?t=' + (new Date().getTime());
};

export { comPortalItem } from './comPortalItem';
export { comPortalTpl } from './comPortalTpl';
export { report } from './report';
