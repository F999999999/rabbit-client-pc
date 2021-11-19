import { ref } from "vue";
import { getBannerApi } from "@/api/home";

/**
 * 获取轮播图数据
 * @returns {{banners: Ref<any>, getData: getData}}
 */
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

export default useBanners;
