<template>
  <AppMemberLayout>
    <div class="order-detail-page" v-if="orderDetail">
      <!-- 操作栏 -->
      <DetailAction :orderDetail="orderDetail" :getOrderDetail="getData" />
      <!-- 步骤条-->
      <XtxSteps
        :active="orderDetail.orderState === 6 ? 1 : orderDetail.orderState"
      >
        <XtxStepItem
          title="提交订单"
          :desc="orderDetail.createTime"
        ></XtxStepItem>
        <XtxStepItem title="付款成功" :desc="orderDetail.payTime"></XtxStepItem>
        <XtxStepItem
          title="商品发货"
          :desc="orderDetail.consignTime"
        ></XtxStepItem>
        <XtxStepItem title="确认收货" :desc="orderDetail.endTime"></XtxStepItem>
        <XtxStepItem
          title="订单完成"
          :desc="orderDetail.evaluationTime"
        ></XtxStepItem>
      </XtxSteps>
      <!-- 物流栏 -->
      <Suspense>
        <template v-slot:fallback>loading...</template>
        <template v-slot:default>
          <DetailLogistics v-if="[3, 4, 5].includes(orderDetail.orderState)" />
        </template>
      </Suspense>
      <!-- 订单商品信息 -->
      <DetailOrderGoods :orderDetail="orderDetail" />
    </div>
  </AppMemberLayout>
</template>

<script>
import AppMemberLayout from "@/components/AppMemberLayout";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { getOrderDetailApi } from "@/api/member";
import DetailAction from "@/views/Member/Order/components/DetailAction";
import DetailLogistics from "@/views/Member/Order/components/DetailLogistics";
import DetailOrderGoods from "@/views/Member/Order/components/DetailOrderGooods";

export default {
  name: "OrderDetailPage",
  components: {
    DetailOrderGoods,
    DetailLogistics,
    DetailAction,
    AppMemberLayout,
  },
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
