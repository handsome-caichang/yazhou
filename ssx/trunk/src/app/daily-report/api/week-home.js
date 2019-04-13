import axios from './axios-j'

export function getWeeklyOverview(params) {
	return axios.ajax('/api/reportOperation/getWeeklyOverview', params);
}

export function getWeeklyDetail(params) {
	return axios.ajax('/api/reportOperation/getWeeklyDetail', params);
}
