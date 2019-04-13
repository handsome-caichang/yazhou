const ENV = {
    isMobile: /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent),
}

const CONFIG = {
    MOVE_INTERVEL:5,   //touchmove或mousemove的触发间隔
    CANVAS_MUTIPLE:/iPod|iPad|/i.test(navigator.userAgent) ? 1 : 3,  //canvas大小倍数,在更大的画布上画出来的效果锯齿少一点
}

//画布的上下文,有阴影时lineCap只能用butt。
const CONTEXT_OPTION = {
    strokeStyle:'rgba(48,48,48,1)',   //画线颜色
    fillStyle:'rgba(255,255,255,0)',      //画线填充色
    lineWidth:CONFIG.CANVAS_MUTIPLE * 2,                        //画线宽度
    lineCap: 'round',                    //画线端点样式
    lineJoin:'round',                   //画线连接处

    //shadowBlur:CONFIG.CANVAS_MUTIPLE * 2,
    //shadowColor:'rgba(0,0,0,1)'
}

const CANVAS_OPTION = {
    background:'transparent',
    backgroundType:'color', //颜色,图片,随机水印
    animation:'none',
}


export {
    ENV,
    CONFIG,
    CONTEXT_OPTION,
    CANVAS_OPTION
}