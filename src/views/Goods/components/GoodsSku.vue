<template>
  <div class="goods-sku">
    <dl v-for="spec in specs" :key="spec.name">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="item in spec.values" :key="item.name">
          <img
            :class="{ selected: item.selected }"
            :src="item.picture"
            :alt="item.name"
            v-if="item.picture"
            @click="updateSpecSelected(spec, item)"
          />
          <span
            :class="{ selected: item.selected }"
            v-else
            @click="updateSpecSelected(spec, item)"
          >
            {{ item.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  name: "GoodsSku",
  props: {
    // 规格选项数据
    specs: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    // 更新规格的选中状态
    const updateSpecSelected = (spec, item) => {
      // 判断当前的选中状态
      if (item.selected) {
        // 如果选中让其取消选中
        item.selected = false;
      } else {
        // 如果没选中先将该规格中的所有规格取消选中
        spec.values.forEach((value) => (value.selected = false));
        // 让当前的规格选中
        item.selected = true;
      }
    };

    return { updateSpecSelected };
  },
};
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 5px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
