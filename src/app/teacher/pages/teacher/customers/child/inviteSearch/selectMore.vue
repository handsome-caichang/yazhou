<style scoped lang="scss">
    .role-actionsheet {
        @include position-absolute;
        z-index: 1000;
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
                    color: #BBBBBB;
                    display: flex;
                    .item-bottom-left, .item-bottom-right {
                        border: 1px solid #EEF1F6;
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
                border-top: 1px solid #EBEBEB;
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
                <div class="item-heard">实到访日</div>
                <div class="item-bottom" >
                    <div class="item-bottom-left" @click="selectDay('visitStartTime')" :class="{active1:visitStartTime!==''}">
                        {{visitStartTime ? visitStartTime : '开始时间'}}
                    </div>
                    <div class="item-bottom-right" @click="selectDay('visitEndTime')" :class="{active1:visitEndTime!==''}">
                        {{visitEndTime ? visitEndTime : '结束时间'}}
                    </div>
                </div>
            </div>
            <div class="status ss">
                <div class="status-left">是否首次到访</div>
                <div class="status-right" @click="isFirstVisit=isFirstVisit===0?1:0">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="isFirstVisit===1?'#icon-danxuanxuanzhong1':'#icon-danxuanweixuanzhong1'"></use>
                    </svg>
                </div>
            </div>
            <div class="status ss">
                <div class="status-left">审核状态</div>
                <div class="status-mid" @click="changeStep(3)">
                    {{auditStatusObj.Value}}
                </div>
                <div class="status-right" @click="changeStep(3)">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
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
                <div class="status-left" @click="selectMainPerson">选择主责任人</div>
                <div class="status-mid" @click="selectMainPerson">{{mainPerson.name}}</div>
                <div class="status-right">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="status">
                <div class="status-left" @click="selectScoendPerson">选择副责任人</div>
                <div class="status-mid" @click="selectScoendPerson">{{scoendPerson.name}}</div>
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
            <div class="container2" v-show="stepTwo || stepThree">
                <div class="actionsheet-item"
                    :class="{'active':statusObj.ID==item.ID||auditStatusObj.ID==item.ID}"
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
                stepThree: false,
                list: [],
                statusObj: {},
                auditStatusObj: {Value: '不限', ID: -1},
                mainPerson: {},
                scoendPerson: {},
                visitStartTime: '',
                visitEndTime: '',
                isFirstVisit: 0
            }
        },
        computed: {
            scrollData() {
                return {
                    list: this.list,
                    stepOne: this.stepOne,
                    stepTwo: this.stepTwo,
                    stepThree: this.stepThree
                }
            },
            position() {
                return this.stepOne ? 'sideRight' : 'bottom'
            }
        },
        methods: {
            selectStatus(obj) {
                if (this.stepTwo) this.statusObj = obj
                if (this.stepThree) this.auditStatusObj = obj
                this.changeStep(1)
            },
            changeStep(step) {
                if (step == 1) {
                    this.stepOne = true
                    this.stepTwo = false
                    this.stepThree = false
                }
                if (step == 2) {
                    this.stepOne = false
                    this.stepTwo = true
                    this.stepThree = false
                }
                if (step == 3) {
                    this.stepOne = false
                    this.stepTwo = false
                    this.stepThree = true
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
            selectScoendPerson() {
                app.empSelect(0).then(res => {
                    this.scoendPerson = {
                        name: res.name,
                        id: res.id
                    }
                })
            },
            clearData() {
                this.auditStatusObj = {Value: '不限', ID: -1}
                this.statusObj = {}
                this.mainPerson = {}
                this.scoendPerson = {}
                this.visitStartTime = ''
                this.visitEndTime = ''
                this.isFirstVisit = 0
                /*if (app.tool.op('CustomerFilter')) {//对只能根据电话号码精确查找权限处理
                }*/
            },
            emit() {
                this.$emit('selectMore', {
                    visitSdate: this.visitStartTime,
                    visitEdate: this.visitEndTime,
                    mainSalePersonid: this.mainPerson.id ? this.mainPerson.id : '',
                    mainSalePersonName: this.mainPerson.name ? this.mainPerson.name : '',
                    nextSalePersonid: this.scoendPerson.id ? this.scoendPerson.id : '',
                    nextSalePersonName: this.scoendPerson.name ? this.scoendPerson.name : '',
                    IsFirstVisit: this.isFirstVisit,
                    AuditStatus: this.auditStatusObj.ID,
                    Status: this.statusObj.ID ? this.statusObj.ID : ''
                })
            }
        },
        created() {
           
        },
        watch: {
            opened(val) {
               this.changeStep(1)
            },
            stepTwo(val) {
                if (val) {
                    this.list = app.customConfigInfo.CustomerStatus
                }
            },
            stepThree(val) {
                if (val) {
                    this.list = [{
                        Value: '不限',
                        ID: -1
                    }, {
                        Value: '待审核',
                        ID: 0
                    }, {
                        Value: '审核通过',
                        ID: 1
                    }, {
                        Value: '审核不通过',
                        ID: 2
                    }]
                }
            }
        },
        components: {
            
        }
    }
</script>