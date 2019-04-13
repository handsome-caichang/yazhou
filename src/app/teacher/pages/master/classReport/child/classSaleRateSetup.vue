<!-- 上课点评（班级）列表 -->

<style lang="scss" scoped>
.action-sheet {
    @include position-absolute(0, 0, 0, 0);
    z-index: 2;

    .csrs_container {
        padding: 0 12px;
        padding-bottom: 40px;

        .csrs_comment {
            color: #9f9a94;
            padding: 20px 0 10px 0;
            line-height: 16px;
            font-size: 13px;
        }
        .csrs_list {
            .csrs_item {
                line-height: 40px;
                padding: 10px 0;
            }

            .csrs_item .inpWrap {
                border: 1px solid #CCC;
                color: #999;
                padding-right: 10px;
            }

            .csrs_item input[type="number"] {
                margin: 0;
                border: 0;
                box-shadow: 0;
                text-align: right;
                padding-right: 4px;
            }

            .csrs_item>span {
                margin-left: 10px;
                margin-right: 10px;
            }

            .csrs_item>svg {
                padding: 10px;
                font-size: 20px;
                color: #9f9a94;
                box-sizing: content-box;
            }

        }

        .csrs_create {
            line-height: 40px;
            padding-left: 5px;
            padding-right: 5px;
            text-align: right;
            color: #666;
        }

        .csrs_create svg {
            color: #2196F3;
        }

        .csrs_btn {
            background-color: #2196F3;
            line-height: 40px;
            border-radius: 4px;
            text-align: center;
            color: #FFF;
            font-size: 16px;
            margin-top: 40px;
        }

        .classSaleRateSetup_article .scrollWrapper {
            padding-bottom: 40px;
        }

        .loading {
            @include position-absolute(54px, 0, 0, 0);
        }
        .flex {
            display: flex;
        }
        .flex_v_center {
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
        }
        .flex_reverse {
            flex-direction: row-reverse;
        }
        .flex_con {
            flex: 1;
        }
        .iconfont_xz {
            width: 1em;
            height: 1em;
            vertical-align: -.15em;
            fill: currentColor;
            overflow: hidden;
        }
    }
}
</style>

<template>
<action-sheet class="action-sheet" v-show="opened" :data="setupData" :fullParent="true" :position="position" @close="close">
    <div class="csrs_container" id="classSaleRateSetup_section">
        <div class="csrs_comment">注：分组之间的数字范围要尾相连，且必须完整的表示0到最大值之间的整个范围。</div>
        <ul class="csrs_list">
            <li class="csrs_item flex flex_v_center" v-for="(item,index) in setupData" :key="index" >
                <div class="inpWrap flex_con flex">
                    <input type="number" :name="'inputName'+index+'0'" v-model="item[0]" @blur="inputBlur($event ,item, index, 0)">
                    <span>%</span>
                </div>
                <span class="">-</span>
                <div class="inpWrap flex_con flex">
                    <input type="number" :name="'inputName'+index+'1'" v-model="item[1]" @blur="inputBlur($event ,item, index, 1)">
                    <span>%</span>
                </div>
                <svg class="iconfont_xz" @click="deleteItem(index)">
                    <use xlink:href="#ixz-delete"></use>
                </svg>
            </li>
        </ul>
        <div class="flex flex_reverse">
            <div class="csrs_create" @click="addList">
                <svg class="iconfont_xz">
                    <use xlink:href="#ixz-jiahao"></use>
                </svg>
                新建分组
            </div>
        </div>

        <div class="csrs_btn" @click="submitData">确定</div>
    </div>
</action-sheet>
</template>

<script>
import {setClassFull} from 'teacher/api/classSale'
export default {
    name: "classSaleRate-setup",
    mixins: [app.mixin.popupWindowRouteMixin],
    props: {
        setupData: {
            type: Array,
            default: []
        },
        opened: {
            type: Boolean,
            default: false
        },
        position: {
            type: String,
            default: "sideRight"
        }
    },
    data() {
        return {
            wxTitle: "满班率分组设置",
        };
    },
    methods: {
        addList() {
            if (this.setupData.length > 20) {
                app.alert('最多只能创建 20 组');
            }else {
                this.setupData.push(['', '']);
            }
        },
        deleteItem(i) {
            if (this.setupData.length > 1 ) {
                this.setupData.splice(i, 1);
            }else {
                app.alert('最少要保留 1 组');
            }
        },
        inputBlur(event, item, index, num) {
            console.log(event);
            if (num == 0) {
                if (index == 0) {
                    item[0] = 0;
                    event.target.value = 0;
                }else {
                    this.setupData[index-1][1] = parseInt(item[0]) - 1;
                    event.target.parentNode.parentNode.parentNode.children[index-1].children[2].children[0].value = parseInt(item[0]) - 1;
                }
            }else {
                if (this.setupData.length > 1 && index != this.setupData.length -1 ) {
                    this.setupData[index+1][0] = parseInt(item[num]) + 1;
                    event.target.parentNode.parentNode.parentNode.children[index+1].children[0].children[0].value = parseInt(item[num])+1;
                }
            }
            console.log(this.setupData);
        },
        submitData () {
            console.log(this.setupData)
            let res = [];
            if( parseInt(this.setupData[0][0]) !== 0 ) {
                app.alert('第一组第一位必需为 0');
                return;
            }
            if( this.setupData[this.setupData.length-1][1] == '') {
                app.alert('最后一组最后一位必填');
                return;
            }
            for (let index = 0; index < this.setupData.length; index++) {
                const item = this.setupData[index];
                let v1 = parseInt(item[0]);
                let v2 = parseInt(item[1]);
                res.push(v1, v2);
                if(v1 >= v2) {
                    app.alert('同一组中的第二个值必需大于第一个。');
                    return;
                }
                if(index > 0) {
                    let num2 = parseInt(this.setupData[index-1][1]);
                    if(v1 - num2 !== 1) {
                        app.alert('相邻两组间的数字必需首尾相连。');
                        return;
                    }
                }
            }
            console.log(res);
            setClassFull({
                "settingStr": res.join()
            }).then(respon => {
                if (respon.ErrorCode == app.errok) {
                    app.toast("设置成功", 2000);
                    this.$emit('resetData');
                    this.$router.back();
                }
            })
            // 提交设置给后台
            // jie.ajax({
            //     url: 'api/Class/SettingRuleOfFullClassRand',
            //     data: {"settingStr":res.join()},
            //     success: function (data) {
            //         app.toast("设置成功", "success", 2000);
            //         // 触发满班率页面刷新
            //         history.back();
            //     }
            // })
        },
    },
    created() {
    },
    computed: {
    },
    mounted() {
    },
    beforeDestroy() {},
    components: {}
};
</script>
