import { http, httpJWBlob } from "./request";
import util from "@public/libs/js/util";

const k = '/jwClassShare'
const post = (u, data) => {
	let _data = util.requestDataTrim('POST', data)
	return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
	let _data = util.requestDataTrim('GET', data)
	return http.get(`${k}${u}`, _data);
};

export const jwClassShare = {
	//删除共享班课
	delete(params) {
		return post('/delete', params)
	},
	// 根据Id删除共享班课
	deleteById(params) {
		return get('/deleteById', { params })
	},
	// 编辑或共享班课详情
	form(params) {
		return get('/form', { params })
	},
	// 获取共享班课列表设置显示列显示的字段
	getShowTitle(params) {
		return get('/getShowTitle', { params })
	},
	clearShowField(params) {
		return get('/clearShowField', { params })
	},
	// 共享班课VO列表
	listPage(params) {
		return post('/listPage', params)
	},
	//保存共享班课
	save(params) {
		return post('/save', params)
	},
	//更新共享班课列表显示的字段
	updateShowTitle(params) {
		return post('/updateShowTitle', params)
	},
	//加入/不加入共享班课
	join(params) {
		return post('/join', params)
	},
	//导出全部共享班课数据
	exportFile(params) {
		return httpJWBlob.post('/jwClassShare/exportFile', params)
	},
	//导出部分共享班课数据
	exportSelectedFile(params) {
		return httpJWBlob.post('/jwClassShare/exportSelectedFile', params)
	},

}
