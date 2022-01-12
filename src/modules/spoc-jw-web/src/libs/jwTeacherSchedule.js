import { http, httpJWBlob } from "./request";
import util from "@public/libs/js/util";

const k = '/jwTeacherSchedule'
const post = (u, data) => {
	let _data = util.requestDataTrim('POST', data)
	return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
	let _data = util.requestDataTrim('GET', data)
	return http.get(`${k}${u}`, _data);
};

export const jwTeacherSchedule = {
	teacherType(params) {
		return get('/teacherType', { params })
	},
	listTeacherSchedule(params) {
		return post('/listTeacherSchedule', params)
	},
	// 教师课表导出
	exportTeacherSchedule(params) {
		return httpJWBlob.post('/jwTeacherSchedule/exportTeacherSchedule', params)
		// return get('/exportTeacherSchedule',{params})
	},
}
