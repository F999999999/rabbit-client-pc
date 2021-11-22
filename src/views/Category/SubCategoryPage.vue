<template>
  <AppLayout>
    <div class="container">
      <!-- 面包屑导航 -->
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <XtxBreadItem :path="`/category/${category?.topCategory?.id}`">
          {{ category?.topCategory?.name }}
        </XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <!-- 面包屑动画 -->
          <XtxBreadItem :key="category?.subCategory?.id">
            {{ category?.subCategory?.name }}
          </XtxBreadItem>
        </Transition>
      </XtxBread>
      <!-- 筛选条件 -->
      <SubFilter @onFilterParamsChanged="onFilterSortParamsChanged" />
      <div class="goods-list">
        <!-- 商品排序 -->
        <SubSort @onSortParamsChanged="onFilterSortParamsChanged" />
        <!-- 商品列表 -->
        <GoodsList :goods="goodsData.items" v-if="goodsData" />
        <!-- 无限加载组件 -->
        <XtxInfiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="loadMore"
        />
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import SubFilter from "@/views/Category/components/SubFilter";
import SubSort from "@/views/Category/components/SubSort";
import GoodsList from "@/views/Category/components/GoodsList";
import { getGoodsList } from "@/api/category";

export default {
  name: "SubCategory",
  components: { GoodsList, SubSort, SubFilter, AppLayout },
  setup() {
    // 获取面包屑导航数据
    const category = useBread();

    // 获取商品数据
    const {
      goodsData,
      onFilterSortParamsChanged,
      loading,
      finished,
      loadMore,
    } = useGoods();

    return {
      category,
      goodsData,
      onFilterSortParamsChanged,
      loading,
      finished,
      loadMore,
    };
  },
};

// 获取面包屑组件数据
const useBread = () => {
  // 获取路由信息
  const route = useRoute();
  // 获取 store
  const store = useStore();
  // 获取面包屑需要的分类信息
  return computed(() => {
    // 一级分类
    let topCategory = null;
    // 二级分类
    let subCategory = null;
    // 遍历一级分类
    store.state.category.list.forEach((top) => {
      // 遍历二级分类
      top.children?.forEach((sub) => {
        // 判断是否是当前分类
        if (sub.id === route.params.id) {
          // 存储一级分类
          topCategory = top;
          // 存储二级分类
          subCategory = sub;
        }
      });
    });

    return { topCategory, subCategory };
  });
};

// 获取商品数据
const useGoods = () => {
  // 获取路由信息
  const route = useRoute();
  // 商品数据
  const goodsData = ref(null);
  // 请求参数
  const reqParams = ref({
    categoryId: route.params.id,
    // 当前页
    page: 1,
    // 每次请求获取的数据数量
    pageSize: 10,
  });
  // 当前是否处于加载状态
  const loading = ref(false);
  // 是否已加载完所有数据
  const finished = ref(false);
  // 获取商品数据的方法
  const getGoods = () => {
    // 数据加载中
    loading.value = true;
    // 获取商品数据
    getGoodsList(reqParams.value).then((res) => {
      // 数据加载完成
      loading.value = false;
      // 判断是否是第一页
      if (reqParams.value.page === 1) {
        // 直接赋值
        goodsData.value = res.result;
      } else {
        // 否则追加到数据后面
        goodsData.value = {
          ...res.result,
          items: [...goodsData.value.items, ...res.result.items],
        };
      }
      // 判断是否是最后一页
      if (reqParams.value.page === res.result.pages) {
        // 已加载完所有数据
        finished.value = true;
      }
    });
  };
  // 监听请求参数的变化
  watch(
    () => reqParams.value,
    () => {
      // 当数据变化的时候重新发起请求获取新的数据
      getGoods();
    },
    {
      // 初始化时执行
      immediate: true,
    }
  );
  // 加载更多数据
  const loadMore = () => {
    // 页码 +1
    reqParams.value = {
      ...reqParams.value,
      page: reqParams.value.page + 1,
    };
  };

  // 当前路由更新时执行
  onBeforeRouteUpdate((to) => {
    // 更新请求参数
    reqParams.value = {
      categoryId: to.params.id,
    };
  });

  // 更新请求参数
  const onFilterSortParamsChanged = (target) => {
    reqParams.value = { ...reqParams.value, ...target };
  };

  return { goodsData, onFilterSortParamsChanged, loading, finished, loadMore };
};
</script>

<style scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
