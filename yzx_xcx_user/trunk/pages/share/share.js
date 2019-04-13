const app = getApp();
import render from './canvas/canvas.js';
import {getshareshow} from '../../api/api.js';
import {transGroupBuy,transBargain,transLedflet} from './data/data.js';

const HEIGHT = 500;

Page({
    data:{
        cvsHeight:HEIGHT,
        info:{},
        template:{},
        options: {},
        createCvs:false,
        cvsData:[],
        savedPic:'',
        mainimgs: [
            "https://cdn01.xiaogj.com/file/eb7ee5a58cd2430cba197189c404ac51/201904/e807efec97d9422cb21ed5b44a28f468.png",
            "https://cdn01.xiaogj.com/file/eb7ee5a58cd2430cba197189c404ac51/201904/e807efec97d9422cb21ed5b44a28f468.png",
            "https://cdn01.xiaogj.com/file/822b07f69a61409883212a8beef7a5d1/201904/9a96c405568b469eb4830eae1d64cbd4.png",
            "https://cdn01.xiaogj.com/file/860daec9701d4e96b281778191f98d6e/201904/96b9745bd78b41c482f80032013c84fe.png"
        ],
        postmainimgs: [
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
        tips: [
            '快去邀请好友来拼团吧~',
            '快去邀请好友来拼团吧~',
            '快去邀请好友来砍价吧~',
            '名额有限，先到先得~',
        ],
        ifSavePhotos: true
    },
    onLoad(options){
        console.log(options)
        this.setData({
            options: options,
            template: {
                title: this.data.descs[options.activitytype],
                mainimg: this.data.mainimgs[options.activitytype],
                tips: this.data.tips[options.activitytype]
            }
        });
        wx.getSetting({
            success:(res) => {
                if (res.authSetting["scope.writePhotosAlbum"] != undefined) {
                    this.setData({
                        ifSavePhotos:res.authSetting["scope.writePhotosAlbum"]
                    });
                }
            }
        })
    },
    createPoster(){ //生成海报
        getshareshow({
            shareid: this.data.options.shareid,
            ruleid: this.data.options.ruleid
        }).then(res=> {
            if(res.result.code == 200){
                let type = res.data.entertype;
                res.data.mainimg = this.data.postmainimgs[+type];
                res.data.name = this.data.descs[+type];
                let template = type==1?transGroupBuy(res.data): (type==2?transBargain(res.data):transLedflet(res.data));
                console.log(template)
                this.savePop(template);
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
                this.createPoster();
            }
        }
    },
    savePop(template) {
        this.setData({
            cvsHeight: template[template.length-1].cvsHeight || HEIGHT,
            info:this.data.options.info ? JSON.parse(decodeURIComponent(this.data.options.info)): {},
            createCvs:true,
            cvsData:template[template.length-1].cvsHeight ? template.slice(0,template.length - 1) : template
        });

        let query = wx.createSelectorQuery();
        query.select('.canvas').boundingClientRect();
        query.exec(rect=>{
            const context = wx.createCanvasContext('cvs');                
            render(context,rect[0].width,rect[0].height,this.data.cvsData,this.drawPoster);
        });

        wx.showToast({
            title: '海报生成中...',
            icon: 'loading',
            duration: 1000
        });
        // setTimeout(() => {
        //     let that = this;
        //     wx.canvasToTempFilePath({
        //         canvasId: 'cvs',
        //         quality: 1,
        //         success(res){
        //             that.setData({
        //                 savedPic:res.tempFilePath
        //             }); 
        //             wx.saveImageToPhotosAlbum({
        //                 filePath: res.tempFilePath,
        //                 success() {
        //                     wx.showToast({
        //                         title: '海报已保存至相册~'
        //                     })
        //                 },
        //                 fail() {
        //                     wx.showToast({
        //                         title: '保存海报失败',
        //                         icon: 'none'
        //                     })
        //                 }
        //             });
        //         }
        //     })
        // }, 100);
    },
    drawPoster(){
        let that = this;
        wx.canvasToTempFilePath({
            canvasId: 'cvs',
            quality: 1,
            success(res){
                that.setData({
                    savedPic:res.tempFilePath
                }); 
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
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
                            title: '保存海报失败',
                            icon: 'none'
                        })
                    }
                });
            }
        })
    },
    closeCvs(){
        this.setData({
            createCvs: false,
            savedPic: ''
        })
    },
    onShareAppMessage(){
        let pageUrl = 'pages/index/index?returl=' + encodeURIComponent(app.globalData.envHost+'/user/index.html#/templateDetail/'+ this.data.options.styleid+'?&id='+this.data.options.shareid + '&ruleid=' + this.data.options.ruleid),
            data = {
                title: this.data.descs[parseInt(this.data.options.activitytype)],
                path: pageUrl,
                imageUrl: this.data.mainimgs[parseInt(this.data.options.activitytype)]
            };
        return data;
    }
});