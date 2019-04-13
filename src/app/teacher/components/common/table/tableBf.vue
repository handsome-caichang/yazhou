<!-- 筛选状态（上课点评列表） -->
<style scoped lang="scss">
    
    
    .wrapper {
        .heard {
            height: 60px;
            display: flex;
            .heard-left {
                line-height: 60px;
                text-align: center;
                background-color: $color-white;
                @include flex-between;
                .xiaoqu {
                    width: 100%;
                    text-align: center;
                }
            }
            .heard-right {
                flex: 1;
                position: relative;
                overflow: hidden;
                background-color: $color-white;
                .item-wrapper {
                    position: absolute;
                    display: flex;
                    .item {
                        height: 60px;
                        border-right: 1px solid $color-white;
                        background-color: $color-assist-1;
                        @include flex-between;
                        position: relative;
                        .triangle {
                            width: 20px;
                            height: 20px;
                            @include position-absolute(0, 0, false, false);
                            &:before {
                                content: '';
                                color: $color-white;
                                @include position-absolute(0, 0, false, false);
                                border-top: 20px solid #BBBBBB;
                                border-left: 20px solid transparent;
                            }
                        }
                        .heard-content {
                            width: 100%;
                            text-align: center;
                            @include ellipsis-multi(2);
                        }
                        .add {
                            .cicle {
                                margin: 0 auto;
                                width: 25px;
                                height: 25px;
                                border: 1px solid #AAAAAA;
                                border-radius: 50%;
                                font-size: 20px;
                            }
                        }
                    }
                }
            }
        }
        .mid {
            @include position-absolute(60px, 0, 49px, 0);
            .center-wrapper {
                display: flex;
                background-color: $color-white;
                .left-wrapper {

                    .body-left {
                        font-size: 12px;
                        color: $color-6;
                        height: 44px;
                        background-color: $color-white;
                        border: 1px solid $color-white;
                        border-top: 1px solid $color-assist-1;
                        @include flex-between;
                        padding: 0 8px;
                        .xiaoqu {
                            @include ellipsis-multi(2);
                            text-align: center;
                        }
                        .icon-wrapper {
                            width: 15px;
                        }
                    }
                }
                .right-wrapper {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    flex: 1;
                    .body-right {
                        position: relative;
                        overflow: hidden;
                        width: 300px;
                        .item-wrapper {
                            border-top: 1px solid $color-white;
                            display: flex;
                            .item {
                                width: 100px;
                                height: 43px;
                                background-color: $color-assist-1;
                                border-right: 1px solid $color-white;
                                @include flex-between;
                                padding: 0 10px;
                                .card-content {
                                    width: 100%;
                                    text-align: center;
                                    @include ellipsis-multi(2);
                                }
                            }
                        }
                    }
                }
            }
        }
        .bottom {
            display: flex;
            flex-wrap: nowrap;
            font-size: 15px;
            color: $color-3;
            @include position-absolute(false, 0, 0, 0);
            .bottom-left {
                height: 49px;
                background-color: $color-white;
                border-top: 1px solid $color-assist-1;
                @include flex-between;
                .xiaoqu {
                    width: 100px;
                    text-align: center;
                }
            }
            .bottom-right {
                flex: 1;
                position: relative;
                overflow: hidden;
                .item-wrapper {
                    position: absolute;
                    border-top: 1px solid $color-white;
                    display: flex;
                    .item {
                        height: 49px;
                        background-color: $color-assist-1;
                        border-right: 1px solid $color-white;
                        @include flex-between;
                        padding: 0 10px;
                        .bottom-content {
                            width: 100%;
                            text-align: center;
                            color: $color-primary;
                            @include ellipsis-multi(2);
                        }
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="wrapper">
        <div class="heard">
            <div class="heard-left" :style="{width: tableWidth+'px'}" @click="openSelectType('campus')">
                <div class="xiaoqu" ref="topLeft">{{name}}
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="heard-right">
                <div class="item-wrapper" ref="topScroll">
                    <div class="item" v-for="(item,key,index) in customerType" :style="{width: tableWidth+'px'}">
                        <div class="triangle" @click="delItem(item,index)"></div>
                        <div class="heard-content">{{item.Name}}</div>
                    </div>
                    <div class="item" @click="openSelectType('customerTypes')" :style="{width: tableWidth+'px'}">
                        <div class="heard-content add">
                            <div class="cicle">+</div>
                        </div>
                    </div>
                </div>
            </div>       
        </div>
        <scroller-super    
            class="mid"
            ref="scroll"
            :type="2"
            :data="list"
            :pagingOption="pagingOption"
            @loadData="loadData">
               <div class="center-wrapper">
                   <div class="left-wrapper" :style="{width: tableWidth+'px'}">
                       <div class="body-left" v-for="card in list" >
                           <div class="xiaoqu">
                               {{card.CampusName}}
                           </div>
                           <div class="icon-wrapper">
                               <svg class="icon" aria-hidden="true">
                                   <use xlink:href="#icon-youjiantou"></use>
                               </svg>
                           </div>
                       </div>
                   </div>
                   <scroller-mini 
                    class="right-wrapper" 
                    :scrollX="true" 
                    :scrollY="false"
                    :listenScroll="true"
                    :style="{left:tableWidth+'px'}"
                    ref="scrollCenter"
                    :list="scrollNum"
                    @scroll="scrollMove">
                    <div class="body-right" ref="midScroll">
                        <div  v-for="item in list">
                            <div class="item-wrapper">
                               <div class="item" v-for="(value, key, index) in item.temp" :style="{width: tableWidth+'px'}">
                                   <div class="card-content">{{value}}</div>
                               </div>
                               <div class="item" :style="{width: tableWidth+'px'}">
                                   <div class="card-content"></div>
                               </div>
                            </div>
                       </div>
                    </div>
                </scroller-mini>
               </div>     
        </scroller-super>
        <div class="bottom">
            <div class="bottom-left" :style="{width:tableWidth+'px'}">
                <div class="xiaoqu" ref="bottomLeft">合计
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="bottom-right">
                <div class="item-wrapper" ref="bottomScroll">
                    <div class="item" v-for="item in customerType" :style="{width:tableWidth+'px'}">
                        <div class="bottom-content">{{item.Value}}</div>
                    </div>
                    <div class="item" :style="{width:tableWidth+'px'}">
                        <div class="bottom-content"></div>
                    </div>
                </div>
            </div>
        </div>
        <select-type
            :opened.sync="showSelectType"
            :changeList="computedList"
            :openStr="openStr"
            @selectArr="selectArr"
            >
        </select-type>
    </div>
</template>

<script>
    import SelectType from './child/selectType'
    import ScrollerMini from 'teacher/components/common/scroller-mini/scroller-mini'
    export default {
        props: {
            pagingOption: {
                type: Object
            },
            tableWidth: {
                type: Number,
                default: 100
            },
            heardName: {
                type: String
            },
            name: {
                type: String
            },
            campusIds: {
                type: Array
            }
        },
        computed: {
            computedList() {
                return this.openStr == 'campus' ? this.campusList : this.typeList
            }
        },
        data() {
            return {
                list: [], //保存中间可以上下左右滑动的数组
                typeList: [], //添加对比项数组
                customerType: {}, //页面顶部和底部数组
                customerTypeOld: [], //用来保存最原始的顶部和底部数据，后面数据更改要从这个来取

                showSelectType: false,
                recordObj: {
                    // id: true,
                }, //记录要显示哪些对比项
                scrollNum: 0,
                firstComming: false,
                openStr: 'campus',
                campusList: []
            }
        },
        methods: {
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    this.isLoading = false
                    if (res.errcode == app.errok) {
                        if (res.pageIndex === 1) {
                            this.list = []
                        }
                        this.customerTypeOld = res.data.Count
                        this.list = this.list.concat(res.data.Values)
                        this.typeList = res.data.Names
                        if (!this.firstComming) {
                            for (var i = 0; i < 2; i++) {
                                if (this.customerTypeOld[i].ID) {
                                    this.customerType[this.customerTypeOld[i].ID] = this.customerTypeOld[i]
                                }
                                this.scrollNum++
                            }
                            this.typeList.forEach((obj, index) => {
                                obj.Value = this.customerTypeOld[index].Value
                                if (index < 2) {
                                    this.$set(obj, 'isSelect', true)
                                } else {
                                    this.$set(obj, 'isSelect', false)
                                }
                                this.recordObj[obj.ID] = obj.isSelect
                            })
                            this.setFrameWidth(3)
                            this.firstComming = true
                        } else {
                            this.typeList.forEach(item => {
                                if (this.recordObj[item.ID]) {
                                    this.$set(item, 'isSelect', true)
                                } else {
                                    this.$set(item, 'isSelect', false)
                                }
                            })
                        }
                        this.list.forEach(item => {
                            this.$set(item, 'temp', {})
                            item.List.forEach(obj => {
                                if (this.recordObj[obj.ID]) {
                                    this.$set(item.temp, obj.ID, obj.Value)
                                }
                            })
                        })
                    }
                })
            },
            /*selectType(obj, index) {
                obj.isSelect = !obj.isSelect
                let id = obj.ID
                if (obj.isSelect) {
                    let tempObj = {}
                    this.recordObj[id] = true
                    this.list.forEach(item => {
                        item.temp[id] = item.List[index].Value
                    })
                    this.customerTypeOld.forEach(item => {
                        if (item.ID === id) {
                            tempObj.ID = item.ID
                            tempObj.Name = item.Name
                            tempObj.Value = item.Value
                        }
                    })
                    this.customerType[id] = tempObj
                } else {
                    this.recordObj[id] = false
                    this.list.forEach(item => {
                        delete item.temp[id]
                    })
                    delete this.customerType[id]
                }
                this.$nextTick(() => {
                    let num = Object.getOwnPropertyNames(this.customerType).length
                    this.setFrameWidth(num)
                    if (!obj.isSelect) {
                        this.$refs.topScroll.style.transform = `translate3d(0, 0, 0)`
                        this.$refs.bottomScroll.style.transform = `translate3d(0, 0, 0)`
                        this.$refs.scrollCenter.scroll.scrollTo(0, 0)
                    }
                    this.scrollNum ++
                })
                
            },*/
            scrollMove(pos) {
                this.$refs.topScroll.style.transform = `translate3d(${pos.x + 'px'}, 0, 0)`
                this.$refs.bottomScroll.style.transform = `translate3d(${pos.x + 'px'}, 0, 0)`
            },
            /*clearData() {
                this.list.forEach(obj => {
                    obj.temp = []
                })
                this.typeList.forEach(obj => {
                    obj.isSelect = false
                    this.recordObj[obj.ID] = false
                })
                this.customerType = []
                this.setFrameWidth(1)
            },*/
            setFrameWidth(num = 3) {
                this.$refs.topScroll.style.width = num * this.tableWidth + 'px'
                this.$refs.midScroll.style.width = num * this.tableWidth + 'px'
                this.$refs.bottomScroll.style.width = num * this.tableWidth + 'px'
            },
            delItem(obj, index) {
                let key = obj.ID, num
                delete this.customerType[key]
                this.list.forEach(item => {
                    this.$set(item, key, null)
                    delete item.temp[key]
                })
                num = Object.getOwnPropertyNames(this.customerType).length
                this.recordObj[obj.ID] = false
                this.typeList.forEach((item => {
                    if (item.ID === obj.ID) item.isSelect = false
                }))
                this.scrollNum++
                this.setFrameWidth(num)
                this.$refs.scrollCenter.scroll.scrollTo(0, 0)
                this.$refs.topScroll.style.transform = `translate3d(0, 0, 0)`
                this.$refs.bottomScroll.style.transform = `translate3d(0, 0, 0)`
            },
            openSelectType(str) {
                this.showSelectType = true
                this.openStr = str
            },
            getValue(arr, id) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].ID == id) {
                        return arr[i].Value
                    }
                }
            },
            selectArr(arr) {
                if (this.openStr === 'campus') {
                    let tempArr = arr.filter(obj => {
                        return obj.isSelect
                    }).map(obj => {
                        return obj.Key
                    })
                    if (!tempArr.length) {
                        tempArr = arr.map(obj => {
                            return obj.Key
                        })
                    }
                    this.campusList = arr
                    this.$refs.scroll.refresh({campusids: tempArr.join()})           
                } else if (this.openStr === 'customerTypes') {
                    this.typeList = arr
                    this.typeList.forEach(obj => {
                        let id = obj.ID
                        if (obj.isSelect) {
                            let tempObj = {}
                            this.recordObj[id] = true
                            this.list.forEach(item => {
                                // item.temp[id] = item.List[index].Value
                                item.temp[id] = this.getValue(item.List, id)
                            })
                            this.customerTypeOld.forEach(item => {
                                if (item.ID === id) {
                                    tempObj.ID = item.ID
                                    tempObj.Name = item.Name
                                    tempObj.Value = item.Value
                                }
                            })
                            this.customerType[id] = tempObj
                        } else {
                            this.recordObj[id] = false
                            this.list.forEach(item => {
                                delete item.temp[id]
                            })
                            delete this.customerType[id]
                        }
                    })
                    let num = Object.getOwnPropertyNames(this.customerType).length
                    this.$nextTick(() => {
                        this.setFrameWidth(num)
                        this.$refs.topScroll.style.transform = `translate3d(0, 0, 0)`
                        this.$refs.bottomScroll.style.transform = `translate3d(0, 0, 0)`
                        this.$refs.scrollCenter.scroll.scrollTo(0, 0)
                        this.scrollNum ++
                    })
                }
                this.showSelectType = false
            }
        },
        mounted() {
            this.scrollNum++
        },
        created() {
            this.campusList = app.tool.clone(app.customConfigInfo.CampusList)
            this.campusList.forEach(obj => {
                if (this.campusIds.indexOf(obj.Key) > -1) {
                    this.$set(obj, 'isSelect', true)
                } else {
                    this.$set(obj, 'isSelect', false)
                }
            })
            
        },
        watch: {
            campusIds(val) {

            }
        },
        components: {
            SelectType,
            ScrollerMini
        }
    }
</script>