<template>
  <div>
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#909399"
      active-text-color="#fff"
      :collapse="$store.state.isCollapse"
      router
    >
      <el-menu-item :index="item.path" v-for="item in sideList" :key="item.id">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
      <el-submenu :index="item.id" v-for="item in sideList2" :key="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          :index="chid.path"
          v-for="chid in item.children"
          :key="chid.id"
          >{{ chid.name }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["active", "sideList", "sideList2"],
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
</style>