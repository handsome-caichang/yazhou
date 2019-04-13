<!-- 文件组件 -->
<style scoped lang="scss">
    .file-box {
        display: flex;
        flex-wrap: wrap;
        .file-item {
            position: relative;
            display: flex;
            // width: calc(33.3% - 5px);
            width: 33%;
            padding: 5px;
            // &:nth-child(3n+2){
            //     padding-right: 10px;
            //     margin-left: 10px;
            // }
            // &:nth-child(3n) {
            //     margin-bottom: 15px;
            // }
            // &:last-child {
            //     margin-top: 0;
            //     margin-bottom: 0;
            // }
            .file-grid{
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 100%;
                border-radius: 2px;
                // background-color: #F4F5F9;
                &.no-bd{
                    border: none;
                }
                .add-file-btn {                    
                    .add-box {
                        @include position-absolute;
                        width: 100%;
                        height: 100%;
                        background-color: #F4F5F9;
                        @include flex-center(column);
                        .text {
                            margin-top: 13px;
                            font-size: 10px;
                            line-height: 13px;
                            color: #bbb;
                        }
                        .icon {
                            width: 30px;
                            height: 30px;
                        }
                    }
                }
                .file-wrap {
                    text-align: center;
                    @include position-absolute;
                    @include flex-center(column);
                    background-color: #F4F5F9;
                    .isloading{
                        width: 24px;
                        height: 24px;
                    }
                    .upload-text {
                        padding-top: 10px;
                        font-size: 12px;
                        color: #75BDF2;
                    }
                    svg{
                        width: 30px;
                        height: 30px;
                    }
                    .video-add-tips{
                        margin-top: 13px;
                        font-size: 10px;
                        color: #BBBBBB;
                    }
                }
                .file-tag {
                    @include position-absolute;
                    background-repeat: no-repeat;
                    background-attachment: scroll;
                    background-size: cover;
                    background-position: center;
                    border-radius: 2px;
                }
                .file-delete {
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    width: 20px;
                    height: 20px;
                    z-index: 999;
                }
            }
        }
    }
</style>

<template>
    <div class="file-area">
        <!-- 一排展示三个文件 -->
        <div class="file-box">
            <div class="file-item" v-for="(item,index) in currentFiles">
                <div class="file-grid" :class="{'no-bd':!edit}">
                    <!-- 上传中 -->
                    <div v-if="item.status === 1" class="file-wrap">
                        <img class="isloading" src="./img/loading-spokes-2.svg">
                        <div class="upload-text">{{item.progress}}</div>
                    </div>

                    <!-- 上传失败 -->
                    <div v-else-if="item.status === 0" class="file-wrap" @click="resend(item)">
                        <svg aria-hidden="true" class="icon">
                            <use xlink:href="#icon-yichangtishi-hong"></use>
                        </svg>
                        <div class="upload-text">点击重传</div>
                    </div>

                    <div v-else 
                        class="file-tag" 
                        @click="previewImage(item.fileurl)"
                        :style="{backgroundImage: `url(${item.thumbnailurl})`}">
                    </div>

                    <!-- 删除 -->
                    <svg aria-hidden="true" 
                        class="icon file-delete" 
                        @click="deleteFile(item)" 
                        v-show="edit">
                        <use xlink:href="#icon-shanchuxueyuan"></use>
                    </svg>
                </div>
            </div>

            <!-- 添加文件 -->
            <div class="file-item" v-show="canAddFile && edit">
                <div class="file-grid">
                    <file-btn 
                        class="add-file-btn" 
                        :type='"image"'
                        :videoBtn="0"
                        :maxSize="maxSize"
                        @change="fileChange">
                            <div class="add-box">
                                <svg aria-hidden="true" class="icon">
                                    <use xlink:href="#icon-tianjiatupian"></use>
                                </svg>
                                <div class="text">添加图片</div>
                            </div>
                    </file-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'file-area',
        props: {
            edit: { //false:展示 true:编辑
                type: Boolean,
                default: true,
            },
            fileMaxNum: { //最大上传的文件数量
                type: Number,
                default: 9
            },
            // 文件最大大小,单位MB;
            maxSize: {
                type: Number,
                default: 60
            },
            // 文件最大时间,单位秒;
            maxDuration: {
                type: Number,
                default: 300
            },
            fileList: { //数据库文件数组
                type: Array,
                default: function(){
                    return [];
                }
            },
            getAppToken: {
                type: Function
            }
        },
        data(){
            return {
                currentFiles: [], //文件数组
                // fileIdList: [] //删除的文件
            }
        },
        computed:{
            canAddFile() { //是否达到最大上传数
                return (this.fileMaxNum-this.currentFiles.length)>0
            },
            previewImageArr() {
                return this.currentFiles.map(item => {
                    return this.changeImageUrl(item.fileurl)
                })
            }
        },
        methods: {
            changeImageUrl(url) {
                return `https:${url}`
            },
            previewImage(url) {
                app.sdk.previewImage({
                    current: this.changeImageUrl(url),
                    urls: this.previewImageArr
                })
            },
            createVideoObj(file) {
                let o = {
                    filetype: null,
                    fileextensions: null,
                    fileurl: null,
                    filename: null,
                    filesize: null,
                    width: null,
                    height: null,
                    duration: null,
                    thumbnailurl: null,

                    file: file,
                    status: 1, // 上传状态，0:上传失败, 1:上传中, 2: 上传成功
                    progress: '0%',
                };

                o.promise = new Promise(rsv => o.resolve = rsv);

                return o
            },
            fileChange(file) {
                let vf = this.createVideoObj(file);

                this.currentFiles.push(vf);

                this.send(vf)
            },
            send(vf) {
                vf.status = 1
                this.getAppToken().then(appToken => {
                    vf.cancelID = app.oss.uploadFile({
                        stsServer: appToken.fileserverurl,
                        token: {
                            appid: appToken.appid,
                            timestamp: appToken.timestamp,
                            nonceStr: appToken.noncestr,
                            signature: appToken.signature,
                        },
                        file: vf.file,
                        type: 'image',
                        progress: p => {
                            // console.log(p)
                            vf.progress = p.percent
                        },
                        success: uploadFile => {
                            var fileInfo = {
                                filetype: 1,
                                fileextensions: uploadFile.ext,
                                fileurl: uploadFile.url,
                                filename: uploadFile.name,
                                fileonlyname: uploadFile.newName,
                                filesize: uploadFile.size,
                                width: uploadFile.w,
                                height: uploadFile.h,
                                duration: uploadFile.dur,
                                thumbnailurl: uploadFile.thumbUrl
                            }

                            Object.assign(vf, fileInfo)
                            vf.fileInfo = fileInfo
                            vf.status = 2
                            vf.resolve(fileInfo);

                            console.log(this.currentFiles);
                        },
                        fail: error => {
                            vf.status = 0

                            if (error.code === 600) {
                                app.alert(error.msg).then(() => {
                                    this.currentFiles = this.currentFiles.filter(item => {
                                        return item != vf
                                    })
                                })
                            } else if (error.code === 0) {
                                // 用户取消上传
                                // console.log(error);
                                // console.log("用户取消上传");
                            } else {
                                app.toast('error', '上传图片失败,请重试。')
                            }
                        }
                    })
                })
            },
            resend(item) {
                this.send(item)
            },
            //删除文件
            deleteFile(vio) {
                // 当前界面的列表有可能 后台的文件(ID)||后台的文件+新增文件||新增文件(fileurl作为标识)
                // 如果是后台的文件才放进数组里跑出去  删除新增的文件只需要交互层面的删除，没有ID需要抛出
                // vio.ID && this.fileIdList.push(vio.ID);

                this.currentFiles = this.currentFiles.filter(item => item !== vio)
                app.oss.cancelUploadFile(vio.cancelID)
            }
        },
        destroyed() {
            // 组件销毁前, 取消所有文件上传;
            if (this.edit) {
                this.currentFiles.forEach(item => {
                    if (item.cancelID) {
                        app.oss.cancelUploadFile(item.cancelID)
                    }
                })
            }
        },
        watch: {
            //传入的服务器文件
            fileList: {
                handler: function (val, oldVal) {
                    this.currentFiles = app.tool.clone(this.fileList);
                },
                immediate: true
            },
            currentFiles() {
                this.$emit('fileUploadFinished', this.currentFiles)
            }
        }
    }
</script>

