<style scoped lang="scss">
    
    
    .wrapper {
        @include position-absolute;
        background-color: $color-assist-1;
        .top {
            height: 80px;
            background-color: $color-assist-1;
            font-size: 15px;
            .exam-name {
                margin-top: 20px;
                color: $color-9;
                text-align: center;
            }
            .stu-name {
                color: $color-3;
                text-align: center;
                margin-top: 10px;
            }
        }
        .scroller {
            @include position-absolute(80px, 0, 44px, 0);
        }
        .item-wrapper {
            .subject {
                min-height: 44px;
                @include flex-between;
                justify-content: flex-start;
                background-color: $color-white;
                font-size: 15px;
                .subject-name {
                    max-width: 200px;
                    padding: 15px;
                    color: #000000;
                    margin-right: 10px;
                }
                .input {
                    color: #BBBBBB;
                    // width: 100px;
                    flex: 1;
                    height: 44px;
                    outline: none;
                }
                .sepc {
                    color: $color-primary;
                }
            }
        }
        .void {
            height: 10px;
            background-color: $color-assist-1;
        }
        .beizhu {
            height: 100px;
            padding: 15px;
            font-size: 15px;
            background-color: $color-white;
            display: flex;
            .text {
                width: 30px;
                color: #000000;
            }
            .textarea-wrapper {
                padding-top: 2px;
                flex: 1;
                .textarea {
                    width: 100%;
                    height: 100%;
                    color: $color-3;
                }
            }
        }
        .select-class {
            // height: 44px;
            font-size: 15px;
            padding: 15px;
            // @include flex-between;
            display: flex;
            align-items: center;
            background-color: $color-white;
            .text {
                font-size: 14px;
                color: #000000;
                width: 70px;
            }
            .class-name {
                flex: 1;
                min-height: 20px;
                color: #474747;
                text-align: right;
            }
            .icon-wrapper {
                width: 20px;
            }
        }
        .bottom {
            @include position-absolute(false, 0, 0, 0);
            height: 44px;
            line-height: 44px;
            background-color: $color-primary;
            color: $color-white;
            text-align: center;
            font-size: 16px;
        }
        .as-campus {
            @include position-absolute;
            z-index: 2;
        }
    }
</style>

<template>
    <div class="wrapper">
        <div class="top">
            <div class="exam-name">考试名称:{{examName}}</div>
            <div class="stu-name">{{detail.FullName}}的成绩</div>
        </div>
        <scroller-base class="scroller" :data="detail">
            <div class="item-wrapper" v-for="item in detail.Scores">
                <div class="subject">
                    <div class="subject-name">{{item.SubjectName}}</div>
                    <input class="input sepc" maxlength="6"  v-model="item.Score">
                </div>
                <div class="void"></div>
            </div>
            <div class="beizhu">
                <div class="text">备注</div>
                <div class="textarea-wrapper">
                    <textarea class="textarea" 
                        placeholder="最多输入200个字符" 
                        maxlength="200" 
                        v-model="beizhuText"
                        @touchstart="app.area.start($event)"
                        @touchmove="app.area.move($event)"
                        @touchend="app.area.end($event)">
                            
                    </textarea>
                </div>
            </div>
            <div class="void"></div>
            <div class="select-class" v-if="type===1">
                <div class="text">选择班级</div>
                <div class="class-name" @click="showSelectClass=true">{{classObj.Name}}</div>
                <div class="icon-wrapper" @click="showSelectClass=true">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
        </scroller-base>
        <div class="bottom" @click="submit" v-if="app.tool.op('ExamScoreEdit')">确认提交</div>
        <!-- 选择班级 -->
        <select-class
            class="as-campus"
            :opened.sync="showSelectClass"
            :classObj="classObj"
            :studentId="app.ls.get('stuScopeDetail').StudentID||''"
            @selectClassDone="selectClassDone"></select-class>
    </div>
</template>

<script>
    import {PostAndPutScore} from 'teacher/api/score'
    import SelectClass from '../selectClass.vue';
    export default {
        data() {
            return {
                wxTitle: "录入成绩",
                detail: {},
                beizhuText: '',
                type: null,

                showSelectClass: false,
                classObj: {},
                examName: app.ls.get('curExamObj').name || ''
                
            }
        },
        methods: {
            submit() {
                let reg = reg = /(?:^\d{1,8}\.\d{0,2}$)|(?:^\d{0,8}$)/
                for (let i = 0; i < this.detail.Scores.length; i++) {
                    let scope = this.detail.Scores[i].Score
                    if (!reg.test(scope)) {
                        app.toast('info', `${this.detail.Scores[i].SubjectName}成绩格式错误`)
                        return
                    }
                }
                let tempArr = this.detail.Scores.map(obj => {
                    return {
                        Score: obj.Score,
                        SubjectID: obj.SubjectID
                    }
                })
                let params = {
                    data : JSON.stringify(
                            [{
                                StudentID: this.detail.StudentID,
                                ClassID: this.type == 1 ? this.classObj.ID : this.detail.ClassID,
                                FullName: this.detail.FullName,
                                Memo: this.beizhuText,
                                Scores: tempArr,
                                OldClassId: this.detail.ClassID
                            }]
                        ),
                    examID: app.ls.get('curExamObj').id
                }
                PostAndPutScore(params).then(res => {
                    if (res.ErrorCode === app.errok) {
                        app.toast('success', '录入成绩成功')
                        setTimeout(() => {
                            app.event.emit('saveStuScope')
                        }, 300)
                        this.$router.go(-1)
                    }
                })
            },
            selectClassDone(obj) {
                this.classObj = obj
                this.showSelectClass = false
            }
        },
        created() {
            this.detail = app.ls.get('stuScopeDetail')
            this.beizhuText = this.detail.Memo
            this.type = app.ls.get('type')
            if (this.type === 1) {
                this.classObj.Name = this.detail.ClassName
                this.classObj.ID = this.detail.ClassID 
            }
        },
        destroyed() {
        },
        components: {
            SelectClass
        }
    }
</script>