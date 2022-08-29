<template>
  <div>
    <header>
      <Header
        :userName="$store.state.user.userName"
        @backLogin="backLogin"
      ></Header>
    </header>
    <Dialog></Dialog>
    <div class="home-content">
      <div class="home-content-top">
        <div class="home-content-top-left">
          <img src="http://101.132.181.9/img/logo.c8999c02.png" alt="" />
          <div>
            <ul>
              <li
                @click="handleClick('/')"
                :class="{ active: activeName == '/' }"
              >
                首页
              </li>
              <li
                @click="handleClick('/allGoods')"
                :class="{ active: activeName == '/allGoods' }"
              >
                全部商品
              </li>
              <li
                @click="handleClick('/aboutUs')"
                :class="{ active: activeName == '/aboutUs' }"
              >
                关于我们
              </li>
            </ul>
          </div>
        </div>
        <div>
          <el-input
            placeholder="请输入内容"
            v-model="searchVal"
            class="input-with-select"
            style="width: 300px"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchOk"
            ></el-button>
          </el-input>
        </div>
      </div>
      <!-- 首页 -->
      <div v-if="this.$route.path == '/'" style="margin-top: 10px">
        <banner :Carousel="Carousel"></banner>
        <p>手机</p>
        <div class="phone">
          <div class="phone-left">
            <img
              src="http://101.132.181.9:3000/public/imgs/phone/phone.png"
              alt=""
            />
          </div>
          <div class="phone-rigth">
            <ul>
              <li
                v-for="item in Product"
                :key="item.product_id"
                @click="
                  $router.push(`/goods/details?productID=${item.product_id}`)
                "
              >
                <img :src="item.product_picture" alt="" />
                <div>{{ item.product_name }}</div>
                <div style="color: #aaa; margin: 10px 0">
                  {{ item.product_title }}
                </div>
                <div>
                  <span style="color: #ff6700">{{ item.product_price }}元</span>
                  &nbsp;
                  <s style="color: #aaa">{{ item.product_selling_price }}元</s>
                </div>
              </li>
              <li style="line-height: 200px">
                <span
                  class="myms"
                  @click="$router.push(`/allGoods?categoryID=${1}`)"
                  >浏览更多 》</span
                >
              </li>
            </ul>
          </div>
        </div>
        <promo
          :HotProduct="HotProduct"
          :productList="productList"
          :activeProduct="activeProduct"
          @getHotProduct="getHotProduct"
        />
        <promo
          :HotProduct="Accessories"
          :productList="AccessoriesList"
          :activeProduct="activeAccessories"
          @getHotProduct="getAccessories"
        />
      </div>
      <router-view></router-view>
    </div>
    <Bottom class="btm"></Bottom>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import promo from "../components/promo.vue";
import Bottom from "../components/bottom.vue";
import banner from "../components/banner.vue";
import Dialog from "../components/dialog.vue";
export default {
  name: "",
  components: {
    Header,
    promo,
    Bottom,
    banner,
    Dialog,
  },
  data() {
    return {
      flag: false, // 节流
      flag1: false, // 节流
      activeProduct: 0, // 配件高亮
      Accessories: [], // 配件数据
      AccessoriesList: [
        // 配件
        {
          name: "热门",
          categoryName: ["保护套", "保护膜", "充电器", "充电宝"],
        },
        {
          name: "保护套",
          categoryName: ["保护套"],
        },
        {
          name: "充电器",
          categoryName: ["充电器"],
        },
      ],
      productList: [
        // 家电
        {
          name: "热门",
          categoryName: ["电视机", "空调", "洗衣机"],
        },
        {
          name: "电视影音",
          categoryName: ["电视机"],
        },
      ],
      HotProduct: [], // 家电数据
      Product: [], // 手机图片数据
      Carousel: [], // 轮播图数据
      activeName: "/", // 标签页跳转名字
      searchVal: "", // 搜索
    };
  },
  // 监听路由
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler(val) {
        this.activeName = val.path;
      },
    },
  },
  created() {
    // 获取本地user
    this.$store.state.user = JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : { userName: "", password: "" };
    // 获取轮播图
    this.carousel();
    // 获取手机图片
    this.getPhone();
    // 获取家电
    this.getHotProduct();
    // 获取配件
    this.getAccessories();
  },
  mounted() {},
  methods: {
    // 搜索
    searchOk() {
      if (this.searchVal != "") {
        this.$router.push({
          path: "/allGoods",
          query: {
            search: this.searchVal,
          },
        });
      }
    },
    // 获取配件
    getAccessories(index) {
      this.activeAccessories = index ? index : 0;
      if (this.flag1 == false) {
        this.flag1 = true;
        this.$axios
          .post("product/getHotProduct", {
            categoryName: !index
              ? ["保护套", "保护膜", "充电器", "充电宝"]
              : this.AccessoriesList[index].categoryName,
          })
          .then((res) => {
            this.Accessories = res.data.Product;
            setTimeout(() => {
              this.flag1 = false;
            }, 1000);
          });
      }
    },
    // 获取家电
    getHotProduct(index) {
      this.activeProduct = index ? index : 0;
      if (this.flag == false) {
        this.flag = true;
        this.$axios
          .post("product/getHotProduct", {
            categoryName: !index
              ? ["电视机", "空调", "洗衣机"]
              : this.productList[index].categoryName,
          })
          .then((res) => {
            this.HotProduct = res.data.Product;
            setTimeout(() => {
              this.flag = false;
            }, 1000);
          });
      }
    },
    // 获取手机图片
    getPhone() {
      this.$axios
        .post("product/getPromoProduct", { categoryName: "手机" })
        .then((res) => {
          // console.log(res);
          this.Product = res.data.Product;
        });
    },
    // 获取轮播图
    carousel() {
      this.$axios.post("resources/carousel").then((res) => {
        // console.log(res);
        this.Carousel = res.data.carousel;
      });
    },
    // 切换路由
    handleClick(path, index) {
      if (this.$route.path == path) {
        return;
      }
      this.activeName = index;
      this.$router.push(path);
    },
    // 退出登录
    backLogin() {
      // 清除本地
      localStorage.clear();
      this.$notify({
        title: "成功",
        message: "成功退出登录",
        type: "success",
      });
      // 获取本地user
      this.$store.state.user = JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user"))
        : { userName: "", password: "" };
      this.$store.state.cartList = [];
    },
  },
};
</script>
<style scoped lang='scss'>
.active {
  color: #39f !important;
  border-bottom: 2px solid #39f;
}
.myms:hover {
  color: #ff6700;
  cursor: pointer;
}
.phone {
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  .phone-left {
    width: 20%;
    img {
      width: 100%;
    }
    img:hover {
      cursor: pointer;
    }
  }
  .phone-rigth {
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
        margin: 10px 0;
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

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-dialog__header {
  width: 300px !important;
}
.home-content {
  width: 1200px;
  margin: 10px auto;
  .home-content-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #eee;
    padding-bottom: 5px;
    .home-content-top-left {
      display: flex;
      ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        margin-left: 60px;
        li {
          color: #aaa;
          margin: 0 20px;
          padding: 20px;
          box-sizing: border-box;
        }
        li:hover {
          color: #333;
          cursor: pointer;
        }
      }
    }
  }
  p {
    font-size: 20px;
    margin: 10px 0;
    font-weight: 300;
    color: #333;
  }
}
header {
  height: 50px;
  background-color: #3d3d3d;
  line-height: 50px;
}
</style>