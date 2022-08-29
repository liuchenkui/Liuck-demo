<template>
  <div>
    <div class="cart-top">
      <div>
        <i class="el-icon-collection-tag" style="color: #ff6700"></i> 我的购物车
      </div>
      <p>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</p>
    </div>
    <emptyCom v-if="$store.state.cartList.length == 0"></emptyCom>
    <div class="cart-content" v-else>
      <ul>
        <li class="header">
          <div><el-checkbox v-model="$store.state.checkAll" @change="changeCheck">全选</el-checkbox></div>
          <div>商品名称</div>
          <div>单价</div>
          <div>数量</div>
          <div>小计</div>
          <div>操作</div>
        </li>
        <li class="product-list" v-for="item in $store.state.cartList" :key="item.id">
          <div><el-checkbox v-model="item.check" @change="checkFlag"></el-checkbox></div>
          <div>
            <img :src="item.productImg" alt="" @click="$router.push(`/goods/details?productID=${item.productID}`)"/>
            <span>{{ item.productName }}</span>
          </div>
          <div>{{ item.price }}元</div>
          <div>
            <el-input-number
              size="mini"
              v-model="item.num"
              @change="handleChange(item.num, item.productID)"
              :min="1"
              :max="5"
            ></el-input-number>
          </div>
          <div>{{(item.price*item.num)}}元</div>
          <div>
            <el-popconfirm title="确定要删除吗?" @confirm="del(item.productID)">
              <i class="el-icon-error" slot="reference"></i>
            </el-popconfirm>
          </div>
        </li>
      </ul>
      <div class="cart-bar">
        <div class="cart-bar-left">
          <span class="cart-bar-left-sp1" @click="$router.push('/allGoods')">继续购物</span> |
          <div>共 <span style="color:#ff6700">{{$store.getters.cartNum}}</span> 件商品，已选择 <span style="color:#ff6700">{{$store.getters.cartCheckNum}}</span> 件</div>
        </div>
        <div class="cart-bar-rigth">
          <div>
            合计：
            <p><span>{{$store.getters.cartCheckPrice}}</span> 元</p>
          </div>
          <button @click="toConfirm" :class="{activebtn:activeBtn}">去结算</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emptyCom from "../components/emptyCom.vue";
export default {
  name: "",
  components: {emptyCom},
  data() {
    return {
      num: 0,
      arr: [],
      activeBtn:false
    };
  },
  computed: {},
  created() {
    this.getCartList();
  },
  mounted() {},
  methods: {
    // 去结算
    toConfirm(){
      if(!this.$store.state.cartList.some(item => item.check)){
        return
      } else{
        this.$router.push('/confirmOrder')
      }
    },
    // 全选
    changeCheck(){
        this.$store.commit('changeCheck')
        this.$store.state.cartList.forEach(item => {
          if(item.check == true){
            this.activeBtn = true
          } else{
            this.activeBtn = false
          }
        })
    },
    // 全不选
    checkFlag(){
        this.$store.commit('checkFlag')
        this.activeBtn = this.$store.state.cartList.some(item => item.check)
    },
    // 获取购物车数据
    getCartList() {
      this.$axios
        .post("user/shoppingCart/getShoppingCart", {
          user_id: this.$store.state.user.user_id,
        })
        .then((res) => {
          if (res.data.code == "001") {
            this.$store.commit("getCartList",res.data.shoppingCartData)
          } else {
            this.$notify.error({
              title: "失败",
              message: res.data.msg,
              type: "error",
            });
          }
        });
    },
    // 改变当前商品数量
    handleChange(num, id) {
      // console.log(num,id);
      this.$axios
        .post("user/shoppingCart/updateShoppingCart", {
          user_id: this.$store.state.user.user_id,
          product_id: id,
          num,
        })
        .then((res) => {
          if (res.data.code == "001") {
            this.$notify({
              title: "成功",
              message: res.data.msg,
              type: "success",
            });
          } else {
            this.$notify.error({
              title: "失败",
              message: res.data.msg,
              type: "error",
            });
          }
        });
    },
    // 删除当前商品
    del(id) {
      this.$axios
        .post("/user/shoppingCart/deleteShoppingCart", {
          user_id: this.$store.state.user.user_id,
          product_id: id,
        })
        .then((res) => {
          if (res.data.code == "001") {
            this.$notify({
              title: "成功",
              message: res.data.msg,
              type: "success",
            });
            this.getCartList();
          } else {
            this.$notify.error({
              title: "失败",
              message: res.data.msg,
              type: "error",
            });
          }
        });
    },
  },
};
</script>
<style scoped lang='scss'>
.activebtn{
  background-color: #ff6700 !important;
  color: #fff !important;
}
.cart-bar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  background-color: #fff;
  margin: 10px 0;
  .cart-bar-left {
    color: #757575;
    display: flex;
    .cart-bar-left-sp1 {
      margin: 0 10px;
    }
    .cart-bar-left-sp1:hover {
      cursor: pointer;
      color: #ff6700;
    }
    div {
      margin: 0 10px;
    }
  }
  .cart-bar-rigth {
    display: flex;
    div {
      margin: 0 10px;
      display: flex;
      color: #ff6700;
      align-items: center;
      p {
        font-size: 23px;
      }
    }
    button {
      width: 150px;
      height: 40px;
      background-color: #eee;
      border: 0;
      color: #aaa;
    }
  }
}
.cart-content {
  padding: 20px;
  background-color: #f7f7f7;
  ul {
    background-color: #fff;
    text-align: center;
    .header {
      display: flex;
      justify-content: space-between;
      padding: 30px;
      border-bottom: 1px solid #aaa;
      div:nth-child(2) {
        width: 120px;
      }
    }
    .product-list {
      display: flex;
      padding: 30px;
      justify-content: space-between;
      align-items: center;
      div:nth-child(2) {
        display: flex;
        width: 230px;
        align-items: center;
        img {
          width: 100px;
        }
      }
    }
  }
}
.cart-top {
  padding: 20px 0;
  font-size: 30px;
  border-bottom: 3px solid #ff6700;
  display: flex;
  align-items: center;
  p {
    font-size: 16px;
    margin-top: 20px;
    margin: 20px 0 0 20px;
  }
}
</style>