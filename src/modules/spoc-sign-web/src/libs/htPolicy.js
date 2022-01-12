import { http } from "./request";
const k = '/htPolicy'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const htPolicy = {
	//优惠政策列表
	list(params){
		return get('/list',{params})
	},
	listData(params){
		return get('/listData',{params})
	},
	save(data){
		return post('/save',data)
	},
	delete(id){
		return post('/delete',{id})
	},
	deleteItem(id){
		return post('/deleteItem',{id})
	},
	saveItem(data){
		return post('/saveItem',data)
	},
	updateName(data){
		return post('/updateName',data);
	},
	updateProtocal(data){
		return post('/updateProtocal',data);
	},
	listYhzc(data){
		return post('/listYhzc',data);
	},
}
