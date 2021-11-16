import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

/**
 * 监听元素进入可视区时进行数据加载
 * @param apiFunction 用于获取数据的 api 函数
 * @returns {{result: Ref<any>, target: Ref<any>}}
 */
const useLazyData = (apiFunction) => {
  // 创建用于获取元素的 ref
  const target = ref();
  // 创建用于存储数据的变量
  const result = ref();
  // 监听元素是否进入可视区
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      // 如果元素进入可视区，则获取数据
      if (isIntersecting) {
        // 停止监听
        stop();
        // 如果数据已经获取过，则直接返回
        if (result.value) return;
        // 否则获取数据
        apiFunction().then((data) => (result.value = data.result));
      }
    },
    { threshold: 0 }
  );
  // 返回数据及元素
  return {
    target,
    result,
  };
};

export default useLazyData;
