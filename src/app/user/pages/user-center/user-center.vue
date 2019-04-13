<style lang="scss" scoped>
    .user-center {
        @include position-absolute(0, 0, 49px, 0);
        background-color: $color-assist-1;
        .user-icon {
            color: #C2CCDC;
            width: 15px;
            margin-left: 5px;
        }
        .hearder {
            height: 102px;
            padding: 0 20px 0 28px;
            @include flex-between;
            background-color: $color-white;
            .hearder-l {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: $color-assist-1;
                background-repeat: no-repeat;
                background-attachment: scroll;
                background-position: center center;
                background-size: cover;
            }
            .hearder-m {
                flex: 1;
                padding: 7px 0 7px 24px;
                .name {
                    font-size: 20px;
                    color: $color-3;
                    margin-bottom: 10px;
                }
                .tel {
                    font-size: 14px;
                    color: $color-6;
                }
                .tag {
                    // margin-left: 10px;
                    width: 128px;
                    height: 23px;
                    line-height: 23px;
                    text-align: center;
                    border-radius: 20px;
                    background: linear-gradient(right, #FE5500, #FFA202);
                    color: $color-white;
                    font-size: 12px;
                }
            }
            .hearder-r {
                width: 15px;
                height: 60px;
                line-height: 60px;
                text-align: right;
            }
        }
        .void {
            height: 10px;
            width: 100%;
            background-color: $color-assist-1;
        }
        .item {
            height: 49px;
            padding: 0 20px;
            @include flex-between;
            background-color: $color-white;
            border-bottom: 1px solid $color-assist-1;
            .item-l {
                width: 16px;
                height: 16px;
                // background-color: red;
                margin-right: 8px;
            }
            .bg-1 {
                @include background-img('./img/3.png', cover);
            }
            .bg-2 {
                @include background-img('./img/2.png', cover);
            }
            .bg-3 {
                @include background-img('./img/4.png', cover);
            }
            .bg-4 {
                @include background-img('./img/1.png', cover);
            }
            .item-m {
                flex: 1;
                font-size: 14px;
                color: $color-6;
                @include flex-between;
                justify-content: flex-start;
                .tag {
                    padding: 5px 12px;
                    margin-left: 10px;
                    height: 23px;
                    text-align: center;
                    border-radius: 20px;
                    background:linear-gradient(306deg,rgba(254,85,0,1) 0%,rgba(255,162,2,1) 100%);
                    color: $color-white;
                    font-size: 12px;
                    @include flex-between;
                }
            }
            .item-r {
                text-align: right;
                width: 100px;
                .has-bind {
                    font-size: 12px;
                    color: $color-9;
                }
                .icon {
                    margin-left: 5px;
                }
            }
            .item-r-spec {
                color: $color-9;
                font-size: 12px;
            }
        }
    }
</style>

<template>
    <scroller-base class="user-center">
        <div class="hearder"  @click="editInfo">
            <div class="hearder-l" :style="'background-image:url('+userInfo.photourl+')'"></div>
            <div class="hearder-m">
                <div class="name">{{userInfo.nickname}}<svg class="icon user-icon" aria-hidden="true" v-if="userInfo.gender == 1 || userInfo.gender == 2">
                   <use :xlink:href="userInfo.gender == 1 ? '#iconnan' : '#iconnv'" ></use></svg></div>
                <!-- <div class="tag" v-if="userInfo.bindingstatus==1">校锐星机构管理系统</div> -->
                <div class="tel">{{userInfo.smstel}}</div>
            </div>
            <div class="hearder-r">
                <!-- {{userInfo.gender == 1 ? '男' : (userInfo.gender == 2 ? '女' : '未知')}} -->
                <!-- <svg class="icon user-icon" aria-hidden="true" v-if="userInfo.gender == 1 || userInfo.gender == 2">
                   <use :xlink:href="userInfo.gender == 1 ? '#iconnan' : '#iconnv'" ></use> 
                </svg> -->
            </div>
        </div>
        <div class="void"></div>
        <!-- <div class="item"> -->
            <!-- <div class="item-l bg-1"></div> -->
            <!-- <div class="item-m">
                性别
            </div>
            <div class="item-r">
                {{userInfo.gender == 1 ? '男' : (userInfo.gender == 2 ? '女' : '未知')}}
            </div>
        </div> -->
        <div class="item" @click="goIntroduct">
            <!-- <div class="item-l bg-2"></div> -->
            <div class="item-m">
                我的活动
            </div>
            <div class="item-r">
                <svg class="icon user-icon" aria-hidden="true">
                   <use xlink:href="#iconjiantou"></use> 
                </svg>
            </div>
        </div>
    </scroller-base>
</template>

<script>
    export default {
        data() {
            return {
                isBinds: Math.random() > 0.5
            }
        },
        computed: {
            ...Vuex.mapState(['userInfo'])
        },
        methods: {
            goIntroduct() {
                this.$emit('changeIndex', '0')
            }
        },
        created() {
        }
    }
</script>