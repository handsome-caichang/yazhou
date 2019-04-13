import axios from './axios-j'

export function getcourseattendancwx(params){
	return axios.smajax('getcourseattendancwx',params);
}

export function getcourseattendancedetailwx(params){
	return axios.smajax('getcourseattendancedetailwx',params);
}

//搜索学员
export function getstudentinfosforwx(params){
	return axios.smajax('getstudentinfosforwx',params);
}

//加入这节课
export function studentinfocourse(params){
	return axios.smajax('studentinfocourse',params);
}

//加入这个班
export function opclassstudent(params){
	return axios.smajax('opclassstudent',params);
}


//移除学员
export function optempcorsestudent(params){
	return axios.smajax('optempcorsestudent',params);
}


//修改上课时间
export function opcourse(params){
	return axios.smajax('opcourse',params);
}

/*//获取考勤打卡信息
export function getMachineAttend(params){
	return axios.smajax('/api/course/GetMachineAttendanceStuList',params);
}*/

//撤销上课、取消上课、点名上课
export function setAttendance(params){
	return axios.smajax('setAttendance',params);
}

//检查冲突
/*export function postCheckConflict(params){
	return axios.smajax('/api/course/CheckStudentAttendanceConflict',params);
}
*/


// 获取科目 post接口
export function getclassroomlist(params) {
    return axios.smajax('getclassroomlist',params)
}

// 快速排课 保存动作 post接口
export function addcoursebatchfromwx(params){
    return axios.smajax('addcoursebatchfromwx',params)
}

export function getclasscampusfromwx(params){
	return axios.smajax('getclasscampusfromwx',params);
}


export function getclasslistfromwx(params){
	return axios.smajax('getclasslistfromwx',params);
}