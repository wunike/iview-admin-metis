import {
	http,
	baseURL,
	httpSignBlob,
} from "./request";
const k = '/htConfirmApply'
const post = (u, data) => {
	return http.post(`${k}${u}`, data);
};

const get = (u, data) => {
	return http.get(`${k}${u}`, data);
};

export const htConfirmApply = {
	//过期次数列表
	listPage(params) {
		return post('/listPage', params)
	},
	//过期详情接口
	form(params) {
		return get('/form', { params })
	},
	// 确认过期收入
	confirm(params) {
		return get('/confirm', { params })
	},
	// //过期保存接口
	// save(params){
	// 	return post('/save',params)
	// },
	// 更新过期列表显示的字段
	updateShowTitle(pageIdentifier, params) {
		return post('/updateShowTitle?pageIdentifier=htConfirmApply', params);
	},
	// 获取过期列表设置显示列显示的字段
	getShowTitle(params) {
		return get('/getShowTitle', { params })
	},
	clearShowField(params) {
		return get('/clearShowField', { params })
	},
	// 导出
	export(params) {
		return httpSignBlob.post('/htConfirmApply/export', params)
	},
	// 导出全部
	exportFile(params) {
		return httpSignBlob.post('/htConfirmApply/exportFile', params)
	},
	// 导出所选
	exportSelectedFile(params) {
		return httpSignBlob.post('/htConfirmApply/exportSelectedFile', params)
	},
	// 确认过期收入
	deleteConfirm(params) {
		return get('/deleteConfirm', { params })
	},
}
