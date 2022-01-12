import { http } from "./request";
const k = '/salerPerformance'
const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

const post = (u,data,config)=>{
    return http.post(`${k}${u}`,data, config);
};

export const salerPerformance = {
	// spoc-contract/a/ws/contract/salerPerformance/data 
	// ruleList(params) {
	// 	return get('/list', {params})
	// },
	// spoc-contract/a/ws/contract/salerPerformance/data 
	data(params, config={}) {
		return post('/data', params, config)
	},
}
