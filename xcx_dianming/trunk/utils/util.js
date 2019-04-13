const formatDatetime = function(validDate, fmt) {
    if (typeof validDate === 'string'){
        validDate = validDate.replace('T',' ').replace(/-/g,'\/');
    }

    let date = new Date(validDate);
    if (isNaN(date.getTime())){
        console.error('非法date，无法转化：',validDate);
        return '';
    }

    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) 
        	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

const checkQueryLength = query => { //配置项开启，检查查询关键字：位数限制，数字4位，字母2位，中文不限
    if (query.length==0) {
        return "请输入需要查询学员的姓名/学号/电话。"
    }
    if (query.length>=4) {
        return false;
    }
    if (/\W+/.test(query)) {
        return false;
    }
    if (/\d{4,}|[a-zA-Z]{2,}/.test(query)) {
        return false;
    }
    return "查询关键字长度不够。";
}

const convertHtmlToText = inputText => {
    var returnText = "" + inputText;
    returnText = returnText.replace(/<\/div>/ig, '\r\n');
    returnText = returnText.replace(/<\/li>/ig, '\r\n');
    returnText = returnText.replace(/<li>/ig, '  *  ');
    returnText = returnText.replace(/<\/ul>/ig, '\r\n');
    returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");
    returnText = returnText.replace(/<p.*?>/gi, "\r\n");
    returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");
    returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    returnText = returnText.replace(/<(?:.|\s)*?>/g, "");
    returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");
    returnText = returnText.replace(/ +(?= )/g, '');
    returnText = returnText.replace(/ /gi, " ");
    returnText = returnText.replace(/&/gi, "&");
    returnText = returnText.replace(/"/gi, '"');
    returnText = returnText.replace(/</gi, '<');
    returnText = returnText.replace(/>/gi, '>');
    return returnText;
}


const confirm = function(content){
    let _resolve,
        pro = new Promise(resolve=>{_resolve = resolve}),
        obj ={
            title: '提示',
            content: '',
            showCancel: true,
            cancelColor:'#333',
            confirmColor:'#1E88F5'
        }
    if (typeof content === 'object'){
        Object.assign(obj,content);
    } else {
        obj.content = content;
    }
    wx.showModal({
        ...obj,
        success:function({confirm}){
            confirm && _resolve(true)
        },
    });
    return pro;
}

module.exports = {
    formatDatetime,
    checkQueryLength,
    convertHtmlToText,
    confirm
}
