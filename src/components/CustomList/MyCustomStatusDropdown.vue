<template>
  <div>
    <el-select
      v-model="item.status"
      placeholder="合作状态"
      @change="chooseStatus"
      clearable
    >
      <el-option
        v-for="item in STATUSLIST"
        :key="item.status"
        :label="item.statusCH"
        :value="item.status"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "MyCustomStatusDropdown",
  data() {
    return {
      STATUSLIST: [
        { status: "1", statusCH: "已合作" },
        { status: "2", statusCH: "未合作" },
        { status: "3", statusCH: "审核中" },
      ],
      item: { status: "", statusCH: "" },
    };
  },
  methods: {
    chooseStatus(item) {
      item = this.item;
      this.$emit("chooseStatus", item);
    },
  },
};
</script>

<style scoped></style>
