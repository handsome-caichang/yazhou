
<style scoped lang="scss">
    
    
    .wrapper {
        // background-color: $color-assist-1;
        .heard {
            background-color: $color-white;
            .heard-top {
                height: 49px;
                @include flex-between;
                padding: 0 15px;
                border-bottom: 1px solid $color-assist-1;
                .heard-item {
                    flex: 1;
                    height: 29px;
                    line-height: 29px;
                    font-size: 15px;
                    color: $color-primary;
                    text-align: center;
                    border: 1px solid $color-primary;
                }
                .no-border {
                    border-right: none;
                }
                .active {
                    background-color: $color-primary;
                    color: $color-white;
                }
            }
        }
        .void {
            background-color: $color-assist-1;
            height: 10px;
        }
    }
</style>

<template>
    <div class="wrapper">
        <div class="heard">
            <div class="heard-top">
                <div class="heard-item no-border" :class="{active:activeIndex==1}" @click="changeContent(1)">待沟通</div>
                <div class="heard-item" :class="{active:activeIndex==2}" @click="changeContent(2)">已沟通</div>
            </div>
        </div>
        <div class="void"></div>
        <component :is="activeIndex==1?coms.WaitComm:coms.HasComm"></component>
    </div>
</template>

<script>
    import WaitComm from './waitComm'
    import HasComm from './hasComm'
    export default {
        data() {
            return {
                    activeIndex: parseInt(this.$route.params.type),
                    
                    coms: {
                        WaitComm,
                        HasComm     
                    }
            }
        },
        computed: {
            
        },
        methods: {
            changeContent(num) {
                if (this.activeIndex == num) return 
                this.activeIndex = num
            },
        },
        created() {
        },
        components: {
            WaitComm,
            HasComm
        }
    }
</script>