<template>
  <div class="home">
    <AppLayout />
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

<style lang="less"></style>
