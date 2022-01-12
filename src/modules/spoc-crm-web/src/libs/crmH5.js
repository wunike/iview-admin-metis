import {
	http,
	baseURL,
	httpCrmBlob,
} from "./request";
const k = '/crmH5'
const post = (u, data) => {
	return http.post(`${k}${u}`, data);
};

const get = (u, data) => {
	return http.get(`${k}${u}`, data);
};
export const crmH5 = {
	//编辑或推广页招生详情
	detail(params){
		return get('/detail',{params})
	},
	// 报名资源列表
	findCustomer(params){
		return post('/findCustomer',params)
	},
	// 报名会员Id
	findMember(params){
		return post('/findMember',params)
	},
}
