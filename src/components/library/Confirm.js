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
      // 执行离场动画
      vNode.el.classList.remove("fade");
      vNode.el.children[0].classList.remove("fade");
      // 因为离场动画需要 400ms 执行 所以需要等待 400ms 动画执行完成后再删除 DOM
      setTimeout(() => {
        render(null, container);
      }, 400);
    };
    // 用户点击取消按钮时执行
    const onSureButtonClickHandler = () => {
      // 执行用户传递的 catch 回调
      resolve();
      // 执行离场动画
      vNode.el.classList.remove("fade");
      vNode.el.children[0].classList.remove("fade");
      // 因为离场动画需要 400ms 执行 所以需要等待 400ms 动画执行完成后再删除 DOM
      setTimeout(() => {
        render(null, container);
      }, 400);
    };
    // 将单文件组件转换为虚拟节点对象
    const vNode = createVNode(XtxConfirm, {
      title,
      content,
      onSureButtonClick: onSureButtonClickHandler,
      onCancelButtonClick: onCancelButtonClickHandler,
    });
    // 将虚拟节点对象渲染到真实 DOM 中
    // JavaScript 执行引擎和视图渲染引擎是互斥的 执行 JavaScript 代码的过程中不会渲染 HTML
    // 所以当所有同步代码执行完成后才会渲染 HTML
    render(vNode, container);
    // 执行入场动画
    // 若下面代码不被定时器包裹 代码执行到此处时元素还没有开始渲染 所以动画不会生效
    setTimeout(() => {
      // setTimeout 是异步的 当所有同步代码执行完成后 浏览器优先渲染 HTML 后才执行异步回调
      vNode.el.classList.add("fade");
      vNode.el.children[0].classList.add("fade");
    }, 0);
  });
};
export default Confirm;
