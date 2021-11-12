const path = require("path");

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      // 指定要自动注入的 LESS 文件
      patterns: [
        // 公共颜色变量
        path.join(__dirname, "src", "assets", "styles", "variables.less"),
        // 公共的 less 混入样式
        path.join(__dirname, "src", "assets", "styles", "mixin.less"),
      ],
    },
  },
};
