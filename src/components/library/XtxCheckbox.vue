<template>
  <div class="xtx-checkbox" @click="toggle">
    <i class="iconfont icon-checked" v-if="isChecked"></i>
    <i class="iconfont icon-unchecked" v-if="!isChecked"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </div>
</template>
<script>
import { ref, watchEffect } from "vue";

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
    const isChecked = ref(false);
    // 修改复选框的选中状态
    const toggle = () => {
      // 取反
      isChecked.value = !isChecked.value;
      // 同步值给外部
      emit("update:modelValue", isChecked.value);
    };
    // 监听外部值的变化并同步到 isChecked
    watchEffect(() => {
      isChecked.value = props.modelValue;
    });

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
