import { http } from "./request";
const k = '/htAuditRule'
const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

export const htAuditRule = {
	// spoc-contract/a/ws/contract/htAuditRule/list g规则列表
	ruleList(params) {
		return get('/list', {params})
	},
	// /spoc-contract/a/ws/contract/htAuditRule/delete  删除规则
	deleteAuditRule(params) {
		return post('/delete', params)
	},
	// 未设置分公司的列表 /spoc-contract/a/ws/contract/htAuditRule/unSettingCompanyList
	unSettingCompanyList(params) {
		return get('/unSettingCompanyList', {params})
	},

	saveAuditRule(params) {
		return post('/save', params)
	},
	formAuditRule(params) {
		return get('/form', {params})
	},

}
