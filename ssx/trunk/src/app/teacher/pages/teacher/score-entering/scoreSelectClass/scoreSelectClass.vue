<style scoped lang="scss">
    
    
    .wrapper {
        .header {
            height: 44px;
            padding: 0 15px;
            @include flex-between;
            .input {
                flex: 1;
                height: 28px;
                padding: 8px 38px 8px 10px;
                font-size: 13px;
                color: #AAAAAA;
                border-radius: 50px;
                border: 1px solid #EEF1F6;
                outline: none;
            }
            .search {
                margin-left: -30px;
                height: 28px;
                line-height: 28px;
                width: 50px;
                border-radius: 50px;
                text-align: center;
                background-color: #EEF1F6;
                color: $color-6;
            }
        }
        .void {
            height: 10px;
            background-color: $color-assist-1;
        }
        .title {
            height: 40px;
            border-bottom: 1px solid $color-assist-1;
            padding: 0 15px;
            @include flex-between;
            font-size: 13px;
            color: $color-9;
            .icon-wrapper {
                width: 20px;
            }
            .class-name {
                width: 100px;
                margin-right: 10px;
            }
            .teacher {
                width: 60px;
                margin-right: 10px;
            }
            .num {
                width: 40px;
                margin-right: 10px;
            }
            .date {
                width: 80px;
            }
        }
        .card {
            border-bottom: 1px solid $color-assist-1;
            padding: 0 15px;
            @include flex-between;
        }
        .scroll {
            @include position-absolute(94px, 0, 49px, 0);
            background-color: $color-white;
            .card {
                padding: 14px 15px;
                .icon-wrapper {
                    width: 20px;
                    font-size: 18px;
                }
                .class-name {
                    color: $color-3;
                    font-size: 14px;
                    width: 100px;
                    padding-right: 10px;
                    word-break: break-word;
                }
                .teacher {
                    width: 60px;
                    padding-right: 10px;
                    word-break: break-word;
                }
                .num {
                    width: 60px;
                    text-align: right;
                    padding-right: 10px;
                    .spec {
                        color: $color-primary;
                    }
                }
                .date {
                    width: 80px;
                }
            }
        }
        .bottom {
            @include position-absolute(false, 0, 0, 0);
            height: 49px;
            line-height: 49px;
            font-size: 16px;
            background-color: $color-primary;
            text-align: center;
            color: $color-white;
        }
    }
</style>

<template>
    <div class="wrapper">
        <div class="header">
            <input  class="input" placeholder="输入班级名称" v-model="classText">
            <div class="search" @click="searchClass">
                搜索
            </div>
        </div>
        <div class="void"></div>
        <div class="title">
            <div class="icon-wrapper"></div>
            <div class="class-name">班级名称</div>
            <div class="teacher">任课老师</div>
            <div class="num">人数</div>
            <div class="date">开班日期</div>
        </div>
        <scroller-super
            class="scroll"
            ref="scroll"
            :type="2"
            :data="list"
            :pagingOption="pagingOption"
            @loadData="loadData">
            <div>
                <div class="card" v-for="card in list" @click="selectClass(card)">
                    <div class="icon-wrapper">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="card.isSelect?'#icon-danxuan':'#icon-danxuan-weixuanze'"></use>
                        </svg>
                    </div>
                    <div class="class-name">{{card.Name}}</div>
                    <div class="teacher">{{card.TeacherName}}</div>
                    <div class="num"><span class="spec">{{card.StudentCount}}/</span>{{card.MaxStudentsAmount}}</div>
                    <div class="date">{{card.OpenDate}}</div>
                </div>        
            </div>
        </scroller-super>
        <div class="bottom" @click="jumpToStuList">确定</div>
    </div>
</template>

<script>
    import {getClassName} from 'teacher/api/score'
    export default {
        data() {
            return {
                wxTitle: "选择班级",
                pagingOption: {
                    api: getClassName,
                    params: {
                        campus: app.ls.get('curCampusObj').id,
                        countStudents: 1,
                        sort: 'Name'
                    }
                },
                list: [],
                classText: ''
            }
        },
        computed: {
            curClassObj() {
                let obj = {},
                    tempArr = this.list.filter(item => item.isSelect)
                if (tempArr.length > 0) {
                    obj.ID = tempArr[0].ID
                }
                return obj
            }
        },
        methods: {
            loadData(ajaxPromise) {
                this.isLoading = false;
                ajaxPromise.then(res => {
                    if (res.ErrorCode == app.errok) {
                        if (res.PageIndex === 1) {
                            this.list = []
                        }
                        this.list = this.list.concat(res.Data)
                        this.list.forEach(obj => {
                            this.$set(obj, 'isSelect', false)
                        })
                    }
                })
            },
            selectClass(item) {
                this.list.forEach(obj => {
                    if (item.ID === obj.ID) {
                        obj.isSelect = !obj.isSelect
                    } else {
                        obj.isSelect = false
                    }
                })
            },
            searchClass() {
                this.$refs.scroll.refresh({query: this.classText})
            },
            clearText() {
                this.classText = ''
            },
            jumpToStuList() {
                if (!this.curClassObj.ID) {
                    app.toast('info', '请选择班级')
                    return 
                }
                app.ls.set('classId', this.curClassObj.ID)
                this.$router.push(`/stuList/0`)
            }
        }
    }
</script>