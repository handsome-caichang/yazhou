import axios from './axios-j'

export function overview(params) {
	return axios.ajax('/api/reportOperation/overview', params);
}

export function customerReport(params) {
	return axios.ajax('/api/reportOperation/customerReport', params);
}

export function consumeReport(params) {
	return axios.ajax('/api/reportOperation/consumeReport', params);
}

export function classReport(params) {
	return axios.ajax('/api/reportOperation/classReport', params);
}

export function chargeReport(params) {
	return axios.ajax('/api/reportOperation/chargeReport', params);
}