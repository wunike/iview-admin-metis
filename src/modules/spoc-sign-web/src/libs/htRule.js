import { http } from "./request";

const k = '/htRule'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const htRule = {
	list(params){
		return get('/list',{params})
	},
	save(data){
		return post('/save',data)
	},
}