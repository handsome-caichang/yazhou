<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute;
        // font-size: $fs-normal-x;
        z-index: 10;
        .container {
            background-color: $color-white;
            .item {
                border-bottom: 1px solid $color-assist-1;
                padding: 15px;
                color: $color-3;
                word-break: break-word;
                @include flex-between;
                &:not(:last-child){
                    @include border-bottom;
                }
                &.active {
                    color: $color-primary;
                }
            }
        }
        

        .actionsheet-hd {
            @include flex-center;
            height: 50px;
            color: $color-9;
            .spec {
                color: $color-3;
            }
        }
        .selectTwo {
            background-color: #f0f0f0;
        }
        .selectOne {
            .selectOne-item {
                background-color: $color-white;
                padding: 12px 10px;
                border-bottom: 1px solid #eaeaea;
                color: #333;
            }
        }
    }
</style>

<template>
    <action-sheet
        class="role-actionsheet"
        :position="position"
        :scrollerConfig="scrollerConfig"
        :data="scrollData" 
        v-if="opened" 
        @close="close">
        <div class="selectOne" v-if="selectOne">
            <div class="selectOne-item" @click="changeContent('status')">状态</div>
            <div class="selectOne-item" @click="changeContent('campus')">校区</div>
        </div>
        
        <div slot="header" class="actionsheet-hd selectTwo" v-if="selectTwo">{{selectTwoString=='campus'?"校区选择":"状态选择"}}</div>
        <div class="container" v-if="selectTwo">
           <div v-for="item in list" class="item" @click="select(item)">
                {{selectTwoString=='campus'?item.Value.Name:item.Value}}
           </div>
        </div>
    </action-sheet>
</template>

<script>
    
    
    import {getCommunicationMode} from 'teacher/api/customers'
    
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...Vuex.mapState(['customConfigInfo']),
            list() {
                if (this.selectTwoString == '') {
                    return []
                } else {
                    return this.selectTwoString == 'campus' ? app.customConfigInfo.CampusList : app.customConfigInfo.CustomerStatusNoSus
                }
            },
            position() {
                return this.selectOne ? 'bottom' : 'sideRight'
            },
            scrollData() {
                return {
                    list: this.list,
                    flag: this.selectOne && this.selectTwo
                }
            }
        },
        data() {
            return {
                scrollerConfig:{
                    tag: 'base'
                },
                selectOne: true,
                selectTwo: false,
                selectTwoString: ''
            }
        },
        methods: {
            select(obj) {
                this.$emit('selectObj', {
                    type: this.selectTwoString,
                    selectObj: obj
                })
            },
            changeContent(string) {
                this.selectOne = false
                this.selectTwo = true
                this.selectTwoString = string
            }
        },
        watch: {
            opened(val) {
                if (val) {
                    this.selectOne = true
                    this.selectTwo = false
                    this.selectTwoString = ''
                }
            },
        },
        components: {
            
        }
    }
</script>