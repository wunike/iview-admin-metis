import {
    httpSys,
} from './sysBase';

const SQL = 'commonSql';

export function getSysCommonSql(httpSys) {
    return {
         //	联系人  跟进人
        queryPageInputInitData(params) {
            return httpSys.post(`/${SQL}/queryPageInputInitData`, params);
        },
        //介绍人接口  客户姓名 会员
        querySingleTableData(params) {
            return httpSys.post(`/${SQL}/querySingleTableData`, params)
        },
    };
}

export const sysCommonSql = getSysCommonSql(httpSys);
