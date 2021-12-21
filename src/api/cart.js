import { requestWithOutToken, requestWithToken } from "@/utils/request";

/**
 * 更新购物车中的商品信息
 * @param skuId 规格ID
 * @param id 商品ID
 * @returns {Promise}
 */
export const updateLocalCart = ({ skuId, id }) => {
  return requestWithOutToken(`/goods/stock/${skuId}`, "get", { id });
};

/**
 * 根据 skuId 获取规格信息
 * @param skuId 规格ID
 * @returns {Promise}
 */
export const getSkuInfoBySkuId = (skuId) => {
  return requestWithOutToken(`/goods/sku/${skuId}`, "get");
};

/**
 * 将本地购物车与服务器端购物车进行合并
 * @param cart 购物车商品列表
 * @returns {Promise}
 */
export const mergeCart = (cart) => {
  return requestWithToken("/member/cart/merge", "post", cart);
};

/**
 * 获取服务器端购物车列表数据
 * @returns {Promise}
 */
export const getCartList = () => {
  return requestWithToken("/member/cart", "get");
};

/**
 * 将商品加入购物车
 * @param skuId 商品 skuId
 * @param count 商品数量
 * @returns {Promise}
 */
export const addGoodsToCartApi = ({ skuId, count }) => {
  return requestWithToken("/member/cart", "post", { skuId, count });
};

/**
 * 删除购物车中的商品
 * @param ids 商品 skuId 数组
 * @returns {Promise}
 */
export const deleteGoodsOfCartBySkuIdsApi = (ids) => {
  return requestWithToken("/member/cart", "delete", { ids });
};

/**
 * 更新购物车中的商品信息
 * @param skuId 商品 skuId
 * @param selected 选中状态
 * @param count 商品数量
 * @returns {Promise}
 */
export const updateGoodsOfCartBySkuIdApi = ({ skuId, selected, count }) => {
  return requestWithToken(`/member/cart/${skuId}`, "put", { selected, count });
};
