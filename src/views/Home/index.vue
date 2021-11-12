<template>
  <AppLayout>
    <div class="container">
      <HomePage />
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import HomePage from "@/views/Home/components/HomePage";

export default {
  name: "Home",
  components: { AppLayout, HomePage },
  setup() {
    return {};
  },
};
</script>

<style lang="less"></style>
