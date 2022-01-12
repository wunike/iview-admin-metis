import Vue from 'vue';
import { httpCreate, httpCreateForm, httpCreateBlob } from '@public/libs/request'
export {
    sys,
    sysUser,
    sysRole,
    sysDict,
    sysMenu,
    sysOffice,
    SysProps,
    sysConfig,
    sysAttachment,
    api,
    errors
}
from '@public/libs/request'
export {
    jwClassroom
}
from './jwClassroom'
export {
    jwCourse
}
from './jwCourse'
export {
    sysUserForI18n
}
from './sysUserForI18n' //单独为国际化获取头准备

export {common, comAuditFlow} from './common'
let _i18n_vue = new Vue();
const $t = _i18n_vue.$t.bind(_i18n_vue);
let flag = true;
const loginRouter = 'portal.login'

export const baseURLJW = '/api/common/a/ws/common/jw'
export const baseURLJWSys = '/api/common/a/ws/sys'

export const httpJW = httpCreate(baseURLJW)
export const httpJWBlob = httpCreateBlob(baseURLJW)

export const httpJWSys = httpCreate(baseURLJWSys)
export const httpJWBlobSys = httpCreateBlob(baseURLJWSys)

let timmer = null
export default function() {
    this.$Message.config({
        top: 132,
        duration: 3
    })
    return res => {
        if (res.data) {
            if (res.data.status == 'login') {
                if (this.$route.name != loginRouter) {
                    this.$router.push({
                        name: loginRouter
                    })
                }
            } else if (res.data.status == 'error' || res.data.status == 'authority' || (res.data.code && res.data.code < 0)) {
                let message = res.data.message || res.data.msg
				if(timmer){
					clearTimeout(timmer)
					timmer = null
				}
				timmer = setTimeout(() => {
					if(message.indexOf('电话已存在') > -1) {
						//BUG #2085
						this.$Message.error({
							content: message,
							duration: 6
						});
					} else {
						this.$Message.error({
							content: message,
							duration: 4
						});
					}
				}, 1000);
            } else if (res.data.status == 'location') {
                location.href = res.data.location
            } else if (res.data.status == 'success') {
                res.ok = true
            } else if(res.data.code == 200 || res.data.code == 0) {
				res.ok = true;
			} else {
                res.ok = false;
                console.error('unknow status')
            }
        }
        return res
    }
}

const baseURLCRM = '/api/crm/a/ws/crm'
const httpCRM = httpCreate(baseURLCRM)

// 绑定外部系统账号
export const bindAccount = params => {
    return httpCRM.post('/crmAccountMap/bindAccount', params)
}

// 获取外部系统账号
export const getExternalSystemAccount = params => {
    return httpCRM.get('/crmAccountMap/getExternalSystemAccount', {
        params
    })
}

// 解除绑定外部系统账号
export const unBindAccount = params => {
    return httpCRM.post('/crmAccountMap/unBindAccount', params)
}

export {
    sysCommonSql,
}
from './sysBase';
