import {
    http,
    baseURL,
    httpCrmBlob
} from './request'
const K = '/crmActivity'
const post = (u,data) => {
    return http.post(`${K}${u}`,data)
}
const get = (u,data) => {
    return http.get(`${K}${u}`,data)
}
export const crmActivity = {
    //活动招生_列表
    listCrmActivityPage(params) {
        return post('/listCrmActivityPage', params)
    },
    //活动招生_新建
    save(params) {
        return post('/save', params)
    },
    //修改活动状态或总费用
    updateIsEnableOrExpense(params) {
        return post('/updateIsEnableOrExpense', params)
    },
    //活动招生_详情
    form(params) {
        return get('/form', {params})
    },
    //活动招生_报名资源列表 活动招生_报名会员列表
    listEnrolls(params) {
        return post('/listEnrolls', params)
    },
    //获取动态显示列
    getShowTitle(params){
        return get('/getShowTitle', {params})
    },
    //清除动态显示列设置
    clearShowField(params){
        return get('/clearShowField', {params})
    },
    //更新动态显示列
    updateShowTitle(pageIdentifier ,params){
        return post('/updateShowTitle?pageIdentifier=' + pageIdentifier, params);
    },
    //获取教室
    listClassroom(params){
        return get('/listClassroom', {params})
    },
    //更新二维码
    updateQrcode(params){
        return get('/updateQrcode', {params})
    },
    //活动招生_新建
    // eslint-disable-next-line no-dupe-keys
    updateBase(params) {
        return post('/updateBase', params)
    },
    formBase(params){
        return get('/formBase', {params})
    },
    // eslint-disable-next-line no-dupe-keys
    listUnConflictedUsers(params) {
        return post('/listUnConflictedUsers', params)
    },
    findQrCodeActivity(params){
        return get('/findQrCodeActivity', {params})
    },
    // 活动招生_配置人员列表
    listChannels(params) {
        return post('/listChannels', params)
    },
    //导出
    export(params) {
        return httpCrmBlob.post(`${K}/exportFile`, params)
    },
}
