import { http,baseURL } from "./request";
import util from "@public/libs/js/util";

const k = '/jwAttendance'
const post = (u, data) => {
	let _data = util.requestDataTrim('POST', data)
	return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
	let _data = util.requestDataTrim('GET', data)
	return http.get(`${k}${u}`, _data);
};

export const jwAttendance = {
	//考勤学员
	attendanceStudent(params) {
		return post('/attendanceStudent', params)
	},
	// 更新考勤明细状态和课时
	saveAttendance(params) {
		return post('/saveAttendance', params)
	},
	// 添加考勤备注
	saveRemark(params) {
		return post('/saveRemark', params)
	},
	//班课学员考勤VO列表
	listClassStudentAttendance(params) {
		return get('/listClassStudentAttendance', { params })
	},
	// 批量未考勤
	attendanceStudentNoneStatus(params) {
		return post('/attendanceStudentNoneStatus', params)
	},
	// 获取考勤学员课时是否大于本次消耗 
	findHourNotEnough(params) {
		return post('/findHourNotEnough', params)
	},
	// 手工签到详情考勤列表，批量考勤
	attendanceStudentStatus(params) {
		return post('/attendanceStudentStatus', params)
	},
    //数据迁移部分
    importFileFn() {
        return `${baseURL}/jwAttendance/import/importFile`;
    },
    downReportFn() {
        return `${baseURL}/jwAttendance/import/downReport`;
    },
    template() {
        return `${baseURL}/jwAttendance/import/import/template`;
    },
}
