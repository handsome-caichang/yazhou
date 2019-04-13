Component({
    properties: {
        list: {
            type: Array,
            default: []
        }
    },
    data: {
        curIndex: ''
    },
    methods: {
        open() {
            this.selectComponent('#campusActionSheet').open()
        },
        selectCampus(e) {
            this.setData({
                curIndex: e.currentTarget.dataset.index
            })
            console.log(this.data.curIndex);
            this.triggerEvent('selectCampus', {
                index: e.currentTarget.dataset.index
            }, null)
            this.selectComponent('#campusActionSheet').close()
        }
    }
})