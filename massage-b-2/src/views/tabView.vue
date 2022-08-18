<template>
  <div class="tab-box">
    <el-tabs v-model="activeName">
      <el-tab-pane
        :label="`未读消息(${
          $store.state.tab.tableData.filter((item) => item.flag === false).length
        })`"
        name="unread"
      >
        <div
          class="table"
          v-for="(item, index) in $store.state.tab.tableData
            .filter((item) => item.flag === false)
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)"
          :key="index"
        >
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
          :total="$store.state.tab.tableData.filter((item) => !item.flag).length"
        >
        </el-pagination>
        <el-button type="primary" @click="allRead">全部标记已读</el-button>
      </el-tab-pane>
      <el-tab-pane
        :label="`已读消息(${
          $store.state.tab.tableData.filter((item) => item.flag === true).length
        })`"
        name="read"
      >
        <div
          class="table"
          v-for="(item, index) in $store.state.tab.tableData
            .filter((item) => item.flag === true)
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)"
          :key="index"
        >
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
          :total="$store.state.tab.tableData.filter((item) => item.flag === true).length"
        >
        </el-pagination>
        <el-button type="danger" @click="allDel">删除全部</el-button>
      </el-tab-pane>
      <el-tab-pane
        :label="`回收站(${$store.state.tab.tableData.filter((item) => item.flag === 1).length})`"
        name="Trash"
      >
        <div
          class="table"
          v-for="(item, index) in $store.state.tab.tableData
            .filter((item) => item.flag === 1)
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)"
          :key="index"
        >
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
          :total="$store.state.tab.tableData.filter((item) => item.flag === 1).length"
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
  created() {
    this.$axios.get("/text.json").then((res) => {
      // console.log(res);
      this.$store.commit('createData',res.data)
    });
  },
  mounted() {},
  methods: {
    // 删除全部
    allDeilte() {
      this.$store.commit('allDeilte')
    },
    // 全部放进回收站
    allDel() {
      this.$store.commit('allDel')
    },
    // 全部标记已读
    allRead() {
      this.$store.commit('allRead')
    },
    // 放进回收站
    del(item) {
      this.$store.commit('del',item)
    },
    // 还原未读
    changeUnread(item) {
      this.$store.commit('changeUnread',item)
    },
    // 改变已读
    changeRead(item) {
      this.$store.commit('changeRead',item)
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