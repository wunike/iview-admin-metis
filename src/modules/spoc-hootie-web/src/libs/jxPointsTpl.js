import { http, httpJWBlob, baseURL } from "./request";
import util from "@public/libs/js/util";

const k = '/jxPointsTpl'
const post = (u, data) => {
	let _data = util.requestDataTrim('POST', data)
	return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
	let _data = util.requestDataTrim('GET', data)
	return http.get(`${k}${u}`, _data);
};

export const jxPointsTpl = {
	//评分模板VO列表
	listPage(params) {
		return post('/listPage', params)
	},
	//管辖校区VO列表
	findOffice(params) {
		return get('/findOffice', { params })
	},
	//判断评分操作按钮是否可用的
	checkLoginSecurity(params) {
		return get('/checkLoginSecurity', { params })
	},
	// 根据Id删除评分模板
	deleteById(params) {
		return get('/deleteById', { params })
	},
	// 更改评分模板状态
	updateStatus(params) {
		return get('/updateStatus', { params })
	},
	//保存/编辑评分模板
	save(params) {
		return post('/save', params)
	},
	// 获取评分模板详情成功
	form(params) {
		return get('/form', { params })
	},
	// 导出部分和导出全部的公用接口
	exportFile(params) {
		return httpJWBlob.post('/jxPointsTpl/export', params)
	},
	//根据评分模板类型查询评分模板
	findBySubType(params) {
		return get('/findBySubType', { params })
	},
}
