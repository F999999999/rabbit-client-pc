import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import user from "@/store/user";
import cart from "@/store/cart";
import category from "@/store/category";

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    cart,
    category,
  },
  plugins: [
    createPersistedState({
      // 指定需要存储的模块
      paths: ["user", "cart"],
      // 指定数据存储在 localStorage 中的键
      key: "rabbit-client-pc",
    }),
  ],
});

export default store;
