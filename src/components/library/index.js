// 批量导入模块 返回值是一个导入函数
// require.context(目录,是否查找子目录,用于查找文件名的正则表达式)
const importFn = require.context("./", false, /\.vue&/);
// 使用导入函数的 keys 方法获取所有匹配成功的文件路径数组
const keys = importFn.keys();

import lazy from "@/components/directive/lazy";

export default {
  install(app) {
    // 遍历文件路径
    keys.forEach((key) => {
      // 导入组件
      const component = importFn(key).default;
      // 注册组件
      app.component(component.name, component);
    });

    // 图片懒加载
    app.directive("lazy", lazy);
  },
};
