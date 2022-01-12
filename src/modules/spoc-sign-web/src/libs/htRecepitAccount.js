import { http } from "./request";
const k = '/htRecepitAccount'
const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

export const htRecepitAccount = {
	formByOfficeId(params) {
		return get('/formByOfficeId', {params})
	},
	save(params) {
		return post('/save', params)
	},
}
