<template>
  <AppLayout>
    <div class="container">
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <XtxBreadItem :path="`/category/${category?.topCategory?.id}`">
          {{ category?.topCategory?.name }}
        </XtxBreadItem>
        <XtxBreadItem :path="`/category/sub/${category?.subCategory?.id}`">
          {{ category?.subCategory?.name }}
        </XtxBreadItem>
      </XtxBread>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "SubCategory",
  components: { AppLayout },
  setup() {
    const category = useBread();
    console.log(category.value);
    return { category };
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
