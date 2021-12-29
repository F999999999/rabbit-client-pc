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
        <XtxButton
          type="primary"
          size="small"
          @click="$router.push(`/checkout/order?id=${orderDetail.id}`)"
        >
          再次购买
        </XtxButton>
      </template>
      <!-- 待收货 -->
      <template v-if="orderDetail.orderState === 3">
        <XtxButton
          type="primary"
          size="small"
          @click="onConfirmReceiptButtonClickHandler(orderDetail.id)"
        >
          确认收货
        </XtxButton>
        <XtxButton
          type="plain"
          size="small"
          @click="$router.push(`/checkout/order?id=${orderDetail.id}`)"
        >
          再次购买
        </XtxButton>
      </template>
      <!-- 待评价 -->
      <template v-if="orderDetail.orderState === 4">
        <XtxButton
          type="primary"
          size="small"
          @click="$router.push(`/checkout/order?id=${orderDetail.id}`)"
        >
          再次购买
        </XtxButton>
        <XtxButton type="plain" size="small">评价商品</XtxButton>
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
      <!-- 已完成 -->
      <template v-if="orderDetail.orderState === 5">
        <XtxButton
          type="primary"
          size="small"
          @click="$router.push(`/checkout/order?id=${orderDetail.id}`)"
        >
          再次购买
        </XtxButton>
        <XtxButton type="plain" size="small">查看评价</XtxButton>
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
      <!-- 已取消 -->
    </div>
    <!-- 取消订单弹框 -->
    <teleport to="#modal">
      <CancelOrder
        ref="cancelOrderComponent"
        @onReloadOrderList="getOrderDetail(orderDetail.id)"
      />
    </teleport>
  </div>
</template>

<script>
import CancelOrder from "@/views/Member/Order/components/CancelOrder";
import { ref } from "vue";
import Confirm from "@/components/library/Confirm";
import { confirmReceiptGoodsApi } from "@/api/order";
import Message from "@/components/library/Message";

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
  setup(props) {
    // 取消订单弹框组件实例对象
    const cancelOrderComponent = ref();
    // 当用户点击取消按钮时
    const onCancelOrderHandler = (id) => {
      // 渲染取消订单弹层
      cancelOrderComponent.value.visible = true;
      // 通过组件实例对象传递要取消订单的订单ID
      cancelOrderComponent.value.id = id;
    };
    // 当确认收货按钮被点击时
    const onConfirmReceiptButtonClickHandler = async (id) => {
      try {
        // 和用户进行确认
        await Confirm({ title: "确认收货", content: "确定要进行收货吗" });
        // 发送请求进行确认收货
        await confirmReceiptGoodsApi(id);
        // 用户提示
        Message({ type: "success", text: "确认收货成功" });
        // 重新获取订单详情数据
        props.getOrderDetail();
      } catch (e) {
        // 用户提示
        Message({ type: "warn", text: "确认收货失败" });
      }
    };

    return {
      onCancelOrderHandler,
      cancelOrderComponent,
      onConfirmReceiptButtonClickHandler,
    };
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
