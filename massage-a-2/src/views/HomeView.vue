<template>
  <div>
    <el-container>
      <el-header>
        <myHeader :topList="topList"></myHeader>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <broadside :leftList="leftList"></broadside>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import broadside from '../components/broadside.vue'
import myHeader from '../components/myHeader.vue'
export default {
  name: "",
  components: {
    broadside,
    myHeader
  },
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
}

.el-main {
  color: #333;
  padding: 0;
  margin: 0;
}
</style>