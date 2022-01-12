import {
    httpSys,
} from './sysBase';

const SYSWORKORFER = 'sysWorkorder';

export function getSysWorkorder(httpSys) {
    return {

        // 工单管理 POST /a/ws/sys//listPage
        wordorderMList(params) {
            return httpSys.post(`${SYSWORKORFER}/listPage`,
                params
            )
        },

        // 批量关闭 POST /a/ws/sys/sysWorkorder/editStatusAll
        editStatusAll(params) {
            return httpSys.post(`${SYSWORKORFER}/editStatusAll`,
                params
            )
        },
        // 保存 POST /a/ws/sys/sysWorkorder/save
        workorferSave(params) {
            return httpSys.post(`${SYSWORKORFER}/save`,
                params
            )
        },
        // 工单管理操作（确认：不予解决(willnotfix)、确认已解决(fixed) POST /a/ws/sys/sysWorkorder/editStatusConfirm
        handleWordorder(params) {
            return httpSys.post(`${SYSWORKORFER}/editStatusConfirm`,
                params
            )
        },

        //  编辑或工单管理详情 GET /a/ws/sys/sysWorkorder/form
        sysWorkorderForm(params) {
            return httpSys.get(`${SYSWORKORFER}/form`, {
                params
            })
        },
        editStatusView(params) {
            return httpSys.post(`${SYSWORKORFER}/editStatusView`,
                params
            )
        },
        editStatusMe(params) {
            return httpSys.post(`${SYSWORKORFER}/editStatusMe`,
                params
            )
        },
    };
}

export const sysWorkorder = getSysWorkorder(httpSys);
