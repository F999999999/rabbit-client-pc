<template>
  <div class="xtx-number-box">
    <div class="label" v-if="label">{{ label }}</div>
    <div class="number-box">
      <a href="javascript:" @click="onNumberChanged(-1)">-</a>
      <input type="text" readonly :value="number" />
      <a href="javascript:" @click="onNumberChanged(1)">+</a>
    </div>
  </div>
</template>
<script>
import { useVModel } from "@vueuse/core";

export default {
  name: "XtxNumberBox",
  props: {
    // 当前数量
    modelValue: {
      type: Number,
      default: 1,
    },
    // 最大购买数量
    max: {
      type: Number,
      default: 1,
    },
    // 标题
    label: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    // 双向数据绑定
    const number = useVModel(props, "modelValue", emit);
    const onNumberChanged = (step) => {
      // 更新当前数值
      const nextNumber = number.value + step;
      // 限制数值的范围
      if (nextNumber < 1) {
        number.value = 1;
      } else if (nextNumber > props.max) {
        number.value = props.max;
      } else {
        number.value = nextNumber;
      }
    };

    return { number, onNumberChanged };
  },
};
</script>
<style scoped lang="less">
.xtx-number-box {
  display: flex;
  align-items: center;

  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }

  .number-box {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;

    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;

      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }

      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }

    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
