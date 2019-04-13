<style scoped lang="scss">
    
    

    .renewalclass-container {
        background-color: $color-assist-1;
        .header {
            background-color: $color-white;
            padding: 8px 12px;
            margin-bottom: 10px;
            height: 44px;
            line-height: 28px;
            @include flex-between;
            @include border-bottom;
            .date-filter {
                display: flex;
                .date-btn {
                    width: 112px;
                    font-size: 12px;
                    text-align: center;
                    border-radius: 50px;
                    border: 1px solid $color-assist-1;
                }
            }
            .date-search {
                width: 48px;
                text-align: center;
                border-radius: 50px;
                background-color: $color-assist-1;
            }
        }
        .scroller {
            @include position-absolute;
            .card {
                height: 83px;
                background-color: $color-white;
                border-radius: 10px;
                margin: 0 15px;
                padding: 20px;
                .class-name {
                    height: 16px;
                    line-height: 16px;
                    color: $color-3;
                    font-size: 16px;
                    margin-bottom: 15px;
                    @include ellipsis-single;
                }
                .campus-count {
                    height: 12px;
                    line-height: 12px;
                    font-size: 12px;
                    color: $color-9;
                    @include flex-between;
                }
            }

        }
    }
    .void {
        background-color: $color-assist-1;
        height: 10px;
    }
    .noData-temp {
        @include position-absolute;
    }
</style>

<template>
    <div class="renewalclass-container">
        <!-- 内容部分 -->
            <scroller-base
                    class="scroller"
                    :data="list">
                <div class="void"></div>
                <div @click="goToRenewalclassStudentList(item)" v-for="item in list" :key="item.id">
                    <div class="card" >
                        <div class="class-name">
                            {{item.name}}
                        </div>
                        <div class="campus-count">
                            <div class="campus">
                                <svg aria-hidden="true" class="icon">
                                    <use xlink:href="#icon-xiaoqu2"></use>
                                </svg>
                                {{item.campusName}}
                            </div>
                            <div class="count">
                                <svg aria-hidden="true" class="icon">
                                    <use xlink:href="#icon-renshu"></use>
                                </svg>
                                {{item.amount}}
                            </div>
                        </div>
                    </div>
                    <div class="void"></div>
                </div>

            </scroller-base>

            <empty-page class="noData-temp" :type="1" text="还没有班级花名册可以查看哦~" v-if="list.length == 0"></empty-page>

        <loading class="loading" v-show="isLoading"></loading>
    </div>
</template>

<script>
    import {processGet} from "teacher/api/common";
    import EmptyPage from 'teacher/components/common/empty-page/empty-page';

    export default {
        name: "renewal-class",
        data() {
            return {
                wxTitle: "班级花名册",
                isLoading: true,
                list: [],
                scrollerNum: 0,
                params: {
                    pname: 'api',
                    action: 'getTeacherShifts'
                }

            }
        },
        computed: {},
        methods: {
            getData() {
                processGet({
                    pname: 'api',
                    action: 'getTeacherShifts'
                }).then(res => {
                    this.isLoading = false;
                    if (res.errcode == app.errok) {
                        this.list = res.data.shiftList;
                    } else {
                        app.toast('error', res.errmsg);
                    }
                })
            },
            goToRenewalclassStudentList(item) {
                app.ls.setStorage('renewalclassItem', item);
                this.$router.push({path: `/renewalclassStudentList/${item.id}`})
            }
        },
        created() {
            this.getData();
        },
        beforeDestroy() {
            app.ls.removeStorage('renewalclassItem');
        },
        components: {
            EmptyPage
        }
    }
</script>

