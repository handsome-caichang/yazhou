<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute;
        font-size: 12px;
        color: $color-3;
        z-index:99999991;
        .head {
            .header-top {
                height: 40px;
                padding: 12px;
                background-color: $color-assist-1;
            }
            .header-bottom {
                padding: 12px;
                .input {
                    height: 40px;
                    width: 100%;
                    border: 1px solid $color-assist-1;
                    padding: 10px;
                }
            }
        }
        .container {
            padding: 12px;
            background-color: $color-white;
            font-size: 14px;
            .item {
                height: 40px;
                @include flex-between;
                border-bottom: 1px solid $color-assist-1;
                .item-name {
                    flex: 1;
                    // word-break: break-word;
                    @include ellipsis-single;
                }
                .icon-wrapper {
                    width: 40px;
                    text-align: right;
                    .icon {
                        font-size: 16px;
                        color: $color-3;
                    }
                }
            }
        }
        .bottom {
            height: 49px;
            line-height: 49px;
            font-size: 15px;
            display: flex;
            .reset {
                flex: 1;
                color: $color-9;
                border-top:  1px solid $color-assist-1;
                text-align: center;
            }
            .sure {
                flex: 1;
                background-color: $color-primary;
                color: $color-white;
                text-align: center;
            }
        }
        
    }
</style>

<template>
     
    <action-sheet
        class="role-actionsheet"
        v-if="opened"
        :position="'sideRight'"
        :data="list"
        :scrollerConfig="scrollerConfig"
        ref="acSheet"
        @loadData="loadData" 
        @close="close">
        <div class="head" slot="header">
            <div class="header-top" @click="close">
                <svg aria-hidden="true" class="icon">
                    <use xlink:href="#icon-zuobianjiantou"></use>
                </svg>
                {{curType.title}}
            </div>
            <div class="header-bottom">
                <input class="input" placeholder="请输入名称" v-model="queryText">
            </div>
        </div>
        <div class="container">
            <div class="item" v-for="(item,index) in list"  :key="index" @click="selectClass(item)">
                <div class="item-name">{{item.Name}}</div>
                <div class="icon-wrapper">
                    <svg aria-hidden="true" class="icon">
                        <use :xlink:href="isSelect(item)?'#icon-danxuan':'#icon-danxuan-weixuanze'"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="bottom" slot="footer">
            <div class="reset" @click="reset">重置</div>
            <div class="sure" @click="emitSelectEd">确定</div>
        </div>
    </action-sheet>
</template>

<script>
    
    import {getClassName, getShiftName} from 'teacher/api/score.js';
    import {getUserofShift} from 'teacher/api/feeReport.js';

    const CONFIG = {
        shift:{
            api:getShiftName,
            title:'选择课程',
            queryKey:'query',
            objKey:'shiftObj',
        },
        class:{
            api:getClassName,
            title:'选择班级',
            queryKey:'query',
            objKey:'classObj'
        },
        shift2:{
            api:getUserofShift,
            title:'选择课程',
            queryKey:'shiftname',
            objKey:'shiftObj'
        }
    }

    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        computed: {
            curType() {
                return CONFIG[this.curStr];
            },
        },
        data() {
            return {
                list: [],
                opened:false,
                extendParams:null,
                chosenID:'',
                mode:1,     //1是单选,2是多选.
                curStr:'shift',
                scrollerConfig: {
                    tag: 'super',
                    type: 2,
                    pagingOption: {
                        autoLoadFirst: true,
                        params:{},
                        api: this.curApi
                    }
                },
                queryText: '',
                _resolve:null
            }
        },
        methods: {
            show({type,chosen,extendParams,mode}){
                this.opened = true;
                this.curStr = type;
                this.mode = mode;
                this.chosenID = chosen == ''?[] : chosen.split(',');
                this.extendParams = extendParams;
                this.querText = ''; //查询置空
                return new Promise(resolve=>this._resolve = resolve);
            },
            reset() {
                this.chosenID = [];
                this.$emit('resetClass')
                this.queryText= '';
                this.$refs.acSheet.$refs.scroller.refresh({[this.curType.queryKey]: ''});
            },
            selectClass(item) {
                if (this.mode == 2){
                    let p;
                    if ((p = this.chosenID.indexOf(item.ID)) > -1){
                        this.chosenID.splice(p,1);
                    } else {
                        this.chosenID.push(item.ID);
                    }
                } else {
                    this.chosenID = [item.ID];
                }
                
            },
            isSelect(item){
                return this.chosenID.includes(item.ID);
            },
            emitSelectEd() {
                let obj = this.list.filter(item=>this.chosenID.includes(item.ID));
                obj.ID = obj.map(item=>item.ID).join(',');
                obj.Name = obj.map(item=>item.Name).join(',');
                this._resolve(obj);
                this.close();
            },
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    if (res.ErrorCode == app.errok) {
                        if (res.PageIndex === 1) {
                            this.list = []
                        }
                        this.list = this.list.concat(res.Data)
                    }
                })
            }
        },
        watch: {
            queryText(val) {
                this.$refs.acSheet.$refs.scroller.refresh({[this.curType.queryKey]: this.queryText})
            },
            opened(val) {
                if (val) {
                    this.curApi = this.curType.api;
                    this.$set(this.scrollerConfig.pagingOption, 'api', this.curApi)
                    this.$set(this.scrollerConfig.pagingOption.params, this.curType.queryKey, this.queryText);
                    //如果有额外的查询条件
                    if (typeof this.extendParams  === 'object'){
                        let params = Object.assign({},this.scrollerConfig.pagingOption.params,this.extendParams)
                        this.$set(this.scrollerConfig.pagingOption,'params',params);
                    }
                }
            }
        }
    }
</script>