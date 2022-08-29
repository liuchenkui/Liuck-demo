<template>
  <div>
    <div>
      <ul>
        <li>
          <span @click="openLoginDialog(0)" v-show="userName == ''">登录</span
          ><i v-show="userName == ''"> | </i
          ><span v-show="userName == ''" @click="openLoginDialog(1)">注册</span>
          <i v-show="userName != ''"> 欢迎 </i>
          <el-popconfirm title="确定退出登录吗?" @confirm="backLogin">
            <span v-show="userName != ''" slot="reference">
              {{ userName }}
            </span>
          </el-popconfirm>
        </li>
        <li @click="toOrder">我的订单</li>
        <li @click="toCollect">我的收藏</li>
        <li>
          <el-button
            @click="toCart"
            :class="{ activeBtn: $store.state.cartList.length != 0 }"
            >购物车({{ $store.getters.cartNum }})</el-button
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userName"],
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    // 跳转我的订单
    toOrder() {
      if (!this.$store.state.user.userName) {
        this.$store.state.LoginDialog = true;
        this.$router.push("/");
      } else {
        this.$router.push("/order");
      }
    },
    // 跳转我的收藏
    toCollect() {
      if (!this.$store.state.user.userName) {
        this.$store.state.LoginDialog = true;
        this.$router.push("/");
      } else {
        this.$router.push("/collect");
      }
    },
    // 跳转我的购物车
    toCart() {
      if (!this.$store.state.user.userName) {
        this.$store.state.LoginDialog = true;
        this.$router.push("/");
      } else {
        this.$router.push("/cart");
      }
    },
    // 打开 注册 / 登录弹框
    openLoginDialog(id) {
      this.$store.commit("openLoginDialog", id);
    },
    // 退出登录
    backLogin() {
      this.$emit("backLogin");
      this.$store.commit('locageClear')
      
    },
  },
};
</script>
<style scoped lang='scss'>
.activeBtn {
  background-color: #ff6700 !important;
  color: #fff !important;
}
div {
  width: 1200px;
  margin: 0 auto;
  ul {
    float: right;
    display: flex;
    li {
      min-width: 80px;
      text-align: center;
      height: 100%;
      color: #aaa;
      span:hover {
        color: #fff;
        cursor: pointer;
      }
    }
    li:nth-child(2):hover {
      color: #fff;
      cursor: pointer;
    }
    li:nth-child(3):hover {
      color: #fff;
      cursor: pointer;
    }
  }
}
.el-button {
  background-color: #333;
  color: #aaa;
  border: 0;
}
.el-button:hover {
  background-color: #fff;
  color: red;
}
</style>