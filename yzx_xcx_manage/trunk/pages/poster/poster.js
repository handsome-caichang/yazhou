const app = getApp();

import render from './canvas/canvas.js';
import {getshareshow} from '../../api/api.js';
import {transGroupBuy,transBargain,transLedflet} from './data/data.js';

const HEIGHT = 500;

Page({
    data:{
        cvsHeight:HEIGHT,
        info:{},
        savedPic:'',
        mainimgs: [
            "https://cdn01.xiaogj.com/file/d7b69ec20e754a61bf4c00ea6a177435/201904/4c1927cd33da4b978f5e4a115f4e1887.png",
            "https://cdn01.xiaogj.com/file/d7b69ec20e754a61bf4c00ea6a177435/201904/4c1927cd33da4b978f5e4a115f4e1887.png",
            "https://cdn01.xiaogj.com/file/7e41988756854abbbede89231a01a7dc/201904/a6b48f3b51dd49e6a1939178bcf0059b.png",
            "https://cdn01.xiaogj.com/file/de384402a6874398832d2cb8ddb77e25/201904/bfa6233707c448d2abdce04d89398124.png"
        ],
        descs: [
            '亲，我发现一个好课程，大家快来一起来拼团吧～',
            '亲，我发现一个好课程，大家快来一起来拼团吧～',
            '亲，就差你了，快来帮我砍价，砍到底价好上课～',
            'Hi，朋友们，我发现了一门好课，大家快来看看吧～'
        ],
        ifSavePhotos: true
    },
    onLoad(options){
        wx.getSetting({
            success:(res) => {
                if (res.authSetting["scope.writePhotosAlbum"] != undefined) {
                    this.setData({
                        ifSavePhotos:res.authSetting["scope.writePhotosAlbum"]
                    });
                }
            }
        })
        wx.showLoading({
            title: '海报生成中...',
            mask: true
        })
        getshareshow({
            shareid: decodeURIComponent(options.shareid)
        }).then(res=> {
            if(res.result.code == 200){
                let type = options.activitytype;
                res.data.mainimg = this.data.mainimgs[+type];
                res.data.name = this.data.descs[+type];
                
                let template = type==1?transGroupBuy(res.data):type==2?transBargain(res.data):transLedflet(res.data);
                this.setData({
                    cvsHeight: template[template.length-1].cvsHeight || HEIGHT,
                    info:options.info ? JSON.parse(decodeURIComponent(options.info)): {}            
                });

                let data = template[template.length-1].cvsHeight ? template.slice(0,template.length - 1) : template;
                        
                setTimeout(() => {
                    let query = wx.createSelectorQuery();
                    query.select('.canvas').boundingClientRect();
                    query.exec(rect=>{
                        const context = wx.createCanvasContext('cvs');                
                        render(context,rect[0].width,rect[0].height,data,this.drawPoster);
                    });    
                }, 100);
            }else{
                wx.showToast({
                    title: res.result.msg,
                    icon: "none",
                    duration: 2000
                })
            }
        })
    },
    callback(res) {
        let authSetting = res.detail.authSetting;
        if (authSetting['scope.writePhotosAlbum'] != undefined) {
            this.setData({
                ifSavePhotos: authSetting["scope.writePhotosAlbum"]
            });
            if (authSetting['scope.writePhotosAlbum']) {
                this.savePoster();
            }
        }
    },
    drawPoster(){
        let that = this;
        wx.canvasToTempFilePath({
            canvasId: 'cvs',
            quality: 1,
            success(res){
                wx.hideLoading();
                that.setData({
                    savedPic:res.tempFilePath
                });                
            }
        })
    },
    savePoster(){ //保存至本地     
        let that = this;
        wx.saveImageToPhotosAlbum({
            filePath: this.data.savedPic,
            success() {
                wx.showToast({
                    title: '海报已保存至相册~'
                })
            },
            fail() {
                wx.getSetting({
                    success:(res) => {
                        if (res.authSetting["scope.writePhotosAlbum"] != undefined) {
                            that.setData({
                                ifSavePhotos:res.authSetting["scope.writePhotosAlbum"]
                            });
                        }
                    }
                })
                wx.showToast({
                    title: '海报保存失败',
                    icon: 'none'
                })
            }
        });

    }
});