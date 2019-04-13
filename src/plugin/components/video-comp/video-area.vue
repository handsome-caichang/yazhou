<!-- 视频组件 -->
<style scoped lang="scss">
    @import 'src/plugin/scss/variable.scss';
    @import 'src/plugin/scss/mixin.scss';
    
    .video-box {
        display: flex;
        flex-wrap: wrap;
        .video-item{
            position: relative;
            display: flex;
            width: calc(33.3% - 7px);
            &:nth-child(3n+2){
                margin-right: 10px;
                margin-left: 11px;
            }
            &:nth-child(3n) {
                margin-bottom: 15px;
            }
            &:last-child {
                margin-top: 0;
                margin-bottom: 0;
            }
            .video-grid{
                width: 100%;
                height: 0;
                padding-top: 100%;
                border-radius: 2px;
                position: relative;
                border: 1px solid $color-border;
                &.no-bd{
                    border: none;
                }
                .add-video-btn {
                    @include position-absolute;
                }
                .video-wrap{
                    text-align: center;
                    @include position-absolute;
                    @include flex-center(column);
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
                .video-tag {
                    @include position-absolute;
                    background-repeat: no-repeat;
                    background-attachment: scroll;
                    background-size: cover;
                    background-position: center;
                    .video-control {
                        @include position-absolute;
                        @include flex-center;
                        background-color: rgba(0, 0, 0, .5);
                        .icon {
                            color: #FFF;
                            font-size: 40px;
                        }
                    }
                    .video-dur {
                        @include position-absolute(false, 5px, 5px, false);
                        color: #FFF;
                        font-size: 10px;
                    }
                }
                .video-delete{
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
    <div class="video-area">
        <!-- 一排展示三个视频 -->
        <div class="video-box">
            <div class="video-item" v-for="(item,index) in currentVideos">
                <div class="video-grid" :class="{'no-bd':!edit}">
                    <!-- 上传中 -->
                    <div v-if="item.status === 1" class="video-wrap">
                        <img class="isloading" src="./img/loading-spokes-2.svg">
                        <div class="upload-text">{{item.progress}}</div>
                    </div>

                    <!-- 上传失败 -->
                    <div v-else-if="item.status === 0" class="video-wrap" @click="resend(item)">
                        <svg aria-hidden="true" class="icon">
                            <use xlink:href="#icon-yichangtishi-hong"></use>
                        </svg>
                        <div class="upload-text">点击重传</div>
                    </div>

                    <div v-else-if="app.envType===99" 
                        class="video-tag" 
                        :style="{backgroundImage: `url(${getThumbUrl(item)})`}"
                        :data-src="item.FilePath"
                        @click="xgjappPlay(item.path || item.FilePath)">
                        
                        <div class="video-control">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-shipinbofang"></use>
                            </svg>
                        </div>
                        <div class="video-dur" v-if="item.Durations">{{app.tool.transVideoDur(item.Durations)}}</div>
                    </div>

                    <div v-else
                        class="video-tag" 
                        :style="{backgroundImage: `url(${getThumbUrl(item)})`}"
                        :data-src="item.FilePath"
                        @touchstart="app.video.setSrc(item.FilePath)"
                        @mousedown="app.video.setSrc(item.FilePath)"
                        @click="app.video.play">
                        
                        <div class="video-control">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-shipinbofang"></use>
                            </svg>
                        </div>
                        <div class="video-dur" v-if="item.Durations">{{app.tool.transVideoDur(item.Durations)}}</div>
                    </div>

                    <!-- 删除 -->
                    <svg aria-hidden="true" 
                        class="icon video-delete" 
                        @click="deleteVideo(item)" 
                        v-show="edit">
                        <use xlink:href="#icon-shanchuxueyuan"></use>
                    </svg>
                </div>
            </div>

            <!-- 添加视频 -->
            <div class="video-item" v-show="canAddVideo && edit">
                <div class="video-grid">
                    <file-btn 
                        class="add-video-btn" 
                        :type='"video"'
                        :maxSize="maxSize"
                        :maxDuration="maxDuration"
                        @change="changeHandler">
                        <!-- @change="fileChange"> -->
                    </file-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * 该组件通过发布"videoFinished"事件，将选中/删除的视频暴露给调用方;
     */
    export default {
        name: 'video-area',
        props: {
            edit: { //false:展示 true:编辑
                type: Boolean,
                default: true,
            },
            videoMaxNum: { //最大上传的视频数量
                type: Number,
                default: 3
            },
            // 视频最大大小,单位MB;
            maxSize: {
                type: Number,
                default: 60
            },
            // 视频最大时间,单位秒;
            maxDuration: {
                type: Number,
                default: 300
            },
            videoFileList: { //数据库视频数组
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
                currentVideos: [], //视频数组
                fileIdList: [] //删除的视频
            }
        },
        computed:{
            canAddVideo() { //是否达到最大上传数
                return (this.videoMaxNum-this.currentVideos.length)>0
            }
        },
        methods: {
            getThumbUrl(item) {
                // 老的数据是FilePath,改版后统一成Url;
                return item.ThumbPath || `${item.FilePath}?x-oss-process=video/snapshot,t_1000,f_jpg,w_300`
            },            
            createVideoObj(file) {
                let o = {
                    FileLength: null,
                    Name: null,
                    FilePath: null,
                    ThumbPath: null,
                    Durations: null,
                    MD5: null,
                    Width: null,
                    Height: null,

                    file: file,
                    status: 1, // 上传状态，0:上传失败, 1:上传中, 2: 上传成功
                    progress: '0%',
                    xgjappFlag: 0, // 0：初始值 1: 原生压缩中 2： 原生上传中 9：原生上传完成
                };

                o.promise = new Promise(rsv => o.resolve = rsv);

                return o
            },
            changeHandler(obj) {
                if (obj.flag === "xgjapp") {

                    var file = obj.file[0]
                    let vf = this.createVideoObj(file);
                    this.currentVideos.push(vf);

                    vf.xgjappFlag = 1;
                    app.sdk.compressorVideo({
                        path : file.path,
                        quality: 'medium',
                        progress:res=>{
                            vf.progress = Math.round(res/2) + '%';
                        }
                    }).then(cpVideo => {
                        vf.path = cpVideo.path
                        vf.size = app.tool.formatFileSize(cpVideo.size)
                        vf.xgjappFlag = 2;
                        return app.sdk.uploadVideo({
                            localId: vf.path,
                            progress:res=>{
                                vf.progress = Math.round(50 + res/2) + '%';
                            },

                        })
                    }).then(fileInfo => {
                        vf.status = 1
                        vf.xgjappFlag = 9;
                        // var fileInfo = {
                        //     // 小写的type是给应用层做区分用的，其它字段传给后端;
                        //     type: 'video',
                        //     FileLength: vf.size,
                        //     Name: "videoName",
                        //     FilePath: url,
                        //     ThumbPath: `${url}?x-oss-process=video/snapshot,t_0,f_jpg,w_300`,
                        //     Durations: file.duration,
                        //     MD5: "123124234wwe2342ewr",
                        //     Width: 0,
                        //     Height: 0
                        // }

                        fileInfo.ThumbPath = `${fileInfo.FilePath}?x-oss-process=video/snapshot,t_0,f_jpg,w_300`;
                        fileInfo.Durations = file.duration;

                        Object.assign(vf, fileInfo)
                        vf.fileInfo = fileInfo
                        vf.status = 2
                        vf.resolve(fileInfo);
                    })

                } else {
                    this.fileChange(obj);
                }
            },
            fileChange(file) {
                let vf = this.createVideoObj(file);

                this.currentVideos.push(vf);

                this.send(vf)
            },
            send(vf) {
                vf.status = 1
                this.getAppToken().then(appToken => {
                    vf.cancelID = app.oss.uploadFile({
                        stsServer: app.sysInfo.fileServerURL,
                        token: appToken,
                        file: vf.file,
                        type: 'video',
                        progress: p => {
                            // console.log(p)
                            vf.progress = p.percent
                        },
                        success: uploadFile => {
                            var fileInfo = {
                                // 小写的type是给应用层做区分用的，其它字段传给后端;
                                type: 'video',
                                FileLength: uploadFile.size,
                                Name: uploadFile.name,
                                FilePath: uploadFile.url,
                                ThumbPath: uploadFile.thumbUrl,
                                Durations: uploadFile.dur,
                                MD5: uploadFile.md5,
                                Width: uploadFile.w,
                                Height: uploadFile.h
                            }

                            Object.assign(vf, fileInfo)
                            vf.fileInfo = fileInfo
                            vf.status = 2
                            vf.resolve(fileInfo);
                        },
                        fail: error => {
                            vf.status = 0
                            if (error.code === 0) {
                                // 用户取消上传
                                // console.log(error);
                                // console.log("用户取消上传");
                            } else {
                                app.toast('error', '上传视频失败,请重试。')
                                console.log(error);
                            }
                        }
                    })
                })
            },
            resend(item) {
                this.send(item)
            },
            cancel(vio) {
                if (app.envType === 99) {
                    alert(JSON.stringify(vio));

                    if (vio.xgjappFlag === 1) {
                        app.sdk.cancelCompress({
                            path: vio.file.path
                        })
                    } else if (vio.xgjappFlag === 2) {
                        app.sdk.cancelUpload({
                            path: vio.path
                        })
                    }
                } else {
                    app.oss.cancelUploadFile(vio.cancelID);
                }
            },
            //删除视频
            deleteVideo(vio) {
                // 当前界面的列表有可能 后台的视频(ID)||后台的视频+新增视频||新增视频(FilePath作为标识)
                // 如果是后台的视频才放进数组里跑出去  删除新增的视频只需要交互层面的删除，没有ID需要抛出
                if (vio.ID) {
                    this.fileIdList.push(vio.ID);
                } else {                    
                    this.cancel(vio)
                }
                this.currentVideos = this.currentVideos.filter(item => item !== vio)
            },
            xgjappPlay(url) {
                app.sdk.playVideo({'url': url})
            }
        },
        destroyed() {
            // 组件销毁前, 取消所有视频上传;
            if (this.edit) {
                this.currentVideos.forEach(item => {
                    if (item.cancelID) {
                        app.oss.cancelUploadFile(item.cancelID)
                    }
                })
            }
        },
        watch: {
            //传入的服务器视频
            videoFileList: {
                handler: function (val, oldVal) {
                    this.currentVideos = app.tool.clone(this.videoFileList);
                },
                immediate: true
            },
            currentVideos() {
                this.$emit('videoFinished', this.currentVideos, this.fileIdList)
            }
        }
    }
</script>

