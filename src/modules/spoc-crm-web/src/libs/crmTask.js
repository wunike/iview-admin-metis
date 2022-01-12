import {
    http,
    baseURL,
    httpCrmBlob
} from "./request";
const k = '/crmTask'
const post = (u, data) => {
    return http.post(`${k}${u}`, data);
};
const get = (u, data) => {
    return http.get(`${k}${u}`, data);
};
export const crmTask ={
    // 获取显示的字段
    getShowTitle(params) {
        return get('/getShowTitle', { params })
    },
    // 恢复显示的字段
    clearShowField(params) {
        return get('/clearShowField', { params })
    },
    //更新动态显示列
    updateShowTitle(pageIdentifier ,params){
        return post('/updateShowTitle?pageIdentifier=' + pageIdentifier, params);
    },
    //列表
    listPage(params) {
        return post('/listPage', params)
    },
    //列表
    statistics(params) {
        return post('/statistics', params)
    },
    exportFile(params) {
        return httpCrmBlob.post('/crmTask/exportFile',params);
    },
    export(params) {
        return httpCrmBlob.post('/crmTask/export',params);
    },
    // exportSelectedFile(params) {
    //     return httpCrmBlob.post('/crmTask/exportSelectedFile',params);
    // },
}