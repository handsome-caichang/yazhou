<style scoped lang="scss">
    .wrapper {
        .scroll {
            @include position-absolute(0, 0, 49px, 0);
            background-color: #F7F8FA;
            padding: 0 16px;
            .title {
                height: 42px;
                color: $color-9;
                font-size: 12px;
                padding-left: 4px;
                line-height: 55px;
            }
            .big-item {
                width: 100%;
                background-color: $color-white;
                padding: 16px 14px;
                border-radius: 6px;
                display: flex;
                flex-wrap: wrap;
                .item {
                    height: 28px;
                    line-height: 28px;
                    padding: 0 14px;
                    background-color: #F4F6F8;
                    color: #75859B;
                    font-size: 12px;
                    border-radius: 13px;
                    margin-right: 8px;
                    margin-top: 8px;
                    .delete {
                        margin-left: 5px;
                    }
                }
                .spec {
                    width: 70px;
                    background-color: $color-white;
                    border: 1px dashed #5991FF;
                    color: #5991FF;
                }
            }
            .item {
                height: 49px;
                border: 1px solid #F7F8FA;
                border-radius: 6px;
                background-color: $color-white;
                color: $color-9;
                padding: 0 15px;
                margin-bottom: 8px;
                @include flex-between;
                .text {
                    // width: 40px;
                    font-size: 14px;
                }
                .mid {
                    flex: 1;
                    text-align: right;
                    @include ellipsis-single;
                    margin-left: 30px; 
                    font-size: 14px;
                    color: $color-3;
                }
                .right {
                    width: 20px;
                    text-align: right;
                }
            }
            .void {
                height: 10px;
                background-color: #F7F8FA;
            }
        }
        .bottom {
            @include position-absolute(false, 0, 0, 0);
            height: 49px;
            border-top: 1px solid #C2CCDC;
            @include flex-between;
            padding: 0 8px;
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
    <div class="wrapper">
        <scroller-base :data="scrollData" class="scroll">
            <div class="title">H5页面字段</div>
            <div class="big-item">
                <div class="item" v-for="item in mustList">
                    {{item.fieldname}}
                </div>
                <div class="item" v-for="item in isUseList" @click="delItem(item)">
                    {{item.fieldname}}
                    <span class="delete">
                        <svg aria-hidden="true" class="icon">
                            <use xlink:href="#icon-shanchuanniu"></use>
                        </svg>
                    </span>
                </div>
                <div class="item spec" @click="showSelectItems=true">+&nbsp添加</div>
            </div>
            <div class="title">系统数据设置</div>
            <div class="item" @click="openCommAction('campusList')">
                <div class="text">所属校区</div>
                <div class="mid">{{campusObj.value}}</div>
                <div class="right">
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item" @click="showSelectSource=true">
                <div class="text">招生来源</div>
                <div class="mid">{{sourceObj.value}}</div>
                <div class="right">
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item" @click="selectResponsible(0)">
                <div class="text">主责任人</div>
                <div class="mid">{{mainPerson.name}}</div>
                <div class="right">
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="item"  @click="selectResponsible(1)">
                <div class="text">副责任人</div>
                <div class="mid">{{minorPersonName}}</div>
                <div class="right">
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="void"></div>
        </scroller-base>
        <div class="bottom">
            <div class="content" @click="submit">确定</div>
        </div>
        <select-object  
            :opened.sync="showSelectItems" 
            :mustList="mustList"
            :noMustList="noMustList"
            :isUseList="isUseList"
            @selectItem="selectItem">
                            
        </select-object>

        <comm-action :opened.sync="showCommAction" ref="commAction"></comm-action>

        <!-- 选择招生来源 -->
        <select-source 
            :opened.sync="showSelectSource" 
            :list="sourceList"
            @selectBigItem="selectBigItem"
            @selectSmallItem="selectSmallItem"></select-source>
    </div>
</template>

<script>
    import {opConfigQrcode, getQrcodeInfo, getQrcodeFormList, getcustomerinformationconfiglist, getCampuslist, getCurrentManager} from 'crm/api/yy.js'
    import SelectObject from './child/selectObject.vue'
    import CommAction from 'crm/components/commAction/commAction.vue'
    import SelectSource from 'crm/components/selectSource/selectSource.vue'
    
    export default {
        data() {
            return {
                wxTitle: '二维码招生配置',
                optype: parseInt(this.$route.params.optype),
                qrcodeid: '',
                list: [{name:'手机号码',isclick:false},{name:'姓名',isclick:false}],
                mustList: [],
                noMustList: [],

                showSelectItems: false,
                showCommAction: false,
                showSelectSource: false,

                campusList: [],
                campusObj: {},

                sourceList: [],
                sourceObj: {},

                mainPerson: {}, //主责任人
                minorPerson: [], //副责任人 
            }
        },
        computed: {
            ...Vuex.mapState(['myInfo']),
            isUseList() {
                return this.noMustList.filter(obj => obj.isuse)
            },
            scrollData() {
                return this.mustList.length + this.isUseList.length
            },
            computedParams() {
                let mainArr = [this.mainPerson].map(obj => {
                    return {
                        id: obj.id || '',
                        name: obj.name || '',
                        ismaster: 1
                    }
                })
                let minorArr = this.minorPerson.map(obj => {
                    return {
                        id: obj.id,
                        name: obj.name,
                        ismaster: 0
                    }
                })
                return mainArr[0].id ? mainArr.concat(minorArr) : []
            },
            minorPersonName() {
                return this.minorPerson.map(obj => obj.name).join()
            }
        },
        methods: {
            ...Vuex.mapMutations(['set_myInfo']),
            delItem(item) {
                this.noMustList.forEach(obj => {
                    if (item.id === obj. id) obj.isuse = 0
                })
            },
            selectItem(arr) {
                this.noMustList = arr
            },
            getData() {
                if (this.optype === 2) {
                    getQrcodeInfo().then(res => {
                        if (res.result.code === app.errok) {
                            this.sourceObj = {
                                id: res.data.systemsetting.source.id,
                                value: res.data.systemsetting.source.name
                            }
                            this.campusObj = {
                                id: res.data.systemsetting.campus.id,
                                value: res.data.systemsetting.campus.name
                            }
                            this.mainPerson = res.data.systemsetting.liablepersons.filter(obj => obj.ismaster === 1)[0]
                            this.minorPerson = res.data.systemsetting.liablepersons.filter(obj => obj.ismaster !== 1)
                            this.qrcodeid = res.data.configqrcodeinfo.id
                        }
                    })
                } else {
                    this.mainPerson = {
                        id: this.myInfo.id,
                        name: this.myInfo.name
                    }
                }
                getQrcodeFormList().then(res => {
                    if (res.result.code === app.errok) {
                        // let list = res.data.filter(obj => obj.field != 'cWebchat')
                        let list = res.data.filter(obj => {
                            return obj.field != 'cWebchat' && obj.field !== 'cCampusID' && obj.field !== 'cCustomerManagerID' && obj.field !== 'cNotCustomerManager'
                        })
                        this.mustList = list.filter(obj => obj.isallowempty)
                        
                        // this.mustList = this.mustList.filter(obj => obj.field !== 'cCampusID' && obj.field !== 'cCustomerManagerID')
                        this.noMustList = list.filter(obj => !obj.isallowempty)
                        
                    }
                })
                getcustomerinformationconfiglist({type: 'AdmissionsSource'}).then(res => {
                    if (res.result.code === app.errok) {
                        res.data.forEach(obj => {
                            this.$set(obj, 'isSelect', false)
                        })
                        this.sourceList = res.data.filter(obj => obj.parentid === '00000000-0000-0000-0000-000000000000')
                        let tempArr = res.data.filter(obj => obj.parentid !== '00000000-0000-0000-0000-000000000000')
                        this.sourceList.forEach(obj => {
                            obj.list = []
                            tempArr.forEach(item => {
                                if (item.parentid === obj.id) obj.list.push(item)
                            })
                        })
                        if (this.optype === 1) { //添加
                            this.sourceList[0].isSelect = true
                        } else { //修改
                            tempArr.forEach(obj => {
                                if (obj.id == this.sourceObj.id) {
                                    obj.isSelect = true
                                    this.sourceList.forEach(item => {
                                        if (obj.parentid === item.id) item.isSelect = true
                                    })
                                }
                            })
                        }
                    }
                })
                getCampuslist().then(res => {
                    if (res.result.code === app.errok) {
                        this.campusList = res.data
                        this.campusList.forEach(obj => {
                            obj.value = obj.name
                            if (this.optype === 2 && obj.id === this.campusObj.id) {
                                this.$set(obj, 'isSelect', true)    
                            } else {
                                this.$set(obj, 'isSelect', false)
                            }
                        })
                    }
                })
            },
            selectBigItem(id) {
                this.sourceList.forEach(obj => {

                    if (obj.id === id) {
                        obj.isSelect = true
                    } else {
                        obj.isSelect = false
                    }
                })
            },
            selectSmallItem(id) {
                this.sourceList.forEach(obj => {
                    if (obj.isSelect) {
                        obj.list.forEach(item => {
                            if (item.id === id) {
                                item.isSelect = true
                                this.sourceObj = item
                            } else {
                                item.isSelect = false
                            }
                        })
                    }
                })
                this.showSelectSource = false
            },
            openCommAction(str) {
                if (!str) return
                this.showCommAction = true
                let title = '选择公立学校'
                this.$refs.commAction.show({
                    title: title,
                    list: this.campusList
                }).then(res => {
                    res && this.campusList.forEach(obj => {
                        if (obj.id === res.id) {
                            obj.isSelect = true
                        } else {
                            obj.isSelect = false
                        }
                    })
                    this.campusObj = res
                })
                
            },
            selectResponsible(f) {
                if(f==0){
                    // console.log('选主。。。。责任人')
                    let arr = this.minorPerson;
                    app.responsibleOfficer(0,[this.mainPerson], function (data) {
                        let conflictFlag = false;
                        let conflictId = ''; //当前点击的老师id
                        // console.log(arr)
                        //判断冲突
                        conflictId = data.id;
                        if (conflictId != '') {
                            arr&&arr.forEach(ass => {
                                if (conflictId == ass.id) {
                                    app.toast('info', ass.name + '已被设置为副责任人。');
                                    conflictFlag = true;
                                    return
                                }
                            });
                            if (conflictFlag) {
                                return false
                            } else {
                                return true
                            }
                        } else {
                            return true
                        }
                        return true
                    },true).then(result => {
                        // console.log('promise回调--》',result)
                        this.mainPerson = result;
                        // console.log(this.mainPerson)
                    });
                }else{
                    // console.log('选。。副-----责任人')
                    let obj = this.mainPerson;//this不是这个this 所以直接把要判断的写在外面
                    app.responsibleOfficer(1,this.minorPerson, function (data) {
                        // 1.主责任人和副责任人最多只能成为其一
                        // 2.在编辑学员资料时，如果账号本身为副负责人，则无法对自己进行勾选或取消
                        let conflictFlag = false;//默认无冲突
                        let conflictId = '';//当前点击的老师id

                        // 要加第二点判断 先把后台返回的副责任人数组与账户本身做比较返回true||false，然后在此方法合适位置根据上一判断与conflictId进行对比
                        conflictId = data.id;
                        if(obj.id!=undefined){
                            if(obj.id==conflictId){
                                conflictFlag = true;
                            }else{
                                conflictFlag = false;
                            }
                        }else {
                            conflictFlag = false;
                        }

                        if (conflictFlag) {
                            app.toast('info', obj.name + '已被设置为主责任人。')
                            return false
                        } else {
                            return true
                        }

                    },true).then(result => {
                        // console.log('promise 副责任人多选 回调--》',result)
                        this.minorPerson = result;
                        // console.log(this.minorPerson)
                    });
                }
            },
            submit() {
                if (!this.sourceObj.id || !this.campusObj.id || !this.mainPerson.id) {
                    console.log(this.sourceObj);
                    console.log(this.campusObj);
                    console.log(this.mainPerson);
                    app.toast('info', '招生来源，校区和主责任人必须填写')
                    return
                }
                let params = {
                    qrcodeid: this.qrcodeid,
                    systemsetting: {
                        source: {
                            id: this.sourceObj.id,
                            name: this.sourceObj.value
                        },
                        campus: {
                            id: this.campusObj.id,
                            name: this.campusObj.value
                        },
                        liablepersons: this.computedParams,
                    },
                    pagesetting: this.mustList.concat(this.noMustList),
                    qrcodeurl: '',
                    remark: '',
                    optype: this.optype
                }
                opConfigQrcode(params).then(res => {
                    if (res.result.code === app.errok) {
                        app.toast('info', '二维码配置成功')
                        this.getData()
                        getCurrentManager().then(res => {
                            if (res.result.code === app.errok) {
                                this.set_myInfo({
                                    id: res.managerid,
                                    name: res.managename,
                                    photourl: res.photourl,
                                    isconfigqrcode: res.isconfigqrcode,
                                    companyid: res.companyid,
                                    qrcodeid: res.qrcodeid,
                                    qrcodeurl: `https://${location.host}/wx.do?appid=2&action=getqrcode`,
                                })
                                this.$router.go(-1)
                            }
                        })
                    } else {
                        app.toast('info', res.result.msg)
                    }
                })
                this.$router.go(-1)
            }
        },
        created() {
            window.a = this
            this.getData()
        },
        components: {
            SelectObject,
            CommAction,
            SelectSource
        }
    }
</script>