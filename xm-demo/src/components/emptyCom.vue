<template>
  <div>
    <div class="order-empty">
      <div class="empty">
        <h2>
          您的{{
            this.$route.path == "/order"
              ? "订单"
              : this.$route.path == "/cart"
              ? "购物车"
              : "我的收藏"
          }}还是空的！
        </h2>
        <p>快去购物吧！</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang='scss'>
.order-empty {
  background-color: #f7f7f7;
  overflow: hidden;
}
.empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url("http://101.132.181.9/img/cart-empty.8b316431.png") no-repeat
    124px 0;
  color: #b0b0b0;
  overflow: hidden;
  h2 {
    margin: 70px 0 15px;
    font-size: 36px;
  }
  p {
    margin: 0 0 20px;
    font-size: 20px;
  }
}
</style>