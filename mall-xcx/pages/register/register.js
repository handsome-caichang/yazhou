Page({
    data: {
        showStep1: true,
        showStep2: false,
        curCampusName: '',
        list: [{
            "ID": "b367584d-f366-4054-b32a-1ed11c943cee",
            "Code": 10,
            "Name": "小班"
        }, {
            "ID": "ca1bc399-5e1f-429b-a533-395d09bfcef3",
            "Code": 20,
            "Name": "中班"
        }, {
            "ID": "36fb25fc-5d16-4cb3-9547-8baa0c1c6419",
            "Code": 30,
            "Name": "大班"
        }, {
            "ID": "94f66119-3ff2-4a56-8489-c52c06f6d538",
            "Code": 40,
            "Name": "一年级"
        }, {
            "ID": "4f69301c-c91f-4ac7-9cc4-79b18648a647",
            "Code": 50,
            "Name": "二年级"
        }, {
            "ID": "43795cd0-a453-4741-bbc5-38769fca1f69",
            "Code": 60,
            "Name": "三年级"
        }, {
            "ID": "959af32c-8618-4666-8232-d57d287b324c",
            "Code": 70,
            "Name": "四年级"
        }, {
            "ID": "462a9de9-a240-4c90-b1ff-6907496d9d88",
            "Code": 80,
            "Name": "五年级"
        }, {
            "ID": "ff70430f-dddd-443a-a817-255aff3c995c",
            "Code": 90,
            "Name": "六年级"
        }, {
            "ID": "71a55e06-4aa5-49cc-b7b4-592c05e5f85e",
            "Code": 100,
            "Name": "初一"
        }, {
            "ID": "9866a24f-a5e4-4f08-9e6b-c3df7cf190ea",
            "Code": 110,
            "Name": "初二"
        }, {
            "ID": "67afc1f0-5f33-4408-aec8-d12c31cdde48",
            "Code": 120,
            "Name": "初三"
        }, {
            "ID": "a32d896b-7bdd-4865-90d8-e67d445cbb18",
            "Code": 130,
            "Name": "高一"
        }, {
            "ID": "70732244-1763-40a6-9f63-ae0def40f8c4",
            "Code": 140,
            "Name": "高二"
        }, {
            "ID": "9671bfed-e3ca-41c1-b853-09fc8b4e5c46",
            "Code": 150,
            "Name": "高三"
        }, {
            "ID": "b1cd5b3b-0848-4fec-b876-a1efc00849ec",
            "Code": 160,
            "Name": "高中毕业"
        }, {
            "ID": "f652b3b3-41f4-4236-8524-99fbe45613b0",
            "Code": 170,
            "Name": "大学"
        }]
    },
    onReady() {},
    openCampus() {
        this.selectComponent('#campusActionsheet').open()
    },
    selectCampus(e) {
        console.log(e);
        this.setData({
            curCampusName: this.data.list[e.detail.index].Name
        })
    },
    nextStep() {
        this.setData({
            showStep1: false,
            showStep2: true
        })
    }
})