import {
    httpJW,
    httpJWBlob,
    baseURLJW
} from './request'
import util from "@public/libs/js/util";

const k = '/comClassroom'
const post = (u, data) => {
    let _data = util.requestDataTrim('POST', data)
    return httpJW.post(`${k}${u}`, _data)
}
const get = (u, data) => {
    let _data = util.requestDataTrim('GET', data)
    return httpJW.get(`${k}${u}`, _data)
}

export const jwClassroom = {
    //列表
    listPage(params) {
        return post('/listPage', params)
    },
    delete(params) {
        return post('/delete', params)
    },
    save(params) {
        return post('/save', params)
    },
    changeStatus(params) {
        return get('/changeStatus', {
            params
        })
    },
    //获取教室展示列
    getShowTitle(params) {
        return get('/getShowTitle', {
            params
        })
    },
    clearShowField(params) {
        return get('/clearShowField', {
            params
        })
    },
    //更新教室展示列
    updateShowTitle(params) {
        // debugger;
        return post('/updateShowTitle?pageIdentifier=jwClassroom', params)
    },
    
    // 导入不覆盖教室信息
    unCover(params) {
        return post('/unCover', params)
    },
    // 导入数据覆盖教室信息
    cover(params) {
        return post('/cover', params)
        // return `${baseUrl}/import/cover`
    },
    // 下载导入模板
    template(params) {
        // debugger
        // return `${baseURLJW}${k}/import/template`
        return httpJWBlob.get(`${k}/import/template`, {
            params
        })
    },
    // 教室批量导入
    importMore(params) {
        // return post('/import', params);
        return `${baseURLJW}${k}/import`
    },
    // 下载错误报告
    downReport(params) {
        // return get('/downReport', { params })
        // return `${baseURLJW}${k}/downReport`
        return httpJWBlob.get(`${k}/downReport`, {
            params
        })
    },
    // 导出全部
    exportAll(params) {
        return httpJWBlob.post('/comClassroom/export', params)
    },
    // 导出所选
    exportSelected(params) {
        return httpJWBlob.post('/comClassroom/exportSelected', params)
    },
    export(params) {
		return httpJWBlob.post('/comClassroom/export', params)
	},
}
