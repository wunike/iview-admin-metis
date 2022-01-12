import { http, baseURL, httpJWBlob, httpForm } from "./request";
import util from "@public/libs/js/util";

const k = '/jwLesson'
const post = (u, data) => {
	let _data = util.requestDataTrim('POST', data)
	return http.post(`${k}${u}`, _data);
};
const postForm = (u, data) => {
	return httpForm.post(`${k}${u}`, data);
};

const get = (u, data) => {
	let _data = util.requestDataTrim('GET', data)
	return http.get(`${k}${u}`, _data);
};

export const jwLesson = {
	// 课次批量考勤
	batchAttendance(params) {
		return get('/batchAttendance', { params })
	},
	// 课次批量未考勤
	batchUnAttendance(params) {
		return get('/batchUnAttendance', { params })
	},
	//查看冲突
	checkConflict(params) {
		return post('/checkConflict', params)
	},
	//开始上课
	updateStatus(params) {
		return postForm('/updateStatus', params)
	},
	//单课次检测冲突
	checkLesson(params) {
		return post('/checkLesson', params)
	},
	//删除排(次)课信息
	delete(params) {
		return post('/delete', params)
	},
	// 根据Id删除排(次)课信息
	deleteById(params) {
		return get('/deleteById', { params })
	},
	// 根据Id批量删除排(次)课信息
	deleteByIds(params) {
		return get('/deleteByIds', { params })
	},
	// 编辑或排(次)课信息详情
	form(params) {
		return get('/form', { params })
	},
	// 获取排课列表设置显示列显示的字段
	getShowTitle(params) {
		return get('/getShowTitle', { params })
	},
	clearShowField(params) {
		return get('/clearShowField', { params })
	},
	// 根据老师类型和归属校区查询
	getUserByOfficeIdAndRoleId(params) {
		return get('/getUserByOfficeIdAndRoleId', { params })
	},
	// 排(次)课信息VO列表
	listPage(params) {
		return post('/listPage', params)
	},
	// 班课下排(次)课信息VO分页列表
	listPageByClass(params) {
		return get('/listPageByClass', { params })
	},
	// 保存排(次)课信息
	save(params) {
		return post('/save', params)
	},
	// 批量保存排(次)课信息
	saveBatch(params) {
		return post('/saveBatch', params)
	},
	// 修改冲突课次
	updateLesson2Cache(params) {
		return post('/updateLesson2Cache', params)
	},
	// 更新排课列表显示的字段
	updateShowTitle(pageIdentifier, params) {
		return post('/updateShowTitle?pageIdentifier=' + pageIdentifier, params)
	},
	// 根据班课信息产生排课记录
	generateLessonByClass(params) {
		return post('/generateLessonByClass', params)
    },
    reGenerateLessonByClass(params) {
		return post('/reGenerateLessonByClass', params)
    },
	// 获取不冲突的用户信息
	listUnConflictedUsers(params) {
		return post('/listUnConflictedUsers', params)
	},
	// 获取不冲突的教室信息
	listUnConflictedRoomss(params) {
		return post('/listUnConflictedRoomss', params)
	},
	// 更新头像
	uploadImg(params) {
		return get('/uploadImg', { params })
	},
	// 排课列表同步数据
	listTransferLessons(params) {
		return post('/listTransferLessons', params)
	},
	getSyncSchedule(params) {
		return get('/getSyncSchedule', { params })
	},
	downReport(params) {
		return `${baseURL}${k}/downReport`
		//return get('/downReport',{params})
	},
    //标记校区已排课次冲突
    checkConflictByOfficeId(params) {
        return get('/checkConflictByOfficeId', { params })
    },
    initAtts(params) {
        return get('/initAtts', { params })
	},
	// 导出
	export(params) {
		return httpJWBlob.post(`${k}/export`, params)
	},
}
