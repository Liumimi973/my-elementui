<template>
    <div class="header">
<a href="" style=" padding-left:30px">
    <img src="@/assets/mylogo.png" alt="" class="logo">
    <span class="title">白领阅读图书管理系统</span>
</a>
<el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
     <el-dropdown-item>修改密码</el-dropdown-item>
    <el-dropdown-item>退出系统</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>


    </div>
</template>
<script>
import{logout} from'@/api/login.js'
  export default {
    methods: {
      handleCommand(command) {
        //this.$message('click on item ' + command);
        switch(command){
          case 'a':
            this.$message('单击了修改密码');
            break;
            case 'b':
              //this.$message('单击了退出系统');
              const token=localStorage.getItem("blyd-manager-token")
              logout(token).then(response=>{
                const resp=response.data
                if(resp.flag){
                  localStorage.removeItem("blyd-manager-token")
                   localStorage.removeItem("blyd-manager-user")
                   this.$router.push('/login')
                }else{
                  this.$message({
                     message: resp.message,
                     type: 'warning',
                     duration:1000
                  })
                }
              })
              break;

        }
      }
    }
  }
</script>
<style scoped>
.logo{width:25px; vertical-align: middle; border-radius: 5px;}
.title{
    position:absolute; color: #fff; padding-left: 5px; font-size: 20px;
}
 .el-dropdown-link {
    cursor: pointer;
    color: #ffffff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-dropdown{ float: right; margin-right: 30px;}
</style>