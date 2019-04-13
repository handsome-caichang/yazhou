export function clone(obj){
    return typeof obj === 'object' ? JSON.parse(JSON.stringify(obj)) : obj;
}

//option:要混合的echarts的option,extend:要扩展的配置(样式)
export function mixin(optionOrigin,extend){
    if (Array.isArray(optionOrigin) + Array.isArray(extend) === 1){
        console.error('mixin的类型不匹配:',optionOrigin,extend);
    }

    let option = clone(optionOrigin);
    Object.keys(extend).forEach(key=>{
        if (typeof extend[key] !=='object' || option[key] === undefined){//如果不是对象,则无须递归
            option[key] = extend[key];      //直接覆盖或添加
        } else {
            if (option[key] === undefined){
                //必须先创建对象,让递归到下一级时,可以取值.
                if (Array.isArray(extend[key])){ 
                    option[key] = [];
                } else {
                    option[key] = {};
                }
            } 
            option[key] = mixin(option[key],extend[key]);
        }
    })
    return option;
}


export function createFactory(baseOption){
    function factory(){
        Object.assign(this,clone(baseOption));
    }
    factory.prototype.mix = function(extendOption){
        Object.assign(this,mixin(this,extendOption));
        return this;
    }
    return factory;
}

export function offset(target){
    let top = 0,
        left = 0;
    while(target.offsetParent) {
        top += target.offsetTop
        left += target.offsetLeft
        target = target.offsetParent
    }
    return {
        top: top,
        left: left,
    }
}

//处理兼容性的new Date
export function dateCreate(date){
    if (typeof date === 'string'){
        date = date.replace('T', ' ').replace(/-/g,'/').slice(0,19);
    }
    const d = new Date(date);
    if ( isNaN(d.getTime()) ){
        console.error("date转化日期有误");
    }
    return d;
}


//自适应宽度(固定宽度容器,调整文本font-size,使得可以容纳)
export function adaptFont(container,str){
    if (!container){
        return '12px';
    } else{
        let width =  parseFloat(getComputedStyle(container).width),
            len = str.length;
        if (str.indexOf('万')>-1){
            len++;
        }
        let size = 1.9 * (width - 5) / len;
        return size > 25 ? '25px' : size < 12 ? '12px' : parseInt(size) + 'px';
    }
}




//生成百分比趋势.
function calcTrendRate(arr,key){
    if (key.toLowerCase().indexOf('rate') > -1){
        return arr.map((item,index)=>{
            if (index === 0 || item[key] == arr[index-1][key]){
                return NaN;
            } else {
                return (item[key] - arr[index - 1][key]).toFixed(2);
            }
        });
    }

    return arr.map((item,index)=>{
        let rate;
            if (index === 0 ||arr[index-1][key] == 0 ){
                rate = NaN;
            } else {
                rate = (item[key] - arr[index - 1][key]) / arr[index - 1][key];
                rate = (rate * 100).toFixed(2);
            }
        return rate;
    });
}

//排序,计算比例,输出标准结构的数组.
export function transTrend(trend,formt,key,show = ''){
    let result = [];
    result[0] = trend.map(
        item=>app.filters.formatDatetime(item.Date || item.date,formt)
    );

    let rateArr = calcTrendRate(trend,key);
    result[1] =trend.map((item,index)=>{
        return {
            name:app.filters.formatDatetime(item.Date || item.date,'yyyy'),
            value:item[key],
            rate:rateArr[index],
            valueShow:Number(item[key]).toFixed(2) + show
        }
    });
    return result;
}