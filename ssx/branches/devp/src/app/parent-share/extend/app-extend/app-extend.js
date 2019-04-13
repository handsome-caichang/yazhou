
//跳转IM
app.gotoIM = function (obj) {
    var pstr = ""
    for (var k in obj) {
        pstr += `&${k}=${obj[k]}`
    }

    var url = app.sysInfo.IMURL + pstr

    console.log(url);
    location.href = url
};

