import {
    mapMutations
} from 'vuex'
import {
    saveData
} from 'teacher/api/customers'
export const commHandle = {
    methods: {
        ...mapMutations(['set_cunstomInfo']),
        addComm(card) {
            this.set_cunstomInfo({
                CustomerStatusName: card.CustomerStatusName,
                CustomerStatus: card.CustomerStatus,
                WillLevel: card.WillLevel
            })
            this.$router.push({
                path: `/communicationRecords/${card.ID}/${card.SalePersonID}`
            })
        },
        selectCard(obj) {
            obj.isSelect = !obj.isSelect
            if (this.isAllSelect) this.isAllSelect = obj.isSelect ? this.isAllSelect : false
            if (!this.isAllSelect) {
                let flag = true
                for (let i = 0; i < this.list.length; i++) {
                    if (!this.list[i].isSelect) {
                        flag = false
                        break
                    }
                }
                this.isAllSelect = flag
            }
        },
        getCustomId() {
            return this.list.filter(obj => obj.isSelect).map(obj => obj.ID).join()
        },
        selectObj(obj) {
            let str = this.getCustomId(),
                saveFlag = obj.type === 'status' ? 'putcustomerstatus' : 'putcustomercampus',
                params = {
                    saveFlag: saveFlag,
                    customers: str
                }
            if (obj.type === 'status') {
                params['status'] = obj.selectObj.ID
            } else {
                params['campus'] = obj.selectObj.Key
            }
            saveData(params).then(res => {
                if (res.errcode === app.errok) {
                    app.toast('success', '修改成功')
                    this.$refs.scroll.refresh()
                } else {
                    app.toast('error', res.errmsg)
                }
                this.showSelectStatusAndCampus = false
            })
        },
        selectCampusOver() {
            let str = this.getCustomId()
            saveData({
                saveFlag: 'trynewstudent',
                campusID: this.campusObj.Key,
                customerids: str
            }).then(res => {
                if (res.errcode === app.errok) {
                    app.toast('success', '转化成功。')
                    this.$refs.scroll.refresh()
                } else {
                    app.toast('error', res.errmsg)
                }
            })
        },
        selectCampus(obj) {
            this.campusObj = obj
        },
        checkCustomersIsVisit() {
            let arr = this.list.filter(obj => obj.isSelect).map(obj => obj.IsVisit)
            /* if (arr.length && arr.indexOf(0) > -1) {
                 return true
             } else {
                 return false
             }*/
            return arr.indexOf(0) > -1
        },
        handleCustomer(string) {
            if (string == 'del' && !app.tool.op('CustomerDelete')) {
                // app.toast('info','权限不足','未授权。此操作需要以下权限：招生管理－意向客户管理－删除客户')
                app.dialog('alert', {
                    title: '权限不足',
                    text: '未授权。此操作需要以下权限：招生管理－意向客户管理－删除客户',
                    btn: {
                        text: '我知道了',
                        style: {
                            fontSize: '15px',
                            color: '#1E88F5',
                        }
                    },
                    clickMask2close: true
                })
                return
            }
            if (string == 'cancle' && !app.tool.op('CustomerCancelSuccess')) {
                app.dialog('alert', {
                    title: '权限不足',
                    text: '未授权。此操作需要以下权限：招生管理－意向客户管理－取消转为正式学员',
                    btn: {
                        text: '我知道了',
                        style: {
                            fontSize: '15px',
                            color: '#1E88F5',
                        }
                    },
                    clickMask2close: true
                })
                return
            }

            let arr = [],
                str = this.getCustomId(),
                saveFlag = string === 'del' ? 'deletecustomer' : 'disrelationtrystudent',
                obj = {
                    text: string === 'del' ? '是否删除意向客户' : '是否撤销转化选中学员',
                    textStyle: {
                        textAlign: 'center'
                    }
                },
                text = string === 'del' ? 'id' : 'customerids',
                params = {
                    saveFlag: saveFlag,
                }
            app.confirm(obj).then(res => {
                if (res) {
                    params[text] = str
                    saveData(params).then(res => {
                        if (res.errcode === app.errok) {
                            app.toast('success', '提交成功。')
                            this.$refs.scroll.refresh()
                        } else {
                            app.toast('info', res.errmsg)
                        }
                    })
                }
            })
        },
        changeCustomToFormal() {
            if (!app.tool.op('CustomerSetSuccess')) {
                app.dialog('alert', {
                    title: '权限不足',
                    text: '未授权。此操作需要以下权限：招生管理－意向客户管理－转为正式学员',
                    btn: {
                        text: '我知道了',
                        style: {
                            fontSize: '15px',
                            color: '#1E88F5',
                        }
                    },
                    clickMask2close: true
                })
                return
            }
            if (app.sysInfo.CustomerCheckVisit === '1' && this.checkCustomersIsVisit()) {
                app.toast('info', '学员未到访，不允许转化')
                return
            }
            this.showSelectCampus = true
        },
        revise() {
            if (!app.tool.op('CustomerEdit')) {
                app.dialog('alert', {
                    title: '权限不足',
                    text: '未授权。此操作需要以下权限：招生管理－意向客户管理－修改客户信息（不含电话、来源渠道和自定义字段）',
                    btn: {
                        text: '我知道了',
                        style: {
                            fontSize: '15px',
                            color: '#1E88F5',
                        }
                    },
                    clickMask2close: true
                })
                return
            }
            this.showSelectStatusAndCampus = true
        },
        allSelect() {
            this.isAllSelect = !this.isAllSelect
            this.list.forEach(obj => {
                obj.isSelect = this.isAllSelect ? true : false
            })
        },
        closeHandleBottom() {
            this.list.forEach(obj => obj.isSelect = false)
            this.isAllSelect = false
        },
        saveInfo(obj) {
            this.set_cunstomInfo({
                CustomerStatusName: obj.CustomerStatusName,
                CustomerStatus: obj.CustomerStatus,
                WillLevel: obj.WillLevel
            })
            this.$router.push({
                path: `/customDetail/${obj.ID}/${obj.Name}/${obj.SalePersonID}`
            })
        },
    }
}