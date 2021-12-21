<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <div class="loading" v-if="skuLoading"></div>
      <GoodsSku
        v-if="!skuLoading"
        :skuId="skuId"
        :specs="specsAndSkus.specs"
        :skus="specsAndSkus.skus"
        @onSpecChanged="onSpecChanged"
      />
      <XtxButton
        @click="submitSku"
        v-if="specsAndSkus"
        type="primary"
        size="mini"
        style="margin-left: 60px"
      >
        确定
      </XtxButton>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { getSkuInfoBySkuId } from "@/api/cart";
import GoodsSku from "@/views/Goods/components/GoodsSku";
import Message from "@/components/library/Message";
import { useStore } from "vuex";

export default {
  name: "CartSku",
  components: { GoodsSku },
  props: {
    attrsText: {
      type: String,
      default: "",
    },
    skuId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // 获取路由信息
    const store = useStore();
    // 弹层容器元素
    const target = ref(null);
    // 规格弹层是否显示
    const visible = ref(false);

    // 规格选项数据
    const specsAndSkus = ref(null);
    // sku 数据加载状态
    const skuLoading = ref(false);

    // 显示弹层
    const show = async () => {
      // 显示弹层
      visible.value = true;
      // 更新加载状态
      skuLoading.value = true;
      // 获取 sku 数据
      const data = await getSkuInfoBySkuId(props.skuId);
      // 存储 sku 数据
      specsAndSkus.value = data.result;
      // 更新加载状态
      skuLoading.value = false;
    };
    // 隐藏弹层
    const hide = () => {
      visible.value = false;
    };
    // 切换弹层
    const toggle = () => {
      visible.value ? hide() : show();
    };
    // 在弹层外部点击时执行
    onClickOutside(target, () => {
      // 如果规格弹框是显示状态则就让弹层隐藏
      visible.value && hide();
    });

    // 用户当前选择的规格
    let userSelectedNewSku = null;
    // 监听规格信息变化
    const onSpecChanged = (sku) => {
      userSelectedNewSku = sku;
    };
    // 提交更新规格信息
    const submitSku = () => {
      // 隐藏规格弹层
      hide();
      // 如果用户没有选择新的规格
      if (
        !userSelectedNewSku ||
        (userSelectedNewSku && userSelectedNewSku.skuId === props.skuId)
      ) {
        // 提示信息
        return Message({ type: "warn", text: "商品规格信息没有发生变化" });
      }
      // 更新规格信息
      store.dispatch("cart/updateGoodsOfCartBySkuChanged", {
        oldSkuId: props.skuId,
        userSelectedNewSku,
      });
    };

    return {
      target,
      visible,
      toggle,
      specsAndSkus,
      skuLoading,
      onSpecChanged,
      submitSku,
    };
  },
};
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;

  .attrs {
    line-height: 24px;
    display: flex;

    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }

    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }

  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;

    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }

    .loading {
      height: 224px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
