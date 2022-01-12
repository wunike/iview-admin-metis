import { http, httpJWBlob, baseURL } from "./request";
import util from "@public/libs/js/util";

const k = '/jxChatGroupMessage'
const post = (u, data) => {
	let _data = util.requestDataTrim('POST', data)
	return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
	let _data = util.requestDataTrim('GET', data)
	return http.get(`${k}${u}`, _data);
};

export const jxChatGroupMessage = {

	//校区消息VO列表
	save(params) {
		return post('/save', params)
	},
	listPage(params) {
		return post(`/listPage?pageNo=${params.pageNo}&pageSize=10`, params)
	},
	//我的未读消息数量
	// unReadCountByUser(params) {
	//   return get('/unReadCountByUser', {params})
	// },

}
