import axios from './axios-j';

//获取课程评价
export function gettechercourseevaluate(params) {
    return axios.smajax('gettechercourseevaluate', params);
}

//获取排课的学员信息及评价信息
export function getcommentstudent(params){
	return axios.smajax('getcommentstudent',params)
}

//获取评价模板
export function getcommenttemplate(params){
	return axios.smajax('getcommenttemplate',params)
}

//获取家长回评
export function getstudentteview(params){
	return axios.smajax('getstudentteview',params)
}

//获取指定课程指定学员的评价及回复列表
export function getcommentdetail(params){
	return axios.smajax('getcommentdetail',params)
}

//修改上课内容
export function upatecoursecontent(params){
	return axios.smajax('upatecoursecontent',params)
}

//是否能查询老查看家长回评
export function getcoursecommentamont(params){
	return axios.smajax('getcoursecommentamont',params)
}

//老师评价
export function modifycoursecomment(params){
	return axios.smajax('modifycoursecomment',params)
}

//获取历史评价列表
export function getcoursecommentscopehistory(params){
	return axios.smajax('getcoursecommentscopehistory',params)
}

//撤销点评
export function removecoursecomment(params){
	return axios.smajax('removecoursecomment',params)
}

//批量点评有草稿的学员名称获取
export function gettempmessagestudent(params) {
    return axios.smajax('gettempmessagestudent',params)
}