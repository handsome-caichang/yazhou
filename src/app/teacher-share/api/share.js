import axios from './axios-j';

// 获取微信配置
export function getwxconfig(params) {
    return axios.ajaxGet('/weixin/getconfig.ashx', params);
}
