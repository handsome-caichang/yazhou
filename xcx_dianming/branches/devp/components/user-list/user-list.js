var app = getApp();

Component({
    properties: { 
        list: {
            type: Array,
            value: []
        },
        currentRole: {
            type: Number
        }
    },
    data:{
        sortType: 0,   
        IMG: app.globalData.IMG,
    },
    methods: {
        open(){
            this.selectComponent('#users').open();
        },
        select(e){
            this.selectComponent('#users').close();
            this.triggerEvent('selectuser', {
                name: e.currentTarget.dataset.name,
                website: e.currentTarget.dataset.website
            });
        },
        close(e){
            this.triggerEvent('closeuser');
        }
    }
})