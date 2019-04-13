import axios from './axios-j';

// 获取交费记录
export function getstudentfeeinfos(params){
	return axios.smajax('getstudentfeeinfos', params);
}