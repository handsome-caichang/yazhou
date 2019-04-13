<template>
    <div class="scroller-table s1024" v-show="cols.length">
        <!-- 首行 -->
        <div class="row-start">
            <div class="cell">{{mainName}}</div>
            <div class="scroll-window-define">
                <div class="row-wraper" :style="transform" ref="thRow">
                    <div v-for="(item,index) in cols" :key="index" class="cell"  :style="{width:styleArr[index]+'px'}">
                        <slot :item="item" :index="index" name="row0">
                            <div>{{item.name || item.Name}}</div>
                        </slot>
                    </div>
                </div>
            </div>       
        </div>
        <!-- 中间内容 -->
        <scroller-super 
            class="content s0712"   ref="scroller"
            :type="2" :data="data" :options="options" 
            :pagingOption="pagingOption"
            @loadData="loadData"
            @loadFirst="loadFirst">
            <div class="content-inner" @click="choose($event)">
                <div class="content-col1" :style="transformCol" >
                    <div v-for="(row,index) in data"  :key="index" :data-index="'row-' + index" class="cell col1">
                        <slot :item="row" :index="index" name="col0">
                            <div class="ellipsis-multi">{{row.name || row.Name}}</div>
                            <svg class="icon" style="flex-shrink: 0;">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </slot>                        

                    </div>
                </div>
                <div class="content-rows" ref="contentArea">
                    <div v-for="(col,index) in dataCols" class="col-wraper-1" :key="index">
                        <div v-for="(cell,j) in col" class="cell" :key="index + '' + j" :data-index="index + '-'+ j" >
                            <slot :item="cell" :index="index + '-'+ j" name="cell">
                                <span>{{cell.value || cell.Value}}</span>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </scroller-super>

        <!-- 尾行 -->
        <div class="row-end">
            <slot name="heji">
                <div class="cell">合计</div>
            </slot>
            
            <div class="scroll-window-define">
                <div class="row-wraper" :style="transform" ref="sumRow">
                    <div v-for="(item,index) in sum"  :key="index" class="cell" :style="{width:styleArr[index]+'px'}">
                        <slot :item="item" :index="index" name="sum">
                            <div>{{item.value || item.Value}}</div>
                        </slot>
                    </div>
                </div>
            </div> 
        </div>       
    </div>
</template>
<script>

    export default {
        name: 'scroller-table',
        props: {
            mainName:'',
            cols:{ // 竖排的名称,和数据量挂钩(第一行)
                type:Array,
                default:[],
            },                
            sum:{   //合计行数据
                type:Array,
                default:[],
            },       
            data: { //一般数据
                type:Array,
                default: [],
            },
            pagingOption: { //等于scroller-super的参数
                type: Object
            },
        },
        data() {
            return {
                transform:{'transform':'translate(0px, 0px)'},
                transformCol:{'transform':'translate(0px, 0px)'},
                options:{
                    scrollX:true,
                    scrollbars:false,
                    probeType:3,
                    directionLockThreshold:0
                },
                dataCols:[],
                styleArr:new Array(100).fill(''),
            }
        },
        methods: {
            loadData(promise) {
                let scrollerLoad = this.$refs.scroller.$refs.scrollerVue;
                scrollerLoad.$refs.loadBar.style.width = scrollerLoad.$refs.baseScrollerVue.$refs.scrollWindow.offsetWidth + 'px';            
                this.$emit("loadData", promise);
                
            },
            loadFirst(promise) {
                this.$emit("loadFirst", promise)
                promise.then(res=>{
                    //重置位置
                    this.transform.transform = `translate(0px,0px)`;
                    this.transformCol.transform = `translate(0px,0px)`;
                })
            },
            choose(e){
                let p = e.target;
                while( !p.hasAttribute('data-index') && p){
                    p = p.parentElement;
                }
                p && this.$emit("choose",p.dataset.index);
            },
            pagingRefresh(params){
                return this.$refs.scroller.$refs.scrollerVue.pagingRefresh(params);
            },
        },
        mounted() {
            let s = this.$refs.scroller.scroller,
                scrollerLoad = this.$refs.scroller.$refs.scrollerVue;
            s.on('scroll',()=>{                
                this.transform.transform = `translate(${s.x}px,0px)`;
                this.transformCol.transform = `translate(${-s.x}px,0px)`;
                scrollerLoad.$refs.loadBar.style.transform = `translate(${-s.x}px,0px)`;
            })
            s.on('scrollEnd',()=>{
                this.transform.transform = `translate(${s.x}px,0px)`;
                this.transformCol.transform = `translate(${-s.x}px,0px)`;
                scrollerLoad.$refs.loadBar.style.transform = `translate(${-s.x}px,0px)`;
            })
        },
        watch:{
             data(newval,oldval){
                if (newval.length > 0){
                    let arrData = newval.map(item=>item.List),
                        arr = new Array(arrData[0].length).fill('').map(item=>[]);
                    for (let i =0; i < arrData[0].length; i++){
                        for (let j = 0; j < arrData.length; j++){
                            arr[i][j] = arrData[j][i];
                        }
                    }
                    this.dataCols = arr;
                    //对首行和合计行进行列宽调整
                    setTimeout(()=>{
                        let children = Array.from(this.$refs.contentArea.children),
                            thRow = Array.from(this.$refs.thRow.children),
                            sumRow = Array.from(this.$refs.sumRow.children);
                        
                        //取三者最大作为min-width
                        for (let i = 0; i < thRow.length; i++){
                            let max = Math.max(children[i].offsetWidth,thRow[i].offsetWidth,sumRow[i].offsetWidth);
                            if (max > children[i].offsetWidth){
                                children[i].style.minWidth = (max + 1) +  'px';
                            }
                        }

                        this.styleArr = children.map(item=>item.offsetWidth);
                        this.$refs.scroller.scroller.refresh();
                    },0)
                }
            },
        }
    };

</script>
<style>
    /* 滚动区域的背景色 */
    .scroller-table .content.s0712.scroll-box,.scroller-table .content.s0712 .scroller-load-bar-interface{
        background:#fff;
    }
    .scroller-table .content.s0712 .scroller-window.s-window{
        flex-grow:0; 
        flex-shrink: 0;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
    }

    .scroller-table.s1024 .ellipsis-multi{
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
</style>



<style lang="scss" scoped>
    @mixin flex-start($direction: row) {
        @include flex-center($direction);
        justify-content: flex-start;
    }
    @mixin flex-end($direction: row) {
        @include flex-center($direction);
        justify-content: flex-end;
    }
    $border-color: #eaeaea;
    .scroller-table {        
        color:#333;
        @include flex-between(column);
        align-items:stretch;
        width:100%;
        height: 100%;
        .row-wraper>div, .cell{
            height:44px;        /*每一行高度必须固定*/
            min-width:80px;     /*每一列只需给出最小宽度*/
            padding-left:20px;
            border-bottom:1px solid $border-color;
            padding-right:5px;
            @include flex-end;
            flex-shrink: 0;
        }
        .row-wraper{
            @include flex-start;
        }
        div.row-start,div.row-end{
            border-top:1px solid $border-color;
            font-size: 14px;
            font-weight: 700;
            color:#333;
            flex-shrink: 0;
            text-align: right;
            @include flex-start;
            .scroll-window-define{
                overflow: hidden;
            }
            >div:first-child{
                border-right:1px solid $border-color;
                @include flex-start;
                padding:0 12px;
                width:105px;
            }
            &.row-start .cell{
                border-bottom: 1px solid #aaa;
            }
            &.row-end {
                .cell{
                    border-top:  1px solid #aaa;
                    padding-left:10px;
                }
                .scroll-window-define{
                    color:#ff3c00
                }
            }
        }
        div.content{
            overflow: hidden;
            flex-grow: 0;
            height:calc(100% - 88px);
            .content-inner{
                @include flex-start;
                align-items: stretch;
                .content-col1{
                    @include flex-start(column);
                    align-items: stretch;
                    background:#fff;
                    z-index:2;
                    width:105px;
                }
                .content-rows{
                    @include flex-start;
                    >div.col-wraper-1{
                        @include flex-between(column);
                        align-items:stretch;
                    }

                }
                .content-main{
                    z-index:1;
                }
            }
            div.cell.col1{
                border-right:1px solid $border-color;
                @include flex-between;
                padding-left:12px;
                position:relative;
                &:first-child{
                    border-top:1px solid $border-color;
                }
                >div:first-child{
                    margin-right: 10px;
                }
                svg{
                    position:absolute;
                    right:5px;
                }
            }
            div.row-wraper:first-child>div.cell{
                border-top:1px solid $border-color;
            }
        }
    }
</style>