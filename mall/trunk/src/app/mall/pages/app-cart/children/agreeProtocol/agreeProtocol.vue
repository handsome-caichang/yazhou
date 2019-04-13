<style lang="scss" scoped>
    
    
    .action-sheet {
        @include position-absolute;
        .content {
            min-height: 200px;
            padding: 10px;
        }
        .header {
            // height: 40px;
            // line-height: 40px;
            padding: 10px;
            text-align: center;
            font-size: 16px;
        }
        .bottom {
            height: 70px;
            .bottom-top {
                height: 30px;
                border-bottom: 1px solid $color-assist-1;
                text-align: center;
                padding-bottom: 10px;
                .spec {
                    color: $color-primary;
                }
            }
            .bottom-down {
                height: 40px;
                line-height: 40px;
                display: flex;
                .btn {
                    height: 100%;
                    flex: 1;
                    text-align: center;
                    &:first-child {
                        border-right: 1px solid $color-assist-1;
                    }
                }
                .active {
                    background-color: $color-primary;
                    color: $color-white;
                }
            }
        }
    }
</style>

<template>
    <action-sheet 
        class="action-sheet"
        v-if="opened"
        :position="'center'"
        @close="close"
        :data="scrollData">
        <div class="header" slot="header">
            {{title}}
        </div>
        <div class="content">
            <!-- <div v-for="i in content">{{i}}</div> -->
            <rich-text-area :richText="content" v-if="content" @imgLoaded="imgLoaded">
                
            </rich-text-area>
        </div>
        <div class="bottom" slot="footer">
            <div class="bottom-top" @click="isAgree=!isAgree">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="isAgree?'#icon-xuanzhong1':'#icon-duoxuanweixuanzhong'"></use>
                </svg>
                已阅读并同意<span class="spec"><<隐私权政策>></span>
            </div>
            <div class="bottom-down">
                <div class="btn" v-for="(btn,index) in btns" @click="_triggerBtn(btn)">{{btn.text}}</div>
            </div>
        </div>
    </action-sheet>
</template>

<script>
    import RichTextArea from 'common/rich-text-area/rich-text-area'
    import {getProtocol} from 'api/yy'
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props:{
            // opened: {
            //     type: Boolean
            // },
        },
        data() {
            return {
                num: 0,
                content: '',
                title: '',
                isAgree: false,
                _rsv: null,
                opened: false,
                btns: [
                        {
                            text: '取消',
                            action: false
                        },{
                            text: '确定',
                            action: true
                        }
                    ]
            }
        },
        computed: {
            scrollData() {
                return {
                    content: this.content,
                    num: this.num
                }
            }
        },
        methods: {
            _triggerBtn(btn) {
                if (!this.isAgree && btn.action) {
                    app.toast('info', '请先同意协议')
                    return 
                }
                this._rsv(btn.action)
                this.close()
            },
            show(resolve) {
                this.opened = true
                getProtocol().then(res => {
                    if (res.ErrorCode == app.errok) {
                        this.content = res.Data.Content
                        this.title = res.Data.Title
                    }
                })

                this.promise = new Promise(rsv => {
                    this._rsv = rsv
                })
                return this.promise
            },
            imgLoaded() {
                this.num++
            }
        },
        created() {
            
        },
        components: {
            RichTextArea
        }
    }
</script>