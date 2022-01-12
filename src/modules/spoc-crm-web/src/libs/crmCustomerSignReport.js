import {
    http, httpCrmBlob
} from "./request";
const k = '/crmCustomerSignReport'
const post = (u, data) => {
    return http.post(`${k}${u}`, data);
};
const get = (u, data) => {
    return http.get(`${k}${u}`, data);
};
export const crmCustomerSignReport ={
    listDetailPage(params){
        return post('/listDetailPage', params);
    },
    getShowTitle(params){
        return get('/getShowTitle', {params});
    },
    updateShowTitle(params){
        return post('/updateShowTitle', params);
    },
    listTotalPage(params){
        return post('/listTotalPage', params);
    },
    exportDetailFile(params){
        return httpCrmBlob.post(`${k}/exportDetailFile`, params);
    },
    exportTotalFile(params){
        return httpCrmBlob.post(`${k}/exportTotalFile`, params);
    },
}
