import { httpCreate, httpCreateBlob, httpCreateForm } from '@public/libs/request';
import qs from 'qs';

export const baseURLSys = '/api/common/a/ws/sys';
export const baseURLCommon = '/api/common/a/ws/common';

export const httpSysForm = httpCreateForm(baseURLSys, [function (data, headers) {
    return qs.stringify(data);
}]);

export const httpSys = httpCreate(baseURLSys);
export const httpSysBlob = httpCreateBlob(baseURLSys);

export const httpCommon = httpCreate(baseURLCommon);
import {
    getSysCommonSql
} from '@public/libs/sysCommonSql';
export const sysCommonSql = getSysCommonSql(httpSys);
