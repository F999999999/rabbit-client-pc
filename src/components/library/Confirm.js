import { createVNode, render } from "vue";
import XtxConfirm from "@/components/library/XtxConfirm";

// 创建组件渲染的目标容器
const container = document.createElement("div");
document.body.appendChild(container);

const Confirm = ({ title = "温馨提示", content }) => {
  return new Promise(function (resolve, reject) {
    // 用户点击确认按钮时执行
    const onCancelButtonClickHandler = () => {
      // 执行用户传递的 then 回调
      reject();
      render(null, container);
    };
    // 用户点击取消按钮时执行
    const onSureButtonClickHandler = () => {
      // 执行用户传递的 catch 回调
      resolve();
      render(null, container);
    };
    // 将单文件组件转换为虚拟节点对象
    const vNode = createVNode(XtxConfirm, {
      title,
      content,
      onSureButtonClick: onSureButtonClickHandler,
      onCancelButtonClick: onCancelButtonClickHandler,
    });
    // 将虚拟节点对象渲染到真实 DOM 中
    render(vNode, container);
  });
};

export default Confirm;
