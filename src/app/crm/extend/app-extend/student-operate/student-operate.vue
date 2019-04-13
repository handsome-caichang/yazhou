<!-- 基于vux封装的日历插件 -->
<style lang="scss">
    .student-operate {
        @include position-absolute;
        z-index: 9999990;
        .item-box{
            display: flex;
            flex-wrap:wrap;
            padding-top: 40px;
            .item{
                // width: 33.33%;
                flex: 1;
                display: flex;
                flex-direction:column;
                align-items: center;
                margin-bottom: 20px;
                .icon-box{
                    align-items: center;
                    background-image: url("./image/operateSprite.png");
                    background-size: cover;
                    background-repeat: no-repeat;
                    height: 52px;
                    &.cChat{background-position: 0 0;}
                    &.cAddCom{background-position: 0 -52px;}
                    &.cTransService{background-position: 0 -208px;}
                    &.cTransAudition{background-position: 0 -156px;}
                    &.cToCustomer{background-position: 0 -104px;}
                    &.cDrop{background-position: 0 -260px;}

                }
                .name{
                    align-items: center;
                    margin-top: 14px;
                    font-size: 13px;
                    color: $color-6;
                }
                .icon{
                    font-size: 52px;
                }
            }
        }
        .footer{
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 11px;
        }
    }

</style>

<template>
    <action-sheet class="student-operate" v-show="opened" @close="close">
        <div class="item-box">
            <div class="item" v-for="(item,index) in list" @click="clickItem(item)" :key="index">
                <div class="icon-box" :class="item.icon">
                    <svg aria-hidden="true" class="icon">
                        <use :xlink:href="item.icon"></use>
                    </svg>
                </div>
                <div class="name">{{item.name}}</div>
            </div>
        </div>

        <div class="footer" slot="footer">
            <svg aria-hidden="true" class="icon"  @click="close">
                <use xlink:href="#icon-guanbi"></use>
            </svg>
        </div>
    </action-sheet>
</template>

<script>
    // 触发约定
    //聊天    转为客户       丢弃      添加沟通记录      转为试听学员       转为正式学员
    //cChat   cToCustomer   cDrop     cAddCom          cTransAudition   cTransService

    // 使用方法：
    // type值  0表示线索 1表示客户管理
    // app.operate({type:xxx}).then(data=>{
    //     data是触发约定的名称
    // })


    let defaultOpt = { //接收参数
        followstatus: 5 //0表示线索
    };
    let menuList = {//不同的界面 弹框选项内容不同
            clue: [
                    // {'name': '发起聊天', 'icon': 'cChat','goal':'cChat'},
                    {'name': '转为客户', 'icon': 'cToCustomer','goal':'cToCustomer'},
                    {'name': '丢弃','icon': 'cDrop','goal':'cDrop'}
                ],
            follow:[
                // {'name': '发起聊天', 'icon': 'cChat','goal':'cChat'},
                {'name': '添加沟通记录', 'icon': 'cAddCom','goal':'cAddCom'},
                {'name': '转为试听','icon': 'cTransAudition','goal':'cTransAudition'},
                {'name': '转为正式', 'icon': 'cTransService','goal':'cTransService'},
                {'name': '丢弃','icon': 'cDrop','goal':'cDrop'},
            ],
            listening:[
                // {'name': '发起聊天', 'icon': 'cChat','goal':'cChat'},
                {'name': '添加沟通记录', 'icon': 'cAddCom','goal':'cAddCom'},
                {'name': '转为正式', 'icon': 'cTransService','goal':'cTransService'},
                {'name': '丢弃','icon': 'cDrop','goal':'cDrop'},
            ],
            success:[
                // {'name': '发起聊天', 'icon': 'cChat','goal':'cChat'},
                {'name': '添加沟通记录', 'icon': 'cAddCom','goal':'cAddCom'},
            ]
        };

    export default {
        name: 'student-operate',
        mixins: [app.mixin.popupWindowRouteMixin],
        data() {
            return {
                list:[],//数据渲染列表
                opts: {},//控制项
                opened: false,//页面开关
                _resolve: null
            }
        },
        methods: {
            clickItem(item) {
                //丢弃
                if(item.goal=='cDrop'){
                    app.confirm({
                        text: "确定将该学员丢弃到公海？",
                        btns: [{
                            text: '取消',
                            style: {color: '#333'},
                            action: false // 'cancel'
                        }, {
                            text: '确定',
                            style: {color:'#5991FF'},
                            action: true // 'confirm'
                        }]
                    }).then(res=>{
                        if(res){
                            this._resolve(item.goal);
                            this.close();//配置了自动关闭则close
                        }
                    })
                }else{
                    this.close();//配置了自动关闭则close
                    setTimeout(() => {
                        this._resolve(item.goal);
                    }, 50)
                }
            },
            show(options) { //弹出
                // 1公海    2线索   3跟进中 4试听中 5转化成功

                if (!(options === undefined || typeof options === 'object')) return

                this.opts = Object.assign({}, defaultOpt, options);

                if(this.opts.followstatus==2){
                    this.list = menuList.clue;
                }else if(this.opts.followstatus==3){
                    this.list = menuList.follow;
                }else if(this.opts.followstatus==4){
                    this.list = menuList.listening;
                }else if(this.opts.followstatus==5){
                    this.list = menuList.success;
                }
                console.log(this.opts)
                this.opened = true;//开关打开
                return new Promise((resolve) => {
                    this._resolve = resolve
                });
            }
        },
        components: {
        }
    }
</script>