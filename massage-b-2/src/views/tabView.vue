<template>
  <div class="tab-box">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="`未读消息(${tableData1Length})`" name="unread">
        <div class="table" v-for="(item, index) in tableData1" :key="index">
          <div>{{ item.title }}</div>
          <div>
            <span class="time">{{ item.create_time }}</span>
            <span
              ><el-button @click="changeRead(item)" size="mini"
                >标为已读</el-button
              ></span
            >
          </div>
        </div>
        <!-- 分页 -->
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="tableData1Length"
        >
        </el-pagination>
        <el-button type="primary" @click="allRead">全部标记已读</el-button>
      </el-tab-pane>
      <el-tab-pane :label="`已读消息(${tableData2Length})`" name="read">
        <div class="table" v-for="(item, index) in tableData2" :key="index">
          <div>{{ item.title }}</div>
          <div>
            <span class="time">{{ item.create_time }}</span>
            <span>
              <el-button type="danger" @click="del(item)" size="mini"
                >删除</el-button
              >
              <el-button type="info" @click="changeUnread(item)" size="mini"
                >还原未读</el-button
              >
            </span>
          </div>
        </div>
        <!-- 分页 -->
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="tableData2Length"
        >
        </el-pagination>
        <el-button type="danger" @click="allDel">删除全部</el-button>
      </el-tab-pane>
      <el-tab-pane
        :label="`回收站(${tableData3Length})`"
        name="Trash"
      >
        <div class="table" v-for="(item, index) in tableData3" :key="index">
          <div>{{ item.title }}</div>
          <div>
            <span class="time">{{ item.create_time }}</span>
            <span>
              <el-button @click="changeUnread(item)" size="mini"
                >还原</el-button
              >
            </span>
          </div>
        </div>
        <!-- 分页 -->
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="tableData3Length"
        >
        </el-pagination>
        <el-button type="danger" @click="allDeilte">清空回收站</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      activeName: "unread", // 默认标签页
      pageSize: 4,
      currentPage: 1,
    };
  },
  computed: {
    tableData1() {
      return this.$store.state.tab.tableData
        .filter((item) => item.flag === false)
        .slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
    },
    tableData1Length() {
      return this.$store.state.tab.tableData.filter(
        (item) => item.flag === false
      ).length;
    },
    tableData2() {
      return this.$store.state.tab.tableData
        .filter((item) => item.flag === true)
        .slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
    },
    tableData2Length() {
      return this.$store.state.tab.tableData.filter(
        (item) => item.flag === true
      ).length;
    },
    tableData3() {
      return this.$store.state.tab.tableData
        .filter((item) => item.flag === 1)
        .slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
    },
    tableData3Length() {
      return this.$store.state.tab.tableData.filter((item) => item.flag === 1)
        .length;
    },
  },
  created() {
    this.$axios.get("/text.json").then((res) => {
      // console.log(res);
      this.$store.commit("createData", res.data);
    });
  },
  mounted() {},
  methods: {
    // 删除全部
    allDeilte() {
      this.$store.commit("allDeilte");
    },
    // 全部放进回收站
    allDel() {
      this.$store.commit("allDel");
    },
    // 全部标记已读
    allRead() {
      this.$store.commit("allRead");
    },
    // 放进回收站
    del(item) {
      this.$store.commit("del", item);
    },
    // 还原未读
    changeUnread(item) {
      this.$store.commit("changeUnread", item);
    },
    // 改变已读
    changeRead(item) {
      this.$store.commit("changeRead", item);
    },
  },
};
</script>
<style scoped lang='scss'>
.tab-box {
  padding: 10px;
  margin: 10px 0;
  background-color: #fff;
  .table {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    .time {
      margin-right: 30px;
    }
  }
  .table:hover {
    background-color: #ccc;
  }
}
</style>