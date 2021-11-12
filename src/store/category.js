import { topCategories } from "@/api/constants";
import { getCategoriesApi } from "@/api/home";

const category = {
  //  使用命名空间模块
  namespaced: true,
  state() {
    return {
      // 默认设置默认数据防止服务器返回数据时的抖动
      list: topCategories.map((categoryName) => ({ name: categoryName })),
    };
  },
  mutations: {
    // 设置分类数据
    setCategories(state, payload) {
      state.list = payload;
    },
    open(state, id) {
      const target = state.list.find((item) => item.id === id);
      target.open = true;
    },
    close(state, id) {
      const target = state.list.find((item) => item.id === id);
      target.open = false;
    },
  },
  actions: {
    async getCategories({ commit }) {
      // 发送请求获取数据
      const data = await getCategoriesApi();
      // 添加控制显示隐藏的 open 属性
      data.result.forEach((item) => (item.open = false));
      // 把数据提交给mutations
      commit("setCategories", data.result);
    },
  },
};

export default category;
