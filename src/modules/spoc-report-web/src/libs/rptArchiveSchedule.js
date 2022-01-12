import {httpReportBlob} from "./request";
import {httpCommonSelf} from "./common";

const k = '/comArchiveSchedule'
// const rpt = '/rpt'
const rpt = ''

const post = (u, data) => {
    return httpCommonSelf.post(`${rpt}${k}${u}`, data);
};

const get = (u, data) => {
    return httpCommonSelf.get(`${rpt}${k}${u}`, data);
};

export const rptArchiveSchedule = {
    findRecentlyArchiveDate(params) {
        // 获取校区最近归档时间
		return post('/findRecentlyArchiveDate', params)
    },
    manualArchive(params) {
        // 手动月结
		return post('/manualArchive', params)
    },
    listPage(params) {
        // 月结列表
		return post('/listPage', params)
    },
    liftArchive(params) {
        // 解除月结
        return get('/liftArchive', {params})
    },
    findListByYearMonth(params) {
        // 获取校区下拉
        return get('/findListByYearMonth', {params})
    },
    getShowTitle(params) {
        // 获取显示的字段
        return get('/getShowTitle', {params})
    },
    findListFailDate(params) {
        // 获取月结失败时间列表
        return post('/findListFailDate', params)
    },
    //导出
    // export(params) {
    //     return httpReportBlob.post(`${rpt}${k}/export`, params)
    // },
}