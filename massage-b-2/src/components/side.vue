<template>
  <div>
    <el-menu
      :default-active="activePath"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      router
      @select="handleSelect"
    >
      <el-menu-item index="/books">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">图书管理</span>
      </el-menu-item>
      <el-menu-item index="/Backstage">
        <i class="el-icon-s-management"></i>
        <span slot="title">后台管理</span>
      </el-menu-item>
      <el-menu-item index="/Internation">
        <i class="el-icon-bangzhu"></i>
        <span slot="title">国际化</span>
      </el-menu-item>
      <el-menu-item index="/table">
        <i class="el-icon-menu"></i>
        <span slot="title">基础表格</span>
      </el-menu-item>
      <el-menu-item index="/tab">
        <i class="el-icon-document"></i>
        <span slot="title">tab选项卡</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["isCollapse"],
  name: "",
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler(val) {
        this.activePath = val.path;
      },
    },
  },
  components: {},
  data() {
    return {
      activePath: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      if(keyPath[0] == "/table" || keyPath[0] == "/tab"){
        this.$emit("handleSelect", key, keyPath);
      }      
    },
  },
};
</script>
<style scoped lang='scss'>
</style>