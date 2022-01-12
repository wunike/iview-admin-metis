import { httpJW } from "./request";
import util from "@public/libs/js/util";

const k = '/jwCourse'

const post = (u,data)=>{
	let _data = util.requestDataTrim('POST', data)
    return httpJW.post(`${k}${u}`,_data);
};

const get = (u,data)=>{
	let _data = util.requestDataTrim('GET', data)
    return httpJW.get(`${k}${u}`,_data);
};

const jwClassroomGet = (u,data)=>{
	let _data = util.requestDataTrim('GET', data)
	return httpJW.get(`/jwClassroom${u}`,_data);
};

const jwClassroomPost = (u,data)=>{
	let _data = util.requestDataTrim('POST', data)
	return httpJW.post(`/jwClassroom${u}`,_data);
};


export const jwCourse = {
	getShowTitle(params) { //大列表测试方法。不要使用
		return jwClassroomGet('/getShowTitle', {params});
	},
	updateShowTitle(params) { //大列表测试方法。不要使用
		return jwClassroomPost('/updateShowTitle?pageIdentifier=jwClassroom/listPage', params);
	},
	// 手动开班显示课程包列表
	listPageByOffice(params){
		return get('/listPageByOffice', { params });
    }
};
