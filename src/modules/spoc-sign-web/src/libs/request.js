import { httpCreate, httpCreateForm, httpCreateBlob } from '@public/libs/request'
import axios from 'axios';

export const baseURL = "/api/contract/a/ws/contract";
export const baseURLC = "/api/caiwu/a/ws/cw";
export const baseURLCommon = "/api/common/a/ws/cw";
export const http = httpCreate(baseURL)
export const httpC = httpCreate(baseURLC)
export const httpCommon = httpCreate(baseURLCommon)
export const httpSignBlob = httpCreateBlob(baseURL)
export const httpCwBlob = httpCreateBlob(baseURLC)
export const httpCommonBlob = httpCreateBlob(baseURLCommon)
export {errors, default, valid, api} from '@public/libs/request';

export {htClass} from './htClass';
export {htContractTpl} from './htContractTpl';
export {htPolicy} from './htPolicy';
export {htRule} from './htRule';
export {htContract} from './htContract';
export {htContractNew} from './htContractNew';
export {account} from './account';
export {htItem} from './htItem';
export {invoice} from './invoice';
export {htAuditRule} from './htAuditRule';
export {htRecepitAccount} from './htRecepitAccount';
export {common, comAuditFlow} from './common';
export {htPresentApply} from './htPresentApply';
export {htReceipt} from './htReceipt';
export {htLeaveApply} from './htLeaveApply';
export {htValidApply} from './htValidApply';
export {htStudentAccount} from './htStudentAccount';
export {htChangeApply} from './htChangeApply';
export {htConfirmApply} from './htConfirmApply';
export {cwCapitalTrace} from './cwCapitalTrace';
export {htTranslateApply} from './htTranslateApply';
export {salerPerformance} from './salerPerformance';


export {sys, sysUser, sysAttachment, sysDict, sysOffice, sysRole, sysMenu, sysCommonSql,sysConfig} from './sysBase';
