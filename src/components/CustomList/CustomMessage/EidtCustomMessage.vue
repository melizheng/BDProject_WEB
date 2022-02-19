<template>
  <div>
    <el-dialog title="修改公司信息" v-model="dialogVisible" width="600px" >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        label-position="center"
      >
        <el-form-item label="公司名称：" prop="company_name">
          <el-input v-model="ruleForm.company_name"></el-input>
        </el-form-item>

        <el-form-item label="公司地址：" prop="address"><mymap></mymap></el-form-item>
        <el-form-item label="详细地址：" prop="detail_address">
          <el-input v-model="ruleForm.detail_address"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
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
import mymap from "@/components/common/Mymap";
// import api from "@/api/api";
export default {
  name: "EidtCustomMessage",
  components:{
    mymap,
  },
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        id: "",
        company_name: "",
        detail_address:"",
        address:"",
        remark:"",
      },
      rules: {
        company_name: [{ required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 3, max: 20, message: "请输入至少3~20个字符", trigger: "blur" },],
      },
    };
  },
  methods:{
    /**
     * 提交表单请求编辑接口
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("qingqiu！");
        } else {
          console.log("没按规则输入内容！");
        }
      });
    },
  closeDialog() {
    this.dialogVisible = false;
  },
}
};
</script>

<style scoped></style>
