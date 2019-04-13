<style scoped lang="scss">
    
    
    .card {
            background-color: $color-white;
            border-bottom: 10px solid $color-assist-1;
            .card-heard {
                @include flex-center;
                padding: 0 12px;
                height: 44px;
                border-bottom: 1px solid $color-assist-1;
                .card-heard-left {
                    flex: 1;
                    font-size: 16px;
                    color: $color-3;
                }
                .card-heard-right {
                    width: 75px;
                    font-size: 12px;
                    color: $color-9;
                }
            }
            .card-body {
                padding: 12px 12px 0 12px;
                @include flex-center;
                .card-body-left {
                    flex: 1;
                    .item {
                        height: 12px;
                        line-height: 12px;
                        font-size: 12px;
                        margin-bottom: 12px;
                        color: $color-6;
                        .item-content {
                            color: $color-3;
                        }
                    }
                }
                .card-body-right {
                    width: 50px;
                    height: 40px;
                    .icon {
                        font-size: 30px;
                    }
                }
            }
        }
</style>

<template>
    <div class="card">
        <div class="card-heard">
            <div class="card-heard-left">
                {{card.Name}}
                <svg class="icon" aria-hidden="true" v-if="card.Sex">
                    <use :xlink:href="card.Sex==1?'#icon-nan':'#icon-nv'"></use>
                </svg>
            </div>
            <!-- <router-link tag="div" :to="{path: `/communicationRecords/${card.ID}`}"  class="card-heard-right">
                沟通记录
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </router-link> -->
            <div class="card-heard-right" @click="addComm">
                沟通记录
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </div>
        </div>
        <div class="card-body">
            <div 
                @click="saveInfo(card)"
                class="card-body-left">
                <div class="item">主责任人:<span class="item-content">{{card.SalePersonName}}</span></div>
                <div class="item">手机号码:<span class="item-content">{{card.SMSTel}}</span></div>
                <div class="item">客户状态:<span class="item-content">{{card.CustomerStatusName}}</span></div>
                <div class="item">意向级别:
                    <span class="item-content">
                        <svg class="icon" aria-hidden="true" v-for="i in card.WillLevel">
                            <use xlink:href="#icon-yixiangdengji"></use>
                        </svg>
                    </span>
                </div>
            </div>
            <a type="text" class="card-body-right" :href="'tel:'+card.SMSTel">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bodadianhua1"></use>
                </svg>
            </a>
        </div>
    </div>
</template>

<script>
    
    export default {
        props: {
            card: {
                type: Object
            }
        },
        data() {
            return {

            }
        },
        methods: {
             ...Vuex.mapMutations(['set_cunstomInfo']),
            saveInfo(obj) {
                this.set_cunstomInfo({
                    CustomerStatusName: obj.CustomerStatusName,
                    CustomerStatus: obj.CustomerStatus,
                    WillLevel: obj.WillLevel
                }) 
                // this.$router.push({name: 'customDetail', params: {id: obj.ID, name: obj.Name}})
                this.$router.push({path: `/customDetail/${obj.ID}/${obj.Name}/${obj.SalePersonID}`})
            },
            addComm() {
                this.set_cunstomInfo({
                    CustomerStatusName: this.card.CustomerStatusName,
                    CustomerStatus: this.card.CustomerStatus,
                    WillLevel: this.card.WillLevel
                })
                this.$router.push({path:`/communicationRecords/${this.card.ID}/${this.card.SalePersonID}`}) 
            }
        }
    }
</script>