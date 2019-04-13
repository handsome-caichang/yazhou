import axios from './axios-j'

let dictionary = null;

// 获取选择列的项目
export function getDictionary() {
    let params = {type: 'FeeCustType',flag: 1};
    return dictionary ? dictionary : axios.ajax('/api/dictionary/get',params).then(res=>{
        dictionary = new Promise(resolve=>resolve(res));
        return res;
    })
}

//区域的
export function QueryPayFactOnFeeOfArea(params){
    return axios.ajax('/api/MasterReport/QueryPayFactOnFeeOfArea', params);
} 

//校区的
export function queryPayFactOnFee(params){
    return axios.ajax('/api/MasterReport/QueryPayFactOnFee', params);
}


//课程收费汇总表 获取收费类型
export function getChargeType(params){
    return axios.ajax('/api/Dictionary/Get', params);
}

//课程收费汇总表 主体数据 区域
export function queryMoneyCountOfAllArea(params){
    return axios.ajax('/api/MasterReport/QueryMoneyCountOfAllArea', params);
}

//课程收费汇总表 主体数据 校区
export function queryMoneyCountOfAllCampus(params){
    return axios.ajax('/api/MasterReport/QueryMoneyCountOfAllCampus', params);
}

//课程收费汇总表  图表最近7天数据
export function queryCampusOnFee(params){
    return axios.ajax('/api/MasterReport/QueryCampusOnFee', params);
}

//课程收费汇总表 单个校区下的信息
export function getOneCampusData(params) {
    return axios.ajax('/api/MasterReport/QueryMoneyCountOfOneCampus',params)
}

//课程收费汇总表 学员费用信息
export function getReportFeeSumDetail(params) {
    return axios.ajax('/api/report/ReportFeeSumDetail',params)
}

//选择课程
export function getUserofShift(params){
    return axios.ajax('/api/MasterReport/GetUserofShift',params)
}

//净收汇总表
export function QueryNetEarningArea(params){
    return axios.ajax('/api/MasterReport/QueryNetEarningArea',params)
}