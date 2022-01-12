import {
    http,
    baseURL,
    httpSignBlob
} from "./request";
const k = '/htContract'
const post = (u, data) => {
    return http.post(`${k}${u}`, data);
};

const get = (u, data) => {
    return http.get(`${k}${u}`, data);
};

export const htContract = {
    againPDF(params) {
        return get('/againPDF', {params})
    },
    finishContract(params) {
        return post('/finishContract', params)
    },
    attornContract(params) {
        return post('/attornContract', params)
    },
    audit(params) {
        return post('/audit', params)
    },
    findByEcId(params) {
        return get('/findByEcId', {
            params
        })
    },
    getPdfConverterProgress(params) {
        return get('/getPdfConverterProgress', {
            params
        })
    },
    // 获取下载扫描件必要参数
    getConAttBaseInfo(params) {
        return get('/getConAttBaseInfo', {
            params
        })
    },
    findItemListData(params) {
        // return get('/findItemListData', {
        // 	params
        // })
        return http.get(`/htContractNew/findItemListData`, {params});
    },
    delete(params) {
        return get('/delete', {
            params
        })
    },
    contractOperate(params) {
        return get('/contractOperate', {
            params
        })
    },
    approvalList(params) {
        return get('/approvalList', {
            params
        })
    },
    studentList(params) {
        return get('/studentList', {
            params
        })
    },
    getXq(params) {
        return get('/getXq', {
            params
        })
    },
    getOffice(params) {
        return get('/getOffice', {
            params
        })
    },
    getEcId(params) {
        return get('/getEcId', {
            params
        })
    },
    //添加或修改合同
    form(params) {
        return get('/form', {
            params
        })
    },
    formOld(params) {
        return get('/formOld', {
            params
        })
    },
    saveData(params){
        return post('/saveData', params)
    },
    //合同列表
    list(params) {
        return get('/list', {
            params
        })
    },
    //我的合同-获取预约/签约信息
    formSign(params) {
        return get('/formSign', {
            params
        })
    },
    //关闭合同
    closeContract(params) {
        return post('/closeContract', params)
    },
    //预约签约
    expect(params) {
        return post('/expect', params)
    },
    //我的合同-立即签约
    sign(params) {
        return post('/sign', params)
    },
    save(data) {
        // return post('/save', data)
        return http.post(`/htContractNew/save`, data);
    },
    preview(data) {
        // return post('/preview', data)
        return http.post(`/htContractNew/preview`, data);
    },
    formPreview(params) {
        return get('/formPreview', {
            params
        })
    },
    downloadUrl(id) {
        return `${baseURL}${k}/download?id=${id}`;
    },
    //催办
    urgeAudit(params) {
        return post('/urgeAudit', params)
    },
    //合作合同
    listPartnerShip(params) {
        return get('/listPartnerShip', {
            params
        })
    },
    //取消关闭
    cancelCloseContract(params) {
        return post('/cancelCloseContract', params)
    },
    //我的合同-获取存档
    formArchive(params) {
        return get('/formArchive', {
            params
        })
    },
    //立即存档
    archive(params) {
        return post('/archive', params)
    },
    //日志
    listOptLog(params) {
        return get('/listOptLog', {
            params
        })
    },
    //发送家长
    sendEmailAudit(params) {
        return post('/sendEmailAudit', params)
    },
    //电子改造
    seal(params) {
        return post('/seal', params)
    },
    //发送家长-时效检查
    urlCheck(params) {
        return get('/urlCheck', {
            params
        })
    },
    //发送家长-获取文件
    pdfview(params) {
        return `${baseURL}${k}/pdfview?${params}`;
    },
    //PDF
    displayUrl(params) {
        return `${baseURL}${k}/anno/display?id=${params.id}&type=${params.type}&tenant=${params.tenant}`;
    },
    //pwPDF
    previewDisplayUrl(params) {
        return `${baseURL}${k}/previewDisplay?id=${params}`;
    },
    calculteContract(params) {
        return post('/calculteContract', params);
    },
    handover(params) {
        return post('/handover', params);
    },
    checkPhone(phone, apply) {
        return get('/checkPhone', {
            params: {
                phone,
                apply
            }
        });
    },

    // 下载扫描件
    downloadSignReceipt(params) {
        return `${baseURL}${k}/downloadScan?type=${params.type}&objectId=${params.objectId}&templateName=${params.templateName}`;
    },

    // 导出全部合同数据
    exportAllSign(obj) {
        return (
            `${baseURL}${k}/export?isArchived=${obj.isArchived}&companyIds=${obj.companyIds}&name=${obj.name}&status=${obj.status}&timeType=${obj.timeType}&startTime=${obj.startTime}&endTime=${obj.endTime}&isPartner=${obj.isPartner}&orderBy=${obj.orderBy}&from=2&timePrecision=${obj.timePrecision}`
        )
    },
    // 导出全部合同
    exportContract1(obj) {
        return (
            `${baseURL}${k}/exportContractFile?createEndDate=${obj.createEndDate}&createStartDate=${obj.createStartDate}&ctName=${obj.ctName}&ctNo=${obj.ctNo}&ctStatus=${obj.ctStatus}&officeIds=${obj.officeIds}&orderByStatus=${obj.orderByStatus}&orderByType=${obj.orderByType}&receiptStatus=${obj.receiptStatus}&sellerIds=${obj.sellerIds}&signEndDate=${obj.signEndDate}&signStartDate=${obj.signStartDate}&studentName=${obj.studentName}&signType=${obj.signType}`
        )
    },
    exportContract(params){
        return httpSignBlob.post(`${k}/exportContractFile`, params)
    },
    // 导出全部课程包
    exportKCB1(obj) {
        return (
            `${baseURL}${k}/exportKcbFile?createEndDate=${obj.createEndDate}&createStartDate=${obj.createStartDate}&ctName=${obj.ctName}&ctNo=${obj.ctNo}&ctStatus=${obj.ctStatus}&officeIds=${obj.officeIds}&orderByStatus=${obj.orderByStatus}&orderByType=${obj.orderByType}&receiptStatus=${obj.receiptStatus}&sellerIds=${obj.sellerIds}&signEndDate=${obj.signEndDate}&signStartDate=${obj.signStartDate}&studentName=${obj.studentName}&signType=${obj.signType}`
        )
    },
    exportKCB(params){
        return httpSignBlob.post(`${k}/exportKcbFile`, params)
    },
    // 导出所选合同数据(已签约)
    exportSelectSign(obj) {
        return (`${baseURL}${k}/exportSelected?ids=${obj.ids}`)
    },
    // 导出所选合同
    exportSelectContract1(obj) {
        return (`${baseURL}${k}/exportContractFile?ids=${obj.ids}`)
    },
    exportSelectContract(params){
        return httpSignBlob.post(`${k}/exportContractFile`, params)
    },
    // 导出所选课程包
    exportSelectKCB1(obj) {
        return (`${baseURL}${k}/exportKcbFile?ids=${obj.ids}`)
    },
    exportSelectKCB(params){
        return httpSignBlob.post(`${k}/exportKcbFile`, params)
    },
    // 导出所选合同数据(待签约)
    exportSelectSignWait(obj) {
        return (`${baseURL}${k}/exportCommittedSelected?ids=${obj.ids}`)
    },
    // 下载收据  /a/ws/contract/account/download?objectId=5dd061ee34294dc092423132e252d551&templateName=收据
    downloadSignReceiptPut(params) {
        return (`${baseURL}${k}/downloadScrip?objectId=${params.objectId}&templateName=${params.templateName}`);
    },
    //获取合同管理设置显示列显示的字段
    getShowTitle(params) {
        return get('/getShowTitleOld', {
            params
        })
    },
    clearShowField(params) {
        return get('/clearShowField', {
            params
        })
    },
    //更新合同管理列表显示的字段
    updateShowTitle(pageIdentifier,params) {
        return post(`/updateShowTitleOld?pageIdentifier=${pageIdentifier}`, params)
    },
    //合同列表(新)
    listPage(params) {
        return post('/listPage', params)
    },
    //合同管理列表(新)
    listPageManage(params) {
        return post('/listPageManage', params)
    },
    //合同列表(新)-数据汇总
    listPageCount(params) {
        return post('/listPageCount', params)
    },
    //获取学员合同和课程信息
    listContractsAndCourses(params) {
        return get('/listContractsAndCourses', {
            params
        })
    },
    //获取课程列表
    listCourses(params) {
        return get('/listCourses', {
            params
        })
    },
    listContractsWithJwTeacher(params) {
        return get('/listContractsWithJwTeacher', {
            params
        })
    },
    //合同详情简要信息
    getContractInformation(params) {
        return get('/getContractInformation', {
            params
        })
    },
    //合同详情使用情况
    getContractServiceCondition(params) {
        return get('/getContractServiceCondition', {
            params
        })
    },
    //合同详情信息
    getContractDetailInfo(params) {
        return get('/getContractDetailInfo', {
            params
        })
    },
    //合同详情操作记录
    listPageOptLog(params) {
        return get('/listPageOptLog', {
            params
        })
    },
    //合同被驳回数量
    getRejectCount(params) {
        return post('/getRejectCount', params)
    },
    
    associateScanAttachment(params) {
        return get('/associateScanAttachment', {
            params
        })
    },
     //作废合同
    invalidContract(params) {
        return get('/invalidContract', {
            params
        });
    },
     //获取是否有合同可以下载打印
     getContractFileExist(params) {
        return get('/getContractFileExist', {
            params
        });
    },
}
