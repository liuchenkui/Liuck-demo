<template>
  <div class="profile-box">
    <div class="profile-header">
      <div class="profile-header-left">
        <i class="el-icon-s-fold" @click="changeIsCollapse"></i>
        <p>个人中心</p>
      </div>
      <div class="profile-header-right">
        <i class="el-icon-s-promotion"></i>
        <i class="el-icon-search"></i>
        <i class="el-icon-full-screen"></i>
        <i class="el-icon-bell"></i>
        <i class="el-icon-s-platform"></i>
        <img
          src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
          alt=""
        />
      </div>
    </div>
    <div class="profile-content">
      <div class="profile-content-left">
        <div class="profile-content-left-top">
          介绍（已升级 element-plus 正式版）
        </div>
        <div class="profile-content-left-content">
          <img
            src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
            alt=""
          />
          <p>super-admin</p>
          <p>超级管理员</p>
        </div>
        <h3><i class="el-icon-tickets"></i> 项目介绍</h3>
      </div>
      <div class="profile-content-right">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="功能" name="function">功能</el-tab-pane>
          <el-tab-pane label="章节" name="section">章节</el-tab-pane>
          <el-tab-pane label="作者" name="writer">作者</el-tab-pane>
        </el-tabs>
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
      activeName: "function",
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 改变侧边状态
    changeIsCollapse() {
      this.$store.commit("changeIsCollapse");
    },
  },
};
</script>
<style scoped lang='scss'>
.profile-content {
  margin: 25px 0;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  .profile-content-left {
    width: 25%;
    box-sizing: border-box;
    box-shadow: 0px 0px 1px;
    border-radius: 1px;
    .profile-content-left-top {
      text-align: center;
      padding: 10px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
    }
    .profile-content-left-content {
      padding: 20px 10px;
      box-sizing: border-box;
      text-align: center;
      img {
        border-radius: 50%;
      }
    }
  }
  .profile-content-right {
    width: 65%;
  }
}
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .profile-header-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      margin: 0 5px;
      font-size: 20px;
    }
    img {
      width: 30px;
      height: 30px;
    }
  }
  .profile-header-left {
    display: flex;
    align-items: center;
    font-size: 20px;
    p {
      margin: 0 10px;
      color: #aaa;
      font-size: 16px;
    }
  }
}
</style>