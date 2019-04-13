import store from "mall/store/index.js";

// 针对http请求出错、服务端异常状态码做统一处理
function httpCodeErrorHandler(httpCode) {
    // 在服务器返回500类型的http状态码时，给出用户提示；并在一定时间内阻塞用户操作；
    if (httpCode >= 500) {
        // app.toast("error", "服务器开小差了，请稍后再试。", 3000);
        app.toast("info", "当前抢购太火爆，请大侠稍后再试~", 3000);
        store.commit("set_serverBlock", true);
        setTimeout(() => {
            store.commit("set_serverBlock", false);
        }, 3000);
    }
}

export function serverErrorHandler(res) {
    // console.log(res);
    if (res.data.ErrorCode !== 200) {
        // console.warn(`ErrorCode: ${res.result.code}, ErrorMsg: ${res.result.msg}, api:${res.config.url}`);

        if (res.data.ErrorCode === 411) {
            //提示“会话过期”，返回首页，清空状态机的数据
            if (res.config.data.loginFlag) {
                if (res.data.ErrorMsg == "") {
                    res.data.ErrorMsg = "会话过期。";
                }
                store.commit("set_userInfo", {});
                store.commit("set_addressList", []);
                store.commit("set_appCart", -1);
                store.commit("set_appFavorite", []);
                store.commit("set_cartTotalMoney", 0);
                store.commit("set_orderAddress", {});
                store.commit("set_vaildCartList", []);
                store.commit("set_expiredCartList", []);
                store.commit("set_appCartCampus", {
                    ID: "",
                    Name: "",
                    Products: []
                });
                store.commit("set_goodsDetailCampus", {
                    ID: "",
                    Name: "",
                    Products: []
                });

                setTimeout(() => {
                    app.mallApp.$router.replace("/login");
                }, 30);
            }
        }
    }
}

export function httpErrorHandler(res) {
    // console.log(res);
    if (axios.isCancel(res)) {
        // http请求被取消时
        return {
            ErrorCode: 1001,
            ErrorMsg: `${res.message || "请求被取消"}`
        };
    } else {
        // http请求本身出错时
        if (res == "Error: Network Error") {
            app.toast("error", "网络错误，请检查网络连接。");
        } else {
            httpCodeErrorHandler(res.response && res.response.status);
            console.error(`http请求出错: Api:${res.config.url}  ${res}`);
            return {
                ErrorCode: 1000,
                ErrorMsg: res
            };
        }
    }
}