import { httpCreate, httpCreateForm, httpCreateBlob} from '@public/libs/request'
import qs from 'qs';
import axios from 'axios';

export const baseURL = "/api/jw/a/ws/jw";
export const baseURLC = "/api/common/a/ws/common/jw";
export const http = httpCreate(baseURL)
export const httpForm = httpCreateForm(baseURL,[function(data, headers) {
	return qs.stringify(data);
}])
export const httpC = httpCreate(baseURLC)

export { errors, default, valid } from '@public/libs/request';

export { jwClassroom } from './jwClassroom';
export { jwManualSign } from './jwManualSign';
export { jwLesson } from './jwLesson';
export { jwClassCourse } from './jwClassCourse';
export { jwApplyLesson } from './jwApplyLesson';
export { jwAttendance } from './jwAttendance';
export { jwClassShare } from './jwClassShare';
export { jwTeacherSchedule } from './jwTeacherSchedule';
export { jwCourseConsumeLog } from './jwCourseConsumeLog';
export { jwServicePerformance } from './jwServicePerformance';

export const httpJWBlob = httpCreateBlob(baseURL)
export const httpJWBlobC = httpCreateBlob(baseURLC)
export { sys, sysUser, sysAttachment, sysDict, sysOffice, sysRole, sysMenu, sysCommonSql, sysApi } from './sysBase';
export { common, comAuditFlow } from './common';
