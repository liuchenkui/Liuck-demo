<template>
  <div>
    <el-tag
      v-for="(tag, index) in $store.state.tags"
      :key="index"
      closable
      @click="selectTag(tag)"
      @close="delTag(index)"
    >
      {{
        tag == "/table"
          ? "基础表格"
          : tag == "/books"
          ? "图书管理"
          : tag == "/Backstage"
          ? "后台管理"
          : tag == "Internation"
          ? "国际化"
          : "tab选项卡"
      }}
    </el-tag>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    selectTag(tag){
        this.$emit('selectTag',tag)
    },
    delTag(index){
        this.$emit('delTag',index)
    },
  },
};
</script>
<style scoped lang='scss'>
</style>