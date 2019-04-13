<style scoped lang="scss">
    
    
    .wrapper {
        @include position-absolute;
    }
</style>

<template>
    <table-cel 
        class="wrapper"
        :pagingOption="pagingOption"
        :campusIds="campusIds"
        :name="'校区'"
        :midList="list"
        :topAndBottomObj="customerType" 
        :activeList="typeList"
        :customerTypeOld="customerTypeOld"
        @changeRecordObj="changeRecordObj"
        @loadData="loadData">
        
        <!-- @selectTypeList="selectTypeList" -->
    </table-cel>
</template>

<script>
    import TableCel from 'teacher/components/common/table/table'
    import {queryCustomer} from 'teacher/api/customers'
    
    export default {
        data() {
            return {
                wxTitle: "客户状态统计表",
                pagingOption: {
                    api: queryCustomer,
                    params: {
                        pname:"countbycustomerstatus",
                        sdate: app.tool.getDatesByIndex(0, app.localTimeToServer).sdate,
                        edate: app.tool.getDatesByIndex(0, app.localTimeToServer).edate,
                        campusids: ''
                    },
                    pageOpt: {
                        // 分页初始页码的'key'、'value'
                        indexKey: "page",
                        indexVal: 1,
                        // 每页请求数据长度的'key'、'value'
                        sizeKey: "pageSize",
                        sizeVal: 20,
                        // 后端返回的总页数'key'
                        countKey: "pageCount"
                    }
                },
                campusIds: [],
                list: [],
                topList: [],
                bottomList: [],
                firstComming: false,
                customerTypeOld: [],
                typeList: [],
                customerType: {},
                recordObj: {},
            }
        },
        computed: {
            ...Vuex.mapState(['saleModeInfo']),
        },
        methods: {
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    this.isLoading = false
                    if (res.errcode == app.errok) {
                        if (res.pageIndex === 1) {
                            this.list = []
                        }
                        this.customerTypeOld = res.data.Count
                        this.list = this.list.concat(res.data.Values)
                        this.typeList = res.data.Names
                        if (!this.firstComming) {
                            for (var i = 0; i < 2; i++) {
                                if (this.customerTypeOld[i].ID) {
                                    // this.customerType[this.customerTypeOld[i].ID] = this.customerTypeOld[i]
                                    this.$set(this.customerType, this.customerTypeOld[i].ID, this.customerTypeOld[i])
                                }
                                this.scrollNum++
                            }
                            this.typeList.forEach((obj, index) => {
                                obj.Value = this.customerTypeOld[index].Value
                                if (index < 2) {
                                    this.$set(obj, 'isSelect', true)
                                } else {
                                    this.$set(obj, 'isSelect', false)
                                }
                                this.recordObj[obj.ID] = obj.isSelect
                            })
                            // this.setFrameWidth(3)
                            this.firstComming = true
                        } else {
                            this.typeList.forEach(item => {
                                if (this.recordObj[item.ID]) {
                                    this.$set(item, 'isSelect', true)
                                } else {
                                    this.$set(item, 'isSelect', false)
                                }
                            })
                        }
                        this.list.forEach(item => {
                            this.$set(item, 'temp', {})
                            item['name'] = item.CampusName || item.SalePersonName
                            item.List.forEach(obj => {
                                if (this.recordObj[obj.ID]) {
                                    this.$set(item.temp, obj.ID, obj.Value)
                                }
                            })
                        })
                    }
                })
            },
            changeRecordObj(obj) {
                this.recordObj = Object.assign(this.recordObj, obj)
            },
        },
        created() {
            let str = '', params = app.ls.getStorage('params')
            this.pagingOption.params.sdate = params.sdate
            this.pagingOption.params.edate = params.edate
            this.campusIds = params.campusids
            console.log(this.campusIds)
            if (params.campusids.length == 0) {
                str = app.customConfigInfo.CampusList.map(obj => {
                    return obj.Key
                }).join()
            } else {
                str = params.campusids.join()
            }
            this.pagingOption.params.campusids = str
        },
        components: {
            TableCel
        }
    }
</script>