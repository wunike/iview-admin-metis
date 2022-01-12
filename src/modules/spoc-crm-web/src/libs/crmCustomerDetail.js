import { http } from "./request";
const k = '/crmCustomerDetail'
const post = (u, data) => {
	return http.post(`${k}${u}`, data);
};

const get = (u, data) => {
	return http.get(`${k}${u}`, data);
};
export const crmCustomerDetail = {
	statistics(params) {
		return get('/statistics', { params })
    },
    base(params) {
		return get('/base', { params })
    },
    saveTag(params) {
		return post('/saveTag', params)
    },
     //获取Crm客户360，课程教学
     findCourseLearnPage(params) {
        return post('/findCourseLearnPage', params)
    },
    //查询学员最近上过的课次等信息
    getEvalutions(params) {
        return post('/getEvalutions', params)
    },
    //查询学员积分等统计信息
    getPoints(params) {
        return get('/getPoints', {params})
    },
    //查询学员最近上过的课次等信息
    getRecentLessons(params) {
        return post('/getRecentLessons', params)
    },
    cusCheckList(params) {
		return post('/cusCheckList', params)
    },
    //客户详情-客户获取
    createData(params) {
        return get('/createData', {params})
    },
    //保存推荐人
    saveReferral(params) {
        return post('/saveReferral', params)
    },
    findStudentSchedule(params) {
        return post('/findStudentSchedule', params)
    },
    studentCard(params) {
        return get('/studentCard', {params})
    },
    statusList(params) {
        return get('/statusList', {params})
    },
    dataProof(params) {
        return get('/dataProof', {params})
    },
    statisticsUnMember(params) {
        return get('/statisticsUnMember', {params})
    },
    statisticsMember(params) {
        return get('/statisticsMember', {params})
    },
    listClasses(params) {
        return get('/listClasses', {params})
    },
}
