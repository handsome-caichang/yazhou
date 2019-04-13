<template>
    <div>
        <component :is="curDetail"></component>
    </div>
</template>
<script>
import MAP from "./map.js";

export default {
    name: "templateEdit",
    data() {
        return {
            wxTitle: "编辑",
            curDetail: "",
            id: ""
        };
    },
    created() {
        //  匹配路由
        this.id = this.$route.params.id;

        MAP[this.id].editPath().then(component => {
            this.curDetail = component.default;
        });

        this.wxTitle = MAP[this.id].title;
    },
    components: {}
};
</script>