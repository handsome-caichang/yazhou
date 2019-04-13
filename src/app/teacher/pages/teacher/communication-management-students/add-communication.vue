<!--添加沟通记录-->
<style scoped lang="scss">
	
	
	.add-communication-record-container {
        .scroller {
            @include position-absolute;
            overflow: hidden;
            background-color: #EEF1F6;
        }
        ::-webkit-input-placeholder {
            color: #CCCCCC;
            font-size: 12px;
        }
        .margin-top {
            margin-top: 10px;
        }
        .padding {
            padding: 0 12px;
        }
        .border-bottom {
            @include border-bottom;
        }
        .left-color {
            color: #666666;
        }
        .right-color {
            color: #BBBBBB;
            font-size: 12px;
            // max-width: 80%;
            // display: flex;
        }
        .red-light {
            color: #E93A0E;
            font-size: 7px;
        }
        .deep-light {
            color: #333333;
            font-size: 14px;
            // display: flex;
            // align-content: flex-start
        }
        .textbox {
            width: 100%;
            padding: 0 12px 10px 12px;
        }
        .flex-item {
            height: 49px;
            padding: 0 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .chooseed {
                color: #1E88F5;
                border: 1px solid #1E88F5;
            }
        }
        .layout-fix {
            height: 100px;
        }
        .chooseed {
            color: #1E88F5;
        }
        .date {
            width: 100%;
            height: 60px;
            span {
                width: 45.2%;
                height: 32px;
                border: 1px solid #EEF1F6;
                border-radius: 2px;
                color: #BBBBBB;
                font-size: 12px;
                text-align: center;
                line-height: 32px;
            }
            .chooseed {
                color: #1E88F5;
                border: 1px solid #1E88F5;
            }
            .active {
                color: #1E88F5;
                border: 1px solid #1E88F5;
            }
        }
        .next-date {
            padding: 0 12px;
            display: flex;
            justify-content: space-between;
            width: 100%;
            align-items: center;
            >span:last-child {
                width: 55%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                >span {
                    display: flex;
                    align-items: center;
                    .card-check {
                        font-size: 20px;
                    margin-right: 3px;
                    }
                }
            }
        }
        textarea {
            width: 100%;
            height: 149px;
            border-radius: 2px;
            border: 1px solid #E0E5EE;
            padding: 8px;
            resize: none;
        }
        .layer-horizontal,
        .layer-vertical {
            background-color: #ffffff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            min-height: 44px;
        }
		.layer-horizontal {
            flex-direction: row;
            padding: 0 12px;
            .flex-right {
                width: 70%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                >span:first-child {
                    text-align: right;
                    width: 95%;
                    padding: 10px 0;
                    word-break: break-all;
                }
            }
        }
        .layer-vertical {
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
        }
        .confirm {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 48px;
            background-color: #1E88F5;
            font-size: 16px;
            line-height: 48px;
            text-align: center;
            color: #ffffff
        }
	}
</style>

<template>
	<div class="add-communication-record-container">

        <scroller-base class="scroller" :data="richHtml">
            <!-- 沟通方式 -->
            <div class="layer-horizontal border-bottom" @click="gtfs()">
                <span class="left-color">
                    沟通类型
                    <span class="red-light">*</span>
                </span>
                <span class="flex-right">
                    <span :class="[{'deep-light': stateType.txt != '请选择'}, 'right-color']">
                        {{ stateType.txt }}
                    </span>
                    <svg class="icon card-next" aria-hidden="true" v-if="!isEdit">
                    <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </span>
            </div>

            <!-- 沟通结果 -->
            <div class="layer-horizontal border-bottom" @click="showGTJG">
                <span class="left-color">
                    沟通结果
                    <span class="red-light">*</span>
                </span>
                <span class="flex-right">
                    <span :class="[{'deep-light': gtjg.txt != '请选择'}, 'right-color']">
                        {{ gtjg.txt }}
                    </span>
                    <svg class="icon card-next" aria-hidden="true" v-if="!isEdit">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </span>
            </div>
            <!-- 沟通类型 -->
            <!-- ShowCommunicationManner -->
            <div class="layer-horizontal" @click="opneSelectType" v-if="app.sysInfo.ShowCommunicationManner=='1'">
                <span class="left-color">
                    沟通方式
                    <span class="red-light">*</span>
                </span>
                <span class="flex-right">
                    <span :class="[{'deep-light': commTypeObj.ID}, 'right-color']">
                        {{commTypeObj.Value?commTypeObj.Value:'请选择'}}
                    </span>
                    <svg class="icon card-next" aria-hidden="true" v-if="!isEdit">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </span>
            </div>
            <!-- 沟通内容 -->
            <div class="layer-vertical margin-top">
                <div class="layer-horizontal" @click="showContentList">
                    <span class="left-color">沟通内容<span class="red-light">*</span></span>
                    <span class="right-color">
                        选择模板
                        <svg class="icon card-next" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </span>
                </div>

                <!-- textarea -->
                <div class="textbox">
                    <textarea 
                        name="input-text" 
                        cols="30" 
                        rows="10" 
                        maxlength="300"
                        placeholder="请输入沟通内容(必填，限300字)" 
                        v-model="params.content"
                        @touchstart="app.area.start($event)"
                        @touchmove="app.area.move($event)"
                        @touchend="app.area.end($event)"
                    ></textarea>
                </div>

            </div>

            <!-- 下次跟进方式 -->
            <div class="layer-horizontal margin-top border-bottom" @click="nextgtfs()">
                <span class="left-color">下次跟进类型</span>
                <span class="flex-right">
                    <span class="right-color" :class="[{'deep-light': nextStateType.txt != '请选择'}, 'right-color']">
                        {{ nextStateType.txt }}
                    </span>
                    <svg class="icon card-next" aria-hidden="true" v-if="!isEdit">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </span>
            </div>

            <!-- 下次跟进时间 -->
            <div class="layer-vertical">
                <div class="next-date">
                    <span class="left-color">下次跟进时间<span class="red-light">*</span></span>
                    <span>
                        <span @click="chooseDate()" :class="{'chooseed': params.nextDate != 'nochoose' && params.nextDate != ''}">
                            <svg class="icon card-check" aria-hidden="true">
                                <use :xlink:href="params.nextDate != 'nochoose' && params.nextDate != '' ? '#icon-danxuan' : '#icon-danxuan-weixuanze'"></use>
                            </svg>
                            {{ (params.nextDate === 'nochoose' || params.nextDate === '') ? '选择时间' : params.nextDate }}
                        </span>
                        <span @click="noDate()" :class="{'chooseed': params.nextDate == ''}">
                            <svg class="icon card-check" aria-hidden="true">
                                <use :xlink:href="params.nextDate == '' ? '#icon-danxuan' : '#icon-danxuan-weixuanze'"></use>
                            </svg>
                            时间待定
                        </span>
                    </span>
                </div>
            </div>

            <!-- 提交 -->
            <div class="confirm" @click="addCommunication">提交</div>

        </scroller-base>

        <!-- 沟通方式 -->
        <check :opened.sync="stateType.opened" :header="stateType.header" :list="stateType.CommMode" @emitData="chooseGTFS"></check>
        <!-- 下次跟进类型 -->
        <check :opened.sync="nextStateType.opened" :header="nextStateType.header" :list="nextStateType.CommMode" @emitData="chooseNGTFS"></check>
        <!-- 沟通结果 -->
        <check :opened.sync="gtjg.opened" :header="gtjg.header">
            <div :class="['flex-item', {'chooseed': gtjg.sStatus}]" @click="chooseGTJG(true)">有效沟通</div>
            <div :class="['flex-item', {'chooseed': failType.fStatus}]"  @click="chooseGTJG(false)">
                无效沟通
                <svg class="icon card-next" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </div>
            <div class="layout-fix"></div>
        </check>
        <!-- 无效沟通 -->
        <check :opened.sync="failType.opened" :header="failType.header" :list="failType.NoCommMode" @emitData="chooseReason"></check>
        <!-- 选择模板 -->
        <choose-template :opened.sync="contentList.opened" :header="contentList.header"  :list="contentList.Data" @emitData="chooseContent"></choose-template>
        
        <select-comm-type-list :list="commTypeList" ref="commType"></select-comm-type-list>
		<loading class="loading" v-show="isLoading" :bgType='loadingType'></loading>
	</div>
</template>

<script>
	import {processGet, savePost} from "teacher/api/common";
	import {getDictionartGet} from "teacher/api/communication";
    import StateActionsheet from "teacher/components/common/actionsheets/state-actionsheet.vue";
    import Check from './child/check.vue'
    import ChooseTemplate from './child/chooseTemplate.vue'

    import SelectCommTypeList from './child/selectCommTypeList.vue'

	export default {
		name: "add-communication-record-list",
		data() {
			return {
                wxTitle: "",
                // 沟通类型
                stateType: {
                    header: '沟通类型',
                    opened: false,
                    txt: '请选择'
                },
                // 下次沟通类型
                nextStateType: {
                    header: '下次跟进类型',
                    opened: false,
                    txt: '请选择'
                },
                // 沟通结果
                gtjg: {
                    header: '沟通结果',
                    opened: false,
                    sStatus: false,
                    fStatus: false,
                    txt: '请选择'
                },
                // 无效沟通类型
                failType: {
                    header: '原因',
                    opened: false
                },
                // 沟通内容模板
                contentList: {
                    opened: false,
                    list: []
                },
                params: {
                    saveFlag: 'POST_COMMUNICATION',
                    studentid: this.$router.currentRoute.params.studentID,
                    mode: '',
                    content: '',
                    nextMode: '',
                    nextDate: 'nochoose',
                    isValid: -1, // 0，无效沟通；1，有效沟通
                    manner: ''
                },
                params1: {
					pname: 'getcommunication',
					id: ''
                },
                isEdit: app.tool.parseHash().query.isEdit || false,
                loadingType: 1,
				isLoading: false,

                commTypeList: []
			};
        },
        created() {
            this.getAllType();
            // 修改title
            this.wxTitle = this.isEdit ? '修改沟通记录' : '添加沟通记录';
            // 如果是编辑
            // this.params1.id = app.tool.parseHash().query && app.tool.parseHash().query.id;
            
        },
        computed: {
            richHtml() {
                return {
                    content: this.params.content
                }
            },
            commTypeObj() {
                let listTemp = this.commTypeList.filter(obj => obj.isSelect)
                if (!listTemp.length) {
                    return {}
                } else {
                    return listTemp[0]
                }
            }
		},
		methods: {
            // 编辑
            editInfo() {
                processGet(this.params1).then(res => {
                    if(res.errcode == 200) {
                        // 跟进方式
                        this.stateType.txt = res.data.Mode;
                        // 下次跟进方式
                        this.nextStateType.txt = res.data.NextMode;

                        this.params.isValid = res.data.IsValid;
                        this.gtjg.txt = this.params.isValid == 0 ? '无效沟通' : '有效沟通';

                        this.params.content = res.data.Content;
                        this.params.nextDate = res.data.NextDate;
                        //初始化沟通方式
                        this.params.manner = res.data.Manner
                        this.commTypeList.forEach(obj => {
                            if (obj.Value === res.data.Manner) {
                                this.$set(obj, 'isSelect', true) 
                            }
                        })
                    }
                });
            },
            // 选择沟通方式
            gtfs() {
                if(this.isEdit) return;
                this.stateType.opened = true;
            },
            chooseGTFS(item) {
                this.params.mode = item.ID;
                this.stateType.txt = item.Value;
            },
            nextgtfs() {
                if(this.isEdit) return;
                this.nextStateType.opened = true;
            },
            // 选择下次沟通方式
			chooseNGTFS(item) {
                this.params.nextMode = item.ID;
                this.nextStateType.txt = item.Value;
            },
            // 沟通结果
            showGTJG() {
                if(this.isEdit) return;
                this.gtjg.opened = true;
            },
            // 选择有效沟通还是无效沟通
            chooseGTJG(flag) {
                // 0,无效；1,有效
                this.params.isValid = flag ? 1 : 0;

                this.gtjg.txt = flag ? '有效沟通' : '无效沟通';

                // 有效沟通就关闭,无效的时候需要选择无效原因
                flag ? this.gtjg.opened = false : this.failType.opened = true;

                if(flag) {
                    this.gtjg.opened = false;

                    this.gtjg.sStatus = true;
                    this.gtjg.fStatus = false;
                } else {
                    this.failType.opened = true;

                    this.gtjg.sStatus = false;
                    this.gtjg.fStatus = true;
                }
            },
            // 选择无效沟通原因
            chooseReason(item) {
                this.params.content = item.Value;
                
                // 解决苹果设备下不能连续多次改变路由的问题
                setTimeout(() => {
                    if (this.$route.query.pwIndex === '1') {
                        this.$router.back()
                    }
                }, 90)
                
            },
            // 内容模板
            showContentList() {
                this.isLoading = true;
                // 获取模板字典数据
                getDictionartGet({
                    type: 'COMM_COTENTTPL'
                }).then(res => {
                    this.isLoading = false;
                    this.contentList.opened = true;
                    if(res.ErrorCode == 200) {
                        res.Data.forEach(item => {
                            this.$set(item, 'checked', false);
                            this.$set(item, 'show', false);
                        });
                        this.$set(this.contentList, 'Data', app.tool.clone(res.Data));
                    }
                })
            },
            chooseContent(item) {
                if(item.length == 0) return;
                // 第二次选择的模板会覆盖前面的内容
                this.contentList.list = [...item];
                let _content = ''
                this.contentList.list.forEach(item => {
                    _content += item.Describe;
                });
                this.params.content = _content;
            },
            // 下次跟进时间
            chooseDate() {
                // 不能小于
                app.calendar({value: this.params.nextDate==='nochoose'?'':this.params.nextDate}).then(res => {
                    // 判断下次跟进时间
                    if((new Date(res)).getTime() < new Date(app.tool.getDatesByIndex(0,app.localTimeToServer).sdate).getTime()) {
                        app.toast('info', '下次跟进时间不能小于今天')
                        return;
                    }
                    this.params.nextDate = res;
                });
            },
            // 时间待定
            noDate() {
                this.params.nextDate = '';
            },
			// 发布
			addCommunication() {
                // 沟通同类型
                if(!this.isEdit && this.params.mode === '') {
                    app.toast('info', '请选择沟通类型');
                    return;
                };
                // 是否有效沟通
                if(!this.isEdit && this.params.isValid < 0) {
                    app.toast('info', '请选择沟通是否有效');
                    return;
                };
                if (!this.isEdit && !this.commTypeObj.ID && app.sysInfo.ShowCommunicationManner == '1') {
                    app.toast('info', '请选择沟通方式')
                    return
                }
                // 沟通内容
                if(this.params.content === '') {
                    app.toast('info', '请输入沟通内容');
                    return;
                };
                // 下次跟进时间
                if(!this.isEdit && this.params.nextDate === 'nochoose') {
                    app.toast('info', '请选择下次跟进时间');
                    return;
                };

                this._save();
            },
            _save() {
                let self = this;
                // 如果是编辑状态
                let _params = app.tool.clone(this.params);
                if(this.isEdit) {
                    _params.saveFlag = 'PUT_COMMUNICATION';
                    _params.id = app.tool.parseHash().query.id;
                    
                    // 编辑时，不允许编辑跟进方式，下次跟进方式，不允许更改沟通结果
                    delete _params.mode;
                    delete _params.nextMode;
                    // 不需要studentid
                    delete _params.studentid;

                } else {
                    _params.manner = this.commTypeObj.Value
                }
                this.isLoading = true;
                savePost(_params).then(res => {
                    if(res.errcode ==200) {
                        app.eventDefine.emit('refresh-communication-record');
                        app.toast('success', !this.isEdit ? '添加成功' : '修改成功');
                        this.$router.back();
                        setTimeout(()=> {
                            self.isLoading = false;
                        }, 300);
                    }
                });
            },
            // 获取沟通类型和无效沟通类型
            getAllType() {
                processGet({
                    pname: 'getCommunicationModel'
                }).then((res) => {
                    if(res.errcode == 200) {
                        // 初始化选中状态
                        res.data.CommMode.forEach(item => item.checked = false);
                        res.data.NoCommMode.forEach(item => item.checked = false);
                        // 与接口返回的字段保持一致
                        this.$set(this.stateType, 'CommMode', app.tool.clone(res.data.CommMode));
                        this.$set(this.nextStateType, 'CommMode', app.tool.clone(res.data.CommMode));
                        this.$set(this.failType, 'NoCommMode', app.tool.clone(res.data.NoCommMode));

                        //沟通方式
                        this.commTypeList = res.data.CommManer
                        // this.commTypeList = [{Value: 'SA电访', ID: 1}, {Value: 'LT电访', ID: 2}]
                        this.commTypeList.forEach(obj => {
                            this.$set(obj, 'isSelect', false)
                        })
                    }
                    return res
                }).then(res => {
                    if (this.isEdit) {
                        this.params1.id = this.$route.query.id
                        this.editInfo()
                    }
                })
            },
            opneSelectType() {
                if (this.isEdit) return
                this.$refs.commType.open().then(res => {
                    this.commTypeList.forEach(obj => {
                        if (obj.ID == res.ID) {
                            obj.isSelect = true
                        } else {
                            obj.isSelect = false
                        }
                    })
                })
            }
        },
        watch: {
            params: {
                deep: true,
                handler: function(newVal) {
                }
            }
        },

        components: {
            StateActionsheet,
            Check,
            ChooseTemplate,
            SelectCommTypeList
        }
	};
</script>