<template>
  <div>
    <!--    title 弹窗标题-->
    <!--    dialogVisible true 显示弹窗-->
    <!--    v-slot:footer 弹窗底部区域-->
    <el-dialog title="添加账号" v-model="dialogVisible" width="35%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="城市权限" prop="citySelected">
          <el-checkbox-group v-model="ruleForm.citySelected">
            <el-checkbox
              v-for="item in city"
              :key="item.city_code"
              :label="item.city_code"
              :value="item.city_code"
              class="el-checkbox-width"
            >
              {{ item.city_name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/api";

export default {
  name: "AddAccount",
  data() {
    return {
      city: [],
      item: { city_code: "", city_name: "" },
      dialogVisible: false,
      ruleForm: {
        name: "",
        phone: "",
        citySelected: [],
        accountType: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 20, message: "请输入至少3~20个字符", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
        ],
        citySelected: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个城市权限",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    /**
     * 提交表单请求接口
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api
            .addAccount({
              name: this.ruleForm.name,
              phone: this.ruleForm.phone,
              city_code: this.ruleForm.citySelected,
              account_type: this.ruleForm.accountType,
            })
            .then((res) => {
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: "增加账号成功!",
                });
                this.closeDialog();
                //刷新表格内容
                this.$parent.searchInput();
                //重置表单
                this.$refs[formName].resetFields();
              }
            });
        } else {
          console.log("没按规则输入内容！");
        }
      });
    },
    closeDialog() {
      this.dialogVisible = false;
    },
  },
  created() {
    api.getProjectAllCityCode().then((res) => {
      if (res.data.code === 1) {
        this.city = res.data.msg;
      }
    });
  },
};
</script>

<style scoped>
.el-checkbox-width {
  width: 80px;
  height: 25px;
}
</style>
