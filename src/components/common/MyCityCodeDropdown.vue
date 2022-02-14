<template>
  <div>
    <el-select
      v-model="item.city_code"
      placeholder="选择城市"
      @change="chooseCity"
      clearable
    >
      <el-option
        v-for="item in city"
        :key="item.city_code"
        :label="item.city_name"
        :value="item.city_code"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import api from "@/api/api";
import store from "@/store";

export default {
  name: "MyDropdown",
  data() {
    return {
      city: [],
      item: { city_code: "", city_name: "" },
    };
  },
  methods: {
    chooseCity(item) {
      item = this.item;
      this.$emit("chooseCity", item);
    },
  },
  created() {
    api.getAllCityCode({ id: store.state.user.token }).then((res) => {
      this.city = res.data.msg;
    });
  },
};
</script>

<style scoped></style>
