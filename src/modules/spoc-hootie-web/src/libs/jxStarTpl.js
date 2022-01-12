import { http, httpCrmBlob, baseURL } from "./request";
import util from "@public/libs/js/util";

const k = '/jxStarTpl'
const post = (u, data) => {
    let _data = util.requestDataTrim('POST', data)
    return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
    let _data = util.requestDataTrim('GET', data)
    return http.get(`${k}${u}`, _data);
};

export const jxStarTpl = {
    //删除课堂反馈模板
    delete(params) {
        return post('/delete', params)
    },
    // 根据Id删除课堂反馈模板
    deleteById(params) {
        return get('/deleteById', { params })
    },
    // 编辑或课堂反馈模板详情
    form(params) {
        return get('/form', { params })
    },
    // 课堂反馈模板VO列表
    list(params) {
        return post('/list', params)
    },
    //保存课堂反馈模板
    save(params) {
        return post('/save', params)
    },
    //模板移动排序
    changeTplSort(params) {
        return post('/changeTplSort', params)
    },
    // 导入
    importFile(params) {
        return `${baseURL}${k}/importFile`
    },
    //不覆盖
    unCover(params) {
        return post('/unCover', params)
    },
    //覆盖
    cover(params) {
        return post('/cover', params)
    },
    // 下载导入错误报告EXCEL
    downReport(params) {
        return `${baseURL}${k}/downReport`
    },
    // 下载模板数据EXCEL导入模板
    downloadTemplate(params) {
        return `${baseURL}${k}/import/template`
    },
}
