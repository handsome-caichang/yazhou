const proxy = "https://miniproxy.xiaogj.com/Home/excute",
      KEY = '9355c2027d184436b23dfe4e9c37793e',
      rndLen = 10,
      app = getApp();

function rndNum(n){
    var rnd="";
    for(var i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10);
    return rnd;
}

function lowerCase(obj){
    let key,val,lowerKey;
    for (key in obj){
        if (typeof key === 'string'){
            val = obj[key];
            lowerKey = key.toLowerCase();
            obj[lowerKey] = typeof val === 'object' ? lowerCase(val) : val;
            if  (lowerKey !== key){
                delete obj[key];
            }
        }
    }
    return obj;
}


function toFormData(obj,dontEncode){
    let s = '',key,val;
    for (key in obj){
        val = (obj[key] === undefined || obj[key] === null)? '' : obj[key];
        if (typeof val === 'object'){
            val = JSON.stringify(val);
        }
        if (dontEncode){
            s += key + '=' + val + '&'
        } else {
            s += key + '=' + encodeURIComponent(val) + '&'
        }
    }
    return s.slice(0,s.length - 1);
}



function utf16ToUtf8(utf16Str) {
    let utf8Arr = [];
    let byteSize = 0;
    for (var i = 0; i < utf16Str.length; i++) {
        //获取字符Unicode码值
        var code = utf16Str.charCodeAt(i);

        //如果码值是1个字节的范围，则直接写入
        if (code >= 0x00 && code <= 0x7f) {
            byteSize += 1;
            utf8Arr.push(code);

            //如果码值是2个字节以上的范围，则按规则进行填充补码转换
        } else if (code >= 0x80 && code <= 0x7ff) {
            byteSize += 2;
            utf8Arr.push((192 | (31 & (code >> 6))));
            utf8Arr.push((128 | (63 & code)))
        } else if ((code >= 0x800 && code <= 0xd7ff)
            || (code >= 0xe000 && code <= 0xffff)) {
            byteSize += 3;
            utf8Arr.push((224 | (15 & (code >> 12))));
            utf8Arr.push((128 | (63 & (code >> 6))));
            utf8Arr.push((128 | (63 & code)))
        } else if(code >= 0x10000 && code <= 0x10ffff ){
            byteSize += 4;
            utf8Arr.push((240 | (7 & (code >> 18))));
            utf8Arr.push((128 | (63 & (code >> 12))));
            utf8Arr.push((128 | (63 & (code >> 6))));
            utf8Arr.push((128 | (63 & code)))
        }
    }

    return utf8Arr.map(item=>String.fromCharCode(item)).join('')
}


export function ajax(url,data,type='POST',dontEncode=false){
    let _resolve,
        promise = new Promise(resolve=>_resolve = resolve),
        sessionId = wx.getStorageSync('sessionId'),
        postData = toFormData(data,dontEncode),
        t = rndNum(rndLen),
        sign = app.MD5.hex_md5(utf16ToUtf8(app.domain + url + postData + sessionId + t + KEY));        
        
    let obj = {
        url:proxy,
        data:{
            url:app.domain + url,
            postData,
            sessionId,
            method:type == 'POST' ? 0 : 1,
            t,
            sign,
        },
        method:'POST',
        //header:header,
        success:function(res){
            if (res.statusCode == 200){
                //登陆超时
                if (res.data.errcode === 407){
                    getApp().globalData.showExitBtn = true;
                    wx.navigateTo({
                        url: '/pages/index/index'
                    });
                }
                _resolve(lowerCase(res.data));
            }else {
                wx.showToast({
                    title:res.ErrorMsg || res.errormsg || res.errmsg,
                    icon:'none'
                });
                wx.hideLoading();
                console.error(res);
                //@TODO 全局弹窗显示失败信息
            }
        },
        fail:function(res){
            wx.showToast({
                title:'请求失败',
                icon:'none'
            });
            wx.hideLoading();
            console.error(res);
            //@TODO 全局弹窗显示失败信息
        },
    };
    wx.request(obj);
    return promise;
}
