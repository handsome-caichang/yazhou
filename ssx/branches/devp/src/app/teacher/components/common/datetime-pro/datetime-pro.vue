<!--开始时间 上课时长 组件-->
<style scoped lang="scss">
    
    

    .datetime-pro-container {
        @include position-absolute;
        .header {
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: $color-9;
        }
        font-size: 15px;
        .footer {
            height: 48px;
            line-height: 48px;
            display: flex;
            justify-content: flex-end;
            padding: 10px 15px;
            @include border-top;
            .cancel,
            .submit {
                width: 93px;
                height: 28px;
                line-height: 28px;
                border: 1px solid transparent;
                border-radius: 27px;
                text-align: center;
                margin-left: 15px;
            }
            .cancel {
                border: 1px solid $color-primary;
                color: $color-primary;
            }
            .submit {
                background-color: $color-primary;
                color: $color-white;
            }
        }
        .time-body {
            height: 370px;
            .start,
            .dur,
            .end {
                height: 44px;
                line-height: 44px;
                padding: 0 15px;
                @include border-top;
                @include flex-between;
                .keyword {
                    flex: 1;
                }
                .time {
                    flex: 1;
                    text-align: right;
                    .icon {
                        width: 9px;
                        height: 9px;
                        position: relative;
                        top: -3px;
                    }
                }
            }
            .end {
                color: $color-9;
                .time {
                    padding-right: 12px;
                }
            }
        }
    }
</style>

<template>
    <action-sheet class="datetime-pro-container" v-show="opened" @close="close">
        <div class="header">{{describe.title}}</div>
        <div class="time-body">
            <!--开始时间-->
            <div class="start" @click="openStartWin">
                <div class="keyword">
                    {{describe.startKW}}：
                </div>
                <div class="time">
                    {{stimepro}}
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="openStart==true?'#icon-sanjiaoxing2':'#icon-sanjiaoxing1'"></use>
                    </svg>
                </div>
            </div>
            <datetime-view
                    ref="datetimeS"
                    @on-change="datetimehange"
                    v-show="openStart"
                    :max-hour="23"
                    :format="opts.format"
                    v-model="stimepro">
            </datetime-view>

            <!--上课时长-->
            <div class="dur" @click="openDurWin">
                <div class="keyword">{{describe.durKW}}：</div>
                <div class="time">{{dtimepro}}
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="openDur==true?'#icon-sanjiaoxing2':'#icon-sanjiaoxing1'"></use>
                    </svg>
                </div>
            </div>
            <datetime-view
                    ref="datetimeD"
                    @on-change="datetimehange"
                    v-show="openDur"
                    :max-hour="23"
                    :format="opts.format"
                    v-model="dtimepro">
            </datetime-view>

            <!--结束时间-->
            <div class="end">
                <div class="keyword">{{describe.endKW}}：</div>
                <div class="time">{{etimepro}}</div>
            </div>
        </div>
        <div class="footer">
            <div class="cancel" @click="cancelPro">取消</div>
            <div class="submit" @click="submitPro">确定</div>
        </div>
    </action-sheet>
</template>

<style>
    .datetime-pro-container .actionsheet-wrap .as-box.middle.bottom .container .as-body {
        max-height: 490px;
    }

    .datetime-pro-container .actionsheet-wrap .dp-content .dp-item .scroller-component .scroller-mask {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        margin: 0 auto;
        width: 100%;
        z-index: 3;
        background-image: -webkit-gradient(linear, left top, left bottom,
        from(rgba(238, 241, 246, 0.9)),
        to(rgba(238, 241, 246, 0.6))),
        -webkit-gradient(linear, left bottom, left top,
                from(rgba(238, 241, 246, 0.9)),
                to(rgba(238, 241, 246, 0.6)));
        background-image: linear-gradient(to bottom, rgba(238, 241, 246, 0.9), rgba(238, 241, 246, 0.6)),
        linear-gradient(to top, rgba(238, 241, 246, 0.9), rgba(238, 241, 246, 0.6));
        background-position: top, bottom;
        background-size: 100% 102px;
        background-repeat: no-repeat;
    }

    .datetime-pro-container .actionsheet-wrap .dp-content {
        padding: 0;
    }

    .datetime-pro-container .actionsheet-wrap .dp-content .dp-item {
        background-color: #eef1f6;
        opacity: 0.9;
    }
</style>

<script>
    // 说明
    //1.引入 import DatetimePro from 'teacher/components/common/datetime-pro/datetime-pro.vue';
    /*2.<datetime-pro class="as-state"
                :opened.sync="openPicktime"
                :timeObj="timeObj"
                @datetimePro="acceptDatetimePro">
            </datetime-pro>

        timeObj在data()里声明
        timeObj: {
                    stimepro: '',//开始时间
                    dtimepro: ''//上课时长  结束时间会计算出来
                },

        acceptDatetimePro在methods里面声明，用来接收传来的时间对象
        {
            stimepro: xxx,//开始时间
            dtimepro: xxx,//上课时长
            etimepro: xxx//结束时间
        }
    */

    export default {
        name: "datetime-pro",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            describe: {
                type: Object,
                default: function () {
                    return {
                        title: '修改上课时间时长',
                        startKW: '开始时间',
                        durKW: '上课时长',
                        endKW: '结束时间'
                    };
                }
            },
            timeObj: {
                type: Object
            },
            opts: {
                type: Object,
                default: function () {
                    return {
                        format: 'HH:mm'
                    }
                },
            }
        },
        data() {
            return {
                today: '',
                stimepro: '', //用于显示的开始时间
                dtimepro: '', //用于显示的上课时长
                etimepro: '', //用于显示的结束时间
                openStart: false,
                openDur: false
            }
        },
        methods: {
            //处理上课时长
            getCourseTime(type, day, start, dura, end) {
                let dayArr = day.split('-'),
                    startArr = start.split(':'),
                    duraArr = dura.split(':'),
                    endArr = end && end.split(':'),
                    date = new Date();

                if (type == 0) { //0：修改开始时间/修改上课时长
                    let sTime = new Date(dayArr[0], parseInt(dayArr[1]) - 1, dayArr[2], startArr[0], startArr[1]),
                        dTime = duraArr[0] * 3600 * 1000 + duraArr[1] * 60 * 1000;

                    date.setTime(sTime.getTime() + dTime);
                    return this.formatDate(date, 'hh:mm');
                } else if (type == 1) { //：1计算上课时长
                    let sTime = new Date(dayArr[0], parseInt(dayArr[1]) - 1, dayArr[2], startArr[0], startArr[1]),
                        eTime = new Date(dayArr[0], parseInt(dayArr[1]) - 1, dayArr[2], endArr[0], endArr[1]);

                    return eTime.getTime() - sTime.getTime();
                }
            },
            //格式化时间
            formatDate(date, format) {
                let o = {
                    "M+": date.getMonth() + 1, //month
                    "d+": date.getDate(), //day
                    "h+": date.getHours(), //hour
                    "m+": date.getMinutes(), //minute
                    "s+": date.getSeconds(), //second
                    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
                    "S": date.getMilliseconds() //millisecond
                };
                if (/(y+)/.test(format))
                    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (let k in o)
                    if (new RegExp("(" + k + ")").test(format))
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                return format;
            },
            datetimehange() {
                this.etimepro = this.getCourseTime(0, this.today, this.stimepro, this.dtimepro, this.etimepro);
            },
            //开始时间
            openStartWin() {
                this.openStart = !this.openStart;
                this.openDur = false;
            },
            //上课时长
            openDurWin() {
                this.openDur = !this.openDur;
                this.openStart = false;
            },
            cancelPro() {
                this.close();
            },
            submitPro() {
                let cstart = this.stimepro,
                    cdura = this.dtimepro,
                    cend = this.etimepro,
                    timeDiff = this.getCourseTime(1, this.today, cstart, cdura, cend);
                //上课时长不能为空
                //结束时间不能小于开始时间
                if (timeDiff == 0) {
                    app.toast('info', '上课时长不能为0。');
                    return
                } else if (timeDiff < 0) {
                    app.toast('info', '结束时间不能小于开始时间。');
                    return
                }

                //关闭datetime-vie弹窗
                this.openStart = false;
                this.openDur = false;

                //emit触发到父组件监听
                this.$emit('datetimePro', {
                    stimepro: this.stimepro,
                    dtimepro: this.dtimepro,
                    etimepro: this.etimepro
                })
                //关闭组件
                this.close();
            }
        },
        watch: {
            opened: function (newVal, oldVal) {
                if (newVal) {
                    //滚动时间状态初始不出现
                    this.openStart = false;
                    this.openDur = false;
                    //初始化时间 开始时间 上课时长 结束时间 (今天 )
                    this.today = this.formatDate(new Date(), 'yyyy-MM-dd');

                    this.stimepro = this.timeObj.stimepro;
                    this.$refs.datetimeS.render();
                    this.dtimepro = this.timeObj.dtimepro || '00:00';
                    this.$refs.datetimeD.render();

                    this.etime = this.getCourseTime(0, this.today, this.stimepro, this.dtimepro)

                }
            }
        },
        components: {
        }
    }
</script>