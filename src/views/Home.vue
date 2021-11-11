<template>
  <div class="home">
    <AppLayout />
    <div class="box">test box</div>
  </div>
</template>

<script>
import AppLayout from "@/components/AppLayout";

export default {
  name: "Home",
  components: { AppLayout },
  setup() {
    console.log("Home");

    return {};
  },
};
</script>

<style lang="less">
.box {
  color: @xtxColor;
}
</style>
