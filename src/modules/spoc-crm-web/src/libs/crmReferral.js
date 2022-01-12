import { http, httpCrmBlob } from "./request";
const k = '/crmReferral'
const post = (u, data) => {
	return http.post(`${k}${u}`, data);
};

const get = (u, data) => {
	return http.get(`${k}${u}`, data);
};
export const crmReferral = {
	  listReferralPage(params) {
		  return post('/listReferralPage', params)
    },
    listCreatersPage(params) {
      return post('/listCreatersPage', params)
    },
    getShowTitle(params) {
		  return get('/getShowTitle', { params })
    },
    clearShowField(params) {
		  return get('/clearShowField', { params })
    },
    updateShowTitle(pageIdentifier ,params){
        return post('/updateShowTitle?pageIdentifier=' + pageIdentifier, params);
    },
    audit(params) {
		  return get('/audit', { params })
    },
    reward(params) {
		  return get('/reward', { params })
    },
    //转中心导出
    crmReferralExport(params) {
      return httpCrmBlob.post(`${k}/export`, params)
    },
}