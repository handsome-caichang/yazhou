<style lang="scss" scoped>
    
	

    .filter-page {

        /* 筛选 */
        .filter-box {
            padding: 0 15px;
            .row-item {
                padding-top: 20px;

                span {
                    color: #333333;
                    font-size: 15px;
                    display: block;
                }
                input {
                    width: 45%;
                    height: 30px;
                    border-radius: 2px;
                    text-align: center;
                    border: 1px solid #bbbbbb;
                    outline: none;
                }
                .text-box {
                    display: flex;
                    flex-direction: row;
                    margin-top: 10px;
                    align-items: center;
                    justify-content: space-between;
                    .separate-line {
                        width: 5%;
                        border: none;
                        border-top: 1px solid #eef1f6;
                    }
                    ::-webkit-input-placeholder {
                        color: #BBBBBB;
                        font-size: 12px;
                    }
                    span {
                        width: 45%;
                        height: 30px;
                        border-radius: 2px;
                        line-height: 30px;
                        text-align: center;
                        border: 1px solid #bbbbbb;
                        font-size: 12px;
                        color: #bbbbbb;
                    }
                    .input-style {
                        color: #333333;
                    }
                }
            }
            .class-name {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 44px;
                margin-top: 30px;
                @include border-bottom;
                >span:last-child {
                    width: 75%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    .name {
                        width: 85%;
                        text-align: right;
                        @include ellipsis-single;
                    }
                }
            }
        }
        .action-sheet {
            @include position-absolute(0, 0, 0, 0);
        }

        /* 底部按钮 */
        .bottom-btn {
            width: 100%;
            height: 49px;
            position: absolute;
            bottom: 0;
            display: inline-flex;
            span {
                width: 50%;
                height: 100%;
                text-align: center;
                line-height: 49px;
                font-size: 16px;
            }
            .reset {
                color: #999999;
                border-top: 1px solid #ebebeb;
                background-color: #ffffff;
            }
            .ok {
                color: #ffffff;
                background-color: #1A97F2;
                border-top: 1px solid #1A97F2;
            }
        }
    }
</style>
<template>

    <div class="filter-page">

        <!-- 筛选 -->
        <action-sheet 
            class="action-sheet" 
            v-show="opened" 
            :position="position"
            @close="close" 
            >
            <div class="filter-box">
                <div class="row-item">
                    <span>剩余学费(元)</span>
                    <div class="text-box">
                        <input placeholder="最低值" v-model="params.cost"/>
                        <hr class="separate-line"/>
                        <input placeholder="最高值" v-model="params.endcost"/>
                    </div>
                </div>
                <div class="row-item">
                    <span>沟通时间</span>
                    <div class="text-box">
                        <span :class="{'input-style' : params.sdate!='' }" @click="openCalendar(params.sdate, 1)">{{ params.sdate || '开始日期' }}</span>
                        <hr class="separate-line"/>
                        <span :class="{'input-style' : params.edate!='' }" @click="openCalendar(params.edate, 2)">{{ params.edate || '结束日期' }}</span>
                    </div>
                </div>
                <div class="row-item">
                    <span>跟进时间</span>
                    <div class="text-box">
                        <span :class="{'input-style' : params.snextdate!='' }" @click="openCalendar(params.snextdate, 3)">{{ params.snextdate || '开始日期' }}</span>
                        <hr class="separate-line"/>
                        <span :class="{'input-style' : params.enextdate!='' }" @click="openCalendar(params.enextdate, 4)">{{ params.enextdate || '结束日期' }}</span>
                    </div>
                </div>
                <div class="class-name" @click="selectClassShift()">
                    <span>班级名称</span>
                    <span>
                        <span class="name">{{ className }}</span>
                        <svg class="icon card-next" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </span>
                </div>
            </div>
            <div class="bottom-btn">
                <span class="reset" @click="reset">重置</span>
                <span class="ok" @click="ok">确定</span>
            </div>
        </action-sheet>

        <!-- 选择班级或者课程 -->
        <select-class
            class="as-campus"
            :opened.sync="showSelectClass"
            :totalObj="totalObj"
            @resetClass="resetClass"
            @selectDone="selectDone">
        </select-class>

    </div>

</template>
<script>
    import SelectClass from './class-list.vue'
    export default {
        name: "filter-communication-list",
		mixins: [app.mixin.popupWindowRouteMixin],
        components: {
            SelectClass
        },
        props: {
            opened: {
				type: Boolean,
				default: false
			},
			position: {
				type: String,
				default: "sideRight"
			}
        },
        data() {
            return {
                // 筛选
                params: {
                    cost: '',
                    endcost: '',
                    sdate: '',
                    edate: '',
                    snextdate: '',
                    enextdate: '',
                    classid: '',
                },
                MaxValue: Math.pow(10, 8),
                className: '',
                showSelectClass: false,
                classObj: {}
            }
        },
        computed: {
            totalObj() {
                return this.classObj;
            }
        },
        methods: {
            selectClassShift() {
                this.showSelectClass = true;
            },
            resetData() {
                this.classObj = {};
            },
            resetClass() {
                this.classObj = {};
            },
            selectDone(obj) {
                this.params.classid = obj.ID;
                this.className = obj.Name;
                this.classObj = obj;
                // this.showSelectClass = false;
            },
            // 选择日期
            openCalendar(date, index) {
                app.calendar({value: date}).then(res => {
                    // 1-4,分别为沟通时间，跟进时间的开始日期，结束日期
                    switch (index) {
                        case 1:
                            this.params.sdate = res;
                            break;
                        case 2:
                            this.params.edate = res;
                            break;
                        case 3:
                            this.params.snextdate = res;
                            break;
                        case 4:
                            this.params.enextdate = res;
                            break;
                        default:
                            break;
                    }
                });
            },
            // 确定
            ok() {
                let _param = Object.assign({}, this.params);
                _param.cost = _param.cost == '' ? _param.cost : '>' + _param.cost;
                _param.endcost = _param.endcost == '' ? _param.endcost : '<' + _param.endcost;
                this.$emit('filterParam', _param)
                this._back();
            },
            // 重置
            reset() {
                this.className = '';
                this.resetData();
                Object.assign(this.params, {
                    cost: '',
                    endcost: '',
                    sdate: '',
                    edate: '',
                    snextdate: '',
                    enextdate: '',
                    classid: ''
                });
                this.$emit('filterParam', this.params);
                this._back();
            },
            _back() {
                this.close();
            }
        },
        watch: {
            'params.cost' (newVal, oldVal) {
                let reg = /^\-?\d+.?\d+/g;
                this.params.cost = this.params.cost.replace(reg, '');
                this.params.cost = newVal < this.MaxValue ? newVal : (newVal == '' ? '' : oldVal);
            },
            'params.endcost' (newVal, oldVal) {
                let reg = /^\-?\d+.?\d+/g;
                this.params.endcost = this.params.endcost.replace(reg, '');
                 this.params.endcost = newVal < this.MaxValue ? newVal : (newVal == '' ? '' : oldVal);
            }
        }
    }
</script>
