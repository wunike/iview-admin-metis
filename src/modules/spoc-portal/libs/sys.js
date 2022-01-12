import {
    httpSys,
    baseURLSys
} from './sysBase';


export function getSys(httpSys) {
    return {
        logout() {
            return httpSys.get('/logout');
        },

        // 上传
        userListPageImportReports(params) {
            return httpSys.get(`/importReport/listPage`, {
                params
            });
        },

        // 新消息 获取
        listUserNotify(data) {
            return httpSys.get('/sysNotification/listUserNotify', {
                params: data,
            });
        },
        //站内消息标记
        markRead(data) {
            return httpSys.post('/sysNotification/markRead', data);
        },

        convertForm(id){
            return httpSys.get('/convert/form',{params:{id}});
        },

        listLocation(params){
            return httpSys.get('/Area/listLocation',{params});
        },

        findByName(params){
            return httpSys.get('/Area/findByName',{params});
        },
        form(params){
            return httpSys.get('/attachment/form',{params});
        },
        uploadStsToken(params){
            return httpSys.get('/upload/stsToken',{params});
        },

    };
}

export const sys = getSys(httpSys, baseURLSys);
