<!--选择图片弹框组件-->
<style scoped lang="scss">
	.photo-select{
        @include position-absolute;
		z-index: 9999990;
        .photo-select-container{
            padding: 12px;
        }
        .footer{
            height: 48px;
            line-height: 48px;
            display: flex;
            justify-content: flex-end;
            padding: 10px 15px;
            border-top:1px solid #EEF1F6;
            .btn{
                width: 93px;
                height: 28px;
                line-height: 28px;
                border: 1px solid transparent;
                border-radius: 27px;
                text-align: center;
                margin-left: 15px;
            }
            .cancel{
                border: 1px solid #1E88F5;
                color: #1E88F5;
            }
            .submit{
                background-color: #1E88F5;
                color: #FFF;
            }
        }
    }
</style>

<template>
	<div>
		<action-sheet
            v-show="opened"
            class="photo-select"
            :position="'sideRight'"
            :fullParent="true"
            :data="renderData"
            @close="close">
        <div class="photo-select-container">
            <div class="img-area">
                <img-area
                    :imageFileList="ListImgFile"
                    @imageFinished="imageFinished">
                </img-area>
            </div>
        </div>
        <div class="footer" slot="footer">
            <div class="btn cancel" @click="cancelSheet">取消</div>
            <div class="btn submit" @click="submit">确定</div>
        </div>
    </action-sheet>
		
	</div>
</template>

<script>
	
	export default {
		name: "photo-select",
		mixins: [app.mixin.popupWindowRouteMixin],
		data() {
			return {
				_resolve:null,
				opened: false,
				ListImgFile:[],
				delimgs:[],
				envType:app.envType
			}
		},
		computed:{
			renderData(){
				return{
					ListImgFile:this.ListImgFile,
					refreshNum:0
				}
			}
		},
		methods: {
			show(arr) { 
				this.opened = true;
				this.delimgs = [];//避免删除的id重复出现
				this.ListImgFile = [...arr];
				
				return new Promise((resolve) => {
					this._resolve = resolve
				});
			},
			cancelSheet(){
                this.close();
            },
            submit(){	
				this._resolve({
					imgs: this.ListImgFile,
					delimgs: this.delimgs
				});
				this.close();
            },
            //图片上传
            imageFinished(arr, del) {
				this.deal(arr);
				this.delimgs = del;
				
                this.$nextTick(()=>{
                    this.refreshNum++;
                })
                
			},
			deal(arr){
				if(this.ListImgFile.length<arr.length){
					// 新增
					arr.forEach((item,index) => {
						if(index>this.ListImgFile.length-1) {
							this.ListImgFile.push(item)
						}
					});
				}else if(this.ListImgFile.length>arr.length){
					// 删除
					if(arr.length==0){
						this.ListImgFile.pop();
						return
					}else{
						let flag = true;
						this.ListImgFile.forEach((item,index)=>{
							if(!flag){
								return
							}
							if(index==arr.length){
								//删除的是最后一张
								this.ListImgFile.pop();
								flag = false;
								return
							}
							
							if(item.localId){
								if(item.localId!=arr[index].localId){
									this.ListImgFile.splice(index, 1);
									flag = false;
								}
							}else if(item.ID){
								if(item.ID!=arr[index].ID){
									this.ListImgFile.splice(index, 1);
									flag = false;
								}
							}else if(item.id){
								if(item.id!=arr[index].id){
									this.ListImgFile.splice(index, 1);
									flag = false;
								}
							}
						})
					}

				
				}
				
			},
		},
		components: {
		}
	}
</script>