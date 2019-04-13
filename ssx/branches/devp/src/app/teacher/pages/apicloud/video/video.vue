
<style lang="scss" scoped>
</style>

<template>
    <div>
        <br>
        <br>
        <br>
        <div @click="selectVideo">选择视频</div>
        <div @click="play">播放视频</div>
    </div>
</template>

<script>
export default {
    name: 'apicloue-img',
    data () {
        return {
            wxTitle: "视频功能",
        }
    },
    methods: {
        selectVideo() {
            var UIAlbumBrowser = api.require('UIAlbumBrowser');
            var trans = api.require('trans');
            // var fs = api.require('fs');

            UIAlbumBrowser.open({
                max: 9,
                type: "video",
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
                    ret.list.forEach(item => {                
                        trans.decodeImgToBase64({
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
                        })
                    })
                }
            });
        },
        play() {
            api.openVideo({
                url: 'https://cdn01.xiaogj.com/file/02f7ff5c926b4a97a903f7026bbde3c6/201808/abb1bf1640814114b46ffd807ca05cd6.mp4'
            });
        }
    },
    created() {
    }
}
</script>

