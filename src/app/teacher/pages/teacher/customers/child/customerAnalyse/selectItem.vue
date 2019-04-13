<style scoped lang="scss">
    
    
    .wrapper {
        @include position-absolute;
        background-color: $color-white;
        .container {
            @include position-absolute(0, 0, 44px, 0);
            display: flex;
            .container-left {
                width: 100px;
                display: flex;
                flex-direction: column;
                .item-1 {
                    position: relative;
                    height: 45px;
                    line-height: 45px;
                    border-bottom: 1px solid #eaeaea;
                    background-color: $color-assist-1;
                    font-size: 14px;
                    text-align: center;
                }
                .active {
                    border-left: 2px solid $color-primary;
                    color: $color-primary;
                    &:before {
                        content: '';
                        position: absolute;
                        top: 10px;
                        right: 0;
                        width: 0;
                        height: 0;
                        border-right: 10px solid $color-white;
                        border-bottom: 10px solid transparent;
                        border-top: 10px solid transparent;
                    }
                }
                .void {
                    flex: 1;
                    border-right: 1px solid #eaeaea;
                }
            }
            .container-right {
                flex: 1;
                .big-item {
                    height: 45px;
                    padding: 15px;
                    color: $color-3;
                    @include flex-between;
                    .icon-wrapper {
                        width: 25px;
                    }
                    .name {
                        flex: 1;
                    }
                    &:not(:last-child){
                        border-bottom: 1px solid #eaeaea;
                    }
                    &.active {
                        color: $color-primary;
                    }
                }
                .small-item {
                    border-bottom: 1px solid #eaeaea;
                    .small-item-top {
                        padding: 0 12px;
                        height: 44px;
                        @include flex-between;
                        .name {
                            flex: 1;
                        }
                        .icon-wrapper {
                            width: 30px;
                            height: 44px;
                            line-height: 44px;
                        }
                    }
                    .small-item-bottom {
                        display: flex;
                        flex-wrap: wrap;
                        padding: 0 12px;
                        .item {
                            width: 30%;
                            height: 38px;
                            line-height: 38px;
                            margin-bottom: 12px;
                            padding-left: 6px;
                            padding-right: 6px;
                            color: #333;
                            background-color: #f0f0f0;
                            text-align: center;
                            border-radius: 4px;
                            font-size: 12px;
                            overflow: hidden;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            &:nth-child(3n+2) {
                                margin-left: 5%;
                                margin-right: 5%;
                            }
                        }
                        .active {
                            background-color: $color-primary;
                            color: $color-white;
                        }
                    }
                }
            }
        }
        .bottom {
            @include position-absolute(false, 0, 0, 0);
            display: flex;
            height: 44px;
            line-height: 44px;
            .cancle, .sure {
                text-align: center;
                font-size: 15px;
                flex: 1;
            }
            .cancle {
                border-top: 1px solid $color-assist-1;
            }
            .sure {
                background-color: $color-primary;
                color: $color-white;
            }
        }
    }
    .as-slide-enter-active, .as-slide-leave-active {
        transition: all $duration $timing;
    }
    .as-slide-enter, .as-slide-leave-active {
        transform: translate3d(100%, 0, 0);
    }
</style>


<template>
    <transition name="as-slide">
        <div class="wrapper" v-if="opened">
            <div class="container">
                <div class="container-left">
                    <div class="item-1" :class="{active:showItem==1}" @click="showItem=1">大类</div>
                    <div class="item-1" :class="{active:showItem==2}" @click="showItem=2">小类</div>
                    <div class="void"></div>
                </div>
                <scroller-base class="container-right" :data="scrollData">
                    <div class="big-item" v-for="item in list" v-if="showItem==1" @click="selectBigItem(item)">
                        <div class="icon-wrapper">
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="item.isSelect?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                            </svg>
                        </div>
                        <div class="name">
                            {{item.Name}}
                        </div>
                    </div>
                    <div class="small-item" v-for="(item,bigIndex) in list" v-if="showItem==2">
                        <div class="small-item-top">
                            <div class="icon-wrapper" @click="selectAll(item)">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="isShowAllSelect(item)"></use>
                                </svg>
                            </div>
                            <div class="name">
                                {{item.Name}}
                            </div>
                            <div class="icon-wrapper" @click="changeContent(item)">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="item.listTemp.length>6?'#icon-shangla':'#icon-xiala'"></use>
                                </svg>
                            </div>
                        </div>
                        <div class="small-item-bottom">
                            <div class="item" 
                                v-for="(smallItem, index) in item.listTemp" 
                                :class="{active:smallItem.isSelect}"
                                @click="selectSmallItem(smallItem)">
                                {{smallItem.Name}}
                            </div>
                        </div>
                    </div>
                </scroller-base>
            </div>
            <div class="bottom">
                <div class="cancle" @click="close">取消</div>
                <div class="sure" @click="emit">确定</div>
            </div>
        </div>
    </transition>
</template>

<script>
    
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: false
            },
            saleModesArr: {
                type: Array
            }
        },
        computed: {
            scrollData() {
                return {
                    list: this.list,
                    showItem: this.showItem,
                    num: this.num
                }
            }
        },
        data() {
            return {
                showItem: 1,
                list: [],
                num: 0
            }
        },
        methods: {
            changeContent(obj) {
                if (obj.listTemp.length < 6) return
                if (obj.listTemp.length > 6) {
                    obj.listTemp = obj.List.slice(0, 6)
                    this.num++
                    return
                }
                if (obj.listTemp.length == 6) {
                    obj.listTemp = obj.List
                    obj.listTemp.forEach(item => {
                        if (obj.isAllSelect) {
                            item.isSelect = true
                        } 
                    })
                    this.num++
                }
            },
            selectBigItem(obj) {
                obj.isSelect = !obj.isSelect
            },
            selectSmallItem(obj) {
                obj.isSelect = !obj.isSelect
            },
            selectAll(obj) {
                if (obj.listTemp.length !== 6) {
                    if (obj.listTemp.length == 0) {
                        obj.isAllSelect = !obj.isAllSelect
                        return
                    }
                    obj.listTemp.forEach(item => {
                        item.isSelect = obj.isAllSelect ? false : true
                    })
                }
                if (obj.listTemp.length == 6) {
                    obj.List.forEach(item => {
                        item.isSelect = obj.isAllSelect ? false : true
                    })
                    obj.listTemp = obj.List.slice(0, 6)
                }
            },
            isShowAllSelect(obj) {
                let arr = obj.List.map(item => {
                    return item.isSelect
                })
                if (!arr.length) return obj.isAllSelect ? '#icon-duoxuan':'#icon-duoxuan-weixuanze'
                obj.isAllSelect = arr.indexOf(false) > -1 ? false : true
                return obj.isAllSelect ? '#icon-duoxuan':'#icon-duoxuan-weixuanze'
            },
            emit() {
                let arr = []
                if (this.showItem == 1) {
                    this.list.forEach(obj => {
                        if (obj.isSelect) {
                            arr.push(obj.ID)
                        }
                        obj.List.forEach(oobj => {
                            oobj.isSelect = false
                        })
                        obj.isAllSelect = false
                    })
                    this.$emit('selectSaleModes', arr, 0)
                }
                if (this.showItem == 2) {
                    this.list.forEach(obj => {
                        obj.List.forEach(oobj => {
                            if (oobj.isSelect) {
                                arr.push(oobj.ID)
                            }
                        })
                        obj.isSelect = false
                    })
                    this.$emit('selectSaleModes', arr, 1)
                }
            }
        },
        created() {
            let tempArr = app.customConfigInfo.SaleMode 
            // this.list = app.customConfigInfo.SaleMode
            if (this.showItem == 1) {
                this.list = app.customConfigInfo.SaleMode
            } else {
                this.list = tempArr.filter(obj => obj.List.length)
            }
            this.list.forEach(obj => {
                this.$set(obj, 'isSelect', false)
                this.$set(obj, 'isAllSelect', false)
                this.$set(obj, 'listTemp', [])
                if (obj.List.length) {
                    obj.List.forEach(oobj => {
                        this.$set(oobj, 'isSelect', false)
                    })
                }
                if (obj.List.length > 6) {
                    obj.listTemp = obj.List.slice(0, 6)
                } else {
                    obj.listTemp = obj.List
                }
            })
        },
        watch: {
            opened(val) {
                if (val) {
                    if (this.showItem == 1) {
                        this.list.forEach(obj => {
                            if (this.saleModesArr.indexOf(obj.ID) > -1) {
                                obj.isSelect = true
                            } else {
                                obj.isSelect = false
                            }
                        })
                    }
                    if (this.showItem == 2) {
                        this.list.forEach(obj => {
                            if(!obj.List.length) obj.isAllSelect = false
                            obj.listTemp.forEach(oobj => {
                                if (this.saleModesArr.indexOf(oobj.ID) > -1) {
                                    oobj.isSelect = true
                                } else {
                                    oobj.isSelect = false
                                }
                            })
                        })
                    }
                }
            }
        }
    }
</script>