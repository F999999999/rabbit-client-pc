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
