<style lang="scss" scoped> 
    .notice-add {
        .body {
            @include position-absolute;
            background-color: #eef1f6;
            ::-webkit-input-placeholder {
                color: rgba(153, 153, 153, 1);
            }
            input {
                outline: none;
            }
            .scroller {
                @include position-absolute(0, 0, 98px, 0);
                overflow: hidden;
                top: 10px;
                padding: 0px 15px;
            }
            .accept-itme {
                display: flex;
                flex-wrap: wrap;
                background: #fff;
                color: rgba(51, 51, 51, 1);
                padding-bottom: 5px;
            }
            // 弹性列表项
            .flex-space-between {
                background: #ffffff;
                display: flex;
                justify-content: space-between;
                padding-left: 12px;
                padding-right: 12px;
                height: 44px;
                line-height: 44px;
                span {
                    &:last-child {
                        color: rgba(153, 153, 153, 1);
                        text-align: right;
                        max-width: 80%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
                .right-span {
                    @include ellipsis-single;
                    max-width: 95%;
                }
                input[type="text"] {
                    text-align: right;
                }
            }
            .add-content {
                margin-top: 10px;
                > div {
                    padding: 15px 15px 50px 15px;
                    background: #ffffff;
                }
                .txt {
                    textarea {
                        border-radius: 2px;
                        border: 1px solid rgba(224, 229, 238, 1);
                        width: 100%;
                        height: 240px;
                        padding: 12px;
                        margin-top: 12px;
                        font-family: PingFangSC-Regular;
                        resize: none;
                    }
                    .voice {
                        padding-top: 15px;
                        padding-bottom: 15px;
                    }
                }
                .video-tips {
                    color: #1e88f5;
                }
                .img {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    .img-wrapper {
                        width: 29vw;
                        height: 29vw;
                        max-width: 218px;
                        max-height: 218px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        border-radius: 2px;
                        border: 1px solid rgba(224, 229, 238, 1);
                        color: rgba(187, 187, 187, 1);
                        font-size: 0.625rem;
                        margin-bottom: 12px;
                        .icon-tianjiatupian {
                            width: 27.5229%;
                            height: 27.5229%;
                            margin-bottom: 13px;
                        }
                    }
                }
            }
        }
        .bottom-fixed-button {
            position: absolute;
            width: 100%;
            bottom: 0;
            button {
                background: #fff;
                font-size: 0.75rem;
                height: 48px;
                line-height: 48px;
                border: none;
                outline: none;
                width: 100%;
                height: 100%;
                font-size: 1rem;
                color: #fff;
                background: rgba(30, 136, 245, 1);
            }
            .fixed-box {
                font-size: 13px;
                color: #999999;
                padding: 15px;
                display: flex;
                align-items: center;
                .btn-text {
                    margin-left: 7px;
                    color: #666666;
                }
                .card-next {
                    font-size: 18px;
                }
            }
        }
    }
</style>

<template>
	<div class="notice-add">
		<div class="body">
			<scroller-base 
				class="scroller" 
				ref="noticeAddScrollerBase" 
				:data="contentHtml">
				<div class="flex-space-between" @click="closeClassAction">
					<span>接收人</span>
					<span>
						<span class="right-span">
							{{ placeholderTxt }}
						</span>
						<svg class="icon card-next" aria-hidden="true">
							<use xlink:href="#icon-youjiantou"></use>
						</svg>
					</span>
				</div>
				<div class="accept-itme" v-html="accpetItemTxt"></div>
				<div class="add-content">
					<div class="txt">
						<div>内容</div>
						<textarea 
        			        v-model="content" 
							name="notice-content" 
							id="" 
							cols="50" 
							rows="50" 
							placeholder="写点什么吧，让学生更容易转发～～"
							@touchstart="app.area.start($event)"
							@touchmove="app.area.move($event)"
							@touchend="app.area.end($event)"
                            maxlength="200"
						></textarea>
					</div>
				</div>
			</scroller-base>
			<div class="bottom-fixed-button">
                <!-- <div class="fixed-box" @click="selcetRepeat">
                    <svg class="icon card-next" aria-hidden="true">
                        <use :xlink:href="repeatFlag == true ? '#icon-duoxuan' : '#icon-duoxuan-weixuanze'"></use>
                    </svg>
                    <span class="btn-text">去重转发</span>
                    <span>（勾选上不回同一个学生发多次）</span>
                </div> -->
                <button :style="btnStyle" @click="addNoticeFn">提交</button>
            </div>
		</div>
        <loading class="loading" v-show="isLoading" :bgType="1"></loading>
		<!-- 选择接收班级 -->
		<NoticeClassList 
			:opened.sync="opened" 
			@getAccpets="getAccpets" 
			ref="noticeClassList">
		</NoticeClassList>
	</div>
</template>

<script>
    import NoticeClassList from "./child/class-list";
	import {savePost} from "teacher/api/common.js";

    export default {
        name: "public-page",
        components: {
            NoticeClassList
        },
        data() {
            return {
                wxTitle: "转发",
                repeatFlag: false,
                accpetItemTxt: "",
                accpetItem: [],
                placeholderTxt: "请选择",
                content: "",
                opened: false,
                isLoading: false,
                recommendcardId: ''
            };
        },
        computed: {
            contentHtml() {
                return {
                    classList: this.accpetItemTxt
                }
            },
            btnStyle() {
                if (!this.content) {
                    return {
                        backgroundColor: '#CCCCCC'
                    };
                }
                let _filterClass = this.accpetItem.filter(item => item.chooseNum > 0);
                if (_filterClass.length == 0) {
                    return {
                        backgroundColor: '#CCCCCC'
                    };
                }else {
                    return {

                    }
                }
            }
        },
        created() {
            this.recommendcardId = this.$route.params.id;
        },
        methods: {
            // selcetRepeat() {
            //     this.repeatFlag = !this.repeatFlag;
            // },
            // 选择接收班级
            closeClassAction() {
                this.opened = true;
            },
            // 接受选择的班级
            getAccpets(data) {
                let _itme = ""; // 筛选出班级人数大于0的已选班级
                let _filterClass = data.filter(item => item.chooseNum > 0);
                if (_filterClass.length > 0) {
                    _filterClass.forEach(item => {
                        if (item.chooseNum > 0) {
                            _itme +=
                            '<span class="items" style="background: rgba(224,229,238,1);border-radius: 100px;padding: 0 10px;margin: 5px 10px;">' +
                            item.shiftName +
                            " (" +
                            item.chooseNum +
                            ")名学生</span>";
                            this.placeholderTxt = "";
                        }
                    });
                    this.accpetItemTxt = _itme;
                    this.accpetItem = app.tool.clone(_filterClass);
                } else {
                    this.placeholderTxt = "请选择";
                    this.accpetItemTxt = "";
                }
            },
            // 提交
            addNoticeFn() {
                if (this.accpetItem.length == 0) {
                    app.toast("info", "请选择接收人。");
                    return;
                }
                if (this.content.length == 0 ) {
                    app.toast("info", "请输入转发内容。");
                    return;
                }
                this.isLoading = true;
                console.log(JSON.stringify(this.accpetItem));
                savePost({
                    saveFlag: 'sendRecommendCard',
                    content: this.content,
                    recommendcardId: this.recommendcardId,
                    students: JSON.stringify(this.accpetItem),
                    CurrentRole: app.sysInfo.currole.Id
                    // repeatFlag: true, // true 代表去重
                }).then(res => {
                    this.isLoading = false;
                    if(res.errcode == app.errok) {
                        app.toast('success',res.errmsg, 1000);
                        setTimeout(() => {
                            this.$router.replace('/cardList');
                        }, 1000);
                    }else {
                        app.alert(res.errmsg);
                    }
                })

            },
        },
    };
</script>