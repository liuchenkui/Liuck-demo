<template>
  <div>
    <el-menu
      default-active="/faculty"
      class="el-menu-vertical-demo"
      background-color="#fff"
      text-color="#333"
      active-text-color="#39f"
      router
    >
      <el-menu-item :index="item.path" v-for="item,index in leftList" :key="index">
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["leftList"],
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
.el-aside {
  color: #333;
  text-align: center;
}
</style>