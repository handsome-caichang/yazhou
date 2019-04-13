import http from './http/http.js';

// 移动端总览
export function getmdatasummary(params) {
    return http.ajax({
        type: 'mock',
        url: 'getmdatasummary', 
        data: params
    });
}
// 学员概况
export function getmstudentdetail(params) {
    return http.ajax({
        type: 'mock',
        url: 'getmstudentdetail', 
        data: params
    });
}
// 资金汇总表-同PC接口
export function getfeedetailinfobyfeecusttype(params) {
    return http.ajax({
        type: 'mock',
        url: 'getfeedetailinfobyfeecusttype', 
        data: params
    });
}
// 资金汇总表-合计行-同PC接口
export function getfeedetailinfototalbyfeecusttype(params) {
    return http.ajax({
        type: 'mock',
        url: 'getfeedetailinfototalbyfeecusttype', 
        data: params
    });
}
// 课消数据-课消汇总
export function getmfeeconsume(params) {
    return http.ajax({
        type: 'mock',
        url: 'getmfeeconsume', 
        data: params
    }).then(res => {
        return {
            result: { msg: ")^u0mtM", code: 200 },
            data: [
                {
                    campusname: "Ck#",
                    campusid: 3,
                    feehours: -2,
                    feedays: 1,
                    amount: 20
                }
            ],
            datatotal: {
                campusname: "z]re",
                campusid: 1,
                feehours: 3,
                feedays: 2,
                amount: 20
            },
            page: {
                pageindex: 1,
                totalpage: 1,
                recordcount: 20
            }
        }
    });
}
// 课消数据
export function getmfeeconsumetotal(params) {
    return http.ajax({
        type: 'mock',
        url: 'getmfeeconsumetotal', 
        data: params
    });
}
// 退费结算
export function getmfeerefund(params) {
    return http.ajax({
        type: 'mock',
        url: 'getmfeerefund', 
        data: params
    });
}
// 退费结算-总计
export function getmfeerefundtotal(params) {
    return http.ajax({
        type: 'mock',
        url: 'getmfeerefundtotal', 
        data: params
    });
}
// 满班率
export function getmfullclassrate(params) {
    return http.ajax({
        type: 'mock',
        url: 'getmfullclassrate', 
        data: params
    });
}
// 满班率-班级详情列表
export function getmfullclassratedetail(params) {
    return http.ajax({
        type: 'mock',
        url: 'getmfullclassratedetail', 
        data: params
    });
}
// 出勤率
export function getmattendrate(params) {
    return http.ajax({
        type: 'mock',
        url: 'getmattendrate', 
        data: params
    });
}
// 出勤率-班级详情列表
export function getmattendratedetail(params) {
    return http.ajax({
        type: 'mock',
        url: 'getmattendratedetail', 
        data: params
    });
}
// 流失率
export function getmlossrate(params) {
    return http.ajax({
        type: 'mock',
        url: 'getmlossrate', 
        data: params
    });
}
// 流失率-班级详情列表
export function getmlossratedetail(params) {
    return http.ajax({
        type: 'mock',
        url: 'getmlossratedetail', 
        data: params
    });
}