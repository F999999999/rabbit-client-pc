const cart = {
  //  使用命名空间模块
  namespaced: true,
  state() {
    return {
      // 购物车商品列表
      list: [],
    };
  },
  mutations: {
    // 将商品添加到购物车
    addGoodsToCart(state, goods) {
      // 在购物车列表中查找当前需要添加的商品
      const index = state.list.findIndex((item) => item.skuId === goods.skuId);
      // 判断购物车中是否存在该商品
      if (index >= 0) {
        // 如果存在 则对商品数量进行累加并置顶
        state.list[index].count += goods.count;
        state.list.unshift(state.list.splice(index, 1)[0]);
      } else {
        // 如果不存在 则将商品添加到购物车列表的最前面
        state.list.unshift(goods);
      }
    },
  },
  actions: {
    // 将商品添加到购物车
    addGoodsToCart({ rootState, commit }, goods) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
      } else {
        // 未登录
        commit("addGoodsToCart", goods);
      }
    },
  },
};

export default cart;
