import axios from './axios-j'

export function getSuggestionList(params) {
	return axios.ajax('/api/SSX/QuerySuggest', params);
}

export function getsuggestionforteacherlist(params){
	return axios.smajax('getsuggestionforteacherlist', params);
}


export function getsuggestionforteacherinfo(params){
	return axios.smajax('getsuggestionforteacherinfo', params);
}


export function addsuggestionforteacher(params){
	return axios.smajax('addsuggestionforteacher', params);
}
 