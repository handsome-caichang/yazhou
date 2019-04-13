<!-- 个人信息界面 -->
<style scoped lang="scss">



    .infomation-container {
        .scroller {
            background-color: $color-assist-1;
            @include position-absolute;
            .card {
                padding: 0 15px;
                display: flex;
                width: 100%;
                height: 49px;
                line-height: 49px;
                background-color: $color-white;
                font-size: 16px;
                .card-lf {
                    max-width: 110px;
                    height: 49px;
                    line-height: 49px;
                    color: $color-3;
                    .userphoto {
                        background-color: $color-assist-1;
                        width: 43px;
                        height: 43px;
                        border-radius: 43px;
                        margin: 3px;
                        @include background-img(false, cover);
                    }
                }
                .card-rt {
                    color: $color-9;
                    height: 49px;
                    line-height: 49px;
                    flex: 1;
                    text-align: right;
                    @include ellipsis-single;
                }
            }
            .head-img, .sex, .grade, .livePlace {
                margin-bottom: 9px;
            }
            .campus, .class-name, .qq {
                margin-bottom: 1px;
            }
        }
    }

    .public-actionsheet, .select-actionsheet, .sex-actionsheet, .edit {
        @include position-absolute;
    }
    .box{
        display: flex;
        flex-wrap: wrap;
        .item{
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: plum;
            border: 1px solid #BBBBBB;
            color: #000000;
            font-weight: bold;
            margin: 5px;
            padding: 5px;
        }
    }
</style>

<template>
    <div class="infomation-container">
        <scroller-base class="scroller">
            <!--更换头像-->
            <div class="card head-img" @click="updateAvatar">
                <div class="card-lf">
                    <div class="userphoto" :style="'background-image:url('+userPhoto+')'"></div>
                </div>
                <div class="card-rt">
                    <span>更换头像</span>
                </div>
                <span class="nav-icon">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </span>
            </div>

            <!--选择性别-->
            <div class="card sex" @click="showSexAS">
                <div class="card-lf">性别</div>
                <div class="card-rt"><span>{{sex}}</span></div>
                <span class="nav-icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </span>
            </div>
            <!--公立学校 （根据配置项可填）-->
            <div class="card campus" @click="showSchoolAS">
                <div class="card-lf">公立学校</div>
                <div class="card-rt"><span>{{school}}</span></div>
                <span class="nav-icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </span>
            </div>
            <!--年级-->
            <div class="card grade" @click="showGradeAS">
                <div class="card-lf">年级</div>
                <div class="card-rt"><span>{{gradeName}}</span></div>
                <span class="nav-icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </span>
            </div>
            <!--就读班级-->
            <div class="card class-name" @click="showEdit(2)">
                <div class="card-lf">就读班级</div>
                <div class="card-rt"><span>{{className}}</span></div>
                <span class="nav-icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </span>
            </div>
            <!--QQ号码-->
            <div class="card qq" @click="showEdit(0)">
                <div class="card-lf">QQ号码</div>
                <div class="card-rt"><span>{{qq}}</span></div>
                <span class="nav-icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </span>
            </div>
            <!--家庭住址-->
            <div class="card livePlace" @click="showEdit(1)">
                <div class="card-lf">家庭住址</div>
                <div class="card-rt"><span>{{livePlace}}</span></div>
                <span class="nav-icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </span>
            </div>


        </scroller-base>

        <!--选择 公立学校 子组件-->
        <public-school
                class="public-actionsheet"
                :opened.sync="openSchoolActionsheet"
                :list="FullSchoolList"
                @informationSchool="schoolAction">
        </public-school>

        <!--选择 年级 子组件-->
        <grade-actionsheet
                class="select-actionsheet"
                :opened.sync="openGradeActionsheet"
                :list="GradeList"
                @informationGrade="gradeAction">
        </grade-actionsheet>

        <!--填写QQ号码，家庭住址 子组件-->
        <edit class="edit"
              :opened.sync="openEdit"
              :titleType="titleType"
              :editText="editText"
              @informationQQ="acceptEditQQ"
              @informationAddress="acceptEditAddress"
              @informationClassName="informationClassName">
        </edit>

        <!--选择性别子组件-->
        <sex-actionsheet
                class="sex-actionsheet"
                :opened.sync="openSexActionsheet"
                :position="position"
                @informationSex="acceptSex">
        </sex-actionsheet>

        <loading class="loading" v-show="isLoading"></loading>
    </div>
</template>

<script>
    import Edit from './child/edit.vue';
    import SexActionsheet from './child/sex-actionsheet.vue';
    import GradeActionsheet from './child/grade-actionsheet.vue';
    import PublicSchool from './child/public-school.vue';
    import {processGet, processPost, savePost} from 'parent/api/common';

    export default {
        name: "personal-information",
        data() {
            return {
                wxTitle: '个人信息',
                isLoading: true,
                userPhoto: '',//用户头像
                avatarTimer: null, //获取头像地址轮询
                position: 'bottom',//选择性别子组件需要参数
                titleType: 0,//QQ号码||家庭住址||就读班级 需要展示的'标题'和发射'事件'的判断依据
                editText: '',//QQ号码||家庭住址||就读班级 需要回显的文本
                FullSchoolList: '',//公立学校列表
                GradeList: '',//年级列表
                sex: '',//性别
                school: '',//公立学校 名称
                // schoolID: '',//公立学校ID 名称
                gradeName: '',//年级 名称
                className: '',//就读班级 名称
                qq: '',//qq号码 名称
                livePlace: '',//家庭住址 名称
                openSchoolActionsheet: false,//公立学校 弹窗开关
                openGradeActionsheet: false,//年级 弹窗开关
                openSexActionsheet: false,//性别 弹窗开关
                openEdit: false,//qq 家庭住址 弹窗开关
                uname: ''
            }
        },
        methods: {
            // 公立学校
            showSchoolAS() {
                app.ls.setStorage('personalInfomationPublicSchool',this.school);
                this.openSchoolActionsheet = !this.openSchoolActionsheet;
            },
            schoolAction(item){
                this.school = item.Value;
            },
            // 年级
            gradeAction(goal) {
                this.gradeName = goal;
            },
            // 年级
            showGradeAS() {
                this.openGradeActionsheet = !this.openGradeActionsheet;
            },
            // 就读班级||qq||家庭住址
            showEdit(type) {
                this.titleType = parseInt(type);
                //0-qq;1-livePlace;2-className
                this.editText = this.titleType == 0 ? this.qq : this.titleType == 1 ? this.livePlace : this.className;
                this.openEdit = !this.openEdit;
            },
            // 性别
            showSexAS() {
                this.openSexActionsheet = !this.openSexActionsheet;
            },
            acceptSex(sex) {
                this.sex = sex;
            },
            acceptEditQQ(str) {
                this.qq = app.tool.trim(str)
            },
            acceptEditAddress(str) {
                this.livePlace = app.tool.trim(str)
            },
            informationClassName(str) {
                this.className = app.tool.trim(str)
            },
            // 请求显示数据
            loadAll() {
                let loadPara = processPost({pname: 'dictionary'}).then(res => {
                    return res
                }), loadData = processGet({pname: 'parentAccount'}).then(res => {
                    return res
                });

                Promise.all([loadPara, loadData]).then(res => {
                    this.isLoading = false;
                    if (res[0].errcode == app.errok && res[1].errcode == app.errok) {
                        //公立学校 年级 列表
                        this.FullSchoolList = res[0].data.FullSchool;
                        this.GradeList = res[0].data.Grade;
                        //个人信息
                        this.userPhoto = res[1].data.UserPhoto;
                        this.sex = res[1].data.Sex;
                        this.school = res[1].data.FullTimeSchool;
                        // this.schoolID = res[1].data.schoolID;
                        this.gradeName = this.GradeList[res[1].data.Grade];//这里不直接使用gradeName字段，要用grade去FullSchool里去匹配，原因问liuyujie
                        this.className = res[1].data.ClassName;
                        this.qq = res[1].data.QQ;
                        this.livePlace = res[1].data.LivePlace;
                        this.uname = res[1].data.UserName;
                    }
                })
            },
            updateAvatar() { //修改头像
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
                                    mediaId: localImage.serverId,
                                    x: parseInt(res.x),
                                    y: parseInt(res.y),
                                    areaWidth: res.areaWidth,
                                    areaHeight: res.areaheight,
                                    width: parseInt(res.width)
                                }).then(res => {
                                    this.isLoading = false;
                                    if (res.errcode == app.errok) {
                                        app.toast('success', '头像修改成功。');
                                        this.isFinish();
                                    } else {
                                        app.toast('error', res.ErrorMsg);
                                    }
                                })
                            })
                        })
                    }

                });
            },
            isFinish() { //轮询获取最新的头像
                processGet({pname: 'parentAccount'}).then(res => {
                    if (res.errcode == app.errok) {
                        if (this.userPhoto == res.data.userPhoto) {
                            this.avatarTimer = setTimeout(() => {
                                this.isFinish();
                            }, 1000);
                        } else {
                            this.userPhoto = res.data.userPhoto;
                            clearTimeout(this.avatarTimer);
                        }
                    } else {
                        app.toast('error', res.errmsg);
                    }
                })
            }
        },
        created() {
            this.loadAll();
        },
        watch: {
            openEdit: function () {
                if (!this.opened) {
                    app.tool.setDocTitle('个人信息');
                }
            }
        },
        components: {
            GradeActionsheet,
            PublicSchool,
            Edit,
            SexActionsheet
        }
    }
</script>