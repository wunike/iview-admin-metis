import {
    httpSys,
    httpSysForm,
    baseURLSys
} from './sysBase';

const ATTACHMENT = 'attachment';

export function getSysAttachment(httpSys, baseURLSys) {
    return {
        /*
        后端中转上传到云盘
        fileName：文件名
        files：文件流
        type, value = "附件类型（关联字典表)"
        fileType, value = "文件类型：images、flashs、medias、files",
        */
        uploadToPan(data) {
            const cfg = {
                timeout: 600e3
            };
            return httpSys.post(`/${ATTACHMENT}/uploadToPan`, data, cfg);
        },
        uploadToPanUrl() {
            return `${baseURLSys}/${ATTACHMENT}/uploadToPan`;
        },
        uploadFileUrl() {
            return `${baseURLSys}/${ATTACHMENT}/uploadFile`;
        },
        uploadFile(data) {
            return httpSys.post(`/${ATTACHMENT}/uploadFile`, data);
        },
        updateRemarks(data) {
            return httpSys.post(`/${ATTACHMENT}/updateRemarks`, data);
        },
        //	删除附件
        delete(params) {
            return httpSys.post(`/${ATTACHMENT}/deleteFileFromPan`, params);
        },
        //文件url
        displayUrl(id) {
            return `${baseURLSys}/${ATTACHMENT}/display?id=${id}`;
        },
        // 根据type附件列表
        findAttachmentByTypes(params) {
            return httpSys.get(`/${ATTACHMENT}/findAttachmentByTypes`, {params});
        },
        // 次课、排课列表：查看服务内容获取信息
        list(params) {
            return httpSys.get(`/${ATTACHMENT}/list`, {params});
        },
        download(params) {
            return `${baseURLSys}/${ATTACHMENT}/download?id=${params.id}&objectId=${params.objectId}&templateName=${params.templateName}&type=${params.type}`;
        },
        downloadAll(params) {
            return `${baseURLSys}/${ATTACHMENT}/downloadAll?id=${params.id}&objectIds=${params.objectIds}&templateName=${params.templateName}&type=${params.type}`;
        },
        //	删除附件
        deleteById(params) {
            return httpSys.post(`/${ATTACHMENT}/deleteById`, params);
        },
        //	保存附件
        save(params) {
            return httpSysForm.post(`/${ATTACHMENT}/save`, params);
        },
        // 合同管理 修改扫描件
        findListByTypes(params) {
            return httpSys.get(`/${ATTACHMENT}/list`, {params});
        },
        // 合同管理 修改扫描件
        findList(params) {
            return httpSys.get(`/${ATTACHMENT}/findList`, {params});
        },
    };
}

export const sysAttachment = getSysAttachment(httpSys, baseURLSys);
