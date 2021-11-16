<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <ul class="goods-list" v-if="homeHot">
      <li v-for="item in homeHot" :key="item.id">
        <RouterLink to="/">
          <img :src="item.picture" :alt="item.title" />
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>

<script>
import HomePanel from "@/views/Home/components/HomePanel";
import { getHotGoodsApi } from "@/api/home";
import { ref } from "vue";
export default {
  name: "HomeHot",
  components: { HomePanel },
  setup() {
    const homeHot = useHotGoods();
    return { homeHot };
  },
};

const useHotGoods = () => {
  const homeHot = ref();
  getHotGoodsApi().then((res) => {
    homeHot.value = res.result;
  });
  return homeHot;
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
</style>
