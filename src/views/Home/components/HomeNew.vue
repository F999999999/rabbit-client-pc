<template>
  <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱" ref="target">
    <template v-slot:right>
      <XtxMore />
    </template>
    <template v-slot:default>
      <ul class="goods-list" v-if="goodsData">
        <li v-for="item in goodsData" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" :alt="item.name" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
      <!-- 骨架屏动画 -->
      <Transition name="fade">
        <!-- 骨架屏 -->
        <HomeSkeleton v-if="!goodsData" />
      </Transition>
    </template>
  </HomePanel>
</template>
<script>
import HomePanel from "@/views/Home/components/HomePanel";
import { getNewGoodsApi } from "@/api/home";
import useLazyData from "@/hooks/useLazyData";
import HomeSkeleton from "@/views/Home/components/HomeSkeleton";

export default {
  name: "HomeNew",
  components: { HomeSkeleton, HomePanel },
  setup() {
    // 监听元素进入可视区时加载新鲜好物数据
    const { target, result: goodsData } = useLazyData(getNewGoodsApi);
    console.log(goodsData.value);
    return { goodsData, target };
  },
};
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}

.fade-leave-active {
  top: 115px;
}
</style>
