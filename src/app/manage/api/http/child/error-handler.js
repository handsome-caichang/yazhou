import store from 'manage/store/index.js'

export function serverCode540(res) {
    if (res.data.result.code == 540) {
        let url = res.data.url;
        url += `&terminal=1&wxid=${store.state.userInfo.wxid}&uid=${store.state.userInfo.uid}&company=${store.state.userInfo.company}&returl=${encodeURIComponent(location.href)}`
        app.toast('登录失效，重新登录中')
        console.log(url);
        if (store.state.userInfo.wxid) {
            location.href = url;
        } else {
            app.toast('error', '请退出小程序重新登录')
        }
        // http://127.0.0.1/wxsrv.do?aid=3&terminal=1&wxid=&uid=&company=&returl=
    }else if (res.data.result.code == 541) {
        wx.miniProgram.reLaunch({
            url:`/pages/index/index?binding=true`,
            success: function(res){
                // app.alert(res)
            },
            fail: function(){
                app.alert('请退出小程序重新登录');            
            }
        })
    }
}