import axios from './axios-j'

/* 选课报名-关闭订单 */
export function putOrderStatus(params) {
	return axios.ajax('/api/FeeChargeOnline/PutOrderStatus', params);
}

/* 选课报名-删除/取消预约订单 */
export function deleteOrder(params) {
	return axios.ajax('/api/FeeChargeOnline/DeleteOrder', params);
}

/* 选课报名-订单是否执行完成 */
export function isFinish(params) {
	return axios.ajax('/api/classonline/IsFinish', params);
}

/* 选课报名-获取教室 */
export function getSeatDetail(params) {
	return axios.ajax('/api/ClassOnline/GetSeatDetail', params);
}

/* 选课报名-选择座位 */
export function putSeat(params) {
	return axios.ajax('/api/seat/put', params);
}