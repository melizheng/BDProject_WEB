<template>
  <div>
    <el-select
      v-model="item.status"
      placeholder="打卡状态"
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
  name: "MyVisitsStatusDropdown",
  data() {
    return {
      STATUSLIST: [
        { status: "1", statusCH: "异常" },
        { status: "2", statusCH: "正常" },
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
