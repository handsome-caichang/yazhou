<style scoped lang="scss">
    .wrapper {
        @include position-absolute(0, 0, 49px, 0);
        width: 100%;
        .heard {
            height: 44px;
            line-height: 44px;
            padding: 0 12px;
            font-size: 13px;
            color: $color-9;
            background-color: $color-assist-1;
        }
        .item {
            height: 44px;
            line-height: 44px;
            display: flex;
            padding: 0 12px;
            border-bottom: 1px solid $color-assist-1;
            font-size: 15px;
            .item-left {
                flex: 1;
                color: $color-9;
            }
            .item-right {
                flex: 1;
                text-align: right;
                color: $color-3;
                @include ellipsis-single;
            }
            .spec {
                position: relative;
                
                .content {
                    width: 150px;
                    @include ellipsis-single;
                    position: absolute;
                    right: 10px;
                }
                .icon-wrapper {
                    position: absolute;
                    right: 0;
                    top: 0;
                    bottom: 0;
                }
            }
        }
        .describe{
            padding: 0 12px 12px 12px;
            .title{
                height: 44px;
                line-height: 44px;
                font-size: 15px;
                color: $color-9;
            }
            .mark{
                border: 1px solid #cccccc;
                font-size: 12px;
                line-height: 12px;
                color: #333;
                padding: 10px;
            }
        }
        .void {
            height: 10px;
            background-color: $color-assist-1;
        }
    }
    .bottom {
        @include position-absolute(false, 0, 0, 0);
        padding: 0 15px;
        height: 49px;
        @include flex-between;
        font-size: 13px;
        border-top: 1px solid $color-assist-1;
        justify-content: flex-end;
        .record, .edit {
            height: 28px;
            line-height: 28px;
            width: 93px;
            border: 1px solid $color-primary;
            color: $color-primary;
            text-align: center;
            border-radius: 50px;
        }
        .edit {
            background-color: $color-primary;
            color: $color-white;
            margin-left: 10px;
        }
    }
</style>

<template>
    <div>
        <scroller-base class="wrapper" :data="detail">
            <div>
                <div class="heard">
                    基本信息
                </div>
                <div class="item">
                    <div class="item-left">姓名</div>
                    <div class="item-right">{{detail.Name}}</div>
                </div>
                <div class="item">
                    <div class="item-left">录入时间</div>
                    <div class="item-right">{{detail.CreateTime}}</div>
                </div>
                <div class="item" v-if="detail.Sex">
                    <div class="item-left">性别</div>
                    <div class="item-right">{{detail.Sex==1?'男':detail.Sex==2?'女':''}}</div>
                </div>
                <div class="item" v-if="detail.FullTimeSchool">
                    <div class="item-left">公立学校</div>
                    <div class="item-right">{{detail.FullTimeSchool}}</div>
                </div>
                <div class="item" v-if="detail.GradeName">
                    <div class="item-left">年级</div>
                    <div class="item-right">{{detail.GradeName}}</div>
                </div>
                <div class="item">
                    <div class="item-left">手机号码</div>
                    <div class="item-right">{{detail.SMSTel}}</div>
                </div>
                <div class="item" v-if="detail.Birthday">
                    <div class="item-left">出生日期</div>
                    <div class="item-right">{{detail.Birthday}}</div>
                </div>


                <div class="item" v-if="detail.QQ">
                    <div class="item-left">QQ号码</div>
                    <div class="item-right">{{detail.QQ}}</div>
                </div>
                <div class="item" v-if="detail.Father">
                    <div class="item-left">父亲姓名</div>
                    <div class="item-right">{{detail.Father}}</div>
                </div>
                <div class="item" v-if="detail.FatherTel">
                    <div class="item-left" >父亲电话</div>
                    <div class="item-right">{{detail.FatherTel}}</div>
                </div>
                <div class="item" v-if="detail.FatherVocation">
                    <div class="item-left" >父亲职业</div>
                    <div class="item-right">{{detail.FatherVocation}}</div>
                </div>
                <div class="item" v-if="detail.Mother">
                    <div class="item-left" >母亲姓名</div>
                    <div class="item-right">{{detail.Mother}}</div>
                </div>
                <div class="item" v-if="detail.MotherTel">
                    <div class="item-left" >母亲电话</div>
                    <div class="item-right">{{detail.MotherTel}}</div>
                </div>
                <div class="item" v-if="detail.MotherVocation">
                    <div class="item-left" >母亲职业</div>
                    <div class="item-right">{{detail.MotherVocation}}</div>
                </div>
                <div class="item" v-if="detail.OtherTel">
                    <div class="item-left" >家庭电话</div>
                    <div class="item-right">{{detail.OtherTel}}</div>
                </div>
                <div class="item" v-if="detail.LivePlace">
                    <div class="item-left" >家庭住址</div>
                    <div class="item-right">{{app.dom.parseDom(detail.LivePlace)}}</div>
                </div>


                <div class="heard">
                    招生信息
                </div>
                <div class="item">
                    <div class="item-left">招生来源</div>
                    <div class="item-right spec" @click="showCustomFrom">
                        <div class="content">
                            {{detail.SaleModeName}}
                        </div>
                        <div class="icon-wrapper">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="item-left">所属{{app.sysInfo.Title_Campus}}</div>
                    <div class="item-right">{{detail.CampusName}}</div>
                </div>
                <div class="item">
                    <div class="item-left">主责任人</div>
                    <div class="item-right">{{detail.SalePersonName}}</div>
                </div>
                <div class="item" v-if="app.sysInfo.EnableCustomerAutomaticDistribution=='1'">
                    <div class="item-left">市场信息来源</div>
                    <div class="item-right">{{detail.marketInfoOneValue}}</div>
                </div>
                <div class="item" v-if="app.sysInfo.EnableCustomerAutomaticDistribution=='1'">
                    <div class="item-left">市场人员</div>
                    <div class="item-right">{{detail.marketInfoOneUserName}}</div>
                </div>
                <div class="item" v-if="app.sysInfo.EnableCustomerAutomaticDistribution=='1'">
                    <div class="item-left">第二渠道招生来源</div>
                    <div class="item-right" v-if="detail.SaleModeListSec">
                        {{detail.SaleModeListSec.length?detail.SaleModeListSec[0].Name:''}}
                    </div>
                </div>
                <div class="item" v-if="app.sysInfo.EnableCustomerAutomaticDistribution=='1'">
                    <div class="item-left">第二渠道市场信息来源</div>
                    <div class="item-right">{{detail.marketInfoTwoValue}}</div>
                </div>
                <div class="item" v-if="app.sysInfo.EnableCustomerAutomaticDistribution=='1'">
                    <div class="item-left">第二渠道市场人员</div>
                    <div class="item-right">{{detail.marketInfoTwoUserName}}</div>
                </div>
                <div class="item" v-if="detail.WillLevel>0">
                    <div class="item-left">意向级别</div>
                    <div class="item-right">
                        <svg class="icon" aria-hidden="true" v-for="i in detail.WillLevel">
                            <use xlink:href="#icon-yixiangdengji"></use>
                        </svg>
                    </div>
                </div>
                <div class="item" v-if="detail.CustomerStatusName">
                    <div class="item-left">客户状态</div>
                    <div class="item-right">{{detail.CustomerStatusName}}</div>
                </div>
                <div class="item" v-if="computedText">
                    <div class="item-left">预约试听时间</div>
                    <div class="item-right">{{computedText}}</div>
                </div>
                <div class="item" v-if="shiftName">
                    <div class="item-left">意向课程</div>
                    <div class="item-right spec" @click="showShiftName">
                        <div class="content">
                            {{shiftName}}
                        </div>
                        <div class="icon-wrapper">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="describe" v-if="detail.Describe">
                    <div class="title">备注</div>
                    <div v-if="detail.Describe" class="mark" v-html="app.tool.richTextToHtml(detail.Describe)"></div>
                </div>

                <div class="void"></div>
            </div>
        </scroller-base>
        <div class="bottom">
            <router-link tag="div" :to="`/communicationRecords/${$route.params.id}/${$route.params.salePersonId}`" class="record">
                沟通记录
            </router-link>
            <div class="edit" @click="editCusDetail" v-if="app.tool.op('CustomerEdit')">编辑</div>
        </div>
    </div>
</template>

<script>
    import {getCustomers} from 'teacher/api/customers'
    export default {
        computed: {
            shiftName() {
                return this.detail.ShiftClassList && this.detail.ShiftClassList.map(obj => obj.ShiftName).join()
            }
        },
        data() {
            return {
                wxTitle: "意向客户",
                detail: {},
                computedText: '',
                weekList: [{name: '一',value: 1},{name: '二',value: 2},{name: '三',value: 3},{name: '四',value: 4},{name: '五',value: 5},{name: '六',value: 6},{name: '日',value: 7}],
                timeList: [{name: '上午',value: 8},{name: '下午',value: 9},{name: '晚上',value: 10}]
            }
        },
        methods: {
            showCustomFrom() {
                app.dialog('alert', {
                    title: '招生来源',
                    text: this.detail.SaleModeName,
                    btn: {
                        text: '我知道了',
                        style: {
                            fontSize: '15px',
                            color: '#1E88F5',
                        }
                    },
                    clickMask2close: true
                })
            },
            showShiftName() {
                app.dialog('alert', {
                    title: '意向课程',
                    text: this.shiftName,
                    btn: {
                        text: '我知道了',
                        style: {
                            fontSize: '15px',
                            color: '#1E88F5',
                        }
                    },
                    clickMask2close: true
                })
            },
            renderPage() {
                getCustomers({pname: 'getcustomer', id: this.$route.params.id, name: this.$route.params.name}).then(res=> {
                    if (res.errcode == app.errok) {
                        this.detail = res.data
                        let arr = [], fieldArr = []
                        this.weekList.forEach(obj => {
                            if(this.detail.TryDate && this.detail.TryDate.indexOf(obj.value) > -1) arr.push('星期' + obj.name)
                        })
                        this.timeList.forEach(obj => {
                            if(this.detail.TryDate && this.detail.TryDate.indexOf(obj.value) > -1) arr.push(obj.name)
                        })
                        this.computedText = arr.join(',')
                    }
                })
            },
            editCusDetail() {
                app.ls.set('detail', this.detail)
                this.$router.push('/addCustomer/edit')
            }
        },
        created() {
            this.renderPage()
            app.event.on('editCustomer', () => {
                setTimeout(() => {
                    this.renderPage()
                }, 500)
            })
        },
        destroyed() {
            app.event.off('editCustomer')
        }
    }
</script>