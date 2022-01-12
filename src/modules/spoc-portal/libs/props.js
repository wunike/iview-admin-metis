import {
    httpSys,
} from './sysBase';

const p = 'props';

export function getProps(httpSys) {
    return {
        menuList(params) {
            return httpSys.get(`/${p}/menuList`, {params});
        },
        saveSingle(params) {
            return httpSys.post(`/${p}/saveSingle`, params);
        },
        list(params) {
            return httpSys.get(`/${p}/list`, {params});
        },
        deleteById(params) {
            return httpSys.get(`/${p}/deleteById`, {params});
        },
        saveSort(params) {
            return httpSys.post(`/${p}/saveSort`, params);
        },
    };
}

export const SysProps = getProps(httpSys);
