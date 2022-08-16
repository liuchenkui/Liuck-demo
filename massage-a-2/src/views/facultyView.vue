<template>
  <div>
    <div class="header">学员管理</div>
    <div class="box">
      <el-row>
        <el-col :span="6">
          <span>学员状态</span> &nbsp
          <el-select v-model="value" placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6" style="display: flex; align-items: center">
          <span>学员名称</span> &nbsp
          <el-input
            style="width: 70%"
            v-model="name"
            placeholder="请输入学生关键字"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <span>手 机 号</span> &nbsp
          <el-input
            style="width: 70%"
            v-model="tel"
            placeholder="请输入手机号"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-button icon="el-icon-search" @click="searchOk">搜索</el-button>
          &nbsp
          <el-button icon="el-icon-refresh-left" @click="remake"
            >重制</el-button
          >
        </el-col>
      </el-row>
      <div style="margin-top: 10px">
        <el-button type="primary">新增学员</el-button>&nbsp
        <el-button type="primary">批量导入</el-button>&nbsp
        <el-button type="primary">批量导出</el-button>&nbsp
        <el-button type="primary">查看报表</el-button>
      </div>
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        border
        style="width: 100%; margin-top: 10px"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="nickname" label="学生名称">
          <template slot-scope="scope">
            <div style="display: flex; align-items: center">
              <img :src="scope.row.avatar" alt="" />
              <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            {{ scope.row.status == 1 ? "启用" : "禁用" }}
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间">
          <!-- <template slot-scope="scope">
            {{ new Date(scope.row.created_at * 1000).toLocaleString() }} -->
          <!-- </template> -->
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="230">
          <template slot-scope="scope">
            <el-button type="text" size="small">详情</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">禁用</el-button>
            <el-button type="text" size="small">删除</el-button>
            <el-button type="text" size="small">重制密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom">
        <el-button type="text">导出所选</el-button>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 3, 5, 10]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      tableData: [],
      list: [],
      name: "",
      value: "",
      tel: "",
      currentPage: 1, // 当前页
      pageSize: 5, // 当前页数
      options: [
        {
          value: "1",
          label: "启用",
        },
        {
          value: "0",
          label: "禁用",
        },
      ],
    };
  },
  created() {
    // this.$axios.get("/list.json").then((res) => {
    //   // console.log(res);
    //   this.tableData = res.data;
    //   this.list = res.data
    // });
    this.$axios.get("/api/user").then((res) => {
      console.log(res);
      this.tableData = res.data.data;
      this.list = res.data.data;
    });
  },
  mounted() {},
  methods: {
    // 重制
    remake() {
      this.value = "";
      this.tel = "";
      this.name = "";
      this.tableData = this.list;
    },
    // 搜索
    searchOk() {
      if (this.value == "" && this.name == "" && this.tel == "") {
        this.tableData = this.list;
      }
      if (this.value != "") {
        this.tableData = this.list.filter((item) => item.status == this.value);
      }
      if (this.name != "") {
        this.tableData = this.tableData.filter((item) =>
          item.nickname.includes(this.name)
        );
      }
      if (this.tel != "") {
        this.tableData = this.tableData.filter((item) =>
          item.mobile.includes(this.tel)
        );
      }
    },
    // 当前页数
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>
<style scoped lang='scss'>
.box {
  padding: 10px;
  img {
    width: 30px;
    height: 30px;
  }
}
.header {
  padding: 10px;
  border-bottom: 1px solid #333;
}
.bottom {
  display: flex;
  justify-content: space-between;
}
.el-row {
  font-size: 14px;
}
</style>