<template>
  <div>
    <el-container>
      <el-header>
        <div class="top-left" style="display: flex">
          <img src="/favicon.ico" alt="" />
          <el-menu
            default-active="1"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#3078eb"
            text-color="#bdcff4"
            active-text-color="#fff"
          >
            <el-menu-item
              :index="item.id"
              v-for="item in topList"
              :key="item.id"
              ><i :class="item.icon"></i> {{ item.name }}</el-menu-item
            >
          </el-menu>
        </div>
        <div style="display: flex; align-items: center">
          <img src="/favicon.ico" alt="" />
          <i class="el-icon-caret-bottom" style="color: #fff"></i>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="/faculty"
            class="el-menu-vertical-demo"
            background-color="#fff"
            text-color="#333"
            active-text-color="#39f"
            router
          >
            <el-menu-item :index="item.path" v-for="item in leftList" :key="item.id">
              <span slot="title">{{item.title}}</span>
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
      topList: [
        {
          id: "1",
          name: "用户",
          icon: "el-icon-user",
        },
        {
          id: "2",
          name: "教学",
          icon: "el-icon-s-shop",
        },
        {
          id: "3",
          name: "题库",
          icon: "el-icon-s-shop",
        },
        {
          id: "4",
          name: "运营",
          icon: "el-icon-menu",
        },
        {
          id: "5",
          name: "营销",
          icon: "el-icon-menu",
        },
        {
          id: "6",
          name: "商品",
          icon: "el-icon-s-finance",
        },
        {
          id: "7",
          name: "财务",
          icon: "el-icon-folder-checked",
        },
        {
          id: "8",
          name: "统计",
          icon: "el-icon-help",
        },
        {
          id: "9",
          name: "系统",
          icon: "el-icon-setting",
        },
      ],
      leftList: [
        {
          id: 1,
          title:"学院管理",
          path:"/faculty"
        },
        {
          id: 2,
          title:"讲师管理",
          path:"/trainer"
        },
        {
          id: 3,
          title:"助教管理",
          path:"/assistant"
        }
      ]
    };
  },
  created() {
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped lang='scss'>
.el-header,
.el-footer {
  background-color: #3078eb;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .top-left {
    align-items: center;
    img {
      margin-right: 30px;
      width: 80px;
      height: 30px;
    }
  }
}

.el-aside {
  color: #333;
  text-align: center;
  min-height: calc(100vh - 60px);
}

.el-main {
  color: #333;
  padding: 0;
  margin: 0;
}
</style>