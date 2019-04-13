<style scoped lang="scss">
    
    

    .renewalclass-students-list-container {
        background-color: $color-assist-1;
        padding: 10px;
        .scroller{
            @include position-absolute;
            padding: 0 10px 10px 10px;
            .title{
                min-height: 45px;
                font-size: 16px;
                color: #333;
                padding: 15px 0;
                text-align: center;
            }
            .card {
                background-color: $color-white;
                border-radius: 10px;
                margin-bottom: 8px;
                position: relative;
                &:last-child{
                    margin-bottom:0;
                }
                .name {
                    line-height: 21px;
                    color: $color-3;
                    font-size: 16px;
                    padding: 12px 20px;
                    border-bottom: 1px solid #EDF1F7;
                    @include flex-between;
                    position: relative;
                    flex-wrap: wrap;
                    .icon {
                        position: absolute;
                        left: -6px;
                        top: 50%;
                        transform :translateY(-50%);
                    }
                    .name-left{
                        width: 50%;
                        .student-name{
                            max-width:80px;
                            @include ellipsis-single;
                        }
                        .student-num{
                            max-width:80px;
                            @include ellipsis-single;
                            margin-left: 10px;
                            font-size: 13px;
                            color: $color-9;
                        }
                    }
                    .student-bind{
                        width: 50%;
                        color: #8b572a;
                        font-size: 12px;
                    }
                    .name-right{
                        width: 50%;
                        font-size: 12px;
                        color: $color-9;
                    }
                    div:nth-child(3) {
                        text-align: right;
                    }
                }
                .class-list {
                    &:nth-child(5n-4) .list-name .dor {
                        background-color: #7BB6F7;
                    }
                    &:nth-child(5n-3) .list-name .dor {
                        background-color: #FFC700;
                    }
                    &:nth-child(5n-2) .list-name .dor {
                        background-color: #8BD8E8;
                    }
                    &:nth-child(5n-1) .list-name .dor {
                        background-color: #B0E170;
                    }
                    &:nth-child(5n) .list-name .dor {
                        background-color: #F47A92;
                    }
                    .list-name {
                        height: 40px;
                        line-height: 40px;
                        font-size: 14px;
                        color: $color-3;
                        padding: 0 15px 0 32px;
                        position: relative;
                        @include ellipsis-single;
                        .dor {
                            width: 6px;
                            height: 6px;
                            border-radius: 100%;
                            position: absolute;
                            top: 17px;
                            left: 20px;
                        }
                    }
                    .list-msg {
                        display: flex;
                        flex-wrap: wrap;
                        padding: 0 15px 5px 32px;
                        .chunk {
                            background-color: #f4f4f4;
                            height: 20px;
                            line-height: 20px;
                            padding: 0 7px;
                            margin-right: 10px;
                            max-width: 100%;
                            border-radius: 4px;
                            font-size: 11px;
                            color: $color-9;
                            @include ellipsis-single;
                            margin-bottom: 10px;
                            &:last-child {
                                margin-right: 0;
                            }
                        }
                    }
                }
            }
            .void{
                height: 1px;
            }
        }
    }
    .noData-temp{
        @include position-absolute;
    }
</style>

<template>
    <div class="renewalclass-students-list-container">
        <scroller-base class="scroller" :data="list">
            <div class="title">
                {{className}}
            </div>
            <div class="card" v-for="item in list">

                <div class="name">
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-biaoqian"></use>
                    </svg>
                    <div class="name-left">
                        <span class="student-name">{{item.name}}{{item.IsBindWeixin}}</span>
                        <span class="student-num" v-if="item.serial">{{item.serial}}</span>
                    </div>
                    <div class="name-right" v-if="!(item.ClassinfoList&&item.ClassinfoList.length)">
                        只报了所在班级
                    </div>
                    <div class="student-bind" v-if="item.isBindWeixin==0">未绑定师生信</div>
                </div>

                <div class="class-list" v-if="item.ClassinfoList&&item.ClassinfoList.length" v-for="p in item.ClassinfoList">
                    <div class="list-name">
                        <div class="dor"></div>
                        {{p.Name}}
                    </div>
                    <div class="list-msg">
                        <div v-if="p.Year" class="year chunk">{{p.Year}}</div>
                        <div v-if="p.Term" class="period chunk">{{p.Term}}</div>
                        <div v-if="p.CampusName" class="campus chunk">{{p.CampusName}}</div>
                    </div>
                </div>
            </div>
            <div class="void"></div>
        </scroller-base>
        <empty-page class="noData-temp" :type="1" text="还没有学员情况可以查看哦~" v-if="list.length == 0"></empty-page>
        <loading class="loading" v-show="isLoading"></loading>
    </div>
</template>

<script>
    import {processGet} from "teacher/api/common";
    import EmptyPage from 'teacher/components/common/empty-page/empty-page';

    export default {
        name: "renewalclass-students-list",
        data() {
            return {
                wxTitle: "学员列表",
                list: [],
                isLoading:true,
                className:''//上一层通过存储传过来的名称
            }
        },
        computed: {},
        methods: {
            getData(id){
                processGet({
                    pname:'api',
                    action:'getShiftStudents',
                    shift:id
                }).then(res=>{
                    this.isLoading = false;
                    if (res.errcode == app.errok) {
                        this.list = res.data;
                    } else {
                        app.toast('error', res.errmsg);
                    }
                })
            }
        },
        created() {
            this.getData(this.$route.params.id);
            this.className = app.ls.getStorage('renewalclassItem').name;
        },
        components: {
            EmptyPage
        }
    }
</script>

