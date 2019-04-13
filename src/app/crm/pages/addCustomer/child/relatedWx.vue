<style scoped lang="scss">
    
    
    .wrapper {
        @include position-absolute;
        /* background-color: #F7F8FA;
        background-color: #f00; */
        .heard {
            height: 42px;
            padding: 0 11px;
            background-color: #F7F8FA;
            @include flex-between;
            .search {
                height: 28px;
                background-color: $color-white;
                font-size: 12px;
                color: #AAAAAA;
                border-radius: 20px;
                text-align: center;
            }
        }
        .mid {
            // @include position-absolute(0, 0, 49px, 0);
            background-color: #F7F8FA;
            padding: 8px 16px;
            border-top: 1px solid #DCDCDC;
            .item {
                margin-top: 8px;
                height: 49px;
                background-color: $color-white;
                border-radius: 6px;
                display: flex;
                padding: 0 16px 0 8px;
                @include flex-between;
                .avatar {
                    width: 36px;
                    height: 36px;
                    background-color: $color-assist-1;
                    border-radius: 2px;
                }
                .name {
                    margin-left: 8px;
                    flex: 1;
                    font-size: 15px;
                    color: $color-3;
                }
                .icon-wrapper {
                    width: 30px;
                    font-size: 18px;
                    text-align: right;
                }
            }
            
        }
        .bottom {
            // @include position-absolute(false, 0, 0, 0);
            height: 49px;
            border-top: 1px solid #C2CCDC;
            @include flex-between;
            padding: 0 8px;
            background-color: $color-white;
            .content {
                height: 40px;
                background-color: #5991FF;
                border: 1px solid #5991FF;
                border-radius: 2px;
                color: $color-white;
                font-size: 17px;
                text-align: center;
                width: 100%;
            }
        }
    }
</style>

<template>
    <action-sheet 
        class="wrapper"
        :data="list" 
        v-if="opened" 
        @close="close" 
        :position="'sideRight'"
        :fullParent="true">
        <div class="heard" slot="header">
            <input type="text" class="search" placeholder="搜索客户名、手机号">
        </div>
        <div class="mid">
            <div class="item" v-for="item in list" @click="selectItem(item)">
                <div class="avatar"></div>
                <div class="name">{{item.name}}</div>
                <div class="icon-wrapper">
                    <svg aria-hidden="true" class="icon">
                        <use :xlink:href="item.isSelect?'#icon-danxuanxuanzhong':'#icon-danxuanweixuanzhong'"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="bottom" slot="footer" @click="emit">
            <div class="content">确定</div>
        </div>
    </action-sheet>

</template>


<script>
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                list: [{
                    name: '辣婆婆',
                    id: 1
                }, {
                    name: '辣婆婆',
                    id: 2
                }, {
                    name: '辣婆婆',
                    id: 3
                } , {
                    name: '辣婆婆',
                    id: 4
                } , {
                    name: '辣婆婆',
                    id: 5
                }, {
                    name: '辣婆婆',
                    id: 6
                }, {
                    name: '辣婆婆',
                    id: 7
                }, {
                    name: '辣婆婆',
                    id: 8
                }, {
                    name: '辣婆婆',
                    id: 9
                }, {
                    name: '辣婆婆',
                    id: 10
                }, {
                    name: '辣婆婆',
                    id: 11
                }]
            }
        },
        methods: {
            selectItem(obj) {
                obj.isSelect = !obj.isSelect
                this.list.forEach(item => {
                    if (item.id !== obj.id) item.isSelect = false
                })
            },
            emit() {
                let obj = this.list.filter(item => item.isSelect)[0]
                if (!obj) {
                    app.toast('info', '请绑定微信联系人')
                    return
                }
                this.$emit('relatedWxDone', obj)
            }
        },
        created() {
            this.list.forEach(obj => {
                this.$set(obj, 'isSelect', false)
            })
        }
    }
</script>