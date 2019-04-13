<!-- 投诉与建议 -->
<style scoped lang="scss">
    
    

    .suggestion {
        .scroller {
            @include position-absolute;
            background-color: $color-assist-1;
            .select-campus {
                display: flex;
                background-color: $color-white;
                padding: 0 15px;
                margin-bottom: 9px;
                height: 49px;
                line-height: 49px;
                font-size: 16px;
                .describe {
                    width: 80px;
                    margin-right: 10px;
                    color: $color-6;
                    .point {
                        color: $color-assist;
                    }
                }
                .campus {
                    flex: 1;
                    position: relative;
                    color: $color-3;
                    .icon {
                        position: absolute;
                        right: 0px;
                        top: 15.5px;
                    }
                }
            }
            .text-content {
                background-color: $color-white;
                margin-bottom: 9px;
                padding: 15px;
                .suggestion-text {
                    font-family: inherit;
                    height: 178px;
                    border: 1px solid $color-border;
                    border-radius: 2px;
                    box-shadow: none;
                    margin-top: 0px;
                    padding: 12px;
                    word-break: break-word;
                    caret-color:$color-primary;
                    resize: none;
                }
            }
            .img-content {
                background-color: $color-white;
                position: relative;
                padding: 15px;
                .limit {
                    position: absolute;
                    bottom: 12px;
                    right: 15px;
                    color: $color-border-2;
                    font-size: 14px;
                }
            }
            .submit {
                height: 49px;
                line-height: 49px;
                font-size: 16px;
                color: $color-white;
                width: 90%;
                text-align: center;
                border-radius: 3px;
                background-color: $color-primary;
                margin: 25px auto 15px;
            }
            .record-box {
                padding-bottom: 20px;
                .record {
                    height: 22px;
                    line-height: 21px;
                    width: 85px;
                    font-size: 12px;
                    text-align: center;
                    margin: 0 auto;
                    border: 1px solid #CCCCCC;
                    color: #999999;
                    border-radius: 3px;
                }
            }
        }
        .as-campus {
            @include position-absolute;
        }
    }
</style>

<template>
    <div class="suggestion">
        <scroller-base class="scroller" ref="myScroller" :data="renderData">
            <div class="select-campus">
                <div class="describe">选择{{app.sysInfo.Title_Campus}}<span class="point">*</span></div>
                <div class="campus" @click="openCampusActionsheet">
                    <div class="campus-name">{{campuName}}</div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="text-content">
                <textarea
                        class="suggestion-text"
                        maxlength="500"
                        v-model="suggestionContent"
                        placeholder="请输入您对学校或老师的投诉与建议（500字以内）"
                        @touchstart="app.area.start($event)"
                        @touchmove="app.area.move($event)"
                        @touchend="app.area.end($event)">
                </textarea>
            </div>
            <div class="img-content">
                <img-area
                        :imageMaxNum=3
                        @imageFinished="imgUpload">
                </img-area>
                <div class="limit" v-show="imgs.length<1">限3张</div>
            </div>

            <div class="submit" @click="submit">提交</div>
            <div class="record-box">
                <router-link tag="div" to="/suggestionRecord/00000000-0000-0000-0000-000000000000" class="record">我的留言记录</router-link>
            </div>
        </scroller-base>
        <suggestion-campus class="as-campus"
                           :opened.sync="openAsCampus"
                           :campusList="campusList"
                           @suggestionCampu="campuAction">
        </suggestion-campus>
        <loading class="loading" v-show="isLoading" :bgType="1"></loading>
    </div>
</template>

<script>
    import {getCampusList} from 'parent/api/suggestion';
    import {savePost} from 'parent/api/common';
    import SuggestionCampus from './child/suggestion-campus';

    export default {
        name: "suggestion",
        data() {
            return {
                wxTitle: app.sysInfo.Title_SSX_Suggest,
                openAsCampus: false, //是否展开‘校区选择’组件
                campuName: null,
                campusList: null,
                checkedCampu: null,
                suggestionContent: '',
                campusid: '00000000-0000-0000-0000-000000000000',
                imgs: [],
                imgids: '',
                isLoading: false,
                scrollRefreshNum: 0
            }
        },
        computed: {
            renderData() {
                return {
                    scrollRefreshNum: this.scrollRefreshNum
                }
            }
        },
        methods: {
            openCampusActionsheet() {
                // *学员已报名上课，=》有校区
                this.openAsCampus = !this.openAsCampus;
            },
            campuAction(obj) {
                this.checkedCampu = obj;
                this.campuName = obj.CampusName;
                this.campusid = obj.ID;
            },
            imgUpload(arr) {
                this.imgs = arr;
                this.scrollRefreshNum++;
            },
            submit() {
                let pro = [];
                if (this.campusid == '00000000-0000-0000-0000-000000000000') {
                    app.toast('info', '请选择要投诉的校区。');
                    return;
                }
                if (app.tool.trim(this.suggestionContent) == '') {
                    app.toast('info', '请输入您的投诉与建议。');
                    return;
                }

                this.isLoading = true;
                if (this.imgs.length == 0) {
                    this.send();
                } else {
                    this.imgs.forEach(item => {
                        item.promise && pro.push(item.promise);
                    });
                    Promise.all(pro).then(res => {
                        let ls_imgids = [];
                        res.forEach(item => {
                            ls_imgids.push(item);
                        })
                        this.imgids = ls_imgids.join(",");
                        this.send();
                    }).catch(rej => {
                        app.toast('error','上传附件失败，请在网络畅通时重新尝试。');
                        return;
                    });
                }
            },
            send() {
                savePost({
                    saveFlag: 'SUGGESTION_PARENT',
                    content: app.tool.arrowFilter(this.suggestionContent),
                    campusid: this.campusid,
                    media_ids: this.imgids
                }).then(res => {
                    if (res.errcode == app.errok) {
                        this.$router.go(-1);
                        app.toast('success', '您的宝贵意见已提交。');
                    }else{
                        app.toast('error',res.errmsg)
                    }
                    this.isLoading = false;
                })
            }
        },
        created() {
            getCampusList().then(res => {
                this.campusList = res.Data;
            })
        },
        watch: {
            suggestionContent: function (content) {
                if (content.length > 500) {
                    this.suggestionContent = content.substring(0, 500)
                }
            }
        },
        components: {
            SuggestionCampus
        }
    }
</script>