import {
    http,
    baseURL,
} from "./request";
const k = '/crmTerritory'
const post = (u, data) => {
    return http.post(`${k}${u}`, data);
};
const get = (u, data) => {
    return http.get(`${k}${u}`, data);
};
export const crmTerritory ={
    // 获取显示的字段
    getShowTitle(params) {
        return get('/getShowTitle', { params })
    },
    //更新动态显示列
    updateShowTitle(pageIdentifier ,params){
        return post('/updateShowTitle?pageIdentifier=' + pageIdentifier, params);
    },
    //更新动态显示列
    list(params){
        return post('/list', params);
    },
}