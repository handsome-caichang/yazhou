import http from './http/http.js'

// 登录
export function userLogin(params) {
    return http.ajax({
        url: 'api/login/login',
        data: {
            CampusID: 'cbefd1e8-76eb-4d50-937e-0e582e2d8e65',
            LoginName: 'yy888',
            Password: 888888
        }
    });
}

//获取班级商品详情
export function getClassInfo(params) {
    return http.ajax({
        url: 'api/product/getclassdetail',
        data: params
    })
}

//获取课程大纲
export function getOutline(params) {
    return http.ajax({
        url: 'api/product/getshiftoutline',
        data: params
    })
}

//获取购物车数量
export function getShopCarNum(params) {
    return http.ajax({
        url: 'api/shoppingcart/getshoppingcartcount',
        data: params
    })
}

//获取老师列表
export function getTeachers(params) {
    return http.ajax({
        url: 'api/product/getteacherByProductID',
        data: params
    })
}

//获取提问列表
export function getQuestions(params) {
    return http.ajax({
        url: 'api/product/GetQuestion',
        data: params
    })
}

//获取评价列表
export function getRatings(params) {
    return http.ajax({
        url: 'api/product/getcomments',
        data: params
    })
}

//获取商品详情
export function getGoodsDetail(params) {
    return http.ajax({
        url: 'api/product/getgoodsdetail',
        data: params
    });
}

//获取教室陈列
export function getClassLayOut(params) {
    return http.ajax({
        url: 'api/Product/GetClassLayout',
        data: params
    })
}

//将班级商品加入购物车
export function classAddShopCar(params) {
    return http.ajax({
        url: 'api/ShoppingCart/AddClass',
        data: params
    })
}

//将物品商品加入购物车
export function goodsAddShopCar(params) {
    return http.ajax({
        url: 'api/ShoppingCart/AddGoods',
        data: params
    })
}

//查询物品规格ID
export function getSpecInfo(params) {
    return http.ajax({
        url: 'api/product/GetSpecInfo',
        data: params
    })
}


//收藏
export function addFavorites(params) {
    return http.ajax({
        url: 'api/product/AddFavorites',
        data: params
    })
}

//取消收藏
export function deleteFavorites(params) {
    return http.ajax({
        url: 'api/product/DeleteFavorites',
        data: params
    })
}

//对商品提问接口
export function submitQuestion(params) {
    return http.ajax({
        url: 'api/product/SubmitQuestion',
        data: params
    })
}

//获取套餐详情
export function getPackage(params) {
    return http.ajax({
        url: 'api/package/getbyid',
        data: params
    })
}


//获取金额
export function getmoneyInfo(params) {
    return http.ajax({
        url: 'api/package/getmoneyInfo',
        data: params
    })
}

//获取套餐规格详情
export function getPackageSpecInfo(params) {
    return http.ajax({
        url: 'api/package/GetSpecInfo',
        data: params
    })
}

//获取课程商品详情
export function getshiftdetail(params) {
    return http.ajax({
        url: 'api/product/getshiftdetail',
        data: params
    })
}

//获取课程班级列表
export function getclassesByProductID(params) {
    return http.ajax({
        url: 'api/product/getclassesByProductID',
        data: params
    })
}

//课程商品加入购物车
export function courseAddShopCar(params) {
    return http.ajax({
        url: 'api/shoppingcart/addshift',
        data: params
    })
}

//获取协议接口
export function getProtocol(params) {
    return http.ajax({
        url: 'api/common/GetProtocol',
        data: params
    })
}

//提交业绩归属人
export function setSaleUserId(params) {
    return http.ajax({
        url: 'api/Login/SetSaleUserId',
        data: params
    })
}

//我的业绩
export function getSaleReport(params) {
    return http.ajax({
        url: 'api/report/GetSaleReport',
        data: params
    })
}

//获取业绩详情
export function getSaleReportDetail(params) {
    return http.ajax({
        url: 'api/report/GetSaleReportDetail',
        data: params
    })
}

//获取二维码
export function getQrcode(params) {
    return http.ajax({
        url: 'api/order/getqrcode',
        data: params
    })
}