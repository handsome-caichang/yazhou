<style scoped lang="scss">
    
    
    .wrapper {
        @include position-absolute;
        background-color: $color-white;
        .heard{
            height: 84px;
            display: flex;
            border-bottom: 1px solid $color-assist-1;
            .heard-item {
                flex: 1;
                @include flex-center;
                .heard-item-wrapper {
                    .icon-wrapper {
                        font-size: 25px;
                        text-align: center;
                        line-height: 38px;
                    }
                    .text {
                        font-size: 16px;
                        color: #BBDBFC;
                    }
                    .active1 {
                        background-color: $color-primary;
                    }
                    .active2 {
                        color: $color-primary;
                    }
                }
            }
            .active {
                border-bottom: 3px solid $color-primary;
            }
        }
        .page1 {
            @include position-absolute(84px, 0, 49px, 0);
            .item {
                height: 44px;
                line-height: 44px;
                padding: 0 12px;
                border-bottom: 1px solid $color-assist-1;
                display: flex;
                .item-left {
                    width: 90px;
                    font-size: 15px;
                    color: $color-6;
                    .spec {
                        color: #f00;
                    }
                }
                .item-mid {
                    padding-left: 10px;
                    flex: 1;
                    text-align: right;
                    @include ellipsis-single;
                    .input {
                        text-align: right;
                        height: 100%;
                    }
                }
                .item-right {
                    width: 20px;
                    text-align: right;
                }
            }
            .void {
                height: 10px;
                background-color: $color-assist-1;
            }
            .beiju {
                padding: 0 12px;
                .beiju-heard {
                    height: 44px;
                    line-height: 44px;
                }
                .textarea {
                    height: 140px;
                    border: 1px solid #cccccc;
                    font-size: 12px;
                    line-height: 12px;
                    color: $color-9;
                    padding: 10px;
                }
            }
        }
        .bottom {
            @include position-absolute(false, 0, 0, 0);
            height: 49px;
            @include flex-between;
            justify-content: flex-end;
            padding: 0 12px;
            border-top: 1px solid $color-assist-1;
            .shangyibu, .next {
                width: 93px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                font-size: 15px;
                border: 1px solid $color-primary;
                border-radius: 50px;
            }
            .shangyibu {
                color: $color-primary;
                margin-right: 15px;
            }
            .next {
                color: $color-white;
                background-color: $color-primary;
            }
        }
    }
</style>

<template>
    <div class="wrapper">
        <div class="heard">
            <div class="heard-item" :class="{'active':num>=1}" @click="num=1">
                <div class="heard-item-wrapper">
                    <div class="icon-wrapper">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon--jihuo1"></use>
                        </svg>
                    </div>
                    <div class="text" :class="{'active2':num>=1}">基本信息</div>
                </div>
            </div>
            <div class="heard-item" :class="{'active':num>=2}"  @click="num=2">
                <div class="heard-item-wrapper">
                    <div class="icon-wrapper">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="num>=2?'#icon--jihuo':'#icon-icon-test1'"></use>
                        </svg>
                    </div>
                    <div class="text" :class="{'active2':num>=2}">联系方式</div>
                </div>
            </div>
            <div class="heard-item" :class="{'active':num>=3}"  @click="num=3">
                <div class="heard-item-wrapper">
                    <div class="icon-wrapper">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="num>=3?'#icon--jihuo2':'#icon-icon-test'"></use>
                        </svg>
                    </div>
                    <div class="text" :class="{'active2':num>=3}">招生信息</div>
                </div>
            </div>
        </div>
        <scroller-base class="page1" :data="num" v-if="num===1">
            <div class="item">
                <div class="item-left">姓名<span class="spec">*</span></div>
                <div class="item-mid">
                    <input type="text" class="input" v-model="nameText" @blur="check('name')" ref="nameInput">
                </div>
                <!-- <div class="item-right"></div> -->
            </div>
            <div class="item" v-if="editTel">
                <div class="item-left">手机号码<span class="spec">*</span></div>
                <div class="item-mid">
                    <input type="text" class="input" v-model="phoneText" @blur="check('phone')" ref="phoneInput">
                </div>
                <div class="item-right"></div>
            </div>
            <div class="item" v-if="!editTel">
                <div class="item-left">手机号码<span class="spec">*</span></div>
                <div class="item-mid">
                    {{phoneText}}
                </div>
            </div>
            <div class="item" v-if="editSoucrse">
                <div class="item-left">招生来源<span class="spec">*</span></div>
                <div class="item-mid" @click="showSelectSource=true">
                    {{sourceString}}
                </div>
                <div class="item-right" @click="showSelectSource=true">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item" v-if="!editSoucrse">
                <div class="item-left">招生来源<span class="spec">*</span></div>
                <div class="item-mid">
                    {{sourceString}}
                </div>
            </div>
            <div class="item">
                <div class="item-left">所属校区<span class="spec">*</span></div>
                <div class="item-mid" @click="showSelectCampus=true">
                    {{campusObj.Value&&campusObj.Value.Name}}
                </div>
                <div class="item-right" @click="showSelectCampus=true">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="void"></div>
            <div class="item">
                <div class="item-left">性别</div>
                <div class="item-mid" @click="showSelectSex=true">
                    {{sexObj.text}}
                </div>
                <div class="item-right" @click="showSelectSex=true">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item" @click="selectBirthDay">
                <div class="item-left" >出生日期</div>
                <div class="item-mid">{{birthDay}}</div>
                <!-- <div class="item-right"></div> -->
            </div>
            <div class="item">
                <div class="item-left">身份证号码</div>
                <div class="item-mid">
                    <input type="text" class="input" v-model="cardText">
                </div>
                <div class="item-right"></div>
            </div>           
            <div class="void"></div>
            <div class="item">
                <div class="item-left">QQ号码</div>
                <div class="item-mid">
                    <input type="text" class="input" v-model="qqText">
                </div>
                <div class="item-right"></div>
            </div>    
            <div class="item">
                <div class="item-left">公立学校</div>
                <div class="item-mid" @click="showSelectSchool=true">
                    {{schoolObj.Value}}
                </div>
                <div class="item-right" @click="showSelectSchool=true">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>    
            <div class="item">
                <div class="item-left">年级</div>
                <div class="item-mid" @click="showSelectGrade=true">
                    {{gradeObj.name}}
                </div>
                <div class="item-right" @click="showSelectGrade=true">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>    
            <div class="item">
                <div class="item-left">班级</div>
                <div class="item-mid">
                    <input type="text" class="input" v-model="classText">
                </div>
                <div class="item-right"></div>
            </div>    
        </scroller-base>
        <scroller-base class="page1" :data="num" v-if="num===2">
            <div class="item">
                <div class="item-left">父亲姓名</div>
                <div class="item-mid">
                    <input type="text" class="input" v-model="dadNameText">
                </div>
                <div class="item-right"></div>
            </div>
            <div class="item">
                <div class="item-left">父亲电话</div>
                <div class="item-mid">
                    <input type="text" class="input" v-model="dadPhoneText">
                </div>
                <div class="item-right"></div>
            </div>
            <div class="item">
                <div class="item-left">父亲职业</div>
                <div class="item-mid" @click="openSelectVocation('dad')">
                    {{dadVocation}}
                </div>
                <div class="item-right" @click="openSelectVocation('dad')">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="void"></div>
            <div class="item">
                <div class="item-left">母亲姓名</div>
                <div class="item-mid">
                    <input type="text" class="input" v-model="mumNameText">
                </div>
                <div class="item-right"></div>
            </div>
            <div class="item">
                <div class="item-left">母亲电话</div>
                <div class="item-mid">
                    <input type="text" class="input" v-model="mumPhoneText">
                </div>
                <div class="item-right"></div>
            </div>
            <div class="item">
                <div class="item-left">母亲职业</div>
                <div class="item-mid" @click="openSelectVocation('mum')">
                    {{mumVocation}}
                </div>
                <div class="item-right" @click="openSelectVocation('mum')">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="void"></div>
            <div class="item">
                <div class="item-left">家庭电话</div>
                <div class="item-mid">
                    <input type="text" class="input" v-model="homePhoneText">
                </div>
                <div class="item-right"></div>
            </div>
            <div class="item">
                <div class="item-left">家庭住址</div>
                <div class="item-mid">
                    <input type="text" class="input" v-model="homeAddText">
                </div>
                <div class="item-right"></div>
            </div>
        </scroller-base>
        <scroller-base class="page1" :data="num" v-if="num===3">
            <div class="item">
                <div class="item-left">客户状态</div>
                <div class="item-mid" @click="showSelectStatus=true">
                    {{customState.Value}}
                </div>
                <div class="item-right" @click="showSelectStatus=true">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item">
                <div class="item-left">意向级别</div>
                <div class="item-mid" @click="showSelectWillLevel=true">
                    <svg class="icon" aria-hidden="true" v-for="i in level">
                        <use xlink:href="#icon-yixiangdengji"></use>
                    </svg>
                </div>
                <div class="item-right" @click="showSelectWillLevel=true">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item">
                <div class="item-left">意向课程</div>
                <!-- <div class="item-mid" @click="showSelectCourse=true"></div>
                <div class="item-right" @click="showSelectCourse=true">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div> -->
                <router-link tag="div" :to="{name:'selectCourse'}" class="item-mid" >
                    {{shiftName}}
                </router-link>
                <router-link tag="div" :to="{name:'selectCourse'}" class="item-right">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </router-link>
            </div>
            <div class="void"></div>
            <div class="item">
                <div class="item-left">试听预约时间</div>
                <div class="item-mid" @click="showSelectTime=true">{{tryTime.name}}</div>
                <div class="item-right" @click="showSelectTime=true">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item" v-if="editSalePerson">
                <div class="item-left">主责任人</div>
                <div class="item-mid" @click="selectMainPerson">
                    {{mainPerson.name}}
                </div>
                <div class="item-right" @click="selectMainPerson">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item" v-if="!editSalePerson">
                <div class="item-left">主责任人</div>
                <div class="item-mid">
                    {{mainPerson.name}}
                </div>
            </div>
            <div class="item">
                <div class="item-left">副责任人</div>
                <div class="item-mid" @click="selectScoendPerson">
                    {{secondaryPersonName}}
                </div>
                <div class="item-right" @click="selectScoendPerson">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item">
                <div class="item-left">介绍人</div>
                <div class="item-mid" @click="showSelectIntroducePerson=true">{{introducePerson.name}}</div>
                <div class="item-right" @click="showSelectIntroducePerson=true">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="void"></div>
            <div class="beiju">
                <div class="beiju-heard">备注</div>
                <textarea placeholder="请输入沟通内容(限200字)" class="textarea" v-model="remarkText"></textarea>
            </div>
            <div class="void"></div>
        </scroller-base>
        <div class="bottom">
            <div class="shangyibu" v-if="num>1" @click="changePages(-1)">上一步</div>
            <div class="next" @click="changePages(1)" v-if="num!==3">下一步</div>
            <div class="next" v-if="num==3" @click="submit">提交</div>
        </div>

        <!-- 选择招生来源 -->
            <!-- v-show="showSelectSource" -->
        <select-customer-source
            :opened.sync="showSelectSource"
            :sourceArr="selectSourceArr"
            @selectSource="selectSource">
        </select-customer-source>

        <!-- 选择校区 -->
        <select-campus
            :opened.sync="showSelectCampus"
            :campusObj="campusObj"
            @selectCampusObj="selectCampusObj">
        </select-campus>

        <!-- 性别选择 -->
        <select-sex
            :opened.sync="showSelectSex"
            :sexObj="sexObj"
            @selectSexObj="selectSexObj">
        </select-sex>

        <!-- 公立学校选择 -->
        <select-council-school
            :opened.sync="showSelectSchool"
            :schoolObj="schoolObj"
            @selectSchoolObj="selectSchoolObj">
        </select-council-school>

        <!-- 年纪选择 -->
        <select-grade
            :opened.sync="showSelectGrade"
            :gradeObj="gradeObj"
            @selectGradeObj="selectGradeObj">
        </select-grade>

        <!-- 选择职业 -->
        <select-vocation
            :opened.sync="showSelectVocation"
            :whosVocation="whosVocation"
            @selectVocation="selectVocation">
        </select-vocation>

        <!-- 选择客户状态 -->
        <select-custom-status 
            :opened.sync="showSelectStatus"
            :customState="customState"
            @selectCustomStatus="selectCustomStatus">
        </select-custom-status>

        <!-- 选择试听时间 -->
        <select-listen-time
            :opened.sync="showSelectTime"
            :tryTime="tryTime"
            @selectTime="selectTime">
        </select-listen-time>

        <!-- 选择介绍人 -->
        <select-introduce-person 
            :opened.sync="showSelectIntroducePerson"
            @selectIntroducePerson="selectIntroducePerson">
            
        </select-introduce-person>

        <!-- 选择意愿级别 -->
        <select-will-level
            :opened.sync="showSelectWillLevel"
            :level="level"
            @selectLevel="selectLevel">
        </select-will-level>

        <!-- 电话、姓名相同的提示框 -->
        <find-same
            :opened.sync="showFindSame"
            :list="sameList"
            @selectSamePeople="selectSamePeople">
            
        </find-same>
    </div>
</template>

<script>
    import SelectCustomerSource from './selectCustomerSource'
    import SelectCampus from './selectCampus'
    import SelectSex from './selectSex'
    import SelectCouncilSchool from './selectCouncilSchool'
    import SelectGrade from './selectGrade'
    import SelectVocation from './selectVocation'
    import SelectCustomStatus from '../selectCustomStatus'
    import SelectListenTime from './selectListenTime'
    import SelectIntroducePerson from './selectIntroducePerson'
    import SelectWillLevel from '../selectWillLevel'
    import FindSame from './findSame'
    import {getCustomers, saveData} from 'teacher/api/customers'

    export default {
        data() {
            return {
                wxTitle: "添加意向客户",
                num: 1,

                showSelectSource: false,
                selectSourceArr: [],

                showSelectCampus: false,
                campusObj: {},

                showSelectSex: false,
                sexObj: {},

                birthDay: '',

                showSelectSchool: false,
                schoolObj: {},

                showSelectGrade: false,
                gradeObj: {},

                showSelectVocation: false,
                dadVocation: '',
                mumVocation: '',
                whosVocation: '',

                showSelectStatus: false,
                customState: {},

                // showSelectCourse: false

                showSelectTime: false,
                tryTime: {
                    name: '',
                    value: ''
                },

                showSelectIntroducePerson: false,
                introducePerson: {},

                showSelectWillLevel: false,
                level: 0,

                mainPerson: {
                    name: app.sysInfo.UserName.replace(/@wone.devp/g, ''),
                    id: app.sysInfo.ID
                },
                secondaryPerson: [],

                showFindSame: false,
                isCheck: true,
                checkStr: '',
                sameList: [],


                nameText: '',
                phoneText: '',
                cardText: '',
                qqText: '',
                classText: '',
                dadNameText: '',
                dadPhoneText: '',
                mumNameText: '',
                mumPhoneText: '',
                homePhoneText: '',
                homeAddText: '',
                remarkText: '',

                shiftClassList: [],

                isEdit: this.$route.params.type === 'edit',
                weekList: [{name: '一',value: 1},{name: '二',value: 2},{name: '三',value: 3},{name: '四',value: 4},{name: '五',value: 5},{name: '六',value: 6},{name: '日',value: 7}],
                timeList: [{name: '上午',value: 8},{name: '下午',value: 9},{name: '晚上',value: 10}]
            }
        },
        computed: {

            sourceString() {
                let str = ''
                if (this.selectSourceArr.length) {
                    this.selectSourceArr.forEach(obj => {
                        str = obj.Name + ',' + str
                    })
                } else {
                    str = ''
                }
                return str
            },
            secondaryPersonName() {
                let str = ''
                if (this.secondaryPerson.length) {
                    this.secondaryPerson.forEach(obj => {
                        str = obj.name + ',' + str
                    })
                } else {
                    str = ''
                }
                return str
            },
            shiftName() {
                let str = ''
                if (this.shiftClassList.length) {
                    this.shiftClassList.forEach(obj => {
                        str = obj.ShiftName + ',' + str
                    })
                } else {
                    str = ''
                }
                return str
            },
            editTel() {  //是否具有查看电话号码权限
                if (this.isEdit) {
                    return app.tool.op('CustomerTelEdit') && app.tool.op('CustomerViewTel')
                } else {
                    return true
                }
            },
            editSoucrse() {
                if (this.isEdit) {
                    return app.tool.op('CustomerSaleModeEdit')
                } else {
                    return true
                }
            },
            editSalePerson() {
                if (this.isEdit) {
                    return app.tool.op('CustomerEditSalePersons')
                } else {
                    return false
                }
            }
        },
        methods: {
            changePages(number) {
                this.num = this.num + number
                if (this.num > 3) this.num = 3
                if (this.num < 1) this.num = 1
            },
            //选择来源回掉
            selectSource(arr) {
                this.selectSourceArr = arr
                this.showSelectSource = false
            },
            //选择校区回掉
            selectCampusObj(obj) {
                this.campusObj = obj
                this.showSelectCampus = false
            },

            selectSexObj(obj) {
                this.sexObj = obj
                this.showSelectSex = false
            },

            selectBirthDay(){
                app.calendar().then(res => {
                    this.birthDay = res
                })
            },
            //公里学校选择回掉
            selectSchoolObj(obj) {
                this.schoolObj = obj
                this.showSelectSchool = false
            },
            //选择年纪回掉
            selectGradeObj(obj) {
                this.gradeObj = obj
                this.showSelectGrade = false
            },
            openSelectVocation(str) {
                this.whosVocation = str
                this.showSelectVocation = true
            },
            //选择职业
            selectVocation(obj) {
                if (obj.whosVocation == 'dad') this.dadVocation = obj.vocation
                if (obj.whosVocation == 'mum') this.mumVocation = obj.vocation
                this.showSelectVocation = false
            },
            //选择状态
            selectCustomStatus(obj) {
                this.customState = obj
                this.showSelectStatus = false
            },
            //选择试听时间
            selectTime(obj) {
                console.log(obj)
                this.showSelectTime = false
                this.tryTime.name = ''
                this.tryTime.value = ''
                obj.week.forEach(obj => {
                    if (obj.isSelect) {
                        this.tryTime.name = this.tryTime.name + '星期' + obj.name + ','
                        this.tryTime.value = this.tryTime.value + obj.value + ','
                    }
                })
                obj.time.forEach(obj => {
                    if (obj.isSelect) {
                        this.tryTime.name = this.tryTime.name + obj.name + ','
                        this.tryTime.value = this.tryTime.value + obj.value + ','
                    }
                })
                if (this.tryTime.name.length) this.tryTime.name = this.tryTime.name.substr(0, this.tryTime.name.length - 1)
                if (this.tryTime.value.length) this.tryTime.value = this.tryTime.value.substr(0, this.tryTime.value.length - 1)
            },
            //选择介绍人
            selectIntroducePerson(obj) {
                this.showSelectIntroducePerson = false
                this.introducePerson = obj
            },
            //选择意愿级别
            selectLevel(i) {
                this.level = i
                this.showSelectWillLevel = false
            },
            //选择主责任人
            selectMainPerson() {
                app.empSelect(0).then(res => {
                    this.mainPerson = {
                        name: res.name,
                        id: res.id
                    }
                })
                // this.$router.push('/demo')
            },
            //选择负责任人
            selectScoendPerson() {
                let arr = this.secondaryPerson.length ? this.secondaryPerson.map(item => {
                    return item.id
                }) : []
                app.empSelect(1, arr).then(res => {
                    this.secondaryPerson = res.map(item =>{
                        let obj = {
                            name: item.name,
                            id: item.id
                        }
                        return obj
                    })
                })
            },
            //检查是否同名
            check(str) {
                let detail = app.ls.get('detail'), name, tel, id
                if (detail) {
                    name = detail.Name,
                    tel = detail.SMSTel,
                    id = detail.ID
                }
                if (!this.isCheck) return
                if (str === 'name' && !this.nameText.length) return
                if (str === 'phone' && !this.phoneText.length) return
                if (this.isEdit) {
                    if (this.nameText === name && this.phoneText === tel) return
                }
                if (str == 'phone') {
                    this.isCheck = true
                }
                this.checkStr = str
                getCustomers({
                    name: this.nameText,
                    tel: this.phoneText,
                    id: this.isEdit ? id : '',
                    pname: 'isexist'
                }).then(res => {
                    if (res.errcode === app.errok) {
                        this.sameList = res.data
                        if (this.sameList.length) {
                            this.showFindSame = true    
                        } else {
                            this.isCheck = false
                        }
                    }
                })
            },
            selectSamePeople(isSamePeople) {
                if (isSamePeople) {
                    // this.checkStr == 'name' ? this.nameText = '' : this.phoneText = ''
                    if (this.checkStr == 'name') {
                        this.nameText = ''
                        this.$refs.nameInput.focus()
                    } else {
                        this.phoneText = ''
                        this.$refs.phoneInput.focus()
                    }
                } else {
                    this.isCheck = false
                }
                this.showFindSame = false
            },
            submit() {
                if (!this.nameText.length) {
                    app.toast('info', '请输入姓名。')
                    return 
                }
                if (!this.phoneText.length) {
                    app.toast('info', '请输入电话号码。')
                    return 
                }
                if (!this.selectSourceArr.length) {
                    app.toast('info', '请选择招生来源。')
                    return 
                }
                if (!this.campusObj.Key) {
                    app.toast('info', '请选择校区。')
                    return 
                }
                let params = {
                    "CampusName": this.campusObj.Value.Name,
                    "CampusID": this.campusObj.Key,
                    "Name": this.nameText,
                    "IDNumber": '',
                    "Sex": this.sexObj.sex || 0,
                    "Birthday": this.birthDay,
                    "LivePlace": this.homeAddText,
                    "QQ": this.qqText,
                    "SMSTel": this.phoneText,
                    "Father": this.dadNameText,
                    "FatherTel": this.dadPhoneText,
                    "FatherVocation": this.dadVocation,
                    "Mother": this.mumNameText,
                    "MotherTel": this.mumPhoneText,
                    "MotherVocation": this.mumVocation,
                    "OtherTel": this.homePhoneText,
                    "FullTimeSchool": this.schoolObj.Value,
                    "ClassName": this.classText,
                    "Grade": this.gradeObj.value || 0,
                    "GradeName": this.gradeObj.name || '',
                    "SaleModeList": this.selectSourceArr,
                    "SalePersonID": this.mainPerson.id,
                    "SalePersonName": this.mainPerson.name,
                    "CustomerStatus": this.customState.ID ? this.customState.ID : -1,
                    "Describe": this.remarkText,
                    "ID": "",
                    "WillLevel": this.level,
                    "ShiftClassList": this.shiftClassList,
                    "SalePersonList": [],
                    "TryDate": this.tryTime.value,
                    "Introducer": this.introducePerson.id || '',
                    "IntroducerName": this.introducePerson.name || ''
                },
                saveFlag = this.isEdit ? 'putcustomer' : 'postcustomer'
                if (this.isEdit) {
                    let detail = app.ls.get('detail')
                    params['infoEditRight'] = true
                    params['ID'] = detail.ID           
                }
                saveData({data: JSON.stringify(params),saveFlag: saveFlag}).then(res => {
                    if (res.errcode == app.errok) {
                        if (!this.isEdit) {
                            app.event.emit('addCustomer')
                            this.num = 1
                            // this.$router.push({name:'customers'})
                            this.$router.go(-1)
                        } else {
                            app.event.emit('editCustomer')
                            this.$router.go(-1)
                        }
                    }
                })
            },
            initData(detail) {//点击客户详情进入修改详情页面
                app.customConfigInfo.CampusList.forEach(obj => {
                    if (obj.Key == detail.CampusID) this.campusObj = app.tool.clone(obj)
                })
                this.nameText = detail.Name
                this.IDNumber = detail.IDNumber
                this.sexObj.sex = detail.Sex
                this.birthDay = detail.Birthday
                this.homeAddText = detail.LivePlace
                this.qqText = detail.QQ
                this.phoneText = detail.SMSTel
                this.dadNameText = detail.Father
                this.dadPhoneText = detail.FatherTel
                this.dadVocation = detail.FatherVocation
                this.mumNameText = detail.Mother
                this.mumPhoneText = detail.MotherTel
                this.mumVocation = detail.MotherVocation
                this.homePhoneText = detail.OtherTel
                this.schoolObj.Value = detail.FullTimeSchool
                this.classText = detail.ClassName
                this.gradeObj.value = detail.Grade
                this.gradeObj.name = detail.GradeName
                this.selectSourceArr = detail.SaleModeList
                this.mainPerson.id = detail.SalePersonID
                this.mainPerson.name = detail.SalePersonName
                this.customState.ID = detail.CustomerStatus
                this.customState.Value = detail.CustomerStatusName
                this.remarkText = detail.Describe
                this.ID = detail.ID
                this.level = detail.WillLevel
                this.shiftClassList = detail.ShiftClassList
                this.SalePersonList = detail.SalePersonList
                this.tryTime.value = detail.TryDate

                this.introducePerson.id = detail.Introducer
                this.introducePerson.name = detail.IntroducerName
                let st1 = this.weekList.filter(obj => {
                    return (this.tryTime.value.indexOf(obj.value) > -1) 
                }).map(obj => {
                    return '星期' + obj.name
                }).join(),
                st2 = this.timeList.filter(obj => {
                    return (this.tryTime.value.indexOf(obj.value) > -1) 
                }).map(obj => {
                    return obj.name
                }).join()
                this.tryTime.name = st1 + st2

            }
        },
        watch: {
            phoneText(val) {
                if (val) this.isCheck = true
            },
            nameText(val) {
                if (val) this.isCheck = true
            },

            
        },
        created() {
            let detail = app.ls.get('detail')
            if (detail) {
                this.isEdit = true
                this.initData(detail)
            } else {
                this.campusObj = app.customConfigInfo.CampusList[0]
            }
            app.event.on('selectData',  (type, arr) => {
                this.shiftClassList = arr.map(obj => {
                    return {
                        "ShiftID": obj.willCourse.id || '',
                        "ClassID": obj.willClass.id || '',
                        "ShiftName": obj.willCourse.name || '',
                        "ClassName": obj.willClass.name || '',
                        "ShiftCampusID": obj.campusObj.Key,
                        "ShiftCampusName": obj.campusObj.Value.Name
                    }
                }).filter(obj => {
                    return obj.ShiftID != ''
                })
                console.log(this.shiftClassList)
            })
            
        },  
        mounted() {
        },
        destroyed() {
            app.ls.clear('detail')
            app.event.off('selectData')
        },
        components: {
            SelectCustomerSource,
            SelectCampus,
            SelectSex,
            SelectCouncilSchool,
            SelectGrade,
            SelectVocation,
            SelectCustomStatus,
            SelectListenTime,
            SelectIntroducePerson,
            SelectWillLevel,
            FindSame
        }
    }
</script>