<template>
    <div class="app-container">
        <el-row>
            <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
        </el-row>
    </div>
</template>

<script> 
    export default { 
        name: 'assembly', 
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

</style>
<style scoped>
    .el-dialog__wrapper{
        background: none;
    }
</style>