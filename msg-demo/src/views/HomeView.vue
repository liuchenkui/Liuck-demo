<template>
  <div>
    <el-container>
      <el-aside :width="$store.state.isCollapse ? '64px' : '200px'">
        <div class="side-top">
          <img
            src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
            alt=""
          />
          <p v-show="!$store.state.isCollapse">imooc-admin</p>
        </div>
        <Side
          :active="active"
          :sideList="sideList"
          :sideList2="sideList2"
        ></Side>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Side from "../components/side.vue";
export default {
  name: "",
  components: {
    Side,
  },
  watch:{
    // 监听组件的变化
    $route:{
      deep: true,
      immediate: true,
      handler(val){
        this.active = val.path
      }
    }
  },
  data() {
    return {
      // 侧边数据
      active: "1",
      sideList: [
        {
          path: "/profile",
          icon: "el-icon-user",
          name: "个人中心",
          id: "1",
        },
        {
          path: "/chart",
          icon: "el-icon-s-data",
          name: "数据可视化",
          id: "2",
        },
      ],
      sideList2: [
        {
          icon: "el-icon-user",
          name: "用户",
          id: "3",
          children: [
            {
              path: "/user/manage",
              icon: "el-icon-setting",
              name: "员工管理",
              id: "3-1",
            },
            {
              path: "/user/role",
              icon: "el-icon-s-management",
              name: "角色列表",
              id: "3-2",
            },
            {
              path: "/user/permission",
              icon: "el-icon-s-finance",
              name: "权限列表",
              id: "3-3",
            },
          ],
        },
        {
          icon: "el-icon-s-order",
          name: "文章",
          id: "4",
          children: [
            {
              path: "/article/ranking",
              name: "文章排名",
              icon: "el-icon-s-operation",
              id: "4-1",
            },
            {
              path: "/article/create",
              icon: "el-icon-s-cooperation",
              name: "创建文章",
              id: "4-2",
            },
          ],
        },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang='scss'>
.side-top {
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
  }
  p {
    color: #fff;
    margin: 0 10px;
  }
}
.el-aside {
  background-color: #304156;
  color: #333;
  min-height: 100vh;
}

.el-main {
  min-height: 100vh;
}
</style>