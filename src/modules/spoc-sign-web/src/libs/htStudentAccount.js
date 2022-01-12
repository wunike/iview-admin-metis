import { http , baseURL } from "./request";
const k = '/htStudentAccount'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const htStudentAccount = {
	getStudentContract(params){
		return post('/getStudentContract',params)
	},
	getStudentContractCourse(params){
		return post('/getStudentContractCourse',params)
	},
	getStudentAccountInfo(params){
		return post('/getStudentAccountInfo',params)
    },
    getAccountOverview(params){
		return post('/getAccountOverview',params)
    },
    findStudentCourseCollectInfo(params){
		return post('/findStudentCourseCollectInfo',params)
    },
    transferAccountApply(params){
		return post('/transferAccountApply',params)
    },
    withdrawApply(params){
		return post('/withdrawApply',params)
    },
    transferAccountForm(params){
		return get('/transferAccountForm',{params})
    },
    withdrawForm(params){
		return get('/withdrawForm',{params})
    },
}