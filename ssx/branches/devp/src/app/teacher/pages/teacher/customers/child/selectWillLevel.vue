<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute;
        font-size: $fs-normal-x;
        z-index: 10;
        .container {
            padding: 5px 30px 30px 30px;
            background-color: $color-white;
            .title {
                color: $color-3;
                font-size: 16px;
                text-align: center;
            }
            .level {
                display: flex;
                margin-top: 10px;
                .level-container {
                    font-size: 20px;
                    text-align: center;
                    flex: 1;
                }
            }

        }
        
    }
</style>

<template>
    <action-sheet
        class="role-actionsheet"
        :position="'center'"
        v-show="opened" 
        :data="list" 
        @close="close">
        <div class="container">
            <div class="title">意向级别</div>
            <div class="level">
                <div class="level-container" v-for="i in 5" @click="select(i)">
                    <svg class="icon" aria-hidden="true" >
                        <use :xlink:href="level>=i?'#icon-xingxingxuanzhong':'#icon-xingxingweixuanzhong'"></use>
                    </svg>
                </div>
            </div>
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
            },
            level: {
                type: Number
            }
        },
        data() {
            return {
                list: []
            }
        },
        methods: {
            select(i) {
                this.$emit('selectLevel', i)
            }
        }
    }
</script>