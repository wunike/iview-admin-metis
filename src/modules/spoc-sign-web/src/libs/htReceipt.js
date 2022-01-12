import { http, httpSignBlob } from "./request";
const k = '/htReceipt'
const post = (u, data) => {
	return http.post(`${k}${u}`, data);
};

const get = (u, data) => {
	return http.get(`${k}${u}`, data);
};

export const htReceipt = {
	getShowTitle(params) {
		return get('/getShowTitle', { params })
	},
	clearShowField(params) {
		return get('/clearShowField', { params })
	},
	listPageRefund(params) {
		return post('/listPageRefund', params)
	},
	updateShowTitle(pageIdentifier, params) {
		return post('/updateShowTitle?pageIdentifier=' + pageIdentifier, params)
	},
	listContractsWithJwTeacher(params) {
		return get('/listContractsWithJwTeacher', { params })
	},
	saveRefund(params) {
		return post('/saveRefund', params)
	},
	listPageReceipt(params) {
		return post('/listPageReceipt', params)
	},
	saveReceipt(params) {
		return post('/saveReceipt', params)
	},
	receiptAudit(params) {
		return post('/receiptAudit', params)
	},
	associateAttachment(params) {
		return post('/associateAttachment', params)
	},
	downloadReceiptCert(params) {
		return httpSignBlob.get('/htReceipt/downloadReceiptCert', { params })
	},
	exportFileReceipt(params) {
		return httpSignBlob.post('/htReceipt/exportFileReceipt', params)
	},
	exportSelectedFileReceipt(params) {
		return httpSignBlob.post('/htReceipt/exportSelectedFileReceipt', params)
	},
	exportFileRefund(params) {
		return httpSignBlob.post('/htReceipt/exportFileRefund', params)
	},
	export(params) {
		return httpSignBlob.post('/htReceipt/export', params)
	},
	exportParter(params) {
		return httpSignBlob.post('/htReceipt/exportParter', params)
	},
	form(params) {
		return get('/form', { params })
	},
	receiptAllocation(params) {
		return post('/receiptAllocation', params)
	},
	totalAmountListReceipt(params) {
		return post('/totalAmountListReceipt', params)
	},
	updateHtRecepitOfficeIdAndUserId(params) {
		return get('/updateHtRecepitOfficeIdAndUserId', { params })
	},
	deleteReceiptById(params) {
		return get('/deleteReceiptById', { params })
	},
	getResponsibleOfficeList(params) {
		return get('/getResponsibleOfficeList', { params })
	},
	// 业绩分配
	listPageReceiptParter(params) {
		return post('/listPageReceiptParter', params)
	},
}