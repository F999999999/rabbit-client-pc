<template>
  <div class="goods-hot">
    <h3>{{ typeName }}</h3>
    <GoodsItem v-for="item in hotGoodsData" :key="item.id" :goods="item" />
  </div>
</template>
<script>
import GoodsItem from "@/views/Category/components/GoodsItem";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { ref } from "vue";
import { getHotGoodsApi } from "@/api/goods";

export default {
  name: "GoodsHot",
  components: { GoodsItem },
  props: {
    type: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const { hotGoodsData, typeName } = useHotGoods(props.type);

    return { hotGoodsData, typeName };
  },
};

// 获取热销商品数据
const useHotGoods = (type) => {
  // 获取路由信息
  const route = useRoute();
  // 热销商品数据
  const hotGoodsData = ref();
  // 榜单名称
  const names = { 1: "24小时热销榜", 2: "周热销榜", 3: "总热销榜" };
  // 获取热销商品数据的方法
  const getHotGoods = (id) => {
    // 获取热销商品的数据
    getHotGoodsApi(id, type).then((res) => {
      // 存储热销商品数据
      hotGoodsData.value = res.result;
    });
  };
  // 首次进入时获取热销商品数据
  getHotGoods(route.params.id);
  // 当前路由更新时执行
  onBeforeRouteUpdate((to) => {
    // 更新热销商品数据
    getHotGoods(to.params.id);
  });

  return { hotGoodsData, typeName: names[type] };
};
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;

    img {
      width: 200px;
      height: 200px;
    }

    p {
      margin: 0 10px;
    }

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
