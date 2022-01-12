import { http, baseURL, httpJWBlob } from "./request";
import util from "@public/libs/js/util";

const k = '/jxCourseTpl'
const post = (u, data) => {
    let _data = util.requestDataTrim('POST', data)
    return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
    let _data = util.requestDataTrim('GET', data)
    return http.get(`${k}${u}`, _data);
};

export const jxCourseTpl = {
    // 根据Id删除推送模板
    deleteById(params) {
        return get('/deleteById', { params })
    },
    // 下载导入错误报告EXCEL
    downReport(params) {
        return `${baseURL}${k}/downReport`
    },
    //导出全部数据
    export(params) {
        return httpJWBlob.post(`${k}/export`, params)
    },
    //导出所选数据
    exportSelected(params) {
        return httpJWBlob.post(`${k}/exportSelected`, params)
    },
    // 编辑或推送模板详情
    form(params) {
        return get('/form', { params })
    },
    // 导入模板数据EXCEL
    import(params) {
        return `${baseURL}${k}/import`
    },
    // 下载模板数据EXCEL导入模板
    downloadTemplate(params) {
        return `${baseURL}${k}/import/template`
    },
    // 推送模板VO列表
    listPage(params) {
        return post('/listPage', params)
    },
    //保存推送模板
    save(params) {
        return post('/save', params)
    },
    //修改模板状态
    saveStauts(params) {
        return post('/saveStauts', params)
    },

    listSendPage(params) {
        return post('/listSendPage', params)
    },
    //验证重复
    rptValidate(params) {
        return post('/rptValidate', params)
    },
    //不覆盖
    unCover(params) {
        return post('/unCover', params)
    },
    //覆盖
    cover(params) {
        return post('/cover', params)
    },
    //限制课次
    optionalLesson(params) {
        return get('/optionalLesson', { params })
    },
    //重复验证
    rptValidateNo(params) {
        return post('/rptValidateNo', params)
    },
    //根据分类年级获取课次
    validLesson(params) {
        return get('/validLesson', { params })
    },
}
