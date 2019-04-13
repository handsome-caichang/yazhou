<style scoped lang="scss">
    
    
    .wrapper {
        @include position-absolute;
        padding: 0 16px;
        background-color: #F7F8FA;
        .content {
            // @include position-absolute(0, 0, 49px, 0);
            background-color: #F7F8FA;
        }
        .title {
            height: 40px;
            line-height: 50px;
            font-size: 12px;
            color: $color-9;
            padding-left: 5px;
            background-color: #F7F8FA;
            .spec {
                color: #FF735C;
            }
        }
        .item {
            height: 49px;
            @include flex-between;
            background-color: $color-white;
            font-size: 14px;
            border-radius: 6px;
            padding: 0 16px;
            margin-bottom: 10px;
            .text {
                flex: 1;
            }
            .icon-wrapper {
                width: 16px;
            }
            .no-select {
                color: #ADB2BB;
            }
        }
        .void {
            height: 10px;
            background-color: #F7F8FA;
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
                line-height: 40px;
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
        :data="scrollData" 
        v-show="opened" 
        @close="close" 
        :position="'sideRight'"
        :fullParent="true">
        <div class="content">
            <div class="title">必填项<span class="spec">*</span></div>
            <div class="item" v-for="item in mustList">
                <div class="text">{{item.fieldname}}</div>
                <div class="icon-wrapper no-select">
                </div>
            </div>
            <div class="title">选填项</div>
            <div class="item" v-for="item in list" @click="changeIsuse(item)">
                <div class="text">{{item.fieldname}}</div>
                <div class="icon-wrapper no-select">
                    <svg aria-hidden="true" class="icon">
                        <use :xlink:href="item.isuse?'#icon-duoxuanxuanzhong':'#icon-duoxuanweixuanzhong'"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="void"></div>
        <div class="bottom" slot="footer">
            <div class="content" @click="emitSelect">确定</div>
        </div>
        
    </action-sheet>

</template>


<script>
    import {getQrcodeFormList} from 'crm/api/yy.js'
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: false
            },
            mustList: {
                type: Array
            },
            noMustList: {
                type: Array
            }
        },
        computed: {
            scrollData() {
                return this.mustList.length + this.list.length
            }
        },
        data() {
            return {
                list: []
            }
        },
        methods: {
            changeIsuse(obj) {
                obj.isuse ? obj.isuse = 0 : obj.isuse = 1
            },
            emitSelect() {
                this.$emit('selectItem', this.list)
                this.close()
            }
        },
        created() {
            window.b = this
        },
        watch: {
            opened(val) {
                if (val) this.list = app.tool.clone(this.noMustList)
            }
        }
    }
</script>