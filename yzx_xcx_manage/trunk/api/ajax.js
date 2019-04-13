const rndLen = 10,
      app = getApp();

function rndNum(n){
    var rnd="";
    for(var i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10);
    return rnd;
}

export function ajax(url,data,type='POST',dontEncode=false){
    let _resolve,
        promise = new Promise(resolve=>_resolve = resolve),
        t = rndNum(rndLen),
        companyid = getApp().globalData.userbaseinfo.company,
        userid = getApp().globalData.userbaseinfo.uid,
        businessid = getApp().globalData.userbaseinfo.businessid,
        wxid = getApp().globalData.userbaseinfo.wxid;
        
    let obj = {
        url: app.globalData.envHost+"/wxapp.do?appid=4&action="+url,
        data: {
            ...data,
            t,
            companyid,
            userid,
            businessid,
            wxid 
        },
        method:'POST',
        success:function(res){
            if (res.statusCode == 200){
                //登陆超时
                // if (res.data.errcode === 407){
                //     getApp().globalData.showExitBtn = true;
                //     wx.navigateTo({
                //         url: '/pages/index/index'
                //     });
                // }
                _resolve(res.data);
            }else {
                wx.showToast({
                    title:res.result.msg,
                    icon:'none'
                });
                wx.hideLoading();
                console.error(res);
            }
        },
        fail:function(res){
            wx.showToast({
                title:'请求失败',
                icon:'none'
            });
            wx.hideLoading();
            console.error(res);
        }
    };
    wx.request(obj);
    return promise;
}
