import { http } from "./request";
const k = '/htItem'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};


export const htItem = {
	// /spoc-contract/a/ws/contract/htItem/save
	saveForm(data){
		return post('/save',data)
	},
	// /spoc-contract/a/ws/contract/htItem/uploadIsUse
	uploadIsUse(data){
		return post('/uploadIsUse',data)
    },
	listPage(params){
		return get('/listPage',{params})
	},
	list(params){
		return get('/list',{params})
	},
	form(params){
		return get('/form',{params})
	},
	listGroupSub(params){
		return get('/listGroupSub',{params})
	},
	delete(data){
		return post('/delete',data)
	},
	save(data){
		return post('/save',data)
	},
	uploadObsolete(data){
		return post('/uploadObsolete',data)
	},

}
