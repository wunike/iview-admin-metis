import { http } from "./request";
import util from "@public/libs/js/util";

const k = '/jwApplyLesson'
const post = (u, data) => {
	let _data = util.requestDataTrim('POST', data)
	return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
	let _data = util.requestDataTrim('GET', data)
	return http.get(`${k}${u}`, _data);
};

export const jwApplyLesson = {
	//删除排课申请
	delete(params) {
		return post('/delete', params)
	},
	// 根据Id删除排课申请
	deleteById(params) {
		return get('/deleteById', { params })
	},
	// 编辑或排课申请详情
	form(params) {
		return get('/form', { params })
	},
	// 排课申请VO列表
	listPage(params) {
		return get('/listPage', { params })
	},
	//保存排课申请
	save(params) {
		return post('/save', params)
	},
}
