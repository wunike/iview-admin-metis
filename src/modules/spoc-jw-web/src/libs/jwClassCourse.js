import { http, httpJWBlob, baseURL } from "./request";
import util from "@public/libs/js/util";
const k = '/jwClassCourse'
const post = (u, data) => {
	let _data = util.requestDataTrim('POST', data)
	return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
	let _data = util.requestDataTrim('GET', data)
	return http.get(`${k}${u}`, _data);
};

export const jwClassCourse = {
	 //学员课程VO列表
	 comStudentCourseRellistPage(params) {
		return get('/courseStudentList', { params })
	},
	// 检测班课关联人员及教室是否异常
	checkException(params) {
		return get('/checkException', { params })
	},
	// 删除班课
	delete(params) {
		return post('/delete', params)
	},
	// 同步班课
	jwJxSnyc(params) {
		return post('/jwJxSnyc', params)
	},
	// 下载错误报告
	downReport(params) {
		return `${baseURL}${k}/downReport`
	},
	// 根据Id删除班课
	deleteById(params) {
		return get('/deleteById', { params })
	},
	// 下载班课数据EXCEL导入模板
	downloadTemplate(params) {
		return `${baseURL}${k}/downloadTemplate${params}`
	},
	//导出全部班课数据
	exportFile(params) {
		return httpJWBlob.post('/jwClassCourse/exportFile', params)
	},
	//导出点名表
	exportNameList(params) {
		// return post('/exportNameList',params)
		return httpJWBlob.post('/jwClassCourse/exportNameList', params)
	},
	//导出所选班课数据
	exportSelectedFile(params) {
		// return post('/exportSelectedFile',params)
		return httpJWBlob.post('/jwClassCourse/exportSelectedFile', params)
	},
	jwClassCourseExport(params) {
		// return post('/exportSelectedFile',params)
		return httpJWBlob.post('/jwClassCourse/export', params)
	},
	// 编辑或班课详情
	form(params) {
		return get('/form', { params })
	},
	// 获取班课列表设置显示列显示的字段
	getShowTitle(params) {
		return get('/getShowTitle', { params })
	},
	clearShowField(params) {
		return get('/clearShowField', { params })
	},
	//导入班课数据EXCEL
	importFile(params) {
		return `${baseURL}${k}/importFile`
	},
	//班课VO列表
	listPage(params) {
		return post('/listPage', params)
	},
	// 班课下学员VO分页列表/班课详情
	listPageClassStudent(params) {
		return get('/listPageClassStudent', { params })
	},
	//更新学员首课日期
	updateStudentFirstTime(params) {
		return post('/updateStudentFirstTime', params)
	},
	//学员名册列表
	listPageStudentVolumes(params) {
		return post('/listPageStudentVolumes', params)
	},
	//班课学员列表
	listPageStudents(params) {
		return post('/listPageStudents', params)
	},
	//保存班课
	save(params) {
		return post('/save', params)
	},
	//学员报班
	studentJoinClass(params) {
		return post('/studentJoinClass', params)
	},
	//学员退班
	studentQuitClass(params) {
		return post('/studentQuitClass', params)
	},
	//更新班课列表显示的字段
	updateShowTitle(pageIdentifier, params) {
		return post('/updateShowTitle?pageIdentifier=' + pageIdentifier, params)
	},
	//学员基本信息和对应的课程, 班课信息
	getStudentDetail(params) {
		return get('/getStudentDetail', { params })
	},
	//获取学生卡信息
	listStudentsCards(params) {
		return post('/listStudentsCards', params)
	},
	//次课_迁移学生到家校
	listTransferStudents(params) {
		return post('/listTransferStudents', params)
	},
	//获取同步进度
	getProgressData(params) {
		return get('/getProgressData', { params })
	},
	//获取同步错误列表
	getSynPromptData(params) {
		return get('/getSynPromptData', { params })
	},
	//下载错误报告
	downTransferReport(params) {
		return `${baseURL}${k}/downTransferReport`
		//return get('/downTransferReport',{params})
	},
	//清除缓存
	clearCahce(params) {
		return get('/clearCahce', { params })
	},
	//更新学员
	synUpdateStudents(params) {
		return get('/synUpdateStudents', { params })
	},
	//更新学员
	listPageDropClass(params) {
		return post('/listPageDropClass', params)
	},
	//导出退班审核记录
	exportDropClassFile(params) {
		return httpJWBlob.post('/jwClassCourse/exportDropClassFile', params)
	},
	//获取退课审批申请详情
	dropClassDetail(params) {
		return get('/dropClassDetail', { params })
	},
	//获取退课审批申请详情
	readingStudentCount(params) {
		return get('/readingStudentCount', { params })
	},
	//判断该校区有没有模板
	checkTemplateData(params) {
		return get('/checkTemplateData', { params })
	},
	//导出学员名册
	exportStudent(params) {
		return httpJWBlob.post('/jwClassCourse/exportStudent', params)
	},
	//导出班课学员
	exportClassStudent(params) {
		return httpJWBlob.post('/jwClassCourse/exportClassStudent', params)
	},
}
