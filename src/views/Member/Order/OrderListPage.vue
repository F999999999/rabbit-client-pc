<template>
  <AppMemberLayout>
    <div class="member-order">
      <XtxTabs v-model:active="active">
        <XtxTabTitle v-for="status in orderStatus" :key="status.name">
          {{ status.label }}
        </XtxTabTitle>
      </XtxTabs>
    </div>
  </AppMemberLayout>
</template>

<script>
import AppMemberLayout from "@/components/AppMemberLayout";
import { ref } from "vue";
import { orderStatus } from "@/api/constants";

export default {
  name: "OrderListPage.vue",
  components: { AppMemberLayout },
  setup() {
    const active = ref(0);

    return { orderStatus, active };
  },
};
</script>

<style lang="less" scoped>
.member-order {
  height: 100%;
  background: #fff;
  position: relative;
}
</style>
