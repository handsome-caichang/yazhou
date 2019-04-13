<style lang="scss" scoped>
    @import 'src/plugin/scss/variable.scss';
    @import 'src/plugin/scss/mixin.scss';
    
    .file-box {
        display: flex;
        flex-wrap: wrap;
        .file-item{
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
            .file-grid{
                width: 100%;
                height: 0;
                padding-top: 100%;
                border-radius: 2px;
                position: relative;
                background-color: #FFF;
                border: 1px solid $color-border;
                
                .file-content {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    padding: 10px;
                    .file-icon {
                        font-size: 15px;
                    }
                    .file-name {
                        color: #333;
                        font-size: 12px;
                        line-height: 15px;
                        padding-top: 9px;
                        @include ellipsis-multi(2);
                    }
                    .file-size {
                        position: absolute;
                        bottom: 10px;
                        left: 10px;
                        color: #999;
                        font-size: 12px;
                    }
                    .file-link {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                    }
                }
                
                .file-wrap{
                    text-align: center;
                    // background-color: rgba(0, 0, 0, .5);
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
                }

                .file-delete {
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    width: 20px;
                    height: 20px;
                    z-index: 999;
                }

                .add-file-btn {
                    @include position-absolute;
                }
            }
        }
    }
</style>

<template>
    <div class="file-area">
        <!-- 一排展示三个文件 -->
        <div class="file-box">
            <div class="file-item" v-for="(fileinfo,index) in currentfiles">
                <div class="file-grid">

                    <!-- 上传中 -->
                    <div v-if="fileinfo.status === 1" class="file-wrap">
                        <img class="isloading" src="./img/loading-spokes-2.svg">
                        <div class="upload-text">{{fileinfo.progress}}</div>
                    </div>

                    <!-- 上传失败 -->
                    <div v-else-if="fileinfo.status === 0" class="file-wrap" @click="resend(fileinfo)">
                        <svg aria-hidden="true" class="icon">
                            <use xlink:href="#icon-yichangtishi-hong"></use>
                        </svg>
                        <div class="upload-text">点击重传</div>
                    </div>


                    <div v-else class="file-content">
                        <svg class="icon file-icon" aria-hidden="true">
                            <use xlink:href="#icon-yixuanzewenjian"></use>
                        </svg>
                        <div class="file-name">{{fileinfo.Name}}</div>
                        <div class="file-size">{{app.tool.formatFileSize(fileinfo.FileLength)}}</div>
                        <a class="file-link" :href="getHref(fileinfo)" target="_blank"></a>
                    </div>

                    <!-- 删除 -->
                    <svg aria-hidden="true" 
                        class="icon file-delete" 
                        @click="deleteFile(fileinfo)" 
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
                        :type='"file"'
                        :maxSize="maxSize"
                        @change="fileChange">
                    </file-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>export default {
    name: 'file-area',
    props: {
        edit: { // false:展示 true:编辑
            type: Boolean,
            default: true,
        },
        fileMaxNum: { //最大上传的文件数量
            type: Number,
            default: 5
        },
        // 文件最大大小,单位MB;
        maxSize: {
            type: Number,
            default: 60
        },
        fileList: { // 数据库文件数组
            type: Array,
            default: function(){
                return [];
            }
        },
        getAppToken: {
            type: Function
        }
    },
    data () {
        return {
            currentfiles: [], //文件数组
            delFiles: [] //删除的文件
        }
    },
    computed:{
        canAddFile() { //是否达到最大上传数
            return (this.fileMaxNum-this.currentfiles.length)>0
        }
    },
    methods: {
        getHref(fileinfo) {
            // 如果在编辑状态下, 不让其下载、预览;
            return !this.edit ? fileinfo.FilePath : 'javascript:void(0);'
        },
        createVideoObj(file) {
            console.log(file);
            let o = {
                FileLength: file.size,
                Name: file.name,
                FilePath: null,
                MD5: null,
                Ext: null,

                file: file,
                status: 1, // 上传状态，0:上传失败, 1:上传中, 2: 上传成功
                progress: '0%',
            };

            o.promise = new Promise(rsv => o.resolve = rsv);

            return o
        },
        fileChange(file) {
            let vf = this.createVideoObj(file);

            this.currentfiles.push(vf);

            this.send(vf)
        },
        send(vf) {
            vf.status = 1
            this.getAppToken().then(appToken => {
                vf.cancelID = app.oss.uploadFile({
                    stsServer: app.sysInfo.fileServerURL,
                    token: appToken,
                    file: vf.file,
                    type: 'file',
                    progress: p => {
                        // console.log(p)
                        vf.progress = p.percent
                    },
                    success: uploadFile => {
                        var fileInfo = {
                            // 小写的type是给应用层做区分用的，其它字段传给后端;
                            type: 'file',
                            FileLength: uploadFile.size,
                            Name: uploadFile.name,
                            FilePath: uploadFile.url,
                            MD5: uploadFile.md5,
                            Ext: uploadFile.ext
                        }

                        Object.assign(vf, fileInfo)
                        vf.fileInfo = fileInfo
                        vf.status = 2
                        vf.resolve(fileInfo);
                    },
                    fail: error => {
                        vf.status = 0

                        if (error.code === 600) {
                            app.alert(error.msg).then(() => {
                                this.currentfiles = this.currentfiles.filter(item => {
                                    return item != vf
                                })
                            })
                            
                        } else if (error.code === 0) {
                            // 用户取消上传
                            // console.log(error);
                            // console.log("用户取消上传");
                        } else {
                            app.toast('error', '上传文件失败,请重试。')
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
            // 当前界面的列表有可能 后台的文件(ID)||后台的文件+新增文件||新增文件(FilePath作为标识)
            // 如果是后台的文件才放进数组里跑出去  删除新增的文件只需要交互层面的删除，没有ID需要抛出
            if (vio.ID) {
                this.delFiles.push(vio.ID);
            } else {
                app.oss.cancelUploadFile(vio.cancelID);
            }

            this.currentfiles = this.currentfiles.filter(item => item !== vio)
        },
        destroyed() {
            // 组件销毁前, 取消所有文件上传;
            if (this.edit) {
                this.currentfiles.forEach(item => {
                    if (item.cancelID) {
                        app.oss.cancelUploadFile(item.cancelID)
                    }
                })
            }
        },
    },
    watch: {
        //传入的服务器文件
        fileList: {
            handler: function (val, oldVal) {
                this.currentfiles = app.tool.clone(this.fileList);
            },
            immediate: true
        },
        currentfiles() {
            this.$emit('fileFinished', this.currentfiles, this.delFiles)
        }
    }
}
</script>

