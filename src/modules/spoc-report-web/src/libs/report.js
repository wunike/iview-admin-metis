import {
    http,
    httpReportBlob,
} from "./request";
import util from "@public/libs/js/util";

const post = (u, data) => {
    let _data = util.requestDataTrim('POST', data)
    return http.post(`${u}`, _data);
};

const get = (u, data) => {
    let _data = util.requestDataTrim('GET', data)

    return http.get(`${u}`, _data);
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
    exportChannelConver(params){//导出
        return httpReportBlob.post('/channel/rptChannelDetail/exportChannelConver',params);
    },

    //学员显示列
    rptStudentArchiveExportFile(params){//导出
        return httpReportBlob.post('/student/rptStudentArchive/exportFile',params);
    },
    getShowTitle(params){
        return get('/student/rptStudentArchive/getShowTitle',{params});
    },
    //学员列表
    listPage(params){
        return post('/student/rptStudentArchive/listPage',params);
    },
    //学员汇总
    statistic(params){
        return post('/student/rptStudentArchive/statistic',params);
    },
    //更新学员列表展示列
    updateShowTitle(pageIdentifier,params) {
        return post('/student/rptStudentArchive/updateShowTitle?pageIdentifier='+pageIdentifier, params)
    },
    /* 校区利用率start */
    rptUtilityArchiveExportFile(params){//导出
        return httpReportBlob.post('/rpt/rptUtilityArchive/exportFile',params);
    },
    listCollectPage(params){
        return post('/rpt/rptUtilityArchive/listCollectPage',params);
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
    rptGroupClassArchiveExportFile(params){//导出
        return httpReportBlob.post('/rpt/rptGroupClassArchive/exportFile',params);
    },
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
    // 学员剩余课时数汇总
    findRemainClassCourse(params){
        return post('/rpt/rptRemainClassesCourseArchive/findRemainClassCourse',params);
    },
    // 学员剩余课时数导出
    exportRemainClassesCollect(params){
        return httpReportBlob.post('/rpt/rptRemainClassesCourseArchive/exportRemainClassesCollect',params);
    },
    /* 销售报表start */
    // 销售明细list
    salesCash(params){
        return post('/rpt/rptCashSalerArchive/salesCash',params);
    },
    // 员工业绩
    officeUserCashSummaryByMonth(params){
        return post('/rpt/rptCashSalerArchive/officeUserCashSummaryByMonth',params);
    },
    // 校区业绩汇总
    officeCashSummaryByMonth(params){
        return post('/rpt/rptCashSalerArchive/officeCashSummaryByMonth',params);
    },
    // 校区业绩汇总(不含退费)
    officeCashSummaryByDay(params){
        return post('/rpt/rptCashSalerArchive/officeCashSummaryByDay',params);
    },
    // 销售title
    salesGetShowTitle(params){
        return get('/rpt/rptCashSalerArchive/getShowTitle',{params});
    },
    // 导出
    exportRptCashSalerArchive(params){
        return httpReportBlob.post('/rpt/rptCashSalerArchive/export',params);
    },
    /* 销售报表end */


    /* 销售报表新签获取显示列 */

    rptStudentGetShowTitle(params){
        return get('/rpt/rptCashStudentArchive/getShowTitle',{params});
    },
    // 销售报表新签  明细接口
    salesReportByStudentDetails(params){
        return post('/rpt/rptCashStudentArchive/salesReportByStudentDetails',params);
    },
    //销售报表新签  汇总接口：
    salesReportByStudentSummary(params){
        return post('/rpt/rptCashStudentArchive/salesReportByStudentSummary',params);
    },
    // 销售报表新签导出
    exportRptCashStudentArchive(params){
        return httpReportBlob.post('/rpt/rptCashStudentArchive/export',params);
    },
}
