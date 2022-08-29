<template>
  <div>
    <div class="details-top">
      <p>{{ goodsList.product_name }}</p>
      <ul>
        <li><a href="javascript:;">概述</a></li>
        <li><a href="javascript:;">参数</a></li>
        <li><a href="javascript:;">用户评价</a></li>
      </ul>
    </div>
    <div class="details-box">
      <div class="details-box-left">
        <!-- 轮播图 -->
        <el-carousel indicator-position="outside" height="500px">
          <el-carousel-item v-for="(item, index) in goodsBanner" :key="index">
            <img :src="item.product_picture" alt="" style="width: 100%" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="details-box-rigth">
        <div class="details-box-rigth1">
          <p>{{ goodsList.product_name }}</p>
          <p style="color: #aaa">{{ goodsList.product_intro }}</p>
          <p style="color: #ff6700">小米自营</p>
          <p>
            <span style="color: #ff6700">{{ goodsList.product_price }}</span>
            &nbsp;
            <s style="color: #aaa; font-size: 14px">{{
              goodsList.product_selling_price
            }}</s>
          </p>
        </div>
        <div class="details-box-rigth2">
          <div class="details-box-rigth2-top">
            <span>{{ goodsList.product_name }}</span>
            <div>
              <span>{{ goodsList.product_price }}</span> &nbsp;
              <s>{{ goodsList.product_selling_price }}</s>
            </div>
          </div>
          <div style="margin: 10px 0; font-size: 22px; color: #ff6700">
            总计：{{ goodsList.product_price }}
          </div>
        </div>
        <div class="details-box-rigth3">
          <el-button
            type="warning"
            style="width: 40%; height: 50px"
            @click="addCart"
            >加入购物车</el-button
          >
          <el-button
            type="info"
            style="width: 30%; height: 50px"
            @click="addLike"
            >喜欢</el-button
          >
        </div>
        <div class="details-box-rigth4">
          <span><i class="el-icon-circle-check"></i>小米自营</span>
          <span><i class="el-icon-circle-check"></i>小米发货</span>
          <span><i class="el-icon-circle-check"></i> 7天无理由退货</span>
          <span><i class="el-icon-circle-check"></i> 7天价格保护</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      goodsList: [],
      goodsBanner: [],
    };
  },
  created() {
    // 获取详情商品
    this.$axios
      .post("product/getDetails", { productID: this.$route.query.productID })
      .then((res) => {
        console.log(res);
        this.goodsList = res.data.Product[0];
      });
    // 获取轮播图
    this.$axios
      .post("product/getDetailsPicture", {
        productID: this.$route.query.productID,
      })
      .then((res) => {
        // console.log(res);
        this.goodsBanner = res.data.ProductPicture;
      });
  },
  mounted() {},
  methods: {
    // 加入喜欢
    addLike() {
      if (!this.$store.state.user.userName) {
        this.$store.state.LoginDialog = true;
      } else {
      this.$axios
        .post("/user/collect/addCollect", {
          product_id: this.goodsList.product_id,
          user_id: this.$store.state.user.user_id,
        })
        .then((res) => {
          console.log(res);
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
      }
    },
    // 加入购物车
    addCart() {
      if (!this.$store.state.user.userName) {
        this.$store.state.LoginDialog = true;
      } else {
        this.$axios
          .post("/user/shoppingCart/addShoppingCart", {
            user_id: this.$store.state.user.user_id,
            product_id: this.goodsList.product_id,
          })
          .then((res) => {
            if (res.data.code == "001" || res.data.code == "002") {
              this.$notify({
                title: "成功",
                message: res.data.msg,
                type: "success",
              });
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
                title: "失败",
                message: res.data.msg,
                type: "error",
              });
            }
          });
      }
    },
  },
};
</script>
<style scoped lang='scss'>
.details-box {
  display: flex;
  justify-content: space-between;
  .details-box-left {
    width: 40%;
  }
  .details-box-rigth {
    width: 60%;
    padding: 10px;
    box-sizing: border-box;
    .details-box-rigth1 {
      margin: 20px 0;
      padding: 20px 0;
      box-sizing: border-box;
      border-bottom: 1px solid #aaa;
      p {
        margin: 10px 0;
      }
    }
    .details-box-rigth2 {
      padding: 30px;
      box-sizing: border-box;
      background-color: #f5f5f5;
      .details-box-rigth2-top {
        display: flex;
        justify-content: space-between;
        color: #333;
      }
    }
    .details-box-rigth3 {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
    }
    .details-box-rigth4 {
      display: flex;
      justify-content: space-between;
      color: #aaa;
    }
  }
}
.details-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  border-bottom: 3px solid #aaa;
  ul {
    display: flex;
    align-items: center;
    li {
      margin: 0 10px;
      a {
        color: #000;
      }
      a:hover {
        color: #ff6700;
      }
    }
  }
}
</style>