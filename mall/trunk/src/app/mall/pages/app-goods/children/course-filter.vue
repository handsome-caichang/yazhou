<!-- 班级、课程筛选组件 -->
<style lang="scss" scoped>
    
    .role-actionsheet {
        @include position-absolute(134px, 0, 0, 0);
    }
    
    .item-wrapper {
        display: flex;
        flex-wrap: wrap;
        .item {
            width: 50%;
            height: 54px;
            line-height: 54px;
            padding: 0 12px;
            color: $color-3;
            font-size: 13px;
            .text {
                @include flex-between;
                &.active {
                    border-bottom: 1px solid #F7ADADFF;
                }
            }
        }
    }
    .o-block {
        .header {
            height: $h-2;
            line-height: $h-2;
            padding: 0 $edge;
            color: $color-3;
            font-size: $fs-normal-x;
            @include flex-between;
            .title {
                flex: 1;
            }
            .icon {
                color: $color-9;
                margin-left: 10px;
            }
        }
        .header-isShowAll {
            height: $h-2;
            line-height: $h-2;
            padding: 0 $edge;
            color: $color-3;
            font-size: $fs-normal-x;
            display: flex;
            align-items: center;
            font-size: $fs-normal;
            .icon {
                color: $color-primary;
                margin-right: 10px;
            }
        }
        .list-class-type {
            max-height: 120px;
            overflow: hidden;
        }
        .list {
            padding: 0 4px;
            display: flex;
            flex-wrap: wrap;
            .o-item {
                display: table;
                width: 33.33%;
                padding: 4px;
                .text-box {
                    display: table-cell;
                    vertical-align: middle;
                    text-align: center;
                    height: 32px;
                    background-color: $color-assist-3;
                    border-radius: 2px;
                    padding: 0 3px;
                    color: $color-3;
                    &.active {
                        color: #F03232FF;
                        border: 1px solid #F03232FF;
                    }
                    .text {
                        font-size: 12px;
                        line-height: 14px;
                        display: -webkit-box !important;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        word-break: break-all;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }
                }
            }
        }
    }

    .footer {
        /* position: absolute !important;
        bottom: 0;
        right: 0;
        width: 100%; */
        height: $h-3;
        display: flex;
        @include border-top;
        
        .btn {
            flex: 1;
            font-size: $fs-big-s;
            @include flex-center;
            transform: translate3d(0, 0.5px, 0);
            &.reset-btn {
                color: $color-9;
            }
            &.confirm-btn {
                color: $color-white;
                background-color: #F03232FF;
            }
        }
    }
    
</style>

<template>
        <!-- :scrollerStyle="scrollerStyle" -->
    <action-sheet
        class="role-actionsheet"
        v-if="opened"
        @close="selfClose" 
        :position="position" 
        :data="scrollerData">

        <div v-if="filteres" class="actionWrapper">
            <!--  -->
            <div class="item-wrapper" v-show="type !== 'filtrate'">
                <div class="item" 
                    v-for="item in paramsObj[type]"
                    @click="changeSelected(item)">
                    <div class="text" :class="{active:selected[type].indexOf(item.ID)>-1}">{{item.Name}}
                        <svg class="icon" aria-hidden="true" v-if="selected[type].indexOf(item.ID)>-1">
                            <use xlink:href="#icon-xuanzhong3"></use>
                        </svg>
                    </div>
                </div>
            </div>
    
            <!-- 侧边筛选栏 -->
            <div class="other-body" v-show="type === 'filtrate'">

                <div class="o-block">
                    <div class="header" @click="toggleClassTypes">
                        <span class="title">类型</span>
                        <svg class="icon" aria-hidden="true" v-if="paramsObj.filtrate.length > 6">
                            <use :xlink:href="classTypesFlag ? '#icon-xiangshang' : '#icon-xiangxia2'"></use>
                        </svg>
                    </div>
                    <ul class="list" :class="{'list-class-type':classTypesFlag}">
                        <li class="o-item" v-for="osub1 in paramsObj.filtrate">
                            <div class="text-box"
                                @click="changeSelected(osub1)"
                                :class="{active:selected[type].indexOf(osub1.ID)>-1}">
                                <span class="text">{{osub1.Name}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div slot="footer" ref="footer" class="footer">
            <div class="btn reset-btn" @click="resetChange">重 置</div>
            <div class="btn confirm-btn" @click="confirmChange">确 定</div>
        </div>
    </action-sheet>
</template>

<script>
    
     
    import {getqueryparamters} from 'api/jie.js'

    export default {
        name: 'course-filter',
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: true
            },
            // '年级'、'科目'、'期段'或'筛选'
            type: {
                type: String,
                default: "Grades"
            }
        },
        data () {
            return {
                classTypesFlag: true,
                // 用于保存各种筛选项
                filteres: null,
                // 已选的筛选结果
                selected: {
                    Type: [1, 3],
                    Grade: [],
                    Subject: [],
                    ClassType: [], 
                    filtrate: [],
                },
                paramsObj: {
                    Grade: [{
                                ID: 1,
                                Name: '一年级'
                            }, {
                                ID: 2,
                                Name: '二年级'
                            }, {
                                ID: 3,
                                Name: '三年级'
                            }, {
                                ID: 4,
                                Name: '四年级'
                            }, {
                                ID: 5,
                                Name: '五年级'
                            }, {
                                ID: 6,
                                Name: '六年级'
                            }, {
                                ID: 7,
                                Name: '初一'
                            }, {
                                ID: 8,
                                Name: '初二'
                            }, {
                                ID: 9,
                                Name: '初三'
                            }, {
                                ID: 1,
                                Name: '一年级'
                            }, {
                                ID: 2,
                                Name: '二年级'
                            }, {
                                ID: 3,
                                Name: '三年级'
                            }, {
                                ID: 4,
                                Name: '四年级'
                            }, {
                                ID: 5,
                                Name: '五年级'
                            }, {
                                ID: 6,
                                Name: '六年级'
                            }, {
                                ID: 7,
                                Name: '初一'
                            }, {
                                ID: 8,
                                Name: '初二'
                            }, {
                                ID: 9,
                                Name: '初三'
                            }],
                    Subject: [{
                                ID: 1,
                                Name: '语文'
                            }, {
                                ID: 2,
                                Name: '数学'
                            }, {
                                ID: 3,
                                Name: '英语'
                            }, {
                                ID: 4,
                                Name: '化学'
                            }],
                    ClassType: [{
                            ID: 1,
                            Name: '集体班'
                        }, {
                            ID: 2,
                            Name: '1v1'
                        }, {
                            ID: 3,
                            Name: '1v2'
                        }],
                    filtrate: [{
                            "ID": "6bfafa0e-db2f-4430-8f4c-14eb616865e7",
                            "Name": "培优班"
                        },
                        {
                            "ID": "7b8b8b2a-024a-4a1b-bf9c-672c60d165ed",
                            "Name": "提高班"
                        },
                        {
                            "ID": "ce69ea5a-73d6-4cfc-a23e-5b8090c96329",
                            "Name": "强化班"
                        },
                        {
                            "ID": "10289799-3a87-4ca2-a243-83b7f083397a",
                            "Name": "特强班"
                        },
                        {
                            "ID": "31ad2889-e2ab-4195-b824-a5d16978e049",
                            "Name": "星级班"
                        },
                        {
                            "ID": "ff81a76b-4d84-4579-8626-4018d676e378",
                            "Name": "特长生班"
                        },
                        {
                            "ID": "186ef75c-c2eb-4a62-be16-14d91b5c92ca",
                            "Name": "尖子班"
                        },
                        {
                            "ID": "2604a238-6245-498c-b565-f8d42f5a0821",
                            "Name": "精英班"
                        },
                        {
                            "ID": "80daacea-0a5f-4c76-b50c-6a143831186d",
                            "Name": "精品班"
                        },
                        {
                            "ID": "0e05fb25-8e0d-499e-a86d-04d0271a0da1",
                            "Name": "短训班"
                        },
                        {
                            "ID": "c7125e62-c40a-4c36-861b-6ac4ea4fd2e3",
                            "Name": "速成班"
                        },
                        {
                            "ID": "96f1e997-eabb-4055-8930-7d57b2b88bb7",
                            "Name": "新体验"
                        },
                        {
                            "ID": "9c490793-00c7-4e88-8c54-5efb0c8543cb",
                            "Name": "文海"
                        },
                        {
                            "ID": "f98de3de-e57b-4b36-853c-ff8aa6cbd548",
                            "Name": "一对二小组班"
                        },
                        {
                            "ID": "189b73e8-cd80-4575-b89f-5f047565cbd6",
                            "Name": "一对三小组班"
                        },
                        {
                            "ID": "d9623633-5510-45de-ad07-2b343c529c23",
                            "Name": "一对四小组班"
                        },
                        {
                            "ID": "120d83ed-51d6-4612-b61b-3eb4f34f01e9",
                            "Name": "一对二小组班（指定）"
                        },
                        {
                            "ID": "7a4ba9ca-a1bc-4489-a48e-bcaf1bcc00bb",
                            "Name": "一对三小组班（指定）"
                        },
                        {
                            "ID": "f8677f5f-8dce-4686-a229-eba89f8c48bf",
                            "Name": "一对四小组班（指定）"
                        },]
                }
            }
        },      
        computed: {
            ...Vuex.mapState(['curCampus', 'config']),
            position() {
                return this.type === 'filtrate' ? 'sideRight' : 'top';
            },
            scrollerStyle() {
                return this.type !== 'filtrate' ? null : {
                    position: 'absolute',
                    bottom: '40px',
                }
            },
            scrollerData() {
                return {
                    opened: this.opened,
                    type: this.type,
                    filteres: this.filteres,
                    classTypesFlag: this.classTypesFlag
                }
            }
        },
        methods: {
            toggleClassTypes: function (event) {
                this.classTypesFlag = !this.classTypesFlag;
            },
            selfClose(type) {
                // 当点击模态框关闭时，在动画结束时,重置侧边栏样式;
                if (type === 'maskToClose') {
                    setTimeout(() => {
                        for (let key in this.selected) {
                            if (key === 'ShiftTypeIDs' || key === 'Grade' || key === 'Subject') {
                                this.otherSelected[key] = [];
                                this.selected[key].forEach((id, index) => {
                                    this.otherSelected[key].push(id);
                                });
                            }
                            if (key === 'IsShowAll' || key === 'IsAgeScreening') {
                                this.otherSelected[key] = this.selected[key];
                            }
                        }
                    }, app.duration);                   
                }
                this.close();
            },
            // 更新可筛选数据,实现联动;
            updateFilteres() {
                getqueryparamters(this.selected).then(res => {
                    if (res.ErrorCode === app.errok) {
                        this.filteres = res.Data;
                    }
                })
            },
            changeSelected(filter) {
                let index = this.selected[this.type].indexOf(filter.ID);
                if (index > -1) {
                    this.selected[this.type].splice(index, 1);
                } else {
                    this.selected[this.type].push(filter.ID);
                }
            },
            emitEvent(val) {
                this.$emit('changeFilter', this.selected);
            },
            resetChange() {
                this.otherSelected = {
                    IsShowAll: true,
                    IsAgeScreening: false,
                    ShiftTypeIDs: [],
                    Grade: [],
                    Subject: []
                }
            },
            confirmChange() {
                this.emitEvent();
                this.selfClose();
            }
        },
        created() {
            this.updateFilteres();
            this.paramsObj.filtrate = this.paramsObj.filtrate.concat(this.paramsObj.filtrate)
            window.aaa = this
        },      
        watch: {
            // 观察当前选中校区的改变, 并重置筛选结果, 
            // 同时触发筛选结果改变事件, 从而使父页面的列表页重渲;
            curCampus(newCampus, oldCampus) {
                // 重置筛选条件
                this.selected = {
                    GradeID: "",
                    SubjectID: "",
                    TermID: "",
                    IsShowAll: true,
                    IsAgeScreening: false,
                    ShiftTypeIDs: [],
                    Grade: [],
                    Subject: []
                }
                this.emitEvent();
                this.updateFilteres();
            }
        },
        components: {
            
        },
    };
</script>

