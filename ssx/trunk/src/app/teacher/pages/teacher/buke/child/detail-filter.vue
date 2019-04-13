<!-- 详情 -->
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
                    <div class="val">{{list.StudentName}}</div>
                </div>
                <div class="item">
                    <div class="key">课程：</div>
                    <div class="val">{{list.ShiftName}}</div>
                </div>
                <div class="item">
                    <div class="key">班级：</div>
                    <div class="val">{{list.ClassName}}</div>
                </div>
                <div class="item">
                    <div class="key">状态：</div>
                    <div class="val" v-if="list.Finished==0">未上课</div>
                    <div class="val" v-else>已上课</div>
                </div>
                <div class="item">
                    <div class="key">时间：</div>
                    <div class="val">{{list.Time}}</div>
                </div>
                <div class="item">
                    <div class="key">内容：</div>
                    <div class="val">{{list.Content}}</div>
                </div>
                <div class="item">
                    <div class="key">老师：</div>
                    <div class="val">{{list.TeacherName}}</div>
                </div>
                <div class="item">
                    <div class="key">教室：</div>
                    <div class="val">{{list.ClassroomName}}</div>
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
        created() {
        },
        methods: {
            dealData() {
                console.log(this.dataObj)
                let data = this.dataObj,
                    TeacherName = '',
                    cdate = '',
                    stimeArr = [],
                    etimeArr = [];
                //处理老师名字
                data.Teachers.forEach(item => {
                    TeacherName += item.Name + ' ';
                });
                data.TeacherName = TeacherName;

                //处理上课时间
                cdate = data.StartTime.split('T')[0].split('-');
                stimeArr = data.StartTime.split('T')[1].split(':');
                etimeArr = data.EndTime.split('T')[1].split(':');
                data.Time = cdate[1] + '.' + cdate[2] + ' ' + stimeArr[0] + ':' + stimeArr[1] + '~' + etimeArr[0] + ':' + etimeArr[1];

                this.list = data;
            },
            gotIt() {
                this.close();
            },
        },
        components: {
            
        },
        watch: {
            opened: function (newVal, oldVal) {
                newVal && this.dealData()
            }
        }
    }
</script>