// import store from 'parent/store'

import qs from 'qs'


// 给axios扩展一个'ajaxGet'方法,用于代理'get'请求;
axios.ajaxGet = function(url, args) {
    // 用于解决后端NodeJS识别代理哪个后端；
    // const URL =  'http://wone.xiaogj.com/'
    let serverQuery = app.tool.parseQuery();
    // let qUrl = URL +  (serverQuery.ip ? `${serverQuery.ip}/${url}` : url);
    let qUrl = serverQuery.ip ? `${serverQuery.ip}/${url}` : url

    let cancel = null;

    let promise = axios.get(qUrl,{
        params: {_t_: new Date().getTime(), ...args},
        cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
        let errorcode = res.data.ErrorCode || res.data.errcode,
    		errormsg = res.data.ErrorMsg || res.data.errmsg;
        if (errorcode !== 200) { //服务端返回的状态码不是200时
            if (errorcode == 407) {
                window.location.href = app.sysInfo.WeixinParentServerURL;
            }
            console.error(`ErrorCode: ${errorcode}, ErrorMsg: ${errormsg}, Api:${url}`);
        }
        return res.data;
    }).catch(res => { // http请求本身出错时
        if (res == 'Error: Network Error') {
            app.toast('error', '网络错误，请检查网络连接。');
        }else{
            console.error(`http请求出错: Api:${url}  ${res}`);
            return {
                ErrorCode: 1000,
                ErrorMsg: res
            }
        }
    })

    promise.cancel = cancel;
    return promise
}

// 给axios扩展一个'ajax'方法,用于代理'post'请求;
axios.ajax = function (url, args) {
    // 用于解决后端NodeJS识别代理哪个后端；
    let serverQuery = app.tool.parseQuery();
    let qUrl =  serverQuery.ip ? `${serverQuery.ip}/${url}` : url;
    
    return axios.post(
        qUrl, 
        qs.stringify({...args})
    ).then(res => {
    	let errorcode = res.data.ErrorCode || res.data.errcode,
    		errormsg = res.data.ErrorMsg || res.data.errmsg;
        if (errorcode !== 200) { //服务端返回的状态码不是200时
            if (errorcode == 407) {
                window.location.href = app.sysInfo.WeixinParentServerURL;
            }
            console.error(`ErrorCode: ${errorcode}, ErrorMsg: ${errormsg}, Api:${url}`);
        }
        return res.data;
    }).catch(res => { // http请求本身出错时
    	if (res == 'Error: Network Error') {
    		app.toast('error', '网络错误，请检查网络连接。');
    	}else{
    		console.error(`http请求出错: Api:${url}  ${res}`);
    		return {
    		    ErrorCode: 1000,
    		    ErrorMsg: res
    		}
    	}
    })
}

// 给axios扩展一个可以取消的'cajax'方法,'post'请求;
axios.cajax = function (url, args) {
    // 用于解决后端NodeJS识别代理哪个后端；
    let serverQuery = app.tool.parseQuery();
    let qUrl =  serverQuery.ip ? `${serverQuery.ip}/${url}` : url;

    let cancel = null;
    let promise = axios.post(
            qUrl, 
            qs.stringify({...args}
       	),
            {cancelToken: new axios.CancelToken(c => cancel = c)}
        ).then(res => {
            let errorcode = res.data.ErrorCode || res.data.errcode,
	    		errormsg = res.data.ErrorMsg || res.data.errmsg;
	        if (errorcode !== 200) { //服务端返回的状态码不是200时
                if (errorcode == 407) {
                    window.location.href = app.sysInfo.WeixinParentServerURL;
                }
	            console.error(`ErrorCode: ${errorcode}, ErrorMsg: ${errormsg}, Api:${url}`);
	        }
            return res.data;
        }).catch(res => {
            if (axios.isCancel(res)) { // http请求被取消时
                console.log(`Api请求被取消: ${url}',  取消说明: ${res.message || "无取消说明..."}`);
                return {
                    ErrorCode: 1001,
                    ErrorMsg: `${res.message || "请求被取消"}`
                };
            } else { // http请求本身出错时
            	if (res == 'Error: Network Error') {
            		app.toast('error', '网络错误，请检查网络连接。');
            	}else{
            		console.error(`http请求出错: Api:${url}  ${res}`);
            		return {
            		    ErrorCode: 1000,
            		    ErrorMsg: res
            		}
            	}
            }
        })
    promise.cancel = cancel;
    return promise;
}

export default axios;