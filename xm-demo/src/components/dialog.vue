<template>
  <div>
    <!-- 登录 / 注册 弹窗 -->
    <el-dialog
      :title="$store.state.DialogId ? '注册' : '登录'"
      center
      :visible.sync="$store.state.LoginDialog"
      width="300px"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="ruleForm.userName"
            placeholder="请输入账号"
            prefix-icon="el-icon-user"
            status-icon
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
            status-icon
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" v-if="$store.state.DialogId">
          <el-input
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入确认密码"
            v-model="ruleForm.checkPass"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            style="width: 100%"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    // 自定义校验规则
    var validateuserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.ruleForm.userName !== "") {
          let Regname = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
          if (Regname.test(value) == false) {
            callback(new Error("字母开头,允许5-16字节,允许字母数字下划线"));
          }
        }
        callback();
      }
    };
    var validateuserPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.password !== "") {
          let RegPass = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/;
          if (RegPass.test(value) == false) {
            callback(new Error("字母开头,允许6-18字节,允许字母数字下划线"));
          }
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        // 登录表单
        userName: "",
        password: "",
      },
      rules: {
        // 登录表单校验
        userName: [{ validator: validateuserName, trigger: "blur" }],
        password: [{ validator: validateuserPass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 确认登录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$store.state.DialogId == 1) {
            // 注册
            this.$axios.post("users/register", this.ruleForm).then((res) => {
              console.log(res);
              if (res.data.code != "001") {
                this.$notify.error({
                  title: "错误",
                  message: res.data.msg,
                });
              } else {
                this.$notify.success({
                  title: "成功",
                  message: res.data.msg,
                });
                // 关闭弹框
                this.$store.state.LoginDialog = false;
                // 制空
                this.ruleForm = {
                  userName: "",
                  password: "",
                };
              }
            });
          } else {
            // 登录
            this.$axios.post("users/login", this.ruleForm).then((res) => {
              if (res.data.code == "001") {
                localStorage.setItem(
                  "user",
                  JSON.stringify({
                    user_id: res.data.user.user_id,
                    userName: res.data.user.userName,
                  })
                );
                this.$notify({
                  title: "成功",
                  message: "登录成功",
                  type: "success",
                });
                // 关闭弹框
                this.$store.state.LoginDialog = false;
                // 制空
                this.ruleForm = {
                  userName: "",
                  password: "",
                };
                // 获取本地user
                this.$store.state.user = JSON.parse(
                  localStorage.getItem("user")
                )
                  ? JSON.parse(localStorage.getItem("user"))
                  : { userName: "", password: "" };
                // 获取购物车数据
                this.$axios
                  .post("user/shoppingCart/getShoppingCart", {
                    user_id: this.$store.state.user.user_id,
                  })
                  .then((res) => {
                    if (res.data.code == "001") {
                      this.$store.commit(
                        "getCartList",
                        res.data.shoppingCartData
                      );
                    } else {
                      this.$notify.error({
                        title: "失败",
                        message: res.data.msg,
                        type: "error",
                      });
                    }
                  });
              } else {
                this.$notify.error({
                  title: "错误",
                  message: res.data.msg,
                  type: "error",
                });
              }
            });
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
</style>