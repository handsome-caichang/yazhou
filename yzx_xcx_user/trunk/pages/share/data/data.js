//从后台拿到需要渲染的海报数据.需转化一下数据
//转化拼团数据
function transGroupBuy(data) {
    let group = [{
        type:'img',
        content:data.avatar,
        render:'img-circle',
        left:0,
        top:0,
        width:45,
        height:45,
    },{
        type:'text',
        content:data.name,
        render:'text-normal',
        left:60,
        top:0,
        width:w=>w-60,  //最大宽度,多了会添加省略号
        height:45,
        font:'normal bold 16px sans-serif',
        color:'#333',
        lineHeight:22,
    },{            
        type:'img',
        content:data.mainimg,           
        render:'img-normal',
        left:0,
        top:70,
        width:w=>w,
        height:140,                
    },{
        type:'text',
        content:'原价：',
        render:'text-normal',
        left:0,
        top:230,
        width:75,
        height:20,
        font:'normal 15px sans-serif',
        color:'#333',
    },{
        type:'text',
        content:'￥'+data.fullprice,
        render:'text-decoration',
        left:75,
        top:230,
        width:200,  //最大宽度,多了会添加省略号
        height:15,
        font:'normal 12px sans-serif',
        color:'#999',
    },{
        type:'text',
        content:'拼团价：',
        render:'text-normal',
        left:0,
        top:260,
        width:75,
        height:20,
        font:'normal 15px sans-serif',
        color:'#333',
    },{
        type:'text',
        content:'￥'+data.discountprice,
        render:'text-normal',
        left:75,
        top:258,
        width:200,      //最大宽度,多了会添加省略号
        height:20,
        font:'normal 18px sans-serif',
        color:'#FE5C00',
    },{
        type:'text',
        content:data.groupneed+'人成团',
        render:'text-outline',
        left:140,
        top:260,
        width:150,      //最大宽度,多了会添加省略号
        height:16,
        lineHeight:16,
        font:'normal 13px sans-serif',
        color:'#FE0600',
    },{
        type:'text',
        content:'长按图片识别小程序',
        render:'text-wrap',
        left:0,
        top:310,
        width:w=>w,
        height:15,
        font:'normal 12px sans-serif',
        color:'#888'
    },{
        type:'img',
        content:data.qrcodeurl,
        render:'img-normal',
        left:w=>w/2 - 45,
        top:350,
        width:90,
        height:90,                
    },{
        type:'text',
        content:'可生成海报发送微信朋友圈',
        render:'text-center',
        left:0,
        top:450,
        width:w=>w,
        height:15,
        font:'normal 12px sans-serif',
        color:'#AAA'
    },{
        cvsHeight:500
    }];
    return group
}

//转化砍价数据
function transBargain(data) {
    let bargain = [{
        type:'img',
        content:data.avatar,
        render:'img-circle',
        left:0,
        top:0,
        width:45,
        height:45,
    },{
        type:'text',
        content:data.name,
        render:'text-normal',
        left:60,
        top:0,
        width:w=>w-60,  //最大宽度,多了会添加省略号
        height:45,
        font:'normal bold 16px sans-serif',
        color:'#333',
        lineHeight:22,
    },{            
        type:'img',
        content:data.mainimg,           
        render:'img-normal',
        left:0,
        top:70,
        width:w=>w,
        height:140,                
    },{
        type:'text',
        content:'原价：',
        render:'text-normal',
        left:0,
        top:230,
        width:75,
        height:20,
        font:'normal 15px sans-serif',
        color:'#333',
    },{
        type:'text',
        content:'￥'+data.fullprice,
        render:'text-decoration',
        left:75,
        top:230,
        width:200,  //最大宽度,多了会添加省略号
        height:15,
        font:'normal 12px sans-serif',
        color:'#999',
    },{
        type:'text',
        content:'最低可砍至价：',
        render:'text-normal',
        left:0,
        top:260,
        width:120,
        height:20,
        font:'normal 15px sans-serif',
        color:'#333',
    },{
        type:'text',
        content:'￥'+data.discountprice,
        render:'text-normal',
        left:120,
        top:258,
        width:200,      //最大宽度,多了会添加省略号
        height:20,
        font:'normal 18px sans-serif',
        color:'#FE5C00',
    },{
        type:'text',
        content:'长按图片识别小程序',
        render:'text-wrap',
        left:0,
        top:310,
        width:w=>w,
        height:15,
        font:'normal 12px sans-serif',
        color:'#888'
    },{
        type:'img',
        content:data.qrcodeurl,
        render:'img-normal',
        left:w=>w/2 - 45,
        top:350,
        width:90,
        height:90,                
    },{
        type:'text',
        content:'可生成海报发送微信朋友圈',
        render:'text-center',
        left:0,
        top:450,
        width:w=>w,
        height:15,
        font:'normal 12px sans-serif',
        color:'#AAA'
    },{
        cvsHeight:500
    }];
    return bargain
}

//转化微传单数据
function transLedflet(data) {
    let bargain = [{
        type:'img',
        content:data.avatar,
        render:'img-circle',
        left:0,
        top:0,
        width:45,
        height:45,
    },{
        type:'text',
        content:data.name,
        render:'text-normal',
        left:60,
        top:0,
        width:w=>w-60,  //最大宽度,多了会添加省略号
        height:45,
        font:'normal bold 16px sans-serif',
        color:'#333',
        lineHeight:22,
    },{            
        type:'img',
        content:data.mainimg,           
        render:'img-normal',
        left:0,
        top:70,
        width:w=>w,
        height:140,                
    },{
        type:'text',
        content:'名额有限，先到先得',
        render:'text-center',
        left:0,
        top:250,
        width:w=>w,
        height:15,
        font:'normal 15px sans-serif',
        color:'#333'
    },{
        type:'text',
        content:'长按图片识别小程序',
        render:'text-wrap',
        left:0,
        top:310,
        width:w=>w,
        height:15,
        font:'normal 12px sans-serif',
        color:'#888'
    },{
        type:'img',
        content:data.qrcodeurl,
        render:'img-normal',
        left:w=>w/2 - 45,
        top:350,
        width:90,
        height:90,                
    },{
        type:'text',
        content:'可生成海报发送微信朋友圈',
        render:'text-center',
        left:0,
        top:450,
        width:w=>w,
        height:15,
        font:'normal 12px sans-serif',
        color:'#AAA'
    },{
        cvsHeight:500
    }];
    return bargain
}

export {
    transGroupBuy,
    transBargain,
    transLedflet
};