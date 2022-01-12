import {
    httpSys,
} from './sysBase';

const DICT = 'dict';

export function getSysDict(httpSys) {
    return {
        //TODO 将要废除 ， 请使用下面的batchListData
        listData(params) {
            return httpSys.get(`/${DICT}/listData`, {
                params
            });
        },
        batchListData(params) {
            return httpSys.get(`/${DICT}/anno/batchListData`, {
                params
            });
        },
        // 获取下拉列表
        getByType(obj) {
            return httpSys.get(`/${DICT}/getByType`, {
                params: obj
            });
        },

        loadJobTree() {
            return httpSys.get(`/${DICT}/buildTree`);
        },
        listJobTree() {
            return httpSys.get(`/${DICT}/listJobTree`);
        },
        DictBuildTreeNew(obj) {
            return httpSys.get(`/${DICT}/buildTreeNew`, {
                params: obj
            });
        },
        // 获取字典列表
        DictListDataNew(obj) {
            return httpSys.get(`/${DICT}/listDataNew`, {
                params: obj
            });
        },
        sortDict(params) {
            return httpSys.post(`/${DICT}/sortDict`, params);
        },
        // 编辑一级字典名称和分类名称 /spoc-plan/a/ws/sys/dict/categoryEdit
        DictCategoryEdit(params) {
            return httpSys.post(`/${DICT}/categoryEdit`, params);
        },
        // 字典分类下拉列表  GET /spoc-plan/a/ws/sys/dict/categoryList
        DictCategoryList(obj) {
            return httpSys.get(`/${DICT}/categoryList`, {
                params: obj
            });
        },
        DictGetById(obj) {
            return httpSys.get(`/${DICT}/getById`, {
                params: obj
            });
        },
        findChildDictByParentDict(params) {
            return httpSys.get(`/${DICT}/findChildDictByParentDict`, {
                params
            });
        },
        // 批量更新排序  POST /spoc-plan/a/ws/sys/dict/dictSort
        DictDictSort(params) {
            return httpSys.post(`/${DICT}/dictSort`, params);
        },
        // 添加字典 POST /spoc-plan/a/ws/sys/dict/save
        DictSave(params) {
            return httpSys.post(`/${DICT}/save`, params);
        },
        saveType(params) {
            return httpSys.post(`/${DICT}/saveType`, params);
        },
        // 删除字典 POST /spoc-plan/a/ws/sys/dict/delete
        DictDelect(params) {
            return httpSys.post(`/${DICT}/delete`, params);
        },
        getTypeTree(params) {
            return httpSys.get(`/${DICT}/getTypeTree`, {params});
        },
        //渠道来源接口
        getDictStringTree(params) {
            return httpSys.get(`/${DICT}/getDictStringTree`, {params});
        },
    };
}

export const sysDict = getSysDict(httpSys);
