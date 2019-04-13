<style scoped lang="scss">


    .xyx-personal-info-container{
        .scroller{
            @include position-absolute(0,0,44px,0);

            .card {
                    padding: 0 15px;
                    display: flex;
                    width: 100%;
                    height: 49px;
                    line-height: 49px;
                    background-color: $color-white;
                    border-bottom: 1px solid $color-assist-1;
                    font-size: 14px;

                    .card-lf {
                        min-width: 66px;
                        max-width: 130px;
                        height: 49px;
                        line-height: 49px;
                        color: $color-6;
                        padding-right: 5px;
                        .icon.necessary {
                            color: #FF735C;
                            font-size: 12px;
                            transform: scale(0.75);
                            vertical-align: baseline;
                        }
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
                        color: $color-3;
                        height: 49px;
                        line-height: 49px;
                        flex: 1;
                        text-align: right;
                        @include ellipsis-single;
                        .val{
                            text-align: right;
                        }
                        .cant-edit {
                            color: $color-9;
                        }
                    }

                }
            .item {
                height: 44px;
                @include flex-between;
                padding: 0 12px;
                border-bottom: 1px solid $color-assist-1;

                // display: flex;
                .item-left {
                    min-width: 66px;
                    max-width: 130px;
                    font-size: 15px;
                    color: $color-6;
                }

                .spec {
                    color: #FF735C;
                    font-size: 12px;
                    transform: scale(0.7);
                    vertical-align: baseline;
                    margin: 0 4px;
                }
                .spec-input{
                    height: 24px;
                    border-right: 1px solid $color-9;
                    border-radius: 0;
                    text-align: right;

                }
                .item-mid {
                    padding-left: 10px;
                    flex: 1;
                    text-align: right;
                    @include ellipsis-single;
                    height: 44px;
                    line-height: 44px;
                    color: $color-3;
                    .input {
                        text-align: right;
                        height: 100%;
                        color: $color-3;
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
            .address{
                .address-left{
                    height: 44px;
                    line-height: 44px;
                    padding: 0 12px;
                    .spec {
                        color: #FF735C;
                        font-size: 12px;
                        transform: scale(0.75);
                        vertical-align: baseline;
                    }
                }
                .address-mid{
                    padding: 0 12px 12px 12px;
                    border-bottom: 1px solid $color-assist-1;
                    color: $color-3;
                    &.edit{
                        .textarea{
                            padding: 5px;
                            height: 65px;
                            box-shadow: none;
                            margin-top: 0px;
                            resize: none;
                        }
                    }
                    .textarea{
                        border: 1px solid $color-assist-1;
                    }
                }
            }
            .void{
                height: 9px;
                background-color: $color-assist-1;
            }
        }
        .footer{
            height: 44px;
            line-height: 44px;
            background-color: $color-primary;
            color: $color-white;
            font-size: 16px;
            text-align: center;
            position: absolute;
            bottom: 0;
            width: 100%;
        }
        .xyx-sex,.xyx-school,.xyx-grade,.xyx-Common,.xyx-Fetch{
            @include position-absolute;
        }

    }

</style>

<template>
    <div class="xyx-personal-info-container">
        <scroller-base class="scroller" :data="renderData">
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
            <div class="void"></div>

            <div class="item" v-if="dataObj['Name']">
                <div class="item-left">姓名<svg aria-hidden="true" class="icon spec" v-if="dataObj['Name'].Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                </svg></div>
                <div class="item-mid" v-if="(dataObj['Name'].FirstHadVal)&&dataObj['Name'].IsEdited&&dataObj['Name'].CanUpdateTimes==1">
                    {{show.Name}}
                </div>
                <div class="item-mid" v-else>
                    <input type="text" maxlength="20" class="input" @input="regUsuaVal($event,'Name')" v-model="show.Name"  placeholder="填写后不能再修改" v-if="dataObj['Name'].CanUpdateTimes==1">
                    <input type="text" maxlength="20" class="input" @input="regUsuaVal($event,'Name')" v-model="show.Name" v-else>
                </div>
            </div>

            <div class="item" v-if="dataObj['EnglishName']">
                <div class="item-left">英文名<svg aria-hidden="true" class="icon spec" v-if="dataObj['EnglishName'].Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                </svg></div>
                <div class="item-mid" v-if="(dataObj['EnglishName'].FirstHadVal)&&dataObj['EnglishName'].IsEdited&&dataObj['EnglishName'].CanUpdateTimes==1">
                    {{show.EnglishName}}
                </div>
                <div class="item-mid" v-else>
                    <input type="text" maxlength="20" class="input" @input="regUsuaVal($event,'EnglishName')" v-model="show.EnglishName"  placeholder="填写后不能再修改" v-if="dataObj['EnglishName'].CanUpdateTimes==1">
                    <input type="text" maxlength="20" class="input" @input="regUsuaVal($event,'EnglishName')" v-model="show.EnglishName" v-else>
                </div>
            </div>

            <div class="item" v-if="dataObj['Sex']" @click="selectSex()">
                <div class="item-left">性别<svg aria-hidden="true" class="icon spec" v-if="dataObj['Sex'].Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                </svg></div>
                <div class="item-mid">
                    {{show.Sex}}
                </div>
                <div class="item-right" v-if="!((dataObj['Sex'].FirstHadVal)&&dataObj['Sex'].CanUpdateTimes==1&&dataObj['Sex'].IsEdited)">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>

            <div class="item" v-if="dataObj['Birthday']" @click="selectBirthday()">
                <div class="item-left">公历生日<svg aria-hidden="true" class="icon spec" v-if="dataObj['Birthday'].Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                </svg></div>
                <div class="item-mid">
                    {{show.Birthday}}
                </div>
                <div class="item-right" v-if="!((dataObj['Birthday'].FirstHadVal)&&dataObj['Birthday'].CanUpdateTimes==1&&dataObj['Birthday'].IsEdited)">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>

            <div class="item" v-if="dataObj['IDNumber']">
                <div class="item-left">身份证号码<svg aria-hidden="true" class="icon spec" v-if="dataObj['IDNumber'].Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                </svg></div>
                <div class="item-mid" v-if="(dataObj['IDNumber'].FirstHadVal)&&dataObj['IDNumber'].IsEdited&&dataObj['IDNumber'].CanUpdateTimes==1">
                    {{show.IDNumber}}
                </div>
                <div class="item-mid" v-else>
                    <input type="text" maxlength="20" class="input"  @input="regUsuaVal($event,'IDNumber')" v-model="show.IDNumber"  placeholder="填写后不能再修改" v-if="dataObj['IDNumber'].CanUpdateTimes==1">
                    <input type="text" maxlength="20" class="input"  @input="regUsuaVal($event,'IDNumber')" v-model="show.IDNumber" v-else>
                </div>
            </div>

            <div class="item" v-if="dataObj['SMSTel']">
                <div class="item-left">手机号码<svg aria-hidden="true" class="icon spec" v-if="dataObj['SMSTel'].Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                </svg></div>
                <div class="item-mid" v-if="(dataObj['SMSTel'].FirstHadVal)&&dataObj['SMSTel'].IsEdited&&dataObj['SMSTel'].CanUpdateTimes==1">
                    {{show.SMSTel}}
                </div>
                <div class="item-mid" v-else>
                    <input type="tel" maxlength="20" class="input"  @input="regUsuaVal($event,'SMSTel')" v-model="show.SMSTel"  placeholder="填写后不能再修改" v-if="dataObj['SMSTel'].CanUpdateTimes==1">
                    <input type="tel" maxlength="20" class="input"  @input="regUsuaVal($event,'SMSTel')" v-model="show.SMSTel" v-else>
                </div>
            </div>

            <div class="item" v-if="dataObj['QQ']">
                <div class="item-left">QQ<svg aria-hidden="true" class="icon spec" v-if="dataObj['QQ'].Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                </svg></div>
                <div class="item-mid" v-if="(dataObj['QQ'].FirstHadVal)&&dataObj['QQ'].IsEdited&&dataObj['QQ'].CanUpdateTimes==1">
                    {{show.QQ}}
                </div>
                <div class="item-mid" v-else>
                    <input type="tel" maxlength="20" class="input" @input="regUsuaVal($event,'QQ')" v-model="show.QQ"  placeholder="填写后不能再修改" v-if="dataObj['QQ'].CanUpdateTimes==1">
                    <input type="tel" maxlength="20" class="input" @input="regUsuaVal($event,'QQ')" v-model="show.QQ" v-else>
                </div>
            </div>

            <div class="item" v-if="dataObj['OtherTel']">
                <div class="item-left">其他联系电话<svg aria-hidden="true" class="icon spec" v-if="dataObj['OtherTel'].Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                </svg></div>
                <div class="item-mid" v-if="(dataObj['OtherTel'].FirstHadVal)&&dataObj['OtherTel'].IsEdited&&dataObj['OtherTel'].CanUpdateTimes==1">
                    {{show.OtherTel}}
                </div>
                <div class="item-mid" v-else>
                    <input type="tel" maxlength="20" class="input"  @input="regUsuaVal($event,'OtherTel')" v-model="show.OtherTel"  placeholder="填写后不能再修改" v-if="dataObj['OtherTel'].CanUpdateTimes==1">
                    <input type="tel" maxlength="20" class="input"  @input="regUsuaVal($event,'OtherTel')" v-model="show.OtherTel" v-else>
                </div>
            </div>

            <div class="address" v-if="dataObj['LivePlace']">
                <div class="address-left">家庭住址 <svg aria-hidden="true" class="icon spec" v-if="dataObj['LivePlace'].Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                </svg></div>
                <div class="address-mid show" v-if="(dataObj['LivePlace'].FirstHadVal)&&dataObj['LivePlace'].IsEdited&&dataObj['LivePlace'].CanUpdateTimes==1">
                    {{show.LivePlace}}
                </div>
                <div class="address-mid edit" v-else>
                    <textarea
                            v-if="dataObj['LivePlace'].CanUpdateTimes==1"
                            placeholder="填写后不能再修改"
                            class="textarea"
                            v-model="show.LivePlace"
                            @input="regUsuaVal($event,'LivePlace')"
                            maxlength="100"
                            @touchstart="app.area.start($event)"
                            @touchmove="app.area.move($event)"
                            @touchend="app.area.end($event)">
                    </textarea>
                    <textarea
                            class="textarea"
                            v-model="show.LivePlace"
                            @input="regUsuaVal($event,'LivePlace')"
                            maxlength="100"
                            @touchstart="app.area.start($event)"
                            @touchmove="app.area.move($event)"
                            @touchend="app.area.end($event)"
                            v-else>
                    </textarea>
                </div>
            </div>

            <div class="item" v-if="dataObj['FullTimeSchool']">
                <div class="item-left">公立学校<svg aria-hidden="true" class="icon spec" v-if="dataObj['FullTimeSchool'].Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                </svg></div>
                <!--可填可选-->
                <div class="item-mid" v-if="app.sysInfo.AllowParentInputSchool==1">
                   <div v-if="!((dataObj['FullTimeSchool'].FirstHadVal)&&dataObj['FullTimeSchool'].CanUpdateTimes==1&&dataObj['FullTimeSchool'].IsEdited)">
                       <input type="text" maxlength="20" class="spec-input" @input="regUsuaVal($event,'FullTimeSchool')" v-model="show.FullTimeSchool"  placeholder="填写后不能再修改" v-if="dataObj['FullTimeSchool'].CanUpdateTimes==1">
                       <input type="text" maxlength="20" class="spec-input" @input="regUsuaVal($event,'FullTimeSchool')" v-model="show.FullTimeSchool" v-else>
                   </div>
                   <div class="" v-else>{{show.FullTimeSchool}}</div>
                </div>
                <!--只能选-->
                <div class="item-mid" v-if="app.sysInfo.AllowParentInputSchool==0"  @click="selectSchool()">
                    <span v-if="!((dataObj['FullTimeSchool'].FirstHadVal)&&dataObj['FullTimeSchool'].CanUpdateTimes==1&&dataObj['FullTimeSchool'].IsEdited)">{{show.FullTimeSchool}}</span>
                    <span class="" v-else>{{show.FullTimeSchool}}</span>
                </div>
                <div class="item-right" v-if="!((dataObj['FullTimeSchool'].FirstHadVal)&&dataObj['FullTimeSchool'].CanUpdateTimes==1&&dataObj['FullTimeSchool'].IsEdited)"  @click="selectSchool()">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>

            <div class="item" v-if="dataObj['Grade']" @click="selectGrade">
                <div class="item-left">年级<svg aria-hidden="true" class="icon spec" v-if="dataObj['Grade'].Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                </svg></div>
                <div class="item-mid ">
                    {{show.Grade.val}}
                </div>
                <div class="item-right" v-if="!((dataObj['Grade'].FirstHadVal)&&dataObj['Grade'].CanUpdateTimes==1&&dataObj['Grade'].IsEdited)">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>

            <div class="item" v-if="dataObj['ClassName']">
                <div class="item-left">就读班级<svg aria-hidden="true" class="icon spec" v-if="dataObj['ClassName'].Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                </svg></div>
                <div class="item-mid" v-if="(dataObj['ClassName'].FirstHadVal)&&dataObj['ClassName'].IsEdited&&dataObj['ClassName'].CanUpdateTimes==1">
                    {{show.ClassName}}
                </div>
                <div class="item-mid" v-else>
                    <input type="text" maxlength="20" class="input" @input="regUsuaVal($event,'ClassName')"  v-model="show.ClassName"  placeholder="填写后不能再修改" v-if="dataObj['ClassName'].CanUpdateTimes==1">
                    <input type="text" maxlength="20" class="input" @input="regUsuaVal($event,'ClassName')"  v-model="show.ClassName" v-else>
                </div>
            </div>

            <div class="item" v-if="dataObj['Father']">
                <div class="item-left">父亲姓名<svg aria-hidden="true" class="icon spec" v-if="dataObj['Father'].Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                </svg></div>
                <div class="item-mid" v-if="(dataObj['Father'].FirstHadVal)&&dataObj['Father'].IsEdited&&dataObj['Father'].CanUpdateTimes==1">
                    {{show.Father}}
                </div>
                <div class="item-mid" v-else>
                    <input type="text" maxlength="20" class="input" @input="regUsuaVal($event,'Father')" v-model="show.Father"  placeholder="填写后不能再修改" v-if="dataObj['Father'].CanUpdateTimes==1">
                    <input type="text" maxlength="20" class="input" @input="regUsuaVal($event,'Father')" v-model="show.Father" v-else>
                </div>
            </div>

            <div class="item" v-if="dataObj['FatherTel']">
                <div class="item-left">父亲电话<svg aria-hidden="true" class="icon spec" v-if="dataObj['FatherTel'].Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                </svg></div>
                <div class="item-mid" v-if="(dataObj['FatherTel'].FirstHadVal)&&dataObj['FatherTel'].IsEdited&&dataObj['FatherTel'].CanUpdateTimes==1">
                    {{show.FatherTel}}
                </div>
                <div class="item-mid" v-else>
                    <input type="tel" maxlength="20" class="input" @input="regUsuaVal($event,'FatherTel')" v-model="show.FatherTel"  placeholder="填写后不能再修改" v-if="dataObj['FatherTel'].CanUpdateTimes==1">
                    <input type="tel" maxlength="20" class="input" @input="regUsuaVal($event,'FatherTel')" v-model="show.FatherTel" v-else>
                </div>
            </div>

            <div class="item" v-if="dataObj['FatherVocation']">
                <div class="item-left">父亲职业<svg aria-hidden="true" class="icon spec" v-if="dataObj['FatherVocation'].Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                </svg></div>
                <div class="item-mid" v-if="(dataObj['FatherVocation'].FirstHadVal)&&dataObj['FatherVocation'].IsEdited&&dataObj['FatherVocation'].CanUpdateTimes==1">
                    {{show.FatherVocation}}
                </div>
                <div class="item-mid" v-else>
                    <input type="text" maxlength="20" class="input" @input="regUsuaVal($event,'FatherVocation')" v-model="show.FatherVocation"  placeholder="填写后不能再修改" v-if="dataObj['FatherVocation'].CanUpdateTimes==1">
                    <input type="text" maxlength="20" class="input" @input="regUsuaVal($event,'FatherVocation')" v-model="show.FatherVocation" v-else>
                </div>
            </div>

            <div class="item" v-if="dataObj['Mother']">
                <div class="item-left">母亲姓名<svg aria-hidden="true" class="icon spec" v-if="dataObj['Mother'].Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                </svg></div>
                <div class="item-mid" v-if="(dataObj['Mother'].FirstHadVal)&&dataObj['Mother'].IsEdited&&dataObj['Mother'].CanUpdateTimes==1">
                    {{show.Mother}}
                </div>
                <div class="item-mid" v-else>
                    <input type="text" maxlength="20" class="input" @input="regUsuaVal($event,'Mother')" v-model="show.Mother"  placeholder="填写后不能再修改" v-if="dataObj['Mother'].CanUpdateTimes==1">
                    <input type="text" maxlength="20" class="input" @input="regUsuaVal($event,'Mother')" v-model="show.Mother" v-else>
                </div>
            </div>

            <div class="item" v-if="dataObj['MotherTel']">
                <div class="item-left">母亲电话<svg aria-hidden="true" class="icon spec" v-if="dataObj['MotherTel'].Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                </svg></div>
                <div class="item-mid" v-if="(dataObj['MotherTel'].FirstHadVal)&&dataObj['MotherTel'].IsEdited&&dataObj['MotherTel'].CanUpdateTimes==1">
                    {{show.MotherTel}}
                </div>
                <div class="item-mid" v-else>
                    <input type="tel" maxlength="20" class="input" @input="regUsuaVal($event,'MotherTel')"  v-model="show.MotherTel"  placeholder="填写后不能再修改" v-if="dataObj['MotherTel'].CanUpdateTimes==1">
                    <input type="tel" maxlength="20" class="input" @input="regUsuaVal($event,'MotherTel')"  v-model="show.MotherTel" v-else>
                </div>
            </div>

            <div class="item" v-if="dataObj['MotherVocation']">
                <div class="item-left">母亲职业<svg aria-hidden="true" class="icon spec" v-if="dataObj['MotherVocation'].Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                </svg></div>
                <div class="item-mid" v-if="(dataObj['MotherVocation'].FirstHadVal)&&dataObj['MotherVocation'].IsEdited&&dataObj['MotherVocation'].CanUpdateTimes==1">
                    {{show.MotherVocation}}
                </div>
                <div class="item-mid" v-else>
                    <input type="text" maxlength="20" class="input" @input="regUsuaVal($event,'MotherVocation')" v-model="show.MotherVocation"  placeholder="填写后不能再修改" v-if="dataObj['MotherVocation'].CanUpdateTimes==1">
                    <input type="text" maxlength="20" class="input" @input="regUsuaVal($event,'MotherVocation')" v-model="show.MotherVocation" v-else>
                </div>
            </div>

            <div class="filed-box"  v-for="(item,index) in fieldArr" :key="index">
                <div class="item" v-if="item.Name=='昵称'">
                    <div class="item-left">昵称<svg aria-hidden="true" class="icon spec" v-if="item.Required==1">
                        <use xlink:href="#icon-bitianxing"></use>
                    </svg></div>
                    <div class="item-mid" v-if="(item.FirstHadVal)&&item.IsEdited&&item.CanUpdateTimes==1">
                        {{item.Value}}
                    </div>
                    <div class="item-mid" v-else>
                        <input type="text" maxlength="20" class="input" @input="regVal($event,item)" v-model="item.Value"  placeholder="填写后不能再修改" v-if="item.CanUpdateTimes==1">
                        <input type="text" maxlength="20" class="input" @input="regVal($event,item)" v-model="item.Value" v-else>
                    </div>
                </div>
                <div class="item" v-if="item.Name=='微信号'">
                    <div class="item-left">微信号<svg aria-hidden="true" class="icon spec" v-if="item.Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                    </svg></div>
                    <div class="item-mid" v-if="(item.FirstHadVal)&&item.IsEdited&&item.CanUpdateTimes==1">
                        {{item.Value}}
                    </div>
                    <div class="item-mid" v-else>
                        <input type="text" maxlength="20" class="input" @input="regVal($event,item)" v-model="item.Value"  placeholder="填写后不能再修改" v-if="item.CanUpdateTimes==1">
                        <input type="text" maxlength="20" class="input" @input="regVal($event,item)" v-model="item.Value" v-else>
                    </div>
                </div>
                <div class="item" v-if="item.Name=='性格特点'" @click="selectCommon(item)">
                    <div class="item-left">性格特点<svg aria-hidden="true" class="icon spec" v-if="item.Required==1">
                    <use xlink:href="#icon-bitianxing"></use>
                    </svg></div>
                    <div class="item-mid">
                        {{item.Value}}
                    </div>
                    <div class="item-right" v-if="!((item.FirstHadVal)&&item.CanUpdateTimes==1&&item.IsEdited)">
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
                <div class="item" v-if="item.Name=='常规接送人'">
                    <div class="item-left">常规接送人<svg aria-hidden="true" class="icon spec" v-if="item.Required==1">
                        <use xlink:href="#icon-bitianxing"></use>
                    </svg></div>
                    <!--可填可选-->
                    <div class="item-mid">
                        <div v-if="!((item.FirstHadVal)&&item.CanUpdateTimes==1&&item.IsEdited)">
                            <input type="text" maxlength="20" class="spec-input" @input="regVal($event,item)" v-model="item.Value"  placeholder="填写后不能再修改" v-if="item.CanUpdateTimes==1">
                            <input type="text" maxlength="20" class="spec-input" @input="regVal($event,item)" v-model="item.Value" v-else>
                        </div>
                        <div class="" v-else>{{item.Value}}</div>
                    </div>
                    <div class="item-right" v-if="!((item.FirstHadVal)&&item.CanUpdateTimes==1&&item.IsEdited)" @click="selectCommon(item)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>

                <div class="item" v-if="item.Name!='昵称'&&item.Name!='微信号'&&item.Name!='性格特点'&&item.Name!='常规接送人'">
                    <div class="item-left">{{item.Name}}<svg aria-hidden="true" class="icon spec" v-if="item.Required==1">
                        <use xlink:href="#icon-bitianxing"></use>
                    </svg></div>
                    <div class="item-mid" v-if="(item.FirstHadVal)&&item.IsEdited&&item.CanUpdateTimes==1">
                        {{item.Value}}
                    </div>
                    <div class="item-mid" v-else>
                        <input type="text" maxlength="20" class="input" @input="regVal($event,item)" v-model="item.Value "  placeholder="填写后不能再修改" v-if="item.CanUpdateTimes==1">
                        <input type="text" maxlength="20" class="input" @input="regVal($event,item)" v-model="item.Value" v-else>
                    </div>
                </div>
            </div>

            <div class="void"></div>
        </scroller-base>
        <!--确定按钮-->
        <div class="footer" @click="submit">
            确定
        </div>

        <!--选择 性别 -->
        <xyx-sex
                class="xyx-sex"
                :opened.sync="sexOpen"
                @informationSex="acceptSex">
        </xyx-sex>

        <!--选择 公立学校 -->
        <xyx-school
                class="xyx-school"
                :opened.sync="schoolOpen"
                :list="FullSchoolList"
                @informationSchool="acceptSchool">
        </xyx-school>

        <!--选择 年级 -->
        <xyx-grade
                class="xyx-grade"
                :opened.sync="gradeOpen"
                :list="GradeList"
                @informationGrade="acceptGrade">
        </xyx-grade>

        <!-- 选择性格 -->
        <xyx-common
                class="xyx-Common"
                :opened.sync="commonOpen"
                :list="CommonList"
                @informationCommon="acceptCommon">
        </xyx-common>
        <!-- 接送人 -->

        <loading v-show="isLoading"></loading>
    </div>
</template>

<script>
    // 每次编辑成功200之后，emit触发改变展示内容，不调接口
    import {processGet, processPost, savePost} from 'parent/api/common';
    import XyxSex from './child/xyx-sex.vue';
    import XyxSchool from './child/xyx-school.vue';
    import XyxGrade from './child/xyx-grade.vue';
    import XyxCommon from './child/xyx-common.vue';
    export default {
        name: "xyx-personal-information",
        mixins: [app.mixin.popupWindowRouteMixin],
        data() {
            return {
                wxTitle: "个人信息",
                isLoading:true,
                refreshNum:0,
                userPhoto: '',//用户头像
                avatarTimer: null, //获取头像地址轮询
                CharacterList:[{name:'外向'},{name:'内向'},{name:'慢热'}],
                FetchList:[{name:'父母'},{name:'(外)祖母'},{name:'保姆'},{name:'亲戚'},{name:'朋友'}],
                CommonList:[],
                FullSchoolList:[],//公立学校列表
                GradeList:[],//年级列表

                show:{ //值
                    Name:'',
                    EnglishName:'',
                    Sex:'',
                    Birthday:'',
                    IDNumber:'',
                    SMSTel:'',
                    QQ:'',
                    OtherTel:'',
                    LivePlace:'',
                    FullTimeSchool:'',
                    Grade:{key:'',val:''},
                    ClassName:'',
                    Father:'',
                    FatherTel:'',
                    FatherVocation:'',
                    Mother:'',
                    MotherTel:'',
                    MotherVocation:'',

                },
                dataObj:{},//需要展示的项
                IsSetValue:[],//已经修改过的字段列表   ['FullTimeSchool','Mother'...]
                fieldArr:[],//自定义字段
                curFiledItem:{},


                sexOpen:false,//性别弹框开关
                schoolOpen:false,//公立学校弹框开关
                gradeOpen:false,//年级弹框开关
                commonOpen:false,//性格弹框开关
                fetchOpen:false,//常规接送人弹框开关
                reg:/[`#\$%&@\*<>\?:\"\{\}\/;'\[\\\]]/g,
            }
        },
        computed: {
            renderData() {
                return {
                    refreshNum: this.refreshNum
                }
            }
        },

        methods: {
            regVal(e,i){
                let val = e.target.value.replace(this.reg,'');
                i.Value = val;
            },
            regUsuaVal(e,name){
                let val = e.target.value.replace(this.reg,'');
                this.show[name] = val;
            },
            judgeIsEdited(item){
                // 当编辑过的项会在数组里，如果数组长度为0，说明没有编辑过，则所有项能编辑
                if(this.IsSetValue.length==0){
                    return false
                }else{
                    if(this.IsSetValue.indexOf(item.Field)==-1){
                        return false
                    }else{
                        return true
                    }
                }
            },
            judgeHadVal(item,data){
                if(data[item.Field]!=''){
                    return true
                }else{
                    return false
                }
            },
            initVal(data){
                this.show.Name=data.Name;
                this.show.EnglishName=data.EnglishName;
                this.show.Sex=data.Sex;
                this.show.Birthday=data.Birthday;
                this.show.IDNumber=data.IDNumber;
                this.show.SMSTel=data.SMSTel;
                this.show.QQ=data.QQ;
                this.show.OtherTel=data.OtherTel;
                this.show.LivePlace=data.LivePlace;
                this.show.FullTimeSchool=data.FullTimeSchool;

                this.show.Grade.key=data.Grade;
                this.show.Grade.val=data.GradeName;

                this.show.ClassName=data.ClassName;
                this.show.Father=data.Father;
                this.show.FatherTel=data.FatherTel;
                this.show.FatherVocation=data.FatherVocation;
                this.show.Mother=data.Mother;
                this.show.MotherTel=data.MotherTel;
                this.show.MotherVocation=data.MotherVocation;



            },
            loadAll() {
                let loadPara = processPost({pname: 'dictionary'}).then(res => {
                    return res
                }), loadData = processGet({pname: 'parentAccount'}).then(res => {
                    return res
                });

                Promise.all([loadPara, loadData]).then(res => {

                    this.isLoading = false;
                    if (res[0].errcode == app.errok && res[1].errcode == app.errok) {
                        // //公立学校 年级 列表
                        this.FullSchoolList = res[0].data.FullSchool;
                        this.GradeList = res[0].data.Grade;

                        // //头像
                        this.userPhoto = res[1].data.UserPhoto;

                        //只能修改一次的数组
                        this.IsSetValue = res[1].data.IsSetValue;

                        if(res[1].data.Birthday!=''){
                            res[1].data.Birthday = app.filters.formatDatetime(res[1].data.Birthday,'yyyy-MM-dd');
                        }


                        res[1].data.CustomerForm.forEach(item=>{
                            item.IsEdited = this.judgeIsEdited(item);
                            item.FirstHadVal = this.judgeHadVal(item,res[1].data);
                            this.dataObj[item.Field] = item;

                            if(item.Field.indexOf('Field')!=-1){
                                this.$set(item,'Value',res[1].data[item.Field]);//初始化值
                                item.FirstHadVal = res[1].data[item.Field]==''?false:true;
                                this.fieldArr.push(item);
                            }
                        });

                        this.initVal(res[1].data);//赋值

                        this.refreshNum++;

                        // console.log(this.dataObj)
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
            },
            //公历生日
            selectBirthday(){
                if((this.dataObj['Birthday'].FirstHadVal)&&this.dataObj['Birthday'].CanUpdateTimes==1&&this.dataObj['Birthday'].IsEdited){
                    return
                }else{
                    app.datetimePicker({format: 'YYYY-MM-DD',minYear:1970}).then(res => {
                        this.show.Birthday = res;
                    })
                }

            },
            //选择性别
            selectSex(){
                if((this.dataObj['Sex'].FirstHadVal)&&this.dataObj['Sex'].CanUpdateTimes==1&&this.dataObj['Sex'].IsEdited){
                    return
                }else{
                    this.sexOpen = !this.sexOpen;
                }
            },
            // 接收性别选择
            acceptSex(sex){
                this.show.Sex = sex;
            },

            //选择公立学校
            selectSchool(){
                if((this.dataObj['FullTimeSchool'].FirstHadVal)&&this.dataObj['FullTimeSchool'].CanUpdateTimes==1&&this.dataObj['FullTimeSchool'].IsEdited){
                    return
                }else{
                    this.schoolOpen = !this.schoolOpen;
                }
            },
            //接收公立学校
            acceptSchool(school){
                this.show.FullTimeSchool = school;
            },

            //选择年级
            selectGrade(){
                if((this.dataObj['Grade'].FirstHadVal)&&this.dataObj['Grade'].CanUpdateTimes==1&&this.dataObj['Grade'].IsEdited){
                    return
                }else{
                    this.gradeOpen = !this.gradeOpen;
                }
            },
            //接收年级
            acceptGrade(grade){
                this.show.Grade.val = grade.val;
                this.show.Grade.key = grade.key;
            },

            //选择性格||接送人
            selectCommon(item){
                if(item.Name=='性格特点'){
                    this.CommonList = this.CharacterList;
                }else{
                    this.CommonList = this.FetchList;
                }
                this.curFiledItem = item;
                if((item.FirstHadVal)&&item.CanUpdateTimes==1&&item.IsEdited){
                    return
                }else{
                    this.commonOpen = !this.commonOpen;
                }
            },
            acceptCommon(val){
                this.curFiledItem.Value = val;
            },

            // 提交
            submit(){
                let regExpPhoneNum=/^1\d{10}$/;//电话号码
                
                let regExpIdNum=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;//二代身份证号码为18位，18位前17位为数字，最后一位是校验位，可能为数字或字符

                // 必填项判断
                if(this.dataObj.Name&&this.dataObj.Name.Required==1&&app.tool.trim(this.show.Name)==''){
                    app.toast('info', '请填写姓名')
                    return
                }
                if(this.dataObj.EnglishName&&this.dataObj.EnglishName.Required==1&&app.tool.trim(this.show.EnglishName)==''){
                    app.toast('info', '请填写英文名')
                    return
                }
                if(this.dataObj.Sex&&this.dataObj.Sex.Required==1&&app.tool.trim(this.show.Sex)==''){
                    app.toast('info', '请选择性别')
                    return
                }
                if(this.dataObj.Birthday&&this.dataObj.Birthday.Required==1&&app.tool.trim(this.show.Birthday)==''){
                    app.toast('info', '请选择公历生日')
                    return
                }
                if(this.dataObj.IDNumber&&this.dataObj.IDNumber.Required==1){
                    if(app.tool.trim(this.show.IDNumber)==''){
                        app.toast('info', '请填写身份证号码')
                        return
                    }
                    if(!regExpIdNum.test(app.tool.trim(this.show.IDNumber))){
                        app.toast('info', '请填写正确的身份证号码')
                        return
                    }
                }else{
                    if(this.dataObj.IDNumber&&app.tool.trim(this.show.IDNumber)!=''){
                        if(!regExpIdNum.test(app.tool.trim(this.show.IDNumber))){
                            app.toast('info', '请填写正确的身份证号码')
                            return
                        }
                    }
                }

                if(this.dataObj.SMSTel&&this.dataObj.SMSTel.Required==1){
                    if(app.tool.trim(this.show.SMSTel)==''){
                        app.toast('info', '请填写手机号码')
                        return
                    }
                    if(!regExpPhoneNum.test(app.tool.trim(this.show.SMSTel))){
                        app.toast('info', '请填写正确的手机号码')
                        return
                    }
                }else{
                    if(this.dataObj.SMSTel&&app.tool.trim(this.show.SMSTel)!=''){
                        if(!regExpPhoneNum.test(app.tool.trim(this.show.SMSTel))){
                            app.toast('info', '请填写正确的手机号码')
                            return
                        }
                    }
                }

                if(this.dataObj.QQ&&this.dataObj.QQ.Required==1&&app.tool.trim(this.show.QQ)==''){
                    app.toast('info', '请填写QQ')
                    return
                }

                if(this.dataObj.OtherTel&&this.dataObj.OtherTel.Required==1){
                    if(app.tool.trim(this.show.OtherTel)==''){
                        app.toast('info', '请填写其他联系电话')
                        return
                    }
                    if(!regExpPhoneNum.test(app.tool.trim(this.show.OtherTel))){
                        app.toast('info', '请填写正确的其他联系电话')
                        return
                    }
                }else{
                    if(this.dataObj.OtherTel&&app.tool.trim(this.show.OtherTel)!=''){
                        if(!regExpPhoneNum.test(app.tool.trim(this.show.OtherTel))){
                            app.toast('info', '请填写正确的其他联系电话')
                            return
                        }
                    }
                }

                if(this.dataObj.LivePlace&&this.dataObj.LivePlace.Required==1&&app.tool.trim(this.show.LivePlace)==''){
                    app.toast('info', '请填写家庭住址')
                    return
                }

                if(this.dataObj.FullTimeSchool&&this.dataObj.FullTimeSchool.Required==1&&app.tool.trim(this.show.FullTimeSchool)==''){
                    app.toast('info', '请选择公立学校')
                    return
                }
                if(this.dataObj.Grade&&this.dataObj.Grade.Required==1&&app.tool.trim(this.show.Grade.val)==''){
                    app.toast('info', '请选择年级')
                    return
                }
                if(this.dataObj.ClassName&&this.dataObj.ClassName.Required==1&&app.tool.trim(this.show.ClassName)==''){
                    app.toast('info', '请填写班级名称')
                    return
                }

                if(this.dataObj.Father&&this.dataObj.Father.Required==1&&app.tool.trim(this.show.Father)==''){
                    app.toast('info', '请填写父亲姓名')
                    return
                }

                if(this.dataObj.FatherTel&&this.dataObj.FatherTel.Required==1){
                    if(app.tool.trim(this.show.FatherTel)==''){
                        app.toast('info', '请填写父亲电话')
                        return
                    }
                    if(!regExpPhoneNum.test(app.tool.trim(this.show.FatherTel))){
                        app.toast('info', '请填写正确的父亲电话')
                        return
                    }
                }else{
                    if(this.dataObj.FatherTel&&app.tool.trim(this.show.FatherTel)!=''){
                        if(!regExpPhoneNum.test(app.tool.trim(this.show.FatherTel))){
                            app.toast('info', '请填写正确的父亲电话')
                            return
                        }
                    }
                }

                if(this.dataObj.FatherVocation&&this.dataObj.FatherVocation.Required==1&&app.tool.trim(this.show.FatherVocation)==''){
                    app.toast('info', '请填写父亲职业')
                    return
                }

                // 这里应该是Mother
                if(this.dataObj.Mother&&this.dataObj.Mother.Required==1&&app.tool.trim(this.show.Mother)==''){
                    app.toast('info', '请填写母亲姓名')
                    return
                }

                if(this.dataObj.MotherTel&&this.dataObj.MotherTel.Required==1){
                    if(app.tool.trim(this.show.MotherTel)==''){
                        app.toast('info', '请填写母亲电话')
                        return
                    }
                    if(!regExpPhoneNum.test(app.tool.trim(this.show.MotherTel))){
                        app.toast('info', '请填写正确的母亲电话')
                        return
                    }
                }else{
                    if(this.dataObj.MotherTel&&app.tool.trim(this.show.MotherTel)!=''){
                        if(!regExpPhoneNum.test(app.tool.trim(this.show.MotherTel))){
                            app.toast('info', '请填写正确的母亲电话')
                            return
                        }
                    }
                }

                if(this.dataObj.MotherVocation&&this.dataObj.MotherVocation.Required==1&&app.tool.trim(this.show.MotherVocation)==''){
                    app.toast('info', '请填写母亲职业')
                    return
                }

                let fieldparams={};
                for(let i = 0; i < this.fieldArr.length; i++){
                    if(this.fieldArr[i].Required==1&&app.tool.trim(this.fieldArr[i].Value)==''){
                        app.toast('info',`请填写${this.fieldArr[i].Name}`)
                        return
                    }
                    fieldparams[this.fieldArr[i].Field] = this.fieldArr[i].Value;
                }


                let params={
                    Name:'',
                    EnglishName:'',
                    Sex:'',
                    Birthday:'',
                    IDNumber:'',
                    SMSTel:'',
                    QQ:'',
                    OtherTel:'',
                    LivePlace:'',
                    FullTimeSchool:'',
                    Grade:'',
                    ClassName:'',
                    Father:'',
                    FatherTel:'',
                    FatherVocation:'',
                    Mother:'',
                    MotherTel:'',
                    MotherVocation:'',
                };

                    params.Name=this.show.Name;
                    params.EnglishName=this.show.EnglishName;
                    params.Sex=this.show.Sex=='男'?1:2;
                    params.Birthday=this.show.Birthday;
                    params.IDNumber=this.show.IDNumber;
                    params.SMSTel=this.show.SMSTel;
                    params.QQ=this.show.QQ;
                    params.OtherTel=this.show.OtherTel;
                    params.LivePlace=this.show.LivePlace;
                    params.FullTimeSchool=this.show.FullTimeSchool;
                    params.Grade=this.show.Grade.key;
                    params.ClassName=this.show.ClassName;
                    params.Father=this.show.Father;
                    params.FatherTel=this.show.FatherTel;
                    params.FatherVocation=this.show.FatherVocation;
                    params.Mother=this.show.Mother;
                    params.MotherTel=this.show.MotherTel;
                    params.MotherVocation=this.show.MotherVocation;

                Object.assign(params, fieldparams);
                this.send(params)
            },
            send(para){
                para.SaveFlag='modifiedPersonalInfo';
                savePost(para).then(res => {
                    if (res.errcode == app.errok) {
                        app.toast('success','修改成功');

                        if(this.$route.params.flag==1){
                            this.$router.replace('/home/0');
                        }else{
                            this.$router.back();
                        }

                    }else if(res.errmsg='没有任何内容需要修改'){
                        app.toast('info', res.errmsg)
                    } else {
                        app.toast('error', res.errmsg)
                    }
                })
            }
        },
        created() {
            this.loadAll();
        },
        components: {
            XyxSex,
            XyxSchool,
            XyxGrade,
            XyxCommon,
        }
    }
</script>

