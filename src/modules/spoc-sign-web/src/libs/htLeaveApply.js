import {
	http,
	baseURL,
	httpSignBlob,
} from "./request";
const k = '/htLeaveApply'
const post = (u, data) => {
	return http.post(`${k}${u}`, data);
};

const get = (u, data) => {
	return http.get(`${k}${u}`, data);
};

export const htLeaveApply = {
	/* //主合同列表
	list(params){
		return post('/list',params)
	}, */
	//请假次数列表
	listPage(params) {
		return post('/listPage', params)
	},
	//请假详情接口
	form(params) {
		return get('/form', { params })
	},
	//请假保存接口
	save(params) {
		return post('/save', params)
	},
	// 更新请假列表显示的字段
	updateShowTitle(pageIdentifier, params) {
		return post('/updateShowTitle?pageIdentifier=htLeaveApply', params);
	},
	// 获取请假列表设置显示列显示的字段
	getShowTitle(params) {
		return get('/getShowTitle', { params })
	},
	clearShowField(params) {
		return get('/clearShowField', { params })
	},
	// 导出全部
	exportFile(params) {
		return httpSignBlob.post('/htLeaveApply/exportFile', params)
	},
	// 导出所选
	exportSelectedFile(params) {
		return httpSignBlob.post('/htLeaveApply/exportSelectedFile', params)
	},
	htLeaveApplyExport(params) {
		return httpSignBlob.post('/htLeaveApply/export', params)
	}
}
