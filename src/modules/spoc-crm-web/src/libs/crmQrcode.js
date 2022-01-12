import {
	http,
	baseURL,
	httpCrmBlob,
} from "./request";
const k = '/crmQrcode'
const post = (u, data) => {
	return http.post(`${k}${u}`, data);
};

const get = (u, data) => {
	return http.get(`${k}${u}`, data);
};
export const crmQrcode = {
	//二维码招生VO列表列表
	listPage(params) {
		return post('/listPage', params)
	},
	//保存二维码招生
	save(params) {
		return post('/save', params)
	},
	//修改二维码状态
	updateQrcodeEnable(params){
		return post('/updateQrcodeEnable',params)
	},
	//编辑或二维码招生详情
	detail(params){
		return post('/detail',params)
	},
	//二维码配置人员列表
	findQrcodeChannel(params) {
		return post('/findQrcodeChannel', params)
	},
	//修改二维码配置人员状态
	updateQrcodeChannelEnable(params) {
		return post('/updateQrcodeChannelEnable', params)
	},
	//保存二维码渠道
	saveQrcodeChannel(params) {
		return post('/saveQrcodeChannel', params)
	},
    saveTempByRedis(params) {
		return post('/saveTempByRedis', params)
	},
	// 二维码报名资源列表
	findQrcodeCustomer(params) {
		return post('/findQrcodeCustomer', params)
	},
	// 二维码报名会员列表
	findQrcodeMember(params) {
		return post('/findQrcodeMember', params)
	},
	updateShowTitle(pageIdentifier, params) {
		return post('/updateShowTitle?pageIdentifier=crmQrcode', params);
	},
	//   // 获取二维码招生列表显示列显示的字段
	getShowTitle(params) {
		return get('/getShowTitle', { params })
	},
	// 清除显示列显示的字段
	clearShowField(params) {
		return get('/clearShowField', { params })
	},
	//  报名资源、报名会员显示列
	findQrcodeDynamicLine(params) {
		return get('/findQrcodeDynamicLine', { params })
	},
	//编辑或二维码招生详情
	form(params){
		return post('/anno/form',params)
	},
	// //合同延期保存接口
	// save(params){
	// 	return post('/save',params)
	// },
	//  // 更新二维码招生列表显示的字段
	//     // 导出全部
	// 	exportFile(params) {
	// 		return httpSignBlob.post('/htValidApply/exportFile', params)
	// 	},
	// 	// 导出所选
	// 	exportSelectedFile(params) {
	// 		return httpSignBlob.post('/htValidApply/exportSelectedFile', params)
	// 	}
    //   // 获取二维码招生列表显示列显示的字段
    listByCode(params) {
        return get('/listByCode', { params })
	},
	// 导出
	export(params) {
		return httpCrmBlob.post(`${k}/export`, params)
	},
}
