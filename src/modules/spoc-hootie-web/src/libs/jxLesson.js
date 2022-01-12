import { http, baseURL } from "./request";
import util from "@public/libs/js/util";

const k = '/jxLesson'
const post = (u, data) => {
	let _data = util.requestDataTrim('POST', data)
	return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
	let _data = util.requestDataTrim('GET', data)
	return http.get(`${k}${u}`, _data);
};

export const jxLesson = {
	//排课列表VO列表
	listPage(params) {
		return post('/listPage', params)
	},
	//课次列表VO列表
	listClassLessonPage(params) {
		return post('/listClassLessonPage', params)
	},
	//审批列表的接口
	listClassLessonAuditPage(params) {
		return post('/listClassLessonAuditPage', params)
	},
	//应到学员VO列表
	listExpectStudents(params) {
		return get('/listExpectStudents', { params })
	},
	// 获取班课列表设置显示列显示的字段
	getShowTitle(params) {
		// return get('/getShowTitle?voName=JxLessonVO',{params})
		return get('/getShowTitle', { params })
	},
	clearShowField(params) {
		// return get('/getShowTitle?voName=JxLessonVO',{params})
		return get('/clearShowField', { params })
	},
	// //更新班课列表显示的字段
	updateShowTitle(pageIdentifier, params) {
		return post('/updateShowTitle?pageIdentifier=' + pageIdentifier, params);
	},
	/*  //更新班课列表显示的字段
	  updateShowTitle(pageIdentifier ,params){
		return post('/updateShowTitle?pageIdentifier=' + pageIdentifier, params)
		  }, */
	//保存/编辑评分模板
	save(params) {
		return post('/update', params)
	},
	// 删除次课学员
	deleteStudent(params) {
		return get('/deleteStudent', { params })
	},
	// 删除排课
	deleteLesson(params) {
		return get('/deleteLesson', { params })
	},
	// 我的课程-历史的课次列表
	findMyPastLesson(params) {
		return post('/findMyPastLesson', params)
	},
	//我的课程-未来的课次列表
	findMyFutureLesson(params) {
		return post('/findMyFutureLesson', params)
	},
	listUnSendPage(params) {
		return post('/listUnSendPage', params)
	},
	// 下载导入模板
	template(params) {
		return `${baseURL}${k}/data/import/template`
	},
	// 教室批量导入
	import(params) {
		return `${baseURL}${k}/data/import`
	},
	// 下载错误报告
	downReport(params) {
		return `${baseURL}${k}/data/downReport`
	},
	send(params) {
		return get('/send', { params })
	},
	findLessonIdNameByClassId(params) {
		return get('/findLessonIdNameByClassId', { params })
	},
	// 2019-8-1 曹见芳
	importXb() {
		return `${baseURL}${k}/dataXb/import/xbImport`
	},
	downReportXb() {
		return `${baseURL}${k}/dataXb/downReport`
	},
	templateXb() {
		return `${baseURL}${k}/dataXb/import/template`
	},
	batchDeleteLesson(params) {
		return post('/batchDeleteLesson', params)
	},
	recoveryStudent(params) {
		return get('/recoveryStudent', { params })
	},
}
