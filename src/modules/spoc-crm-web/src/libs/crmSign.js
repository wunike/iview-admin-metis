import {
    http,
    baseURL,
    httpCrmBlob
} from "./request";
const k = '/crmSign'
const post = (u, data) => {
    return http.post(`${k}${u}`, data);
};
const get = (u, data) => {
    return http.get(`${k}${u}`, data);
};
export const crmSign ={
    // 获取显示的字段
    // getShowTitle(params) {
    //     return get('/getShowTitle', { params })
    // },
    //保存
    save(params){
        return post('/save', params);
    },
    listPage(params){
        return post('/listPage', params);
    },
    deleteById(params){
        return get('/deleteById', {params});
    },
}
