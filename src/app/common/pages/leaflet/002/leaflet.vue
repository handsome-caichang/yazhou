<style lang="scss" scoped>
.scroll {
    @include position-absolute(0, 0, 49px, 0);
    background-color: #F9E14C;
    .heard {
        position: relative;
        img {
            width: 100%;
            height: 139%;
        }
        .time-tag {
            position: absolute;
            color: #fff;
            // font-size: 16px;
            left: 12%;
            top: 22%;
            @media only screen and(max-width: 360px) {
                font-size: 14px;
            }
            @media only screen and(max-width: 375px) {
                font-size: 16px;
            }
        }
        .text-tag {
            position: absolute;
            width: 62%;
            font-size: 15px;
            color: #230A00;
            left: 13.6%;
            top: 37.5%;
            text-align: center;
        }
    }
    .content {
        width: 100%;
        background-color: #F9E14C;
        padding-left: 25px;
        padding-right: 15px;
        .card {
            background-color: #F3A43C;
            border-radius: 25px;
            border: 3px solid #222;
            position: relative;
            .card-content {
                position: relative;
                left: -4px;
                top: -5px;
                border: 4px solid #222;
                background-color: #FFFDEF;
                border-radius: 20px;
                padding: 19px 21px 30px 28px;
                .title {
                    height: 31px;
                    line-height: 31px;
                    font-size: 22px;
                    text-align: center;
                    color: #222;
                    position: relative;
                    .img1, .img2 {
                        position: absolute;
                        width: 26px;
                        height: 26px;
                        position: absolute;
                        // background-image: url('./ding.png');
                        top: 3px;
                        @include background-img('./ding.png', cover);
                    }
                    .img1{
                        left: 0
                    }
                    .img2 {
                        right: 0;
                    }
                }
                .text {
                    font-size: 14px;
                    color: #777777;
                    line-height: 21px;
                    white-space: pre-wrap;
                }
                .bg-img {
                    margin-top: 17px;
                    width: 100%;
                }
            }
        }
        .mt-15 {
            margin-top: 15px;
        }
    }
}
.bottom {
    @include position-absolute(false, 0, 0, 0);
    height: 49px;
    font-size: 16px;
    display: flex;
    .bottom-l {
        width: 112px;
        background-color: #fff;
        text-align: center;
        line-height: 49px;
    }
    .bottom-r {
        line-height: 49px;
        flex: 1;
        color: #6E3B25FF;
        text-align: center;
        background: linear-gradient(bottom, #F19A3A, #FFDF4B);
    }
    .jieshu {
      background: #d7d7d7;
      color: #666666;
    }
    .shoukong {
      background: #ffd29c;
      color: #fff;
    }
}
.enroll-sucess {
    @include position-absolute;
}
</style>

<template>
    <div class="wrapper">
        <scroller-base class="scroll" :data="scrollData">
            <div class="heard">
                <img src="./bg.png" @load="imgLoad">
                <div class="time-tag">截至：{{detail.expiretime | formatDate}}</div>
                <div class="text-tag">{{detail.title}}</div>
            </div>
            <div class="content">
                <div class="card">
                    <div class="card-content">
                        <div class="title">活动说明
                            <div class="img1"></div>
                            <div class="img2"></div>
                        </div>
                        <div class="text">{{detail.contentmain}}</div>
                    </div>
                </div>
                 <div class="card mt-15">
                    <div class="card-content">
                        <div class="title">机构介绍
                            <div class="img1"></div>
                            <div class="img2"></div>
                        </div>
                        <div class="text">{{detail.orgintroduce}}</div>
                        <img class="bg-img" 
                           v-for="(img,index) in campanyInfoImgList" 
                           :key="index"
                           :src="img.filepath"
                           @click="previewImg(img)"
                           @load="imgLoad">
                    </div>
                </div>
                 <div class="card mt-15">
                    <div class="card-content">
                        <div class="title">联系方式
                            <div class="img1"></div>
                            <div class="img2"></div>
                        </div>
                        <div class="text">{{detail.contactinfo}}</div>
                    </div>
                </div>
            </div>
        </scroller-base>
        <div class="bottom" @click="edit" v-if="type=='add'"><div class="bottom-r">立即制作我的活动</div></div>
        <div class="bottom" v-if="!type">
            <a class="bottom-l"  :href="'tel:'+detail.orgphone">联系机构</a>
            <div class="bottom-r" @click="baoming" :class="detail.isexpire == 1 ? 'jieshu' : (detail.isfull == 1 ? 'shoukong' : '')">{{ detail.isexpire == 1 ? '已结束' : (detail.isfull == 1 ? '已售罄' : detail.enterbuttonname )}}</div>
        </div>
        <div class="bottom" @click="$router.go(-1)" v-if="type=='preview'||type=='managepreview'"><div class="bottom-r">返回</div></div>
        <enroll-sucess :opened.sync="showSucess" class="enroll-sucess" @share="share" @offClick="showSucess = false"></enroll-sucess>
    </div>
</template>

<script>
    import EnrollSucess from 'common/components/common/enrollSucess.vue'
    import {templateData} from './leaflet.js'
    import {getsharedetail,joinactivity} from 'user/api/common.js'
    import { getactinsdetail, gettemplateinfo } from "manage/api/common.js";
    //用来处理机构信息相关的模板数据 
    export default {
        name: 'leaflet',
        mixins: [app.mixin.shareMixin],
        data() {
            return {
                wxTitle: '妙招生',
                showSucess: false,
                type: '',
                templateid: '',
                detail: {},

                activeSetingImgList: [], // 主题图
                campanyInfoImgList: [], //机构图

                scrollData: 0,
                showBaoMing: false
            }
        },
         computed: {
            ...Vuex.mapState([
              "userInfo"
            ]),
        },
        methods: {
            imgLoad() {
                this.scrollData ++
            },
            previewImg(img) {
                let current = img.localId || app.tool.getAbsUrl(img.FilePath||img.filepath),
                    urls =  this.campanyInfoImgList.map(img => {
                        return img.localId || app.tool.getAbsUrl(img.FilePath||img.filepath);
                    })
                app.sdk.previewImage({
                    current: current,
                    urls: urls
                })
            },
            share() {
                let styleStr = 'styleid='+ encodeURIComponent(this.$route.params.id),
                shareidStr = 'shareid='+ encodeURIComponent(this.$route.query.id),
                idStr = 'id='+ encodeURIComponent(this.detail.actinsconfigleaflet.activityinstanceid),
                activitytypeStr = 'activitytype='+encodeURIComponent(this.detail.activitytype);
                wx.miniProgram.navigateTo({
                    url:`/pages/share/share?${styleStr}&${shareidStr}&${idStr}&${activitytypeStr}`,
                    success: function(){},
                    fail: function(){
                        app.alert('跳转失败，请刷新页面重试。');            
                    }
                });
            },
            edit() {
                this.$router.push({path: `/templateEdit/${this.$route.params.id}`, query:{type:this.type, templateid:this.templateid}})
            },
            baoming() {
                if (this.detail.isfull == 1 || this.detail.isexpire == 1) {
                    return;
                }
                if (this.detail.isjoin == 0) {
                    if (this.detail.isfull == 1) {
                        app.alert('此活动已售罄')
                        return;
                    }
                    app.baoMingAction().then(res => {
                        if (res.action) {
                            let tel = res.tel;
                            let name = res.name;
                            joinactivity({
                                activityshareid: this.$route.query.id,
                                name: name,
                                phone: tel
                            }).then(res => {
                                if (res.result.code == 200) {
                                    this.ruleid = res.id;
                                    this.showSucess = true;
                                } else {
                                    app.toast("error", res.result.msg);
                                }
                            })
                        } else {
                    
                        }
                    })
                    if (!this.userInfo.smstel) {
                        //判断没有手机号码
                        wx.miniProgram.navigateTo({
                            url: `/pages/authphone/authphone?url=` + encodeURIComponent(location.href),
                            success: function() {},
                            fail: function() {
                                app.alert("跳转失败，请刷新页面重试。")
                                }
                        })
                    }
                }else {
                    app.toast('error', '已报名')
                }
                
            },
             getData() {
                if (this.type == 'add') {
                    // this.detail = templateData
                    gettemplateinfo({
                        styleid: this.$route.params.id
                    }).then(res => {
                        console.log(res);
                        if (res.result.code == 200) {
                            this.detail = res.data;
                            // 模板主题图
                            this.activeSetingImgList = this.detail.actinsfilelist.filter(
                                item => item.type == 10
                            );
                            // 模板机构图
                            this.campanyInfoImgList = this.detail.actinsfilelist.filter(
                                item => item.type == 30
                            );
                            this.scrollData++
                        }else {
                            app.toast('error',res.result.msg)
                        }
                    })
                }else if (this.type == 'preview') {
                    this.detail = app.ls.get('previweData');
                    // 模板主题图
                    this.activeSetingImgList = this.detail.actinsfilelist.filter(item => item.type == 10)
                    // 模板机构图
                    this.campanyInfoImgList = this.detail.actinsfilelist.filter(item => item.type == 30)
                }else if (this.type == 'managepreview') {
                    getactinsdetail({actinsid: this.$route.query.id}).then(res => {
                        if (res.result.code == 200) {
                            this.detail = res.data
                            // 模板主题图
                            this.activeSetingImgList = this.detail.actinsfilelist.filter(item => item.type == 10)
                            // 模板机构图
                            this.campanyInfoImgList = this.detail.actinsfilelist.filter(item => item.type == 30)
                            this.scrollData++
                        }else {
                            app.toast('error',res.result.msg);
                        }
                    })
                }else {
                    getsharedetail({
                         shareid: this.$route.query.id
                    }).then(res => {
                        if (res.result.code == 200) {
                            this.detail = res.data;

                            this.$emit('loadDataComplete',{
                                name: this.detail.title
                            })
                            // 模板主题图
                            this.activeSetingImgList = this.detail.actinsfilelist.filter(item => item.type == 10)
                            // 模板机构图
                            this.campanyInfoImgList = this.detail.actinsfilelist.filter(item => item.type == 30)
                            this.scrollData++;
                            if (this.grant == 'phone' && this.detail.isjoin == 0) {
                                this.baoming();
                            }
                        }else {
                            app.toast('error',res.result.msg);
                        }
                    })
                }
            }
        },
        filters: {
            formatDate(str) {
                if (!str) return ''
                str = str.replace('-', '年')
                return str = str.replace('-', '月').slice(0, 10)
            }
        },
        created() {
            this.type = this.$route.query.type
            this.templateid = this.$route.query.templateid;
            this.grant = this.$route.query.grant;
            this.getData()
        },
        components: {
            EnrollSucess,
        }
    }
</script>