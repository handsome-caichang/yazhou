<template>
  <div class="text-container">
    <textarea ref="textareaRefs" :maxlength="maxlength" :value="value" :cols="clos" :rows="rows" :placeholder="placeholder" @touchstart="app.area.start($event)" @touchmove="app.area.move($event)" @touchend="app.area.end($event)" @input="$emit('input',$event.target.value)" @focus="focusFlag=true" @blur="focusFlag=false"></textarea>
    <div class="claer-box" @click="clearInput" v-show="focusFlag">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconqingchuanniu"></use>
        </svg>
    </div>
  </div>
</template>
<script>
//input输入组件
export default {
    name: "feTextArea",
    //组件上v-model即可数据双向绑定 // v-show="focusFlag"
    model: {
        prop: "value",
        event: "input"
    },
    props: {
        value: String,
        //占位符
        placeholder: {
            type: String,
            default: "请输入..."
        },
        rows: {
            type: String,
            default: "8"
        },
        cols: {
            type: String,
            default: "30"
        },
        maxlength: {
            type: String,
            default: "500"
        }
    },
    data() {
        return {
            focusFlag: false
        };
    },
    methods: {
        clearInput() {
            console.log(this.$refs.textareaRefs.value);
            this.$refs.textareaRefs.value="";
            this.$emit("input", "");
            // this.$refs.textareaRefs.focus();
        }
    }
};
</script>
<style lang="scss" scoped>
.text-container {
    padding: 12px;
    background-color: #f7f8fa;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: 4px;
    margin-top: 16px;
    position: relative;
    textarea {
        line-height: 22px;
        font-size: 15px;
        padding: 0px;
        padding-right: 10px;
        color: #666;
        background-color: #f7f8fa;
        &::placeholder {
            color: #cccccc;
        }
    }
    .claer-box {
        position: absolute;
        z-index: 1;
        // top: 50%;
        right: 0%;
        top: 50%;
        // transform: translate(-50%,0px);
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translate(-1px,-50%);
        // .claer {
            // height: 14px;
            // width: 14px;
            // padding: 5px;
            .icon {
                font-size: 14px;
            }
            // width: 14px;
            // height: 14px;
            // line-height: 14px;
            // text-align: center;
            // background: rgba(177, 177, 177, 1);
            // color: #fff;
            // font-size: 10px;
            // border-radius: 14px;
        // }
    }
}
</style>
