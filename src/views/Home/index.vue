<template>
  <AppLayout>
    <div class="container">
      <!-- 分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />
    </div>
    <!-- 新鲜好物 -->
    <HomeNew />
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import HomeCategory from "@/views/Home/components/HomeCategory";
import HomeBanner from "@/views/Home/components/HomeBanner";
import HomeNew from "@/views/Home/components/HomeNew";

export default {
  name: "Home",
  components: {
    AppLayout,
    HomeCategory,
    HomeBanner,
    HomeNew,
  },
};
</script>

<style lang="less"></style>
