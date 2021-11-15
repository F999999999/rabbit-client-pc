<template>
  <div class="home-banner">
    <XtxCarousel v-if="banners" :carousels="banners" :autoplay="true" />
  </div>
</template>
<script>
import { getBannerApi } from "@/api/home";
import { ref } from "vue";
import XtxCarousel from "@/components/library/XtxCarousel";

export default {
  name: "HomeBanner",
  components: { XtxCarousel },
  setup() {
    const { banners, getData } = useBanners();
    getData();
    return { banners };
  },
};

// 获取轮播图数据
const useBanners = () => {
  // 轮播图数据
  const banners = ref();
  // 获取轮播图数据的方法
  const getData = () => {
    // 获取轮播图数据
    getBannerApi(1).then((res) => {
      // 存储轮播图数据
      banners.value = res.result;
    });
  };
  // 返回轮播图数据和获取轮播图数据的方法
  return { banners, getData };
};
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  .xtx-carousel {
    :deep(.carousel-btn.prev) {
      left: 270px;
    }
    :deep(.carousel-indicator) {
      padding-left: 250px;
    }
  }
}
</style>
