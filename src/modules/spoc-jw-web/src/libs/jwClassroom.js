import { httpC,http, httpJWBlob,httpJWBlobC } from "./request";
import util from "@public/libs/js/util";

const k = '/comClassroom'
const k1 = '/jwClassroom'

const post = (u, data) => {
	let _data = util.requestDataTrim('POST', data)
	return httpC.post(`${k}${u}`, _data);
};

const get = (u, data) => {
	let _data = util.requestDataTrim('GET', data)
	return httpC.get(`${k}${u}`, _data);
};
const post1 = (u, data) => {
	let _data = util.requestDataTrim('POST', data)
	return http.post(`${k1}${u}`, _data);
};

const get1 = (u, data) => {
	let _data = util.requestDataTrim('GET', data)
	return http.get(`${k1}${u}`, _data);
};

export const jwClassroom = {
	// 根据校区编号获取教室
	listClassroomByOfficeId(params) {
		return get('/listClassroomByOfficeId', { params })
	},
	// 教室课表
	listClassroomSchedule(params) {
		return post1('/listClassroomSchedule', params)
	},
	//教室列表
	listPage(params) {
		return get('/listByOfficeId', { params })
	},
	exportClassroomSchedule(params) {
		return httpJWBlob.post('/jwClassroom/exportClassroomSchedule', params)
		// return get('/exportClassroomSchedule',{params})
	},
}
