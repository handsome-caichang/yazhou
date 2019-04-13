import http from './http/http.js'

export function getSuggestionList(params) {
	return http.ajax({
		type:'mock',
		url: 'getsuggestforteacherinfos',
		data: params
	})
}

export function getSuggestDetail(params){
	return http.ajax({
		type:'mock',
		url:'getsuggestforteacherinfo',
		data:params
	})
}

export function receiveSuggest(params){
	return http.ajax({
		type:'mock',
		url:'opsuggestforteacher',
		data:params
	})
}
// export function getSuggestDetail(params) {
// 	return axios.ajax('/api/SSX/GetSuggestionInfo', params);
// }

// export function receiveSuggest(params) {
// 	return axios.ajax('/api/SSX/ReceiveSuggest', params);
// }