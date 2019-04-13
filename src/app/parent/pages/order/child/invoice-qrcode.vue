<!-- 发票二维码 -->
<style scoped lang="scss">
	.as-body{
		@include position-absolute();
		.body{
			background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 15px 0px rgba(143, 156, 180, 0.65);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            color: #333;
			.code-img{
				width: 200px;
				height: 200px;
				margin-top: 30px;
				margin-bottom: 12px;
			}
			.tip{
				font-size: 11px;
    			margin-bottom: 5px;
			}
			.describe{
				font-size: 13px;
    			margin-bottom: 20px;
			}
		}
	}
    
</style>

<template>
	<action-sheet
        class="as-body"
        v-show="opened"
        :position="'center'"
        @close="close"
        :data="renderData">
        <div class="body">
            <img class="code-img" :src="paraData.invoiceQRUrl">
			<div class="tip">长按识别</div>
			<div class="describe">
				二维码有效期至：{{paraData.InvoiceQRValidity}}
			</div>
        </div>        
    </action-sheet>
</template>

<script>

     
	export default{
		mixins: [app.mixin.popupWindowRouteMixin],
		props: {
            opened: {
                type: Boolean
            },
            paraData: {
				type: Object,
				default : function () {
					return { 
						invoiceQRUrl: '',
						InvoiceQRValidity:''
					}
				}
            }
		},
		data() {
			return {
				
			}
		},
		computed: {
            renderData() {
                return {
                    opened: this.opened
                }
            }
		}
	}
</script>