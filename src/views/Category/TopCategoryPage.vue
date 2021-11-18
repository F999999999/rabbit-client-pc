<template>
  <AppLayout>
    <div class="container">
      <!-- 面包屑导航 -->
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <!-- mode 属性指定动画的执行顺序，默认同时执行（in-out：先入场后离场 out-in：先离场后入场） -->
          <!-- 动画的执行条件是组件的挂载和卸载 -->
          <!-- key 属性是为了让 Vue 虚拟 DOM 树发生变化（重新渲染）从而实现执行动画 -->
          <XtxBreadItem :key="category?.id">
            {{ category?.name }}
          </XtxBreadItem>
        </Transition>
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
