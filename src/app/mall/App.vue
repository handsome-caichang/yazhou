<style lang="scss">
    // 基础样式
    // @import "./assets/scss/base/index.scss";

    @import "./assets/scss/base/901-rich-text.scss";

    // 全局 根路由/页面 基础样式
    #app{
        @include position-absolute;
        overflow: hidden;
        .page-veiw {
            @include position-absolute;
        }
        .server-block {
            @include position-absolute;
            z-index: 9999999;
        }
    }

    .custom-router-page{
        background-color: #FFF;
    }

</style>

<template>
    <div id='app'>
        <div class="server-block" v-show="serverBlock">
             <loading :bgType='1'></loading>
        </div>
        
        <form method="post" id="wxPayForm" name="wxPayForm" style="display:none">
            <input type="hidden" id="wxData" name="wxData" value="">
        </form>
        <custom-router-view class="page-veiw" ref="CRview"></custom-router-view>
        
        <global-dom-plugin class="plugins-view"></global-dom-plugin>

    </div>
</template>

<script>
    import GlobalDomPlugin from './components/global-dom-plugin/global-dom-plugin.vue';
    import {CartMixin} from './cart-mixin.js';
     import {statisticsPV} from 'api/jie.js';
    export default {
        name: 'App',
        mixins: [CartMixin],
        methods: {
             ...Vuex.mapMutations([
                'set_companyId'
            ]),
        },
        mounted() {
            this.$nextTick(() => {
                app.mallApp = this.$refs.CRview;
                let that = this;
                app.tool.mallShare = function(opt) {
                    opt.link = `https://open.xgjssx.com/Jump/Page?name=MallSaleQrCode&terminal=1&companyid=${that.$store.state.companyId}&redirect=${encodeURIComponent(opt.link)}`

                    return opt
                }
                
                app.tool.compare = function(prop) {
                    return function(obj1, obj2) {
                        var val1 = obj1[prop];
                        var val2 = obj2[prop];
                        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                            val1 = Number(val1);
                            val2 = Number(val2);
                        }
                        if (val1 < val2) {
                            return -1;
                        } else if (val1 > val2) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                };
                
            })
        },
        computed: {
             ...Vuex.mapState([
                'serverBlock',
                'curCampus',
                'config'
            ]),
        },
        created() {
            // 判断是否开启了移动端网城
            if (this.$store.state.config.EnableMall === 0 || this.$store.state.config.EnableMall === 2) {
                this.$router.replace('/appclose')
            } else {
                statisticsPV({
                    page: "index",
                    campusID: this.curCampus.id
                }).then(res => {
                    if (res.ErrorCode === app.errok) {
                        this.set_companyId(res.Data.CompanyID)
                    }
                })
            }
        },
        components: {
            GlobalDomPlugin
        },
        watch: {
            // 观察校区的改变，并触发该页面的重渲;
            curCampus(campus) {
                statisticsPV({
                    page: "index",
                    campusID: campus.id
                })
            }
        }
    };
</script>