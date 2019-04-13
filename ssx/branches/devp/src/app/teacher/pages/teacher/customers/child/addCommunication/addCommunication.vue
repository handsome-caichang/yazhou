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
                    @include ellipsis-single;
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
                    flex-wrap: wrap;
                    .select {
                        // flex: 1;
                        width: 47%;
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
                <div class="item-left">沟通方式<span class="spec" v-if="type=='add'">*</span></div>
                <div class="item-right" @click="openSelect('showSelectType')">
                    {{commType.Value || ''}}
                    <svg class="icon" aria-hidden="true" v-if="type=='add'">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item">
                <div class="item-left">客户状态</div>
                <div class="item-right" @click="openSelect('showSelectStatus')">
                    {{customState.Value || ''}}
                    <svg class="icon" aria-hidden="true" v-if="computeStatusEdit">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item">
                <div class="item-left">意向级别</div>
                <div class="item-right" @click="openSelect('showSelectWillLevel')">
                    <svg class="icon" aria-hidden="true" v-for="i in level">
                        <use xlink:href="#icon-yixiangdengji"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true" v-if="type=='add'">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="big-item" v-if="!(type=='edit'&&isVisit)">
                <div class="item-heard">
                    <div class="heard-left">沟通结果<span class="spec" v-if="type=='add'">*</span></div>
                    <div class="heard-right" @click="openSelect('showSelectResult')">
                        {{commResult.Value || ''}}
                        <svg class="icon" aria-hidden="true" v-if="type=='add'">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
                <div class="item-heard">
                    <div class="heard-left">承诺到访</div>
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
                    <div class="select"
                         v-if="selectCampusRights" 
                         @click="showSelectCampus=true" 
                         :class="{'active': campusObj.Key}">
                        {{campusObj.Value?campusObj.Value.Name:'分配到校区'}}
                        <span class="spec">*</span>
                    </div>
                </div>
            </div>
            <div class="void"></div>
            <div class="big-item">
                <div class="item-heard">
                    <div class="heard-left">沟通内容<span class="spec">*</span></div>
                    <div class="heard-right small-font" @click="showSelectMode=true">
                        选择模板
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
                <textarea 
                    class="textarea" 
                    v-model="text"
                    maxlength="300" 
                    @touchstart="app.area.start($event)"
                    @touchmove="app.area.move($event)"
                    @touchend="app.area.end($event)" 
                    placeholder="请输入沟通内容(必填,限300字)">
                        
                </textarea>
            </div>
            <div class="void"></div>
            <div class="item">
                <div class="item-left">下次跟进方式</div>
                <div class="item-right" @click="nextVisitType">
                    {{nextCommType.Value || ''}}
                    <svg class="icon" aria-hidden="true" v-if="type=='add'">
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

        <select-campus 
            :opened.sync="showSelectCampus"
            :campusObj="campusObj"
            @selectCampusObj="selectCampusObj">
                
        </select-campus>
    </div>
</template>

<script>
    import SelectCommMode from './selectCommMode'
    import SelectCustomStatus from '../selectCustomStatus'
    import SelectWillLevel from './selectWillLevel'
    import SelectCommunicationMode from './selectCommunicationMode'
    import SelectCommunicationResult from './selectCommunicationResult'
    import SelectVisitType from './selectVisitType'
    import SelectCampus from '../selectCampus.vue'
    import {saveData, queryCustomer} from 'teacher/api/customers'
    
    export default {
        data() {
            return {
                wxTitle: this.$route.params.type === 'add' ? '添加沟通记录' : '修改沟通记录',
                next: false,

                scrollData: 0,
                showSelectType: false, 
                showSelectStatus: false,
                showSelectWillLevel: false,
                showSelectMode: false,
                showSelectResult: false,
                showSelectVisitType: false,
                showSelectCampus: false,

                campusObj: {},

                commType: {}, //沟通方式
                nextCommType: {}, //下次跟进方式
                customState: {}, //客户状态
                commResult: {}, //沟通结果
                mustVistTime: '', //承若到访时间
                mustVistType: {}, //承若到访类型
                nextVisitTime: '', //下次跟进方式
                level: 0, //意向级别
                isMustVist: false, //是否承若到访
                text: '',
                isValid: null, // 0 无效|| 1 有效
                isVisit: 0,
                type: this.$route.params.type,  //add为添加 edit为编辑

                selectCampusRights: false
            }
        }, 
        
        computed: {
            ...Vuex.mapState(['customInfo']),
            computeStatusEdit() {
                let flag = true
                if (this.type == 'add' && this.customInfo.CustomerStatusName == '转化成功') flag = false
                if (this.type == 'edit') flag = false
                return flag
            },

        },
        methods: {
            openSelect(key) {
                if (key == 'showSelectStatus' && !this.computeStatusEdit) return
                this[key] = true 
            },
            selectCommType(obj) {
                this.commType = obj
                // this.showSelectType = false
            },
            selectCustomStatus(obj) {
                this.customState = obj
                // this.showSelectStatus = false
            },
            selectLevel(i) {
                this.level = i
                // this.showSelectWillLevel = false
            },
            selectMustVist() {
                this.scrollData ++
                this.isMustVist = !this.isMustVist
                if (!this.isMustVist) {
                    this.mustVistTime = ''
                    this.mustVistType = {
                        Value: '',
                        ID: '00000000-0000-0000-0000-000000000000'
                    }
                }
            },
            selectCampusObj(obj) {
                console.log(obj);
                this.campusObj = obj
                this.showSelectCampus = false
            },
            seletVisitTime() {
                app.datetimePicker({format:'YYYY-MM-DD HH:mm'}).then(res => {
                    this.mustVistTime = res
                })
            },
            selectVisitType(obj) {
                this.mustVistType = obj
                this.showSelectVisitType = false
            },
            nextVisitType() { //下次跟进方式的选择
                if (this.type === 'edit') return
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
                if (!this.commType.Value) {
                    app.toast('info', '请选择沟通方式。')
                    return     
                }
                if (!this.commResult.Value) {
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
                    if (this.selectCampusRights && !this.campusObj.Key) {
                        app.toast('info', '请选择校区')
                        return
                    }
                }
                if (!this.text) {
                    app.toast('info', '请输入沟通内容。')
                    return
                }
                let today = new Date(),
                    year = today.getFullYear(),
                    mouth = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1),
                    day = today.getDate() > 9 ? today.getDate() : '0' + today.getDate(),
                    str = `${year}${mouth}${day}`
                let time = this.nextVisitTime.replace(/\-/g, '') - str, params
                if (this.nextVisitTime && time < 0 ) {
                    app.toast('info', '下次跟进日期不能小于今天。')
                    return
                }
                if (this.type == 'add') {
                    params = {
                        saveFlag: 'postcommunication', 
                        customerID: this.$route.params.id,
                        mode: this.commType.ID,
                        content: this.text,
                        nextMode: this.nextCommType.ID,
                        nextDate: this.nextVisitTime,
                        willLevel: this.level,
                        customerStatus: this.customState.ID,
                        isCampusInvite: this.isMustVist ? 1 : '',
                        visitDate: this.mustVistTime,
                        isValid: this.isValid,
                        visitType: this.mustVistType.ID,
                        DisTributionCampusid: this.campusObj.Key,
                        DistributionCampusName: this.campusObj.Value && this.campusObj.Value.Name
                    }
                } else {
                    params = {
                        saveFlag: 'putcommunication',
                        id: this.$route.params.id,
                        content: this.text,
                        nextDate: this.nextVisitTime,
                        visitDate: this.mustVistTime,
                        visitType: this.mustVistType.ID,
                        isCampusInvite: this.isMustVist ? 1 : 0
                    }
                }
                saveData(params).then(res => {
                    if (res.errcode === app.errok) {
                        app.event.emit('addCommunication');
                        app.event.emit('addCustomer');
                        this.$router.go(-1)
                    }else if(res.errcode === 401){
                        app.alert({
                            'title': '权限不足',
                            'text': res.errmsg,
                            btn: {
                                'text': '知道了',
                                'style': {},
                                'action': true
                            }
                        });
                    }else{
                        app.toast('error',res.errmsg)
                    }

                })
            },
            getData() {
                queryCustomer({
                    pname: 'getcommunication',
                    id: this.$route.params.id
                }).then(res => {
                    if (res.errcode === app.errok) {
                        this.scrollData ++
                        // this.customState.Value = res.data.Mode
                        let str = res.data.IsValid ? '有效沟通' : '无效沟通'
                        this.level = parseInt(res.data.WillLevel)
                        this.isMustVist = res.data.InviteDate ? 1 : ''
                        this.mustVistTime = res.data.InviteDate.substring(0, 10)
                        this.text = res.data.Content
                        this.nextVisitTime = res.data.NextDate
                        this.isVisit = res.data.IsVisit
                        this.campusObj.Key = res.data.DistributionCampusid
                        let value = {Name: res.data.DistributionCampusName}
                        this.campusObj.Value = value

                        this.$set(this.customState, 'Value', res.data.CustomerStatus)
                        this.$set(this.commResult, 'Value', str)
                        this.$set(this.nextCommType, 'Value', res.data.NextMode)
                        this.$set(this.commType, 'Value', res.data.Mode)
                        this.$set(this.mustVistType, 'Value', res.data.VisitTypeName)
                        this.$set(this.mustVistType, 'ID', res.data.VisitType)
                    }
                })
            },
            renderPage() {
                if (this.type == 'add') {
                    this.level = this.customInfo.WillLevel
                    this.customState = {
                        Value: this.customInfo.CustomerStatusName,
                        ID: this.customInfo.CustomerStatus
                    }
                } else if (this.type == 'edit') {
                    this.getData()
                }
            },
        },
        watch: {
            
        },
        created() {
            window.a = this
            if (app.sysInfo.ID == this.$route.params.salePersonId && app.tool.op('UpdateCustomerCampus')) this.selectCampusRights = true
            this.renderPage()
        },
        components: {
            SelectCustomStatus,
            SelectWillLevel,
            SelectCommunicationMode,
            SelectCommunicationResult,
            SelectCommMode,
            SelectVisitType,
            SelectCampus
        }
    }
</script>