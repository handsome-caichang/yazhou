<style scoped lang="scss">
    
    
    .wrapper {
        @include position-absolute(49px, 0, 49px, 0);
        // background-color: $color-assist-1;
        .heard-mid {
            padding: 0 12px;
            height: 44px;
            border-bottom: 1px solid $color-assist-1;
            @include flex-between;
            background-color: $color-white;
            .mid-left {
                flex: 1;
            }
            .mid-right {
                width: 48px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                background-color: #EEF1F6;
                border-radius: 50px;
                color: $color-6;
                font-size: 13px;
            }
        }
        .heard-bottom {
            padding: 0 12px;
            height: 44px;
            line-height: 44px;
            font-size: 15px;
            display: flex;
            border-bottom: 1px solid $color-assist-1;
            background-color: $color-white;
            .heard-bottom-left {
                width: 90px;
                font-size: 15px;
                color: $color-6;
            }
            .heard-bottom-mid {
                padding-left: 10px;
                flex: 1;
                text-align: right;
                @include ellipsis-single;
                color: $color-3;
            }
            .heard-bottom-right {
                width: 20px;
                text-align: right;
            }
        }
        .void {
            height: 10px;
            background-color: $color-assist-1;
        }
        .item {
            @include flex-between;
            font-size: 15px;
            padding: 0 12px;
            height: 44px;
            background-color: $color-white;
            .item-one {
                height: 44px;
                line-height: 44px;
                width: 75px;
                color: $color-6;
                @include ellipsis-multi;
            }
            .item-two {
                font-size: 15px;
                margin-left: 10px;
                width: 60px;
                color: $color-3;
            }
            .item-three {
                margin-left: 10px;
                flex: 1;
                height: 5px;
                position: relative;
                background-color: $color-assist-1;
                border-radius: 50px;
                .rate {
                    @include position-absolute(0, false, 0, 0);
                    height: 5px;
                    border-radius: 50px;
                    background-color: $color-primary;
                }
            }
            .item-four {
                margin-left: 10px;
                width: 10px;
            }
        }
    }

</style>

<template>
    <scroller-base class="wrapper" :data="list" ref="scroll">
        <div>
            <div class="heard-mid">
                <div class="mid-left">
                    <date-bar
                            :sdate='dateObj.sdate'
                            :edate='dateObj.edate'
                            :index="quickDateIndex"
                            @changeDate="changeDate">
                    </date-bar>
                </div>
                <div class="mid-right" @click="emitSelectMode">
                    筛选
                </div>
            </div>
            <div class="heard-bottom">
                <div class="heard-bottom-left">
                    选择校区
                </div>
                <div class="heard-bottom-mid" @click="emit">
                    {{campusText}}
                </div>
                <div class="heard-bottom-right" @click="emit">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item-wrapper" v-for="item in list">
                <div class="void"></div>
                <div class="item">
                    <div class="item-one">
                        {{item.name}}
                    </div>
                    <div class="item-two">
                        {{item.Rate+"%"}}
                    </div>
                    <div class="item-three">
                        <div class="rate" :style="{width:item.Rate + '%'}"></div>
                    </div>
                    <div class="item-four">
                        <!-- <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg> -->
                    </div>
                </div>
            </div>
        </div>
        

       
    </scroller-base>
</template>

<script>
    import {getCustomers} from 'teacher/api/customers'
    
    export default {
        props: {
            campusListOld: {
                type: Array
            },
            campusList: {
                type: Array
            },
            saleModesArr: {
                type: Array
            }
        },
        data() {
            return {
                dateObj:{
                    // sdate:app.tool.getDatesByIndex(3, app.localTimeToServer).sdate,
                    // edate:app.tool.getDatesByIndex(3, app.localTimeToServer).sdate,
                },
                quickDateIndex:-1,
                list: [],
            }
        },
        computed: {
            campusText() {
                let str = ''
                if (this.campusList.length == 0) {
                    str = ''
                }
                if (this.campusList.length == 1) {
                    str = this.campusList[0].Name
                }
                if (this.campusList.length > 1) {
                    str = this.campusList[0].Name + '等' + this.campusList.length + '个学校'
                }
                return str
            }
        },
        methods: {
            initPage(params) {
                getCustomers(params).then(res => {
                    if (res.errcode == app.errok) {
                        this.list = res.data
                    }
                })
            },
            changeDate(obj){
                this.dateObj.sdate = obj.sdate;
                this.dateObj.edate = obj.edate;
                this.quickDateIndex = obj.index;
                this.initPage({
                    pname: 'countbysalemode',
                    sdate: this.dateObj.sdate,
                    edate: this.dateObj.edate,
                    campusids: this.campusListOld.join(),
                    salemodes: this.saleModesArr.join()
                })
            },
            emit() {
                this.$emit('openSelectCampus')
            },
            emitSelectMode() {
                this.$emit('openSelectMode')
            }
           
        },
        created() {
            this.initPage({
                pname: 'countbysalemode',
                campusids: this.campusListOld.join(),
                sdate: this.dateObj.sdate,
                edate: this.dateObj.edate
            })
        },
        watch: {
            campusListOld(val) {
                if (val) {
                    this.initPage({
                        pname: 'countbysalemode',
                        sdate: this.dateObj.sdate,
                        edate: this.dateObj.edate,
                        campusids: this.campusListOld.join(),
                        salemodes: this.saleModesArr.join()
                    })
                }
            },
            saleModesArr(val) {
                if (val) {
                    this.initPage({
                        pname: 'countbysalemode',
                        sdate: this.dateObj.sdate,
                        edate: this.dateObj.edate,
                        campusids: this.campusListOld.join(),
                        salemodes: this.saleModesArr.join()
                    })
                }
            }
        },
        components: {
        }
    }
</script>