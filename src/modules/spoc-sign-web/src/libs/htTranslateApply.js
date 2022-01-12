import {
    http,
    httpSignBlob
} from "./request";
const k = '/htTranslateApply'
const get = (u, data) => {
    return http.get(`${k}${u}`, data);
};

const post = (u, data) => {
    return http.post(`${k}${u}`, data);
};

export const htTranslateApply = {
    export(params) {
        return httpSignBlob.post(`${k}/export`, params)
    },
    listPage(params) {
        return post('/listPage', params)
    },
    getShowTitle(params) {
        return get('/getShowTitle', {
            params
        })
    },
    clearShowField(params) {
        return get('/clearShowField', {
            params
        })
    },
    firstCommit(params) {
        return post('/firstCommit', params)
    },
    form(params) {
        return get('/form', {
            params
        })
    },
    updateShowTitle(params) {
        return post('/updateShowTitle?pageIdentifier=htTranslateApply/FlistPage', params)
    },
    optionCourse(params) {
        return post('/optionCourse', params)
    },
	saveInSellerId(params) {
        return post('/saveInSellerId', params)
    },
    rollbackOptionCourse(params) {
        return get('/rollbackOptionCourse', {
            params
        })
    },
}
