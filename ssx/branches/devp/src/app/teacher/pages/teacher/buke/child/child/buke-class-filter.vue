<style scoped lang="scss">
    .header {
        color: $color-6;
        background-color: #f0f0f0;
        .back-btn {
            height: 44px;
            line-height: 44px;
            display: inline-block;
            padding: 0 12px;
        }
        .search-area {
            padding: 0 12px;
            background-color: $color-white;
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
            input {
                width: 100%;
                margin: 0;
                padding: 10px;
                border: 1px solid rgba(0, 0, 0, 0.2);
                box-shadow: none;
                box-sizing: border-box;
                border-radius: 3px;
                height: 40px;
            }
            input::-webkit-input-placeholder {
                color: #BBBBBB;
            }
        }
    }

    .footer {
        height: 44px;
        line-height: 44px;
        text-align: center;
        display: flex;
        .reset {
            flex: 1;
            color: $color-primary;
            background-color: #b4e0ff;
        }
        .complete {
            flex: 1;
            color: $color-white;
            background-color: $color-primary;
        }
    }

    .body {
        background-color: $color-white;
        padding: 0 12px;
        .item {
            height: 44px;
            line-height: 44px;
            @include border-top;
            font-size: 14px;
            color: $color-3;
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

    .as-body, .loading, .empty-page {
        @include position-absolute;
    }
    .empty-page{
        background-color: $color-white;
    }
</style>

<template>
    <action-sheet v-show="opened"
                  class="as-body"
                  @close="close"
                  :scrollerConfig="scrollerConfig"
                  @loadData="loadData"
                  @loadFirst="loadFirst"
                  :data="list"
                  :position="position"
                  ref="bukeClassFilterScroller">
        <div class="header" slot="header">
            <div class="back-btn" @click="close()">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zuobianjiantou"></use>
                </svg>
                选择班级
            </div>
            <div class="search-area">
                <input type="text" placeholder="请输入名称" v-model="queryText">
            </div>
        </div>
        <div class="body">
            <div class="data-area">
                <div class="item" v-for="(item,index) in list" :key="index" @click="selectProject(item)">
                    <div class="name">{{item.Name}}</div>
                    <div class="arrow">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="item.ID==selectedProject.ID?'#icon-gouxuan':''"></use>
                        </svg>
                    </div>
                </div>
                <empty-page class="empty-page" type="2" text="没有班级可选择~" v-show="list.length == 0"></empty-page>
                <loading class="loading" v-show="isLoading"></loading>
            </div>
        </div>
        <div class="footer" slot="footer">
            <div class="reset" @click="resetProject">重置</div>
            <div class="complete" @click="submit">完成</div>
        </div>
    </action-sheet>
</template>

<script>
    
    
    import {getBukeFilterClass} from "teacher/api/buke";
    import EmptyPage from "teacher/components/common/empty-page/empty-page";

    export default {
        name: "buke-project-filter",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            position: {
                type: String,
                default: 'sideRight'
            }
        },
        data() {
            return {
                isLoading: true,
                list: [],//主数据
                queryText: '',//课程搜索关键字
                selectedProject: {},//选中的对象
                scrollerConfig: {
                    tag: 'super',
                    type: 2,
                    pagingOption: {
                        api: getBukeFilterClass,
                        params: {
                            campus: '',
                            query: '',//课程名称
                            shift:'',
                            shiftName:''
                        }
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
                    console.log(res)
                    if (res.result.code == app.errok) {
                        if (res.page.pageindex === 1) {
                            this.list = [];
                        }
                        this.list = this.list.concat(res.data)
                    }
                });
            },
            selectProject(obj) {
                if (obj.ID == this.selectedProject.ID) {
                    this.selectedProject = {};
                } else {
                    this.selectedProject = obj;
                }
            },
            resetProject() {
                this.selectedProject = {};
                if (!app.tool.trim(this.queryText) == '') {
                    this.queryText = ''
                } else {
                    this.isLoading = true;
                    this.$refs.bukeClassFilterScroller.refresh()
                }
            },
            submit() {
                //再次点击表示取消选择
                let result = {
                    id: '',
                    name: ''
                };
                if (app.tool.isEmptyObject(this.selectedProject)) {
                    result = {
                        id: '',
                        name: ''
                    }
                } else {
                    result.id = this.selectedProject.ID;
                    result.name = this.selectedProject.Name;
                }
                this.$emit('bukeSelectedClass', result);
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
                    this.scrollerConfig.pagingOption.params.shift = app.ls.getStorage('bukeSelectedProject').id;//初始校区id
                    this.scrollerConfig.pagingOption.params.shiftName = app.ls.getStorage('bukeSelectedProject').name;//初始校区id
                    this.$refs.bukeClassFilterScroller.refresh(this.scrollerConfig.pagingOption.params);
                    this.selectedProject = {};
                } else {//回退清空搜索
                    this.resetProject();
                }
            },
            queryText(newVal) {//input时 触发搜索刷新
                this.isLoading = true;
                this.scrollerConfig.pagingOption.params.query = newVal;
                this.$refs.bukeClassFilterScroller.refresh(this.scrollerConfig.pagingOption.params);
            }
        }
    }
</script>

