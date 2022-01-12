import axios from 'axios'
import store from '@/store'
import $config from "@/config";
import QS from 'qs';
import router from '../router'

export const httpCreate = (baseURL, transformRequest) => {
	const config = {};
	if(transformRequest) {
		config.transformRequest = transformRequest;
	}
    let headers={
        'Content-Type':'application/json;charse=UTF-8'
    }
	let request = axios.create(Object.assign({
		baseURL,
		timeout: 1200000,
		withCredentials: true,
		headers,
	}, config));
    //请求拦截器
    request.interceptors.request.use(config => {
        // config.headers.token = store.getters.authorization;
        config.headers.tenant = '0000';
        return config
    }, error => {
        return Promise.reject(error)
    });
    //响应拦截器即异常处理
    request.interceptors.response.use(response => {
        if (response.data.status || response.data.isSuccess) {
            return Promise.resolve(response.data)
        } else {
            store.dispatch('showMassage', {
                type: 'error',
                message: response.data.message || response.data.msg || response.data.errMsg
            });
            if (response.data.code == 40001) {
                router.push('/login')
            }
            return Promise.reject(response)
        }
    }, err => {
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = '错误请求';
                    break;
                case 401:
                    err.message = '未授权，请重新登录';
                    store.dispatch('goLogin');
                    break;
                case 403:
                    err.message = '没有访问权限，拒绝访问';
                    break;
                case 404:
                    err.message = '请求错误,未找到该资源';
                    break;
                case 405:
                    err.message = '请求方法未允许';
                    break;
                case 408:
                    err.message = '请求超时';
                    break;
                case 500:
                    err.message = err.response.data.message || '服务器异常';
                    break;
                case 501:
                    err.message = '网络未实现';
                    break;
                case 502:
                    err.message = '网络错误';
                    break;
                case 503:
                    err.message = '服务不可用';
                    break;
                case 504:
                    err.message = '网络超时';
                    break;
                default:
                    err.message = `连接错误${err.response.msg}`
            }
        } else {
            err.message = "连接到服务器失败"
        }
        store.dispatch('showMassage', {
            type: 'error',
            data: err.message || err.response.msg
        });

        return Promise.reject(err.response)
    });

	return request
};
let baseURLH5='';
// 线上环境配置axios.defaults.baseURL，生产环境则用proxy代理
if (process.env.VUE_APP_ENV_NAME !== 'development') {
    // baseURLH5 = $config.baseURL;
}
const httpH5 = httpCreate(baseURLH5);
/**
 * 下载文件
 */
let downloadFile = (url) => {
    window.open(url)
};
export default {
    //get请求
    get(url, param, responseType, header) {
        return httpH5({
            method: 'get',
            url,
            headers: {
                ...(header || {})
            },
            responseType: responseType,
            params: param || {},
        })
    },
    //post请求
    post(url, param, header) {console.log(header,url)
        return httpH5({
            method: 'post',
            url,
            headers: {
                ...(header || {}),
                'Content-Type': 'application/json;charse=UTF-8'
            },
            data: param || {},
        })
    },
    postFormData(url, params, header) {
        return httpH5({
            method: 'post',
            url,
            headers: {
                ...(header || {}),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: QS.stringify(params) || {},
        })
    },
    //post请求
    put(url, param, header) {
        return httpH5({
            method: 'put',
            url,
            headers: {
                ...(header || {}),
                'Content-Type': 'application/json;charse=UTF-8'
            },
            data: param || {},
        })
    },
    // delete
    delete(url, param, header) {
        return httpH5({
            method: 'delete',
            url,
            headers: {
                ...(header || {})
            },
            params: param || {},
        })
    },
    // 此方法非promise 导出文件
    getFile(url, params) {
        let tempParams = {
            ...(params || {})
        }
        // 拼接下载地址
        let list = [];
        for (let key in tempParams) {
            list.push(key.toString() + '=' + tempParams[key]);
        }
        url = $config.baseURL + url + '?' + list.join('&');
        url = encodeURI(url);
        downloadFile(url);
    }
}
