// 针对http请求出错、服务端异常状态码做统一处理



function httpCodeErrorHandler(httpCode) {
    // 在这里可以针对http状态码做一些统一处理
}

export function serverErrorHandler (res) {
    if (res.data.result.code !== 200) {
        console.error(`api:${res.config.url} `, res.data.result);
        if (res.data.result.code == 540) {
            location.href = app.sysInfo.weixinparentserverurl;
        }
    }
}

export function httpErrorHandler (error) {
    // if (axios.isCancel(error)) { // http请求被取消时
    //     console.log(`Api请求被取消:',  取消说明: ${error.message || "无取消说明..."}`);
    //     return
    // }

    console.log(error);
    console.log(error.response);

    if (error == 'Error: Network Error') {
        app.toast('error', '网络错误，请检查网络连接。');
        return
    } 
    if (error.response) {
        let res = error.response,
            httpCode = res.status;

        httpCodeErrorHandler(httpCode)

        console.error(`http请求出错: Api:${res.config.url}`);
        console.log(res);
    }
}

