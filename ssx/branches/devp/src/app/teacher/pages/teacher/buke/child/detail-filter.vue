<!-- 补课管理->补课详情 -->
<style scoped lang="scss">
    .as-body {
        font-size: 15px;
        .box {
            .body {
                padding: 18px 30px;
                .item {
                    padding: 8px 0;
                    display: flex;
                    .key {
                        width: 46px;
                        margin-right: 10px;
                        color: $color-6;
                    }
                    .val {
                        flex: 1;
                        color: $color-3;
                    }
                }
            }
            .footer {
                text-align: center;
                height: 44px;
                line-height: 44px;
                background-color: $color-primary;
                color: $color-white;
                font-size: 16px;
            }
        }
    }
</style>

<template>
    <action-sheet
        class="as-body"
        v-show="opened"
        @close="close"
        :position="position"
        :data="list">
        <div class="box">
            <div class="body">
                <div class="item">
                    <div class="key">姓名：</div>
                    <div class="val">{{list.studentname}}</div>
                </div>
                <div class="item">
                    <div class="key">课程：</div>
                    <div class="val">{{list.shiftname}}</div>
                </div>
                <div class="item">
                    <div class="key">班级：</div>
                    <div class="val">{{list.classname}}</div>
                </div>
                <!--TODO:改！这里缺少状态\内容\老师字段-->
                <div class="item">
                    <div class="key">状态：</div>
                    <div class="val" v-if="list.finished==0">未上课</div>
                    <div class="val" v-else>已上课</div>
                </div>
                <div class="item">
                    <div class="key">时间：</div>
                    <div class="val">{{list.time}}</div>
                </div>
                <div class="item">
                    <div class="key">内容：</div>
                    <div class="val">{{list.content}}</div>
                </div>
                <div class="item">
                    <div class="key">老师：</div>
                    <div class="val">{{list.teachername}}</div>
                </div>
                <div class="item">
                    <div class="key">教室：</div>
                    <div class="val">{{list.classroomname}}</div>
                </div>
            </div>
            <div class="footer" @click="gotIt">关闭</div>
        </div>
    </action-sheet>
</template>

<script>
    export default {
        name: "tips-filter",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            dataObj: {
                type: Object,
                default: false
            }
        },
        data() {
            return {
                position: 'center',
                list: {}//处理后的dataObj
            }
        },
        computed: {
            tipsData() {
                return {
                    opened: this.opened,
                }
            }
        },
        methods: {
            dealData() {
                let data = this.dataObj,
                    TeacherName = '',
                    cdate = '',
                    stimeArr = [],
                    etimeArr = [];
                //TODO:改！后台未返回老师名字。处理老师名字
                data.teachers.forEach(item => {
                    TeacherName += item.Name + ' ';
                });
                data.teachername = TeacherName;
                //处理上课时间
                cdate = data.starttime.split('T')[0].split('-');
                stimeArr = data.starttime.split('T')[1].split(':');
                etimeArr = data.endtime.split('T')[1].split(':');
                data.time = cdate[1] + '.' + cdate[2] + ' ' + stimeArr[0] + ':' + stimeArr[1] + '~' + etimeArr[0] + ':' + etimeArr[1];
                this.list = data;
            },
            gotIt() {
                this.close();
            }
        },
        watch: {
            opened: function (newVal, oldVal) {
                newVal && this.dealData()
            }
        }
    }
</script>