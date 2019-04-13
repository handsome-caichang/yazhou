let app = getApp();

let queue = app.globalData.Queue();
Component({
    properties: {
        list2: {
            type: Array,
            value: [],
            observer(newval) {
                queue = app.globalData.Queue();
                this.setData({
                    list: [...newval],
                    pathData: [...newval],
                    showAdd: newval.length
                });
            }
        },
        courseID: {
            type: String,
            value: ''
        }
    },
    data: {
        IMG: app.globalData.IMG,
        list: [],
        showAdd: 0,
        pathData: [], //上传后的地址
    },
    methods: {
        chooseImg() {
            wx.chooseImage({
                count: 9 - this.data.showAdd,
                sourceType: ['album', 'camera'],
                sizeType: ['compressed', 'original'],
                success: res => {
                    console.log(res.tempFiles);
                    this.data.list.push(...res.tempFiles);
                    console.log(this.data.list);
                    this.setData({
                        list: this.data.list,
                        showAdd: this.data.showAdd + res.tempFiles.length
                    })

                    
                    res.tempFiles.forEach(item=>{
                        this.uploadImg(item.path)    
                    });
                },
                fail:function(e){
                    // wx.showToast({title:'调用图片接口失败',icon:'none'});
                },
            });
        },
        getOssConfig() {
            return new Promise((resolve, reject) => {
                wx.request({
                    url: 'https://fs.xiaogj.com/getSignature', // 仅为示例，并非真实的接口地址
                    method: "POST",
                    data: 'companyid=' +app.companyid,
                    header:{
                        'content-type':'application/x-www-form-urlencoded'
                    },                    
                    complete(res) {
                        if (res.statusCode && res.statusCode === 200) {
                            resolve(res.data.Data)
                        } else {
                            reject(res)
                        }
                    }
                })
            })
        },
        uploadImg(filePath) {
            var lastPointIndex = filePath.lastIndexOf('.'),
                ext = filePath.slice(lastPointIndex);

            return this.getOssConfig()
                .then(config => {
                    var key = `${config.objectkey}/${app.openid}/${new Date().getTime()}${ext}`,
                        that = this;

                    queue.push((rsv, rej) => {
                        wx.uploadFile({
                            url: config.Host, // 仅为示例，非真实的接口地址
                            filePath: filePath,
                            name: 'file',
                            formData: {
                                name: filePath,
                                key: key,
                                policy: config.policy,
                                OSSAccessKeyId: config.AccessId,
                                success_action_status: "200",
                                callback: config.callback,
                                signature: config.signature,
                                "x:companyid": app.companyid,
                                "x:courseid": that.properties.courseID
                            },
                            complete(res) {
                                console.log("uploadFile ==>>> complete, res =>>> ", res);
                                if (res.statusCode && res.statusCode === 200) {
                                    let bucket = JSON.parse(res.data)
                                    var imgInfo = {
                                        imgSuffix: ext,
                                        path: bucket.CDN
                                    }
                                    that.data.pathData.push(imgInfo);

                                    console.log(imgInfo);

                                    rsv();
                                } else {
                                    rej(res.data);
                                }
                            }
                        });
                    });
                })
                .catch(err => {
                    console.log("uploadFile ==>>> catch  =>>>>>>>>> ", err);
                    return Promise.reject(err)
                })
        },
        previewImage({
            target
        }) {
            let src = target.dataset.src;
            wx.previewImage({
                current: src,
                urls: this.data.list.map(item => item.path)
            });
        },

        delete({target}) {
            this.data.list.splice(+target.dataset.index, 1);
            this.data.pathData.splice(+target.dataset.index, 1);
            console.log(this.data.pathData);
            this.data.showAdd -= 1;
            this.setData({
                list: this.data.list,
                pathData: this.data.pathData,
                showAdd: this.data.showAdd
            })
        },
        isFinished() {
            return queue.isFinished.flag;
        }
    }
})