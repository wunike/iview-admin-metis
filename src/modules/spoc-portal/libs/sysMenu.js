import {
    httpSys,
    httpSysForm
} from './sysBase';

const MENU = 'menu';

export function getSysMenu(httpSys,httpSysForm) {
    return {
        listMenuData(params) {
            return httpSys.get(`/${MENU}/listMenuData`, {
                params
            });
        },
        listData(params) {
            return httpSys.get(`/${MENU}/listData`, {
                params
            });
        },
        listGrantMenu(params) {
            return httpSys.get(`/${MENU}/listGrantMenu`, {
                params
            });
        },
        listGrantAllMenu() {
            return httpSys.get(`/${MENU}/listGrantAllMenu?id=0&name=portal.index`);
        },
        listMenu(params) {
            return httpSys.get(`/${MENU}/listMenu`,{
                params
            });
        },
        meunLists(params) {
            return httpSys.get(`/${MENU}/list`, {
                params
            });
        },
        findMenu(params) {
            return httpSys.get(`/${MENU}/findMenu`, {
                params
            });
        },
        menuGetById(params) {
            return httpSys.get(`/${MENU}/getById`, {
                params
            });
        },
        meunSort(params) {
            return httpSys.post(`/${MENU}/sort`, params);
        },
        saveMenu(params) {
            return httpSysForm.post(`/${MENU}/saveMenu`, params);
        },
        deleteMenu(params) {
            return httpSysForm.post(`/${MENU}/delete`, params);
        },
        sortMenu(params) {
            return httpSysForm.post(`/${MENU}/sortMenu`, params);
        },
        saveQuickMenu(id, isQuick, type){
            return httpSys.post(`/${MENU}/saveQuickMenu`, { id, isQuick, type })
        },
        findMenuByMenuIds(params) {
            return httpSys.get(`/${MENU}/findMenuByMenuIds`, {
                params
            });
        },
    };
}

export const sysMenu = getSysMenu(httpSys, httpSysForm);
