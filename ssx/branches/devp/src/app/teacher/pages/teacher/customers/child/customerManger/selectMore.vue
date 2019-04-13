<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute;
        .container {
            padding: 0 15px;
            .item {
                background-color: $color-white;
                .item-heard {
                    height: 45px;
                    line-height: 45px;
                    font-size: 15px;
                    color: $color-3;
                }
                .item-bottom {
                    height: 31px;
                    line-height: 31px;
                    font-size: 12px;
                    color: $color-9;
                    display: flex;
                    .item-bottom-left, .item-bottom-right {
                        border: 1px solid $color-9;
                        flex: 1;
                        text-align: center;
                    }
                    .item-bottom-left {
                        margin-right: 20px;
                    }
                    .active1{
                        border: 1px solid $color-primary;
                        color: $color-primary;
                    }
                }
            }
            .ss {
                margin-top: 25px;
            }
            .status {
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid $color-assist-1;
                font-size: 15px;
                color: $color-3;
                display: flex;
                .status-left {
                    width: 90px;
                    font-size: 15px;
                    color: $color-3;
                }
                .status-mid {
                    padding-left: 10px;
                    flex: 1;
                    text-align: right;
                    @include ellipsis-single;
                }
                .status-right {
                    width: 20px;
                    text-align: right;
                }
            }
        }
        .bottom {
            height: 49px;
            line-height: 49px;
            font-size: 16px;
            text-align: center;
            display: flex;
            .bottom-left {
                border-top: 1px solid $color-9;
                flex: 1;
                color: $color-9;
            }
            .bottom-right {
                flex: 1;
                background-color: $color-primary;
                color: $color-white;
            }
            
        }
        .container2 {
            .actionsheet-item {
                padding: 15px;
                color: $color-3;
                @include flex-between;
                &:not(:last-child){
                    @include border-bottom;
                }
                &.active {
                    color: $color-primary;
                }
            }
        }
        
    }
    .as-slide-enter-active, .as-slide-leave-active {
        transition: all $duration $timing;
    }
    .as-slide-enter, .as-slide-leave-active {
        transform: translate3d(0, 100%, 0);
    }
</style>

<template>
    <action-sheet
        class="role-actionsheet"
        :position="position"
        :data="scrollData" 
        v-show="opened" 
        @close="close">
        
        <div class="container" v-show="stepOne">
            <div class="item">
                <div class="item-heard">跟进时间</div>
                <div class="item-bottom" >
                    <div class="item-bottom-left" @click="selectDay('followStaTime')" :class="{active1:followStaTime!==''}">
                        {{followStaTime ? followStaTime : '开始时间'}}
                    </div>
                    <div class="item-bottom-right" @click="selectDay('followEndTime')" :class="{active1:followEndTime!==''}">
                        {{followEndTime ? followEndTime : '结束时间'}}
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="item-heard">录入时间</div>
                <div class="item-bottom">
                    <div class="item-bottom-left" @click="selectDay('enterStaTime')" :class="{active1:enterStaTime!==''}">
                        {{enterStaTime ? enterStaTime : '开始时间'}}
                    </div>
                    <div class="item-bottom-right" @click="selectDay('enterEndTime')" :class="{active1:enterEndTime!==''}">
                        {{enterEndTime ? enterEndTime : '结束时间'}}
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="item-heard">沟通时间</div>
                <div class="item-bottom">
                    <div class="item-bottom-left" @click="selectDay('comStaTime')" :class="{active1:comStaTime!==''}">
                        {{comStaTime ? comStaTime : '开始时间'}}
                    </div>
                    <div class="item-bottom-right" @click="selectDay('comEndTime')" :class="{active1:comEndTime!==''}">
                        {{comEndTime ? comEndTime : '结束时间'}}
                    </div>
                </div>
            </div>
            <div class="status ss">
                <div class="status-left">选择客户状态</div>
                <div class="status-mid" @click="changeStep(2)">
                    {{statusObj.Value}}
                </div>
                <div class="status-right" @click="changeStep(2)">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="status">
                <div class="status-left" @click="selectMainPerson">选择责任人</div>
                <div class="status-mid" @click="selectMainPerson">{{mainPerson.name}}</div>
                <div class="status-right">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="bottom" slot="footer" v-show="stepOne">
            <div class="bottom-left" @click="clearData">重置</div>
            <div class="bottom-right" @click="emit">确定</div>
        </div>
        
        <!-- <transition name="as-slide"> -->
            <div class="container2" v-show="stepTwo">
                <div class="actionsheet-item"
                    :class="{'active':statusObj.ID==item.ID}"
                    v-for="(item, index) in list"
                    @click="selectStatus(item)"
                    >
                    {{item.Value}}
                </div>
            </div>
        <!-- </transition> -->
    </action-sheet>
</template>

<script>
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                stepOne: true,
                stepTwo: false,
                // stepThree: false,
                list: [],
                statusObj: {},
                mainPerson: {},
                followStaTime: '',
                followEndTime: '',
                enterStaTime: '',
                enterEndTime: '',
                comStaTime: '',
                comEndTime: ''
            }
        },
        computed: {
            scrollData() {
                return {
                    list: this.list,
                    stepOne: this.stepOne,
                    stepTwo: this.stepTwo,
                }
            },
            position() {
                return this.stepOne ? 'sideRight' : 'bottom'
            }
        },
        methods: {
            selectStatus(obj) {
                this.statusObj = obj
                this.changeStep(1)
            },
            changeStep(step) {
                if (step == 1) {
                    this.stepOne = true
                    this.stepTwo = false
                    // this.stepThree = false
                }
                if (step == 2) {
                    this.stepOne = false
                    this.stepTwo = true
                    // this.stepThree = false
                }
            },
            selectDay(field) {
                app.calendar().then(res => {
                    this[field] = res
                })
            },
            selectMainPerson() {
                app.empSelect(0).then(res => {
                    this.mainPerson = {
                        name: res.name,
                        id: res.id
                    }
                })
            },
            clearData() {
                this.statusObj = {}
                this.mainPerson = {}
                this.followStaTime = ''
                this.followEndTime = ''
                this.enterStaTime = ''
                this.enterEndTime = ''
                this.comStaTime = ''
                this.comEndTime = ''
            },
            emit() {
                this.$emit('selectMore', {
                    NextDate1: this.followStaTime,
                    NextDate2: this.followEndTime,
                    CreateTime1: this.enterStaTime,
                    CreateTime2: this.enterEndTime,
                    LastDate1: this.comStaTime,
                    LastDate2: this.comEndTime,
                    employeeid: this.mainPerson.id ? this.mainPerson.id : '',
                    employeename: this.mainPerson.name ? this.mainPerson.name : '',
                    Status: this.statusObj.ID ? this.statusObj.ID : ''
                })
            }
        },
        watch: {
            opened(val) {
               this.changeStep(1)
            },
            stepTwo(val) {
                if (val) {
                    this.list = app.customConfigInfo.CustomerStatus
                }
            }
        }
    }
</script>