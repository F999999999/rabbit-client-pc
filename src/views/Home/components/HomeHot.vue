<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过" ref="target">
    <ul class="goods-list" v-if="hotData">
      <li v-for="item in hotData" :key="item.id">
        <RouterLink to="/">
          <img :src="item.picture" :alt="item.title" />
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
    <!-- 骨架屏动画 -->
    <Transition name="fade">
      <!-- 骨架屏 -->
      <HomeSkeleton v-if="!hotData" />
    </Transition>
  </HomePanel>
</template>

<script>
import HomePanel from "@/views/Home/components/HomePanel";
import { getHotGoodsApi } from "@/api/home";
import useLazyData from "@/hooks/useLazyData";
import HomeSkeleton from "@/views/Home/components/HomeSkeleton";
export default {
  name: "HomeHot",
  components: { HomeSkeleton, HomePanel },
  setup() {
    // 懒加载数据
    const { target, result: hotData } = useLazyData(getHotGoodsApi);
    return { hotData, target };
  },
};
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}

.fade-leave-active {
  top: 115px;
}
</style>
