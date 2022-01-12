// import {
//     httpCreate,
//     httpCreateBlob,
//     httpCreateForm
// } from './request';
import qs from 'qs';
import axios from 'axios';
import config from '@/config'
import store from '@/store'
// import {baseURLReport} from "./request";

export const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

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


export const baseURLApi = baseUrl + '/api';
export const baseURLSys = baseUrl + '/api/common/a/ws/sys';
export const baseURLCommon = baseUrl + '/api/common/a/ws/common';
export const baseURLPortal = baseUrl + '/api/common/a/ws/portal';
export const baseURLReport = baseUrl + '/api/report/a/ws';

export const httpSysForm = httpCreateForm(baseURLSys, [function (data, headers) {
    return qs.stringify(data);
}]);

export const httpApi = httpCreate(baseURLApi);
export const httpApiFrom = httpCreateForm(baseURLApi, [function (data, headers) {
    return qs.stringify(data);
}]);
export const httpSys = httpCreate(baseURLSys);
export const httpSysBlob = httpCreateBlob(baseURLSys);

export const httpCommon = httpCreate(baseURLCommon);
export const httpSysPortal = httpCreate(baseURLPortal);
export const httpCommonBlob = httpCreateBlob(baseURLCommon);

export const httpReport = httpCreate(baseURLReport)
