import { httpCreate, httpCreateForm, httpCreateBlob} from '@public/libs/request'

import axios from 'axios';
import config from '@/config'
export const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

export const baseURL = baseUrl + "/api/report/a/ws";
// export const baseURL = "/spoc-contract/a/ws/contract";
export const http = httpCreate(baseURL);
export const httpReportBlob = httpCreateBlob(baseURL)
export {
    errors,
    default,
    valid,
    // report
}
from '@public/libs/request';
export {
    sys,
    sysUser,
    sysAttachment,
    sysDict,
    sysOffice,
    sysRole,
    sysMenu,
    sysCommonSql,
    sysProps,
    sysConfig,
}
from './sysBase';
export {
    common, comArchiveSchedule
}
from './common';
export {
    report
}
from './report';

export {rptRefundArchive} from './rptRefundArchive'
export {rptCentralArchive} from './rptCentralArchive'
export {rptArchiveSchedule} from './rptArchiveSchedule'
export {rptDataMigarate} from './rptDataMigarate'
