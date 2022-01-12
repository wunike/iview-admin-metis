import { http, httpCrmBlob, baseURL } from "./request";
const k = '/crmPlan'
const post = (u, data) => {
	return http.post(`${k}${u}`, data);
};

const get = (u, data) => {
	return http.get(`${k}${u}`, data);
};
export const crmPlan = {
	// listTreeData(params) {
	// 	return get('/listTreeData', { params })
 //    },
    getNoPlanList(params) {
		return post('/getNoPlanList', params)
    },
	list(params) {
		return post('/list', params)
    },
	save(params) {
		return post('/save', params)
    },
    batchSave(params) {
		return post('/batchSave', params)
    },
}
