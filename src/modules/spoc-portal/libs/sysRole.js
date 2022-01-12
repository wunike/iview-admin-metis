import {
    httpSys, httpSysForm,
} from './sysBase';

const ROLE = 'role';

export function getSysRole(httpSys) {
    return {
        listMenuRole(params) {
            return httpSys.get(`/${ROLE}/listMenuRole`, {
                params
            });
        },
        listRole(params) {
            return httpSys.get(`/${ROLE}/listRole`, {
                params
            });
        },
        RolelistData(params) {
            return httpSys.get(`/${ROLE}/listData`, {
                params
            });
        },
        formRoleSync(params) {
            return httpSys.get(`/${ROLE}/formRoleSync`, {
                params
            });
        },
        formRole(params) {
            return httpSys.get(`/${ROLE}/form`, {
                params
            });
        },
        roleSync(params) {
            return httpSys.get(`/${ROLE}/roleSync`, {
                params
            });
        },
        roleList(params) {
            return httpSys.get(`/${ROLE}/list`, {
                params
            });
        },
        myRoleList(params) {
            return httpSys.get(`/${ROLE}/myList`, {
                params
            });
        },
        roleOutrole(params) {
            return httpSys.get(`/${ROLE}/removeRole`, {
                params
            });
        },
        roleGetRoleDataScopeList(params) {
            return httpSys.get(`/${ROLE}/getRoleDataScopeList`, {
                params
            });
        },
        roleGetDataScopeList(params) {
            return httpSys.get(`/${ROLE}/getDataScopeList`, {
                params
            });
        },
        roleApproverList(params) {
            return httpSys.get(`/${ROLE}/approverList`, {
                params
            });
        },
        roleSave(data) {
            return httpSys.post(`/${ROLE}/save`, data);
        },
        roleGrantRoleToMenu(data) {
            return httpSys.post(`/${ROLE}/grantRoleToMenu`, data);
        },
        roleAssignrole(data) {
            return httpSys.post(`/${ROLE}/assignRole`, data);
        },
        roleDelete(data) {
            return httpSysForm.post(`/${ROLE}/delete`, data);
        },
        roleGetRemainderDataScopeMenu(params) {
            return httpSys.get(`/${ROLE}/getRemainderDataScopeMenu`, {
                params
            });
        },
    };
}

export const sysRole = getSysRole(httpSys,httpSysForm);
