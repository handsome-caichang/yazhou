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
                    width: 66px;
                    height: 49px;
                    line-height: 49px;
                    color: $color-3;
                    .userphoto {
                        background-color:$color-assist-1;
                        width: 43px;
                        height: 43px;
                        border-radius: 43px;
                        margin:3px;
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
    .select-actionsheet, .sex-actionsheet, .edit {
        @include position-absolute;
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
                <div class="card-rt">
                    <span v-show="sex==1">男</span>
                    <span v-show="sex==2">女</span>
                </div>
                <span class="nav-icon">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </span>
            </div>
            <!--公立学校-->
            <!--<div class="card campus" @click="showSelectAS(0)">-->
                <!--<div class="card-lf">公立学校</div>-->
                <!--<div class="card-rt"><span>{{school}}</span></div>-->
                <!--<span class="nav-icon">-->
                    <!--<svg class="icon" aria-hidden="true">-->
                        <!--<use xlink:href="#icon-youjiantou"></use>-->
                    <!--</svg>-->
                <!--</span>-->
            <!--</div>-->
            <!--年级-->
            <div class="card grade" @click="showSelectAS(1)">
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
            <!--修改密码-->
            <router-link class="card" tag="div" to="/passwordModify">
                <div class="card-lf">修改密码</div>
                <div class="card-rt"></div>
                <span class="nav-icon">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </span>
            </router-link>
        </scroller-base>
        
        <!--选择公立学校，年级 公共子组件-->
        <select-actionsheet 
        	class="select-actionsheet"
            :type="type"
            :opened.sync="openSelectActionsheet"
            :list="list"
            @informationCampu="selectAction">
        </select-actionsheet>
        
        <!--填写QQ号码，家庭住址 公共子组件-->
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
    import SexActionsheet from './child/sex-actionsheet';
    import SelectActionsheet from './child/select-actionsheet';
    import {opuserphoto,getuserinfobyuid,getschoolandgrade} from 'parent/api/personal-center.js';

    export default {
        name: "personal-information",
        data() {
            return {
                wxTitle: '个人信息',
                isLoading: true,
                userPhoto:'',//用户头像
                avatarTimer: null, //获取头像地址轮询
                position: 'bottom',//选择性别子组件需要参数
                type: 0,//公立学校，年级类型的判断 0表示学校，1表示年级
                titleType: 0,//QQ号码||家庭住址||就读班级 需要展示的'标题'和发射'事件'的判断依据
                editText: '',//QQ号码||家庭住址||就读班级 需要回显的文本
                FullSchoolList: '',//公立学校列表
                GradeList: '',//年级列表
                list: [],//用来传递的list
                sex: '',//性别
                school: '',//公立学校 名称
                // schoolID: '',//公立学校ID 名称
                gradeName: '',//年级 名称
                className: '',//就读班级 名称
                qq: '',//qq号码 名称
                livePlace: '',//家庭住址 名称
                openSelectActionsheet: false,//学校，年级，班级 弹窗开关
                openSexActionsheet: false,//性别 弹窗开关
                openEdit: false//qq 家庭住址 弹窗开关
            }
        },
        methods: {
            selectAction(goal) {
                if (this.type == 0) {
                    this.school = goal.value;
                } else if (this.type == 1) {
                    this.gradeName = goal.name;
                }
            },
            // 公立学校||年级
            showSelectAS(num) {
                this.type = parseInt(num);
                if (!this.openSelectActionsheet) {
                    //根据type给list(弹框列表)赋值
                    this.list = this.type==0?this.FullSchoolList:this.GradeList;
                }
                if(num==0&&this.FullSchoolList.length<1){
                    app.toast('请联系您的学校增加公立学校选项~')
                }else{
                    this.openSelectActionsheet = !this.openSelectActionsheet;
                }
            },
            // 就读班级||qq||家庭住址
            showEdit(type) {
                this.titleType = parseInt(type);
                //0-qq;1-livePlace;2-className
                this.editText = this.titleType == 0 ? this.qq : this.titleType == 1 ? this.livePlace : this.className;
                this.openEdit = !this.openEdit;
            },
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
                let loadPara1 = getuserinfobyuid().then(res => {
                        return res
                    }), loadData2 = getschoolandgrade().then(res => {
                        return res
                    });

                Promise.all([loadPara1, loadData2]).then(res => {
                    this.isLoading = false;
                    if (res[0].result.code == app.errok && res[1].result.code == app.errok) {

                        //公立学校 年级 列表
                        this.FullSchoolList = res[1].data.schools;
                        this.GradeList = res[1].data.grades;
                        //个人信息
                        this.userPhoto = res[0].data.userphoto;
                        this.sex = res[0].data.sex;
                        this.school = res[0].data.school;
                        // this.schoolID = res[0].data.schoolID;
                        // this.gradeName = this.GradeList[res[1].data.grade];//这里不直接使用gradeName字段，要用grade去FullSchool里去匹配，原因问liuyujie
                        this.gradeName = res[0].data.gradename;
                        this.className = res[0].data.classname;
                        this.qq = res[0].data.qq;
                        this.livePlace = res[0].data.liveplace;
                    }
                })
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
                                opuserphoto({
                                    mediaids: localImage.serverId,
                                    upwidth: parseInt(res.width), //放大后宽度
                                    x: parseInt(res.x), //x轴坐标
                                    y: parseInt(res.y), //y轴坐标
                                    cutwidth: res.areaWidth, //截取后宽度
                                    cutheight: res.areaheight, //截取后高度
                                }).then(res => {
                                    this.isLoading = false;
                                    if (res.result.code == app.errok) {
                                        app.toast('success', '头像修改成功。');
                                        this.isFinish();
                                    }else{
                                        app.toast('error', res.result.msg);
                                    }
                                });
                            })
                        })
                    }

	    		});
            },
            isFinish(){ //轮询获取最新的头像
				getuserinfobyuid().then(res => {
					if (res.result.code == app.errok) {
						if (this.userPhoto == res.data.userphoto) {
							this.avatarTimer = setTimeout(() => {
                                this.isFinish();
                            },1000);
						}else{
							this.userPhoto = res.data.userphoto;
							clearTimeout(this.avatarTimer);
						}
					}else{
						app.toast('error', res.result.msg);
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
            SelectActionsheet,
            Edit,
            SexActionsheet
        }
    }
</script>