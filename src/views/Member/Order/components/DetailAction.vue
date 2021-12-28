<template>
  <div class="detail-action" v-if="orderDetail">
    <div class="state">
      <span class="iconfont icon-order-unpay"></span>
      <p>
        {{
          orderDetail.orderState === 1
            ? "待支付"
            : orderDetail.orderState === 2
            ? "待发货"
            : orderDetail.orderState === 3
            ? "待收货"
            : orderDetail.orderState === 4
            ? "待评价"
            : orderDetail.orderState === 5
            ? "已完成"
            : orderDetail.orderState === 6
            ? "已取消"
            : "-"
        }}
      </p>
    </div>
    <div class="info">
      <p>订单编号：{{ orderDetail.id }}</p>
      <p>下单时间：{{ orderDetail.createTime }}</p>
    </div>
    <div class="btn">
      <!-- 待付款 -->
      <template v-if="orderDetail.orderState === 1">
        <XtxButton
          @click="$router.push('/member/pay?orderId=' + orderDetail.id)"
          type="primary"
          size="small"
        >
          立即付款
        </XtxButton>
        <XtxButton
          type="gray"
          size="small"
          @click="onCancelOrderHandler(orderDetail.id)"
        >
          取消订单
        </XtxButton>
      </template>
      <!-- 待发货 -->
      <template v-if="orderDetail.orderState === 2">
        <XtxButton type="primary" size="small">再次购买</XtxButton>
      </template>
      <!-- 待收货 -->
      <template v-if="orderDetail.orderState === 3">
        <XtxButton type="primary" size="small">确认收货</XtxButton>
        <XtxButton type="plain" size="small">再次购买</XtxButton>
      </template>
      <!-- 待评价 -->
      <template v-if="orderDetail.orderState === 4">
        <XtxButton type="primary" size="small">再次购买</XtxButton>
        <XtxButton type="plain" size="small">评价商品</XtxButton>
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
      <!-- 已完成 -->
      <template v-if="orderDetail.orderState === 5">
        <XtxButton type="primary" size="small">再次购买</XtxButton>
        <XtxButton type="plain" size="small">查看评价</XtxButton>
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
      <!-- 已取消 -->
    </div>
    <!-- 取消订单弹框 -->
    <CancelOrder
      ref="cancelOrderComponent"
      @onReloadOrderList="getOrderDetail(orderDetail.id)"
    />
  </div>
</template>

<script>
import CancelOrder from "@/views/Member/Order/components/CancelOrder";
import { ref } from "vue";

export default {
  name: "DetailAction",
  components: { CancelOrder },
  props: {
    orderDetail: {
      type: Object,
      default: () => ({}),
    },
    getOrderDetail: {
      type: Function,
      default: () => {},
    },
  },
  setup() {
    // 取消订单弹框组件实例对象
    const cancelOrderComponent = ref();
    // 当用户点击取消按钮时
    const onCancelOrderHandler = (id) => {
      // 渲染取消订单弹层
      cancelOrderComponent.value.visible = true;
      // 通过组件实例对象传递要取消订单的订单ID
      cancelOrderComponent.value.id = id;
    };

    return { onCancelOrderHandler, cancelOrderComponent };
  },
};
</script>

<style scoped lang="less">
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;

  .state {
    width: 220px;
    text-align: center;

    .iconfont {
      font-size: 40px;
      color: @xtxColor;
    }

    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }

  .info {
    width: 240px;
    line-height: 30px;

    p {
      color: #999;
    }
  }

  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;

    .xtx-button {
      margin-left: 20px;
    }
  }
}
</style>
