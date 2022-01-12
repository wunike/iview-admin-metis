
const k = '/comAuditFlow'

export function getComAuditFlow(httpCommon) {
    return {
        //获取审批高级操作
        getSeniorAuditOption(params) {
            return httpCommon.get(`${k}/getSeniorAuditOption`, {
                params
            });
        },
        //送审
        sendAudit(params) {
            return httpCommon.get(`${k}/sendAudit`, {
                params
            });
        },
        //驳回再送审
        rejectSendAudit(params) {
            return httpCommon.get(`${k}/rejectSendAudit`, {
                params
            });
        },
        updateShowTitle(pageIdentifier, params) {
            return httpCommon.post(`${k}/updateShowTitle?pageIdentifier=${pageIdentifier}`, params);
        },
        getShowTitle(params) {
            return httpCommon.get(`${k}/getShowTitle`, { params });
        },
        clearShowField(params) {
            return httpCommon.get(`${k}/clearShowField`, { params });
        },
        //撤回再送审
        withdrawSendAudit(params) {
            return httpCommon.get(`${k}/withdrawSendAudit`, {
                params
            });
        },
        //获取我的审批申请管理列表
        listMyAuditFlow(params) {
            return httpCommon.post(`${k}/listMyAuditFlow`, params);
        },
        //获取我的已审批管理列表
        listMyAuditedFlow(params) {
            return httpCommon.post(`${k}/listMyAuditedFlow`, params);
        },
        //获取我的待审批管理列表
        listMyUnauditFlow(params) {
            return httpCommon.post(`${k}/listMyUnauditFlow`, params);
        },
        //获取审批申请列表
        listMyAuditApply(params) {
            return httpCommon.post(`${k}/listMyAuditApply`, params);
        },
        //编辑或审批流程实例详情
        cfForm(params) {
            return httpCommon.get(`${k}/auditFlowDetail`, {
                params
            });
        },
        //审批
        audit(params) {
            return httpCommon.get(`${k}/audit`, {
                params
            });
        },
        //作废审批
        invalidAudit(params) {
            return httpCommon.get(`${k}/invalidAudit`, {
                params
            });
        },
        //撤回审批
        withdrawAudit(params) {
            return httpCommon.get(`${k}/withdrawAudit`, {
                params
            });
        },
        //审批管理列表接口
        listPage(params) {
            return httpCommon.post(`${k}/listPage`, params);
        },
    }
}
