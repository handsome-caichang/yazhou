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

app.lowerCase = function(obj){
    let key,val,lowerKey;
    for (key in obj){
        if (typeof key === 'string'){
            val = obj[key];
            lowerKey = key.toLowerCase();
            obj[lowerKey] = typeof val === 'object' ? app.lowerCase(val) : val;
            if  (lowerKey !== key){
                delete obj[key];
            }
        }
    }
    return obj;
}
