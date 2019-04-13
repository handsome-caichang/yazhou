<style scoped lang="scss">
    @import "../../../../assets/scss/variable.scss";
    @import "../../../../assets/scss/mixin.scss";

    .m-chat-emoji {
        width: 100%;
        height: 200px;
        @include position-absolute(false, 0, $h-1, 0);
        background-color: #fff;
        border-top: 1px solid $color-6;
        z-index: 2;

        .emoji-content {
            height: 200px;
            width: 100%;
            background-color: $color-assist-1;
            padding-left: $edge;
            .cnt {
                text-align: left;
                display: flex;
                flex-wrap: wrap;
                .emoji-item {
                    width: 32px;
                    height: 32px;
                    margin: 3px;
                    img {
                        width: 100%;
                        height: 100%;
                        objec-fit: cover;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="m-chat-emoji">
        <scroller-base class="emoji-content" :data="emojiList">
            <div class="cnt">
                <div class="emoji-item" 
                     v-for="item in emojiList"
                     @click="selectEmoji(item)" >
                     <img :src="item.src">
                </div>
            </div>
        </scroller-base>
    </div>
</template>

<script>
import emojiObj from 'src/configs/emoji'

export default {
    props: {
       
    },
    data () {
        return {
            emojiList: []
        }
    },
    computed: {
        
    },
    methods: {
        getEmojiList(type, emojiList) {
            let result = []
            for (let name in emojiObj.emojiList.emoji) {
                let obj = {
                    text: name,
                    src: emojiObj.emojiList.emoji[name].img
                }
                result.push(obj)
            }
            return result
        },
        selectEmoji(obj) {
            this.$emit('selectEmoji', obj)
        }
    },
    mounted() {
        this.emojiList = this.getEmojiList('emoji', emojiObj.emojiList)
    }
}
</script>


