<template>
  <div>
    <el-menu
      default-active="/table"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      router
      @select="handleSelect"
    >
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
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    handleSelect(key, keyPath){
        this.$emit('handleSelect',key, keyPath)
    }
  },
};
</script>
<style scoped lang='scss'>
</style>