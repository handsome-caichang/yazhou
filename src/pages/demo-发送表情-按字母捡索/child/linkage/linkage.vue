<style scoped lang="scss">
    @import "../../../../assets/scss/variable.scss";
    @import "../../../../assets/scss/mixin.scss";
    
    .wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        
        .rang {
            @include position-absolute(0, 0, 0, false);
            width: 20px;
            display: flex;
            flex-direction: column;
            .item {
                flex: 1;
                text-align: center;
                @include flex-center;
            }
        }
        .center {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            width: 50px;
            height: 50px;
            background-color: $color-9;
            color: $color-white;
            border-radius: 4px;
            line-height: 50px;
            text-align: center;
            font-size: 30px;
        }
    }
   
</style>
<template>
    <div class="wrapper">
        <slot></slot>       
        <div class="rang" ref="rang">
            <div v-for="item in list" class="item">{{item}}</div>
        </div>
        <div class="center" v-show="showText">{{curText}}</div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            list: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            timeOutEvent: 0,
            showText: false,
            curHeight: 0,
            curText: '',
            index: 0,
        }
    },
    methods: {
        getItemHeight() {
            if (this.curHeight) {
                return Math.ceil(this.curHeight / this.list.length)
            }
        },
        getCurText(curClientHeight) {
            if (curClientHeight < 49) {
                curClientHeight = 49       
            }
            if (curClientHeight > this.curHeight + 49) {
                curClientHeight = this.curHeight + 49   
            }    
            let itemHeight = this.getItemHeight()
            this.index = Math.ceil((curClientHeight - 49) / itemHeight) == 0 ? 
                            0 : Math.ceil((curClientHeight - 49) / itemHeight) - 1
            this.curText = this.list[this.index]
        },
        eventStartHandle(ev) {
            this.$refs.rang.style.backgroundColor = '#999'
            this.getCurText(ev.changedTouches[0].pageY)
            this.timeOutEvent = setTimeout(() =>{
                this.timeOutEvent = 0
                this.showText = true
            }, 100)
        },
        eventMoveHandle(ev) {
            this.getCurText(ev.changedTouches[0].pageY)
            this.$emit('curIndex', this.index)
        },
        eventEndhandle(ev) {
            clearTimeout(this.timeOutEvent)
            this.showText = false
            this.$refs.rang.style.backgroundColor = ''
            this.curText = ''
            this.$emit('curIndex', this.index)    
        },
        addEvent() {
            this.$refs.rang.addEventListener('touchstart', this.eventStartHandle, false)
            this.$refs.rang.addEventListener('touchmove', this.eventMoveHandle, false)
            this.$refs.rang.addEventListener('touchend', this.eventEndhandle, false)
        }
    },
    mounted() {
        this.$nextTick(() =>{
            this.addEvent()
            this.curHeight = this.$refs.rang.clientHeight
        })
    }
}
</script>


