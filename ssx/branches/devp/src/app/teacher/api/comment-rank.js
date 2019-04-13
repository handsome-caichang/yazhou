import axios from './axios-j'
import http from './http/http.js'

// 获取统计结果
export function getCommentRankList(params){
    // param:{sdate,edate,type:5,desc:1,sort:"sort:Scope",PageIndex,PageSize:20}
    return axios.ajax('/api/SSXReport/QueryTeacherRank',params)
}

// 获取上获取被统计的课程列表
export function getCommentClassList(params){
    // param:{sdate,edate,type:5,desc:1,sort:"sort:Scope",PageIndex,PageSize:20}
    return axios.ajax('/api/SSXReport/QueryTeacherScore',params)
}

// 获取评价维度
export function getCommentDimension(params){
    // param:{sdate,edate,type:5,passScope:'',campusid:"",itemValue:'',PageIndex,PageSize:20}
    return axios.ajax('/api/SSXReport/QueryTeacherTypeScore',params)
}

// 获取维度总平均分
export function getTeacherScoreDetail(params){
    // param:{sdate,edate,type:5,passScope:'',campusid:"",typeValue:'',CourseCommentScopeSettingID,PageIndex,PageSize:20}
    return axios.ajax('/api/SSXReport/QyeryTeacherScoreDetail',params)
}

//  获取班级评分详情
export function getClassScopeDetail(params){
    // param:{sdate,edate,type:5,classid:'',campusid:"",typeValue:'',CourseCommentScopeSettingID,PageIndex,PageSize:20}
    return axios.ajax('/api/SSXReport/QueryTeacherCourseDetail',params)
}


// 获取家长评价排名
export function getteacherrank(params){
    // param:{sdate,edate,type:5,desc:1,sort:"sort:Scope",PageIndex,PageSize:20}
    // return axios.ajax('/api/SSXReport/QueryTeacherRank',params)
    return http.ajax({
        type:'mock',
        url:'getteacherrank',
        data:params
    })
}

// 按评价维度统计
export function getteachercoursecommentscope(params){
    // param:{sdate,edate,type:5,desc:1,sort:"sort:Scope",PageIndex,PageSize:20}
    // return axios.ajax('/api/SSXReport/QueryTeacherScore',params)
    return http.ajax({
        type:'mock',
        url:'getteachercoursecommentscope',
        data:params
    })
}


// 按获取按评价维度的明细分数
export function getteachercoursecommmetscopedetail(params){
    // param:{sdate,edate,type:5,desc:1,sort:"sort:Scope",PageIndex,PageSize:20}
    // return axios.ajax('/api/SSXReport/QueryTeacherScore',params)
    return http.ajax({
        type:'mock',
        url:'getteachercoursecommmetscopedetail',
        data:params
    })
}