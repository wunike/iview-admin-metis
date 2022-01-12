import {
	http,
    baseURL,
    httpCrmBlob
} from "./request";
const k = '/crmCustomer'
const post = (u, data) => {
	return http.post(`${k}${u}`, data);
};

const get = (u, data) => {
	return http.get(`${k}${u}`, data);
};
export const crmCustomer = {
	//查询电话号码归属地
	// listPage(params) {
	// 	return post('/listPage', params)
	// },
    //修改客户判重规则    get接口
    updateRptRule(params) {
		return get('/updateRptRule', { params })
    },
    //获取客户判重规则    get接口
    getRptRule(params) {
		return get('/getRptRule', { params })
    },
	// 获取当前状态绑定的操作权限
	getEventByState(params) {
		return get('/getEventByState', { params })
    },
    // 获取所有状态的禁用操作
	findStateDisableOperate(params) {
		return get('/findStateDisableOperate', { params })
	},
	// 查询电话号码归属地
	findPhonePlace(params) {
		return get('/anno/findPhonePlace', { params })
	},
	// 查询所有国家的电话区号
	getCountryCode(params) {
		return get('/getCountryCode', { params })
	},
    //查询电话归属的客户
    getCustomerByPhone(params){
		return get('/anno/getCustomerByPhone', { params })
    },
    //保存客户
    save(params) {
		return post('/save', params)
	},
    //根据会员名称获取会员信息
    form(params) {
        return get('/form', {params})
    },
    //保存登记会员
    saveEnrollCustomer(params) {
        return post('/saveEnrollCustomer', params)
    },
    //查询姓名和电话归属的唯一客户
    getCustomerByRPTRule(params) {
        return post('/getCustomerByRPTRule', params)
    },
    saveUnLoginEnrollCustomer(params) {
        return post('/anno/saveUnLoginEnrollCustomer', params)
    },
    listPageManage(params) {
        return post('/listPageManage', params)
    },
    	// 客户下载导入模板
	template(params) {
        // return `${baseURL}${k}/downloadTemplate`
        return httpCrmBlob.get(`${k}/downloadTemplate`, {params})
	},
	// 客户导入
	import(params) {
		return `${baseURL}${k}/importFile`
	},
	// 客户下载EXCEL导入模板中重复的模板数据
	downloadExcelRptInfo(params) {
		return `${baseURL}${k}/downloadExcelRptInfo`
	},
	// 客户下载EXCEL错误报告
	downReport(params) {
        // return `${baseURL}${k}/downReport`
        return httpCrmBlob.get(`${k}/downReport`, {params})
    },
    // 活动会员导入报名模板下载
    downloadExcelActivityMemberEnroll(params) {
        // return `${baseURL}${k}/downloadExcelActivityMemberEnroll`
        return httpCrmBlob.get(`${k}/downloadExcelActivityMemberEnroll`, {params})
    },
        // 导入活动会员报名
    importActivityMemberFile(params) {
        return `${baseURL}${k}/importActivityMemberFile`
    },
    // 下载活动会员报名导入重复模板
    downloadActivityMemberExcelRptInfo(params) {
        return `${baseURL}${k}/downloadActivityMemberExcelRptInfo`
    },
    // 下载活动会员导入错误报告EXCEL
    downActivityMemberReport(params) {
        return `${baseURL}${k}/downActivityMemberReport`
    },
     //下载活动非会员报名导入模板
    downloadTemplate(params) {
        return httpCrmBlob.get(`${k}/downloadTemplate`, {params})
        // return `${baseURL}${k}/downloadTemplate`
    },
        // 导入活动非会员报名
    importActivityNoMemerFile(params) {
        return `${baseURL}${k}/importActivityNoMemerFile`
    },
    // 下载重复资源数据导入模板
    downloadActivityNoMemberExcelRptInfo(params) {
        return `${baseURL}${k}/downloadActivityNoMemberExcelRptInfo`
    },
     //下载活动资源导入错误报告EXCEL
    downActivityNoMemberReport(params) {
        return `${baseURL}${k}/downActivityNoMemberReport`
    },
    //客户列表
    listPage(params) {
        return post('/listPage', params)
    },
    //获取动态显示列
    getShowTitle(params){
        return get('/getShowTitle', {params})
    },
    //获取动态显示列
    clearShowField(params){
        return get('/clearShowField', {params})
    },
    //更新动态显示列
    updateShowTitle(pageIdentifier ,params){
        return post('/updateShowTitle?pageIdentifier=' + pageIdentifier, params);
    },
    //客户列表tabs
    listStateGroup(params) {
        return post('/listStateGroup', params)
    },
    showPhoneList(params) {
        return get('/showPhoneList', {params})
    },
    //导出
    export(params) {
        return httpCrmBlob.post(`${k}/export`, params)
    },
    findStudentBirthday(params, config={}) {
        return get('/findStudentBirthday', Object.assign({ params },config))
    },
    getClassByStudentId(params) {
        return get('/getClassByStudentId', {params})
    },
    //置顶\取消置顶
    updateTopFlag(params) {
        return post('/updateTopFlag', params)
    },
}
