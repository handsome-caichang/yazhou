

/*----------------------------------------------------------------------------------------------------*/
import wxApi from './protocol.js';

let appRequest = {
    //假设原生是这样调用的:
    chooseImage:function(optStr,callback){
        let opt = JSON.parse(optStr);
        console.log(opt);

        let returnData = JSON.stringify({
            data:'hello,world',
            code:200
        })

        //交互方式:
        window.exec1 = function(){
            eval(callback)(returnData);
        }
    }
}

window.wxTemp = {};
wxTemp.chooseImage = wxApi(appRequest.chooseImage);

/*----------------------------------------------------------------------------------------------------*/


