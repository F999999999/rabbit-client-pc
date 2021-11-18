<script>
import { h } from "vue";

export default {
  name: "XtxBread",
  render() {
    // 获取组件默认插槽内容
    const items = this.$slots.default();
    // 子组件内容
    const children = [];
    // 遍历插槽内容
    items.forEach((item, i) => {
      // 添加插槽内容
      children.push(item);
      // 如果不是最后一个插槽内容
      if (i !== items.length - 1) {
        // 添加分隔符
        children.push(
          h("i", {
            class: "iconfont icon-angle-right",
          })
        );
      }
    });

    // 面包屑导航外层的 div
    return h("div", { className: "xtx-bread" }, children);
  },
};
</script>

<style scoped lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
