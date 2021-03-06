import {
  addGoodsToCartApi,
  deleteGoodsOfCartBySkuIdsApi,
  getCartList,
  mergeCart,
  selectOrUnselectCartGoodsApi,
  updateGoodsOfCartBySkuIdApi,
  updateLocalCart,
} from "@/api/cart";

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
    // 设置购物车列表
    setCart(state, payload) {
      state.list = payload;
    },
  },
  actions: {
    // 将商品添加到购物车
    async addGoodsToCart({ rootState, commit, dispatch }, goods) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
        // 发送请求 将商品添加到服务器端购物车
        await addGoodsToCartApi({
          skuId: goods.skuId,
          count: goods.count,
        });
        // 更新购物车列表
        dispatch("updateCartList");
      } else {
        // 未登录
        commit("addGoodsToCart", goods);
      }
    },
    // 根据 skuId 删除购物车的商品
    async deleteGoodsOfCartBySkuId({ rootState, commit, dispatch }, skuId) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
        // 发送请求 删除服务器端的购物车商品
        await deleteGoodsOfCartBySkuIdsApi([skuId]);
        // 更新购物车列表
        dispatch("updateCartList");
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
        // 获取服务器端购物车列表数据
        const data = await getCartList();
        // 存储数据到 vueX 中
        commit("setCart", data.result);
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
    async updateGoodsOfCartBySkuId({ rootState, commit, dispatch }, goods) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
        // 更新商品信息
        await updateGoodsOfCartBySkuIdApi(goods);
        // 更新商品列表
        dispatch("updateCartList");
      } else {
        // 未登录
        commit("updateGoodsBySkuId", goods);
      }
    },
    // 更新全选按钮状态
    async selectIsAll({ rootState, getters, commit, dispatch }, isAll) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
        // 获取商品 skuId 数组
        const ids = getters.effectiveGoodsList.map((item) => item.skuId);
        // 发送请求 切换全选状态
        await selectOrUnselectCartGoodsApi({ ids, selected: isAll });
        // 更新购物车商品列表
        dispatch("updateCartList");
      } else {
        // 未登录
        getters.effectiveGoodsList.forEach((item) => {
          commit("updateGoodsBySkuId", { skuId: item.skuId, selected: isAll });
        });
      }
    },
    // 删除用户选择的商品或清空无效商品
    async deleteGoodsOfCartByUserSelectedOrInvalid(
      { rootState, getters, commit, dispatch },
      flag
    ) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
        // 获取要批量删除商品的 skuId 数组
        const skuIds = getters[flag].map((item) => item.skuId);
        // 发送请求 批量删除商品
        await deleteGoodsOfCartBySkuIdsApi(skuIds);
        // 更新商品列表
        dispatch("updateCartList");
      } else {
        // 未登录
        getters[flag].forEach((item) => {
          commit("deleteGoodsOfCartBySkuId", item.skuId);
        });
      }
    },
    // 合并购物车
    async mergeCart({ state, commit }) {
      // 如果本地购物车中没有数据 不进行合并
      if (state.list.length === 0) return;
      // 合并购物车接口所需参数
      const carts = state.list.map((item) => ({
        skuId: item.skuId,
        selected: item.selected,
        count: item.count,
      }));
      try {
        // 合并购物车
        await mergeCart(carts);
        // 清空本地购物车数据
        commit("setCart", []);
      } catch (err) {
        // 购物车合并失败 抛出异常
        throw new Error(err);
      }
    },
    // 更新商品信息
    async updateGoodsOfCartBySkuChanged(
      { rootState, state, commit, dispatch },
      { oldSkuId, userSelectedNewSku }
    ) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
        // 通过原有商品信息获取用户选择的商品数据
        const oldGoods = state.list.find((item) => item.skuId === oldSkuId);
        // 删除原有商品
        await deleteGoodsOfCartBySkuIdsApi([oldSkuId]);
        // 添加新商品
        await addGoodsToCartApi({
          skuId: userSelectedNewSku.skuId,
          count: oldGoods.count,
        });
        // 更新购物车商品列表
        await dispatch("updateCartList");
      } else {
        // 未登录
        // 根据旧的 skuId 查找旧商品
        const oldGoods = state.list.find((item) => item.skuId === oldSkuId);
        // 根据旧商品生成新商品
        const newGoods = {
          ...oldGoods,
          skuId: userSelectedNewSku.skuId,
          stock: userSelectedNewSku.inventory,
          oldPrice: userSelectedNewSku.oldPrice,
          nowPrice: userSelectedNewSku.price,
          attrsText: userSelectedNewSku.specsText,
        };
        // 删除旧商品
        commit("deleteGoodsOfCartBySkuId", oldSkuId);
        // 插入新商品
        commit("addGoodsToCart", newGoods);
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
