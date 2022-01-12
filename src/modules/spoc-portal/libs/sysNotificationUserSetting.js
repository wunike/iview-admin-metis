import { httpSys } from './sysBase';

const k = 'sysNotificationUserSetting';

export function getSysNotificationUserSetting(httpSys) {
	return {
		//系统通知方式列表接收设置
		listNotifySetting(params){
			return httpSys.get(`/${k}/listNotifySetting`,{params});
		},
		//	保存用户接收设置
		saveUserSetting(params){
			return httpSys.post(`/${k}/saveUserSetting`,params);
		},
		//	批量操作-某个通知方式的接收设置
		batchSaveUserSetting(params){
			return httpSys.post(`/${k}/batchSaveUserSetting`,params);
		},
	};
}

export const sysNotificationUserSetting = getSysNotificationUserSetting(httpSys)
