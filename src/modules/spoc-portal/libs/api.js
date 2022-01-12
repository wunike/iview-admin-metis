import {
    httpApi,
    httpApiFrom,
    baseURLApi
} from './sysBase';


export function getApi(httpApi) {
    return {
        tenantForm(data) {
            return httpApi.get('/authority/tenant/form', {
                params: data,
            });
        },
        formDetail(data) {
            return httpApi.get('/authority/tenant/formDetail', {
                params: data,
            });
        },
        updatePolicyPermission(data) {
            return httpApi.get('/authority/tenant/updatePolicyPermission', {
                params: data,
            });
        },
        tenantInit(params) {
            return httpApi.post('/authority/tenant/init', params);
        },
        tenantListByName(data) {
            return httpApi.get('/authority/tenant/anno/listByName', {
                params: data,
            });
        },
        tenantGetShowTitle(data) {
            return httpApi.get('/authority/tenant/getShowTitle', {
                params: data,
            });
        },
        tenantPage(params) {
            return httpApi.post('/authority/tenant/listPage', params);
        },
        enums(params) {
            return httpApi.get('/authority/enums', {
                params
            });
        },
        tenantUpdateStatus(params) {
            return httpApi.post('/authority/tenant/updateStatus', params);
        },
        // updateShowTitle(pageIdentifier ,params){
        //     return post('/updateShowTitle?pageIdentifier=' + pageIdentifier, params);
        // },
        findAttachmentByBizTypesAndBizIds(data) {
            return httpApi.get('/file/attachment/findAttachmentByBizTypesAndBizIds', {
                params: data,
            });
        },
        deleteAttachment(data) {
            return httpApi.delete('/file/attachment', {
                params: data,
            });
        },
        getByDomain(data) {
            return httpApi.get('/authority/tenant/anno/getByDomain', {
                params: data,
            });
        },
        getByTenantCode(data) {
            return httpApi.get('/authority/tenant/getByTenantCode', {
                params: data,
            });
        },
        delBybiz(data) {
            return httpApi.delete('/file/attachment/biz', {
                data: data,
            });
        },
        downloadBiz(data) {
            return `${baseURLApi}/file/attachment/download/biz?bizIds[]=${data.bizId}&bizTypes[]=${data.bizType}&tenant=${data.tenant}&token=${data.token}`
        },
        // markRead(data) {
        //     return httpApi.post('/file/attachment/upload', data);
        // },
        fileAttachmentUploadUrl() {
            return `${baseURLApi}/file/attachment/upload`;
        },
        //更新状态
        updateStatus(params) {
            return httpApi.post('/authority/tenant/updateStatus', params);
        },
        //发送验证码
        send(params) {
            return httpApi.post('/msgs/anno/verification/send', params);
        },
        //验证验证码
        verification(params) {
            return httpApi.post('/msgs/anno/verification', params);
        },
        //忘记密码
        forgetPwd(params) {
            return httpApi.post('/authority/anno/forgetPwd', params);
        },
        //刷新缓存
        clearRptRule(params) {
            return httpApi.get('/crm/a/ws/crm/crmCustomer/clearRptRule', params);
        },
        //spco-h5
        personUploadvideo(params) {
            return httpApi.post('/h5/person/uploadvideo', params);
        },
        personVideos(params) {
            return httpApi.get('/h5/person/videos', {
                params
            });
        },
        commonPsdPpload(params) {
            return httpApi.post('/h5/common/psdPpload', params);
        },
        userInfo(params) {
            return httpApi.get('/h5/user/info', {
                params
            });
        },
        personUploadImage(params) {
            return httpApi.post('/h5/person/uploadImage', params);
        },
        personImages(params) {
            return httpApi.get('/h5/person/images', {
                params
            });
        },
        commonUploadFile(params) {
            return httpApi.post('/h5/common/uploadFile', params);
        },
        pageDetail(id) {
            return httpApi.get('/h5/page/detail/' + id);
        },
        pageUpdate(id, params) {
            return httpApi.post('/h5/page/update/' + id, params);
        },
        pagePublish(id, params) {
            return httpApi.post('/h5/page/publish/' + id, params);
        },
        templateShopList(params) {
            return httpApi.get('/h5/page/templateShop/list', {
                params
            });
        },
        pageCopy(id) {
            return httpApi.post('/h5/page/copy/' + id);
        },
        pageDelete(id) {
            return httpApi.delete('/h5/page/delete/' + id);
        },
        pageSetTemplate(id) {
            return httpApi.post('/h5/page/setTemplate/' + id);
        },
        pageMyTemplate(params) {
            return httpApi.get('/h5/page/myTemplate' , {params});
        },
        pageMyPagesCount(params) {
            return httpApi.get('/h5/page/myPages/count' , {params});
        },
        pageMyPages(params) {
            return httpApi.get('/h5/page/myPages' , {params});
        },
        pageAdd(params) {
            return httpApi.post('/h5/page/add' , params);
        },
        userListSearch(params) {
            return httpApi.get('/h5/user/list/search' , {params});
        },
        pageShareToUser(id, params) {
            return httpApi.post('/h5/page/shareToUser/' + id, params);
        },
        pageDeleteShareToUser(id, params) {
            return httpApi.post('/h5/page/deleteShareToUser/' + id, params);
        },
    };
}

export const api = getApi(httpApi, baseURLApi);
