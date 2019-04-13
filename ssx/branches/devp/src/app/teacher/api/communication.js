import axios from './axios-j'

// 获取沟通记录
export function getCommunicationList(params) {
    /* 
        pname: communication
        query: 
        cost: 
        endcost: 
        sdate: 
        edate: 
        snextdate: 
        enextdate: 
        sort: LastDate
        desc: 1
        type: 
        page: 1
    */
    return axios.ajax('/weixin/teacher/Process.ashx', params)
}
