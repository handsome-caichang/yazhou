<style scoped lang="scss">
    
    
    .wrapper {
        .header-wrapper {
            height: 49px;
            @include flex-between;
            font-size: 15px;
            padding: 0 15px;
            .header {
                flex: 1;
                height: 29px;
                line-height: 29px;
                display: flex;
                .header-left, .header-right {
                    flex: 1;
                    border: 1px solid $color-primary;
                    color: $color-primary;
                    text-align: center;
                }
                .active {
                    background-color: $color-primary;
                    color: $color-white;
                }
            }
        }
        .void {
            height: 10px;
            background-color: $color-assist-1;
        }
        .title {
            height: 40px;
            border-bottom: 1px solid $color-assist-1;
            font-size: 13px;
            color: $color-9;
            @include flex-between;
            padding: 0 15px;
            .name, .scope, .beiju {
                flex: 1;
                text-align: center;
            }
        }
        .scroll {
            @include position-absolute(99px, 0, 0, 0);
            .card {
                padding: 8px 15px;
                @include flex-between;
                border-bottom: 1px solid $color-assist-1;
                .name-wrapper {
                    flex: 1;
                    .name {
                        text-align: center;
                        font-size: 15px;
                        color: $color-3;
                        text-align: left;
                    }
                    .number {
                        text-align: center;
                        font-size: 11px;
                        color: $color-9;
                        text-align: left;
                    }
                }
                .scope-wrapper {
                    width: 33%;
                    margin: 0 auto;
                    .subject-score {
                        margin-bottom: 10px;
                        font-size: 14px;
                        display: flex;
                        &:last-child {
                            margin-bottom: 0;
                        }
                        .list-wrapper {
                            max-width: 100%;
                            display: table;
                            margin: auto;
                            display: flex;
                            line-height: 14px;
                            text-align: right;
                            .sub-name {
                                color: $color-6;
                                margin-right: 10px;
                                @include ellipsis-single;
                                flex: 1;
                            }
                            .scope {
                                color: $color-primary;
                                // flex: 1;
                            }
                        }
                        
                    }
                }
                .beiju-wrapper {
                    width: 33%;
                    @include flex-between;
                    .beiju {
                        width: 100%;
                        text-align: right;
                        @include ellipsis-single;
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="wrapper">
        <div class="header-wrapper">
            <div class="header">
                <div class="header-left" :class="{active: activeIndex==1}" @click="changeList(1)">未录入</div>
                <div class="header-right" :class="{active: activeIndex==2}" @click="changeList(2)">已录入</div>
            </div>
        </div>
        <div class="void"></div>
        <div class="title">
            <div class="name">姓名</div>
            <div class="scope">成绩</div>
            <div class="beiju">备注</div>
        </div>
        <scroller-base class="scroll" :data="computedList">
            <div class="card" v-for="(card, index) in computedList" @click="jumpRouter(card)" :key="index">
                <div class="name-wrapper">
                    <div class="name">{{card.FullName}}</div>
                    <div class="number">{{card.Serial}}</div>
                </div>
                <div class="scope-wrapper">
                    <div class="subject-score" v-for="sub in card.Scores">
                        <div class="list-wrapper">
                            <div class="sub-name">{{sub.SubjectName}}</div>
                            <div class="scope">{{sub.Score}}</div>
                        </div>
                    </div>
                </div>
                <div class="beiju-wrapper">
                    <div class="beiju">{{card.Memo}}</div>
                    <div>
                        <svg aria-hidden="true" class="icon">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </scroller-base>
    </div>
</template>

<script>
    import {getClassStuScope, GetStudentScore} from 'teacher/api/score'
    export default {
        data() {
            return {
                wxTitle: "成绩录入",
                activeIndex: 1,
                notImportList: [],
                hasImportList: []
            }
        },
        computed: {
            computedList() {
                return this.activeIndex == 1 ? this.notImportList : this.hasImportList
            }
        },
        methods: {
            changeList(num) {
                this.activeIndex = num
            },
            getData1() {
                let params = {
                    examId: app.ls.get('curExamObj').id,
                    classId: app.ls.get('classId')
                }
                getClassStuScope(params).then(res => {
                    if (res.ErrorCode == app.errok) {
                        this.notImportList = res.Data.filter(obj => obj.IsFlags === 0)
                        this.hasImportList = res.Data.filter(obj => obj.IsFlags === 1)
                    }
                })
            },
            getData2() {
                let params = {
                    examID: app.ls.get('curExamObj').id,
                    studentID: app.ls.get('studentID'),
                    classID: '',
                    flags: 1
                }
                GetStudentScore(params).then(res => {
                    if (res.ErrorCode == app.errok) {
                        this.notImportList = res.Data.filter(obj => obj.IsFlags === 0)
                        this.hasImportList = res.Data.filter(obj => obj.IsFlags === 1)
                    }
                })
            },
            jumpRouter(obj) {
                app.ls.set('stuScopeDetail', obj)
                this.$router.push('/scoreImportStuDetail')
            }
        },
        created() {
            if (app.ls.get('type') === 0) {
                this.getData1()
            } else {
                this.getData2()
            }
            app.event.on('saveStuScope', () => {
                if (app.ls.get('type') === 0) {
                    this.getData1()
                } else {
                    this.getData2()
                }
            })
        },
        destroyed() {
            app.event.off('saveStuScope')
        }
    }
</script>