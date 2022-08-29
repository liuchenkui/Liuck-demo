<template>
  <div>
    <div class="box-hd">
      <p>{{ productList.length == 3 ? "配件" : "家电" }}</p>
      <ul>
        <li
          v-for="(item, index) in productList"
          :key="index"
          :class="{ active: activeProduct == index }"
          @mousemove="getHotProduct(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="promo-menu">
      <div class="promo-menu-left">
        <ul v-if="productList.length != 3">
          <li>
            <img
              src="http://101.132.181.9:3000/public/imgs/appliance/appliance-promo1.png"
              alt=""
            />
          </li>
          <li>
            <img
              src="http://101.132.181.9:3000/public/imgs/appliance/appliance-promo2.png"
              alt=""
            />
          </li>
        </ul>
        <ul v-else>
          <li>
            <img
              src="http://101.132.181.9:3000/public/imgs/accessory/accessory-promo1.png"
              alt=""
            />
          </li>
          <li>
            <img
              src="http://101.132.181.9:3000/public/imgs/accessory/accessory-promo2.png"
              alt=""
            />
          </li>
        </ul>
      </div>
      <div class="promo-menu-right">
        <ul>
          <li
            v-for="item in HotProduct"
            :key="item.product_id"
            @click="$router.push(`/goods/details?productID=${item.product_id}`)"
          >
            <img :src="item.product_picture" alt="" />
            <div class="title">{{ item.product_name }}</div>
            <div style="color: #aaa; margin: 10px 0" class="title">
              {{ item.product_title }}
            </div>
            <div>
              <span style="color: #ff6700">{{ item.product_price }}元</span
              >&nbsp;
              <s style="color: #aaa">{{ item.product_selling_price }}元</s>
            </div>
          </li>
          <li style="line-height: 200px">
            <span
              class="myms"
              @click="
                productList[0].name == '热门'
                  ? $router.push(
                      '/allGoods?categoryID=3&categoryID=4&categoryID=2'
                    )
                  : productList[1].name == '热门'
                  ? $router.push(
                      '/allGoods?categoryID=5&categoryID=6&categoryID=7&categoryID=8'
                    )
                  : $router.push(
                      `/allGoods?categoryID=${2}`
                    )
              "
              >浏览更多 》</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["HotProduct", "productList", "activeProduct"],
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    getHotProduct(i) {
      this.$emit("getHotProduct", i);
    },
  },
};
</script>
<style scoped lang='scss'>
.title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.myms:hover {
  color: #ff6700;
  cursor: pointer;
}
.active {
  color: #ff6700;
  border-bottom: 1px solid #ff6700;
}
p {
  font-size: 20px;
  margin: 10px 0;
  font-weight: 300;
  color: #333;
}
.box-hd {
  display: flex;
  justify-content: space-between;
  ul {
    display: flex;
    align-items: center;
    li {
      margin: 0 10px;
    }
    li:hover {
      cursor: pointer;
    }
  }
}
.promo-menu {
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  .promo-menu-left {
    li {
      margin: 20px 0;
    }
    width: 20%;
    img {
      width: 100%;
    }
  }
  .promo-menu-right {
    width: 80%;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      box-sizing: border-box;
      padding: 0 10px;
      li {
        width: 24%;
        padding: 30px 20px;
        box-sizing: border-box;
        background-color: #fff;
        text-align: center;
        margin: 21px 0;
        img {
          width: 80%;
        }
      }
      li:hover {
        box-shadow: 0 10px 10px 0 rgba(34, 37, 43, 0.258);
        transform: translate(0, -2px);
        transition-delay: 0s !important;
        cursor: pointer;
      }
    }
  }
}
</style>