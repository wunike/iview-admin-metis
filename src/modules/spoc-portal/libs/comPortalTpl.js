import { httpSysPortal } from "./sysBase";
import util from "@public/libs/js/util";
const k = '/comPortalTpl'
const post = (u, data) => {
	let _data = util.requestDataTrim('POST', data)
	return httpSysPortal.post(`${k}${u}`, _data);
};

const get = (u, data) => {
	let _data = util.requestDataTrim('GET', data)
	return httpSysPortal.get(`${k}${u}`, _data);
};


export const comPortalTpl = {
    // 门户模板VO列表
	listPage(params) {
		return post(`/listPage`, params)
    },
    // 保存门户模板
	save(params) {
		return post(`/save`, params)
    },
    // 操作门户模板(发布、取消发布、删除)
    updatePortalItem(params) {
		return post(`/updatePortalItem`, params)
    },
    // 获取门户模板可用角色
    findUsableRole(params) {
		return get(`/findUsableRole`, {params})
    },
    // 获取门户模板详细信息（模板编辑/制作）
    findPortalDetail(params) {
		return post(`/findPortalDetail`, params)
    },
    savePortal(params) {
		return post(`/savePortal`, params)
    },
    findUserPortal(params) {
		return get(`/findUserPortal`, {params})
    },
}
