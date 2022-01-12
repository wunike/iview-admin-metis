import { http, baseURL, httpJWBlob } from "./request";
import util from "@public/libs/js/util";

const k = '/jwCourseConsumeLog'
const post = (u, data) => {
	let _data = util.requestDataTrim('POST', data)
	return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
	let _data = util.requestDataTrim('GET', data)
	return http.get(`${k}${u}`, _data);
};

export const jwCourseConsumeLog = {
	listPageCancelDeducted(params) {
		return post('/listPageCancelDeducted', params)
	},
	statisticsDeducted(params) {
		return post('/statisticsDeducted', params)
	},
	listPageDeducted(params) {
		return post('/listPageDeducted', params)
	},
	// 获取设置显示列显示的字段
	getShowTitle(params) {
		return get('/getShowTitle', { params })
	},
	clearShowField(params) {
		return get('/clearShowField', { params })
	},
	// 更新列表显示的字段
	updateShowTitle(pageIdentifier, params) {
		return post('/updateShowTitle?pageIdentifier=' + pageIdentifier, params)
	},
	export(params) {
		return httpJWBlob.post(`${k}/export`, params)
	},
	exportCancel(params) {
		return httpJWBlob.post(`${k}/exportCancel`, params)
	},
}
