<template>
  <div>
    <div class="order-top">
      <i class="el-icon-s-order" style="color: #ff6700"></i> 我的订单
    </div>
    <emptyCom v-if="OrderList.length == 0"></emptyCom>
    <div v-else class="order-content">
      <div class="content" v-for="(item, index) in OrderList" :key="index">
        <ul>
          <li class="order-info">
            <div class="order-id">订单编号: {{ item[0].order_id }}</div>
            <div class="order-time">
              订单时间: {{ new Date(item[0].order_time).toLocaleString() }}
            </div>
          </li>
          <li class="header">
            <div class="pro-img"></div>
            <div class="pro-name">商品名称</div>
            <div class="pro-price">单价</div>
            <div class="pro-num">数量</div>
            <div class="pro-total">小计</div>
          </li>
          <li class="product-list" v-for="(child, i) in item" :key="i">
            <div class="pro-img">
              <img :src="child.product_picture" alt="" />
            </div>
            <div class="pro-name">{{ child.product_name }}</div>
            <div class="pro-price">{{ child.product_price }}元</div>
            <div class="pro-num">{{ child.product_num }}</div>
            <div class="pro-total pro-total-in">
              {{ child.product_num * child.product_price }}元
            </div>
          </li>
        </ul>
        <div class="order-bar">
          <div class="order-bar-left">
            共
            <span class="order-total-num">{{ OrderList[index].length }}</span>
            件商品
          </div>
          <div class="order-bar-right">
            <span>
              <span class="total-price-title">合计：</span>
              <span class="total-price">{{ getAllPrice(index) }}元</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emptyCom from "../components/emptyCom.vue";
export default {
  name: "",
  components: { emptyCom },
  data() {
    return {
      OrderList: [],
    };
  },
  created() {
    this.getOrderList();
  },
  mounted() {},
  computed: {},
  methods: {
    getOrderList() {
      this.$axios
        .post("/user/order/getOrder", {
          user_id: this.$store.state.user.user_id,
        })
        .then((res) => {
          // console.log(res);
          this.OrderList = res.data.orders;
        });
    },
    getAllPrice(index) {
      let num = 0;
      this.OrderList[index].forEach((item) => {
        num += item.product_price * item.product_num;
      });
      return num;
    },
  },
};
</script>
<style scoped lang='scss'>
.order-bar {
  padding: 0 20px;
  border-top: 1px solid #ff6700;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  .order-bar-left {
    float: left;
    .order-total {
      color: #757575;
    }
    .order-total-num {
      color: #ff6700;
    }
  }
  .order-bar-right {
    float: right;
    .total-price-title {
      color: #ff6700;
      font-size: 14px;
    }
    .total-price {
      color: #ff6700;
      font-size: 30px;
    }
  }
}
.product-list {
  height: 85px;
  padding: 15px 26px 15px 0;
  border-top: 1px solid #e0e0e0;
  .pro-img {
    float: left;
    height: 85px;
    width: 120px;
    padding-left: 80px;
    img {
      height: 80px;
      width: 80px;
    }
  }
  .pro-name {
    float: left;
    width: 380px;
  }
  .pro-price {
    float: left;
    width: 160px;
    padding-right: 18px;
    text-align: center;
  }
  .pro-num {
    float: left;
    width: 190px;
    text-align: center;
  }
  .pro-total {
    color: #ff6700;
  }
}
.order-content {
  padding: 20px;
  background-color: #f5f5f5;
  .content {
    background-color: #fff;
    padding: 20px;
    margin: 10px 0;
    ul {
      background-color: #fff;
      color: #424242;
      line-height: 85px;
      .header {
        height: 85px;
        padding-right: 26px;
        color: #424242;
        .pro-img {
          float: left;
          height: 85px;
          width: 120px;
          padding-left: 80px;
        }
        .pro-name {
          float: left;
          width: 380px;
        }
        .pro-price {
          float: left;
          width: 150px;
          padding-right: 18px;
          text-align: center;
        }
        .pro-num {
          float: left;
          width: 100px;
          text-align: center;
        }
        .pro-total {
          float: left;
          width: 160px;
          padding-right: 81px;
          text-align: right;
        }
      }
      .order-info {
        height: 60px;
        line-height: 60px;
        padding: 0 26px;
        color: #424242;
        border-bottom: 1px solid #ff6700;
        .order-id {
          float: left;
          color: #ff6700;
        }
        .order-time {
          float: right;
        }
      }
    }
  }
}
.order-top {
  padding: 20px 0;
  font-size: 30px;
  border-bottom: 3px solid #ff6700;
}
</style>