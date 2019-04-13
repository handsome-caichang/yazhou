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
            this.selectComponent('#roles').open();
        },
        select(e){
            this.selectComponent('#roles').close();
            this.triggerEvent('selectrole', {id: e.currentTarget.dataset.id});
        },
        close(e){
            this.triggerEvent('closerole');
        }
    }
})