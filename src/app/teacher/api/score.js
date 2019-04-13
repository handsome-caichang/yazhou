import axios from './axios-j';

// 成绩列表 post
export function getScoreQuery(params) {
    return axios.ajax('/api/Exam/Query',params)
}

// 考试成绩查询 post 点击考试列表的详情
export function getScoreQueryClass(params) {
    return axios.ajax('/api/Exam/QueryExamClassReport',params)
}

// 学员成绩查询 post 点击考试成绩查询的详情 点击成绩之后的学员成绩详情
export function getScoreQueryStudent(params) {
    return axios.ajax('/api/Exam/GetScore',params)
}

//获取考试类型
export function getExamType(params) {
    return axios.ajax('/api/Dictionary/Get', params)
}

//获取班级列表
export function getClassName(params) {
    return axios.cajax('/api/class/query', params)
}

//获取课程列表
export function getShiftName(params) {
    return axios.cajax('/api/Shift/Query', params)
}

 //获取班级下学生成绩列表
export function getClassStuScope(params) {
    return axios.ajax('/api/Exam/GetScore', params)
}

//录入学生考试成绩
export function PostAndPutScore(params) {
    return axios.ajax('/api/Exam/PostAndPutScore', params)
}

//根据条件选班级择学员
 export function QueryBrief(params) {
    return axios.ajax('/api/Student/QueryBrief', params)
}
// 批量选择学员
export function GetStudentScore(params) {
    return axios.ajax('/api/Exam/GetStudentScore', params)
}