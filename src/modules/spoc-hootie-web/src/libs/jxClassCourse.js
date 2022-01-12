import { http, baseURL } from "./request";
import util from "@public/libs/js/util";

const k = '/jxClassCourse'
const post = (u, data) => {
    let _data = util.requestDataTrim('POST', data)
    return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
    let _data = util.requestDataTrim('GET', data)
    return http.get(`${k}${u}`, _data);
};

export const jxClassCourse = {
    //删除课堂反馈模板
    findPage(params) {
        return post('/findPage', params)
    },
    getTotalLessonCount(params) {
        return get('/getTotalLessonCount', { params })
    },
    findClassIdNameByClassName(params) {
        return get('/findClassIdNameByClassName', { params })
    },
    // 根据Id删除课堂反馈模板
    //  deleteById(params){
    //      return get('/deleteById',{params})
    //  },
    //积分流水_查询条件_班课
    listByOfficeId(params) {
        return get('/listByOfficeId', { params })
    },
    // 2019-8-1 曹见芳
    template() {
        return `${baseURL}${k}/dataXb/import/template`
    },
    import() {
        return `${baseURL}${k}/dataXb/import/xbImport`
    },
    downReport() {
        return `${baseURL}${k}/dataXb/downReport`
    },
}
