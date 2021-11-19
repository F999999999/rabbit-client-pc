<template>
  <div class="ref-goods" v-for="sub in topCategory?.children" :key="sub.id">
    <div class="head">
      <h3>- {{ sub.name }} -</h3>
      <p class="tag">{{ sub.saleProperties }}</p>
      <XtxMore :path="`/category/sub/${sub.id}`" />
    </div>
    <div class="body">
      <GoodsItem :goods="goods" v-for="goods in sub.goods" :key="goods.id" />
    </div>
  </div>
</template>

<script>
import GoodsItem from "@/views/Category/components/GoodsItem";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { ref } from "vue";
import { getTopCategoryById } from "@/api/category";

export default {
  name: "RecommendGoods",
  components: { GoodsItem },
  setup() {
    // 获取路由信息
    const route = useRoute();
    // 一级分类数据
    const topCategory = ref(null);
    // 获取一级分类数据
    const useGetTopCategoryById = (id) => {
      // 获取一级分类并存储
      getTopCategoryById(id).then((res) => {
        console.log(res);
        topCategory.value = res.result;
      });
    };
    // 首次进入时获取一级分类数据
    useGetTopCategoryById(route.params.id);

    // 当前路由更新前执行
    onBeforeRouteUpdate((to) => {
      // 更新一级分类数据
      useGetTopCategoryById(to.params.id);
    });

    return { topCategory };
  },
};
</script>
<style lang="less" scoped>
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
