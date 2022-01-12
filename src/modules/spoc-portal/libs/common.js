import {
    httpCommon,
    baseURLCommon,
    httpCommonBlob
} from './sysBase';

const COMTAG = '/comTag';
const comAfs = '/comAuditFlowSetting'
const comStudent = '/student'
const hootie = '/hootie'
const jwCourse = '/jw/jwCourse'
const jwCoursePack = '/jw/jwCoursePack'
const jwComClassroom = '/jw/comClassroom'
const comTaskTpl = '/comTaskTpl'
const comTask = '/comTask'
const comTodo = '/comTodo'
const comAnnouncement = '/comAnnouncement'
const comAlarmRenew = '/comAlarmRenew'
const comSchool = '/comSchool'
const comSopLesson = '/comSopLesson'
const comDataTransfer = '/comDataTransfer'

export function getCommon(httpCommon) {
    return {
        // 导入导出 列表
        comDataTransferListPage(params) {
            return httpCommon.post(`${comDataTransfer}/listPage`, params);
        },
        // bizType 枚举类型
        enums(params) {
            return httpCommon.get(`/enums`, {
                params
            });
        },
        // 合同标签树形列表
        buildTree(params) {
            return httpCommon.get(`${COMTAG}/buildTree`, {
                params
            });
        },
        // 修改标签名字
        updateName(obj) {
            return httpCommon.post(`${COMTAG}/updateName`, obj);
        },
        // 删除标签
        deleteTag(obj) {
            return httpCommon.post(`${COMTAG}/delete`, obj);
        },
        // 标签排序
        sortTag(obj) {
            return httpCommon.post(`${COMTAG}/sortTag`, obj);
        },
        // 是否多选
        isManyCheck(obj) {
            return httpCommon.post(`${COMTAG}/updateMultiselect`, obj);
        },
        // 添加或修改标签管理
        editTag(params) {
            return httpCommon.get(`${COMTAG}/form`, {
                params
            });
        },
        // 保存标签管理
        saveTag(obj) {
            return httpCommon.post(`${COMTAG}/save`, obj);
        },
        //审批流程设置VO列表
        listPage(params) {
            return httpCommon.get(`${comAfs}/listPage`, {
                params
            });
        },
        //保存审批流程设置
        save(params) {
            return httpCommon.post(`${comAfs}/save`, params);
        },
        //保存审批流程设置判重
        ifCanSave(params) {
            return httpCommon.post(`${comAfs}/ifCanSave`, params);
        },
        //获取审批设置适用校区
        getAuditOffices(params) {
            return httpCommon.get(`${comAfs}/getAuditOffices`, params);
        },
        //获取
        form(params) {
            return httpCommon.get(`${comAfs}/form`, {
                params
            });
        },
        //学员课程VO列表
        // comStudentCourseRellistPage(params) {
        //     return httpCommon.get(`${comStudent}/comStudentCourseRel/listPage`, {
        //         params
        //     });
        // },
        // 根据Id获取剩余请假次数
        comStudentCourseRelGetLeftLeaveNum(params) {
            return httpCommon.get(`${comStudent}/comStudentCourseRel/getLeftLeaveNum`, {
                params
            });
        },
        comStudentCourseRelFindOneById(params) {
            return httpCommon.get(`${comStudent}/comStudentCourseRel/findOneById`, {
                params
            });
        },
        transformOfficeId(params) {
            return httpCommon.get(`${comStudent}/comStudent/transformOfficeId`, {
                params
            });
        },
        comStudentCourseRelbaseListPage(params) {
            return httpCommon.post(`${comStudent}/comStudentCourseRel/baseListPage`, params);
        },
        comStudentCourseReltotalListPage(params) {
            return httpCommon.post(`${comStudent}/comStudentCourseRel/totalListPage`, params);
        },
        //财务管理-已报课程导出
        comStudentCourseRelExport(params) {
            return httpCommonBlob.post(`${comStudent}/comStudentCourseRel/export`, params)
        },
        //学员管理导出
        export (params) {
            return httpCommonBlob.post(`${comStudent}/comStudent/exportFile`, params)
        },
        //学员管理VO列表
        manageListPage(params) {
            return httpCommon.post(`${comStudent}/comStudent/manageListPage`, params);
        },
        // 更新学员管理显示的字段
        updateShowTitle(pageIdentifier, params) {
            return httpCommon.post(`${comStudent}/comStudent/updateShowTitle?pageIdentifier=${pageIdentifier}`, params);
        },
        // 更新学员管理显示的字段
        getShowTitle(params) {
            return httpCommon.get(`${comStudent}/comStudent/getShowTitle`, {
                params
            });
        },
        // 更新学员管理显示的字段
        clearShowField(params) {
            return httpCommon.get(`${comStudent}/comStudent/clearShowField`, {
                params
            });
        },
        // 根据校区获取学员
        comStudentListByOfficeId(params) {
            return httpCommon.get(`${comStudent}/comStudent/listByOfficeId`, {
                params
            });
        },
        comStudentUploadAvatar() {
            return `${baseURLCommon}${comStudent}/comStudent/uploadAvatar`;
        },
        listByOfficeIdAndName(params) {
            return httpCommon.get(`${comStudent}/comStudent/listByOfficeIdAndName`, {
                params
            });
        },
        comStudentForm(params) {
            return httpCommon.get(`${comStudent}/comStudent/form`, {
                params
            });
        },
        comStudentSave(params) {
            return httpCommon.post(`${comStudent}/comStudent/save`, params);
        },
        comStudentFindStudentBirthday(params) {
            return httpCommon.get(`${comStudent}/comStudent/findStudentBirthday`, {
                params
            });
        },
        comStudentGetStudentAccountInfo(params) {
            return httpCommon.post(`${comStudent}/comStudentAccount/getStudentAccountInfo`, params);
        },
        comAccountCapitalTraceListPage(params) {
            return httpCommon.post(`${comStudent}/comAccountCapitalTrace/listPage`, params);
        },
        comStudentFindStudentOffice(params) {
            return httpCommon.get(`${comStudent}/comStudentSchool/findStudentOffice`, {
                params
            });
        },
        saveOoId(params) {
            return httpCommon.post(`${comStudent}/comStudent/saveOoId`, params);
        },

        exportStudent(params) {
            return httpCommonBlob.post(`${comStudent}/comStudent/export`, params);
        },
        // 续费预警列表
        comAlarmRenewListPage(params, config = {}) {
            return httpCommon.post(`${comAlarmRenew}/listPage`, params, config);
        },
        // 续费预警执行
        comAlarmRenewRenewalWarn(params) {
            return httpCommon.get(`${comAlarmRenew}/renewalWarn`, {
                params
            });
        },
        //忽略【在待续费、续费未跟进、续费已跟进都会有忽略按钮】
        saveIsIgnore(params) {
            return httpCommon.get(`${comAlarmRenew}/saveIsIgnore`, {
                params
            });
        },
        //导出
        exportFile(params) {
            return httpCommonBlob.post('/comAlarmRenew/exportFile', params);
            // return`${baseURLCommon}/${comAlarmRenew}/exportFile`;
        },
        //更新小程序首页图片
        uploadWelcome() {
            return `${baseURLCommon}${hootie}/system/uploadWelcome`;
        },

        /* 课程包开始 */
        jwCourseSave(params) {
            return httpCommon.post(`${jwCourse}/save`, params);
        },
        jwCourseSaveStatus(params) {
            return httpCommon.post(`${jwCourse}/saveStatus`, params);
        },
        jwCourseSaveBase(params) {
            return httpCommon.post(`${jwCourse}/saveBase`, params);
        },
        jwCourseSaveItemPrice(params) {
            return httpCommon.post(`${jwCourse}/saveItemPrice`, params);
        },
        jwCourseDelete(params) {
            return httpCommon.post(`${jwCourse}/delete`, params);
        },
        jwCourseSaveCopy(params) {
            return httpCommon.post(`${jwCourse}/saveCopy`, params);
        },
        jwCourseListPage(data) {
            return httpCommon.get(`${jwCourse}/listPage`, {
                params: data,
            });
        },
        jwCourseForm(data) {
            return httpCommon.get(`${jwCourse}/form`, {
                params: data,
            });
        },
        listPageByOffice(data) {
            return httpCommon.post(`${jwCourse}/listPageByOffice`, data);
        },
        /* 课程包结束 */
        /* 组合课程包开始 */
        listGroupOfficePrice(params) {
            return httpCommon.post(`${jwCoursePack}/listGroupOfficePrice`, params);
        },
        coursePackGroupSave(params) {
            return httpCommon.post(`${jwCoursePack}/save`, params);
        },
        deleteCoursePackGroup(params) {
            return httpCommon.post(`${jwCoursePack}/delete`, params);
        },
        saveStatusCoursePackGroup(params) {
            return httpCommon.post(`${jwCoursePack}/saveStatus`, params);
        },
        saveCopyCoursePackGroup(params) {
            return httpCommon.post(`${jwCoursePack}/saveCopy`, params);
        },
        coursePackGroupListPage(data) {
            return httpCommon.get(`${jwCoursePack}/listPage`, {
                params: data,
            });
        },
        coursePackGroupForm(data) {
            return httpCommon.get(`${jwCoursePack}/form`, {
                params: data,
            });
        },
        coursePackGroupListCourse(data) {
            return httpCommon.get(`${jwCoursePack}/listCourse`, {
                params: data,
            });
        },
        checkName(data) {
            return httpCommon.get(`${jwCoursePack}/checkName`, {
                params: data,
            });
        },
        /* 组合课程包结束 */
        //教室
        listByOfficeId(data) {
            return httpCommon.get(`${jwComClassroom}/listByOfficeId`, {
                params: data,
            });
        },
        jwComClassroomListPage(params) {
            return httpCommon.post(`${jwComClassroom}/listPage`, params);
        },

        //任务模板
        saveComTaskTpl(data) {
            return httpCommon.post(`${comTaskTpl}/save`, data);
        },
        //任务中心 - 批量保存
        batchComplete(data) {
            return httpCommon.post(`${comTask}/batchComplete`, data);
        },
        //任务模板详情
        formComTaskTpl(data) {
            return httpCommon.get(`${comTaskTpl}/form`, {
                params: data
            });
        },
        //任务模板-完成状态详情value查重
        checkResultValueRpt(data) {
            return httpCommon.get(`${comTaskTpl}/checkResultValueRpt`, {
                params: data
            });
        },
        //任务模板-完成状态详情value查重
        listPageComTaskTpl(data) {
            return httpCommon.post(`${comTaskTpl}/listPage`, data);
        },
        //任务模板-获取可用模板列表
        listCanBeUsed(data) {
            return httpCommon.post(`${comTaskTpl}/listCanBeUsed`, data);
        },
        //任务模板 - 修改状态
        updateIsEnableComTaskTpl(data) {
            return httpCommon.get(`${comTaskTpl}/updateIsEnable`, {
                params: data
            });
        },
        //任务模板 - 删除
        deleteByIdComTaskTpl(data) {
            return httpCommon.get(`${comTaskTpl}/deleteById`, {
                params: data
            });
        },
        //任务模板 - 复制
        copyComTaskTpl(data) {
            return httpCommon.get(`${comTaskTpl}/copy`, {
                params: data
            });
        },
        //任务模板 - 获取任务模板及结果状态
        getStatusTaskInfo(data) {
            return httpCommon.get(`${comTaskTpl}/getStatusTaskInfo`, {
                params: data
            });
        },

        //任务模板 - 获取可创建任务模板过滤值
        getCustomerStatusRelTask(data) {
            return httpCommon.get(`${comTaskTpl}/getCustomerStatusRelTask`, {
                params: data
            });
        },

        //任务中心 - 保存
        saveComTask(data) {
            return httpCommon.post(`${comTask}/save`, data);
        },
        //任务中心 - 列表
        listPageComTask(data) {
            return httpCommon.post(`${comTask}/listPage`, data);
        },
        //任务中心 - 全部列表
        listAllPage(data) {
            return httpCommon.post(`${comTask}/listAllPage`, data);
        },
        //任务中心 - 获取显示列
        getShowTitleComTask(params) {
            return httpCommon.get(`${comTask}/getShowTitle`, {
                params
            })
        },
        //任务中心 - 获取显示列
        clearShowFieldComTask(params) {
            return httpCommon.get(`${comTask}/clearShowField`, {
                params
            })
        },
        //任务中心 - 更新显示列
        updateShowTitleComTask(pageIdentifier, params) {
            return httpCommon.post(`${comTask}/updateShowTitle?pageIdentifier=${pageIdentifier}`, params);
        },
        //任务中心 - 获取详情
        formComTask(params) {
            return httpCommon.get(`${comTask}/form`, {
                params
            })
        },
        //任务中心 - 根据id删除任务
        deleteById(params) {
            return httpCommon.get(`${comTask}/deleteById`, {
                params
            })
        },
        //任务中心 - 获取获取服务对象
        getServiceObject(params) {
            return httpCommon.get(`${comTask}/getServiceObject`, {
                params
            })
        },
        //任务中心 - 获取服务对象执行人
        getServiceObjectExecutor(params) {
            return httpCommon.get(`${comTask}/getServiceObjectExecutor`, {
                params
            })
        },
        //任务中心 - 根据人员ID获取所管理班课
        getClassByTaskCreateBy(params) {
            return httpCommon.get(`${comTask}/getClassByTaskCreateBy`, {
                params
            })
        },
        //任务中心 - 根据班课ID获取班课对应的数据
        getClassInfoByClassId(params) {
            return httpCommon.get(`${comTask}/getClassInfoByClassId`, {
                params
            })
        },
        //任务中心 - 获取SOP任务列表
        listSopPage(params) {
            return httpCommon.post(`${comTask}/listSopPage`, params)
        },
        //任务中心 - 获取SOP全部任务列表
        listAllSopPage(params) {
            return httpCommon.post(`${comTask}/listAllSopPage`, params)
        },
        getTaskTplByObjectId(params) {
            return httpCommon.get(`${comTask}/getTaskTplByObjectId`, {
                params
            })
        },
        comTodoTodoTypeMap(params) {
            return httpCommon.post(`${comTodo}/todoTypeMap`, params);
        },
        comAnnouncementListPage(params) {
            return httpCommon.post(`${comAnnouncement}/listPage`, params);
        },
        comAnnouncementSave(params) {
            return httpCommon.post(`${comAnnouncement}/save`, params);
        },
        comAnnouncementUpdateAnnouncement(params) {
            return httpCommon.post(`${comAnnouncement}/updateAnnouncement`, params);
        },
        comAnnouncementForm(params) {
            return httpCommon.get(`${comAnnouncement}/form`, {
                params
            });
        },
        comAnnouncementUpdateRead(params) {
            return httpCommon.post(`${comAnnouncement}/updateRead`, params);
        },
        comSchoolListPage(params) {
            return httpCommon.post(`${comSchool}/listPage`, params);
        },
        comSchoolSave(params) {
            return httpCommon.post(`${comSchool}/save`, params);
        },
        comSchoolForm(params) {
            return httpCommon.get(`${comSchool}/form`, {
                params
            });
        },
        comSchoolDeleteById(params) {
            return httpCommon.get(`${comSchool}/deleteById`, {
                params
            });
        },
        comSchoolListName(params) {
            return httpCommon.get(`${comSchool}/listName`, {
                params
            });
        },
        comSchoolBatchDelete(params) {
            return httpCommon.post(`${comSchool}/batchDelete`, params);
        },
        //SOP任务设置创建课次
        comSopLessonSave(params) {
            return httpCommon.post(`${comSopLesson}/save`, params);
        },
        //SOP任务设置列表
        comSopLessonListPage(params) {
            return httpCommon.post(`${comSopLesson}/listPage`, params);
        },
        //SOP任务设置-保存关联
        saveRel(params) {
            return httpCommon.post(`${comSopLesson}/saveRel`, params);
        },
        //SOP任务设置-删除关联
        deleteRel(params) {
            return httpCommon.get(`${comSopLesson}/deleteRel`, {
                params
            });
        },
        //SOP任务设置-删除课次
        comSopLessonDeleteById(params) {
            return httpCommon.get(`${comSopLesson}/deleteById`, {
                params
            });
        },
    }
}

export const common = getCommon(httpCommon)
