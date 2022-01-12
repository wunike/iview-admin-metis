import { http, httpJWBlob } from "./request";
import util from "@public/libs/js/util";

const k = '/jxPoints'
const post = (u, data) => {
    let _data = util.requestDataTrim('POST', data)
    return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
    let _data = util.requestDataTrim('GET', data)
    return http.get(`${k}${u}`, _data);
};

export const jxPoints = {
    //积分流水VO列表
    listPage(params) {
        return post('/listPage', params)
    },
    //积分流水_导出所有
    exportData(params) {
        return httpJWBlob.post(`${k}/exportData`, params)
    },
    //积分流水_导出所选
    exportSelected(params) {
        return httpJWBlob.post(`${k}/exportSelected`, params)
    },
    //积分流水_查询条件_操作人
    listCreatBysByOfficeId(params) {
        return get('/listCreatBysByOfficeId', { params })
    },
}
