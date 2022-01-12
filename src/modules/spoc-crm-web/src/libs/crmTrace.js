import { http, httpCrmBlob, baseURL } from "./request";
const k = '/crmTrace'
const post = (u, data) => {
	return http.post(`${k}${u}`, data);
};

const get = (u, data) => {
	return http.get(`${k}${u}`, data);
};
export const crmTrace = {
	listTreeData(params) {
		return get('/listTreeData', { params })
    },
	listTypeCount(params) {
		return get('/listTypeCount', { params })
    },
	save(params) {
		return post('/save', params)
    },
    followRecordlistPage(params) {
        return post('/followRecordlistPage', params)
    },
    updateLoglistPage(params) {
        return post('/updateLoglistPage', params)
    },
    exportData(params) {
        return httpCrmBlob.post('/crmTrace/exportData',params);
    },
    count(params) {
        return post('/count', params )
    },
    downloadTemplate(params) {
        // return `${baseURL}${k}/downloadTemplate`
        return httpCrmBlob.get('/crmTrace/downloadTemplate',{params});
    },
    downReport(params) {
        // return `${baseURL}${k}/downReport`
        return httpCrmBlob.get('/crmTrace/downReport',{params});
    },
    importFile(params) {
        return `${baseURL}${k}/importFile`
    },
}
