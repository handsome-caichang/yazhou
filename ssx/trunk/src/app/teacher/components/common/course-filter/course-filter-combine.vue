<style scoped lang="scss">
    .group-head{
        margin-left:12px;
        margin-right:12px;
        @include flex-between;
        height:44px;
        .group-head-title{
            width:70px;
        }
        .group-head-selected{
            width: calc(100% - 90px);
            padding-left:20px;
            text-align: right;
            color: #2197f3;
            @include ellipsis-single;
        }
        .group-head-icon{
            width:20px;
            @include flex-center;
        }
        border-top:1px solid #eaeaea;
        .icon.check{
            font-size: 20px;
            margin-right:20px;
            vertical-align: -.25em;
        }
    }

</style>

<template>
    <course-filter 
        ref="filter" 
        :opened.sync="opened" 
        :initData="initData"
        @submit="submit"
        @reset="reset">
        <!-- 首行插槽 -->
        <div slot="group-extend" class="group-head" @click="openNewSheet">
            <div class="group-head-title">{{type=='shift'?'课程':'讲师'}}</div>
            <div class="group-head-selected">{{slotObj.Name}}</div>
            <div class="group-head-icon">
                <svg class="icon">
                    <use xlink:href="#ixz-xiangyou"></use>
                </svg>
            </div>
        </div>

        <!-- 末尾插槽 -->
        <template slot="group-extend-end">
            <div class="group" v-if="hasMore">
                <div class="group-head" @click="checkJieYe = !checkJieYe">
                    <div>
                        <svg class="icon check" :style="{color:checkJieYe ? '#2197f3' :'#ccc'}">
                            <use :xlink:href="checkJieYe ? '#ixz-duoxuanxuanzhong' : '#ixz-duoxuanweixuanzhong'"></use>
                        </svg>
                        <span>包含已结业班级</span>
                    </div>
                </div>
            </div>
            <div class="group" v-if="hasMore">
                <div class="group-head" @click="checkTry = !checkTry">
                    <div>
                        <svg class="icon check" :style="{color:checkTry ? '#2197f3' :'#ccc'}">
                            <use :xlink:href="checkTry ? '#ixz-duoxuanxuanzhong' : '#ixz-duoxuanweixuanzhong'"></use>
                        </svg>
                        <span>包含试听及补课班级</span>
                    </div>
                </div>
            </div>

        </template>
    </course-filter>    
</template>

<script>
import CourseFilter from './course-filter.vue';
export default {
    data(){
        return {
            opened:false,
            hasMore:true,
            checkJieYe:false,   //是否包含已结业班级
            checkTry:false,     //是否包含试听及补课班级
            initData:{},
            slotObj:{
                ID:'',
                Name:''
            },
            type:'shift',            //选择课程或老师   shift  teacher
            _resolve:null
        }
    },

    methods:{
        show({type='shift',initData={},hasMore =false}){
            this.opened = true;
            this.type = type;
            this.initData = JSON.parse(JSON.stringify(initData));
            this.slotObj = {
                ID:initData.shiftID || initData.teacherID || '',
                Name:initData.shiftName || initData.teacherName || '',
            };
            this.hasMore = hasMore;
            this.checkJieYe = initData.checkJieYe || false;
            this.checkTry = initData.checkTry || false; 
            return new Promise(resolve=>{
                this._resolve = resolve;
            });
        },
        openNewSheet(){
            if (this.type == 'shift'){
                app.selectShiftClass && app.selectShiftClass({                    
                    type:'shift2',
                    chosen:this.slotObj.ID,
                    mode:2
                }).then(res=>{
                    this.slotObj = res;
                });
            } else if (this.type == 'teacher'){
                app.empSelect(1,this.slotObj.ID.split(',')).then(res=>{
                    this.slotObj.Name = res.map(item=>item.name).join(',');
                    this.slotObj.ID = res.map(item=>item.id).join(',');
                })
            }
        },
        submit(result){
            let obj = Object.assign({},result);
            obj[this.type + 'ID'] = this.slotObj.ID;
            obj[this.type + 'Name'] = this.slotObj.Name;
            if (this.hasMore){
                obj.checkJieYe = this.checkJieYe;
                obj.checkTry = this.checkTry;
            }
            this._resolve(obj);
        },
        reset(){
            this.checkJieYe = false;
            this.checkTry = false;
            this.slotObj.ID = this.slotObj.Name = '';
        },
    },
    components:{
        CourseFilter
    }
}
</script>

