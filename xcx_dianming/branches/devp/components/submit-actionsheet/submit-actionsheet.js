var app = getApp();

const config = {
        title:'提示',
        name:'入班日期 ' + app.Util.formatDatetime(new Date(), 'yyyy-MM-dd'),
        holder:'填写入班原因',
    }

Component({
    data: {
        enterclass: '',
        config,
        require:false,
    },
    methods: {
        open: function (configNew,require) {
            configNew ?  this.setData({config:configNew}) : this.setData({config});
            this.setData({
                enterclass: '',
                require:!!require
            })
            this.selectComponent('#submitActionsheet').open();
        },
        enterclassinput: function (e) {
            this.setData({
                enterclass: e.detail.value
            })
        },
        cancel: function () {
            this.selectComponent('#submitActionsheet').close();
        },
        confirm: function () {
            if (this.data.require && this.data.enterclass === ''){
                wx.showToast({title:'取消原因不能为空',icon:'none'});
                return;
            }
            this.selectComponent('#submitActionsheet').close();
            this.triggerEvent('confirmevent', {
                reason: this.data.enterclass
            }, null)
        }
    }
})