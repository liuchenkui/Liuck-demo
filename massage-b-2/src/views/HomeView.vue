<template>
  <div>
    <el-container>
      <el-header>
        <myHeader :isCollapse="isCollapse" @changeIscoll="changeIscoll" />
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '65px' : '200px'">
          <Side :isCollapse="isCollapse" @handleSelect="handleSelect" />
        </el-aside>
        <el-main>
         <Main @selectTag="selectTag" @delTag="delTag"></Main>
          <!-- 坑 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import myHeader from "../components/myHeader.vue";
import Side from "../components/side.vue";
import Main from "../components/Main.vue";
export default {
  name: "",
  components: {
    myHeader,
    Side,
    Main
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    // 伸缩侧边栏
    changeIscoll() {
      this.isCollapse = !this.isCollapse;
    },
    // 切换tag页
    selectTag(name) {
      if (this.$route.path == name) {
        return;
      }
      this.$router.push(name);
    },
    // 删除tag标签
    delTag(index) {
      this.$store.commit("delTag", index);
    },
    // 添加tag标签
    handleSelect(key, keyPath) {
      this.$store.commit("handleSelect", keyPath[0]);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='scss'>
.el-header {
  background-color: #333;
  color: #fff;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    margin-left: 10px;
  }
}

.el-aside {
  color: #333;
  min-height: calc(100vh - 60px);
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>