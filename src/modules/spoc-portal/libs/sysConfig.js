import { httpSys } from './sysBase';

const k = 'sysConfig';

export function getSysConfig(httpSys) {
	return {
		//保存
		save(params){
			return httpSys.post(`/${k}/save`, params)
		},
		//列表
		getList(params){
			return httpSys.get(`/${k}/form`, {params})
		},
		// 系统通知方式列表
		listNotifySetting(params){
			return httpSys.get(`/${k}/listNotifySetting`, {params});
		},
		// 系统通知方式设置-批量设置
		batchNotifySetting(params){
			return httpSys.post(`/${k}/batchNotifySetting`, params);
		},
		// 系统通知方式设置
		notifySetting(params){
			return httpSys.post(`/${k}/notifySetting`, params);
		},
		// 接收者设置信息
		receiptConfig(params){
			return httpSys.get(`/${k}/receiptConfig`, {params});
		},
		// 接收者设置
		saveReceiptConfig(params){
			return httpSys.post(`/${k}/saveReceiptConfig`, params);
		},
		// 获取系统配置
		getConfig(params){
			return httpSys.get(`/${k}/getConfig`, {params});
		},
		// 更新系统配置
		updateConfig(params){
			return httpSys.post(`/${k}/updateConfig`, params);
		},
        // crm配置按钮
        getConfigSub(params){
            return httpSys.get(`/${k}/getConfigSub`, {params});
        },
        //获取工作台配置信息
        form(params){
            return httpSys.get(`/${k}/form`, {params})
        },
        //根据中文获取首字母
        findBusinShortName(params){
            return httpSys.get(`/${k}/findBusinShortName`, {params})
        },

	};
}

export const sysConfig = getSysConfig(httpSys)
