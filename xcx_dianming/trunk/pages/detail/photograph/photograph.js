let detailPage;

Page({
    data:{
        list:[],
        courseID:'',
    },
    onLoad(){
        detailPage = this.data.detailPage = getCurrentPages()[getCurrentPages().length-2];
        this.data.list = detailPage.data.listImgFile;
        console.log(detailPage.data.id);
        this.setData({
            list:detailPage.data.listImgFile,
            courseID:detailPage.data.id
        });
    },
    submit(){            
        let comp = this.selectComponent('.img-area');
        if (comp.isFinished() === 1){
            detailPage.changeListImg(comp.data.pathData);
            wx.navigateBack();
        } else if (comp.isFinished() === -1){
            wx.showToast({title:'图片上传失败',icon:'none'});
        } else {
            wx.showToast({title:'请等待图片上传完成...',icon:'none'});
        }
    },
    cancel(){
        wx.navigateBack();
    },
})