<!-- 个人中心界面 -->
<style lang="scss" scoped>
    .personal-center{
        .header{
            padding: 13px;
            @include flex-center;
            background-color: #2196f3;
            color: $color-white;
            @include background-img(false, cover);
            .avatar{
                width: 73px;
                height: 73px;
                border-radius: 50%;
                background-color: #EEF1F6;
                border: 1px solid $color-white;
                @include background-img(false, cover);
            }
            .info{
                flex: 1;
                padding-left: 10px;
                font-size: 12px;
                .name{
                    font-size: 20px;
                    padding-bottom: 10px;
                }
                .role{
                    display: inline-block;
                    padding: 3px 9px;
                    border: 1px solid $color-white;
                    border-radius: 50px;
                    font-size: 10px;
                }
            }
        }
        .nav{
            .nav-item{
                padding:0 15px;
                height: 44px;
                @include border-bottom;
                @include flex-between;
                background-color: $color-white;
                font-size: 15px;
                .nav-icon{
                    margin-right: 10px;
                }
            }
        }
        .void{
            height: 10px;
            background-color: $color-assist-1;
        }
    }
    .qr-code{
        @include position-absolute;
    }
</style>

<template>
    <scroller-base class="personal-center" ref="scroller">
        <div class="header" :style="'backgroundImage:url('+personalCenterBg+')'">
            <div class="avatar" :style="'background-image:url('+userPhoto+')'"></div>
            <div class="info">
                <div class="name">{{app.sysInfo.FullName}}</div>
                <div class="role">{{currole.Name}}</div>
            </div>
        </div>
        <div class="nav">
            <div v-for="(item, index) in list" :key="index"
                v-if="judgeShow(item)">
                <div class="void" v-if="item.showVoid"></div>
                <div class="nav-item"
                    @click="triggerChange(item)">
                        <span>
                            <svg class="icon nav-icon" aria-hidden="true">
                                <use :xlink:href="item.icon"></use>
                            </svg>{{item.text}}
                        </span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                </div>
            </div>
            <div class="void"></div>
        </div>
        <loading class="loading" v-show="isLoading"></loading>
    </scroller-base>
</template>

<script>
    import {logout,savePost,processGet} from 'teacher/api/common';
    export default {
        name: 'personal-center',
        data () {
            return {
                wxTitle: '个人中心',
                isLoading: false,
                showQrCode: false,  //二维码开关
                qrUrl: null,  //二维码地址  初始为null
                personalCenterBg: require('./img/personal-teacher.jpg'),
                avatarTimer: null, //获取头像地址轮询
                refreshNum: 0,
                list: [{
                    href: 'passwordModify',
                    icon: '#icon-xiugaimima',
                    text: '修改密码',
                    showVoid: true
                },{
                    icon: '#icon-xiugaitouxiang',
                    text: '修改头像',
                    showVoid: false,
                    name: 'updateAvatar'
                },/* {
                    href: 'qrCode',
                    icon: '#icon-erweima',
                    text: '招生二维码',
                    showVoid: false,
                    name: 'qrCode'
                }, */{
                    href: 'workInfo',
                    icon: '#icon-gongzuotongji',
                    text: '工作统计',
                    showVoid: true,
                    name: 'workInfo'
                },{
                    href: 'commentRank',
                    icon: '#icon-pingjiapaiming',
                    text: '家长评价排名',
                    showVoid: false,
                    name: 'commentRank'
                },{
                    href: 'suggestion',
                    icon: '#icon-tousuyujianyi1',
                    text: '投诉与建议',
                    showVoid: false,
                    name: 'suggestion'
                },/*{
                    icon: '#icon-laoshixiu',
                    text: '老师秀',
                    showVoid: true,
                    name: 'ssxShow'
                }, {
                    href: 'cardList',
                    icon: '#icon-dianzituijianqia1',
                    text: '电子推荐卡',
                    showVoid: false,
                    name: 'card'
                }, */{
                    icon: '#icon-tuichudenglu',
                    text: '退出登录',
                    showVoid: true,
                    name: 'loginOut'
                }],
                userPhoto: app.sysInfo.Photo
            }
        },
        computed: {
            ...Vuex.mapState([
                'currole'
            ])
        },
        methods: {
            judgeShow(item){ //判断显示
                if(item.name=='updateAvatar' && this.currole.Id==1024){ //修改头像
                    return false;
                } else if(item.name=='qrCode'){ //招生二维码
                    if(this.currole.Id==1024){
                        return false;
                    }else if(app.sysInfo.EnableSelfEntryStudentInformation==0||!app.tool.op('CustomerAdd')){
                        return false;
                    }
                } else if((item.name=='workInfo'||item.name=='commentRank') && this.currole.Id==1024) { //工作统计,家长评价排名
                    return false;
                } else if (item.name=='suggestion' && !app.tool.op('SuggestionsQuery')) { //投诉与建议
                    return false;
                } else if (item.name=='ssxShow' && (this.currole.Id==1024||(this.currole.Id!=1024&&app.sysInfo.EnableSSXShow!=1))) { //老师秀
                    return false;
                }else if (item.name=='card' && (this.currole.Id==1024||(this.currole.Id!=1024&&app.sysInfo.EnableRecommendCard==0))) {  //电子推荐卡
                    return false;
                } 
                return true;
            },
            triggerChange(item){ //处理页面跳转/其他的点击事件
                if (item.href) {
                    this.$router.push(`/${item.href}`);
                }else{
                    if (item.name == 'updateAvatar'){ //修改头像
                        this.updateAvatar();
                    }else if (item.name == 'ssxShow') { //老师秀
                        location.href = location.protocol + "//" + location.host + "/weixin/teacher/t-show/show.aspx?id=" + app.sysInfo.ID;
                    }else if (item.name == 'loginOut') { //退出登录
                        this.isLoading = true;
                        logout().then(res => {
                            this.isLoading = false;
                            if (res.ErrorCode == app.errok) {
                                app.sdk.closeWindow();
                            }else{
                                app.toast('error','退出登录失败。');
                            }
                        })
                    }/*else if (item.name == 'yyrb') { //运营日报
                        location.href = location.protocol + "//" + location.host + "/weixin/teacher/daily_report.html?queryDate=2018-05-19";
                    }*/
                }
            },
            updateAvatar(){ //修改头像
                app.sdk.highChooseImage({
                    max: 1
                }).then(res => {
                    if (res.length > 0) {
                        let localImage = res[0];
                        //编辑完成图片
                        app.avatarModify(localImage).then(res => {
                            this.isLoading = true;
                            localImage.promise.then(resolve => {
                                savePost({
                                    saveFlag: 'USER_PHOTO',
                                    mediaId: app.envType==1?'':localImage.serverId,
                                    x: parseInt(res.x),
                                    y: parseInt(res.y),
                                    areaWidth: res.areaWidth,
                                    areaHeight: res.areaheight,
                                    width: parseInt(res.width),
                                    mediaUrl: app.envType==1?localImage.serverId:'',
                                    clientType: app.envType
                                }).then(res => {
                                    this.isLoading = false;
                                    if (res.errcode == app.errok) {
                                        app.toast('success', '头像修改成功。');
                                        this.isFinish();
                                    }else{
                                        app.toast('error', res.ErrorMsg);
                                    }
                                })
                            })
                        })
                    }
                });
            },
            isFinish(){ //轮询获取最新的头像
                processGet({
                    pname: 'main',
                    currole: 0
                }).then(res => {
                    if (res.errcode == app.errok) {
                        if (app.sysInfo.Photo == res.userPhoto) {
                            this.avatarTimer = setTimeout(() => {
                                this.isFinish();
                            },1000);
                        }else{
                            this.userPhoto = app.sysInfo.Photo = res.userPhoto;
                            clearTimeout(this.avatarTimer);
                        }
                    }else{
                        app.toast('error', res.errmsg);
                    }
                })
            }
        },
        watch: {
            $route(to,from) {
                // console.log(to)
                if(to.params.homeIndex == 2) {
                    this.$refs.scroller.scroller.refresh();
                }
            }
        }
    }
</script>