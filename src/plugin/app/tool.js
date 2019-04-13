import base from './base.js'

const tool = {};

// 去掉字符串首尾空格
tool.trim = function (str){
    return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');
}
// 将字符串中的 \r\n 转换中<br/>
tool.changeBr = function (str){   
    return str.replace(/\r\n/g,"<br/>");
}
tool.changeLine = function (str){   
    return str.replace(/\n|\r\n|\r/g,"<br/>")
}
tool.changeBlank = function (str){
    return str.replace(/\s/g,"&nbsp;")
}

//转义<>字符
tool.arrowFilter = function (s){
    if(!s)return "";
    var html = "";
    var buffer = "";
    for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        switch (c) {
        case '<':
            buffer += "&lt;";
            break;
        case '>':    
			buffer += "&gt;";
            break;
        case '&':
			buffer += "&amp;";
            break;
        case '"':
			buffer += "&quot;";
            break;
        case "'":
			buffer += "&#39;";
            break;
        default:
            buffer +=c;
        }
    }
    html = buffer.toString();
    return this.changeBr(html);
}

tool.trimAndFilter = function (str) {
	str = this.trim(str);
	str = this.arrowFilter(str);
	return str;
}

// 设置标题,设置微信web的title,主要为兼容IOS微信端
tool.setDocTitle = (function() {
    if (base.env === 'wx') {
        // iOS微信6.5.3及其之后的版本 window.__wxjs_is_wkwebview 为true时是使用WKWebview，为 false或者 “undefine”时是 UIWebview 。
        if ((base.isIDevice || base.isTouchPad) && !window.__wxjs_is_wkwebview) {
            return setDocTitleToIOS;
        } else {
            return setDocTitleToOther;
        }
    } else if (base.env === 'dd') {
        return setDocTitleToDingTalk
    } else if (base.env === 'xgj') {
        return function (titleStr) {
            app.sdk.setTitle(titleStr);
        }
    } else {
        return setDocTitleToOther
    }

    //  微信环境下并且 'UIWebview'的苹果设备设置title
    function setDocTitleToIOS(titleStr) {
        var doc = document;
        doc.title = titleStr;
        var iframe = doc.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = "/favicon1.ico";

        // iframe.src = "http://www.xiaogj.com/favicon.ico";
        // iframe.src = "/abc/abc";
        iframe.addEventListener("load", function() {
            setTimeout(function() {
                doc.body.removeChild(iframe);
            }, 0);
        });
        doc.body.appendChild(iframe);
    }

    // 其它设备设置title
    function setDocTitleToOther(titleStr) {
        document.title = titleStr;
    }

    // 钉钉环环境下设置title
    function setDocTitleToDingTalk(titleStr){
        dd.biz.navigation.setTitle({
            title : titleStr // 控制标题文本，空字符串表示显示默认文本
        });
    }
})();

tool.serilizeArray2JSON = function(a) {
    var o = {};
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}

tool.clone = function(obj) {
    var o;
    if (typeof obj == "object") {
        if (obj === null) {
            o = null;
        } else {
            if (obj instanceof Array) {
                o = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    o.push(this.clone(obj[i]));
                }
            } else {
                o = {};
                for (var j in obj) {
                    o[j] = this.clone(obj[j]);
                }
            }
        }
    } else {
        o = obj;
    }
    return o;
}

// 为了在移动端调试方便
tool.alert = function a (value) {
	if(typeof v == 'string'){
	    window.alert(value);
	}else{
		window.alert(JSON.stringify(value))
	}
}

// 将类似location中的字符串查询参数解析为对象
// http://www.baidu.com?name=jiajie&age=31&sex=1
tool.parseQuery = function(str = location.search) {
    let qs = str.indexOf("?") === -1 ? str : str.split('?')[1];
    if (qs.length > 0) {
        let s, q = {}, arr = [];
        arr = qs.split("&");
        for (let i = 0; i < arr.length; i++) {
            if(!arr[i])continue;
            s = arr[i].split('=');
            q[s[0]] = s[1];
        }
        return q;
    } else {
        return {};
    }
};

// 将location中的hash解析为包含hash、查询参数的对象
// http://mall.xiaogj.com/malltest/html/index.html#/details/1/5?cid=42
tool.parseHash = function(fullFash = location.hash){
    var queryStr = "", query = {}, 
        arr = fullFash.split('?'), 
        hash = arr[0];
    if (arr.length > 1) {
        queryStr = arr[1];
        query = tool.parseQuery(queryStr);
    }
    return {
        fullFash : fullFash,
        hash: hash,
        hashArr: hash.slice(2).split('/'),
        queryStr : queryStr,
        query : query
    }
}

// 将简单json对象转化为查询参数字符串;
tool.jsonToQueryStr = function (obj) {
    let key, query = [];
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            query.push(`${key}=${obj[key]}`);
        }
    }
    return '?' + query.join('&');
}

// 由于在微信分享时，微信会截断hash部分，所以在分享时需要先把hash及hash的查询部分转化为url的查询部分；
// 在分享后找开页面时先把url还原为单页spa应该有样子(见main.js)；
// path 应该传入要分享的路由页面的vue实例的$route.path
tool.parseToWXshareUrl = function (path) {
    let link, queryStr, searchObj = tool.parseQuery();
    if (!searchObj.app) {
        searchObj.app = base.wxAppId;
    }
    queryStr = app.tool.jsonToQueryStr({
        ...searchObj,
        hashFullPath: encodeURIComponent(path)
    });
    link = `${location.protocol}//${location.host}${location.pathname}` + queryStr;
    return link;
};

// 检查是否是通过微信分享进入应用的; 如果url中有hashFullPath查询参数,
// 说明是通过分享的链接进入应用的; 需要先还原为hash的方式;
tool.checkIsWXshareUrl = function () {
    let q = app.tool.parseQuery();
    let link = location.href.split("?")[0];

    if (q.app) {
        base.wxAppId = q.app
    }
    
    if (q.hashFullPath) {
        let path, query;
        path = q.hashFullPath;
        delete(q.hashFullPath)
        query = app.tool.jsonToQueryStr(q);

        link = link + query + '#' + decodeURIComponent(path);
        location.href = link;
    }
}

// 时间控制  返回一个函数 函数接受一个需要被控制时间的name 和控制的频率
tool.timeControl = function() {
    var timer = {};
    return function(name, time) {
        var last = 0;
        if (name in timer) {
            last = timer[name];
        }
        if (+new Date - last > time) {
            timer[name] = +new Date;
            return true;
        }
        return false;
    }
};

// 跟据传入的url,及router对象跳转
tool.gotoLink = function (url, router) {
    if (url.indexOf('#') !== 0) {
        if (url.indexOf('http') !== 0 && url.indexOf('//') !== 0) {
            url = 'http://' + url;
        }
        location.href = url;
    } else {
        let link = url.substring(1);
        if (link) {
            router.push(link);
        }
    }
}

//比较两个对象的内容是否相等
tool.isObjectEqual = function(a, b) {
    if (a === void 0) a = {};
    if (b === void 0) b = {};

    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
        return false;
    }
    return aKeys.every(key => {
        var aVal = a[key];
        var bVal = b[key];
        // check nested equality
        if (typeof aVal === 'object' && typeof bVal === 'object') {
            return this.isObjectEqual(aVal, bVal);
        }
        return String(aVal) === String(bVal);
    })
}

//判断对象是否为空对象
tool.isEmptyObject = function (obj) {
    for(var key in obj){
          return false
    };
    return true
}

let _reg = /<br\/?>$/;
let _map = {
    r: /\<|\>|\&|\r|\n|\s|\'|\"/g,
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    ' ': '&nbsp;',
    '"': '&quot;',
    "'": '&#39;',
    '\n': '<br/>',
    '\r': ''
}
// 对字符串进行转义
tool.escape = function(_content) {
    _content = tool.encode(_map, _content)
    return _content.replace(_reg, '<br/>');
}

tool.encode = function(_map, _content) {
    _content = '' + _content
    if (!_map || !_content) {
        return _content || ''
    }
    return _content.replace(_map.r, function($1) {
        var _result = _map[!_map.i ? $1.toLowerCase() : $1]
        return _result != null ? _result : $1
    });
};

// 从字符串中把链接识别出来
tool.replaceUrlToLink = function(str) {
    // 在字符串中匹配URL的正则：
    var reg = /((http|ftp|https):\/\/)?((([a-zA-Z0-9\._-]+\.[a-zA-Z]{1,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))[\/=\?%\-&_~`@\':+!]*([^<>\[\]\"\"\s\u4e00-\u9fa5])*)/gi;
    
    // 判断url是否以[http://, https://, ftp://]开头的正则
    var regHeader = /^(http|ftp|https):\/\//

    var result,
        start = 0,
        end = 0,
        href = "", //用于保存将要写在a标签href属性中的链接；
        substr = "",
        newStr = "";

    // 通过正则对象的exec方法,从传入的字符串中遂一匹配出所有合法URL;
    while ((result = reg.exec(str)) != null)  {
        end = reg.lastIndex;
        substr = str.substring(start,end);
        start = end;

        // 如果查找出的url不是以[http://, https://, ftp://]开头,则默认为http://开头;
        href = regHeader.test(result[0]) ? result[0] : ('http://' + result[0]);

        // 将提取到的字符串片段替换             
        substr = substr.replace(result[0],'<a target="_blank" class="text-link" href="' + href  + '">'+ result[0] +'</a>')
        
        // 组装新的字串
        newStr += substr;
    }
    // 加上最后没有匹配到的字串
    newStr += str.substring(start);

    return newStr;
}

// 从普通文本中把链接识别出来, 先把文本中相应特殊元素转义,在进行url识别;
// 转义的作用是，比如文本中可能会有 <script src=""></script> <a href="http://www.baidu.com"></a> 之类的文本。
// 这样就可以把这些变成普通文本进行展示;
// 参数escape 表是是否需要先转义（主要看传进来的str是否已经转义过了）
tool.textToHtml = function (str, escape = false) {
    // let text = escape ? app.tool.escape(str) : str, 
    let text = escape ? app.tool.escape(str) : str.replace(/\n/g,'<br/>'), 
        html;

    text = text.replace(/&lt;/gi, '<!@#$%0%$#@!>')
    text = text.replace(/&gt;/gi, '<!@#$%1%$#@!>')
    text = text.replace(/&nbsp;/gi, '<!@#$%2%$#@!>')
    text = text.replace(/&quot;/gi, '<!@#$%3%$#@!>')
    text = text.replace(/&#39;/gi, '<!@#$%4%$#@!>')
    text = text.replace(/<br\/>/gi, '<!@#$%5%$#@!>')

    html = this.replaceUrlToLink(text)

    html = html.replace(/<!@#\$%0%\$#@!>/gi, '&lt;')
    html = html.replace(/<!@#\$%1%\$#@!>/gi, '&gt;')
    html = html.replace(/<!@#\$%2%\$#@!>/gi, '&nbsp;')
    html = html.replace(/<!@#\$%3%\$#@!>/gi, '&quot;')
    html = html.replace(/<!@#\$%4%\$#@!>/gi, '&#39;')
    html = html.replace(/<!@#\$%5%\$#@!>/gi, '<br/>')

    return html
}

// 从富文本中把链接识别出来,
// 参数escape 表是是否需要先转义
tool.richTextToHtml = function (str, escape = false) {
    var regRule = '<[\s]*?a.*?>.*?<\/[\s]*?a[\s]*?>'
                + '|' 
                + '<[\s]*?img.*?>'
                + '|'
                + '<div class="voice" .*?></div>'
                + '|'
                + "<div class='voice' .*?></div>";
    var reg = new RegExp(regRule,'ig');
    var result,
        start = 0,
        end = 0,
        substr = "",
        newStr = "",
        str1 = "",
        str2 = "";

    // 通过正则对象的exec方法,从传入的字符串中遂一匹配出所有合法URL;
    while ((result = reg.exec(str)) != null)  {
        end = reg.lastIndex;
        substr = str.substring(start,end);
        start = end;

        var len = result[0].length;

        str1 = substr.slice(0, 0 - len);
        str2 = substr.slice(0 - len);

        // 组装新的字串
        newStr += (this.textToHtml(str1, escape) + str2 );
    }
    // 加上最后没有匹配到的字串
    substr = str.substring(start);

    newStr += this.textToHtml(substr, escape);

    return newStr;
}

// 根据下标获取开始结束时间：0今天，1昨天，2本周，3最近7天，4最近30天，5本月，6上月
tool.getDatesByIndex = function (code, date) {
    var Dates = getDates(date),
        d = Dates[code.toString()].split(",");
        
    return {
        sdate:d[0],
        edate:d[1]
    }
    function getDates (date) {
        var fmt = "yyyy-MM-dd",
            today = date ? app.filters.formatDatetime(new Date(date),fmt) : app.filters.formatDatetime(new Date(),fmt),
            today_num = Number(new Date(today)),
            oneday = 1000 * 24 * 60 * 60;
            
        var arr = today.split("-"),
            year = arr[0],
            month = Number(arr[1]) - 1,
            day = Number(arr[2]);
        var week = Number((new Date(today)).getDay());
        
        week = week == 0 ? 7 : week;

        var Dates = {
            "0": today + "," + today, //今天
            "1": app.filters.formatDatetime(Number(new Date(today))- oneday, fmt) + "," + app.filters.formatDatetime(Number(new Date(today)) - oneday, fmt),//昨天
            "2": app.filters.formatDatetime(new Date(year, month, day - week + 1), fmt) + "," + app.filters.formatDatetime(new Date(year, month, day + 6 - week + 1), fmt), //本周
            "3": app.filters.formatDatetime(new Date(year, month, day - 6), fmt) + "," +today,//最近7天
            "4": app.filters.formatDatetime(new Date(year, month, day - 29), fmt) + "," +today,//最近30天
            "5": app.filters.formatDatetime(new Date(year, month, 1), fmt) + "," + app.filters.formatDatetime(new Date(year, month + 1, 1) - oneday, fmt), //本月
            "6": app.filters.formatDatetime(new Date(year, month - 1, 1), fmt) + "," + app.filters.formatDatetime(new Date(year, month, 1) - oneday, fmt), //上月
        }
        return Dates;
    }
}

// 日历组件相关
const WEEK = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'],
      COUNT = 42; //7*6天的日历框
let today = new Date();
tool.getMonthDays = function(date,type){ //type：0从星期一到星期天，1从星期天到星期六
    let _date = new Date(formateDateString(date)),
        boxDays = [];
        
    (type === undefined) && (type = 0);
    _date.setDate(1); //置为第一天
    let weekday = _date.getDay(), //第一天是星期几
        _month = _date.getMonth()+1;
    
    let reduce = type != 0 ? 1- weekday   : 
                 weekday == 0 ? -5 :  2 -weekday;
    _date.setDate(reduce); //日历的第一天     
    for (let i = 0; i < COUNT;  i++ ){
        boxDays.push(getDateInfo(_date,_month));
        _date.setDate(_date.getDate()+1);
    }
    return boxDays;
}
function getDateInfo(date,_month){ //返回日期信息
    let weekday = date.getDay(),
        datestr = filterDate(date,'-');
    return {
        weekname: WEEK[weekday],
        weekday: weekday,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        datestr: datestr,
        thisMonth: date.getMonth() + 1 == _month,
        isToday: datestr == filterDate(today,'-')
    }
}
function filterDate(date,sign){ //格式化日期
    if (date instanceof Date){
        let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate();
        return year + sign + (month < 10 ? '0' + month : month ) + sign + (day < 10 ? '0' + day : day);
    } 
}

function formateDateString(date){
    return date.replace('T',' ').replace(/-/g,'\/');
}

// 判断操作权限
tool.op = function (params) {
    var R = app.sysInfo.Rights
    if (R) { // 说明是老版
        return app.sysInfo.IsAdmin || R.indexOf(params)!==-1;
    } else { // 说明是smart版
        return true
    }
    
}

//检查查询关键字:位数限制,数字4位,字母2位,中文不限
tool.checkQueryLength = function(query){
    if (query.length == 0){
        return "请输入需要查询学员的姓名/学号/电话。";
    }
    if (query.length >=4){
        return false;
    }
    if (/[\u4e00-\u9fa5]+/.test(query)){
        return false;
    }
    if (/\d{4,}|[a-zA-z]{2,}/.test(query)){
        return false;
    }
    return "查询关键字长度不够。";
}

tool.getAbsUrl = function (url) {
    let rdeuce = /\/\w+\/\.\./,
        parentUrl = location.protocol+'//'+location.host;
    if (!isAbsUrl(url)) {
        url = joinPath(parentUrl, url)
    }else if (url.indexOf('http') !== 0) {
        url = 'http:' + url;
    }
    return url;

    function joinPath(a, b) {
        //末尾
        if (a.charAt(a.length - 1) !== "/") {
            a += "/"
        }

        //相对于兄弟路径
        if (b.slice(0, 2) === "./") {
            return a + b.slice(2)
        }
        if (b.slice(0, 1) === "/") {
            return a + b.slice(1)
        }

        //相对于父路径
        if (b.slice(0, 2) === "..") {
            a += b // example: d/a/../b/c
            while (rdeuce.test(a)) {
                a = a.replace(rdeuce, "")
            }
            return a
        }
        return a + b
    }

    function isAbsUrl(path) {
        return /^(?:[a-z]+:)?\/\//i.test(String(path))
    }
}


// 根据传入的ms(毫秒)数，转换成'm:ss'或'h:mm:ss'格式
// 主要用于视频时长的识别 
// duration: 时长，可传ms,s; 默认认为转入的单位是ms;
// flag 是否需要把duration转变成秒，如果duration转的是‘秒’则需要传入false;
tool.transVideoDur = function (duration, flag = true) {
    let dur = flag ? Math.floor(duration/1000) : duration,
        s = dur%60,
        m = Math.floor(dur%3600/60),
        h = Math.floor(dur/3600)

    s < 10 && (s = `0${s}`)

    if (h > 0) {
        m < 10 && (m = `0${m}`)
        return `${h}:${m}:${s}`
    } else {
        return `${m}:${s}`
    }
}

// 获取input表单选中的本地视频文件的可播放地址及时长;
// 微信环境不支持video标签直接加载本地视频文件，因此本方法暂时没有用起来;
tool.getVideoFileInfo = function (file) {
    let url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }

    return new Promise(resolve => {
        let ve = document.createElement('video')
        ve.preload = true
        ve.src = url

        let int = setInterval(()=>{
            let duration = ve.duration;
            if(duration){
                clearInterval(int)
                console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                console.log({
                    localurl: url,
                    dur: duration
                });
                resolve({
                    localurl: url,
                    dur: duration
                })
            }
        },50)
    })
}

// 格式化文件大小
tool.formatFileSize = (function () {
    var result,
        K = 1024,
        M = 1024*1024,
        G = 1024*1024*1024,
        T = 1024*1024*1024*1024

    return function (size) {
        if (size < K) {
            result = `${size}B`
        } else if (size < M) {
            result = `${Math.floor(size/K)}KB`
        } else if (size < G) {
            result = `${(size/M).toFixed(2)}MB`
        } else if (size < T) {
            result = `${(size/G).toFixed(2)}GB`
        }
        return result
    }    
})()





// 将vue常规路由转换为我们自定义路由的方法, 只需在'new VueRouter' 之前对转入的'routes'进行转化便可;
const routerBus = () => Promise.resolve(Vue.options.components.routerBus)
tool.transRoutes = function transRoutes (routes) {
    routes.forEach(route => {
        if (!route.meta) {
            route.meta = {
                page: route.component
            }
        } else if (!route.meta.page) {
            route.meta.page = route.component
        }
        route.component = routerBus
    })

    return routes
}

export default tool;