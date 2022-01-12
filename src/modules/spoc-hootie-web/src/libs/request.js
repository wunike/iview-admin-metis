import { httpCreate, headersForm, httpCreateBlob } from '@public/libs/request'

import axios from 'axios';

export const baseURL = "/api/hootie/a/ws/hootie";
export const http = httpCreate(baseURL);
export const httpJWBlob = httpCreateBlob(baseURL)
export { errors, default, valid,api } from '@public/libs/request';
export { jxPointsTpl } from './jxPointsTpl';
export { jxLesson } from './jxLesson';
export { jxStudent } from './jxStudent';
export { jxLessonAudit } from './jxLessonAudit';

export { sys, sysUser, sysAttachment, sysDict, sysOffice, sysRole, sysMenu } from './sysBase';
export { common } from './common';
export { jxCourseTpl } from './jxCourseTpl.js';
export { jxStarTpl } from './jxStarTpl.js';
export { jxClassCourse } from './jxClassCourse.js';
export { jxChatMessage } from './jxChatMessage.js';
export { jxLessonStudentRel } from './jxLessonStudentRel.js';
export { jxPoints } from './jxPoints.js';
export { jxChatDialog } from './jxChatDialog.js';
export { jxMailbox } from './jxMailbox.js';
export { jxChatGroupMessage } from './jxChatGroupMessage.js';
