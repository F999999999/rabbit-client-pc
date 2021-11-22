<template>
  <div class="xtx-checkbox" @click="toggle">
    <i class="iconfont icon-checked" v-if="isChecked"></i>
    <i class="iconfont icon-unchecked" v-if="!isChecked"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </div>
</template>
<script>
import { useVModel } from "@vueuse/core";

export default {
  name: "XtxCheckbox",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    // 复选框的选中状态
    // 使用 uesVModel 将 props 中的 modelValue 实现双向数据绑定并返回一个新的响应式数据
    const isChecked = useVModel(props, "modelValue", emit);
    // 修改复选框的选中状态
    const toggle = () => {
      // 取反
      isChecked.value = !isChecked.value;
    };

    return { isChecked, toggle };
  },
};
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
