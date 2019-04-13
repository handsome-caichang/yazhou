<style scoped lang="scss">
    .col-select{
        @include position-absolute;
        z-index: 9999990;
        .header{
            font-size:14px;
            padding:0 12px;
            background-color:#f0f0f0;
            color:#666;
            height:44px;
            @include flex-center;
            justify-content: flex-start;
            line-height:44px;
        }

        .body{
            @include flex-center;
            justify-content:flex-start;
            flex-wrap:wrap;
            padding:12px;
            padding-left:0;
            .choose-item{
                flex:0 0 auto;
                width: calc(33.3% - 12px);
                height: 38px;
                line-height: 38px;
                margin-left:12px;
                margin-bottom: 12px;
                padding-left: 6px;
                padding-right: 6px;
                color: #333;
                background-color: #f0f0f0;
                text-align: center;
                border-radius: 4px;
                font-size: 12px;
                @include ellipsis-single;
                &.active{
                    color: #2197f3;
                    background-color: #b4e0ff;
                }
            }

        }

        .footer{
            @include flex-between;
            line-height: 44px;
            height:44px;
            font-size: 16px;
            text-align: center;
            .reset{
                background-color: #b4e0ff;
                color: #2197f3;                
                flex:1;
            }
            .submit{
                background-color: #2197f3;
                color: #fff;
                flex:1;
            }
        }
    }

</style>

<template>
    <action-sheet class="col-select" v-show="opened" @close="close" :position="'sideRight'" >
        <div slot="header" class="header">
            <svg class="icon">
                <use xlink:href="#ixz-xiangzuo"></use>
            </svg>
            <span>{{title}}</span>
        </div>

        <div class="body" @click="choose">
            <div class="choose-item" v-for="(item,index) in list" :key="index" :data-index="index" v-bind:class="{active:activeList[index]}">
                {{item.name}}
            </div>
        </div>

        <div slot="footer" class="footer">
            <div class="reset" @click="reset">重置</div>
            <div class="submit" @click="submit">完成</div>
        </div>
    </action-sheet>
    
</template>


<script>
export default {
    name:'col-select',
    mixins:[app.mixin.popupWindowRouteMixin],
    data(){
        return {           
            title:'选择要展示的列',
            opened: false,
            list:[],
            activeList:[],
            _resolve:null,
        }
    },
    methods:{
        show({list,activeIndex,title}){
            this.title = title || this.title;
            this.opened = true;  

            let tempList = [];
            for (let i = 0; i < list.length; i++){
                tempList.push(false);
            }
            if (activeIndex){
                activeIndex.forEach(item=>{
                    tempList[item] = true;
                });
            }
            this.activeList = tempList;
            this.list = JSON.parse(JSON.stringify(list));
            return new Promise(resolve=>{
                this._resolve = resolve;
            })
        },
        choose(e){
            let tar = e.target;
            while ( tar && !tar.dataset.index){
                tar = tar.parentElement;
            }
            if (tar){
                let index= +tar.dataset.index;
                this.$set(this.activeList,index,!this.activeList[index]);
            }
        },
        reset(){
            this.activeList = this.activeList.map(item=> false);            
        },
        submit(){
            let chosen = [];

            this.activeList.forEach((item,index)=>{
                item && chosen.push(index);
            })
            this._resolve(chosen);
            this.close();
        },


    }
}
</script>
