import { http } from "./request";
import util from "@public/libs/js/util";

const k = '/jxLessonAudit'
const post = (u, data) => {
    let _data = util.requestDataTrim('POST', data)
    return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
    let _data = util.requestDataTrim('GET', data)
    return http.get(`${k}${u}`, _data);
};

export const jxLessonAudit = {
    // 服务内容提交审批结果
    serviceSubmitAudit(params) {
        return post('/serviceSubmitAudit', params)
    },

    teachingSubmitAudit(params) {
        return post('/teachingSubmitAudit', params)
    },
    //审批
    audit(params) {
        return post('/audit', params)
    },
    //排课列表：服务内容查看弹框的编辑操作
    updateService(params) {
        return post('/updateService', params)
    },
    getTeaching(params) {
        return get('/getTeaching', { params })
    },
    //审批日志
    listAuditLog(params) {
        return get('/listAuditLog', { params })
    },
    //获取服务内容
    getService(params) {
        return get('/getService', { params })
    },

    updateTeaching(params) {
        return post('/updateTeaching', params)
    },
}
