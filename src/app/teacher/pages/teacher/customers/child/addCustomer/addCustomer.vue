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
            .spec {
                color: #f00;
            }
            .item {
                height: 44px;
                @include flex-between;
                padding: 0 12px;
                border-bottom: 1px solid $color-assist-1;
                // display: flex;
                .item-left {
                    width: 105px;
                    font-size: 15px;
                    color: $color-6;
                }
                
                .spec-input {
                    height: 24px;
                    border-right: 1px solid $color-9;
                    border-radius: 0;
                    text-align: right;
                    color: $color-6;
                }
                .item-mid {
                    padding-left: 10px;
                    flex: 1;
                    text-align: right;
                    @include ellipsis-single;
                    height: 44px;
                    line-height: 44px;
                    .input {
                        text-align: right;
                        height: 100%;
                        color: $color-6;
                    }
                }
                .item-right {
                    width: 20px;
                    text-align: right;
                }
                .item-spec-right {
                    width: 70px;
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
                .add {
                    height: 65px;
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
            <div class="heard-item"
                v-for="(item, index) in heardArr"
                :class="{'active':num>=index+1}" 
                @click="num=index+1">
                <div class="heard-item-wrapper">
                    <div class="icon-wrapper">
                        <svg class="icon" aria-hidden="true">
                            <!-- <use xlink:href="#icon--jihuo1"></use> -->
                            <use :xlink:href="num>=index+1?item.activeIcon:item.icon"></use>
                        </svg>
                    </div>
                    <div class="text" :class="{'active2':num>=index+1}">{{item.text}}</div>
                </div>
            </div>
        </div>
        <scroller-base class="page1" :data="num" v-if="num==1&&formArr.length">
            <div class="item">
                <div class="item-left">姓名<span class="spec">*</span></div>
                <div class="item-mid">
                    <input type="text" class="input" v-model="nameText" ref="nameInput" @blur="checkSameName('name')">
                </div>
            </div>
            <div class="item">
                <div class="item-left">手机号码<span class="spec">*</span></div>
                <div class="item-mid">
                    <input  type="number"
                            onkeyup="value=value.replace(/[^\d\.]/g,'')" 
                            onblur="value=value.replace(/[^\d\.]/g,'')" 
                            class="input" 
                            v-model="phoneText" 
                            ref="phoneInput" 
                            @blur="checkSameName('phone')"
                            v-if="editTel">
                    <div v-if="!editTel">{{phoneText}}</div>
                </div>
                <!-- <div class="item-right"></div> -->
            </div>
            <div class="item" @click="openFistPage('showSelectCampus')">
                <div class="item-left">所属{{app.sysInfo.Title_Campus}}<span class="spec">*</span></div>
                <div class="item-mid">
                    {{campusObj&&campusObj.Value&&campusObj.Value.Name}}
                </div>
                <div class="item-right">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item"  @click="openFistPage('showSelectSource', 'selectSourceArr')">
                <div class="item-left">招生来源<span class="spec">*</span></div>
                <div class="item-mid">
                    {{sourceString}}
                </div>
                <div class="item-right" v-if="!(isEdit&&app.sysInfo.EnableCustomerAutomaticDistribution=='1')">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <!-- EnableCustomerAutomaticDistribution -->
            <div class="item" @click="openFistPage('showSelectMarketLetter', 'marketInfoOne')"
                 v-if="app.sysInfo.EnableCustomerAutomaticDistribution=='1'">
                <div class="item-left">市场信息来源<span class="spec">*</span></div>
                <div class="item-mid">
                    {{marketInfoOne.Value}}
                </div>
                <div class="item-right">
                    <svg class="icon" aria-hidden="true" v-if="!isEdit">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item" @click="selectMarketInfoOneUser" v-if="app.sysInfo.EnableCustomerAutomaticDistribution=='1'">
                <div class="item-left">市场人员<!-- <span class="spec">*</span> --></div>
                <div class="item-mid">
                    {{marketInfoOnePerson.name}}
                </div>
                <div class="item-right">
                    <svg class="icon" aria-hidden="true" v-if="!computedMarketInfoCanEdit">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item" 
                 @click="openFistPage('showSelectSource', 'marketInfoTwoArr')"
                 v-if="app.sysInfo.EnableCustomerAutomaticDistribution=='1'">
                <div class="item-left">第二渠道招生来源<!-- <span class="spec">*</span> --></div>
                <div class="item-mid">
                    {{marketInfoTwoArr.length?marketInfoTwoArr[0].Name:''}}
                </div>
                <div class="item-right">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item" 
                 @click="openFistPage('showSelectMarketLetter', 'marketInfoTwo')"
                 v-if="app.sysInfo.EnableCustomerAutomaticDistribution=='1'">
                <div class="item-left">第二渠道市场信息来源<!-- <span class="spec">*</span> --></div>
                <div class="item-mid">
                    {{marketInfoTwo.Value}}
                </div>
                <div class="item-right">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item" @click="selectMarketInfoTwoUser" v-if="app.sysInfo.EnableCustomerAutomaticDistribution=='1'">
                <div class="item-left">第二渠道市场人员<!-- <span class="spec">*</span> --></div>
                <div class="item-mid">
                    {{marketInfoTwoUserPerson.name}}
                </div>
                <div class="item-right">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="void"></div>
            <div class="item" v-if="map['Sex'].Status" @click="openFistPage('showSelectSex')">
                <div class="item-left">性别<span class="spec" v-if="map['Sex'].Required">*</span></div>
                <div class="item-mid">
                    {{sexObj.text}}
                </div>
                <div class="item-right">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item" @click="selectBirthDay" v-if="map['Birthday'].Status">
                <div class="item-left" >出生日期<span class="spec" v-if="map['Birthday'].Required">*</span></div>
                <div class="item-mid">{{birthDay}}</div>
                <!-- <div class="item-right"></div> -->
            </div>
            <div class="item" v-if="map['IDNumber'].Status">
                <div class="item-left">身份证号码<span class="spec" v-if="map['IDNumber'].Required">*</span></div>
                <div class="item-mid">
                    <input type="text" class="input" v-model="idNumberText">
                </div>
                <!-- <div class="item-right"></div> -->
            </div>           
            <div class="void" v-if="computVoid1"></div>
            <div class="item" v-if="map['QQ'].Status">
                <div class="item-left">QQ号码<span class="spec" v-if="map['QQ'].Required">*</span></div>
                <div class="item-mid">
                    <input type="text" class="input" v-model="qqText">
                </div>
                <!-- <div class="item-right"></div> -->
            </div>    
            <!-- v-if="app.sysInfo.AllowInputSchool" -->
            <div class="item" v-if="map['FullTimeSchool'].Status">
                <div class="item-left">公立学校<span class="spec" v-if="map['FullTimeSchool'].Required">*</span></div>
                <input type="text" class="spec-input" v-model="schoolObj.Value" v-if="app.sysInfo.AllowInputSchool=='1'">
                <div class="item-mid" @click="openFistPage('showSelectSchool')" v-if="app.sysInfo.AllowInputSchool=='0'">
                    {{schoolObj.Value}}
                </div>
                <div class="item-spec-right" @click="openFistPage('showSelectSchool')" v-if="app.sysInfo.AllowInputSchool=='1'">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
                <div class="item-right" @click="openFistPage('showSelectSchool')" v-if="app.sysInfo.AllowInputSchool=='0'">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>    
            <div class="item" v-if="map['Grade'].Status" @click="openFistPage('showSelectGrade')">
                <div class="item-left">年级<span class="spec" v-if="map['Grade'].Required">*</span></div>
                <div class="item-mid">
                    {{gradeObj.name}}
                </div>
                <div class="item-right">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>    
            <div class="item" v-if="map['ClassName'].Status">
                <div class="item-left">班级<span class="spec" v-if="map['ClassName'].Required">*</span></div>
                <div class="item-mid">
                    <input type="text" class="input" v-model="classText">
                </div>
                <!-- <div class="item-right"></div> -->
            </div>
            <div class="item" v-if="map['EnglishName'].Status">
                <div class="item-left">英文姓名<span class="spec" v-if="map['EnglishName'].Required">*</span></div>
                <div class="item-mid">
                    <input type="text" class="input" v-model="englishNameText">
                </div>
                <!-- <div class="item-right"></div> -->
            </div>
            <div class="void" v-if="computVoid2"></div>
            <div class="item" v-for="item in fieldFormArr">
                <div class="item-left">{{item.Name}}<span class="spec" v-if="item.Required">*</span></div>
                <div class="item-mid" v-if="item.FieldType!==3&&editCustomerFields">
                    <input type="text" class="input" v-model="item.modelText">
                </div>
                <div class="item-mid" v-if="item.FieldType==3&&editCustomerFields" @click="fieldSelectDate(item)">
                    {{item.modelText}}
                </div>
                <div class="item-mid" v-if="!editCustomerFields">{{item.modelText}}</div>
                <!-- <div class="item-right" v-if="item.FieldType!==3"></div> -->
            </div>
            <div class="void" v-if="fieldFormArr.length"></div>
        </scroller-base>
        <scroller-base class="page1" :data="num" v-if="num==2&&heardArr.length>2">
            <div class="item" v-if="map['Father'].Status">
                <div class="item-left">父亲姓名<span class="spec" v-if="map['Father'].Required">*</span></div>
                <div class="item-mid">
                    <input type="text" class="input" v-model="dadNameText">
                </div>
                <!-- <div class="item-right"></div> -->
            </div>
            <div class="item" v-if="map['FatherTel'].Status">
                <div class="item-left">父亲电话<span class="spec" v-if="map['FatherTel'].Required">*</span></div>
                <div class="item-mid">
                    <input type="number" class="input" v-model="dadPhoneText">
                </div>
                <!-- <div class="item-right"></div> -->
            </div>
            <div class="item" v-if="map['FatherVocation'].Status">
                <div class="item-left">父亲职业<span class="spec" v-if="map['FatherVocation'].Required">*</span></div>
                <input type="text" class="spec-input" v-model="dadVocation">
                <div class="item-spec-right" @click="openSelectVocation('dad')">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="void" v-if="computVoid3"></div>
            <div class="item" v-if="map['Mother'].Status">
                <div class="item-left">母亲姓名<span class="spec" v-if="map['Mother'].Required">*</span></div>
                <div class="item-mid">
                    <input type="text" class="input" v-model="mumNameText">
                </div>
                <!-- <div class="item-right"></div> -->
            </div>
            <div class="item" v-if="map['MotherTel'].Status">
                <div class="item-left">母亲电话<span class="spec" v-if="map['MotherTel'].Required">*</span></div>
                <div class="item-mid">
                    <input type="number" class="input" v-model="mumPhoneText">
                </div>
                <!-- <div class="item-right"></div> -->
            </div>
            <div class="item" v-if="map['MotherVocation'].Status">
                <div class="item-left">母亲职业<span class="spec" v-if="map['MotherVocation'].Required">*</span></div>
                <input type="text" class="spec-input" v-model="mumVocation">
                <div class="item-spec-right" @click="openSelectVocation('mum')">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="void" v-if="computVoid4"></div>
            <div class="item" v-if="map['OtherTel'].Status">
                <div class="item-left">家庭电话<span class="spec" v-if="map['OtherTel'].Required">*</span></div>
                <div class="item-mid">
                    <input type="number" class="input" v-model="homePhoneText">
                </div>
                <!-- <div class="item-right"></div> -->
            </div>
            <div class="beiju" v-if="map['LivePlace'].Status">
                <div class="beiju-heard">家庭住址<span class="spec" v-if="map['LivePlace'].Required">*</span></div>
                <textarea 
                    placeholder="请输入家庭住址" 
                    class="textarea add" 
                    v-model="homeAddText"
                    maxlength="200"
                    @touchstart="app.area.start($event)"
                    @touchmove="app.area.move($event)"
                    @touchend="app.area.end($event)">
                </textarea>
            </div>
        </scroller-base>
        <scroller-base class="page1" :data="num" v-if="(num==3&&heardArr.length>2)||(num==2&&heardArr.length==2)">
            <div class="item" v-if="map['CustomerStatus'].Status" @click="openSelectStatus">
                <div class="item-left">客户状态<span class="spec" v-if="map['CustomerStatus'].Required">*</span></div>
                <div class="item-mid">
                    {{customState.Value}}
                </div>
                <div class="item-right" v-if="!(isEdit&&customState.Value=='转化成功')">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item" v-if="map['WillLevel'].Status">
                <div class="item-left">意向级别<span class="spec" v-if="map['WillLevel'].Required">*</span></div>
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
                <router-link tag="div" :to="{path:`/selectCourse/${campusObj&&campusObj.Key}`}" class="item-mid" >
                    {{shiftName}}
                </router-link>
                <router-link tag="div" :to="{path:`/selectCourse/${campusObj&&campusObj.Key}`}" class="item-right">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </router-link>
            </div>
            <div class="void"></div>
            <div class="item" v-if="map['ReservationTryDate']&&map['ReservationTryDate'].Status">
               <div class="item-left">试听预约时间<span class="spec" v-if="map['ReservationTryDate'].Required">*</span></div>
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
            <div class="item" v-if="map['SalePersonList'].Status&&editSalePerson">
                <div class="item-left">副责任人<span class="spec" v-if="map['SalePersonList'].Required">*</span></div>
                <div class="item-mid" @click="selectScoendPerson">
                    {{secondaryPersonName}}
                </div>
                <div class="item-right" @click="selectScoendPerson">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item" v-if="map['SalePersonList'].Status&&!editSalePerson">
               <div class="item-left">副责任人</div>
               <div class="item-mid">
                   {{secondaryPersonName}}
               </div>
           </div>
            <div class="item" v-if="map['Introducer'].Status">
                <div class="item-left">介绍人<span class="spec" v-if="map['Introducer'].Required">*</span></div>
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
               <textarea 
                   placeholder="请输入沟通内容(限200字)" 
                   class="textarea" 
                   v-model="remarkText"
                   maxlength="200"
                   @touchstart="app.area.start($event)"
                   @touchmove="app.area.move($event)"
                   @touchend="app.area.end($event)">
                       
               </textarea>
           </div>
            <div class="void"></div>
        </scroller-base>
        <div class="bottom">
            <div class="shangyibu" v-if="num>1" @click="changePages(-1)">上一步</div>
            <div class="next" @click="changePages(1)" v-if="num!==heardArr.length">下一步</div>
            <div class="next" v-if="num==heardArr.length" @click="submit">提交</div>
        </div>

        <!-- 选择招生来源 -->
            <!-- v-show="showSelectSource" -->
        <select-customer-source
            :opened.sync="showSelectSource"
            :sourceArr="computedSourceArr"
            :sourceKey="sourceKey"
            :campusid="campusObj.Key"
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
            ref="findSame">
            
        </find-same>

        <!-- 选择副责任人 -->
        <select-role
            :opened.sync="showSelectRole"
            :list="secondaryPerson"
            @delCus="delCus"
            @openSelectRole="openSelectRole"
            @selectRoleDone="selectRoleDone">
        </select-role>

        <!-- 选择副责任人角色 -->
        <open-role ref="openRole" 
            :opened.sync="showRole" 
            @selectRol="hasSelectRole">
        </open-role>

        <!-- 选择市场信息来源 -->
        <select-market-letter
            :opened.sync="showSelectMarketLetter"
            :marketInfo="computedMarketInfo"
            @selectMarketInfo="selectMarketInfo"
            :campusid="campusObj.Key">
        </select-market-letter>
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
    import SelectRole from './selectRole.vue'
    import OpenRole from './openRole.vue'
    import SelectMarketLetter from './selectMarketLetter.vue'
    import {getCustomers, saveData, queryCustomerForm} from 'teacher/api/customers'
    export default {
        data() {
            return {
                wxTitle: "添加意向客户",
                num: 1,
                map: {},
                formArr: [], //表单信息
                fieldFormArr: [],//自定义字段
                tap2FormArr: [],
                heardArr: [{
                    text: '基本信息',
                    icon: '#icon--jihuo1',
                    activeIcon: '#icon--jihuo1',
                    selectArr: [1,2]
                }, {
                    text: '联系方式',
                    icon: '#icon-icon-test1',
                    activeIcon: '#icon--jihuo',
                    selectArr: []
                }, {
                    text: '招生信息',
                    icon: '#icon-icon-test',
                    activeIcon: '#icon--jihuo2',
                    selectArr: [12]
                }],
                
                sourceKey: '',
                showSelectSource: false,
                selectSourceArr: [],
                sourceString: '',
                marketInfoTwoArr: [], //第二招生来源

                showSelectMarketLetter: false,

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
                    name: app.sysInfo.DefaultCustomerSalePerson == '1' ? '' : app.sysInfo.FullName,
                    id: app.sysInfo.DefaultCustomerSalePerson == '1' ? '' : app.sysInfo.ID
                },
                secondaryPerson: [],

                showFindSame: false,
                isCheck: false,
                sameList: [],


                nameText: '',
                englishNameText: '',
                phoneText: '',
                idNumberText: '',
                qqText: '',
                classText: '',
                dadNameText: '',
                dadPhoneText: '',
                mumNameText: '',
                mumPhoneText: '',
                homePhoneText: '',
                homeAddText: '',
                remarkText: '',

                //一招一夕加的
                SaleModeListSec: '',
                marketInfoOnePerson: {
                    id: '',
                    name: ''
                },
                // marketInfoTwoId: '',
                // marketInfoOneUserId: '',
                marketInfoTwoUserPerson: {
                    id: '',
                    name: ''
                },
                marketInfoOne: {

                },
                marketInfoTwo: {

                },
                marketInfoKey: '',

                shiftClassList: [],

                isEdit: this.$route.params.type === 'edit',
                weekList: [{name: '一',value: 1},{name: '二',value: 2},{name: '三',value: 3},{name: '四',value: 4},{name: '五',value: 5},{name: '六',value: 6},{name: '日',value: 7}],
                timeList: [{name: '上午',value: 8},{name: '下午',value: 9},{name: '晚上',value: 10}],

                showSelectRole: false, //选择雇员
                showRole: false, //选择角色
                curCustomId: ''
            }
        },
        computed: {
            computVoid1() {
                return this.map['Sex'].Status + this.map['Birthday'].Status + this.map['IDNumber'].Status
            },
            computVoid2() {
                return this.map['QQ'].Status + this.map['FullTimeSchool'].Status + this.map['Grade'].Status + this.map['ClassName'].Status + this.map['EnglishName'].Status
            },
            computVoid3() {
                return this.map['Father'].Status + this.map['FatherTel'].Status + this.map['FatherVocation'].Status
            },
            computVoid4() {
                return this.map['Mother'].Status + this.map['MotherTel'].Status + this.map['MotherVocation'].Status
            },
            // sourceString() {
            //     return this.selectSourceArr.map(obj => obj.Name).join()
            // },
            secondaryPersonName() {
                return this.secondaryPerson.map(obj => obj.Name).join()
            },
            shiftName() {
                return this.shiftClassList.map(obj => obj.ShiftName).join()
            },
            editTel() {  //是否具有查看电话号码权限
                if (this.isEdit) {
                    return app.tool.op('CustomerTelEdit') && !(this.phoneText.indexOf('*') > -1)
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
                    return true
                }
            },
            editCustomerFields() {
                if (this.isEdit) {
                    return app.tool.op('CustomerEditCustomFields')
                } else {
                    return true
                }
            },
            computedSourceArr() {
                if (this.sourceKey) {
                    return this[this.sourceKey]
                } else {
                    return []
                }
            },
            computedMarketInfo() {
                return this[this.marketInfoKey]
            },
            computedMarketInfoCanEdit() {
                let detail = app.ls.get('detail')
                if (detail) {
                    return detail.marketInfoOneUserId && this.isEdit
                } else {
                    return false
                }
            }
        },
        methods: {
            changePages(number) {
                this.num = this.num + number
                if (this.num > this.heardArr.length) this.num = this.heardArr.length
                if (this.num < 1) this.num = 1
            },
            openFistPage(key, sourceKey) {
                setTimeout(() => {
                    if (this.$refs.findSame.opened) return
                    if (key == 'showSelectSource' && 
                        sourceKey == 'selectSourceArr' && 
                        this.isEdit && app.sysInfo.EnableCustomerAutomaticDistribution == '1') return
                    if (key == 'showSelectMarketLetter' && sourceKey == 'marketInfoOne' && this.isEdit) return
                    if (sourceKey == 'marketInfoOne' || sourceKey == 'marketInfoTwo') {
                        this.marketInfoKey = sourceKey
                    }
                    if (sourceKey == 'selectSourceArr' || sourceKey == 'marketInfoTwoArr') {
                        this.sourceKey = sourceKey
                    }
                    this[key] = true
                }, 500)
            },
            openSelectStatus() {
                if (this.isEdit && this.customState.Value == '转化成功') return
                this.showSelectStatus = true
            },
            //选择来源回掉
            selectSource(arr) {
                if (this.sourceKey == 'selectSourceArr') {
                    this.selectSourceArr = arr
                    this.sourceString = this.selectSourceArr.map(obj => obj.Name).join()
                } else {
                    this.marketInfoTwoArr = arr
                }
                this.showSelectSource = false
            },
            //选择校区回掉
            selectCampusObj(obj) {
                this.campusObj = obj
                app.ls.set('add-campusObj', obj)
                console.log(obj);
                // this.showSelectCampus = false
            },

            selectSexObj(obj) {
                this.sexObj = obj
                // this.showSelectSex = false
            },

            selectBirthDay(){
                setTimeout(() => {
                    if (this.$refs.findSame.opened) return
                    app.calendar().then(res => {
                        this.birthDay = res
                    })
                }, 500)
            },
            fieldSelectDate(obj) {
                app.calendar().then(res => {
                    obj.modelText = res
                })
            },
            //公里学校选择回掉
            selectSchoolObj(obj) {
                this.schoolObj = obj
                // this.showSelectSchool = false
            },
            //选择年纪回掉
            selectGradeObj(obj) {
                this.gradeObj = obj
                // this.showSelectGrade = false
            },
            openSelectVocation(str) {
                this.whosVocation = str
                this.showSelectVocation = true
            },
            //选择职业
            selectVocation(obj) {
                if (obj.whosVocation == 'dad') this.dadVocation = obj.vocation
                if (obj.whosVocation == 'mum') this.mumVocation = obj.vocation
                // this.showSelectVocation = false
            },
            //选择状态
            selectCustomStatus(obj) {
                this.customState = obj
                // this.showSelectStatus = false
            },
            //选择试听时间
            selectTime(obj) {
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
                // this.showSelectWillLevel = false
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
                    return item.UserID
                }) : []
                app.empSelect(1, arr).then(res => {
                    this.secondaryPerson = res.map(item =>{
                        let obj = {
                            Name: item.name,
                            UserID: item.id,
                            Photo: item.photo
                        }
                        return obj
                    })
                    setTimeout(() => {
                        this.showSelectRole = true
                    }, 300)
                })
                // app.empSelect(1, arr, function(res){
                //     this.secondaryPerson = res.map(item =>{
                //         let obj = {
                //             Name: item.name,
                //             UserID: item.id,
                //             Photo: item.photo
                //         }
                //         return obj
                //     })
                //     // app.ls.removeStorage('secondaryPerson')
                //     // app.ls.set('secondaryPerson', this.secondaryPerson)
                //     // this.$router.push({path: '/selectRole'})
                //     console.log('1111111111111111111111');
                //     this.showSelectRole = true
                //     return false
                // }, ).then(res => {
                //     console.log('222222222222222222222');
                // })
            },
            delCus(id) {
                this.secondaryPerson = this.secondaryPerson.filter(item => item.UserID != id)
            },
            openSelectRole(obj) {
                this.curCustomId = obj.UserID
                this.showRole = true
            },
            hasSelectRole(obj) {
                this.secondaryPerson.forEach(item => {
                    if (item.UserID === this.curCustomId) {
                        item.SaleRole = obj.ID
                        this.$set(item, 'SaleRoleName', obj.Value)
                    }
                })
                this.showRole = false
            },
            selectRoleDone() {
                this.showSelectRole = false
            },
            //检查是否同名
            checkSameName(str) {
                let detail = app.ls.get('detail'), name, tel, id
                if (detail) {
                    name = detail.Name,
                    tel = detail.SMSTel,
                    id = detail.ID
                }
                if (!this.isCheck) return
                if (app.sysInfo.CustomerCheckRule == '1' && str == 'name') return
                if (str === 'name' && !this.nameText.length) return
                if (str === 'phone' && !this.phoneText.length) return
                if (this.isEdit) {
                    if (this.nameText === name && this.phoneText === tel) return
                }
                this.isCheck = false
                getCustomers({
                    name: this.nameText,
                    tel: this.phoneText,
                    id: this.isEdit ? id : '',
                    pname: 'isexist'
                }).then(res => {
                    if (res.errcode === app.errok) {
                        this.sameList = res.data
                        if (str === 'phone' && app.sysInfo.CustomerCheckRule == 1 && this.sameList.length) {
                            //乐宁定制
                            app.toast('info', '电话号码重复，请重新输入')
                            this.phoneText = ''
                            return
                        }
                        if (str === 'phone') {
                            /*this.sameList = this.sameList.filter(obj => {
                                obj.Name !== this.nameText
                            })*/
                        }
                        if (this.sameList.length) {
                            this.$refs.findSame.open().then(res => {
                                if (res) {
                                    this.nameText = ''
                                    this.phoneText = ''
                                }
                            })
                        }
                    }
                })
            },
            selectMarketInfoOneUser() {
                if (this.computedMarketInfoCanEdit) return
                app.empSelect(0).then(res => {
                    this.marketInfoOnePerson = {
                        name: res.name,
                        id: res.id
                    }
                })
            },
            selectMarketInfoTwoUser() {
                app.empSelect(0).then(res => {
                    this.marketInfoTwoUserPerson = {
                        name: res.name,
                        id: res.id
                    }
                })
            },
            selectMarketInfo(obj) {
                if (this.marketInfoKey == 'marketInfoOne') {
                }
                this[this.marketInfoKey] = obj
                this.showSelectMarketLetter = false
            },
            submit() {
                let regExpPhoneNum=/^1\d{10}$/,
                    regExpNum=/^-?\d+\.?\d*$/,
                    regExpDate=/^(\d{4})-(\d{2})-(\d{2})$/
                if (!this.nameText.length) {
                    app.toast('info', '请输入姓名')
                    return 
                }
                if (!this.phoneText.length) {
                    app.toast('info', '请输入电话号码')
                    return 
                }
                if (!regExpPhoneNum.test(this.phoneText)) {
                    app.toast('info', '请输入正确的的手机号码')
                    return
                }
                if (!this.selectSourceArr.length) {
                    app.toast('info', '请选择招生来源')
                    return 
                }
                if (!this.campusObj.Key) {
                    app.toast('info', '请选择校区。')
                    return 
                }
                if (!this.marketInfoOne.ID && app.sysInfo.EnableCustomerAutomaticDistribution == '1') {
                    app.toast('info', '请选择市场信息来源')
                    return
                }
                if (this.map['Sex'] && this.map['Sex'].Status==1 && this.map['Sex'].Required && !this.sexObj.sex) {
                    app.toast('info', '请选择性别')
                    return
                }
                if (this.map['Birthday'] && this.map['Birthday'].Status==1 && this.map['Birthday'].Required && !this.birthDay) {
                    app.toast('info', '请填写出生日期')
                    return
                }
                let today = new Date(),
                    year = today.getFullYear(),
                    mouth = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1),
                    day = today.getDate() > 9 ? today.getDate() : '0' + today.getDate(),
                    str = `${year}-${mouth}-${day}`
                if (this.birthDay > str) {
                    app.toast('info', '出生日期不能大于今日')
                    return
                }
                if (this.map['IDNumber'] && this.map['IDNumber'].Status==1 && this.map['IDNumber'].Required && !this.idNumberText) {
                    app.toast('info', '请填写身份证号码')
                    return
                }
                if (this.map['QQ'] && this.map['QQ'].Status==1 && this.map['QQ'].Required && !this.qqText) {
                    app.toast('info', '请填写QQ号码')
                    return
                }
                if (this.map['FullTimeSchool'] && this.map['FullTimeSchool'].Status==1 && this.map['FullTimeSchool'].Required && !this.schoolObj.Value) {
                    app.toast('info', '请填写公立学校')
                    return
                }
                if (this.map['Grade'] && this.map['Grade'].Status==1 && this.map['Grade'].Required && !this.gradeObj.value) {
                    app.toast('info', '请选择年级')
                    return
                }
                if (this.map['ClassName'] && this.map['ClassName'].Status==1 && this.map['ClassName'].Required && !this.classText) {
                    app.toast('info', '请填写班级')
                    return
                }
                if (this.map['EnglishName'] && this.map['EnglishName'].Status==1 && this.map['EnglishName'].Required && !this.englishNameText) {
                    app.toast('info', '请填写英文名')
                    return
                }
                if (this.map['Father'] && this.map['Father'].Status==1 && this.map['Father'].Required && !this.dadNameText) {
                    app.toast('info', '请填写父亲姓名')
                    return
                }
                if (this.map['FatherTel'] && this.map['FatherTel'].Status==1 && this.map['FatherTel'].Required && !this.dadPhoneText) {
                    app.toast('info', '请填写父亲电话')
                    return
                }
                if (this.map['FatherVocation'] && this.map['FatherVocation'].Status==1 && this.map['FatherVocation'].Required && !this.dadVocation) {
                    app.toast('info', '请填写父亲职业')
                    return
                }
                if (this.map['Mother'] && this.map['Mother'].Status==1 && this.map['Mother'].Required && !this.mumNameText) {
                    app.toast('info', '请填写母亲姓名')
                    return
                }
                if (this.map['MotherTel'] && this.map['MotherTel'].Status==1 && this.map['MotherTel'].Required && !this.mumPhoneText) {
                    app.toast('info', '请填写母亲电话')
                    return
                }
                if (this.map['MotherVocation'] && this.map['MotherVocation'].Status==1 && this.map['MotherVocation'].Required && !this.mumVocation) {
                    app.toast('info', '请填写母亲职业')
                    return
                }
                if (this.map['OtherTel'] && this.map['OtherTel'].Status==1 && this.map['OtherTel'].Required && !this.homePhoneText) {
                    app.toast('info', '请填写家庭电话')
                    return
                }
                if (this.map['LivePlace'] && this.map['LivePlace'].Status==1 && this.map['LivePlace'].Required && !this.homeAddText) {
                    app.toast('info', '请填写家庭住址')
                    return
                }
                if (this.map['CustomerStatus'] && this.map['CustomerStatus'].Status==1 && this.map['CustomerStatus'].Required && !this.customState.ID) {
                    app.toast('info', '请选择客户状态')
                    return
                }
                if (this.map['WillLevel'] && this.map['WillLevel'].Status==1 && this.map['WillLevel'].Required && !this.level) {
                    app.toast('info', '请选择意向级别')
                    return
                }
                if (this.map['ReservationTryDate'] && this.map['ReservationTryDate'].Status==1 && this.map['ReservationTryDate'].Required && !this.tryTime.value) {
                    app.toast('info', '请选择预约时间')
                    return
                }
                if (this.map['SalePersonList'] && this.map['SalePersonList'].Status==1 && this.map['SalePersonList'].Required && !this.secondaryPerson.length) {
                    app.toast('info', '请选择副责任人')
                    return
                }
                let fieldParams = {}
                for(let i = 0; i < this.fieldFormArr.length; i++) {
                    if (this.fieldFormArr[i].Required && !this.fieldFormArr[i].modelText) {
                        app.toast('info', `请填写${this.fieldFormArr[i].Name}`)
                        return
                    }
                    if (this.fieldFormArr[i].modelText && this.fieldFormArr[i].FieldType == 2 && !regExpNum.test(this.fieldFormArr[i].modelText)) {
                        app.toast('info', `${this.fieldFormArr[i].Name}必须为数值`)
                        return
                    }
                    if (this.fieldFormArr[i].modelText && this.fieldFormArr[i].FieldType == 3 && !regExpDate.test(this.fieldFormArr[i].modelText)) {
                        app.toast('info', `${this.fieldFormArr[i].Name}必须为日期`)
                        return
                    }
                    
                    fieldParams[this.fieldFormArr[i].Fields] = this.fieldFormArr[i].modelText
                }
                let params = {
                    "CampusName": this.campusObj.Value.Name,
                    "CampusID": this.campusObj.Key,
                    "Name": this.nameText,
                    "IDNumber": this.idNumberText,
                    "Sex": this.sexObj.sex,
                    "Birthday": this.birthDay,
                    "LivePlace": app.tool.arrowFilter(this.homeAddText),
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
                    "Grade": this.gradeObj.value,
                    "GradeName": this.gradeObj.name || '',
                    "SaleModeList": this.selectSourceArr,
                    "SalePersonID": this.mainPerson.id,
                    "SalePersonName": this.mainPerson.name,
                    "EnglishName": this.englishNameText,
                    "CustomerStatus": this.customState.ID ? this.customState.ID : -1,
                    "Describe": app.tool.arrowFilter(this.remarkText),
                    "ID": "",
                    "WillLevel": this.level,
                    "ShiftClassList": this.shiftClassList,
                    "SalePersonList": this.secondaryPerson,
                    "TryDate": this.tryTime.value,
                    "Introducer": this.introducePerson.id || '',
                    "IntroducerName": this.introducePerson.name || '',
                    
                    "SaleModeListSec": this.marketInfoTwoArr,
                    "marketInfoOneId": this.marketInfoOne.ID,
                    "marketInfoTwoId": this.marketInfoTwo.ID,
                    "marketInfoOneUserId": this.marketInfoOnePerson.id,
                    "marketInfoTwoUserId": this.marketInfoTwoUserPerson.id

                },
                saveFlag = this.isEdit ? 'putcustomer' : 'postcustomer'
                params = Object.assign(params, fieldParams)
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
                            // this.$router.go(-1)
                        } else {
                            app.event.emit('editCustomer')
                            // this.$router.go(-1)
                        }
                        this.$router.go(-1)
                    }
                })
            },
            initEditData(detail) {//点击客户详情进入修改详情页面
                app.customConfigInfo.CampusList.forEach(obj => {
                    if (obj.Key == detail.CampusID) this.campusObj = app.tool.clone(obj)
                })
                this.nameText = detail.Name
                this.idNumberText = detail.IDNumber
                this.sexObj.sex = detail.Sex
                this.birthDay = detail.Birthday
                this.homeAddText = app.dom.parseDom(detail.LivePlace)
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
                this.sourceString = this.selectSourceArr.map(obj => obj.Name).join()
                if (app.sysInfo.DefaultCustomerSalePerson !== '1') { //配置项决定是否显示主责任人
                    this.mainPerson.id = detail.SalePersonID
                    this.mainPerson.name = detail.SalePersonName
                }
                this.customState.ID = detail.CustomerStatus
                this.customState.Value = detail.CustomerStatusName
                this.remarkText = app.dom.parseDom(detail.Describe)
                this.ID = detail.ID
                this.level = detail.WillLevel
                this.shiftClassList = detail.ShiftClassList
                this.secondaryPerson = detail.SalePersonList
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

                this.marketInfoOne.ID = detail.marketInfoOneId
                this.marketInfoOne.Value = detail.marketInfoOneValue
                this.marketInfoTwo.ID = detail.marketInfoTwoId
                this.marketInfoTwo.Value = detail.marketInfoTwoValue

                this.marketInfoTwoArr = detail.SaleModeListSec

                this.marketInfoOnePerson.name = detail.marketInfoOneUserName
                this.marketInfoOnePerson.id =  detail.marketInfoOneUserId

                this.marketInfoTwoUserPerson.name = detail.marketInfoTwoUserName
                this.marketInfoTwoUserPerson.id = detail.marketInfoTwoUserId        
            },
            initPage() {
                queryCustomerForm({ type: 1, table: 'tStudentCustomer'}).then(res => {
                    if (res.ErrorCode === app.errok) {
                        res.Data.forEach(item => {
                            this.map[item.Fields] = item
                        })
                        this.formArr = res.Data

                        let tempArr1 = res.Data.filter(obj => obj.Status),
                            tempArr2 = []
                        tempArr1.forEach(obj => {
                            if (obj.Name=='父亲姓名' || 
                                obj.Name=='父亲电话' || 
                                obj.Name=='父亲职业' || 
                                obj.Name=='母亲姓名' || 
                                obj.Name=='母亲电话' || 
                                obj.Name=='母亲职业' || 
                                obj.Name=='家庭电话' || 
                                obj.Name=='家庭住址') this.tap2FormArr.push(obj)
                            if (obj.Fields.indexOf('Field') > -1) this.fieldFormArr.push(obj)//自定义字段
                        })
                        if (this.fieldFormArr.length) {
                            this.fieldFormArr.forEach(obj => {
                                this.$set(obj, 'modelText', '')
                            })
                        }
                        this.heardArr[1].selectArr = this.tap2FormArr
                        this.heardArr = this.heardArr.filter(obj => obj.selectArr.length)
                        if (this.heardArr.length == 2) {
                            this.heardArr[1].icon = '#icon-icon-test1'
                            this.heardArr[1].activeIcon = '#icon--jihuo'
                        }
                    }
                })
            }
        },
        watch: {
            phoneText(val) {
                if (val) this.isCheck = true
            },
            nameText(val) {
                if (val) this.isCheck = true
            },
            campusObj: {
                handler(newVal, oldVal) {
                    if (!oldVal.Key) return
                    this.selectSourceArr = []
                    this.sourceString = ''
                },
                deep: true
            }
            
        },
        created() {
            window.a = this
            if (this.isEdit) {
                let detail = app.ls.get('detail')
                this.initEditData(detail)
            } else {
                this.campusObj = app.ls.get('add-campusObj') ? app.ls.get('add-campusObj') : app.customConfigInfo.CampusList[0]
            }
            this.initPage()
            if (app.sysInfo.DefaultCustomerSalePerson === 1) {
                this.mainPerson = {
                    name: '',
                    id: ''
                }
            }
            app.event.on('selectData',  (type, arr) => {
                app.ls.set('willClass', arr)
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
            })
        },  
        mounted() {
        },
        destroyed() {
            app.ls.removeStorage('detail')
            app.ls.removeStorage('willClass')
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
            FindSame,
            SelectRole,
            OpenRole,
            SelectMarketLetter
        }
    }
</script>