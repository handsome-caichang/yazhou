<style lang="scss" scoped>
    .aa {
        color: #000;
        img {
            width: 100px;
            height: 100px;
        }
    }
</style>

<template>
    <scroller-base :data="imgList">
        <div class="aa">
            <br>
            <br>
            <br>
            <div class="select-img" @click="selectImg()">选择图片</div>
            <br>
            <br>
            <br>
            <div>
                <div v-for="item in imgList">
                    <div>{{item.name}}</div>
                    <img :src="item.path">
                </div>
            </div>
        </div>
    </scroller-base>
    
</template>

<script>

    // 引入文件系统模块
    // var fs = api.require('fs');

    // alert(fs.exist);
    
export default {
    name: 'apicloue-img',
    data () {
        return {
            wxTitle: "图片功能",
            imgList: []
        }
    },
    methods: {

        selectImg() {
            var that = this

            /*var UIMediaScanner = api.require('UIMediaScanner');
            UIMediaScanner.open({
                type: 'all',
                column: 4,
                // classify: false,
                max: 4,
                sort: {
                    key: 'time',
                    order: 'desc'
                },
                texts: {
                    stateText: '已选择*项',
                    cancelText: '取消',
                    finishText: '完成'
                },
                styles: {
                    bg: '#fff',
                    mark: {
                        icon: '',
                        position: 'bottom_left',
                        size: 20
                    },
                    nav: {
                        bg: '#eee',
                        stateColor: '#000',
                        stateSize: 18,
                        cancelBg: 'rgba(0,0,0,0)',
                        cancelColor: '#000',
                        cancelSize: 18,
                        finishBg: 'rgba(0,0,0,0)',
                        finishColor: '#000',
                        finishSize: 18
                    }
                },
                scrollToBottom: {
                    intervalTime: 3,
                    anim: true
                },
                exchange: true,
                rotation: true,
                showPreview: true,
                showBrowser: true
            }, function(ret) {
                if (ret) {
                    alert(JSON.stringify(ret));
                }
            });*/

            /*var demo = api.require('compressVideo');
            demo.selectVideo(function(ret,err){
                        if(ret){
                            //选择成功
                            var msg = "视频地址 ："+ret.path;
                            path = ret.path;
                            alert(msg);
                        }else{
                            //选择失败
                            alert(JSON.stringify(err));
                        }
                });*/

            /*api.getPicture({
                sourceType: 'camera',
                encodingType: 'jpg',
                mediaValue: 'pic',
                destinationType: 'url',
                allowEdit: true,
                quality: 50,
                targetWidth: 100,
                targetHeight: 100,
                saveToPhotoAlbum: false
            }, function(ret, err) {
                if (ret) {
                    alert(JSON.stringify(ret));
                } else {
                    alert(JSON.stringify(err));
                }
            });*/

            
            var UIAlbumBrowser = api.require('UIAlbumBrowser');
            var trans = api.require('trans');
            var fs = api.require('fs');

            UIAlbumBrowser.open({
                max: 9,
                type: "all",
                isOpenPreview: true,
                styles: {
                    bg: '#fff',
                    mark: {
                        icon: '',
                        position: 'top_right',
                        size: 20
                    },
                    nav: {
                        bg: 'rgba(0,0,0,0.6)',
                        titleColor: '#fff',
                        titleSize: 18,
                        cancelColor: '#fff',
                        cancelSize: 16,
                        finishColor: '#fff',
                        finishSize: 16
                    }
                },
                rotation: true
            }, function(ret) {
                if (ret.eventType === 'confirm') {
                    alert(JSON.stringify(ret.list));
                    ret.list.forEach(item => {
                        fs.open({
                            path: item.thumbPath
                        }, function (ret) {
                            alert(ret.fd)
                            fs.read({
                                fd: ret.fd,
                                offset: 0,
                            }, function(ret, err) {
                                if (ret.status) {
                                    alert(JSON.stringify(ret));
                                    that.imgList.push({
                                        name: "abc",
                                        path: `data:image/${item.suffix};base64,${btoa(ret.data)}`
                                    })
                                } else {
                                    alert('...');
                                    alert(JSON.stringify(err));
                                }
                            });
                        })


                        /*trans.decodeImgToBase64({
                            imgPath: item.thumbPath
                        }, function(ret, err) {
                            if (ret.status) {
                                that.imgList.push({
                                    name: "abc",
                                    path: `data:image/${item.suffix};base64,${ret.base64Str}`
                                })
                            } else {
                                alert(JSON.stringify(err));
                            }
                        })*/
                    })
                }
            });


            /*var UIAlbumBrowser = api.require('UIAlbumBrowser');
            UIAlbumBrowser.imagePicker({
                max: 9,
                styles: {
                bg: '#FFFFFF',                   
                cameraImg:'widget://res/cameraImg.png',
                mark: {                             
                    icon: '',                       
                    position: 'bottom_left',      
                    size: 20                        
                },
                nav: {                              
                    bg: 'rgba(0,0,0,0.6)',                     
                    cancelColor: '#fff',            
                    cancelSize: 16,  
                    nextStepColor: '#fff',
                    nextStepSize: 16                 
                }
                },
                animation:true,    
            }, function(ret) {
               if (ret.eventType == 'nextStep') {
              // var UIAlbumBrowser = api.require('UIAlbumBrowser');
               UIAlbumBrowser.closePicker();
               }
            });*/
        }
    },
    created() {
    }
}
</script>

