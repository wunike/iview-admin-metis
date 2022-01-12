import {
	http,
	baseURL,
	httpSignBlob,
} from "./request";
const k = '/htValidApply'
const post = (u, data) => {
	return http.post(`${k}${u}`, data);
};

const get = (u, data) => {
	return http.get(`${k}${u}`, data);
};

export const htValidApply = {
	//合同延期次数列表
	listPage(params) {
		return post('/listPage', params)
	},
	//合同延期详情接口
	form(params) {
		return get('/form', { params })
	},
	//合同延期保存接口
	save(params) {
		return post('/save', params)
	},
	// 更新合同延期列表显示的字段
	updateShowTitle(pageIdentifier, params) {
		return post('/updateShowTitle?pageIdentifier=htValidApply', params);
	},
	// 获取合同延期列表设置显示列显示的字段
	getShowTitle(params) {
		return get('/getShowTitle', { params })
	},
	clearShowField(params) {
		return get('/clearShowField', { params })
	},
	// 导出全部
	exportFile(params) {
		return httpSignBlob.post('/htValidApply/exportFile', params)
	},
	// 导出所选
	exportSelectedFile(params) {
		return httpSignBlob.post('/htValidApply/exportSelectedFile', params)
	},
	htValidApplyExport(params) {
		return httpSignBlob.post('/htValidApply/export', params)
	}
}
