
<style lang="scss" scoped>
.actionsheet-password {
    z-index: 10;
    line-height: 1;
    @include position-absolute;
    .coupon-box {
        display: flex;
        justify-content: center;
        align-items: center;
        .coupon {
            width: 281px;
            height: 400px;
            @include background-img(false, cover);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            .close-box {
                position: absolute;
                z-index: 1;
                top: -3%;
                right: 0%;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 19px;
            }
            .close-btn {
                border: 1px solid #b4b4b4;
                height: 27px;
                width: 27px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 27px;
                .icon {
                    width: 10px;
                    height: 10px;
                    color: #d7d7d7;
                }
            }
            // .close-btn {
            //   position: absolute;
            //   z-index: 1;
            //   top: 0;
            //   right: 0;
            //   display: flex;
            //   justify-content: center;
            //   align-items: center;
            //   border: 1px solid #b4b4b4;
            //   height: 27px;
            //   width: 27px;
            //   border-radius: 27px;
            //   .icon {
            //     width: 10px;
            //     height: 10px;
            //     color: #d7d7d7;
            //   }
            // }
            .content {
                height: 400px;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .user-list {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    margin-top: 30px;
                    li {
                        margin: 0 4px 15px;
                        border-radius: 48px;
                        img {
                            display: block;
                            width: 35px;
                            height: 35px;
                            border-radius: 35px;
                        }
                        .icon {
                            color: #fff;
                            width: 35px;
                            height: 35px;
                        }
                    }
                    .leader {
                        position: relative;
                        &::after {
                            content: "团长";
                            position: absolute;
                            top: -7px;
                            right: 0px;
                            padding: 1px 3px;
                            text-align: center;
                            background: rgba(255, 146, 3, 1);
                            border-radius: 9px;
                            color: #fff;
                            font-size: 11px;
                        }
                    }
                }
                .point-text {
                    margin-top: 80px;
                    font-size: 14px;
                    text-align: center;
                    color: #fff;
                }
            }

            .btn {
                @include background-img(false, cover);
                position: absolute;
                bottom: 60px;
                left: 50%;
                transform: translateX(-50%);
                width: 195px;
                height: 44px;
                line-height: 44px;
                text-align: center;
                color: #b83f00;
                font-size: 17px;
                font-weight: bold;
            }
        }
    }
}
</style>

<template>
	<action-sheet ref="actionsheet" v-show="opened" position="center" class="actionsheet-password" :data="opened">
		<div class="coupon-box">
			<div class="coupon" :style="{backgroundImage: `url(${pingtuansuccess})`}">
				<!-- <img  class="bgcImg" :src="one" alt=""> -->
				<!-- <span class="close-btn">&Chi;</span> -->
				<div class="close-box" @click="close">
					<span class="close-btn">
						<svg class="icon " aria-hidden="true">
							<use xlink:href="#iconguanbi"></use>
						</svg>
					</span>
				</div>
				<div class="content">
                    <p class="point-text" v-if="groupusercount-getUserList.length != 0">还差{{groupusercount-getUserList.length}}人，就拼成功啦</p>
                    <p class="point-text" v-if="groupusercount-getUserList.length == 0">恭喜拼成功啦！</p>
					<ul class="user-list">
						<li v-for="(item,index) in groupusercount > 4 ? 3 : groupusercount" :key="index" :class="getUserList[index] ? (getUserList[index].roletype == 1 ? 'leader' : '' ) : ''">
							<img :src="getUserList[index] ? getUserList[index].photourl : ''" v-if="getUserList[index]">
							<svg class="icon" aria-hidden="true" v-if="!getUserList[index]">
								<use xlink:href="#iconkongrenyuan"></use>
							</svg>
						</li>
						<li style="padding-top: 5px;color:#fff;" v-if="groupusercount > 4">...</li>
                        <li v-if="groupusercount > 4">
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#iconkongrenyuan"></use>
							</svg>
						</li>
					</ul>
				</div>
				<p class="btn" @click="toMall" :style="{backgroundImage: `url(${btn})`}">邀请好友一起来拼团</p>
			</div>
		</div>
	</action-sheet>
</template>

<script>
import pingtuansuccess from "./pingtuansuccess.png";
import btn from "./btn.png";
export default {
    name: "pingtuan-success",
    mixins: [app.mixin.popupWindowRouteMixin],
    props: {
        opened: {
            type: Boolean,
            default: true
        },
        userList: {
            type: Array,
            default: []
        },
        groupusercount: {
            type: Number,
            default: 3
        }
    },
    data() {
        return {
            pingtuansuccess,
            btn
        };
    },
    computed: {
        getUserList() {
            let list = [];
            this.userList.forEach(el => {
                if (el.isactiveuser == 1) {
                    list.unshift(el);
                } else if (el.roletype == 1) {
                    list.unshift(el);
                }else {
                    list.push(el);
                }
            });
            return list;
        }
    },
    methods: {
        toMall() {
            this.$emit("toLook");
            // location.replace(this.coupon.Url);
        },
        close() {
            this.$emit("close");
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.actionsheet.$el.childNodes[0].childNodes[2].style.background =
                "none";
            this.$refs.actionsheet.$el.childNodes[0].childNodes[2].style.right =
                "0";
            this.$refs.actionsheet.$el.childNodes[0].childNodes[2].style.left =
                "0";
            this.$refs.actionsheet.$el.childNodes[0].childNodes[2].childNodes[2].childNodes[0].style.maxHeight =
                "none";
            this.$refs.actionsheet.$el.childNodes[0].childNodes[2].childNodes[2].childNodes[0].style.height =
                "400px;";
            setTimeout(() => {
                this.$refs.actionsheet.refresh();
            }, 300);
        });
    }
};
</script>
