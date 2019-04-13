const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const parseQuery = (str = location.search)=> {
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

module.exports = {
  formatTime: formatTime,
  parseQuery: parseQuery
}
