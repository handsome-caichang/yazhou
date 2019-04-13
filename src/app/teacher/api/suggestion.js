import axios from './axios-j'

export function getSuggestionList(params) {
	return axios.ajax('/api/SSX/QuerySuggest', params);
}

export function getSuggestDetail(params) {
	return axios.ajax('/api/SSX/GetSuggestionInfo', params);
}

export function receiveSuggest(params) {
	return axios.ajax('/api/SSX/ReceiveSuggest', params);
}