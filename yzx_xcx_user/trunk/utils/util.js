const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const parseQuery = function(str = location.search) {
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
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const parseHash = (fullFash = location.hash) => {
    var queryStr = "", query = {}, 
        arr = fullFash.split('?'), 
        hash = arr[0];
    if (arr.length > 1) {
        queryStr = arr[1];
        query = parseQuery(queryStr);
    }
    return {
        fullFash : fullFash,
        hash: hash,
        hashArr: hash.slice(2).split('/'),
        queryStr : queryStr,
        query : query
    }
}

const jsonToQueryStr = (obj) => {
    let key, query = [];
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            query.push(`${key}=${obj[key]}`);
        }
    }
    return '?' + query.join('&');
}

module.exports = {
  formatTime: formatTime,
  parseHash: parseHash,
  jsonToQueryStr: jsonToQueryStr
}
