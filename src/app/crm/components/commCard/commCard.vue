<style scoped lang="scss">
    .card {
        height: 108px;
        background-color: $color-white;
        border-radius: 10px;
        padding: 18px 16px 15px 16px;
        display: flex;
        position: relative;
        .tag {
            width: 2px;
            height: 16px;
            background-color: #75859B;
            @include position-absolute(20px, false, false, 0);
            &.active1 {
                background-color: #00CE7D;
            }
        }
        .card-left {
            width: 70%;
            .name-wrapper {
                @include flex-between;
                justify-content: flex-start;
                .name {
                    max-width: 50%;
                    font-size: 16px;
                    @include ellipsis-single;
                    color: $color-3;
                }
                .customer-statue {
                    @include ellipsis-single;
                    margin-left: 10px;
                    height: 16px;
                    line-height: 16px;
                    width: 50px;
                    text-align: center;
                    font-size: 9px;
                    border-radius: 8px;
                    background-color: rgba(117, 133, 155, .1);
                    color: #99A9BE;
                }
                .active {
                    color: #00CE7D;
                    background-color: rgba(0, 206, 125, .1);
                    // opacity: 1;
                }
            }
            .level {
                margin-top: 15px;
                font-size: 12px;
                color: $color-9;
                .icon-wrapper {
                    display: inline-block;
                    margin-left: 3px;
                    color:#E7E7E6;
                }
                .active {
                    color: #FFD427;
                }
            }
            .source {
                margin-top: 5px;
                font-size: 12px;
                color: $color-9;
                .text {
                    color: $color-6;
                    margin-left: 3px;
                }
            }
        }
        .card-right {
            flex: 1;
            @include flex-between;
            justify-content: flex-end;
            font-size: 33px;
            .icon-wrapper {
                flex: 1;
                text-align: center;
                .tel {
                    display: inline-block;
                    margin-right: 10px;
                }
            }
            .claim {
                width: 70px;
                height: 32px;
                line-height: 32px;
                text-align: center;
                background-color: #5991FF;
                color: $color-white;
                font-size: 15px;
                border-radius: 22px;
                border: 1px solid #5991FF;
            }
        }
    }
</style>

<template>
    <div class="card" v-if="cardInfo">
        <div class="tag" v-if="cardInfo.followstatus!==5"></div>
        <div class="tag active1" v-if="cardInfo.followstatus==5"></div>
        <router-link tag="div" :to="{path: `/detail/${cardInfo.id}/${cardInfo.followstatus}`}" class="card-left">
            <div class="name-wrapper">
                <div class="name">
                    {{cardInfo.name}}
                </div>
                <div class="customer-statue"  v-if="cardInfo.followstatus!==5&&cardInfo.statusname">
                    {{cardInfo.statusname}}
                </div>
                <div class="customer-statue active"  v-if="cardInfo.followstatus==5">
                    转化成功
                </div>
            </div>
            <div class="level">
                意向级别 
                <span class="icon-wrapper"  v-for="(i, index) in 5" :class="{active: cardInfo.intentionallevel>index}">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-wuxing"></use>
                    </svg>
                </span> 
            </div>
            <div class="source">招生来源
                <span class="text">{{cardInfo.sourcename}}</span>
            </div>
        </router-link>
        <div class="card-right">
            <div class="icon-wrapper" 
                v-if="$route.name=='home'||$route.name=='offer'||$route.name=='todayPlan'||$route.name=='search'">
                <a type="text" class="tel" :href="'tel:'+cardInfo.mobile">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-dianhua"></use>
                    </svg>
                </a>
                <span @click="emitEvent">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-caozuo"></use>
                    </svg>
                </span>
            </div>
            <div class="claim" v-if="$route.name=='customerSeas'" @click="claimCustomer">认领</div> 
        </div>
    </div>
</template>

<script>
    import {claimCustomer, becomeFormalStudent, turnCustomer, discardCustomer, bindWechat} from 'crm/api/yy.js'
    export default {
        props: {
            cardInfo: {
                type: Object
            }
        },
        data() {
            return {
                /*op: {
                    1 : '公海',
                    2 : '线索',
                    3 : '跟进中',
                    4 : '试听中',
                    5 : '转化成功'
                }*/
            }
        },
        computed: {
          
        },  
        methods: {
            commSend(ajaxPromise, params, text) {
                ajaxPromise(params).then(res => {
                    if (res.result.code === app.errok) {
                        app.toast('success', text)
                        app.event.emit('refreshList')
                    } else {
                        app.toast('info', res.result.msg)
                    }
                })
            },
            openChat(wxuserid) {
                if (!wxuserid) return
                wx.openEnterpriseChat({
                    externalUserIds: wxuserid, // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
                    groupName: '', // 必填，会话名称。单聊时该参数传入空字符串""即可。
                    success: function(res) {
                        console.log(res)
                    },
                    fail: function(res) {
                        app.toast('info', res)
                        if (res.errMsg.indexOf('function not exist') > -1) {
                            alert('版本过低请升级')
                        }
                    }
                })
                
            },
            juggBindWx() {
                let wxuserid = this.cardInfo.wxuserid
                console.log(wxuserid);
                if (!wxuserid) {
                    setTimeout(() => {
                        app.confirm({
                            title: "提示",
                            text: '该客户没有关联企业微信外部联系人',
                            btns: [{
                                text: '取消',
                                style: {color: '#333'},
                                action: false // 'cancel'
                            }, {
                                text: '前往关联',
                                style: {color:'#5991FF'},
                                action: true // 'confirm'
                            }]
                        }).then(res => {
                            if (res) {
                                wx.invoke('selectExternalContact', {
                                    "filterType": 0
                                }, (res) => {
                                    if (res.err_msg == "selectExternalContact:ok") {
                                        if (res.userIds.length > 1) {
                                            app.toast('info', '只能关联一个外部联系人')
                                            wxuserid = ''
                                            return
                                        }
                                        wxuserid = res.userIds[0]
                                        bindWechat({
                                            customerid: this.cardInfo.id,
                                            wechatuserId: wxuserid,
                                            wechat: ''
                                        }).then(res => {
                                            if (res.result.code == app.errok) {
                                                app.event.emit('refreshList')
                                                // this.openChat(wxuserid)
                                            } else {
                                                app.toast('info', res.result.msg)
                                            }
                                        })
                                    } else {
                                        //错误处理
                                    }
                                });
                            }
                        })
                    }, 300)
                } else {
                    this.openChat(wxuserid)
                }
            },
            emitEvent() {
                app.studentOperate({followstatus: this.cardInfo.followstatus}).then(res => {
                    console.log(res);
                    console.log(this.cardInfo);
                    switch(res) {
                        case 'cChat':
                            this.juggBindWx()
                        break
                        case 'cToCustomer': //转学员
                            this.commSend(turnCustomer, {
                                customerid: this.cardInfo.id,
                                status: 3
                            }, '转化成功')
                        break
                        case 'cTransAudition': //转试听
                            this.commSend(becomeFormalStudent, {
                                customerid: this.cardInfo.id,
                                status: 4
                            }, '转化成功')
                        break
                        case 'cTransService':  //转正式
                            this.commSend(becomeFormalStudent, {
                                customerid: this.cardInfo.id,
                                status: 5
                            }, '转化成功')
                        break
                        case 'cDrop': //丢弃
                            this.commSend(discardCustomer, {
                                customerid: this.cardInfo.id,
                            }, '丢弃成功')
                        break
                        case 'cAddCom': //添加沟通记录
                            this.$router.push({path: `/communicationAdd/${this.cardInfo.id}/${this.cardInfo.statusname}`})
                        break
                    }
                })
            },
            claimCustomer() {
                this.commSend(claimCustomer, {
                    customerid: this.cardInfo.id,
                }, '认领成功')
            }
        },
        created() {
            
        }
        
    }
</script>