<template>
  <AppMemberLayout>
    <div class="order-detail-page">
      <!-- 操作栏 -->
      <DetailAction :orderDetail="orderDetail" :getOrderDetail="getData" />
      <!-- 步骤条-->
      <!-- 物流栏 -->
      <!-- 订单商品信息 -->
    </div>
  </AppMemberLayout>
</template>

<script>
import AppMemberLayout from "@/components/AppMemberLayout";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { getOrderDetailApi } from "@/api/member";
import DetailAction from "@/views/Member/Order/components/DetailAction";

export default {
  name: "OrderDetailPage",
  components: { DetailAction, AppMemberLayout },
  setup() {
    // 获取订单详情
    const { orderDetail, getData } = useOrderDetail();

    return { orderDetail, getData };
  },
};

// 获取订单详情
const useOrderDetail = () => {
  // 获取路由信息
  const route = useRoute();
  // 订单详情信息
  const orderDetail = ref(null);
  // 获取订单详情数据
  const getData = () => {
    // 发送请求获取订单详情数据
    getOrderDetailApi(route.params.id).then((data) => {
      orderDetail.value = data.result;
    });
  };
  getData();

  return { orderDetail, getData };
};
</script>

<style scoped lang="less">
.order-detail-page {
  background: #fff;
  height: 100%;
}
</style>
