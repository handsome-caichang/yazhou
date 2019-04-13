<!-- 上课点评（班级）列表 -->

<style lang="scss" scoped>
.action-sheet {
    @include position-absolute(0, 0, 0, 0);
    z-index: 2;
    letter-spacing: -.05em;
    .csrs_container {
        padding: 0 12px;
        background-color: #fff;
        .csrDet_item {
            line-height: 24px;
            padding-top: 12px;
            padding-bottom: 12px;
            border-bottom: 1px solid #eaeaea;
            .achDet_item_name {
                color: #333;;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .csrDet_item_csr {
            width: 100px;
        }

        .csrDet_item_stu {
            padding-left: .6em;
            padding-right: .6em;
            width: 90px;
            box-sizing: content-box;
        }

        .csrDet_item .col-1 {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .csrDet_item .col-1 span {
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .csr_head .col-0 {
            padding-left: 12px;
            line-height: 50px;
            color: #666;
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
        .grid {
            display: -webkit-box;
            display: box;
            color: #999;
            .col-1 {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                flex: 1;
                -webkit-box-flex: 1;
            }
            .coy3 {
                color: #fcac00;
            }
            .co1 {
                color: #666;
            }
        }
    }
}
.noData-temp {
    @include position-absolute;
}
</style>

<template>
<action-sheet class="action-sheet" v-show="opened" ref="actionSheet" :scrollerConfig="scrollerConfig" @loadData="loadData" :data="list" :fullParent="true" :position="'sideRight'" @close="close">
    <div class="csrs_container">
        <div class="csrDet_item plr" v-for="(obj, index) in list" :key="index">
            <div class="achDet_item_name co">{{obj.ClassName}}</div>
            <div class="grid co2">
                <div class="col-1">{{app.sysInfo.Title_Teacher}}：{{obj.TeacherName}}</div>
                <div class="csrDet_item_stu col-0">人数：<span class="co1">{{obj.StudentCount}}</span>/{{obj.MaxStudentsAmount}}</div>
                <div class="csrDet_item_csr col-0"> <div  v-if="obj.MaxStudentsAmount != 0"> 入班率：<span class="coy3">{{obj.FullClassRang}}</span></div></div>
            </div>
        </div>
    </div>
    <empty-page class="noData-temp" :type="12" text="暂无数据" v-if="list.length == 0"></empty-page>
</action-sheet>
</template>

<script>
import {
    getClassDetail
} from 'teacher/api/classSale'
import EmptyPage from 'teacher/components/common/empty-page/empty-page';
export default {
    name: "classDetail",
    mixins: [app.mixin.popupWindowRouteMixin],
    props: {
        classid: {
            type: String,
            default: ''
        },
        opened: {
            type: Boolean,
            default: false
        },
        FullClassRand: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            wxTitle: "满班率报表",
            list: [],
            scrollerConfig: {
                tag: 'super',
                type: 2,
                pagingOption: {
                    api: getClassDetail,
                    autoLoadFirst: false,
                    params: {
                        classid: this.classid
                    },
                }
            },
        };
    },
    methods: {
        loadData(ajaxPromise) {
            ajaxPromise.then(res => {
                this.isLoading = false;
                if (res.ErrorCode == app.errok) {
                    if (res.PageIndex === 1) {
                        this.list = [];
                    }
                    this.list = this.list.concat(res.Data);
                    console.log(this.list);
                }
            })
        },
    },
    created() {
    },
    watch: {
        opened(newval) {
            if (newval) {
                this.wxTitle = this.FullClassRand + ' - 满班率报表';
                app.tool.setDocTitle(this.wxTitle);
                this.$set(this.scrollerConfig.pagingOption.params, 'classid', this.classid)
                this.$refs.actionSheet.refresh();
            }
        },
    },
    computed: {},
    mounted() {},
    beforeDestroy() {},
    components: {
        EmptyPage
    }
};
</script>
