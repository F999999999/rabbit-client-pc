<template>
  <AppMemberLayout>
    <div class="member-order">
      <XtxTabs v-model:active="active">
        <XtxTabTitle v-for="status in orderStatus" :key="status.name">
          {{ status.label }}
        </XtxTabTitle>
      </XtxTabs>
      <div class="order-list">
        <!-- 正在加载 -->
        <div class="loading" v-if="loading"></div>
        <!-- 暂无数据 -->
        <div v-if="!loading && orderList?.items.length === 0" class="none">
          暂无数据
        </div>
        <!-- 订单列表 -->
        <div class="order-list" v-if="orderList && !loading">
          <OrderItem
            :order="item"
            v-for="item in orderList.items"
            :key="item.id"
            @onCancelOrder="onCancelOrderHandler"
            @onReloadOrderList="getData"
            @onViewLogistics="onViewLogisticsHandler"
          />
        </div>
        <!-- 分页 -->
        <XtxPagination
          v-if="orderList && totalPage > 1"
          v-model:page="reqParams.page"
          :pageSize="reqParams.pageSize"
          :count="totalCount"
        />
        <!-- 取消订单弹框 -->
        <CancelOrder ref="cancelOrderComponent" @onReloadOrderList="getData" />
        <!-- 查看物流弹框 -->
        <OrderLogistics ref="OrderLogisticsComponent" />
      </div>
    </div>
  </AppMemberLayout>
</template>

<script>
import AppMemberLayout from "@/components/AppMemberLayout";
import { ref, watch } from "vue";
import { orderStatus } from "@/api/constants";
import { getLogisticsByOrderIdApi, getOrderListApi } from "@/api/member";
import OrderItem from "@/views/Member/Order/components/OrderItem";
import CancelOrder from "@/views/Member/Order/components/CancelOrder";
import OrderLogistics from "@/views/Member/Order/components/OrderLogistics";

export default {
  name: "OrderListPage.vue",
  components: { OrderLogistics, CancelOrder, OrderItem, AppMemberLayout },
  setup() {
    const active = ref(0);
    // 获取订单列表数据
    const { orderList, reqParams, loading, totalCount, totalPage, getData } =
      useOrderList();

    // 监听用户点击选项卡
    watch(active, (current) => {
      // 重置订单状态参数
      reqParams.value.orderState = current;
      // 重置页码参数
      reqParams.value.page = 1;
    });

    // 取消订单弹层组件实例对象
    const cancelOrderComponent = ref();
    // 当用户点击取消按钮时
    const onCancelOrderHandler = (id) => {
      // 渲染取消订单弹层
      cancelOrderComponent.value.visible = true;
      // 通过组件实例对象传递要取消订单的订单ID
      cancelOrderComponent.value.id = id;
    };

    // 查看物流弹框组件实例对象
    const OrderLogisticsComponent = ref();
    // 当用户点击查看物流按钮时
    const onViewLogisticsHandler = (id) => {
      // 渲染查看物流弹框组件
      OrderLogisticsComponent.value.visible = true;
      // 获取订单物流信息
      getLogisticsByOrderIdApi(id).then((data) => {
        // 存储订单物流信息
        OrderLogisticsComponent.value.logistics = data.result;
      });
    };

    return {
      active,
      orderStatus,
      orderList,
      loading,
      reqParams,
      totalCount,
      totalPage,
      cancelOrderComponent,
      onCancelOrderHandler,
      getData,
      OrderLogisticsComponent,
      onViewLogisticsHandler,
    };
  },
};

// 获取订单列表数据
const useOrderList = () => {
  // 订单列表数据加载状态
  const loading = ref(false);
  // 订单列表数据
  const orderList = ref([]);
  // 请求参数
  const reqParams = ref({ page: 1, pageSize: 10, orderState: 0 });
  // 总数据条数
  const totalCount = ref(0);
  // 总页数
  const totalPage = ref(0);
  // 获取订单列表数据
  const getData = () => {
    // 加载中
    loading.value = true;
    getOrderListApi(reqParams.value).then((res) => {
      orderList.value = res.result;
      // 更新总数据条数
      totalCount.value = res.result.counts;
      // 更新总页数
      totalPage.value = res.result.pages;
      // 加载完成
      loading.value = false;
    });
  };
  // 监听请求参数变化后重新获取订单列表数据
  watch(reqParams.value, getData, { immediate: true });

  return {
    orderList,
    reqParams,
    loading,
    totalCount,
    totalPage,
    getData,
  };
};
</script>

<style lang="less" scoped>
.member-order {
  height: 100%;
  background: #fff;
  position: relative;
}

.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
}

.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;

  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;

    span {
      margin-right: 20px;

      &.down-time {
        margin-right: 0;
        float: right;

        i {
          vertical-align: middle;
          margin-right: 3px;
        }

        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }

    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }

  .body {
    display: flex;
    align-items: stretch;

    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;

      > p {
        padding-top: 10px;
      }

      &:first-child {
        border-left: none;
      }

      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;

        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;

            &:last-child {
              border-bottom: none;
            }

            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }

            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;

              p {
                margin-bottom: 5px;

                &.name {
                  height: 38px;
                }

                &.attr {
                  color: #999;
                  font-size: 12px;

                  span {
                    margin-right: 5px;
                  }
                }
              }
            }

            .price {
              width: 100px;
            }

            .count {
              width: 80px;
            }
          }
        }
      }

      &.state {
        width: 120px;

        .green {
          color: @xtxColor;
        }
      }

      &.amount {
        width: 200px;

        .red {
          color: @priceColor;
        }
      }

      &.action {
        width: 140px;

        a {
          display: block;

          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}

.loading {
  height: calc(100% - 60px);
  width: 100%;
  min-height: 400px;
  position: absolute;
  left: 0;
  top: 60px;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif)
    no-repeat center 18%;
}

.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
  background: rgba(255, 255, 255, 0.9);
}
</style>
