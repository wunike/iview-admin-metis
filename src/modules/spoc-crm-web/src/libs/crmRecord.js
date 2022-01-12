import {
	http,
	baseURL,
	httpCrmBlob,
} from "./request";
const k = '/crmRecord'
const post = (u, data) => {
	return http.post(`${k}${u}`, data);
};

const get = (u, data) => {
	return http.get(`${k}${u}`, data);
};
export const crmRecord = {
	//录音VO列表
	listPage(params) {
		return post('/listPage', params)
	},
	// 获取录音显示的字段
	getShowTitle(params) {
		return get('/getShowTitle', { params })
	},
	// 初始字段
	clearShowField(params) {
		return get('/clearShowField', { params })
	},
	//更新动态显示列
	updateShowTitle(pageIdentifier ,params){
        return post('/updateShowTitle?pageIdentifier=' + pageIdentifier, params);
    },
    //录音VO列表
    statisticsRecord(params) {
        return post('/statisticsRecord', params)
	},
	//导出
    export(params) {
        return httpCrmBlob.post(`${k}/export`, params)
    },
}
