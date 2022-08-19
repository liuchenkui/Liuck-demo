<template>
  <div class="login-box">
    <div class="box">
      <h2>用户登录</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            prefix-icon="el-icon-user-solid"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入用户密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            style="width: 100%"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <p>测试权限账号：</p>
      <p>提供三种权限账号：</p>
      <p>1.超级管理员账号：super-admin</p>
      <p>2.管理员账号：admin</p>
      <p>3.测试可配置账号：test</p>
      <p>密码统一为：123456</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 登录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (
            this.ruleForm.username == "super-admin" ||
            this.ruleForm.username == "admin" ||
            (this.ruleForm.username == "test" &&
              this.ruleForm.password == "123456")
          ) {
            sessionStorage.setItem(
              "token",
              "Bearer d8c6ed7a-3fd4-46e4-a477-b20d1ce9cda0"
            );
            this.$message.success('登录成功')
            this.$router.push("/home")
          } else{
            this.$message.error('用户名或密码错误')
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped lang='scss'>
.login-box {
  background-color: #30394a;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 500px;
    h2 {
      color: #fff;
      font-weight: 500;
      margin-bottom: 30px;
      text-align: center;
    }
    .el-input__inner {
      background-color: #2b3340 !important;
    }
    p {
      color: #fff;
    }
  }
}
</style>