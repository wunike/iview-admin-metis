import {http, httpReportBlob} from "./request";

const k = '/rptCentralArchive'
const rpt = '/rpt'

const post = (u, data) => {
    return http.post(`${rpt}${k}${u}`, data);
};

const get = (u, data) => {
    return http.get(`${rpt}${k}${u}`, data);
};

export const rptCentralArchive = {
    // 中心业绩明细
    listPageCentralDetail(params) {
		return post('/listPageCentralDetail', params)
    },
    // 中心业绩汇总
    listPageCentralSummary(params) {
		return post('/listPageCentralSummary', params)
    },
    // getShowTitle(params) {
    //     return get('/getShowTitle', {params})
    // },
    //导出
    export(params) {
        return httpReportBlob.post(`${rpt}${k}/export`, params)
    },
}
