import { http } from "./request";
import util from "@public/libs/js/util";

const k = '/jxLessonStudentRel'
const post = (u, data) => {
    let _data = util.requestDataTrim('POST', data)
    return http.post(`${k}${u}`, _data);
};

const get = (u, data) => {
    let _data = util.requestDataTrim('GET', data)
    return http.get(`${k}${u}`, _data);
};

export const jxLessonStudentRel = {
    // 获取课堂展示信息
    getLessonDetailInfo(params) {
        return get('/getLessonDetailInfo', { params })
    },
    // 获取课堂学员考勤信息
    getLessonAttendanceInfo(params) {
        return get('/getLessonAttendanceInfo', { params })
    },
    // 考勤
    attendance(params) {
        return post('/attendance', params)
    },
    saveStar(params) {
        return post('/saveStar', params)
    },

    // 评分
    ratedPoint(params) {
        return post('/ratedPoint', params)
    },
    // 评价
    evaluate(params) {
        return get('/evaluate', { params })
    },

    showLessonStudentSendStatus(params) {
        return get('/showLessonStudentSendStatus', { params })
    },
    changeSendStatus(params) {
        return get('/changeSendStatus', { params })
    },
    showStarInfo(params) {
        return get('/showStarInfo', { params })
    },
    ratedStar(params) {
        return post('/ratedStar', params)
    },
    isAttendanced(params) {
        return get('/isAttendanced', {
            params
        })
    },
}
