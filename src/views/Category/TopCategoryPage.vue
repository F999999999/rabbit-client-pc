<template>
  <AppLayout>
    <div class="container">
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <XtxBreadItem :path="`/category/${category?.id}`">
          {{ category?.name }}
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
  name: "TopCategory",
  components: { AppLayout },
  setup() {
    const category = useBread();

    return { category };
  },
};

// 获取面包屑组件数据
function useBread() {
  // 获取路由信息
  const route = useRoute();
  // 获取 store
  const store = useStore();
  // 获取当前访问的分类信息
  // 刚开始 category.list 里面只有 name 没有 id, 只有真实数据请求过来以后才有 id, 所以需要通过计算监控数据变化, 当数据发生变化后重新查找分类数据
  return computed(() => {
    return store.state.category.list.find(
      (category) => category.id === route.params.id
    );
  });
}
</script>

<style scoped></style>
