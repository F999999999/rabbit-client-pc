<template>
  <div class="goods-sku">
    <dl v-for="spec in specs" :key="spec.name">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="item in spec.values" :key="item.name">
          <img
            :src="item.picture"
            :alt="item.name"
            :class="{ selected: item.selected, disabled: item.disabled }"
            v-if="item.picture"
            @click="updateSpecSelected(spec, item)"
          />
          <span
            :class="{ selected: item.selected, disabled: item.disabled }"
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
import powerSet from "@/vendor/power-set";

export default {
  name: "GoodsSku",
  props: {
    // 规格选项数据
    specs: {
      type: Array,
      default: () => [],
    },
    // 可组合的规格组合
    skus: {
      type: Array,
      default: () => [],
    },
    skuId: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    // 获取用户选中的规格项目
    const getUserSelected = (specs) => {
      // 用户选中的规格列表
      const selectedSpecs = [];
      // 遍历商品规格集合
      specs.forEach((spec, i) => {
        // 在当前规格中查找用户选中的规格
        const selected = spec.values.find((item) => item.selected);
        // 如果找到了就在规格列表数组对应的位置上添加该规格否则填充 undefined 占位
        selectedSpecs[i] = selected ? selected.name : undefined;
      });

      return selectedSpecs;
    };

    // 获取规格查询对象
    const pathMap = createPathMap(props.skus);

    // 更新规格选项的可选状态
    const updateSpecDisabled = (specs, pathMap) => {
      specs.forEach((spec, i) => {
        // 获取用户选择的规格
        const selected = getUserSelected(specs);
        // 遍历具体的规格信息
        spec.values.forEach((item) => {
          // 如果当前规格已经被选中则 说明该规格选项可以被选中 不需要被禁用
          if (item.selected) return;
          // 将当前规格名称添加到用户选择的规格数组对应的名称中等待匹配
          selected[i] = item.name;
          // 过滤 selected 数组中的 undefined 占位符并拼接成字符串
          const key = selected.filter((item) => item).join("_");
          // 如果当前规格名称不在规格查询字典对象中 禁用该规格选项
          item.disabled = !(key in pathMap);
        });
      });
    };

    // 更新规格的选中状态
    const updateSpecSelected = (spec, item) => {
      // 如果当前规格是禁止选中状态 则不做任何操作
      if (item.disabled) return;
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
      // 更新规格选项的可选状态
      updateSpecDisabled(props.specs, pathMap);
      // 传递规格信息数据到父组件
      sendDataToParent(props.specs, props.skus, emit, pathMap);
    };

    // 初始化规格选项禁用状态
    updateSpecDisabled(props.specs, pathMap);

    // 设置默认选中的规格选项
    const setDefaultSelected = (skuId, skus, specs) => {
      // 判断是否需要设置默认选中的规格选项
      if (!skuId) return;
      // 根据 skuId 查找规格集合中的规格对象并遍历 specs 数组中的所有规格返回所有规格选项的名称组成的数组
      const target = skus
        .find((sku) => sku.id === skuId)
        .specs.map((spec) => spec.valueName);
      // 遍历所有规格选项
      specs.forEach((spec) => {
        spec.values.forEach((item) => {
          // 判断当前规格选项名称是否在 target 数组中
          if (target.includes(item.name)) {
            // 设置选中状态为 true
            item.selected = true;
          }
        });
      });
    };
    // 初始化默认选中的规格选项
    setDefaultSelected(props.skuId, props.skus, props.specs);

    // 传递规格信息数据到父组件
    const sendDataToParent = (specs, skus, emit, pathMap) => {
      // 获取用户选择的规格名称数组
      const selected = getUserSelected(specs);
      // 判断当前规格组合是否是完整规格
      if (selected.filter((item) => item).length === specs.length) {
        // 将规格名称使用"_"进行拼接
        const key = selected.join("_");
        // 获取规格组合的 skuId
        const skuId = pathMap[key];
        // 使用 skuId 在规格集合中查找具体的规格对象信息
        const target = skus.find((sku) => sku.id === skuId);
        // 触发自定义事件将规格信息传递给父组件
        emit("onSpecChanged", {
          skuId,
          price: target.price,
          oldPrice: target.oldPrice,
          inventory: target.inventory,
          specsText: target.specs
            .map((spec) => `${spec.name}：${spec.valueName}`)
            .join(" "),
        });
      } else {
        emit("onSpecChanged", { skuId: null });
      }
    };

    return { updateSpecSelected };
  },
};

// 创建规格查询对象
const createPathMap = (skus) => {
  // 规格查询对象
  const pathMap = {};
  // 遍历所有可组合的规格组合
  skus.forEach((sku) => {
    // 判断组合是否有库存
    if (sku.inventory > 0) {
      // 获取可组合规格的名称列表
      const specsName = sku.specs.map((spec) => spec.valueName);
      // 使用 幂集算法 获取可组合规格集合的子集组合
      const sets = powerSet(specsName);
      // 遍历规格子集组合
      sets.forEach((set) => {
        // 将规格名称使用"_"进行拼接
        const key = set.join("_");
        // 判断规格查询对象中是否已经存在当前规格组合
        if (key && !pathMap[key]) {
          // 判断当前规格组合是否是完整规格
          // 将当前规格组合的名称作为规格查询对象的键 如果当前规格是完整规格 值为商品的 skuId 否则为 null
          pathMap[key] = set.length === sku.specs.length ? sku.id : null;
        }
      });
    }
  });

  return pathMap;
};
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 5px;
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
