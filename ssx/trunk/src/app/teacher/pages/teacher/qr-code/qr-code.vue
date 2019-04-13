<style scoped lang="scss">


    .qr-code-container{
        background-color: $color-assist-1;
        .code-box{
            width: 300px;
            height: 300px;
            border-radius: 10px;
            margin: auto;
            margin-top: 35%;
            padding: 60px 68px 40px 68px;
            background-color: $color-white;
            .code-wrapper{
                width: 164px;
                height: 164px;
                .code{
                    width: 100%;
                    height: 100%;
                }
            }
            .text{
                text-align: center;
                color: $color-3;
                margin-top: 20px;
            }
        }
    }
</style>

<template>
    <div class="qr-code-container">
        <div class="code-box">
            <div class="code-wrapper">
                <img class="code" src="/api/Customer/AdmissionQRCode"/>
            </div>
            <div class="text">扫码录入学员信息</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "qr-code",
        data() {
            return {
                wxTitle: "招生二维码",
            }
        },
        computed: {},
        methods: {},
        created() {},
        components: {}
    }
</script>

