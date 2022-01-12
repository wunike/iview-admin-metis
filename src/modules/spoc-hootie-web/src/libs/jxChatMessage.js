import { http } from "./request";
import util from "@public/libs/js/util";

const k = '/jxChatMessage'
const post = (u, data) => {
	let _data = util.requestDataTrim('POST', data)
	return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
	let _data = util.requestDataTrim('GET', data)
	return http.get(`${k}${u}`, _data);
};

export const jxChatMessage = {

	//校区消息VO列表
	listByXq(params) {
		return post('/listByXq', params)
	},
	//班级消息VO列表
	listByClass(params) {
		return post('/listByClass', params)
	},
	//学员消息VO列表
	listByStudent(params) {
		return post('/listByStudent', params)
	},
	//最近联系人消息VO列表
	listByLaster(params) {
		return post(`/listByLaster?pageNo=${params.pageNo}&pageSize=10`, params)
	},
	//我的未读消息数量
	unReadCountByUser(params) {
		return get('/unReadCountByUser', { params })
	},
	listByTeacher(params) {
		return post('/listByTeacher', params)
	},
	listTeacherByLaster(params) {
		return post('/listTeacherByLaster', params)
	},
	findHistory(params) {
		return post('/findHistory', params)
	},

}
