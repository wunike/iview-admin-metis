import {
	http,
	baseURL,
	httpCrmBlob,
} from "./request";
const k = '/crmChannel'
const post = (u, data) => {
	return http.post(`${k}${u}`, data);
};

const get = (u, data) => {
	return http.get(`${k}${u}`, data);
};
export const crmChannel = {
	//保存二维码渠道
	saveQrcodeChannel(params) {
		return post('/saveQrcodeChannel', params)
	},
	//获取存在的配置人员
	checkChannel(params) {
		return post('/checkChannel', params)
    },
    listPage(params) {
		return post('/listPage', params)
    },
    form(params) {
		return post('/form', params)
    },
    save(params) {
		return post('/save', params)
    },
    checkConflict(params) {
		return post('/checkConflict', params)
    },
    findChannelQrcodeRel(params) {
		return get('/findChannelQrcodeRel', { params })
    },
    updateChannelDisable(params) {
		return post('/updateChannelDisable', params)
    },
}