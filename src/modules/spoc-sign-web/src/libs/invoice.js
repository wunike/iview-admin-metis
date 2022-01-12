import { http, baseURL, httpSignBlob } from "./request";
const k = '/invoice'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const invoice = {
	// 保存发票 /a/ws/contract/invoice/save
	save(params){
		return post('/save',params)
	},
	// /a/ws/contract/invoice/findByName?title=1
	findByName(params){
		return get('/findByName',{params})
	},
	// /contract/invoice/form?id=333e4b553d9446b498fc4e6f2ba29914
	form(params){
		return get('/form',{params})
	},
	// 导出历史开票 http://localhost:8080/a/ws/contract/invoice/exportInovice?startTime=2018-12-24&endTime=2018-12-26
	exportInvoiceHistory(params){
		return (`${baseURL}invoice/exportInovice?startTime=${params.startTime}&endTime=${params.endTime}&name=${params.name}&isArchived=${params.isArchived}&status=${params.status}&orderBy=${params.orderBy}&companyIds=${params.companyIds}&from=${params.from}`);
	},
	//导出开票历史
	exportInovice(params) {
		// return(
		// 	`${baseURL}${k}/exportInovice?startTime=${obj.startTime}&endTime=${obj.endTime}`
		// )
		return httpSignBlob.get(`${k}/exportInovice`, {params})
	},
}
