import {
    http,
    baseURL,
} from "./request";
const k = '/crmCustomerStatistics'
const post = (u, data) => {
    return http.post(`${k}${u}`, data);
};

const get = (u, data) => {
    return http.get(`${k}${u}`, data);
};
export const crmCustomerStatistics = {
    //我的业绩统计
    myPerformance(params){
        return post('/myPerformance', params)
    },
    countStatisticalTerms(params){
        return post('/countStatisticalTerms', params)
    },
}
