<template>
  <div>
    <div class="collect-top">
      <i class="el-icon-collection-tag" style="color: #ff6700"></i> 我的收藏
    </div>
    <emptyCom v-if="collectList == 0"></emptyCom>
    <div v-else class="collect-centent">
      <ul>
        <li
          v-for="item in collectList"
          :key="item.product_id"
          @mousemove="showFlag(item, 1)"
          @mouseleave="showFlag(item, 2)"
        >
          <el-popconfirm
            placement="top-start"
            title="这是一段内容确定删除吗？"
            @confirm="del(item.product_id)"
          >
            <span class="cha" slot="reference" v-show="item.flag">x</span>
          </el-popconfirm>
          <div
            @click="$router.push(`/goods/details?productID=${item.product_id}`)"
          >
            <img :src="item.product_picture" alt="" />
            <div>{{ item.product_name }}</div>
            <div style="color: #aaa; margin: 10px 0">
              {{ item.product_title }}
            </div>
            <div>
              <span style="color: #ff6700">{{ item.product_price }}元 </span>
              <s style="color: #aaa">{{ item.product_selling_price }}</s>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import emptyCom from "../components/emptyCom.vue";
export default {
  name: "",
  components: {
    emptyCom,
  },
  data() {
    return {
      collectList: [],
    };
  },
  created() {
    this.getCollectList();
  },
  mounted() {},
  methods: {
    // 删除我的收藏
    del(id) {
      this.$axios
        .post("user/collect/deleteCollect", {
          user_id: this.$store.state.user.user_id,
          product_id: id,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == "001") {
            this.$notify({
              title: "成功",
              message: res.data.msg,
              type: "success",
            });
            this.getCollectList()
          } else {
            this.$notify.error({
              title: "失败",
              message: res.data.msg,
              type: "error",
            });
          }
        });
    },
    // 获取我的收藏数据
    getCollectList() {
      this.$axios
        .post("user/collect/getCollect", {
          user_id: this.$store.state.user.user_id,
        })
        .then((res) => {
          // console.log(res);
          this.collectList = res.data.collectList.map((item, i, arr) => {
            return {
              category_id: item.category_id,
              product_id: item.product_id,
              product_intro: item.product_intro,
              product_name: item.product_name,
              product_num: item.product_num,
              product_picture: item.product_picture,
              product_price: item.product_price,
              product_sales: item.product_sales,
              product_selling_price: item.product_selling_price,
              product_title: item.product_title,
              flag: false,
            };
          });
          console.log(this.collectList);
        });
    },
    // 改变×状态
    showFlag(item, num) {
      if (num == 1) {
        item.flag = true;
      } else {
        item.flag = false;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.collect-top {
  padding: 20px 0;
  font-size: 30px;
  border-bottom: 3px solid #ff6700;
}
.collect-centent {
  ul {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 20px;
    background-color: #f5f5f5;
    li {
      width: 18%;
      padding: 30px 20px;
      box-sizing: border-box;
      background-color: #fff;
      text-align: center;
      margin: 10px;
      position: relative;
      .cha {
        position: absolute;
        top: 5px;
        right: 10px;
      }
      img {
        width: 80%;
      }
      div {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
</style>
