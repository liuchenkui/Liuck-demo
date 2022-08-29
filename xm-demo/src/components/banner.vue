<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel indicator-position="outside" height="460px">
      <el-carousel-item v-for="item in Carousel" :key="item.carousel_id">
        <img :src="item.imgPath" alt="" style="height:100%"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: ["Carousel"],
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