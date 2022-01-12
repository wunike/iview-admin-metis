import {
    httpSysForm,
    httpSys,
    baseURLSys,
    httpSysBlob
} from './sysBase';

const USER = 'user';

export function getSysUser(httpSysForm, httpSys, baseURLSys, httpSysBlob) {
    return {
        dataScopeFilterTree(data){
            return httpSysForm.get(`/${USER}/dataScopeFilterTree`, {data})
        },
        userUpdate(data) {
            return httpSysForm.post(`/${USER}/update`, data)
        },
        updateRole(data) {
            return httpSysForm.post(`/${USER}/updateRole`, data)
        },
        saveUser(data) {
            return httpSys.post(`/${USER}/save`, data)
        },
        saveEmployee(data) {
            return httpSys.post(`/${USER}/saveEmployee`, data)
        },
        deleteEmployees(data) {
            return httpSys.get(`/${USER}/deleteEmployees`, {params:data})
        },
        formUser(params) {
            return httpSys.get(`/${USER}/form`, {
                params
            })
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
        listPage(params) {
            return httpSys.post(`/${USER}/listPage`,
                params
            );
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
        //下载模板
        downloadTemplate(params) {
            // return `${baseURLSys}/${USER}/download/template`;
            return httpSysBlob.get(`${USER}/download/template`, {
                params
            })
        },
        downReport() {
            // return `${baseURLSys}/${USER}/downReport`;
            return httpSysBlob.get(`${USER}/downReport`, {
                params
            })
        },
        //导入用户数据EXCEL
        import() {
            return `${baseURLSys}/${USER}/import`;
        },
        // /spoc-choiceschool/a/ws/sys/user/savePhoto
        // 绑定头像地址到用户， get
        savePhoto(params) {
            return httpSys.get(`/${USER}/savePhoto`, {
                params
            });
        },

        //POST /a/ws/sys/user/buildTmpPwd 生成临时密码
        buildTmpPwd(data) {
            return httpSys.post(`/${USER}/buildTmpPwd`, data);
        },
        //覆盖用户信息
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


        // /a/ws/sys/user/sendVerifyCode 获取验证码
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
        annoResetPwd(data) {
            return httpSys.post(`/${USER}/anno/resetPwd`, data);
        },
        generateUserNo(params) {
            return httpSys.get(`/${USER}/generateUserNo`, {
                params
            });
        },
        //导出全部用户数据
        exportData(params) {
            return httpSysBlob.post(`/${USER}/exportData`, params)
        },
        //导出所选用户数据
        exportSelected(params) {
            return httpSysBlob.post(`/${USER}/exportSelected`, params)
        },
        listDataByRole(params) {
            return httpSys.get(`/${USER}/listDataByRole`, {
                params
            });
        },
        listPageOfficeScopeUser(params) {
            return httpSys.get(`/${USER}/listPageOfficeScopeUser`, {params});
        },
        //获取用户列表
        listRoleUser(params) {
            return httpSys.get(`/${USER}/listRoleUser`, {
                params
            });
        },
        updateQuickMenu(params) {
            return httpSys.post(`/${USER}/updateQuickMenu`, params)
        },
    };
}

export const sysUser = getSysUser(httpSysForm, httpSys, baseURLSys, httpSysBlob);
