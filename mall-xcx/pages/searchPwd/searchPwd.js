Page({
    data: {
        name: '',
        phone: '186****9652',
        showStep1: true,
        showStep2: false,
        showStep3: false
    },
    editName(e) {
        this.setData({
            name: e.detail.value
        })
    },
    changStep(e) {
        let step = e.currentTarget.dataset.index
        if (step === 1) {
            if (!this.data.name.length) return
            this.setData({
                showStep1: false,
                showStep2: true,
                showStep3: false
            })
        }
        if (step === 2) {
            this.setData({
                showStep1: false,
                showStep2: false,
                showStep3: true
            })
        }
    },
    sendPwd() {

    }
})