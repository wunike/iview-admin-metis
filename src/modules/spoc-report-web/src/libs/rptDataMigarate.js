import {http} from "./request";

const k = '/rptDataMigarate'
const rpt = '/rpt'

const post = (u, data) => {
    return http.post(`${rpt}${k}${u}`, data);
};

const get = (u, data) => {
    return http.get(`${rpt}${k}${u}`, data);
};

export const rptDataMigarate = {
    initTask(params) {
        return post('/initTask', params)
    },
    listPage(params) {
        return post('/listPage', params)
    },
    getLastMigarateDate(params) {
        return get('/getLastMigarateDate', {params})
    },
    //执行数据迁移任务
    updateStatus(params) {
        return get('/updateStatus', {params})
    },
    //清除本轮迁移临时数据
    cleanImportData(params) {
        return post('/cleanImportData', params)
    },
    //清除本轮迁移正式数据
    cleanProductData(params) {
        return post('/cleanProductData', params)
    },
    //获取数据迁移进度
    progress(params) {
        return get('/progress', {params})
    },
    //清除并继续
    cleanAndInit(params) {
        return post('/cleanAndInit', params)
    },
    //初始化数据迁移
    initMigirate(params) {
        return get('/initMigirate', {params})
    },
    //执行数据迁移任务
    migarate(params) {
        return post('/migarate', params)
    },
}