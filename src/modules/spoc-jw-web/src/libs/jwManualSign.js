import { http, httpJWBlob } from "./request";
import util from "@public/libs/js/util";

const k = '/jwManualSign'
const post = (u, data) => {
	let _data = util.requestDataTrim('POST', data)
	return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
	let _data = util.requestDataTrim('GET', data)
	return http.get(`${k}${u}`, _data);
};

export const jwManualSign = {
	// 签到列表复制文
	listManualSign(params) {
		return post('/listManualSign', params)
	},
	// 手工签到详情
	form(params) {
		return get('/form', { params })
	},
	// 电子签到
	electronicSign(params) {
		return get('/electronicSign', { params })
	},
	// 获取手工签到考勤列表设置显示列显示的字段
	getShowTitle(params) {
		return get('/getShowTitle', { params })
	},
	// 更新手工签到考勤列表显示的字段
	updateShowTitle(pageIdentifier, params) {
		return post('/updateShowTitle?pageIdentifier=' + pageIdentifier, params)
	},
	// 手工签到详情考勤列表
	listPage(params) {
		return post('/listPage', params)
	},
	// 根据校区id获取班课
	getClassCourseByOfficeId(params) {
		return get('/getClassCourseByOfficeId', { params })
	},
	// 手工签到详情考勤列表-- 删除
	deleteLessonAttendance(params) {
		return post('/deleteLessonAttendance', params)
	},
	getClassCourseByOfficeIdAndName(params) {
		return get('/getClassCourseByOfficeIdAndName', { params })
	},
	export(params) {
		return httpJWBlob.post('/jwManualSign/export', params)
	},
}
