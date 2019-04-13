const shareName = '__protocal' + Date.now() + '__';


let idCount = 0;

function createID(){
    return Date.now() + '$' + idCount++;
}



const send = (function(){
    let pool = {};

    window[shareName] = function exec(id){
        let fn = pool[id];
        delete pool[id];        //一次性.
        return fn;
    };

    return function (fn){
        let id = createID();
        pool[id] = fn;
        return `window.${shareName}('${id}')`;             //exec(id)(...)
    }
})();


const codeMap = {
        '200':'success',
        '400':'cancel',
        '500':'fail'
    },
    complete ='compelete';  //不管成功失败,最终都要调用.
    

function wxApi(appRequest){

    return function(opt){

        function callback(dataStr){
            let {data,code} = JSON.parse(dataStr);
            if (!codeMap[code]){
                throw new Error('错误状态码:' + code);
            }
            let fnName = codeMap[code + ''];
            opt[fnName](data);
            opt[complete] && opt[complete](data);
        }
        let optStr = JSON.stringify(opt),           //不包含函数
            cbName = send(callback);
        appRequest(optStr,cbName);
    }
}


var wxTemp = {};
wxTemp.chooseImage = wxApi(appRequest.chooseImage);

export default wxTemp;
