<!--学员成绩列表-->
<style scoped lang="scss">
    
    

    .score-query-student {
        background-color: $color-white;
        .header {
            padding: 0 12px;
            height: 40px;
            line-height: 40px;
            font-size: 13px;
            text-align: center;
            background-color: $color-white;
            display: flex;
            .tab {
                width: 33%;
            }
        }
        .scroller {
            @include position-absolute(50px,0,0,0);
            .card {
                // min-height: 44px;
                color: $color-3;
                font-size: 14px;
                line-height: 14px;
                background-color: $color-white;
                @include border-bottom;
                display: flex;
                .middle {
                    padding: 12px 5px 12px 12px;
                    width: 33.33%;
                    align-items: center;
                }
                .last {
                    padding: 12px;
                }
                .center {
                    width: 100%;
                    min-height: 16px;
                    margin: auto;
                }
                .name {
                    display: flex;
                    .serial {
                        color: $color-9;
                        font-size: 11px;
                        @include ellipsis-single;
                    }
                }
                .score-area {
                    color: $color-6;
                    padding: 12px 5px;
                    display: flex;
                    .score-list {
                        .center-item {
                            display: flex;
                        }
                        .score-name {
                            width: 54px;
                            text-align: right;
                            .sub-name{
                                margin:4px 0;
                                padding-right: 2px;
                                @include ellipsis-single;
                                &:first-child{
                                    margin-top: 0;
                                }
                                &:last-child{
                                    margin-bottom: 0;
                                }
                            }

                        }
                        .score-box{
                            width: 46px;
                            text-align: left;
                            .score{
                                color: $color-primary;
                                margin: 4px 0;
                                padding-left: 2px;
                                &:first-child{
                                    margin-top: 0;
                                }
                                &:last-child{
                                    margin-bottom: 0;
                                }
                            }
                        }
                    }
                }
                .remark {
                    display: flex;
                    .center{
                        text-align: right;
                        @include ellipsis-single;
                    }
                }
            }
        }
        .void {
            height: 10px;
            background-color: $color-assist-1;
            width: 100%;
        }
    }
</style>

<template>
    <div class="score-query-student">
        <div class="header">
            <div class="tab">姓名</div>
            <div class="tab">成绩</div>
            <div class="tab">备注</div>
        </div>
        <div class="void"></div>
        <scroller-base class="scroller" :data="list">
            <div>
                <div @click="goToDetail(card)" class="card" v-for="(card,index) in list" :key="index">
                    <div class="name middle">
                        <div class="center">
                            {{card.FullName}}
                            <div class="serial">{{card.Serial}}</div>
                        </div>
                    </div>
                    <div class="score-area middle">
                        <div class="center score-list" >
                            <div class="center-item" v-for="score in card.Scores">
                                <div class="score-name">
                                    <div class="sub-name">
                                        {{score.SubjectName}}
                                    </div>
                                </div>
                                <div class="score-box">
                                    <div class="score">
                                        {{score.Score}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="remark middle last">
                        <div class="center">
                            {{card.Memo}}
                        </div>
                        <div>
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </scroller-base>
        <empty-page class="noData-temp" v-if="list.length == 0" :type="1" text="还没有学员噢~"></empty-page>
        <loading class="loading" v-show="isLoading"></loading>
    </div>
</template>

<script>
    import {getScoreQueryStudent} from "teacher/api/score.js";
    import EmptyPage from 'teacher/components/common/empty-page/empty-page.vue';

    export default {
        name: "score-query-student",
        data() {
            return {
                wxTitle: "学员成绩查询",
                isLoading: true,
                list: []
            }
        },
        computed: {},
        methods: {
            getData(para) {
                getScoreQueryStudent(para).then(res => {
                    this.isLoading = false;
                    if (res.ErrorCode == app.errok) {
                        this.list = res.Data;
                    }
                })
            },
            goToDetail(card){
                app.ls.setStorage('scoreQueryStudentDetail', card);
                this.$router.push({path: `/scoreQueryStuDetail/${this.$route.params.examid}`});
            }
        },
        created() {
            let para = {
                examId: this.$route.params.examid,
                classId: this.$route.params.classid
            }
            this.getData(para)
            app.event.on('saveStuScope', () => {
                this.getData(para)
            })
        },
        destroyed() {
            app.event.off('saveStuScope')
        },
        components: {EmptyPage}
    }
</script>

