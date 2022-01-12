import { http, httpSignBlob } from "./request";
const k = '/htChangeApply'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const htChangeApply = {
	//合同改包申请VO列表
	listPage(params){
		return post('/listPage',params)
	},
	//更新显示列中,显示的字段
	updateShowTitle(pageIdentifier,params){
		return post(`/updateShowTitle?pageIdentifier=${pageIdentifier}`,params)
	},
	//获取显示列中,显示的字段
	getShowTitle(params){
		return get('/getShowTitle',{params})
	},
	clearShowField(params){
		return get('/clearShowField',{params})
	},
	save(params){
		return post('/save',params)
	},
    exportFile(params){
		return httpSignBlob.post(`${k}/exportFile`,params)
	},
    form(params){
		return get('/form',{params})
	},
    forciblyReject(params){
		return get('/forciblyReject',{params})
	},
}
