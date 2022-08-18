<template>
  <div class="myHeader-box">
    <div style="display: flex; align-items: center">
      <i
        :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        style="font-size: 25px"
        @click="changeIscoll"
      ></i>
      <h2>后台管理系统</h2>
    </div>
    <div>
      <i class="el-icon-full-screen" style="font-size: 25px"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isCollapse"],
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    changeIscoll(){
      this.$emit('changeIscoll')
    }
  },
};
</script>
<style scoped lang='scss'>
.myHeader-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>