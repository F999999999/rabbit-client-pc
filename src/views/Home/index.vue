<template>
  <AppLayout>
    <div class="container">
      <HomeCategory />
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import HomeCategory from "@/views/Home/components/HomeCategory";

export default {
  name: "Home",
  components: { AppLayout, HomeCategory },
  setup() {
    return {};
  },
};
</script>

<style lang="less"></style>
