import { http, baseURL } from "./request";
import util from "@public/libs/js/util";

const k = '/jwServicePerformance'
const post = (u, data) => {
	let _data = util.requestDataTrim('POST', data)
	return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
	let _data = util.requestDataTrim('GET', data)
	return http.get(`${k}${u}`, _data);
};

export const jwServicePerformance = {
	// ach(params) {
	// 	return post('/ach', params)
	// },
	consumeLessonData(params, config={}) {
		return get('/consumeLessonData', Object.assign({ params },config))
	},
	attendanceCountData(params, config={}) {
		return get('/attendanceCountData', Object.assign({ params },config))
	},
}
