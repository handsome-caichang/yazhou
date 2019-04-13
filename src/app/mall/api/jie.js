import http from './http/http.js'

// 统计页面访问
export function statisticsPV(params) {
    return http.ajax({
        url: 'api/statistics/page', 
        data: params
    });
}

// 获取微信配置项
export function getWxConfig(params) {
    return http.ajax({
        url: 'api/common/getWxConfig', 
        data: params
    });
}
// 获取可选校区列表
export function getcampuslist(params) {
    return http.ajax({
        url: 'api/common/getcampuslist', 
        data: params
    });
}
// 获取当前选择的校区
export function getcurrentcampus(params) {
    return http.ajax({
        url: 'api/common/getcurrentcampus', 
        data: params
    });
}
// 修改当前选择的校区
export function setcampus(params) {
    return http.ajax({
        url: 'api/login/setcampus', 
        data: params
    });
}

// 获取首页mall的轮播图
export function getbannerlist(params) {
    return http.ajax({
        url: 'api/homepage/getbannerlist', 
        data: params
    });
}
// 获取首页mall的楼层数据
export function getFloorList(params) {
    return http.ajax({
        url: 'api/homepage/GetFloorList', 
        data: params
    });
}
// 获取首页的微官网菜单
export function getWebsiteModule(params) {
    return http.ajax({
        url: 'api/homepage/GetModule', 
        data: params
    });
}
// 获取首页的微官网菜单
export function getWebsiteNotice(params) {
    return http.ajax({
        url: 'api/homepage/GetNotice', 
        data: params
    });
}
// 一次性获取首页所有数据
export function getAllHomePageData (params) {
    return http.ajax({
        url: 'api/homepage/GetAllHomePageData', 
        data: params
    });
}
// 获取地址和当前用户信息
export function getCurrentUserInfoAndAddress (params) {
    return http.ajax({
        url: 'api/homepage/GetCurrentUserInfoAndAddress', 
        data: params
    });
}
// 根据ID获取首页轮播图详情
export function getBannerByID(params) {
    return http.ajax({
        url: 'api/homepage/GetBannerByID', 
        data: params
    });
}

// 获取热门搜索词和历史搜索词
export function gethistoryhotkewordlist(params) {
    return http.ajax({
        url: 'api/HomePage/GetHotKeywordAndHistoryKeyword', 
        data: params
    });
}

// 获取搜索推荐词
export function getsuggestionword(params) {
    return http.ajax({
        url: 'api/product/getsuggestionword', 
        data: params
    });
}

// 清除历史搜索
export function clearHistoryKeywordList(params) {
    return http.ajax({
        url: 'api/common/ClearHistoryKeywordList', 
        data: params
    });
}

// 获取商品分类列表、搜索商品列表
export function getSearchList(params) {
    return http.ajax({
        url: 'api/product/query', 
        data: params
    });
}
// 获取套餐列表
export function getPackageList(params) {
    return http.ajax({
        url: 'api/package/get', 
        data: params
    });
}
// 获取班级筛选条件 或 获取物品商品可选分类树
export function getqueryparamters(params) {
    return http.ajax({
        url: 'api/product/getqueryparamters', 
        data: params
    });
}
// 根据广告ID获取广告信息
export function getADByID(params) {
    return http.ajax({
        url: 'api/homepage/GetADByID', 
        data: params
    });
}

// 获取首页的微官网菜单模板详情
export function getWebsiteNoticeDetail(params) {
    return http.ajax({
        url: 'api/homepage/GetNoticeByID', 
        data: params
    });
}
// 获取首页的微官网菜单模板列表
export function getWebsiteModuleList(params) {
    return http.ajax({
        url: 'api/homepage/GetModuleList', 
        data: params
    });
}
// 获取首页的微官网菜单模板详情
export function getWebsiteModuleDetail(params) {
    return http.ajax({
        url: 'api/homepage/GetModuleDetail', 
        data: params
    });
}





