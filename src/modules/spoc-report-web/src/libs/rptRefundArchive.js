import {http, httpReportBlob} from "./request";

const k = '/rptRefundArchive'
const rpt = '/rpt'

const post = (u, data) => {
    return http.post(`${rpt}${k}${u}`, data);
};

const get = (u, data) => {
    return http.get(`${rpt}${k}${u}`, data);
};

export const rptRefundArchive = {
    listRefundSummary(params) {
        // 校区退费汇总
		return post('/listRefundSummary', params)
    },
    listRefundOwnerSummary(params) {
        // 责任人退费汇总
		return post('/listRefundOwnerSummary', params)
    },
    listPageRefundOwnerDetail(params) {
        // 责任人退费明细
		return post('/listPageRefundOwnerDetail', params)
    },
    listPageRefundDetail(params) {
        // 学员退费明细
		return post('/listPageRefundDetail', params)
    },
    getShowTitle(params) {
        return get('/getShowTitle', {params})
    },
    listApplyer(params) {
        return get('/listApplyer', {params})
    },
    //导出
    export(params) {
        return httpReportBlob.post(`${rpt}${k}/export`, params)
    },
}