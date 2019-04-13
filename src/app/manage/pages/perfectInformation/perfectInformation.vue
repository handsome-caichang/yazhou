<style lang="scss" scoped>
    .scroll {
        background-color: #fff;
        .value {
            background-color: $color-white;
            height: 49px;
            padding: 0 20px;
            @include flex-between;
            border-bottom: 1px solid $color-assist-1;
            span {
                color: #FE6064;
            }
            .text {
                width: 100px;
                font-size: 14px;
                color: $color-6;
            }
            .input-value {
                margin-left: 20px;
                // text-align: right;
            }
            input::placeholder {
                text-align: right;
            }
        }
        .tel-wrapper {
            background-color: $color-white;
            height: 69px;
            border-bottom: 1px solid $color-assist-1;
            .value {
                border-bottom: none;
            }
            .info {
                padding: 0 20px;
                font-size: 12px;
                color: #AAAAAA;
            }
        }
        .introduct-wrapper {
            background-color: $color-white;
            padding: 18px 20px;
            border-bottom: 1px solid $color-assist-1;
            span {
                color: #FE6064;
            }
            textarea {
                margin-top: 5px;
            }
            textarea::placeholder {
                font-size: 14px;
                color: #CCCCCC;
            }
        }
        .seting {
            background-color: #fff;
             .input-item {
               /* padding: 0px 20px;
               color: #666666;
               display: flex;
               align-items: center;
               justify-content: space-between;
               min-height: 49px; */

               padding: 0px 20px;
               color: #333333;
               font-weight: 600;
               display: flex;
               align-items: center;
               justify-content: space-between;
               min-height: 50px;
               /* input {
                   width: 175px;
                   text-align: right;
                   color: #333333;
                   &::placeholder {
                       color: #ccc;
                   }
               } */

           } 
            .border-bottom {
                border-bottom: 1px solid #f7f8fa;
                padding-bottom: 20px;
            }
            .setting-point {
                color: #aaaaaa;
                font-size: 12px;
                font-weight: 400;
            }
            
            .addImg {
                padding: 0px 20px 8px;
            }
            .flex-row {
                padding-top: 18px;
                flex-direction: column;
                align-items: flex-start;
            }
            .input-box {
                margin-top: 16px;
                width: 100%;
                text-align: left;
                padding: 15px 15px;
                background-color: #f7f8fa;
                color: #666666;
                &::placeholder {
                    color: #ccc;
                }
            }
            textarea {
                padding: 8px 0px;
                &::placeholder {
                    color: #cccccc;
                }
            }
            .select {
                color: #ccc;
                padding: 8px;
                display: flex;
                align-items: center;
                background-color: #f7f8fa;
                width: 100%;
                justify-content: space-between;
                font-weight: normal;
                margin-bottom: 20px;
                margin-top: 16px;
                border-radius: 4px;
                .selectAddress {
                    width: 100%;
                    height: 29px;
                    line-height: 29px;
                }
                .icon {
                    margin-left: 8px;
                    color: #c2ccdc;
                    transition: all 0.3s;
                    transform: rotate(-90deg);
                }
                .icon.active {
                    transform: rotate(0deg);
                }
            }
            .select.active {
                color: #666666;
            }
        }
        .bottom {
            padding: 18px 16px 10px 16px;
            .btn {
                height: 44px;
                line-height: 44px;
                text-align: center;
                font-size: 16px;
                color: #FFFFFF;
                background-color: #FF8B02;
                border-radius: 22px;
            }
        }
        .loading {
            z-index: 999999;
        }
    }
</style>

<template>
    <scroller-base class='scroll' :data="imgList">
            <!-- <div class="text"><span>*</span>机构名称</div> -->
            <!-- <input type="text" 
                :placeholder="text1" 
                @focus="inputFocus('text1')"
                @blur="input1Blur" 
                class="input-value" 
                autocomplete="off" 
                v-model="address.companyname"> -->
        <div class="seting">
            <div class="input-item border-bottom flex-row">
                <span class="require-icon">机构名称</span>
                <fe-text-area placeholder="请输入机构名称" v-model="address.companyname" rows="1" maxlength="15"></fe-text-area>
            </div>
        </div>
        <div class="seting">
            <div class="input-item border-bottom flex-row">
                <span class="require-icon">机构电话</span>
                <input class="input-box" type="number" v-model="address.companyphone" placeholder="请输入机构电话">
            </div>
        </div>
        <div class="seting">
            <div class="input-item border-bottom flex-row">
                <span class="require-icon">机构介绍</span>
                <fe-text-area placeholder="请输入..." v-model="address.companyintroduction" rows="4"></fe-text-area>
            </div>
        </div>
        <!-- <div class="tel-wrapper">
            <div class="value">
                <div class="text"><span>*</span>机构电话</div>
                <input type="number" 
                    :placeholder="text2" 
                    @focus="inputFocus('text2')"
                    @blur="input2Blur"  
                    class="input-value" 
                    autocomplete="off" 
                    v-model="address.companyphone">
                    <fe-text-area  v-model="address.companyphone" ></fe-text-area>
            </div>
            <div class="info">
                <svg class="icon" aria-hidden="true">
                   <use xlink:href="#iconzhushishuoming"></use> 
                </svg>
                设置机构电话后，家长可快速拨打电话进行咨询
            </div>
        </div> -->
        <!-- <div class="introduct-wrapper">
            <span>*</span>机构介绍
            <textarea cols="30" rows="4" placeholder="请输入..."
                @touchstart="app.area.start($event)"
                @touchmove="app.area.move($event)"
                @touchend="app.area.end($event)"
                v-model="address.companyintroduction">
                    
            </textarea>
        </div> -->
        <div class="seting">
            <div class="input-item">
                 <p class="require-icon">机构主题
                    <span class="setting-point">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#iconzhushishuoming"></use>
                        </svg>
                        最多添加三张，建议尺寸750*375
                    </span>
                </p>
            </div>
            <div class="border-bottom addImg">
                <img-area 
                    :imageMaxNum="3" 
                    :imageFileList="imgList" 
                    @imageLoaded="imageLoaded" 
                    @imageFinished="setingImageFinished">
                </img-area>
            </div>
            <div class="input-item flex-row border-bottom">
                <span class="require-icon">机构地址</span>
                <!-- <input type="text" placeholder="请输入机构名称" v-model="activeSeting.campanyvalue"> -->
                <div class="select" :class="value ? 'active' : ''">
                    <x-address title="" 
                        :raw-value="false" 
                        :value-text-align="'left'" 
                        placeholder="请输入省/市/区" 
                        v-model="value" 
                        class="selectAddress"
                        :list="ChinaAddressV4Data">
                    </x-address>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#iconxiala"></use>
                    </svg>
                </div>
                
            </div>
            <div class="input-item flex-row" style="padding-bottom: 10px;" >
                <span class="require-icon">详细地址</span>
                <!-- <textarea cols="30" rows="2" placeholder="请输入..."   
                    @touchstart="app.area.start($event)"
                    @touchmove="app.area.move($event)"
                    @touchend="app.area.end($event)"
                    v-model="address.addressdetail">
                        
                </textarea> -->
                <fe-text-area placeholder="请输入..." v-model="address.addressdetail" rows="2"></fe-text-area>
            </div>
        </div>
        <div class="bottom">
            <div class="btn" @click="saveInfo">保存机构信息</div>
        </div>
        <loading class="loading" v-show="isLoading" :bgType='1'></loading>
    </scroller-base>
</template>

<script>
    import { ChinaAddressV4Data } from "vux"
    import {opconfigcompany, getconfigcompany} from 'manage/api/index.js'
    export default {
        data() {
            return {
                wxTitle: '完善机构信息',
                value: [],
                ChinaAddressV4Data: ChinaAddressV4Data,
                imgList:[],
                address: {},

                text1: '请输入名称',
                text2: '请输入电话',
                newImgList:[],
                isLoading:false,
            }
        },
        computed: {
            ...Vuex.mapState(['addressInfo', 'userinfo'])
        },
        methods: {
            ...Vuex.mapMutations(['setAddress']),
            imageLoaded(imgs, del) {
                
            },
            setingImageFinished(imgs, del) {
                this.newImgList = imgs
            },
            saveInfo() {
                if (!this.address.companyname) {
                    app.toast('error', '请输入机构名称')
                    return
                }
                if (!this.address.companyphone) {
                    app.toast('error', '请输入机构电话')
                    return
                }
                if (!this.address.companyintroduction) {
                    app.toast('error', '请输入机构介绍')
                    return
                }
                if (!this.newImgList.length) {
                    app.toast('error', '请上传机构主题图')
                    return
                }
                if (!this.value.length) {
                    app.toast('error', '请输入机构地址')
                    return
                }
                if (!this.address.addressdetail) {
                    app.toast('error', '请输入机构详细地址')
                    return
                }
                /*if(!app.telReg.test(this.address.companyphone)){
                    app.toast('error','手机号码格式不正确，请重新输入。');
                    return;
                }*/

                this.isLoading = true;
                let info = {
                    id: this.addressInfo.id || '',
                    companyname: this.address.companyname,
                    companyphone: this.address.companyphone,
                    companyintroduction: this.address.companyintroduction,
                    province: this.value[0] || '',
                    city: this.value[1] || '',
                    district: this.value[2] || '',
                    addressdetail: this.address.addressdetail,
                    filelist: this.newImgList.map((item, index) => {
                        let obj = {};
                        if (item.serverId) {
                            obj = {
                                serverid: item.serverId,
                                filepath: '',
                                order: index
                            }
                        }else {
                            obj = {
                                serverid: '',
                                filepath: item.FilePath || item.filepath || item.localImgData,
                                order: index
                            }
                        }
                        return obj
                    })
                }
                opconfigcompany({
                    optype: this.addressInfo.id ? 2 : 1,
                    info: info
                }).then(res => {
                     this.isLoading = false;
                    if (res.result.code == app.errok) {
                        getconfigcompany().then(res => {
                            if (res.result.code == app.errok) {
                                this.setAddress(res.data)
                                app.toast('success', '保存机构信息成功')
                                this.$router.go(-1)
                            }
                        })
                    }else {
                        app.toast('error',res.result.msg)
                    }
                })
            },
            inputFocus(key) {
                this[key] = ''
            },
            /*input1Blur() {
                if (this.address.companyname == '') this.text1 = '请输入名称'
            },
            input2Blur() {
                if (this.address.companyphone == '') this.text2 = '请输入电话'
            }*/
        },
        created() {
            window.a = this
            this.address = app.tool.clone(this.addressInfo)
            this.imgList = this.address.filelist;
            if (this.imgList) this.newImgList = [...this.imgList];
            if (this.address.province || this.addressInfo.city ||this.addressInfo.district) {
                this.value = [this.addressInfo.province, this.addressInfo.city, this.addressInfo.district]
            }
        }
    }
</script>