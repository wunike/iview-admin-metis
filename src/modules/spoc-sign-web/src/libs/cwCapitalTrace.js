import {
	httpCommon,
	httpCommonBlob
} from "./request";
const k = '/cwCapitalTrace'
const post = (u, data) => {
	return httpCommon.post(`${k}${u}`, data);
};

const get = (u, data) => {
	return httpCommon.get(`${k}${u}`, data);
};

export const cwCapitalTrace = {
	// 资金流水VO列表
	listPage(params) {
		return post('/listPage', params)
	},
	listStuPage(params) {
		return post('/listStuPage', params)
	},
	// 更新请假列表显示的字段
	updateShowTitle(pageIdentifier, params) {
		return post('/updateShowTitle?pageIdentifier=' + pageIdentifier, params);
	},
	// 获取请假列表设置显示列显示的字段
	getShowTitle(params) {
		return get('/getShowTitle', { params })
	},
	clearShowField(params) {
		return get('/clearShowField', { params })
	},
	// 导出
	export(params) {
		return httpCommonBlob.post('/cwCapitalTrace/export', params)
	},
	// 导出全部
	exportFile(params) {
		return httpCommonBlob.post('/cwCapitalTrace/exportFile', params)
	},
	// 导出所选
	exportSelectedFile(params) {
		return httpCommonBlob.post('/cwCapitalTrace/exportSelectedFile', params)
	}
}