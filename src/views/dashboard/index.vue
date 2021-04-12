<template>
    <div class="app-container">
        首页
        
    </div>
</template>

<script> 
     
    
    export default { 
        name: 'Dashboard', 
        data() {
            return { 
            }
        }, 
        created() {
             
        },  
        methods:{
            
              
        }
    }
</script>

<style lang="scss" scoped>
    *{
        background: #fff;

        .app-container{
            min-height: calc(100vh - 90px);
            padding-left: 60px;

            h3{
                border-left: 5px solid #1276F9;
                padding-left: 10px;
            }
        }

        .page-title{
            margin:30px 0 60px;
            font-weight: bold;
        }
    }

    .nav {
        margin: 35px 0;

        .nav-item {
            text-align: center;
            cursor: pointer;
            p{
                color: #333;
            }
        }

        .danger{
            color: #F56C6C;
        }

        .nav-icon {
            display: block;
            margin: 10px auto;
            font-size: 70px;
            color: #333;
        }
    }
    .video-js{
        width:100%;
        height:100%;
    }

</style>
<style scoped>
    .el-dialog__wrapper{
        background: none;
    }
</style>