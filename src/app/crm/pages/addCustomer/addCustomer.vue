<style scoped lang="scss">
    .scroll {
        @include position-absolute(0, 0, 49px, 0);
        background-color: #F7F8FA;
        padding: 15px 16px;
        .item-mg {
            margin-top: 8px;
        }
        .item {
            height: 49px;
            border: 1px solid #F7F8FA;
            border-radius: 6px;
            background-color: $color-white;
            color: $color-9;
            padding: 0 15px;
            &:nth-child(n+2) {
                margin-top: 8px;
            }
            @include flex-between;
            .text {
                // width: 40px;
                font-size: 14px;
            }
            .spec {
                color: #FF735C;
            }
            .input {
                flex: 1;
                font-size: 15px;
                text-align: right;
                color: $color-3;
            }
            .mid {
                flex: 1;
                text-align: right;
                @include ellipsis-single;
                margin-left: 30px; 
                font-size: 14px;
                color: $color-3;
            }
            .mid-spec {
                font-size: 14px;
                color: $color-3;
            }
            .spec-mid {
                flex: 1;
                text-align: right;
                span {
                    display: inline-block;
                    width: 25px;
                    height: 49px;
                    line-height: 49px;
                    text-align: center;
                    font-size: 18px;
                }
                .active {
                    color: #FFD427;
                }
            }
            .right {
                width: 20px;
                text-align: right;
            }
            .right-sex {
                width: 120px;
                display: flex;
                justify-content: space-between;
                .icon {
                    font-size: 54px;
                }
            }
        }
        .more {
            margin-top: 16px;
            text-align: center;
            font-size: 12px;
            color: $color-primary;
        }
        .remark {
            margin-top: 10px;
            .remark-text {
                font-size: 14px;
                color: $color-3;
                border-radius: 6px;
                height: 71px;
                padding: 13px 16px; 
            }
        }
        .void {
            height: 25px;
            background-color: #F7F8FA;
        }
    }
    .bottom {
        @include position-absolute(false, 0, 0, 0);
        height: 49px;
        border-top: 1px solid #C2CCDC;
        @include flex-between;
        padding: 0 8px;
        .content {
            height: 40px;
            line-height: 40px;
            background-color: #5991FF;
            border: 1px solid #5991FF;
            border-radius: 2px;
            color: $color-white;
            font-size: 17px;
            text-align: center;
            width: 100%;
        }
    }
</style>

<template>
    <div class="wrapper">
        <scroller-base class="scroll" :data="showMore" v-if="showLoading">
            <div class="item" v-if="map['cName']&&map['cName'].isuse">
                <div class="text">学员</div>
                <span class="spec" v-if="map['cName'].isallowempty">*</span>
                <input type="text" class="input" placeholder="请输入" v-model="cName">
            </div>
            <div class="item" v-if="map['cPhone']&&map['cPhone'].isuse">
                <div class="text">手机号码</div>
                <span class="spec" v-if="map['cPhone'].isallowempty">*</span>
                <input type="text" class="input" placeholder="请输入" v-model="cPhone">
            </div>
            <div class="item" @click="showSelectSource=true">
                <div class="text">招生来源</div>
                <span class="spec">*</span>
                <div class="mid">{{sourceObj.value}}</div>
                <div class="right">
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item" @click="openCommAction('campusList')">
                <div class="text">所属校区</div>
                <span class="spec">*</span>
                <div class="mid">{{cCampusID.name}}</div>
                <div class="right">
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item" @click="selectResponsible(0)" >
                <div class="text">主责任人</div>
                <span class="spec" v-if="map['cCustomerManagerID'].isallowempty">*</span>
                <div class="mid">{{cCustomerManagerID.name}}</div>
                <div class="right">
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item" @click="selectResponsible(1)" v-if="map['cNotCustomerManager']&&map['cNotCustomerManager'].isuse">
                <div class="text">副责任人</div>
                <span class="spec" v-if="map['cNotCustomerManager'].isallowempty">*</span>
                <div class="mid">{{minorPersonName}}</div>
                <div class="mid-spec" v-if="minorPerson">等{{minorPerson.length}}人</div>
                <div class="right">
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item" v-if="map['cIntentionLevel']&&map['cIntentionLevel'].isuse">
                <div class="text">意向级别</div>
                <span class="spec" v-if="map['cIntentionLevel'].isallowempty">*</span>
                <div class="spec-mid">
                    <span v-for="(i, num) in 5" @click="selectLevel(i)" :class="{active:i<=cIntentionLevel}">
                        <svg aria-hidden="true" class="icon" >
                            <use xlink:href="#icon-wuxing"></use>
                        </svg>
                    </span>
                </div>
            </div>
            <div class="item" @click="openCommAction('statusList')" v-if="map['cCustomStatus']&&map['cCustomStatus'].isuse">
                <div class="text">客户状态</div>
                <span class="spec" v-if="map['cCustomStatus'].isallowempty">*</span>
                <div class="mid">{{cCustomStatus.value}}</div>
                <div class="right">
                    <svg aria-hidden="true" class="icon" v-if="followStatus!==5">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item" @click="relatedWx" v-if="false">
                <div class="text">关联微信号</div>
                <span class="spec" v-if="map['cWebchat'].isallowempty">*</span>
                <div class="mid">{{wxText}}</div>
                <div class="right">
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item" v-if="map['cEnglishName']&&map['cEnglishName'].isuse">
                <div class="text">英文姓名</div>
                <span class="spec" v-if="map['cEnglishName'].isallowempty">*</span>
                <input type="text" class="input" placeholder="请输入" v-model="cEnglishName">
            </div>
                
            <div class="item" v-if="map['cSex']&&map['cSex'].isuse">
                <div class="text">性别</div>
                <span class="spec" v-if="map['cSex'].isallowempty">*</span>
                <div class="mid"></div>
                <div class="right-sex">
                    <div class="sex" @click="cSex=1">
                        <svg aria-hidden="true" class="icon">
                            <use :xlink:href="cSex==1?'#icon-nanxuanzhong':'#icon-nan'"></use>
                        </svg>
                    </div>
                    <div class="sex" @click="cSex=2">
                        <svg aria-hidden="true" class="icon">
                            <use :xlink:href="cSex==2?'#icon-nvxuanzhong':'#icon-nv'"></use>
                        </svg>
                    </div>
                </div>
            </div>
               
            <div class="item" @click="selectBirthDay" v-if="map['cBrithday']&&map['cBrithday'].isuse">
                <div class="text">出生日期</div>
                <span class="spec" v-if="map['cBrithday'].isallowempty">*</span>
                <div class="mid">{{cBrithday}}</div>
                <div class="right">
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
                
            <div class="item" v-if="map['cIdCard']&&map['cIdCard'].isuse">
                <div class="text">身份证号码</div>
                <span class="spec" v-if="map['cIdCard'].isallowempty">*</span>
                <input type="text" class="input" placeholder="请输入" v-model="cIdCard">
            </div>
                
            <div class="item" v-if="map['cQQ']&&map['cQQ'].isuse">
                <div class="text">QQ号码</div>
                <span class="spec" v-if="map['cQQ'].isallowempty">*</span>
                <input type="text" class="input" placeholder="请输入" v-model="cQQ">
            </div>
               
            <div class="item" @click="openCommAction('schoolList')" v-if="map['cShool']&&map['cShool'].isuse">
                <div class="text">公立学校</div>
                <span class="spec" v-if="map['cShool'].isallowempty">*</span>
                <div class="mid">{{cShool.value}}</div>
                <div class="right">
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
               
            <div class="item" @click="openCommAction('gradeList')" v-if="map['cGrade']&&map['cGrade'].isuse">
                <div class="text">年级</div>
                <span class="spec" v-if="map['cGrade'].isallowempty">*</span>
                <div class="mid">{{cGrade.value}}</div>
                <div class="right">
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
                
            <div class="item" v-if="map['cClass']&&map['cClass'].isuse">
                <div class="text">班级</div>
                <span class="spec" v-if="map['cClass'].isallowempty">*</span>
                <input type="text" class="input" placeholder="请输入" v-model="cClass">
            </div>

            <div class="item" v-if="map['cFatherPhone']&&map['cFatherPhone'].isuse">
               <div class="text">父亲电话</div>
               <span class="spec" v-if="map['cFatherPhone'].isallowempty">*</span>
               <input type="text" class="input" placeholder="请输入" v-model="cFatherPhone">
           </div>
            <div class="item" v-if="map['cfathername']&&map['cfathername'].isuse">
                <div class="text">父亲姓名</div>
                <span class="spec" v-if="map['cfathername'].isallowempty">*</span>
                <input type="text" class="input" placeholder="请输入" v-model="cfathername">
            </div>
            <div class="item" v-if="map['cFatherwork']&&map['cFatherwork'].isuse">
                <div class="text">父亲职业</div>
                <span class="spec" v-if="map['cFatherwork'].isallowempty">*</span>
                <input type="text" class="input" placeholder="请输入" v-model="cFatherwork">
            </div>
                
            <div class="item" v-if="map['cmothername']&&map['cmothername'].isuse">
                <div class="text">母亲姓名</div>
                <span class="spec" v-if="map['cmothername'].isallowempty">*</span>
                <input type="text" class="input" placeholder="请输入" v-model="cmothername">
            </div>
            <div class="item" v-if="map['cMotherPhone']&&map['cMotherPhone'].isuse">
                <div class="text">母亲电话</div>
                <span class="spec" v-if="map['cMotherPhone'].isallowempty">*</span>
                <input type="text" class="input" placeholder="请输入" v-model="cMotherPhone">
            </div>
            <div class="item" v-if="map['cMotherwork']&&map['cMotherwork'].isuse">
                <div class="text">母亲职业</div>
                <span class="spec" v-if="map['cMotherwork'].isallowempty">*</span>
                <input type="text" class="input" placeholder="请输入" v-model="cMotherwork">
            </div>

            <div class="item" v-if="map['cHomeTel']&&map['cHomeTel'].isuse">
                <div class="text">家庭电话</div>
               <span class="spec" v-if="map['cHomeTel'].isallowempty">*</span>
               <input type="text" class="input" placeholder="请输入" v-model="cHomeTel">
            </div>
            <div class="item" v-if="map['cHomeAddress']&&map['cHomeAddress'].isuse">
                <div class="text">家庭住址</div>
                <span class="spec" v-if="map['cHomeAddress'].isallowempty">*</span>
                <input type="text" class="input" placeholder="请输入" v-model="cHomeAddress">
            </div>
                <!-- <div class="remark">
                    <textarea placeholder="备注：" 
                        class="remark-text" 
                        v-model="descText"
                        @touchstart="app.area.start($event)"
                        @touchmove="app.area.move($event)"
                        @touchend="app.area.end($event)">
                    </textarea>
                </div> -->
            <!-- </div> -->
            <div class="void"></div>
        </scroller-base>
        <div class="bottom">
            <div class="content" @click="submit">确定</div>
        </div>
        <!-- 绑定微信联系人 -->

        <!-- 选择校区、学校、班级、年级 -->
        <comm-action :opened.sync="showCommAction" ref="commAction"></comm-action>

        <!-- 选择招生来源 -->
        <select-source 
            :opened.sync="showSelectSource" 
            :list="sourceList"
            @selectBigItem="selectBigItem"
            @selectSmallItem="selectSmallItem"></select-source>
    </div>
</template>

<script>
    import CommAction from './child/commAction.vue'
    import SelectSource from './child/selectSource.vue'
    import {getcustomerinformationconfiglist, opCustomerInfo, getCampuslist, getCurrentManager, getConfigFormList} from 'crm/api/yy.js'
    export default {
        data() {
            return {
                optype: parseInt(this.$route.params.optype),
                showMore: false,
                showLoading: false,
                list: [],
                cSex: 0,
                cIntentionLevel: 0, //意向级别
                cBrithday: '',
                //关联微信

                showCommAction: false,

                showSelectSource: false,
                actionList: [],//根据点击不同获取的动态数组

                map: {},

                statusList: [],
                cCustomStatus: {},
                
                campusList: [],
                cCampusID: {},

                gradeList: [],
                cGrade: {},

                sourceList: [],
                sourceObj: {},

                schoolList: [],
                cShool: {},
                
                cCustomerManagerID: {}, //主责任人
                cNotCustomerManager: [], //副责任人  

                //表单字段
                cName: '',
                cPhone: '',
                cIdCard: '',
                cQQ: '',
                cEnglishName: '',
                cClass: '',
                cFatherPhone: '',
                cfathername: '',
                cFatherwork: '',
                // mothermobileText: '',
                cmothername: '',
                cMotherwork: '',
                cHomeAddress: '',
                cHomeTel: '',
                // descText: '',
                cWebchat: '',

                followStatus: 0
            }
        },
        computed: {
            ...Vuex.mapState(['myInfo']),
            wxTitle() {
                return parseInt(this.$route.params.optype) == 1 ? '添加客户' : '编辑客户'
            },
            minorPersonName() {
                return this.cNotCustomerManager.map(obj => obj.name).join()
            },
            computedParams() {
                let mainArr = [this.cCustomerManagerID].map(obj => {
                    return {
                        id: obj.id || '',
                        name: obj.name || '',
                        ismaster: 1
                    }
                })
                let minorArr = this.cNotCustomerManager.map(obj => {
                    return {
                        id: obj.id,
                        name: obj.name,
                        ismaster: 0
                    }
                })
                return mainArr[0].id ? mainArr.concat(minorArr) : []
            },
            /*wxText() {
                return this.cWebchat ? '已关联' : ''
            }*/
        },
        methods: {
            selectLevel(i) {
                if (this.followStatus == 5) return //编辑状态下转换成功不能改
                if (this.cIntentionLevel == 1 && i == 1) {
                    this.cIntentionLevel = 0
                } else {
                    this.cIntentionLevel = i
                }
            },
           /* relatedWx() {
                wx.invoke('selectExternalContact', {
                    "filterType": 0, //0表示展示全部外部联系人列表，1表示仅展示未曾选择过的外部联系人
                }, (res) => {
                    if (res.err_msg == "selectExternalContact:ok") {
                        // userIds  = res.userIds ; //返回此次选择的外部联系人userId列表，数组类型
                        console.log(res);
                        if (res.userIds.length > 1) {
                            app.toast('info', '只能关联一个外部联系人')
                            this.cWebchat = ''
                            return
                        }
                        this.cWebchat = res.userIds[0]
                    } else {
                        //错误处理
                    }
                });
            },*/
            selectResponsible(f) {
                if(f==0){
                    // console.log('选主。。。。责任人')
                    let arr = this.cNotCustomerManager;
                    app.responsibleOfficer(0,[this.cCustomerManagerID], function (data) {
                        let conflictFlag = false;
                        let conflictId = ''; //当前点击的老师id
                        // console.log(arr)
                        //判断冲突
                        conflictId = data.id;
                        if (conflictId != '') {
                            arr&&arr.forEach(ass => {
                                if (conflictId == ass.id) {
                                    app.toast('info', ass.name + '已被设置为副责任人。');
                                    conflictFlag = true;
                                    return
                                }
                            });
                            if (conflictFlag) {
                                return false
                            } else {
                                return true
                            }
                        } else {
                            return true
                        }
                        return true
                    },true).then(result => {
                        // console.log('promise回调--》',result)
                        this.cCustomerManagerID = result;
                        // console.log(this.cCustomerManagerID)
                    });
                }else{
                    // console.log('选。。副-----责任人')
                    let obj = this.cCustomerManagerID;//this不是这个this 所以直接把要判断的写在外面
                    app.responsibleOfficer(1,this.cNotCustomerManager, function (data) {
                        // 1.主责任人和副责任人最多只能成为其一
                        // 2.在编辑学员资料时，如果账号本身为副负责人，则无法对自己进行勾选或取消
                        let conflictFlag = false;//默认无冲突
                        let conflictId = '';//当前点击的老师id

                        // 要加第二点判断 先把后台返回的副责任人数组与账户本身做比较返回true||false，然后在此方法合适位置根据上一判断与conflictId进行对比
                        conflictId = data.id;
                        if(obj.id!=undefined){
                            if(obj.id==conflictId){
                                conflictFlag = true;
                            }else{
                                conflictFlag = false;
                            }
                        }else {
                            conflictFlag = false;
                        }

                        if (conflictFlag) {
                            app.toast('info', obj.name + '已被设置为主责任人。')
                            return false
                        } else {
                            return true
                        }

                    },true).then(result => {
                        // console.log('promise 副责任人多选 回调--》',result)
                        this.cNotCustomerManager = result;
                        // console.log(this.minorPerson)
                    });
                }
            },
            openCommAction(str) {
                if (!str) return
                if (str == 'statusList' && this.followStatus == 5) return //不能编辑正式学员的状态
                let title = ''

                this.showCommAction = true

                switch(str) {
                    case 'statusList': 
                        title = '客户状态'
                        break
                    case 'campusList':
                        title = '选择校区'
                        break
                    case 'gradeList':
                        title = '选择年级'
                        break
                    case 'schoolList':
                        title = '选择公立学校'
                        break
                }
                this.actionList = this[str]
                this.$refs.commAction.show({
                    title: title,
                    list: this.actionList
                }).then(res => {
                    res && this[str].forEach(obj => {
                        if (obj.id === res.id) {
                            obj.isSelect = true
                        } else {
                            obj.isSelect = false
                        }
                    })
                    switch(str) {
                        case 'statusList': 
                            this.cCustomStatus = res
                            break
                        case 'campusList':
                            this.cCampusID = res
                            break
                        case 'gradeList':
                            this.cGrade = res
                            break
                        case 'schoolList':
                            this.cShool = res
                            break
                    }
                })
                
            },
            selectBigItem(id) {
                this.sourceList.forEach(obj => {
                    if (obj.id === id) {
                        obj.isSelect = true
                    } else {
                        obj.isSelect = false
                    }
                })
            },
            selectSmallItem(id) {
                this.sourceList.forEach(obj => {
                    if (obj.isSelect) {
                        obj.list.forEach(item => {
                            if (item.id === id) {
                                item.isSelect = true
                                this.sourceObj = item
                            } else {
                                item.isSelect = false
                            }
                        })
                    }
                })
                this.showSelectSource = false
            },
            selectBirthDay() {
                app.datetimePicker({format:'YYYY-MM-DD', minYear: 1985}).then(res => {
                    // console.log(res)
                    this.cBrithday = res
                })
            },
            bindIsSelect(list, selectObj) {
                list.forEach(obj => {
                    // obj.name ? '' : obj.name = obj.name
                    if (this.optype === 2 && obj.id === selectObj.id) {
                        this.$set(obj, 'isSelect', true)    
                    } else {
                        this.$set(obj, 'isSelect', false)
                    }
                })
            },
            getData() {
                getcustomerinformationconfiglist({type: 'CustomerStatus'}).then(res => {
                    if (res.result.code === app.errok) {
                        this.statusList = res.data
                        this.bindIsSelect(this.statusList, this.cCustomStatus)
                    }
                })
                getcustomerinformationconfiglist({type: 'AdmissionsSource'}).then(res => {
                    if (res.result.code === app.errok) {
                        res.data.forEach(obj => {
                            this.$set(obj, 'isSelect', false)
                        })
                        this.sourceList = res.data.filter(obj => obj.parentid === '00000000-0000-0000-0000-000000000000')
                        let tempArr = res.data.filter(obj => obj.parentid !== '00000000-0000-0000-0000-000000000000')
                        this.sourceList.forEach(obj => {
                            obj.list = []
                            tempArr.forEach(item => {
                                if (item.parentid === obj.id) obj.list.push(item)
                            })
                        })
                        if (this.optype === 1 && this.sourceList.length) { //添加
                            this.sourceList[0].isSelect = true
                        } else { //修改
                            tempArr.forEach(obj => {
                                if (obj.id == this.sourceObj.id) {
                                    obj.isSelect = true
                                    this.sourceList.forEach(item => {
                                        if (obj.parentid === item.id) item.isSelect = true
                                    })
                                }
                            })
                        }
                    }
                })
                getcustomerinformationconfiglist({type: 'PublishSchool'}).then(res => {
                    if (res.result.code === app.errok) {
                        this.schoolList = res.data
                        this.bindIsSelect(this.schoolList, this.cShool)
                    }
                })
                getcustomerinformationconfiglist({type: 'Grade'}).then(res => {
                    if (res.result.code === app.errok) {
                        this.gradeList = res.data
                        this.bindIsSelect(this.gradeList, this.cGrade)
                    }
                })
                getCampuslist().then(res => {
                    if (res.result.code === app.errok) {
                        this.campusList = res.data
                        this.bindIsSelect(this.campusList, this.cCampusID)
                    }
                })
                if (this.optype == 1) {
                    /*getCurrentManager().then(res => {
                        if (res.result.code === app.errok) {
                            this.cCustomerManagerID = {
                                id: res.managerid,
                                name: res.managename
                            }
                        }
                    })*/
                    this.cCustomerManagerID = {
                        id: this.myInfo.id,
                        name: this.myInfo.name
                    }
                }
                getConfigFormList().then(res => {
                    if (res.result.code == app.errok) {
                        this.list = res.data
                        this.list.forEach(obj => {
                            this.map[obj.field] = obj
                        })
                        this.showLoading = true
                    }
                })
            },
            initPage() {
                let obj = app.ls.get('customerDetailMsg')
                this.nameText = obj.name
                this.mobileText = obj.mobile
                this.level = obj.intentionallevel
                this.sourceObj = {
                    id: obj.source.id,
                    value: obj.source.name
                }
                this.cCustomStatus = {
                    id: obj.status,
                    value: obj.statusname
                }
                this.cCampusID = {
                    id: obj.campus.id,
                    value: obj.campus.name
                }
                this.cGrade = {
                    id: obj.grade.id,
                    value: obj.grade.name
                }
                this.cShool = {
                    id: obj.publicschool.id,
                    value: obj.publicschool.name
                }
                this.cCustomerManagerID = obj.liablepersons.filter(obj => obj.ismaster === 1)[0]
                this.minorPerson = obj.liablepersons.filter(obj => obj.ismaster !== 1)
                this.computedParams = obj.liablepersons
                this.sex = obj.sex
                this.birthday = obj.birthday
                this.identificationText = obj.identification
                this.qqText = obj.qq
                this.classText = obj.classname
                this.fathernameText = obj.fathername
                this.fathermobileText = obj.fathermobile
                this.fatherjobText = obj.fatherjob
                this.mothernameText = obj.mothername
                this.mothermobileText = obj.mothermobile
                this.motherjobText = obj.motherjob
                this.familyAddressText = obj.familyaddress
                this.familyMobileText = obj.familymobile
                this.descText = obj.desc
                // this.cWebchat = obj.wxuserid
                this.followStatus = obj.followstatus
            },
            submit() {
                let regExpPhoneNum=/^1\d{10}$/,
                    regExpNum=/^-?\d+\.?\d*$/,
                    regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
                    today = new Date(),
                    year = today.getFullYear(),
                    mouth = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1),
                    day = today.getDate() > 9 ? today.getDate() : '0' + today.getDate(),
                    str = `${year}-${mouth}-${day}`

                if (!this.sourceObj.id) {
                    app.toast('info', '请选择招生来源')
                    return 
                }
                if (!this.cCampusID.id) {
                    app.toast('info', '请选择校区。')
                    return 
                }
                let len = this.list.length, i = 0
                for(i; i< len; i++) {
                    let str = this.list[i].field
                    if (this.list[i].isallowempty && !this[str]) {
                        app.toast('info', `${this.list[i].fieldname}是必填项，请填写`)
                        return
                    }
                    if (this.list[i].field === 'cCustomerManagerID' && this.list[i].isallowempty && !this.cCustomerManagerID.id) {
                        app.toast('info', '主责任人是必填项，请填写')
                        return
                    }
                    if (this.list[i].field === 'cCustomStatus' && this.list[i].isallowempty && !this.cCustomStatus.id) {
                        app.toast('info', '客户状态必填项，请填写')
                        return
                    }
                    if (this.list[i].field === 'cNotCustomerManager' && this.list[i].isallowempty && !this.cNotCustomerManager.length) {
                        app.toast('info', '副责任人是必填项，请填写')
                        return
                    }
                    if (this.list[i].field === 'cShool' && this.list[i].isallowempty && !this.cShool.id) {
                        app.toast('info', '公立学校是必填项，请填写')
                        return
                    }
                    if (this.list[i].field === 'cGrade' && this.list[i].isallowempty && !this.cGrade.id) {
                        app.toast('info', '年级是必填项，请填写')
                        return
                    }
                }
                if (!regExpPhoneNum.test(this.cPhone)) {
                    app.toast('info', '请输入正确的的手机号码')
                    return
                }
                if (this.cBrithday > str) {
                    app.toast('info', '出生日期不能大于今日')
                    return
                }
                if (this.cQQ && !regExpNum.test(this.cQQ)) {
                    app.toast('info', '请输入正确的QQ号码')
                    return
                }
                if (this.cIdCard && !regIdCard.test(this.cIdCard)) {
                    app.toast('info', '请输入正确的身份证号码')
                    return
                }
                let params = {
                    optype: parseInt(this.$route.params.optype),
                    id: '',
                    name: this.cName,
                    mobile: this.cPhone,
                    intentionallevel: this.cIntentionLevel,
                    
                    status: this.cCustomStatus.id,

                    source: {
                        id: this.sourceObj.id,
                        name: this.sourceObj.value
                    },
                    campus: {
                        id: this.cCampusID.id,
                        name: this.cCampusID.value
                    },
                    publicschool: {
                        id: this.cShool.id,
                        name: this.cShool.value
                    },
                    grade: this.cGrade,
                    liablepersons: this.computedParams,
                    // wxuserid: this.cWebchat,
                    wxusername:'',


                    sex: this.cSex,
                    birthday: this.cBrithday,
                    identification: this.cIdCard,
                    qq: this.cQQ,
                    classname: this.cClass,
                    fathername: this.cfathername,
                    fatherjob: this.cFatherwork,
                    fathermobile: this.cFatherPhone,

                    mothername: this.cmothername,
                    motherjob: this.cMotherwork,
                    mothermobile: this.cMotherPhone,
                    familyaddress: this.cHomeAddress,
                    familymobile: this.cHomeTel,
                    englishname: this.cEnglishName
                    // desc: this.descText
                }
                opCustomerInfo(params).then(res => {
                    if (res.result.code === app.errok) {
                        let text = this.optype == 1 ? '添加成功' : '修改成功'
                        app.toast('success', text)
                        setTimeout(() => {
                            // this.$router.go(-1)
                            history.go(-1)
                        }, 100)
                        // alert(location.href)
                        app.event.emit('refreshList')
                        if(this.$route.params.optype=='2'){
                            // 编辑学员资料 触发客户主页刷新
                            app.eventDefine.emit('commonDetailEditRefresh');
                        }
                    } else {
                        app.toast('info', res.result.msg)
                    }
                })
            }
        },
        created() {
            window.a = this
            this.getData()
            if (this.$route.params.optype === '2') {
                this.initPage()
            }
        },
        components: {
            // RelatedWx,
            CommAction,
            SelectSource
        }
    }

</script>