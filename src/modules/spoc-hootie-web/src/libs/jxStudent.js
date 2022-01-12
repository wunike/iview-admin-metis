import { http, baseURL } from "./request";
import util from "@public/libs/js/util";

const k = '/jxStudent'
const post = (u, data) => {
	let _data = util.requestDataTrim('POST', data)
	return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
	let _data = util.requestDataTrim('GET', data)
	return http.get(`${k}${u}`, _data);
};
export const jxStudent = {
	//学员列表VO列表
	listPage(params) {
		return post('/listPage', params)
	},
	//修改学员账号信息
	saveBaseInfo(params) {
		return post('/saveBaseInfo', params)
	},
	// //更新学员列表显示的字段
	updateShowTitle(pageIdentifier, params) {
		return post('/updateShowTitle?pageIdentifier=jxStudent', params);
	},
	// 获取学员列表设置显示列显示的字段
	getShowTitle(params) {
		return get('/getShowTitle', { params })
	},
	clearShowField(params) {
		return get('/clearShowField', { params })
	},
	// 下载导入模板
	template(params) {
		return `${baseURL}${k}/download/template`
	},
	// 教室批量导入
	import(params) {
		return `${baseURL}${k}/import`
	},
	// 下载错误报告
	downReport(params) {
		return `${baseURL}${k}/downReport`
	},
	// 根据校区获取学员列表
	listByOfficeId(params) {
		return get('/listByOfficeId', { params })
	},
	form(params) {
		return get('/form', { params })
	},
	// 学员姓名模糊搜索
	listIdNameByName(params) {
		return get('/listIdNameByName', { params })
	},
	saveStus(params, isAdd) {
		return post('/saveStus?isAdd=' + isAdd, params)
	},
	unCover(params) {
		return post('/unCover', params)
	},
	updateClassAvatar(params) {
		return post('/updateClassAvatar', params)
	},
}
