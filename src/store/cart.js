import { updateLocalCart } from "@/api/cart";

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
    // 根据 skuId 删除购物车的商品
    deleteGoodsOfCartBySkuId(state, skuId) {
      // 在购物车列表中查找当前需要删除的商品
      const index = state.list.findIndex((item) => item.skuId === skuId);
      // 如果购物车中存在该商品则将商品从购物车列表中删除
      if (index >= 0) state.list.splice(index, 1);
    },
    // 根据 skuId 更新商品信息
    updateGoodsBySkuId(state, partOfGoods) {
      // 根据 skuId 查找商品在购物车列表中的索引
      let index = state.list.findIndex(
        (item) => item.skuId === partOfGoods.skuId
      );
      // 判断是否找到了商品
      if (index >= 0) {
        // 更新商品数据
        state.list[index] = {
          ...state.list[index],
          ...partOfGoods,
        };
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
    // 根据 skuId 删除购物车的商品
    deleteGoodsOfCartBySkuId({ rootState, commit }, skuId) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
      } else {
        // 未登录
        commit("deleteGoodsOfCartBySkuId", skuId);
      }
    },
    // 更新购物车商品
    async updateCartList({ rootState, state, commit }) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
      } else {
        // 未登录
        // 遍历购物车的商品
        const cartListPromises = state.list.map(({ skuId, id }) =>
          // 将方法调用后返回的 Promise 对象存储在一个数组中
          updateLocalCart({ skuId, id })
        );
        // 批量发送请求获取商品状态并保存在数组的对应位置中
        Promise.all(cartListPromises).then((dataCollection) => {
          // 遍历响应结果
          dataCollection.forEach((item, index) => {
            // 为数据添加 skuId
            item.result.skuId = state.list[index].skuId;
            // 更新本地的商品数据
            commit("updateGoodsBySkuId", item.result);
          });
        });
      }
    },
    // 根据 skuId 更新选中状态和商品数量
    updateGoodsOfCartBySkuId({ rootState, commit }, goods) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
      } else {
        // 未登录
        commit("updateGoodsBySkuId", goods);
      }
    },
    // 更新全选按钮状态
    selectIsAll({ rootState, getters, commit }, isAll) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
      } else {
        // 未登录
        getters.effectiveGoodsList.forEach((item) => {
          commit("updateGoodsBySkuId", { skuId: item.skuId, selected: isAll });
        });
      }
    },
  },
  getters: {
    // 可购买的商品列表
    effectiveGoodsList(state) {
      // 有效商品并且商品库存数量大于 0
      return state.list.filter((item) => item.isEffective && item.stock > 0);
    },
    // 可购买商品总价
    effectiveGoodsTotalPrice(state, getters) {
      return getters.effectiveGoodsList.reduce(
        (total, item) => total + Number(item.nowPrice) * item.count,
        0
      );
    },
    // 可购买商品数量
    effectiveGoodsTotalCount(state, getters) {
      return getters.effectiveGoodsList.reduce(
        (count, item) => count + item.count,
        0
      );
    },
    // 不可购买的商品列表
    invalidGoodsList(state) {
      // 无效商品并且是商品库存数量小于等于 0
      return state.list.filter((item) => !item.isEffective || item.stock <= 0);
    },
    // 用户选择的商品列表
    userSelectedGoodsList(state, getters) {
      return getters.effectiveGoodsList.filter((item) => item.selected);
    },
    // 用户选择的商品总价
    userSelectedGoodsPrice(state, getters) {
      return getters.userSelectedGoodsList.reduce(
        (price, item) => price + Number(item.nowPrice) * item.count,
        0
      );
    },
    // 用户选择的商品的数量
    userSelectedGoodsCount(state, getters) {
      return getters.userSelectedGoodsList.reduce(
        (count, item) => count + item.count,
        0
      );
    },
    // 全选按钮的状态
    selectAllButtonStatus(state, getters) {
      // 有效商品数量大于 0 并且和选中商品的数量相等则代表所有有效商品已选中
      return (
        getters.effectiveGoodsList.length > 0 &&
        getters.userSelectedGoodsList.length ===
          getters.effectiveGoodsList.length
      );
    },
  },
};
export default cart;
