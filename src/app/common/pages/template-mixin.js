import {
    ChinaAddressV4Data
} from "vux"

export const tempalteMixin = {
    computed: {
        ...Vuex.mapState(['addressInfo'])
    },
    methods: {
        setAddress() {
            if (this.addressInfo.id) {
                let map = {}
                ChinaAddressV4Data.forEach(obj => {
                    map[obj.value] = obj.name
                })
                this.detail.orgname = this.addressInfo.companyname
                this.detail.orgphone = this.addressInfo.companyphone
                this.detail.contactinfo = (map[this.addressInfo.province] || '') + (map[this.addressInfo.city] || '') + (map[this.addressInfo.district] || '') + this.addressInfo.addressdetail
                this.detail.orgintroduce = this.addressInfo.companyintroduction
                let list = this.addressInfo.filelist.map(item => {
                    let temp = {
                        type: 30
                    }
                    return Object.assign({}, item, temp)
                })
                this.detail.actinsfilelist = this.detail.actinsfilelist.filter(obj => obj.type != 30)
                this.detail.actinsfilelist = this.detail.actinsfilelist.concat(list)
            }
        }
    }
}