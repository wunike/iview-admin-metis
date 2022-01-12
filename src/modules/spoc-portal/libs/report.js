import {
    httpReport
} from './sysBase';
import util from "@public/libs/js/util";

const post = (u, data) => {
    let _data = util.requestDataTrim('POST', data)
    return httpReport.post(`${u}`, _data);
};

const get = (u, data) => {
    let _data = util.requestDataTrim('GET', data)

    return httpReport.get(`${u}`, _data);
};
export const report = {
    //渠道转化
    channelListPage(params){//渠道明细list
        return post('/channel/rptChannelDetail/listPage',params);
    },
    channelGetShowTitle(params){
        return get('/channel/rptChannelDetail/getShowTitle',{params});
    },
    channelFindChannelSalerCollect(params){//渠道跟进人
        return post('/channel/rptChannelDetail/findChannelSalerCollect',params);
    },
    channelFindChannelConverCollect(params){//渠道汇总list
        return post('/channel/rptChannelDetail/findChannelConverCollect',params);
    },
    channelfindChannelConverActivityCollect(params){//活动汇总list
        return post('/channel/rptChannelDetail/findChannelConverActivityCollect',params);
    },
    channelListChannelConverSalerCollect(params){//跟进人汇总list
        return post('/channel/rptChannelDetail/listChannelConverSalerCollect',params);
    },
    exportChannelConver(params){//跟进人汇总list
        return post('/channel/rptChannelDetail/exportChannelConver',params);
    },

    //学员显示列
    getShowTitle(params){
        return get('/student/rptStudentArchive/getShowTitle',{params});
    },
    //学员列表
    listPage(params){
        return post('/student/rptStudentArchive/listPage',params);
    },
    //更新学员列表展示列
    updateShowTitle(params) {
        return post('/student/rptStudentArchive/updateShowTitle?pageIdentifier=rptStudentArchive', params)
    },
    /* 校区利用率start */
    rptList(params){
        return post('/rpt/rptUtilityArchive/list',params);
    },
    rptGetShowTitle(params){
        return get('/rpt/rptUtilityArchive/getShowTitle',{params});
    },
    rptUpdateShowTitle(pageIdentifier,params){
        return post('/rpt/rptUtilityArchive/updateShowTitle?pageIdentifier='+pageIdentifier,params);
    },
    /* 校区利用率end */
    /* 教室使用情况start */
    rptClassroomArchiveList(params){
        return post('/rpt/rptClassroomArchive/list',params);
    },
    /* 教室使用情况end */
    /* 校区利用率_使用明细 */
    listDetailPage(params){
        return post('/rpt/rptUtilityArchive/listDetailPage',params);
    },
    /* 校区利用率_使用明细 */
    /* 班课考勤汇总rptGroupClassArchive*/
    rptGroupClassArchiveListPage(params){
        return post('/rpt/rptGroupClassArchive/listPage',params);
    },
    rptGroupClassArchiveGetShowTitle(params){
        return get('/rpt/rptGroupClassArchive/getShowTitle',{params});
    },
    rptGroupClassArchiveUpdateShowTitle(pageIdentifier,params){
        return post('/rpt/rptGroupClassArchive/updateShowTitle?pageIdentifier='+pageIdentifier,params);
    },
    // 考勤明细
    // listDetailPage
    rptGroupClassArchiveListDetailPage(params){
        return post('/rpt/rptGroupClassArchive/listDetailPage',params);
    },
     
    /* 学员剩余课时数汇总获取显示列 */

    rptRemainGetShowTitle(params){
        return get('/rpt/rptRemainClassesCourseArchive/getShowTitle',{params});
    },
    // 学员剩余课时数汇总
    findRemainClassCollect(params){
        return post('/rpt/rptRemainClassesCourseArchive/findRemainClassCollect',params);
    },
    listStatPanel(params){
        return get('/bi/biSatatPanel/listStatPanel',{params});
    },
    // 获取分组
    supportGroup(url){
        return get(url + '/supportGroup');
    },
    // 获取排序
    supportSort(url){
        return get(url + '/supportSort');
    },
    //获取图形类型
    supportType(url){
        return get(url + '/supportType');
    },
    // 获取指标项
    supportItem(url){
        return get(url + '/supportItem');
    },
    // 获取过滤项
    supportFilter(url){
        return get(url + '/supportFilter');
    },
    // 获取统计周期
    supportPeriod(url){
        return get(url + '/supportPeriod');
    },
}
