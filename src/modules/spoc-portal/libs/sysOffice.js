import {
    httpSys,
    httpSysForm
} from './sysBase';

const OFFICE = 'office';

export function getSysOffice(httpSys, httpSysForm) {
    return {
        controlledList(params) {
            return httpSys.get(`/${OFFICE}/findCompanyList`, {
                params
            });
        },
        officeForm(params) {
            return httpSys.get(`/${OFFICE}/form`, {
                params
            });
        },
        officeListName(params) {
            return httpSys.get(`/${OFFICE}/listName`, {
                params
            });
        },
        buildSearchTree() {
            return httpSys.get(`/${OFFICE}/buildSearchTree`);
        },
        //获取机构列表
        officeList(params) {
            return httpSys.get(`/${OFFICE}/list`, {
                params
            });
        },
        //获取机构列表
        getOfficeTree(params) {
            return httpSys.get(`/${OFFICE}/buildTree`, {
                params
            });
        },
        officeListData(params) {
            return httpSys.get(`/${OFFICE}/listData`, {
                params
            });
        },
        listParentNamesById(params) {
            return httpSys.get(`/${OFFICE}/listParentNamesById`, {
                params
            });
        },
        listByName(params) {
            return httpSys.get(`/${OFFICE}/listByName`, {
                params
            });
        },
        delete(params) {
            return httpSys.get(`/${OFFICE}/delete`, {params});
        },
        saveOffice(data) {
            return httpSys.post(`/${OFFICE}/saveOffice`, data);
        },
    };
}

export const sysOffice = getSysOffice(httpSys, httpSysForm);
