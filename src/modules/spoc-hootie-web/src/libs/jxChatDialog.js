import { http } from "./request";
import util from "@public/libs/js/util";

const k = '/jxChatDialog'
const post = (u, data) => {
    let _data = util.requestDataTrim('POST', data)
    return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
    let _data = util.requestDataTrim('GET', data)
    return http.get(`${k}${u}`, _data);
};

export const jxChatDialog = {
    //创建聊天对话
    save(params) {
        return post('/save', params)
    },
    // 获取聊天对话VO列表
    listPage(params) {
        return post('/listPage', params)
    },
    listPageForPages(params, pageNo, pageSize) {
        return post('/listPage?pageNo=' + pageNo + '&pageSize=' + pageSize, params)
    },
    searchContacts(params) {
        return get('/searchContacts', { params })
    },
    searchClassCourse(params) {
        return get('/searchClassCourse', { params })
    },
    searchChatRecord(params) {
        return get('/searchChatRecord', { params })
    },
    //我的未读消息数量
    //unReadCountByUser(params) {
    //  return get('/unReadCountByUser', {params})
    //},
}
