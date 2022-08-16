<template>
  <div>
    <div class="hy">商品管理</div>
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="4"
        ><el-input v-model="usercard" placeholder="商品名称"></el-input
      ></el-col>
      <el-col :span="4"
        ><el-input v-model="username" placeholder="商品编号"></el-input
      ></el-col>
      <el-col :span="3">
        <el-input
          v-model="tel"
          @focus="openDialog"
          placeholder="选择供应商"
        ></el-input>
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
        <el-table-column property="name" label="商品名称"> </el-table-column>
        <el-table-column property="code" label="商品编码"> </el-table-column>
        <el-table-column property="spec" label="商品规格"> </el-table-column>
        <el-table-column property="retailPrice" label="零售价">
        </el-table-column>
        <el-table-column property="purchasePrice" label="进货价">
        </el-table-column>
        <el-table-column property="storageNum" label="库存数量">
        </el-table-column>
        <el-table-column property="supplierName" label="供应商">
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
      <el-dialog title="编辑商品" :visible.sync="dialogFormVisible">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品编码" prop="code">
            <el-input v-model="ruleForm.code"></el-input>
          </el-form-item>
          <el-form-item label="商品规格" prop="spec">
            <el-input v-model="ruleForm.spec"></el-input>
          </el-form-item>
          <el-form-item label="零售价" prop="retailPrice">
            <el-input v-model="ruleForm.retailPrice"></el-input>
          </el-form-item>
          <el-form-item label="进货价" prop="purchasePrice">
            <el-input v-model="ruleForm.purchasePrice"></el-input>
          </el-form-item>
          <el-form-item label="库存数量" prop="storageNum">
            <el-input v-model="ruleForm.storageNum"></el-input>
          </el-form-item>
          <el-form-item label="供应商" prop="supplierName">
            <el-input v-model="ruleForm.supplierName"></el-input>
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
    <!-- 供应商弹框 -->
    <el-dialog title="选择供应商" :visible.sync="dialogSupplierName">
      <div>
        <el-input
          v-model="Supplier"
          placeholder="供应商名称"
          style="width: 200px; margin-right: 10px"
        ></el-input>
        <el-button type="primary" @click="Refresh1">查询</el-button>
      </div>
      <el-table
        :data="SupplierTableData"
        stripe
        style="width: 100%"
        height="200"
        border
      >
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="name" label="供应商名称"> </el-table-column>
        <el-table-column prop="linkman" label="联系人"> </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange1" layout="prev, pager, next" :total="1000"> </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      SupplierTableData: [], // 供应商表格
      Supplier: "",
      dialogSupplierName: false, // 供应商弹框
      ruleForm: {
        name: "",
        code: "",
        spec: "",
        remark: 0,
        retailPrice: 0,
        storageNum: 0,
        supplierName: "",
      },
      rules: {
        name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" },
        ],
        code: [
          { required: true, message: "商品编码不能为空", trigger: "blur" },
        ],
      },
      dialogFormVisible: false,
      tableData: [],
      usercard: "",
      username: "",
      tel: "",
      total: 1,
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    // 供应商查询
    Refresh1(){
      this.getSupplierList()
    },
    // 供应商当前页
    handleCurrentChange1(){
      this.getSupplierList()
    },
    // 打开供应商弹框
    openDialog() {
      this.dialogSupplierName = true;
      this.getSupplierList();
    },
    // 获取供应商数据
    getSupplierList() {
      this.$axios.post("/supplier/list/search/5/10").then((res) => {
        console.log(res);
        this.SupplierTableData = res.data.data.rows;
      });
    },
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
      this.$axios.post("/goods/list/search/1/10").then((res) => {
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