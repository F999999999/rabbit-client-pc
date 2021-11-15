<template>
  <AppLayout>
    <div class="container">
      <HomeCategory />
      <HomeBanner />
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import HomeCategory from "@/views/Home/components/HomeCategory";
import HomeBanner from "@/views/Home/components/HomeBanner";

export default {
  name: "Home",
  components: { AppLayout, HomeCategory, HomeBanner },
  setup() {
    return {};
  },
};
</script>

<style lang="less"></style>
