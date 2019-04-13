<!-- 各种文件选择input框组件 -->

<style lang="scss" scoped>
    @import 'src/plugin/scss/variable.scss';
    @import 'src/plugin/scss/mixin.scss';
    
    .file-btn {
        .inputs {
            display: none;
        }
        .default-style {
            width: 100%;
            height: 100%;
            @include position-absolute;
            background-color: $color-white;
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
</style>

<template>
    <!-- 请在调用组件中指定样式 -->
    <div  class="file-btn">
        <!-- 在原生APP端，选择视频这块调用原生功能，选择文件这块暂时还是用H5的能力，因为IOS无法做文件选择 -->
        <div v-if="app.env === 'xgj' && type === 'video'">
            <slot>
                <div class="default-style"                     
                    @click="selectVideo">
                    <svg aria-hidden="true" class="icon" v-if="type === 'video'">
                        <use xlink:href="#icon-tianjiashipin"></use>
                    </svg>
                    <svg aria-hidden="true" class="icon" v-if="type === 'file'">
                        <use xlink:href="#icon-wendang1"></use>
                    </svg>
                    <div class="text">{{type === 'video' ? '添加视频' : '添加文件'}}</div>
                </div>
            </slot>
        </div>
        
        
        <!-- 在非原生APP端(微信、钉钉等环境下)，通过模拟表单的方式调用H5文件选择能力， -->
        <div v-else>
            <div class="inputs" ref="inputs"></div>

            <div @click="agentClick($event)">
                <slot>
                    <div class="default-style">
                        <svg aria-hidden="true" class="icon" v-if="type === 'video'">
                            <use xlink:href="#icon-tianjiashipin"></use>
                        </svg>
                        <svg aria-hidden="true" class="icon" v-if="type === 'file'">
                            <use xlink:href="#icon-wendang1"></use>
                        </svg>
                        <div class="text">{{type === 'video' ? '添加视频' : '添加文件'}}</div>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'file-btn',
        props: {
            // 可选'video'、'image'、'file'
            type: {
                type: String,
                default: 'video'
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
        },
        data() {
            return {
            }
        },
        methods: {
            selectVideo() {
                if (this.type === 'video') {
                        app.sdk.chooseVideo().then(res => {
                        this.$emit("change", {
                            flag: "xgjapp",
                            file: res
                        })
                    })
                }
            },
            // 代理点击事件, 转发给input框
            agentClick(e) {
                let target = e.target,
                    inp = this.createInput(),
                    ev = document.createEvent('MouseEvents');

                ev.initMouseEvent('click', true, true, e.view, 1,
                    target.screenX, target.screenY, target.clientX, target.clientY,
                    e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
                    0, null);

                inp.dispatchEvent(ev);
            },
            // 创建input type="file"的dom
            createInput() {
                let inp = document.createElement('input');
                this.$refs.inputs.innerHTML = "";

                inp.type = 'file';
                if (this.type === 'video') {
                    inp.accept = "video/*";
                } else if (this.type === 'image') {
                    inp.accept = 'image/*'
                    // inp.multiple = true
                }

                inp.style.display = "none";
                this.$refs.inputs.appendChild(inp);

                this.addInputEvent(inp)

                return inp
            },
            addInputEvent(input) {
                input.addEventListener('change', e => {
                    let file = e.target.files[0],
                        fileSize = file.size / 1024 / 1024

                    if (fileSize > this.maxSize){
                        return app.toast('error', `文件大小不能超过${this.maxSize}MB`);
                    }

                    var ext = file.name.split('.').pop()

                    if (this.type === 'video') {
                        let suffix = /mp4|mov|m4v|avi|ogg/i
                        
                        if (!suffix.test(ext)) {
                            return app.toast('error','不支持此视频格式。');
                        }
                    } else if (this.type === 'image') {
                        // 备注：  企业微信上input的'accept'属性限制不住可选文件的格式，因此这里再次过滤下;
                        let suffix = /png|jpeg|jpg|gif|bmp|webp|tiff/i
                        
                        if (!suffix.test(ext)) {
                            return app.toast('error','不支持此格式。');
                        }
                    }

                    console.log(file);
                    this.$emit("change", file, input)
                })
            },
            /*getFileDuration(file) {
                return new Promise(resolve => {
                    // 微信不兼容，暂时没做时长限制，让后台去做
                    let ve = document.createElement('video'),
                        url = this.getFileURL(file)

                    ve.preload = true
                    url && (ve.src = url)

                    // let int = setInterval(()=>{
                    //     let duration = ve.duration;
                    //     if(duration){
                    //         //抛出
                    //         clearInterval(int)
                    //         alert(duration)
                    //         resolve(duration)
                    //     }
                    // },20)
                })
            },*/
            /*getFileURL(file) {
                let getUrl = null;
                if (window.createObjectURL != undefined) { // basic
                    getUrl = window.createObjectURL(file);
                } else if (window.URL != undefined) { // mozilla(firefox)
                    getUrl = window.URL.createObjectURL(file);
                } else if (window.webkitURL != undefined) { // webkit or chrome
                    getUrl = window.webkitURL.createObjectURL(file);
                }
                // console.log(decodeURIComponent(getUrl))
                return getUrl;
            },*/
        }
    }
</script>

