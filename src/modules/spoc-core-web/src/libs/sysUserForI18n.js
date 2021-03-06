import {
    httpSysForm,
    httpSys,
    baseURLSys,
    httpSysBlob
} from './sysBase';

const USER = 'user';

export function getSysUser(httpSysForm, httpSys, baseURLSys, httpSysBlob) {
    return {
        userUpdate(data) {
            return httpSysForm.post(`/${USER}/update`, data)
        },
        updateRole(data) {
            return httpSysForm.post(`/${USER}/updateRole`, data)
        },
        saveUser(data) {
            return httpSysForm.post(`/${USER}/save`, data)
        },
        deleteUser(data) {
            return httpSysForm.post(`/${USER}/delete`, data)
        },
        updatePwd(data) {
            return httpSysForm.post(`/${USER}/updatePwd`, data)
        },
        getShowTitle(params) {
            return httpSys.get(`/${USER}/getShowTitle`, {
                params
            });
        },
        clearShowField(params) {
            return httpSys.get(`/${USER}/clearShowField`, {
                params
            });
        },
        updateIsService(params) {
            return httpSys.get(`/${USER}/updateIsService`, {
                params
            });
        },
        updateIsEnable(params) {
            return httpSys.get(`/${USER}/updateIsEnable`, {
                params
            });
        },
        resetBasePwd(params) {
            return httpSys.get(`/${USER}/resetBasePwd`, {
                params
            });
        },
        listData(params) {
            return httpSys.get(`/${USER}/listData`, {
                params
            });
        },
        roleMember(params) {
            return httpSys.get(`/${USER}/roleMember`, {
                params
            });
        },
        rolesMember(params) {
            return httpSys.get(`/${USER}/rolesMember`, {
                params
            });
        },
        userInfoData(params) {
            return httpSys.get(`/${USER}/userInfoData`, {
                params
            });
        },
        listAllUserMap(params) {
            return httpSys.get(`/${USER}/listAllUserMap`, {
                params
            });
        },
        findByIds(params) {
            return httpSys.get(`/${USER}/findByIds`, {
                params
            });
        },
        listAssigndUserMap(params) {
            return httpSys.get(`/${USER}/listAssigndUserMap`, {
                params
            });
        },
        listUnAssignUserMap(params) {
            return httpSys.get(`/${USER}/listUnAssignUserMap`, {
                params
            });
        },
        uploadImg() {
            return `${baseURLSys}/${USER}/uploadImg`;
        },
        //????????????
        downloadTemplate(){
            return `${baseURLSys}/${USER}/download/template`;
        },
        downReport(){
            return `${baseURLSys}/${USER}/downReport`;
        },
        //??????????????????EXCEL
        import(){
            return `${baseURLSys}/${USER}/import`;
        },
        // /spoc-choiceschool/a/ws/sys/user/savePhoto
        // ?????????????????????????????? get
        savePhoto(params) {
            return httpSys.get(`/${USER}/savePhoto`, {
                params
            });
        },

        //POST /a/ws/sys/user/buildTmpPwd ??????????????????
        buildTmpPwd(data) {
            return httpSys.post(`/${USER}/buildTmpPwd`, data);
        },
        //??????????????????
        cover(data) {
            return httpSys.post(`/${USER}/cover`, data);
        },
        unCover(data) {
            return httpSys.post(`/${USER}/unCover`, data);
        },
        updateShowTitle(data) {
            return httpSys.post('/user/updateShowTitle?pageIdentifier=user/listData', data);
        },
        userBriefInfo(params) {
            return httpSys.get(`/${USER}/userBriefInfo`, {
                params
            });
        },
        userListRoleUser(params) {
            return httpSys.get(`/${USER}/listRoleUser`, {
                params
            });
        },


        // /a/ws/sys/user/sendVerifyCode ???????????????
        sendVerifyCode(data) {
            return httpSys.get(`/${USER}/sendVerifyCode`, {
                params: data,
            });
        },

        dataScopeFilter(data) {
            return httpSys.get(`/${USER}/dataScopeFilter`, {
                params: data,
            });
        },

        // /a/ws/sys/user/modifyPassword
        modifyPassword(data) {
            return httpSys.post(`/${USER}/modifyPassword`, data);
        },

        resetPwd(data) {
            return httpSys.post(`/${USER}/resetPwd`, data);
        },

        //????????????????????????
        exportData(params) {
            return httpSysBlob.post(`/${USER}/exportData`, params)
        },
        //????????????????????????
        exportSelected(params) {
            return httpSysBlob.post(`/${USER}/exportSelected`, params)
        },
        listDataByRole(params) {
            return httpSys.get(`/${USER}/listDataByRole`, {
                params
            });
        },
    };
}

export const sysUserForI18n = getSysUser(httpSysForm, httpSys, baseURLSys, httpSysBlob);
