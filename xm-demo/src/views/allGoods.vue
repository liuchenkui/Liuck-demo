<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>全部商品</el-breadcrumb-item>
      <el-breadcrumb-item>分类</el-breadcrumb-item>
      <el-breadcrumb-item>{{this.$route.query.search}}</el-breadcrumb-item>
    </el-breadcrumb>
    <ul class="category">
      <span>分类</span>
      <li :class="{ active: activeCategory == -1 }" @click="allGoods(-1)">
        全部
      </li>
      <li
        v-for="(item, index) in category"
        :key="item.category_id"
        :class="{ active: activeCategory == index }"
        @click="getHotProduct(item.category_name, index)"
      >
        {{ item.category_name }}
      </li>
    </ul>
    <div class="kong" v-if="categoryList.length == 0">抱歉没有找到相关的商品，请看看其他的商品</div>
    <div class="goods">
      <ul>
        <li
          v-for="(item, index) in categoryList"
          :key="item.product_id"
          @click="$router.push(`/goods/details?productID=${item.product_id}`)"
        >
          <img :src="item.product_picture" alt="" />
          <div class="title">{{ item.product_name }}</div>
          <div style="color: #aaa; margin: 10px 0" class="title">
            {{ item.product_title }}
          </div>
          <div>
            <span style="color: #ff6700">{{ item.product_price }}元</span>&nbsp;
            <s style="color: #aaa">{{ item.product_selling_price }}元</s>
          </div>
        </li>
      </ul>
      <div class="block" v-if="total != 0">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="15"
          :total="total"
        >
        </el-pagination>
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
      total: 0,
      // 选中关键字高亮
      activeCategory: -1,
      categoryList: [], // 商品数据
      currentPage: 1, // 当前页
      pageSize: 15, // 每页数量
      category: [
        { category_id: 1, category_name: "手机" },
        { category_id: 2, category_name: "电视机" },
        { category_id: 3, category_name: "空调" },
        { category_id: 4, category_name: "洗衣机" },
        { category_id: 5, category_name: "保护套" },
        { category_id: 6, category_name: "保护膜" },
        { category_id: 7, category_name: "充电器" },
        { category_id: 8, category_name: "充电宝" },
      ],
    };
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val.query.search != undefined) {
          this.$axios
            .post("product/getProductBySearch", {
              search: val.query.search,
              currentPage: this.currentPage,
              pageSize: this.pageSize,
            })
            .then((res) => {
              this.categoryList = res.data.Product;
              this.total = res.data.total
            });
        }
      },
    },
  },
  created() {
    this.getGoods();
  },
  mounted() {},
  methods: {
    // 获取商品数据
    getGoods() {
      this.$axios
        .post("product/getAllProduct", {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        })
        .then((res) => {
          this.categoryList = res.data.Product;
          this.total = res.data.total;
        });
    },
    // 选择全部
    allGoods(index) {
      this.activeCategory = index ? index : -1;
      this.getGoods();
      this.$router.push("/allGoods");
    },
    // 获取商品数据
    getHotProduct(val, index) {
      console.log(val);
      this.total = 0;
      this.$router.push(`/allGoods?categoryID=${index + 1}`);
      this.activeCategory = index;
      this.$axios
        .post("product/getHotProduct", { categoryName: [val] })
        .then((res) => {
          this.categoryList = res.data.Product;
        });
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGoods();
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>
<style scoped lang='scss'>
.kong{
  height: 600px;
  background-color: #f5f5f5;
}
li:hover {
  cursor: pointer;
}
.active {
  color: #39f;
}
.block {
  text-align: center;
}
.goods {
  padding: 10px;
  margin: 10px 0;
  background-color: #f5f5f5;
  box-sizing: border-box;
  ul {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 0 10px;
    li {
      width: 18%;
      padding: 30px 20px;
      box-sizing: border-box;
      background-color: #fff;
      text-align: center;
      margin: 21px 10px;
      img {
        width: 80%;
      }
      font-size: 12px;
    }
    li:hover {
      box-shadow: 0 10px 10px 0 rgba(34, 37, 43, 0.258);
      transform: translate(0, -2px);
      transition-delay: 0s !important;
      cursor: pointer;
    }
  }
}
.category {
  display: flex;
  align-items: center;
  font-size: 16px;
  margin: 10px 0;
  span {
    margin: 0 10px;
    font-weight: 600;
  }
  li {
    padding: 5px 15px;
    border: 1px solid #ccc;
  }
  li:hover {
    color: #39f;
  }
}
.el-breadcrumb {
  font-size: 16px;
  margin: 10px 0;
}
</style>