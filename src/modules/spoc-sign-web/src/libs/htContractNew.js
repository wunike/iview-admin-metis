import {
    http,
    baseURL
} from "./request";
const k = '/htContractNew'
const post = (u, data) => {
    return http.post(`${k}${u}`, data);
};

const get = (u, data) => {
    return http.get(`${k}${u}`, data);
};

export const htContractNew = {
    searchCtCusList(params) {
        return get('/searchCtCusList', {
            params
        })
    },
    searchStudent(params) {
        return get('/searchStudent', {
            params
        })
    },
}
