<style scoped lang="scss">
    
    

    .follow-multiple-filter-container {
        .as-body {
            @include position-absolute;
        }
        .header {
            background-color: $color-white;
            color: $color-6;
            .back-btn {
                height: 44px;
                line-height: 44px;
                background-color: #f0f0f0;
                padding: 0 12px;
                .btn {
                    display: inline-block;
                }
            }
            .item {
                padding: 0 12px;
                background-color: $color-white;
                .title {
                    height: 44px;
                    line-height: 44px;
                    color: $color-6;
                }
                .input-box {
                    overflow: hidden;
                    width: 100%;
                    height: 40px;
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid rgba(0, 0, 0, 0.2);
                    border-radius: 3px;
                    box-shadow: none;
                    outline: none;
                    box-sizing: border-box;
                }
                .input-box::-webkit-input-placeholder {
                    color: #BBBBBB;
                }
                .project-item {
                    @include flex-between;
                    .title {
                        color: $color-6;
                        min-width: 5em;
                    }
                    .name {
                        flex: 1;
                        max-width: 12em;
                        @include ellipsis-single;
                        color: $color-3;
                        text-align: right;
                    }
                }
                .class-item {
                    @include flex-between;
                    .title {
                        min-width: 5em;
                    }
                    .name {
                        max-width: 12em;
                        @include ellipsis-single;
                        color: $color-3;
                    }
                }
                &.pro{
                    @include border-bottom;
                }
                &.time{
                    @include border-bottom;
                }
            }
        }

        .menupop {
            padding: 0 12px;
            background-color: $color-white;
            .item {
                height: 44px;
                line-height: 44px;
                @include border-top;
                @include flex-between;
                .name {
                    flex: 1;
                    @include ellipsis-single;
                }
                .arrow {
                    width: 20px;
                }
            }
        }

        .footer {
            height: 44px;
            line-height: 44px;
            text-align: center;
            display: flex;
            @include shadow-base;
            .reset {
                flex: 1;
                color: #4A4A4A;
            }
            .complete {
                flex: 1;
                color: $color-white;
                background-color: $color-primary;
            }
        }
    }

    .empty-page {
        @include position-absolute;
    }

</style>

<template>
    <div class="follow-multiple-filter-container" v-show="opened">
        <action-sheet
                ref="followMultipleFilterScroller"
                v-show="opened"
                class="as-body"
                @close="close"
                :data="renderData"
                :scrollerConfig="scrollerConfig"
                @loadFirst="loadFirst"
                @loadData="loadData"
                :position="position">
            <div class="header" slot="header">
                <div class="back-btn">
                    <div class="btn" @click="close()">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-zuobianjiantou"></use>
                        </svg>
                        筛选
                    </div>
                </div>

                <div class="item pro">
                    <div class="project-item">
                        <div class="title">课程名称</div>
                        <div class="name">{{shiftObj.name}}</div>
                    </div>
                </div>
                <div class="item time" v-if="showbar">
                    <div class="title">补课课次</div>
                    <div>
                        <input class="input-box" type="text" v-model="classTime" placeholder="请输入课次">
                    </div>
                </div>
                <div class="item">
                    <div class="class-item">
                        <div class="title">班级名称</div>
                        <div class="name">{{paraObj.classObj.name}}</div>
                    </div>
                    <div>
                        <input class="input-box" type="text" v-model="className" placeholder="请输入名称">
                    </div>
                </div>
            </div>

            <div class="menupop">
                <div class="item" v-for="(item,index) in list" :key="index" @click="selectClass(item)">
                    <div class="name">{{item.Name}}</div>
                    <div class="arrow">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="item.ID==selectedProject.ID?'#icon-gouxuan':''"></use>
                        </svg>
                    </div>
                </div>
                <empty-page class="empty-page" type="2" text="没有班级可选择~" v-show="list.length == 0"></empty-page>
            </div>

            <div class="footer" slot="footer">
                <div class="reset" @click="multipleReset">重置</div>
                <div class="complete" @click="submit">完成</div>
            </div>
            <loading class="loading" v-show="isLoading"></loading>

        </action-sheet>

    </div>
</template>

<script>
    
    
    import {getBukeFilterClass} from "teacher/api/buke";
    import EmptyPage from "teacher/components/common/empty-page/empty-page";

    export default {
        name: "follow-multiple-filter",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            position: {
                type: String,
                default: "sideRight"
            },
            shiftObj: {
                type: Object,
                default: {
                    id: '',
                    name: ''
                }
            }
        },
        computed: {
            renderData() {
                return {
                    refreshNum: this.refreshNum,
                    list:this.list
                }
            }
        },
        data() {
            return {
                showbar:app.sysInfo.ShowClassProgressBar==1?true:false,
                refreshNum: 0,
                isLoading: true,
                list: [],
                classTime: '',
                className: '',
                selectedProject: {},
                scrollerConfig: {
                    tag: 'super',
                    type: 2,
                    pagingOption: {
                        api: getBukeFilterClass,
                        params: {
                            campus: '',
                            query: '',//课程名称
                            shift: '',//课程所属科目ID
                            shiftName: ''//课程所属类别ID
                        }
                    }
                },
                paraObj: {
                    courseNumbers: '',//补课课程关键字
                    classObj: {
                        id: '',
                        name: ''
                    }
                }
            }
        },
        methods: {
            loadFirst(promise) {
                promise.then(res => {
                    this.selectedProject = {}
                })
            },
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    this.isLoading = false;
                    if (res.ErrorCode == app.errok) {
                        if (res.PageIndex === 1) {
                            this.list = [];
                        }
                        this.list = this.list.concat(res.Data);
                        this.refreshNum++;
                    }
                });
            },
            selectClass(obj) {
                if (obj.ID == this.selectedProject.ID) {
                    this.selectedProject = {};
                } else {
                    this.selectedProject = obj;
                }
            },
            //重置
            multipleReset() {
                this.selectedProject = {};
                this.classTime = '';
                if (!app.tool.trim(this.className) == '') {
                    this.className = ''
                } else {
                    this.isLoading = true;
                    this.$refs.followMultipleFilterScroller.refresh()
                }
                this.paraObj = {
                    courseNumbers: '',//补课课程关键字
                    classObj: {
                        id: '',
                        name: ''
                    }
                };
                this.$emit('bukeFollowMultiple', this.paraObj);
            },
            //确认
            submit() {
                //补课课次
                this.paraObj.courseNumbers = this.classTime;
                //班级名称
                if (app.tool.isEmptyObject(this.selectedProject)) {
                    this.paraObj.classObj = {
                        id: '',
                        name: ''
                    }
                } else {
                    this.paraObj.classObj.id = this.selectedProject.ID;
                    this.paraObj.classObj.name = this.selectedProject.Name;
                }
                this.$emit('bukeFollowMultiple', this.paraObj);
                this.close();
            }

        },
        components: {
            
            EmptyPage
        },
        watch: {
            opened(newVal, oldVal) {
                if (newVal) {
                    this.scrollerConfig.pagingOption.params.campus = app.ls.getStorage('bukeManageCampusId').campusId;//初始校区id
                    this.scrollerConfig.pagingOption.params.shift = this.shiftObj.id;
                    this.scrollerConfig.pagingOption.params.shiftName = this.shiftObj.name;
                    this.$refs.followMultipleFilterScroller.refresh(this.scrollerConfig.pagingOption.params);
                    //回显
                    this.className = '';
                    this.classTime = this.paraObj.courseNumbers;
                }
            },
            className(newVal) {//input时 触发搜索刷新
                this.isLoading = true;
                this.scrollerConfig.pagingOption.params.query = newVal;
                this.$refs.followMultipleFilterScroller.refresh(this.scrollerConfig.pagingOption.params);

            }
        }
    }
</script>

