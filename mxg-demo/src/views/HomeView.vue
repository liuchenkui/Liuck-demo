<template>
  <div>
    <el-container>
      <el-header>
        <div class="header-left">
          <img src="http://vue.mengxuegu.com/img/logo.7156be27.png" alt="" @click="$router.push('/index')"/>
          <div @click="$router.push('/index')">梦学谷会员管理系统</div>
        </div>
        <div>
          <el-popover placement="bottom" trigger="hover">
            <span slot="reference"
              >{{ username }} <i class="el-icon-arrow-down"></i>
            </span>
            <el-button
              style="border: 0; width: 100%"
              icon="el-icon-edit"
              @click="dialogFormPas = true"
              >修改密码</el-button
            >
            <br />
            <el-button style="border: 0; width: 100%" icon="el-icon-s-fold"
              @click="back"
              >退出登录</el-button
            >
          </el-popover>
        </div>
        <el-dialog title="修改密码" :visible.sync="dialogFormPas">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="原密码" prop="password">
              <el-input
                v-model="ruleForm.password"
                :suffix-icon="
                  ruleForm.password == ''
                    ? ''
                    : ruleForm.password
                    ? 'el-icon-circle-check'
                    : 'el-icon-circle-close'
                "
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="xpassword">
              <el-input
                v-model="ruleForm.xpassword"
                :suffix-icon="
                  ruleForm.xpassword == ''
                    ? ''
                    : ruleForm.xpassword
                    ? 'el-icon-circle-check'
                    : 'el-icon-circle-close'
                "
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="xPassword">
              <el-input
                v-model="ruleForm.xPassword"
                :suffix-icon="
                  ruleForm.xPassword == ''
                    ? ''
                    : ruleForm.xPassword
                    ? 'el-icon-circle-check'
                    : 'el-icon-circle-close'
                "
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
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="/index"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-menu-item :index="item.path" v-for="item in SideList" :key="item.id">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      SideList: [
        {
          path: "/index",
          title: "首页",
          icon: "el-icon-s-home",
          id: 1,
        },
        {
          path: "/member",
          title: "会员管理",
          icon: "el-icon-user-solid",
          id: 2,
        },
        {
          path: "/supplier",
          title: "供应商管理",
          icon: "el-icon-s-cooperation",
          id: 3,
        },
        {
          path: "/commodity",
          title: "商品管理",
          icon: "el-icon-s-goods",
          id: 4,
        },
        {
          path: "/staff",
          title: "员工管理",
          icon: "el-icon-user",
          id: 5,
        },
      ],
      username: "",
      dialogFormPas: false,
      ruleForm: {
        password: "",
        xpassword: "",
        xPassword: "",
      },
      rules: {
        password: [
          { required: true, message: "原密码不能为空", trigger: "blur" },
        ],
        xpassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
        ],
        xPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.username = sessionStorage.getItem("token");
  },
  mounted() {},
  methods: {
    // 退出
    back(){
      sessionStorage.clear()
      this.$router.push('/login')
    },
    // 修改密码
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.xPassword != this.xpassword) {
            return;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重制
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped lang='scss'>
.el-header,
.el-footer {
  background-color: #2d3a4b;
  color: #fff;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-left {
    display: flex;
    align-items: center;
    img {
      width: 28px;
      height: 28px;
      margin-right: 10px;
    }
  }
}

.el-aside {
  background-color: #545c64;
  color: #333;
  min-height: calc(100vh - 60px);
}

</style>