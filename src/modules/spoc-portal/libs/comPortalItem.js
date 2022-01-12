import { httpSysPortal } from "./sysBase";
import util from "@public/libs/js/util";
const k = '/comPortalItem'
const post = (u, data) => {
	let _data = util.requestDataTrim('POST', data)
	return httpSysPortal.post(`${k}${u}`, _data);
};

const get = (u, data) => {
	let _data = util.requestDataTrim('GET', data)
	return httpSysPortal.get(`${k}${u}`, _data);
};


export const comPortalItem = {
	findPortalItemList(params) {
		return post(`/findPortalItemList`, params)
	},
	save(params) {
		return post(`/save`, params)
    },
    updatePortalItem(params) {
		return post(`/updatePortalItem`, params)
    },
    findRelevancyInfo(params) {
		return post(`/findRelevancyInfo`, params)
    },
}
