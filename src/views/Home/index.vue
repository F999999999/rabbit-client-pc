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
    <!-- 人气推荐 -->
    <HomeHot />
    <!-- 热门品牌 -->
    <HomeBrand />
    <!-- 产品区块 -->
    <HomeProduct />
    <!-- 最新专题 -->
    <HomeSpecial />
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import HomeCategory from "@/views/Home/components/HomeCategory";
import HomeBanner from "@/views/Home/components/HomeBanner";
import HomeNew from "@/views/Home/components/HomeNew";
import HomeHot from "@/views/Home/components/HomeHot";
import HomeBrand from "@/views/Home/components/HomeBrand";
import HomeProduct from "@/views/Home/components/HomeProduct";
import HomeSpecial from "@/views/Home/components/HomeSpecial";

export default {
  name: "Home",
  components: {
    HomeSpecial,
    HomeProduct,
    HomeBrand,
    AppLayout,
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
  },
};
</script>

<style lang="less"></style>
