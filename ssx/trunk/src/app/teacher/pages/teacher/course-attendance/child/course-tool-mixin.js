export default {
    methods:{
        //处理上课时长
        getCourseTime(type, day, start, dura, end) {
            var dayArr = day.split('-'),
                startArr = start.split(':'),
                duraArr = dura.split(':'),
                endArr = end && end.split(':'),
                date = new Date();

            if (type == 0) { //0：修改开始时间/修改上课时长
                let sTime = new Date(dayArr[0], parseInt(dayArr[1]) - 1, dayArr[2], startArr[0], startArr[1]),
                    dTime = duraArr[0] * 3600 * 1000 + duraArr[1] * 60 * 1000;

                date.setTime(sTime.getTime() + dTime);
                return this.formatDate(date, 'hh:mm');
            } else if (type == 1) { //：1计算上课时长
                let sTime = new Date(dayArr[0], parseInt(dayArr[1]) - 1, dayArr[2], startArr[0], startArr[1]),
                    eTime = new Date(dayArr[0], parseInt(dayArr[1]) - 1, dayArr[2], endArr[0], endArr[1]);

                return eTime.getTime() - sTime.getTime();
            }
        },
        //格式化时间
        formatDate(date, format) {
            let o =
                {
                    "M+": date.getMonth() + 1, //month
                    "d+": date.getDate(),    //day
                    "h+": date.getHours(),   //hour
                    "m+": date.getMinutes(), //minute
                    "s+": date.getSeconds(), //second
                    "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
                    "S": date.getMilliseconds() //millisecond
                }
            if (/(y+)/.test(format))
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(format))
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            return format;
        }
    }
}