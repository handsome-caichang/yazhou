const app = getApp();


Page({
    data:{
        list:[]
    },
    onLoad(){

    },
    onShow(){
        console.log(app.globalData.userList);
        this.setData({
            list:app.globalData.userList
        })
    },
    changeLogin(e){
        let dataset = e.currentTarget.dataset;

        //切换学校,用户;
        app.globalData.companyKey = dataset.key;
        app.globalData.userid = dataset.userid;

        app.globalData.redirectUrl = 'https://mall.xiaogj.com/' + dataset.key + '/api/page/wxlogin?source=4&userID=' + dataset.userid + '&openID=' + app.globalData.openid + '&redirectUrl=' + app.globalData.companyUrl();       
        wx.redirectTo({
            url: '/pages/mall/mall'
        })
    },
    addUser(){
        app.globalData.showExitBtn = true;
        wx.redirectTo({
            url:'/pages/index/index'
        });
    }
})