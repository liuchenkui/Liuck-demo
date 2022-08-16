<template>
  <div>
    <div class="hy">供应商管理</div>
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="4"
        ><el-input v-model="usercard" placeholder="供应商名称"></el-input
      ></el-col>
      <el-col :span="4"
        ><el-input v-model="username" placeholder="联系人"></el-input
      ></el-col>
      <el-col :span="3">
        <el-input v-model="tel" placeholder="联系电话"></el-input
      >
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="Refresh">查询</el-button>
        <el-button type="primary" @click="dialogFormVisible = true"
          >新增</el-button
        >
        <el-button @click="remake">重置</el-button>
      </el-col>
    </el-row>
    <div>
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        border
        style="width: 100%; margin-top: 20px"
        height="350"
      >
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column property="name" label="供应商名称"> </el-table-column>
        <el-table-column property="linkman" label="联系人">
        </el-table-column>
        <el-table-column property="mobile" label="联系电话">
        </el-table-column>
        <el-table-column property="remark" label="备注">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click.stop="Edit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click.stop="del"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 弹框 -->
      <el-dialog title="会员编辑" :visible.sync="dialogFormVisible">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="供应商名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="linkman">
            <el-input v-model="ruleForm.linkman"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="mobile">
            <el-input v-model="ruleForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="ruleForm.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >确定</el-button
            >
            <el-button @click="resetForm">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      ruleForm: {
        name: "",
        linkman: "",
        mobile: "",
        remark: "",
      },
      rules: {
        name: [{ required: true, message: "供应商不能为空", trigger: "blur" }],
        linkman: [{ required: true, message: "联系人不能为空", trigger: "blur" }],
      },
      dialogFormVisible: false,
      tableData: [],
      usercard: "",
      username: "",
      tel:'',
      total: 1,
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    // 删除
    del() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.getList();
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
    // 确定 编辑 、 添加
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          this.ruleForm = {};
          this.getList();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 回显
    Edit(i, row) {
      this.dialogFormVisible = true;
      this.ruleForm = row;
    },
    // 取消
    resetForm() {
      this.dialogFormVisible = false;
      this.ruleForm = {};
    },
    // 刷新
    Refresh() {
      this.getList();
    },
    // 重制
    remake() {
      this.value = "";
      this.value1 = "";
      this.usercard = "";
      this.username = "";
    },
    // 获取数据
    getList() {
      this.$axios.post("/supplier/list/search/1/10").then((res) => {
        // console.log(res);
        this.tableData = res.data.data.rows;
        this.total = res.data.data.total;
      });
    },
    // 当前页数
    handleSizeChange() {
      this.getList();
    },
    // 当前页
    handleCurrentChange() {
      this.getList();
    },
  },
};
</script>
<style scoped lang='scss'>
.hy {
  box-shadow: 0px 0px 0.6px;
  padding: 10px;
  border-left: 3px solid green;
}
</style>