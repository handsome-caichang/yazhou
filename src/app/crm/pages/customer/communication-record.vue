<!--沟通记录详情-->
<style scoped lang="scss">
    
    

    .communication-record-container {
        .scroller {
            @include position-absolute;
            .main-msg{
                padding: 16px;
                .top{
                    padding-left: 50px;
                    position: relative;
                    height: 40px;
                    .head-img{
                        width: 40px;
                        height: 40px;
                        border-radius: 40px;
                        border: 1px solid $color-assist-1;
                        background-color: $color-assist-1;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background-image: url("//xgj-image-devp.oss-cn-hangzhou.aliyuncs.com/a12dd147-6048-43e3-806d-2b347fe58cb5/H/3a712ca03688467984a9b36bd6ce8864-921367281ad84ed1b574e6bf94947277-00.jpg?x-oss-process=image/resize,w_360/crop,x_0,y_274,w_360,h_360");
                        @include background-img(false, cover);
                    }
                    .name-des{
                        @include flex-between;
                        .name-date{
                            flex: 1;
                            .name{
                                color: $color-3;
                                font-size: 15px;
                            }
                            .date{
                                color: #AAAAAA;
                                font-size: 12px;
                                margin-top: 6px;
                            }
                        }
                        .type{
                            flex: 1;
                            text-align: right;
                            @include ellipsis-single;
                            font-size: 15px;
                            color: $color-3;
                            height: 40px;
                            .icon{
                                font-size: 16px;
                                margin-right: 6px;
                            }
                        }
                    }
                }
                .content{
                    margin-top: 16px;
                    padding: 12px;
                    border: 1px solid #E0E5EE;
                    background-color: #F3F9FF;
                    border-radius: 4px;
                    font-size: 16px;
                    color: $color-3;
                    position: relative;
                    z-index: 2;
                    .triangle{
                        width:14px;
                        height:14px;
                        transform:rotate(45deg);
                        border-top: 1px solid #E0E5EE;
                        border-left: 1px solid #E0E5EE;
                        background-color: #F3F9FF;
                        position: absolute;
                        top: -6px;
                        left: 12px;
                        // @include triangle($color:#F3F9FF);
                    }
                }
                .img{
                    margin-top: 16px;
                }
                /*.voice{*/
                    /*margin-top: 16px;*/
                /*}*/
            }
            .state-msg{
                .item{
                    height: 49px;
                    line-height: 49px;
                    padding: 0 16px;
                    @include flex-between;
                    @include border-top;
                    .attr{
                        font-size: 13px;
                        color: $color-9;
                    }
                    .val{
                        font-size: 15px;
                        color: $color-3;
                    }
                }
            }
        }
        .void{
            background-color: $color-assist-1;
            width: 100%;
            height: 10px;
        }
    }
</style>

<template>
    <div class="communication-record-container">
        <scroller-base class="scroller" :data="renderData">
            <div class="main-msg">
                <div class="top">
                    <!--:style="'background-image:url('+card.Photo+')'"-->
                    <div class="head-img"></div>
                    <div class="name-des">
                        <div class="name-date">
                            <div class="name">溜达</div>
                            <div class="date">2018.07.18 10:30</div>
                        </div>
                        <div class="type">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-pingjialishi"></use>
                            </svg>电话沟通
                        </div>
                    </div>
                </div>
                <!--文本内容 （转义）必填项必存在-->
                <div class="content">
                    <div class="triangle"></div>
                    有意向报名，但对学校的课程培训进度不是很了解，特别是师资力量方面，下次再跟进一了解下这位家长的具体一向。
                </div>
                <!-- 图片 放大左右滑动-->
                <div class="img" v-if="listImgFile.length>0">
                    <img-area
                            :edit="false"
                            :imageType="0"
                            :imageFileList="listImgFile"
                            @imageLoaded="imageLoaded"
                            v-if="listImgFile.length>0">
                    </img-area>
                </div>
                <!-- 语音 -->
                <!--<div class="voice">-->
                    <!--<voice-recording-->
                            <!--:edit="false"-->
                            <!--:audioFileList="listVoiceFile">-->
                    <!--</voice-recording>-->
                <!--</div>-->
            </div>
            <div class="void"></div>
            <div class="state-msg">
                <div class="item">
                    <div class="attr">客户状态</div>
                    <div class="val">意向客户</div>
                </div>
                <div class="item">
                    <div class="attr">意向级别</div>
                    <div class="val">
                        <svg class="icon" aria-hidden="true" v-for="num in 5">
                            <use :xlink:href="2>num?'#icon-xingxingxuanzhong':'#icon-xingxingweixuanzhong'"></use>
                        </svg>
                    </div>
                </div>
                <div class="item">
                    <div class="attr">承诺到访</div>
                    <div class="val">2018.07.26</div>
                </div>
                <div class="item">
                    <div class="attr">诺到访类型</div>
                    <div class="val">体验</div>
                </div>
                <div class="item">
                    <div class="attr">下次跟进时间</div>
                    <div class="val">2018.07.26</div>
                </div>
                <div class="item">
                    <div class="attr">下次跟进类型</div>
                    <div class="val">电话</div>
                </div>
            </div>
        </scroller-base>
        <loading class="loading" v-show="isLoading"></loading>
    </div>

</template>

<script>
    export default {
        name: "communication-record",
        data() {
            return {
                wxTitle: "",
                scrollerRefreshNum:0,
                listImgFile:[],
                listVoiceFile:[],
                list: []
            }
        },
        computed: {
            renderData(){
                return{
                    list:this.list,
                    scrollerRefreshNum:this.scrollerRefreshNum
                }
            }
        },
        methods: {
            //图片完成
            imageLoaded() {
                this.scrollerRefreshNum++;
            },
            getData(){
                this.listImgFile = [
                    {
                        "ID": "2e274bda-4744-4aca-8be6-55dc86e45cdf",
                        "FileLength": 14568,
                        "FilePath": "//xgj-image-devp.oss-cn-hangzhou.aliyuncs.com/a12dd147-6048-43e3-806d-2b347fe58cb5/C/cfe19d43d8cf4fdb85b061612052da36-674615025e3444cf9d974490d5596e1b-02.jpg",
                        "Durations": 0,
                        "Suffix": ".jpg"
                    },
                    {
                        "ID": "9d34f64e-5029-4d2a-b61b-e384ab2bddce",
                        "FileLength": 30368,
                        "FilePath": "//xgj-image-devp.oss-cn-hangzhou.aliyuncs.com/a12dd147-6048-43e3-806d-2b347fe58cb5/C/cfe19d43d8cf4fdb85b061612052da36-aa89f37eb47e41708e6451809a7709f0-03.jpg",
                        "Durations": 0,
                        "Suffix": ".jpg"
                    },
                    {
                        "ID": "572d35a9-e1ce-4507-b657-b55b373d1803",
                        "FileLength": 50106,
                        "FilePath": "//xgj-image-devp.oss-cn-hangzhou.aliyuncs.com/a12dd147-6048-43e3-806d-2b347fe58cb5/C/cfe19d43d8cf4fdb85b061612052da36-c6ad7dc50b6742968a867d2caa869050-01.jpg",
                        "Durations": 0,
                        "Suffix": ".jpg"
                    },
                    {
                        "ID": "8438305f-e893-401e-ad71-f3a2234e17e8",
                        "FileLength": 26174,
                        "FilePath": "//xgj-image-devp.oss-cn-hangzhou.aliyuncs.com/a12dd147-6048-43e3-806d-2b347fe58cb5/C/cfe19d43d8cf4fdb85b061612052da36-09e532b2667c462687638d28ed045e7f-00.jpg",
                        "Durations": 0,
                        "Suffix": ".jpg"
                    }
                ];
                this.listVoiceFile = [
                    {
                        "ID": "1f6e7e01-befc-4abe-b568-08cb213b5287",
                        "FileLength": 1,
                        "FilePath": "//xgj-image-devp.oss-cn-hangzhou.aliyuncs.com/a12dd147-6048-43e3-806d-2b347fe58cb5/C/1838399d4f5547a9806c0a4a3469c555-a4ba315778b340959e953a9c6be3dcc8-00.mp3",
                        "Durations": 0,
                        "Suffix": ".mp3"
                    },
                    {
                        "ID": "1f6e7e01-befc-4abe-b568-08cb213b5287",
                        "FileLength": 1,
                        "FilePath": "//xgj-image-devp.oss-cn-hangzhou.aliyuncs.com/a12dd147-6048-43e3-806d-2b347fe58cb5/C/1838399d4f5547a9806c0a4a3469c555-a4ba315778b340959e953a9c6be3dcc8-00.mp3",
                        "Durations": 0,
                        "Suffix": ".mp3"
                    },
                    {
                        "ID": "1f6e7e01-befc-4abe-b568-08cb213b5287",
                        "FileLength": 1,
                        "FilePath": "//xgj-image-devp.oss-cn-hangzhou.aliyuncs.com/a12dd147-6048-43e3-806d-2b347fe58cb5/C/1838399d4f5547a9806c0a4a3469c555-a4ba315778b340959e953a9c6be3dcc8-00.mp3",
                        "Durations": 0,
                        "Suffix": ".mp3"
                    }
                ];
            }
        },
        created() {
            this.getData();
        },
        components: {}
    }
</script>

