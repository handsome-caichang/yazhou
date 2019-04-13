import http from '../http/http.js'

var UploadVideoClass

// 判断是否引入了阿里 OSS 的‘SDK’
if (window.OSS) {
    var OSS = window.OSS.Wrapper;

    // 因为后台给不了md5值，所以这里给了个假的值;
    var errorMd5 = '16a6dba776ebbdc7e4475b7e8e6a34e9'

    var cancelID = 1
    var cancelAction = {code: 0, msg:"cancel"}
    var uploadErrAction = {code: 444, msg: "上传出错"}
    /**********
        opt 示例
        {
            // 获取stsToken的服务器地址
            stsServer: "", 
            bucket: "",
            region: "",
            // 应用服务器给的认证信息
            token: {
                appid: "",
                timestamp: "",
                nonceStr: "",
                signature: "",
            },
            eventId: '',
            // 文件对象
            file: file, 
            // 上传进度回调
            progress: function(){},
            // 上传成功后的回调
            success: function(){},
            // 上传失败后的回调
            fail: function(){}
        }
    *************/
    UploadVideoClass = function UploadVideoClass(opt) {
        var t = opt.token

        // opt.stsServer = 'https://testfs.xiaogj.com'
        // opt.stsServer = 'https://fs.xiaogj.com'
        this.stsServer = `${opt.stsServer}/UploadRequest`
        this.fileServer = opt.stsServer

        this.cancelID = cancelID++;

        this.file = opt.file
        this.name = opt.file.name
        // 文件类型, 如果上传视频需要传入'video'; 以便知道需要压缩转码;
        // 'image'、'video'、'file'
        this.type = opt.type || 'file'

        // this.timeout = `${opt.timeout || 180}s`
        this.timeout = `${opt.timeout || 300}s`

        this.stsoption = {
            // method: 'POST',
            appid: t.appid,
            timestamp: t.timestamp,
            nonceStr: t.nonceStr,
            signature: t.signature,
            eventId: opt.eventId || '',
            filename: opt.file.name
        }
        this.progress = opt.progress && typeof opt.progress === 'function' && opt.progress
        this.success = opt.success && typeof opt.success === 'function' && opt.success
        this.fail = opt.fail && typeof opt.fail === 'function' && opt.fail

        // 是否取消上传
        this.cancel = false
    }

    // 获取文件服务器 STS 'token' 
    UploadVideoClass.prototype.getStsToken = function () {
        return http.ajax({
                url: this.stsServer,
                formData: true,
                data: this.stsoption
            }).then(res => {
                if (this.cancel) {
                    return Promise.reject(cancelAction)
                }
                if (res.data.ErrorCode === 200) {
                    var sts = res.data.Data.Sts,
                        fopt = res.data.Data.Files[0]

                    this.bucket = sts.BucketName
                    this.region = fopt.RegionId
                    this.ossEndpoint = `https://${this.bucket}.${this.region}.aliyuncs.com`
                    this.fileId = fopt.fileId
                    this.key = fopt.objectKey
                    this.url = fopt.Url

                    return {
                        accessKeyId: sts.AccessKeyId,
                        accessKeySecret: sts.AccessKeySecret,
                        stsToken: sts.SecurityToken,
                        bucket: sts.BucketName,
                        region: fopt.RegionId,
                    }
                } else {
                    if (res.data.ErrorCode !== 200) {
                        // app.alert(res.data.Data[0].result)
                        return Promise.reject({
                            code: 600, // 自定义code, 600表示服务器拒绝
                            // msg: res.data.Data[0].result,
                            msg: `文件'${this.file.name}'上传失败;  原因: ${res.data.Data[0].result}。`
                        })
                    }
                    return Promise.reject({
                        code: 500,  // 自定义code, 500表示服务端错误
                        msg: res
                    })
                }
            })
    }

    // 上传文件到OSS，使用SDK版本
    UploadVideoClass.prototype.uploadFile = function (sts) {
        var progress = p => {
            if (this.cancel) {
                return this.client.cancel()
            }
            this.progress && this.progress({point: p, percent: Math.floor(p * 100) + '%'})
            return done => done()
        }

        this.client = new OSS({
            ...sts,
            secure: true, // 是否启用'https'
            timeout: this.timeout  // 超时时间
        })

        return this.client.multipartUpload(this.key, this.file, {progress})
            .then(res => {
                var data = res.res
                return data.statusCode === 200 ? res : Promise.reject({
                        code: 500,  // 自定义code, 500表示服务端错误
                        msg: data
                    })
            })
            .catch(err => {
                console.log(err);
                console.log(typeof(err));
                if (err && err.status === 0 && err.name === 'cancel') {
                    return Promise.reject(cancelAction)
                    // return cancelAction
                } else {
                    console.log(err);
                    // 可能超时，也可能是别的原因;
                    return Promise.reject(uploadErrAction);
                }
            })
    }

    // 上传文件到OSS 不用SDK版本， 现在还有问题
    /*UploadVideoClass.prototype.uploadFile = function (sts) {
        const params = {
            'name': this.name,
            'key': this.key,
            'OSSAccessKeyId': sts.accessKeyId,
            'signature': sts.accessKeySecret,
            'policy': sts.stsToken,
            'success_action_status': '200', // 让服务端返回200,不然，默认会返回204
        };

        let formData = new FormData();

        for (const k in params) {
            formData.append(k, params[k]);
        }

        formData.append('file', this.file);

        let config = {
            onUploadProgress: e => {
                var p = e.loaded / e.total
                this.progress({point: p, percent: Math.floor(p * 100) + '%'})
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        // return axios.post(this.ossEndpoint, formData, config).then(res => {
        return axios.post(this.ossEndpoint, formData).then(res => {
            console.log(res);
        })
    }*/

    // 如果是视频文件，通知文件服务器,启动压缩及转码;
    UploadVideoClass.prototype.StartMediaConverter = function () {
        return http.ajax({
            formData: true,
            url: `${this.fileServer}/StartMediaConverter`,
            data: {id: this.fileId}
        }).then(res => {
            if (this.cancel) {
                return Promise.reject(cancelAction)
            }
            return res.data.Data
        })
    }

    // 如果是视频文件，轮询文件服务器, 查询是否完成压缩转码
    UploadVideoClass.prototype.getfileinfo = function () {
        return new Promise((resolve, reject) => {
            var timer = setInterval(() => {
                if (this.cancel) {
                    clearInterval(timer)
                    reject(cancelAction)
                }

                http.ajax({
                    method: "get",
                    url: `${this.fileServer}/getfileinfo`,
                    data: {id: this.fileId}
                }).then(res => {
                    if (res.data.Data.MediaJobStatus === 2) {
                        var data = res.data.Data

                        // console.log(`原文件大小: ${this.file.size}`);
                        // console.log(`转码后大小: ${data.FileSize}`);

                        resolve({
                            name: this.Name || data.Name,
                            newName: data.NewName,
                            size: data.FileSize,
                            md5: data.md5 || errorMd5,
                            url: data.Url,
                            ext: data.Ext,
                            dur: data.Duration,
                            w: data.Width,
                            h: data.Height,
                            thumbUrl: this.getThumbUrl(data.Url)
                        })
                        clearInterval(timer)
                    }
                })
            }, 1000)
        })
    }

    // 获取缩略图
    UploadVideoClass.prototype.getThumbUrl = function (url) {
        if (this.type === 'image') {
            return `${url}?x-oss-process=image/resize,m_mfit,w_240,h_240/quality,Q_50`
        } else if (this.type === 'video') {
            return `${url}?x-oss-process=video/snapshot,t_0,f_jpg,w_300`
        }

        return ''
    }


    // 普通文件，上传完成后通知文件服务器
    UploadVideoClass.prototype.uploadComplete = function () {
        return http.ajax({
                formData: true,
                url: `${this.fileServer}/uploadComplete`,
                data: {id: this.fileId}
            }).then(res => {
                if (this.cancel) {
                    return Promise.reject(cancelAction)
                }
                var data = res.data.Data
                if (res.data.ErrorCode === 200 && data) {
                    return {
                        name: data.Name,
                        newName: data.NewName,
                        size: this.file.size,  // 大小, 单位byte
                        md5: data.md5 || errorMd5,
                        url: data.Url,
                        ext: data.Ext,
                        dur: data.Duration,
                        w: data.Width,
                        h: data.Height,
                        thumbUrl: this.getThumbUrl(data.Url)
                    }
                } else {
                    Promise.reject({
                        code: 500,  // 自定义code, 500表示服务端错误
                        msg: res.data
                    })
                }
            })
    }

    // 根据不同的文件类型执行不同的上传过程
    UploadVideoClass.prototype.upload = function (stsToken) {
        if (this.type === 'video') {
            return this.uploadFile(stsToken)
                .then(() => {
                    return this.StartMediaConverter()
                })
                .then(() => {
                    return this.getfileinfo()
                })
        } else {
            return this.uploadFile(stsToken)
                .then(() => {
                    return this.uploadComplete()
                })
        }
    }

    // 取消上传
    UploadVideoClass.prototype.cancelUpload = function () {
        this.cancel = true
    }

    // 整个上传流程
    UploadVideoClass.prototype.doUpload = function () {
        return this.getStsToken()
            .then(stsToken => this.upload(stsToken))
            .then(res => {
                // console.log(res);
                this.success && this.success(res)
            })
            .catch(err => {
                console.log(err);
                // 如果不是取消上传则调用失败的回调;
                if (err.msg !== 'cancel') {
                    this.fail && this.fail(err)
                }
            })
    }
}

export default UploadVideoClass