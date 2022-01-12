import {
	http,
	baseURL,
	httpCrmBlob,
} from "./request";
const k = '/marketingPerformance'
const post = (u, data) => {
	return http.post(`${k}${u}`, data);
};

const get = (u, data) => {
	return http.get(`${k}${u}`, data);
};
export const marketingPerformance = {
    data(params, config={}) {
		return get('/data', Object.assign({ params },config))
    },
    // updateChannelDisable(params) {
	// 	return post('/updateChannelDisable', params)
    // },
}
