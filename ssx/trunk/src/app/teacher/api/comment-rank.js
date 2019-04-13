import axios from './axios-j'

// 获取统计结果
export function getteacherrank(params){
    return axios.smajax('getteacherrank',params)
}

// 获取上获取被统计的课程列表
export function getteacherscopeinfo(params){
    return axios.smajax('getteacherscopeinfo',params)
}

// 获取评价维度
export function getteachercoursecommentscope(params){
    return axios.smajax('getteachercoursecommentscope',params)
}

// 获取维度总平均分
export function getteachercoursecommmetscopedetail(params){
    // param:{sdate,edate,type:5,passScope:'',campusid:"",typeValue:'',CourseCommentScopeSettingID,PageIndex,PageSize:20}
    return axios.smajax('getteachercoursecommmetscopedetail',params)
}

//  获取班级评分详情
export function getteacherscopecourseinfo(params){
    // param:{sdate,edate,type:5,classid:'',campusid:"",typeValue:'',CourseCommentScopeSettingID,PageIndex,PageSize:20}
    return axios.smajax('getteacherscopecourseinfo',params)
}