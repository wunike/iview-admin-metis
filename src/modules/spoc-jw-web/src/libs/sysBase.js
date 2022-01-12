import { httpCreate, httpCreateForm, httpCreateBlob } from '@public/libs/request';
import axios from 'axios';
import qs from 'qs';

export const baseURLSys = '/api/common/a/ws/sys';

export const httpSysForm = httpCreateForm(baseURLSys, [function (data, headers) {
	return qs.stringify(data);
}]);

export const httpSys = httpCreate(baseURLSys);



import { getSys } from '@public/libs/sys';
export const sys = getSys(httpSys, baseURLSys);

import { getSysAttachment } from '@public/libs/sysAttachment';
export const sysAttachment = getSysAttachment(httpSys, baseURLSys);

import { getSysDict } from '@public/libs/sysDict';
export const sysDict = getSysDict(httpSys);

import { getSysMenu } from '@public/libs/sysMenu';
export const sysMenu = getSysMenu(httpSys);

import { getSysOffice } from '@public/libs/sysOffice';
export const sysOffice = getSysOffice(httpSys);

import { getSysRole } from '@public/libs/sysRole';
export const sysRole = getSysRole(httpSys);

import { getSysUser } from '@public/libs/sysUser';
import { getSysCommonSql } from '@public/libs/sysCommonSql';
import { getApi } from '@public/libs/api';
export const sysCommonSql = getSysCommonSql(httpSys);
export const sysUser = getSysUser(httpSysForm, httpSys, baseURLSys);
export const sysApi = getApi(httpSys, baseURLSys);

