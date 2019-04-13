import store from 'teacher/store/index.js'

app.gotoIM = function (obj) {
    // 跳转到im的url
    var ImUrlPrev = `${app.sysInfo.IMURL.split('&teacherRole=')[0]}&redirect=&teacherRole=${store.state.currole.Id}`

    var pstr = ""
    for (var k in obj) {
        pstr += '&' + k + '=' + obj[k]
    }

    var url = ImUrlPrev + pstr

    // console.log(url);
    location.href = url
};

