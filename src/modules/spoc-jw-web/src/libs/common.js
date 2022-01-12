import { httpCreate, httpCreateForm, httpCreateBlob } from '@public/libs/request';
import qs from 'qs';

import axios from 'axios';


export const baseURLCommon = '/api/common/a/ws/common';
export const baseURLCommonSelf = '/api/jw/a/ws/common';

export const httpCommonForm = httpCreateForm(baseURLCommon, [function (data, headers) {
	return qs.stringify(data);
}]);

export const httpCommon = httpCreate(baseURLCommon);
export const httpCommonSelf = httpCreate(baseURLCommonSelf);

import { getCommon } from '@public/libs/common';
export const common = getCommon(httpCommon);

import { getComAuditFlow } from '@public/libs/comAuditFlow';
export const comAuditFlow = getComAuditFlow(httpCommonSelf);
