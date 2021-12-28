<template>
  <AppMemberLayout>
    <div class="member-order">
      <XtxTabs v-model:active="active">
        <XtxTabTitle v-for="status in orderStatus" :key="status.name">
          {{ status.label }}
        </XtxTabTitle>
      </XtxTabs>
      <div class="order-list">
        <OrderItem
          :order="item"
          v-for="item in orderList.items"
          :key="item.id"
        />
      </div>
    </div>
  </AppMemberLayout>
</template>

<script>
import AppMemberLayout from "@/components/AppMemberLayout";
import { ref, watch } from "vue";
import { orderStatus } from "@/api/constants";
import { getOrderListApi } from "@/api/member";
import OrderItem from "@/views/Member/Order/components/OrderItem";

export default {
  name: "OrderListPage.vue",
  components: { OrderItem, AppMemberLayout },
  setup() {
    const active = ref(0);
    // 获取订单列表数据
    const { orderList } = useOrderList();

    return { active, orderStatus, orderList };
  },
};

// 获取订单列表数据
const useOrderList = () => {
  // 订单列表数据
  const orderList = ref([]);
  // 请求参数
  const reqParams = ref({ page: 1, pageSize: 10, orderState: 0 });
  // 获取订单列表数据
  const getData = () => {
    getOrderListApi(reqParams.value).then((res) => {
      orderList.value = res.result;
    });
  };
  // 监听请求参数变化后重新获取订单列表数据
  watch(reqParams.value, getData, { immediate: true });

  return { orderList, reqParams };
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
</style>
