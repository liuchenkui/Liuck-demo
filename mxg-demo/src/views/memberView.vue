<template>
  <div>
    <div class="hy">会员管理</div>
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="4"
        ><el-input v-model="usercard" placeholder="会员卡号"></el-input
      ></el-col>
      <el-col :span="4"
        ><el-input v-model="username" placeholder="会员名字"></el-input
      ></el-col>
      <el-col :span="3">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
        <el-table-column property="cardNum" label="会员卡号"> </el-table-column>
        <el-table-column property="name" label="会员姓名" width="120">
        </el-table-column>
        <el-table-column property="birthday" label="会员生日">
        </el-table-column>
        <el-table-column property="phone" label="手机号码"> </el-table-column>
        <el-table-column property="integral" label="可用积分">
        </el-table-column>
        <el-table-column property="payType" label="支付类型">
          <template slot-scope="scope">
            {{
              scope.row.payType == "1"
                ? "现金"
                : scope.row.payType == "2"
                ? "微信"
                : scope.row.payType == "3"
                ? "支付宝"
                : "银行卡"
            }}
          </template>
        </el-table-column>
        <el-table-column property="address" label="会员地址"> </el-table-column>
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
          <el-form-item label="会员卡号" prop="cardNum">
            <el-input v-model="ruleForm.cardNum"></el-input>
          </el-form-item>
          <el-form-item label="会员姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="会员生日" prop="birthday">
            <el-input v-model="ruleForm.birthday"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="开卡金额" prop="money">
            <el-input v-model="ruleForm.money"></el-input>
          </el-form-item>
          <el-form-item label="可用积分" prop="integral">
            <el-input v-model="ruleForm.integral"></el-input>
          </el-form-item>
          <el-form-item label="支付类型" prop="payType">
            <el-select v-model="ruleForm.payType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员地址" prop="address">
            <el-input v-model="ruleForm.address"></el-input>
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
      i: "",
      ruleForm: {
        cardNum: "",
        name: "",
        birthday: "",
        phone: "",
        money: 0,
        integral: 0,
        payType: "",
        address: "",
      },
      rules: {
        cardNum: [{ required: true, message: "卡号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        payType: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
      },
      dialogFormVisible: false,
      tableData: [],
      usercard: "",
      username: "",
      value: "",
      value1: "",
      total: 1,
      options: [
        {
          value: "1",
          label: "现金",
        },
        {
          value: "2",
          label: "微信",
        },
        {
          value: "3",
          label: "支付宝",
        },
        {
          value: "4",
          label: "银行卡",
        },
      ],
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
      this.$axios.post("/member/list/search/1/20").then((res) => {
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