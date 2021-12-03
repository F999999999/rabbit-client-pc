import XtxMessage from "@/components/library/XtxMessage";
import { createVNode, render } from "vue";

// 创建组件渲染的目标容器
const container = document.createElement("div");
document.body.appendChild(container);
// 定时器
let timer = null;

/**
 * 渲染消息提示组件
 * @param type 提示类型 成功：success 错误：error 警告：warn（默认值：error）
 * @param text 提示内容
 * @constructor
 */
const Message = ({ type, text }) => {
  // 将单文件组件转换为虚拟节点对象
  const vNode = createVNode(XtxMessage, { type, text });
  // 将虚拟节点对象渲染到真实 DOM 中
  render(vNode, container);
  // 3 秒后销毁组件
  clearTimeout(timer);
  timer = setTimeout(() => render(null, container), 3000);
};

export default Message;
