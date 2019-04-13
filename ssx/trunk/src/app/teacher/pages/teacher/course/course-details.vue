<!-- 我的课表->班级详情 -->
<style scoped lang="scss">
    
    

    .course-details-container {
        .as-details {
            @include position-absolute;
            background-color: $color-assist-1;
            font-size: 15px;
            .class-name {
                padding:12px;
                text-align: center;
                font-size: 16px;
                color: $color-6;
            }
            .item {
                background-color: $color-white;
                padding: 12px 15px;
                margin-bottom: 10px;
                @include flex-between;
                .describe {
                    color: $color-6;
                }
                .content {
                    color: $color-3;
                    max-width: 80%;
                }
                .teacher {
                    color: #1A97F2;
                }
                .classroom{
                    @include ellipsis-single;
                }
            }
            .content-area {
                padding: 0 12px 12px 12px;
                margin-bottom: 10px;
                color: $color-6;
                background-color: $color-white;
                .title {
                    height: 41px;
                    line-height: 41px;
                    text-align: left;
                }
                .content {
                    color: $color-3;
                    padding: 5px;
                    border: 1px solid $color-border;
                }
            }
            .void {
                height: 1px;
                width: 100%;
            }
        }
    }
</style>

<template>
    <div class="course-details-container">
        <scroller-base class="as-details" :data="renderData">
            <div class="class-name">
                {{className}}
            </div>
            <div class="item">
                <div class="describe">{{app.sysInfo.title_campus}}</div>
                <div class="content">{{campus}}</div>
            </div>
            <div class="item">
                <div class="describe">老师</div>
                <div class="content teacher">{{list.teachernames}}</div>
            </div>
            <div class="item">
                <div class="describe">教室</div>
                <div class="content classroom">{{list.classroomname}}</div>
            </div>
            <div class="item">
                <div class="describe">时间</div>
                <div class="content" v-if="list.unit!=3">{{list.date}} &nbsp;&nbsp; {{list.stime}}~{{list.etime}}</div>
                <div class="content" v-else>{{list.date}}</div>
            </div>
            <div class="item">
                <div class="describe">状态</div>
                <div class="content">{{list.status||"未上课"}}</div>
            </div>

            <!--上课内容-->
            <div class="content-area" v-if="(list.content!=null)&&(list.content!='')">
                <div class="title">上课内容</div>
                <div class="content" v-html="list.content"></div>
            </div>
            <!--备注：老师评语这项内容，查了后台，返回的一直是空值，所以根本不需要相关代码 28.04.28-->
            <div class="void"></div>
        </scroller-base>
        <loading class="loading" v-show="isLoading"></loading>
    </div>

</template>

<script>
    import {getcourseinfosbytime} from "teacher/api/course";
        export default {
        name: "course-details",
        data() {
            return {
                wxTitle: '班级详情',
                list: {},
                isLoading: true,
                className: '',
                campus: ''
            }
        },
        computed: {
            renderData() {
                return {
                    list: this.list,
                    className: this.className,
                    campus: this.campus
                }
            }
        },
        methods: {
            getData(id,user) {
                getcourseinfosbytime({
                    viewtype: 3,
                    usertype: user,
                    courseid: id
                }).then(res => {
                    this.isLoading = false;
                    if (res.result.code == app.errok) {
                        res.data.date = res.data.date.replace(/-/g, '.');
                        res.data.content = res.data.content&&app.dom.parseDom(res.data.content);
                        res.data.teachernames = res.data.teachernames.join(',');
                        this.list = res.data;
                    } else {
                        app.toast('error', res.result.msg)
                    }
                })
            }
        },
        created() {
            let role = app.sysInfo.currole.id;
            if(role==4){
                role = 1;
            }else if (role==16){
                role = 3;
            }
            this.getData(this.$route.query.id,role);
            this.className = this.$route.query.classname;
            this.campus = this.$route.query.campus;
        }
    }
</script>

