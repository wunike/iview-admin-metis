import {
    http,
    baseURL,
} from "./request";
const k = '/crmCustomerStatus'
const post = (u, data) => {
    return http.post(`${k}${u}`, data);
};

const get = (u, data) => {
    return http.get(`${k}${u}`, data);
};
export const crmCustomerStatus = {

    //分配资源
    assign(params){
        return post('/assign', params )
    },
    //更新资源有效性
    modifyEffective(params) {
        return post('/modifyEffective', params)
    },
    listRoleUser(params) {
        return get('/listRoleUser', {params})
    },

}
