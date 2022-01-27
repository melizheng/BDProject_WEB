<template>
  <div class="layout">
    <!--右侧导航栏-->
    <v-right-menu class="right-menu" />
    <!--左侧导航栏-->
    <v-left-menu class="left-menu" />
  </div>
</template>
<script>
import VRightMenu from "@/components/common/RightMenu";
import VLeftMenu from "@/components/common/LeftMenu";
export default {
  name: "Home",
  components: {
    VLeftMenu,
    VRightMenu,
  },
};
</script>
<style xml:lang="less" scoped>
.layout {
  display: flex;
}
.left-menu {
  width: 200px;
  min-height: 500px;
  background-color: #1b3554;
  position: fixed;
  top: 0;
  bottom: 0;
}
.right-menu {
  margin-left: 200px;
}
</style>
