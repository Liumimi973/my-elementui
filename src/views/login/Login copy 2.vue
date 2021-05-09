<template>
  <div id="login-container">
    <el-form
      :ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      class="login-from"
    >
      <h2 class="login-title">白领阅读信息管理信息</h2>

      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(form)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {login,getUserInfo } from "@/api/login";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请选择密码", trigger: "blur" },
          {
            min: 6,
            max: 32,
            message: "长度在 6 到 32个字符",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
     
      //let self = this;
      
      this.$refs[formName].validate(valid => {
        if (valid) {
          //表示验证成功


          //通过store对象的dispatch去触发动作，同事提交载荷
          this.$store.dispatch('Login',this.form).then(response=>{
            if(response.flag){
              this.$router.push({path:'/'})
            }else{
              this.$message({
                message:response.message,
                type:'warning'
              })
            }


          })

          // login(self.form.username,self.form.password)
          // .then(response => {
          //   console.log(response.data);
          //   const resp=response.data;
          //   if(resp.flag){//认证通过
          //      getUserInfo(resp.data.token)
          //       .then(response => {
          //          console.log(response.data);
          //          const respUser=response.data;
          //          if(respUser.flag){
          //            localStorage.setItem("blyd-manager-user",JSON.stringify(respUser.data))
          //            localStorage.setItem("blyd-manager-token",resp.data.token)
          //            this.$router.push('./home')
          //          }else{
          //            this.$message({
          //              message:respUser.message,
          //              type:'warning'
          //            });
          //          }
          //       })

         //   }else{
          //            this.$message({
          //              message:resp.message,
          //              type:'warning'
          //            });
          //          }
          // })
          // .catch(function (error) { // 请求失败处理
          // console.log(error);
          // });
          //alert('submit!');

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(form) {
      this.$refs[form].resetFields();
    }
  }
};
</script>

<style scoped>
#login-container {
  width: 100%;
  height: 100%;
  background: url("../../assets/login-bg.jpg ") #010217 center no-repeat;
  position: absolute;
}
.login-from {
  width: 400px;
  height: 250px;
  background: rgba(255, 255, 255, 0.5);
  padding: 15px 47px 21px 7px;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -228px;
  margin-top: -143px;
}
.login-title {
  color: rgb(51, 49, 49);
  text-align: center;
  font-weight: 400;
}
</style>
