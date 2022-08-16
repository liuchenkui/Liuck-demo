<template>
  <div class="login-box">
    <div class="box">
      <h3>梦学谷会员管理系统</h3>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
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
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/user/login',this.ruleForm).then(res => {
            if(res.status == 200){
                sessionStorage.setItem('token',res.data.data.token)
                console.log(res);
                this.$message.success("登录成功")
                this.$router.push('/index')
            }
          })
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
  width: 100%;
  height: 100vh;
  background: url("http://vue.mengxuegu.com/img/login.b665435f.jpg");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    color: #303133;
    padding: 30px 80px;
    background-color: rgba(255, 255, 255, 0.793);
    border-radius: 20px;
    // text-align: center;
    h3 {
      margin: 10px 0;
      text-align: center;
    }
  }
}
</style>