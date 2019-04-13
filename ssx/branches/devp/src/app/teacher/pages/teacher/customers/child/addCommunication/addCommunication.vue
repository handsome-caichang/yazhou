<style scoped lang="scss">
    
    
    .wrapper {
        .scroll {
            @include position-absolute(0, 0, 49px, 0);
            .spec {
                color: #E93A0E;
            }
            .item {
                width: 100%;
                height: 44px;
                background-color: $color-white;
                line-height: 44px;
                font-size: 15px;
                color: $color-6;
                border-bottom: 1px solid $color-assist-1;
                padding: 0 12px;
                display: flex;
                .item-left {
                    width: 100px;
                }
                .item-right {
                    flex: 1;
                    text-align: right;
                    color: $color-3;
                }
            }
            .big-item {
                width: 100%;
                padding: 0 12px;
                .item-heard {
                    display: flex;
                    height: 44px;
                    line-height: 44px;
                    .heard-left {
                        width: 100px;
                    }
                    .heard-right {
                        @include ellipsis-single;
                        flex: 1;
                        text-align: right;
                    }
                    .small-font {
                        font-size: 12px;
                        color: $color-9;
                    }
                }
                .item-body {
                    display: flex;
                    .select {
                        flex: 1;
                        height: 32px;
                        line-height: 32px;
                        color: $color-9;
                        border: 1px solid $color-assist-1;
                        font-size: 12px;
                        text-align: center;
                        margin-bottom: 16px;
                    }
                    .active {
                        border: 1px solid $color-primary;
                        color: $color-primary
                    }
                    .marg-r {
                        margin-right: 12px;
                    }
                }
                .textarea {
                    height: 140px;
                    border: 1px solid #cccccc;
                    font-size: 10px;
                    padding: 10px;
                    margin-bottom: 15px;
                    resize: none;
                }
            }
            .void {
                height: 10px;
                background-color: $color-assist-1;
            }
        }
        .bottom {
            @include position-absolute(false, 0, 0, 0);
            height: 49px;
            line-height: 49px;
            color: $color-white;
            background-color: $color-primary;
            text-align: center;
            font-size: 16px;
        }
    }
    
</style>

<template>
    <div class="wrapper">
        <scroller-base class="scroll" :data="scrollData">
            <div class="item">
                <div class="item-left">沟通方式<span class="spec">*</span></div>
                <div class="item-right" @click="showSelectType=true">
                    {{commType.Value || ''}}
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item">
                <div class="item-left">客户状态</div>
                <div class="item-right" @click="showSelectStatus=true">
                    {{customState.Value || ''}}
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item">
                <div class="item-left">意向级别</div>
                <div class="item-right" @click="showSelectWillLevel=true">
                    <svg class="icon" aria-hidden="true" v-for="i in level">
                        <use xlink:href="#icon-xingxingxuanzhong"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="big-item">
                <div class="item-heard">
                    <div class="heard-left">沟通结果<span class="spec">*</span></div>
                    <div class="heard-right" @click="showSelectResult=true">
                        {{commResult.Value || ''}}
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
                <div class="item-heard">
                    <div class="heard-left">承若到访</div>
                    <div class="heard-right" @click="selectMustVist">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="isMustVist?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                        </svg>
                    </div>
                </div>
                <div class="item-body" v-if="isMustVist">
                    <div class="select marg-r" @click="seletVisitTime" :class="{'active': mustVistTime.length}">
                        {{mustVistTime.length?mustVistTime:'选择到访日期'}}
                        <span class="spec" v-if="!mustVistTime.length">*</span>
                    </div>
                    <div class="select" @click="showSelectVisitType=true" :class="{'active': mustVistType.Value}">
                        {{mustVistType.Value?mustVistType.Value:'选择到访类型'}}
                        <span class="spec" v-if="!mustVistType.Value">*</span>
                    </div>
                </div>
            </div>
            <div class="void"></div>
            <div class="big-item">
                <div class="item-heard">
                    <div class="heard-left">沟通内容</div>
                    <div class="heard-right small-font" @click="showSelectMode=true">
                        选择模板
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
                <textarea class="textarea" v-model="text" placeholder="请输入沟通内容(必填,限300字)"></textarea>
            </div>
            <div class="void"></div>
            <div class="item">
                <div class="item-left">下次跟进方式</div>
                <div class="item-right" @click="nextVisitType">
                    {{nextCommType.Value || ''}}
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="big-item">
                <div class="item-heard">
                    <div class="heard-left">下次跟进时间<span class="spec">*</span></div>
                    <div class="heard-right" >
                        <!-- <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg> -->
                    </div>
                </div>
                <div class="item-body">
                    <div class="select marg-r" @click="selectNextVisitTime" :class="{'active':nextVisitTime.length}">
                        {{nextVisitTime.length?nextVisitTime:"选择时间"}}
                    </div>
                    <div class="select" @click="selectWaitTime" :class="{'active':!nextVisitTime.length}">时间待定</div>
                </div>
            </div>
            <div class="void"></div>
        </scroller-base>
        <div class="bottom" @click="saveData">提交</div>
        <!-- 选择沟通方式 -->
            <!-- @close="close" -->
        <select-comm-mode 
            :opened.sync="showSelectType"
            :next="next"
            :commType="commType"
            :nextCommType="nextCommType"
            @selectCommType="selectCommType"
            @selectNextCommType="selectNextCommType">
        </select-comm-mode>
        <!-- 选择客户状态 -->
            
        <select-custom-status 
            :opened.sync="showSelectStatus"
            :customState="customState"
            @selectCustomStatus="selectCustomStatus">
        </select-custom-status>
        <!-- 选择意愿级别 -->
        <select-will-level
            :opened.sync="showSelectWillLevel"
            :level="level"
            @selectLevel="selectLevel">
        </select-will-level>
        <!-- 选择沟通模板 -->
        <select-communication-mode
            :opened.sync="showSelectMode"
            @selectMode="selectMode">
        </select-communication-mode>
        <!-- 选择沟通结果 -->
        <select-communication-result
            :opened.sync="showSelectResult"
            @selectValidResult="selectValidResult"
            @selectNotvalidResult="selectNotvalidResult">
        </select-communication-result>
        <!-- 选择到访类型 -->
        <select-visit-type
            :opened.sync="showSelectVisitType"
            @selectVisitType="selectVisitType">
        </select-visit-type>
    </div>
</template>

<script>
    import SelectCommMode from './selectCommMode'
    import SelectCustomStatus from '../selectCustomStatus'
    import SelectWillLevel from './selectWillLevel'
    import SelectCommunicationMode from './selectCommunicationMode'
    import SelectCommunicationResult from './selectCommunicationResult'
    import SelectVisitType from './selectVisitType'
    import {saveData} from 'teacher/api/customers'
    export default {
        data() {
            return {
                next: false,

                scrollData: 0,
                showSelectType: false, 
                showSelectStatus: false,
                showSelectWillLevel: false,
                showSelectMode: false,
                showSelectResult: false,
                showSelectVisitType: false,

                commType: {},
                nextCommType: {},
                customState: {},
                commResult: {},
                mustVistTime: '',
                mustVistType: {},
                nextVisitTime: '',
                level: 0,
                isMustVist: false,
                text: '',
                isValid: null // 0 无效|| 1 有效
            }
        },
        computed: {
            ...Vuex.mapState(['customInfo'])
        },
        methods: {
            // close(obj) {
            //     this.showSelectType = false
            //     this.showSelectStatus = false
            //     this.showSelectWillLevel = false
            //     this.showSelectMode = false
            //     this.showSelectResult = false
            //     this.showSelectVisitType = false
            // },
            selectCommType(obj) {
                this.commType = obj
                this.showSelectType = false
                // this.close()
            },
            selectCustomStatus(obj) {
                this.customState = obj
                this.showSelectStatus = false
                // this.close()
            },
            selectLevel(i) {
                this.level = i
                this.showSelectWillLevel = false
            },
            selectMustVist() {
                this.scrollData ++
                this.isMustVist = !this.isMustVist
            },
            seletVisitTime() {
                app.calendar().then(res => {
                    this.mustVistTime = res
                })
            },
            selectVisitType(obj) {
                this.mustVistType = obj
                this.showSelectVisitType = false
            },
            nextVisitType() { //下次跟进方式的选择
                this.next = true
                this.showSelectType = true
            },
            selectNextCommType(obj) {
                this.showSelectType = false
                this.next = false
                this.nextCommType = obj
            },
            selectNextVisitTime() {
                app.calendar().then(res => {
                    this.nextVisitTime = res
                })
            },
            selectWaitTime() {
                this.nextVisitTime = ''
            },
            selectMode(str) {
                this.text = str
                this.showSelectMode = false
            },
            selectValidResult() {
                this.showSelectResult = false
                this.commResult = {Value: '有效沟通'}
                this.isValid = 1
            },
            selectNotvalidResult(obj) {
                this.showSelectResult = false
                this.isValid = 0
                this.commResult = {Value: '无效沟通'}
                this.text = obj.Value
            },
            saveData() {
                if (!this.commType.ID) {
                    app.toast('info', '请选择沟通方式。')
                    return     
                }
                if (this.isValid === null) {
                    app.toast('info', '请选择沟通结果。')
                    return 
                }
                if (this.isMustVist) {
                    if (!this.mustVistTime) {
                        app.toast('info', '请选择到访时间。')
                        return
                    }
                    if (!this.mustVistType.Value) {
                        app.toast('info', '请选择到访类型。')
                        return
                    }
                }
                if (!this.text) {
                    app.toast('info', '请输入沟通内容。')
                    return
                }
                let time = new Date(this.nextVisitTime) - new Date()
                if (this.nextVisitTime && time < 0 ) {
                    app.toast('info', '下次到访日期必须大于今天。')
                    return
                }
                let params = {
                    saveFlag: 'postcommunication',
                    customerID: this.$route.params.id,
                    mode: this.commType.ID,
                    content: this.text,
                    nextMode: this.nextCommType.ID,
                    nextDate: this.nextVisitTime,
                    willLevel: this.level,
                    customerStatus: this.customState.ID,
                    isCampusInvite: this.isMustVist ? 0 : 1,
                    visitDate: this.mustVistTime,
                    isValid: this.isValid,
                    visitType: this.mustVistType.ID
                }
                saveData(params).then(res => {
                    if (res.errcode === app.errok) {
                        this.$router.go(-1)
                    }

                })
            }
        },
        watch: {
            text(val) {
                if (val.length > 300) {
                    app.toast('info', '最多输入300个字。')
                    this.text = this.text.substr(0, 300)
                }
            }
        },
        created() {
            this.level = this.customInfo.WillLevel
            this.customState = {
                Value: this.customInfo.CustomerStatusName,
                ID: this.customInfo.CustomerStatus
            } 
        },
        components: {
            SelectCustomStatus,
            SelectWillLevel,
            SelectCommunicationMode,
            SelectCommunicationResult,
            SelectCommMode,
            SelectVisitType
        }
    }
</script>