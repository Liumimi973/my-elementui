<template>
  <div class="header">
    <a href="" style=" padding-left:30px">
      <img src="@/assets/mylogo.png" alt="" class="logo" />
      <span class="title">白领阅读图书管理系统</span>
    </a>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        您好：{{this.user.name}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">修改密码</el-dropdown-item>
        <el-dropdown-item command="b">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <!-- 修改密码对话框 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="400px">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        style="width:300px; margin-top:-30px; margin-bottom:-20px;"
      >
        <el-form-item label="旧密码" prop="oldPass">
          <el-input
            type="password"
            v-model="ruleForm.oldPass"
            autocomplete="off"
            size="mini"
          ></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="newkPass">
          <el-input
            type="password"
            v-model="ruleForm.newkPass"
            autocomplete="off"
            size="mini"
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            size="mini"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 修改密码对话框 end -->
  </div>
</template>
<script>
import { logout } from "@/api/login";
import passwordApi from "@/api/password";

export default {
  data() {
    const validateOldPass = (rule, value, callback) => {
      console.log(rule);
      console.log(value);

      passwordApi.checkPwd(this.user.id, value).then(response => {
        console.log(response.data);
        const resp = response.data;
        if (resp.flag) {

          callback();//效验通过直接执行callback()
        }else{
           callback(new Error(resp.message));
        }
      });

     
    };

    

    const validateCheckPass = (rule, value, callback) => {
     if (value !== this.ruleForm.newkPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();//相等通过
      }
    };
    return {
      user:JSON.parse(localStorage.getItem("blyd-manager-user")),//JSON.parse可以将JSON转为对象
      dialogFormVisible: false,
      ruleForm: {
        oldPass: "",
        newPass: "",
        checkPass: ""
      },
      rules: {
        oldPass: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
          { validator: validateOldPass, trigger: "blur" }
        ],
        newkPass: [
          { required: true, message: "新密码不能为空", trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: validateCheckPass, trigger: ["blur","change" ]}
        ]
      }
    };
  },
  methods: {
    //修改密码
    updatePwd() {
      this.dialogFormVisible = true;
      // this.$nextTick(() => {
      //   this.$refs["ruleForm"].resetFields();
      // });//打开弹窗时，将内容重置
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //alert("submit!");
        passwordApi.updatePwd(this.user.id, this.ruleForm.newkPass).then(response => {
        console.log(response.data);
        const resp = response.data;
        this.$message({
          message:resp.message,
          type:resp.flag?"success":"warning"
        })
        if (resp.flag) {
          this.logoutSystem()//效验通过直接执行退出系统方法
          this.dialogFormVisible = false;

          
        }else{
           
        }
      });

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //封装退出系统
    logoutSystem(){

this.$store.dispatch('Logout').then(response => {
          console.log(response.data);
           if(response.flag){ 
             this.$router.push('/login')

           }else{
             this.$message({
                message: response.message,
                type: "warning",
                duration: 1000
                })
           }
})

          //const token = localStorage.getItem("blyd-manager-token");
          // logout(token).then(response => {
          //   console.log(response.data);
          //   const resp = response.data;
          //   if (resp.flag) {
          //     localStorage.removeItem("blyd-manager-token");
          //     localStorage.removeItem("blyd-manager-user");
          //     this.$router.push("/login");
          //   } else {
          //     this.$message({
          //       message: resp.message,
          //       type: "warning",
          //       duration: 1000
          //     });
          //   }
          // });

    },

    handleCommand(command) {
      //   this.$message('click on item ' + command);
      switch (command) {
        case "a":
          //this.$message("单击了修改密码");
          this.updatePwd();
          break;
        case "b":
          this.$message("单击了退出系统");

          this.logoutSystem()
          break;
      }
    }
  }
};
</script>
<style scoped>
.logo {
  width: 25px;
  vertical-align: middle;
  border-radius: 5px;
}
.title {
  position: absolute;
  color: #fff;
  padding-left: 5px;
  font-size: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #ffffff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown {
  float: right;
  margin-right: 30px;
}
</style>
