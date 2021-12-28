<template>
  <AppMemberLayout>
    <div class="member-order">
      <XtxTabs v-model:active="active">
        <XtxTabTitle v-for="status in orderStatus" :key="status.name">
          {{ status.label }}
        </XtxTabTitle>
      </XtxTabs>
      <div class="order-list">
        <div class="order-item">
          <div class="head">
            <span>下单时间：2021-09-25 08:33:30</span>
            <span>订单编号：1441561463234760705</span>
            <span class="down-time">
              <i class="iconfont icon-down-time"></i>
              <b>付款截止：28分32秒</b>
            </span>
            <a href="javascript:" class="del">删除</a>
          </div>
          <div class="body">
            <div class="column goods">
              <ul>
                <li v-for="i in 2" :key="i">
                  <a class="image" href="javascript:">
                    <img
                      src="https://yanxuan-item.nosdn.127.net/a67e6f85a4fc128ab3a2efad5279ca15.png"
                      alt=""
                    />
                  </a>
                  <div class="info">
                    <p class="name ellipsis-2">
                      不烫手的茶杯双层隔热茶水杯绿茶杯
                    </p>
                    <p class="attr ellipsis">
                      <span>容量:2只装 </span>
                    </p>
                  </div>
                  <div class="price">¥89</div>
                  <div class="count">x1</div>
                </li>
              </ul>
            </div>
            <div class="column state">
              <p>待付款</p>
              <a href="javascript:" class="green">查看物流</a>
              <a href="javascript:" class="green">评价商品</a>
              <a href="javascript:" class="green">查看评价</a>
            </div>
            <div class="column amount">
              <p class="red">¥93</p>
              <p>（含运费：¥4）</p>
              <p>在线付款</p>
            </div>
            <div class="column action">
              <XtxButton type="primary" size="small">立即付款</XtxButton>
              <XtxButton type="primary" size="small">确认收货</XtxButton>
              <p><a href="javascript:">查看详情</a></p>
              <p><a href="javascript:">取消订单</a></p>
              <p><a href="javascript:">再次购买</a></p>
              <p><a href="javascript:">申请售后</a></p>
            </div>
          </div>
        </div>
      </div>
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
