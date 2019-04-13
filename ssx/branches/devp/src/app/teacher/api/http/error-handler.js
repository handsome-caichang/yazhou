
// 针对http请求出错、服务端异常状态码做统一处理
function httpCodeErrorHandler(httpCode) {
    if (httpCode >= 500) {
        //暂无处理;
    }
}

export function serverErrorHandler (res) {
    // if (res.data.result.code !== 200) {
    //     console.warn(`ErrorCode: ${res.data.result.code}, ErrorMsg: ${res.data.result.msg}, api:${res.config.url}`);
    //     if (res.data.result.code === 407) {
    //         window.location.href = "//weixin.xiaogj.com/home.aspx";
    //     }
    // }
}

export function httpErrorHandler (res) {
    console.log(res);
    if (axios.isCancel(res)) {
        // http请求被取消时
        return {
            result:{
                code:1001,
                msg:'请求被取消'
            }            
        }
    } else {
        // http请求本身出错时
        if (res == "Error: Network Error") {
            app.toast("error", "网络错误，请检查网络连接。");
        } else {
            httpCodeErrorHandler(res.response && res.response.status);
            console.error(`http请求出错: Api:${res.config.url}  ${res}`);
            return {
                result:{
                    code:1000,
                    msg:res
                }
            }    
        }
    }
}

