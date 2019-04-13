let wxsdkPromise = new Promise((resolve, reject) => {
    function ready() {
        //安卓机很多无法直接通过window.__wxjs_environment获取是否在小程序环境
        //在网页内可通过window.__wxjs_environment变量判断是否在小程序环境，建议在WeixinJSBridgeReady回调中使用
        var script = document.createElement("script");
        script.type = "text/javascript";

        //判断加载小程序SDK/微信SDK
        if (window.__wxjs_environment === 'miniprogram') {
            app.envType = 4;
            script.src = "https://res.wx.qq.com/open/js/jweixin-1.3.2.js";
        } else {
            script.src = "https://res.wx.qq.com/open/js/jweixin-1.2.0.js";
        }
        window.document.head.appendChild(script);
    }

    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger' && (!window.WeixinJSBridge || !WeixinJSBridge.invoke)) {
        document.addEventListener('WeixinJSBridgeReady', ready, false);
    } else {
        ready();
    }

    let timer = setInterval(() => {
        if (window.wx) {
            clearInterval(timer);
            resolve(wx)
        }
    }, 10);
})



wxsdkPromise.then(wx => {
    import ( /*webpackChunkName: "index"*/ './index.js')
})