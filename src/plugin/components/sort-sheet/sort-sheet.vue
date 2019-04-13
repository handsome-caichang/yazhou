<style scoped lang="scss">
	@import 'src/plugin/scss/mixin.scss';
	@import 'src/plugin/scss/variable.scss';
    .sort-container{
        .sort-sheet{
            @include position-absolute;
            z-index: 9999993;
            color: $color-3;
            @include fs-lh(15);
            .sort-item{
                width: 100%;
                height: 44px;
                @include flex-between;
                padding: 0 15px;
                border-bottom: 1px solid #EEF1F6;
                &.title{
                    height:50px;
                    @include flex-center;
                    color:$color-9;
                }
                .sort-name span{
                    margin-right:10px;
                }
                .sort-name.active{
                    color:#1E88F5;
                }
            }
        }
        .sort-tip{
            position:absolute;
            z-index:9999992;
            width:130px;
            height:130px;
            left:calc(50% - 65px);
            top:calc(50% - 65px);
            background:rgba(0,0,0,.5);
            border-radius:4px;
            @include flex-center(column);
            color:$color-white;
            font-size:12px;
            transition:opacity 0.8s linear 0.2s;
            opacity: 0;
            &.active{
                opacity:1;
            }
            .icon{
                width: 35px;
                height: 35px;
                margin-bottom: 15px;
            }
        }
    }
</style>

<template>
    <div class="sort-container">
        <!-- 排序方式 -->
        <action-sheet :data="list" v-show="opened" @close="close" class="sort-sheet">
            <slot>
                <div class="sort-item title">{{title}}</div>   <!--标题-->
            </slot>
            <div v-for="(item,index) in list" class="sort-item"  @click="selectSortType(item,index)">
                <div class="sort-name" :class="{active:sortType == index}">
                    <span>按{{item.name}}排序</span>
                    <svg class="icon" aria-hidden="true" style="display:inline-block" v-if="sortType == index">
                        <use :xlink:href="desc?'#icon-jiangxu':'#icon-shengxu'"></use>
                    </svg>
                </div>

                <div class="sort-chosen" v-if="sortType == index">   <!-- 选中 -->
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gouxuan"></use>
                    </svg>
                </div>
            </div>
        </action-sheet>

        <!-- 排序弹窗 -->
        <div class="sort-tip" :class="{active:showTip}" v-if="showTipDOM">
            <div class="sort-tip-arrow">
                <svg class="icon" aria-hidden="true" style="display:inline-block">
                    <use :xlink:href="sortType>-1 && desc?'#icon-danchuang-jiangxu':'#icon-danchuang-shengxu'"></use>
                </svg>
            </div>
            <div>
                按{{sortType>-1 && list[sortType].name}}{{sortType>-1 && desc?'降序':'升序'}}
            </div>
        </div>

    </div>
</template>

<script>
	export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props:{
            //list:要排序的名称和队列
            list:{
                default:[],
                type:Array,
                required:true,
            },
            opened:false,       //是否显示界面    
            show:false,
            initType: null,   //可以指定初始化排序顺序,否则sortType为-1;        '1-0' , '2-1'的形式
            title:{
                default:'排序方式',
                type:String,
                required:false,
            }
        },
		data() {
            return{
                desc:false,         //当前选中的状态,是否为降序
                sortType: -1,
                showTip:false,
                showTipDOM:false,
                timer:[],
            }
        },
        mounted(){
            //初始化排序方式
            if (this.initType && this.initType.indexOf('-') > -1){
                let [index,desc] = this.initType.split('-');
                if (+index !== NaN){
                    this.sortType = +index;
                    this.desc = desc == '0'? false : true
                } else {
                    this.sortType = -1;
                }
            }
        },
		methods: {
            set(index,desc){
                this.sortType = index;
                this.desc = !!desc;
            },
            selectSortType(item,index){
                this.desc = this.sortType == index ? !this.desc : false;    //如果是重复点,则反之,否则为升序;
                this.sortType = index;
                this.$emit('clickSort',{item,index,desc:this.desc});

                this.clearTimer();
                this.showTipDOM = true;
                this.timeout(()=>this.showTip = true,50);
                this.timeout(()=>{
                    this.showTip = false;
                    this.timeout(()=>this.showTipDOM = false,1000);
                },2000);
                this.close();
            },
            //清除所有定时器
            clearTimer(){
                this.timer.forEach(item=>clearTimeout(item));
                this.timer = [];
            },
            timeout(fn,delay){
                this.timer.push(setTimeout(fn,delay));
            }
        },
	}
</script>