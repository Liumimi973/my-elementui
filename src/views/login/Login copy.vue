<template>
  <div id="login-container">
    <el-form
      ref="form"
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
import { login, getUserInfo } from "@/api/login.js";

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
    submitForm() {
      let json = {
        username: "admin",
        password: "123456"
      };
      let { username, password } = json; //ES6解构赋值
      console.log(username);
      console.log(json.username);
      console.log(json["username"]);
      let self = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          // // localStorage.setItem(
          // //   "token",
          // //   "abudngjdjkfgjhkjkhhgjjreytruytdkfjghdkjhgdkgjfhdfkgj"
          // );
          this.$store.dispatch('logion')

          self.$router.push({
            path: "/home"
            // query: this.otherQuery
          });
          //alert('submit!');
          // login(self.form.username, self.form.password)
          //   .then(response => {
          //     console.log(response.data);
          //     const resp = response.data;
          //   })
          //   .catch(e => {
          //     console.log(e);
          //   });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
