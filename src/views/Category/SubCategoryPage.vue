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
      <SubFilter @onFilterParamsChanged="onParamsChanged" />
      <!-- 商品排序 -->
      <SubSort />
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import SubFilter from "@/views/Category/components/SubFilter";
import SubSort from "@/views/Category/components/SubSort";

export default {
  name: "SubCategory",
  components: { SubSort, SubFilter, AppLayout },
  setup() {
    const category = useBread();

    // 获取用户选择的筛选条件
    const onParamsChanged = (target) => {
      console.log(target);
    };

    return { category, onParamsChanged };
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
</script>

<style scoped></style>
