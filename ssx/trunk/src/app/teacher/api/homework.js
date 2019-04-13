import axios from './axios-j'
export const homeworkAxios = {
	// 删除作业
	deleteHomework(param) {
		/* 
			id:
		*/
		return axios.ajax('/api/SSx/DeleteMessageItem', param);
	}
};


// 作业评价选择分数(按ABCD等级)
export function getPointsList(params) {
	return axios.ajax('/api-mock/homework/getPointsList', params)
}
