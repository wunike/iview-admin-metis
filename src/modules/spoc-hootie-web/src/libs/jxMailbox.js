import { http, httpJWBlob } from "./request";
import util from "@public/libs/js/util";

const k = '/jxMailbox'
const post = (u, data) => {
    let _data = util.requestDataTrim('POST', data)
    return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
    let _data = util.requestDataTrim('GET', data)
    return http.get(`${k}${u}`, _data);
};

export const jxMailbox = {
    //校长信箱列表
    listPage(params) {
        return post('/listPage', params)
    },
    //编辑或校长信箱详情
    form(params) {
        return get('/form', { params })
    },
    //保存校长信箱
    save(params) {
        return post('/save', params)
    },
    //保存校长信箱
    saveMessage(params) {
        return post('/saveMessage', params)
    },
    //导出数据
    exportFile(params) {
        return httpJWBlob.post(`${k}/exportFile`, params)
    },
    //导出数据
    exportSelected(params) {
        return httpJWBlob.post(`${k}/exportSelected`, params)
    },
}
