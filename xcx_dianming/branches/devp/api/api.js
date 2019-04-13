import {ajax} from './ajax.js';

export function getRole(params){ //获取角色信息
    return ajax('/weixin/teacher/Process.ashx',Object.assign({pname:'main'},params));
}
export function getCourseList(params){ //获取上课列表
    return ajax('/weixin/teacher/Process.ashx',Object.assign({pname:'courseAttendance'},params));
}
export function getCourseDetail(params){
    return ajax('/weixin/teacher/Process.ashx',params);
}

export function updateCourseTime(params){
    return ajax('/api/course/PhoneSettingCourseTime',params);
}
export function QueryBrief(params){ //获取添加学员列表
    return ajax('/api/Student/QueryBrief',params);
}
export function addStudentCourse(params){ //加入这节课
	return ajax('/api/Course/AddStudents',params);
}
export function addStudentClass(params){ //加入这个班
	return ajax('/api/Class/AddStudent',params);
}

export function removeStudent(params){
	return ajax('/api/course/RemoveStudent',params);
}

export function removeTryStudent(params){
	return ajax('/api/course/RemoveAdjustOrTryStudents',params);
}
export function reduceStudent(params){
	return ajax('/api/course/ReduceStudents',params);
}

export function postCourse(params){
	return ajax('/weixin/teacher/Process.ashx',Object.assign({pname:'courseAttendance_save'},params));
}


export function postCheckConflict(params){
	return ajax('/api/course/CheckStudentAttendanceConflict',params);
}

export function getMachineAttend(params){
	return ajax('/api/course/GetMachineAttendanceStuList',params);
}

export function getConfig(){
    return ajax('/weixin/teacher/Process.ashx?pname=api&action=whoami&UsePlatform=4');
}

export function getPower(){
    return ajax('/api/MasterReport/GetUserInfo',{UsePlatform: 4});
}