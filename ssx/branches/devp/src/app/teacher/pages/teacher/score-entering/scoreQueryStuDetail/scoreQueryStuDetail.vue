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
            // @include position-absolute(80px 0 44px 0);
            @include position-absolute(80px,0,44px,0);
            .item-wrapper {
                .subject {
                    height: 44px;
                    @include flex-between;
                    background-color: $color-white;
                    padding: 0 15px;
                    font-size: 15px;
                    justify-content: flex-start;
                    .subject-name {
                        // width: 40px;
                        max-width: 120px;
                        color: #000000;
                        margin-right: 10px;
                        @include ellipsis-single;
                    }
                    .input {
                        flex: 1;
                        // width: 60px;
                        outline: none;
                    }
                    .sepc {
                        color: $color-primary;
                    }
                    .input:disabled {
                        opacity: 1;
                        background-color: #fff;
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
                    flex: 1;
                    .textarea {
                        width: 100%;
                        height: 100%;
                        padding: 2px 15px 0 15px;
                        color: $color-3;
                    }
                    .textarea[disabled] {
                        background-color: $color-white;
                    }
                }
            }
            .select-class {
                height: 44px;
                font-size: 15px;
                padding: 0 15px;
                @include flex-between;
                background-color: $color-white;
                .text {
                    color: #000000;
                    width: 70px;
                }
                .class-name {
                    flex: 1;
                    color: #474747;
                    text-align: right;
                }
                .icon-wrapper {
                    width: 20px;
                }
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
        .bottom1 {
            @include position-absolute(false, 0, 0, 0);
            @include flex-between;
            height: 49px;
            padding-right: 14px;
            justify-content: flex-end;
            background-color: $color-white;
            .cancle, .sure {
                height: 28px;
                line-height: 28px;
                width: 93px;
                text-align: center;
                font-size: 15px;
                border-radius: 50px;
            }
            .cancle {
                border: 1px solid $color-primary;
                margin-right: 20px;
                color: $color-primary;
            }
            .sure {
                background-color: $color-primary;
                color: $color-white;
            }
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
                   
                    <input class="input sepc" maxlength="6" type="text"  v-model="item.Score" :disabled="!isEdit" ref="input">
                </div>
                <div class="void"></div>
            </div>
            <div class="beizhu">
                <div class="text">备注</div>
                <div class="textarea-wrapper">
                    <textarea 
                        :disabled="!isEdit" 
                        class="textarea" 
                        placeholder="最多输入200个字符" 
                        maxlength="200" 
                        v-model="beizhuText"
                        @touchstart="app.area.start($event)"
                        @touchmove="app.area.move($event)"
                        @touchend="app.area.end($event)">
                        
                    </textarea>
                    <!-- <div class="textarea" v-if="!isEdit">{{detail.Memo||'最多输入200字'}}</div> -->
                </div>
            </div>
            <div class="void"></div>
        </scroller-base>
        <div class="bottom" @click="editScore" v-if="!isEdit&&app.tool.op('ExamScoreEdit')">编辑</div>
        <div class="bottom1" v-if="isEdit&&app.tool.op('ExamScoreEdit')">
            <div class="cancle" @click="cancle">取消</div>
            <div class="sure" @click="submit">确定</div>
        </div>
    </div>
</template>

<script>
    import {PostAndPutScore} from 'teacher/api/score'
    export default {
        data() {
            return {
                wxTitle: "成绩录入",
                detail: {},
                beizhuText: '',
                type: null,
                isEdit: false,

                examName: app.ls.get('curExamObj').name || ''
            }
        },
        methods: {
            editScore() {
                this.isEdit = true
                this.$nextTick(() => {
                    if (this.$refs.input[0]) this.$refs.input[0].focus()
                })
            },
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
                                ClassID: this.detail.ClassID,
                                FullName: this.detail.FullName,
                                Memo: this.beizhuText,
                                Scores: tempArr,
                                OldClassId: this.detail.ClassID
                            }]
                        ),
                    examID: this.$route.params.examid
                }
                PostAndPutScore(params).then(res => {
                    if (res.ErrorCode === app.errok) {
                        app.event.emit('saveStuScope')
                        this.$router.go(-1)
                    }
                })
            },
            cancle() {
                this.isEdit = false
                this.beizhuText = this.detail.Memo
                this.detail = app.ls.get('scoreQueryStudentDetail')
            }
        },
        created() {
            window.a = this
            this.detail = app.ls.get('scoreQueryStudentDetail')
            this.beizhuText = this.detail.Memo
        },
        destroyed() {
        }
    }
</script>