<template>
  <div class="table-box">
    <!-- 搜索框 -->
    <el-row>
      <el-col :span="3"
        ><el-button type="primary" @click="selectDel"
          >选中删除</el-button
        ></el-col
      >
      <el-col :span="5">
        <el-select v-model="province" @change="selectPro" clearable placeholder="请选择">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.label"
            :value="item.label"
          >
          </el-option> </el-select
      ></el-col>
      <el-col :span="8"
        ><el-input v-model="searchVal" @change="searchOk" placeholder="请输入内容"></el-input
      ></el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="Id" width="120"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="price" label="账户余额" width="120">
        <template slot-scope="scope"> ￥{{ scope.row.price }} </template>
      </el-table-column>
      <el-table-column prop="img" label="头像">
        <template slot-scope="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="scope.row.img"
            :preview-src-list="[scope.row.img]"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state ? 'success' : 'warning'">{{
            scope.row.state ? "成功" : "失败"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="注册时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="tableData.length + 1"
    >
    </el-pagination>
    <!-- 弹框 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="emitOk"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  components: {},
  data() {
    return {
      form: {
        // 弹框数据
        name: "",
        address: "",
        i:""
      },
      tableData: [], // 表格数据
      arrData: [],
      selectList: [], // 选中的数据
      searchVal: "", // 搜索框
      province: "", // 选中的地址
      currentPage: 1, // 当前页
      pageSize: 5, // 每页数量
      options: [
        { label: "广东省" },
        { label: "河南省" },
        { label: "湖南省" },
        { label: "山东省" },
        { label: "山西省" },
      ],
      dialogFormVisible: false, // 弹框状态
    };
  },
  created() {
    // 表格数据
    axios.get("/books.json").then((res) => {
    //   console.log(res);
      this.tableData = res.data;
      this.arrData = res.data;
    });
  },
  mounted() {},
  methods: {
    // 搜索
    searchOk(){
        this.tableData = this.arrData.filter(item => item.name.includes(this.searchVal))
    },
    // 选中的地址
    selectPro(val){
        console.log(val);
        this.tableData = this.arrData.filter(item => item.address.includes(val))
    },
    // 编辑成功
    emitOk(){
        this.tableData[this.form.i].name = this.form.name
        this.tableData[this.form.i].address = this.form.address
        this.dialogFormVisible = false;
    },
    // 选中的删除
    selectDel() {
      this.tableData = this.tableData.filter(
        (item) => !this.selectList.includes(item.id)
      );
    },
    // 复选框选中时触发
    handleSelectionChange(val) {
      // console.log(val);
      this.selectList = val.map((item) => item.id);
      console.log(this.selectList);
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑 回显
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form.name = row.name
      this.form.address = row.address
      this.form.i = index
    },
  },
};
</script>
<style scoped lang='scss'>
.el-table {
  margin: 10px 0;
}
.table-box {
  padding: 10px;
  margin: 10px 0;
  background-color: #fff;
}
</style>