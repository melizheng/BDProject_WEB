<template>
  <div>
    <el-dialog title="修改对接BD" v-model="dialogVisible" width="25%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        label-position="center"
      >
        <el-form-item label="对接BD：" prop="user_id">
          <el-select
            filterable
            v-model="ruleForm.user_id"
            placeholder="输入BD名称搜索"
            @change="chooseBD"
            clearable
          >
            <el-option
              v-for="item in BDS"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
  name: "EditCustomBD",
  data() {
    return {
      item: { id: "", name: "" },
      BDS: [],
      dialogVisible: false,
      ruleForm: {
        id: "",
        user_id: "",
      },
      rules: {
        user_id: [{ required: true, message: "请选择BD", trigger: "blur" }],
      },
    };
  },
  methods: {
    chooseBD() {
      console.log(this.ruleForm);
    },
    /**
     * 提交表单请求编辑接口
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api
            .updateCustomToBD({
              id: this.ruleForm.id,
              bd: this.ruleForm.user_id,
            })
            .then((res) => {
              if (res.data.code === 1) {
                //修改成功
                this.closeDialog();
                this.$parent.httpGetOneBD(this.ruleForm.user_id);
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
    api.getBdList().then((res) => {
      if (res.data.code === 1) {
        this.BDS = res.data.msg.data;
      }
    });
  },
};
</script>

<style scoped></style>
