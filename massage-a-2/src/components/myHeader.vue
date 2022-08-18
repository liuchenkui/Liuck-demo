<template>
  <div class="myHeader-box">
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
        <el-menu-item :index="item.id" v-for="item in topList" :key="item.id"
          ><i :class="item.icon"></i> {{ item.name }}</el-menu-item
        >
      </el-menu>
    </div>
    <div style="display: flex; align-items: center">
      <img src="/favicon.ico" alt="" />
      <i class="el-icon-caret-bottom" style="color: #fff"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["topList"],
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
.myHeader-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.top-left {
  align-items: center;
  img {
    margin-right: 30px;
    width: 80px;
    height: 30px;
  }
}
</style>