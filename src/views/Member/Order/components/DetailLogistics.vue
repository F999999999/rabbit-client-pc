<template>
  <div class="detail-logistics" v-if="logistics">
    <p>
      <span>{{ logistics.list[0].text }}</span>
      <span>{{ logistics.list[0].time }}</span>
    </p>
    <a href="javascript:" @click="onViewLogisticsButtonClickHandler">
      查看物流
    </a>
    <!-- 查看物流弹框 -->
    <teleport to="#modal">
      <OrderLogistics ref="OrderLogisticsComponent" />
    </teleport>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { getLogisticsByOrderIdApi } from "@/api/member";
import OrderLogistics from "@/views/Member/Order/components/OrderLogistics";

export default {
  name: "DetailLogistics",
  components: { OrderLogistics },
  /*
   *  Vue 规定必须先执行 setup 函数再渲染模板, 因为 setup 函数要返回渲染模板所需的数据
   *  如果将 setup 函数更改为异步函数, 将导致代码执行顺序更改为先渲染模板再执行 setup 函数
   *  在调用异步组件时外部需要包裹 suspense 组件, 保证 setup 函数执行完成后再进行模板渲染
   * */
  async setup() {
    // 获取路由信息对象
    const route = useRoute();
    // 用于存储订单物流信息
    const logistics = ref(null);
    // 获取物流信息
    let data = await getLogisticsByOrderIdApi(route.params.id);
    // 存储物流信息
    logistics.value = data.result;

    // 物流信息弹层组件实例对象
    const OrderLogisticsComponent = ref();
    // 当用户点击查看物流按钮时
    const onViewLogisticsButtonClickHandler = () => {
      // 渲染弹层
      OrderLogisticsComponent.value.visible = true;
      // 传递物流信息
      OrderLogisticsComponent.value.logistics = logistics.value;
    };

    return {
      logistics,
      OrderLogisticsComponent,
      onViewLogisticsButtonClickHandler,
    };
  },
};
</script>
<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;

  > p {
    flex: 1;

    span {
      color: #999;

      &:first-child {
        margin-right: 30px;
      }
    }
  }

  > a {
    color: @xtxColor;
    text-align: center;
  }
}
</style>
