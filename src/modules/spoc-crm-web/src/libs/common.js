import { httpCreate, httpCreateForm, httpCreateBlob } from '@public/libs/request';
import axios from 'axios';
import qs from 'qs';

// export const baseURLCommon = '/spoc-contract/a/ws/common';
export const baseURLCommon = '/api/common/a/ws/common';

export const httpCommonForm = httpCreateForm(baseURLCommon,[function(data, headers) {
	return qs.stringify(data);
}]);

export const httpCommon = httpCreate(baseURLCommon);


import { getCommon } from '@public/libs/common';
export const common = getCommon(httpCommon);
