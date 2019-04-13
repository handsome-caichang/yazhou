import axios from './axios-j'

//搜索学员
export function searchStudents(params){
	return axios.cajax('/api/Student/QueryBrief',params);
}

//加入这节课
export function addStudentCourse(params){
	return axios.ajax('/api/Course/AddStudents',params);
}

//加入这个班
export function addStudentClass(params){
	return axios.ajax('/api/Class/AddStudent',params);
}

//移除临加学员
export function removeStudent(params){
	return axios.ajax('/api/course/RemoveStudent',params);
}

//移除学员
export function reduceStudent(params){
	return axios.ajax('/api/course/ReduceStudents',params);
}

//移除临调和试听学员
export function removeTryStudent(params){
	return axios.ajax('/api/course/RemoveAdjustOrTryStudents',params);
}

//修改上课时间
export function updateCourseTime(params){
	return axios.ajax('/api/course/PhoneSettingCourseTime',params);
}

//获取考勤打卡信息
export function getMachineAttend(params){
	return axios.ajax('/api/course/GetMachineAttendanceStuList',params);
}

//撤销上课、取消上课、点名上课
export function postCourse(params){
	return axios.ajax('/weixin/teacher/Process.ashx',Object.assign({pname:'courseAttendance_save'},params));
}

//检查冲突
export function postCheckConflict(params){
	return axios.ajax('/api/course/CheckStudentAttendanceConflict',params);
}

// 获取科目 post接口
export function subjectPost(params) {
    return axios.ajax('/api/Dictionary/Get',params)
}

// 获取科目 post接口
export function classroomPost(params) {
    return axios.ajax('/api/Classroom/Query',params)
}

// 快速排课 保存动作 post接口
export function classAddBatch(params){
    return axios.ajax('/api/Course/ClassAddBatch',params)
}