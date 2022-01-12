import { http,httpSignBlob} from "./request";
const k = '/htPresentApply'
const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

export const htPresentApply = {
    htPresentApplyExport(params) {
        return httpSignBlob.post(`${k}/export`,params)
    },
    exportFile(params) {
        return httpSignBlob.post(`${k}/exportFile`,params)
    },
    exportSelectedFile(params) {
        return httpSignBlob.post(`${k}/exportSelectedFile`,params)
    },
    listPage(params) {
        return post('/listPage', params)
    },
    getShowTitle(params) {
        return get('/getShowTitle', {params})
    },
    clearShowField(params) {
        return get('/clearShowField', {params})
    },
    //更新班课列表显示的字段
    updateShowTitle(pageIdentifier ,params){
        return post('/updateShowTitle?pageIdentifier=' + pageIdentifier, params);
    },
    //保存申请
    save(params) {
        return post('/save', params)
    },
    //赠课清零
    clear(params) {
        return get('/clear', {params})
    },
    //赠课业务详情
    form(params) {
        return get('/form', {params})
    },

}