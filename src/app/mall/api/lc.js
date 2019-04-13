import http from './http/http.js'

// 获取所有配置信息
export function getAllConfig(params){
	return http.ajax({
		url: 'api/common/GetAllConfig', 
		data: params
	});
}
// 获取配置信息
export function getconfig(params){
	return http.ajax({
		url: 'api/common/getconfig', 
		data: params
	});
}
// 获取登录的后缀
export function getSuffix(params){
	return http.ajax({
		url: 'api/common/GetSuffix', 
		data: params
	});
}
// 获取二维码绑定图片
export function getQrCode(params) {
	return http.ajax({
		url: "api/homepage/GetCurrentUserInfoAndAddress", 
		data: params
	});
}
// 获取微信支付参数
export function getWXPayData(params){
	return http.ajax({
		url: 'api/order/GetWXPayData', 
		data: params
	});
}
// 登录
export function userLogin(params){
	return http.ajax({
		url: 'api/login/login', 
		data: params
	});
}
// 根据手机号获取用户名和头像
export function getUserByMobile(params){
	return http.ajax({
		url: 'api/register/GetUserByMobile', 
		data: params
	});
}
// 发送短信验证码
export function sendsms(params){
	return http.ajax({
		url: 'api/register/sendsms', 
		data: params
	});
}
// 根据手机号和姓名获取意向客户
export function getCustomerUserInfo(params){
	return http.ajax({
		url: 'api/Register/GetCustomerUserInfo', 
		data: params
	});
}
// 退出登录
export function logout(){
	return http.ajax({
		url: 'api/login/logout'
	});
}
// 获取年级列表
export function getGradeList(){
	return http.ajax({
		url: 'api/common/getgrade'
	});
}
// 注册验证验证码
export function validateSMSCode(params){
	return http.ajax({
		url: 'api/register/ValidateSMSCode', 
		data: params
	});
}
// 注册
export function userRegister(params){
	return http.ajax({
		url: 'api/register/register', 
		data: params
	});
}
// 获取用户账户信息
export function getReserveAccount(params){
	return http.ajax({
		url: 'api/user/GetReserveAccount', 
		data: params
	});
}
// 获取用户基本信息
export function getCurrentUserInfo(params) {
	return http.ajax({
		url: 'api/user/GetCurrentUserInfo', 
		data: params
	});
}
// 修改密码
export function changePassword(params){
	return http.ajax({
		url: 'api/user/changePassword', 
		data: params
	});
}
// 获取待付款、已付款、待评价订单数量
export function getOrderCount(){
	return http.ajax({
		url: 'api/order/GetOrderCount'
	});
}
// 获取购物车列表
export function getAppCart(){
	return http.ajax({
		url: 'api/ShoppingCart/GetProducts'
	});
}
// 根据套餐订单创建参数计算金额
export function getmoneyInfo(params){
	return http.ajax({
		url: 'api/package/getmoneyInfo',
		data: params
	});
}
// 创建套餐订单
export function createForPackage(params){
	return http.ajax({
		url: 'api/order/createForPackage',
		data: params
	});
}
// 根据订单创建参数获取订单金额
export function getMoneyInfoByParamters(params){
	return http.ajax({
		url: 'api/order/GetMoneyInfoByParamters',
		data: params
	});
}
//根据创建订单参数获取优惠信息以及计算最优价格
export function getDiscountInfoByParameter(params){
	return http.ajax({
		url: 'api/order/GetDiscountInfoByParameter',
		data: params
	});
}
// 清空失效商品
export function clearDisabledProducts(){
	return http.ajax({
		url: 'api/shoppingcart/ClearDisabledProducts'
	});
}
// 更新购物车的商品数量
export function updateamount(params){
	return http.ajax({
		url: 'api/shoppingcart/updateamount', 
		data: params
	});
}
// 删除购物车中指定商品
export function removeShoppingCart(params){
	return http.ajax({
		url: 'api/shoppingcart/Remove', 
		data: params
	});
}
// 删除订单
export function orderDelete(params){
	return http.ajax({
		url: 'api/order/delete', 
		data: params
	});
}
// 关闭订单
export function orderClose(params){
	return http.ajax({
		url: 'api/order/close', 
		data: params
	});
}
// 根据购买的商品获取优惠券
export function getCouponsByParamters(params){
	return http.ajax({
		url: 'api/order/GetCouponsByParamters', 
		data: params
	});
}
// 创建订单
export function createOrder(params){
	return http.ajax({
		url: 'api/order/create', 
		data: params
	});
}
// 获取订单是否已支付
export function getIsPaid(params){
	return http.ajax({
		url: 'api/order/GetIsPaid', 
		data: params
	});
}
// 取消收藏
export function deleteFavorites(params){
	return http.ajax({
		url: 'api/product/DeleteFavorites', 
		data: params
	});
}
// 获取优惠券列表
export function getCouponList(type) {
	return http.ajax({
		url: 'api/user/GetCoupon', 
		data: {
        	Type: type
    	}
    })
}
// 根据优惠券ID获取优惠券信息
export function getCouponInfo(params) {
    return http.ajax({
    	url: "api/Marketing/GetCoupon", 
    	data: params
    });
}
// 通过用户名密码领取优惠券
export function receiveCoupon(params) {
    return http.ajax({
    	url: "api/Marketing/receiveCoupon", 
    	data: params
    });
}
// 获取收货地址列表
export function getAddressList(params) {
    return http.ajax({
    	url: 'api/address/get', 
    	data: params
    });
}
// 设置默认收货地址
export function setDefaultAddress(params){
	return http.ajax({
		url: 'api/address/SetDefault', 
		data: params
	});
}
// 删除地址
export function deleteAddress(params){
	return http.ajax({
		url: 'api/address/Delete', 
		data: params
	});
}
// 新增/编辑地址
export function editAddress(params){
	return http.ajax({
		url: 'api/address/CreateOrUpdate', 
		data: params
	});
}
// 获取收藏商品列表
export function getFavorites(params){
	return http.ajax({
		url: 'api/product/GetFavorites', 
		data: params
	});
}
// 获取订单列表
export function getOrderList(params){
	return http.ajax({
		url: 'api/order/get', 
		data: params
	});
}
// 评价订单
export function commentOrder(params){
	return http.ajax({
		url: 'api/order/comment', 
		data: params
	});
}
// 获取订单详情
export function getOrderDetail(params) {
	return http.ajax({
		url: 'api/order/getbyid', 
		data: params
	});
}
// 修改头像
export function changeImage(params){
	return http.ajax({
		url: 'api/user/ChangeImage', 
		data: params
	});
}

// 二期修改
// 获取消息列表
export function getMessageList(params){
	return http.ajax({
		url: 'api-mock/getMessageList', 
		data: params
	});
}
// 获取消息详情
export function getMessageDetail(id) {
    return http.ajax({
    	url: 'api-mock/getMessageDetail', 
    	data: {
	        MessageID: id
	    }
    });
}

